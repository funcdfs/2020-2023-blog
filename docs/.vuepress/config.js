module.exports = {
  title: 'if(i&1<<j))', //左上角的博客标题以及网站显示的标题  
  logo: '/public/favicon.ico',
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
    lastUpdated: 'Last Updated by fengwei',
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
                link: '/post/Tips/Git/'
              },
              {
                text: 'VsCode',
                link: '/post/Tips/vscode/'
              },
              {
                text: 'Chrome',
                link: '/post/Tips/Chrome/'
              },
            ]
          },

          {
            text: 'Math_notes', //数学导航栏
            items: [{
                text: '常用知识点',
                link: '/post/Math/chang-yong-zhi-shi-dian/'
              },
              {
                text: '高数上',
                link: '/post/Math/gao-shu-shang/'
              },
              {
                text: '高数下',
                link: '/post/Math/gao-shu-xia/'
              },
            ]
          },

        ]
      },

      {
        text: 'Basics',
        items: [{
            text: 'Markdown_Pro',
            link: '/post/bian-cheng-ji-chu/markdown/'
          },
          {
            text: 'C/C++',
            link: '/post/bian-cheng-ji-chu/cpp/'
          },
          {
            text: '数据结构与算法',
            link: '/post/bian-cheng-ji-chu/shu-ju-jie-gou-yu-suan-fa/'
          },
          {
            text: 'Python',
            link: '/post/bian-cheng-ji-chu/Python/'
          },
          {
            text: '计算机网络',
            link: '/post/bian-cheng-ji-chu/ji-suan-ji-wang-luo/'
          },
          {
            text: '计算机系统',
            link: '/post/cao-zuo-xi-tong/shen-ru-li-jie-ji-suan-ji-xi-tong/'
          },
          {
            text: 'Linux',
            link: '/post/cao-zuo-xi-tong/Linux/'
          },
        ]
      },

      {
        text: 'Algorithm',
        items: [{
            text: '算法竞赛入门经典',
            link: '/post/suan-fa-xue-xi/suan-fa-jing-sai-ru-men-jing-dian/'
          },
          {
            text: '算法竞赛训练指南',
            link: '/post/suan-fa-xue-xi/suan-fa-jing-sai-ru-men-jing-dian-xun-lian-zhi-nan/'
          },
          {
            text: '专项练习',
            link: '/post/suan-fa-xue-xi/suan-fa-zhuan-xiang-lian-xi/'
          },
          {
            text: '力扣题解',
            link: '/post/suan-fa-xue-xi/li-kou-ti-jie/'
          },
          {
            text: '一堆题解',
            link: '/post/suan-fa-xue-xi/yi-dui-ti-jie/'
          },
          {
            text: '常用算法',
            link: '/post/suan-fa-xue-xi/chang-yong-suan-fa/'
          },
          {
            text: 'codeforces GYM & contest',
            link: '/post/suan-fa-xue-xi/codeforces-GYM/'
          },
        ]
      },

      {
        text: 'Designer',
        items: [{
            text: 'html5',
            link: '/post/Designer/html/'
          },
          {
            text: 'CSS３',
            link: '/post/Designer/css/'
          },
          {
            text: 'JavaScript',
            link: '/post/Designer/JavaScript/'
          },
          {
            text: 'Node.js',
            link: '/post/Designer/node.js/'
          },
          {
            text: 'vue.js',
            link: '/post/Designer/vue/'
          },
          {
            text: 'vuepress',
            link: '/post/Designer/vuepress/'
          },
          {
            text: 'csharp',
            link: '/post/Designer/csharp/'
          },
          {
            text: 'kotlin',
            link: '/post/Designer/kotlin/'
          },
        ]
      },

      {
        text: 'About',
        link: '/post/za-xiang-bi-ji/About/'
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
    ['permalink-pinyin', {
      lowercase: true,
      separator: '-'
    }], //转换链接汉字为拼音
  ]
}