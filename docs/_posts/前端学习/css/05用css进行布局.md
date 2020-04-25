---
date: 2020-04-20
title: 使用 css 进行布局
category: Designer
tags:
  - CSS3
vssue-title: 使用 css 布局
---

介绍常用布局元素以及使用方法

<!-- more -->

## 布局方法

网站设计主要有两大类型：固定宽度和响应式。

固定（fixed）布局，整个页面和每一栏都有基于像素的宽度

响应式页面也称为流式（fluid 或 liquid）页面，它使用百分数定义宽度，允许页面随显示环境的改变进行放大或缩小。除了具有流动栏，响应式页面还可以根据屏幕尺寸以特定方式调整其设计

为了适配不同的显示设备，还是使用响应式布局比较好

## 构建页面

恰当地使用 `article` 、`aside`、`nav`、`section`、`header`、`footer` 和 `div` 等元素将页面划分成不同的逻辑区块。

按照一定的顺序放置内容，确保页面在不使用 CSS 的情况下也是合理的，将最重要的内容放在最上面，对于智能手机和平板电脑等小屏幕用户来说，不用滚动太远就能获取主体内容。此外，搜索引擎“看到”的页面也类似于未应用 CSS 的页面，因此，如果将主体内容提前，搜索引擎就能更好地对网站进行索引。这同样也会让屏幕阅读器用户受益。

以一致的方式使用标题元素（h1 ～h6），从而明确地标识页面上这些区块的信息，并对它们按优先级排序。

使用合适的语义标记剩余的内容，如段落、图和列表。

如果有必要，使用注释来标识页面上不同的区域及其内容

## 对默认样式进行重置或标准化

每个浏览器都有内置的默认样式表。HTML 会遵照该样式表显示，可以自己编写 CSS 覆盖它们。整体上，不同浏览器提供的默认样式表是相似的，但也存在一定的差异。为此，在应用 CSS 之前，常常需要抹平这些差异。抹平差异的方法主要有两种（只使用其中一种即可）。

1. 使用 CSS 重置（reset）开始主样式表，如 Eric Meyer 创建的 [Meyer 重置](http://meyerweb.com/eric/tools/css/reset/)

2. 使用 Nicolas Gallagher 和 Jonathan Neal 创建的 [normalize.css](http://necolas.github.com/normalize.css/) 开始主样式表。

## 盒模型

CSS 处理网页时，它认为每个元素都包含在一个不可见的盒子里。这就是众所周知的盒模型，这里的盒子由内容区域、内容区域周围的空间（内边距，padding）、内边距的外边缘（边框，border）和边框外面将元素与相邻元素隔开的不可见区域（外边距，margin）共四部分构成

![2020-04-20-15-52-11](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-15-52-11.png)

### CSS 的 width 属性

关于 CSS 的 width 属性对元素所显示宽度的影响，有两种处理方式。（不包含任何将其与邻近元素隔开的外边距。）默认的处理方式实际上有些有悖于常理。浏览器中元素的宽度与其 width 属性值并不一致（除非它没有内边距和边框）。CSS 中的宽度指示的是内边距里内容区域的宽度。而元素在浏览器中的显示宽度则是内容宽度、左右内边距和左右边框的总和。显示高度与之类似，只不过计算的是上下内边距和边框值。

>每个元素的盒子都有一些决定该元素所占空间及其外观的要素。可以使用 CSS 分别控制各个要素。注意，在默认情况下，宽度和高度仅定义内容区域的尺寸。背景（蓝色区域）会延伸到边框的后面，因此，通常情况下，它仅在内边距所延伸到的区域可见，除非边框是透明的或半透明的

对大多数代码编写人员来说，另一种方式则更为直观。使用这种方式的话，元素的显示宽度就等于 width 属性的值。内容宽度、内边距和边框都包含在里面。height 属性与之类似。要使用这种模式，仅需对元素设置 `box-sizing: border-box;`。

![2020-04-20-16-05-36](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-16-05-36.png)

## 控制元素的显示类型和可见性

### 控制显示类型

每个元素在默认情况下要么显示在单独的行（如 h1 ～ h6、p 等），要么显示在行内（如 em、strong、cite 等）前一种元素称为块级元素，后一种称为行内元素

造成这种情况的本质是它们的 display 属性，即块级元素被设置为 `display: block`（对于 li 元素为 `display: list-item`），而行内元素被设置为 `display: inline`。

```css
em {
  display: block;
}
```
使用 CSS 可以改变元素的默认显示类型

设置为 `display: inline;` 的元素不接受 `padding`（内边距） 的设置， 但 `padding-top` 和 `padding-bottom` 会越界进入相邻元素的区域，而不是局限于该元素本身的空间。（可以使用 backgroud 进行测试）

还有一种混合显示方式称为 `inline-block`，让元素与其他内容出现在同一行，同时具有块级元素的属性

```css
em {
  display: inline-block;
}
```

渲染效果是这样：

```html
test<em style="display: inline-block; background: lightgreen; width: 200px;">testem  </em> test
```
![2020-04-21-14-36-43](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-21-14-36-43.png =366x84)

设置为 inline 的元素会忽略任何 width、height、margin-top 和 margin-bottom 设置。不过，设置为 inline-block 的元素可以使用这些属性，如这里的 em 可以设置 width。

>默 认 情 况 下， 元 素 会 按 照 它 们 在 HTML 中自上而下出现的次序显示（这称为文档流，document flow），并在每个非行内元素的开头和结尾处换行。

### 控制可见性

visibility 属性的主要目的是控制元素是否可见。与 `display:none` 属性不同的是，使用 visibility 隐藏元素时，元素及其内容应该出现的位置会留下一片空白区域。隐藏元素的空白区域仍然会在文档流中占据位置。
1. 在样式表规则中，输入 `visibility:`。
2. 输入 hidden，让元素不可见，但在文档流中保留它；或者输入 visible，让元素显示出来

```css
em {
  visibility: hidden;
}
```

```html
test<em style="visibility: hidden">testem  </em> test
```
渲染效果：

test<em style="visibility: hidden">testem  </em> test

>隐藏的 em 文字所在的位置出现了一块空白，就像是将 em 文字设成了白色。空白的尺寸与文本（或者其他任何隐藏的内容）的大小完全一致

## 设置元素的高度和宽度

可以为很多元素设置高度和宽度，如分块内容、段落、列表项、div、图像、video、表单元素等。

同时，可以为短语内容元素（默认以行内方式显示的） 设 置 `display: block;` 或`display: inline-block;`，再对它们设置宽度或高度。

输入 width: w，其中的 w 是元素内容区域的宽度，可以表示为长度（带单位，如 px、em 等）或父元素的百分数。或者使用 auto 让浏览器计算宽度（这是默认值）。

输入 height: h，其中的 h 是元素内容区域的高度，只能表示为长度（带单位，如 px、em 等）。或者使用 auto 让浏览器计算高度（这是默认值）。

>百分数是相对于父元素的宽度的，而不是相对于元素本身的原始宽度的。width 和 height 不是继承的。
```css
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
```
可以使用 * 通配符对所有元素应用 border-box 的规则。当然，也可以单独对元素应用该规则（用你需要的选择器替换 * 即可）。带有-webkit- 和 -moz- 这些奇怪前缀的属性可以让这些规则在旧的 Android 和 iOS 设备上起作用，同时在 Firefox 上也能正常工作。

不能为显示为行内元素的元素（如短语内容）设置高度或宽度，除非为它们设置 display: inline-block 或 display: block。

### 为什么 min-height 通常比 height 更适用

除非你确定元素的内容不会变得更高，最好避免在样式表中指定高度。在大多数情况下，可以让内容和浏览器自动控制高度。这可以让内容在浏览器和设备中根据需要进行流动。

如果设置了高度，随着内容变多，它们有可能撑破元素的盒子，这可能是你预期之外的。在这种情况下，符合标准的浏览器不会自动扩大高度，它们在你指定高度时采用了这个指令，并一直坚持下去

不过，如果希望元素至少具有某一特定高度，可以设置 min-height。如果内容日后变多，元素的高度会自动按需增长。这 是 height 与 min-height 的 区 别，width 和 min-width 也是类似的。或许你还有所疑虑，实际上，很多原因都会导致内容增长。你的内容或许来自数据库、第三方源或由用户生成的内容。同时，访问者可能增大其浏览器的字体大小，覆盖你指定的样式。

## 在元素周围添加内边距

内容与可视化的边框之间的边距就是内边距

可以改变内边距的宽度（厚度）不能改变它的颜色或纹理。显示在内边距区域的颜色和纹理是**元素**的背景，是通过 background、background-color 或者 background-image 设置的。

同外边距类似，如果为 padding 设置四个值，那么它们分别表示上、右、下、左（按时钟顺序）内边距。三个值就是上左右，两个值就是上下、左右
也可以输入 padding-top: x;、paddingright: x;、padding-bottom: x; 或者 paddingleft: x; 单独为一个边添加内边距

```css
.about {
  background-color: #2b2b2b;
  padding: .3125em .625em .625em;
}
```
>单位统一用 rem 比较好

![2020-04-20-18-53-23](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-18-53-23.png)
>　这些链接之前都挤在一起（上），添加了内边距后，它们就有“呼吸”的空间了（下）

内边距不是继承属性

## 设置边框

边框可以应用于任何元素，包括图像。如果希望对一个以上的元素设置相同的边框样式，最好引入一个类，从而可以复用，例如 `.frame {border: 5px solid #bebebe; }`

### 定义边框风格
输入 border-style: type，其中的 type 可以是 none、dotted（点线）、dashed（虚线）、solid（实线）、double（双线）、groove（槽线）、ridge（脊线）、inset（凹边）或 outset（凸边）。

###  设置边框宽度

输入 border-width: n，这里的 n 是需要的宽度（含单位，如 4px）。

### 设置边框颜色

输入 border-color: color，这里的 color 是颜色名称、十六进制值或 RGB、HSL、RGBA、HSLA 颜色

### 简写

1. 输入 border。
2. 如 果 需 要， 输 入 -top、-right、-bottom 或 -left 将边框效果限制在某一条边上。
3. 如果需要，输入 -property，这里的 property 可以是 style（风格）、width（宽度）或 color（颜色），仅使用单个属性设置边框。
4. 输入冒号（:）。
5. 输入恰当的值（如前面介绍的那样）。如果跳过了第 (3) 步，则可以指定所有三种边 框 属 性（ 如 border:1px solid 和 `borderright: 2px dashed green;`）。如果在第 (3) 步中指定了一种属性，则只能使用这种属 性 可 以 接 受 的 值（ 如 `border-right-style: dotted;`）。

## 设置元素周围的外边距
  margin: 余量

设置元素外边距的方法
输入 margin: x，其中的 x 是要添加的空间量，可以表示为长度、相对父元素宽度的百分数或 auto。
也可以输入 margin-top: x;、margin-right:x;、margin-bottom: x; 或者 margin-left: x; 为元素的一条边应用外边距

如果对 margin 使用一个值，这个值就会应用于全部四个边。如果使用两个值，那么前一个值会应用于上下两边，后一个值会应用于左右两边。如果使用三个值，那么第一个值会应用于上边，第二个值会应用于左右两边，第三个值会应用于下边。如果使用四个值，那么它们会按照时钟顺序，依次应用于上、右、下、左四个边。

>如果元素位于另一个元素的上面，对于相互接触的两个 margin（即元素相互接触的下外边距和上外边距），仅使用其中较大的一个，另一个外边距会被叠加。左右外边距不叠加。

外边距不是继承的。

## 使元素浮动

可以通过 float 属性使元素浮动在文本或其他元素上。可以使用这种技术让文本环绕在图像或者其他元素周围，也可以使用这种技术创建多栏布局等，值有 left,right,none 三个。
```css
.post-photo {
  float: left;
  margin-bottom: 2px;
  margin-right: 22px;
}
```
> 只要让一个设置了宽度的元素浮动，在正常情况下显示在它下面的内容就会流动到它的周围（前提是这些内容没有设置宽度）。

::: details 查看渲染结果
![2020-04-20-21-54-12](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-21-54-12.png)
:::

将 folat 应用于两栏布局的生成：
```css
main {
  float: left;
  width: 600px; /* 62.5% = 600px/960px */
}
.sidebar {
  float: right;
  margin-top: 1.875em; /* 30px/16px */
  width: 300px; /* 31.25% = 300px/960px */
}
```
>可以用类似的方法让两个元素并排在一起，如主要内容和附注栏。它们都指定了宽度，因此都可以进行浮动

float 属性不是继承的。

### 控制元素浮动的位置

可以使用 clear 属性清除浮动效果。如果对某个元素使用该属性，该元素和它后面的元素就会显示在浮动元素的下面。（适用于页脚这种类型的选择器）
```css
.post-footer {
  clear: left;
}
``` 
输入 clear:
输入 left，阻止元素浮动在该元素的左边；或输入 right，阻止元素浮动在该元素的右边；或输入 both，阻止元素浮动在该元素的左右两边；或输入 none（默认值），允许元素浮动在该元素的左右两边。
如果要让浮动元素的祖先元素在高度上包含浮动元素，并消除浮动，可以使用 clearfix 或 overflow 方法替代前两步

### clearfix:
### overflow:

## 对元素进行定位

### 相对定位

每个元素在页面的文档流中都有一个自然位置。相对于这个原始位置对元素进行移动就称为相对定位。周围的元素完全不受此影响

```html
<h4>Relative Positioning</h1>
<p>When you position an element relatively,you <span class="example">position it</span> relative to its normal location.</p>
```

```css
.example {
  position: relative;
  top: 35px;
  left: 100px;
}
```
渲染效果：

![2020-04-21-14-36-00](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-21-14-36-00.png =685x165)

偏移自然流中元素的步骤
1. 输入 `position: relative;`。
2. 输 入 `top`、`right`、`bottom` 或 left。再输入 :d，这里的 d 是希望元素从它的自然位置偏移的距离，可以表示为绝对值（如 10px）、相对值（如 2em）或百分数。值可负可正。需要添加其他偏移量，可重复这一步。

>其他元素不会受到偏移的影响，仍然按照这个元素原来的盒子进行排列。设置了相对定位的内容可能与其他内容重叠，这取决于 top、right、bottom 和 left 的值。

对元素设置 position: static，可以覆盖 position: relative 设置。static 是元素的默认值，这就是元素出现在常规文档流中的原因。

这种属性肯定也不是继承的
 
## 对元素进行绝对定位

网页中的元素通常按照它们在 HTML 源代码中出现的次序进行排列，除非你使用 CSS 规则改变前面的样式。
也就是说，如果 img 元素出现在 p 元素之前，图像就出现在段落的前面。通过对元素进行绝对定位，即指定它们相对于 body 或最近的已定位祖先元素的精确位置，可以让元素脱离正常的文档流。

这与相对定位不同，绝对定位的元素不会在原先的位置留下空白。这与让元素浮动也不同。对于绝对定位的元素，其他元素不会环绕在它的周围。其他内容不知道它的存在，它也不知道其他内容的存在。

```css
.masthead {
  position: relative;
}
.masthead .social-sites {
  position: absolute;
  top: 41px;
  right: 0;
}
```
>在没有另外进行指定的情况下，设置 position: absolute 的元素是相对于 body 进行定位的

1. 输入 position: absolute;。
2. 根据需要，输入 top、right、bottom 或 left。再输入 :d，这里的 d 是希望元素相对于其祖先元素偏移的距离（如 10px 或 2em）或相对于其祖先的百分数
3. 根据需要，对其他方向重复第 (2) 步。
4. 根据需要，对希望成为绝对定位参照体的祖先元素添加 position: relative;。如果跳过这一步，将对元素相对于 body 计算偏移量（如图 11.14.4 所示）。

还有一种定位类型称为固定定位。当访问者滚动浏览器窗口时，页面内容通常随之上下移动。如果对元素设置 position:fixed;，它就会固定在浏览器窗口中。当访问者上下滚动浏览器窗口时，该元素不会随之移动，页面的其余部分仍照常滚动。这跟固定背景图像的工作原理类似。固定定位在很多移动浏览器中效果不佳，因此如果你希望自己的网页能很好地适应移动设备，最好不要使用固定定位。

>对元素设置 position: static 将覆盖 position: absolute; 的设置。static 是元素定位的默认值，这也是元素为什么出现在常规文档流中的原因。

## 在栈中定位元素

当你开始使用相对定位、绝对定位和固定定位以后，很可能发现元素相互重叠的情况，这时可以选择哪些元素应该出现在顶层

```css
div {
 border: 1px solid #666;
 height: 125px;
 position: absolute;
 width: 200px;
}
.box1 {
 background: pink;
 left: 110px;
 top: 50px;
 z-index: 120;
}
.box2 {
 background: yellow;
 left: 0;
 top: 130px;
 z-index: 530;
}
.box3 {
 background: #ccc;
 position: static;
/* 静态的，没有任何效果 */
 z-index: 1000;
}
.box4 {
 background: orange;
 left: 285px;
 top: 65px;
 z-index: 3;
}
```
对于定位元素，z-index 最高的数显示在最上面，不管该元素在 HTML 中出现的次序。

第 一 条 规 则 为 所 有 四 个 div 设 置 了 position: absolute;，
而定义 .box3 时又覆盖了这一规则，让 .box3 回 到 默 认 的 static。 
因 此， 尽 管 它 的 z-index 值最高，但这没有任何效果，它总是位于最底层
![2020-04-20-22-44-31](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-22-44-31.png)
定位的盒子按照 z-index 由高到低的次序进行叠放。第三个盒子位于最底层，因为它处于常规的文档流

## 处理溢出

元素并不总是包含在它们自己的盒子里。这可能是因为盒子不够大，例如，图像比它的容器更宽就会溢出；也可能是因为使用负的外边距或绝对定位让内容处于盒子的外面；还有可能你对元素设置了显式高度，它的内容太高而无法装入盒子内部。无论是哪种情况，都可以使用 overflow 属性控制元素在盒子外面的部分

决定浏览器如何处理溢出的步骤
1. 输入 overflow:。
2. 输入 visible，让元素盒子中的所有内容可见，这是默认项；
或者输入 hidden，隐藏元素盒子容纳不了的内容；
或者输入 scroll，无论元素是否需要，都在元素上添加滚动条；（统一样式）
或者输入 auto，让滚动条仅在访问者访问溢出内容时出现。

## 垂直对齐元素

使元素垂直对齐的步骤
(1) 输入 vertical-align:。
(2) 输入 baseline，使元素的基准线对齐父元素的基准线；
或者输入 middle，使元素位于父元素中央；
或者输入 sub，使元素成为父元素的下标；
或者输入 super，使元素成为父元素的上标；
或者输入 text-top，使元素的顶部对齐父元素的顶部；
或者输入 text-bottom，使元素的底部对齐父元素的底部；
或者输入 top，使元素的顶部对齐当前行里最高元素的顶部；
或者输入 bottom，使元素的底部对齐当前行里最低元素的底部；
或者输入元素行高的百分比，可以是正数，也可以是负数；
或者输入某个值（正负均可，单位为像素或 em）分别按照特定的值向上或者向下移动元素。

## 修改鼠标指针

修改指针形状的步骤

1. 输入 cursor:。
2. 输入 pointer 表示停留在链接上时通常显示的指针形状 

| pointer     | 描述                                                                     |
| ----------- | ------------------------------------------------------------------------ |
| url         | 需使用的自定义光标的 URL。 ` cursor: url('/pointer/default.cur'), auto;` |
| default     | 默认光标（通常是一个箭头）                                               |
| auto	默认。 | 浏览器设置的光标。                                                       |
| crosshair   | 光标呈现为十字线。                                                       |
| pointer     | 光标呈现为指示链接的指针（一只手）                                       |
| move        | 此光标指示某对象可被移动。                                               |
| text        | 此光标指示文本。                                                         |
| wait        | 此光标指示程序正忙（通常是一只表或沙漏）。                               |
| help        | 此光标指示可用的帮助（通常是一个问号或一个气球）。                       |
| e-resize    | 此光标指示矩形框的边缘可被向右（东）移动。                               |
| ne-resize   | 此光标指示矩形框的边缘可被向上及向右移动（北/东）。                      |
| nw-resize   | 此光标指示矩形框的边缘可被向上及向左移动（北/西）。                      |
| n-resize    | 此光标指示矩形框的边缘可被向上（北）移动。                               |
| se-resize   | 此光标指示矩形框的边缘可被向下及向右移动（南/东）。                      |
| sw-resize   | 此光标指示矩形框的边缘可被向下及向左移动（南/西）。                      |
| s-resize    | 此光标指示矩形框的边缘可被向下移动（南）。                               |
| w-resize    | 此光标指示矩形框的边缘可被向左移动（西）。                               |
