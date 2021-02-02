---
title: 使用 GitHub Actions 自动部署 vuepress
vssue-title: Use-Github-Action-deploy-vuepress
date: 2021-02-02
tags:
    - Github Action
    - vuepress
---

> 不会吧，不会吧，不会你还没用过 GitHub Action 吧///

<!-- more -->

## vuepress

用 vuepress 也有快一整年了，每次提交都要等三分钟左右，而之前使用过的 Jekyll 搭建的静态网站就可以把文章或者代码 push 到仓库然后就可以实时预览

一般部署博客的流程是：

- 写一篇文章
- 生成静态文件
- 切换 gh-pages 分支
- 复制静态文件到 gh-pages 分支
- 访问网址验证是否成功

或者是

- 写一篇文章
- 生成静态文件
- 将静态文件推送到其他仓库
- 其他仓库的 master 分支/gh 分支进行预览
- 访问网址验证是否成功

博客源码与部署仓库分离自然是第二种方法

当你使用了 GitHub Actions 之后，流程可以简化为：

- 写一篇文章
- 提交到 GitHub
- 结束

从机械的流程中解脱，专注于写作。

action 相当于可以将本地的执行脚本操作在 GitHub 提供的 Linux 上运行，究极舒适，人上人用法  
vuepress 官方文档虽然没有给出，但我在 GitHub 上面接触到的 vuepress 频繁使用者~~基本~~都用着 action, 我一直有想法却没弄，弄完还是挺方便的。

## vuepress-deploy

因为执行的都是很多相同的操作，所以 action marketplace 也就自然而然的存在了
搜 Vuepress GitHub action 就会有很多可选项

例如我用的这个：[vuepress-deploy](https://github.com/jenkey2011/vuepress-deploy)

中文文档在这里：[README.zh-CN.md](https://github.com/jenkey2011/vuepress-deploy/blob/master/README.zh-CN.md)

但是这个的话，示例仓库和 vuepress 官方仓库结构不太一样
然后就导致按照文档 cv 的话 build 就会出现各种错误

![2021-02-02-17-12-44](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-02-17-12-44.png)

调试 action 提交了 20 次

![2021-02-02-17-10-10](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-02-17-10-10.png)

然后就是 Google 大法好

![浏览器 TAB](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-02-16-58-58.png)

最后也是试了十几次变绿了

![2021-02-02-17-05-36](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-02-17-05-36.png)

## vuepress-deploy 相关错误的解决

主要是 [这个 DEMO](https://github.com/jenkey2011/vuepress-deploy-demo/blob/master/.github/workflows/deploy-to-other-repo-master.yml) 的 vuepress 没有使用 docs 结构
然后脚本什么的也就需要重写了，yml 也需要手动改一下

最终的 vuepress-deploy.yml: 

``` yml
name: github action
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: Build and Deploy
      uses: jenkey2011/vuepress-deploy@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        TARGET_REPO: fengwei2002/fengwei2002.github.io
        TARGET_BRANCH: master
        BUILD_SCRIPT: yarn && yarn docs:build
        BUILD_DIR: docs/.vuepress/dist/
```
`TARGET_REPO` 填写输出仓库就行

就是这个最后两行配置挺烦的，是**构建命令**和**构建目录**
平时使用的都是 dev 本地预览和 deploy 远程部署，构建命令一般不用，所以容易搞混

默认的是 `yarn && build` 和 `blog/.vuepress/dist/`, 然鹅官方步骤构建的话主要的 vuepress 都是在 docs 文件夹下，所以就会出现脚本不匹配的各种报错

![2021-02-02-17-29-58](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-02-17-29-58.png)

 `BUILD_SCRIPT` 的值就把 `yarn && build` 改为`yanr && yarn ` + **自己的 build 脚本**即可
> 就这里试了好多次。...⬆

`BUILD_DIR`写 **build 后的 dist 文件的输出目录**, 不是`.vuepress/dist/`也不是`blog/.vuepress/dist/`, 平时用的 dist 在哪填哪就行

输出目录写错的话预览就会出现问题，脚本命令写错的话 action 就会执行失败（根据报错进行修改 yml 文件即可）

例如我的 package.json 里的脚本命令是这样写的
``` json 
...................
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "build": "vuepress build",
    "docs:build": "vuepress build docs",
  },
......................
```

那么最后的 yml 配置就是

``` yml
TARGET_REPO: fengwei2002/fengwei2002.github.io
TARGET_BRANCH: master
BUILD_SCRIPT: yarn && yarn docs:build
BUILD_DIR: docs/.vuepress/dist/
```

也要根据自己的 deploy.sh 进行调整，三个文件脚本统一就行

``` sh
set -e
npm run docs:build
cd docs/.vuepress/dist
# echo 'feng-w.cn' > CNAME
git init
git add -A
git commit -m 'yarn run deploy'
git push -f git@github.com:fengwei2002/fengwei2002.github.io.git master
cd -
```

过程中可以跳转到仓库的 Action 页面查看日志，报错进行修改就好了和命令行一样样的

![2021-02-02-17-05-05](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-02-17-05-05.png)

![2021-02-02-17-41-36](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-02-17-41-36.png)

推送即部署就完成啦~

## GitHub Actions

鉴于上面提到的三个 action 统一 repo 的存在一些小瑕疵可以自己搜寻 action 或者自己写

有特殊需求想自己添加 workflow:
- [官方文档：https://docs.github.com/cn/actions](https://docs.github.com/cn/actions)
- 以及路人写的action教程

想找 action:

- [awesome-actions](https://github.com/sdras/awesome-actions)
- [https://github.com/actions](https://github.com/actions)
- https://github.com/marketplace?type=actions

然后就是要利用好搜索引擎了。
实在找不到就得自己写 action 了,不过实际使用中可以偷懒的想法基本都有程序员实现过,拿来用就行
