---
title: BOM：浏览器对象模型
date: 2021-01-29
tags:
  - JavaScript
  - BOM
---
> 熟悉BOM的常用对象

<!-- more -->

## 学习目标：

- 能够知道浏览器的顶级对象window
- 能够使用window.onload事件
- 能够使用window.onresize事件
- 能够说出两种定时器的区别
- 能够使用location对象的href属性完成页面之间的跳转
- 能够使用location对象获取url中的参数部分
- 能够使用history提供的方法实现页面刷新


## BOM

### 什么是BOM

​BOM（Browser Object Model）即浏览器对象模型，它提供了独立于内容而与浏览器窗口进行交互的对象，其核心对象是 window。  
​BOM 由一系列相关的对象构成，并且每个对象都提供了很多方法与属性。  
​BOM 缺乏标准，JavaScript 语法的标准化组织是 ECMA，DOM 的标准化组织是 W3C，BOM 最初是Netscape 浏览器标准的一部分。

### 与DOM的区别

BOM 比 DOM 更大，它包含 DOM。

![2021-01-31-10-55-33](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-10-55-33.png)

### BOM的构成

顶级对象window

![2021-01-31-10-56-01](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-10-56-01.png)

## window对象的常见事件

### 页面（窗口）加载事件（2种）

**第1种**

**window对象是浏览器的顶级对象**，它具有双重角色。
1. 它是JS 访问浏览器窗口的一个接口。
2. 它是一个全局对象。定义在全局作用域中的变量、函数都会变成window对象的属性和方法。


在调用的时候可以省路window，前面学习的对话框都属于window对象方法，如alert()、prompt()等。
>注意:window下的一个特殊属性 [window.name](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/name)
用来改显示的title

[window.onload](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onload) 是窗口 (页面）加载事件，**当文档内容完全加载完成**会触发该事件(包括图像、脚本文件、CSS 文件等), 就调用的处理函数。
![2021-01-31-11-00-52](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-00-52.png)

注意:
1. 有了window.onload就可以把JS代码写到页面元素的上方，因为onload是等页面内容全部加或完毕，再去执行处理函数。
2. window.onload传统注册事件方式只能写一次，如果有多个，会以最后一个window.onload为准。
3. 如果使用addEventListener 则没有限制

**第2种**

![2021-01-31-11-04-16](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-04-16.png)
​	DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash等等。

​	IE9以上才支持！！！

​	如果页面的图片很多的话, 从用户访问到onload触发可能需要较长的时间, 交互效果就不能实现，必然影响用户的体验，此时用 **DOMContentLoaded** 事件比较合适。

```html 
    <script>
        window.addEventListener('load', function() {
            var btn = document.querySelector('button');
            btn.addEventListener('click', function() {
                alert('点击我');
            })
        })
        window.addEventListener('load', function() {
            alert(22);
        })
        document.addEventListener('DOMContentLoaded', function() {
            alert(33);
        })
    </script>
```

### 调整窗口大小事件

![windows.onresize](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-04-36.png)
​	window.onresize 是调整窗口大小加载事件,  当触发时就调用的处理函数。

注意：

1. 只要窗口大小发生像素变化，就会触发这个事件。

2. 我们经常利用这个事件完成响应式布局。 window.innerWidth 当前屏幕的宽度

``` html
    <script>
        // 注册页面加载事件
        window.addEventListener('load', function() {
            var div = document.querySelector('div');
        	// 注册调整窗口大小事件
            window.addEventListener('resize', function() {
                // window.innerWidth 获取窗口大小
                console.log('变化了');
                if (window.innerWidth <= 800) {
                    div.style.display = 'none';
                } else {
                    div.style.display = 'block';
                }
            })
        })
    </script>
```



## 定时器（两种）

window 对象给我们提供了 2 个非常好用的方法-定时器。

- setTimeout() 

- setInterval()  

### setTimeout() 炸弹定时器

### 开启定时器

`window.setTimeout(调用函数，[延迟的亳秒数]);`

setTimeout0这个调用函数我们也称为**回调函数callback**

注意:
1. window可以省略。
2. 这个调用函数可以直接写函数，或者写函数名或者采取字符串‘函数名()'三种形式。第三种不推荐
3. 延迟的尝秒数省略默认是0，如果写，必须是毫秒。
4. 因为定时器可能有很多，所以我们经常给定时器赋值一个标识符。




``` html
    <script>
        // 回调函数是一个匿名函数
         setTimeout(function() {
             console.log('时间到了');
         }, 2000);
        function callback() {
            console.log('爆炸了');
        }
		// 回调函数是一个有名函数
        var timer1 = setTimeout(callback, 3000);
        var timer2 = setTimeout(callback, 5000);
    </script>
```

### 案例：5秒后关闭广告
![2021-01-31-11-13-32](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-13-32.png)

核心思路:5秒之后，就把这个广告隐藏起来  
用定时器setTimeout

``` html
<body>
    <img src="images/ad.jpg" alt="" class="ad">
    <script>
        // 获取要操作的元素
        var ad = document.querySelector('.ad');
		// 开启定时器
        setTimeout(function() {
            ad.style.display = 'none';
        }, 5000);
    </script>
</body>
```

### 停止定时器

`window .clearTimeout (timeoutID)`

clearTimeout()方法取消了先前通过调用setTimeout()建立的定时器。
注意:
1. window可以省略。
2. 里面的参数就是定时器的标识符。

```html
    <button>点击停止定时器</button>
    <script>
        var btn = document.querySelector('button');
		// 开启定时器
        var timer = setTimeout(function() {
            console.log('爆炸了');
        }, 5000);
		// 给按钮注册单击事件
        btn.addEventListener('click', function() {
            // 停止定时器
            clearTimeout(timer);
        })
    </script>
```



### setInterval() 闹钟定时器

### 开启定时器
`
window.setInterval(回调函数，[间隔的毫秒数]);`

setlnterval()方法重复调用一个函数，每隔这个时间，就去调用一次回调函数。

注意:
1. window可以省略。
2. 这个调用函数可以直接写函数，或者写函数名或者采取字符串'函数名()’三种形式。
3. 间隔的毫秒数省略默认是0，如果写，必须是毫秒，表示每隔多少毫秒就自动调用这个函数。
4. 因为定时器可能有很多，所以我们经常给定时器赋值一个标识符。
5. 第一次执行也是间隔毫秒数之后执行，之后每隔毫秒数就执行一次。

``` html
    <script>
        // 1. setInterval 
        setInterval(function() {
            console.log('继续输出');
        }, 1000);
    </script>
```

### 案例：倒计时

![京东秒杀](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-20-05.png)

- 这个倒计时是不断变化的，因此需要定时器来自动变化 (setInterval)
- 三个黑色盒子里面分别存放时分秒
- 三个黑色盒子利用innerHTML放入计算的小时分钟秒数
- 第一次执行也是间隔亳秒数，因此刚刷新页面会有空白
- 最好采取封装函数的方式，这样可以先调用一次这个函数，防止刚开始刷新页面有空白问题

``` html
    <div>
        <span class="hour">1</span>
        <span class="minute">2</span>
        <span class="second">3</span>
    </div>
    <script>
        // 1. 获取元素（时分秒盒子） 
        var hour = document.querySelector('.hour'); // 小时的黑色盒子
        var minute = document.querySelector('.minute'); // 分钟的黑色盒子
        var second = document.querySelector('.second'); // 秒数的黑色盒子
        var inputTime = +new Date('2019-5-1 18:00:00'); // 返回的是用户输入时间总的毫秒数

        countDown(); // 我们先调用一次这个函数，防止第一次刷新页面有空白 

        // 2. 开启定时器
        setInterval(countDown, 1000);
		
        function countDown() {
            var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
            var times = (inputTime - nowTime) / 1000; // times是剩余时间总的秒数 
            var h = parseInt(times / 60 / 60 % 24); //时
            h = h < 10 ? '0' + h : h;
            hour.innerHTML = h; // 把剩余的小时给 小时黑色盒子
            var m = parseInt(times / 60 % 60); // 分
            m = m < 10 ? '0' + m : m;
            minute.innerHTML = m;
            var s = parseInt(times % 60); // 当前的秒
            s = s < 10 ? '0' + s : s;
            second.innerHTML = s;
        }
    </script>
```


#### 案例：发送短信倒计时

​	点击按钮后，该按钮60秒之内不能再次点击，防止重复发送短信。

![2021-01-31-11-22-20](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-22-20.png)

![2021-01-31-11-32-17](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-32-17.png)

``` html
    手机号码：
    <input type="number"> <button>发送</button>
    <script>
        var btn = document.querySelector('button');
		// 全局变量，定义剩下的秒数
        var time = 3; 
		// 注册单击事件
        btn.addEventListener('click', function() {
            // 禁用按钮
            btn.disabled = true;
            // 开启定时器
            var timer = setInterval(function() {
                // 判断剩余秒数
                if (time == 0) {
                    // 清除定时器和复原按钮
                    clearInterval(timer);
                    btn.disabled = false;
                    btn.innerHTML = '发送';
                } else {
                    btn.innerHTML = '还剩下' + time + '秒';
                    time--;
                }
            }, 1000);
        });
    </script>
```



## this指向问题

​	this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，一般情况下this的最终指向的是那个调用它的对象。

现阶段，我们先了解一下几个this指向

1. 全局作用域或者普通函数中this指向全局对象window（注意定时器里面的this指向window）

2. 方法调用中谁调用this指向谁
3. 构造函数中this指向构造函数的实例

``` html
    <button>点击</button>
    <script>
        // this 指向问题 一般情况下this的最终指向的是那个调用它的对象
        // 1. 全局作用域或者普通函数中this指向全局对象window（ 注意定时器里面的this指向window）
        console.log(this);
        function fn() {
            console.log(this);
        }
        window.fn();
        window.setTimeout(function() {
            console.log(this);
        }, 1000);
        // 2. 方法调用中谁调用this指向谁
        var o = {
            sayHi: function() {
                console.log(this); // this指向的是 o 这个对象
            }
        }
        o.sayHi();
        var btn = document.querySelector('button');
        btn.addEventListener('click', function() {
                console.log(this); // 事件处理函数中的this指向的是btn这个按钮对象
            })
        // 3. 构造函数中this指向构造函数的实例
        function Fun() {
            console.log(this); // this 指向的是fun 实例对象
        }
        var fun = new Fun();
    </script>
```



## location对象

### 什么是 location 对象

window对象给我们提供了一个location属性用于获取或设置窗体的URL，并且可以用于解析URL。因为这个屈性返回的是一个对象。所以我们将这个属性也称为location对象。


### URL

**统一资源定位符**(Uniform Resource Locator,URL)是互联网上标准资源的地址。互联网上的每个文件都有—个唯一的URL，它包含的信息指出文件的位置以及浏览器应该怎么处理它。

URL的一般语法格式为:
`protocol : //host [ :port]/path/ [?query]#fragment`
 
`http : / / www.itcast.cn/index.html?name=andy&age=18#link`

![2021-01-31-11-41-56](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-41-56.png)

### location 对象的属性

![2021-01-31-11-42-13](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-42-13.png)

重点记住herf和search

### 案例：5分钟自动跳转页面

![2021-01-31-11-43-11](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-43-11.png)


``` html
    <button>点击</button>
    <div></div>
    <script>
        var btn = document.querySelector('button');
        var div = document.querySelector('div');
        btn.addEventListener('click', function() {
            // console.log(location.href);
            location.href = 'http://www.itcast.cn';
        })
        var timer = 5;
        setInterval(function() {
            if (timer == 0) {
                location.href = 'http://www.itcast.cn';
            } else {
                div.innerHTML = '您将在' + timer + '秒钟之后跳转到首页';
                timer--;
            }
        }, 1000);
    </script>
```

### 案例：获取URL参数

![2021-01-31-11-44-20](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-44-20.png)

- 第一个登录页面，里面有提交表单, action提交到index.html页面
- 第二个页面，可以使用第一个页面的参数，这样实现了一个数据不同页面之间的传递效果
- 第二个页面之所以可以使用第一个页面的数据，是利用了URL里面的location.search参数
- 在第二个页面中，需要把这个参数提取。
- 第一步去掉?利用substr
- 第二步利用=号分割键和值split( '= )
- 第一个数组就是键第二个数组就是值


``` html
    <div></div>
	<script>
        console.log(location.search); // ?uname=andy
        // 1.先去掉？  substr('起始的位置'，截取几个字符);
        var params = location.search.substr(1); // uname=andy
        console.log(params);
        // 2. 利用=把字符串分割为数组 split('=');
        var arr = params.split('=');
        console.log(arr); // ["uname", "ANDY"]
        var div = document.querySelector('div');
        // 3.把数据写入div中
        div.innerHTML = arr[1] + '欢迎您';
    </script>
```

### location对象的常见方法

![2021-01-31-11-46-45](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-46-45.png)

``` html
    <button>点击</button>
    <script>
        var btn = document.querySelector('button');
        btn.addEventListener('click', function() {
            // 记录浏览历史，所以可以实现后退功能
            // location.assign('http://www.itcast.cn');
            // 不记录浏览历史，所以不可以实现后退功能
            // location.replace('http://www.itcast.cn');
            location.reload(true);
        })
    </script>
```

## navigator对象

​	navigator 对象包含有关浏览器的信息，它有很多属性，我们最常用的是 userAgent，该属性可以返回由客户机发送服务器的 user-agent 头部的值。

下面前端代码可以判断用户那个终端打开页面，实现跳转

```js
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    window.location.href = "";     //手机
 } else {
    window.location.href = "";     //电脑
 }
```

## history对象

​	window对象给我们提供了一个 history对象，与浏览器历史记录进行交互。该对象包含用户（在浏览器窗口中）访问过的URL。
![2021-01-31-11-47-26](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-47-26.png)

history对象一般在实际开发中比较少用，但是会在一些 OA 办公系统中见到。
![2021-01-31-11-47-43](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-47-43.png)

## JS执行机制

JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。这是因为Javascript这门脚本语言诞生的使命所致——JavaScript是为处理页面中用户的交互，以及操作DOM而诞生的。比如我们对某个DOM元素进行添加和删除操作，不能同时进行。应该先进行添加，之后再删除。

以下代码执行的结果是什么？

```js
 console.log(1);
 
 setTimeout(function () {
     console.log(3);
 }, 1000);
 
 console.log(2);
```

以下代码执行的结果是什么？

```js
 console.log(1);
 
 setTimeout(function () {
     console.log(3);
 }, 0);
 
 console.log(2);
```



### JS 是单线程

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。
这样所导致的问题是： 如果 JS 执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉。

### 同步任务和异步任务

​	单线程导致的问题就是后面的任务等待前面任务完成，如果前面任务很耗时（比如读取网络数据），后面任务不得不一直等待！！

​	为了解决这个问题，利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制。于是，JS 中出现了**同步任务**和**异步任务**。

#### 同步

​	前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的。比如做饭的同步做法：我们要烧水煮饭，等水开了（10分钟之后），再去切菜，炒菜。

#### 异步

​	你在做一件事情时，因为这件事情会花费很长时间，在做这件事的同时，你还可以去处理其他事情。比如做饭的异步做法，我们在烧水的同时，利用这10分钟，去切菜，炒菜。

**他们的本质区别:这条流水线上各个流程的执行顺序不同。**


> JS中所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。
> 
> 同步任务指的是：
> 	在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
> 异步任务指的是：
> 	不进入主线程、而进入”任务队列”的任务，当主线程中的任务运行完了，才会从”任务队列”取出异步任务放入主线程执行。


![2021-01-31-11-50-39](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-50-39.png)

![2021-01-31-11-51-17](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-51-17.png)


### JS执行机制（事件循环）
![2021-01-31-11-53-39](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-53-39.png)
同步任务都在主线程上执行，形成—个执行栈。


![2021-01-31-11-51-41](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-51-41.png)

由于主线程不断的重复获得任务、执行任务、再获取任务、再执行，所以这种机制被称为事件循环（event loop).

### 代码思考题

```js
 console.log(1);
 document.onclick = function() {
   console.log('click');
 }

 setTimeout(function() {
   console.log(3)
 }, 3000)
 console.log(2);
```

![log1;log2;log3;click;](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-31-11-56-21.png)
