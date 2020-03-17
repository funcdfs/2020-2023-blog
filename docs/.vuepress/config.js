const pluginConf = require('./config/plugins.js');

module.exports = {
  title: 'psychonaut', //左上角的博客标题以及网站显示的标题  
  themeConfig: {
      //博客logo
      logo: '/assets/img/logo.png',
      //自动生成侧边栏
      sidebar: 'auto',
      smoothScroll: true,

      //展示全部标题
      displayAllHeaders: true,
      sidebarDepth: 2,
      //推送到Github的仓库
      lastUpdated: 'Last Updated', 
      nextLinks: true,
      prevLinks: true,
      editLinks: true,
      editLinkText: '帮助我改善此文章！',
      nav: [
          { text: '首页', link: '/' },
          { text: '关于', 
            items:
            [
              {text:'Gmail',link: '/mailto:psychonaut1f@gmail.com/'},
              {text:'leetcode',link: 'https://leetcode-cn.com/u/weirdo-21/'},
              {text:'GitHub',link: 'https://github.com/fengwei2002'},
              {text:'codeforce',link: '//codeforces.com/profile/KONNG'},
              {text:'微信',link: 'https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/weixin.jpg'},
              {text:'网易云音乐',link: 'https://music.163.com/#/user/home?id=440040659'},
              {text:'QQ',link: 'https://raw.githubusercontent.com/fengwei2002/fengwei2002.github.io/master/public/image/tim.jpg'},
              {text:'知乎',link: '//www.zhihu.com/people/e2df61ca5f33cb1e72e27be2cefd18ba'},
              {text:'bilibili',link: 'https://space.bilibili.com/434632190?share_medium=android&share_source=copy_link&bbid=PQk6Cz4KOAtoDjYHewd7infoc&ts=1583733735020'},
            ]
          },
          { 
            text: '学习笔记', 
            items: [
            {text: 'c++基础',link: '/cpp/' },
            {text: '数据结构',link: '/数据结构/' },
            {text: 'WEB前端攻城狮',link: '/web/' },
            {text: '深入理解计算机系统',link: '/深入理解计算机系统/' },
            {text: '计算机网络',link: '/计算机网络/' },
            {text: '算法竞赛入门经典',link: '/算法竞赛入门经典/' },
            {text: '算法竞赛训练指南',link: '/算法竞赛训练指南/' },
                  ]
          },
          {
              text: 'Math',
              items: 
              [
                {text: '常用知识点',link: ''},
                {text: '高数笔记', 
                  items: 
                  [
                    {text: '高数上',link: '/Math/高数上/'},
                    {text: '高数下',link: '/Math/高数下/'},
                  ]
                }
              ]
          },
        ],
      },
}
