module.exports = {
  title: 'psychonaut1f',
  logo: '/public/logo.ico',
  plugins: [
    //功能添加
    ['container', { //details容器
      type: 'details',
      before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
      after: () => '</details>\n'
    }],
    ['@vuepress/pwa', { //pwa
      serviceWorker: true,
      updatePopup: {
        message: "🌈Feng Wei Posted New Content🌈",
        buttonText: "Click To Refresh"
      }
    }],//这是一个bug插件，去除后浏览器还是读取之前的缓存，加上之后就得一直留着了，，
    ["@vuepress/medium-zoom", { //图片点击放大
      selector: '.content__default img',
    }],

    //页面美化
    ['nest', {
      color: '148, 0, 211', // color of lines, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
      pointColor: '148, 0, 211', // color of points, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
      count: 92, // the number of lines, default: 99.
    }],
    ["cursor-effects"], //鼠标特效
    ["go-top"], //喵
    ["vuepress-plugin-reading-progress"], //进度条
  ],
  head: [
    // [
    //   "link",
    //   {
    //     rel: "stylesheet",
    //     href: "https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@600&display=swap"
    //   }
    // ], //WEB字体
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=3, minimum-scale=0.5"
      }
    ], //移动端放大缩小的设置
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      }
    ], //Katex
  ],
  markdown: { //markdown扩展
    lineNumbers: false, // 代码行号应该关闭，要不然手机查看很费劲
    extendMarkdown: md => {
      md.set({
        html: true
      });
      md.set({
        breaks: true //去除空格换行
      });
      md.use(require('markdown-it-mark')); //高亮渲染
      md.use(require('@iktakahiro/markdown-it-katex')); //math渲染
      md.use(require('markdown-it-task-lists')); //todo渲染
      md.use(require('markdown-it-imsize')); //自定义图片的大小
      md.use(require("markdown-it-vuepress-code-snippet-enhanced")); //代码块文件引入
    }
  },
  theme: 'meteorlxy',
  themeConfig: { //主题配置项
    locales: {
      '/': {
        lang: 'en-US',
      },
    }, //US
    lastUpdated: true, //最后更新时间
    lang: Object.assign(require('vuepress-theme-meteorlxy/lib/langs/en-US'), {
      home: `feng-w.cn`,
      posts: 'Articles',
    }), //自定义部分文字
    pagination: {
      perPage: 6,
    }, //每页文章数量
    nav: [{
      text: '🍀Home',
      link: '/',
      exact: true
    },
    {
      text: '🍕Articles',
      link: '/posts/',
      exact: false
    },
    {
      text: '🎧About',
      link: '/About/',
      exact: false
    },
    ], //navbar导航栏
    personalInfo: {
      nickname: 'psychonaut1f',
      description: 'Life as I understand it is</br>to be with everything I like',
      email: 'psychonaut1f@gmail.com',
      location: 'Tai\'Yuan, Shan\'Xi, China',
      organization: 'Shan\'Xi University',
      avatar: 'https://feng-w.cn/logo.webp',
      sns: {
        github: {
          account: 'fengwei2002',
          link: 'https://github.com/fengwei2002',
        },
        zhihu: {
          account: 'weirdo',
          link: 'https://www.zhihu.com/people/e2df61ca5f33cb1e72e27be2cefd18ba',
        },
      },
    }, //个人信息
    header: {
      background: {
        url: 'https://pic4.zhimg.com/v2-4ea71149507ab224cd4dadfc746ff803_r.jpg',
      },
      showTitle: true,
    }, //header设置
    footer: {
      poweredBy: false,
      poweredByTheme: false,
      //custom: 'psychonaut1f@gmail.com',
    }, //fotter
    infoCard: {
      headerBackground: {
        useGeo: false,
      },
    }, //头像后面的背景图
    comments: {
      platform: 'github',
      owner: 'fengwei2002',
      repo: 'mygitalk',
      clientId: '215827c9064649c94cc7',
      clientSecret: '99a3239a0889c4917b47c601f6a642c2cc8e2812',
      prefix: '[Comments] ',
      labels: ['comments'],
    }, //vssue配置
  }
}