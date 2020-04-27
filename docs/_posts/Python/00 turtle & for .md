---
title: turtle 库在 python 中的使用
date: 2020-04-25
category: basics
tags:
  - Python
---

从一个小 python 的绘制开始
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

## 基本操作-绘制直线

`turtle.setup(650, 350, 200, 200)`
用来设置启动窗体的大小以及位置
参数为 `width height start-x start-y`后两个参数可选（左、上）
 
 可以用 goto 配合绝对坐标来绘制直线
`turtle.fd(-250)`
fd 为海龟向海龟正前方运行，bk 表示向后运行
所以用 fd 来绘制线

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

## 画笔控制函数

`turtle.penup()`
抬笔，不显示轨迹
`turtle.pendown()`
落笔，成对出现
`turtle.pensize()`
海龟的腰围
`turtle.pencolor()`
字符串或者 RGB 值（三个数字参数）

## 运动控制函数

`turtle.forward()` == `turtle.fd()`
参数为以像素为单位的前进距离，直线

`turtle.circle(r,extent=None)`
根据半径 r 绘制 extent 角度（参数也为纯数字）的弧形，圆心在左侧 r 距离的位置，曲线
第二个参数不给出时就绘制一个圆

## 方向控制函数

绝对角度
`turtle.setheading() == turtle.seth(angle)`
改变为相对于绝对坐标系下的绝对角度

相对角度
`turtle.left()`
`turtle.right()`
参数也是一个纯数字

## 循环语句与 range 函数

range 是额外的函数，不是和 for 一体的

```py
for <变量> in range (<参数>)
    被循环执行的语句
```

```py
for i in range(5)
  print("hello:"i) 
```
print 参数逗号隔开会添加一个逗号

`range(N)`
产生`0 ~ N-1`整数序列，共 N 个

`range(M,N)`
产生 M 到 N-1 的整数序列，共 N-M 个
`range(2,5)==2/3/4`

## pycharm 中使用 turtle 库

在 `turtle.py` 中搜索 `_all_`关键字

![2020-04-26-17-22-20](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-26-17-22-20.png)

将前两行的内容注释掉，换成下面的内容

```py {1,2}
# __all__ = (_tg_classes + _tg_screen_functions + _tg_turtle_functions +
#            _tg_utilities + ['Terminator']) # + _math_functions)
__all__ = ['ScrolledCanvas', 'TurtleScreen', 'Screen', 'RawTurtle', 'Turtle', 'RawPen', 'Pen', 'Shape', 'Vec2D', 'back',
           'backward', 'begin_fill', 'begin_poly', 'bk', 'addshape', 'bgcolor', 'bgpic', 'bye', 'clearscreen',
           'colormode', 'delay', 'exitonclick', 'getcanvas', 'getshapes', 'listen', 'mainloop', 'mode', 'numinput',
           'onkey', 'onkeypress', 'onkeyrelease', 'onscreenclick', 'ontimer', 'register_shape', 'resetscreen',
           'screensize', 'setup', 'Terminator', 'setworldcoordinates', 'textinput', 'title', 'tracer', 'turtles',
           'update', 'window_height', 'window_width', 'write_docstringdict', 'done', 'circle', 'clear', 'clearstamp',
           'clearstamps', 'clone', 'color', 'degrees', 'distance', 'dot', 'down', 'end_fill', 'end_poly', 'fd',
           'fillcolor', 'filling', 'forward', 'get_poly', 'getpen', 'getscreen', 'get_shapepoly', 'getturtle', 'goto',
           'heading', 'hideturtle', 'home', 'ht', 'isdown', 'isvisible', 'left', 'lt', 'onclick', 'ondrag', 'onrelease',
           'pd', 'pen', 'pencolor', 'pendown', 'pensize', 'penup', 'pos', 'position', 'pu', 'radians', 'right', 'reset',
           'resizemode', 'rt', 'seth', 'setheading', 'setpos', 'setposition', 'settiltangle', 'setundobuffer', 'setx',
           'sety', 'shape', 'shapesize', 'shapetransform', 'shearfactor', 'showturtle', 'speed', 'st', 'stamp', 'tilt',
           'tiltangle', 'towards', 'turtlesize', 'undo', 'undobufferentries', 'up', 'width', 'write', 'xcor', 'ycor']
```

然后程序结尾额外添加 `turtle.done()` 即可定格画面（不自动关闭）
