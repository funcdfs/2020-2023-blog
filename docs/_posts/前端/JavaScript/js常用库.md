---
title: JavaScript 常用库 
date: 2022-05-21
tags:
    - JavaScript
---

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