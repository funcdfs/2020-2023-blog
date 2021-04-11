---
title: VScode： 快捷键-字体-插件
date: 2021-02-23
tags:
  - vscode
---

>/*
>* @Author: https://github.com/fengwei2002 
>* @Date: 2021-02-23 21:37:05 
>* @Last Modified by:   https://konng.vercel.app 
>* @Last Modified time: 2021-02-23 21:37:05 
>*/

## 1. 快捷键

熟悉 vscode 快捷键即可，其他 IDE 使用插件将快捷键设置为 vscode 模式就 ok

### 1.1. 文本编辑

- `ctrl + [ `和`ctrl + ] `控制左右缩进
- `shift+ shang/xia` 选中光标扩散文本块
- 折叠打开代码块 `Ctrl+Shift+[， Ctrl+Shift+]`（在 markdown 标题处使用可以调整标题等级）
- `Ctrl+C Ctrl+V/X`如果不选中，默认复制或剪切一整行！！！！（很方便，之前都是选中一行才进行的操作，其实**不选中可以直接用**）
- 在当前行下边插入一行`Ctrl+Enter`（同样，省去了移动光标的步骤，可以在**任意位置使用**）
- 在当前行上方插入一行`Ctrl+Shift+Enter`
- 选中当前行`Ctrl+i` Ctrli 被占用的时候也可能是`Ctrl+L`
- 删除单词之后的所有内容 `Ctrl+del`
- 同时选中所有匹配的`Ctrl+Shift+L`**（好用！！！）**
- `Ctrl+k+c` 多行注释`Ctrl+k+u` 取消注释，（当光标未选中内容的时候就是**注释当前行**！！）

### 1.2. 查找替换

查找 Ctrl+F
查找替换 Ctrl+H（不用再手动点那个箭头了！）

### 1.3. 文件操作

- 打开一个新窗口：` Ctrl+Shift+N`（同时打开了一个新的文件）
- 打开一个新文件：` Ctrl++N`
- 关闭窗口： `Ctrl+Shift+W`

### 1.4. 显示相关

全屏：F11
zoomIn/zoomOut：Ctrl + =/Ctrl + -
侧边栏显/隐：Ctrl+B（**方便**，不用每次挪过去点）

## 2. 字体自定义

### 2.1. 全局字体

ctrl shift p 选择工作区设置，然后 fontFamily 设置这个样式

博客预览也是这个字体，英文以及字符都保留了阅读性并且比较好看

![20210223195719-2021-02-23](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210223195719-2021-02-23.png)

``` css
Comic Sans MS,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif
```

vscode 相当于一个浏览器，所以自定义样式直接和 css 一样

![效果预览](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210223212508-2021-02-23.png)

### 2.2. 终端字体

**vscode shell 字体间距过大的问题**也可以这么解决
在 setting.json 中添加

`"terminal.integrated.fontFamily": "monospace"，`

当然，安装字体 Source code Pro 后就这么设置：
`"terminal.integrated.fontFamily": "Source code Pro",`

![20210223201930-2021-02-23](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210223201930-2021-02-23.png)

### 2.3. markdown preview enhanced 自定义字体

ctrl shift p 调出命令窗口，搜 `Markdown Preview Enhanced :Customize CSS`

在对应的 less 文件添加相关内容即可

``` less
/* Please visit the URL below for more information: */
/*   https://shd101wyy.github.io/markdown-preview-enhanced/#/customize-css */

.markdown-preview.markdown-preview {
  font-family: Comic Sans MS, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif !important;
}
```

## 3. 插件

::: note
由于 vscode 现在`date: 2021-02-23`登陆一个 GitHub 账户后会自动同步所有配置，所以**没有写这些的必要**，简单的罗列而已
:::

### 3.1. cpp 相关插件

vscode-fileheader
顶部注释模板，可定义作者、时间等信息，并会自动更新最后修改时间 ctrl alt i

filesize
在底部状态栏显示当前文件大小，点击后还可以看到详细创建、修改时间

C/C++ for Visual Studio Code
C 和 c++在 vscode 中使用

C++ Intellisense
自动提示

Remote - WSL
远程 linux

Visual Studio IntelliCode
自动提示

WakaTime
代码时间统计

Chinese (Simplified) Language Pack for Visual Studio Code
中文

LeetCode
写题，c++也就用来写写题

### 3.2. markdown 相关插件

Excel to Markdown table
表格转换，复制粘贴即可

Insert Date String
快捷键插入规定的字符串，写博客中会使用 25ate: YYYY-01-DD ctrl shift i

Markdown Add Backquote
代码块语法插入，行内很方便 

Markdown All in One
特殊渲染显示

Markdown Math
数学公式自动补全

Markdown Preview Enhanced
预览插件

Markdown+Math
数学公式

Pangu-Markdown
markdown 格式化，中英文中间加空格

PicGo
图床快捷上传插件

Tabnine Autocomplete AI: JavaScript, Python, TypeScript, PHP, Go, Java, Ruby, C/C++, HTML/CSS, C#, Rust, SQL, Bash, Kotlin, React
机器学习实现的自动补全

Todo Tree
任务树

VSCode Git Buttons
git push/pull 按钮

### 3.3. 前端相关插件

不分先后顺序

#### 3.3.1. html

Live server
htm 代码实时预览，修改同步显示

HTMLHint
html 代码规范

Atuo Rename Tag
修改 html 标签，自动帮你完成尾部闭合标签的同步修改，不过有些 bug。

open in browser
右键浏览器预览

Image preview
鼠标悬浮链接预览图片

HTML Snippets
超级实用且初级的 H5 代码片段以及提示

HTML CSS Support
让 html 标签上写 class 智能提示当前项目所支持的样式

Path Intellisense
自动路径补全

#### 3.3.2. css/styl/less

language-stylus
stylus 文件渲染

CSS Peek
追踪至样式

TODO Debugger for Chrome
让 vscode 映射 chrome 的 debug 功能，静态页面都可以用 vscode 来打断点调试，配置稍微复杂一些

#### 3.3.3. js/DOM/jQuery

jQuery Code Snippets
jquery 必须品

beautify
格式化代码的工具

ESlint
ESlint 接管原生 js 提示，可以自定制提示规则。

Project Manager
在多个项目之前快速切换的工具

Npm Intellisense
require 时的包提示

GitLens
丰富的 git 日志插件

vscode-styled-components
styl 文件自动补全提示

### 3.4. vue 相关插件

vetur
语法高亮、智能感知、Emmet 等

VueHelper
snippet 代码片段

Import Cost
引入包大小计算，对于项目打包后体积掌握很有帮助

### 3.5. 主题插件

Atom One Dark Theme
深色主题

Atom One Light Theme
浅色主题

Horizon Theme
通用主题

**KONNG**
自己写的主题，我自己用着最舒服的主题😃，有时候视觉疲劳就换一下上面三个

### 3.6. 美化插件

Rainbow Brackets
彩色括号

indent-rainbow
彩色缩进

Bracket Pair Colorizer 2
让括号拥有独立的颜色，易于区分。可以配合任意主题使用。

Windows opacity
全局透明

### 3.7. 趣味插件

Rainbow Flat
彩虹屁，写代码一直夸你的插件
