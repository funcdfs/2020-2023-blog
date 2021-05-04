---
title: ES6-RegExp 正则表达式
date: 2021-05-03
tags:
  - ES6
  - JavaScript
---

久闻正则表达式的大名，学栈的时候遇到的括号匹配那里好像提到过
还有就是 leetcode 中的题目有遇到过正则表达式的相关问题，之前一直觉得是很厉害的一种东西，没有接触

## 介绍

ECMAScript 通过 RegExp 类型支持正则表达式。

字符串是编程时涉及到的最多的一种数据结构，对字符串进行操作的需求几乎无处不在。比如判断一个字符串是否是合法的 Email 地址，虽然可以编程提取@前后的子串，再分别判断是否是单词和域名，但这样做不但麻烦，而且代码难以复用。

正则表达式是一种用来匹配字符串的强有力的武器。它的设计思想是用一种描述性的语言来给字符串定义一个规则，凡是符合规则的字符串，我们就认为它“匹配”了，否则，该字符串就是不合法的。

所以我们判断一个字符串是否是合法的 Email 的方法是：
- 创建一个匹配 Email 的正则表达式；
- 用该正则表达式去匹配用户的输入来判断是否合法。

因为正则表达式也是用字符串表示的，所以，我们要首先了解如何用字符来描述字符。

### 用字符描述字符

在正则表达式中，如果直接给出字符，就是精确匹配。用`\d`可以匹配一个数字，`\w`可以匹配一个字母或数字，所以：
- `'00\d'`可以匹配`'007'`，但无法匹配`'00A'`；
- `'\d\d\d'`可以匹配`'010'`；
- `'\w\w'`可以匹配`'js'`； （d 表示一个数字，w 表示一个字母）

`.`可以匹配任意字符，所以：
- `'js.'`可以匹配`'jsp'`、`'jss'`、`'js!'`等等。

要匹配变长的字符，在正则表达式中，用`*`表示任意个字符（包括 0 个），用`+`表示至少一个字符，用`?`表示 0 个或 1 个字符，用`{n}`表示 n 个字符，用`{n,m}`表示 n-m 个字符：

看一个复杂的例子：`\d{3}\s+\d{3,8}`。
我们来从左到右解读一下：
- `\d{3}`表示匹配 3 个数字，例如`'010'`；
- `\s`可以匹配一个空格（也包括 Tab 等空白符），所以`\s+`表示至少有一个空格，例如匹配`' '，'\t\t'`等；$1\twoheadrightarrow\infty$

- `\d{3,8}`表示 3-8 个数字，例如`'1234567'`

综合起来，上面的正则表达式可以匹配以任意个空格隔开的带区号的电话号码。

如果要匹配'`010-12345'`这样的号码呢？由于'-'是特殊字符，在正则表达式中，要用`'\'`转义，所以，上面的正则是`\d{3}\-\d{3,8}`。

<!-- 但是，仍然无法匹配'010 - 12345'，因为带有空格。所以我们需要更复杂的匹配方式。 -->

### 进阶

要做更精确地匹配，可以用`[]`表示范围，比如：

- `[0-9a-zA-Z\_]` 可以匹配一个数字、字母或者下划线；（中间那个小横线就是内层的范围）
- `[0-9a-zA-Z\_]+` 可以匹配至少由一个数字、字母或者下划线组成的字符串，比如`'a100'`，`'0_Z'`，`'js2021'`等等；
- `[a-zA-Z\_\$][0-9a-zA-Z\_\$]*`可以匹配由字母或下划线、`$`开头，后接任意个由一个数字、字母或者下划线、$组成的字符串，也就是 JavaScript 允许的变量名；
- `[a-zA-Z\_\$][0-9a-zA-Z\_\$]{0, 19}`更精确地限制了变量的长度是 1-20 个字符（前面 1 个字符+后面最多 19 个字符）。

`A|B`可以匹配 A 或 B，所以`(J|j)ava(S|s)cript`可以匹配`'JavaScript'`、`'Javascript'`、`'javaScript'`或者`'javascript'`。
`^`表示行的开头，`^\d`表示必须以数字开头。
`$`表示行的结束，`\d$`表示必须以数字结束。

你可能注意到了，js 也可以匹配`'jsp'`，但是加上`^js$`就变成了整行匹配，就只能匹配`'js'`了。（规定了具体的头尾字符）

## RegExp

这个名字怪怪的，可能还会拼错，所以专门查了一下：

::: note [wikipedia](https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F)
正则表达式（英语：Regular Expression，常简写为 regex、regexp 或 RE），又称正则表示式、正则表示法、规则表达式、常规表示法，是计算机科学的一个概念。正则表达式使用单个字符串来描述、匹配一系列匹配某个句法规则的字符串。在很多文本编辑器里，正则表达式通常被用来检索、替换那些匹配某个模式的文本。
:::

JavaScript 有两种方式创建一个正则表达式：

第一种方式是直接通过`/正则表达式/`写出来，第二种方式是通过`new RegExp('正则表达式')`创建一个`RegExp`对象。
两种写法是一样的：

### 创建一个 regexp

`let expression = /pattern/flags; `

``` js
var re1 = /ABC\-001/;
var re2 = new RegExp('ABC\\-001');

re1; // /ABC\-001/
re2; // /ABC\-001/
```
`( [ { \ ^ $ | ) ] } ? * + . `
元字符在正则表达式中都有一种或多种特殊功能，所以要匹配上面这些字符本身，就必须使用反斜
杠来转义。（markdown 中数学符号，在回车键上面）
（单个`\`字符在正则表达式中是`\\`，在正则表达式要表示这个单个字符则要写成`\\\\`）
例如：

``` js
let pattern1 = /\[bc\]at/i; 
let pattern2 = new RegExp("\\[bc\\]at", "i"); 
console.log(pattern1===pattern2); //false
console.log(pattern1.source==pattern2.source); //true
```

### 切分字符串

用正则表达式切分字符串比用固定的字符**更灵活**会经常用到，请看正常的切分代码：
[String.prototype.split()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)  proto: 原型机，样机
`'a b   c'.split(' '); // ['a', 'b', '', '', 'c']`
嗯，无法识别连续的空格，用正则表达式试试：

`'a b   c'.split(/\s+/); // ['a', 'b', 'c']`（加号代表至少一个）
无论多少个空格都可以正常分割。加入，试试：

`'a,b, c  d'.split(/[\s\,]+/); // ['a', 'b', 'c', 'd']`
再加入；试试：

`'a,b;; c  d'.split(/[\s\,\;]+/); // ['a', 'b', 'c', 'd']`
如果用户输入了一组标签，下次记得用正则表达式来把不规范的输入转化成正确的数组。

### 分组

除了简单地判断是否匹配之外，正则表达式还有提取子串的强大功能。用`()`表示的就是要提取的分组（Group）。比如：

`^(\d{3})-(\d{3,8})$`分别定义了两个组，可以直接从匹配的字符串中提取出区号和本地号码：
（以 3 个数字开头，- 以 3 到 8 个数字结尾）

``` js
var re = /^(\d{3})-(\d{3,8})$/;
re.exec('010-12345'); // ['010-12345', '010', '12345']
re.exec('010 12345'); // null
```

如果正则表达式中定义了组，就可以在 RegExp 对象上用`exec()`方法**提取出子串**来。

exec() 方法在匹配成功后，会返回一个 Array，第一个元素是正则表达式匹配到的整个字符串，后面的字符串表示匹配成功的子串。

exec() 方法在匹配失败时返回 null。

提取子串非常有用。来看一个更凶残的例子：

``` js
var re = /^(0[0-9]|1[0-9]|2[0-3]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])\:(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|[0-9])$/;
re.exec('19:05:30'); // ['19:05:30', '19', '05', '30']
```
这个正则表达式可以直接识别合法的时间。但是有些时候，用正则表达式也无法做到完全验证，比如识别日期：

``` js
var re = /^(0[1-9]|1[0-2]|[0-9])-(0[1-9]|1[0-9]|2[0-9]|3[0-1]|[0-9])$/;
```
对于`'2-30'`，`'4-31'`这样的非法日期，用正则还是识别不了，或者说写出来非常困难，这时就需要程序配合识别了。

### 贪婪匹配

需要特别指出的是，正则匹配默认是贪婪匹配，也就是匹配尽可能多的字符。举例如下，匹配出数字后面的 0：

`var re = /^(\d+)(0*)$/;`
`re.exec('102300'); // ['102300', '102300', '']`
由于`\d+`采用贪婪匹配，直接把后面的 0 全部匹配了，结果`0*`只能匹配空字符串了。

必须让、d+采用非贪婪匹配（也就是尽可能少匹配），才能把后面的 0 匹配出来，加个`?`就可以让`\d+`采用非贪婪匹配：

`var re = /^(\d+?)(0*)$/;`
`re.exec('102300'); // ['102300', '1023', '00']`

### 全局搜索

JavaScript 的正则表达式还有几个特殊的标志，最常用的是 g，表示全局匹配：

``` js
var r1 = /test/g;
// 等价于：
var r2 = new RegExp('test', 'g');
```

全局匹配可以多次执行 `exec()` 方法来搜索一个匹配的字符串。当我们指定 g 标志后，每次运行`exec()`，正则表达式本身会更新 lastIndex 属性，表示上次匹配到的最后索引：

``` js
var s = 'JavaScript, VBScript, JScript and ECMAScript';
var re=/[a-zA-Z]+Script/g;

// 使用全局匹配：
re.exec(s); // ['JavaScript']
re.lastIndex; // 10

re.exec(s); // ['VBScript']
re.lastIndex; // 20

re.exec(s); // ['JScript']
re.lastIndex; // 29

re.exec(s); // ['ECMAScript']
re.lastIndex; // 44

re.exec(s); // null，直到结束仍没有匹配到 匹配不到的时候输出 lastIndex 的值是 0
```

全局匹配类似搜索，因此不能使用`/^...$/`（这个一次遍历到了字符串的末尾），那样只会最多匹配一次。

表示匹配模式的标记：（可以结合使用：`/.at/gi` 匹配所有以"at"结尾的三字符组合，忽略大小写）
![表示匹配模式的标记](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210501170929-2021-05-01.png)

## 小结

正则表达式非常强大，要讲清楚正则的所有内容，可以写一本厚厚的书了。所以熟悉基本知识，用到可以再查

## RegExp 实例属性

每个 RegExp 实例都有下列属性，提供有关模式的各方面信息。

 global：布尔值，表示是否设置了 g 标记。
 ignoreCase：布尔值，表示是否设置了 i 标记。
 unicode：布尔值，表示是否设置了 u 标记。
 sticky：布尔值，表示是否设置了 y 标记。
 lastIndex：整数，表示在源字符串中下一次搜索的开始位置，默认始终从 0 开始。当设置 g 之后就是递增的
 multiline：布尔值，表示是否设置了 m 标记。
 dotAll：布尔值，表示是否设置了 s 标记。
 source：正则表达式的字面量字符串（不是传给构造函数的模式字符串），没有开头和结尾的斜杠。
 flags：正则表达式的标记字符串。始终以字面量而非传入构造函数的字符串模式形式返回（没有前后斜杠）。

通过这些属性可以全面了解正则表达式的信息，不过实际开发中用得并不多，因为模式声明中包含
这些信息。

``` js
let pattern1 = /\[bc\]at/i;

console.log(pattern1.global); // false
console.log(pattern1.ignoreCase); // true
console.log(pattern1.multiline); // false
console.log(pattern1.lastIndex); // 0
console.log(pattern1.source); // "\[bc\]at"
console.log(pattern1.flags); // "i"

let pattern2 = new RegExp("\\[bc\\]at", "i");

console.log(pattern2.global); // false
console.log(pattern2.ignoreCase); // true
console.log(pattern2.multiline); // false
console.log(pattern2.lastIndex); // 0
console.log(pattern2.source); // "\[bc\]at"
console.log(pattern2.flags); // "i" 
```

注意，虽然第一个模式是通过字面量创建的，第二个模式是通过 RegExp 构造函数创建的，但两个模式的 source 和 flags 属性是相同的。source 和 flags 属性返回的是规范化之后可以在字面量中使用的形式。

## RegExp 实例方法

RegExp 实例的主要方法是 `exec()`，主要用于配合捕获组使用。这个方法只接收一个参数，即要应用模式的字符串。如果找到了匹配项，则返回包含第一个匹配信息的数组；如果没找到匹配项，则返回 null。返回的数组虽然是 Array 的实例，但包含两个额外的属性：index 和 input。index 是符串中匹配模式的起始位置，input 是要查找的字符串。这个数组的第一个元素是匹配整个模式的字符串，其他元素是与表达式中的捕获组匹配的字符串。如果模式中没有捕获组，则数组只包含一个元素。

正则表达式的另一个方法是 `test()`，接收一个字符串参数。如果输入的文本与模式匹配，则参数
返回 true，否则返回 false。这个方法适用于只想测试模式是否匹配，而不需要实际匹配内容的情况。
`test()`经常用在 if 语句中：

``` js
let text = "000-00-0000";
let pattern = /\d{3}-\d{2}-\d{4}/;
if (pattern.test(text)) {
 console.log("The pattern was matched.");
} 
```

无论正则表达式是怎么创建的，继承的方法 toLocaleString()和 toString()都返回正则表达
式的字面量表示。比如：

``` js
let pattern = new RegExp("\\[bc\\]at", "gi");
console.log(pattern.toString()); // /\[bc\]at/gi
console.log(pattern.toLocaleString()); // /\[bc\]at/gi
```

这里的模式是通过 RegExp 构造函数创建的，但 `toLocaleString()`和 `toString()` 返回的都是其字面量的形式。

注意 正则表达式的 valueOf()方法返回正则表达式本身。（可操作的字面量）

## RegExp 构造函数属性

RegExp 构造函数本身也有几个属性。（在其他语言中，这种属性被称为静态属性。）这些属性适用于作用域中的所有正则表达式，而且会根据最后执行的正则表达式操作而变化。

这些属性还有一个特点，就是可以通过两种不同的方式访问它们。换句话说，每个属性都有一个全名和一个简写。

![20210503211026-2021-05-03](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210503211026-2021-05-03.png)


``` js
let text = "this has been a short summer";
let pattern = /(.)hort/g;
if (pattern.test(text)) {
 console.log(RegExp.input); // this has been a short summer
 console.log(RegExp.leftContext); // this has been a
 console.log(RegExp.rightContext); // summer
 console.log(RegExp.lastMatch); // short
 console.log(RegExp.lastParen); // s
 //这些属性名也可以替换成简写形式，只不过要使用中括号语法来访问，
 //如下面的例子所示，因为大多数简写形式都不是合法的 ECMAScript 标识符
 console.log(RegExp.$_); // this has been a short summer
 console.log(RegExp["$`"]); // this has been a
 console.log(RegExp["$'"]); // summer
 console.log(RegExp["$&"]); // short
 console.log(RegExp["$+"]); // s 
}  
```

RegExp 还有其他几个构造函数属性，可以存储最多 9 个捕获组的匹配项。这些属性通过 `RegExp.$1~RegExp.$9` 来访问，分别包含第 1~9 个捕获组的匹配项。在调用 `exec()`或 `test()`时，这些属性就会被填充，然后就可以像下面这样使用它们：

``` js
let text = "this has been a short summer";
let pattern = /(..)or(.)/g;
if (pattern.test(text)) {
 console.log(RegExp.$1); // sh
 console.log(RegExp.$2); // t
} 
```

在这个例子中，模式包含两个捕获组。调用 test()搜索字符串之后，因为找到了匹配项所以返回 true，而且可以打印出通过 RegExp 构造函数的`$1` 和`$2` 属性取得的两个捕获组匹配的内容。

注意 RegExp 构造函数的所有属性都没有任何 Web 标准出处，因此不要在生产环境中使用它们。所以了解即可