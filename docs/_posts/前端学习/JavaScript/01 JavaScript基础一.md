---
title: （一）JavaScript 基础语法 
date: 2020-05-28
vssue-title: js 基础语法
category: Designer
tags:
  - JavaScript
---

> 基本语法 数据类型和变量 字符串 数组 对象 条件判断 循环 Map 和 Set

<!-- more -->

为了创建 vuepress 主题，开发网页奥利奥，开发 vscode 插件，开始了解 js 了
也想成为一个创造家，而不是限于因为技术不足导致想法不能实现，这里记录一些 JavaScript 特别的地方

## 严格模式

```js 
'use strict';
```
为了避免多个文件未使用 var 构建的变量造成的错误

## 字符串

字符串是不可变的，如果对字符串的某个索引赋值，不会有任何错误，但是，也没有任何效果：
JavaScript 为字符串提供了一些常用方法，注意，调用这些方法本身不会改变原有字符串的内容，而是返回一个新字符串：

### 多行字符串

```js
`这是一个
多行
字符串`;
```

### `${}` 模板字符串

用来简化 `+` 字符串操作

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

请注意，直接给 Array 的 length 赋一个新的值会导致 Array 大小的变化：

请注意，如果通过索引赋值时，索引超过了范围，同样会引起 Array 大小的变化：

大多数其他编程语言不允许直接改变数组的大小，越界访问索引会报错。然而，JavaScript 的 Array 却不会有任何错误。在编写代码时，不建议直接修改 Array 的大小，访问索引时要确保索引不会越界。

### indexOf

与 String 类似，Array 也可以通过 indexOf() 来搜索一个指定的元素的位置：

```js
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素 10 的索引为 0
arr.indexOf(20); // 元素 20 的索引为 1
arr.indexOf(30); // 元素 30 没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为 2
```
注意了，数字 30 和字符串'30'是不同的元素。

### push 和 pop

push() 向 Array 的末尾添加若干元素，pop() 则把 Array 的最后一个元素删除掉：

```js
var arr = [1, 2];
arr.push('A', 'B'); // 返回 Array 新的长度：4
arr; // [1, 2, 'A', 'B']
arr.pop(); // pop() 返回'B'
arr; // [1, 2, 'A']
arr.pop(); arr.pop(); arr.pop(); // 连续 pop 3 次
arr; // []
arr.pop(); // 空数组继续 pop 不会报错，而是返回 undefined
arr; // []
```

### unshift 和 shift

如果要往 Array 的头部添加若干元素，使用 unshift() 方法，shift() 方法则把 Array 的第一个元素删掉：

```js
var arr = [1, 2];
arr.unshift('A', 'B'); // 返回 Array 新的长度：4
arr; // ['A', 'B', 1, 2]
arr.shift(); // 'A'
arr; // ['B', 1, 2]
arr.shift(); arr.shift(); arr.shift(); // 连续 shift 3 次
arr; // []
arr.shift(); // 空数组继续 shift 不会报错，而是返回 undefined
arr; // []
```

### sort

sort() 可以对当前 Array 进行排序，它会直接修改当前 Array 的元素位置，直接调用时，按照默认顺序排序：

```js
var arr = ['B', 'C', 'A'];
arr.sort();
arr; // ['A', 'B', 'C']
```

能否按照我们自己指定的顺序排序呢？完全可以，我们将在后面的函数中讲到。

### reverse `reverse: 逆转`

reverse() 把整个 Array 的元素给掉个个，也就是反转：

```js
var arr = ['one', 'two', 'three'];
arr.reverse(); 
arr; // ['three', 'two', 'one']
```

### slice `slice: 切片`

slice() 就是对应 String 的 substring() 版本，它截取 Array 的部分元素，然后返回一个新的 Array：

```js
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
arr.slice(0, 3); // 从索引 0 开始，到索引 3 结束，但不包括索引 3: ['A', 'B', 'C']
arr.slice(3); // 从索引 3 开始到结束：['D', 'E', 'F', 'G']
```

如果不给 slice() 传递任何参数，它就会从头到尾截取所有元素。利用这一点，我们可以很容易地复制一个 Array：

```js
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice();
aCopy; // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false
```

splice() 方法是修改 Array 的“万能方法”，它可以从指定的索引开始删除若干元素，然后再从该位置添加若干元素：

```js
var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
// 从索引 2 开始删除 3 个元素，然后再添加两个元素：
arr.splice(2, 3, 'Google', 'Facebook'); // 返回删除的元素 ['Yahoo', 'AOL', 'Excite']
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
// 只删除，不添加：
arr.splice(2, 2); // ['Google', 'Facebook']
arr; // ['Microsoft', 'Apple', 'Oracle']
// 只添加，不删除：
arr.splice(2, 0, 'Google', 'Facebook'); // 返回 [], 因为没有删除任何元素
arr; // ['Microsoft', 'Apple', 'Google', 'Facebook', 'Oracle']
```

### concat

concat() 方法把当前的 Array 和另一个 Array 连接起来，并返回一个新的 Array：

```js
var arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']
```

请注意，concat() 方法并没有修改当前 Array，而是返回了一个新的 Array。

实际上，concat() 方法可以接收任意个元素和 Array，并且自动把 Array 拆开，然后全部添加到新的 Array 里：

```js
var arr = ['A', 'B', 'C'];
arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
```

### join

join() 方法是一个非常实用的方法，它把当前 Array 的每个元素都用指定的字符串连接起来，然后返回连接后的字符串：
（首尾不包含那个连接字符）

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
    'middle-school': 'No.1 Middle School'
};
```

### 两种使用属性的方式：

含有特殊字符的属性只能使用第一种方法调用

```js
xiaohong['middle-school']; // 'No.1 Middle School'
xiaohong['name']; // '小红'
xiaohong.name; // '小红'
```

实际上 JavaScript 对象的所有属性都是字符串，不过属性对应的值可以是任意数据类型。

如果访问一个不存在的属性会返回什么呢？JavaScript 规定，访问不存在的属性不报错，而是返回 undefined：

```js
'use strict';
var xiaoming = {
    name: '小明'
};
console.log(xiaoming.name);
console.log(xiaoming.age); // undefined
```
由于 JavaScript 的对象是动态类型，你可以自由地给一个对象添加或删除属性：

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

### in hasOwnProperty

如果我们要检测 xiaoming 是否拥有某一属性，可以用 in 操作符：

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
不过要小心，如果 in 判断一个属性存在，这个属性不一定是 xiaoming 的，它可能是 xiaoming **继承**得到的：

```js
'toString' in xiaoming; // true
```

因为 toString 定义在 object 对象中，而所有对象最终都会在原型链上指向 object，所以 xiaoming 也拥有 toString 属性。

要判断一个属性是否是 xiaoming 自身拥有的，而不是继承得到的，可以用 hasOwnProperty() 方法：

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

它可以把一个对象的所有属性依次循环出来：

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
要过滤掉对象继承的属性，用 hasOwnProperty() 来实现：

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
由于 Array 也是对象，而它的每个元素的索引被视为对象的属性，因此，for ... in 循环可以直接循环出 Array 的索引：

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

初始化Map需要一个二维数组，或者直接初始化一个空Map。Map具有以下方法：

```js
var m = new Map(); // 空Map
m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);
m.has('Adam'); // 是否存在key 'Adam': true
m.get('Adam'); // 67
m.delete('Adam'); // 删除key 'Adam'
m.get('Adam'); // undefined
```

由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：

```js
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88
```
### Set

Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在Set中，没有重复的key。

要创建一个Set，需要提供一个Array作为输入，或者直接创建一个空Set：

```js
var s1 = new Set(); // 空Set
var s2 = new Set([1, 2, 3]); // 含1, 2, 3
```
重复元素在Set中自动被过滤：


```js
var s = new Set([1, 2, 3, 3, '3']);
s; // Set {1, 2, 3, "3"}
```
注意数字3和字符串'3'是不同的元素。

通过add(key)方法可以添加元素到Set中，可以重复添加，但不会有效果：

```js
s.add(4);
s; // Set {1, 2, 3, 4}
s.add(4);
s; // 仍然是 Set {1, 2, 3, 4}
```
通过delete(key)方法可以删除元素：

```js
var s = new Set([1, 2, 3]);
s; // Set {1, 2, 3}
s.delete(3);
s; // Set {1, 2}
```

### [iterable for...of](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024358748480)

`iterable :可迭代的`

for ... of循环和for ... in循环有何区别？

for ... in循环由于历史遗留问题，它遍历的实际上是对象的属性名称。一个Array数组实际上也是一个对象，它的每个元素的索引被视为一个属性。

当我们手动给Array对象添加了额外的属性后，for ... in循环将带来意想不到的意外效果：

```js
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}
```
for ... in循环将把name包括在内，但Array的length属性却不包括在内。

for ... of循环则完全修复了这些问题，它只循环集合本身的元素：

```js
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    console.log(x); // 'A', 'B', 'C'
}
```
这就是为什么要引入新的for ... of循环。

然而，更好的方式是直接使用iterable内置的forEach方法，它接收一个函数，每次迭代就自动回调该函数。以Array为例：

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

