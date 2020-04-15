---
title: About
sidebar: false
---

## :book: 

</br>

Welcome to my personal website. I'm Feng Wei. You can reach me on [Wechat](https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/weixin.jpg), [Github](https://github.com/fengwei2002), or [Gmail](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200404154822.png)

> And Other active platform accounts:
>- [zhihu](https://www.zhihu.com/people/e2df61ca5f33cb1e72e27be2cefd18ba).
>- [QQ](https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/tim.jpg)
>- [Leetcode.cn](https://leetcode-cn.com/u/weirdo-21/)
>- [Codeforces](https://codeforces.com/profile/KONNG)
>- [NetEase Cloud Music](https://music.163.com/#/user/home?id=440040659)

## Open Source Project

Non-exhaustive list of stuff I work on:

[Projects](https://feng-w.cn/post/xiang-mu/)

## This blog

I built this blog using [Vue's](https://vuejs.org) static site generator [Vuepress](https://vuepress.vuejs.org/).     
It's completely static (for now) and you can find the source [here](https://github.com/fengwei2002/vuepress_final).  
Blog has been established {{ dist_times }} .

## Hobby

Like cat 

~~Like games~~

Like everything beautiful

Like to sleep ~~10.00pm-10.00am is Best~~

## Advantages

I am very young?  ~~2002~~

I am very tall? ~~187 centimeter~~

## Skills

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
        <small>Node.js</small>
         <a-progress :strokeColor="{
            from: '#f7f428',
            to: '#b35678',
          }" :percent="10"  status="active" />
    </div>
</template>

## Article

<center> <a href="/post/za-xiang-bi-ji/life/">📘Life</a></center>

$\qquad$

<center><a href="/post/za-xiang-bi-ji/pleasure/">💬Pleasure</a></center>

$\qquad$

<center><a href="/post/za-xiang-bi-ji/xiang-fa/">✨Idea</a></center>



<script>
export default {
   props: ['slot-key'],
   data() {
      return {
         dist_times: "xx days xx h xx m xx s"
      };
   },
   methods: {
      refresh() {
         let start_date = '2020-01-20 00:15:00.0';
         start_date = start_date.substring(0,19);
         start_date = start_date.replace(/-/g,'/');
         let start_timestamp = new Date(start_date).getTime();
         let now_timestamp = new Date();

         let dist_timestamp = now_timestamp - start_timestamp;
         let dist_days = Math.floor(dist_timestamp / (24*3600*1000));
         let dist_hours = Math.floor((dist_timestamp % (24*3600*1000)) / (3600*1000));
         let dist_mins = Math.floor((dist_timestamp % (3600*1000)) / (60*1000));
         let dist_secs = Math.floor((dist_timestamp % (60*1000)) / 1000);
         this.dist_times = `${dist_days} days ${dist_hours} h ${dist_mins} m ${dist_secs} s`;
      }
   },
   mounted () {
      this.refresh();
      setInterval(this.refresh, 1000);
   }
}
</script>

<link rel="stylesheet" href="https://ico.z01.com/zico.min.css">
