# UInput 单行输入

<s-component-labels :labels="[
    'UI 组件', '表单控件', '行内展示',
]"></s-component-labels>

基本的表单输入组件，在原生`<input>`控件基础上进行了一些功能扩展。

## 基础示例

### 基本用法

大部分属性与原生`<input>`控件一致。

``` html
<u-input maxlength="12" placeholder="1~12位小写字母" autofocus></u-input>
```

### 加密

将`type`属性设置为`password`可以加密显示。

``` html
<u-input type="password" maxlength="12" placeholder="请输入密码"></u-input>
```

### 双向绑定

使用`v-model`或`:value.sync`进行双向绑定。

提示：如果需要绑定的值自动转换为 number 类型，可以使用`number`修饰符。

``` vue
<template>
<u-linear-layout>
    <u-input v-model="value" maxlength="12" placeholder="请输入端口号"></u-input>
    <u-input :value.sync="value" maxlength="12" placeholder="请输入端口号"></u-input>
    <u-input v-model.number="numberValue" maxlength="12" placeholder="请输入端口号"></u-input>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: '3306',
            numberValue: 3306,
        };
    },
};
</script>
```

### 只读和禁用

``` html
<u-linear-layout>
    <u-input value="只读" readonly></u-input>
    <u-input value="禁用" disabled></u-input>
</u-linear-layout>
```

### 可清除

开启`clearable`属性，在输入框有内容时会显示清空按钮。

``` html
<u-input value="可清除" clearable></u-input>
```

### 展示方式

默认为行内展示，可以将`display`设置为块级展示。

``` html
<u-linear-layout direction="vertical" gap="small">
    <u-input maxlength="12" placeholder="行内展示（默认）"></u-input> 与文字对齐
    <u-input display="block" maxlength="12" placeholder="块级展示"></u-input>
</u-linear-layout>
```

## UInput
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| type | String | `'text'` | 输入框的类型，目前支持两种：`'text'`和`'password'` |
| value.sync, v-model | String | | 输入框的值 |
| default-value.sync, v-model | String | | 默认值。即 reset 方法恢复的值。 |
| clearable | Boolean | | 是否可清空。开启并在输入框有内容时会显示清空按钮。 |
| placeholder | String | | 原生属性。对 IE9 做了兼容。 |
| minlength | Number | | 原生属性 |
| maxlength | Number | | 原生属性 |
| spellcheck | Boolean | | 原生属性 |
| autofocus | Boolean | | 是否自动获取焦点 |
| readonly | Boolean | `false` | 是否只读 |
| disabled | Boolean | `false` | 是否禁用 |

### Events
#### @input

输入时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | String | 输入框的值 |
| senderVM | UInput | 发送事件实例 |

#### @change

值变化时触发。（注意：与原生事件不同）

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | String | 改变后的值 |
| $event.oldValue | String | 旧的值 |
| senderVM | UInput | 发送事件实例 |

#### @focus

获得焦点时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | FocusEvent | 原生事件对象 |
| senderVM | UInput | 发送事件实例 |

#### @blur

失去焦点时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | FocusEvent | 原生事件对象 |
| senderVM | UInput | 发送事件实例 |

#### @before-clear

清空前触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | String | 清空后的值 |
| $event.oldValue | String | 待清空的值 |
| $event.preventDefault | Function | 阻止清空流程 |
| senderVM | UInput | 发送事件实例 |

#### @clear

清空时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | String | 清空后的值 |
| $event.oldValue | String | 旧的值 |
| senderVM | UInput | 发送事件实例 |

#### @before-reset

重置前触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | String | 重置后的值 |
| $event.oldValue | String | 待重置的值 |
| $event.preventDefault | Function | 阻止重置流程 |
| senderVM | UInput | 发送事件实例 |

#### @reset

重置时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | String | 重置后的值 |
| $event.oldValue | String | 旧的值 |
| senderVM | UInput | 发送事件实例 |

### Methods

#### focus()

让输入框获取焦点。

| Param | Type | Description |
| ----- | ---- | ----------- |

#### blur()

让输入框失去焦点。

| Param | Type | Description |
| ----- | ---- | ----------- |

#### clear()

清空输入框。

| Param | Type | Description |
| ----- | ---- | ----------- |

#### reset()

重置输入框。

| Param | Type | Description |
| ----- | ---- | ----------- |
