---
title: Ubuntu 常用命令
date: 2021-11-18
tags:
  - linux
---

## 新机配置

### ssh

``` sh 
ssh-keygen
```

配置文件 `~/.ssh/config` 就可以使用别名连接服务器

``` sh 
Host serverName
    HostName IP地址或域名
    User 用户名

Host serverName
    HostName IP地址或域名
    User 用户名
    [Port 20000] # 添加 port 端口用于 ssh 直连 docker 创建的容器
```

免密登录服务器：

``` sh 
ssh-copy-id serverName 
```

> 或者手动 
> 则将`id_rsa.pub`中的内容，复制到 serverName 中的 `~/.ssh/authorized_keys` 文件里也可以。

然后 `ssh serverName` 即可

### git 

1. `git config --global user.name xxx` 设置全局用户名，信息记录在 `~/.gitconfig` 文件中
2. `git config --global user.email xxx@xxx.com` 设置全局邮箱地址，信息记录在 `~/.gitconfig` 文件中


将 `~/.ssh/id_rsa.pub` 复制到 ssh 配置项即可

执行更新正常使用 sudo 安装

``` sh
apt-get update
apt-get upgrade
```

## vim tmux bash

### bash 相关

省略主机的乱码显示：

https://www.codeleading.com/article/91734369695/

.bashrc 为前缀添加颜色

``` sh 
PS1="\[\e[37;40m\]\[\e[32;40m\]\u\[\e[37;40m\]@\h \[\e[36;40m\]\w\[\e[0m\]\$> " 
# 显示主机名字
PS1="\[\e[37;40m\]\[\e[32;40m\]\u\[\e[37;40m\]@ \[\e[36;40m\]\w\[\e[0m\]\$> " 
# 只显示用户名
```

### vim 配置

使用 https://github.com/fengwei2002/vim-for-server

国外：

``` sh
curl https://raw.githubusercontent.com/fengwei2002/vim-for-server/master/vimrc > ~/.vimrc
```

国内：

``` sh 
curl https://git.acwing.com/fengwei/vim-for-server/-/raw/master/vimrc > ~/.vimrc
```

配置中的 atom-dark 主题


``` sh 
curl https://git.acwing.com/fengwei/vim-for-server/-/raw/master/colors/atom-dark.vim > ~/.vim/colors/atom-dark.vim

curl https://git.acwing.com/fengwei/vim-for-server/-/raw/master/colors/atom-dark-256.vim > ~/.vim/colors/atom-dark-256.vim
```

添加 auto-pairs 括号补全

国外：

``` sh 
curl https://raw.githubusercontent.com/jiangmiao/auto-pairs/master/plugin/auto-pairs.vim > ~/.vim/plugin/auto-pairs.vim
```

国内：

``` sh 
curl https://git.acwing.com/fengwei/vim-for-server/-/raw/master/plugin/auto-pairs.vim > ~/.vim/plugin/auto-pairs.vim
```

### tmux

使用 https://git.acwing.com/fengwei/tmux-for-server


国外：

``` sh 
curl https://raw.githubusercontent.com/fengwei2002/tmux-for-server/main/.tmux.conf > ~/.tmux.conf
```

国内：
``` sh 
curl https://git.acwing.com/fengwei/tmux-for-server/-/raw/main/.tmux.conf > ~/.tmux.conf
```

tmux 简洁配置：

``` sh
set -g prefix C-a
set -g mouse on
# 其实 tmux 鼠标一开，prefix 设置为 C-a 就可以一般使用了
```

## root 用户相关

普通用户切换到 root 用户

``` sh
sudo su # su = (switch user)
su root
sudo root
```

在 root 用户重置 root 用户的密码

``` sh
passwd
```

从 root 用户切换到普通用户

``` sh 
su username # username 是用户名
# 或者直接执行 exit || logout 命令退回到普通用户
```

root 用户创建用户

为了能够创建和删除用户，您需要以root身份或具有sudo权限的用户身份登录。

``` sh
[sudo] adduser username # 密码是必须的，其他询问信息可选
```

`[]` 代表可选

该命令将创建新用户的家目录，并将文件从 `/etc/skel` 目录复制到用户的主目录。在主目录中，用户可以编写，编辑和删除文件和目录。

默认情况下，在 Ubuntu 上，sudo 组的成员被授予 sudo 访问权限。

希望新创建的用户具有管理权限，所以将用户添加到 sudo 组：

``` sh 
usermod -aG sudo fw
```

## 常用命令

### 系统状态

- `top`：查看所有进程的信息（Linux的任务管理器）
  - 打开后，输入M：按使用内存排序
  - 打开后，输入P：按使用CPU排序
  - 打开后，输入q：退出
- `df -h`：查看硬盘使用情况
- `free -h`：查看内存使用情况
- `du -sh`：查看当前目录占用的硬盘空间
- `ps aux`：查看所有进程
- `kill -9 pid`：杀死编号为pid的进程
  - 传递某个具体的信号：`kill -s SIGTERM pid`
- `netstat -nt`：查看所有网络连接
- `w`：列出当前登陆的用户
- `ping www.baidu.com`：检查是否连网


### 文件权限

- `chmod`：修改文件权限，一般用到 `google` 即可
  - `chmod +x xxx`：给xxx添加可执行权限
  - `chmod -x xxx`：去掉xxx的可执行权限
  - `chmod 777 xxx`：将xxx的权限改成777
  - `chmod 777 xxx -R`：递归修改整个文件夹的权限


### 文件检索

- `find /path/to/directory/ -name '*.py'`：搜索某个文件路径下的所有 `*.py` 文件
- `grep xxx`：从 stdin 中读入若干行数据，如果某行中包含 `xxx`，则输出该行；否则忽略该行。
- `wc`：统计行数、单词数、字节数
  既可以从 `stdin` 中直接读入内容；也可以在命令行参数中传入文件名列表；
  - `wc -l`：统计行数
  - `wc -w`：统计单词数
  - `wc -c`：统计字节数
- `tree`：展示当前目录的文件结构
  - `tree /path/to/directory/`：展示某个目录的文件结构
  - `tree -a`：展示隐藏文件
- `ag xxx`：搜索当前目录下的所有文件，检索xxx字符串
- `cut`：分割一行内容
  - 从 `stdin` 中读入多行数据
  - `echo $PATH | cut -d ':' -f 3,5`：输出 PATH 用:分割后第3、5列数据
  - `echo $PATH | cut -d ':' -f 3-5`：输出 PATH 用:分割后第3-5列数据
  - `echo $PATH | cut -c 3,5`：输出 PATH 的第3、5个字符
  - `echo $PATH | cut -c 3-5`：输出 PATH 的第3-5个字符
- `sort`：将每行内容按字典序排序
  - 可以从`stdin`中读取多行数据
  - 可以从命令行参数中读取文件名列表
- `xargs`：将`stdin`中的数据用空格或回车分割成命令行参数
  - `find . -name '*.py' | xargs cat | wc -l`：统计当前目录下所有 python 文件的总行数
- `tee`: 用于显示程序的输出并将其复制到一个文件中。demo：`g++ -o a main.cpp && ./a | tee a.txt`

### 查看文件内容

- `more`：浏览文件内容
  - 回车：下一行 
  - 空格：下一页
  - b：上一页
  - q：退出
- `less`：与more类似，功能更全
  - 回车：下一行
  - y：上一行
  - Page Down：下一页
  - Page Up：上一页
  - q：退出
- `head -3 xxx`：展示xxx的前3行内容
  - 同时支持从stdin读入内容
- `tail -3 xxx`：展示xxx末尾3行内容
  - 同时支持从stdin读入内容

### 用户相关

- `history`：展示当前用户的历史操作。内容存放在 `~/.bash_history` 中

## 工具

- `md5sum`：计算md5哈希值
  - 可以从stdin读入内容
  - 也可以在命令行参数中传入文件名列表；
- `time command`：统计command命令的执行时间
- `ipython3`：交互式python3环境。可以当做计算器，或者批量管理文件。
  - `! echo "Hello World"`：!表示执行shell脚本
- `watch -n 0.1 command`：每0.1秒执行一次command命令
- `tar`：压缩文件
  - `tar -zcvf xxx.tar.gz /path/to/file/*`：压缩
  - `tar -zxvf xxx.tar.gz`：解压缩
- `diff xxx yyy`：查找文件xxx与yyy的不同点

### ls

ls可以按照文件大小进行输出排序

-S sort by file size

由大到小排序

`ls -Sl`
从小到大排序

`ls -Slr`

-h，表示”–human-readable”，单位是k或者M ，比较容易看清楚结果。

显示子目录结构

`ls -R`

ls按时间排序

`ls -lt` 从新到旧
`ls -lrt` 从旧到新


``` sh
ls -slrh # 满级人类的 ls
```

https://github.com/gokcehan/lf

当然，有人开发了更加好用的工具，取名 `lf` 

> lf (as in "list files") is a terminal file manager written in Go. It is heavily inspired by ranger with some missing and extra features. Some of the missing features are deliberately omitted since they are better handled by external tools. See faq for more information and tutorial for a gentle introduction with screencasts.

使用文档： [pkg.go.dev/github.com/gokcehan/lf](https://pkg.go.dev/github.com/gokcehan/lf?utm_source=godoc)