---
title: 在 vscode 中自定义 markdown 预览效果
category: Tips
date: 2020-05-20
tags:
  - vscode
---

> [markdown-preview-enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/) 中文文档

<!-- more -->

默认预览不支持很多格式的预览

## markdown-preview-enhanced

![2020-05-20-17-38-11](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-20-17-38-11.png)

 这个插件支持常用的所有预览，并支持引入自定义  [css](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/customize-css) 和 [js](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/extend-parser)

Windows 输入 ctrl shift +p 调出命令窗口
输入 `Markdown Preview Enhanced: Customize Css`

然后开始自定义你的 markdown 渲染格式

```less
/* Please visit the URL below for more information: */
/*   https://shd101wyy.github.io/markdown-preview-enhanced/#/customize-css */

.markdown-preview.markdown-preview {

  //将默认字体调成和左侧 markdown 文件大小一样的字体并采用更加合理的颜色
  font-size: 14.5px;
  color: #b4b4b4;
  //背景颜色改为和 atom dark 相同
  background-color: rgb(29, 35, 37);

  //标题调整
  h2 {
    font-size: 19px;
    color: rgb(214, 191, 164);
  }

  h3 {
    font-size: 17px;
    color: rgb(214, 191, 164);
  }

  //代码块中注释的颜色
  .token.block-comment,
  .token.cdata,
  .token.comment,
  .token.doctype,
  .token.prolog {
    color: #bb7bd6b0;
  }

  strong {
    color: rgb(127, 211, 214);
  }

  //将代码块的字体和文本大小统一并将颜色调整为更加适宜的颜色
  pre {
    font-size: 14px !important;
    color: bisque;
  }

  //文字选中效果
  ::selection {
    background-color: #79ffe1;
    color: #000;
  }

  /*滚动条效果-start*/
  /*控制整个滚动条*/
  ::-webkit-scrollbar {
    background-color: lightgray;
    width: 5px;
    height: 5px;
    background-clip: padding-box;
  }

  /*滚动条两端方向按钮*/
  ::-webkit-scrollbar-button {
    background-color: pink;
  }

  /*滚动条中间滑动部分*/
  ::-webkit-scrollbar-thumb {
    background-color: #9400D3;
    border-radius: 5px;
  }

  /*滚动条右下角区域*/
  ::-webkit-scrollbar-corner {
    background-color: pink;
  }

  /*滚动条效果-end*/
}
```

::: tip vscode 中使用 css 构建你自己的主题
[知乎专栏：在 vs code 中使用自定义 css 来美化外观](https://zhuanlan.zhihu.com/p/139446791)
:::

主题和 markdown 预览都使用 css 自定义后的效果：

![2020-05-20-17-46-08](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-20-17-46-08.png)

## vuepress markdown preview

所以使用这些可以稍微 DIY 一下你的 preview 效果

但是缺点是不能渲染类似 vuepress 中引入的容器功能

并且 vscode 中也没有类似的插件可以实现这个功能

但是使用 vuepress 的时候还会用到这些方便的容器功能

所以打算开发一个 vuepress markdown 专属插件

需要 js ts 的语法知识，所以学完就来试一试，并且这也是学习 vue 的铺垫知识

将上面的两个 CSS 实现的都变为自己开发的两个插件最好不过了

> 我一定会回来的

[vuepress markdown preview]()