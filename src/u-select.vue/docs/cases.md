### 基本形式

``` html
<u-linear-layout>
    <u-select>
        <u-select-item>苹果</u-select-item>
        <u-select-item>香蕉</u-select-item>
        <u-select-item>蛋糕</u-select-item>
    </u-select>
    <u-select>
        <u-select-item>请选择</u-select-item>
        <u-select-item>苹果</u-select-item>
        <u-select-item>香蕉</u-select-item>
        <u-select-item>蛋糕</u-select-item>
    </u-select>
</u-linear-layout>
```

### 选择值

#### 静态绑定

``` html
<u-select value="banana">
    <u-select-item>请选择</u-select-item>
    <u-select-item value="apple">苹果</u-select-item>
    <u-select-item value="banana">香蕉</u-select-item>
    <u-select-item value="cake">蛋糕</u-select-item>
</u-select>
```

#### v-model

``` vue
<template>
<div>
    <u-select v-model="value">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
    <span>value: {{ value }}</span>
</div>
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

#### value.sync

``` vue
<template>
<div>
    <u-select :value.sync="value">
        <u-select-item value="cup">水杯</u-select-item>
        <u-select-item value="coffee">咖啡</u-select-item>
        <u-select-item value="nut">坚果</u-select-item>
        <u-select-item value="towel">毛巾</u-select-item>
        <u-select-item value="sofa">沙发</u-select-item>
    </u-select>
    <span>value: {{ value }}</span>
</div>
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
    <u-select value="cake" readonly>
        <u-select-item value="apple">苹果</u-select-item>
        <u-select-item value="banana">香蕉</u-select-item>
        <u-select-item value="cake">蛋糕</u-select-item>
    </u-select>
    <u-select value="cake" disabled>
        <u-select-item value="apple">苹果</u-select-item>
        <u-select-item value="banana">香蕉</u-select-item>
        <u-select-item value="cake">蛋糕</u-select-item>
    </u-select>
    <u-select value="cake">
        <u-select-item value="apple">苹果</u-select-item>
        <u-select-item value="banana" disabled>香蕉</u-select-item>
        <u-select-item value="cake">蛋糕</u-select-item>
    </u-select>
</u-linear-layout>
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

### 数据源

当数据量不大时，除了用标签形式添加，也可以用`data`属性一次性传进来，`data`属性的格式为`Array<{ text, value }>`。

但如果数据量很大时，推荐使用`data-source`属性进行“分页加载”。

``` vue
<template>
<u-linear-layout>
    <u-select :data="data">
        <u-select-item>没有使用分页功能</u-select-item>
    </u-select>
    <u-select :data-source="dataSource">
        <u-select-item>使用分页加载功能</u-select-item>
    </u-select>
</u-linear-layout>
</template>
<script>
import { utils } from 'library';

export default {
    data() {
        return { data: [] };
    },
    created() {
        // 构造数量较多的 1000 条数据
        let data = [];
        for (let i = 1; i <= 1000; i++)
            data.push('item' + i);
        data = data.map((text) => ({ text, value: text }));

        // 没有使用分页功能，直接传入
        this.data = data;

        // 使用`utils.DataSource`自动分页
        this.dataSource = new utils.DataSource({
            data,
            limit: 50, // `limit`表示分页大小，默认为 50，可以不传。
        });
    },
};
</script>
```

#### 异步数据源

也可以使用异步加载数据，在`new DataSource`时，直接重写`loadMore`这个方法。该方法会传入相关的参数，并要求返回一个`Promise`对象。

有时会遇到多个`<u-select>`使用的数据相同，这时他们可以共享同一个数据源，避免重复发送请求。

``` vue
<template>
<u-linear-layout>
    <u-select :data-source="dataSource">
        <u-select-item>异步数据源</u-select-item>
    </u-select>
    <u-select :data-source="dataSource">
        <u-select-item>共享数据源</u-select-item>
    </u-select>
</u-linear-layout>
</template>
<script>
import { utils } from 'library';

export default {
    created() {
        // 构造数量较多的 1000 条数据
        let data = [];
        for (let i = 1; i <= 1000; i++)
            data.push('item' + i);
        data = data.map((text) => ({ text, value: text }));

        this.dataSource = new utils.DataSource({
            loadMore(params) {
                // 这里使用 Promise 和 setTimeout 模拟一个异步请求
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(data.slice(params.offset, params.offset + params.limit));
                    }, 500);
                });
            },
        });
    },
};
</script>
```