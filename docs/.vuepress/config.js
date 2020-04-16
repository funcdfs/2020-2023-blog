module.exports = {
  title: 'if(i&1<<j))', //左上角的博客标题以及网站显示的标题  
  logo: '/public/favicon.ico', //图标尽量小，加快国内访问
  //theme: 'antdocs',
  theme: 'thindark',
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
    lineNumbers: false, // 代码行号应该关闭，要不然手机查看很费劲
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
    searchMaxSuggestions: 10,
    logo: '/logo.webp',
    smoothScroll: true, //平滑滚动
    displayAllHeaders: true, //控制是否为点击展开, true查找起来很方便
    sidebarDepth: 2,
    lastUpdated: 'Last Updated By Fengwei',
    nav: [ //导航栏
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Notes',
        items: [

          {
            text: 'Tips:',
            items: [{
                text: 'Git & Github',
                link: '/_posts/Tips/Git/'
              },
              {
                text: 'VsCode',
                link: '/_posts/Tips/vscode/'
              },
              {
                text: 'Chrome',
                link: '/_posts/Tips/Chrome/'
              },
            ]
          },

          {
            text: 'Math_notes:', //数学导航栏
            items: [{
                text: 'Common-knowledge-points',
                link: '/_posts/Math/Common-knowledge-points/'
              },
              {
                text: 'advanced-mathematics1',
                link: '/_posts/Math/advanced-mathematics1/'
              },
              {
                text: 'advanced-mathematics2',
                link: '/_posts/Math/advanced-mathematics2/'
              },
            ]
          },

        ]
      },

      {
        text: 'Basics',
        items: [{
            text: 'Markdown-Pro',
            link: '/_posts/Basics/markdown/'
          },
          {
            text: 'C/C++',
            link: '/_posts/Basics/cpp/'
          },
          {
            text: 'Data-Structures',
            link: '/_posts/Basics/Data-Structures-and-Algorithms/'
          },
          {
            text: 'Python',
            link: '/_posts/Basics/Python/'
          },
          {
            text: 'Network',
            link: '/_posts/Basics/computer-network/'
          },
          {
            text: 'Computer-system',
            link: '/_posts/computer-system/deep-understanding-of-computer-system/'
          },
          {
            text: 'Linux',
            link: '/_posts/computer-system/Linux/'
          },
        ]
      },

      {
        text: 'Algorithm',
        items: [{
            text: 'Exercises',
            link: '/_posts/Algorithm/exercises/'
          },
          {
            text: 'Leetcode',
            link: '/_posts/Algorithm/Leetcode/'
          },
          {
            text: 'Online Judge',
            link: '/_posts/Algorithm/online-judge/'
          },
          {
            text: 'Detailed algorithm',
            link: '/_posts/Algorithm/detailed-algorithm/'
          },
          {
            text: 'Aoapc-Bac2nd:',
            items: [{
                text: 'TrainingGuide',
                link: '/_posts/Algorithm/training-guide/'
              },
              {
                text: 'Bac2nd',
                link: '/_posts/Algorithm/Bac2nd/'
              },
              {
                text: 'UVa',
                link: '/_posts/Algorithm/UVa/'
              },
            ],
          },
        ]
      },

      {
        text: 'Designer',
        items: [{
            text: 'html5',
            link: '/_posts/Designer/html/'
          },
          {
            text: 'CSS３',
            link: '/_posts/Designer/css/'
          },
          {
            text: 'JavaScript',
            link: '/_posts/Designer/JavaScript/'
          },
          {
            text: 'Node.js',
            link: '/_posts/Designer/node.js/'
          },
          {
            text: 'Vue.js',
            link: '/_posts/Designer/vue/'
          },
          {
            text: 'VuePress',
            link: '/_posts/Designer/vuepress/'
          },
          {
            text: 'csharp',
            link: '/_posts/Designer/csharp/'
          },
          {
            text: 'kotlin',
            link: '/_posts/Designer/kotlin/'
          },
        ]
      },
    ],
  },

  plugins: [
    //美化相关：
    ["cursor-effects"], //鼠标点击特效
    ['vuepress-plugin-reading-progress'], //顶部进度条
    ['@vuepress/last-updated'], //显示文章最后更新时间
    ["go-top"], // 悬挂猫返回顶部,yarn add -D vuepress-plugin-go-top
    //功能添加：
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