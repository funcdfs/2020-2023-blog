---
title: 构建方式
---

## 创建GitHub仓库

创建一个gitignore为node的仓库
License随便选一个

## 构建框架

[vuepress官方文档](https://vuepress.vuejs.org/zh/guide/#%E5%AE%83%E6%98%AF%E5%A6%82%E4%BD%95%E5%B7%A5%E4%BD%9C%E7%9A%84%EF%BC%9F)
``` sh
npm init -y

# 安装
yarn global add vuepress # 或者：npm install -g vuepress
# 将 VuePress 作为一个本地依赖安装
yarn add -D vuepress # 或者：npm install -D vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md

# 开始写作
npx vuepress dev docs

# 构建静态文件
vuepress build .
```
## package.json 

修改三个脚本用来简化操作

```sh 3
"scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "deploy": "bash deploy.sh"
  },
```
然后就可以开始写作了:

```sh
yarn docs:dev # 或者：npm run docs:dev
```

要生成静态的 HTML 文件，运行：

```sh
yarn docs:build # 或者：npm run docs:build
```

## config.js 
``` JS
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
    // 代码显示行号
    lineNumbers: true,
    // markdown-it-anchor 的选项
    anchor: { permalink: true },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2, 3] },
    // markdown 插件
    extendMarkdown: md => {
      md.set({ html: true });
      md.use(require("@iktakahiro/markdown-it-katex"));
      md.use(require("markdown-it-mark"));
      md.use(require("markdown-it-task-lists"));
      md.use(require("markdown-it-vuepress-code-snippet-enhanced"));
    }
  },

  themeConfig: { //主题配置项
      logo: '/zhuye.png',
      //自动生成侧边栏
      sidebar: 'auto',
      smoothScroll: true,
      //展示全部标题
      displayAllHeaders: true,
      sidebarDepth: 2,
      //github
      lastUpdated: 'Last Updated', 

      nav: [  //导航栏
          { text: '首页', link: '/' },

          {text: 'Resolved Bug',link: '/Resolved_bug/',
            items: [
              {text: 'vscode',link: '/工具的使用/vscode/' },
            ]
          },

          { text: '编程基础', 
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
          
          {text: '算法',
          items: [
            {text: '算法竞赛入门经典',link: '/算法/算法竞赛入门经典/'},
            {text: '算法竞赛入门经典训练指南',link: '/算法/算法竞赛入门经典训练指南/'},
            {text: '值得一记的算法',link: '/算法/值得一记的算法/'},
            {text: '有趣的算法问题',link: '/算法/有趣的算法问题/'},
            ]
          },

          {text: '前端攻城狮',
          items: [
            {text: 'html',link: '/前端/html/'},
            {text: 'css',link: '/前端/css/'},
            {text: 'JavaScript',link: '/前端/JavaScript/'},
            {text: 'Node.js',link: '/前端/node.js/'},
            {text: 'vue',link: '/前端/vue/'},
            {text: 'vuepress',link: '/前端/vuepress/'},
            {text: 'csharp',link: '/前端/csharp/'},
            {text: 'kotlin',link: '/前端/kotlin/'},
            {text: 'Jekyll',link: '/前端/jekyll/'},
            ]
          },

          { text: 'Contact', 
            items:
            [
              {text:'Gmail',link: 'mailto:psychonaut1f@gmail.com'},
              {text:'leetcode',link: 'https://leetcode-cn.com/u/weirdo-21/'},
              {text:'GitHub',link: 'https://github.com/fengwei2002'},
              {text:'codeforce',link: '//codeforces.com/profile/KONNG'},
              {text:'微信',link: 'https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/weixin.jpg'},
              {text:'网易云音乐',link: 'https://music.163.com/#/user/home?id=440040659'},
              {text:'QQ',link: 'https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/tim.jpg'},
              {text:'知乎',link: 'https://www.zhihu.com/people/e2df61ca5f33cb1e72e27be2cefd18ba'},
              {text:'bilibili',link: 'https://space.bilibili.com/434632190?share_medium=android&share_source=copy_link&bbid=PQk6Cz4KOAtoDjYHewd7infoc&ts=1583733735020'},
            ]
          },
 
          {text: 'More', //杂记导航栏
            items: 
            [
              {text: 'Tool usage tips', 
                items: 
                [
                  {text: 'Chrome',link: '/工具的使用/chrome/'},
                  {text: 'GitHub',link: '/工具的使用/github/'},
                  {text: 'Git',link: '/工具的使用/git/'},
                  {text: 'vscode',link: '/工具的使用/vscode/'},
                ]
              },

              
              {text: '✨✨', 
                items: 
                [
                  {text: '杂项note',link: '/杂项note/'},
                  {text: '想法',link: '/想法/'},
                ]
              }
    
            ]
        },
        ],
      },

      plugins: [ //插件的相关配置
      "cursor-effects",  //鼠标点击特效
      "vuepress-plugin-auto-sidebar", {
        titleMode: "uppercase"
      }, //自动生成侧边栏
      "dynamic-title",{
        showIcon: "/favicon.ico",
        showText: "(ฅ>ω<*ฅ)欢迎回来！",
        hideIcon: "/failure.ico",
        hideText: "( ๑ˊ•̥▵•)੭₎₎不要走呀！",
        recoverTime: 2000
      },

      ["go-top"], //悬挂喵返回顶部
      "ribbon", //背后彩带
      {
         size: 90, // 彩带的宽度，默认为 90
         opacity: 0.8, // 彩带的不透明度，默认为 0.3
         zIndex: -1 // 彩带的 z-index 属性，默认值为 -1
      },
      "@vuepress/active-header-links",
      ['@vuepress/nprogress'],
      ['@vuepress/medium-zoom'],
      ['vuepress-plugin-seo'],
      ['vuepress-plugin-reading-progress'],

    ]
}

```

::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码

```js
console.log('你好，VuePress！')
```
:::

## 以下是需要安装的依赖插件包（无先后次序）

```sh
//markdown 扩展
yarn add -D markdown-it
yarn add -D markdown-it-anchor
yarn add -D markdown-it-toc
yarn add -D @iktakahiro/markdown-it-katex
yarn add -D markdown-it-mark
yarn add -D markdown-it-task-list
yarn add -D markdown-it-vuepress-code-snippet-enhanced

//花里胡哨
yarn add -D vuepress-plugin-cursor-effects
yarn add -D vuepress-plugin-go-top
yarn add vuepress-plugin-dynamic-title -D

//fangbian
yarn add -D vuepress-plugin-auto-sidebar

yarn add -D @vuepress/plugin-active-header-links
yarn add -D vuepress-plugin-reading-progress
yarn add -D @vuepress/plugin-medium-zoom
yarn add -D vuepress-plugin-seo
yarn add -D @vuepress/plugin-nprogress
yarn add -D vuepress-plugin-reading-time

