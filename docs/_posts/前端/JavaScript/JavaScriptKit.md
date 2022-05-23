---
title: JavaScript Kit
date: 2022-05-23
tags:
    - JavaScript
---

## jQuery

#### 使用方式

*   在`<head>`元素中添加：  
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
*   按 [jQuery 官网](https://jquery.com/download/) 提示下载

#### 选择器

`$(selector)`，例如：

```javascript
$('div');
$('.big-div');
$('div > p')
```

`selector`类似于 CSS 选择器。

* * *

#### 事件

`$(selector).on(event, func)`绑定事件，例如：

```javascript
$('div').on('click', function (e) {
    console.log("click div");
})
```

`$(selector).off(event, func)`删除事件，例如：

```javascript
$('div').on('click', function (e) {
    console.log("click div");

    $('div').off('click');
});
```

当存在多个相同类型的事件触发函数时，可以通过`click.name`来区分，例如：

```javascript
$('div').on('click.first', function (e) {
    console.log("click div");

    $('div').off('click.first');
});
```

在事件触发的函数中的`return false`等价于同时执行：

*   `e.stopPropagation()`：阻止事件向上传递
*   `e.preventDefault()`：阻止事件的默认行为

#### 元素的隐藏、展现

*   `$A.hide()`：隐藏，可以添加参数，表示消失时间
*   `$A.show()`：展现，可以添加参数，表示出现时间
*   `$A.fadeOut()`：慢慢消失，可以添加参数，表示消失时间
*   `$A.fadeIn()`：慢慢出现，可以添加参数，表示出现时间

#### 元素的添加、删除

*   `$('<div class="mydiv"><span>Hello World</span></div>')`：构造一个`jQuery`对象
*   `$A.append($B)`：将`$B`添加到`$A`的末尾
*   `$A.prepend($B)`：将`$B`添加到`$A`的开头
*   `$A.remove()`：删除元素`$A`
*   `$A.empty()`：清空元素`$A`的所有儿子

#### 对类的操作

*   `$A.addClass(class_name)`：添加某个类
*   `$A.removeClass(class_name)`：删除某个类
*   `$A.hasClass(class_name)`：判断某个类是否存在

#### 对 CSS 的操作

*   `$("div").css("background-color")`：获取某个 CSS 的属性
*   `$("div").css("background-color","yellow")`：设置某个 CSS 的属性
*   同时设置多个 CSS 的属性：

```javascript
$('div').css({
    width: "200px",
    height: "200px",
    "background-color": "orange",
});
```

#### 对标签属性的操作

`$('div').attr('id')`：获取属性  
`$('div').attr('id', 'ID')`：设置属性

#### 对 HTML 内容、文本的操作

不需要背每个标签该用哪种，用到的时候 Google 或者百度即可。

`$A.html()`：获取、修改 HTML 内容  
`$A.text()`：获取、修改文本信息  
`$A.val()`：获取、修改文本的值

#### 查找

*   `$(selector).parent(filter)`：查找父元素
*   `$(selector).parents(filter)`：查找所有祖先元素
*   `$(selector).children(filter)`：在所有子元素中查找
*   `$(selector).find(filter)`：在所有后代元素中查找

#### `ajax`

GET 方法：

```javascript
$.ajax({
    url: url,
    type: "GET",
    data: {
    },
    dataType: "json",
    success: function (resp) {

    },
});
```

POST 方法：

```javascript
$.ajax({
    url: url,
    type: "POST",
    data: {
    },
    dataType: "json",
    success: function (resp) {

    },
});
```

## setTimeout 与 setInterval

#### `setTimeout(func, delay)`

`delay`毫秒后，执行函数`func()`。

#### `clearTimeout()`

关闭定时器，例如：

```javascript
let timeout_id = setTimeout(() => {
    console.log("Hello World!")
}, 2000);  // 2 秒后在控制台输出"Hello World"

clearTimeout(timeout_id);  // 清除定时器
```

#### `setInterval(func, delay)`

每隔`delay`毫秒，执行一次函数`func()`。  
第一次在第`delay`毫秒后执行。

#### `clearInterval()`

关闭周期执行的函数，例如：

```javascript
let interval_id = setInterval(() => {
    console.log("Hello World!")
}, 2000);  // 每隔 2 秒，输出一次"Hello World"

clearTimeout(interval_id);  // 清除周期执行的函数
```

## requestAnimationFrame

#### `requestAnimationFrame(func)`

该函数会在下次浏览器刷新页面之前执行一次，通常会用递归写法使其每秒执行 60 次`func`函数。调用时会传入一个参数，表示函数执行的时间戳，单位为毫秒。

例如：

```javascript
let step = (timestamp) => {  // 每帧将 div 的宽度增加 1 像素
    let div = document.querySelector('div');
    div.style.width = div.clientWidth + 1 + 'px';
    requestAnimationFrame(step);
};

requestAnimationFrame(step);
```

与`setTimeout`和`setInterval`的区别：

*   `requestAnimationFrame`渲染动画的效果更好，性能更加。  
    该函数可以保证每两次调用之间的时间间隔相同，但`setTimeout`与`setInterval`不能保证这点。`setTmeout`两次调用之间的间隔包含回调函数的执行时间；`setInterval`只能保证按固定时间间隔将回调函数压入栈中，但具体的执行时间间隔仍然受回调函数的执行时间影响。
*   当页面在后台时，因为页面不再渲染，因此`requestAnimationFrame`不再执行。但`setTimeout`与`setInterval`函数会继续执行。

## Map 与 Set

#### `Map`

Map 对象保存键值对。

*   用`for...of`或者`forEach`可以按插入顺序遍历。
*   键值可以为任意值，包括函数、对象或任意基本类型。

常用 API：

*   `set(key, value)`：插入键值对，如果`key`已存在，则会覆盖原有的`value`
*   `get(key)`：查找关键字，如果不存在，返回`undefined`
*   `size`：返回键值对数量
*   `has(key)`：返回是否包含关键字`key`
*   `delete(key)`：删除关键字`key`
*   `clear()`：删除所有元素

#### `Set`

Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

*   用`for...of`或者`forEach`可以按插入顺序遍历。

常用 API：

*   `add()`：添加元素
*   `has()`：返回是否包含某个元素
*   `size`：返回元素数量
*   `delete()`：删除某个元素
*   `clear()`：删除所有元素

## localStorage

可以在用户的浏览器上存储键值对。

常用 API：

*   `setItem(key, value)`：插入
*   `getItem(key)`：查找
*   `removeItem(key)`：删除
*   `clear()`：清空

## JSON

JSON 对象用于序列化对象、数组、数值、字符串、布尔值和`null`。

常用 API：

*   `JSON.parse()`：将字符串解析成对象
*   `JSON.stringify()`：将对象转化为字符串

## 日期

返回值为整数的 API，数值为 1970-1-1 00:00:00 UTC（世界标准时间）到某个时刻所经过的毫秒数：

*   `Date.now()`：返回现在时刻。
*   `Date.parse("2022-04-15T15:30:00.000+08:00")`：返回北京时间 2022 年 4 月 15 日 15:30:00 的时刻。

与`Date`对象的实例相关的 API：

*   `new Date()`：返回现在时刻。
*   `new Date("2022-04-15T15:30:00.000+08:00")`：返回北京时间 2022 年 4 月 15 日 15:30:00 的时刻。
*   两个`Date`对象实例的差值为毫秒数
*   `getDay()`：返回星期，0 表示星期日，1-6 表示星期一至星期六
*   `getDate()`：返回日，数值为 1-31
*   `getMonth()`：返回月，数值为 0-11
*   `getFullYear()`：返回年份
*   `getHours()`：返回小时
*   `getMinutes()`：返回分钟
*   `getSeconds()`：返回秒
*   `getMilliseconds()`：返回毫秒

## WebSocket

与服务器建立全双工连接。

常用 API：

*   `new WebSocket('ws://localhost:8080');`：建立 ws 连接。
*   `send()`：向服务器端发送一个字符串。一般用 JSON 将传入的对象序列化为字符串。
*   `onopen`：类似于`onclick`，当连接建立时触发。
*   `onmessage`：当从服务器端接收到消息时触发。
*   `close()`：关闭连接。
*   `onclose`：当连接关闭后触发。

## window

*   `window.open("https://github.com/fengwei2002")`在新标签栏中打开页面。
*   `location.reload()`刷新页面。
*   `location.href = "https://github.com/fengwei2002"`：在当前标签栏中打开页面。

## canvas

[canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

常用 canvas 片段：[github.com/fengwei2002/snippets/canvas/](https://github.com/fengwei2002/snippets/tree/main/canvas)