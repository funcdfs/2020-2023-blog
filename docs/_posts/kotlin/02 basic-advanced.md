---
title: kotlin-进阶
date: 2020-12-19
tags:
    - kotlin
---

> 🌴 kotlin02: 空安全 递归 异常 尾递归

<!-- more -->
## 空安全

Kotlin 的类型系统旨在消除来自代码空引用的危险，也称为 [十亿美元的错误](https://en.wikipedia.org/wiki/Tony_Hoare#Apologies_and_retractions)


### kotlin NULL 处理机制 ：`？`

在 Kotlin 里面，所有的变量默认都是不允许为空的，如果你给它赋值 null，就会报错

这种有点强硬的要求，其实是很合理的：既然你声明了一个变量，就是要使用它对吧？那你把它赋值为 null 干嘛？要尽量让它有可用的值啊。Java 在这方面很宽松，我们成了习惯，但 Kotlin 更强的限制其实在你熟悉了之后，是会减少很多运行时的问题的。

例如这段代码：

```kt
fun main(args: Array<String>) {
   heat(null)
}
fun heat(str:String):String {
    return "热$str"
}
```

编译器报错：空值不可以赋给不是空类型的一个变量：

![2020-12-16-21-47-38](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-16-21-47-38.png)

函数设计的时候参数后面加上 ？ 就可以传入 null 值

```kt
fun main(args: Array<String>) {
   heat(null)
}
fun heat(str: String?):String {  //加上问号代表参数可以为空
    return "热$str"
}
```

编译器不报错：

![2020-12-16-21-50-54](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-16-21-50-54.png)

对于这些可以为空值的变量，可以在类型右边加一个 ? 号，解除它的非空限制：

- 变量仍然需要手动初始化，如果不初始化的话会报错；
- 不额外添加问号的时候给变量初始化赋值 null 的话报错，之后再次赋值为 null 也会报错；变量用 ? 设置为可空的时候，可以赋值为 null

``` kt
fun main(args: Array<String>) {
    var a: String? = null
    test(a)
    a = "haha"
    test(a) /*null haha*/
}

fun test(input: String?) {  //返回值同理，加 String ?
    println(input)
}
```

访问可能为空的变量类型的方法时就会报错


``` kt
var a: String = "abc" // 默认情况下，常规初始化意味着非空
a = null // 编译错误
var b: String? = "abc" // 可以设置为空
b = null // ok
print(b)
val l = a.length //✔
val l = b.length // 错误：变量“b”可能为空
```

### 在条件中检测 null `if`

但是仍然想访问对象的方法怎么办？：

首先，你可以显式检测 b 是否为 null，并分别处理两种可能：

``` kt
val l = if (b != null) b.length else -1
```

编译器会跟踪所执行检测的信息，并允许你在 if 内部调用 length。 同时，也支持更复杂（更智能）的条件：


``` kt
fun main() {
    val b: String? = "Kotlin"
    if (b != null && b.length > 0) {
        print("String of length ${b.length}")
    } else {
        print("Empty string")
    }
}
```

请注意，这只适用于 b 是不可变的情况（即在检测和使用之间没有修改过的局部变量 ，或者不可覆盖并且有幕后字段的 val 成员），因为否则可能会发生在检测之后 b 又变为 null 的情况。

### 安全的调用 `?. let`

你的第二个选择是安全调用操作符，写作 `?.`：


``` kt
fun main() {
    val a = "Kotlin"
    val b: String? = null
    println(b?.length)
    println(a?.length) // 无需安全调用
}
```
如果 b 非空，就返回 b.length，否则返回 null，这个表达式的类型是 `Int?`。

安全调用在链式调用中很有用。例如，如果一个员工 Bob 可能会（或者不会）分配给一个部门， 并且可能有另外一个员工是该部门的负责人，那么获取 Bob 所在部门负责人（如果有的话）的名字，我们写作：


``` kt
bob?.department?.head?.name
```
如果任意一个属性（环节）为空，这个链式调用就会返回 null。

如果要只对非空值执行某个操作，安全调用操作符可以与 [let](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/let.html) 一起使用：


``` kt
fun main() {
    val listWithNulls: List<String?> = listOf("Kotlin", null)
    for (item in listWithNulls) {
        item?.let { println(it) } // 输出 Kotlin 并忽略 null
    }
}
```

安全调用也可以出现在赋值的左侧。这样，如果调用链中的任何一个接收者为空都会跳过赋值，而右侧的表达式根本不会求值：


``` kt
// 如果 `person` 或者 `person.department` 其中之一为空，都不会调用该函数：
person?.department?.head = managersPool.getManager()
```

### Elvis 操作符

当我们有一个可空的引用 b 时，我们可以说“如果 b 非空，我使用它；否则使用某个非空的值”：


``` kt
val l: Int = if (b != null) b.length else -1
```

除了完整的 if-表达式，这还可以通过 Elvis 操作符表达，写作 ?:：


``` kt
val l = b?.length ?: -1
```
如果 `?:` 左侧表达式非空，elvis 操作符就返回其左侧表达式，否则返回右侧表达式。 
请注意，当且仅当左侧为空时，才会对右侧表达式求值。

请注意，因为 throw 和 return 在 Kotlin 中都是表达式，所以它们也可以用在 elvis 操作符右侧。这可能会非常方便，例如，检测函数参数：


``` kt
fun foo(node: Node): String? {
    val parent = node.getParent() ?: return null
    val name = node.getName() ?: throw IllegalArgumentException("name expected")
    // ……
}
```
### !! 操作符

第三种选择是为 NPE 爱好者准备的：非空断言运算符（!!）将任何值转换为非空类型，若该值为空则抛出异常。我们可以写 b!! ，这会返回一个非空的 b 值 （例如：在我们例子中的 String）或者如果 b 为空，就会抛出一个 NPE 异常：


``` kt
val l = b!!.length
```
因此，如果你想要一个 NPE，你可以得到它，但是你必须显式要求它，否则它不会不期而至。

### 安全的类型转换

如果对象不是目标类型，那么常规类型转换可能会导致 ClassCastException(类转换异常)。 另一个选择是使用安全的类型转换，如果尝试转换不成功则返回 null：

``` kt
val aInt: Int? = a as? Int
```

### 可空类型的集合

如果你有一个可空类型元素的集合，并且想要过滤非空元素，你可以使用 filterNotNull 来实现：

``` kt
val nullableList: List<Int?> = listOf(1, 2, null, 4)
val intList: List<Int> = nullableList.filterNotNull()
```

List对象的方法 ： filterNotNull


## 函数

不用像 cpp 中的函数声明语法规则，写在后面的函数在 main 函数中也可以进行调用，自定义函数和 main 函数不分先后顺序

kotlin 函数框架：

``` kt
fun 函数名（参数名：参数类型）：返回值类型 {  
    函数体  
}
```

### 定义函数：

``` kt
fun printstar (){ //返回值不写就是 kotlin.Unit
    println("*")  //返回值类型为 Unit 代表无返回值，可以省略不写
}
```

### 使用函数：

调用函数使用传统的方法：

``` kt
fun main(args: Array<String>){
    println("hello world")
    println(sayhello("fengwei"))
}

fun sayhello(name:String):String{
    return "hello"+name
}
```

调用成员函数使用点表示法：

``` kt
Stream().read() // 创建类 Stream 实例并调用 read()
```

### 参数

函数参数使用 Pascal 表示法定义，即 name: type。参数用逗号隔开。 每个参数必须有显式类型：

``` kt
fun powerOf(number: Int, exponent: Int): Int { /*……*/ }

fun powerOf(
    number: Int,
    exponent: Int, // trailing comma
) { /*...*/ }
```

### 默认参数和具名参数

函数参数可以有默认值，当省略相应的参数时使用默认值。与其他语言相比，这可以减少重载数量：

Kotlin 默认参数是通过类型后面的 `=` 来定义默认参数的


``` kt
fun read(
    b: Array<Byte>, 
    off: Int = 0, 
    len: Int = b.size,
) { /*……*/ }
```

重写函数的时候总是使用与基类型方法相同的默认参数值。 当覆盖一个带有默认参数值的方法时，必须从签名中省略默认参数值：

``` kt
open class A {
    open fun foo(i: Int = 10) { /*……*/ }
}

class B : A() {
    override fun foo(i: Int) { /*……*/ }  // 不能有默认值
}
```

如果一个默认参数在一个无默认值的参数之前，那么该默认值只能通过使用具名参数调用该函数来使用：


``` kt
fun foo(
    bar: Int = 0, 
    baz: Int,
) { /*……*/ }

foo(baz = 1) // 使用默认值 bar = 0
```

如果在默认参数之后的最后一个参数是 lambda 表达式，那么它既可以作为具名参数在括号内传入，也可以在括号外传入：

``` kt
fun foo(
    bar: Int = 0,
    baz: Int = 1,
    qux: () -> Unit,
) { /*……*/ }

foo(1) { println("hello") }     // 使用默认值 baz = 1
foo(qux = { println("hello") }) // 使用两个默认值 bar = 0 与 baz = 1
foo { println("hello") }        // 使用两个默认值 bar = 0 与 baz = 1
```


``` kt
val Pi = 3.1415926  //类似于定义一个宏
fun main(args: Array<String>) {
    var ans = 获取圆的面积（半径 = 3.0f) 
    //在函数参数中给参数赋值 ：具名参数，已经存在的那些值就不用再写了
    //使用 Float 浮点数要在后面加 f
    println(ans)
}

fun 获取圆的面积 (PI: Double = Pi, 半径：Float): Double {
    return PI * 半径 * 半径 
    //double 和 float 不能混用，严格类型声明，否则会报错
} 
```

函数名和变量名能用汉字 wdf？？？ ，牛皮


### 单表达式函数

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
public fun sum(a: Int, b: Int): Int = a + b   // public 方法则必须明确写出返回类型
```

无返回值的函数（类似 Java 中的 void)：

``` kt
fun printSum(a: Int, b: Int): Unit { 
    print(a + b)
}

// 如果是返回 Unit 类型，则可以省略（对于 public 方法也是这样）：
public fun printSum(a: Int, b: Int) { 
    print(a + b)
}
```

### 显式返回类型

具有块代码体的函数必须始终显式指定返回类型，除非他们旨在返回 Unit，Kotlin 不推断具有块代码体的函数的返回类型，因为这样的函数在代码体中可能有复杂的控制流，并且返回类型对于读者（有时甚至对于编译器）是不明显的。

### 可变数量的参数（Varargs）

函数的参数（通常是最后一个）可以用 vararg 修饰符标记：


``` kt
fun <T> asList(vararg ts: T): List<T> {
    val result = ArrayList<T>()
    for (t in ts) // ts is an Array
        result.add(t)
    return result
}
```
允许将可变数量的参数传递给函数：


``` kt
val list = asList(1, 2, 3)
```

``` kt
fun vars(vararg v: Int) {
    for (vt in v) {
        print(vt)
    }
}

// 测试
fun main(args: Array<String>) {
    vars(1, 2, 3, 4, 5)  // 输出 123455
    vars(5)      //print 函数不进行换行
}
```



还有另外两种用变量定义函数的写法（函数式编程的支持）

``` kt
fun main(args: Array<String>) {
    var result = add(3, 5)
    println(result)
    var i = { x: Int, y: Int -> x + y }  //变量作为函数

    var result2 = i(3, 5)                //当作函数使用
    println(result2)                     //这种写法叫做函数表达式

    var j: (Int, Int) -> Int = { x, y -> x + y }
    var result3 = j(3, 5)
    println(result3)
}

fun add(a: Int, b: Int) = a + b
```

在函数内部，类型 T 的 vararg 参数的可见方式是作为 T 数组，即上例中的 ts 变量具有类型 Array <out T>。

只有一个参数可以标注为 vararg。如果 vararg 参数不是列表中的最后一个参数， 可以使用具名参数语法传递其后的参数的值，或者，如果参数具有函数类型，则通过在括号外部传一个 lambda。

当我们调用 vararg-函数时，我们可以一个接一个地传参，例如 asList(1, 2, 3)，或者，如果我们已经有一个数组并希望将其内容传给该函数，我们使用伸展（spread）操作符（在数组前面加 *）：

``` kt
val a = arrayOf(1, 2, 3)
val list = asList(-1, 0, *a, 4)
```
### 中缀表示法

标有 infix 关键字的函数也可以使用中缀表示法（忽略该调用的点与圆括号）调用。中缀函数必须满足以下要求：

- 它们必须是成员函数或扩展函数；
- 它们必须只有一个参数；
- 其参数不得接受可变数量的参数且不能有默认值。 vararg＆默认参数


``` kt
infix fun Int.shl(x: Int): Int { …… }

// 用中缀表示法调用该函数
1 shl 2

// 等同于这样
1.shl(2)
```
中缀函数调用的优先级低于算术操作符、类型转换以及 rangeTo 操作符。 以下表达式是等价的：

- 1 shl 2 + 3 等价于 1 shl (2 + 3)
- 0 until n * 2 等价于 0 until (n * 2)
- xs union ys as Set<*> 等价于 xs union (ys as Set<*>)


另一方面，中缀函数调用的优先级高于布尔操作符 && 与 ||、is- 与 in- 检测以及其他一些操作符。这些表达式也是等价的：

- a && b xor c 等价于 a && (b xor c)
- a xor b in c 等价于 (a xor b) in c

请注意，中缀函数总是要求指定接收者与参数。当使用中缀表示法在当前接收者上调用方法时，需要显式使用 this；不能像常规方法调用那样省略。这是确保非模糊解析所必需的。


``` kt
class MyStringCollection {
    infix fun add(s: String) { /*……*/ }
    
    fun build() {
        this add "abc"   // 正确
        add("abc")       // 正确
        //add "abc"        // 错误：必须指定接收者
    }
}
```

### 函数作用域

在 Kotlin 中函数可以在文件顶层声明，这意味着你不需要像一些语言如 Java、C# 或 Scala 那样需要创建一个类来保存一个函数。此外除了顶层函数，Kotlin 中函数也可以声明在局部作用域、作为成员函数以及扩展函数。

### 局部函数

Kotlin 支持局部函数，即一个函数在另一个函数内部：

``` kt
fun dfs(graph: Graph) {
    fun dfs(current: Vertex, visited: MutableSet<Vertex>) {
        if (!visited.add(current)) return
        for (v in current.neighbors)
            dfs(v, visited)
    }

    dfs(graph.vertices[0], HashSet())
}
```

局部函数可以访问外部函数（即闭包）的局部变量，所以在上例中，visited 可以是局部变量：


``` kt
fun dfs(graph: Graph) {
    val visited = HashSet<Vertex>()
    fun dfs(current: Vertex) {
        if (!visited.add(current)) return
        for (v in current.neighbors)
            dfs(v)
    }

    dfs(graph.vertices[0])
}
```
### 成员函数
成员函数是在类或对象内部定义的函数：


``` kt
class Sample {
    fun foo() { print("Foo") }
}
```
成员函数以点表示法调用：


``` kt
Sample().foo() // 创建类 Sample 实例并调用 foo
```

### 模板函数

函数可以有泛型参数，通过在函数名前使用尖括号指定：
 
``` kt
fun <T> singletonList(item: T): List<T> { /*……*/ } 
```
### 内联函数

### 扩展函数

### 高阶函数和 Lambda 表达式


lambda 表达式使用实例：

``` kt 
// 测试
fun main(args: Array<String>) {
    val sumLambda: (Int, Int) -> Int = {x,y -> x+y}
    println(sumLambda(1,2))  // 输出 3
}
```

### 尾递归函数

Kotlin 支持一种称为[尾递归](https://zh.wikipedia.org/wiki/%E5%B0%BE%E8%B0%83%E7%94%A8)的函数式编程风格。 这允许一些通常用循环写的算法改用递归函数来写，而无堆栈溢出的风险。 当一个函数用 tailrec 修饰符标记并满足所需的形式时，编译器会优化该递归，留下一个快速而高效的基于循环的版本：

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


## 字符串转数字

数字和字符串对象存在 toString 和 toInt 方法

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
