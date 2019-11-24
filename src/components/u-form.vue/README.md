<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# UForm 表单

**UI 组件**, **表单验证器**, **块级展示**

具有数据收集、校验和提交功能的表单，包含输入框、选择框、复选框、单选框等元素。

### 相关组件

#### 表单 UForm

用于整体布局，集中设置属性，统一暴露事件和方法。

#### 验证器 UValidator

实现了基础的嵌套验证功能和原子化验证功能，包含提示样式。

#### 表单项 UFormItem

继承自验证器，具备所有验证器的功能。与验证器相比，是为了配合 UForm 布局方便而生。

#### 表单域（表单控件）MField

MField 作为各种表单域（表单控件）的基类，用于触发 UValidator（或 UFormItem）的验证功能。

比如常见的：`<u-input>`、`<u-select>`、`<u-radios>`、`<u-date-picker>`都属于这一类。

#### 复杂动态验证组件

如：`<u-form-table-view>`和`<u-dynamic-cards>`

## 示例
## 表单布局
### 基本用法

``` html
<u-form gap="large">
    <u-form-item label="计费方式" required>
        <u-radios value="0">
            <u-radio label="0">包年包月</u-radio>
            <u-radio label="1">按量付费</u-radio>
        </u-radios>
    </u-form-item>
    <u-form-item label="实例名称" required>
        <u-input size="huge" maxlength="63" placeholder="由1-63个小写字母，数字，中划线组成，以字母开头，字母或数字结尾"></u-input>
    </u-form-item>
    <u-form-item label="　" required>
        <u-input size="huge" maxlength="63" placeholder="label为空的必填项"></u-input>
    </u-form-item>
    <u-form-item label="规格">
        <u-select value="0101">
            <u-select-item value="0101">1核 1GB</u-select-item>
            <u-select-item value="0102">1核 2GB</u-select-item>
            <u-select-item value="0204">2核 4GB</u-select-item>
            <u-select-item value="0408">4核 8GB</u-select-item>
            <u-select-item value="0816">8核 16GB</u-select-item>
            <u-select-item value="0832">8核 32GB</u-select-item>
            <u-select-item value="1664">16核 64GB</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="类型" description="高性能 SSD 云盘不支持快照功能" layout="block">
        <u-select value="SSD">
            <u-select-item value="SSD">SSD 云盘</u-select-item>
            <u-select-item value="HSSD">高性能 SSD 云盘</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="端口号" required>
        <u-input size="huge medium" maxlength="5" placeholder="1150-65535" value="3306"></u-input>
    </u-form-item>
    <u-form-item label="公网带宽">
        <u-combo-slider :step="10" unit="Mbps"></u-combo-slider>
    </u-form-item>
    <u-form-item label="详情" layout="block">
        <u-textarea size="huge"></u-textarea>
    </u-form-item>
    <u-form-item>
        <u-button color="primary">立即创建</u-button>
    </u-form-item>
</u-form>
```

### 行内

``` html
<u-form layout="inline" label-size="auto">
    <u-form-item label="状态">
        <u-select auto-select>
            <u-select-item>认证中</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="用户名">
        <u-input maxlength="63" placeholder="请输入用户名"></u-input>
    </u-form-item>
    <u-form-item label="联系号码">
        <u-input maxlength="63" placeholder="请输入联系号码"></u-input>
    </u-form-item>
    <u-form-item>
        <u-button color="primary">查询</u-button>
    </u-form-item>
</u-form>
```

### 栅格布局

有多行的表单为了对齐美观，通常与栅格布局搭配使用。

``` html
<u-form layout="inline">
    <u-grid-layout>
        <u-grid-layout-row :repeat="3">
            <u-grid-layout-column>
                <u-form-item label="状态">
                    <u-select auto-select>
                        <u-select-item>认证中</u-select-item>
                    </u-select>
                </u-form-item>
            </u-grid-layout-column>
            <u-grid-layout-column>
                <u-form-item label="备案类型">
                    <u-select auto-select>
                        <u-select-item>全部</u-select-item>
                    </u-select>
                </u-form-item>
            </u-grid-layout-column>
            <u-grid-layout-column>
                <u-form-item label="备案号">
                    <u-input maxlength="63"></u-input>
                </u-form-item>
            </u-grid-layout-column>
        </u-grid-layout-row>
        <u-grid-layout-row :repeat="3">
            <u-grid-layout-column>
                <u-form-item label="用户名">
                    <u-input maxlength="63"></u-input>
                </u-form-item>
            </u-grid-layout-column>
            <u-grid-layout-column>
                <u-form-item label="单位名称">
                    <u-input maxlength="63"></u-input>
                </u-form-item>
            </u-grid-layout-column>
            <u-grid-layout-column>
                <u-form-item>
                    <u-button color="primary">查询</u-button>
                </u-form-item>
            </u-grid-layout-column>
        </u-grid-layout-row>
    </u-grid-layout>
</u-form>
```

### 插槽

- 通过`slot="label"`插槽自定义左侧内容
- 通过`slot="description"`插槽自定义描述内容
- 通过`slot='extra'`插槽自定义`label`右侧额外内容

``` html
<u-form ref="form">
    <u-form-item required layout="block">
        <span slot="label">
            用户名
        </span>
        <div slot="description">描述描述</div>
        <i-icon name="alert" size="small" slot="extra">
            <u-tooltip content="请输入正确格式的中文汉字"></u-tooltip>
        </i-icon>
        <u-input maxlength="4" maxlength-message="不超过4个字符" placeholder="不超过4个字符"></u-input>
    </u-form-item>
</u-form>
```


## 数据收集与提交

推荐将各表单控件使用`v-model`绑定的数据，统一收集到`data`里的`model`对象中。

``` vue
<template>
<u-form gap="large">
    <u-form-item label="计费方式" required>
        <u-radios v-model="model.chargeType">
            <u-radio label="0">包年包月</u-radio>
            <u-radio label="1">按量付费</u-radio>
        </u-radios>
    </u-form-item>
    <u-form-item label="实例名称" required>
        <u-input v-model="model.name" size="huge" maxlength="63" placeholder="由1-63个小写字母，数字，中划线组成，以字母开头，字母或数字结尾"></u-input>
    </u-form-item>
    <u-form-item label="规格">
        <u-select v-model="model.spec">
            <u-select-item value="0101">1核 1GB</u-select-item>
            <u-select-item value="0102">1核 2GB</u-select-item>
            <u-select-item value="0204">2核 4GB</u-select-item>
            <u-select-item value="0408">4核 8GB</u-select-item>
            <u-select-item value="0816">8核 16GB</u-select-item>
            <u-select-item value="0832">8核 32GB</u-select-item>
            <u-select-item value="1664">16核 64GB</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="类型" description="高性能 SSD 云盘不支持快照功能" layout="block">
        <u-select v-model="model.type">
            <u-select-item value="SSD">SSD 云盘</u-select-item>
            <u-select-item value="HSSD">高性能 SSD 云盘</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="端口号" required>
        <u-input v-model.number="model.port" size="huge normal" maxlength="5" placeholder="1150-65535"></u-input>
    </u-form-item>
    <u-form-item label="公网带宽">
        <u-combo-slider v-model="model.bandwidth" :step="10" unit="Mbps"></u-combo-slider>
    </u-form-item>
    <u-form-item label="描述" layout="block">
        <u-textarea v-model="model.description" size="huge"></u-textarea>
    </u-form-item>
    <u-form-item>
        <u-button color="primary" @click="submit()">立即创建</u-button>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                chargeType: '0',
                name: '',
                spec: '0101',
                type: 'SSD',
                port: 3306,
                bandwidth: 10,
                description: '',
            },
        };
    },
    methods: {
        submit() {
            console.info(this.model);
            this.$toast.show('提交成功！');
        },
    },
};
</script>
```

### 数据转换

有时 UI 中的数据与向后端提交的数据不完全一致，可以将`v-model`分解为一个`:value`属性绑定 + `@input`事件，做临时转换。

对于需要保持数字类型的，可以直接使用 Vue 的 `v-model` 的 `.number` 修饰符。

``` vue
<template>
<u-form gap="large">
    <u-form-item label="超时时长" required>
        <u-input size="huge normal" maxlength="5" placeholder="300-10000"
            :value="model.timeout / 1000" @input="model.timeout = $event * 1000"></u-input>
    </u-form-item>
    <u-form-item label="端口号" required>
        <u-input v-model.number="model.port" size="huge normal" maxlength="5" placeholder="1150-65535"></u-input>
    </u-form-item>
    <u-form-item>
        <u-button color="primary" @click="submit()">立即创建</u-button>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                timeout: 900000,
                port: 3306,
            },
        };
    },
    methods: {
        submit() {
            console.info(this.model);
            this.$toast.show('提交成功！');
        },
    },
};
</script>
```

### 表单验证

需要在`<u-form-item>`的`rules`属性添加验证规则，输入和失焦会自动触发验证，点击提交按钮时，需要手动调用 form 的`validate`方法。

可以根据`@validate`事件监听表单的验证状态。

关于验证规则的详细使用，参见 [UValidator](../u-validator)。

``` vue
<template>
<u-form ref="form" gap="large">
    <u-form-item label="计费方式" required>
        <u-radios v-model="model.chargeType">
            <u-radio label="0">包年包月</u-radio>
            <u-radio label="1">按量付费</u-radio>
        </u-radios>
    </u-form-item>
    <u-form-item label="实例名称" required rules="required | ^az | az09$ | ^az09-$ | rangeLength(1,63)">
        <u-input v-model="model.name" size="huge" maxlength="63" placeholder="由1-63个小写字母，数字，中划线组成，以字母开头，字母或数字结尾"></u-input>
    </u-form-item>
    <u-form-item label="规格">
        <u-select v-model="model.spec">
            <u-select-item value="0101">1核 1GB</u-select-item>
            <u-select-item value="0102">1核 2GB</u-select-item>
            <u-select-item value="0204">2核 4GB</u-select-item>
            <u-select-item value="0408">4核 8GB</u-select-item>
            <u-select-item value="0816">8核 16GB</u-select-item>
            <u-select-item value="0832">8核 32GB</u-select-item>
            <u-select-item value="1664">16核 64GB</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="类型" description="高性能 SSD 云盘不支持快照功能" layout="block">
        <u-select v-model="model.type">
            <u-select-item value="SSD">SSD 云盘</u-select-item>
            <u-select-item value="HSSD">高性能 SSD 云盘</u-select-item>
        </u-select>
    </u-form-item>
    <u-form-item label="端口号" required rules="required | integer | range(1150,65535)">
        <u-input v-model.number="model.port" size="huge normal" maxlength="5" placeholder="1150-65535"></u-input>
    </u-form-item>
    <u-form-item label="公网带宽">
        <u-combo-slider v-model="model.bandwidth" :step="10" unit="Mbps"></u-combo-slider>
    </u-form-item>
    <u-form-item label="描述" layout="block" rules="minLength(8)">
        <u-textarea v-model="model.description" size="huge"></u-textarea>
    </u-form-item>
    <u-form-item>
        <u-button color="primary" @click="submit">立即创建</u-button>
    </u-form-item>
</u-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                chargeType: '0',
                name: '',
                spec: '0101',
                type: 'SSD',
                port: '',
                bandwidth: 10,
                description: '',
            },
        };
    },
    methods: {
        submit() {
            this.$refs.form.validate()
                .then(() => this.$toast.show('验证通过，提交成功！'))
                .catch(() => this.$toast.show('验证失败！'));
        },
    },
};
</script>
```

## UForm API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| model | object |  |  | 表单数据模型 |
| rules | object |  |  | 表单所有域的验证规则，已废弃，推荐在各`<u-form-item>`中自行添加 rules。 |
| layout | string |  | `'block'` | 表单布局方式。可选值：`block`、`inline`。 |
| label-size | string |  | `'normal'` | 标签大小。可选值：`small`、`normal`、`large`。 |

### Computed

| Computed | Type | Description |
| -------- | ---- | ----------- |
| touched | boolean | 用户是否触碰 |
| dirty | boolean | 用户是否修改值 |
| valid | boolean | 验证是否通过 |
| firstError | string | 第一个错误提示消息 |

### Slots

#### (default)

插入`<u-form-item>`子组件。

### Events

#### @validate

验证时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.valid | boolean | 验证是否通过 |
| $event.touched | boolean | 用户是否触碰 |
| $event.dirty | boolean | 用户是否修改值 |
| $event.firstError | string | 第一个错误提示消息 |
| senderVM | UValidator | 发送事件实例 |

### Methods

#### validate(trigger, muted)

手动验证。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| trigger | string | `'submit'` | 触发方式，可选值：`submit`、`blur`和`input`之一，或者它们的任意组合。 |
| muted | boolean | `false` | 是否验证后无提示 |

#### validateItem(name, trigger, slient)

验证表单中的某一项，已废弃。表单中的项是嵌套的，用 name 层级较深，而且可能有重名。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| name | string |  | 表单项的 name |
| trigger | string | `'submit'` | 触发方式，可选值：`submit`、`blur`和`input`之一，或者它们的任意组合。 |
| muted | boolean | `false` | 是否验证后无提示 |

## UFormItem API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| name | string |  |  | 表单项名称。已废弃 |
| label | string |  |  | 标签。用于左侧显示，同时用于提示消息的合成 |
| label-size | string |  | `'normal'` | 单独设置表单项的标签大小 |
| field-size | string |  | `'normal'` | 单独设置表单项的内容大小。可选值：`'full'` |
| required | boolean |  | `false` | 是否必填。仅显示样式，如果要验证必填项，需要在`rules`中添加必填规则。 |
| message | string |  |  | 默认提示消息 |
| muted | string |  |  | 验证时是否静默。可选值：`'message'`表示只静默消息提示，`'all'`同时静默消息提示和红框提示 |
| description | string |  |  | 添加描述内容 |
| placement | string |  |  | 值为`'bottom'`时提示信息在底部显示，改变提示信息显示位置 |
| layout | string |  |  | 布局方式，可选值：`'block'` |
| **Validator Props/Attrs** |  |  |  |  |
| rules | string, Array |  |  | 验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型 |
| ignore-validation | boolean |  | `false` | 忽略验证 |
| ignore-rules | boolean |  | `false` | 忽略验证规则。已废弃，同`ignore-validation` |
| validating-options | object |  |  | 验证辅助对象。在 Rule 的 `validate` 方法中使用 |
| validating-value | any |  |  | 临时修改验证值 |
| validating-process | Function |  |  | 验证前对值进行预处理 |

### Slots

#### (default)

插入文本或 HTML。

#### label

插入自定义标签标题，代替`label`属性。

#### description

插入自定义描述内容，代替`description`属性。

#### extra

自定义标签右侧额外内容。

### Events

#### @validate

验证时触发，或内部验证时冒泡触发。
对于第一个 Field 或者所有子 UValidator：


| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.valid | boolean | 验证是否通过 |
| $event.touched | boolean | 用户是否触碰 |
| $event.dirty | boolean | 用户是否修改值 |
| $event.firstError | string | 第一个错误提示消息 |
| senderVM | UValidator | 发送事件实例 |

### Methods

#### validate(trigger, muted)

验证此表单项。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| trigger | string | `'submit'` | 触发方式，可选值：`submit`、`blur`和`input`之一，或者它们的任意组合。 |
| muted | boolean | `false` | 是否验证后无提示 |
