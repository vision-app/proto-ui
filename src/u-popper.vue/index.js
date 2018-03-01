import Vue from 'vue';
import Popper from 'popper.js';
import event from '../base/utils/event';

export default {
    name: 'u-popper',
    props: {
        open: { type: Boolean, default: false },
        trigger: { type: String, default: 'click', validator: (value) => ['click', 'hover', 'right-click', 'double-click', 'manual'].includes(value) },
        placement: {
            type: String, default: 'bottom-start',
            validator: (value) => /^(top|bottom|left|right)(-start|-end)?$/.test(value),
        },
        reference: HTMLElement,
        offset: { type: Number, default: 0 },
        escapeWithReference: { type: Boolean, default: false },
        hoverDelay: { type: Number, default: 0 },
        boundariesElement: { default: 'scrollParent' },
        arrowElement: { type: String, default: '[u-arrow]' },
        appendTo: { type: String, default: 'body', validator: (value) => ['body', 'reference'].includes(value) },
        options: {
            type: Object,
            default() {
                return {
                    modifiers: {},
                };
            },
        },
        disabled: { type: Boolean, default: false },
    },
    data() {
        return {
            currentOpen: this.open,
        };
    },
    watch: {
        open(value) {
            this.currentOpen = value;
        },
        currentOpen(value) {
            // 不直接用样式的显隐，而用popper的create和destroy，popper有可能是从不同的地方触发的，reference对象会变
            value ? this.createPopper() : this.destroyPopper();
        },
    },
    render() {
        return this.$slots.default && this.$slots.default[0];
    },
    mounted() {
        // 创建VNode
        /* eslint-disable consistent-this */
        const parentVM = this;
        this.childVM = new Vue({
            name: 'u-popper-child',
            render(h) { return parentVM.$slots.popper && parentVM.$slots.popper[0]; },
        });
        this.childVM.parentVM = parentVM;
        this.childVM.$mount();

        const referenceEl = this.reference || this.$el;
        const popperEl = this.childVM.$el;

        // 绑定事件
        const offEvents = this.offEvents = [];
        if (this.trigger === 'click')
            offEvents.push(event.on(referenceEl, 'click', () => this.toggle()));
        else if (this.trigger === 'hover') {
            offEvents.push(event.on(referenceEl, 'mouseenter', () => {
                setTimeout(() => this.toggle(true), this.hoverDelay);
            }));
            offEvents.push(event.on(document, 'mouseover', (e) => {
                !referenceEl.contains(e.target) && !popperEl.contains(e.target) && this.toggle(false);
            }));
        } else if (this.trigger === 'double-click')
            offEvents.push(event.on(referenceEl, 'dblclick', () => this.toggle()));
        else if (this.trigger === 'right-click') {
            offEvents.push(event.on(referenceEl, 'contextmenu', (e) => {
                e.preventDefault();
                this.toggle();
            }));
        }
        offEvents.push(event.on(document, 'click', (e) => {
            !referenceEl.contains(e.target) && !popperEl.contains(e.target) && this.toggle(false);
        }));
    },
    updated() {
        this.childVM.$forceUpdate();
    },
    destroyed() {
        this.destroyPopper();

        // 取消绑定事件
        this.offEvents.forEach((off) => off());

        this.childVM && this.childVM.destroy && this.childVM.destroy();
        this.childVM = undefined;
    },
    methods: {
        getOptions() {
            const options = Object.assign({}, this.options, {
                placement: this.placement,
            });

            options.modifiers.offset = this.offset;
            options.escapeWithReference = this.escapeWithReference;

            options.modifiers.arrow = { element: this.arrowElement };
            options.modifiers.preventOverflow = { boundariesElement: this.boundariesElement };

            return options;
        },
        createPopper() {
            const referenceEl = this.reference || this.$el;
            const popperEl = this.childVM.$el;
            if (this.appendTo === 'body')
                document.body.appendChild(popperEl);
            else if (this.appendTo === 'reference')
                referenceEl.appendChild(popperEl);

            const options = this.getOptions();
            this.popper = new Popper(referenceEl, popperEl, options);
        },
        update() {
            this.popper && this.popper.update();
        },
        destroyPopper() {
            const referenceEl = this.reference || this.$el;
            const popperEl = this.childVM.$el;
            if (this.appendTo === 'body')
                popperEl.parentElement === document.body && document.body.removeChild(popperEl);
            else if (this.appendTo === 'reference')
                popperEl.parentElement === referenceEl && referenceEl.removeChild(popperEl);

            this.popper && this.popper.destroy();
            this.popper = undefined;
        },
        toggle(open) {
            if (this.disabled)
                return;

            const oldOpen = this.currentOpen;

            if (open === undefined)
                open = !this.currentOpen;

            if (open === oldOpen)
                return;

            let cancel = false;
            this.$emit('before-toggle', {
                open,
                preventDefault: () => cancel = true,
            });
            if (cancel)
                return;

            this.currentOpen = open;
            this.$emit('update:open', open);
            this.$emit('toggle', {
                open,
            });
        },
    },
};
