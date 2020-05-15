---
title: vscode 使用自定义 css
category: Tips
date: 2020-05-10
tags:
  - vscode
---

>别人写的主题不一定完全符合你自己的审美，自己开发主题学习成本太大，所以就有了这种方法

<!-- more -->

这种教程类的文章转[知乎](https://zhuanlan.zhihu.com/p/139446791)进行阅读体验比较好

## 示例


```css
/*默认文本的颜色，其他颜色在上面覆盖*/

.mtk1 {
  color: #b4b4b4;
  /* text-shadow: 0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3; */
}

/* 注释，引用的颜色 */

.mtk3 {
  color: #bb7bd6b0;
}

/*链接的颜色*/

/*.mtk5 {
  color: #f97e72;
}*/

/*函数名的颜色和阴影，颜色不做修改*/

.mtk6 {
  text-shadow: 0 0 2px #001716, 0 0 1px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975;
}

/*所有语言中字符串的颜色*/

.mtk7 {
  color: #ff00bf;
  /*text-shadow: 0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75;*/
}

/* Sweet dots */

.monaco-workbench .activitybar>.content .monaco-action-bar .badge .badge-content {
  background: linear-gradient(to bottom, #fc28a8 25%, #9400d3);
}

/*颜色名字的颜色*/

/* 
.mtk8 {
  color: #72f1b8;
  text-shadow: 0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475;
} */

/*markdown中的标题颜色以及 c++中的变量颜色*/

/* .mtk9 {
  color: #f4eee4;
  text-shadow: 0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575;
} */
```
