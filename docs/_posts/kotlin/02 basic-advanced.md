---
title: kotlin-零基础进阶
date: 2020-12-17
tags:
    - kotlin
---

> 🌴 kotlin02: 函数和递归相关

<!-- more -->
## 函数和函数表达式

```kt
fun main(args: Array<String>) {
   var result =add(3,5)
    println(result)
}

fun add (a:Int,b:Int){
    return a+b
}
```

当函数只有 return 一行语句时

可以简化为 = 声明函数

``` kt
fun main(args: Array<String>) {
    var result = add(3, 5)
    println(result)
}

fun add(a: Int, b: Int) = a + b
```

还有另外两种其他的函数写法

``` kt
fun main(args: Array<String>) {
    var result = add(3, 5)
    println(result)
    var i = { x: Int, y: Int -> x + y }  //变量作为函数

    var result2 = i(3, 5)   //当作函数使用
    println(result2)     //这种写法叫做函数表达式

    var j: (Int, Int) -> Int = { x, y -> x + y }
    var result3 = j(3, 5)
    println(result3)
}

fun add(a: Int, b: Int) = a + b
```

## 默认参数和具名参数

这两个东西基本高级点的语言中都会存在
函数参数可以有默认值，当省略相应的参数时使用默认值。这可以减少重载数量。


Kotlin默认参数是通过类型后面的 `=` 来定义默认参数的

``` kt
val Pi = 3.1415926  //类似于定义一个宏
fun main(args: Array<String>) {
    var ans = 获取圆的面积（半径 = 3.0f) 
    //在函数参数中给参数赋值 ：具名参数
    //使用 Float 浮点数要在后面加 f
    println(ans)
}

fun 获取圆的面积 (PI: Double = Pi, 半径：Float): Double {
    return PI * 半径 * 半径 
    //double 和 float 不能混用，严格类型声明，否则会报错
} 
```

函数名和变量名能用汉字 wdf？？？ ，牛皮

## 字符串转数字

数字和字符串对象的 toString 和 toInt 方法

## kotlin 人机交互

- 意念控制
- 语义交互（科大讯飞）
- 岩洞跟踪（VR）
- 体感交互（Xbox体感游戏）
- 打字交互（处理输入输出）

初始代码

``` kt
fun main(args: Array<String>) {
    println("请输入第一个数字")
    var num1_str = readLine()
    println("请输入第二个数字")
    var num2_str = readLine()

    var num1 = num1_str.toInt()
    var num2 = num2_str.toInt()
}

```
修改

``` kt 
fun main(args: Array<String>) {
    println("请输入第一个数字")
    var num1_str = readLine()
    println("请输入第二个数字")
    var num2_str = readLine()

    var num1 = num1_str?.toInt()
    var num2 = num2_str?.toInt() //置为？后意思可以读入空值。空值和空值不可以相加

    println("${num1} + ${num2}=${num1 + num2}")
//报错：需要类型int 实际类型为 int? kotlin 中的强制空值设定将他们置为了两种不同的数据类型
}

```

再修改

``` kt
fun main(args: Array<String>) {
    println("请输入第一个数字")
    var num1_str = readLine()
    println("请输入第二个数字")
    var num2_str = readLine()

    var num1 = num1_str!!.toInt()//人工确保输入进来的数据一定不会为空
    var num2 = num2_str!!.toInt()

    println("${num1} + ${num2}=${num1 + num2}")
}
```

```
请输入第一个数字
2
请输入第二个数字
3
2 + 3=5
```

## 异常处理
