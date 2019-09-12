### 基本用法

大部分属性与原生`<input>`控件一致。

``` html
<u-input maxlength="12" placeholder="请输入" autofocus></u-input>
```

### 加密

将`type`属性设置为`password`用于加密显示。

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

### 可清空

开启`clearable`属性，在输入框有内容时会显示清空按钮。

``` html
<u-input value="可清空" clearable></u-input>
```

### 重置

调用`reset`方法，会使组件重置为`default-value`所设置的值。

``` vue
<template>
<u-linear-layout>
    <u-input ref="input1" v-model="value1" maxlength="12" placeholder="请输入"></u-input>
    <u-input ref="input2" v-model="value2" default-value="默认值" maxlength="12" placeholder="请输入"></u-input>
    <u-button @click="reset">重置</u-button>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value1: '当前的值',
            value2: '当前的值',
        };
    },
    methods: {
        reset() {
            this.$refs.input1.reset();
            this.$refs.input2.reset();
        },
    },
};
</script>
```

### 展示方式

默认为行内展示，可以将`display`设置为块级展示。

``` html
<u-linear-layout direction="vertical" gap="small">
    <u-input maxlength="12" placeholder="行内展示（默认）"></u-input> 与文字对齐
    <u-input display="block" maxlength="12" placeholder="块级展示"></u-input>
</u-linear-layout>
```

### 自定义样式

``` vue
<template>
<u-linear-layout>
    <u-input :class="$style.custom" maxlength="12" placeholder="class"></u-input>
    <u-input style="background: #f7f8fc; width: 200px;" maxlength="12" placeholder="style"></u-input>
</u-linear-layout>
</template>

<style module>
.custom {
    background: #f7f8fc;
    width: 60px;
}
</style>
```
