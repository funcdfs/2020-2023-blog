---
title: ABOUT
---

## 📌 Contact 

</br>

<span class="contact">
<a href="https://pic4.zhimg.com/v2-6cd96e76699f0459b35aa58ff3577267_r.jpg" title="fwei142857"> &nbsp Wechat &nbsp  </a>
</span>

<span class="contact">
<a href="https://pic1.zhimg.com/v2-65f5e198d3f046fdb668f8d4838b4050_r.jpg" title="2480417969"> &nbsp QQ &nbsp </a>
</span>


<span class="contact">
<a href="https://zhuanlan.zhihu.com/fengwei2002" title="weirdo"> &nbsp zhuanlan.zhihu &nbsp </a>
</span>

<span class="contact">
<a href="http://music.163.com/m/user/home?id=440040659" title="psychonaut1f">  &nbsp netease cloud music &nbsp </a>
</span>

</br>

</br>

<span class="contact">
<a href="https://github.com/fengwei2002" title="fengwei2002"> &nbsp github &nbsp </a>
</span>

<span class="contact">
<a href="https://leetcode-cn.com/u/fengwei2002/" title="fengwei2002"> &nbsp leetcode.cn &nbsp </a>
</span>

<span class="contact">
<a href="https://wakatime.com/@fengwei2002" title="fengwei2002"> &nbsp wakatime &nbsp </a>
</span>

<span class="contact">
<a href="http://codeforces.com/profile/KONNG#" title="KONNG"> &nbsp codeforce &nbsp </a>
</span>

</br>

</br>

## Blog
I built this blog {{dist_times}} ago using [Vue's](https://cn.vuejs.org/index.html) static site generator [Vuepress](https://vuepress.vuejs.org/zh/). 
and you can find the source [here](https://github.com/fengwei2002/feng-w.cn).


## Hobby

Like cat ~~miao\~~~
~~Like Games~~
Like to sleep ~~10.00pm-10.00am is Best~~

## Advantages

I am very young? ~~2002-01-20~~
I am very tall? ~~187+ centimeter~~

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
                start_date = start_date.substring(0, 19);
                start_date = start_date.replace(/-/g, '/');
                let start_timestamp = new Date(start_date).getTime();
                let now_timestamp = new Date();

                let dist_timestamp = now_timestamp - start_timestamp;
                let dist_days = Math.floor(dist_timestamp / (24 * 3600 * 1000));
                let dist_hours = Math.floor((dist_timestamp % (24 * 3600 * 1000)) / (3600 * 1000));
                let dist_mins = Math.floor((dist_timestamp % (3600 * 1000)) / (60 * 1000));
                let dist_secs = Math.floor((dist_timestamp % (60 * 1000)) / 1000);
                this.dist_times = `${dist_days} days ${dist_hours} h ${dist_mins} m ${dist_secs} s`;
            }
        },
        mounted() {
            this.refresh();
            setInterval(this.refresh, 1000);
        }
    }
</script>

<link rel="stylesheet" href="https://ico.z01.com/zico.min.css">
