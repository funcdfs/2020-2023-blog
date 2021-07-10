---
title: VIM 速查模板
date: 2021-07-10
tags:
  - vim
---

## 开始在 vim 里面打字

![20210708223403-2021-07-08](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210708223403-2021-07-08.png)

<kbd>i</kbd>  从正常模式切换到插入模式，当前方块的前面为具体的插入位置： insert

<kbd>a</kbd>  从当前位置的后面进入插入模式，一般使用 a 较多 ：append

<kbd>o</kbd>  光标移动到下一行开始，切换到插入模式

<kbd>ctrl</kbd> + <kbd>[</kbd> 退出插入模式，（右手拇指加食指）

<kbd>:q</kbd> 退出文件（会有文件临时存储记录，忘记保存也可以）
<kbd>:w</kbd> + 文件名 保存文件
<kbd>:wq</kbd> + 空格 + 文件名 存档后离开

## 在 vim 中进行移动
tips:
ctrl + z 将 vim 放在背景
fg 将 vim 移到前面

<kbd>h j k l</kbd> 上下左右，熟练即可

<kbd>w</kbd> 跳单词
<kbd>W</kbd> 跳完全匹配的单词
<kbd>b</kbd> 往前跳
<kbd>B</kbd> 完全匹配往前跳
<kbd>}</kbd> 右边的大括号跳一个段落
<kbd>{</kbd> 左边的大括号往左侧跳一个段落

<kbd>G</kbd> 跑到文章末尾 Graph （相比滚轮方便很多）
<kbd>gg</kbd> 两个小写 g 字母跑到文章起始点
<kbd>0</kbd> 跑到一行的行首
<kbd>$</kbd> 跑到一行的行尾 （数字 4）

gk 进行视图层级的上下移动， （编辑器会对超过规定长度的文字进行折行）
gj 

在 insert 模式下不需要移动，打字，离开，移动，插入，打字 $\cdots$

## 在文件里面搜寻文字

<kbd>?</kbd> + content 触发搜索动作

<kbd>:set hlsearch</kbd> 高亮

<kbd>n</kbd> 向上搜索结果跳动 

<kbd>N</kbd> 向上搜索结果跳动

问号和斜线在同一个位置，使用不同的按键，n 和 N 的作用相反

如果懒得打那个单词的话，就先让光标停留在对应单词位置，使用数字 8 对应的 <kbd>*</kbd> 进行查询，编辑器会自动将光标对应单词进行高亮，和这个字母相反的是使用 <kbd>#</kbd>

<kbd>:set nohlsearch</kbd>

<kbd>f</kbd> + 任意字母，光标跳转到行中出现的第一个字母，
<kbd>F</kbd> + 任意字母，光标进行向前跳转，

<kbd>zz</kbd> 打字机模式，
<kbd>zt</kbd> 置顶
<kbd>zb</kbd> 底部充满查看

## 在 vim 中进行复制粘贴

<kbd>v</kbd> 进入 visual 模式 然后就可以使用 之前的光标移动操作进行内容选块操作

<kbd>V</kbd> 进入 visual line 模式，使用 hjkl 进行移动的时候按照代码块进行移动

<kbd>y</kbd> 复制选中的内容 yank: 猛拉

<kbd>p</kbd> 粘贴，粘贴的时候不用调回 insert 模式，直接在当前模式下进行粘贴即可 paste

<kbd>yy</kbd> 直接 yank 一整行 ，p 进行粘贴即可 yy5p 粘贴五行相同的内容

## 关于选取复制粘贴的更多内容

<kbd>3yy</kbd> 复制三行内容

<kbd>y$</kbd> y 操作配合光标移动操作就可以快捷复制，并不需要选中后再进行复制

<kbd>yG</kbd> 将当前光标开始直到文件末尾的内容全部复制 

<kbd> u </kbd> 撤回上一步操作: uodo
<kbd> ctrl + r </kbd> 撤销撤销操作 redo 

<kbd>"ap </kbd> 很多个不同的剪切板
<kbd>"bp </kbd> 

> vim 共有 48 个不同的暂存器，每个暂存器都有不同点的效果

<kbd>:set clipboard=unnamed </kbd> 将电脑的剪切板和暂存器同步

## 编辑文字

<kbd> A </kbd> 跳到行末 用 I 和 A 来替换 0i 和 $a
<kbd> O </kbd> 在当前行上方插入一行并进入插入模式

<kbd> D </kbd> 将光标后面的行中内容全部删除

<kbd> x </kbd> 删除字，放到暂存器中

dd 
2dd 
d + h,l 
dG 

c 删除选中内容并且把内容放到寄存器

使用 c 的话删除之后会立即进入 insert 模式，可以少打一下键盘

C 和大写 D 的作用相同

r ：replace 替换单个字母

<kbd>>></kbd> 增加或者减少缩进

:set shiftwidth = 2

<< 

> 选取之后

3>> 就不用再次进行选取操作了

将所有内容选中之后，进行 = 操作，他们会自动格式化代码

## 参考资料

- [即将失传的记忆 30p](https://www.bilibili.com/video/BV1fV41187Zr?p=3)
