---
title: kotlin-hello world
date: 2020-12-16
tags:
    - kotlin
---

> kotlin01 ：基础语法 符号 🌴 代表 kotlin 代码片段

<!-- more -->
## 运行 kotlin

官方文档：[在 IDEA 上创建 kotlin 项目](https://www.kotlincn.net/docs/tutorials/jvm-get-started.html)

创建 java 模板，运行 kotlin 文件：[使用 IDEA 编译运行 kotlin](https://juejin.cn/post/6844903503836479496)

创建项目后，右上角的运行绿色小箭头还是灰色的，右键手动运行一遍当前的 kotlin 文件， `run` （Ctrl shift f10），之后右上角的绿色运行按钮就可以使用了

![2020-12-17-12-31-39](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-17-12-31-39.png)

AS 中的 helloworld 截图：

![2020-07-18-20-19-20](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-07-18-20-19-20.png)

## 基本框架

``` kt 
fun main(args: Array<String>) {
    println("hello world")
}
```

## 变量与输出

`var name = "张三"` （类型推断）

`val `

`var name:String = "张三"`（显式类型声明）

Byte Short Int  Long Float Double String

`.MAX_VALUE .MIN_VALUE `

`val aByte:Byte = Byte.MAX_VALUE` 字符串没有 `MAX_VALUE`和 `MIN_VALUE`

`println()` 使用 `+` 进行不同内容块的连接
## 函数

没有像 cpp 中的函数声明，写在后面的函数在 main 函数中也可以进行调用

``` kt
fun printstar (){
    println("*")
}
```

## boolean

```kt
fun main(args: Array<String>) {
    var num1= Math.sqrt(5.0) -Math.sqrt(4.0)
    var num2= Math.sqrt(4.0) -Math.sqrt(3.0)
    println(num1<num2)
}
```

## 命令行交互

去 [官网](https://github.com/JetBrains/kotlin) 下载最新的 kotlin compiler 

path 添加 kotlinc/bin 目录 （前提命令行输入 java 后不是报错）

重启 Windows

执行 kotlinc 即可进行编程

![2020-12-16-12-11-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-16-12-11-24.png)

## 进一步了解函数

``` kt
fun 函数名（参数名：参数类型）：返回值类型 {  
    函数体  
}
```

返回值类型为 Unit 代表无返回值，可以省略不写

示例：
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

定义多行字符串的时候要用首尾各三个引号`"""`进行包含

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

## 条件控制

[菜鸟教程](https://www.runoob.com/kotlin/kotlin-condition-control.html)

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

## 字符串比较

== 用来判断字符串是否相等

``` kt 
fun main(args: Array<String>) {
    var str1 = "aaa"
    var str2 = "aaa"
    println(str1.equals(str2)) //equals 函数存在第二个布尔类型的参数，当第二个参数为 true 的时候，忽略即将要比较的两个字符串的大小写
    println(str1 == str2)
}
```
输出 
ture  
false

::: tip
kotlin 中输出后直接换行，不用手动控制回车符，一个 println 函数就对应一个回车符
:::

## kotlin 空值处理

在 Kotlin 里面，所有的变量默认都是不允许为空的，如果你给它赋值 null，就会报错，像上面那样。

这种有点强硬的要求，其实是很合理的：既然你声明了一个变量，就是要使用它对吧？那你把它赋值为 null 干嘛？要尽量让它有可用的值啊。Java 在这方面很宽松，我们成了习惯，但 Kotlin 更强的限制其实在你熟悉了之后，是会减少很多运行时的问题的。

```kt
fun main(args: Array<String>) {
   heat(null)
}
fun heat(str:String):String {
    return "热$str"
}
```
![2020-12-16-21-47-38](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-16-21-47-38.png)

参数后面加上 ？ 就可以传入 null 

```kt
fun main(args: Array<String>) {
   heat(null)
}
fun heat(str: String?):String {  //加上问号代表参数可以为空
    return "热$str"
}
```
![2020-12-16-21-50-54](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-16-21-50-54.png)

对于这些可以为空值的变量，你可以在类型右边加一个 ? 号，解除它的非空限制：

- 变量需要手动初始化，如果不初始化的话会报错；
- 变量默认非空，所以初始化赋值 null 的话报错，之后再次赋值为 null 也会报错；
- 变量用 ? 设置为可空的时候，使用的时候因为「可能为空」又报错

```kt
class User {
    var name: String? = null
}
```
### 延迟初始化

```kt 
lateinit var view: View
```
这个 `lateinit` 的意思是：告诉编译器我没法第一时间就初始化，但我肯定会在使用它之前完成初始化的。

它的作用就是让 IDE 不要对这个变量检查初始化和报错。换句话说，加了这个 `lateinit` 关键字，这个变量的初始化就全靠你自己了，编译器不帮你检查了。

## 循环控制

`if + for` 等于程序逻辑层的全部 QAQ

### when

相比于 `switch`  更加方便的一个结构

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
### for

for 循环可以对任何提供迭代器（iterator）的对象进行遍历，语法如下：
`for (item in collection) print(item)`

循环体可以是一个代码块：
``` kt
for (item: Int in ints) {
    // ……
}
```

如上所述，for 可以循环遍历任何提供了迭代器的对象。

如果你想要通过索引遍历一个数组或者一个 list，你可以这么做：

``` kt
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

```kt 
fun main(args: Array<String>) {
    val nums = 1..100   //独特的数组写法
    var result = 0
    for (num in nums){  //in 关键字
       result += +num
    }
    println("结果：${result}")
}
```

开区间和闭区间 until step 关键字 数组逆序 reversed 和 count 方法

```kt 
fun main(args: Array<String>) {
    val nums1 = 1 until 100   //[1,100) 中的所有整数
    for (num in nums1) {
        println(num)
    }

    val nums2 = 1..16
    for (a in nums2 step 2) {
        println(a)
    }  //1 3 5 7 9 11 13 15

    val nums3 = nums2.reversed()
    for (a in nums3) {
        println(a)
    }  //倒序输出

    println(nums1.count())
}
```

::: tip tip:关于数组逆序输出的一个函数
正常循环：
`for (i in 1..4) print(i) // 打印结果为: "1234"`

如果你需要按反序遍历整数可以使用标准库中的 downTo() 函数:
`for (i in 4 downTo 1) print(i) // 打印结果为: "4321"`

也支持指定步长：
`for (i in 1..4 step 2) print(i) // 打印结果为: "13"`
`for (i in 4 downTo 1 step 2) print(i) // 打印结果为: "42"`

如果循环中不要最后一个范围区间的值可以使用 until 函数:

```kt 
for (i in 1 until 10) { // i in [1, 10), 不包含 10
     println(i)
}
```
:::

### while 与 do while

while的基本框架
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
}while(布尔表达式);
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

另外还支持标签跳转写法`@`，我觉得类似于goto语句了，不太行

## list 和 map

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