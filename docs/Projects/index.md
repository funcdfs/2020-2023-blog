---
title: Projects
header-image: /assets/img/head.jpg
---

::: tip  🌴 Playthings
<!-- > [dribbble profile](https://dribbble.com/fengwei2002) -->
- [konng.vercel.app](https://konng.vercel.app) 已运行 {{dist_times}}  
- [vscode-theme-KONNG](https://marketplace.visualstudio.com/items?itemName=OvO.konng)  VsCode 主题 
- [fengwei2002/Algorithm](https://github.com/fengwei2002/Algorithm) 算法笔记仓库
- [C++ 算法模板](https://www.notion.so/fengwei2002/include-algorithm-2ed2f53326b049b8945f6119c83874be) C++ 算法模板
:::

::: tip 🍀 Contact 
- Github: [fengwei2002](https://github.com/fengwei2002)  
- zhihu: [kycu](https://www.zhihu.com/people/kwmwmwnw)  
- LeetCode: [kycu](https://leetcode-cn.com/u/kycu/)  
- Wechat: [konng0120](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/konng0120-2021-06-19.jpg)||[kycu](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-24-11-41-33.jpg)
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
