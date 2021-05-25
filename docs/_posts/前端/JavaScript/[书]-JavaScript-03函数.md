---
title: 【书】JavaScript 函数
date: 2021-05-14
tags:
    - JavaScript 高级程序设计（第四版）
    - JavaScript
---

帅帅的箭头函数~
快捷键（an）

date: 2021-05-14　初稿

## 函数名

``` js
function sum(num1, num2) {
    console.log(num1 + num2);
}
console.log(sum(10, 10)); // 20
let anotherSum = sum;
console.log(anotherSum(10, 10)); // 20
sum = null;
// 使用不带括号的函数名会访问函数指针，而不会执行函数。
console.log(anotherSum(10, 10)); // 20
console.log(sum(10, 10)); // TypeError: sum is not a function
```

`.name` 属性：这个属性中保存的就是一个函数标识符，或者说是一个字符串化的变量名

``` js
function foo() {}
let bar = function () {};
let baz = () => {};
console.log(foo.name); // foo
console.log(bar.name); // bar
console.log(baz.name); // baz
console.log((() => {}).name); //（空字符串）
console.log((new Function()).name); // anonymous
```

## 函数参数

ECMAScript 函数既不关心传入的参数个数，也不关心这些参数的数据类型。
可以在函数内部访问 arguments 对象，从中取得传进来的每个参数值。

arguments 对象是一个类数组对象（但不是 Array 的实例），因此可以使用中括号语法访问其中的元素（第一个参数是 `arguments[0]`，第二个参数是 `arguments[1]`）。而要确定传进来多少个参数，可以访问 `arguments.length` 属性。（这无括号哦~）

可以通过函数中的 if 语句加上 arguments.length 来实现类似于函数重载的功能（弥补没有函数重载设定的缺陷）

arguments 对象的另一个有意思的地方就是，它的值始终会与对应的命名参数同步，(`arguments[1]==num2`) 但这并不意味着它们都访问同一个内存地址，它们在内存中还是分开的，只不过会保持同步而已。

严格模式下，arguments 会有一些变化。首先，像前面那样给 arguments[1] 赋值**不会再影响 num2 的值**（但还是会影响 arguments 的值！)。就算把 arguments[1] 设置为 10，num2 的值仍然还是传入的值。其次，在函数中尝试重写 arguments 对象会导致语法错误。（代码也不会执行。）

``` js
'use strict'

function doAdd(num1, num2) {
    arguments[0] = 1000;
    console.log(arguments[0] + num2);
    console.log(num1 + num2);
    return arguments[0] + arguments[1];
}
    
console.log(doAdd(1, 2));
```
1002
3
1002

如果函数是使用箭头语法定义的，那么传给函数的参数将不能使用 arguments 关键字访问，而只能通过定义的命名参数访问。
虽然箭头函数中没有 arguments 对象，但可以在包装函数中把它提供给箭头函数：

``` js
function foo() {
    let bar = () => {
        console.log(arguments[0]); // 5
    };
    bar();
}
foo(5);
``` 

函数中可以调用函数嘛~

ECMAScript 中的所有参数都按值传递的。不可能按引用传递参数。如果把对象作为参数传递，那么传递的值就是这个对象的引用。

## 没有重载

如果在 ECMAScript 中定义了两个同名函数，则后定义的会覆盖先定义的（即使参数部分不同）

``` js
function test1(i) {
    console.log("1111111" + i);
}

function test1() {
    console.log("2222222");
}
test1(5)
```
把函数名当成指针也有助于理解为什么 ECMAScript 没有函数重载。

使用 if 加上对于参数的判断（`obj instanceOf XXX ||arguments[X]`）可以模仿重载

## 默认参数值

cpp中有占位参数和默认参数，用法相同

并且用法更加自由，传入 undefined 也可以，多个也可以，无位置要求

``` js
function makeKing(name = 'Henry', numerals = 'VIII') {
    return `King ${name} ${numerals}`;
}
console.log(makeKing()); // 'King Henry VIII'
console.log(makeKing('Louis')); // 'King Louis VIII'
console.log(makeKing(undefined, 'VI')); // 'King Henry VI' 
```

arguments 对象的值不反映参数的默认值哦~

默认参数值并不限于原始值或对象类型，也可以**使用调用函数返回的值**：

``` js
let romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
let ordinality = 0;

function getNumerals() {
    // 每次调用后递增
    return romanNumerals[ordinality++];
}

function makeKing(name = 'Henry', numerals = getNumerals()) {
    return `King ${name} ${numerals}`;
}
console.log(makeKing());
console.log(makeKing());
console.log(makeKing());
console.log(makeKing());
// King Henry I
// King Henry II
// King Henry III
// King konng Invincible
```
箭头函数同样也可以这样使用默认参数，只不过在只有一个参数时，就必须使用括号而不能省略了

因为参数是按顺序初始化的，所以后定义默认值的参数可以引用先定义的参数。
(即前面定义的参数不能引用后面定义的。学名：暂时性死区。。。。。。)
``` js
function makeKing(name = 'Henry', numerals = name) {
    return `King ${name} ${numerals}`;
}
console.log(makeKing()); // King Henry Henry
```

## 扩展参数

利用解构写法将数组整个传入：

TODO JavaScript apply()

``` js
let values = [1, 2, 3, 4];

function getSum() {
    let sum = 0;
    for (let i = 0; i < arguments.length; ++i) {
        sum += arguments[i];
    }
    return sum;
}

console.log(getSum(-10, ...values));
```

相应的，如果把解构写法的传入数组值当作数组进行使用，就叫做：收集参数

因为长度不固定，所以只能把他作为最后一个参数

```js
// 不可以
function getProduct(...values, lastValue) {}
// 可以
function ignoreFirst(firstValue, ...values) {
    console.log(values);
}
ignoreFirst(); // []
ignoreFirst(1); // []
ignoreFirst(1, 2); // [2]
ignoreFirst(1, 2, 3); // [2, 3]
```
箭头函数虽然不能使用，arguments ，但是不影响他使用解构操作实现的参数形式

## 函数声明与函数表达式

除了以变量形式定义的函数不能进行提升之外，两者等价

## 函数作为值

``` js
function add10(num) {
    return num + 10;
}

function callSomeFunction(someFunction, someArgument) {
    return someFunction(someArgument);
}//这是一个通用函数

let result1 = callSomeFunction(add10, 10);
console.log(result1); // 20
function getGreeting(name) {
    return "Hello, " + name;
}
let result2 = callSomeFunction(getGreeting, "Nicholas");
// 第一个参数应该是一个函数，第二个参数应该是要传给这个函数的值。
console.log(result2); // "Hello, Nicholas"
```

实例：函数作为返回值实现对象的自定义排序


``` js
function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        let value1 = object1[propertyName];
        let value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}
let data = [{
        name: "Zachary",
        age: 28
    },
    {
        name: "Nicholas",
        age: 29
    }
];
data.sort(createComparisonFunction("name"));
console.log(data[0].name); // Nicholas
data.sort(createComparisonFunction("age"));
console.log(data[0].name); // Zachary
```
## 函数内部

谁说JavaScript是玩具语言？我就笑笑不说话

### arguments

arguments 对象其实还有一个 callee 属性，是一个指向 arguments 对象**所在函数**的指针。


``` js
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
        // return num * factorial (num - 1); 
    }
}
```

这个重写之后的 factorial()函数已经用 arguments.callee 代替了之前硬编码 factorial。这意味着无论函数叫什么名称，都可以引用正确的函数。

可以提高递归函数代码的健壮性，真不错

但是，严格模式下不能使用 arguments.callee 所以使用函数作为函数的参数实现相同的功能，并且也可以修改函数名

``` js
const factorial = (function f(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * f(num - 1);
    }
});
```

### this


``` js
function King() {
    this.royaltyName = 'Henry';
    // this 引用 King 的实例
    setTimeout(() => console.log(this.royaltyName), 1000);
}

function Queen() {
    this.royaltyName = 'Elizabeth';
    // this 引用 window 对象
    setTimeout(function () {
        console.log(this.royaltyName);
    }, 1000);
}
new King(); // Henry
new Queen(); // undefined
```

### caller


``` js
function outer() {
    inner();
}

function inner() {
    console.log(inner.caller);
    // console.log(arguments.callee.caller); 
}
outer();
```
严格模式下会报错

### new.target

函数始终可以作为构造函数实例化一个新对象，也可以普通进行调用

ECMAScript 6 新增了检测函数是否使用 new 关键字调用的 new.target 属性。如果函数是正常调用的 则 new.target 的值是 undefined；如果是使用 new 关键字调用的，则 new.target 将引用被调用的构造函数。

## 函数属性方法

通用的函数作为对象使用的一些方法可以更加方便的编程

`XXX.length` 保存函数定义的命名参数的个数

apply()

apply()方法接收两个参数：函数内 this 的值和一个参数数组。第二个参数可以是 Array 的实例，但也可以是 arguments 对象。

``` js
function sum(num1, num2) {
    return num1 + num2;
}

function callSum1(num1, num2) {
    return sum.apply(this, arguments);
    // 传入 arguments 对象
}

function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]); // 传入数组
}

console.log(callSum1(10, 10)); // 20
console.log(callSum2(10, 10)); // 20 
```
在这个例子中，callSum1()会调用 sum()函数，将 this 作为函数体内的 this 值（这里等于window，因为是在全局作用域中调用的）传入，同时还传入了 arguments 对象。callSum2()也会调用 sum()函数，但会传入参数的数组。这两个函数都会执行并返回正确的结果。

::: note 原因
在严格模式下，调用函数时如果没有指定上下文对象，则 this 值不会指向 window。除非使用 apply()或 call()把函数指定给一个对象，否则 this 的值会变成 undefined。
:::


call()

call()方法与 apply()的作用一样，只是传参的形式不同。第一个参数跟 apply()一样，也是 this值，而剩下的要传给被调用函数的参数则是逐个传递的。换句话说，通过 call()向函数传参时，必须将参数一个一个地列出来，


``` js
window.color = 'red';
let o = {
    color: 'blue'
};

function sayColor() {
    console.log(this.color);
}
sayColor(); // red
sayColor.call(this); // red
sayColor.call(window); // red
sayColor.call(o); // blue 
```

使用 call()或 apply()的好处是可以将任意对象设置为任意函数的作用域，这样对象可以不用关心方法。

bind()

历史遗留物，也是为了实现相同的功能

``` js
window.color = 'red';
var o = {
    color: 'blue'
};

function sayColor() {
    console.log(this.color);
}
let objectSayColor = sayColor.bind(o);
objectSayColor(); // blue
```

## 尾递归优化

TODO JavaScript 尾递归优化

## 闭包

面试题？

https://www.bilibili.com/video/BV1YJ411R7ap?p=3

环境中的数据如果又被使用过，那么相关的变量就不进行删除，
如果环境中的数据没有被引用过，那么还想要多次调用此函数保存相关值，那么就需要使用 return 来实现

this 相关：使用箭头函数解决

## IIFE 

Immediately Invoked Function Expression

https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE

 ECMAScript 5.1 及以前，为了防止变量定义外泄，IIFE 是个非常有效的方式。这样也不会导致闭包相关的内存问题，因为不存在对这个匿名函数的引用。为此，只要函数执行完毕，其作用域链就可以被销毁。

有了 let 声明之后这个就没有必要使用了

## 私有变量

TODO　JavaScript　私有变量
