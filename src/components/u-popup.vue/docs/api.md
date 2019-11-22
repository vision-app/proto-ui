## UPopup API
### Props/Attrs

| Attr/Prop | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| title | String | `'标题'` | 弹出框标题 |
| opened.sync | Boolean | `false` | 弹出/关闭状态 |
| trigger | String | `'click'` | 弹出框的触发方式。可选值：`'click'`, `'hover'`, `'right-click'`, `'double-click'`, `'manual'` |
| placement | String | `'bottom'` | 弹出框的弹出方向。可选值：`'top'`, `'bottom'`, `'left'`, `'right'`, `'top-start'`, `'top-end'`, `'bottom-start'`, `'bottom-end'`, `'left-start`',` 'left-end'`, `'right-start'`, `'right-end'` |
| hideDelay | Number | `0` | 提示内容消失延迟时间，单位是`'ms'` |
| offset | String | `'0'` | 弹出层偏移，如：'10', '10px 10px', '10% 10%', 第一个值表示水平偏移，第二个值表示垂直位移, 默认单位是`px` |
| follow-cursor | Boolean, Number, Object | `false` | 是否跟随鼠标 |
| disabled | Boolean | `false` | 是否禁用 |
| merge-borders | Boolean | `true` | 是否自动合并内外边框 |

### Slots

#### (default)

自定义弹出的内容。

#### root

自定义整个弹出层。

#### head

自定义头部。

#### body

自定义中部。

#### foot

自定义尾部。

#### title

自定义标题文本。

### Events

#### @before-open

弹出前触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.preventDefault | Function | 阻止弹出流程 |
| senderVM | UPopup | 发送事件实例 |

#### @open

弹出时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | | 空 |
| senderVM | UPopup | 发送事件实例 |

#### @before-close

隐藏前触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.preventDefault | Function | 阻止隐藏流程 |
| senderVM | UPopup | 发送事件实例 |

#### @close

隐藏时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | | 空 |
| senderVM | UPopup | 发送事件实例 |

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
