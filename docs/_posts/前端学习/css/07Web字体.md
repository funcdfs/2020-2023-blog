---
date: 2020-04-23
title: 使用 web 字体
category: Designer
tags:
  - CSS3
vssue-title: web 字体
---

CSS 规则 @font-face 允许 CSS 链接到服务器上的一种字体供网页使用。 
<!-- more -->
字体一般都不能自由使用。您必须为他们付费，或者遵循其他许可条件，比如在代码中（或者在您的站点上）提供字体创建者。你不应该在没有适当的授权的情况下偷窃字体。

因为做一个完美字体还是比较难的

首先，在 CSS 的开始处有一个`@font-face`块，它指定要下载的字体文件：

```css
@font-face {
  font-family: "myFont";
  src: url("myFont.ttf");
}
```
在这个下面，你可以使用@font-face 中指定的字体种类名称来将你的定制字体应用到你喜欢的任何东西上，比如说：

```css
html {
  font-family: "myFont", "Bitstream Vera Serif", serif;
}
```
## 查找字体

免费：
- [fontsquirre](https://www.fontsquirrel.com/)
- https://www.dafont.com/
- https://everythingfonts.com/

付费：
- http://www.fonts.com/
- https://www.myfonts.com/
- https://www.linotype.com/
- https://www.monotype.com/

## 基础使用

在 [fontsquirre](https://www.fontsquirrel.com/) 上下载一个压缩包 

找到对应的示例 css，然后复制到需要应用的 css 中

对其自定义命名后即可使用

```css
body {
  font-family: 'ciclefina', sans-serif;
  font-size: 100%;
  line-height: 1.25;
}

@font-face {
  font-family: 'ciclefina';
  src: url('fonts/cicle_fina-webfont.eot');
  src: url('fonts/cicle_fina-webfont.eot?#iefix') format('embedded-opentype'),
         url('fonts/cicle_fina-webfont.woff2') format('woff2'),
         url('fonts/cicle_fina-webfont.woff') format('woff'),
         url('fonts/cicle_fina-webfont.ttf') format('truetype'),
         url('fonts/cicle_fina-webfont.svg#ciclefina') format('svg');
  font-weight: normal;
  font-style: normal;
}
```

## 为 Web 字体应用斜体和粗体

如果你想对 Web 字体添加一些基本样式，这时 Web 字体用起来有些奇怪。需要记住的是，对于 Web 字体，每个字体只有一种粗细和一种风格。如果你想使用粗体或斜体，就需要为它们创建单独的样式规则，每条规则对应一个 Web 字体文件。否则，浏览器就会使用伪粗体或伪斜体，或者同时使用伪粗体和伪斜体

这时就需要找到对应字体的斜体 css 引用，同时添加到目标 css 中

```css
body {
  font-family: 'PTSans', sans-serif;
  ...
}
/* 常规文本 */
@font-face {
  font-family: 'PTSans';
  src: url('PTS55F-webfont.eot');
  ...
}
/* 斜体文本 */
@font-face {
    font-family: 'pt_sansitalic';/*这里也改成自定义的名字*/
    src: url('PTS56F-webfont.eot');
    src: url('PTS56F-webfont.eot?#iefix') format('embedded-opentype'), url('PTS56F-webfont.woff')format('woff'),
     url('PTS56F-webfont.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;/*修改为 font-style: italic; 即可应用相应字体的斜体*/
}
```

粗体应用将 `font-weight: normal;`改为 `font-weight: blod;`即可

最终完整 css：

```css
body {
  font-family: 'PTSans', sans-serif;
  ...
}
/* 常规文本 */
@font-face {
  font-family: 'PTSans';
  ...
  font-weight: normal;
  font-style: normal;
}
/* 斜体文本 */
@font-face {
  font-family: 'PTSans';
  ...
  font-weight: normal;
  font-style: italic;
}
/* 粗体文本 */
@font-face {
  font-family: 'PTSans'; src: url('PTS75F-webfont.eot');
  ...
  font-weight: bold;
  font-style: normal;
}
```
>斜体和粗体的名字和常规文本的名字必须一致

同理，粗斜体：

```css
/* 粗斜体文本 */
@font-face {
  font-family: 'PTSans'; src: url('PTS76F-webfont.eot');
  ...
  font-weight: bold;
  font-style: italic;
}
```

每一个样式和粗细版本都会引入一个新的字体文件，从而增加浏览器要下载的文件大小，这会影响性能
所以一般标题才应用 web 字体

## 使用 Google Fonts 的 Web 字体

Google Fonts 是免费的，有几百种字体可供选择，而且使用它在页面中添加 Web 字体不到一分钟就能搞定，因此它已经变得越来越流行。一旦选中一种字体，省下我们要做的全部事情就是将一段 Google Fonts 代码添加到 HTML 页面中，然后就可以在 CSS 中为文本应用字体样式了

![2020-04-23-19-32-59](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-23-19-32-59.png)

选择一个字体后点嵌入：即 embed

例如 Baloo Bhaina 2：

To embed a font, copy the code into the `<head>` of your html
```html
<link href="https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@500&display=swap" rel="stylesheet">
```
css 中的应用：

```css
font-family: 'Baloo Bhaina 2', cursive;
```

学以致用：
我当前的个人博客侧边栏还有navbar就应用的是谷歌的web字体

```js
[
  "link",
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@600&display=swap"
  }
],
```
```css
font-family: 'Baloo Paaji 2', cursive;
```
