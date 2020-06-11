module.exports = {
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      }
    ], //katex
  ],
  title: '',
  logo: '/public/logo.ico', //四叶草

  markdown: { //markdown扩展
    lineNumbers: false, // 代码行号应该关闭，要不然手机查看很费劲
    extendMarkdown: md => {
      md.set({
        html: true
      });
      md.set({
        breaks: true //去除markdown中的两空格换行
      });
      md.use(require('@iktakahiro/markdown-it-katex')); //math渲染
      md.use(require('markdown-it-task-lists')); //todo渲染
      md.use(require('markdown-it-mark')); //高亮
      md.use(require('markdown-it-imsize')); //自定义图片的大小
      md.use(require("markdown-it-vuepress-code-snippet-enhanced")); //代码块文件引入
    }
  },
  plugins: [
    ['flowchart'],
    ['img-lazy'],
    ['code-switcher'], //多语言选项卡
    ["cursor-effects"], //鼠标特效
    ['@vuepress/pwa', { //pwa
      serviceWorker: true,
      updatePopup: {
        message: "New Content！",
        buttonText: "Refresh"
      }
    }], //这是一个bug插件，去除后浏览器还是读取之前的缓存，加上之后就得一直留着了，，并且外观很丑
    //容器添加
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: '',
      },
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'theorem',
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: '</div>',
      },
    ],
    [
      'vuepress-plugin-container',
      { //添加 details 容器
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      },
    ],
    [
      'vuepress-plugin-container',
      { //添加居中容器
        type: 'center',
        before: info => `<div class="customer-container-center">`,
        after: '</div>',
      },
    ],
    [
      'vuepress-plugin-container',
      { //添加居右容器
        type: 'right',
        defaultTitle: '',
      },
    ],
  ],

  theme: 'meteorlxy',
  themeConfig: { //主题配置项
    markdown: {
      enableAll: true,
    },
    locales: {
      '/': {
        lang: 'en-US',
      },
    }, //US
    lastUpdated: true, //最后更新时间
    lang: Object.assign(require('vuepress-theme-meteorlxy/lib/langs/en-US'), {
      home: `feng-w.cn`,
      posts: 'JOURNAL',
    }), //自定义部分文字
    pagination: {
      perPage: 5,
    }, //每页文章数量
    nav: [{
        text: 'HOME',
        link: '/',
        exact: true
      },
      {
        text: 'JOURNAL',
        link: '/posts/',
        exact: false
      },
      {
        text: 'ABOUT',
        link: '/About/',
        exact: false
      },
    ], //navbar导航栏
    personalInfo: {
      nickname: 'psychonaut1f',
      description: '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=80% height=52 src="//music.163.com/outchain/player?type=2&id=28456751&auto=0&height=32"></iframe>',
      email: 'psychonaut1f@gmail.com',
      location: 'Tai\'Yuan, Shan\'Xi, China',
      organization: 'Shan\'Xi University',
      avatar: 'https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/avatar.jpg',
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
        useGeo: false,
        //url: 'https://pic1.zhimg.com/v2-977206e6259e3cc522db559414843524_r.jpg',
      },
      showTitle: true,
    }, //header设置
    footer: {
      poweredBy: false,
      poweredByTheme: false,
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