import MField from '../m-field.vue';

export default {
    name: 'u-switch',
    mixins: [MField],
    props: {
        value: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            currentValue: this.value,
        };
    },
    computed: {
        listeners() {
            const listeners = Object.assign({}, this.$listeners);
            ['focus', 'blur', 'update:value'].forEach((prop) => {
                delete listeners[prop];
            });
            return listeners;
        },
    },
    watch: {
        value(value) {
            this.currentValue = value;
        },
        currentValue(value, oldValue) {
            this.$emit('change', { value, oldValue }, this);
        },
    },
    methods: {
        onFocus(e) {
            this.$emit('focus', e, this);
        },
        onBlur(e) {
            this.$emit('blur', e, this);
        },
        toggle() {
            if (this.readonly || this.disabled)
                return;

            const oldValue = this.currentValue;
            const value = !this.currentValue;

            let cancel = false;
            this.$emit('before-toggle', {
                value,
                oldValue,
                preventDefault: () => cancel = true,
            }, this);
            if (cancel)
                return;

            this.currentValue = value;

            this.$emit('input', value, this);
            this.$emit('update:value', value, this);
            this.$emit('toggle', { value, oldValue }, this);
        },
    },
};