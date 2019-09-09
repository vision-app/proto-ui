# UToast 吐司提示

## 示例
### 快捷方式

``` vue
<template>
<u-button @click="show">Toast</u-button>
</template>

<script>
export default {
    methods: {
        show() {
            this.$toast.show('This is a text.');
        },
    },
};
</script>
```

### 位置扩展

``` vue
<template>
<u-linear-layout>
    <u-button @click="show('top-center')">Top Center</u-button>
    <u-button @click="show('top-left')">Top Left</u-button>
    <u-button @click="show('top-right')">Top Right</u-button>
    <u-button @click="show('bottom-center')">Bottom Center</u-button>
    <u-button @click="show('bottom-left')">Bottom Left</u-button>
    <u-button @click="show('bottom-right')">Bottom Right</u-button>
</u-linear-layout>
</template>

<script>
export default {
    methods: {
        show(position) {
            this.$toast.position = position;
            this.$toast.show('position: ' + position);
        },
    },
};
</script>
```

### 嵌入文档流

上面的 Toast 都是以`fixed`的形式固定在浏览器中，也可以将Toast嵌入文档流。只需使用`u-toast`标签，并设置`position="static"`即可。

``` html
<p><u-button @click="$refs.toastStatic.show()">Static</u-button></p>
<u-toast ref="toastStatic" position="static" text="Static Toast"></u-toast>
```

### 可关闭

``` html
<p><u-button @click="$refs.toastStaticClosable.show()">Static</u-button></p>
<u-toast ref="toastStaticClosable" position="static" text="Closable" :duration="0" closable></u-toast>
```

### 提示停留时间

可以通过设置toast的`duration`参数设置所有提示的停留时间，也可以在`show`的时候单独设置该条提示的停留时间，单位为毫秒。

``` vue
<template>
<u-linear-layout>
    <u-button @click="show(500)">0.5s</u-button>
    <u-button @click="show(1000)">1s</u-button>
    <u-button @click="show(2000)">2s</u-button>
    <u-button @click="show(0)">常驻</u-button>
</u-linear-layout>
</template>

<script>
export default {
    methods: {
        show(duration) {
            this.$toast.show('duration: ' + duration + ' ms', duration);
        },
    },
};
</script>
```

### 始终显示一条

将`single`设置为`true`，可以让toast始终只显示一条提示。

``` vue
<template>
<u-button @click="show()">Single</u-button>
</template>

<script>
export default {
    data() {
        return {
            number: 1,
        };
    },
    methods: {
        show() {
            this.$toast.single = true;
            this.$toast.show('number: ' + this.number);
            this.number++;
        },
    },
};
</script>
```

## API
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| position | String | `'top-center'` | 显示的位置，可选值：`'top-center'`, `'top-left'`, `'top-right'`, `'bottom-center'`, `'bottom-left'`, `'bottom-right'`, `static` |
| duration | Number | `2000` | 提示停留的时间。`0`表示常驻。 |
| single | Boolean | `false` | 多个提示会合并为一个 |
| text | String | `''` | 默认提示内容 |
| color | String | `'default'` | 提示的颜色 |
| closable | Boolean | `false` | 是否可以关闭提示 |

### Events

#### @open

弹出提示时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.text | String | 提示的内容 |
| $event.color | String | 提示的颜色 |
| $event.duration | Number | 提示停留的时间 |
| senderVM | UToast | 发送事件实例 |

#### @before-close

关闭提示前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.text | String | 提示的内容 |
| $event.color | String | 提示的颜色 |
| $event.duration | Number | 提示停留的时间 |
| $event.preventDefault | Function | 阻止关闭流程 |
| senderVM | UToast | 发送事件实例 |

#### @close

关闭提示时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.text | String | 提示的内容 |
| $event.color | String | 提示的颜色 |
| $event.duration | Number | 提示停留的时间 |
| senderVM | UToast | 发送事件实例 |
