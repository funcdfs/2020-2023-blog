---
layout: post
title: use markdown
tags: [杂项note]
date: 2020-02-09
---

***

先看[基础教程](https://mazhuang.org/2018/09/06/markdown-intro/)

## vscode：markdown_lint纠正书写错误  

刚开始熟悉语法规则时可以使用

到后期就不用了，依据个人喜好找到自己的风格，uninstall后就不用看他报错的波浪线了

Fenced code blocks should be surrounded by blank lines  
代码块头尾都应该用一个空白行包含起来，达到更加美观的效果

Lists should be surrounded by blank lines  
列\-这种点时，用空白行分隔上下文，list应该被包含起来，看上去更加简洁

标题也应该用空白行包含起来，看上去不是一大堆

因为标题可以使用侧面搜索栏，所以使用三\#小标题，可以达到更完整的使用体验

[markdown基本语法](https://www.jianshu.com/p/1e402922ee32)

用vscode提交blog会更加方便快捷

## 常用二三级标题 

它的好处是，目前常见的 markdown 渲染引擎都内置了基于标题的文章结构分析工具，还可以直接生成文章的目录树。

而不用这样结构的写法查找起来并不方便

## 多层分点

``` markdown

* ...
  + ....
    - .....

```

两个空格后加\-符号，再空格开始书写

## 换行

在行尾添加两个空格加回车表示换行：

## 代办项使用

语法：横框+ 空格+方括号（方括号中必须有空格或者x） + **空格** + 文本  
\- \[ \] test

## 数学公式

[数学公式的显示](https://fengwei2002.github.io/posts/%E6%96%B9%E6%B3%95/markdown%E4%B8%AD%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F%E4%BD%BF%E7%94%A8)  

## 添加图片直接显示到博客

> 图片与markdown融为一体

用[base64转码工具](https://c.runoob.com/front-end/59)得到字符串表示的图片，然后将字符串复制到链接处，便得到可以直接查看的图片，不用上传到仓库并且点击链接调用，但是会影响编辑时的效果，所以应该在写完blog后再进行上传base64转码//直接放在public文件夹目录下也可以

## markdown表格写法

虽然不怎么用）

``` markdown
|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |
```

[菜鸟教程](https://www.runoob.com/markdown/md-table.html)

|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |

``` markdown
| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |
```

| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |

Markdown 并无下划线的原生语法，因为会和链接的默认样式产生混淆。

解决方法是使用行内 HTML. 比如：
```markdown

# Markdown Test

*Italic Text*

**Bold Text**

<u>Underlined Text</u>
``` 

