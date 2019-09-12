# UAvatar 头像

<s-component-labels :labels="[
    'UI 组件', '行内展示',
]"></s-component-labels>

顶部导航栏或页面中局部使用的用户头像。

## 示例
### 基本用法

``` html
<u-avatar></u-avatar> 王小明
```

### 大小扩展

``` html
<u-linear-layout direction="vertical">
    <div><u-avatar size="mini"></u-avatar> 王小明（迷你）</div>
    <div><u-avatar size="small"></u-avatar> 王小明（小）</div>
    <div><u-avatar></u-avatar> 王小明（正常）</div>
    <div><u-avatar size="large"></u-avatar> 王小明（大）</div>
    <div><u-avatar size="huge"></u-avatar> 王小明（大）</div>
</u-linear-layout>
```

### 自定义内容

``` html
<u-avatar><img src="./assets/music.png"></u-avatar> 多多
```

### 配合 UBadge 使用

```html
<u-badge :value="3" corner dot>
    <u-avatar></u-avatar>
</u-badge>
<br/><br/>
<u-badge :value="3" corner dot>
    <u-avatar shape="square"></u-avatar>
</u-badge>
<br/><br/>
<u-badge :value="120" :max="99" corner>
    <u-avatar></u-avatar>
</u-badge>
<br/><br/>
<u-badge :value="120" :max="99" corner>
    <u-avatar shape="square"></u-avatar>
</u-badge>
```

### 配合 UNavbar 使用

``` html
<u-navbar>
    <u-navbar-item to="/components">组件</u-navbar-item>
    <u-navbar-item>概念</u-navbar-item>
    <u-navbar-item disabled>指令</u-navbar-item>
    <u-navbar-divider></u-navbar-divider>
    <u-navbar-item>配置</u-navbar-item>
    <div slot="right">
        <u-navbar-item>
            <u-avatar></u-avatar> 王小明
        </u-navbar-item>
    </div>
</u-navbar>
```

``` html
<u-navbar>
    <u-navbar-item to="/components">组件</u-navbar-item>
    <u-navbar-item>概念</u-navbar-item>
    <u-navbar-item disabled>指令</u-navbar-item>
    <u-navbar-divider></u-navbar-divider>
    <u-navbar-item>配置</u-navbar-item>
    <u-navbar-dropdown slot="right">
        <span slot="title"><u-avatar></u-avatar> 王小明</span>
        <u-navbar-menu>
            <u-navbar-menu-item>Basic</u-navbar-menu-item>
            <u-navbar-menu-item>Layout</u-navbar-menu-item>
            <u-navbar-menu-item>Navigation</u-navbar-menu-item>
        </u-navbar-menu>
    </u-navbar-dropdown>
</u-navbar>
```

``` html
<u-navbar>
    <u-navbar-item to="/components">组件</u-navbar-item>
    <u-navbar-item>概念</u-navbar-item>
    <u-navbar-item disabled>指令</u-navbar-item>
    <u-navbar-divider></u-navbar-divider>
    <u-navbar-item>配置</u-navbar-item>
    <u-navbar-dropdown slot="right">
        <span slot="title"><u-badge :value="120" :max="99" corner><u-avatar></u-avatar></u-badge> 王小明</span>
        <u-navbar-menu>
            <u-navbar-menu-item>Basic</u-navbar-menu-item>
            <u-navbar-menu-item>Layout</u-navbar-menu-item>
            <u-navbar-menu-item>Navigation</u-navbar-menu-item>
        </u-navbar-menu>
    </u-navbar-dropdown>
</u-navbar>
```

## API

### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| size | String | `'normal'` | 头像大小。可选值：`'mini'`、`'small'`、`'normal'`、`'large'`、`'huge'`。如需自定义大小，可以直接设置`style="width: 40px; height: 40px;"` |
| shape | String | `'circle'` | 形状。可选值：`circle`, `square` 两种类型 |

### Slots

#### (default)

无
