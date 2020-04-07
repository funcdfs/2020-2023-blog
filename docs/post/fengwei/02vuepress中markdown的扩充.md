---
title: 介绍一些vuepress对markdown的优化
---

# vuepress对markdown的优化

有时间总结一次

## 对前端人员非常友好

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
