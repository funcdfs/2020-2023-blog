---
title: java 进阶特性
date: 2021-03-14
tags:
    - java
---

## 用类制造对象

![20210307200759-2021-03-07](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210307200759-2021-03-07.png)

和 py 里面的 turtle 库使用方法差不多

## 回收

java 里面不关心什么时候变量消失，具有垃圾回收机制

## 类

java 会给成员变量默认值，0.。

### 构造函数

构造时自动调用

进去的第一件事就是回到对象的变量初始化部分

没有返回类型的函数

可以有多个构造函数，但是需要通过参数类型来区分

### private

针对类而不是针对对象

### public

一个编译单元只能有一个 public 的类

没有声明 public 的类当离开这个文件之后就不能使用了

## 包

package 目录层级就是包，类的管理方式

import 和 py 中的 import 相同，引入一个类，之后使用类的时候就不用每次使用”点“出来的全名了

使用 display.led 创建子文件夹 import java.util.Scanner;

## 类变量

加上 static 修饰的变量可以使用类的名字加上点来操作那个值，任何一个对象都拥有这变量，但是只有那一份，  
不管是在对象中修改还是使用类点进行修改。都是那一份变量

他们的初始化和对象的创建是没有关系的

## 类函数

函数前面的 static 修饰，这个函数和对象没有关系，他是属于这个类的

可以在 static 函数中调用其他 static 函数

## 泛型容器类

``` java
package javademo;

import java.util.ArrayList;
import java.util.Scanner;

public class javaDemo {
    private ArrayList<String> notes = new ArrayList<String>();
    //notes 是一个对象管理者
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
    }
}
```

要确定容器的类型，容器要放入的元素的类型，相当于 cpp 中的 vector

### ArrayList 常用操作

## for each 循环

数组中使用 for each 不能进行元素的修改，得到的是元素的复制品

在对象数组中使用 for each 循环就可以改变具体的值

![20210310162451-2021-03-10](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210310162451-2021-03-10.png)

容器类可以使用 for each 循环

## set 容器

相当于数学中的 set 

在集合中没有重复的元素，所有元素各不相同

可以直接放入元素，自动去重

可以直接进行 `System.out.println(myset)` 输出

 ![20210310164717-2021-03-10](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210310164717-2021-03-10.png)
 
 所有具有 toString 函数的类都可以直接输出，包括自定义手写类

## hash 表

``` java
package javademo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

public class javaDemo {
    private HashMap<Integer,String> coins = new HashMap<Integer,String>();
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
    }
}
```

对于 hash 表来说 hash 的键值也只能存在一个，多次输入值保留最后一个

## 继承

用于创建有同种特点的类

extends 关键字


``` java
public class CD extends items {
    ...
}
```
CD 成为 items 的一个子类

## 子类父类关系

private ： 继承类不可以直接使用

protected ： 自己可以访问，同一个包内可以访问，子类的继承可以访问

关于构造函数中的：`super(title);`

这个函数要传入父类已经完成的构造函数赋值项

![20210311210328-2021-03-11](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210311210328-2021-03-11.png)

当执行子类的构造函数时会自动先调用父类构造器，也就是 `super();` 但是如果父类没有无参构造函数，就会报错
当父类具有有参构造函数的时候，用 super 带参，传给父级后，就寻找对应参数的父类构造函数

![20210311211011-2021-03-11](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210311211011-2021-03-11.png)

子类会覆盖父类的成员变量

如果想在子类的重写函数中，沿用父类对应函数的相关功能，用 super 引出

![20210311211737-2021-03-11](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210311211737-2021-03-11.png)

不同的子类只要具有相同的父类就可以放入一个父类的容器里面

## 向上造型

![20210311212853-2021-03-11](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210311212853-2021-03-11.png)

 ![20210311213636-2021-03-11](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210311213636-2021-03-11.png)

 只是进行看待方式的转换，而不是类型的转换

 那一个子类的对象当作一个父类的变量来用就叫做向上造型

## 函数调用的绑定


![20210311214245-2021-03-11](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210311214245-2021-03-11.png)

java 默认所有的绑定都是动态绑定

![20210311214358-2021-03-11](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210311214358-2021-03-11.png)、

多态就是使用一个变量调用一个函数，具体使用什么函数自己去决定

## 类型系统

除了cpp，所有面向对象语言都具有这种单根结构的类型系统

![20210311215037-2021-03-11](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210311215037-2021-03-11.png)

判断两个同类型对象是否相同的时候，需要自己写一个 equals 函数

![20210311215910-2021-03-11](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210311215910-2021-03-11.png)

## DOME的新媒体类型

可扩展性

![20210312214136-2021-03-12](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210312214136-2021-03-12.png)


## OOP 语言设计缺陷修复

- 消除代码复制：利用函数消除多行相同的内容
- 封装：将经常用到的同类型信息进行封装
- 耦合度越低越好：万不得已的时候才使用public，私有变量，转用公有函数实现，虽然代码多了，但是维持了自定义的接口，封装

stringbuffer  可以减少系统开销

![20210312220114-2021-03-12](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210312220114-2021-03-12.png)

同类型成员变量采用容器进行设计，这样同类型的变量就不是硬编码了
例如一个房间中的方向和路径，都用容器写后，就可以使用接口进行扩充，真不错

把程序的硬编码尽可能的转换为框架+数据的结构

## 细胞自动机

数据的表现与分离

程序的业务逻辑与表现无关

提供数据后可以单独修改界面的内容

每一个部分只做自己单独的功能

面向对象语言除了cpp都不支持对象的多继承机制（一个类继承两个类的功能）

### 狐狸与兔子

## 接口

interface

- 接口是纯抽象类
- 所有的成员函数都是抽象函数
- 所有的成员变量都是public static final
- 接口规定了长什么样，但是不管里面有什么

![20210314150242-2021-03-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210314150242-2021-03-14.png)

![20210314150915-2021-03-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210314150915-2021-03-14.png)

## 控制反转

注入反转

内部类的使用可以方便的很，可以访问其他的成员变量和其他的成员函数

## mvc 设计模式

eg：课程表 

![20210314174633-2021-03-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210314174633-2021-03-14.png)

数据是随着输入的变化而变化的，用户的操作不直接修改界面的显示内容，用来调整内部数据，然后数据的变化引起新的界面的变化


## 异常

`try catch (e)`

好像每个语言都是这个语法，都是这个逻辑，但是平时写代码的时候基本不会用到，所以用到的时候再看就好了

![20210314175534-2021-03-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210314175534-2021-03-14.png)

![20210314175725-2021-03-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210314175725-2021-03-14.png)

异常的再次抛出

![20210314181112-2021-03-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210314181112-2021-03-14.png)

异常机制最大的好处就是分开了业务逻辑和错误处理代码

抛出子类异常会被父类异常捕捉到


## 流

文件流：处理字节

流过滤器：二进制方式处理基本数据

文本流：处理unicode

![20210314212944-2021-03-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210314212944-2021-03-14.png)

汉字编码：UTF8 GBK：添加参数，告诉程序应该按照什么编码进行解码


流的应用:
![20210314214953-2021-03-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210314214953-2021-03-14.png)


对象串行化：用于直接将对象写入文件中
![20210314215751-2021-03-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210314215751-2021-03-14.png)


