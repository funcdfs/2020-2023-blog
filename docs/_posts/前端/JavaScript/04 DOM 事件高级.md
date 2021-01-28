---
title: DOM 事件高级
date: 2021-01-28
tags:
  - JavaScript
  - DOM
---

> DOM 高级事件操作

<!-- more -->
## 学习目标

- 能够使用传统方式和监听方式给元素注册事件
- 能够说出事件流执行的三个阶段
- 能够在事件处理函数中获取事件对象
- 能够使用事件对象取消默认行为
- 能够使用事件对象阻止事件冒泡
- 能够使用事件对象获取鼠标的位置
- 能够完成跟随鼠标的天使案例

## 注册事件（2种方式）

通常使用监听方式

![2021-01-28-16-03-08](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-03-08.png)

### addEventListener()事件监听（IE9以后支持）

![2021-01-28-16-03-52](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-03-52.png)

eventTarget.addEventListener()方法将指定的监听器注册到 eventTarget（目标对象）上，当该对象触发指定的事件时，就会执行事件处理函数。

![2021-01-28-16-04-57](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-04-57.png)

### attacheEvent()事件监听（IE678支持）

![2021-01-28-16-05-16](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-05-16.png)

​	eventTarget.attachEvent()方法将指定的监听器注册到 eventTarget（目标对象） 上，当该对象触发指定的事件时，指定的回调函数就会被执行。

![2021-01-28-16-05-51](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-05-51.png)

``` html
<button>传统注册事件</button>
<button>方法监听注册事件</button>
<button>ie9 attachEvent</button>
<script>
    var btns = document.querySelectorAll('button');
    // 1. 传统方式注册事件
    btns[0].onclick = function() {
        alert('hi');
    }
    btns[0].onclick = function() {
            alert('hao a u');
        }
   // 2. 事件侦听注册事件 addEventListener 
   // (1) 里面的事件类型是字符串 必定加引号 而且不带on
   // (2) 同一个元素 同一个事件可以添加多个侦听器（事件处理程序）
    btns[1].addEventListener('click', function() {
        alert(22);
    })
    btns[1].addEventListener('click', function() {
            alert(33);
    })
    // 3. attachEvent ie9以前的版本支持
    btns[2].attachEvent('onclick', function() {
        alert(11);
    })
</script>
```
### 事件监听兼容性解决方案

封装一个函数，函数中判断浏览器的类型：

![2021-01-28-16-06-49](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-06-49.png)

## 删除事件（解绑事件）

1.传统注册方式 `eventTarget-onclick=null;`
2.方法监听注册方式
`eventTarget.removeEventListener(type，listener[, useCapture]) ;`
`eventTarget.detachEvent (eventNamewithon,callback) ;`

``` html 
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <script>
        var divs = document.querySelectorAll('div');
        divs[0].onclick = function() {
            alert(11);
            // 1. 传统方式删除事件
            divs[0].onclick = null;
        }
        // 2. removeEventListener 删除事件
        divs[1].addEventListener('click', fn) // 里面的fn 不需要调用加小括号
        function fn() {
            alert(22);
            divs[1].removeEventListener('click', fn);
        }
        // 3. detachEvent
        divs[2].attachEvent('onclick', fn1);

        function fn1() {
            alert(33);
            divs[2].detachEvent('onclick', fn1);
        }
    </script>
```

**删除事件兼容性解决方案**
同样是封装一个函数解决
![2021-01-28-16-10-45](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-10-45.png)
## DOM事件流

事件流描述的是从页面中接收事件的项序。

事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即DOM事件流。


> 比如：我们给页面中的一个div注册了单击事件，当你单击了div时，也就单击了body，单击了html，单击了document。

分为捕获阶段和冒泡阶段

![2021-01-28-16-12-14](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-12-14.png)

事件冒泡:IE最早提出，事件开始时由最具体的元素接收，然后逐级向上传播到到DOM最顶层节点的过程

事件捕获:网景最早提出，由DOM最顶层节点开始，然后逐级向下传播到到最具体的元素接收的过程.

::: tip
当时的2大浏览器霸主谁也不服谁！
IE 提出从目标元素开始，然后一层一层向外接收事件并响应，也就是冒泡型事件流。
Netscape（网景公司）提出从最外层开始，然后一层一层向内接收事件并响应，也就是捕获型事件流。
江湖纷争，武林盟主也脑壳疼！！！
最终，w3c 采用折中的方式，平息了战火，制定了统一的标准 —--— 先捕获再冒泡。
现代浏览器都遵循了此标准，所以当事件发生时，会经历3个阶段。
:::

DOM 事件流会经历3个阶段： 

1. 捕获阶段
2. 当前目标阶段
3. 冒泡阶段 

​	我们向水里面扔一块石头，首先它会有一个下降的过程，这个过程就可以理解为从最顶层向事件发生的最具体元素（目标点）的捕获过程；之后会产生泡泡，会在最低点（ 最具体元素）之后漂浮到水面上，这个过程相当于事件冒泡。 
![2021-01-28-16-15-39](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-15-39.png)

事件发生时会在元素节点之间按照特定的顺序传播，这个传播过程即DoM事件流。

注意
1. Js 代码中只能执行捕获或者冒泡其中的一个阶段。
2. onclick 和 attachEvent 只能得到冒泡阶段。
3. `addEventListener(type，listener[，useCapture])`第三个参数如果是true，表示在事件捕获阶段调用事件处理程序;如 果是 false (不写默认就是false)，表示在事件冒泡阶段调用事件处理程序。
4. 实际开发中我们很少使用事件捕获，我们更关注事件冒泡。 
5. 有些事件是没有冒泡的，比如onblur、onfocus、onmouseenter、onmouseleave
6. 事件冒泡有时候会带来麻烦，有时候又会帮助很巧妙的做某些事件，我们后面讲解。

**事件冒泡**

``` html
<div class="father">
    <div class="son">son盒子</div>
</div>
<script>
    // onclick 和 attachEvent（ie） 在冒泡阶段触发
    // 冒泡阶段 如果addEventListener 第三个参数是 fals或者 省略 
    // son -> father ->body -> html -> document
    var son = document.querySelector('.son');
// 给son注册单击事件
    son.addEventListener('click', function() {
        alert('son');
    }, false);
// 给father注册单击事件
    var father = document.querySelector('.father');
    father.addEventListener('click', function() {
        alert('father');
    }, false);
// 给document注册单击事件，省略第3个参数
    document.addEventListener('click', function() {
        alert('document');
    })
</script>
```

**事件捕获**

```js
    <div class="father">
        <div class="son">son盒子</div>
    </div>
    <script>
        // 如果addEventListener() 第三个参数是 true 那么在捕获阶段触发
        // document -> html -> body -> father -> son
         var son = document.querySelector('.son');
		// 给son注册单击事件，第3个参数为true
         son.addEventListener('click', function() {
             alert('son');
         }, true);
         var father = document.querySelector('.father');
		// 给father注册单击事件，第3个参数为true
         father.addEventListener('click', function() {
             alert('father');
         }, true);
		// 给document注册单击事件，第3个参数为true
        document.addEventListener('click', function() {
            alert('document');
        }, true)
    </script>
```

## 事件对象

### 什么是事件对象

事件发生后，跟事件相关的一系列信息数据的集合都放到这个对象里面，这个对象就是事件对象。

比如：  

1. 谁绑定了这个事件。

2. 鼠标触发事件的话，会得到鼠标的相关信息，如鼠标位置。

3. 键盘触发事件的话，会得到键盘的相关信息，如按了哪个键。

### 事件对象的使用

事件触发发生时就会产生事件对象，并且系统会以实参的形式传给事件处理函数。

所以，在事件处理函数中声明1个形参用来接收事件对象。

![2021-01-28-16-19-09](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-19-09.png)

### 事件对象的兼容性处理

事件对象本身的获取存在兼容问题：

1. 标准浏览器中是浏览器给方法传递的参数，只需要定义形参 e 就可以获取到。

2. 在 IE6~8 中，浏览器不会给方法传递参数，如果需要的话，需要到 window.event 中获取查找。


解决: `e = e || window .event;`

```
只要“||”前面为false, 不管“||”后面是true 还是 false，都返回 “||” 后面的值。
只要“||”前面为true, 不管“||”后面是true 还是 false，都返回 “||” 前面的值。
```

``` html
<div>123</div>
<script>
    var div = document.querySelector('div');
    div.onclick = function(e) {
            // 事件对象
            e = e || window.event;
            console.log(e);
    }
</script>
```

### 事件对象的属性和方法

![2021-01-28-16-21-39](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-21-39.png)

### e.target 和 this 的区别

-  this 是事件绑定的元素（绑定这个事件处理函数的元素） 。
-  e.target 是事件触发的元素。
  
::: tip
> 常情况下terget 和 this是一致的，
> 但有一种情况不同，那就是在事件冒泡时（父子元素有相同事件，单击子元素，父元素的事件处理函数也会被触发执行），
> 这时候this指向的是父元素，因为它是绑定事件的元素对象，
> 而target指向的是子元素，因为他是触发事件的那个具体元素对象。
:::

```
<div>123</div>
<script>
    var div = document.querySelector('div');
    div.addEventListener('click', function(e) {
        // e.target 和 this指向的都是div
        console.log(e.target);
        console.log(this)
    });
</script>
```

事件冒泡下的e.target和this

``` html
    <ul>
        <li>abc</li>
        <li>abc</li>
        <li>abc</li>
    </ul>
    <script>
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function(e) {
              // 我们给ul 绑定了事件  那么this 就指向ul  
              console.log(this); // ul

              // e.target 触发了事件的对象 我们点击的是li e.target 指向的就是li
              console.log(e.target); // li
        });
    </script>
```

## 阻止默认行为

> html中一些标签有默认行为，例如a标签被单击后，默认会进行页面跳转。

``` html
    <a href="http://www.baidu.com">百度</a>
    <script>
        // 2. 阻止默认行为 让链接不跳转 
        var a = document.querySelector('a');
        a.addEventListener('click', function(e) {
             e.preventDefault(); //  dom 标准写法
        });
        // 3. 传统的注册方式
        a.onclick = function(e) {
            // 普通浏览器 e.preventDefault();  方法
            e.preventDefault();
            // 低版本浏览器 ie678  returnValue  属性
            e.returnValue = false;
            // 我们可以利用return false 也能阻止默认行为 没有兼容性问题
            return false;
        }
    </script>
```

## 阻止事件冒泡

事件冒泡本身的特性，会带来的坏处，也会带来的好处。

![2021-01-28-16-27-13](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-27-13.png)

``` html
    <div class="father">
        <div class="son">son儿子</div>
    </div>
    <script>
        var son = document.querySelector('.son');
		// 给son注册单击事件
        son.addEventListener('click', function(e) {
            alert('son');
            e.stopPropagation(); // stop 停止  Propagation 传播
            window.event.cancelBubble = true; // 非标准 cancel 取消 bubble 泡泡
        }, false);

        var father = document.querySelector('.father');
		// 给father注册单击事件
        father.addEventListener('click', function() {
            alert('father');
        }, false);
		// 给document注册单击事件
        document.addEventListener('click', function() {
            alert('document');
        })
    </script>
```

**阻止事件冒泡的兼容性处理**

![2021-01-28-16-28-18](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-28-18.png)

## 事件委托

事件委托也称为事件代理，在 jQuery 里面称为事件委派。

> 说白了就是，不给子元素注册事件，给父元素注册事件，把处理代码在父元素的事件中执行。

**js事件中的代理：**

![2021-01-28-16-29-48](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-29-48.png)

### 事件委托的原理

​	给父元素注册事件，利用事件冒泡，当子元素的事件触发，会冒泡到父元素，然后去控制相应的子元素。

### 事件委托的作用

- 我们只操作了一次 DOM ，提高了程序的性能。
- 动态新创建的子元素，也拥有事件。

``` html
    <ul>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
    </ul>
    <script>
        // 事件委托的核心原理：给父节点添加侦听器， 利用事件冒泡影响每一个子节点
        var ul = document.querySelector('ul');
        ul.addEventListener('click', function(e) {
            // e.target 这个可以得到我们点击的对象
            e.target.style.backgroundColor = 'pink';
        })
    </script>
```

## 常用鼠标事件

![2021-01-28-16-34-08](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-34-08.png)

### 案例：禁止选中文字和禁止右键菜单

利用删除事件的方式，不过给用户的体验就不是很好了

![2021-01-28-16-34-56](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-34-56.png)

``` html
<body>
    我是一段不愿意分享的文字
    <script>
        // 1. contextmenu 我们可以禁用右键菜单
        document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
        })
        // 2. 禁止选中文字 selectstart
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
        })
    </script>
</body>
```

## 鼠标事件对象
![2021-01-28-16-36-30](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-28-16-36-30.png)

### 获取鼠标在页面的坐标

``` html
    <script>
        // 鼠标事件对象 MouseEvent
        document.addEventListener('click', function(e) {
            // 1. client 鼠标在可视区的x和y坐标
            console.log(e.clientX);
            console.log(e.clientY);
            console.log('---------------------');

            // 2. page 鼠标在页面文档的x和y坐标
            console.log(e.pageX);
            console.log(e.pageY);
            console.log('---------------------');

            // 3. screen 鼠标在电脑屏幕的x和y坐标
            console.log(e.screenX);
            console.log(e.screenY);

        })
    </script>
```

### 案例：跟随鼠标的天使

- 鼠标不断的移动，使用鼠标移动事件: mousemove在页面中移动，给document注册事件
- 图片要移动距离，而且不占位置，我们使用绝对定位即可
- 核心原理:每次鼠标移动，我们都会获得最新的鼠标坐标，把这个x和y坐标做为图片的 top和left值就可以移动图片，注意加单位


``` html
    <img src="images/angel.gif" alt="">
    <script>
        var pic = document.querySelector('img');
        document.addEventListener('mousemove', function(e) {
        	// 1. mousemove只要我们鼠标移动1px 就会触发这个事件
        	// 2.核心原理： 每次鼠标移动，我们都会获得最新的鼠标坐标， 
            // 把这个x和y坐标做为图片的top和left 值就可以移动图片
        	var x = e.pageX;
        	var y = e.pageY;
        	console.log('x坐标是' + x, 'y坐标是' + y);
        	//3 . 千万不要忘记给left 和top 添加px 单位
        	pic.style.left = x - 50 + 'px';
        	pic.style.top = y - 40 + 'px';
    	});
    </script>
```

