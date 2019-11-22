# UBadge 徽章

### 基本用法

``` html
<p>消息 <u-badge :value="3"></u-badge></p>
<p>消息 <u-badge value="new"></u-badge></p>
```

### 右上角

``` html
<u-badge :value="3" corner>
    <u-button>评论</u-button>
</u-badge>
```

### 最大值

``` html
<u-badge :value="120" :max="99" corner>
    <u-button>评论</u-button>
</u-badge>
```

### 小圆点

``` html
<p>消息 <u-badge :value="3" dot></u-badge></p>
<p><u-badge :value="3" corner dot>
    <u-button>评论</u-button>
</u-badge></p>
```
