---
title: css 
date: 2020-05-16
category: Designer
tags:
  - CSS3
---

> [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_Blocks)

<!-- more -->

之前笔记很乱，乱的不能看，干脆全部重写一遍

## 继承

CSS 为控制继承提供了四个特殊的通用属性值。每个 css 属性都接收这些值。

- [inherit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit)
  设置该属性会使子元素属性和父元素相同。实际上，就是 "开启继承".
- [initial](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial)
  设置属性值和浏览器默认样式相同。如果浏览器默认样式中未设置且该属性是自然继承的，那么会设置为 inherit 。
- [unset](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset)
  将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit，否则和 initial 一样

CSS 的属性 `all` 可以用于同时将这些继承值中的一个应用于（几乎）所有属性。它的值可以是其中任意一个 (`inherit, initial, unset, or revert`)。这是一种撤销对样式所做更改的简便方法，以便回到之前已知的起点。

## 选择器

列出选择器的各种写法，以及各种应用后的示例效果链接

| 选择器                                                                                         | 示例                |
| ---------------------------------------------------------------------------------------------- | ------------------- |
| 类型选择器                                                                                     | `h1{} `             |
| 类选择器                                                                                       | `.box{}`            |
| ID 选择器                                                                                      | `#unique{} `        |
| [属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)             | `a[title]{}`        |
| [伪类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)                  | `p:first-child { }` |
| [伪元素选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)               | `p::first-line { }` |
| [后代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator)           | `article p`         |
| [子代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator)                | `article > p`       |
| [相邻兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator) | `h1 + p`            |
| [通配选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)             | `*{}`               |
| [通用兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator)  | `p~span{}`          |

```css
/* 图片后面紧跟着的段落将被选中，实现类似知乎的图片描述功能 */
img + p {
  font-style: bold;
}
```

## 盒模型

CSS中组成一个块级盒子需要:

- Content box: 这个区域是用来显示内容，大小可以通过设置 width 和 height.
- Padding box: 包围在内容区域外部的空白区域； 大小通过 padding 相关属性设置。 //填充
- Border box: 边框盒包裹内容和内边距。大小通过 border 相关属性设置。
  - `border-radius`：创建圆角，可以使用两个长度或百分比作为值，第一个值定义水平半径，第二个值定义垂直半径。
  - [border-width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width)
  - [border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style)
  - [border-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color)
  - 也可以使用再细分[border-top-width...](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-width)
- Margin box: 这是最外面的区域，是盒子和其他元素之间的空白区域。大小通过 margin 相关属性设置。//余量
  如果你有两个外边距相接的元素，这些外边距将合并为一个外边距，即最大的单个外边距的大小。

通常使用 `box-sizing: border-box;` 来替代默认内容宽度盒模型

```css
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
```

block box

- 盒子会在内联的方向上扩展并占据父容器在该方向上的所有可用空间，在绝大数情况下意味着盒子会和父容器一样宽
- 每个盒子都会换行
- width 和 height 属性可以发挥作用
- 内边距（padding）, 外边距（margin） 和 边框（border） 会将其他元素从当前盒子周围“推开”

inline box

- 盒子不会产生换行。
- width 和 height 属性将不起作用。
- 内边距、外边距以及边框会被应用但是不会把其他处于 inline 状态的盒子推开。

display: inline-block

- 不希望一个项切换到新行，但希望它可以设定宽度和高度
- 设置width 和height 属性会生效。
- padding, margin, 以及border 会推开其他元素。
- 但是，它不会跳转到新行，如果显式添加width 和height 属性，它只会变得比其内容更大。

## 背景

虽然可以将所有的背景属性简写到一行中，但是我觉得不用比较好

- `background-color`
- [background-image](https://www.jianshu.com/p/58b340a037ea) 以及渐变背景的详细使用
  - 默认情况下，大图不会缩小以适应方框，因此我们只能看到它的一个小角，而小图则是平铺以填充方框。
  - 渐变可以与常规的背景图像很好地混合在一起
- `background-repeat`
  - no-repeat — 不重复。
  - repeat-x —水平重复。
  - repeat-y —垂直重复。
  - repeat — 在两个方向重复。
-  `background-size`，可以控制图像比例和盒子一样大，就不用复杂的调整过程了
  - cover 图像更大
  - contain 盒子更大
- `background-position` 属性允许您选择背景图像显示在其应用到的盒子中的位置。它使用的坐标系中，框的左上角是(0,0)，框沿着水平(x)和垂直(y)轴定位。
  - 可以混合使用关键字，长度值以及百分比
- `background-attachment` 用来控制背景图片如何滚动
  - scroll: 使元素的背景在页面滚动时滚动。背景被固定在页面的相同位置，所以它会随着页面的滚动而滚动。
  - fixed: 使元素的背景固定在视图端口上，这样当页面或元素内容滚动时，它就不会滚动。它将始终保持在屏幕上相同的位置。
  - local: 这个值是后来添加的(它只在Internet Explorer 9+中受支持，而其他的在IE4+中受支持)，因为滚动值相当混乱，在很多情况下并不能真正实现您想要的功能。局部值将背景固定在设置的元素上，因此当您滚动元素时，背景也随之滚动。

## 文本方向

[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/%E5%A4%84%E7%90%86_%E4%B8%8D%E5%90%8C_%E6%96%B9%E5%90%91%E7%9A%84_%E6%96%87%E6%9C%AC)详细介绍

[writing-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) 的三个值分别是：

- horizontal-tb: 块流向从上至下。对应的文本方向是横向的。（正常）
- vertical-rl: 文字偏左。对应的文本方向是纵向的。
- vertical-lr: 文字偏右。对应的文本方向是纵向的。


## 溢出

只要有可能，CSS就不会隐藏你的内容，隐藏引起的数据损失通常会造成困扰。
如果你已经用width或者height限制住了一个盒子，CSS假定你知道你在做什么，而且你已经控制住了溢出的隐患。

