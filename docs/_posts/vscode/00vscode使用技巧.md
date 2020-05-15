---
title: vscode 使用技巧
date: 2020-04-27
category: Tips
tags:
  - vscode
---
>宇宙第一 code tool
<!-- more -->
# vscode 使用技巧

以下是我多年使用的经验（虽然现在没用多久）

## 快捷键

[[ctrl+k]] + [[ctrl+s]] 打开快捷键一览表

[[ctrl+k]] + [[ctrl+t]] 召唤新主题

[[alt]]+[[shift]]+[[A]] 多行注释

[[ctrl]]+[[shift]]+[[s]] 另存为

## markdown扩充

### PicGo 插件

![20200305183149.png](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/20200305183149.png)
>使用 picgo 搭建 GitHub 稳定图床

### markdown formatter 插件

![20200312150619.png](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/20200312150619.png)
>用来优化视觉体验以及 markdown 智能补全

### 中英文添加空格间隙 pangu-markdown

![20200414225114](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200414225114.png)
>用来优化视觉体验

### Insert Date String

![20200414224641](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200414224641.png)
>用来插入当前时间

### Markdown Add Backquote

![20200414224813](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200414224813.png)
>用来加快代码块的引入

### Excel to Markdown table

还是有点用处的

`shift+alt+v`

例如绘制复杂表格时就会方便一些

## 美化

### 推荐主题

![20200414224725](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200414224725.png)

![20200414225032](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200414225032.png)

### 全局透明

![20200402222219](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200402222219.png)


## vscode自定义c++代码缩进规则

写leetcode的时候会用到，看着舒服一些

ctrl+shift+p,setting,clang,
找到

>C_Cpp: Clang_format_fallback Style
>如果使用样式 "file" 调用 clang 格式但是找不到 .clang-format 文件，则使用预定义的样式的名称作为回退。可能的值为 Visual Studio、LLVM、Google、>Chromium、Mozilla、WebKit、none，或使用 {key: value, ...} 设置特定参数。例如，"Visual Studio" 样式类似于: { BasedOnStyle: LLVM, UseTab: >Never, IndentWidth: 4, TabWidth: 4, BreakBeforeBraces: Allman, AllowShortIfStatementsOnASingleLine: false, IndentCaseLabels: false, >ColumnLimit: 0, AccessModifierOffset: -4 }

配置栏填这一行即可 ：`{ BasedOnStyle: Chromium, IndentWidth: 4}`

![2020-05-07-21-16-13](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-07-21-16-13.png)