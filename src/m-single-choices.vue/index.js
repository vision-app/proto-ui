import { MParent } from '../m-parent.vue';

const MSingleChoices = {
    name: 'm-single-choices',
    groupName: 'm-single-choices-group',
    childName: 'm-single-choice',
    mixins: [MParent],
    props: {
        value: null,
        autoSelect: { type: Boolean, default: false },
        cancelable: { type: Boolean, default: false },
        collapsible: { type: Boolean, default: false },
        accordion: { type: Boolean, default: false },
        expandTrigger: { type: String, default: 'click' },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            // @inherit: groupVMs: [],
            // @inherit: itemVMs: [],
            selectedVM: undefined,
        };
    },
    watch: {
        // It is dynamic to find selected item by value
        // so using watcher is better than computed property.
        value(value) {
            this.watchValue(value);
        },
        selectedVM(selectedVM, oldVM) {
            // @TODO: Vue 中 相同复杂类型也会认为是改变？
            if (selectedVM === oldVM)
                return;
            this.$emit('change', {
                value: selectedVM ? selectedVM.value : undefined,
                oldValue: oldVM ? oldVM.value : undefined,
                item: selectedVM ? selectedVM.item : undefined,
                itemVM: selectedVM,
            }, this);
        },
        // This method just run once after pushing many itemVMs
        itemVMs() {
            // 更新列表之后，原来的选择可以已不存在，这里暂存然后重新查找一遍
            const value = this.selectedVM ? this.selectedVM.value : this.value;
            this.selectedVM = undefined;
            this.watchValue(value);
        },
    },
    mounted() {
        // Must trigger `value` watcher at mounted hook.
        // If not, itemVMs have not been pushed.
        this.watchValue(this.value);
    },
    methods: {
        watchValue(value) {
            if (this.selectedVM && this.selectedVM.value === value)
                return;
            if (value === undefined)
                this.selectedVM = this.autoSelect ? this.itemVMs[0] : undefined;
            else {
                this.selectedVM = this.itemVMs.find((itemVM) => itemVM.value === value);
                this.selectedVM && this.selectedVM.groupVM && this.selectedVM.groupVM.toggle(true);
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
            }, this);
            if (cancel)
                return;

            if (this.cancelable && this.selectedVM === itemVM)
                this.selectedVM = undefined;
            else
                this.selectedVM = itemVM;

            const value = this.selectedVM && this.selectedVM.value;
            const item = this.selectedVM && this.selectedVM.item;

            this.$emit('input', value, this);
            this.$emit('update:value', value, this);
            this.$emit('select', {
                value,
                oldValue,
                item,
                itemVM: this.selectedVM,
            }, this);
        },
        onToggle(groupVM, expanded) {
            this.$emit('toggle', {
                expanded,
                groupVM,
            }, this);
        },
        toggleAll(expanded) {
            this.groupVMs.forEach((groupVM) => groupVM.toggle(expanded));
        },
    },
};

export * from './choice.vue';
export * from './divider.vue';
export * from './group.vue';
export { MSingleChoices };
export default MSingleChoices;