import Field from '../u-field.vue';

export default {
    name: 'u-list-view',
    childName: 'u-list-view-item',
    mixins: [Field],
    props: {
        data: Array,
        value: null,
        field: { type: String, default: 'text' },
        cancelable: { type: Boolean, default: false },
        multiple: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            ChildComponent: this.$options.childName,
            itemVMs: [],
            selectedVM: undefined,
        };
    },
    watch: {
        // It is dynamic to find selected item by value
        // so using watcher is better than computed property.
        value(value) {
            this.watchValue(value);
        },
        // This method just run once after pushing many itemVMs
        itemVMs() {
            this.selectedVM = undefined;
            this.watchValue(this.value);
        },
    },
    created() {
        this.$on('add-item-vm', (itemVM) => {
            itemVM.parentVM = this;
            this.itemVMs.push(itemVM);
        });
        this.$on('remove-item-vm', (itemVM) => {
            itemVM.parentVM = undefined;
            this.itemVMs.splice(this.itemVMs.indexOf(itemVM), 1);
        });
        // @TODO: Suggest to add a nextTick option in Vue.js
        // Must trigger `value` watcher at next tick.
        // If not, itemVMs have not been pushed.
        this.$nextTick(() => this.watchValue(this.value));
    },
    methods: {
        watchValue(value) {
            if (this.multiple)
                this.itemVMs.forEach((itemVM) => itemVM.currentSelected = value && value.includes(itemVM.value));
            else {
                if (this.selectedVM && this.selectedVM.value === value)
                    return;
                if (value === undefined)
                    this.selectedVM = undefined;
                else
                    this.selectedVM = this.itemVMs.find((itemVM) => itemVM.value === value);
            }
        },
        select(itemVM) {
            if (this.readonly || this.disabled)
                return;

            const oldValue = this.value;

            let cancel = false;
            this.$emit('before-select', {
                value: itemVM && itemVM.value,
                oldValue,
                item: itemVM && itemVM.item,
                itemVM,
                preventDefault: () => cancel = true,
            });
            if (cancel)
                return;

            if (this.multiple) {
                itemVM.currentSelected = !itemVM.currentSelected;
                const itemVMs = this.itemVMs.filter((itemVM) => itemVM.currentSelected);
                const value = itemVMs.map((itemVM) => itemVM.value);
                const items = itemVMs.map((itemVM) => itemVM.item);

                this.$emit('input', value);
                this.$emit('select', {
                    value,
                    oldValue,
                    items,
                    itemVMs,
                });
            } else {
                if (this.cancelable && this.selectedVM === itemVM)
                    this.selectedVM = undefined;
                else
                    this.selectedVM = itemVM;

                const value = this.selectedVM && this.selectedVM.value;
                const item = this.selectedVM && this.selectedVM.item;

                this.$emit('input', value);
                this.$emit('select', {
                    value,
                    oldValue,
                    item,
                    itemVM: this.selectedVM,
                });
            }
        },
    },
};