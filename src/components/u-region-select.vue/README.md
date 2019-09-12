# URegionSelect 地区选择

<s-component-labels :labels="[
    'UI 组件', '表单控件', '块级展示',
]"></s-component-labels>

该组件从 UCascadeSelect 继承，仅填充了中国的行政区数据，其他功能与 UCascadeSelect 相同。

## 示例
### 基本用法

``` html
<u-linear-layout direction="vertical">
    <u-region-select></u-region-select>
    <u-region-select value="浙江,杭州,滨江区"></u-region-select>
</u-linear-layout>
```

### 双向绑定

使用`v-model`进行双向绑定。

```vue
<template>
    <u-region-select v-model="address"></u-region-select>
</template>
<script>
export default {
    data() {
        return {
            address: '',
        };
    },
};
</script>
```

### Placeholder

``` html
<u-region-select :categories="[
    { label: '省', placeholder: '请选择省份' },
    { label: '市', placeholder: '请选择城市' },
    { label: '区', placeholder: '请选择县区' },
]"></u-region-select>
```

### 隐藏空列表

``` html
<u-region-select hide-empty :categories="[
    { label: '省', placeholder: '请选择省份' },
    { label: '市', placeholder: '请选择城市' },
    { label: '区', placeholder: '请选择县区' },
]"></u-region-select>
```


## API
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| data | Array\<{ text, value }\> | 数据 | 数据列表 |
| value.sync, v-model | Any | | 当前选择的值 |
| categories | Array\<{ label, key, placeholder }\> | 数据 | 多级分类 |
| hide-empty | Boolean | `false` | 是否隐藏空列表 |
| converter | String, Object | `'join'` | value 与 values 的转换器。可选值：`'join'`表示将 values 数组 join 之后变成 value，`'join.number'`与`join`类似，只是会考虑它为数字的情况。也可以用`:`修改分隔符，类似 Vue 的指令参数，`'last-value'`表示以最后一项的值作为 value。也可以传入一个包含 { get, set } 的一个对象 |
| field | String | `'value'` | 显示文本字段 |
| readonly | Boolean | `false` | 是否只读 |
| disabled | Boolean | `false` | 是否禁用 |

### Events

#### @input

选择某一项时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | Any | 选择项的值 |
| senderVM | URegionSelect | 发送事件实例 |

#### @select

选择某一项时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.level | Number | 选择的层级 |
| $event.value | Any | 改变后的值 |
| $event.values | Array | 改变后每项值的数组 |
| $event.item | Object | 选择项相关对象 |
| $event.itemVM | ListViewItem | 选择项子组件 |
| senderVM | URegionSelect | 发送事件实例 |

#### @change

选择值改变时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Any | 改变后的值 |
| $event.oldValue | Any | 旧的值 |
| $event.values | Array | 改变后每项值的数组 |
| $event.oldValues | Array | 旧的每项值的数组 |
| senderVM | URegionSelect | 发送事件实例 |
