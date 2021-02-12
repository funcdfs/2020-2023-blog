---
title: css 3D动画重点
draft: true
date: 2021-02-13
tags:
  - CSS
---

## perspective 理解

CSS3中的perspetive在这样一个体系里就代表着元素与观者之间的距离，形象点说，就是元素3D效果的强度。CSS3中的3D效果消失点固定，变化的是观者与元素之间的距离。不过perspective数值与3D效果强度是成反比的，数值越大，元素的3D效果越不明显——2000px的视点意味着你看的是远方的物体，而100px则意味着这个物体就在你眼前。

![20210212225050-2021-02-12](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20210212225050-2021-02-12.png)

这样：

![20210212225304-2021-02-12](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20210212225304-2021-02-12.png)

值越小，透视距离越近，效果越明显

该属性为定义3D变换的元素与视图的距离，也就是透视距离。这个属性应添加到视图元素(变换元素的父元素)上。
这是3d动画必备的属性，如果不添加这个属性，则动画会变成平面效果。

一般用在舞台元素也就是容器上，这样会让该容器中所用动画元素使用一个视角，这个属性还可以单独用在每个元素中，自然元素也就只呈现自己的视角样式。

### 消失点

![20210212225636-2021-02-12](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20210212225636-2021-02-12.png)

左图与右图的元素均绕Y轴旋转了45度，但差别很明显，右图更容易让人想到一个画面中集体开启的窗户。左图的问题就在于，每个元素的消失点各自为政，都在元素的中心点位置，而右图的消失点则统一在实线方框的中心位置。实现方法就是将元素的perspetive设置转移至元素父容器上。

### preserve-3d

transform-style: preserve-3d

超越平面3D的关隘就在于transform-style: preserve-3d的属性设置，默认值为flat

（这个属性可以把一个处于2维的div变为3d空间，把这个属性比作一个相机的摄像头,这个div内的内容会以3d的形式通过摄像头的形式反馈给你,他的子元素才会享受3d效果,子元素以下的元素就不会有3d效果。）


### transform-origin

transform-origin：50% 50%;

旋转移动围绕的轴线,默认是中心,可以设left,right,top,bottom,也可以设值数值，这样可以调整旋转移动所围绕的轴线，完成诸如翻页，开门等动作。
(这就相当于你的眼镜啦,位置不同效果也就不同了)

### backface-visibility：

backface-visibility：hidden 是否隐藏元素背面

## 3d

在2d的基础上添加 z 轴的变化

3D 位移：在2d的基础上添加 translateZ（），或者使用translate3d（） translateZ（）：以方框中心为原点，变大
3D 缩放：在2d的基础上添加 scaleZ（），或者使用scale3d（） scaleZ（）和 scale3d（）函数单独使用时没有任何效果

## 效果

### 翻页

### 翻页加阴影

### 立方体

### 长方体

,

