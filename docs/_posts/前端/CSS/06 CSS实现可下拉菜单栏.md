---
title: CSS实现下拉导航栏
date: 2021-02-19
draft: true
tags:
  - CSS
---

## navbar框架

一般的页面布局：`ul>li*5` 每个li里面用 `a+ul>li*3` 

emmets写法：`ul>li*5>a+ul>li*3`

::: showmore

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul>
        <li>
            <a href=""></a>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </li>
        <li>
            <a href=""></a>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </li>
        <li>
            <a href=""></a>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </li>
        <li>
            <a href=""></a>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </li>
        <li>
            <a href=""></a>
            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </li>
    </ul>
</body>
</html>
```
:::

然后为每一个元素添加`displayblock`，指定相应的宽高

## 相关选择器

会用到后低啊选择器和子代选择器



