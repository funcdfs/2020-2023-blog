---
title:  Git 模板
category: Tips
tags:
  - Git
---

# Git 模板

## 当某次提交出现 bug 后悔时

* `git log` 查看历史 ID
* `git reset --hard` + ID
* `git push -f origin master` 

## 解决多次输入用户名和密码

``` git
在一个仓库中 git bash here  然后执行以下两行
git config --global credential.helper store
git pull /git push （这里需要输入用户名和密码, 以后就不用啦）
执行完 gitpush 再测试一次, 就完美解决了
```

git config --global credential.helper store

## 绑定新账户

git config --global user.name [username]

git config --global user.email [email]

* ssh-keygen -t rsa -C "2480417969@qq.com"
* 然后成功后会在 User 文件夹对应的用户下创建。ssh 文件夹, 其中有一个 id_rsa.pub 文件, 复制其中的 key:
* 之后返回 github, 进入 Account Settings（账户配置）, 左边选择 SSH and GPG Keys 选项
* 验证是否绑定本地成功, 在 git-bash 中验证, 输入指令： 

 
ssh -T git@github.com  
如果第一次执行该指令, 则会提示是否 continue 继续, 如果我们输入 yes 就会看到成功信息  
HI... ..

## **github** **仓库徽标**

` https://img.shields.io/badge/{徽标标题}-{徽标内容}-{徽标颜色}.svg ` 

如果我们在写 markdown 的时候想为我们的徽章或者进度条添加点击跳转的超链接, 可以使用超链接和图片的语法嵌套来写

``` 
    [![](徽章/进度条 URL)]（点击超链接）
```
