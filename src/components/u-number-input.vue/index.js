import MField from '../m-field.vue';
import debounce from 'lodash/debounce';
import { repeatClick } from '../../directives';
import { noopFormatter, NumberFormatter } from '../../utils/Formatters';

const UNumberInput = {
    name: 'u-number-input',
    mixins: [MField],
    directives: { repeatClick },
    props: {
        // 只能传入数字
        value: { type: Number, default: 0 },
        min: { type: Number, default: -Infinity },
        max: { type: Number, default: Infinity },
        step: { type: Number, default: 1, validator: (step) => step >= 0 },
        precision: { type: Number, default: 1, validator: (precision) => precision > 0 },
        formatter: { type: [String, Object] },
        fixOn: { type: String, default: 'blur' },
        hideButtons: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
    },
    data() {
        const data = {
            currentValue: this.value,
            // 格式化后的 value，与`<input>`中的实际值保持一致
            formattedValue: this.value,
            currentFormatter: undefined,
        };

        if (this.formatter instanceof Object)
            data.currentFormatter = this.formatter;
        else if (typeof this.formatter === 'string')
            data.currentFormatter = new NumberFormatter(this.formatter);
        else
            data.currentFormatter = noopFormatter;

        data.formattedValue = data.currentFormatter.format(this.value);

        return data;
    },
    computed: {
        listeners() {
            const listeners = Object.assign({}, this.$listeners);
            ['input', 'change', 'focus', 'blur', 'update:value'].forEach((prop) => {
                delete listeners[prop];
            });
            return listeners;
        },
    },
    watch: {
        value(value) {
            value = +value; // 防止出现`1.fabc`，转换成`1.`的情况
            if (isNaN(value) || value === '' || value === null)
                return;
            this.currentValue = value;
            this.formattedValue = this.currentFormatter.format(value);
        },
        currentValue(value, oldValue) {
            this.$emit('change', {
                value,
                oldValue,
                formattedValue: this.currentFormatter.format(value),
            }, this);
        },
    },
    created() {
        this.debouncedInput = debounce(this.input, 400);
    },
    methods: {
        fix(value) {
            if (isNaN(value))
                return this.currentValue;
            else {
                value = +value;
                // 精度约束
                value = Math.round(value / this.precision) * this.precision;
                // 最大最小约束
                value = Math.min(Math.max(this.min, value), this.max);
                // 保留小数位数
                value = +value.toFixed(this.precision < 1 ? -Math.floor(Math.log10(this.precision)) : 0);
                return value;
            }
        },
        /**
         * 单纯输入
         * @param {*} value 输入值
         */
        input(value) {
            if (this.readonly || this.disabled)
                return;
            value = this.fix(value);

            this.currentValue = value;
            this.formattedValue = this.currentFormatter.format(value);
            this.$refs.input.currentValue = this.formattedValue;

            this.$emit('input', value, this);
            this.$emit('update:value', value, this);
        },
        /**
         * 按上下按钮发送 adjust 事件
         * @param {*} value
         */
        adjust(value) {
            const oldValue = this.currentValue;

            let cancel = false;
            this.$emit('before-adjust', {
                value,
                oldValue,
                formattedValue: this.currentFormatter.format(value),
                preventDefault: () => cancel = true,
            }, this);
            if (cancel)
                return;

            this.input(value);
            this.$emit('adjust', {
                value: this.currentValue,
                oldValue,
                formattedValue: this.formattedValue,
            }, this);
        },
        increase() {
            this.adjust(+this.currentValue + this.step);
        },
        decrease() {
            this.adjust(+this.currentValue - this.step);
        },
        onInput(value) {
            if (this.fixOn === 'input')
                this.debouncedInput(this.currentFormatter.parse(value));
            else if (this.fixOn === 'blur') {
                // 这种情况下直接透传
                this.formattedValue = value;
                this.$emit('input', value, this);
                this.$emit('update:value', value, this);
            }
        },
        onFocus(e) {
            this.$emit('focus', e, this);
        },
        onBlur(e) {
            if (this.fixOn === 'blur')
                this.input(this.currentFormatter.parse(this.formattedValue));

            this.$emit('blur', e, this);
        },
    },
};

export { UNumberInput };
export default UNumberInput;
