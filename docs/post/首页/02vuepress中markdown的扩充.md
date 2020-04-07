---
title: vuepress-use-markdown 
---

# vuepress-use-markdown 

有时间总结一次

## 使用vue以及js语法：

markdown中可以直接使用vue语法：

 Vue <Badge text="2.5.0+"/> 
 Vuex <Badge text="beta" type="warn" vertical="top"/> 
 Vue-Resource<Badge text="废弃" vertical="middle" type="error"/>

<!--样式内容-->
<style>
.box {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #fff;
  background-color: #58a;
}
</style>

<!--.md内容-->
#### 使用原生的JS和CSS
<div id="container"></div>

<!--js内容-->
<script>
window.onload = function() {
  var dom = document.getElementById('container');
  dom.innerHTML = 'box content'
  dom.className = 'box'
}
</script>

## 使用vscode中的插件进行美化

文章开头使用`insert time stamp`插入如下信息：分别代表开始日期和结束日期

###### Tue Apr 7 21:48:31 CST 2020
###### Tue Apr 7 21:49:01 CST 2020

………………