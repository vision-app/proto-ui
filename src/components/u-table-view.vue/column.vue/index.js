import { MEmitter } from '../../m-emitter.vue';
import { Formatter, parseFormatters, placeholderFormatter } from '../../../utils/Formatters';

export const UTableViewColumn = {
    name: 'u-table-view-column',
    parentName: 'u-table-view',
    mixins: [MEmitter],
    props: {
        title: String,
        field: String,
        width: [String, Number],
        sortable: { type: Boolean, default: false },
        defaultOrder: String,
        ellipsis: { type: Boolean, default: false },
        formatter: { type: [String, Object, Formatter], default: 'placeholder' },
    },
    data() {
        const data = {
            parentVM: undefined,
            tempWidth: this.width + '',
            currentWidth: this.width,
            currentFormatter: undefined,
        };

        if (this.formatter instanceof Object)
            data.currentFormatter = this.formatter;
        else if (typeof this.formatter === 'string') {
            console.log(this.formatter);
            data.currentFormatter = {
                _format: parseFormatters(this.formatter),
                format(value) {
                    return this._format(value);
                },
            };
        } else
            data.currentFormatter = placeholderFormatter;

        return data;
    },
    created() {
        !this.parentVM && this.$contact(this.$options.parentName, (parentVM) => {
            this.parentVM = parentVM;
            parentVM.columnVMs.push(this);
        });
    },
    destroyed() {
        this.$contact(this.$options.parentName, (parentVM) => {
            parentVM.columnVMs.splice(parentVM.columnVMs.indexOf(this), 1);
            this.parentVM = undefined;
        });
    },
};

export default UTableViewColumn;
