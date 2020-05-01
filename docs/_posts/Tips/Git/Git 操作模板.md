---
title: Git Bash & GitHub Template
vusse-title: Git
top: 1
category: Tips
tags:
  - Git
---
常用的 Git Bash & GitHub 模板
<!-- more -->
## 当某次提交出现 bug 后悔时

### 强制推送

简单但是不推荐：

* `git log` 查看历史 ID
* `git reset --hard` + ID
* `git push -f origin master` 

### 比较文件进行推送

通过 vscode 可视化窗口可以更加方便的查看是否融合指定文件

## 记录用户名和密码

当每次推送都出现让输入id和密码时：

`bash here`

```sh
git config --global credential.helper store
git pull /git push （这里需要输入用户名和密码, 以后就不用了）
```
执行完 git push 再测试一次, 解决了

## 添加新 GitHub 账户

```sh
git config --global user.name [username]
git config --global user.email [email]
ssh-keygen -t rsa -C "2480417969@qq.com"
```

* 然后成功后会在 User 文件夹对应的用户下创建。ssh 文件夹, 其中有一个 `id_rsa.pub` 文件, 复制其中的 `key`:
* 之后返回 github, 进入 Account Settings（账户配置）, 左边选择 `SSH and GPG Keys` 选项
* 验证是否绑定本地成功, 在 `bash` 中验证, 输入指令： 

```sh
ssh -T git@github.com  
```
如果第一次执行该指令, 则会提示是否 `continue` 继续, 如果我们输入 `yes` 就会看到成功信息  

HI... ..
