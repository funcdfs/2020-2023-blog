
module.exports = {
    "ribbon":
           {
              size: 90, // 彩带的宽度，默认为 90
              opacity: 0.8, // 彩带的不透明度，默认为 0.3
              zIndex: -1 // 彩带的 z-index 属性，默认值为 -1
           },
    "dynamic-title":
           {
              showIcon: "/favicon.ico",
              showText: "(/≧▽≦/)咦！又好了！",
              hideIcon: "/failure.ico",
              hideText: "(●—●)喔哟，崩溃啦！",
              recoverTime: 2000
           },
    "cursor-effects":
           {
             size: 2,                    // size of the particle, default: 2
             zIndex: 999999999           // z-index property of the canvas, default: 999999999
           },
    'go-top': {},
    "vuepress-plugin-auto-sidebar": {
        titleMode: "uppercase"
      },
  };