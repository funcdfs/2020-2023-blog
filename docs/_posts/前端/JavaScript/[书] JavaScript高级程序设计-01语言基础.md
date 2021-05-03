---
title: JavaScript高级程序设计_语言基础
date: 2021-04-10
tags:
  - JavaScript
---

多读书

## symbol 类型

## object类型

## 运算符

### 一元运算符

- 递增递减操作符
- 一元加和减
    一元加和减操作符主要用于基本的算术，但也可以像上面的例子那样，用于数据类型转换。

### 位操作

特殊值NaN 和Infinity 在位操作中都会被当成 0 处理。

#### 按位非

按位非的最终效果是对数值取反并减  **快**

#### 按位与

`&`

有一道题：

#### 按位或

`|`

#### 按位异或

`^`

110 101 011 000

按位异或与按位或的区别是，它只在一位上是 1 的时候返回 1（两位都是 1 或 0，则返回 0）。

#### 左移

`<<`

空位补0
#### 有符号右移

`>>`

右移后空位会出现在左侧，且在符号位之后。
ECMAScript 会用符号位的值来填充这些空位，以得到完整的数值。

#### 无符号右移

无符号右移用 3 个大于号表示（>>>），会将数值的所有 32 位都向右移。对于正数，无符号右移与有符号右移结果相同。

对于负数，有时候差异会非常大。与有符号右移不同，无符号右移会给空位补 0，而不管符号位是
什么。对正数来说，这跟有符号右移效果相同。但对负数来说，结果就差太多了。无符号右移操作符将**负数的二进制表示当成正数的二进制**表示来处理。因为负数是其绝对值的二补数


### 布尔操作符

#### 逻辑非

逻辑非操作符也可以用于把任意值转换为布尔值。同时使用两个叹号（!!），相当于调用了转型函
数 Boolean()。无论操作数是什么类型，第一个叹号总会返回布尔值。第二个叹号对该布尔值取反，
从而给出变量真正对应的布尔值。结果与对同一个值使用 Boolean()函数是一样的：

#### 逻辑与

`let result = true && false; `
- 如果第一个操作数是对象，则返回第二个操作数。
- 如果第二个操作数是对象，则只有第一个操作数求值为 true 才会返回该对象。
- 如果两个操作数都是对象，则返回第二个操作数。
- 如果有一个操作数是 null，则返回 null。
- 如果有一个操作数是 NaN，则返回 NaN。
- 如果有一个操作数是 undefined，则返回 undefined。

#### 逻辑或

- 如果第一个操作数是对象，则返回第一个操作数。
- 如果第一个操作数求值为 false，则返回第二个操作数。
- 如果两个操作数都是对象，则返回第一个操作数。
- 如果两个操作数都是 null，则返回 null。
- 如果两个操作数都是 NaN，则返回 NaN。
- 如果两个操作数都是 undefined，则返回 undefined

利用这个行为，可以避免给变量赋值 null 或 undefined。比如：
`let myObject = preferredObject || backupObject;`
在这个例子中，变量 myObject 会被赋予两个值中的一个。其中，preferredObject 变量包含首选的值，backupObject 变量包含备用的值。如果 preferredObject 不是 null，则它的值就会赋给myObject；如果 preferredObject 是 null，则 backupObject 的值就会赋给 myObject。这种模式在 ECMAScript 代码中经常用于变量赋值，

### 乘性操作符

`*`

如果 ECMAScript 不能表示乘积，则返回 Infinity 或 -Infinity
如果有任一操作数是 NaN，则返回 NaN。
如果是 Infinity 乘以 0，则返回 NaN。
如果是 Infinity 乘以非 0的有限数值，则根据第二个操作数的符号返回 Infinity -Infinity。
如果是 Infinity 乘以 Infinity，则返回 Infinity。
如果有不是数值的操作数，则先在后台用 Number()将其转换为数值，然后再应用上述规则。

`let result = 66 / 11; `

如果操作数都是数值，则执行常规的除法运算，即两个正值相除是正值，两个负值相除也是正
值，符号不同的值相除得到负值。如果ECMAScript不能表示商，则返回Infinity或-Infinity。
 如果有任一操作数是 NaN，则返回 NaN。
 如果是 Infinity 除以 Infinity，则返回 NaN。
 如果是 0 除以 0，则返回 NaN。
 如果是非 0 的有限值除以 0，则根据第一个操作数的符号返回 Infinity 或-Infinity。
 如果是 Infinity 除以任何数值，则根据第二个操作数的符号返回 Infinity 或-Infinity。
 如果有不是数值的操作数，则先在后台用 Number()函数将其转换为数值，然后再应用上述规则

取模（余数）操作符由一个百分比符号（%）表示，比如：
`let result = 26 % 5; // 等于 1`
与其他乘性操作符一样，取模操作符对特殊值也有一些特殊的行为。
 如果操作数是数值，则执行常规除法运算，返回余数。
 如果被除数是无限值，除数是有限值，则返回 NaN。
 如果被除数是有限值，除数是 0，则返回 NaN。
 如果是 Infinity 除以 Infinity，则返回 NaN。
 如果被除数是有限值，除数是无限值，则返回被除数。
 如果被除数是 0，除数不是 0，则返回 0。
 如果有不是数值的操作数，则先在后台用 Number()函数将其转换为数值，然后再应用上述规则

### 指数操作符

ECMAScript 7 新增了指数操作符，Math.pow()现在有了自己的操作符**，结果是一样的：
console.log(Math.pow(3, 2); // 9
console.log(3 ** 2); // 9
console.log(Math.pow(16, 0.5); // 4
console.log(16** 0.5); // 4
不仅如此，指数操作符也有自己的指数赋值操作符**=，该操作符执行指数运算和结果的赋值操作：
let squared = 3;
squared **= 2;
console.log(squared); // 9

### 加性操作符
`+`
 如果有任一操作数是 NaN，则返回 NaN；
 如果是 Infinity 加 Infinity，则返回 Infinity；
 如果是-Infinity 加-Infinity，则返回-Infinity；
 如果是 Infinity 加-Infinity，则返回 NaN；
 如果是+0 加+0，则返回+0；
 如果是-0 加+0，则返回+0；
 如果是-0 加-0，则返回-0。
用括号把两个数值变量括了起来，意思是让解释器先执行两个数值的加法，然后再把结
果追加给字符串。

数字和字符串的连接要使用加号，使用括号提高优先级

`-`
 如果有任一操作数是 NaN，则返回 NaN。
 如果是 Infinity 减 Infinity，则返回 NaN。
 如果是-Infinity 减-Infinity，则返回 NaN。
 如果是 Infinity 减-Infinity，则返回 Infinity。
 如果是-Infinity 减 Infinity，则返回-Infinity。
 如果是+0 减+0，则返回+0。
 如果是+0 减-0，则返回-0。
 如果是-0 减-0，则返回+0。

### 关系操作符

 如果操作数都是数值，则执行数值比较。
 如果操作数都是字符串，则逐个比较字符串中对应字符的编码。
 如果有任一操作数是数值，则将另一个操作数**转换为数值**，执行数值比较。
 如果有任一操作数是对象，则调用其 valueOf()方法，取得结果后再根据前面的规则执行比较。
如果没有 valueOf()操作符，则调用 toString()方法，取得结果后再根据前面的规则执行比较。
 如果有任一操作数是布尔值，则将其转换为数值再执行比较。

大写字母的编码都小于小写字母的编码
字母 B 的编码是 66，字母 a 的编码是 97。
要得到确实按字母顺序比较的结果，就必须把两者都转换为相同的大小写形式（全大写或全小写），
然后再比较：
`let result = "Brick".toLowerCase() < "alphabet".toLowerCase(); // false`

`let result = "23" < "3"; // true` 
不过，如果有一个操作数是数值，那么比较的结果就对了：
`let result = "23" < 3; // false`

let result = "a" < 3; // 因为"a"会转换为 NaN，所以结果是 false
因为字符"a"不能转换成任何有意义的数值，所以只能转换为 NaN。这里有一个规则，即任何关系
操作符在涉及比较 NaN 时都返回 false。这样一来，下面的例子有趣了：
let result1 = NaN < 3; // false
let result2 = NaN >= 3; // false

### 相等操作符

等于和不等于

如果一个操作数是字符串，另一个操作数是数值，则尝试将字符串转换为数值，再比较是否相等。
如果任一操作数是布尔值，则将其转换为数值再比较是否相等。false 转换为 0，true 转换为 1

null 和 undefined **相等。**
null 和 undefined 不能转换为其他类型的值再进行比较
如果有任一操作数是 NaN，则相等操作符返回 false，不相等操作符返回 true。记住：即使两个操作数都是 NaN，相等操作符也返回 false，因为按照规则，NaN 不等于 NaN。
如果两个操作数都是对象，则比较它们是不是同一个对象。如果两个操作数都指向同一个对象，
则相等操作符返回 true。否则，两者不相等

全等和不全等

虽然 null == undefined 是 true（因为这两个值类似），但 null === undefined 是
false，因为它们不是相同的数据类型。

推荐使用群等和不全等运算符

### 条件操作符

就是那个三元表达式就是条件运算符,可以当作右值使用

`variable = boolean_expression ? true_value : false_value; `

### 赋值操作符

`+=`类似的写法仅仅是简写语法，使用它们不会提升性能

### 逗号操作符

`let num1 = 1, num2 = 2, num3 = 3; `

`let num = (5, 1, 4, 8, 0); // num 的值为 0 `

## 语句

if
do-while
while ()
for () 常用
### for in 

用于枚举对象中的非符号键属性

``` js
for (const propName in window) {
 document.write(propName);
} 
```
这个例子使用 for-in 循环显示了 BOM 对象 window 的所有属性。每次执行循环，都会给变量
propName 赋予一个 window 对象的属性作为值，直到 window 的所有属性都被枚举一遍。

为了确保这个局部变量不被修改，推荐使用 const

ECMAScript 中对象的属性是无序的，因此 for-in 语句不能保证返回对象属性的顺序。换句话说，所有可枚举的属性都会返回一次，但返回的顺序可能会因浏览器而异。如果 for-in 循环要迭代的变量是 null 或 undefined，则不执行循环体。

### for of

用于遍历可迭代对象的元素

``` js
for (const el of [2,4,6,8]) {
 document.write(el);
} 
```
for-of 循环会按照可迭代对象的 next()方法产生值的顺序迭代元素。
如果尝试迭代的变量不支持迭代，则 for-of 语句会抛出错误

### for-await-of

TODO：ES2018 对 for-of 语句进行了扩展，增加了 for-await-of 循环，以支持生成期
约（promise）的异步可迭代对象



### break countinue 标签语句

标签语句用于给语句加标签，语法如下：
`label: statement`
下面是一个例子：

``` js
start: for (let i = 0; i < count; i++) {
 console.log(i);
}
```

在这个例子中，start 是一个标签，可以在后面通过 break 或 continue 语句引用。标签语句的
典型应用场景是嵌套循环。注意标签要使用描述性强的文本，而嵌套也不要太深。

### with 语句

相同作用域的情况简化代码


```js
let qs = location.search.substring(1);
let hostName = location.hostname;
let url = location.href;

``` 
上面代码中的每一行都用到了 location 对象。如果使用 with 语句，就可以少写一些代码：

```js
with(location) {
 let qs = search.substring(1);
 let hostName = hostname;
 let url = href;
} 
```
这里，with 语句用于连接 location 对象。这意味着在这个语句内部，每个变量首先会被认为是
一个局部变量。如果没有找到该局部变量，则会搜索 location 对象，看它是否有一个同名的属性。如果有，则该变量会被求值为 location 对象的属性。

严格模式**不允许**使用 with 语句，否则会抛出错误。
由于 with 语句影响性能且难于调试其中的代码，通常**不推荐**在产品代码中使用 with语句

### switch 语句

switch 语句在比较每个条件的值时会使用全等操作符，因此不会强制转换数据类
型（比如，字符串"10"不等于数值 10）。

``` js
let num = 25;
switch (true) {
 case num < 0:
 console.log("Less than 0.");
 break;
 case num >= 0 && num <= 10:
 console.log("Between 0 and 10.");
 break;
 case num > 10 && num <= 20:
 console.log("Between 10 and 20.");
 break;
 default:
 console.log("More than 20.");
}
```

上面的代码首先在外部定义了变量 num，而传给 switch 语句的参数之所以是 true，就是因为每
个条件的表达式都会返回布尔值。条件的表达式分别被求值，直到有表达式返回 true；否则，就会一直跳到 default 语句（这个例子正是如此）

## 函数基础

ECMAScript 中的函数与其他语言中的函数不一样。

 不需要指定函数的返回值，因为任何函数可以在任何时候返回任何值。
 不指定返回值的函数实际上会返回特殊值 undefined。

严格模式对函数也有一些限制：

 函数不能以 eval 或 arguments 作为名称；
 函数的参数不能叫 eval 或 arguments；
 两个命名参数不能拥有同一个名称