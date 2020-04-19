---
title: BFS HDU 1072 噩梦迷宫
category: Algorithm
tags:
  - OJ
---

#### Created:  2020-04-15 16:07:51

[链接](http://acm.hdu.edu.cn/showproblem.php?pid=1072)

::: tip 题目背景
有一个人昨晚做了一场噩梦。他发现自己身处迷宫 (labyrinth) 中，并且身上挂着一颗定时炸弹。迷宫只有有一个出口；在炸弹爆炸之前，这个人应该离开迷宫。
炸弹的初始爆炸时间设置为 6 分钟。为了防止炸弹因移动而爆炸，这个人必须缓慢移动，
（一分钟内只能在相邻的 1 格空间上下左右移动，一次走一格）
迷宫中的某些区域包含一个炸弹时间重置设备。他们可以将爆炸时间重置为 6 分钟。（也就是特殊装备碰到的越多越好）
:::

>不能在墙上走，不能在迷宫外面走，一次只能走一步，
>时间为 0 还没出去就嗝屁了，嗝屁了之后即使回泉水 (Bomb-Reset-Equipment) 也不能使用了
>泉水 (Bomb-Reset-Equipment) 可以无限次使用，想来几次来几次，每次补满为 6min，
>Ignatius can get to any areas in the labyrinth as many times as you wish.

::: tip 输入
给定迷宫的初始布局和这个角色在地图上的初始位置，
T 组 每组都规定一次迷宫的长宽 
There are five integers which indicate the different type of area in the labyrinth:
0: 墙     The area is a wall, Ignatius should not walk on it. 
1: 马路   The area contains nothing, Ignatius can walk on it. 
2: 出生点 Ignatius' start position, Ignatius starts his escape from this position.
3: 出口   The exit of the labyrinth, Ignatius' target position.
4: 复活点 The area contains a Bomb-Reset-Equipment, Ignatius can delay the exploding time by walking to these areas.
:::

::: tip 输出
please tell Ignatius whether he could get out of the labyrinth, if he could, output the minimum time that he has to use to find the exit of the labyrinth, else output -1.
For each test case, if Ignatius can get out of the labyrinth, you should output the minimum time he needs, else you should just output -1.
:::

