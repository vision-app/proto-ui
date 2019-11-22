# MComplex 复合模式

一个组件中，通过`multiple`属性切换单选还是多选的模式。

## 基础示例

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

## API

## MComplex

继承 [MSinglex](../m-singlex)、[MMultiplex](../m-multiplex)。

### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| value.sync, v-model | Any | | 当前选择的值 |
| auto-select | Boolean | `false` | 是否自动选择第一个非禁用的项 |
| cancelable | Boolean | `false` | 是否可以取消选择 |
| multiple | Boolean | `false` | 是否切换为多选模式 |
| readonly | Boolean | `false` | 是否只读 |
| disabled | Boolean | `false` | 是否禁用 |

### Slots

#### (default)

插入`<m-complex-item>`子组件。

### Events

#### @before-select

选择某一项前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Any | 选择项的值 |
| $event.oldValue | Any | 旧的值 |
| $event.item | Object | 选择项相关对象 |
| $event.itemVM | MComplexItem | 选择项子组件 |
| $event.preventDefault | Function | 阻止选择流程 |
| senderVM | MComplex | 发送事件实例 |

#### @input

选择某一项时触发，仅在单选模式中生效

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | Any | 选择项的值 |
| senderVM | MComplex | 发送事件实例 |

#### @select

选择某一项时触发

单选模式中：

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Any | 改变后的值 |
| $event.oldValue | Any | 旧的值 |
| $event.item | Object | 选择项相关对象 |
| $event.oldItem | Object | 旧的选择项相关对象 |
| $event.itemVM | MComplexItem | 选择项子组件 |
| $event.oldVM | MComplexItem | 旧的选择项子组件 |
| senderVM | MComplex | 发送事件实例 |

#### @select

多选模式中：

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.selected | Boolean | 选中还是取消 |
| $event.item | Boolean | 该选中项相关对象 |
| $event.itemVM | Boolean | 该选中项子组件 |
| $event.value | Array | 改变后的值 |
| $event.oldValue | Array | 旧的值 |
| $event.items | Array\<Object\> | 所有选中项相关对象的数组 |
| $event.oldItems | Array\<Object\> | 旧的所有选中项相关对象的数组 |
| $event.itemVMs | Array\<MComplexItem\> | 所有选中项子组件的数组 |
| $event.oldVMs | Array\<MComplexItem\> | 旧的所有选中项子组件的数组 |
| senderVM | MComplex | 发送事件实例 |

#### @change

选择值改变时触发

单选模式中：

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Any | 选择项的值 |
| $event.oldValue | Any | 旧的值 |
| $event.item | Object | 选择项相关对象 |
| $event.oldItem | Object | 旧的选择项相关对象 |
| $event.itemVM | MComplexItem | 选择项子组件 |
| $event.oldVM | MComplexItem | 旧的选择项子组件 |
| senderVM | MComplex | 发送事件实例 |

#### @change

多选模式中：

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Array | 所有选中项的值 |
| $event.items | Array\<Object\> | 所有选中项相关对象的数组 |
| $event.itemVMs | Array\<MComplexItem\> | 所有选中项子组件的数组 |
| senderVM | MComplex | 发送事件实例 |

## MComplexItem

继承 [MSinglexItem](../m-singlex#MSinglexItem)、[MMultiplexItem](../m-multiplex/api#MMultiplexItem)。

### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| value | Any | | 此项的值 |
| selected | Boolean | `false` | 是否选中此项 |
| disabled | Boolean | `false` | 禁用此项 |
| item | Object | | 相关对象。当选择此项时，抛出的事件会传递该对象，便于开发 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @click

点击此项时触发，与原生 click 事件不同的是，它只会在非只读和禁用的情况下触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | MouseEvent | 鼠标事件对象 |
| senderVM | MComplexItem | 发送事件实例 |

#### @before-select

选择此项前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Any | 此项的值 |
| $event.item | Object | 此项的相关对象 |
| $event.itemVM | MComplexItem | 此组件 |
| $event.preventDefault | Function | 阻止选择流程 |
| senderVM | MComplexItem | 发送事件实例 |
