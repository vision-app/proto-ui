# MPopper 弹出层

## 基础示例

### 基本用法

将需要弹出的内容用`<m-popper>`包裹起来，并插入到触发事件的元素中。

``` html
<u-button>
    click
    <m-popper>
        <u-block>popper</u-block>
    </m-popper>
</u-button>
```

### 触发方式

#### 自动触发

``` html
<u-linear-layout>
    <u-button>
        click（默认）
        <m-popper trigger="click">
            <u-block>popper</u-block>
        </m-popper>
    </u-button>
    <u-button>
        hover
        <m-popper trigger="hover">
            <u-block>popper</u-block>
        </m-popper>
    </u-button>
    <u-button>
        right-click
        <m-popper trigger="right-click">
            <u-block>popper</u-block>
        </m-popper>
    </u-button>
    <u-button>
        double-click
        <m-popper trigger="double-click">
            <u-block>popper</u-block>
        </m-popper>
    </u-button>
</u-linear-layout>
```

#### 手动触发

也可以手动触发弹出层的弹出/关闭：

``` vue
<template>
<u-button @click="opened = !opened">
    {{ opened ? '隐藏' : '弹出' }}
    <m-popper trigger="manual" :opened.sync="opened">
        <u-block>popper</u-block>
    </m-popper>
</u-button>
</template>

<script>
export default {
    data() {
        return {
            opened: false,
        };
    },
};
</script>
```

#### Hover 的显隐时间

``` html
<u-button>
    hover
    <m-popper trigger="hover" :hover-delay="200" :hide-delay="1000">
        <u-block>popper</u-block>
    </m-popper>
</u-button>
```

### 弹出方位

``` html
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-button>
            top-start
            <m-popper placement="top-start">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            top
            <m-popper placement="top">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            top-end
            <m-popper placement="top-end">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button>
            left-start
            <m-popper placement="left-start">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            left
            <m-popper placement="left">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            left-end
            <m-popper placement="left-end">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button>
            right-start
            <m-popper placement="right-start">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            right
            <m-popper placement="right">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            right-end
            <m-popper placement="right-end">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button>
            bottom-start
            <m-popper placement="bottom-start">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            bottom
            <m-popper placement="bottom">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            bottom-end
            <m-popper placement="bottom-end">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
</u-linear-layout>
```

### 跟随鼠标

将`'follow-cursor'`属性设置为`true`可以跟随鼠标。也可以传一个数字或对象调整位置偏移。

``` html
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-button>
            top-start
            <m-popper trigger="hover" placement="top-start" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            top
            <m-popper trigger="hover" placement="top" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            top-end
            <m-popper trigger="hover" placement="top-end" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button>
            left-start
            <m-popper trigger="hover" placement="left-start" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            left
            <m-popper trigger="hover" placement="left" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            left-end
            <m-popper trigger="hover" placement="left-end" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button>
            right-start
            <m-popper trigger="hover" placement="right-start" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            right
            <m-popper trigger="hover" placement="right" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            right-end
            <m-popper trigger="hover" placement="right-end" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button>
            bottom-start
            <m-popper trigger="hover" placement="bottom-start" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            bottom
            <m-popper trigger="hover" placement="bottom" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
        <u-button>
            bottom-end
            <m-popper trigger="hover" placement="bottom-end" follow-cursor>
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
    <u-linear-layout>
        <u-button>
            custom
            <m-popper trigger="hover" placement="bottom-start" :follow-cursor="50">
                <u-block>popper</u-block>
            </m-popper>
        </u-button>
    </u-linear-layout>
</u-linear-layout>
```

### 禁用

``` html
<u-button disabled>
    disabled
    <m-popper disabled>
        <u-block>popper</u-block>
    </m-popper>
</u-button>
```

## MPopper
### Props/Attrs

| Attr/Prop | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| opened.sync | Boolean | `false` | 弹出/关闭状态 |
| trigger | String | `'click'` | 触发方式。可选值：`'click'`, `'hover'`, `'right-click'`, `'double-click'`, `'manual'` |
| reference | String, HTMLElement, Function | `'parent'` | 参考元素。可选值：`'parent'`表示父元素，`'prev'`表示上一个元素，`'next'`表示下一个元素。也可以传一个 HTML 元素，或用于返回元素的方法 |
| placement | String | `'bottom'` | 弹出方位。可选值：`'top'`, `'bottom'`, `'left'`, `'right'`, `'top-start'`, `'top-end'`, `'bottom-start'`, `'bottom-end'`, `'left-start`',` 'left-end'`, `'right-start'`, `'right-end'` |
| hover-delay | Number | `0` | 当 trigger 为 `'hover'` 时的延迟时间 |
| hide-delay | Number | `0` | 当 trigger 为 `'hover'` 时的隐藏延迟时间 |
| append-to | String | `'body'` | 设置添加到哪个元素。可选值：`'body'`表示添加到 document.body，`'reference'`表示添加到参考元素中 |
| boundaries-element | Element, String | `'window'` | 边际元素。用于定义弹出层的边际，默认为首个滚动的父级元素 |
| escape-with-reference | Boolean | `true` | 当触发元素离开边际时，弹出层离开/保留在边际元素内 |
| follow-cursor | Boolean, Number, Object | `false` | 是否跟随鼠标 |
| offset | String | `'0'` | 弹出层偏移，如：'10', '10px 10px', '10% 10%', 第一个值表示水平偏移，第二个值表示垂直位移, 默认单位是`px` |
| options | Object | `{ modifiers: {} }` | 补充 popper.js 的选项 |
| disabled | Boolean | `false` | 是否禁用 |

### Slots

#### (default)

插入需要弹出的内容。

### Events

#### @before-open

弹出前触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.preventDefault | Function | 阻止弹出流程 |
| senderVM | MPopper | 发送事件实例 |

#### @open

弹出时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | | 空 |
| senderVM | MPopper | 发送事件实例 |

#### @before-close

隐藏前触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.preventDefault | Function | 阻止隐藏流程 |
| senderVM | MPopper | 发送事件实例 |

#### @close

隐藏时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | | 空 |
| senderVM | MPopper | 发送事件实例 |

#### @before-toggle

@deprecated

#### @toggle

@deprecated

### Methods

#### open()

弹出实例。

| Param | Type | Description |
| ----- | ---- | ----------- |

#### close()

关闭实例。

| Param | Type | Description |
| ----- | ---- | ----------- |

#### toggle(opened?)

切换弹出/关闭状态。

| Param | Type | Description |
| ----- | ---- | ----------- |
| opened? | Boolean | 可选。弹出/关闭状态 |

#### update()

更新 popper 实例。参考 [Popper.update()](https://popper.js.org/popper-documentation.html#Popper.update)。

| Param | Type | Description |
| ----- | ---- | ----------- |

#### scheduleUpdate()

在下次 UI 渲染时一块更新 popper 实例，比`update()`性能要好。参考 [Popper.scheduleUpdate()](https://popper.js.org/popper-documentation.html#Popper.scheduleUpdate)。

| Param | Type | Description |
| ----- | ---- | ----------- |
