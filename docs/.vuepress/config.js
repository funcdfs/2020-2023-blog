module.exports = {
  title: 'psychonaut1f', //左上角的博客标题
  logo: '/public/favicon.ico', //图标尽量小，加快国内访问
  theme: 'meteorlxy',

  head: [ //math显示
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      }
    ],
  ],

  markdown: {
    lineNumbers: false, // 代码行号应该关闭，要不然手机查看很费劲
    extendMarkdown: md => {
      md.set({
        html: true
      });
      md.set({
        breaks: true
      });
      md.use(require('markdown-it-mark')); //高亮渲染
      md.use(require('@iktakahiro/markdown-it-katex')); //math渲染
      md.use(require('markdown-it-task-lists')); //todo渲染
      md.use(require('markdown-it-footnote')); //角标
      md.use(require('markdown-it-kbd')); //按键
      md.use(require('markdown-it-imsize')); //自定义图片的大小
    }
  },

  themeConfig: { //主题配置项
    comments: {
      platform: 'github',
      owner: 'fengwei2002',
      repo: 'mygitalk',
      clientId: '215827c9064649c94cc7',
      clientSecret: '99a3239a0889c4917b47c601f6a642c2cc8e2812',
      autoCreateIssue: process.env.NODE_ENV !== 'development',
    },

    locales: {
      '/': {
        lang: 'zh-CN',
      },
    },
    lang: Object.assign(require('vuepress-theme-meteorlxy/lib/langs/zh-CN'), {
      home: `Welcome to fengwei's Homepage`,
      posts: 'My Posts',
    }),
    nav: [{
        text: 'Home',
        link: '/',
        exact: true
      },
      {
        text: 'Posts',
        link: '/posts/',
        exact: false
      },
      {
        text: 'About',
        link: '/About/',
        exact: false
      },
    ],
    personalInfo: {
      nickname: 'psychonaut1f',
      description: 'Life as I understand it is to be with everything I like',
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
    },
    // 上方 header 的相关设置 (可选)
    header: {
      // header 的背景，可以使用图片，或者随机变化的图案（geopattern）
      background: {
        url: 'head.jpg',
      },
      showTitle: true,
    },
    // 底部 footer 的相关设置 (可选)
    footer: {
      // 是否显示 Powered by VuePress
      poweredBy: false,
      // 是否显示使用的主题
      poweredByTheme: false,
      // 添加自定义 footer (支持 HTML)
      custom: 'psychonaut1f@gmail.com',
    },
    // 个人信息卡片相关设置 (可选)
    infoCard: {
      headerBackground: {
        useGeo: false,
      },
    },
    // 是否显示文章的最近更新时间
    lastUpdated: true,
    plugins: [
      ["cursor-effects"], //鼠标点击特效
      ['vuepress-plugin-reading-progress'], //顶部进度条
      ['@vuepress/last-updated'], //显示文章最后更新时间
      ["go-top"], // 悬挂猫返回顶部,yarn add -D vuepress-plugin-go-top
      ['@vuepress/medium-zoom', {
        selector: '.content__default img',
      }], //图片放大
      ['flowchart'], //流程图渲染
      ['vuepress-plugin-seo'],
      ['vuepress-plugin-baidu-autopush'], //百度推送
      ["vuepress-plugin-auto-sidebar", {
        titleMode: "uppercase"
      }], //自动生成侧边栏
    ]
  }
}