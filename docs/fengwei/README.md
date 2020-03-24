---
title: 构建方式
---

## 官方文档

[vuepress官方文档](https://vuepress.vuejs.org/zh/guide/#%E5%AE%83%E6%98%AF%E5%A6%82%E4%BD%95%E5%B7%A5%E4%BD%9C%E7%9A%84%EF%BC%9F)

以下是我的配置：

## 创建GitHub仓库

创建一个gitignore为node的仓库

License随便选一个

## 构建框架

[vuepress官方文档](https://vuepress.vuejs.org/zh/guide/#%E5%AE%83%E6%98%AF%E5%A6%82%E4%BD%95%E5%B7%A5%E4%BD%9C%E7%9A%84%EF%BC%9F)

基础框架构建步骤：
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
## package.json脚本

添加三个脚本命令用来简化操作

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

要生成静态的 HTML 文件,运行：

```sh
yarn docs:build # 或者：npm run docs:build
```
## deploy.sh 

一些脚本用来简化操作

::: details 我的 deploy.sh 配置

```sh 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

echo 'feng-w.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

# 发布到 https://<USERNAME>.github.io
git push -f git@github.com:fengwei2002/fengwei2002.github.io.git master

cd -
``` 

::: 


## config.js 

::: details 我的 config 配置

```js

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
          {text: 'Resolved Bug',link: '/Template/',
            items: [
              {text: 'Git',link: '/Template/Git/' },
              {text: 'vscode',link: '/Template/vscode/' },
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

```

:::


## 我的json配置（无先后次序）

```json {10}
  {
  "name": "vuepress_final",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "directories": {
    "doc": "docs"
  },
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "deploy": "bash deploy.sh"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/fengwei2002/vuepress_final.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/fengwei2002/vuepress_final/issues"
  },
  "homepage": "https://github.com/fengwei2002/vuepress_final#readme",
  "devDependencies": {
    "@iktakahiro/markdown-it-katex": "^3.1.0",
    "markdown-it": "^10.0.0",
    "markdown-it-mark": "^3.0.0",
    "markdown-it-task-list": "^0.1.2",
    "markdown-it-task-lists": "^2.1.1",
    "markdown-it-vuepress-code-snippet-enhanced": "^1.0.1",
    "vuepress": "^1.4.0",
    "vuepress-plugin-auto-sidebar": "^1.3.1",
    "vuepress-plugin-baidu-autopush": "^1.0.1",
    "vuepress-plugin-cursor-effects": "^0.0.4",
    "vuepress-plugin-reading-progress": "^1.0.9",
    "vuepress-plugin-seo": "^0.1.2"
  },
  "dependencies": {
    "vuepress-theme-antdocs": "^0.1.2-beta"
  }
}
```

## 使用

如果按照我的配置,侧边栏会自动生成,按照md文件标题数字可直接排序侧边栏

```cpp
 _______ _______ _       _______ 
(  ____ (  ____ ( (    /(  ____ \
| (    \| (    \|  \  ( | (    \/
| (__   | (__   |   \ | | |      
|  __)  |  __)  | (\ \) | | ____ 
| (     | (     | | \   | | \_  )
| )     | (____/| )  \  | (___) |
|/      (_______|/    )_(_______)
                                 
```

```cpp
         ________________
|\     /(  ____ \__   __/
| )   ( | (    \/  ) (   
| | _ | | (__      | |   
| |( )| |  __)     | |   
| || || | (        | |   
| () () | (____/___) (___
(_______(_______\_______/
                         
```
