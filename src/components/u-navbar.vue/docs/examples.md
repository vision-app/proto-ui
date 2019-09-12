### 基本用法

下面展示了导航条的一些基本特性，如配置链接、添加分隔线、禁用选项等。

``` html
<u-navbar>
    <u-navbar-item to="/components">组件</u-navbar-item>
    <u-navbar-item>概念</u-navbar-item>
    <u-navbar-item disabled>指令</u-navbar-item>
    <u-navbar-divider></u-navbar-divider>
    <u-navbar-item>配置</u-navbar-item>
    <u-navbar-item href="https://github.com/vusion/proto-ui">GitHub</u-navbar-item>
</u-navbar>
```

### 选择控制

通过`router`属性开关来决定，导航条的选择项是直接与路由绑定，还是由`value`属性来控制。

#### 路由模式

默认为此种模式，即导航条的选择项通过`to`属性直接与路由绑定的，这样就不需要操作额外的变量。这种模式下每个`<u-navbar-item>`类似 VueRouter 的`<router-link>`。

``` html
<u-navbar>
    <u-navbar-item to="/components">组件</u-navbar-item>
    <u-navbar-item>概念</u-navbar-item>
    <u-navbar-item disabled>指令</u-navbar-item>
    <u-navbar-item href="https://github.com/vusion/proto-ui">GitHub</u-navbar-item>
</u-navbar>
```

#### value 模式

将`router`属性设置为`false`时，导航条的选择项则由`value`属性来控制。类似于常用的`<u-select>`操作，`value`可以用`v-model`或`.sync`进行双向绑定。

``` html
<u-navbar value="Concepts" :router="false">
    <u-navbar-item value="Components">组件</u-navbar-item>
    <u-navbar-item value="Concepts">概念</u-navbar-item>
    <u-navbar-item value="Directives" disabled>指令</u-navbar-item>
    <u-navbar-item value="GitHub">GitHub</u-navbar-item>
</u-navbar>
```

### 布局
#### 左右插槽

导航条内容有左中右三块区域。

通过`left`和`right`两个 slot，可以快速进行布局。

``` html
<u-navbar>
    <u-logo slot="left"></u-logo>
    <u-navbar-item to="/components">组件</u-navbar-item>
    <u-navbar-item>概念</u-navbar-item>
    <u-navbar-item disabled>指令</u-navbar-item>
    <u-navbar-item slot="right" href="https://github.com/vusion/proto-ui" target="_blank"><i-icon name="github" style="font-size: 24px;"></i-icon></u-navbar-item>
</u-navbar>
```

#### 对齐方式

通过设置`alignment`属性，可以调整中部区域的对齐方式。

``` html
<u-linear-layout direction="vertical">
    <u-navbar alignment="left">
        <u-logo slot="left"></u-logo>
        <u-navbar-item>指南</u-navbar-item>
        <u-navbar-item>概念</u-navbar-item>
        <u-navbar-item to="/proto-ui">组件</u-navbar-item>
        <u-navbar-item slot="right" href="https://github.com/vusion/proto-ui" target="_blank"><i-icon name="github" style="font-size: 24px;"></i-icon></u-navbar-item>
    </u-navbar>
    <u-navbar alignment="center">
        <u-logo slot="left"></u-logo>
        <u-navbar-item>指南</u-navbar-item>
        <u-navbar-item>概念</u-navbar-item>
        <u-navbar-item to="/proto-ui">组件</u-navbar-item>
        <u-navbar-item slot="right" href="https://github.com/vusion/proto-ui" target="_blank"><i-icon name="github" style="font-size: 24px;"></i-icon></u-navbar-item>
    </u-navbar>
    <u-navbar alignment="right">
        <u-logo slot="left"></u-logo>
        <u-navbar-item>指南</u-navbar-item>
        <u-navbar-item>概念</u-navbar-item>
        <u-navbar-item to="/proto-ui">组件</u-navbar-item>
        <u-navbar-item slot="right" href="https://github.com/vusion/proto-ui" target="_blank"><i-icon name="github" style="font-size: 24px;"></i-icon></u-navbar-item>
    </u-navbar>
</u-linear-layout>
```

### 下拉菜单与选择

使用`<u-navbar-menu>`搭配`<u-navbar-dropdown>`来实现下拉菜单，使用`<u-navbar-select>`来实现下拉选择。

``` html
<u-navbar>
    <u-navbar-item to="/components">组件</u-navbar-item>
    <u-navbar-item disabled>指令</u-navbar-item>
    <u-navbar-dropdown title="下拉菜单">
        <u-navbar-menu>
            <u-navbar-menu-item>Basic</u-navbar-menu-item>
            <u-navbar-menu-item>Layout</u-navbar-menu-item>
            <u-navbar-menu-item>Navigation
                <u-navbar-menu slot="sub">
                    <u-navbar-menu-item>Navbar</u-navbar-menu-item>
                    <u-navbar-menu-item>Sidebar</u-navbar-menu-item>
                    <u-navbar-menu-item>Menu</u-navbar-menu-item>
                </u-navbar-menu>
            </u-navbar-menu-item>
        </u-navbar-menu>
    </u-navbar-dropdown>
    <u-navbar-select>
        <u-navbar-select-item>请选择</u-navbar-select-item>
        <u-navbar-select-item>中文</u-navbar-select-item>
        <u-navbar-select-item>English</u-navbar-select-item>
        <u-navbar-select-item>Français</u-navbar-select-item>
        <u-navbar-select-item>Русский</u-navbar-select-item>
    </u-navbar-select>
</u-navbar>
```

### 颜色扩展

``` html
<u-linear-layout direction="vertical">
    <u-navbar value="3" :router="false">
        <u-navbar-item value="1">指南</u-navbar-item>
        <u-navbar-item value="2">概念</u-navbar-item>
        <u-navbar-item value="3">组件</u-navbar-item>
    </u-navbar>
    <u-navbar value="3" :router="false" color="inverse">
        <u-navbar-item value="1">指南</u-navbar-item>
        <u-navbar-item value="2">概念</u-navbar-item>
        <u-navbar-item value="3">组件</u-navbar-item>
    </u-navbar>
</u-linear-layout>
```
