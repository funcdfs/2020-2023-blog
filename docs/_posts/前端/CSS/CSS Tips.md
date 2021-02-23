---
title: css Tips
draft: true
date: 2020-05-25
tags:
  - CSS
---

>记录一些常见css特效的实现方式
<!-- more -->
## css 实现文字闪烁

```css
/*闪烁文字效果*/
@-webkit-keyframes shake {
    0% {
        opacity: 0.8;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 0.8;
    }
}

@keyframes shake {
    0% {
        opacity: 0.8;
    }
    50% {
        opacity: 0.4;
    }
    100% {
        opacity: 0.8;
    }
}
.project{
    -webkit-animation: shake 2.2s infinite;
    animation: shake 2.2s infinite;
}
```

## 滚动条样式

```css
/*滚动条效果-start*/
/*控制整个滚动条*/
::-webkit-scrollbar {
    background-color: lightgray;
    width: 5px;
    height: 5px;
    background-clip: padding-box;
}
/*滚动条两端方向按钮*/
::-webkit-scrollbar-button {
    background-color: pink;
}
/*滚动条中间滑动部分*/
::-webkit-scrollbar-thumb {
    background-color: #9400D3;
    border-radius: 5px;
}
/*滚动条右下角区域*/
::-webkit-scrollbar-corner {
    background-color: pink;
}
/*滚动条效果-end*/
```