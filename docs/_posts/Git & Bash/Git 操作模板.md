---
title: Git 模板
date: 2021-09-22
tags:
  - Git
---

## 1. git 常用命令

1. `git config --global user.name fengwei2002` 设置全局用户名，信息记录在 `~/.gitconfig` 文件中
2. `git config --global user.email konng0120@gmail.com` 设置全局邮箱地址，信息记录在 `~/.gitconfig` 文件中
3. `git init` 将当前目录配置成 `git` 仓库，信息记录在隐藏的 `.git` 文件夹中
4. `git add fileName` 将 XX 文件添加到暂存区
5. `git add .` 将所有待加入暂存区的文件加入暂存区
6. `git rm --cached fileName` 将文件从仓库索引目录中删掉
7. `git commit -m "给自己看的备注信息"` 将暂存区的内容提交到当前分支
8. `git status` 查看仓库状态
9. `git diff fileName` 查看 XX 文件相对于暂存区修改了哪些内容
10. `git log` 查看当前分支的所有版本
    1.  `git log --pretty=oneline` 将 git log 输出为一行显示
11. `git reflog` 查看 HEAD 指针的移动历史（包括被回滚的版本，用于版本跳转）
12. `git reset --hard HEAD^` 或 `git reset --hard HEAD~`：将代码库回滚到上一个版本
13. `git reset --hard HEAD^^` 往上回滚两次，以此类推
14. `git reset --hard HEAD~100` 往上回滚 100 个版本
15. `git reset --hard` 版本号：回滚到某一特定版本 （哈希值取前 7 位数字）
16. `git restore --staged fileName` 将 XX 文件从暂存区中移除
17. `git checkout — fileName`  `git restore fileName` 将 XX 文件尚未加入暂存区的修改全部撤销
18. `git remote add origin git@git.acwing.com:xxx/XXX.git` 将本地仓库关联到远程仓库 (后面的是 SCP)
19. `git push -u` （第一次需要-u 以后不需要）将当前分支推送到远程仓库
20. `git push origin branch_name`：将本地的某个分支推送到远程仓库 初始化时是 `master/main`
21. `git clone sshLink` 将远程仓库 XXX 下载到当前目录下
22. `git checkout -b branch_name`：创建并切换到 branch_name 这个分支
23. `git branch`：查看所有分支和当前所处分支
24. `git checkout branch_name`：切换到 branch_name 这个分支
25. `git merge branch_name`：将分支 branch_name 合并到当前分支上 手动合并冲突内容
26. `git branch -d branch_name`：删除本地仓库的 branch_name 分支
27. `git branch branch_name`：创建新分支
28. `git push --set-upstream origin branch_name`：设置本地的 branch_name 分支对应远程仓库的 branch_name 分支
29. `git push -d origin branch_name`：删除远程仓库的 branch_name 分支
30. `git pull`：将远程仓库的当前分支与本地仓库的当前分支合并
31. `git pull origin branch_name`：将远程仓库的 branch_name 分支与本地仓库的当前分支合并
32. `git branch --set-upstream-to=origin/branch_name1 branch_name2`：将远程的 branch_name1 分支与本地的 branch_name2 分支对应
33. `git checkout -t origin/branch_name` 将远程的 branch_name 分支拉取到本地
34. `git stash`：将工作区和暂存区中尚未提交的修改存入栈中 (stash：藏匿)
35. `git stash apply`：将栈顶存储的修改恢复到当前分支，但不删除栈顶元素
36. `git stash drop`：删除栈顶存储的修改
37. `git stash pop`：将栈顶存储的修改恢复到当前分支，同时删除栈顶元素
38. `git stash list`：查看栈中所有元素


## 2. 记录用户名和密码

当每次推送都出现让输入 id 和密码时：
`bash here`

```sh
git config --global credential.helper store
git pull /git push （这里需要输入用户名和密码，以后就不用了）
```
执行完 git push 再测试一次，解决了

## 3. 添加新 GitHub 账户

```sh
git config --global user.name [username]
git config --global user.email [email]
ssh-keygen -t rsa -C "xxx@qq.com"
```

* 然后成功后会在 User 文件夹对应的用户下创建 `.ssh` 文件夹，其中有一个 `id_rsa.pub` 文件，复制其中的 `key`不要删除或者添加字符：
* 之后返回 github/gitlab, 进入 Account Settings, 选择 `SSH and GPG Keys` 选项，在右上角 new ssh 中填写复制好的 Key
* 验证是否绑定本地成功，在 `bash` 中验证，输入指令：

```sh
ssh -T git@github.com  
```

如果第一次执行该指令，则会提示是否继续，（多个选项）如果我们 **输入 yes** 就会看到成功信息  

HI...
balabulabula

新生成密钥的时候，git clone 或者 push 的时候，也有可能会报这样的错误：

The authenticity of host 'github.com (192.30.255.112)' can't be established.
RSA key fingerprint is ~~乱码~~. 

这个的原因是少了一个 known_hosts 文件，本来密钥文件应该是三个，现在是两个，便报了这样的错误，此时选择 yes 回车之后，便可，同时生成了缺少了的 known_hosts 文件：

``` sh
Are you sure you want to continue connecting (yes/no)? //输入 yes，回车即可正常使用
```

## 4. Windows LF 和 CRLF 的转换问题

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

### 4.1. 使用替换工具适应多系统 LF 和 CRLF 

另一种办法是，手动将文件的换行符转化为 LF，这可以通过编辑器来完成，大部分编辑器都可以将文件的换行符风格设置为 unix 的形式。VSCODE 选右下角换行格式即可，发现修改一个文件的换行符后会被视为文件全部修改，所以在实际应用中这一步不应该与内容的修改一起完成，内容修改完全完成后再进行换行符的修改，防止 diff 失效；
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

## 5. yarn 更新依赖包

```sh
// 先下载
yarn global add npm-check-updates
// 更新包（yarn.lock 和 package.json 同步更新）
ncu --upgrade --upgradeAll && yarn upgrade
```

```sh
yarn upgrade-interactive --latest
// 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
```

当出现了 go install fatal: username 的错误的时候
[link1](https://medium.com/@pavelgordon/today-i-learned-solving-terminal-prompts-disabled-problem-with-go-and-gitlab-31124e796077)
[link2](https://christina04.hatenablog.com/entry/handle-error-when-go-get-private-repo)

以 uuzu 为例:

.gitconfig

```sh
[user]
        name = 封伟(封伟)
        email = wfeng@yoozoo.com
[core]
        autocrlf = input
        safecrlf = warn
[credential]
        helper = manager
[url "ssh://git@gitlab.uuzu.com/"]
    insteadOf = https://gitlab.uuzu.com/
```

最后两行写入配置就可以了