---
title: JavaScript Basic Tips
darft: true
date: 2021-01-20
tags:
  - JavaScript
---

> JavaScript 基础语法

<!-- more -->

## 等号

要特别注意相等运算符==。JavaScript在设计时，有两种比较运算符：

第一种是==比较，它会自动转换数据类型再比较，很多时候，会得到非常诡异的结果；

第二种是===比较，它不会自动转换数据类型，如果数据类型不一致，返回false，如果一致，再比较。

由于JavaScript这个设计缺陷，不要使用`==`比较，始终坚持使用`===`比较。

另一个例外是NaN这个特殊的Number与所有其他值都不相等，包括它自己：

`NaN === NaN; // false`
唯一能判断NaN的方法是通过`isNaN()`函数：

`isNaN(NaN); // true`
最后要注意浮点数的相等比较：

`1 / 3 === (1 - 2 / 3); // false`

## null和undefined

null表示一个“空”的值，它和0以及空字符串''不同，0是一个数值，''表示长度为0的字符串，而null表示“空”。

在其他语言中，也有类似JavaScript的null的表示，例如Java也用null，Swift用nil，Python用None表示。但是，在JavaScript中，还有一个和null类似的undefined，它表示“未定义”。

JavaScript的设计者希望用null表示一个空的值，而undefined表示值未定义。事实证明，这并没有什么卵用，区分两者的意义不大。大多数情况下，我们都应该用null。undefined仅仅在判断函数参数是否传递的情况下有用。


## 严格模式

```js 
'use strict';
```
为了避免多个文件未使用 var 构建的变量造成的错误

## 字符串

字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果:
JavaScript 为字符串提供了一些常用方法，注意，调用这些方法本身不会改变原有字符串的内容，而是返回一个新字符串:

### 多行字符串


键盘数字1旁边的符号

```js
`这是一个
多行
字符串`;
```

### `${}` 模板字符串

用来简化 `+` 字符串操作，语法同kotlin

```js 
var message = `你好，${name}, 你今年${age}岁了！`;
```

### 字符串函数

```js
s[13]; // undefined 超出范围的索引不会报错，但一律返回 undefined
s.length;
s.toUpperCase();
s.toLowerCase();

var s = 'hello, world';
s.indexOf('world'); // 返回 7
s.indexOf('World'); // 没有找到指定的子串，返回-1

s.substring(0, 5); // 从索引 0 开始到 5（不包括 5），返回'hello'
s.substring(7); // 从索引 7 开始到结束，返回'world'
```

## 数组

请注意，直接给 Array 的 length 赋一个新的值会导致 Array 大小的变化:

请注意，直接给Array的length赋一个新的值会导致Array大小的变化：

``` js
var arr = [1, 2, 3];
arr.length; // 3
arr.length = 6;
arr; // arr变为[1, 2, 3, undefined, undefined, undefined]
arr.length = 2;
arr; // arr变为[1, 2]
```

请注意，如果通过索引赋值时，索引超过了范围，同样会引起 Array 大小的变化:

大多数其他编程语言不允许直接改变数组的大小，越界访问索引会报错。然而，JavaScript 的 Array 却不会有任何错误。在编写代码时，不建议直接修改 Array 的大小，访问索引时要确保索引不会越界。

### indexOf

与 String 类似，Array 也可以通过 indexOf() 来搜索一个指定的元素的位置:

```js
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素 10 的索引为 0
arr.indexOf(20); // 元素 20 的索引为 1
arr.indexOf(30); // 元素 30 没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为 2
```
注意了，数字 30 和字符串'30'是不同的元素。

### push 和 pop

push() 向 Array 的末尾添加若干元素，pop() 则把 Array 的最后一个元素删除掉:

```js
var arr = [1, 2];
arr.push('A', 'B'); // 返回 Array 新的长度:4
arr; // [1, 2, 'A', 'B']
arr.pop(); // pop() 返回'B'
arr; // [1, 2, 'A']
arr.pop(); arr.pop(); arr.pop(); // 连续 pop 3 次
arr; // []
arr.pop(); // 空数组继续 pop 不会报错，而是返回 undefined
arr; // []
```

### unshift 和 shift

如果要往 Array 的头部添加若干元素，使用 unshift() 方法，shift() 方法则把 Array 的第一个元素删掉:

```js
var arr = [1, 2];
arr.unshift('A', 'B'); // 返回 Array 新的长度:4
arr; // ['A', 'B', 1, 2]
arr.shift(); // 'A'
arr; // ['B', 1, 2]
arr.shift(); arr.shift(); arr.shift(); // 连续 shift 3 次
arr; // []
arr.shift(); // 空数组继续 shift 不会报错，而是返回 undefined
arr; // []
```

### sort

sort() 可以对当前 Array 进行排序，它会直接修改当前 Array 的元素位置，直接调用时，按照默认顺序排序:

```js
var arr = ['B', 'C', 'A'];
arr.sort();
arr; // ['A', 'B', 'C']
```

TODO 能否按照我们自己指定的顺序排序呢

### reverse `reverse: 逆转`

reverse() 把整个 Array 的元素给掉个个，也就是反转:

```js
var arr = ['one', 'two', 'three'];
arr.reverse(); 
arr; // ['three', 'two', 'one']
```

### slice `slice: 切片`

slice() 就是对应 String 的 substring() 版本，它截取 Array 的部分元素，然后返回一个新的 Array:

```js
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引 0 开始，到索引 3 结束，但不包括索引 3: ['A', 'B', 'C']
arr.slice(3); // 从索引 3 开始到结束:['D', 'E', 'F', 'G']
```

如果不给 slice() 传递任何参数，它就会从头到尾截取所有元素。利用这一点，**我们可以很容易地复制一个 Array:**
```js
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false
```

splice() 方法是修改 Array 的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素:

```js
var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引 2 开始删除 3 个元素，然后再添加两个元素:
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除，不添加:
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// 只添加，不删除:
arr.splice(2, 0, 'Google', 'Facebook'); // 返回 [], 因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
```

### concat

加法操作

concat() 方法把当前的 Array 和另一个 Array 连接起来，并返回一个新的 Array:

```js
var arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']
```

请注意，concat() **方法并没有修改当前 Array，而是返回了一个新的 Array。**

实际上，concat() 方法可以接收任意个元素和 Array，并且自动把 Array 拆开，然后全部添加到新的 Array 里:

```js
var arr = ['A', 'B', 'C'];
arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
```

### join

vim中有相关指令操作

join() 方法是一个非常实用的方法，它把当前 Array 的每个元素都用指定的字符串连接起来，然后返回连接后的字符串:
（首尾不包含那个连接字符，就很银杏）

```js
var arr = ['A', 'B', 'C', 1, 2, 3];
arr.join('-'); // 'A-B-C-1-2-3'
```

如果 Array 的元素不是字符串，将自动转换为字符串后再连接。

## 对象

逗号分隔，最后一个属性无逗号，结尾分号分隔作为一个完整的语句

```js
var xiaohong = {
    name: '小红',
    'middle-school': 'No.1 Middle School' //特殊符号属性的声明
};
```

### 两种使用属性的方式:

含有特殊字符的属性只能使用第一种方法调用

```js
xiaohong['middle-school']; // 'No.1 Middle School'
xiaohong['name']; // '小红'
xiaohong.name; // '小红'
```

实际上 JavaScript 对象的所有属性都是字符串，不过属性对应的值可以是任意数据类型。

如果访问一个不存在的属性会返回什么呢？JavaScript 规定，访问不存在的属性不报错，而是返回 undefined:

```js
'use strict';
var xiaoming = {
    name: '小明'
};
console.log(xiaoming.name);
console.log(xiaoming.age); // undefined
```
由于 JavaScript 的对象是动态类型，你可以自由地给一个对象添加或删除属性:

```js
var xiaoming = {
    name: '小明'
};
xiaoming.age; // undefined
xiaoming.age = 18; // 新增一个 age 属性
xiaoming.age; // 18
delete xiaoming.age; // 删除 age 属性
xiaoming.age; // undefined
delete xiaoming['name']; // 删除 name 属性
xiaoming.name; // undefined
delete xiaoming.school; // 删除一个不存在的 school 属性也不会报错
```

> 很多不合理的操作都不报错，所以写大型程序时肯定不好用

### in 

如果我们要检测 xiaoming 是否拥有某一属性，可以用 in 操作符:

```js
var xiaoming = {
    name: '小明',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    weight: 65,
    score: null
};
'name' in xiaoming; // true
'grade' in xiaoming; // false
```

不过要小心，如果 in 判断一个属性存在，这个属性不一定是 xiaoming 的，它可能是 xiaoming **继承**得到的:

```js
'toString' in xiaoming; // true
```

因为 toString 定义在 object 对象中，而所有对象最终都会在原型链上指向 object，所以 xiaoming 也拥有 toString 属性。

要判断一个属性是否是 xiaoming 自身拥有的，而不是继承得到的，可以用 hasOwnProperty() 方法:

```js
var xiaoming = {
    name: '小明'
};
xiaoming.hasOwnProperty('name'); // true
xiaoming.hasOwnProperty('toString'); // false
```

## if for while

if for while do ... while 语法都和 c++一样

特别引入了一个 for in 组合

### for ... in

它可以把一个对象的所有属性依次循环出来:

```js
var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};
for (var key in o) {
    console.log(key); // 'name', 'age', 'city'
}
```
要过滤掉对象继承的属性，用 hasOwnProperty() 来实现:

```js
var o = {
    name: 'Jack',
    age: 20,
    city: 'Beijing'
};
for (var key in o) {
    if (o.hasOwnProperty(key)) {
        console.log(key); // 'name', 'age', 'city'
    }
}
```
由于 Array 也是对象，而它的每个元素的索引被视为对象的属性，因此，for ... in 循环可以直接循环出 Array 的索引:

```js
var a = ['A', 'B', 'C'];
for (var i in a) {
    console.log(i); // '0', '1', '2'
    console.log(a[i]); // 'A', 'B', 'C'
}
```
::: tip 请注意
for ... in 对 Array 的循环得到的是 String 而不是 Number。
:::

## map Set

map用来快速查找键值对

声明

```js
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
m.get('Michael'); // 95
```
用法

初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法:

```js
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```

由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉:

```js
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88
```
### Set

Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。

要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set:

```js
var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
```
重复元素在Set中自动被过滤:


```js
var s = new Set([1, 2, 3, 3, '3']);
s; // Set {1, 2, 3, "3"}
```
注意数字3和字符串'3'是不同的元素。

通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果:

```js
s.add(4);
s; // Set {1, 2, 3, 4}
s.add(4);
s; // 仍然是 Set {1, 2, 3, 4}
```
通过delete(key)方法可以删除元素:

```js
var s = new Set([1, 2, 3]);
s; // Set {1, 2, 3}
s.delete(3);
s; // Set {1, 2}
```

## [iterable for...of](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024358748480)

`iterable :可迭代的`

for ... of循环和for ... in循环有何区别？

for ... in循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个Array数组实际上也是一个对象，它的每个元素的索引被视为一个属性。

当我们手动给Array对象添加了额外的属性后，for ... in循环将带来意想不到的意外效果:

```js
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}
```
for ... in循环将把name包括在内，但Array的length属性却不包括在内。

for ... of循环则完全修复了这些问题，它只循环集合本身的元素:

```js
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    console.log(x); // 'A', 'B', 'C'
}
```
这就是为什么要引入新的for ... of循环。

然而，更好的方式是直接使用iterable内置的forEach方法，它接收一个函数，每次迭代就自动回调该函数。以Array为例:

```js
'use strict';
var a = ['A', 'B', 'C'];
a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element + ', index = ' + index);
});
```


## 函数

普通声明

``` js
function abs(x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}
```
由于JavaScript的函数也是一个对象，上述定义的abs()函数实际上是一个函数对象，而函数名abs可以视为指向该函数的变量。

匿名函数声明

``` js
var abs = function (x) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
};
```

在这种方式下，function (x) { ... }是一个匿名函数，它没有函数名。但是，这个匿名函数赋值给了变量abs，所以，通过变量abs就可以调用该函数。

上述两种定义完全等价，注意第二种方式按照完整语法需要在函数体末尾加一个;，表示赋值语句结束。

### 调用函数

调用函数时，按顺序传入参数即可：

``` js 
abs(10); // 返回10
abs(-9); // 返回9
```
由于JavaScript允许传入任意个参数而不影响调用，因此传入的参数比定义的参数多也没有问题，虽然函数内部并不需要这些参数：

abs(10, 'blablabla'); // 返回10
abs(-9, 'haha', 'hehe', null); // 返回9
传入的参数比定义的少也没有问题：

abs(); // 返回NaN
此时abs(x)函数的参数x将收到undefined，计算结果为NaN。

要避免收到undefined，可以对参数进行检查：


``` js 
function abs(x) {
    if (typeof x !== 'number') {
        throw 'Not a number';
    }
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}
```

::: tip
好家伙，啥也不检查，全手动语言，极其不安全语言，直呼内行
::: 

### argument

任意函数中可以当作参数数组来使用 


``` js
function foo(x) {
    console.log('x = ' + x); // 10
    for (var i=0; i<arguments.length; i++) {
        console.log('arg ' + i + ' = ' + arguments[i]); // 10, 20, 30
    }
}
foo(10, 20, 30);
```

利用arguments，你可以获得调用者传入的所有参数。也就是说，即使函数不定义任何参数，还是可以拿到参数的值：（这一点比较方便）

``` js
function abs() {
    if (arguments.length === 0) {
        return 0;
    }
    var x = arguments[0];
    return x >= 0 ? x : -x;
}

abs(); // 0
abs(10); // 10
abs(-9); // 9
```

### rest参数

用来简化不定长参数的使用 


``` js
function foo(a, b, ...rest) {
    console.log('a = ' + a);
    console.log('b = ' + b);
    console.log(rest);
}

foo(1, 2, 3, 4, 5);
// 结果:
// a = 1
// b = 2
// Array [ 3, 4, 5 ]

foo(1);
// 结果:
// a = 1
// b = undefined
// Array []
```
rest参数只能写在最后，前面用...标识，从运行结果可知，传入的参数先绑定a、b，多余的参数以数组形式交给变量rest，所以，不再需要arguments我们就获取了全部参数。

如果传入的参数连正常定义的参数都没填满，也不要紧，rest参数会接收一个空数组（注意不是undefined）。

### return 
 
使用return语句的时候不要换行，因为JavaScript中换行和不换行都是语法正确

以下的代码会被分为俩个部分看待

``` js
function foo() {
    return
        { name: 'foo' };
}
```

小心虚假return

### 变量提升

一个函数中，JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部：

``` js
'use strict';

function foo() {
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}

foo();
```

虽然是strict模式，但语句var x = 'Hello, ' + y;并不报错，原因是变量y在稍后申明了。但是console.log显示Hello, undefined，说明变量y的值为undefined。这正是因为JavaScript引擎自动提升了变量y的声明，但不会提升变量y的赋值。

对于上述foo()函数，JavaScript引擎看到的代码相当于：


``` js 
function foo() {
    var y; // 提升变量y的申明，此时y为undefined
    var x = 'Hello, ' + y;
    console.log(x);
    y = 'Bob';
}
```

由于JavaScript的这一怪异的“特性”，我们在函数内部定义变量时，请严格遵守“在函数内部首先申明所有变量”这一规则。最常见的做法是用一个var申明函数内部用到的所有变量：


``` js
function foo() {
    var
        x = 1, // x初始化为1
        y = x + 1, // y初始化为2
        z, i; // z和i为undefined
    // 其他语句:
    for (i=0; i<100; i++) {
        ...
    }
}
```
### 作用域

不在任何函数内定义的变量就具有全局作用域。实际上，JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window的一个属性：

``` js
'use strict';

var course = 'Learn JavaScript';
alert(course); // 'Learn JavaScript'
alert(window.course); // 'Learn JavaScript'
```

因此，直接访问全局变量course和访问window.course是完全一样的。

你可能猜到了，由于函数定义有两种方式，以变量方式var foo = function () {}定义的函数实际上也是一个全局变量，因此，顶层函数的定义也被视为一个全局变量，并绑定到window对象：

``` js
'use strict';

function foo() {
    alert('foo');
}

foo(); // 直接调用foo()
window.foo(); // 通过window.foo()调用
```

为了避免变量重复定义的情况，提供了类似于cpp的namespace功能

``` js
// 唯一的全局变量MYAPP:
var MYAPP = {};

// 其他变量:
MYAPP.name = 'myapp';
MYAPP.version = 1.0;

// 其他函数:
MYAPP.foo = function () {
    return 'foo';
};
```
把自己的代码全部放入唯一的名字空间MYAPP中，会大大减少全局变量冲突的可能。

### 局部作用域 let

由于JavaScript的变量作用域实际上是函数内部，我们在for循环等语句块中是无法定义具有局部作用域的变量的：

``` js
'use strict';

function foo() {
    for (var i=0; i<100; i++) {
        //
    }
    i += 100; // 仍然可以引用变量i
}
```
为了解决块级作用域，ES6引入了新的关键字let，用let替代var可以申明一个块级作用域的变量：

``` js
'use strict';

function foo() {
    var sum = 0;
    for (let i=0; i<100; i++) {
        sum += i;
    }
    // SyntaxError:
    i += 1;
}
```

### 解构赋值

从ES6开始，JavaScript引入了解构赋值，可以同时对一组变量进行赋值。

什么是解构赋值？我们先看看传统的做法，如何把一个数组的元素分别赋值给几个变量：

``` js
var array = ['hello', 'JavaScript', 'ES6'];
var x = array[0];
var y = array[1];
var z = array[2];
```
现在，在ES6中，可以使用解构赋值，直接对多个变量同时赋值：


``` js
'use strict';

// 如果浏览器支持解构赋值就不会报错:
var [x, y, z] = ['hello', 'JavaScript', 'ES6'];
```

如果需要从一个对象中取出若干属性，也可以使用解构赋值，便于快速获取对象的指定属性：


``` js
'use strict';

var person = {
    name: '小明',
    age: 20,
    gender: 'male',
    passport: 'G-12345678',
    school: 'No.4 middle school'
};
var {name, age, passport} = person;
```

解构赋值在很多时候可以大大简化代码。例如，交换两个变量x和y的值，可以这么写，不再需要临时变量：

``` js
var x=1, y=2;
[x, y] = [y, x]
```
快速获取当前页面的域名和路径：

``` js
var {hostname:domain, pathname:path} = location;
```

如果一个函数接收一个对象作为参数，那么，可以使用解构直接把对象的属性绑定到变量中。例如，下面的函数可以快速创建一个Date对象：

``` js
function buildDate({year, month, day, hour=0, minute=0, second=0}) {
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
}
```
它的方便之处在于传入的对象只需要year、month和day这三个属性：

``` js
buildDate({ year: 2017, month: 1, day: 1 });
// Sun Jan 01 2017 00:00:00 GMT+0800 (CST)
```
也可以传入hour、minute和second属性：

``` js
buildDate({ year: 2017, month: 1, day: 1, hour: 20, minute: 15 });
// Sun Jan 01 2017 20:15:00 GMT+0800 (CST)
```

