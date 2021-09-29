---
title: Ubuntu 常用命令
date: 2021-09-22
tags:
  - vim
---

## 新机配置

### ssh

``` sh 
ssh-keygen
```

配置文件 `~/.ssh/config` 使用别名连接服务器

``` sh 
Host serverName
    HostName IP地址或域名
    User 用户名

Host serverName
    HostName IP地址或域名
    User 用户名
```

免密登录服务器：

``` sh 
ssh-copy-id serverName 
```

> 或者手动 
> 则将`id_rsa.pub`中的内容，复制到 serverName 中的 `~/.ssh/authorized_keys` 文件里即可。

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


Ubuntu 修改命令行前缀

省略主机的乱码显示：

https://www.codeleading.com/article/91734369695/

.bashrc 为前缀添加颜色

``` sh 
PS1="\[\e[37;40m\]\[\e[32;40m\]\u\[\e[37;40m\]@\h \[\e[36;40m\]\w\[\e[0m\]\$> " 
# 显示主机名字
PS1="\[\e[37;40m\]\[\e[32;40m\]\u\[\e[37;40m\]@ \[\e[36;40m\]\w\[\e[0m\]\$> " 
# 只显示用户名
```

vim：使用 https://github.com/amix/vimrc

``` sh 
git clone --depth=1 https://github.com/amix/vimrc.git ~/.vim_runtime
sh ~/.vim_runtime/install_awesome_vimrc.sh
```

tmux：使用 https://git.acwing.com/fengwei/tmux

``` sh 
git clone git@git.acwing.com:fengwei/tmux.git
ln -s -f .tmux/.tmux.conf
cp .tmux/.tmux.conf.local .
```

或者手动添加

`vim .tmux.conf`

多：

``` sh 
set-option -g status-keys vi                        
setw -g mode-keys vi
setw -g monitor-activity on                                                     
# setw -g c0-change-trigger 10                                                   
# setw -g c0-change-interval 100                                                 
# setw -g c0-change-interval 50                  
# setw -g c0-change-trigger  75                                                  
set-window-option -g automatic-rename on             
set-option -g set-titles on                        
set -g history-limit 100000                                                                                                                                                                      
#set-window-option -g utf8 on                                                 
# set command prefix                                  
set-option -g prefix C-a                            
unbind-key C-b                                      
bind-key C-a send-prefix                                                                                                                                                              
bind h select-pane -L                                
bind j select-pane -D                                
bind k select-pane -U                                
bind l select-pane -R                                                 
bind -n M-Left select-pane -L                      
bind -n M-Right select-pane -R                      
bind -n M-Up select-pane -U                        
bind -n M-Down select-pane -D

bind < resize-pane -L 7
bind > resize-pane -R 7
bind - resize-pane -D 7
bind + resize-pane -U                                 
bind-key -n M-l next-window
bind-key -n M-h previous-window

set -g status-interval 1
# status bar
set -g status-bg black
set -g status-fg blue


#set -g status-utf8 on
set -g status-justify centre
set -g status-bg default
set -g status-left " #[fg=green]#S@#H #[default]"
set -g status-left-length 20


# mouse support
# for tmux 2.1
# set -g mouse-utf8 on
set -g mouse on
#
# for previous version
#set -g mode-mouse on
#set -g mouse-resize-pane on
#set -g mouse-select-pane on
#set -g mouse-select-window on


#set -g status-right-length 25
set -g status-right "#[fg=green]%H:%M:%S #[fg=magenta]%a %m-%d #[default]"

# fix for tmux 1.9
bind '"' split-window -vc "#{pane_current_path}"
bind '%' split-window -hc "#{pane_current_path}"
bind 'c' new-window -c "#{pane_current_path}"

# run-shell "powerline-daemon -q"

# vim: ft=conf
```

少：


``` sh 
set -g prefix C-a
set -g mouse on
# 其实鼠标一开，prefix 设置为 C-a 就可以一般使用了
set -g pane-base-index 1
setw -g mode-keys vi
```

## root 用户相关

普通用户切换到 root 用户

``` sh
sudo su # su = (switch user)
```

从 root 用户切换到普通用户


``` sh 
su username # username 是用户名
# 或者直接执行 exit || logout 命令退回到普通用户
```

root 用户创建用户

为了能够创建和删除用户，您需要以root身份或具有sudo权限的用户身份登录。

``` sh
sudo adduser username # 密码是必须的，其他询问信息可选
```

该命令将创建新用户的家目录，并将文件从/etc/skel目录复制到用户的主目录。在主目录中，用户可以编写，编辑和删除文件和目录。

默认情况下，在Ubuntu上，sudo组的成员被授予sudo访问权限。

如果您希望新创建的用户具有管理权限，请将用户添加到sudo组：

sudo usermod -aG sudo username


## 更多的 ls

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
