---
title: vue 基础应用
date: 2021-01-23
tags:
  - vue.js
---

>[官方文档](https://cn.vuejs.org/index.html)

<!-- more -->

### el 挂载点

将绑定选择器中的双括号内容映射到 data 中对应的值，进行相关操作

``` html 
<div id="app">
  {{ message }}
</div>
```

例如进行简单的文本插值

``` html
var app = new Vue({
  el: '#app',  //ID 选择器
  //el: '.app', 类选择器
  //el: 'div'  标签选择器
  data: {
    message: 'Hello Vue!'
  }
})
```

vue 不能挂载到 html 和 body 元素上，应该挂载到具体元素上，不能设置单标签

### data 数据对象

当 data 中的数据值为一个对象时，html 中调用时就要用对象的点写法引出

``` html
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="app">
            {{message}}
            <h2>
                {{school.name}}
            </h2>
        </div>
        <script>
            var app = new Vue({
                el: '#app',
                data: {
                    message: "hello vue",
                    school:{
                        name: "学校名字",
                        mobile: "110"
                    }
                }
            })
        </script>
    </body>
</html>
```

- vue 中用到的数据定义再 data 中
- data 中可以写复杂类型的数据
- 渲染复杂类型数据时，遵守 js 语法即可（数组，对象）

## vue 本地应用

通过 vue 实现常见的网页效果
学习 vue 指令 （v-）

vue 指令：

### v-text 

设置标签的文本值，内部支持表达式

``` html
<div id="app">
  <h2 v-text="message+'!'"> </h2>   //内容全部替换  
  <h2>h2 的内容是{{message}} </h2>
</div>

var app = new Vue({  //添加一个 vue 实例
  el: '#app',
  data:{
    message:"h2 的内容"
  }
})
```

### v-html 

更新元素的 innerHTML。替换的是html文本，会被当作html进行解析

注意：内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。如果试图使用 v-html 组合模板，可以重新考虑是否通过使用组件来替代。

``` html
<div id="app" v-html="html"></div>

var app = new Vue({  //添加一个 vue 实例
  el: '#app',
  data:{
    // html: "12345",
    html: "<a href="https://konng.now.sh">blog</a>"
  }
})
```

### [v-on](https://cn.vuejs.org/v2/api/#v-on) 基础

为元素绑定事件，指令可以简写为@，绑定的方法定义在methods属性中（与data同级）

``` html
<div id="app">
  <input type="button" value="按钮名字" v-on:事件名="方法">
  <input type="button" value="事件绑定" v-on:click="dolt">
  <input type="button" value="事件绑定" v-on:monseenter="dolt">
  <input type="button" value="事件绑定" v-on:dblclick="dolt">
  <input type="button" value="事件绑定" @dblclick="dolt">  //简化写法
</div>

<script>
  var app = new Vue({
      el: '#app',
      methods: {
          dolt: function(){
              //逻辑
              alert("输出了一段文字");
          }
      }
  })
</script>
```

vue将操作dom替换为操作数据，对数据进行更改即可更改页面，例如：

``` html
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="app">
            <input type="button" value="v-on指令" v-on:click="doIt">
            <input type="button" value="v-on简写" @click="doIt">
            <input type="button" value="双击事件" @dblclick="doIt">
            <h2 @click="changeFood"> {{food}} </h2>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script>
            var app = new Vue({
                el: '#app',
                data: {
                    food: "奶油面包"
                },
                methods: {
                    doIt: function(){
                        alert("doit");
                    },
                    changeFood:function(){
                        this.food += "好好吃!";
                    }
                }
            })
        </script>
    </body>
</html>
```

当点击h2时，就会出现文字叠加的效果

### 实例：本地计数器

使用vue实现的一个计数器
![2021-01-24-14-58-16](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2021-01-24-14-58-16.png)

``` html
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="app">
            <button @click="sub">-</button>
            <span>{{number}}</span>
            <button @click="add">+</button>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script>
            var app = new Vue({
                el: '#app',
                data: {
                    number: "0"
                },
                methods: {
                    sub: function(){
                        //console.log("sub");
                        this.number --;
                    },
                    add:function(){
                        this.number ++;
                    }
                }
            })
        </script>
    </body>
</html>
```

### v-show 

控制元素是否显示，效果同css中的 `display:none`

指令后面的内容，最终都会被解析为布尔值

数据改变之后，对应元素的显示状态也会同步更新


``` html
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="app">
            <h2 @click="change" v-show="conditions">Conditions</h2>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script>
            var app = new Vue({
                el: '#app',
                data: {
                    conditions: true
                },
                methods: {
                    change: function () {
                        this.conditions =!this.conditions;
                    }
                }
            })
        </script>
    </body>
</html>
```

通常控制元素是否显示绑定在另一个按钮上，不在本元素上实现

### v-if 

v-show 操纵的是元素的显示状态，v-if操纵的是dom树，其余使用方式完全相同

操纵dom树对内存的消耗较大，控制显示状态很简单

当需要频繁切换元素是否要显示的时候就用v-show，具体情况具体分析

### v-bind 

设置元素的属性（src，title，class），

``` html
<!DOCTYPE html>
<html lang="en">
    <body>
        <div id="app">
            <img v-bind:src="imgsrc"> //不同的属性都可以绑定后进行设置
            <img :src="imgsrc">   //简写可以省略v-bind，只保留 :属性名
        </div>

        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script>
            var app = new Vue({
                el: '#app',
                data: {
                    imgsrc: "/图片地址",
                },
            })
        </script>
    </body>
</html>
```

通常用来动态操控元素对应的class ，动态切换class，对应的class存在不同的css 

有两种写法：通常使用第二种对象写法，如果为真的话就切换class

``` html
<!DOCTYPE html>
<html lang="en">
    <style>
        .active{
            border: 10px solid #9400D3;
        }
    </style>
    <body>
        <div id="app">
            <img @click="toggleActive" :src="imgsrc" :title="imageTitle+'!'" :class="isActive?'active':''" />
        </br>
            <img @click="toggleActive" :src="imgsrc" :title="imageTitle+'!'" :class="{active:isActive}" />
        </div>

        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script>
            var app = new Vue({
                el: '#app',
                data: {
                    imageTitle: "test",
                    isActive: false,
                    imgsrc: "https://i.loli.net/2021/01/21/uTH8P3pkwmrcOKb.jpg",
                },
                methods: { //注意拼写为：methods 复数
                    toggleActive: function() {
                        this.isActive = !this.isActive;
                    },
                },
            })
        </script>
    </body>
</html>
```
 