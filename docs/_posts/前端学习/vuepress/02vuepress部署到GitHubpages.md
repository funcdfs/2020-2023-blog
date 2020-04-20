---
title: 将 vuepress 部署到 GitHub pages 并启用 ZEIT 加速
category: 前端
tags:
  - vuepress
date: 2020-04-14
vssue-title: vuepress to GitHub pages
---

>将`vuepress`主仓库和展示仓库`.github.io`分离示例：[zeit.co/docs](https://zeit.co/docs)
<!-- more -->

## 本地配置

`package.json`中添加脚本文件

```json
"scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "deploy": "bash deploy.sh"
  },
```
将部署命令打包为脚本 deploy.sh

```sh
set -e
npm run docs:build
cd docs/.vuepress/dist
echo 'feng-w.cn' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:fengwei2002/fengwei2002.github.io.git master
cd -
```

bash 中执行 `yarn run deploy` 即可部署

## 使用 NEIT 进行加速：(可选)

一个小小的博客而已，完全没必要买服务器，使用 zeit 提供的服务国内访问也可以达到正常速度

[zeit.co 官网介绍文档](https://zeit.co/docs)
[ZEIT 控制台](https://zeit.co/dashboard)

~~别推送太频繁，会挂掉的`socket hang up`~~

>这个 zeit 的页面是真好看

我使用的是 `Vuepress`+`GitHubPages`+`zeit.co`+腾讯云

优化前：

![2020-04-15-12-55-57](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-15-12-55-57.png =424x298)

优化后：
![2020-04-15-12-55-29](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-15-12-55-29.png =424x298)

重要的一些截图：

![2020-04-20-15-35-06](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-15-35-06.png)

>一直选默认配置，最后这一步选 other 即可

![2020-04-20-15-40-09](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-15-40-09.png)

![2020-04-20-15-39-17](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-15-39-17.png)

这是解析配置

>腾讯云一分钟内解析就会生效了

![2020-04-20-15-44-57](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-15-44-57.png)

>官网示例中的 ANAME==域名解析中的 CNAME

这样配置的话每次提交到 GitHub 后就会自动部署到 zeit 中，加速完成