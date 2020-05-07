---
title: Git Bash & GitHub Template
date: 2020-05-06
vusse-title: Git
category: Tips
tags:
  - Git
---
常用的 Git Bash & GitHub 模板
<!-- more -->
## 当某次提交出现 bug 后悔时

### 强制推送

简单但是不推荐：当确保上一次的提交完全不想要的时候执行

* `git log` 查看历史 ID
* `git reset --hard` + ID
* `git push -f origin master` 

### 比较文件进行推送

通过 vscode 可视化窗口可以更加方便的查看是否融合指定文件

## 记录用户名和密码

当每次推送都出现让输入 id 和密码时：

`bash here`

```sh
git config --global credential.helper store
git pull /git push （这里需要输入用户名和密码，以后就不用了）
```
执行完 git push 再测试一次，解决了

## 添加新 GitHub 账户

```sh
git config --global user.name [username]
git config --global user.email [email]
ssh-keygen -t rsa -C "2480417969@qq.com"
```

* 然后成功后会在 User 文件夹对应的用户下创建。ssh 文件夹，其中有一个 `id_rsa.pub` 文件，复制其中的 `key`:
* 之后返回 github, 进入 Account Settings（账户配置）, 左边选择 `SSH and GPG Keys` 选项
* 验证是否绑定本地成功，在 `bash` 中验证，输入指令： 

```sh
ssh -T git@github.com  
```
如果第一次执行该指令，则会提示是否 `continue` 继续，如果我们输入 `yes` 就会看到成功信息  

HI...

## Windows LF 和 CRLF 的转换问题

用 vuepress 时 yarn run deploy 发现有这种警告信息

```sh
warning: LF will be replaced by CRLF in 404.html.
The file will have its original line endings in your working directory
warning: LF will be replaced by CRLF in About/index.html.
The file will have its original line endings in your working directory
```

所以就准备来解决这个 warning

文本文件所使用的换行符，在不同的系统平台上是不一样的。UNIX/Linux 使用的是 0x0A（LF），早期的 Mac OS 使用的是 0x0D（CR），后来的 OS X 在更换内核后与 UNIX 保持一致了。但 DOS/Windows 一直使用 0x0D0A（CRLF） 作为换行符。

跨平台协作开发是常有的，不统一的换行符确实对跨平台的文件交换带来了麻烦。最大的问题是，在不同平台上，换行符发生改变时，Git 会认为整个文件被修改，这就造成我们没法 `diff`，不能正确反映本次的修改。还好 Git 在设计时就考虑了这一点，其提供了一个 `autocrlf` 的配置项，用于在提交和检出时自动转换换行符，该配置有三个可选项：

- `true`: 提交时转换为 LF，检出时转换为 CRLF
- `false`: 提交检出均不转换
- `input`: 提交时转换为 LF，检出时不转换

用如下命令即可完成配置：

```sh
# 提交时转换为 LF，检出时转换为 CRLF
git config --global core.autocrlf true
# 提交时转换为 LF，检出时不转换
git config --global core.autocrlf input
# 提交检出均不转换
git config --global core.autocrlf false
```

如果把 autocrlf 设置为 false 时，warning 即可不显示，但另一个配置项 safecrlf 最好设置为 ture。该选项用于检查文件是否包含混合换行符，其有三个可选项：

- `true`: 拒绝提交包含混合换行符的文件
- `false`: 允许提交包含混合换行符的文件
- `warn`: 提交包含混合换行符的文件时给出警告

配置方法：

```sh
# 拒绝提交包含混合换行符的文件
git config --global core.safecrlf true
# 允许提交包含混合换行符的文件
git config --global core.safecrlf false
# 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn
```

到此，还并未解决我遇到的问题。实际上，我们有两种办法解决。

一种是将配置项改为如下的形式：

```sh
$ git config --global core.autocrlf false
$ git config --global core.safecrlf false
```

这种方式是不推荐的，虽然代码能被提交，不失败且不报错，但是项目中的文件可能会包含两种格式的换行符。而且会有如上提到的问题，文件被视为整个被修改，无法 diff，之所以使用版本控制工具，最重要的原因之一就是其 diff 功能。

```sh
$ git config --global core.autocrlf false
$ git config --global core.safecrlf warn
```

这种就是对于混合文件报 warning，但是统一的文件不进行处理，要么全为 LF，要么全为 CRLF 

### 使用替换工具适应多系统 LF 和 CRLF 

另一种办法是，手动将文件的换行符转化为 LF，这可以通过编辑器来完成，大部分编辑器都可以将文件的换行符风格设置为 unix 的形式。VSCODE 选右下角换行格式即可，发现修改一个文件的换行符后会被视为文件全部修改，所以在实际应用中这一步不应该与内容的修改一起完成，内容修改完全完成后再进行换行符的修改，防止diff失效；
也可以使用 dos2unix 转换工具来完成，Windows 上 Git bash 客户端自带了该工具。其他系统上也可以安装该工具，例如 Ubuntu 上安装：

```sh
sudo apt-get install dos2unix
```

有了该工具，可以批量的把项目中的文件都转化一遍：

```sh
find . -type f | xargs dos2unix
```

或者

```sh
find . -type f -exec dos2unix {} +
```

如果涉及到在多个系统平台上工作，推荐将 git 做如下配置：

```sh
$ git config --global core.autocrlf input
$ git config --global core.safecrlf true
```

也就是让代码仓库使用统一的换行符 (LF)，如果代码中包含 CRLF 类型的文件时将无法提交，需要用 dos2unix 或者其他工具手动转换文件类型。当然，可以根据自己的需要进行更为合适的配置！

## yarn 更新依赖包

```sh
// 先下载
yarn global add npm-check-updates
// 更新包（yarn.lock和package.json同步更新）
ncu --upgrade --upgradeAll && yarn upgrade
```

```sh
yarn upgrade-interactive --latest
// 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
```
