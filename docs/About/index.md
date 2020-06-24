---
title: ABOUT
---

## Contact 

</br>

<span class="contact">
<a href="https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/wx.jpg" title="CIKI1F"> &nbsp Wechat &nbsp  </a>
</span>

<span class="contact">
<a href="https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/QQ.jpg" title="2480417969/2928256681"> &nbsp QQ &nbsp </a>
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

## Plaything

::: center
[vscode-theme-fengwei2002](https://marketplace.visualstudio.com/items?itemName=psychonaut1f.fengwei2002)
:::


## Hobby

Like cat ~~miao\~~~
~~Like Games~~
Like to sleep ~~10.00pm-10.00am is Best~~

## Advantages

I am very young? ~~2002.01.20~~
I am very tall? ~~187+~~


::: details 这个网站

>You can find the source [here](https://github.com/fengwei2002/feng-w.cn).

$\qquad$大一查资料看到很多别人的博客很好看，然而技术不允许实现，大一期末考完回家学会了怎么用这个 GitHub 和 Git。磕磕绊绊的看 Jekyll 教程搭建了一个博客，很长时间后想着自己完完全全自定义一个博客（强迫症本症），中途因为 vuepress 中的内置 [markdown 容器语法](https://vuepress.vuejs.org/zh/guide/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8)和 [vuepress](https://vuepress.vuejs.org/zh/) 的一些作品，看着官方文档什么都不懂的情况下搭了一个出来，并且还用 zeit.co 代理了这个网站，这个过程中玩GitHub玩的更明明白白了，命令行是什么也有个概念了，npm 的简便性也让我大吃一惊……
$\qquad$大一期末考试结束了，我的博客也很稳定的的运行了起来（疫情一个寒假直接大二可还行？），现在就是一个新的开始了，学习计算机网路，计算机系统，认真再来一次数据结构，然后完整的过一次 js 和 vue，再写几个 vuepress 主题…………路还长，慢慢走
> 未完待续$\cdots$ {{dist_times}}
:::
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
