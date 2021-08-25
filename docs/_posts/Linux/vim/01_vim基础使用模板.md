---
title: vim 基础使用模板
date: 2021-07-10
tags:
  - vim
---

## 在 vim 中进行打字

![20210824193823-2021-08-24-19-38-27](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210824193823-2021-08-24-19-38-27.png)

<kbd>i</kbd>  从正常模式切换到插入模式，当前方块的前面为具体的插入位置： insert

<kbd>a</kbd>  从当前位置的后面进入插入模式，一般使用 a 较多 ：append

<kbd>o</kbd>  光标移动到下一行开始，切换到插入模式

<kbd>ctrl</kbd> + <kbd>[</kbd> 退出插入模式，（右手拇指加食指）

<kbd>:q</kbd> 退出文件（会有文件临时存储记录，忘记保存也可以）
<kbd>:w</kbd> + 文件名 保存文件
<kbd>:wq</kbd> + 空格 + 文件名 存档后离开


## 在 vim 中进行移动

<kbd>h j k l</kbd> 上下左右，熟练即可

3 + 空格 向后跳三个光标

<kbd>w</kbd> 跳单词
<kbd>W</kbd> 跳完全匹配的单词
<kbd>b</kbd> 往前跳
<kbd>B</kbd> 完全匹配往前跳
<kbd>}</kbd> 右边的大括号跳一个段落
<kbd>{</kbd> 左边的大括号往左侧跳一个段落

<kbd>G</kbd> 跑到文章末尾 Graph （相比滚轮方便很多，5G 跳到文本的第五行）
<kbd>gg</kbd> 两个小写 g 字母跑到文章起始点
<kbd>0</kbd> 跑到一行的行首
<kbd>$</kbd> 跑到一行的行尾

gk 进行视图层级的上下移动， （编辑器会对超过规定长度的文字进行折行）
gj

在 insert 模式下不需要移动，（虽然上下左右可以实现），
操作流程是：打字，离开，移动，插入，打字 $\cdots$

## 在文件里面搜寻文字

<kbd>?</kbd> + content 触发搜索动作

<kbd>:set hlsearch</kbd> 高亮

<kbd>n</kbd> 向上跳动搜索结果光标

<kbd>N</kbd> 向下跳动搜索结果光标

问号和斜线在同一个位置，使用不同的按键，n 和 N 的作用相反

如果懒得打那个单词的话，就先让光标停留在对应单词位置，使用数字 8 对应的 <kbd>*</kbd> 进行查询，编辑器会自动将光标对应单词进行高亮，和这个字母相反的是使用 <kbd>#</kbd>

<kbd>:set nohlsearch</kbd>

<kbd>f</kbd> + 任意字母，光标跳转到行中出现的第一个字母，
<kbd>F</kbd> + 任意字母，光标进行向前跳转，

如果要将搜索的内容进行替换
`:n1,n2s/word1/word2/g:` n1 n2 是数字，在第 n1 行与 n2 行之间寻找 word1 这个字符串，并将这个字符串替换为 word2

`:1,$s/word1/word2/g` 将全文的 word1 替换为 word2
`:1,$s/word1/word2/gc` 将全文的 word1 替换为 word2， 替换每一个字符串之前向用户进行询问


## 在 vim 中进行复制粘贴

<kbd>v</kbd> 进入 visual 模式 然后就可以使用 之前的光标移动操作进行内容选块操作

<kbd>V</kbd> 进入 visual line 模式，使用 hjkl 进行移动的时候按照代码块进行移动

<kbd>y</kbd> 复制选中的内容 yank: 猛拉

<kbd>p</kbd> 粘贴，粘贴的时候不用调回 insert 模式，直接在当前模式下进行粘贴即可 paste

<kbd>yy</kbd> 直接 yank 一整行 ，p 进行粘贴即可 yy5p 粘贴五行相同的内容

## vim 布局

<kbd>zz</kbd> 打字机模式，
<kbd>zt</kbd> 置顶
<kbd>zb</kbd> 底部充满查看

## 关于选取复制粘贴的更多内容

<kbd>3yy</kbd> 复制从光标行之后的三行内容（并不需要选中内容）

<kbd>y$</kbd> 字面意思：把光标到行末的内容 copy 起来

<kbd>yG</kbd> 将当前光标开始直到文件末尾的内容全部复制 

<kbd> u</kbd> 撤回上一步操作：uodo
<kbd> ctrl + r</kbd> 撤销撤销操作 redo 

<kbd>"ap</kbd> 可以调用很多个不同的剪切板
<kbd>"bp</kbd> （相对高级的操作，可以自定义用户片段）

<kbd>:set clipboard=unnamed </kbd> 将电脑的剪切板和暂存器同步

> vim 共有 48 个不同的暂存器，每个暂存器都有不同的效果

## 编辑文字

<kbd> A </kbd> 跳到行末 用 I 和 A 来替换 0i 和 $a
<kbd> O </kbd> 在当前行上方插入一行并进入插入模式（小写 o 在下一行开始写）

<kbd> D </kbd> 将光标后面的行中内容全部删除

<kbd> x </kbd> 删除单个字，放到暂存器中

<kbd> dd </kbd> **删除当前行**
<kbd> d12 </kbd> 删除当前光标之后的12 个字符
<kbd> 2dd </kbd> 删除两行
<kbd> d + h,l </kbd> 删除光标左侧的内容或者删除光标右侧的单个字
<kbd> dG </kbd> 删除光标之后直到文章末尾

<kbd> c </kbd> 删除选中内容并且把内容放到寄存器，直接进入 insert 模式，参数同 d 

> 使用 c 的话删除之后会立即进入 insert 模式，可以少打一下键盘，不用删除文字后再使用

<kbd> C</kbd> 和大写 <kbd> D </kbd> 的作用相同 （将光标后面的行中内容全部删除，同时进入 insert 模式）

<kbd> r </kbd>：replace 替换单个字母，替换之后仍然处于 normal 状态

<kbd>>> 或者 <<</kbd> 增加或者减少缩进

将所有内容选中之后，进行 <kbd>=</kbd> 操作，他们会自动格式化代码

## 编辑多个档案

TODO  > vim 编辑多个档案实操

<kbd>:e</kbd> 后面加上文件名，可以在不离开 vim 的情况下打开一个文件

<kbd>:tabe</kbd> 多窗口开启一个文件，后面跟文件名就打开那个对应的文件

<kbd>gt</kbd> 向后切换 tab 页 

<kbd>gT</kbd> 向前切换 tab 页

<kbd>:new</kbd> 开启页面分割
<kbd>ctrl w w</kbd> 循环切换
<kbd>ctrl w + j</kbd> 向下切换光标

<kbd>:vnew</kbd> 开启右侧页面 （垂直）
<kbd>ctrl w + l / h</kbd> 进行切换光标位置

<kbd>vim -o filename filename</kbd> 同时打开文档，水平窗口
<kbd>vim -O filename filename</kbd> 垂直窗口

<kbd>vim -p</kbd> 按照不同的 tab 页打开

可以用 buffer 操作代替多窗口操作 
<kbd>:bp</kbd>
<kbd>:bn</kbd>
<kbd>:blast \ :bl </kbd>
<kbd>:bf </kbd>
<kbd>:b filename</kbd>
<kbd>:bdelete \ :bd </kbd>

## 更多的选取功能

<kbd>ctrl + v</kbd> 进入 v-block 模式。可以实现竖着的光标选取，即 shift + alt 样式， （注意先关闭 ctrl v 的粘贴映射）

<kbd>vw</kbd> 选取一个单词，vwwwwww 就是按照单词进行光标区的扩充

<kbd>viw</kbd> **选取光标所处的单词** 常用 + c 字母进行对某一个块进行修改

<kbd>vaw</kbd> 按照块区选择单词

<kbd>vi"</kbd> 选取一个字符串中的内容，哇哇哇，vscode 中选中的话就很不方便

<kbd>vit</kbd> 选取 tag 中的所有内容 例如 html 中的内容

<kbd>vat</kbd> 相比于 vit 选取之后包含两边的 tag 

<kbd>v+{</kbd> 选取下方文本块 （复制一段函数很方便）
<kbd>v+}</kbd>

<kbd>diw ciw</kbd> 等操作同理

## vim text object  

名词： 
`w = word , s = sentence， p = paragraph t = tag;`
单双引号， 双括号，小括号，中括号，大括号

动词：
y = yank , p = paste, d = delete, c = change,

范围：
i= inner a = around

例如合起来的一个操作 <kbd>yiw</kbd> 

## 其他使用技巧

gg=G 进行文件格式化

ctrl + q 取消当前正在执行的命令

<kbd>^</kbd> 6 跳到行首，（去除空格部分）更加方便的开始再次写代码 代替 0 
正则表达式

<kbd>ctrlf</kbd> 往后面翻页
<kbd>ctrlb</kbd> 往前面翻页

<kbd>zf</kbd> 折叠代码段
<kbd>zd</kbd> 展开代码段

<kbd>zf i p</kbd> 就可以快捷的把一段文本进行折叠，而不用先选中再折叠

<kbd>.</kbd> 重复上一个《大动作》

<kbd>J</kbd>选中内容后，将多段文字的回车去除

<kbd>ctrl w</kbd> 删除一个 word 在 insert 模式下

<kbd>ctrl u</kbd> 前面的所有东西全部删除

<kbd>:!</kbd> + 想要执行的指令，就可以在 vim 窗口下面执行一些想要执行的指令

<kbd>:r!</kbd> + 指令 复制相应的内容

<kbd>:h</kbd> + 想要查询的内容

终端下执行：<kbd>vimtutor zh</kbd> 进入官方给出的 vim 教程

## 参考资料

- [即将失传的技艺 vim 【1P-14P】](https://www.bilibili.com/video/BV1fV41187Zr?p=1)
- [vimtutor zh]()
