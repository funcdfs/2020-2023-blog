module.exports = {
  title: 'if(i&1<<j))', //左上角的博客标题以及网站显示的标题  
  logo: '/public/favicon.ico', //图标尽量小，加快国内访问
  theme: 'antdocs', //自定义后标题下添加下划线，行高加大

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
            text: 'Tips',
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
            text: 'Math_notes', //数学导航栏
            items: [{
                text: '常用知识点',
                link: '/_posts/Math/chang-yong-zhi-shi-dian/'
              },
              {
                text: '高数上',
                link: '/_posts/Math/gao-shu-shang/'
              },
              {
                text: '高数下',
                link: '/_posts/Math/gao-shu-xia/'
              },
            ]
          },

        ]
      },

      {
        text: 'Basics',
        items: [{
            text: 'Markdown-Pro',
            link: '/_posts/bian-cheng-ji-chu/markdown/'
          },
          {
            text: 'C/C++',
            link: '/_posts/bian-cheng-ji-chu/cpp/'
          },
          {
            text: '数据结构与算法',
            link: '/_posts/bian-cheng-ji-chu/shu-ju-jie-gou-yu-suan-fa/'
          },
          {
            text: 'Python',
            link: '/_posts/bian-cheng-ji-chu/Python/'
          },
          {
            text: '计算机网络',
            link: '/_posts/bian-cheng-ji-chu/ji-suan-ji-wang-luo/'
          },
          {
            text: '计算机系统',
            link: '/_posts/cao-zuo-xi-tong/shen-ru-li-jie-ji-suan-ji-xi-tong/'
          },
          {
            text: 'Linux',
            link: '/_posts/cao-zuo-xi-tong/Linux/'
          },
        ]
      },

      {
        text: 'Algorithm',
        items: [{
            text: '🎧算法详解🎧',
            link: '/_posts/suan-fa-xue-xi/suan-fa-xiang-jie/'
          },
          {
            text: 'Aoapc-Bac2nd',
            items: [{
                text: 'Bac2nd',
                link: '/_posts/suan-fa-xue-xi/suan-fa-jing-sai-ru-men-jing-dian/'
              },
              {
                text: 'TrainingGuide',
                link: '/_posts/suan-fa-xue-xi/suan-fa-jing-sai-ru-men-jing-dian-xun-lian-zhi-nan/'
              },
              {
                text: 'UVa',
                link: '/_posts/suan-fa-xue-xi/UVa/'
              },
            ],
          },
          {
            text: '专项练习',
            link: '/_posts/suan-fa-xue-xi/suan-fa-zhuan-xiang-lian-xi/'
          },
          {
            text: 'Leetcode',
            link: '/_posts/suan-fa-xue-xi/Leetcode/'
          },
          {
            text: 'Online Judge',
            link: '/_posts/suan-fa-xue-xi/online-judge/'
          },
          {
            text: 'codeforces GYM & contest',
            link: '/_posts/suan-fa-xue-xi/codeforces-GYM/'
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
            text: 'vue.js',
            link: '/_posts/Designer/vue/'
          },
          {
            text: 'vuepress',
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

      {
        text: 'About',
        link: '/_posts/za-xiang-bi-ji/About/'
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