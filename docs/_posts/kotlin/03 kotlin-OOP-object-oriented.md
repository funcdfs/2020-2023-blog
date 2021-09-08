---
title: kotlin-面向对象
date: 2020-12-29
tags:
    - kotlin
---

> 🌴 kotlin03: kt 的面向对象

<!-- more -->

哇咔咔，相比于 cpp 的面向对象感觉扩展了好多好多心的功能（~~也可能是我没有进一步学习 C++~~）

## 类

Kotlin 中使用关键字 class 声明类

``` kt
class Invoice { /*……*/ }
```
类声明由类名、类头（指定其类型参数、主构造函数等）以及由花括号包围的类体构成。类头与类体都是可选的； 如果一个类没有类体，可以省略花括号。

``` kt
class Empty
```

## 构造函数

相比于 C++ ，kotlin 的主构造函数写在了 class 声明的那一行，而不是 class 中的一个方法，更简洁
初始化对象的时候就将这些属性进行初始化

``` kt
class Person constructor(firstName: String) { /*……*/ }
```
如果主构造函数没有任何注解或者可见性修饰符，可以省略这个 constructor 关键字。 
TODO

`class Person(firstName: String) { /*……*/ }`

像 C++ 一样，kotlin 中也有方法，静态属性和动态行为，动态行为就是 class 中的函数

主构造函数不能包含任何的代码。初始化的代码可以放到以 init 关键字作为前缀的初始化块（initializer blocks）中。

在实例初始化期间，初始化块按照它们出现在类体中的顺序执行，与属性初始化器交织在一起：

``` kt
class InitOrderDemo(name: String) {
    val firstProperty = "First property: $name".also(::println)
    
    init {
        println("First initializer block that prints ${name}")
    }
    
    val secondProperty = "Second property: ${name.length}".also(::println)
    
    init {
        println("Second initializer block that prints ${name.length}")
    }
}

fun main() {
    InitOrderDemo("hello")
    /*First property: hello
    First initializer block that prints hello
    Second property: 5
    Second initializer block that prints 5*/
}
```

请注意，主构造的参数可以在初始化块中使用。它们也可以在类体内声明的属性初始化器中使用：

``` kt
class Customer(name: String) {
    val customerKey = name.toUpperCase()
}
```
事实上，声明属性以及从主构造函数初始化属性，Kotlin 有简洁的语法：

``` kt
class Person(val firstName: String, val lastName: String, var age: Int) { /*……*/ }
class Person(
    val firstName: String,
    val lastName: String,
    var age: Int, // trailing comma
) { /*...*/ }
```
与普通属性一样，主构造函数中声明的属性可以是可变的（var）或只读的（val）。

如果构造函数有注解或可见性修饰符，这个 constructor 关键字是必需的，并且这些修饰符在它前面：

``` kt
class Customer public @Inject constructor(name: String) { /*……*/ }
```

### 次构造函数

类也可以声明前缀有 constructor 的次构造函数：

``` kt
class Person {
    var children: MutableList<Person> = mutableListOf() //mutable 可变的 易变的
    constructor(parent: Person) {
        parent.children.add(this)
    }
}
```

如果类有一个主构造函数，每个次构造函数需要委托给主构造函数， 可以直接委托或者通过别的次构造函数间接委托。委托到同一个类的另一个构造函数用 this 关键字即可：

``` kt
class Person(val name: String) {
    var children: MutableList<Person> = mutableListOf()
    constructor(name: String, parent: Person) : this(name) {
        parent.children.add(this)
    }
}
```
请注意，初始化块中的代码实际上会成为主构造函数的一部分。委托给主构造函数会作为次构造函数的第一条语句，因此所有初始化块与属性初始化器中的代码都会在次构造函数体之前执行。即使该类没有主构造函数，**这种委托仍会隐式发生，并且仍会执行初始化块：**

``` kt
class Constructors {
    init {
        println("Init block")
    }

    constructor(i: Int) {
        println("Constructor")
    }
}
```
如果一个非抽象类没有声明任何（主或次）构造函数，它会有一个生成的不带参数的主构造函数。构造函数的可见性是 public。如果你不希望你的类有一个公有构造函数，你需要声明一个带有非默认可见性的空的主构造函数：

``` kt
class DontCreateMe private constructor () { /*……*/ }
```

也可以拥有默认值：

``` kt
class Customer(val customerName: String = "")
```

kotlin 支持嵌套类和内部类，有好的地方也有不好的地方

## 继承

在 Kotlin 中所有类都有一个共同的超类 Any，这对于没有超类型声明的类是默认超类：

``` kt
class Example // 从 Any 隐式继承
```
Any 有三个方法：equals()、 hashCode() 与 toString()。因此，为所有 Kotlin 类都定义了这些方法。
默认情况下，Kotlin 类是最终（final）的：它们不能被继承。 要使一个类可继承，请用 open 关键字标记它。

``` kt
open class Base // 该类开放继承
```
如需声明一个显式的超类型，请在类头中把超类型放到冒号之后：

``` kt
open class Base(p: Int)

class Derived(p: Int) : Base(p)
```

如果基类有一个主构造函数，其派生类可以（并且必须） 用基类主构造函数的参数就地初始化。

如果派生类没有主构造函数，那么每个次构造函数必须使用 super 关键字初始化其基类型，或委托给另一个构造函数做到这一点。 注意，在这种情况下，不同的次构造函数可以调用基类型的不同的构造函数：

``` kt
class MyView : View {
    constructor(ctx: Context) : super(ctx)

    constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)
}
```
### 覆盖方法

我们之前提到过，Kotlin 力求清晰显式。因此，Kotlin 对于可覆盖的成员（我们称之为开放）以及覆盖后的成员需要显式修饰符：（要使用 open 和 override 关键字）

``` kt
open class Shape {
    open fun draw() { /*……*/ }
    fun fill() { /*……*/ }
}

class Circle() : Shape() {
    override fun draw() { /*……*/ }
}
```
标记为 override 的成员本身是开放的，也就是说，它可以在子类中覆盖。如果你想禁止再次覆盖，使用 final 关键字：
（这样的话，哪一个函数师傅为重写的都一清二楚，相比c++挺好的）

``` kt
open class Rectangle() : Shape() {
    final override fun draw() { /*……*/ }
}
```

### 覆盖属性

属性覆盖与方法覆盖类似；在超类中声明然后在派生类中重新声明的属性必须以 override 开头，并且它们必须具有兼容的类型。 每个声明的属性可以由具有初始化器的属性或者具有 get 方法的属性覆盖。

``` kt
open class Shape {
    open val vertexCount: Int = 0
}

class Rectangle : Shape() {
    override val vertexCount = 4
}
```

你也可以用一个 var 属性覆盖一个 val 属性，但反之则不行。 这是允许的，因为一个 val 属性本质上声明了一个 get 方法， 而将其覆盖为 var 只是在子类中额外声明一个 set 方法。

请注意，你可以在主构造函数中使用 override 关键字作为属性声明的一部分。

``` kt
interface Shape {
    val vertexCount: Int
}

class Rectangle(override val vertexCount: Int = 4) : Shape // 总是有 4 个顶点

class Polygon : Shape {
    override var vertexCount: Int = 0  // 以后可以设置为任何数
}
```
### 派生类初始化顺序

在构造派生类的新实例的过程中，第一步完成其基类的初始化（在之前只有对基类构造函数参数的求值），因此发生在派生类的初始化逻辑运行之前。


``` kt
open class Base(val name: String) {

    init { println("Initializing Base") }

    open val size: Int = 
        name.length.also { println("Initializing size in Base: $it") }
}

class Derived(
    name: String,
    val lastName: String,
) : Base(name.capitalize().also { println("Argument for Base: $it") }) {

    init { println("Initializing Derived") }

    override val size: Int =
        (super.size + lastName.length).also { println("Initializing size in Derived: $it") }
}

fun main() {
    println("Constructing Derived(\"hello\", \"world\")")
    val d = Derived("hello", "world")
}
```

这意味着，基类构造函数执行时，派生类中声明或覆盖的属性都还没有初始化。如果在基类初始化逻辑中（直接或通过另一个覆盖的 open 成员的实现间接）使用了任何一个这种属性，那么都可能导致不正确的行为或运行时故障。设计一个基类时，应该避免在构造函数、属性初始化器以及 init 块中使用 open 成员。

### 调用超类实现

派生类中的代码可以使用 super 关键字调用其超类的函数与属性访问器的实现：

``` kt
open class Rectangle {
    open fun draw() { println("Drawing a rectangle") }
    val borderColor: String get() = "black"
}

class FilledRectangle : Rectangle() {
    override fun draw() {
        super.draw()
        println("Filling the rectangle")
    }

    val fillColor: String get() = super.borderColor
}
```

在一个内部类中访问外部类的超类，可以通过由外部类名限定的 `super` 关键字来实现：`super@Outer：`


``` kt
open class Rectangle {
    open fun draw() { println("Drawing a rectangle") }
    val borderColor: String get() = "black"
}

class FilledRectangle: Rectangle() {
    override fun draw() { 
        val filler = Filler()
        filler.drawAndFill()
    }

    inner class Filler {
        fun fill() { println("Filling") }
        fun drawAndFill() {
            super@FilledRectangle.draw() // 调用 Rectangle 的 draw() 实现
            fill()
            println("Drawn a filled rectangle with color ${super@FilledRectangle.borderColor}") // 使用 Rectangle 所实现的 borderColor 的 get()
        }
    }
}

fun main() {
    val fr = FilledRectangle()
        fr.draw()
}
```
### 覆盖规则

在 Kotlin 中，实现继承由下述规则规定：如果一个类从它的直接超类继承相同成员的多个实现， 它必须覆盖这个成员并提供其自己的实现（也许用继承来的其中之一）。 为了表示采用从哪个超类型继承的实现，我们使用由尖括号中超类型名限定的 super，如 super<Base>：


``` kt
open class Rectangle {
    open fun draw() { /* …… */ }
}

interface Polygon {
    fun draw() { /* …… */ } // 接口成员默认就是“open”的
}

class Square() : Rectangle(), Polygon {
    // 编译器要求覆盖 draw()：
    override fun draw() {
        super<Rectangle>.draw() // 调用 Rectangle.draw()
        super<Polygon>.draw() // 调用 Polygon.draw()
    }
}
```

可以同时继承 Rectangle 与 Polygon， 但是二者都有各自的 draw() 实现，所以我们必须在 Square 中覆盖 draw()， 并提供其自身的实现以消除歧义。


## 抽象类

类以及其中的某些成员可以声明为 abstract。 抽象成员在本类中可以不用实现。 需要注意的是，我们并不需要用 open 标注一个抽象类或者函数——因为这不言而喻。

我们可以用一个抽象成员覆盖一个非抽象的开放成员

``` kt
open class Polygon {
    open fun draw() {}
}

abstract class Rectangle : Polygon() {
    abstract override fun draw()
}
```

### 抽象类实例

同 cpp 中的 [virtual 关键字的作用](https://konng.vercel.app/posts/2020/11/20/_11-c-virtual.html)

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
## 接口

Kotlin 的接口可以既包含抽象方法的声明也包含实现。与抽象类不同的是，接口无法保存状态。它可以有属性但必须声明为抽象或提供访问器实现。

使用关键字 interface 来定义接口


``` kt
interface MyInterface {
    fun bar()
    fun foo() {
      // 可选的方法体
    }
}
```
### 实现接口


``` kt
class Child : MyInterface {
    override fun bar() {
        // 方法体
    }
}
```

### 接口中的属性

你可以在接口中定义属性。在接口中声明的属性要么是抽象的，要么提供访问器的实现。在接口中声明的属性不能有幕后字段（backing field），因此接口中声明的访问器不能引用它们。

``` kt
interface MyInterface {
    val prop: Int // 抽象的

    val propertyWithImplementation: String
        get() = "foo"

    fun foo() {
        print(prop)
    }
}

class Child : MyInterface {
    override val prop: Int = 29
}
```
### 接口继承

一个接口可以从其他接口派生，从而既提供基类型成员的实现也声明新的函数与属性。很自然地，实现这样接口的类只需定义所缺少的实现：

``` kt
interface Named {
    val name: String
}

interface Person : Named {
    val firstName: String
    val lastName: String
    
    override val name: String get() = "$firstName $lastName"
}

data class Employee(
    // 不必实现“name”
    override val firstName: String,
    override val lastName: String,
    val position: Position
) : Person
```

### 解决覆盖冲突

实现多个接口时，可能会遇到同一方法继承多个实现的问题。例如

``` kt
interface A {
    fun foo() { print("A") }
    fun bar()
}

interface B {
    fun foo() { print("B") }
    fun bar() { print("bar") }
}

class C : A {
    override fun bar() { print("bar") }
}

class D : A, B {
    override fun foo() {
        super<A>.foo()
        super<B>.foo()
    }

    override fun bar() {
        super<B>.bar()
    }
}
```

上例中，接口 A 和 B 都定义了方法 foo() 和 bar()。 两者都实现了 foo(), 但是只有 B 实现了 bar() (bar() 在 A 中没有标记为抽象， 因为在接口中没有方法体时默认为抽象）。因为 C 是一个实现了 A 的具体类，所以必须要重写 bar() 并实现这个抽象方法。

然而，如果我们从 A 和 B 派生 D，我们需要实现我们从多个接口继承的所有方法，并指明 D 应该如何实现它们。这一规则既适用于继承单个实现（bar()）的方法也适用于继承多个实现（foo()）的方法。

### 基础接口使用实例

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

## 函数式（SAM）接口

只有一个抽象方法的接口称为函数式接口或 SAM（单一抽象方法）接口。函数式接口可以有多个非抽象成员，但只能有一个抽象成员。

可以用 fun 修饰符在 Kotlin 中声明一个函数式接口。

``` kt
fun interface KRunnable {
   fun invoke()
}
```
### SAM 转换




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


## 委托和代理

by 关键字

示例：大头儿子，小头爸爸，围裙妈妈，洗碗的故事（10，1，by）

``` kt 
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
    class 小小驴 () : Son()
    class 小骡子 () : Son()

    fun SayHello() {
        println("hello everyone")
    }
}

fun main(args: Array<String>) {
    var s01: Son = Son. 小小驴 ()
    var s02 = Son. 小骡子 ()
    var list = listOf<Son>(s01, s02)
    for (a in list) {
        if (a is Son. 小骡子） {
            a.SayHello()
        }
    }
}
```
