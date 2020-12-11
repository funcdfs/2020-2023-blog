---
title: ABOUT
---

::: center
{{dist_times}}
:::

## Contact 

</br>

<span class="contact">
<a href="https://raw.githubusercontent.com/fengwei2002/fengwei2002/main/4200E2F1041F9865A7376B934D76600D.jpg" title="CIKI1F"> &nbsp Wechat &nbsp  </a>
</span>

<span class="contact">
<a href="https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/QQ.jpg" title="2480417969/2928256681"> &nbsp QQ &nbsp </a>
</span>

<span class="contact">
<a href="https://www.zhihu.com/people/kwmwmwnw" title="kycu"> &nbsp zhihu &nbsp </a>
</span>

<span class="contact">
<a href="http://music.163.com/m/user/home?id=440040659" title="konngkonng">  &nbsp netease cloud music &nbsp </a>
</span>

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


<span class="contact">
<a href="https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-24-11-41-33.jpg" title="微信公众号"> &nbsp wsublimation &nbsp </a>
</span>

</br>

</br>

## Playthings

::: center
[feng-w.cn —— || 使用 vuepress 搭建的个人博客](https://feng-w.cn)
:::

::: center
[vscode-theme-KONNG —— || 使用 vsce 创建的 vscode 主题插件](https://marketplace.visualstudio.com/items?itemName=OvO.konng)
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
