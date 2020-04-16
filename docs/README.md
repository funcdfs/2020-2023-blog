---
home: true
heroImage: none
heroText: psychonaut1f
tagline: fengwei's blog
actionText: 🌈 Enter 🌈
actionLink: /_posts/Home/
---

</br>

<center>{{ dist_times }} </center>

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
