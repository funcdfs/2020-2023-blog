---
title: java 基础语法
vssue-title: java-basic-syntax
date: 2021-03-07
tags:
    - java
---

> java01 基础语法

<!-- more -->

## 1. 教程

[javatpoint 网页语法用例：](https://www.javatpoint.com/java-tutorial)

[mooc-wenkai](https://www.icourse163.org/learn/ZJU-1001541001?tid=1450243457#/learn/content)

## 2. 计算

和 cpp 一摸一样的基本，接受一种新语法而已

### 2.1. 变量与计算

``` java
package javademo;

import java.util.Scanner;

public class javaDemo {
    public static void main(String[] args) {
        System.out.println("变量加法");
        Scanner in = new Scanner(System.in);
        //n. [计] 扫描仪，扫描器，光电子扫描装置
        int input = in.nextInt();
        int base = in.nextInt();
        System.out.print(input+"+" + base + "=" + (input + base));
        //加号作为字符串连接符号
    }
}
```

system.out 里面也有 cpp 的 printf，格式化输出的规则和 cpp 相同

final 关键字替换 const 关键字

### 2.2. 浮点数计算

浮点数规则和 cpp 相同

## 3. 判断

### 3.1. 比较

java 判定浮点数是否相等

``` java
 System.out.println(Math.abs(a-b)<一个较小的数）
```

### 3.2. 判断

if else 结构的各种使用和 cpp 完全相同

### 3.3. 分支

switch case 结构的各种使用和 cpp 完全相同

## 4. 循环

while 也和 cpp 完全相同

不会在任意时刻判断条件是否满足 

do while 循环和 while 循环的区别就是第一次循环是否进入

for == while 

可以利用逗号在 for 循环的三个位置添加需要执行的多条语句

### break 

在循环前面可以放置一个标号来标识循环
label:
带标号的 break 和 continue 对那个循环起作用，而不是 break 当前处于的那个循环

## 数组

> 定义数组变量，创建数组

``` java
int[] numbers = new int[100];
```

遍历数组和使用数组中元素的方式和 cpp 相同

- 元素个数必须是整数
- 元素个数必须给出
- 元素个数**可以是变量**

cpp中写算法题要是用到可变数组就用vector

java数组中集成了部分函数 用点运算符可以直接使用

> 直接初始化数组

new创建的数组会得到默认的0
`int[] scores = {8,8,8,8,8,8,8,8,8,8,8,8};`

![20210307174123-2021-03-07](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210307174123-2021-03-07.png)

相比于cpp数组，可以直接进行相互赋值的操作（地址赋值，不重新开辟空间）

![20210307174716-2021-03-07](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210307174716-2021-03-07.png)

### 遍历数组

for each 循环

``` java
for ( int i : data){

}
```

### 二维数组

两个方括号进行初始化


``` java
int[][] a= new int[7][7];
```
## 逃逸字符
![20210307184355-2021-03-07](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210307184355-2021-03-07.png)

## 包裹类型

`Character.isDigit();`

有很多帮助你做事情的子功能

## 字符串变量

![20210307185057-2021-03-07](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210307185057-2021-03-07.png)

`+` 用来做连接

如果一边不是字符串的话，就会将其他转换为字符串 `"S"+12+24="S1224"`

in.next 按照空格分隔读入的数据

判断字符串是否相等时，要用字符串 equals 这个函数 ，是一个东西和是否具有相同的内容是两种情况

`charAt(index) `用来读取字符串的字符
`indexOf('A')` 读取相应字符的下标 

字符串不能用 for each 循环

`substring(2,4)` 左闭，右开

但是成员函数的使用都不会改变字符串变量本身

## Math 类

abs绝对值
round 四舍五入
pow 次方
random() 随机数


## 函数

![20210307194153-2021-03-07](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210307194153-2021-03-07.png)

使用方式和cpp相同，都要有返回值等等
传参的方式也和cpp相同，`eg:swap`

在程序任意的一片空地上面凭空使用一个大括号也可以，当需要本地变量的时候


