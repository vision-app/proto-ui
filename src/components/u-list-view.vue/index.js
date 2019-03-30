import { MComplex } from '../m-complex.vue';
import { MGroupParent } from '../m-group.vue';
import MField from '../m-field.vue';
import DataSource from '../../utils/DataSource';
import debounce from 'lodash/debounce';

export const UListView = {
    name: 'u-list-view',
    groupName: 'u-list-view-group',
    childName: 'u-list-view-item',
    mixins: [MComplex, MGroupParent, MField],
    model: 'value',
    props: {
        // @inherit: value: null,
        // @inherit: values: Array,
        field: { type: String, default: 'text' },
        data: Array,
        dataSource: [DataSource, Function, Object],
        // @inherit: cancelable: { type: Boolean, default: false },
        // @inherit: multiple: { type: Boolean, default: false },
        // @inherit: collapsible: { type: Boolean, default: false },
        // @inherit: accordion: { type: Boolean, default: false },
        // @inherit: expandTrigger: { type: String, default: 'click' },
        // @inherit: readonly: { type: Boolean, default: false },
        // @inherit: disabled: { type: Boolean, default: false },
        loadingText: { type: String, default: '加载中...' },
        initialLoad: { type: Boolean, default: true },
        pageable: { type: Boolean, default: false },
        pageSize: { type: Number, default: 50 },
        remotePaging: { type: Boolean, default: false },
    },
    data() {
        return {
            ChildComponent: this.$options.childName,
            // @inherit: groupVMs: [],
            // @inherit: itemVMs: [],
            // @inherit: selectedVM: undefined,
            // @inherit: selectedVMs: undefined,
            // @inherit: currentMultiple: this.multiple,
            // currentData: undefined,
            currentDataSource: undefined,
            loading: false,
            promiseSequence: Promise.resolve(),
        };
    },
    computed: {
        currentData() {
            return this.currentDataSource && this.currentDataSource.viewData;
        },
        paging() {
            if (this.pageable) {
                const paging = {};
                paging.size = this.pageSize;
                paging.number = paging.number || 1;
                return paging;
            } else
                return undefined;
        },
    },
    watch: {
        data(data) {
            this.handleData();
        },
        dataSource(dataSource) {
            this.handleData();
        },
        paging(paging) {
            this.currentDataSource.paging = paging;
        },
        itemVMs(itemVMs, oldVMs) {
            if (this.data || this.dataSource)
                return;

            MComplex.watch.itemVMs.call(this, itemVMs, oldVMs);
        },
    },
    created() {
        this.debouncedLoad = debounce(this.load, 300);
        this.currentDataSource = this.normalizeDataSource(this.dataSource || this.data);
        this.initialLoad && this.load();
    },
    methods: {
        handleData() {
            // @TODO: undefined or null
            this.currentDataSource = this.normalizeDataSource(this.dataSource || this.data);
            this.load().then(() => {
                // 更新列表之后，原来的选择可能已不存在，这里暂存然后重新查找一遍
                MComplex.watch.itemVMs.call(this, this.itemVMs);
            });
        },
        getExtraParams() {
            return undefined;
        },
        getDataSourceOptions() {
            return {
                viewMode: 'more',
                paging: this.paging,
                remotePaging: this.remotePaging,
                getExtraParams: this.getExtraParams,
            };
        },
        normalizeDataSource(dataSource) {
            const options = this.getDataSourceOptions();

            if (dataSource instanceof DataSource)
                return dataSource;
            else if (dataSource instanceof Array) {
                options.data = dataSource;
                return new DataSource(options);
            } else if (dataSource instanceof Function) {
                options.load = function load(params) {
                    const result = dataSource(params);

                    if (result instanceof Promise)
                        return result.catch(() => this.loading = false);
                    else if (result instanceof Array)
                        return Promise.resolve(result);
                    else
                        throw new TypeError('Wrong type of `dataSource.fetch` result!');
                };
                return new DataSource(options);
            } else if (dataSource instanceof Object) {
                return new DataSource(Object.assign(options, dataSource));
            } else
                return undefined;
        },
        shift(count) {
            let selectedIndex = this.itemVMs.indexOf(this.selectedVM);
            if (count > 0) {
                for (let i = selectedIndex + count; i < this.itemVMs.length; i++) {
                    const itemVM = this.itemVMs[i];
                    if (!itemVM.disabled) {
                        this.selectedVM = itemVM;
                        this.$emit('shift', {
                            selectedIndex,
                            selectedVM: itemVM,
                            value: itemVM.value,
                        }, this);
                        this.ensureFocusedInView();
                        break;
                    }
                }
            } else if (count < 0) {
                if (selectedIndex === -1)
                    selectedIndex = this.itemVMs.length;
                for (let i = selectedIndex + count; i >= 0; i--) {
                    const itemVM = this.itemVMs[i];
                    if (!itemVM.disabled) {
                        this.selectedVM = itemVM;
                        this.$emit('shift', {
                            selectedIndex,
                            selectedVM: itemVM,
                            value: itemVM.value,
                        }, this);
                        this.ensureFocusedInView();
                        break;
                    }
                }
            }
        },
        ensureFocusedInView(natural) {
            const focusedVM = this.focusedVM || this.selectedVM;
            if (!focusedVM)
                return;
            const focusedEl = focusedVM.$el;
            if (!focusedEl)
                return;
            const parentEl = focusedEl.parentElement;
            if (!parentEl)
                return;

            const selectedIndex = this.itemVMs.indexOf(focusedVM);
            if (parentEl.scrollTop < focusedEl.offsetTop + focusedEl.offsetHeight - parentEl.clientHeight) {
                if (natural)
                    parentEl.scrollTop = focusedEl.offsetTop - focusedEl.offsetHeight;
                else
                    parentEl.scrollTop = focusedEl.offsetTop + focusedEl.offsetHeight - parentEl.clientHeight;
                if (selectedIndex === this.itemVMs.length - 1) {
                    this.pageable && this.load(true);
                    // 保证显示加载中，但又不是全部数据
                    this.$nextTick(() => parentEl.scrollTop = parentEl.scrollHeight - parentEl.clientHeight);
                }
            }
            if (parentEl.scrollTop > focusedEl.offsetTop)
                parentEl.scrollTop = focusedEl.offsetTop;
        },
        ensureSelectedInItemVMs() {
            MComplex.watch.itemVMs.call(this, this.itemVMs);
        },
        load(more) {
            const dataSource = this.currentDataSource;
            if (!dataSource)
                return;

            // @TODO: dataSource 的多次 promise 必须串行
            return this.promiseSequence = this.promiseSequence.then(() => {
                this.loading = true;
                return dataSource[more ? 'loadMore' : 'load']().then((data) => {
                    this.loading = false;
                    this.ensureSelectedInItemVMs();
                    return data;
                }).catch(() => this.loading = false);
            });
        },
        reload() {
            return this.currentDataSource && this.currentDataSource.reload();
        },
        onScroll(e) {
            if (!this.pageable)
                return;

            const el = e.target;
            if (el.scrollHeight === el.scrollTop + el.clientHeight
                && this.currentDataSource && this.currentDataSource.hasMore())
                this.debouncedLoad(true);
        },
    },
};

export * from './item.vue';
export * from './group.vue';
export * from './divider.vue';

export default UListView;