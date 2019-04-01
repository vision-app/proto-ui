import { UListView } from '../u-list-view.vue';
import { ellipsisTitle } from '../../directives';
import i18n from './i18n';

export const USelect = {
    name: 'u-select',
    childName: 'u-select-item',
    groupName: 'u-select-group',
    extends: UListView,
    i18n,
    directives: { ellipsisTitle },
    props: {
        // @inherit: value: { type: String, default: '' },
        // @inherit: values: Array,
        // @inherit: field: { type: String, default: 'text' },
        // @inherit: data: Array,
        // @inherit: dataSource: [DataSource, Function],
        // @inherit: cancelable: { type: Boolean, default: false },
        // @inherit: multiple: { type: Boolean, default: false },
        // @inherit: keepOrder: { type: Boolean, default: false },
        multipleAppearance: { type: String, default: 'tags' },
        tagsOverflow: { type: String, default: 'visible' },
        autoSelect: { type: Boolean, default: false },
        placeholder: { type: String, default: '请选择' },
        clearable: { type: Boolean, default: false },
        filterable: { type: Boolean, default: false },
        matchMethod: { type: [String, Function], default: 'includes' },
        caseSensitive: { type: Boolean, default: false },
        // @inherit: loadingText: { type: String, default: '加载中...' },
        emptyText: { type: String, default() { return this.$t('emptyText'); } },
        // @inherit: initialLoad: { type: Boolean, default: true },
        // @inherit: pageable: { type: Boolean, default: false },
        // @inherit: pageSize: { type: Number, default: 50 },
        // @inherit: remotePaging: { type: Boolean, default: false },
        remoteFiltering: { type: Boolean, default: false },
        autoComplete: { type: Boolean, default: false },
        opened: { type: Boolean, default: false },
    },
    data() {
        return {
            // @inherit: ChildComponent: this.$options.childName,
            // @inherit: groupVMs: [],
            // @inherit: itemVMs: [],
            // @inherit: selectedVM: undefined,
            // @inherit: selectedVMs: undefined,
            focusedVM: undefined,
            // @inherit: currentMultiple: this.multiple,
            // @inherit: currentData: this.data,
            // @inherit: loading: false,
            currentText: '', // 显示文本
            filterText: '', // 过滤文本，只有 input 时会改变它
            // filtering: {},
            preventBlur: false,
            inputWidth: 20,
        };
    },
    computed: {
        filtering() {
            return {
                text: {
                    operator: this.matchMethod,
                    value: this.filterText,
                    caseInsensitive: !this.caseSensitive,
                },
            };
        },
    },
    watch: {
        value(value) {
            // 无需剪枝
            this.watchValue(value);
        },
        filtering: {
            handler(filtering) {
                // @TODO: 不知道为什么要监听一次，可能因为 dataSource 是重新创建的，不会自动绑定
                this.currentDataSource.filtering = filtering;
            },
            deep: true,
        },
        filterText(filterText) {
            this.inputWidth = filterText.length * 12 + 20;
        },
    },
    created() {
        this.$watch('selectedVM', (selectedVM) => {
            this.currentText = this.selectedVM ? this.selectedVM.currentText : '';
        });
        this.$watch('selectedVMs', (selectedVMs) => {
            this.currentText = selectedVMs.map((itemVM) => itemVM.currentText).join(', ');
            this.$refs.popper.currentOpened && this.$refs.popper.scheduleUpdate();
        });
        this.$on('select', ($event) => {
            if (!this.multiple)
                this.close();
            if (this.filterable) {
                this.filterText = this.selectedVM ? this.selectedVM.currentText : '';
                setTimeout(() => {
                    this.$refs.input.focus();
                    setTimeout(() => {
                        const inputEl = this.$refs.input.$refs.input;
                        inputEl.setSelectionRange(inputEl.value.length, inputEl.value.length);
                    });
                });
            }
        });
    },
    methods: {
        getExtraParams() {
            return {
                filterText: this.filterText,
            };
        },
        getDataSourceOptions() {
            return {
                viewMode: 'more',
                paging: this.paging,
                remotePaging: this.remotePaging,
                filtering: this.filtering,
                remoteFiltering: this.remoteFiltering,
                getExtraParams: this.getExtraParams,
            };
        },
        shift(count) {
            let focusedIndex = this.itemVMs.indexOf(this.focusedVM || this.selectedVM);
            if (count > 0) {
                for (let i = focusedIndex + count; i < this.itemVMs.length; i++) {
                    const itemVM = this.itemVMs[i];
                    if (!itemVM.disabled) {
                        this.focusedVM = itemVM;
                        this.$emit('shift', {
                            focusedIndex,
                            focusedVM: itemVM,
                            value: itemVM.value,
                        }, this);
                        this.ensureFocusedInView();
                        break;
                    }
                }
            } else if (count < 0) {
                if (focusedIndex === -1)
                    focusedIndex = this.itemVMs.length;
                for (let i = focusedIndex + count; i >= 0; i--) {
                    const itemVM = this.itemVMs[i];
                    if (!itemVM.disabled) {
                        this.focusedVM = itemVM;
                        this.$emit('shift', {
                            focusedIndex,
                            focusedVM: itemVM,
                            value: itemVM.value,
                        }, this);
                        this.ensureFocusedInView();
                        break;
                    }
                }
            }
        },
        open() {
            this.$refs.popper && this.$refs.popper.open();
        },
        close() {
            this.$refs.popper && this.$refs.popper.close();
        },
        toggle(opened) {
            this.$refs.popper && this.$refs.popper.toggle(opened);
        },
        onOpen($event) {
            // 刚打开时，除非是没有加载，否则保留上次的 filter 过的数据
            if (this.filterable && !this.currentDataSource.initialLoaded) {
                this.load().then(() => {
                    this.ensureFocusedInView(true);
                    this.$refs.input.focus();
                });
            } else
                setTimeout(() => this.ensureFocusedInView(true));

            this.$emit('open', $event, this);
        },
        onClose($event) {
            this.focusedVM = undefined;
            this.$emit('close', $event, this);
        },
        fastLoad(more) {
            return this.currentDataSource.mustRemote() ? this.debouncedLoad(more) : this.load(more);
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
                    this.$refs.popper.currentOpened && this.$refs.popper.scheduleUpdate();
                    return data;
                }).catch(() => this.loading = false);
            });
        },
        onFocus() {
            // @disabled
        },
        onInput(value) {
            if (!this.filterable)
                return;
            this.currentText = value;
            // value.split(',')
            this.filterText = value;
            if (this.$emitPrevent('before-filter', { filterText: value }, this))
                return;

            this.fastLoad();
            this.open();
        },
        onBlur() {
            if (!this.filterable)
                return;

            // 这边必须要用 setTimeout，$nextTick 也不行，需要保证在 @select 之后完成
            setTimeout(() => {
                if (this.preventBlur)
                    return this.preventBlur = false;
                this.selectByText(this.filterText);
            }, 200);
        },
        selectByText(text) {
            if (this.multiple) {
                const oldVMs = this.selectedVMs;
                const selectedVM = this.itemVMs.find((itemVM) => itemVM.currentText === text);

                // 如果没有匹配项则恢复到上一个状态
                if (!selectedVM && text) {
                    if (this.autoComplete) {
                        this.prependItem(text);
                        this.$nextTick(() => this.select(this.itemVMs[0], true));
                    } else {
                        this.filterText = '';
                        this.fastLoad(); // ensure
                    }
                } else {
                    if (oldVMs.some((itemVM) => itemVM.currentText === text)) {
                        this.filterText = '';
                        this.fastLoad(); // ensure
                        return;
                    }
                    this.select(selectedVM, true);
                }
            } else {
                const oldVM = this.selectedVM;
                if (!oldVM && !text)
                    return;
                else if (oldVM && text === oldVM.currentText)
                    return this.ensureSelectedInItemVMs();

                const selectedVM = this.itemVMs.find((itemVM) => itemVM.currentText === text);

                // 如果没有匹配项则恢复到上一个状态
                if (!selectedVM && text) {
                    if (this.autoComplete) {
                        this.prependItem(text);
                        this.$nextTick(() => this.select(this.itemVMs[0], false));
                    } else {
                        this.filterText = oldVM.currentText;
                        this.fastLoad(); // ensure
                    }
                } else
                    this.select(selectedVM, false);
            }
        },
        prependItem(text) {
            this.currentDataSource.prepend({ text, value: text });
        },
        onEnter() {
            if (this.focusedVM)
                this.select(this.focusedVM);
            this.close();
        },
        onInputEnter() {
            if (this.focusedVM)
                this.select(this.focusedVM);
            else
                this.selectByText(this.filterText);
            this.close();
        },
        onInputDelete() {
            if (this.filterable && this.filterText === '') {
                if (!this.selectedVMs.length)
                    return;
                const lastItemVM = this.selectedVMs[this.selectedVMs.length - 1];
                this.select(lastItemVM, false);
            }
        },
        clear() {
            this.preventBlur = true;

            if (this.multiple) {
                const oldValues = this.values;
                const values = [];

                if (this.$emitPrevent('before-clear', { oldValues, values }, this))
                    return;

                this.selectedVMs.forEach((itemVM) => itemVM.currentSelected = false);
                this.selectedVMs = [];
                this.filterText = '';
                this.fastLoad();
                this.$emit('update:values', values, this);

                this.$emit('clear', {
                    oldValues,
                    values,
                }, this);
            } else {
                const oldValue = this.value;
                const value = undefined;

                if (this.$emitPrevent('before-clear', { oldValue, value }, this))
                    return;

                this.selectedVM = undefined;
                this.filterText = '';
                this.fastLoad();
                this.$emit('input', value, this);
                this.$emit('update:value', value, this);

                this.$emit('clear', {
                    oldValue,
                    value,
                }, this);
            }

            this.focus();
        },
        focus() {
            if (this.filterable)
                this.$refs.input.focus();
        },
        blur() {
            if (this.filterable)
                this.$refs.input.blur();
        },
    },
};

export * from './item.vue';
export * from './group.vue';
export * from './divider.vue';

export default USelect;
