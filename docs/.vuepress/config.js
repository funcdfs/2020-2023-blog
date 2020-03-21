
module.exports = {
  title: 'psychonaut', //左上角的博客标题以及网站显示的标题  
  logo: '/public/favicon.ico',
  description: 'vuepress 文档',
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
    // 代码不显示行号
    lineNumbers: false,
    // markdown 插件
    extendMarkdown: md => {
      md.set({ html: true });
      md.use(require("@iktakahiro/markdown-it-katex"));
      md.use(require("markdown-it-mark"));
      md.use(require("markdown-it-task-lists"));
      md.use(require("markdown-it-vuepress-code-snippet-enhanced"));
      md.use(require("markdown-it-footnote"));
      md.use(require("markdown-it-kbd"));
    }
  },

  themeConfig: { //主题配置项
      logo: '/zhuye.png',
      //自动生成侧边栏
      sidebar: 'auto',
      smoothScroll: true,
      //展示全部标题
      displayAllHeaders: true,
      sidebarDepth: 3,
      //github
      lastUpdated: 'Last Updated', 
      nav: [  //导航栏
          { text: 'Home', link: '/' },
          {text: 'Resolved Bug',link: '/Resolved_bug/',
            items: [
              {text: 'Git',link: '/Resolved_bug/Git/' },
              {text: 'vscode',link: '/Resolved_bug/vscode/' },
            ]
          },

          { text: 'Basics', 
            items: [
            {text: 'markdown',link: '/编程基础/markdown/' },
            {text: 'cpp',link: '/编程基础/cpp/' },
            {text: '数据结构',link: '/编程基础/数据结构/' },
            {text: '计算机网络',link: '/编程基础/计算机网络/' },
            {text: '深入理解计算机系统',link: '/操作系统/深入理解计算机系统/' },
            ]
          },

          {text: 'Math', //数学导航栏
              items: 
              [
                {text: '常用知识点',link: '/Math/常用知识点/'},
                {text: '高数笔记', 
                  items: 
                  [{text: '高数上',link: '/Math/高数上/'},
                    {text: '高数下',link: '/Math/高数下/'},]
                }
              ]
          },
          
          {text: 'Algorithm',
          items: [
            {text: '一堆题解',link: '/算法/一堆题解/'},
            {text: '算法竞赛入门经典',link: '/算法/算法竞赛入门经典/'},
            {text: '算法竞赛入门经典训练指南',link: '/算法/算法竞赛入门经典训练指南/'},
            {text: '值得一记的算法',link: '/算法/值得一记的算法/'},
            {text: '有趣的算法问题',link: '/算法/有趣的算法问题/'},
            {text: 'codeforces题解',link: '/算法/codeforces题解/'},
            ]
          },

          {text: 'Front-end',
          items: [
            {text: 'html',link: '/前端/html/'},
            {text: 'css',link: '/前端/css/'},
            {text: 'JavaScript',link: '/前端/JavaScript/'},
            {text: 'Node.js',link: '/前端/node.js/'},
            {text: 'vue',link: '/前端/vue/'},
            {text: 'vuepress',link: '/前端/vuepress/'},
            {text: 'csharp',link: '/前端/csharp/'},
            {text: 'kotlin',link: '/前端/kotlin/'},
            ]
          },
 
          {text: 'MORE', //杂记导航栏
            items: 
            [
              {text: 'Tool Usage Tips', 
                items: 
                [
                  {text: '🧾Chrome',link: '/工具的使用/chrome/'},
                  {text: '📄GitHub',link: '/工具的使用/github/'},
                  {text: '📜Git',link: '/工具的使用/git/'},
                  {text: '📗vscode',link: '/工具的使用/vscode/'},
                ]
              },
              
              {text: 'idea', 
                items: 
                [
                  {text: '📖杂项note',link: '/杂项note/'},
                  {text: '😜想法',link: '/想法/'},
                ]
              }
    
            ]
        },
        
        { text: 'Contact', 
        items:
        [
          {text:'Gmail',link: 'https://mailto:psychonaut1f@gmail.com'},
          {text:'leetcode',link: 'https://leetcode-cn.com/u/weirdo-21/'},
          {text:'GitHub',link: 'https://github.com/fengwei2002'},
          {text:'codeforce',link: 'https://codeforces.com/profile/KONNG'},
          {text:'微信',link: 'https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/weixin.jpg'},
          {text:'网易云音乐',link: 'https://music.163.com/#/user/home?id=440040659'},
          {text:'QQ',link: 'https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/tim.jpg'},
          {text:'知乎',link: 'https://www.zhihu.com/people/e2df61ca5f33cb1e72e27be2cefd18ba'},
          {text:'bilibili',link: 'https://space.bilibili.com/434632190?share_medium=android&share_source=copy_link&bbid=PQk6Cz4KOAtoDjYHewd7infoc&ts=1583733735020'},
        ]
      },
      
        ],
      },

      plugins: [ //插件的相关配置
      "cursor-effects",  //鼠标点击特效

      "vuepress-plugin-auto-sidebar", {
        titleMode: "uppercase"
      }, //自动生成侧边栏

      '@vuepress/last-updated',
      ['vuepress-plugin-seo'],
      ['vuepress-plugin-reading-progress'],
      'vuepress-plugin-baidu-autopush'
    ]
}
