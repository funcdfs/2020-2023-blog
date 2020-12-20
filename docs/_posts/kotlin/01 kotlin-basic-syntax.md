---
title: kotlin-basic-syntax
date: 2020-12-16
tags:
    - kotlin
---

> 🌴 kotlin01 ：基础语法 条件控制 循环控制

<!-- more -->

## hello kotlin

~~需求驱动，我迟早写安卓，所以就不想干其他的事情的时候就学呗~~

官方文档创建 kotlin 项目：[在 IDEA 上创建 kotlin 项目](https://www.kotlincn.net/docs/tutorials/jvm-get-started.html)

创建 java 项目，运行 kotlin 文件：[使用 IDEA 编译运行 kotlin](https://juejin.cn/post/6844903503836479496)

创建项目后，右上角的运行绿色小箭头还是灰色的，右键手动运行一遍当前的 kotlin 文件，或者执行右键的`run`当前文件  或者快捷键（Ctrl shift f10），之后本项目中的右上角的绿色运行按钮就可以使用了

IDEA 中的运行截图：

![2020-12-17-12-31-39](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-17-12-31-39.png)

AS 中的 helloworld 截图：

![2020-07-18-20-19-20](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-07-18-20-19-20.png)

## 命令行交互

去 [官网](https://github.com/JetBrains/kotlin) 下载最新的 kotlin compiler 

系统环境变量的 path 值中添加 kotlinc/bin 目录的路径 （前提命令行输入 java 后不是报错）

重启 Windows

执行 kotlinc 即可进行编程

![2020-12-16-12-11-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-16-12-11-24.png)

可以简单进行加减法判断之类的操作，不怎么用

## 基本框架

IDEA 中输入 maina 点回车就会自动补全一下内容

``` kt 
fun main(args: Array<String>) {
    //println("hello world")
}
```

熟记即可

## 注释

Kotlin 支持单行和多行注释，实例如下：

``` kt
// 这是一个单行注释

/* 这是一个多行的
   块注释。 */
```

Kotlin 中的块注释允许嵌套

## 定义常量与变量

可变变量定义：var 关键字

`var <标识符> : <类型> = <初始化值>`

不可变变量定义：val 关键字，只能赋值一次的变量

`val <标识符> : <类型> = <初始化值>`

编译器支持自动类型判断，即声明时可以不指定类型，由编译器判断。

var name = "张三" //（kotlin 存在自动类型推断）
val a: Int = 1
val b = 1       // 系统自动推断变量类型为 Int
val c: Int      // 如果不在声明时初始化则必须提供变量类型
c = 1           // 明确赋值

var x = 5        // 系统自动推断变量类型为 Int
x += 1           // 变量可修改

`var name:String = "张三"`（显式类型声明）

kotlin 中的变量类型： `Byte Short Int Long Float Double String`

每一种变量类型都有一些常用方法：例如 `.MAX_VALUE .MIN_VALUE `

`val aByte:Byte = Byte.MAX_VALUE` 字符串没有 `MAX_VALUE`和 `MIN_VALUE`

`println()` 函数中使用 `+` 进行不同内容块的连接

## boolean

```kt
fun main(args: Array<String>) {
    var num1= Math.sqrt(5.0) -Math.sqrt(4.0)
    var num2= Math.sqrt(4.0) -Math.sqrt(3.0)
    println(num1<num2)
}
```

## 函数

不用像 cpp 中的函数声明语法规则，写在后面的函数在 main 函数中也可以进行调用，自定义函数和 main 函数不分先后顺序

kotlin 函数框架：

``` kt
fun 函数名（参数名：参数类型）：返回值类型 {  
    函数体  
}
```

定义函数：

``` kt
fun printstar (){ //返回值不写就是 kotlin.Unit
    println("*")  //返回值类型为 Unit 代表无返回值，可以省略不写
}
```

使用函数：

``` kt
fun plus(a:Int,b:Int):Int{
    return a+b
}
```

``` kt
fun main(args: Array<String>){
    println("hello world")
    println(sayhello("fengwei"))
}

fun sayhello(name:String):String{
    return "hello"+name
}
```

## 字符串模板

`$varName` 表示变量值
`${varName.fun()} `表示变量的方法返回值

::: tip
定义多行字符串的时候要用首尾各三个引号`"""`进行包含
::: 

当需要相同的部分字符串时：

``` kt 
fun main(args: Array<String>){
    var output:String = dairy("taiyuan")
    println(output)
}
fun dairy(place_name:String):String{
    var tem=""" 今天在这个地方：${place_name}，这个地方的拼音字母个数是${place_name.length}个"""
    return tem
}
```

如果一句话是纯英文滴得时候，就可以省略大括号，但是汉字和变量相间的时候，就要用美元符号加大括号
不只是可以在 println 函数中使用，可以在 korlin 文件中任意地方使用，用来定义变量等等等

## `is` 类型检测及自动类型转换

[官方文档查看更多](https://www.kotlincn.net/docs/reference/typecasts.html)

is 运算符检测一个表达式是否某类型的一个实例。 如果一个不可变的局部变量或属性已经判断出为某类型，那么检测后的分支中可以直接当作该类型使用，无需显式转换：

``` kt
fun getStringLength(obj: Any): Int? {
    if (obj is String) {
        // `obj` 在该条件分支内自动转换成 `String`
        return obj.length
    }
    // 在离开类型检测分支后，`obj` 仍然是 `Any` 类型
    return null
}
```

或者

``` kt
fun getStringLength(obj: Any): Int? {
    if (obj !is String) return null
    // `obj` 在这一分支自动转换为 `String`
    return obj.length
}
```

或者

``` kt
fun getStringLength(obj: Any): Int? {
    // `obj` 在 `&&` 右边自动转换成 `String` 类型
    if (obj is String && obj.length > 0) {
      return obj.length
    }

    return null
}
```

## while 循环

``` kt
val items = listOf("apple", "banana", "kiwifruit")
var index = 0
while (index < items.size) {
    println("item at $index is ${items[index]}")
    index++
}
```

## `in` 使用区间（range）

使用 in 运算符来检测某个数字是否在指定区间内：

``` kt
val x = 10
val y = 9
if (x in 1..y+1) {
    println("fits in range")
}
```

检测某个数字是否在指定区间外：
``` kt
val list = listOf("a", "b", "c")

if (-1 !in 0..list.lastIndex) {
    println("-1 is out of range")
}
if (list.size !in list.indices) {
    println("list size is out of valid list indices range, too")
}
```

区间迭代：
``` kt
for (x in 1..5) {
    print(x)  //12345
}
```

或数列迭代：

``` kt
for (x in 1..10 step 2) {
    print(x)
}
println()
for (x in 9 downTo 0 step 3) {
    print(x)
}
```
## 集合

对集合进行迭代：
``` kt
fun main() {
    val items = listOf("apple", "banana", "kiwifruit")
    for (item in items) {
        println(item)
    }
}
```

使用 in 运算符来判断集合内是否包含某实例：

``` kt
fun main() {
    val items = setOf("apple", "banana", "kiwifruit")
    when {
        "orange" in items -> println("juicy")
        "apple" in items -> println("apple is fine too")
    }
}
```

### list 和 map

list：

```kt 
fun main(args: Array<String>) {
    var lists= listOf("第一个","第二个","第三个","第四个")
    for (list in lists){
        println(list)
    }
    for ( (i,e) in lists.withIndex()){
        println("$i $e")
    }
}
```

```
第一个
第二个
第三个
第四个
0 第一个
1 第二个
2 第三个
3 第四个
```

map： 

```kt 
import java.util.TreeMap

fun main(args: Array<String>) {
    var map = TreeMap<String,String>()
    map["好"] = "good"
    map["学习"] = "study"
    map["天"] = "day"
    map["向上"] = "up"
    println(map["好"])
}
```

[参见集合](https://www.kotlincn.net/docs/reference/collections-overview.html)

## 条件控制

### if else

当大括号中的语句只存在一行的时候，大括号可以省略 ，也可以把 if else 全部写在一行（无 TAB 缩进）

``` kt 
fun main(args: Array<String>){
    println(check_face(20))
}

fun check_face(score:Int):String{
    var ans:String = ""
    if (score>80){
        ans="他是一个帅哥"
    }else{
       ans="并不帅"
    }
    return ans
}
```

### when

相比于 `switch`  更加方便的一个结构，在 when 中，else 同 switch 的 default。如果其他分支都不满足条件将会求值 else 分支。

```kt
fun main(args: Array<String>) {
   println(check_grade(5))
}
fun check_grade(score: Int):String {
    var ans=""
    when (score){
        10-> ans="满分"
        9-> ans="差一点点"
        8-> ans="超过了大多数"
        7-> ans="继续加油"
        else -> ans ="不太行"
    }
    return ans
}
```

我们也可以检测一个值在（in）或者不在（!in）一个区间或者集合中：

``` kt 
when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    else -> print("none of the above")
}
```

``` kt
fun describe(obj: Any): String =
    when (obj) {
        1          -> "One"
        "Hello"    -> "Greeting"
        is Long    -> "Long"
        !is String -> "Not a string"
        else       -> "Unknown"
    }
```

另一种可能性是检测一个值是（is）或者不是（!is）一个特定类型的值。注意： 由于智能转换，你可以访问该类型的方法和属性而无需 任何额外的检测。

``` kt 
fun hasPrefix(x: Any) = when(x) {
    is String -> x.startsWith("prefix")
    else -> false
}
```

::: tip `startsWith()`
其中：

作用： 判断其字符串是否由某一个字符或字符串起始。
参数说明：

char : 起始字符
prefix : 起始字符串
ignoreCase : 是否调用 Java 中的此函数。默认为 false
startIndex : 开始位置

``` kt 
val str = "kotlin"
str.startsWith('k')         // 是否有字符`k`起始
str.startsWith("Kot")       // 是否由字符串`kot`起始
str.startsWith("lin",3)     // 当起始位置为 3 时，是否由字符串`lin`起始
```

输出：

```
true
```
::: 

when 也可以用来取代 `if-else if`链。 如果不提供参数，所有的分支条件都是简单的布尔表达式，而当一个分支的条件为真时则执行该分支：

``` kt 
when {
    x.isOdd() -> print("x is odd")
    x.isEven() -> print("x is even")
    else -> print("x is funny")
}

when (x) {
    in 0..10 -> println("x 在该区间范围内")
    else -> println("x 不在该区间范围内")
}
```

when 中使用 in 运算符来判断集合内是否包含某实例：

```kt 
fun main(args: Array<String>) {
    val items = setOf("apple", "banana", "kiwi")
    when {
        "orange" in items -> println("juicy")
        "apple" in items -> println("apple is fine too")
    }
}
```

输出结果：

`apple is fine too`

## 循环控制

`if + for` 等于程序逻辑层的全部 QAQ

### for

for 可以循环遍历任何提供了迭代器的对象。

语法如下：
`for (item in collection) print(item)`

``` kt
val items = listOf("apple", "banana", "kiwifruit")
for (item in items) {
    println(item)
}
```

或者也用下标，然后用常见的方括号格式使用 list 中的变量

``` kt
val items = listOf("apple", "banana", "kiwifruit")
for (index in items.indices) { //index 的复数 indices
    println("item at $index is ${items[index]}")
}

for (i in array.indices) {
    print(array[i])
}
```


注意这种"在区间上遍历"会编译成优化的实现而不会创建额外对象。

或者你可以用库函数 `withIndex`：（这种方式些许丑陋）

```kt
for ((index, value) in array.withIndex()) {
    println("the element at $index is $value")
}
```




参见 [for 循环](https://www.kotlincn.net/docs/reference/control-flow.html#for-%E5%BE%AA%E7%8E%AF)


### 其他循环相关

开区间和闭区间 until step 关键字 数组逆序 reversed 和 count 方法

```kt 
fun main(args: Array<String>) {
    val nums1 = 1 until 100   //[1,100) 中的所有整数
    for (num in nums1) {
        println(num)
    }

    val nums2 = 1..16
    for (a in nums2 step 2) {   // step 
        println(a)
    }  //1 3 5 7 9 11 13 15

    val nums3 = nums2.reversed()  //reversed 
    for (a in nums3) {
        println(a)
    }  //倒序输出

    println(nums1.count()) //count
}
```

::: tip tip: 关于数组逆序输出的一个函数
正常循环：
`for (i in 1..4) print(i) // 打印结果为："1234"`

如果你需要按反序遍历整数可以使用标准库中的 downTo() 函数：
`for (i in 4 downTo 1) print(i) // 打印结果为："4321"`

也支持指定步长：
`for (i in 1..4 step 2) print(i) // 打印结果为："13"`
`for (i in 4 downTo 1 step 2) print(i) // 打印结果为："42"`

如果循环中不要最后一个范围区间的值可以使用 until 函数：
```kt 
for (i in 1 until 10) { // i in [1, 10), 不包含 10
     println(i)
}
```
:::

### while 与 do while

while 的基本框架

``` kt
while( 布尔表达式 ) {
  //循环内容
}
```
do…while 循环 对于 while 语句而言，如果不满足条件，则不能进入循环。但有时候我们需要即使不满足条件，也至少执行一次。

do…while 循环和 while 循环相似，不同的是，do…while 循环至少会执行一次。

do…while 循环的基本框架

``` kt 
do {
       //代码语句
}while（布尔表达式）;
```

实例：

``` kt 
fun main(args: Array<String>) {
    println("----while 使用-----")
    var x = 5
    while (x > 0) {
        println( x--)
    }
    println("----do...while 使用-----")
    var y = 5
    do {
        println(y--)
    } while(y>0)
}
```

### break 和 continue

在循环中 Kotlin 支持传统的 break 和 continue 操作符。

``` kt 
fun main(args: Array<String>) {
    for (i in 1..10) {
        if (i==3) continue  // i 为 3 时跳过当前循环，继续下一次循环
        println(i)
        if (i>5) break   // i 为 6 时 跳出循环
    }
}
```

另外还支持标签跳转写法`@`，我觉得类似于 goto 语句了，不太行


### for + listOf 实例

实例
对集合进行迭代：

``` kt
fun main(args: Array<String>) {
    val items = listOf("apple", "banana", "kiwi")
    for (item in items) {
        println(item)
    }

    for (index in items.indices) {
        println("item at $index is ${items[index]}")
    }
}
```

输出结果：

```
apple
banana
kiwi
item at 0 is apple
item at 1 is banana
item at 2 is kiwi
```