---
title: JavaScript Note
date: 2021-04-10
tags:
    - JavaScript
---

## JS 的调用方式与执行顺序

### 使用方式

HTML 页面中的任意位置加上`<script type="module"></script>`标签即可。

常见使用方式有以下几种：

*   直接在`<script type="module"></script>`标签内写 JS 代码。
*   直接引入文件：`<script type="module" src="/static/js/index.js"></script>`。
*   将所需的代码通过`import`关键字引入到当前作用域。

例如：

`/static/js/index.js`文件中的内容为：

```javascript
let name = "fengwei2002";

function print() {
    console.log("Hello World!");
}

export {
    name,
    print
}
```

`<script type="module"></script>`中的内容为：

```xml
<script type="module">
    import { name, print } from "/static/js/index.js";

    console.log(name);
    print();
</script>
```

### 执行顺序

1.  类似于 HTML 与 CSS，按从上到下的顺序执行；
2.  事件驱动执行；

### HTML, CSS, JavaScript 三者之间的关系

1.  CSS 控制 HTML
2.  JavaScript 控制 HTML 与 CSS
3.  为了方便开发与维护，尽量按照上述顺序写代码。例如：不要在 HTML 中调用 JavaScript 中的函数。 

## 变量与运算符

### `let` 与 `const`

用来声明变量，作用范围为当前作用域。

*   `let` 用来定义变量；
*   `const` 用来定义常量；

例如：

```cs
let s = "fengwei2002", x = 5;

let d = {
    name: "fengwei2002",
    age: 18,
}

const n = 100;
```

### 变量类型

*   `number`：数值变量，例如`1`, `2.5`
*   `string`：字符串，例如`"fengwei2002"`, `'konng0120'`，单引号与双引号均可。字符串中的每个字符为只读类型。
*   `boolean`：布尔值，例如 `true`, `false`
*   `object`：对象，类似于 `C++` 中的指针，例如 `[1, 2, 3]`，`{name: "fengwei2002", age: 18}`，`null`
*   `undefined`：未定义的变量

类似于 Python，JavaScript 中的变量类型可以动态变化。

### 运算符

与`C++`、`Python`、`Java` 类似，不同点：

*   `**` 表示乘方
*   等于与不等于用 `===` 和 `!==`

## 输入与输出

*   从 HTML 与用户的交互中输入信息，例如通过 `input`、`textarea` 等标签获取用户的键盘输入，通过 `click`、`hover` 等事件获取用户的鼠标输入。
*   通过 `Ajax` 与 `WebSocket` 从服务器端获取输入
*   标准输入输出

``` js
let buf = "" 

process.stdin.on("readable", function() {
    let chunk = process.stdin.read() 
    if (chunk) {
        buf += chunk.toString() 
    }
})

process.stdin.on("end", function() {
    let [a, b, c, d] = buf.split('\n').map(x => {
        return parseInt(x)
    }) 

    console.log(`formatout: = ${a * b - c * d}`)
})
```

*   调试用 `console.log`，会将信息输出到浏览器控制台
*   改变当前页面的 HTML 与 CSS
*   通过 `Ajax` 与 `WebSocket` 将结果返回到服务器

### 格式化字符串

*   字符串中填入数值：

```javascript
let name = 'fengwei2002', age = 18;
let s = `My name is ${name}, I'm ${age} years old.`;
```

*   定义多行字符串：

```javascript
let s = 
`<div>
    <h2>标题</h2>
    <p>段落</p>
/div>`
```

*   保留两位小数如何输出

```javascript
let x = 1.234567;
let s = `${x.toFixed(2)}`;
```

## 判断 

JavaScript 中的`if-else`语句与`C++`、`Java`中类似。

例如：

```javascript
let score = 90;
if (score >= 85) {
    console.log("A");
} else if (score >= 70) {
    console.log("B");
} else if (score >= 60) {
    console.log("C");
} else {
    console.log("D");
}
```

JavaScript 中的逻辑运算符也与`C++`、`Java`中类似：

*   `&&`表示与
*   `||`表示或
*   `!`表示非

## 循环

JavaScript 中的循环语句与`C++`中类似，也包含`for`、`while`、`do while`循环。

#### `for` 循环

```javascript
for (let i = 0; i < 10; i++) {
    console.log(i);
}
```

枚举对象或数组时可以使用：

*   `for-in` 循环，可以枚举数组中的下标，以及对象中的 `key`
*   `for-of` 循环，可以枚举数组中的值，以及对象中的 `value`

#### `while`循环

```javascript
let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}
```

#### `do while` 循环

```javascript
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 10);
```

## 对象

英文名称：`Object`。  
类似于 `C++` 中的 `map`，由 `key:value` 对构成。

*   `value` 可以是变量、数组、对象、函数等。
*   函数定义中的 `this` 用来引用该函数的“拥有者”。

例如：

```javascript
let person = {
    name: "fengwei2002",
    age: 18,
    money: 0,
    add_money: function (x) {
        this.money += x;
    }
}
```

对象属性与函数的调用方式：

*   `person.name`、`person.add_money()`
*   `person["name"]`、`person["add_money"]()` 

## 数组

数组是一种特殊的对象。  
类似于 `C++` 中的数组，但是数组中的元素类型可以不同。

*   数组中的元素可以是变量、数组、对象、函数。

例如：

```javascript
let a = [1, 2, "a", "fengwei2002"];

let b = [
    1,  // 变量
    "fengwei2002",  // 变量
    ['a', 'b', 3],  // 数组
    function () {  // 函数
        console.log("Hello World");
    },
    { name: "fengwei2002", age: 18 }  // 对象
];
```

### 访问数组中的元素

通过下标。

例如：

```javascript
a[0] = 1; // 访问数组 a[] 的第 0 个元素
console.log(a[0]);
```

### 数组的常用属性和函数

*   属性 `length` ：返回数组长度。注意`length`是属性，不是函数，因此调用的时候不要加 `()`
*   函数 `push()` ：向数组末尾添加元素
*   函数 `pop()`：删除数组末尾的元素
*   函数 `splice(a, b)`：删除从 `a` 开始的 `b` 个元素
*   函数 `sort()`：将整个数组从小到大排序
    *   自定义比较函数：`array.sort(cmp)`，函数 `cmp` 输入两个需要比较的元素，返回一个实数，负数表示第一个参数小于第二个参数，0 表示相等，正数表示大于。

## 函数

函数是用对象来实现的。  函数也 `C++` 中的函数类似。

### 定义方式

```javascript
function add(a, b) {
    return a + b;
}

let add = function (a, b) {
    return a + b;
}

let add = (a, b) => {
    return a + b;
}
```

### 返回值

如果未定义返回值，则返回`undefined`。

## 类

与`C++`中的`Class`类似。但是不存在私有成员。

*   `this`指向类的实例。

### 定义

```javascript
class Point {
    constructor(x, y) {  // 构造函数
        this.x = x;  // 成员变量
        this.y = y;

        this.init();
    }

    init() {
        this.sum = this.x + this.y;  // 成员变量可以在任意的成员函数中定义
    }

    toString() {  // 成员函数
        return '(' + this.x + ', ' + this.y + ')';
    }
}

let p = new Point(3, 4);
console.log(p.toString());
```

### 继承

```javascript
class Point {
    constructor(x, y) {
        this.x = x
        thix.y = y // 成员变量
    }

    init() { // 成员函数
        this.sum = this.x + this.y
    }

    toString() {
        return `${this.x}, ${this.y}, ${this.sum}`
    }
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y) // 调用基类的构造函数  
        this.color = color  
        // 必须先调用 super 才可以使用 this 
    }

    toString() {
        return this.color + ' ' + super.toString()   
    } // 调用父类的成员函数。super 指向父类的实例
}
 

let main = function() {
    let p = new Point(3, 4) 
}

export {
    main
}
```

### 注意：

*   `super`这个关键字，既可以当作函数使用，也可以当作对象使用。
    *   作为函数调用时，代表父类的构造函数，且只能用在子类的构造函数之中。
    *   `super`作为对象时，指向父类的原型对象。
*   在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字。
*   成员重名时，子类的成员会覆盖父类的成员。类似于`C++`中的多态。

### 静态方法

在成员函数前添加`static`关键字即可。静态方法不会被类的实例继承，只能通过类来调用。例如：

```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }

    static print_class_name() {
        console.log("Point");
    }
}

let p = new Point(1, 2);
Point.print_class_name();
p.print_class_name();  // 会报错
```

static function and static variable 可以被继承，也就是继承类中也默认拥有属于继承类的 static function and static variable

### 静态变量

在 ES6 中，只能通过`class.propname`定义和访问。例如：

```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        Point.cnt++
    } 
    init() {
        this.sum = this.x + this.y
    }
    static print_class_name() {
        console.log("Point")
    }
}
Point.cnt = 0
// static variable (not function)

let main = function() {
    Point.print_class_name()
    // static function
    for (let i = 0; i < 3; i++) {
        new Point(1, 1) 
    }
    console.log(Point.cnt) // 3 
}
```

## 事件

JavaScript 的代码一般通过事件触发。

可以通过 `addEventListener` 函数为元素绑定事件的触发函数。

常见的触发函数有：

### 鼠标事件

*   `click`：鼠标左键点击
*   `dblclick`：鼠标左键双击
*   `contextmenu`：鼠标右键点击
*   `mousedown`：鼠标按下，包括左键、滚轮、右键
    *   `event.button`：0 表示左键，1 表示中键，2 表示右键
*   `mouseup`：鼠标弹起，包括左键、滚轮、右键
    *   `event.button`：0 表示左键，1 表示中键，2 表示右键

``` javascript
let div = document.querySelector('div');

let main = function() {
    div.addEventListener('click', function() {
        console.log(event.type);
    })
}
main()
```

### 键盘

*   `keydown`：某个键是否被按住，事件会连续触发, 长按连续触发
    *   `event.code`：返回按的是哪个键
    *   `event.altKey`、`event.ctrlKey`、`event.shiftKey`分别表示是否同时按下了 alt、ctrl、shift 键。
*   `keyup`：某个按键是否被释放
    *   `event`常用属性同上
*   `keypress`：紧跟在 `keydown` 事件后触发，只有按下字符键时触发。适用于判定用户输入的字符。`esc` 等功能键不触发
    *   `event`常用属性同上

`keydown`、`keyup`、`keypress` 的关系类似于鼠标的 `mousedown`、`mouseup`、`click`

### 表单

*   `focus`：聚焦某个元素
*   `blur`：取消聚焦某个元素
*   `change`：某个元素的内容发生了改变

### 窗口

需要作用到 `window` 元素上。

*   `resize`：当窗口大小放生变化
*   `scroll`：滚动指定的元素
*   `load`：当元素被加载完成


``` javascript
let main = function() {
    window.addEventListener('scroll', function(e) {
        console.log('e.type')
    })
}
main()
```