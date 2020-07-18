---
date: 2020-05-25
title: vuepress 中的高阶 markdown 用法
category: Designer
tags:
  - vuepress
  - markdown
vssue-title: markdown-vuepress
---

>vuepress 各种 markdown 新特性的介绍和测试

<!-- more -->

## 容器简介

容器采用插件为对应的元素进行了 class 的指定，然后在 `.vuepress/styles/index.styl `中进行自定义对应类对应的样式
也就是安装插件后不会直接显示效果，但是对应的元素已经具有了特殊的 class，具体渲染效果还需自己指定

第一步先安装`vuepress-plugin-container`插件，这个插件可以在配置文件中多次使用

```sh
yarn add -D vuepress-plugin-container
```

## 文字居中

::: center
vuepress实现文字居中
:::

index.styl

```styl
.customer-container-center
  text-align center
```

config.js

```js
    [
      'vuepress-plugin-container',
      { //添加居中容器
        type: 'center',
        before: info => `<div class="customer-container-center">`,
        after: '</div>',
      },
    ],
```

## 文字居右

::: right
要居右的段落
:::

index.styl
```styl
.custom-block
  &.right
    color transparentify($textColor, 0.4)
    font-size 0.9rem
    text-align right
```
config.js

```js
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: '',
      },
    ],
```
## details 容器

::: details
下拉容器

语法：

```md
/::: details
/内容
/:::
```

:::

config.js

```js
    [
      'vuepress-plugin-container',
      { //添加 details 容器
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      },
    ],
```
不用添加 CSS/styl


## 自定义的各种容器

::: today 今日总结
今天王者荣耀上了荣耀王者
:::

```md
::: today 牛顿第一定律
假若施加于某物体的外力为零，则该物体的运动速度不变。

::: right
来自 [维基百科](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B)
:::
```

index.styl

```styl
.today
  margin 1rem 0
  padding .1rem 1.5rem
  border-radius 0.4rem
  background-color #f0f4f8
  .title
    font-weight bold
```
config.js

```js
    [
      'vuepress-plugin-container',
      {
        type: 'today',
        before: info => `<div class="today"><p class="title">${info}</p>`,
        after: '</div>',
      },
    ],
```

## 默认提供的容器

::: tip
提示框
:::

::: danger
危险信息框
:::

::: warning
警告框
:::

```md
::: tip
提示框
:::

::: danger
危险信息框
:::

::: warning
警告框
:::
```

## 容器可以嵌套使用

:::: danger W.I.P
本主题仍在制作中，还可能会有

::: center
重大的变动。
:::

如果您在使用过程中遇到了 bug，可以

::: right
[提一个 issue](https://github.co)。
:::
::::


::: tip 以下为除了容器的其他特性
介绍一些 markdown 在 vuepress 中的其他扩充功能
:::

## 代码块文件引入

语法

`@[code lang=cpp](@/code/leetcode/1295.统计位数为偶数的数字.cpp/)`

详细教程：[在 vuepress 中使用 code-snippet-enhanced](https://feng-w.cn/posts/2020/04/22/_03-vuepress-code-snippet-enhanced.html)

## [代码块多语言](https://github.com/padarom/vuepress-plugin-code-switcher)

也可以用来作为 tab 页使用

语法：

```md
`<CodeSwitcher :languages="{1:'JavaScript',2:'TypeScript'}">`
用来说明tab页的所有选项卡，前一项为简称，不可见，后一项为网页渲染的全称

`<template v-slot:1>`  slot：插槽  [VUE2的语法](https://cn.vuejs.org/v2/guide/components-slots.html)
在向具名插槽提供内容的时候，我们可以在一个 <template> 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称 

第一部分的代码内容

`</template>`结束第一部分代码

`<template v-slot:2>`开启第二部分代码
第二部分代码内容
`</template>`结束第二部分代码
`</CodeSwitcher>`整个块的结束标志
```

<CodeSwitcher :languages="{1:'JavaScript',2:'TypeScript'}">
<template v-slot:1>

```js
module.exports = function (str) {
    return typeof str === 'string' && str.trim() === str
}
```

</template>
<template v-slot:2>

```ts
export default function isString (str: string) : str is string {
    return typeof str === 'string' && str.trim() === str
}
```

</template>
</CodeSwitcher>


## [flowchart 流程图](https://github.com/ulivz/vuepress-plugin-flowchart)

一般用不到

@flowstart
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
@flowend

## 示例 config.js

最终配置的插件部分 js 代码示例：

```js
  plugins: [
    ['flowchart'],
    ['img-lazy'],
    ['code-switcher'], //多语言选项卡
    ["cursor-effects"], //鼠标特效
    ["vuepress-plugin-reading-progress"], //上方进度条
    ["vuepress-plugin-cat"], //🐱
    ['@vuepress/pwa', { //pwa
      serviceWorker: true,
      updatePopup: {
        message: "New Content！",
        buttonText: "Refresh"
      }
    }], //这是一个bug插件，去除后浏览器还是读取之前的缓存，加上之后就得一直留着了，，并且外观很丑

    //容器添加
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: '',
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'today',
        before: info => `<div class="today"><p class="title">${info}</p>`,
        after: '</div>',
      },
    ],
    [
      'vuepress-plugin-container',
      { //添加 details 容器
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      },
    ],
    [
      'vuepress-plugin-container',
      { //添加居中容器
        type: 'center',
        before: info => `<div class="customer-container-center">`,
        after: '</div>',
      },
    ],
    [
      'vuepress-plugin-container',
      { //添加居右容器
        type: 'right',
        defaultTitle: '',
      },
    ],
  ],
```