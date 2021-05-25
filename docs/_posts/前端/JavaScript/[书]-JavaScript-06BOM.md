---
title: 【书】JavaScript BOM
date: 2021-05-18
tags:
    - JavaScript 高级程序设计（第四版）
    - JavaScript
---

因为 window 对象被复用为 ECMAScript 的 Global 对象，所以通过 var 声明的所有全局变量和函数都会变成 window 对象的属性和方法。（通过。来引出）

## Windows 对象

### 窗口

把窗口移动到坐标位置：
window.moveTo(0,0); 
window.moveBy(0, 100); 

innerWidth、innerHeight、outerWidth 和 outerHeight。outerWidth 和 outerHeight 返回浏览器窗口自身的大小（不管是在最外层 window 上使用，还是在窗格`<frame`>中使用）。innerWidth 和 innerHeight 返回浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）

在移动设备上，window.innerWidth 和 window.innerHeight 返回视口的大小，也就是屏幕上页面可视区域的大小。

可以使用 resizeTo() 和 resizeBy() 方法调整窗口大小。这两个方法都接收两个参数，resizeTo() 接收新的宽度和高度值，而 resizeBy() 接收宽度和高度各**要增减多少**

``` js
// 缩放到 100×100
window.resizeTo(100, 100);
// 缩放到 200×150
window.resizeBy(100, 50);
// 缩放到 300×300
window.resizeTo(300, 300);
```

### 滚动

可以使用 scroll()、scrollTo() 和 scrollBy() 方法滚动页面。这 3 个方法都接收表示相对视口距离的 x 和 y 坐标，这两个参数在前两个方法中表示要滚动到的坐标，在最后一个方法中表示滚动的距离。

先左右后上下：
``` js
// 相对于当前视口向下滚动 100 像素
window.scrollBy(0, 100);
// 相对于当前视口向右滚动 40 像素
window.scrollBy(40, 0);
// 滚动到页面左上角
window.scrollTo(0, 0);
// 滚动到距离屏幕左边及顶边各 100 像素的位置
window.scrollTo(100, 100); 
```

scrollTo 可以添加参数

``` js
// 正常滚动
window.scrollTo({
    left: 100,
    top: 100,
    behavior: 'auto'
});
// 平滑滚动
window.scrollTo({
    left: 100,
    top: 100,
    behavior: 'smooth'
});
```

### open

`window.open()` 方法可以用于导航到指定 URL，也可以用于打开新浏览器窗口。这个方法接收 4 个参数：**要加载的 URL**、**目标窗口**、**特性字符串**和**表示新窗口在浏览器历史记录中是否替代当前加载页面**的布尔值。

特性字符串：
特性字符串是一个逗号分隔的设置字符串，用于指定新窗口包含的特性。
![20210518173622-2021-05-18](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210518173622-2021-05-18.png)
![20210518173641-2021-05-18](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210518173641-2021-05-18.png)
这些设置需要以逗号分隔的名值对形式出现，其中名值对以等号连接。（特性字符串中不能包含空格。

``` js
window.open("http://www.wrox.com/",
            "wroxWindow",
            "height=400,width=400,top=10,left=10,resizable=yes");
```
这行代码会打开一个可缩放的新窗口，大小为 400 像素×400 像素，位于离屏幕左边及顶边各 10 像素的位置。

window.open() 方法返回一个对新建窗口的引用。这个对象与普通 window 对象没有区别，只是为控制新窗口提供了方便。例如，某些浏览器默认不允许缩放或移动主窗口，但可能允许缩放或移动通过 window.open() 创建的窗口。跟使用任何 window 对象一样，可以使用这个对象操纵新打开的窗口。

resizeTo moveTo close

关闭窗口以后，窗口的引用虽然还在，但只能用于检查其 closed 属性了：
wroxWin.close();
alert(wroxWin.closed); // true

opener：

``` js
let wroxWin = window.open("http://www.wrox.com/",
    "wroxWindow",
    "height=400,width=400,top=10,left=10,resizable=yes");
alert(wroxWin.opener === window); // true
```
虽然新建窗口中有指向打开它的窗口的指针，但反之则不然。窗口不会跟踪记录自己打开的新窗口，因此开发者需要自己记录。
并且有些浏览器会把每个标签页实现为独立的进程，opener 属性就为 null

之前被用来当作广告的实现方式

对于屏蔽的浏览器，open 方法会返回 null，检查返回值是否为 null 即可
有些浏览器当屏蔽弹窗的时候 open 会抛出错误

### 定时器：

setTimeout() 用于指定在一定时间后执行某些代码，而 setInterval() 用于指定每隔一段时间执行某些代码。

``` js
let num = 0,
    intervalId = null;
let max = 10;
let incrementNumber = function () {
    num++;
    // 如果达到最大值，则取消所有未执行的任务
    if (num == max) {
        clearInterval(intervalId);
        alert("Done");
    }
}
intervalId = setInterval(incrementNumber, 500);
```
setTimeout 也会返回可以调用的 ID，用于取消这个任务

``` js
// 设置超时任务
let timeoutId = setTimeout(() => alert("Hello world!"), 1000);
// 取消超时任务，无事发生
clearTimeout(timeoutId);
```

``` js
let num = 0;
let max = 10;
let incrementNumber = function () {
    num++;
    // 如果还没有达到最大值，再设置一个超时任务
    if (num < max) {
        setTimeout(incrementNumber, 500);
    } else {
        alert("Done");
    }
}
//递归调用咯~
setTimeout(incrementNumber, 500);
```

一般来说，最好不要使用 setInterval()。

### 系统对话框

使用 alert()（弹出普通的点击确定即可关闭的窗口）、confirm()（弹出具有确认和取消的窗口） 和 prompt() （弹出一个可以让用户自由输入消息的窗口）方法，可以让浏览器调用系统对话框向用户显示消息。

prompt：提示

// 显示打印对话框
window.print();（相当于使用代码调用 ctrl + P）
// 显示查找对话框
window.find();

## location 对象

window.location 和 document.location 指向同一个对象

location 对象不仅保存着当前加载文档的信息，也保存着**把 URL 解析为离散片段**后能够通过属性访问的信息。

主要用来操作链接

## navigator 对象

navigator 对象的属性通常用于确定浏览器的类型。

检测插件是否存在：

``` js
// 插件检测，IE10 及更低版本无效
let hasPlugin = function (name) {
    name = name.toLowerCase();
    for (let plugin of window.navigator.plugins) {
        if (plugin.name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}
// 检测 Flash
alert(hasPlugin("Flash"));
// 检测 QuickTime
alert(hasPlugin("QuickTime"));
```

## screen

## history

history 对象通常被用于创建“后退”和“前进”按钮，以及确定页面是不是用户历史记录中的第一条记录。


