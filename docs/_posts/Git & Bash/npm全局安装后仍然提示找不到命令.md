---
title: windows npm 全局安装后仍然提示找不到命令
vssue-title: npm
date: 2020-12-19
tags:
    - npm
---

> 更新 VScode 主题插件的时候遇到的

<!-- more -->

## 问题的出现

喵喵喵？，今天有人给我的 KONNG 主题评论：建议 js 和 css 的 

![2020-12-19-14-53-33](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-19-14-53-33.png)

## 原因

win 下的环境变量路径有两个，用户环境变量和系统环境变量  

我的用户环境变量 path 路径只能添加一个值
系统 环境变量 path 路径可以添加 n 个对应值

前几天装 kotlin 的运行环境，然后把用户 path 路径的那个值赋给了 kotlin，然后系统 环境变量 path 路径也没有添加新的 key

![2020-12-19-18-27-50](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-19-18-27-50.png)

解决方法

命令行执行

``` cpp 
npm prefix -g
```

prefix：  
n. 前缀   
vt. 加前缀, 将某事物加在前面   

将输出的路径添加到全局变量的 path 中即可

![2020-12-19-18-29-40](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-19-18-29-40.png)

![2020-12-19-18-29-56](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-19-18-29-56.png)

然后打开扩展执行 vsce 的发布步骤

![2020-12-19-18-42-19](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-19-18-42-19.png)