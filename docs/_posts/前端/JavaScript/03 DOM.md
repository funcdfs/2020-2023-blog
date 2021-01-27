---
title: DOM 核心
date: 2021-01-26
tags:
  - JavaScript
  - DOM
---

> 原生 JavaScript DOM 操作详解及实例

<!-- more -->

[DOM 标准文档： https://dom.spec.whatwg.org/](https://dom.spec.whatwg.org/)

js 中匿名函数的写法用来操作 dom，dom 就是融合 js 和 html 的方式，将之前的 JavaScript 用在网页交互上

## 学习目标

- 能够区分文档、节点、元素
- 能够通过 ID、标签名、class、选择器来获取元素
- 能够获取 body 和 html 元素
- 能够给元素注册事件
- 能够修改元素的内容
- 能够区分 innerText 和 innerHTML 的区别
- 能够修改像 div 这类普通元素的属性
- 能够修改表单元素的属性
- 能够修改元素的样式属性
  
***

- 能够说出排他操作的一般实现步骤
- 能够使用 html5 中的 dataset 方式操作自定义属性
- 能够根据提示完成百度换肤的案例
- 能够根据提示完成全选案例
- 能够根据提示完成 tab 栏切换案例
- 能够区分元素节点、文本节点、属性节点
- 能够获取指定元素的父元素
- 能够获取指定元素的所有子元素
- 能够说出 childNodes 和 children 的区别
- 能够使用 createElement 创建页面元素

## 操作元素基础

![2021-01-26-15-00-19](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-26-15-00-19.png)

### getElementById 获取元素

这是绑定元素最常用的方法，因为 HTML 元素 ID 的唯一性

语法：`var element = document.getElementById(id);`

[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)

### getElementsByTagName 获取某些元素

[MDN-CN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByTagName)

语法：`var elements = document.getElementsByTagName(name);`

### getElementsByClassName 根据类名获得某些元素集合

语法： `var boxs = document.getElementsByClassName('box');`

### querySelector

H5 新增获取元素方式，不用获取元素使用多个不同的 API，比较方便

query:
n. 疑问，质问，疑问号 , [计] 查询
vi. 询问，表示怀疑
vt. 询问，对……表示疑问

``` js
//querySelector 返回指定选择器的第一个元素对象  切记 里面的选择器需要加符号 .box  #nav
var firstBox = document.querySelector('.box');
console.log(firstBox);
var nav = document.querySelector('#nav');
console.log(nav);
var li = document.querySelector('li');
console.log(li);
//querySelectorAll() 返回指定选择器的所有元素对象集合
var allBox = document.querySelectorAll('.box');
console.log(allBox);
var lis = document.querySelectorAll('li');
console.log(lis);
```

### 获取 body 和 html

``` html
<body>
    <script>
        // 1. 获取 body 元素
        var bodyEle = document.body;
        console.log(bodyEle);
        console.dir(bodyEle);
        // 2. 获取 html 元素
        // var htmlEle = document.html;
        var htmlEle = document.documentElement;
        console.log(htmlEle);
    </script>
</body>
```
### 事件三要素

事件是有三部分组成  事件源  事件类型  事件处理程序

1. 获取事件源
2. 绑定事件 注册事件
3. 添加事件处理程序 

``` html
<body>
    <button id="btn">唐伯虎</button>
    <script>
        // 点击一个按钮，弹出对话框
        //(1) 事件源 事件被触发的对象   谁  按钮
        var btn = document.getElementById('btn');
        //(2) 事件类型  如何触发 什么事件 比如鼠标点击 (onclick) 还是鼠标经过 还是键盘按下
        //(3) 事件处理程序  通过一个函数赋值的方式 完成
        btn.onclick = function() {
            alert('点秋香');
        }
    </script>
</body>
```
### innerText 和 innerHTML

同 v-Text 和 v-HTML

1. innerText 不识别 html 标签 非标准  去除空格和换行
2. innerHTML 识别 html 标签 W3C 标准 保留空格和换行的

这两个属性是可读写的  可以单纯的获取元素里面的内容

``` js
console.log(p.innerText);
console.log(p.innerHTML);
```

### 修改元素属性

绑定元素后通常还要修改他的相关属性值，用对象写法引出

``` html
<body>
    <button id="ldh">刘德华</button>
    <button id="zxy">张学友</button> <br>
    <img src="images/ldh.jpg" alt="" title="刘德华">

    <script>
        // 修改元素属性  src
        // 1. 获取元素
        var ldh = document.getElementById('ldh');
        var zxy = document.getElementById('zxy');
        var img = document.querySelector('img');
        // 2. 注册事件  完成处理程序
        zxy.onclick = function() {
            img.src = 'images/zxy.jpg';
            img.title = '张学友';
        }
        ldh.onclick = function() {
            img.src = 'images/ldh.jpg';
            img.title = '刘德华';
        }
    </script>
</body>

```

### 修改样式属性

有时候点击一个元素后，想让他的样式发生该边，而不是值改变的时候

就会用到函数修改 css 的功能，用对象写法`.style`引出

``` html
<body>
    <div></div>
    <script>
        // 1. 获取元素
        var div = document.querySelector('div');
        // 2. 注册事件 处理程序
        div.onclick = function() {
            // div.style 里面的属性 采取驼峰命名法 
            this.style.backgroundColor = 'purple';
            this.style.width = '250px';
        }
    </script>
</body>
```

### 通过 className 更改元素样式

但是当样式需要大幅度修改，js 中写那么多样式代码就不是很好

所以可以在 css 中创建一个新的类以及规定他的相关样式
然后用 js 代码简单的修改类名即可，并且这样的话也可以实现相关样式代码复用的效果

想保留之前的类名的话，用空格分开 `this.className = 'first change';`

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        div {
            width: 100px;
            height: 100px;
            background-color: pink;
        }
        
        .change {
            background-color: purple;
            color: #fff;
            font-size: 25px;
            margin-top: 100px;
        }
    </style>
</head>

<body>
    <div class="first">文本</div>
    <script>
        // 1. 使用 element.style 获得修改元素样式  如果样式比较少 或者 功能简单的情况下使用
        var test = document.querySelector('div');
        test.onclick = function() {
            // this.style.backgroundColor = 'purple';
            // this.style.color = '#fff';
            // this.style.fontSize = '25px';
            // this.style.marginTop = '100px';
            // 让我们当前元素的类名改为了 change

            // 2. 我们可以通过 修改元素的 className 更改元素的样式 适合于样式较多或者功能复杂的情况
            // 3. 如果想要保留原先的类名，我们可以这么做 多类名选择器
            // this.className = 'change';
            this.className = 'first change';
        }
    </script>
</body>

</html>
```

## 操作元素案例

只写逻辑部分即可

### 分时问候并显示不同图片案例

``` html
<body>
    <img src="images/s.gif" alt="">
    <div>上午好</div>
    <script>
        // 根据系统不同时间来判断，所以需要用到日期内置对象
        // 利用多分支语句来设置不同的图片
        // 需要一个图片，并且根据时间修改图片，就需要用到操作元素 src 属性
        // 需要一个 div 元素，显示不同问候语，修改元素内容即可
        // 1. 获取元素
        var img = document.querySelector('img');
        var div = document.querySelector('div');
        // 2. 得到当前的小时数
        var date = new Date();
        var h = date.getHours();
        // 3. 判断小时数改变图片和文字信息
        if (h < 12) {
            img.src = 'images/s.gif';
            div.innerHTML = '亲，上午好，好好写代码';
        } else if (h < 18) {
            img.src = 'images/x.gif';
            div.innerHTML = '亲，下午好，好好写代码';
        } else {
            img.src = 'images/w.gif';
            div.innerHTML = '亲，晚上好，好好写代码';
        }
    </script>
</body>
```

### 仿京东显示隐藏密码

简单的 if else 逻辑实现

``` html
<body>
    <div class="box">
        <label for="">
            <img src="images/close.png" alt="" id="eye">
        </label>
        <input type="password" name="" id="pwd">
    </div>
    <script>
        // 1. 获取元素
        var eye = document.getElementById('eye');
        var pwd = document.getElementById('pwd');
        // 2. 注册事件 处理程序
        var flag = 0;
        eye.onclick = function() {
            // 点击一次之后， flag 一定要变化
            if (flag == 0) {
                pwd.type = 'text';
                eye.src = 'images/open.png';
                flag = 1; // 赋值操作
            } else {
                pwd.type = 'password';
                eye.src = 'images/close.png';
                flag = 0;
            }
        }
    </script>
</body>
```

### 显示隐藏文本框内容

调用鼠标焦点事件 onfocus onblur

``` html
<body>
    <input type="text" value="手机">
    <script>
        // 1. 获取元素
        var text = document.querySelector('input');
        // 2. 注册事件 获得焦点事件 onfocus 
        text.onfocus = function() {
                // console.log('得到了焦点');
                if (this.value === '手机') {
                    this.value = '';
                }
                // 获得焦点需要把文本框里面的文字颜色变黑
                this.style.color = '#333';
            }
            // 3. 注册事件 失去焦点事件 onblur
        text.onblur = function() {
            // console.log('失去了焦点');
            if (this.value === '') {
                this.value = '手机';
            }
            // 失去焦点需要把文本框里面的文字颜色变浅色
            this.style.color = '#999';
        }
    </script>
</body>
```
### 关闭淘宝二维码案例

修改元素的样式，两种方法

``` html
<body>
    <div class="box">
        淘宝二维码
        <img src="images/tao.png" alt="">
        <i class="close-btn">×</i>
    </div>
    <script>
        // 1. 获取元素 
        var btn = document.querySelector('.close-btn');
        var box = document.querySelector('.box');
        // 2. 注册事件 程序处理
        btn.onclick = function() {
            box.style.display = 'none';
        }
    </script>
</body>
```

### 循环精灵图

在固定盒子大小中使用 js 切换 background position

``` html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        li {
            list-style-type: none;
        }
        
        .box {
            width: 250px;
            margin: 100px auto;
        }
        
        .box li {
            float: left;
            width: 24px;
            height: 24px;
            background-color: pink;
            margin: 15px;
            background: url(images/sprite.png) no-repeat;
        }
    </style>
</head>

<body>
    <div class="box">
        <ul>
            <li></li>
        </ul>
    </div>
    <script>
        // 1. 获取元素 所有的小 li 
        var lis = document.querySelectorAll('li');
        for (var i = 0; i < lis.length; i++) {
            // 让索引号 乘以 44 就是每个 li 的背景 y 坐标  index 就是我们的 y 坐标
            var index = i * 44;
            lis[i].style.backgroundPosition = '0 -' + index + 'px';
        }
    </script>
</body>

</html>
```

### 注册密码输入页面

判断读入的密码是否符合要求，进行相关的图片和文字切换

``` html
<body>
    <div class="register">
        <input type="password" class="ipt">
        <p class="message">请输入 6~16 位密码</p>
    </div>
    <script>
        // 首先判断的事件是表单失去焦点 onblur
        // 如果输入正确则提示正确的信息颜色为绿色小图标变化
        // 如果输入不是 6 到 16 位，则提示错误信息颜色为红色 小图标变化
        // 因为里面变化样式较多，我们采取 className 修改样式
        // 1. 获取元素
        var ipt = document.querySelector('.ipt');
        var message = document.querySelector('.message');
        //2. 注册事件 失去焦点
        ipt.onblur = function () {
            // 根据表单里面值的长度 ipt.value.length
            if (this.value.length < 6 || this.value.length > 16) {
                // console.log('错误');
                message.className = 'message wrong';
                message.innerHTML = '您输入的位数不对要求 6~16 位';
            } else {
                message.className = 'message right';
                message.innerHTML = '您输入的正确';
            }
        }
    </script>
</body>
```

### 开关灯案例

简单深色模式的实现

``` html
<body>
    <button id="btn">开关灯</button>
    <script>
        var btn = document.getElementById('btn');
        var flag = 0;
        btn.onclick = function() {
            if (flag == 0) {
                document.body.style.backgroundColor = 'black';
                flag = 1;
            } else {
                document.body.style.backgroundColor = '#fff';
                flag = 0;
            }
        }
    </script>
</body>
```

## 操作元素数组基础

使用 js 的一个方便之处在于可以同时操作多个元素，不用每个元素都绑定事件，利用 for 循环解决

### 按钮数组操作

``` html

<body>
    <button>按钮 1</button>
    <button>按钮 2</button>
    <button>按钮 3</button>
    <button>按钮 4</button>
    <button>按钮 5</button>
    <script>
        // 1. 获取所有按钮元素
        var btns = document.getElementsByTagName('button');
        // btns 得到的是伪数组  里面的每一个元素 btns[i]
        for (var i = 0; i < b tns.length; i++) {
            btns[i].onclick = function() {
                // (1) 我们先把所有的按钮背景颜色去掉  干掉所有人
                for (var i = 0; i < btns.length; i++) {
                    btns[i].style.backgroundColor = '';
                }
                // (2) 然后才让当前的元素背景颜色为 pink 留下我自己
                this.style.backgroundColor = 'pink';

            }
        }
        //2. 首先先排除其他人，然后才设置自己的样式 这种排除其他人的思想我们成为排他思想
    </script>
</body>
```

### 换肤效果

主要掌握 更改 src 的特殊写法，更改 backgroundImage 即可
``` html
<body>
    <ul class="baidu">
        <li><img src="images/1.jpg"></li>
        <li><img src="images/2.jpg"></li>
        <li><img src="images/3.jpg"></li>
        <li><img src="images/4.jpg"></li>
    </ul>
    <script>
        // 1. 获取元素 
        var imgs = document.querySelector('.baidu').querySelectorAll('img');
        // console.log(imgs);
        // 2. 循环注册事件 
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].onclick = function() {
                // this.src 就是我们点击图片的路径   images/2.jpg
                // console.log(this.src);
                // 把这个路径 this.src 给 body 就可以了
                document.body.style.backgroundImage = 'url(' + this.src + ')';
            }
        }
    </script>
</body>
```
[源码](https://github.com/fengwei2002/dom-living-examples/tree/main/02%20%E7%99%BE%E5%BA%A6%E6%8D%A2%E8%82%A4%E6%95%88%E6%9E%9C)

### 表格鼠标悬浮隔行换色

主要掌握获取数组对象的方式

以及 `onmouseover` `onmouseout` 两个事件的使用

``` html
<script>
        // 1. 获取元素 获取的是 tbody 里面所有的行
        var trs = document.querySelector('tbody').querySelectorAll('tr');
        // 2. 利用循环绑定注册事件
        for (var i = 0; i < trs.length; i++) {
            // 3. 鼠标经过事件 onmouseover
            trs[i].onmouseover = function() {
                    // console.log(11);
                    this.className = 'bg';
                }
                // 4. 鼠标离开事件 onmouseout
            trs[i].onmouseout = function() {
                this.className = '';
            }
        }
</script>
```

### 全选反选 TODO 列表

> 效果的底层逻辑都是很简单的 if 和 for 一点点算法都用不上，所以前端有手就行的确，学的多一些才能鹤立鸡群

主要掌握相关实现方式，记住可复现即可

``` js
// 1. 全选和取消全选做法：  让下面所有复选框的 checked 属性（选中状态） 跟随 全选按钮即可
// 获取元素
var j_cbAll = document.getElementById('j_cbAll'); // 全选按钮
var j_tbs = document.getElementById('j_tb').getElementsByTagName('input'); // 下面所有选框
// 注册事件
j_cbAll.onclick = function() {
        // this.checked 它可以得到当前复选框的选中状态如果是 true 就是选中，如果是 false 就是未选中
        console.log(this.checked);
        for (var i = 0; i < j_tbs.length; i++) {
            j_tbs[i].checked = this.checked;
        }
    }
//对所有选框提供相同的事件
for (var i = 0; i < j_tbs.length; i++) {   
    j_tbs[i].onclick = function() {
        // flag 控制全选按钮是否选中
        var flag = true;
        // 每次点击下面的复选框都要循环检查者 4 个小按钮是否全被选中
        for (var i = 0; i < j_tbs.length; i++) {
            if (!j_tbs[i].checked) {
                flag = false;
                break; // 退出 for 循环 这样可以提高执行效率 因为只要有一个没有选中，剩下的就无需判断了
            }
        }
        j_cbAll.checked = flag;
    }
}
```
## 自定义属性

选中元素后，通过对象写法来查找或者改变相关属性值
`element.getAttribute('属性')`
`element. 属性= '值'`
`element.setAttribute('属性', '值');`
`div.removeAttribute('index');`

``` html
<body>
    <div id="demo" index="1" class="nav"></div>
    <script>
        var div = document.querySelector('div');
        // 1. 获取元素的属性值
        // (1) element. 属性
        console.log(div.id);
        //(2) element.getAttribute('属性')  get 得到获取 attribute 属性的意思 我们程序员自己添加的属性我们称为自定义属性 index
        console.log(div.getAttribute('id'));
        console.log(div.getAttribute('index'));
        // 2. 设置元素属性值
        // (1) element. 属性= '值'
        div.id = 'test';
        div.className = 'navs';
        // (2) element.setAttribute('属性', '值');  主要针对于自定义属性
        div.setAttribute('index', 2);
        div.setAttribute('class', 'footer'); // class 特殊  这里面写的就是 class 不是 className
        // 3 移除属性 removeAttribute（属性）    
        div.removeAttribute('index');
    </script>
</body>
```

### 案例：TAB 栏切换

``` html
<body>
    <div class="tab">
        <div class="tab_list">
            <ul>
                <li class="current">商品介绍</li>
                <li>规格与包装</li>
                <li>售后保障</li>
                <li>商品评价（50000）</li>
                <li>手机社区</li>
            </ul>
        </div>
        <div class="tab_con">
            <div class="item" style="display: block;">
                商品介绍模块内容
            </div>
            <div class="item">
                规格与包装模块内容
            </div>
            <div class="item">
                售后保障模块内容
            </div>
            <div class="item">
                商品评价（50000）模块内容
            </div>
            <div class="item">
                手机社区模块内容
            </div>

        </div>
    </div>
    <script>
        // 获取元素
        var tab_list = document.querySelector('.tab_list');
        var lis = tab_list.querySelectorAll('li');
        var items = document.querySelectorAll('.item');
        // for 循环绑定点击事件
        for (var i = 0; i < lis.length; i++) {
            // 开始给 5 个小 li 设置索引号 
            lis[i].setAttribute('index', i);
            lis[i].onclick = function() {
                // 1. 上的模块选项卡，点击某一个，当前这一个底色会是红色，其余不变（排他思想） 修改类名的方式

                // 干掉所有人 其余的 li 清除 class 这个类
                for (var i = 0; i < lis.length; i++) {
                    lis[i].className = '';
                }
                // 留下我自己 
                this.className = 'current';
                // 2. 下面的显示内容模块
                var index = this.getAttribute('index');
                console.log(index);
                // 干掉所有人 让其余的 item 这些 div 隐藏
                for (var i = 0; i < items.length; i++) {
                    items[i].style.display = 'none';
                }
                // 留下我自己 让对应的 item 显示出来
                items[index].style.display = 'block';
            }
        }
    </script>
</body>
```

### H5 新增自定义属性操作

自定义属性和元素自带的属性做区分：`data-`和`dataset`

``` html
<body>
    <div getTime="20" data-index="2" data-list-name="andy"></div>
    <script>
        var div = document.querySelector('div');
        // console.log(div.getTime);
        console.log(div.getAttribute('getTime'));
        div.setAttribute('data-time', 20);
        console.log(div.getAttribute('data-index'));
        console.log(div.getAttribute('data-list-name'));
        // h5 新增的获取自定义属性的方法 它只能获取 data-开头的
        // 数组调用
        // dataset 是一个集合里面存放了所有以 data 开头的自定义属性
        console.log(div.dataset);
        console.log(div.dataset.index);
        console.log(div.dataset['index']);
        // 如果自定义属性里面有多个-链接的单词，我们获取的时候采取 驼峰命名法
        console.log(div.dataset.listName);
        console.log(div.dataset['listName']);
    </script>
</body>
```

## 节点

[节点概念](https://www.w3school.com.cn/htmldom/dom_nodes.asp)

### 父节点

``` html
<body>
    <!-- 节点的优点 -->
    <div>我是div</div>
    <span>我是span</span>
    <ul>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
    </ul>
    <div class="demo">
        <div class="box">
            <span class="erweima">×</span>
        </div>
    </div>

    <script>
        // 1. 父节点 parentNode
        var erweima = document.querySelector('.erweima');
        // var box = document.querySelector('.box');
        // 得到的是离元素最近的父级节点(亲爸爸) 如果找不到父节点就返回为 null
        console.log(erweima.parentNode);
    </script>
</body>
```

### 子节点

childNodes 包含无任何标签包含的文本元素和空元素
children 只包含标签格式的子节点

``` html
<body>
    <!-- 节点的优点 -->
    <div>我是div</div>
    <span>我是span</span>
    <ul>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>

    </ul>
    <ol>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
        <li>我是li</li>
    </ol>

    <div class="demo">
        <div class="box">
            <span class="erweima">×</span>
        </div>
    </div>

    <script>
        // DOM 提供的方法（API）获取
        var ul = document.querySelector('ul');
        var lis = ul.querySelectorAll('li');
        // 1. 子节点  childNodes 所有的子节点 包含 元素节点 文本节点等等
        console.log(ul.childNodes);
        console.log(ul.childNodes[0].nodeType);
        console.log(ul.childNodes[1].nodeType);
        // 2. children 获取所有的子元素节点 也是我们实际开发常用的
        console.log(ul.children);
    </script>
</body>
```
### 第一个和最后一个

firstChild
lastChild

实际开发中使用children数组取出相关节点

``` html
<body>
    <ol>
        <li>我是li1</li>
        <li>我是li2</li>
        <li>我是li3</li>
        <li>我是li4</li>
        <li>我是li5</li>
    </ol>
    <script>
        var ol = document.querySelector('ol');
        // 1. firstChild 第一个子节点 不管是文本节点还是元素节点
        console.log(ol.firstChild);
        console.log(ol.lastChild);
        // 2. firstElementChild 返回第一个子元素节点 ie9才支持
        console.log(ol.firstElementChild);
        console.log(ol.lastElementChild);
        // 3. 实际开发的写法  既没有兼容性问题又返回第一个子元素
        console.log(ol.children[0]);
        console.log(ol.children[ol.children.length - 1]);
    </script>
</body>
```
### 案例：新浪下拉菜单


``` html
<script>
    // 1. 获取元素
    var nav = document.querySelector('.nav');
    var lis = nav.children; // 得到4个小li
    // 2.循环注册事件
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
            this.children[1].style.display = 'block';
        }
        lis[i].onmouseout = function() {
            this.children[1].style.display = 'none';
        }
    }
</script>
```
### 兄弟节点、

nextSibling  previousSibling

``` html
<body>
    <div>我是div</div>
    <span>我是span</span>
    <script>
        var div = document.querySelector('div');
        // 1.nextSibling 下一个兄弟节点 包含元素节点或者 文本节点等等
        console.log(div.nextSibling);
        console.log(div.previousSibling);
        // 2. nextElementSibling 得到下一个兄弟元素节点
        console.log(div.nextElementSibling);
        console.log(div.previousElementSibling);
    </script>
</body>
```

### 创建和添加节点

我们想要页面添加一个新的元素 ： 1. 创建元素 2. 添加元素

createElement
appendChild
insertBefore

``` html
<body>
    <ul>
        <li>123</li>
    </ul>
    <script>
        // 1. 创建节点元素节点
        var li = document.createElement('li');
        // 2. 添加节点 node.appendChild(child)  node 父级  child 是子级 后面追加元素  类似于数组中的push
        var ul = document.querySelector('ul');
        ul.appendChild(li);
        // 3. 添加节点 node.insertBefore(child, 指定元素);
        var lili = document.createElement('li');
        ul.insertBefore(lili, ul.children[0]);
    </script>
</body>
```

### 删除节点

removeChild

``` html
<body>
    <button>删除</button>
    <ul>
        <li>熊大</li>
        <li>熊二</li>
        <li>光头强</li>
    </ul>
    <script>
        // 1.获取元素
        var ul = document.querySelector('ul');
        var btn = document.querySelector('button');
        // 2. 删除元素  node.removeChild(child)
        // ul.removeChild(ul.children[0]);
        // 3. 点击按钮依次删除里面的孩子
        btn.onclick = function() {
            if (ul.children.length == 0) {
                this.disabled = true;
            } else {
                ul.removeChild(ul.children[0]);
            }
        }
    </script>
</body>
```


### 节点案例：留言的发布删除


``` html
<body>
    <textarea name="" id=""></textarea>
    <button>发布</button>
    <ul>

    </ul>
    <script>
        // 1. 获取元素
        var btn = document.querySelector('button');
        var text = document.querySelector('textarea');
        var ul = document.querySelector('ul');
        // 2. 注册事件
        btn.onclick = function() {
            if (text.value == '') {
                alert('您没有输入内容');
                return false;
            } else {
                // console.log(text.value);
                // (1) 创建元素
                var li = document.createElement('li');
                // 先有li 才能赋值
                li.innerHTML = text.value + "<a href='javascript:;'>删除</a>";
                // (2) 添加元素
                // ul.appendChild(li);
                ul.insertBefore(li, ul.children[0]);
                // (3) 删除元素 删除的是当前链接的li  它的父亲
                var as = document.querySelectorAll('a');
                for (var i = 0; i < as.length; i++) {
                    as[i].onclick = function() {
                        // node.removeChild(child); 删除的是 li 当前a所在的li  this.parentNode;
                        ul.removeChild(this.parentNode);
                    }
                }
            }
        }
    </script>
</body>
```

### 克隆节点

`cloneNode(true);`

``` html
<body>
    <ul>
        <li>1111</li>
        <li>2</li>
        <li>3</li>
    </ul>
    <script>
        var ul = document.querySelector('ul');
        // 1. node.cloneNode(); 括号为空或者里面是false 浅拷贝 只复制标签不复制里面的内容
        // 2. node.cloneNode(true); 括号为true 深拷贝 复制标签复制里面的内容
        var lili = ul.children[0].cloneNode(true);
        ul.appendChild(lili);
    </script>
</body>
```

### [动态生成表格案例](https://github.com/fengwei2002/konng.now.sh/tree/master/docs/_posts/%E5%89%8D%E7%AB%AF/JavaScript/dynamictable.html)

表格的节点增删案例
## 创建元素的三种方式

``` html
<script>
    // 三种创建元素方式区别 
    // 1. document.write() 创建元素  如果页面文档流加载完毕，再调用这句话会导致面重绘
     var btn = document.querySelector('button');
     btn.onclick = function() {
         document.write('<div>123</div>');
     }
    // 2. innerHTML 创建元素
    var inner = document.querySelector('.inner');
     for (var i = 0; i <= 100; i++) {
         inner.innerHTML += '<a href="#">百度</a>'
     }
    var arr = [];
    for (var i = 0; i <= 100; i++) {
        arr.push('<a href="#">百度</a>');
    }
    inner.innerHTML = arr.join('');
    // 3. document.createElement() 创建元素
    var create = document.querySelector('.create');
    for (var i = 0; i <= 100; i++) {
        var a = document.createElement('a');
        create.appendChild(a);
    }
</script>
```
### innerTHML和createElement效率对比

**innerHTML字符串拼接方式（效率低）**

```js
<script>
    function fn() {
        var d1 = +new Date();
        var str = '';
        for (var i = 0; i < 1000; i++) {
            document.body.innerHTML += '<div style="width:100px; height:2px; border:1px solid blue;"></div>';
        }
        var d2 = +new Date();
        console.log(d2 - d1);
    }
    fn();
</script>
```

**createElement方式（效率一般）**

```js
<script>
    function fn() {
        var d1 = +new Date();

        for (var i = 0; i < 1000; i++) {
            var div = document.createElement('div');
            div.style.width = '100px';
            div.style.height = '2px';
            div.style.border = '1px solid red';
            document.body.appendChild(div);
        }
        var d2 = +new Date();
        console.log(d2 - d1);
    }
    fn();
</script>
```

**innerHTML数组方式（效率高）**

```js
<script>
    function fn() {
        var d1 = +new Date();
        var array = [];
        for (var i = 0; i < 1000; i++) {
            array.push('<div style="width:100px; height:2px; border:1px solid blue;"></div>');
        }
        document.body.innerHTML = array.join('');
        var d2 = +new Date();
        console.log(d2 - d1);
    }
    fn();
</script>
```


## DOM 核心总结

关于dom操作，我们主要针对于元素的操作。主要有创建、增、删、改、查、属性操作、事件操作。

### 创建

- document.write （文件流末尾执行会重写页面）
- inner.HTML
- createElement


### 增加

- appendChild
- insertBefore

### 删

- removeChild


### 改

主要修改dom的完素属性，dom元素的内容、属性,表单的值等

1. 修改元素属性: src、href、title等
2. 修改普通元素内容:innerHTML、innerText
3. 修改表单元素:value、type、disabled等
4. 修改元素样式: style、className


### 查

主要获取查询dom的元素

1. DOM提供的API方法: getElementByld、getElementsByTagName古老用法不太推荐
2. H5提供的新方法:querySelector、querySelectorAll提倡  
3. 利用节点操作获取元素∶父(parentNode)、子(children)、兄(previousElementSibling.
nextElementSibling)提倡


### 属性操作

主要针对于自定义属性。

1. setAttribute :设置dom的属性值
2. getAttribute :得到dom的属性值
3. removeAttribute移除属性
