# UTransfer 穿梭框

## 示例
### 基本用法

``` vue
<template>
<u-transfer :source="source" :target="target">
</u-transfer>
</template>
<script>
export default {
    data() {
        return {
            source: [
                { text: '水杯', value: 'cup' },
                { text: '坚果', value: 'nut' },
                { text: '毛巾', value: 'towel' },
                { text: '沙发', value: 'sofa' },
                { text: '牙刷', value: 'toothbrush' },
                { text: '碗', value: 'bowl' },
            ],
            target: [],
        };
    },
};
</script>
```

### 禁用某一项

``` vue
<template>
<u-transfer :source="source" :target="target">
</u-transfer>
</template>
<script>
export default {
    data() {
        return {
            source: [
                { text: '水杯', value: 'cup' },
                { text: '坚果', value: 'nut' },
                { text: '毛巾', value: 'towel' },
                { text: '沙发', value: 'sofa', disabled: true },
                { text: '牙刷', value: 'toothbrush', disabled: true },
                { text: '碗', value: 'bowl' },
            ],
            target: [],
        };
    },
};
</script>
```

## API
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| source | Array\<{ text, value }\> | | 原数据列表 |
| target | Array\<{ text, value }\> | | 目标数据列表 |
| readonly | Boolean | `false` | 是否只读 |
| disabled | Boolean | `false` | 是否禁用 |

### Slots

#### (default)

### Events

#### @transfer

数据转移时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.source | Array\<{ text, value }\> | 原数据列表 |
| $event.target | Array\<{ text, value }\> | 目标数据列表 |
| $event.transfer | Array\<{ text, value }\> | 移动的项 |
| $event.transferValues | Array | 移动项的值 |
| senderVM | Vue | 发送事件实例 |

#### @change

数据改变时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.source | Array\<{ text, value }\> | 原数据列表 |
| $event.target | Array\<{ text, value }\> | 目标数据列表 |
| $event.transfer | Array\<{ text, value }\> | 移动的项 |
| $event.transferValues | Array | 移动项的值 |
| senderVM | Vue | 发送事件实例 |
