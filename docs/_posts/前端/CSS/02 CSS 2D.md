---
title: css 2D动画重点
date: 2021-02-12
tags:
  - CSS3
---

![动画相关常用属性](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-08-13-38-29.png)

## 1. Transition

在 CSS 3 引入 Transition（过渡）这个概念之前，CSS 是没有时间轴的。也就是说，所有的状态变化，都是即时完成。

<iframe width="100%" height="300" src="//jsfiddle.net/konng/w5y9jd2h/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

上面是一个演示，当鼠标放置于缩略图之上，缩略图会迅速变大。注意，缩略图的变大是瞬间实现的。相当简单。

transition 的作用在于，指定状态变化所需要的时间。

``` css
img{
    transition: 1s;
}
```

上面代码指定，图片放大的过程需要 1 秒，效果如下。

<iframe width="100%" height="300" src="//jsfiddle.net/konng/uxr42kme/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

我们还可以指定 transition 适用的属性，比如只适用于 height。

``` css
img{
    transition: 1s height;
}
```

这样一来，只有 height 的变化需要 1 秒实现，其他变化（主要是 width）依然瞬间实现，效果如下。

<iframe width="100%" height="300" src="//jsfiddle.net/ruanyf/mWaM7/3/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### 1.1. transition-delay

在同一行 transition 语句中，可以分别指定多个属性。

``` css
img{
    transition: 1s height, 1s width;
}
```
但是，这样一来，height 和 width 的变化是同时进行的，跟不指定它们没有差别，效果如下。

我们希望，让 height 先发生变化，等结束以后，再让 width 发生变化。实现这一点很容易，就是为 width 指定一个 delay 参数。

<iframe width="100%" height="300" src="//jsfiddle.net/konng/fLmob34t/embedded/html,css,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

delay 的真正意义在于，它指定了动画发生的顺序，使得多个不同的 transition 可以连在一起，形成复杂效果。

### 1.2. transition-timing-function

transition 的状态变化速度（又称 timing function），默认不是匀速的，而是逐渐放慢，这叫做 ease。

``` css
img{
    transition: 1s ease;
}
```

除了 ease 以外，其他模式还包括

（1）linear：匀速

（2）ease-in：加速

（3）ease-out：减速

（4）cubic-bezier 函数：[自定义速度模式](https://cubic-bezier.com/#.17,.67,.83,.67)

``` css
img{
    transition: 1s height cubic-bezier(.83,.97,.05,1.44);
}
```

上面的代码会产生一个最后阶段放大过度、然后回缩的效果。

<iframe width="100%" height="300" src="//jsfiddle.net/konng/f94hag7v/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### 1.3. transition 的各项属性

transition 的完整写法如下。

``` css
img{
    transition: 1s 1s height ease;
}
```

这其实是一个简写形式，可以单独定义成各个属性。

``` css
img{
    transition-property: height;
    transition-duration: 1s;
    transition-delay: 1s;
    transition-timing-function: ease;
}
```
### 1.4. transition 的局限

transition 的优点在于简单易用，但是它有几个很大的局限。

（1）transition 需要事件触发，所以没法在网页加载时自动发生。

（2）transition 是一次性的，不能重复发生，除非一再触发。

（3）transition 只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

（4）一条 transition 规则，只能定义一个属性的变化，不能涉及多个属性。

CSS Animation 就是为了解决这些问题而提出的。

## 2. Animation

首先，CSS Animation 需要指定动画一个周期持续的时间，以及动画效果的名称。

``` css
div:hover {
  animation: 1s rainbow;
}
```

上面代码表示，当鼠标悬停在 div 元素上时，会产生名为 rainbow 的动画效果，持续时间为 1 秒。为此，我们还需要用 keyframes 关键字，定义 rainbow 效果。

``` css
@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}
```

上面代码表示，rainbow 效果一共有三个状态，分别为起始（0%）、中点（50%）和结束（100%）。如果有需要，完全可以插入更多状态。效果如下。

<iframe width="100%" height="300" src="//jsfiddle.net/konng/rj67zp3g/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

默认情况下，动画只播放一次。加入 infinite 关键字，可以让动画无限次播放。

``` css
div:hover {
  animation: 1s rainbow infinite;
}
```

也可以指定动画具体播放的次数，比如 3 次。

``` css
div:hover {
  animation: 1s rainbow 3;
}
```
### 2.1. animation-fill-mode

动画结束以后，会立即从结束状态跳回到起始状态。如果想让动画保持在结束状态，需要使用 animation-fill-mode 属性。

``` css
div:hover {
  animation: 1s rainbow forwards;
}
```

animation-fill-mode 还可以使用下列值。

（1）none：默认值，回到动画没开始时的状态。

（2）backwards：让动画回到第一帧的状态。

（3）both: 根据 animation-direction（见后）轮流应用 forwards 和 backwards 规则。

### 2.2. animation-direction

动画循环播放时，每次都是从结束状态跳回到起始状态，再开始播放。animation-direction 属性，可以改变这种行为。

下面看一个例子，来说明如何使用 animation-direction。假定有一个动画是这样定义的。

``` css
@keyframes rainbow {
  0% { background-color: yellow; }
  100% { background: blue; }
}
```

默认情况是，animation-direction 等于 normal。

``` css
div:hover {
  animation: 1s rainbow 3 normal;
}
```

![20210212180403-2021-02-12](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20210212180403-2021-02-12.png)

简单说，animation-direction 指定了动画播放的方向，最常用的值是 normal 和 reverse。浏览器对其他值的支持情况不佳，应该慎用。

### 2.3. animation 的各项属性
同 transition 一样，animation 也是一个简写形式。

``` css
div:hover {
  animation: 1s 1s rainbow linear 3 forwards normal;
}
```

这是一个简写形式，可以分解成各个单独的属性。

``` css
div:hover {
  animation-name: rainbow;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 1s;
    animation-fill-mode:forwards;
  animation-direction: normal;
  animation-iteration-count: 3;
}
```

### 2.4. keyframes 的写法
keyframes 关键字用来定义动画的各个状态，它的写法相当自由。

``` css
@keyframes rainbow {
  0% { background: #c00 }
  50% { background: orange }
  100% { background: yellowgreen }
}
```

0%可以用 from 代表，100%可以用 to 代表，因此上面的代码等同于下面的形式。

``` css
@keyframes rainbow {
  from { background: #c00 }
  50% { background: orange }
  to { background: yellowgreen }
}
```

如果省略某个状态，浏览器会自动推算中间状态，所以下面都是合法的写法。

``` css
@keyframes rainbow {
  50% { background: orange }
  to { background: yellowgreen }
}
@keyframes rainbow {
  to { background: yellowgreen }
}
```
甚至，可以把多个状态写在一行。

``` css
@keyframes pound {
  from，to { transform: none; }
  50% { transform: scale(1.2); } //大小，控制 size 的变化
}
```

另外一点需要注意的是，浏览器从一个状态向另一个状态过渡，是平滑过渡。steps 函数可以实现分步过渡。

``` css
div:hover {
  animation: 1s rainbow infinite steps(10);
}
```

实际使用中 ，step 用来实现可控速度的“gif”，一幅很长的图片（width），然后通过 step 进行类似动画帧播放

### 2.5. animation-play-state
有时，动画播放过程中，会突然停止。这时，默认行为是跳回到动画的开始状态。
<iframe width="100%" height="300" src="//jsfiddle.net/konng/0qotc6z9/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

上面动画中，如果鼠标移走，色块立刻回到动画开始状态。

如果想让动画保持突然终止时的状态，就要使用 animation-play-state 属性。

``` css
div {
    animation: spin 1s linear infinite;
    animation-play-state: paused;
}

div:hover {
  animation-play-state: running;
}
```
上面的代码指定，没有鼠标没有悬停时，动画状态是暂停；一旦悬停，动画状态改为继续播放。效果如下。

<iframe width="100%" height="300" src="//jsfiddle.net/konng/vy6w2hx1/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

### 2.6. 浏览器前缀

目前，IE 10 和 Firefox（>= 16）支持没有前缀的 animation，而 chrome 不支持，所以必须使用 webkit 前缀。

也就是说，实际运用中，代码必须写成下面的样子。毕竟 chromeyyds

``` css
div:hover {
  -webkit-animation: 1s rainbow;
  animation: 1s rainbow;  
}

@-webkit-keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}

@keyframes rainbow {
  0% { background: #c00; }
  50% { background: orange; }
  100% { background: yellowgreen; }
}

```