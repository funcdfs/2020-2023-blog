---
title: tmux 基础操作
date: 2021-08-25
tags:
  - tmux
---

tmux 是 linux 工作环境下的基础工具，熟练使用是必须的

一个 tmux 可以包含多个 session，一个 session 可以包含多个 window，一个 window 可以包含多个 pane。一般使用 session 和 pane 两个环节

![20210825113051-2021-08-25-11-30-56](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210825113051-2021-08-25-11-30-56.png)

## 主操作

（一般情况下首先将主操作键 ctrl b 重定义到 ctrl a ）

- C-a C-o 调换终端左右窗口位置，类似与 vim 里的 C-w
- C-a %（shift + 5） 纵向分隔窗口
- C-a "（shift + '） 横向分隔窗口
- C-d：关闭当前 pane；如果当前 window 的所有 pane 均已关闭，则自动关闭 window；如果当前 session 的所有 window 均已关闭，则自动关闭 session。
- C-a 上下左右：tmux 光标在窗口的移动
- C-a-上下左右：调整 pane 之间分割线的位置
- C-a, s：列出 session 目录。
    方向键 —— 上：选择上一项 session/window/pane
    方向键 —— 下：选择下一项 session/window/pane
    方向键 —— 右：展开当前项 session/window
    方向键 —— 左：闭合当前项 session/window
- C-a, w：列出 Windows 目录
- C-a, c: 在当前的 session 中新建一个 Windows
- C-a，d 挂起当前 session
- tmux a 打开之前挂起的 session
- C-a, c 在当前的 session 中创建一个新的 Windows 
- C-a, ？打开帮助文档
- Alt + 上下， 在 linux 中进行翻页

## 会话

tmux new 创建默认名称的会话
tmux new -s mysession 创建 mysession 的会话
tmux ls 以文本形式输出会话列表
tmux a　　连接上一个会话
tmux a -t mysession　　连接指定会话
tmux rename -t s1 s2　　重命名会话 s1 为 s2
tmux kill-session　　关闭上次打开的会话
tmux kill-session -t s1　　关闭会话 s1
tmux kill-session -a -t s1　　关闭除 s1 外的所有会话
tmux kill-server　　关闭所有会话
ctrl+b s　　列出会话，可进行切换
ctrl+b $　　重命名会话

## 其他命令

- C-b ! 把当前窗口变为新窗口
- C-b q 显示分隔窗口的编号
- C-b o 跳到下一个分隔窗口
- C-b 上下键 上一个及下一个分隔窗口
- C-b C-方向键 调整分隔窗口大小
- C-b c 创建新窗口
- C-b 0~9 选择几号窗口
- C-b c 创建新窗口
- C-b n 选择下一个窗口
- C-b l 切换到最后使用的窗口
- C-b p 选择前一个窗口
- C-b w 以菜单方式显示及选择窗口
- C-b t 显示时钟
- C-b ; 切换到最后一个使用的面板
- C-b x 关闭面板
- C-b & 关闭窗口
- C-b s 以菜单方式显示和选择会话
- C-b d 退出 tumx，并保存当前会话，这时，tmux 仍在后台运行，可以通过 tmux attach 进入 到指定的会话

## 配置

现在已经可以进行基础的 tmux 分屏使用了， 就像 vim 一样，tmux 也可以进行很多个性化的配置 

Ubuntu 如何切换为 root 用户并创建文件/etc/.tmux.conf
https://askubuntu.com/a/446572 [由于 Ubuntu 中弃用 root 权限，使用 `sudo i` 替换 `su/su -`]

然后切换到 /etc 目录下

``` 
touch .tmux.conf
vim .tmux.conf

set -g prefix C-a
unbind C-b
```

或者是在 ~ 目录下，vim .tmux.conf
set -g prefix C-a
unbind C-b

重启 tmux ctrl + b 输入： source-file ~/.tmux.conf

将 ctrl r 设置为加载配置文件

bind C-r source-file ~/.tmux.conf \; display "Refleshed Configure!"

bind-key k select-pane -U # up
bind-key j select-pane -D # down
bind-key h select-pane -L # left
bind-key l select-pane -R # right