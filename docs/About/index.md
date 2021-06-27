---
title: ABOUT
header-image: /assets/img/head002.jpg
---
## 🌴 Playthings
<!-- > [dribbble profile](https://dribbble.com/fengwei2002) -->
- [konng.vercel.app](https://konng.vercel.app) 博客，已运行{{dist_times}}  
- [vscode-theme-KONNG](https://marketplace.visualstudio.com/items?itemName=OvO.konng)  VsCode 主题 

## 🍀 Contact 
- 🔗 Github: [fengwei2002](https://github.com/fengwei2002)
- 🔗 zhihu: [kycu](https://www.zhihu.com/people/kwmwmwnw)
- 🔗 leetcode: [fengwei2002](https://leetcode-cn.com/u/fengwei2002/)
- 🔗 codeforces: [KONNG](http://codeforces.com/profile/KONNG#)
- 🔗 Weibo: [psychonaut1f](http://www.weibo.com/u/7385213104)
- 🔗 NeteaseCloudMusic: [konngkonng](http://music.163.com/m/user/home?id=440040659)
- 🔗 Wechat: [konng0120](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/konng0120-2021-06-19.jpg)||[wsublimation ](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-24-11-41-33.jpg)
- 🔗 QQ: [ORCode](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/QQ.jpg)

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
