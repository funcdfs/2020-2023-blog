---
title: turtle 库在 python 中的使用
date: 2020-04-25
category: basics
tags:
  - Python
---

从一个小 python 的代码绘制开始
<!-- more -->
```py
import turtle

turtle.setup(650, 350, 200, 200)
turtle.penup()
turtle.fd(-250)
turtle.pendown()
turtle.pensize(25)
turtle.pencolor("red")
turtle.seth(-40)
for i in range(4):
    turtle.circle(40, 80)
    turtle.circle(-40, 80)
turtle.circle(40, 80 / 2)
turtle.fd(40)
turtle.circle(16, 100)
turtle.fd(40 * 2 / 3)
```

![2020-04-25-17-44-52](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-25-17-44-52.png)

## 基本操作

`turtle.setup(650, 350, 200, 200)`
用来设置启动窗体的大小以及位置
`width height start-x start-y`后两个参数可选
`turtle.penup()`
可以用 goto 配合绝对坐标来绘制直线
`turtle.fd(-250)`
fd 为海龟向海龟正前方运行，bk 表示向后运行
用 fd 来绘制线
`turtle.circle(16, 100)`
为当前海龟画一个圈
`turtle.seth(45)`
为角度坐标系下的角度

现在就可以绘制字母了（直线构成）

## import 保留字

`import==#include`

若使用 `from turtle import*`

则库中函数不必使用`turtle.xxx()`的形式，直接使用`xxx()`即可

第一种方式引入的函数不会出现函数重名的方式，第二种会出现重名函数
所以单一库使用第二种，大程序使用第一种方式

也可以使用`import<库名>as<库别名>`来给调用库关联一个更短，更适合自己的名字。如此最佳

## 

