---
layout: post
title:  Git模板
tags: [模板]
categories: [模板]
date: 2020-02-19
---

***

## 常见 $Git$ 问题

### 当某次提交出现bug后悔时

* `git log` 查看历史ID
* `git reset --hard` + ID
* `git push -f origin master` 

### 解决多次输入用户名和密码

``` git
在一个仓库中 git bash here  然后执行以下两行
git config --global credential.helper store
git pull /git push (这里需要输入用户名和密码，以后就不用啦)
执行完gitpush再测试一次，就完美解决了
```

git config --global credential.helper store

### 绑定新账户

git config --global user.name [username]

git config --global user.email [email]

* ssh-keygen -t rsa -C "2480417969@qq.com"
* 然后成功后会在User文件夹对应的用户下创建.ssh文件夹，其中有一个id_rsa.pub文件，复制其中的key:
* 之后返回github，进入 Account Settings（账户配置），左边选择SSH and GPG Keys选项
* 验证是否绑定本地成功，在git-bash中验证，输入指令： 

 
ssh -T git@github.com  
如果第一次执行该指令，则会提示是否continue继续，如果我们输入yes就会看到成功信息  
HI... ..

### **github** **仓库徽标**

` https://img.shields.io/badge/{徽标标题}-{徽标内容}-{徽标颜色}.svg ` 

如果我们在写markdown的时候想为我们的徽章或者进度条添加点击跳转的超链接, 可以使用超链接和图片的语法嵌套来写

``` 
    [![](徽章/进度条URL)](点击超链接)
```

### git push 和 git fetch 的区别

因为vscode插件弹出来一个提醒，是否每隔一段时间运行 git fetch  
所以有时间需要温习一次git操作原理

***

git add: 相当于加号（暂存更改）

git commit: 相当于对号（提交） 把内容存到本地的.git文件里。执行了commit的所有东西都能找回来

git push：推送到远程

git从远程到本地： git clone https://github.com/fengwei1428/hello.git

查看历史：git log; 在gitlens插件里面也可以看

恢复到某一次提交： 复制gitlog里面的commit id；（不需要全部复制） git reset --soft 12232; (soft 时把更改暂存；hard是直接删除所有更改；一般是使用soft)

export https_proxy=127.0.0.1:1080

git branch： 新建分支

git push origin master 推送到远程分支的master

git push origin 本地分支名字: 远程分支名字 推送到远程的新分支

$ git status

(显示当前git文件夹中文件的状态)

$ git log

(查看操作日志)

$ git push

(将commit文件推送到远程仓库)

$ cd ..

(返回上一文件夹)

$ mkdir git-tutorial

(新建一个文件夹)

$ cd git-tutorial

(工作目录切换到该文件夹目录)

$ git init

(对当前文件夹进行git行为初始化操作)

$ git add README.md

(将该文件暂存以供提交)

git add .

(暂存所有文件)

$ git log --pretty=short

(显示log日志的第一行，操作人和地址信息，不返回操作时间)

$ git log -p README.md

(显示readme文件的操作记录)

$ ls

(列出当前目录下的所有文件)

$ code README.md

(使用vscode打开README，替换传统vim)

$ git diff

(查看暂存文件的区别---未commit文件)

$ git commit -m "README"

(将暂存文件commit并同时添加描述信息)

$ git branch

(显示当前工作分支)

$ git checkout -b A

(在新分支创建的同时切换分支)

$ git checkout -B <new_branch>

(该命令主要加了一个可选参数B，如果已经存在了同名的分支，使用 git checkout -b <new_branch>会提示错误，加入-B可选参数后会强制创建新分支，并且会覆盖原来存在的同名分支)

$ =git branch newBranch +git checkout newBranch=git checkout -b\|-B <new_branch> [<start point>]

$ git checkout master

(切换工作分支)

$ git checkout --orphan <new_branch>

(假如你的某个分支上，积累了无数次的提交，你也懒得去打理，打印出的log也让你无力吐槽，那么这个命令将是你的神器，它会基于当前所在分支新建一个赤裸裸的分支，没有任何的提交历史，但是当前分支的内容一一俱全。新建的分支，严格意义上说，还不是一个分支，因为HEAD指向的引用中没有commit值，只有在进行一次提交后，它才算得上真正的分支)

$ git checkout -

$ git checkout master

$ git merge --no-ff A

$ git log --graph

$ git log

$ git reset --hard 0c25d2973702b88b20

$ git commit -m "addB"

$ git reflog

