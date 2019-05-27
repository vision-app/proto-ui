import MValidator from '../../m-validator.vue';

export const UFormItem = {
    name: 'u-form-item',
    mixins: [MValidator],
    props: {
        // name: String,
        // label: String,
        title: String,
        // rules: Array,
        // ignoreRules: { type: Boolean, default: false },
        // message: String,
        required: { type: Boolean, default: false },
        labelSize: String,
        bubble: { type: Boolean, default: false },
    },
    data() {
        return {
            // value: undefined,
            // state: '',
            // color: '',
            // currentMessage: this.message,
            // inputing: false,
            // parentVM: undefined,
            // fieldVM: undefined,
        };
    },
    computed: {
        currentRequired() {
            return this.required || this.currentRules && this.currentRules.some((rule) => rule.required);
        },
        currentLabelSize() {
            return this.labelSize || (this.rootVM && this.rootVM.labelSize) || 'auto';
        },
    },
    created() {
        this.dispatch('u-form', 'add-item-vm', this);
    },
    destroyed() {
        this.dispatch('u-form', 'remove-item-vm', this);
    },
    methods: {
        // onFocus() {
        //     this.color = 'focus';
        //     this.currentMessage = this.message;
        // },
        // onBlur() {
        //     this.color = this.state = '';
        //     this.$nextTick(() => this.validate('blur').catch((errors) => errors));
        // },
    },
};

export default UFormItem;
