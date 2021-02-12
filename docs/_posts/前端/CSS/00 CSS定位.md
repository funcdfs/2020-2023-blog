---
title: css 定位
date: 2020-02-11
tags:
  - CSS
---

关于 css 定位，实际操作中会经常使用，所以梳理一下

position: static : normal flow & block

static 定位所导致的元素位置，是浏览器自主决定的，所以这时 top、bottom、left、right 这四个属性无效。

relative，absolute，fixed

relative、absolute、fixed 这三个属性值有一个共同点，都是相对于某个基点的定位，不同之处仅仅在于基点不同。所以，只要理解了它们的基点是什么，就很容易掌握这三个属性值。

## relative

n. 亲戚，相关物，[语] 关系词，亲缘植物
adj. 相对的，有关系的，成比例的

relative 表示，相对于默认位置（即 static 时的位置）进行偏移，即定位基点是元素的默认位置。

![2021-02-11-16-27-26](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-11-16-27-26.png)

它必须搭配 top、bottom、left、right 这四个属性一起使用，用来指定偏移的方向和距离。

![2021-02-11-16-32-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-11-16-32-24.png)

``` css
div {
  position: relative;
  top: 20px;
}
```

上面代码中，div 元素从默认位置向下偏移 20px（即距离顶部 20px）。
实际使用中，top 的那啥，top 的优先级会比 bottom 高，如果出现叠加的情况会优先显示 top 指定的宽度

## absolute

n. 绝对，绝对事物
adj. 绝对的，完全的，专制的

absolute 表示，相对于上级元素（一般是父元素）进行偏移，即定位基点是父元素。

它有一个重要的限制条件：定位基点（一般是父元素）不能是 static 定位，否则定位基点就会变成整个网页的根元素 html。另外，absolute 定位也必须搭配 top、bottom、left、right 这四个属性一起使用。

记住这个：**子绝父相** 就好了

![2021-02-11-16-38-58](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-11-16-38-58.png)

它有一个重要的限制条件：定位基点（一般是父元素）不能是 static 定位，否则定位基点就会变成整个网页的根元素 html。另外，absolute 定位也必须搭配 top、bottom、left、right 这四个属性一起使用。

``` html
  <div id="father">
    <div id="son"></div>
  </div>

```

```css
#father {
  positon: relative;
}
#son {
  position: absolute;
  top: 20px;
}
```
上面代码中，父元素是 relative 定位，子元素是 absolute 定位，所以子元素的定位基点是父元素，相对于父元素的顶部向下偏移 20px。如果父元素是 static 定位，上例的子元素就是距离网页的顶部向下偏移 20px。

注意，absolute 定位的元素会被"正常页面流"忽略，即在"正常页面流"中，该元素所占空间为零，周边元素不受影响。

## fixed

fixed 表示，相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。

![2021-02-12-14-40-31](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-12-14-40-31.png)

它如果搭配 top、bottom、left、right 这四个属性一起使用，表示元素的初始位置是基于视口计算的，否则初始位置就是元素的默认位置。

``` css
div {
  position: fixed;
  top: 0;
}
```
上面代码中，div 元素始终在视口顶部，不随网页滚动而变化。navbar 和 侧栏一般都是 fixed 定位

## sticky

adj. 粘的，粘性的

sticky 跟前面四个属性值都不一样，它会产生动态效果，很像 relative 和 fixed 的结合：一些时候是 relative 定位（定位基点是自身默认位置），另一些时候自动变成 fixed 定位（定位基点是视口）。

因此，它能够形成"动态固定"的效果。比如，网页的搜索工具栏，初始加载时在自己的默认位置（relative 定位）。

![2021-02-12-14-44-38](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-12-14-44-38.png)

页面向下滚动时，工具栏变成固定位置，始终停留在页面头部（fixed 定位）。

![2021-02-12-14-44-58](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-12-14-44-58.png)

等到页面重新向上滚动回到原位，工具栏也会回到默认位置。

sticky 生效的前提是，必须搭配 top、bottom、left、right 这四个属性一起使用，不能省略，否则等同于 relative 定位，不产生"动态固定"的效果。原因是这四个属性用来定义"偏移距离"，浏览器把它当作 sticky 的生效门槛。

它的具体规则是，当页面滚动，父元素开始脱离视口时（即部分不可见），只要与 sticky 元素的距离达到生效门槛，relative 定位自动切换为 fixed 定位；等到父元素完全脱离视口时（即完全不可见），fixed 定位自动切换回 relative 定位。

请看下面的示例代码。（注意，除了已被淘汰的 IE 以外，其他浏览器目前都支持 sticky。但是，Safari 浏览器需要加上浏览器前缀-webkit-。）

``` css
#toolbar {
  position: -webkit-sticky; /* safari 浏览器 */
  position: sticky; /* 其他浏览器 */
  top: 20px;
}
```

上面代码中，页面向下滚动时，#toolbar 的父元素开始脱离视口，一旦视口的顶部与#toolbar 的距离小于 20px（门槛值），#toolbar 就自动变为 fixed 定位，保持与视口顶部 20px 的距离。页面继续向下滚动，父元素彻底离开视口（即整个父元素完全不可见），#toolbar 恢复成 relative 定位。

例如 vuepress 的侧边栏目录

### 堆叠效果

堆叠效果（stacking）指的是页面滚动时，下方的元素覆盖上方的元素。下面是一个图片堆叠的例子，下方的图片会随着页面滚动，覆盖上方的图片（查看 [demo](https://jsbin.com/fegiqoquki/edit?html,css,output)）。

HTML 代码就是几张图片。

``` html
<div><img src="pic1.jpg"></div>
<div><img src="pic2.jpg"></div>
<div><img src="pic3.jpg"></div>
```

CSS 代码极其简单，只要两行。

``` css
div {
  position: sticky;
  top: 0;
}
```

[详细解释](https://dev.to/vinceumo/slide-stacking-effect-using-position-sticky-91f)

###  表格的表头锁定

大型表格滚动的时候，表头始终固定，也可以用 sticky 实现（查看 [demo](https://jsbin.com/decemanohe/edit?html,css,output)）。

![2021-02-12-15-15-27](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-02-12-15-15-27.png)

## 定位改变 display 属性

display 是 显示模式， 可以改变显示模式有以下方式：
- 可以用 inline-block 转换为行内块
- 可以用浮动 float 默认转换为行内块（类似，并不完全一样，因为浮动是脱标的）
- 绝对定位和固定定位也和浮动类似，会把 block 转换为行内块。

所以说，一个行内的盒子，如果加了浮动、固定定位和绝对定位，不用再次转换，就可以给这个盒子直接设置宽度和高度等。

同时注意：

浮动元素、绝对定位（固定定位）元素的都不会触发外边距合并的问题。 （合并用 padding border overflow 解决的）

也就是说，我们给盒子改为了浮动或者定位，就不会有垂直外边距合并的问题了。