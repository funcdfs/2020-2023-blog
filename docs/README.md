---
home: true
heroText: psychonaut1f
tagline: fengwei's blog
footer: psychonaut1f@gmail.com 
---
# 


Welcome to [my personal website](/_posts/Home/). I'm Feng Wei. You can reach me on [Wechat](https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/weixin.jpg), [Github](https://github.com/fengwei2002), or [Gmail.](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200404154822.png)

> And Other active platform accounts:

 - [NetEase Cloud Music.](https://music.163.com/#/user/home?id=440040659)
 - [zhihu](https://www.zhihu.com/people/e2df61ca5f33cb1e72e27be2cefd18ba).
 - [QQ.](https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/tim.jpg)
 - [Leetcode.cn.](https://leetcode-cn.com/u/weirdo-21/)
 - [Codeforces.](https://codeforces.com/profile/KONNG)

## Open Source Project

Non-exhaustive list of stuff I work on: [View](/_posts/Projects/).

## This blog

This blog has been established {{ dist_times }} .
I built this blog using [Vue's](https://vuejs.org) static site generator [Vuepress](https://vuepress.vuejs.org/).   
Creative inspiration comes from the dark mode of WeChat.  
It's completely static (for now) and If you encounter problems in using VuePress, you can also ask me.

## Hobby

Like cat 
~~Like games~~
Like everything beautiful
Like to sleep ~~10.00pm-10.00am is Best~~

## Advantages

I am very young?  ~~2002~~
I am very tall? ~~187 centimeter~~

## Article

> <center> <a href="/_posts/Notes/life/">Life</a></center>

> <center><a href="/_posts/Notes/pleasure/">Pleasure</a></center>

> <center><a href="/_posts/Notes/Idea/">Idea</a></center>



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


<div class="sticky-container">
   <div class="blurfield">
     <div class="ball1"></div>
     <div class="ball2"></div>
   </div>
 </div>
