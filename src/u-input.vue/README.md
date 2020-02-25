# 单行输入 Input

## 示例
### 基本形式

大部分属性与`<input>`元素一致。

``` html
<u-input maxlength="12" placeholder="1~12位小写字母" autofocus></u-input>
```

### 加密

``` html
<u-input type="password" maxlength="12" placeholder="请输入密码"></u-input>
```

### 数字

使用`v-model`的`number`修饰符，可以轻松将输入值转成number类型。

``` vue
<template>
<div>
    <u-input v-model.number="value" maxlength="12" placeholder="请输入端口号" @input="onInput"></u-input>
    输出：{{ output }}
</div>
</template>

<script>
export default {
    data() {
        return {
            value: 3306,
            output: '',
        };
    },
    methods: {
        onInput(value) {
            this.output = JSON.stringify({
                inputValue: value,
                modelValue: this.value,
            });
        },
    },
};
</script>
```

### 只读与禁用

``` html
<u-linear-layout>
    <u-input value="只读" readonly></u-input>
    <u-input value="禁用" disabled></u-input>
</u-linear-layout>
```

### 自动扩展大小

``` vue
<template>
<u-linear-layout>
    <u-input v-model="value" auto-size="horizontal"></u-input>
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

<style module>
.custom {
    background: #f7f8fc;
    width: 60px;
}
</style>
```

## API
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| type | String | `'text'` | 输入框的类型，目前只支持两种：`'text'`和`'password'` |
| value.sync, v-model | String | | 输入框的值 |
| placeholder | String | | 原生属性 |
| minlength | Number | | 原生属性 |
| maxlength | Number | | 原生属性 |
| autofocus | Boolean | | 原生属性 |
| readonly | Boolean | `false` | 是否只读 |
| disabled | Boolean | `false` | 是否禁用 |
| size | String | `'normal'` | 大小扩展，支持一个值：`'mini'`, `'small'`, `'normal'`, `'large'`, `'huge'`, `'full'`，或两个值的组合，前者表示高度，后者表示宽度，类似CSS的padding书写格式 |

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
