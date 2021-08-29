---
title: Notion 自定义 css 以及使用优化后的客户端 
date: 2021-08-29
tags:
  - notion
---

关于 notion 的用户体验：

## 起因

虽然 notion 工具很好用，但是不思进取的管理者始终使用户体验停留在上个年代，  
就连代码块运算符颜色和背景都不一样？？？迷惑行为，**并且看样子不打算修复** ![20210830005623-2021-08-30-00-56-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210830005623-2021-08-30-00-56-24.png)   
（等我有知识储备一定自己写一个 Notion）  

## 优化
首先难以忍受的是代码块运算符颜色和背景不一样，所以就找到了：  

### 客户端优化：
- [notion-enhancer](https://github.com/notion-enhancer/notion-enhancer) 重写了个客户端，但是 win11 顶部控制栏有 bug，这个和原始版本目前都只能是凑活用（date: 2021-08-29[三小时前更新了 notion-repackaged](https://github.com/notion-enhancer/notion-repackaged)，**已经以完美使用这个来替换不中用的官方客户端了**）
- ctrl shift + a 调出 notion 窗口，方便很多，不用再切换窗口了， alt + E 也可以使用很多很方便的插件
- 现在的用户体验才算是正常了，可以选用一个黑色主题 neutral ![20210830004422-2021-08-30-00-44-23](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210830004422-2021-08-30-00-44-23.png)

### 接下来是网页端优化
插件：
- [Notion Boost Chrome 插件商店链接](https://chrome.google.com/webstore/detail/notion-boost/eciepnnimnjaojlkcpdpcgbfkpcagahd/related)
- [Notion Boost 插件官网](https://gourav.io/notion-boost) 你说官方集成一下这点点功能就不行？？
- 没有找到相关的，就自己发布了一个纠正颜色的 Stylus 插件：[【notion-code-fix】](https://userstyles.world/style/908/notion-code-fix)![20210830005056-2021-08-30-00-50-57](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210830005056-2021-08-30-00-50-57.png) 你说官方一行就可以修好的这么严重的 bug 也是无人问津？？
  - 可以在 https://github.com/notion-enhancer/tweaks 中寻找更多 notion 相关的优化 css，或者自己写，然后使用 Chrome 的 stylus 插件进行发布使用即可

## 优化之后的 notion 体验：

客户端：（还有很多丝滑的新体验）
![20210830005718-2021-08-30-00-57-19](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210830005718-2021-08-30-00-57-19.png)

web 端：（还可以通过 notion boost 插件开启右侧的目录）
![20210830010414-2021-08-30-01-04-15](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210830010414-2021-08-30-01-04-15.png)

这样看起来就舒服多了，21世纪老古董会被淘汰的！