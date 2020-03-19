---
layout: post
title: VScode使用PicGo插件搭建github稳定图床
tags: [Resolved bug]
categories: [VScode]
date: 2020-02-13
---

***

> 之前用了四五种上传图片 , 都不方便

vscode加PicGo插件 (找了好长时间,这个方法最好用

## 配置方法：  

懒人必用✨

* 找到扩展的配置文件 
* 将提交方式改为GitHub　　  
* 添加token  　
* 然后添加分支名字　master　
* 这里放一下我的配置截图　　　
* 我用的是一个单独仓库文件夹存放：　

* 

![20200305170541.png](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/20200305170541.png)

然后试一下热键,发现就成功了  　　
跳回你的GitHub里面看一下,就会发现仓库下面已经有这个图片了  
没必要非得在主仓库里面用,减少主仓库体积   

以后上传就使用本地文件夹 `img_for_blogs` ,使用 `ctrl+Alt+e` 查看目录选中文件进行上传  

也可以使用剪切板中的图片,也是快捷键一步完成,多舒服,图片大小比较大时,上传就会5-6秒左右,慢一点点（当第一次开始上传时也会有点慢）

## 上传图片快捷键

在VScode编辑器中直接使用以下快捷键,将自动完成上传并将图片链接自动插入到Markdown页面中

从剪贴板上传图像（非常常用）
Windows / Unix： **`Ctrl + Alt + u`**

从文件目录管理器上传图像(常用)  
Windows / Unix：**`Ctrl + Alt + e`**

从vscode输入框上传图像（几乎不用）   
Windows / Unix： `Ctrl + Alt + o` 

## 一些问题

* 文件名里不能有 ‘+’ 号,有 ‘+’ 就上传不成功 //因为剪切板中的文件名是乱码
* 当上传重复文件时会报错
* 有时剪切板会上传失败(image uploading 卡住) ,这时需要采用本地文件夹进行上传 **`Ctrl + Alt + e`**

![aaaa.png](https://raw.githubusercontent.com/fengwei2002/picture/master/fengwei2002/pictureaaaaaaaaaaaaaaaaaaaaaa.png)

03-05 16:43 解决（用了一整天）

按照如下结构配置  
***

* 创建空仓库
* 获取token ：TOKEN 只勾选 rope下面的内容即可
* 下图为参考

![QQ截图20200305164214.png](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/QQ%E6%88%AA%E5%9B%BE20200305164214.png)

这样在我的GitHub中就出现

![20200305170620.png](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/20200305170620.png)

成功 !  
PS：QQ 设置热键可以 win 中可以实现快速截图

