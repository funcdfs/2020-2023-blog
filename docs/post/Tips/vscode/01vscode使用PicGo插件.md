---
title: VScode 使用 PicGo 插件搭建 github 稳定图床
---

# VScode 使用 PicGo 插件搭建 github 稳定图床

![@](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/QQ%E5%9B%BE%E7%89%8720200413104837.jpg =200x200)
***

> 之前用了四五种上传图片的方式 , 都不方便

vscode 加 PicGo 插件 （找了好长时间，这个方法最好用）

## 配置：  

懒人必用✨

* 创建一个 GitHub 空仓库用来存放图片
* 安装 picgo 插件
* 在`setting.json`中找到相应扩展的配置文件
* 将提交方式改为 `GitHub`　　  
* 写好要上传的 `GitHub` 仓库目录（也可以不是空仓库）
* 然后添加分支名字：`master`　
* 从 `GitHub` 中获取一个 `PicGo` 插件专属 `token`添加到配置项中  　
* 使用快捷键进行测试

>我用的是一个单独仓库文件夹存放　没必要非得在主仓库里面用，减少博客（其他）主仓库体积

## 我的示例配置：

本地配置：

![20200413125837](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200413125837.png)

GitHub 配置：

* Github 中创建空仓库
* 获取 token ： token 只勾选 rope 下面的小对勾即可

如果按上面的 picgo 配置，那么 GitHub 中结构应该是这样：
![20200413124951](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200413124951.png)

## 上传图片快捷键

在 VScode 编辑器中直接使用以下快捷键，将自动完成上传并将图片链接自动插入到 Markdown 页面中

从剪贴板上传图像（非常常用）
Windows / Unix： **`Ctrl + Alt + u`**
>QQ 或者微信可以设置快捷键从而实现快速截图到剪切板，所以图片可以跳过本地存储
>一般使用就是 [[ctrl]]+[[Alt]]+[[c]]（两个社交软件都能自定义快捷键）截图完成后跳回 vscode
>使用[[ctrl]]+[[Alt]]+[[u]] 等待上传完成即可

从文件目录管理器上传图像
Windows / Unix：[[Ctrl]] + [[Alt]] + [[e]]

从 vscode 输入框上传图像（几乎不用）   
Windows / Unix： [[Ctrl]] + [[Alt]] + [[o]] 

## 一些问题

* 文件名里不能有 ‘`+`’ 号，有 ‘`+`’ 就上传不成功 //因为剪切板中的文件名是乱码
* 当上传重复文件时会报错
* 有时剪切板会上传失败 (image uploading 卡住） , 这时需要采用本地文件夹进行上传 **`Ctrl + Alt + e`**
* 文件名可能出现`(`或者`)`还有`[`或者`]`，导致无法查看图片，这时使用`\`转义相关字符或者保存到本地重新上传即可


