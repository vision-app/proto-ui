import MEmitter from '../m-emitter.vue';

export const MDynamic = {
    name: 'm-dynamic',
    mixins: [MEmitter],
    props: {
        data: Array,
        dynamic: { type: Boolean, default: true },
        getDefaultItem: Function,
        minCount: { type: Number, default: 1 },
        maxCount: { type: Number, default: Infinity },
    },
    data() {
        return {
            currentData: this.data,
        };
    },
    watch: {
        data(data) {
            this.currentData = data;
        },
    },
    methods: {
        add() {
            const item = this.getDefaultItem ? this.getDefaultItem() : {};
            const index = this.currentData.length;
            if (this.$emitPrevent('before-add', {
                item,
                index,
            }, this))
                return;

            this.currentData.push(item);
            this.$emit('add', {
                item,
                index,
            }, this);
        },
        remove(index) {
            const item = this.currentData[index];
            if (this.$emitPrevent('before-remove', {
                item,
                index,
            }, this))
                return;

            this.currentData.splice(index, 1);
            this.$emit('remove', {
                item,
                index,
            }, this);
        },
    },
};

export default MDynamic;
