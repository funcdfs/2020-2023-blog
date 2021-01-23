---
title: kotlin-函数式编程
draft: true
date: 2020-12-20
tags:
    - kotlin
---

> 🌴 kotlin04: kt-FP：[函数式编程](https://www.ruanyifeng.com/blog/2012/04/functional_programming.html)

<!-- more -->

还是第一次接触这个名词

- 如果面向对象式编程是用名词抽象世界，从而达到对于事物的封装和重用。
  那函数式编程对应的就是用动词抽象世界，从而达到对于行为的封装和重用。

函数式编程中，函数可以作为函数的参数，也可以作为函数的返回值，无变量

[AndroidDevelopers: 函数基本概念](https://developer.android.com/kotlin/learn?hl=zh-cn#functions)

``` kt
var pp = fun(name: String): Unit {
    println(name)
}

fun main(args: Array<String>) {
    var names = listOf<String>("fengwei01", "fengwei02", "fengwei03")
    names.forEach(pp)  //forEach 就是一个高阶函数
}
```



``` kt
fun main(args: Array<String>) {
    var names = listOf<String>("fengwei01", "fengwei02", "fengwei03")
    names.forEach {
        println(it) //高阶函数中默认存在了一个 it 变量，就不用再创建一个变量进行遍历了~
    }
}
```    
