<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# USwitch 开关

**UI 组件**, **表单控件**, **行内展示**

## 示例
### 基本用法

``` html
<u-switch></u-switch>
```

### Value 绑定

``` vue
<template>
<u-switch v-model="value" width="wide">{{ value ? 'ON' : 'OFF' }}</u-switch>
</template>
<script>
export default {
    data() {
        return { value: false };
    },
};
</script>
```

### 只读和禁用

``` html
<u-linear-layout>
    <u-switch readonly></u-switch>
    <u-switch disabled></u-switch>
</u-linear-layout>
```

## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value | boolean |  | `false` | 开关状态 |
| readonly | boolean |  | `false` | 是否只读 |
| disabled | boolean |  | `false` | 是否禁用 |

### Slots

#### (default)



#### undefined

插入文本或HTML

### Events

#### @before-toggle

切换开关状态前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | boolean | 开关状态 |
| $event.oldValue | boolean | 旧的开关状态 |
| $event.preventDefault | Function | 阻止切换流程 |
| senderVM | USwitch | 发送事件实例 |

#### @input

切换开关状态时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | boolean | 切换后的开关状态 |
| senderVM | USwitch | 发送事件实例 |

#### @on

开关打开时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event |  | 无 |
| senderVM | USwitch | 发送事件实例 |

#### @off

开关关闭时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event |  | 无 |
| senderVM | USwitch | 发送事件实例 |

#### @toggle

切换开关状态时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | boolean | 开关状态 |
| $event.oldValue | boolean | 旧的开关状态 |
| senderVM | USwitch | 发送事件实例 |

#### @change

开关状态改变时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | boolean | 开关状态 |
| $event.oldValue | boolean | 旧的开关状态 |
| senderVM | USwitch | 发送事件实例 |
