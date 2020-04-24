---
top: true
title: About
---



<span style="font-family: 'Baloo Paaji 2', cursive;">
    <p>
        Welcome to <a href="../../">my personal website</a>,
        You can reach me on
        <a href="https://pic4.zhimg.com/v2-6cd96e76699f0459b35aa58ff3577267_r.jpg">Wechat<a>,
                <a href="https://pic1.zhimg.com/v2-65f5e198d3f046fdb668f8d4838b4050_r.jpg">QQ<a>, or
                        <a href="mailto:psychonaut1f@gmail.com">Gmail</a>.
    </p>
    <h2>Open Source Project</h2>
    Non-exhaustive list of stuff I work on:</br>
    ..
    <h2>This blog</h2>
    I built this blog using <a href="https://vuejs.org">Vue's</a> static site generator <a
        href="https://vuepress.vuejs.org/">VuePress</a>
    and this blog has been established {{ dist_times }} .
    <h2>Hobby</h2>
    Like cat</br>
    Like games</br>
    Like everything beautiful</br>
    Like to sleep 10.00pm-10.00am is Best
    <h2>Advantages</h2>
    I am very young? 2002</br>
    I am very tall? 187 centimeter
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