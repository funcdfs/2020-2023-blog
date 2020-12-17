---
title: kotlin-零基础进阶
date: 2020-12-17
tags:
    - kotlin
---

> 🌴 kotlin02: 函数 递归 异常 尾递归

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

Kotlin 默认参数是通过类型后面的 `=` 来定义默认参数的

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
- 体感交互（Xbox 体感游戏）
- 打字交互（处理输入输出）

readLine 函数和空值处理相关

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
//报错：需要类型 int 实际类型为 int? kotlin 中的强制空值设定将他们置为了两种不同的数据类型
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

`try{} catch{}` 关键字，将要检测的代码放在 try 的作用域下

``` kt 
try{

}catch (e:Exception){
    println("输入数据有问题")
}
```

注意：try 中的语句相对于函数整体独立，如果 try 中进行变量的定义，那么之后使用这个变量就会出现变量未定义的错误

## 递归

从前有座山。

例如递归求解阶乘的一个函数，在 C++中 这么写：
> 没有必要用递归的一个逻辑，不过卡一下还是得想一想

``` cpp 
#include <iostream>
using namespace std;
int ans = 1;
int fact(int a) {
  if (a == 1) {
    return ans;
  }
  ans *= a;
  return fact(a - 1);
}

int main() {
  int a = 5;
  cout << fact(a);
  return 0;
}
```

同样的逻辑过程，在 kotlin 中这么写

```kt 
fun main(args: Array<String>) {
    val num = 5
    println(fact(num))
}

fun fact(a: Int): Int {
    if (a == 1) {
        return 1
    } else {
        return a * fact(a - 1)
    }
}
```
### BigInteger

Java.math 里面的一个 class 

``` kt 
import java.math.BigInteger

fun main(args: Array<String>) {
    val num =BigInteger("70")
    println(fact(num))
}

fun fact(a: BigInteger): BigInteger {
    if (a == BigInteger.ONE) {
        return BigInteger.ONE
    } else {
        return a * fact(a - BigInteger.ONE)
    }
}
```
### 尾递归的优化

频繁累计递归函数的操作就会导致程序 **栈溢出** 

java 语言中出现栈溢出后无法弥补

kotlin 可以在函数名字前使用 `tailrec` 关键字来进行尾递归优化

```kt 
fun main(args: Array<String>) {
    println(oll_add(10000))
}

fun oll_add(num:Int):Int {
    println("计算机第${num}次运算")
    if (num==1){
        return 1
    }else{
        return num+oll_add(num-1)
    }
}
```

![2020-12-17-21-42-35](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-17-21-42-35.png)

::: tip
所以发现，光使用 `tailrec` 关键字还不行
:::

```kt 
fun main(args: Array<String>) {
    var result = 0
    println(oll_add(10000, result))
}

tailrec fun oll_add(num: Int, result: Int): Int {
    println("计算机第${num}次运算，result =${result}")
    if (num == 0) {
        return 1
    } else {
        return oll_add(num - 1, result + num)
    }
}
```

尾递归优化要求函数返回值还是调用函数本身

![2020-12-17-21-47-56](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-17-21-47-56.png)

当 `num=10000` 时：

```
计算机第 15 次运算，result =50004880
计算机第 14 次运算，result =50004895
计算机第 13 次运算，result =50004909
计算机第 12 次运算，result =50004922
计算机第 11 次运算，result =50004934
计算机第 10 次运算，result =50004945
计算机第 9 次运算，result =50004955
计算机第 8 次运算，result =50004964
计算机第 7 次运算，result =50004972
计算机第 6 次运算，result =50004979
计算机第 5 次运算，result =50004985
计算机第 4 次运算，result =50004990
计算机第 3 次运算，result =50004994
计算机第 2 次运算，result =50004997
计算机第 1 次运算，result =50004999
计算机第 0 次运算，result =50005000
```