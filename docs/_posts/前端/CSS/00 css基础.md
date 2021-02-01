---
title: css3 重点
date: 2021-01-31
tags:
  - CSS3
---

> 列出 CSS3 需要重点掌握的内容

<!-- more -->

系统的梳理网上有许多，简单的内容也可以直接记忆，正在重新学习CSS，记录一些工程中需要重点掌握的概念和方法

## Chrome调试工具的使用

左上角箭头用来选定元素
放大缩小文本方式同VScode
ctrl+0复原浏览器大小
上下左右箭头切换像素值
颜色调整后回车覆盖

样式右侧有样式的行数

## emment语法

![2021-01-31-14-21-32](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-14-21-32.png)
快捷打字的写法，tab键补全

文档：https://docs.emmet.io/cheat-sheet/

div*4
ul>li*3
.nav
.demo$*10

## 文字垂直居中

文本的行高等于盒子的高度

## 背景

位置重点掌握 `background-position`
## CSS 三大特性

- 层叠性
- 继承性
- 优先级（重点掌握）
![2021-01-31-17-12-57](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-17-12-57.png)

## 盒子模型



## 常用选择器

==常用的四种选择器写法==

[伪类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)                   `a:hover` {c} 
[后代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator)           `article p`   

并集选择器

``` css
.nav,
.boxs{
  font-size: 16px;
}
```
交集选择器：相交的部分就是要设置属性值的标签

``` css
.nav.boxs.postcard{
  /*中间没有任何的分隔符号*/
}
```

- [子代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator)                | `article > p`                |
- [相邻兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator) | `h1 + p`                     |
- [通配选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors)             | `*{}`                        |
- [通用兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator)  | `p~span{}`                   |

```css
/* 图片后面紧跟着的段落将被选中，实现类似知乎的图片描述功能 */
img + p {
  font-style: bold;
}
```
## 标签显示模式

不同 display 的各种特性需要熟记，在之前比较疏忽

## 行高



## 盒模型

CSS 中组成一个块级盒子需要：
- Content box: 这个区域是用来显示内容，大小可以通过设置 width 和 height.
- Padding box: 包围在内容区域外部的空白区域； 大小通过 padding 相关属性设置。 //填充
- Border box: 边框盒包裹内容和内边距。大小通过 border 相关属性设置。
  - `border-radius`: 创建圆角，可以使用两个长度或百分比作为值，第一个值定义水平半径，第二个值定义垂直半径。
  - [border-width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width)
  - [border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style)
  - [border-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-color)
  - 也可以使用再细分 [border-top-width...](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-top-width)
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
- 设置 width 和 height 属性会生效。
- padding, margin, 以及 border 会推开其他元素。
- 但是，它不会跳转到新行，如果显式添加 width 和 height 属性，它只会变得比其内容更大。

## 背景

虽然可以将所有的背景属性简写到一行中，但是我觉得不用比较好

- `background-color`
- `background-image` （简书：[渐变背景](https://www.jianshu.com/p/58b340a037ea) 的详细使用）
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
- `background-position` 属性允许您选择背景图像显示在其应用到的盒子中的位置。它使用的坐标系中，框的左上角是 (0,0)，框沿着水平 (x) 和垂直 (y) 轴定位。
  - 可以混合使用关键字，长度值以及百分比
- `background-attachment` 用来控制背景图片如何滚动
  - scroll: 使元素的背景在页面滚动时滚动。背景被固定在页面的相同位置，所以它会随着页面的滚动而滚动。
  - fixed: 使元素的背景固定在视图端口上，这样当页面或元素内容滚动时，它就不会滚动。它将始终保持在屏幕上相同的位置。
  - local: 这个值是后来添加的（它只在 Internet Explorer 9+中受支持，而其他的在 IE4+中受支持），因为滚动值相当混乱，在很多情况下并不能真正实现您想要的功能。局部值将背景固定在设置的元素上，因此当您滚动元素时，背景也随之滚动。

## 文本方向

[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/%E5%A4%84%E7%90%86_%E4%B8%8D%E5%90%8C_%E6%96%B9%E5%90%91%E7%9A%84_%E6%96%87%E6%9C%AC) 详细介绍

[writing-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) 的三个值分别是：
- horizontal-tb: 块流向从上至下。对应的文本方向是横向的。（正常）
- vertical-rl: 文字偏左。对应的文本方向是纵向的。
- vertical-lr: 文字偏右。对应的文本方向是纵向的。

## 溢出

只要有可能，CSS 就不会隐藏你的内容，隐藏引起的数据损失通常会造成困扰。
如果你已经用 width 或者 height 限制住了一个盒子，CSS 假定你知道你在做什么，而且你已经控制住了溢出的隐患。

- [overflow](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow), 有四个可选值用来控制如何处理溢出
visible
默认值。内容不会被修剪，可以呈现在元素框之外。
hidden
如果需要，内容将被剪裁以适合填充框。 不提供滚动条。
scroll
如果需要，内容将被剪裁以适合填充框。 浏览器显示滚动条，无论是否实际剪切了任何内容。 （这可以防止滚动条在内容更改时出现或消失。）打印机仍可能打印溢出的内容。
auto
取决于用户代理。 如果内容适合填充框内部，则它看起来与可见内容相同，但仍会建立新的块格式化上下文。 如果内容溢出，桌面浏览器会提供滚动条。

## 值和单位

css 中遇到的值的所有种类汇总

[MDN 链接](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Values_and_units)

```css
.wrapper {
  width: 400px;
}

.box {
  width: calc(20% + 100px);
}
/*calc 是一个计算函数，也是一个可能的值*/
```

## 调整大小

min，max 宽高的用法，一般使用 min 和 max 规定元素的大小防止溢出的发生

[MDN](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS)

vw，vh 单位：
```css
.box {
  border: 5px solid darkblue;
  width: 20vw;
  height: 20vh;
  font-size: 10vh;
}
```

## 图像，媒体和表单元素

 使用 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) 属性指定 [可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element) 的内容应该如何适应到其使用的高度和宽度确定的框。

使用 [object-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position) 属性来切换被替换元素的内容对象在元素框内的对齐方式。

[from](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Forms)

## 样式化表格

[Styling_tables](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Styling_tables)
