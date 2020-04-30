---
top: true
title: About
---

<span>
    <p>
        Welcome to <a href="../../"> my personal website</a>,I'm feng wei,</br>
        this vuepress blog has been established {{ dist_times }},</br>
        and you can reach me on
        <a href="https://pic4.zhimg.com/v2-6cd96e76699f0459b35aa58ff3577267_r.jpg">WeChat</a>,
        <a href="https://pic1.zhimg.com/v2-65f5e198d3f046fdb668f8d4838b4050_r.jpg">QQ</a>,or
        <a href="https://github.com/fengwei2002">Github</a>.
    </p>
    <h2>Project</h2>
    Non-exhaustive list of stuff I work on:</br>
    ..
    </br>
    <h2>Hobby</h2>
    Like cat</br>
    <s>Like Games</s></br>
    Like to sleep <s>10.00pm-10.00am is Best</s>
    <h2>Advantages</h2>
    I am very young? <s>2002-01-20</s></br>
    I am very tall? <s>187 centimeter</s>
    <h2>Blog</h2>
    I built this blog using <a href="https://vuejs.org">Vue's</a> static site generator <a
    href="https://vuepress.vuejs.org/">VuePress</a> and you can find the source <a herf="">here</a>.</br>
</span>


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
