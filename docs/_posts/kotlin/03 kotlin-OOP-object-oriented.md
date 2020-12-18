---
title: kotlin-面向对象
date: 2020-12-19
tags:
    - kotlin
---

> 🌴 kotlin03: kt 的面向对象

<!-- more -->

哇咔咔，相比于 cpp 的面向对象感觉扩展了好多好多心的功能（~~也可能是我没有进一步学习 C++~~）

```kt
class Rect(var height:Int,var width:Int)

fun main(args: Array<String>) {
    var rect01=Rect(20,10)
    println("${rect01.height},${rect01.width}")
}
```

相比于 C++ ，kotlin 的构造函数写在了 class 声明的那一行
初始化对象的时候就将这些属性进行初始化

像 C++一样，kotlin 中也有方法，静态属性和动态行为，动态行为就是 class 中的函数

## 面向对象实例：洗衣机

总的来说和 CPP 还是一样的操作模式

::: tip 
突然发现频繁的切换输入法中英文还是挺烦的，以后在代码中尽量使用英文叙述部分语句
::: 

```kt 
class WashMachine(var module: String, var size: Int) {
    var is_door_open = true  //对象具有的变量
    var current_mode = 0
    fun open_door() {        //对象具有的方法
        println("打开了${module}洗衣机")
        is_door_open = true
    }

    fun close_door() {
        println("关闭了${module}洗衣机")
        is_door_open = false
    }

    fun select_mode(mode: Int) {
        current_mode = mode
        when (mode) {
            0 -> println("初始模式")
            1 -> println("轻洗")
            2 -> println("正常洗")
            3 -> println("狂洗")
            else -> println("坏掉了")
        }
    }

    fun start() {
        if (is_door_open) {
            println("开始洗${size}件衣服")
        } else {
            when (current_mode) {
                0 -> println("选择错误")
                1 -> println("start qing rou slow")
                2 -> println("start kuang rou fast")
                else -> println("worn")
            }
            println("放水")

        }
    }
}

fun main(args: Array<String>) {
    var WashMachine01 = WashMachine("小天鹅", 5)
    WashMachine01.open_door()
    println("put in cloth")
    WashMachine01.close_door()
    WashMachine01.select_mode(1)
    WashMachine01.start()
}
```

## 封装

在类中的方法前利用 private 关键字进行声明，不想被外部调用的函数就实现了~

::: tip
[kotlin 编码规范](https://www.kotlincn.net/docs/reference/coding-conventions.html)，常用驼峰命名
::: 

``` kt 
private fun set_notor_speed(Speed:Int){
    println("this machine's speed is $Speed")
    //当纯英文的时候 dollar 符后面就不用加花括号的~
}
```

## 继承

主要就是多了一个 open 关键字，只有被声明为 open 的类才可以进行继承的操作
只有 open 类中的 open 声明函数才能进行函数的重写操作 (Override)

``` kt
open class Father() {
    var chactor: String = "his chactor is Introvert"
    open fun action() {
        println("he like to speak in a loud voice")
    }
}

class son : Father() {
    override fun action() {
        println("son is lovable")
    }
}

fun main(args: Array<String>) {

}
```

## 抽象类实例

同 cpp 中的 [virtual 关键字的作用](https://konng.now.sh/posts/2020/11/20/_11-c-virtual.html)

``` kt
fun main(args: Array<String>) {
    var person01 = Men("feng wei")
    person01.eat()
    var person02 = Women("beauty")
    person02.eat()
}

abstract class Human(var name: String) {
    abstract fun eat()
    //后面不用加花括号，有 body 的函数不能作为抽象类中的函数
}

class Men(name: String) : Human(name) {
    //父类有参数的时候继承头这样写，不用再写父类的参数类型
    override fun eat() {
        println("because Men eat very fast,$name eat very fast")
    }
}

class Women(name: String) : Human(name) {
    override fun eat() {
        println("because Women eat very slow,$name eat very slow")
    }
}
```

## 接口使用实例

- 接口是事物的能力
- 抽象类是事物的本质

抽象类子类重写的时候要加小括号，一个类添加接口的时候不用添加小括号，同时使用时用逗号进行分隔

``` kt
interface IMan {
    fun xiaoDiDi()
}

class Man : IMan {
    override fun xiaoDiDi() {
        println("18cm")
    }
}

fun main(args: Array<String>) {
    var man01 = Man()
    man01.xiaoDiDi()
}
```

## 委托和代理

by 关键字

示例：大头儿子，小头爸爸，围裙妈妈，洗碗的故事（10，1，by）

```kr 
interface IWash {
    fun washTheDishes()
}

class BigHeadSon() : IWash {
    override fun washTheDishes() {
        println("Big head wash the dishes and then earn 1 dollars")
    }
}
//注意这种 by 的独特写法，配合接口使用
class SmallHeadFather() : IWash by BigHeadSon() {
    override fun washTheDishes() {
        BigHeadSon().washTheDishes()
        println("Small head father wash the dishes and then earn 10 dollars")
    }
}

fun main(args: Array<String>) {
    var shf = SmallHeadFather()
    var bhs = BigHeadSon()
    bhs.washTheDishes()
    shf.washTheDishes()
}
```

## 单例模式

使用 by 关键字额时候就会创建一个对象，若在使用 by 的类中在进行调用源头对象的一个方法
将 class 改为 object 就可以实现在 JVM 内存中有且只有一个对应类，使用 by 时去除小括号

``` kt 
interface IWash {
    fun washTheDishes()
}

object BigHeadSon : IWash {
    override fun washTheDishes() {
        println("Big head wash the dishes and then earn 1 dollars")
    }
}

class SmallHeadFather() : IWash by BigHeadSon {
    override fun washTheDishes() {
        BigHeadSon.washTheDishes()
        println("Small head father wash the dishes and then earn 10 dollars")
    }
}

fun main(args: Array<String>) {
    var shf = SmallHeadFather()
    BigHeadSon.washTheDishes()
    shf.washTheDishes()
}
```

## 枚举

基本不用，但是 kotlin 中的枚举好像做了很多扩充，因为可以点出来一堆东西

``` kt 
enum class Week {
    星期一，星期二，星期三
}

fun main(args: Array<String>) {
    println(Week. 星期一）
    println(Week. 星期一。ordinal)
}

```

## Sealed class 

子类类型有限的 class 不允许之后的多个重写

``` kt
sealed class Son {
    class 小小驴() : Son()
    class 小骡子() : Son()

    fun SayHello() {
        println("hello everyone")
    }
}

fun main(args: Array<String>) {
    var s01: Son = Son.小小驴()
    var s02 = Son.小骡子()
    var list = listOf<Son>(s01, s02)
    for (a in list) {
        if (a is Son.小骡子) {
            println(a.SayHello())
        }
    }
}
```

