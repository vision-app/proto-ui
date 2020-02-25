# 多行输入 Textarea

## 示例
### 基本形式

大部分属性与`<textarea>`元素一致。

``` html
<u-textarea placeholder="Details" autofocus></u-textarea>
```

### 只读与禁用

``` html
<u-linear-layout>
    <u-textarea value="只读" readonly></u-textarea>
    <u-textarea value="禁用" disabled></u-textarea>
</u-linear-layout>
```
### 调整大小

``` html
<u-linear-layout direction="vertical">
    <div><u-textarea value="none" resize="none"></u-textarea></div>
    <div><u-textarea value="vertical（默认）" resize="vertical"></u-textarea></div>
    <div><u-textarea value="horizontal" resize="horizontal"></u-textarea></div>
    <div><u-textarea value="both" resize="both"></u-textarea></div>
</u-linear-layout>
```

### 自动调整

``` vue
<template>
<u-linear-layout>
    <u-textarea v-model="value" auto-size="both"></u-textarea>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: 'abc',
        };
    },
};
</script>
```

## API
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| value | String | | 输入框的值 |
| placeholder | String | | 原生属性 |
| minlength | Number | | 原生属性 |
| maxlength | Number | | 原生属性 |
| autofocus | Boolean | | 原生属性 |
| readonly | Boolean | `false` | 是否只读 |
| disabled | Boolean | `false` | 是否禁用 |
| resize | String | `'none'` | 是否可以调整大小。可选值：`'none'`、`'both'`、`'horizontal'`、`'vertical'` |

<!-- | autosize | String | `'none'` | 自适应内容宽高。可选值：`none`、`both`、`horizontal`、`vertical` | -->


### Events
#### @input

输入时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | String | 输入框的值 |

#### @change

值变化时触发（与原生事件不同）

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | String | 改变后的值 |
| $event.oldValue | String | 旧的值 |

#### @focus

获得焦点时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | String | 原生事件对象 |

#### @blur

失去焦点时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | String | 原生事件对象 |
