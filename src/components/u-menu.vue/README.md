# UMenu 菜单

<s-component-labels :labels="[
    'UI 组件', '路由链接', '块级展示',
]"></s-component-labels>

菜单组件支持路由、触发关闭、多级菜单等功能。

## 基础示例

### 基本用法

可以结合 Popup 或 Popper 弹出菜单。

``` html
<u-linear-layout>
    <u-button>
        Popup 菜单
        <u-popup>
            <u-menu slot="root">
                <u-menu-item to="/guides/">指南</u-menu-item>
                <u-menu-item to="/api/">API</u-menu-item>
                <u-menu-item to="/components/">原型组件</u-menu-item>
                <u-menu-item href="https://github.com/vusion">GitHub</u-menu-item>
            </u-menu>
        </u-popup>
    </u-button>
    <u-button>
        Popper 菜单
        <m-popper>
            <u-menu value="3" :router="false" style="width: 128px;">
                <u-menu-item to="/guides/">指南</u-menu-item>
                <u-menu-item to="/api/">API</u-menu-item>
                <u-menu-item to="/components/">原型组件</u-menu-item>
                <u-menu-item href="https://github.com/vusion">GitHub</u-menu-item>
            </u-menu>
        </m-popper>
    </u-button>
</u-linear-layout>
```

### 多级菜单

``` html
<u-linear-layout direction="vertical">
    <u-menu style="width: 200px;">
        <u-menu-item>指南</u-menu-item>
        <u-menu-item>API
            <u-menu slot="sub">
                <u-menu-item to="/api/cli">命令行工具（CLI）</u-menu-item>
                <u-menu-item to="/api/config">配置</u-menu-item>
            </u-menu>
        </u-menu-item>
        <u-menu-item>组件
            <u-menu slot="sub">
                <u-menu-item>原型组件
                    <u-menu slot="sub">
                        <u-menu-item>Basic
                            <u-menu slot="sub">
                                <u-menu-item to="/components/u-link">链接 Link</u-menu-item>
                                <u-menu-item to="/components/u-button">按钮 Button</u-menu-item>
                                <u-menu-item to="/components/u-badge">徽章 Badge</u-menu-item>
                            </u-menu>
                        </u-menu-item>
                        <u-menu-item>Navigation
                            <u-menu slot="sub">
                                <u-menu-item to="/components/u-navbar">导航栏 Navbar</u-menu-item>
                                <u-menu-item to="/components/u-sidebar">侧边栏 Sidebar</u-menu-item>
                                <u-menu-item to="/components/u-menu">菜单 Menu</u-menu-item>
                            </u-menu>
                        </u-menu-item>
                        <u-menu-item>Popper
                            <u-menu slot="sub">
                                <u-menu-item to="/components/m-popper">弹出层 Popper</u-menu-item>
                                <u-menu-item to="/components/u-tooltip">工具提示 Tooltip</u-menu-item>
                                <u-menu-item to="/components/u-popup">弹出框 Popup</u-menu-item>
                            </u-menu>
                        </u-menu-item>
                    </u-menu>
                </u-menu-item>
                <u-menu-item to="/ui-design">组件设计方案</u-menu-item>
            </u-menu>
        </u-menu-item>
        <u-menu-item target="_blank" href="https://github.com/vusion">GitHub</u-menu-item>
    </u-menu>
    <div>
        <u-button>
            多级菜单
            <u-popup>
                <u-menu slot="root" style="width: 200px;">
                    <u-menu-item>指南</u-menu-item>
                    <u-menu-item>API
                        <u-menu slot="sub">
                            <u-menu-item to="/api/cli">命令行工具（CLI）</u-menu-item>
                            <u-menu-item to="/api/config">配置</u-menu-item>
                        </u-menu>
                    </u-menu-item>
                    <u-menu-item>组件
                        <u-menu slot="sub">
                            <u-menu-item>原型组件
                                <u-menu slot="sub">
                                    <u-menu-item>Basic
                                        <u-menu slot="sub">
                                            <u-menu-item to="/components/u-link">链接 Link</u-menu-item>
                                            <u-menu-item to="/components/u-button">按钮 Button</u-menu-item>
                                            <u-menu-item to="/components/u-badge">徽章 Badge</u-menu-item>
                                        </u-menu>
                                    </u-menu-item>
                                    <u-menu-item>Navigation
                                        <u-menu slot="sub">
                                            <u-menu-item to="/components/u-navbar">导航栏 Navbar</u-menu-item>
                                            <u-menu-item to="/components/u-sidebar">侧边栏 Sidebar</u-menu-item>
                                            <u-menu-item to="/components/u-menu">菜单 Menu</u-menu-item>
                                        </u-menu>
                                    </u-menu-item>
                                    <u-menu-item>Popper
                                        <u-menu slot="sub">
                                            <u-menu-item to="/components/m-popper">弹出层 Popper</u-menu-item>
                                            <u-menu-item to="/components/u-tooltip">工具提示 Tooltip</u-menu-item>
                                            <u-menu-item to="/components/u-popup">弹出框 Popup</u-menu-item>
                                        </u-menu>
                                    </u-menu-item>
                                </u-menu>
                            </u-menu-item>
                            <u-menu-item to="/ui-design">组件设计方案</u-menu-item>
                        </u-menu>
                    </u-menu-item>
                    <u-menu-item target="_blank" href="https://github.com/vusion">GitHub</u-menu-item>
                </u-menu>
            </u-popup>
        </u-button>
    </div>
</u-linear-layout>
```

### 禁用、禁用某一项

``` html
<u-grid-layout>
    <u-grid-layout-column :span="4">
        <u-menu disabled>
            <u-menu-item>指南</u-menu-item>
            <u-menu-item>概念</u-menu-item>
            <u-menu-item to="/proto-ui">组件</u-menu-item>
        </u-menu>
    </u-grid-layout-column>
    <u-grid-layout-column :span="4">
        <u-menu>
            <u-menu-item>指南</u-menu-item>
            <u-menu-item disabled>概念</u-menu-item>
            <u-menu-item to="/proto-ui">组件</u-menu-item>
        </u-menu>
    </u-grid-layout-column>
</u-grid-layout>
```

### 分隔符

``` html
<u-menu style="width: 200px;">
    <u-menu-item>指南</u-menu-item>
    <u-menu-item>概念</u-menu-item>
    <u-menu-item>配置</u-menu-item>
    <u-menu-divider></u-menu-divider>
    <u-menu-item to="/proto-ui">组件</u-menu-item>
    <u-menu-item to="/libraries">组件库</u-menu-item>
</u-menu>
```

### 分组

``` html
<u-grid-layout>
    <u-grid-layout-row>
        <u-grid-layout-column :span="4">
            <p>默认，无折叠功能</p>
            <u-menu>
                <u-menu-group title="Basic">
                    <u-menu-item>链接</u-menu-item>
                    <u-menu-item>按钮</u-menu-item>
                    <u-menu-item>标签</u-menu-item>
                </u-menu-group>
                <u-menu-group title="Navigation">
                    <u-menu-item>导航栏</u-menu-item>
                    <u-menu-item to="/components/u-menu">侧边栏</u-menu-item>
                    <u-menu-item>标签页</u-menu-item>
                </u-menu-group>
                <u-menu-group title="Form">
                    <u-menu-item>单行输入</u-menu-item>
                    <u-menu-item>多行输入</u-menu-item>
                    <u-menu-item>选择框</u-menu-item>
                    <u-menu-item>表单</u-menu-item>
                </u-menu-group>
            </u-menu>
        </u-grid-layout-column>
    </u-grid-layout-row>
</u-grid-layout>
```

## UMenu
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| router | Boolean | `true` | 是否根据vue-router来控制选择哪一项 |
| value.sync, v-model | Any | | 当前选择的值 |
| collapsible | Boolean | `false` | 分组是否可以折叠 |
| accordion | Boolean | `false` | 是否每次只会展开一个分组 |
| expand-trigger | String | `'click'` | 展开/折叠的触发方式。可选值：`'click'`表示整行点击均可触发、`'click-expander'`表示仅点击小箭头时触发 |
| readonly | Boolean | `false` | 是否只读 |
| disabled | Boolean | `false` | 是否禁用 |

### Slots

#### (default)

插入`<u-menu-item>`、`<u-menu-divider>`或`<u-menu-group>`子组件。

### Events

#### @before-select

选择某一项前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Any | 选择项的值 |
| $event.oldValue | Any | 旧的值 |
| $event.item | Object | 选择项相关对象 |
| $event.itemVM | UMenuItem | 选择项子组件 |
| $event.preventDefault | Function | 阻止选择流程 |

#### @input

选择某一项时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | Any | 选择项的值 |

#### @select

选择某一项时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Any | 改变后的值 |
| $event.oldValue | Any | 旧的值 |
| $event.item | Object | 选择项相关对象 |
| $event.oldItem | Object | 旧的选择项相关对象 |
| $event.itemVM | UMenuItem | 选择项子组件 |
| $event.oldVM | UMenuItem | 旧的选择项子组件 |
| senderVM | UMenu | 发送事件实例 |

#### @toggle

展开/折叠某分组时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.expanded | Boolean | 展开/折叠状态 |
| $event.groupVM | UMenuGroup | 分组组件 |

### Methods

#### toggleAll(expanded)

展开/折叠所有分组

| Param | Type | Description |
| ----- | ---- | ----------- |
| expanded | Boolean | 展开/折叠 |

## UMenuItem
### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| value | Any | | 此项的值 |
| disabled | Boolean | `false` | 禁用此项 |
| item | Object | | 相关对象。当选择此项时，抛出的事件会传递该对象，便于开发 |
| href | String |  | 链接地址 |
| target | String |  | 打开方式 |
| to | String, Location |  | 需要 vue-router，与`<router-link>`的`to`属性相同。可以是一个字符串或者是描述目标位置的对象。 |
| replace | Boolean | `false` | 需要 vue-router，与`<router-link>`的`replace`属性相同。如果为`true`，当点击时，会调用`router.replace()`而不是`router.push()`，于是导航后不会留下`history `记录。 |
| exact | Boolean | `false` | 需要 vue-router，与`<router-link>`的`exact`属性相同。是否与路由完全一致时才高亮显示。 |

### Slots

#### (default)

插入文本或 HTML。

### Events

#### @click

点击此项时触发，与原生 click 事件不同的是，它只会在非只读和禁用的情况下触发。

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event | MouseEvent | 鼠标事件对象 |
| senderVM | Vue | 发送事件实例 |

#### @before-select

选择此项前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.value | Any | 此项的值 |
| $event.item | Object | 此项的相关对象 |
| $event.itemVM | UMenuItem | 此组件 |
| $event.preventDefault | Function | 阻止选择流程 |
| senderVM | Vue | 发送事件实例 |

#### @before-navigate

使用router相关属性切换路由前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.to | String, Location | `to`属性的值 |
| $event.replace | Boolean | `replace`属性的值 |
| $event.exact | Boolean | `exact`属性的值 |
| $event.preventDefault | Function | 阻止切换流程 |
| senderVM | Vue | 发送事件实例 |

#### @navigate

使用router相关属性切换路由时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.to | String, Location | `to`属性的值 |
| $event.replace | Boolean | `replace`属性的值 |
| $event.exact | Boolean | `exact`属性的值 |
| senderVM | Vue | 发送事件实例 |

## UMenuGroup

### Props/Attrs

| Prop/Attr | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
| title | String |  | 显示的标题 |

### Slots

#### (default)

插入`<u-menu-item>`或`<u-menu-divider>`子组件。

#### sub

插入子菜单`<u-menu>`。

#### title

自定义标题文本。

#### extra

在右侧可以附加内容。

### Events

#### @before-toggle

展开/折叠此分组前触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.expanded | Boolean | 展开/折叠状态 |
| $event.groupVM | UMenuGroup | 分组组件 |
| $event.preventDefault | Function | 阻止展开/折叠流程 |
| senderVM | Vue | 发送事件实例 |

#### @toggle

展开/折叠某分组时触发

| Param | Type | Description |
| ----- | ---- | ----------- |
| $event.expanded | Boolean | 展开/折叠状态 |
| $event.groupVM | UMenuGroup | 分组组件 |
| senderVM | Vue | 发送事件实例 |

## UMenuDivider API

无


