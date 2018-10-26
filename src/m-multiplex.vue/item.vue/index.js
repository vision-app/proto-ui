import { MChild } from '../../m-parent.vue';
import ULink from '../../u-link.vue';
import { ellipsisTitle } from '../../directives';

const MMultiplexItem = {
    name: 'm-multiplex-item',
    parentName: 'm-multiplex',
    groupName: 'm-multiplex-group',
    mixins: [MChild, ULink],
    directives: { ellipsisTitle },
    props: {
        value: null,
        disabled: { type: Boolean, default: false },
        item: Object,
    },
    data() {
        return {
            currentSelected: false,
            // @inherit: parentVM: undefined,
        };
    },
    computed: {
        selected() {
            return this.parentVM.selectedVM === this;
        },
    },
    methods: {
        select(e) {
            if (this.disabled || this.parentVM.readonly || this.parentVM.disabled)
                return;

            this.$emit('click', e, this);

            let cancel = false;
            this.$emit('before-select', {
                value: this.value,
                item: this.item,
                itemVM: this,
                preventDefault: () => cancel = true,
            }, this);
            if (cancel)
                return;

            this.parentVM.select(this);
        },
    },
};

export { MMultiplexItem };
export default MMultiplexItem;
