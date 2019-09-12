### 基本用法

步骤从`0`开始。

``` html
<u-steps :value="1">
    <u-step title="Step1">Content1</u-step>
    <u-step title="Step2">Content2</u-step>
    <u-step title="Step3">Content3</u-step>
</u-steps>
```

### 自定义标题

``` html
<u-steps :value="1">
    <u-step>
        <span slot="title">Step <u-label>1</u-label></span>
        Content1
    </u-step>
    <u-step>
        <span slot="title">Step <u-label>2</u-label></span>
        Content2
    </u-step>
    <u-step>
        <span slot="title">Step <u-label>3</u-label></span>
        Content3
    </u-step>
</u-steps>
```

### 宽度自适应

``` html
<u-steps :value="1" size="auto">
    <u-step title="Step1">Content1</u-step>
    <u-step title="Step2">Content2</u-step>
    <u-step title="Step3">Content3</u-step>
</u-steps>
```

### 可选择

将`readonly`属性设置为`false`，可以进行选择。

``` html
<u-steps :value="1" :readonly="false">
    <u-step title="Step1">Content1</u-step>
    <u-step title="Step2">Content2</u-step>
    <u-step title="Step3">Content3</u-step>
</u-steps>
```

### 禁用

``` html
<u-steps :value="0" :readonly="false">
    <u-step title="Step1">Content1</u-step>
    <u-step title="Step2" disabled>Content2</u-step>
    <u-step title="Step3">Content3</u-step>
</u-steps>
```
