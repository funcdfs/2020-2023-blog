---
title: GitHub pages + vercel 加速&域名
category: Designer
tags:
  - vuepress
date: 2020-12-10
vssue-title: vuepress to GitHub pages
---

>将 vuepress 部署到 GitHub pages 并启用 ZEIT/vercel 加速&域名
<!-- more --> 

>将`vuepress`主仓库 `repo` 和展示仓库`.github.io`分离示例：

官方文档 [zeit.co/docs](https://zeit.co/docs)   
zeit 现在名字是 vercel 域名为 zeit.co / vercel.com

前置条件
- 熟悉 GitHub & git 的使用
- 熟悉任意一种 vuepress||各种可以使用 GitHub pages 搭建的博客框架
- 熟悉域名解析操作

## vuepress 相关本地配置

vuepress `package.json`中添加脚本文件

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
推送到 github.io 域名空间即可，若自己已购买域名则添加 echo 那一行

bash 中执行 `yarn run deploy` 即可部署至 GitHub pages  
bash 中执行 `yarn docs:dev` 即可本地预览

## 使用 NEIT/vercel 进行加速：(可选)

一个小小的博客而已，完全没必要买服务器，💴多不说了
GitHub pages 使用 zeit/vercel 提供的搭载文件服务
国内访问也可以达到正常速度（图床除外）

[zeit.co 官网介绍文档](https://zeit.co/docs)  
[ZEIT 控制台](https://zeit.co/dashboard)

~~别推送太频繁（一分钟五次？），否则仓库会暂时挂掉的 `socket hang up`~~

>不得不说的是这个 zeit/vercel 的官网页面是真好看

我之前使用的是 `Vuepress`+`GitHubPages`+`zeit.co`+腾讯云域名   
我现在使用的是   
`Vuepress`+`GitHubPages`+`zeit.co`+`vercel提供的 xxx.now.sh`域名


优化前：

![GitHub pages + 腾讯云域名](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-15-12-55-57.png =424x298)

优化后：
![效果还行](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-15-12-55-29.png =424x298)

官方文档有详细介绍(英文hhh)，就不当翻译官了，自行查阅
部署过程中重要的一些截图：（参考）

![import仓库的最后一步](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-15-35-06.png)

>一直选默认配置，最后这一步选 other 即可

![可选的三种域名，前两种免费](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-10-21-27-19.png)

大概的加速过程就是先手动推送文件到GitHub，然后vercel进行文件爬取，vercel进行渲染，GitHub page也进行渲染网页，同时两个站点刷新网页对应的域名内容  
但是vercel在台湾，GitHub pages在美国旧金山

## 腾讯云域名

阿里云买的也一样

部分重要参考截图

![添加后](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-15-40-09.png)

这是控制板的解析配置

>腾讯云一分钟内解析就会生效了

![解析截图](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-20-15-44-57.png)

>注意：vercel 官网示例中的 ANAME==域名解析中的 CNAME

这样配置的话每次提交到 GitHub 后就会自动部署到 zeit/vercel 中，
vercel 进行网页渲染   
实现国内的加速目的

记得不要开启谷歌分析，否则国内就会白加速了。。

还有就是每次部署后如果使用 chrome 的话如果没刷新内容  
可以使用 ctrl + F5 清除浏览器缓存强制刷新一下，秒部署是秒部署，但是本地浏览器可能不生效

## .now.sh 域名

因为目前的博客其实偏向于玩具项目  
自己还没有什么资历，写的文章也会只有一丁点的访问量  
基本就是用来记笔记的hhh  
然后就：  一个小小的博客而已，完全没必要买域名..

并且突然觉得 feng-w.cn 这个域名突然觉得有点xxs了，喜兴厌旧本喜（

现在的主域名是

konng.now.sh   
konng.vercel.app
（当然距离xxs域名过期时间还早，依然可以访问）  

第一个域名后缀也很帅的
这两种域名后缀直接添加就好

![选个好听的免费域名吧~](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-10-21-36-09.png)

访问速度和国内域名没什么变化，减少了一次域名再解析，理应更快了

## 推荐

试过 hexo Jekyll hugo gitee 服务器 gitee

0费用最佳方案：  
`vuepress + GitHub pages + picgo&github + vercel.com + xxx.now.sh`  
不在乎💴最佳方案：  
`vuepress + 阿里云OSS + 阿里云服务器 + 阿里云域名`

具体每个的使用方法建议谷歌官方文档