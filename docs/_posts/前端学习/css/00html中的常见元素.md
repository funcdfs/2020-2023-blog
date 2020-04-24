---
date: 2020-04-24
title: Html 中常见元素
category: 前端
tags:
  - CSS3
---
整合常用的 html 基础
<!-- more -->
## 框架

元素尽量语义化：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>我的测试站点</title>
  </head>
  <body>
    <p>这是我的页面</p>
  </body>
</html>
```

## `<head>`

### `<base>`

给定 `<base href="https://example.com">`

以及此链接 `<a href="#anchor">Anker</a>`

链接指向 `https://example.com/#anchor`
```html
<!-- 给定多个 base 只使用第一个 -->
<base href="http://www.example.com/">
<base target="_blank">
<base target="_top" href="http://www.example.com/">  
```
target 的关键字指定特殊的意思：

- _self: 载入结果到当前浏览上下文中。（该值是元素的默认值）。
- _blank: 载入结果到一个新的未命名的浏览上下文。
- _parent: 载入结果到父级浏览上下文（如果当前页是内联框）。如果没有父级结构，该选项的行为和_self 一样。
- _top: 载入结果到顶级浏览上下文（该浏览上下文是当前上下文的最顶级上下文）。如果没有父级，该选项的行为和_self 一样。

### `<meta>`

表示那些不能由其它 HTML 元相关元素 (`<base>`, `<link>`, <`script>`, `<style>` 或 `<title>`) 之一表示的任何元数据信息。
指定字符编码：`<meta charset="utf-8">`

指定作者和网站描述

```html
<meta name="author" content="Chris Mills">
<meta name="description" content="The MDN Learning Area aims to provide
complete beginners to the Web with all they need to know to get
started with developing web sites and applications.">
```

### `<link>`

指定外部资源，常用于链接外部样式表，也可以用来指定网站图标

```html
<link href="main.css" rel="stylesheet">
<link rel="icon" href="favicon.ico">
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-icon-114.png" type="image/png">
```
### `<script>`

用于嵌入或引用可执行脚本
`<script src="javascript.js"></script>`

### `<style>`

包含文档的样式信息或者文档的部分内容，css 格式

```html
<style type="text/css">
p {
  color: #26b72b;
}
</style>
```
### `<title>`

一个 head 中只拥有一个：`<title>Amazing！</title>`

## `<body>`

### `<img>`

`<img src="https://raw.png">`

### `<a>`

`<a href="http://www.example.com">示例站点链接</a>`

`<a href='http://www.example.com'>示例站点链接</a>`

添加 title 属性后鼠标悬停后就会显示 title 的辅助信息

```html
<a href="https://www.mozilla.org/en-US/"
   title="The best place to find more information about Mozilla's
          mission and how to contribute">the Mozilla homepage</a>.
```
<a href="https://www.mozilla.org/en-US/"
   title="The best place to find more information about Mozilla's
          mission and how to contribute">the Mozilla homepage</a>.
使用相对页面链接跳转更快

添加 download 属性就可以指定跳转目标的下载文件默认名字
例如： `download="firefox-latest-64bit-installer.exe"`

### `<input>`

`<input type="text">`

`<input type="text" disabled>`

### `<Li>`

无序列表：
<ul>
  <li>豆浆</li>
  <li>油条</li>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>
```html
<ul>
  <li>豆浆</li>
  <li>油条</li>
  <li>豆汁</li>
  <li>焦圈</li>
</ul>
```

有序列表：
<ol>
  <li>沿着条路走到头</li>
  <li>右转</li>
  <li>直行穿过第一个十字路口</li>
  <li>在第三个十字路口处左转</li>
  <li>继续走 300 米，学校就在你的右手边</li>
</ol>
```html
<ol>
  <li>沿着条路走到头</li>
  <li>右转</li>
  <li>直行穿过第一个十字路口</li>
  <li>在第三个十字路口处左转</li>
  <li>继续走 300 米，学校就在你的右手边</li>
</ol>
```

可嵌套使用

### `<strong>` & `<em>`

加粗和斜体

### `<blockquote>`

块引用：`<blockquote>`

其中可以在 cite 属性里用 URL 来指向引用的资源

例如：

```html
<blockquote cite="https://feng-w.cn">
  <p> test </p>
</blockquote>
```
<blockquote cite="https://feng-w.cn">
  <p> test </p>
</blockquote>

行内使用引用就是`<q>`元素，同样可以添加 cite 属性

### `<abbr>`

学术词汇的缩写元素，用 title 属性标识全称

```html
<p>我们使用 <abbr title="超文本标记语言（Hypertext Markup Language）">HTML</abbr> 来组织网页文档。</p>
```

<p>我们使用 <abbr title="超文本标记语言（Hypertext Markup Language）">HTML</abbr> 来组织网页文档。</p>

### `<address>`

用来标记作者的语义元素，默认斜体渲染

```html
<address>
  <p>Page written by <a href="../authors/chris-mills/">Chris Mills</a>.</p>
</address>
```
<address>
  <p>Page written by <a href="../authors/chris-mills/">Chris Mills</a>.</p>
</address>

### `<sub>` & `<sup>`

```html
<p>咖啡因的化学方程式是 C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>。</p>
```

<p>咖啡因的化学方程式是 C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>。</p>

## 扩充

### 添加 class

`<a class="123" herf="https://123.com">title="123"</a>`

### 转义字符

| 原义字符 | 等价字符引用 |
| -------- | ------------ |
| <        | &lt;         |
| >        | &gt;         |
| "        | &quo;        |
| '        | &apo;        |
| &        | &amp;        |

### 注释

```html
<!-- <p>我在注释内！</p> -->
```

### 高级列表

```html
<dl>
  <dt>内心独白</dt>
    <dd>戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。</dd>
  <dt>语言独白</dt>
    <dd>戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。</dd>
  <dt>旁白</dt>
    <dd>戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。</dd>
</dl>
```

<dl>
  <dt>内心独白</dt>
    <dd>戏剧中，某个角色对自己的内心活动或感受进行念白表演，这些台词只面向观众，而其他角色不会听到。</dd>
  <dt>语言独白</dt>
    <dd>戏剧中，某个角色把自己的想法直接进行念白表演，观众和其他角色都可以听到。</dd>
  <dt>旁白</dt>
    <dd>戏剧中，为渲染幽默或戏剧性效果而进行的场景之外的补充注释念白，只面向观众，内容一般都是角色的感受、想法、以及一些背景信息等。</dd>
</dl>

***

### 时间

```html
<!-- 标准简单日期 -->
<time datetime="2016-01-20">20 January 2016</time>
<!-- 只包含年份和月份-->
<time datetime="2016-01">January 2016</time>
<!-- 只包含月份和日期 -->
<time datetime="01-20">20 January</time>
<!-- 只包含时间，小时和分钟数 -->
<time datetime="19:30">19:30</time>
<!-- 还可包含秒和毫秒 -->
<time datetime="19:30:01.856">19:30:01.856</time>
<!-- 日期和时间 -->
<time datetime="2016-01-20T19:30">7.30pm, 20 January 2016</time>
<!-- 含有时区偏移值的日期时间 -->
<time datetime="2016-01-20T19:30+01:00">7.30pm, 20 January 2016 is 8.30pm in France</time>
<!-- 调用特定的周 -->
<time datetime="2016-W04">The fourth week of 2016</time>
```

### 展示计算机代码

- `<code>`: 用于标记计算机通用代码。
- `<pre>`: 用于保留空白字符（通常用于代码块）——如果您在文本中使用缩进或多余的空白，浏览器将忽略它，您将不会在呈现的页面上看到它。但是，如果将文本包含在`<pre></pre>`标签中，那么空白将会以与你在文本编辑器中看到的相同的方式渲染出来。
- `<var>`: 用于标记具体变量名。
- `<kbd>`: 用于标记输入电脑的键盘（或其他类型）输入。
- `<samp>`: 用于标记计算机程序的输出。

### 内容区段

为了实现语义化标记，HTML 提供了明确这些区段的专用标签

- `<main>` 存放每个页面独有的内容。每个页面上只能用一次 `<main>`，且直接位于 `<body>` 中。最好不要把它嵌套进其它元素。
- `<article>` 包围的内容即一篇文章，与页面其它部分无关（比如一篇博文）。
- `<section>` 与 `<article>` 类似，但 `<section>` 更适用于组织页面使其按功能（比如迷你地图、一组文章标题和摘要）分块。一般的最佳用法是：以 标题 作为开头；也可以把一篇 `<article>` 分成若干部分并分别置于不同的 `<section>` 中，也可以把一个区段 `<section>` 分成若干部分并分别置于不同的 `<article>` 中，取决于上下文。
- `<aside>` 包含一些间接信息（术语条目、作者简介、相关链接，等等）。
- `<header>` 是简介形式的内容。如果它是 `<body>` 的子元素，那么就是网站的全局页眉。如果它是 `<article>` 或`<section>` 的子元素，那么它是这些部分特有的页眉（此 `<header>` 非彼 标题）。
- `<nav>` 包含页面主导航功能。其中不应包含二级链接等内容。
- `<footer>` 包含了页面的页脚部分。

### 无语义元素

`<div> & <span>`

### 换行与水平分割线

`<br>` 和 `<hr>`

