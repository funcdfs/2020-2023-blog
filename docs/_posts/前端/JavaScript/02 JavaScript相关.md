---
title: JavaScript 相关应用
draft: true
date: 2021-01-22
tags:
  - JavaScript
---

> JavaScript 相关

<!-- more -->
## this

使用对象中的函数时要注意 this 关键字
## apply 和装饰器

## 高阶函数

一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。
### map/reduce

``` js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var results = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
console.log(results);
```

### filter

filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素。

``` js
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]
```
### sort
### Array中的其他高阶函数

### lambda 箭头。。。

TODO　简单使用而已 lambda javascript

## 标准对象

### Date

用来获取时间和日期

### 正则表达式 Regexp

用来匹配字符串，字符串相关操作

### json 相互转换 

一个JavaScript的子集.

把任何JavaScript对象变成JSON，就是把这个对象序列化成一个JSON格式的字符串，这样才能够通过网络传递给其他计算机。

如果我们收到一个JSON格式的字符串，只需要把它反序列化成一个JavaScript对象，就可以在JavaScript中直接使用这个对象了。

- number：和JavaScript的number完全一致；
- boolean：就是JavaScript的true或false；
- string：就是JavaScript的string；
- null：就是JavaScript的null；
- array：就是JavaScript的Array表示方式——[]；
- object：就是JavaScript的{ ... }表示方式。



`JSON.stringify`

`JSON.parse()`把它变成一个JavaScript对象：
## 面向对象

用到再看

JavaScript的原型链和Java的Class区别就在，它没有“Class”的概念，所有对象都是实例，所谓继承关系不过是把一个对象的原型指向另一个对象而已。

## 浏览器相关

### DOM

删除，更新，插入

### AJAX
### promise
### canvans

用来做特效的，2d3d的相关绘制

用JavaScript实现动画，原理非常简单：我们只需要以固定的时间间隔（例如，0.1秒），每次把DOM元素的CSS样式修改一点（例如，高宽各增加10%），看起来就像动画了。


## jquery

你可能听说过jQuery，它名字起得很土，但却是JavaScript世界中使用最广泛的一个库。

jQuery能帮我们干这些事情：

- 消除浏览器差异：你不需要自己写冗长的代码来针对不同的浏览器来绑定事件，编写AJAX等代码；
- 简洁的操作DOM的方法：写$('#test')肯定比document.getElementById('test')来得简洁；
- 轻松实现动画、修改CSS等各种操作。

jQuery的理念“Write Less, Do More“，让你写更少的代码，完成更多的工作！

jQuery 对动画的写法进行了扩充，添加了基础的动画

## Node.js 

在Node上运行的JavaScript相比其他后端开发语言有何优势？

最大的优势是借助JavaScript天生的事件驱动机制加V8高性能引擎，使编写高性能Web服务轻而易举。