### 基本用法

下面展示了复合模式的一些基本特性。

``` html
<m-complex>
    <m-complex-item>水杯</m-complex-item>
    <m-complex-item>咖啡</m-complex-item>
    <m-complex-item disabled>坚果</m-complex-item>
    <m-complex-item>毛巾</m-complex-item>
    <m-complex-item>沙发</m-complex-item>
</m-complex>
```

### 选项值

绑定`value`属性，可以用`v-model`或`:value.sync`。

#### 单选模式

``` vue
<template>
<m-complex v-model="value">
    <m-complex-item value="cup">水杯</m-complex-item>
    <m-complex-item value="coffee">咖啡</m-complex-item>
    <m-complex-item value="nut">坚果</m-complex-item>
    <m-complex-item value="towel">毛巾</m-complex-item>
    <m-complex-item value="sofa">沙发</m-complex-item>
</m-complex>
</template>
<script>
export default {
    data() {
        return {
            value: 'towel',
        };
    },
};
</script>
```

#### 多选模式

``` vue
<template>
<m-complex multiple v-model="values">
    <m-complex-item value="cup">水杯</m-complex-item>
    <m-complex-item value="coffee">咖啡</m-complex-item>
    <m-complex-item value="nut">坚果</m-complex-item>
    <m-complex-item value="towel">毛巾</m-complex-item>
    <m-complex-item value="sofa">沙发</m-complex-item>
</m-complex>
</template>
<script>
export default {
    data() {
        return {
            values: ['nut', 'towel'],
        };
    },
};
</script>
```

### 只读、禁用、禁用某一项

``` html
<u-grid-layout>
    <u-grid-layout-column :span="4">
        <m-complex value="towel" readonly>
            <m-complex-item value="cup">水杯</m-complex-item>
            <m-complex-item value="coffee">咖啡</m-complex-item>
            <m-complex-item value="nut">坚果</m-complex-item>
            <m-complex-item value="towel">毛巾</m-complex-item>
            <m-complex-item value="sofa">沙发</m-complex-item>
        </m-complex>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <m-complex value="towel" disabled>
            <m-complex-item value="cup">水杯</m-complex-item>
            <m-complex-item value="coffee">咖啡</m-complex-item>
            <m-complex-item value="nut">坚果</m-complex-item>
            <m-complex-item value="towel">毛巾</m-complex-item>
            <m-complex-item value="sofa">沙发</m-complex-item>
        </m-complex>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <m-complex value="towel">
            <m-complex-item value="cup">水杯</m-complex-item>
            <m-complex-item value="coffee">咖啡</m-complex-item>
            <m-complex-item value="nut" disabled>坚果</m-complex-item>
            <m-complex-item value="towel" disabled>毛巾</m-complex-item>
            <m-complex-item value="sofa">沙发</m-complex-item>
        </m-complex>
    </u-grid-layout-column>
</u-grid-layout>
```

其它与 [MSinglex](../m-singlex) 和 [MMultiplex](../m-multiplex) 相同的。
