---
title: css 总结
date: 2020-05-15
category: Designer
tags:
  - CSS3
---

> 看 [MDN](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/CSS_basics) 文档的同时，将之前杂乱的 css 笔记重新整理了一遍，
<!-- more -->

> 再详细过一遍 css 然后开 js, 顺便将常见的链接整理一下，而不是每次用什么搜什么
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

## 继承

CSS 为控制继承提供了四个特殊的通用属性值。每个 css 属性都接收这些值。

- [inherit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit)
  设置该属性会使子元素属性和父元素相同。实际上，就是 "开启继承".
- [initial](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial)
  设置属性值和浏览器默认样式相同。如果浏览器默认样式中未设置且该属性是自然继承的，那么会设置为 inherit 。
- [unset](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset)
  将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit，否则和 initial 一样
