---
title: tmux 基础操作
date: 2021-08-25
tags:
  - tmux
---

tmux 是 linux 工作环境下的基础工具，熟练使用是必须的

![20210826002716-2021-08-26-00-27-19](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210826002716-2021-08-26-00-27-19.png)

一个 tmux 可以包含多个 session，一个 session 可以包含多个 window，一个 window 可以包含多个 pane。一般使用 session 和 pane 两个环节

![20210825113051-2021-08-25-11-30-56](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210825113051-2021-08-25-11-30-56.png)

## 1. 主操作

（一般情况下首先将主操作键 ctrl b 重定义到 ctrl a ）

- <kbd>CTRL</kbd> + <kbd>b</kbd> <kbd>CTRL</kbd>-o 调换终端左右窗口位置，类似与 vim 里的 <kbd>CTRL</kbd>-w
- <kbd>CTRL</kbd> + <kbd>b</kbd> %（shift + 5） 纵向分隔窗口
- <kbd>CTRL</kbd> + <kbd>b</kbd> "（shift + '） 横向分隔窗口
- <kbd>CTRL</kbd>-d：关闭当前 pane；如果当前 window 的所有 pane 均已关闭，则自动关闭 window；如果当前 session 的所有 window 均已关闭，则自动关闭 session。
- <kbd>CTRL</kbd> + <kbd>b</kbd> 上下左右：tmux 光标在窗口的移动
- <kbd>CTRL</kbd> + <kbd>b</kbd>-上下左右：调整 pane 之间分割线的位置
- <kbd>CTRL</kbd> + <kbd>b</kbd>, s：列出 session 目录。
    方向键 —— 上：选择上一项 session/window/pane
    方向键 —— 下：选择下一项 session/window/pane
    方向键 —— 右：展开当前项 session/window
    方向键 —— 左：闭合当前项 session/window
- <kbd>CTRL</kbd> + <kbd>b</kbd>, w：列出 Windows 目录
- <kbd>CTRL</kbd> + <kbd>b</kbd>, c: 在当前的 session 中新建一个 Windows
- <kbd>CTRL</kbd> + <kbd>b</kbd>，d 挂起当前 session
- tmux a 打开之前挂起的 session
- <kbd>CTRL</kbd> + <kbd>b</kbd>, c 在当前的 session 中创建一个新的 Windows 
- <kbd>CTRL</kbd> + <kbd>b</kbd>, ？打开帮助文档
- Alt + 上下， 在 linux 中进行翻页

## 2. 会话

tmux new 创建默认名称的会话
tmux new -s mysession 创建 mysession 的会话
tmux ls 以文本形式输出会话列表

tmux a　　连接上一个会话
tmux a -t mysession　　连接指定会话

tmux rename -t s1 s2　　重命名会话 s1 为 s2

tmux kill-session　　关闭上次打开的会话
tmux kill-session -t s1　　关闭会话 s1
tmux kill-session -t 会话名
tmux kill-session -a -t s1　　关闭除 s1 外的所有会话
tmux kill-server　　关闭所有会话

ctrl+b s　　列出会话，可进行切换
ctrl+b $　　重命名当前会话
`ctrl+b + s` 加上下方向键切换 `session`

## 3. 其他命令

<kbd>C-b == CTRL + b </kbd>
- C-b z 全屏当前 pane， 再次操作恢复布局
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

## 4. 文本复制模式：

鼠标模式下：
<kbd>ctrl</kbd> + <kbd>[</kbd> 进行选中块的复制  
<kbd>ctrl</kbd> + <kbd>]</kbd> 进行当前位置的粘贴


按下 `PREFIX-[` 进入文本复制模式。可以使用方向键在屏幕中移动光标。默认情况下，方向键是启用的。在配置文件中启用 Vim 键盘布局来切换窗口、调整窗格大小。Tmux 也支持 Vi 模式。要是想启用 Vi 模式，只需要把下面这一行添加到 .tmux.conf 中：


``` 
setw -g mode-keys vi
```

启用这条配置后，就可以使用 h、j、k、l 来移动光标了。

想要退出文本复制模式的话，按下回车键就可以了。然后按下 `PREFIX-]` 粘贴刚才复制的文本。


## 5. 配置选项：


``` sh 
# 鼠标支持 - 设置为 on 来启用鼠标(与 2.1 之前的版本有区别，请自行查阅 man page)
* set -g mouse on
# 设置默认终端模式为 256color
set -g default-terminal "screen-256color"
# 启用活动警告
setw -g monitor-activity on
set -g visual-activity on
# 居中窗口列表
set -g status-justify centre
```


## 6. 参考配置文件（~/.tmux.conf）：

```bash
# C-b 有些不合理，prefix 重置为 ctrl a 🤓
set -g prefix C-a

set -g base-index         1     # 窗口编号从 1 开始计数
set -g display-panes-time 10000 # PREFIX-Q 显示编号的驻留时长，单位 ms
set -g mouse              on    # 开启鼠标 🤓
set -g pane-base-index    1     # 窗格编号从 1 开始计数
set -g renumber-windows   on    # 关掉某个窗口后，编号重排

setw -g allow-rename      off   # 禁止活动进程修改窗口名
setw -g automatic-rename  off   # 禁止自动命名新窗口
setw -g mode-keys         vi    # 进入复制模式的时候使用 vi 键位（默认是 EMACS）🤓
```

## 7. 懒人 .tmux

![20210825214606-2021-08-25-21-46-11](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210825214606-2021-08-25-21-46-11.png)

github有一个比较花哨的一个，直接 clone 下来用就可以了：,主要优化底部栏，没什么实际用途

https://github.com/gpakosz/.tmux

## 8. 插件

TODO tmux 插件
> 工作之后再补吧， vim & tmux 插件相关， 现在已经够用了