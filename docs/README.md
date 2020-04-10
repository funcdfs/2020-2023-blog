---
home: true
heroImage: /logo.webp
heroText: psychonaut1f
tagline: fengwei's blog
actionText: 🌈 Enter 🌈
actionLink: /post/shou-ye/
preactionText: ✨ Project ✨
preactionLink: /post/xiang-mu/
features:
- title: 
  details: 
- title:
  details: 
- title: 三分热度
  details: 败于常人
---
 
<template>
    <div>
        <small>C/C++</small>
        <a-progress :strokeColor="{
            from: '#108ee9',
            to: '#87d068',
          }" :percent="80" :format="percent => `${percent} percent`" status="active" />
        <small>Data Structures & Algorithms</small>
        <a-progress :strokeColor="{
            from: '#a31420',
            to: '#8068d0',
          }" :percent="55" :format="percent => `${percent} percent`" status="active" />
        <small>HTMl & CSS & JavaScript</small>
         <a-progress :strokeColor="{
            from: '#71c9c6',
            to: '#63a5d4',
          }" :percent="33" :format="percent => `${percent} percent`" status="active" />
        <small>Vue.js & Vuepress</small>
         <a-progress :strokeColor="{
            from: '#f7f428',
            to: '#b35678',
          }" :percent="19" :format="percent => `${percent} percent`" status="active" />
    </div>
</template>

$$
\qquad
$$

<style scoped>
    .spin-content {
        border: 1px solid #91d5ff;
        background-color: #e6f7ff;
        padding: 30px;
    }
</style>
<template>
    <div>
        <a-spin tip="Loading...">
            <div class="spin-content">
                if.
            </div>
        </a-spin>
    </div>
</template>