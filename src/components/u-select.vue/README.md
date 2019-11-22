<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# USelect 选择框

**UI 组件**, **表单控件**, **行内展示**

下拉选择框，支持支持单选、多选、搜索等功能，用于代替原生的选择框。

## 基础示例
### 基本用法

默认为单选模式。可以通过`placeholder`属性设置占位符。

``` html
<u-linear-layout>
    <u-select>
        <u-select-item>水杯</u-select-item>
        <u-select-item>咖啡</u-select-item>
        <u-select-item>坚果</u-select-item>
    </u-select>
    <u-select placeholder="设置占位符">
        <u-select-item>水杯</u-select-item>
        <u-select-item>咖啡</u-select-item>
        <u-select-item>坚果</u-select-item>
    </u-select>
</u-linear-layout>
```

### 双向绑定

使用`v-model`或`:value.sync`进行双向绑定。

``` vue
<template>
<u-linear-layout>
    <u-select v-model="value">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
    <u-select :value.sync="value">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
</u-linear-layout>
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

### 只读、禁用、禁用某一项

``` html
<u-linear-layout>
    <u-select value="nut" readonly>
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
    </u-select>
    <u-select value="nut" disabled>
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
    </u-select>
    <u-select value="nut">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee" disabled>咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
    </u-select>
</u-linear-layout>
```

#### 为空禁用

有时在没有数据的情况下，不希望用户进行选择。使用`empty-disabled`属性自动禁用掉这种情况。

``` html
<u-select value="nut" empty-disabled placeholder="暂无选项"></u-select>
```

### 分隔符

``` html
<u-select value="nut">
    <u-select-item value="cup">水杯</u-select-item>
    <u-select-item value="toothbrush">牙刷</u-select-item>
    <u-select-divider></u-select-divider>
    <u-select-item value="nut">坚果</u-select-item>
    <u-select-item value="towel">毛巾</u-select-item>
    <u-select-item value="sofa">沙发</u-select-item>
</u-select>
```

### 分组

``` html
<u-select>
    <u-select-group title="洗具">
        <u-select-item>毛巾</u-select-item>
        <u-select-item>牙刷</u-select-item>
    </u-select-group>
    <u-select-group title="杯具">
        <u-select-item>牙缸</u-select-item>
        <u-select-item>水杯</u-select-item>
    </u-select-group>
    <u-select-group title="餐具">
        <u-select-item>筷子</u-select-item>
        <u-select-item>碗</u-select-item>
    </u-select-group>
</u-select>
```

### 可清除

``` html
<u-select value="coffee" clearable>
    <u-select-item value="cup">水杯</u-select-item>
    <u-select-item value="coffee">咖啡</u-select-item>
    <u-select-item value="nut">坚果</u-select-item>
</u-select>
```

### 多选模式

通过`multiple`属性开启多选模式。可以使用`v-model`或`:value.sync`两种方式进行双向绑定。

``` vue
<template>
<u-select multiple v-model="values">
    <u-select-item value="cup">水杯</u-select-item>
    <u-select-item value="coffee">咖啡</u-select-item>
    <u-select-item value="nut">坚果</u-select-item>
    <u-select-item value="towel">毛巾</u-select-item>
    <u-select-item value="sofa">沙发</u-select-item>
</u-select>
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

### Tags 风格

Tags 过多时如何显示。

``` vue
<template>
<u-linear-layout>
    <u-select multiple tags-overflow="hidden" v-model="value" placeholder="过多时省略">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
    <u-select multiple tags-overflow="collapse" v-model="value" placeholder="过多时收缩">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
    <u-select multiple tags-overflow="visible" v-model="value" placeholder="过多时显示">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            value: ['sofa', 'nut', 'towel'],
        };
    },
};
</script>
```


## 数据相关
### 数据和数据源

基础示例中采用的是标签形式添加数据，适合数据量小、数据操作简单或对模板有定制化的场景。

如果数据量较大，或需要使用过滤等操作时，需要使用`data`或`data-source`属性。`data`属性的格式为`Array<{ text, value }>`，下面简写为`Array<Item>`；`data-source`属性一般接受一个`load`函数，用于异步加载。

#### 纯前端数据

``` vue
<template>
<u-select :data="data" placeholder="纯前端数据"></u-select>
</template>
<script>
export default {
    data() {
        // 构造数量较多的 100 条数据
        let data = [];
        for (let i = 1; i <= 100; i++)
            data.push('item' + i);
        data = data.map((text) => ({ text, value: text }));

        return { data };
    },
};
</script>
```

### 分页

#### 前端分页

当数据量较大时，开启`pageable`属性可以进行前端分页，同时可以用`page-size`属性修改默认分页大小。

``` vue
<template>
<u-select :data="data" pageable placeholder="前端分页"></u-select>
</template>
<script>
export default {
    data() {
        // 构造数量较多的 500 条数据
        let data = [];
        for (let i = 1; i <= 500; i++)
            data.push('item' + i);
        data = data.map((text) => ({ text, value: text }));

        return { data };
    },
};
</script>
```

#### 一次性后端数据，前端分页

在`data-source`属性中传入`load`方法，用于接收完整的后端数据。

`load`方法要求返回一个`Promise<Array<Item>>`或`Promise<{ data: Array<Item>, total: Number }>`的格式。该会在组件初始化时会被调用一次，如果不需要可以将`initial-load`属性设置为`false`。

开启`pageable`属性时可以进行前端分页。

``` vue
<template>
<u-select :data-source="load" pageable :page-size="20" placeholder="前端分页"></u-select>
</template>
<script>
// 模拟构造远程数据
const remoteData = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ text, value: text }));

export default {
    methods: {
        load() {
            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(remoteData);
                }, 500);
            });
        },
    },
};
</script>
```

#### 后端分页

如果需要使用后端分页，在`data-source`属性中传入`load`方法的基础上，开启`remote-paging`功能。

这时`load`方法会接受一个与分页相关的`paging`参数：

``` js
params.paging = {
    size: Number, // 每页大小
    number: Number, // 页数。从1开始计
    offset: Number, // 偏移量：(number - 1) * size
    limit: Number, // 同 size
}
```

要求返回一个`Promise<Array<Item>>`或`Promise<{ data: Array<Item>, total: Number }>`的格式。翻页是否到底，根据`total`字段判断，如果没有则根据最后一次数组为空判断。

``` vue
<template>
<u-linear-layout>
<u-select :data-source="load" pageable remote-paging placeholder="后端分页"></u-select>
<u-select multiple :data-source="load" pageable remote-paging placeholder="后端分页（多选）" style="width: 240px"></u-select>
</u-linear-layout>
</template>
<script>
// 模拟构造数量较多的 500 条远程数据
let remoteData = [];
for (let i = 1; i <= 500; i++)
    remoteData.push('item' + i);
remoteData = remoteData.map((text) => ({ text, value: text }));

export default {
    methods: {
        load({ paging }) {
            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(remoteData.slice(paging.offset, paging.offset + paging.limit));
                }, 500);
            });
        },
    },
};
</script>
```


### 过滤

#### 前端过滤

使用`filterable`属性可以开启过滤功能，用于快速查找选项。

``` vue
<template>
<u-linear-layout>
    <u-select :data="data" filterable clearable placeholder="前端过滤"></u-select>
    <u-select multiple :data="data" filterable clearable placeholder="前端过滤（多选）" style="width: 240px"></u-select>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        const data = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ text, value: text }));

        return { data };
    },
};
</script>
```

#### 匹配方式

在`match-method`属性中可以配置字符串的匹配方式，常见的有`includes`、`startsWith`、`endsWith`，也可以传一个函数。

``` vue
<template>
<u-linear-layout>
    <u-select :data="data" filterable match-method="includes" placeholder="包括即可（默认）"></u-select>
    <u-select :data="data" filterable match-method="startsWith" placeholder="只匹配开头"></u-select>
    <u-select :data="data" filterable match-method="endsWith" placeholder="只匹配结尾"></u-select>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        const data = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ text, value: text }));

        return { data };
    },
};
</script>
```

#### 区分大小写

默认不区分大小写，可用`case-sensitive`属性开启。

``` vue
<template>
<u-linear-layout>
    <u-select :data="data" filterable placeholder="不区分大小写（默认）"></u-select>
    <u-select :data="data" filterable case-sensitive placeholder="区分大小写"></u-select>
</u-linear-layout>
</template>
<script>
export default {
    data() {
        const data = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ text, value: text }));

        return { data };
    },
};
</script>
```

#### 一次性后端数据，前端过滤

在`data-source`属性中传入`load`方法，用于接收完整的后端数据。

这时开启`filterable`属性可以进行前端过滤。

``` vue
<template>
<u-select :data-source="load" filterable clearable placeholder="前端过滤"></u-select>
</template>
<script>
// 模拟构造远程数据
const remoteData = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ text, value: text }));

export default {
    methods: {
        load() {
            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(remoteData);
                }, 300);
            });
        },
    },
};
</script>
```

#### 后端过滤，后端分页

如果要使用后端过滤，在`data-source`属性中传入`load`方法的基础上，开启`remote-filtering`功能。

同时可以配合分页使用。

``` vue
<template>
<u-linear-layout>
    <u-select :data-source="load"
              pageable remote-paging
              filterable remote-filtering
              clearable placeholder="后端过滤，后端分页">
    </u-select>
    <u-select multiple :data-source="load"
              pageable remote-paging
              filterable remote-filtering
              clearable placeholder="后端过滤，后端分页（多选）"
              style="width: 240px"></u-select>
</u-linear-layout>
</template>
<script>
// 模拟构造数量较多的 500 条远程数据
let remoteData = [];
for (let i = 1; i <= 500; i++) {
    remoteData.push('item' + i);
    remoteData.push('info' + i);
    remoteData.push('detail' + i);
}
remoteData = remoteData.map((text) => ({ text, value: text }));

export default {
    methods: {
        load({ filterText, paging }) {
            const value = filterText.toLowerCase();

            // 这里使用 Promise 和 setTimeout 模拟一个异步请求
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(remoteData.filter((item) => item.value.includes(value))
                        .slice(paging.offset, paging.offset + paging.limit)
                    );
                }, 300);
            });
        },
    },
};
</script>
```

### 自动补充

在过滤的基础上，

使用`auto-complete`属性可以开启过滤功能，用于快速查找选项。

``` vue
<template>
<u-linear-layout>
    <u-select :data="data" filterable clearable auto-complete placeholder="自动补充"></u-select>
    <u-select multiple :data="data" filterable clearable auto-complete placeholder="自动补充（多选）" style="width: 240px"></u-select>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        const data = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming'].map((text) => ({ text, value: text }));

        return { data };
    },
};
</script>
```

## USelect API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value.sync, v-model | any |  |  | 当前选择的值 |
| field | string |  | `'text'` | 显示文本字段 |
| data | Array\<{ text, value }\> |  |  | 列表数据 |
| data-source | object, Function, DataSource |  |  | 多功能数据源 |
| cancelable | boolean |  | `false` | 是否可以取消选择 |
| multiple | boolean |  | `false` | 是否可以多选 |
| placeholder | boolean |  | `'请选择'` | 选择框的占位符 |
| loading-text | string |  | `'加载中...'` | 加载时的文字。使用分页加载时才会出现 |
| empty-text | string |  | `'加载中...'` | 没有匹配时的文字 |
| empty-disabled | boolean |  | `false` | 没有数据时，自动禁用 |
| initial-load | boolean |  | `true` | 是否在初始时立即加载 |
| pageable | boolean |  | `false` | 是否需要分页 |
| page-size | number |  | `50` | 分页大小 |
| remote-paging | boolean |  | `false` | 是否使用后端分页 |
| clearable | boolean |  | `false` | 是否有清除按钮 |
| filterable | boolean |  | `false` | 是否使用输入框进行过滤 |
| match-method | string, Function |  | `'includes'` | 过滤时的匹配方法 |
| case-sensitive | string, Function |  | `'includes'` | 过滤时大小写是否敏感 |
| remote-filtering | boolean |  | `false` | 是否使用后端过滤 |
| auto-complete | boolean |  | `false` | 是否开启自动补充模式，用于增加列表中没有的项 |
| readonly | boolean |  | `false` | 是否只读 |
| disabled | boolean |  | `false` | 是否禁用 |
| opened.sync | boolean |  | `false` | 弹出/关闭状态 |

### Slots

#### (default)

插入`<u-select-item>`、`<u-select-divider>`或`<u-select-group>`子组件。

### Events

#### @before-select

选择某一项前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | any | 选择项的值 |
| $event.oldValue | any | 旧的值 |
| $event.item | object | 选择项相关对象 |
| $event.itemVM | SelectItem | 选择项子组件 |
| $event.preventDefault | Function | 阻止选择流程 |
| senderVM | USelect | 发送事件实例 |

#### @input

选择某一项时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | any | 选择项的值 |
| senderVM | USelect | 发送事件实例 |

#### @select

选择某一项时触发。单选模式中：

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | any | 改变后的值 |
| $event.oldValue | any | 旧的值 |
| $event.item | object | 选择项相关对象 |
| $event.oldItem | object | 旧的选择项相关对象 |
| $event.itemVM | USelectItem | 选择项子组件 |
| $event.oldVM | USelectItem | 旧的选择项子组件 |
| senderVM | USelect | 发送事件实例 |

#### @select

选择某一项时触发。多选模式中：

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.selected | boolean | 选中还是取消 |
| $event.item | boolean | 该选中项相关对象 |
| $event.itemVM | boolean | 该选中项子组件 |
| $event.value | Array | 改变后的值 |
| $event.oldValue | Array | 旧的值 |
| $event.items | Array\<object\> | 所有选中项相关对象的数组 |
| $event.oldItems | Array\<object\> | 旧的所有选中项相关对象的数组 |
| $event.itemVMs | Array\<USelectItem\> | 所有选中项子组件的数组 |
| $event.oldVMs | Array\<USelectItem\> | 旧的所有选中项子组件的数组 |
| senderVM | USelect | 发送事件实例 |

#### @change

选择值改变时触发。单选模式中：

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | any | 选择项的值 |
| $event.oldValue | any | 旧的值 |
| $event.item | object | 选择项相关对象 |
| $event.oldItem | object | 旧的选择项相关对象 |
| $event.itemVM | USelectItem | 选择项子组件 |
| $event.oldVM | USelectItem | 旧的选择项子组件 |
| senderVM | USelect | 发送事件实例 |

#### @change

选择值改变时触发。多选模式中：

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Array | 所有选中项的值 |
| $event.items | Array\<object\> | 所有选中项相关对象的数组 |
| $event.itemVMs | Array\<USelectItem\> | 所有选中项子组件的数组 |
| senderVM | USelect | 发送事件实例 |

#### @before-open

弹出前触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.preventDefault | Function | 阻止弹出流程 |
| senderVM | USelect | 发送事件实例 |

#### @open

弹出时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event |  | 空 |
| senderVM | USelect | 发送事件实例 |

#### @before-close

隐藏前触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.preventDefault | Function | 阻止隐藏流程 |
| senderVM | USelect | 发送事件实例 |

#### @close

隐藏时触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event |  | 空 |
| senderVM | USelect | 发送事件实例 |

#### @before-toggle

@deprecated

| Param | Type | Description |
| ----- | ---- | ----------- |

#### @toggle

@deprecated

| Param | Type | Description |
| ----- | ---- | ----------- |

#### @before-load

加载前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.preventDefault | Function | 阻止加载流程 |
| senderVM | UTableView | 发送事件实例 |

#### @load

加载时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event |  | 空 |
| senderVM | UTableView | 发送事件实例 |

### Methods

#### open()

弹出选择框。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### close()

关闭选择框。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### toggle(opened?)

切换弹出/关闭状态。

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| opened? | boolean |  | 可选。弹出/关闭状态 |

#### load()

带缓存地加载

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

#### reload()

清除缓存，重新加载

| Param | Type | Default | Description |
| ----- | ---- | ------- | ----------- |

## USelectItem API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| value | any |  |  | 此项的值 |
| disabled | boolean |  | `false` | 禁用此项 |
| item | object |  |  | 相关对象。当选择此项时，抛出的事件会传递该对象，便于开发 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @before-select

选择此项前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | any | 此项的值 |
| $event.item | object | 此项的相关对象 |
| $event.itemVM | SelectItem | 此组件 |
| $event.preventDefault | Function | 阻止选择流程 |
| senderVM | USelectItem | 发送事件实例 |

## USelectGroup API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| title | string |  |  | 显示的标题 |

### Slots

#### (default)

插入`<u-select-item>`或`<u-select-divider>`子组件。

#### title

自定义标题文本。

#### extra

在右侧可以附加内容。

## USelectDivider API
