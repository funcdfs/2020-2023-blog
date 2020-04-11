---
home: true
heroImage: /logo.webp
heroText: if(i&1<<j))
tagline: fengwei's blog
actionText: 🌈 Enter 🌈
actionLink: /post/shou-ye/
preactionText: ✨ Project ✨
preactionLink: /post/xiang-mu/
---
 
$$
\qquad
$$

<template>
    <div>
        <small>C/C++</small>
        <a-progress :strokeColor="{
            from: '#108ee9',
            to: '#87d068',
          }" :percent="80"  status="active" />
        <small>Data Structures & Algorithms</small>
        <a-progress :strokeColor="{
            from: '#a31420',
            to: '#8068d0',
          }" :percent="55"  status="active" />
        <small>HTMl & CSS & JavaScript</small>
         <a-progress :strokeColor="{
            from: '#71c9c6',
            to: '#63a5d4',
          }" :percent="33"  status="active" />
        <small>Vue.js & Vuepress</small>
         <a-progress :strokeColor="{
            from: '#f7f428',
            to: '#b35678',
          }" :percent="19"  status="active" />
    </div>
</template>
