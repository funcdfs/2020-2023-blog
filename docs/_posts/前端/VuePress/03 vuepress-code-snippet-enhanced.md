---
date: 2020-04-22
title: 在 vuepress 中使用 code-snippet-enhanced
category: Designer
tags:
  - vuepress
vssue-title: markdown-vuepress-code-snippet-enhanced
---

>npm 文档：[markdown-vuepress-code-snippet-enhanced](https://www.npmjs.com/package/markdown-it-vuepress-code-snippet-enhanced)
<!-- more -->
使用这个插件就可以实现文章和代码块分离，挺有用
## 安装

```sh
yarn add -D markdown-it-vuepress-code-snippet-enhanced
```

## 配置

config.js:

```js
markdown: {
  ...
    extendMarkdown: (md) => {
      ...
      md.use(require("markdown-it-vuepress-code-snippet-enhanced"));
    },
  },
```
新建与 `docs` 同级的 `code` 文件夹

![2020-04-22-12-08-36](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-22-12-08-36.png =345x341)

## 基础使用

使用以下语法将代码段导入到 Markdown 文件中：（语句上下都应该留空白行）

```markdown
@[code](@/code/uva/uva-272.cpp/)
@[code lang=cpp](@/code/uva/uva-272.cpp/)
```

`@[code](@/code/uva/uva-272.cpp/)` 如下的渲染效果：

@[code](@/code/uva/uva-272.cpp/)

## 添加高亮

用 `lang=cpp` 来高亮代码块后

`@[code lang=cpp](@/code/uva/uva-272.cpp/)` 如下的渲染效果：

@[code lang=cpp](@/code/uva/uva-272.cpp/)

### 指定行添加额外高亮

`@[code highlight={1-6} lang=cpp](@/code/uva/uva-272.cpp/)`

@[code highlight={1-6} lang=cpp](@/code/uva/uva-272.cpp/)

## 引入部分代码块

可以使用 `transclude`，`transcludeWith`或`transcludeTag`来包含文件的一个或多个部分。

### transcludeWith

可以使用相应语言的注释来包含一部分的代码（例如完整程序中的函数块）

例如用`:::`包含了 while 循环

所以`@[code lang=cpp transcludeWith=:::](@/code/uva/uva-272.cpp)`渲染效果为：

@[code lang=cpp transcludeWith=:::](@/code/uva/uva-272.cpp)

### transclude

手动规定起始行和终止行（不如注释相应代码块方便）

```markdown
@[code transclude={5-7}](@/code/uva/uva-272.cpp)
```

渲染效果为

@[code transclude={5-7}](@/code/uva/uva-272.cpp)

### transcludeTag

在 markdown 中引入 Vue 单个文件组件时很有用

```markdown
@[code transcludeTag=template](@/docs/code.vue)
@[code transcludeTag=script](@/docs/code.vue)
@[code transcludeTag=style](@/docs/code.vue)
```

例如：

```vue
<template>
  <div class="component"></div>
</template>
 
<script>
export default {
  mounted () {
    alert('yay!')
  }
}
</script> 
 
<style lang="scss" scoped>
.component {
  display: flex;
}
</style> 
```

`@[code highlight={1-6} transcludeTag=style](@/docs/code.vue)`

渲染结果：

```vue
<style lang="scss" scoped>
.component {
  display: flex;
}
</style>
```