import CascadeSelect from '../u-cascade-select.vue';

export default {
    name: 'u-region-select',
    extends: CascadeSelect,
    props: {
        field: { type: String, default: 'value' },
        categories: { type: Array, default() {
            return [
                { label: '省' },
                { label: '市' },
                { label: '区' },
            ];
        } },
    },
    created() {
        import('./region.json').then((region) => this.currentData = region);
    },
};
