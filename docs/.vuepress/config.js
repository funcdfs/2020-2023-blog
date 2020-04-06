module.exports = {
  title: 'psychonaut1f', //左上角的博客标题以及网站显示的标题  
  logo: '/public/favicon.ico',
  description: '使用vuepress搭建的个人博客',
  theme: 'antdocs',

  head: [
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
    lineNumbers: true, // 代码行号
    // markdown 插件
    extendMarkdown: md => {
      md.set({
        html: true
      });
      md.set({
        breaks: true
      }); //将段落中的 '\n' 转换为 <br>
      md.use(require('markdown-it-mark')); //高亮渲染
      md.use(require('@iktakahiro/markdown-it-katex')); //math渲染
      md.use(require('markdown-it-task-lists')); //todo渲染
      md.use(require('markdown-it-footnote')); //角标
      md.use(require('markdown-it-kbd')); //按键
      md.use(require('markdown-it-imsize')); //自定义图片的大小
    }
  },

  themeConfig: { //主题配置项
    searchMaxSuggestions: 20,
    logo: '/logo.webp',
    smoothScroll: true, //平滑滚动
    displayAllHeaders: true, //控制是否为点击展开, 我感觉true用的方便
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [ //导航栏
      {
        text: 'Home',
        link: '/'
      },


      {
        text: 'Notes',
        items: [

          {
            text: 'Tips',
            items: [{
                text: 'Git & Github',
                link: '/Tips/Git/'
              },
              {
                text: 'VsCode',
                link: '/Tips/vscode/'
              },
              {
                text: 'Chrome',
                link: '/Tips/Chrome/'
              },
            ]
          },

          {
            text: 'Math_notes', //数学导航栏
            items: [{
                text: '常用知识点',
                link: '/Math/chang-yong-zhi-shi-dian/'
              },
              {
                text: '高数上',
                link: '/Math/gao-shu-shang/'
              },
              {
                text: '高数下',
                link: '/Math/gao-shu-xia/'
              },
            ]
          },

        ]
      },
      {
        text: 'Bugs',
        link: '/za-xiang-bi-ji/Bugs/'
      },

      {
        text: 'Basics',
        items: [{
            text: 'Markdown',
            link: '/bian-cheng-ji-chu/markdown/'
          },
          {
            text: 'C++',
            link: '/bian-cheng-ji-chu/cpp/'
          },
          {
            text: '数据结构',
            link: '/bian-cheng-ji-chu/shu-ju-jie-gou/'
          },
          {
            text: '计算机网络',
            link: '/bian-cheng-ji-chu/ji-suan-ji-wang-luo/'
          },
          {
            text: '深入理解计算机系统',
            link: '/cao-zuo-xi-tong/shen-ru-li-jie-ji-suan-ji-xi-tong/'
          },
          {
            text: 'Linux',
            link: '/cao-zuo-xi-tong/Linux/'
          },
        ]
      },

      {
        text: 'Algorithm',
        items: [{
            text: '算法竞赛入门经典',
            link: '/suan-fa/suan-fa-jing-sai-ru-men-jing-dian/'
          },
          {
            text: '算法竞赛训练指南',
            link: '/suan-fa/suan-fa-jing-sai-ru-men-jing-dian-xun-lian-zhi-nan/'
          },
          {
            text: '专项练习',
            link: '/suan-fa/suan-fa-zhuan-xiang-lian-xi/'
          },
          {
            text: '力扣题解',
            link: '/suan-fa/li-kou-ti-jie/'
          },
          {
            text: '一堆题解',
            link: '/suan-fa/yi-dui-ti-jie/'
          },
          {
            text: '常用算法',
            link: '/suan-fa/chang-yong-suan-fa/'
          },
          {
            text: 'codeforces GYM & contest',
            link: '/suan-fa/codeforces-GYM/'
          },
        ]
      },

      {
        text: 'Designer',
        items: [{
            text: 'HTML５',
            link: '/qian-duan/html/'
          },
          {
            text: 'CSS３',
            link: '/qian-duan/css/'
          },
          {
            text: 'JavaScript',
            link: '/qian-duan/JavaScript/'
          },
          {
            text: 'Node.js',
            link: '/qian-duan/node.js/'
          },
          {
            text: 'vue.js',
            link: '/qian-duan/vue/'
          },
          {
            text: 'vuepress',
            link: '/qian-duan/vuepress/'
          },
          {
            text: 'csharp',
            link: '/qian-duan/csharp/'
          },
          {
            text: 'kotlin',
            link: '/qian-duan/kotlin/'
          },
        ]
      },

      {
        text: 'More',
        items: [{
            text: 'About me',
            link: '/za-xiang-bi-ji/About/'
          },

          {
            text: 'Article',
            items: [{
                text: '📓Life',
                link: '/za-xiang-bi-ji/life/'
              },
              {
                text: '✨Idea',
                link: '/za-xiang-bi-ji/xiang-fa/'
              },
              {
                text: '🌈Pleasure',
                link: '/za-xiang-bi-ji/pleasure/'
              },

            ]
          },

          {
            text: 'Contact',
            items: [{
                text: 'Gmail',
                link: 'https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200404154822.png',
              },
              {
                text: 'GitHub',
                link: 'https://github.com/fengwei2002'
              },
              {
                text: 'Leetcode',
                link: 'https://leetcode-cn.com/u/weirdo-21/'
              },
              {
                text: 'Codeforces',
                link: 'https://codeforces.com/profile/KONNG'
              },
              {
                text: 'Wechat',
                link: 'https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/weixin.jpg'
              },

              {
                text: 'QQ',
                link: 'https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/tim.jpg'
              },
              {
                text: 'zhi_hu',
                link: 'https://www.zhihu.com/people/e2df61ca5f33cb1e72e27be2cefd18ba'
              },
              {
                text: 'NetEase Cloud Music',
                link: 'https://music.163.com/#/user/home?id=440040659'
              },
            ]
          },
        ]

      },



    ],
  },

  plugins: [
    //美化相关：


    ["cursor-effects"], //鼠标点击特效
    ['vuepress-plugin-reading-progress'], //顶部进度条
    '@vuepress/last-updated', //显示文章最后更新时间
    ["vuepress-plugin-code-copy", {
      //selector: "",
      //align: "top",
      color: "#6D7EAD",
      successText: "🌈Copy success🌈",
    }],
    ["go-top"], // 悬挂猫返回顶部,yarn add -D vuepress-plugin-go-top




    //功能添加：
    ['@vuepress/medium-zoom', {
      selector: '.content__default img',
    }],
    ['flowchart'], //流程图渲染
    ['vuepress-plugin-seo'],
    ['vuepress-plugin-baidu-autopush'], //百度推送
    ["vuepress-plugin-auto-sidebar", {
      titleMode: "uppercase"
    }], //自动生成侧边栏
    ['permalink-pinyin', {
      lowercase: true,
      separator: '-'
    }], //转换链接汉字为英文的插件
  ]
}