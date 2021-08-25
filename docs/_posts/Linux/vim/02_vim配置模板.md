---
title: VIM 配置模板
date: 2021-07-12
tags:
  - vim
---


## 基础 coding vimrc 

``` vim
" 自动补全括号
imap ( ()<Left>
imap [ []<Left>
inoremap {<CR> {}<Left><CR><Tab><CR><Esc><Up><S-A>

inoremap " ""<Left>
inoremap ' ''<Left>

nmap <Enter> o 

" esc 键更新为 jj
inoremap jj <esc>

" 缩进为4
set tabstop=4
set softtabstop=4
set shiftwidth=4
" 将tab键转换为空白
set expandtab
" 自动填充部分缩进内容
set autoindent


" 同步Windows和暂存器的剪切板
set clipboard=unnamed

" 开启搜索高亮
set hlsearch

" 当前行增加下划线
" set cursorline

" 开启
set number

" 面包屑大于 2 时开启
set showtabline=1

" 新窗口位置移动到下面和右侧 new vnew
set splitbelow
set splitright

" 搜索的时候是不完全匹配。忽略大小写
set ignorecase

" 搜索字符实时匹配
set incsearch
set smartcase

" colorscheme

filetype on
filetype indent on
filetype plugin on

" 视角滚动， 打字机模式
set scrolloff=4
set showcmd 

" 去除括号高亮，太难看了
" :NoMatchParen
let loaded_matchparen=1
set noswapfile
```

## 关于缩进

" 缩进为 4
set ts=4
set expandtab
set autoindent

## key map setting  

:h key-notation 查询按键对应的名字

:set ruler 开启右下角的光标当前坐标显示

:set showcmd 开启键入字符预览

:set scrolloff=4

## 参考资料

- [即将失传的技艺 vim 【15P-30P】](https://www.bilibili.com/video/BV1fV41187Zr?p=15)

