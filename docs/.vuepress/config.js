
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
    lineNumbers: false,    // 代码不显示行号
    // markdown 插件
    extendMarkdown: md => {
      md.set({ html: true });
      md.set({ breaks: true }) ;//将段落中的 '\n' 转换为 <br>
      md.use(require('markdown-it-mark'));//高亮
      md.use(require('@iktakahiro/markdown-it-katex'));//math
      md.use(require('markdown-it-task-lists'));//todo
      md.use(require('markdown-it-footnote'));//角标
      md.use(require('markdown-it-kbd'));//按键
    }
  },

  themeConfig: { //主题配置项
      logo: 'https://fengwei2002.coding.net/s/64b8c787-1b7d-44c6-9c25-0e866c8c0c3f',
      //自动生成侧边栏
      //sidebar: 'auto',
      smoothScroll: true,
      //展示全部标题
      displayAllHeaders: true,
      sidebarDepth: 3,
      lastUpdated: 'Last Updated', 
      nav: [  //导航栏
          { text: 'Home', link: '/' },
          {text: 'Template',link: '/Template/',
            items: [
              {text: 'Git',link: '/Template/Git/' },
              {text: 'vscode',link: '/Template/vscode/' },
            ]
          },

          { text: 'Basics', 
            items: [
            {text: 'markdown',link: '/bian-cheng-ji-chu/markdown/' },
            {text: 'cpp',link: '/bian-cheng-ji-chu/cpp/' },
            {text: '数据结构',link: '/bian-cheng-ji-chu/shu-ju-jie-gou/' },
            {text: '计算机网络',link: '/bian-cheng-ji-chu/ji-suan-ji-wang-luo/' },
            {text: '深入理解计算机系统',link: '/cao-zuo-xi-tong/shen-ru-li-jie-ji-suan-ji-xi-tong/' },
            ]
          },

          {text: 'Math', //数学导航栏
              items: 
              [
                {text: '常用知识点',link: '/Math/chang-yong-zhi-shi-dian/'},
                {text: '高数笔记', 
                  items: 
                  [{text: '高数上',link: '/Math/gao-shu-shang/'},
                    {text: '高数下',link: '/Math/gao-shu-xia/'},]
                }
              ]
          },
          
          {text: 'Algorithm',
          items: [
            {text: '力扣题解',link: '/suan-fa/li-kou-ti-jie/'},
            {text: '一堆题解',link: '/suan-fa/yi-dui-ti-jie/'},
            {text: 'codeforces GYM',link: '/suan-fa/codeforces-GYM/'},
            {text: '算法竞赛入门经典',link: '/suan-fa/suan-fa-jing-sai-ru-men-jing-dian/'},
            {text: '算法竞赛入门经典训练指南',link: '/suan-fa/suan-fa-jing-sai-ru-men-jing-dian-xun-lian-zhi-nan/'},
            {text: '值得一记的算法',link: '/suan-fa/zhi-de-yi-ji-de-suan-fa/'},
            {text: '有趣的算法问题',link: '/suan-fa/you-qu-de-suan-fa-wen-ti/'},
            ]
          },

          {text: 'Front-end',
          items: [
            {text: 'html',link: '/qian-duan/html/'},
            {text: 'css',link: '/qian-duan/css/'},
            {text: 'JavaScript',link: '/qian-duan/JavaScript/'},
            {text: 'Node.js',link: '/qian-duan/node.js/'},
            {text: 'vue',link: '/qian-duan/vue/'},
            {text: 'vuepress',link: '/qian-duan/vuepress/'},
            {text: 'csharp',link: '/qian-duan/csharp/'},
            {text: 'kotlin',link: '/qian-duan/kotlin/'},
            ]
          },
 
          {text: 'MORE', //杂记导航栏
            items: 
            [
              {text: 'About me',link: '/za-xiang-bi-ji/About/'},

              {text: 'Tool Usage Tips', 
                items: 
                [
                  {text: '🧾Chrome',link: '/gong-ju-de-shi-yong/chrome/'},
                  {text: '📖GitHub',link: '/gong-ju-de-shi-yong/github/'},
                ]
              },

              {text: 'idea', 
                items: 
                [
                  {text: '📓Life',link: '/za-xiang-bi-ji/life/'},
                  {text: '✨想法',link: '/za-xiang-bi-ji/xiang-fa/'},
                ]
              },
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

//美化相关：
      ["cursor-effects"],                  //鼠标点击特效
      ['vuepress-plugin-reading-progress'],//顶部进度条
      ["vuepress-plugin-live2d",{          //live2d配置
          "modelName": "koharu",           //模型名字
          "mobileShow": false,             //移动端不显示
        }
      ],
      '@vuepress/last-updated',            //显示文章最后更新时间
      ['vuepress-plugin-code-copy', true], //代码块复制按钮

//功能添加：
      "vuepress-plugin-auto-sidebar", {
        titleMode: "uppercase"
      },                          //自动生成侧边栏
      ['flowchart'],              //流程图支持

      ['vuepress-plugin-baidu-autopush'],//百度推送
      ['vuepress-plugin-seo'],

      [ //gitalk评论插件
        'vuepress-plugin-mygitalk', {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 是否开启首页评论(default: true)
          home: false,
          // Gitalk配置
          gitalk: {
            // GitHub Application Client ID.
            clientID: '41838d2c0c6de7b23c93',
            // GitHub Application Client Secret.
            clientSecret: '0b2e618cba35a4d121640b5a81f15bd63ab7623e',
            // GitHub repository. 存储评论的 repo
            repo: 'vuepress_final',
            // GitHub repository 所有者，可以是个人或者组织。
            owner: 'fengwei2002',
            // GitHub repository 的所有者和合作者 (对这个 repository 有写权限的用户)。(不配置默认是owner配置)
            admin: ['fengwei2002'],
            // 设置语言(default: zh-CN)
            language: 'zh-CN',
            distractionFreeMode: 'true',
          }
        }
      ],

          'permalink-pinyin',{ //转换链接汉字为英文的插件，配合 gitalk 使用消除汉字url过长导致的 bug😀
            lowercase: true, // Converted into lowercase, default: true
            separator: '-' // Separator of the slug, default: '-'
          }

    ]
}
