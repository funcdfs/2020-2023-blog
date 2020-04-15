---
title: 自定义 vuepress 主题
---

#### Created:  2020-04-15 17:39:40

因为 vuepress 中的布局和主题都可以是 vue 写的，所以自己开发一个主题估计 2020 年很难完成

一开始是因为 antdocs 主题的移动端设计风格才使用的 vuepress

但是用的时候发现很多不符合我审美的问题还有一些 bug

例如 bug：代码块语言显示错误，置顶按钮不能自定义，还有页面宽度不能自选（和作者提issue后这些问题已经没了）

例如审美不符：英文字体大小，侧边栏选中效果，还有行间距等（虽然能自定义layout，但是一个完整的主题应该抛这些变量的接口）

例如功能缺失：博客的 timeline 功能丢失，图片的描述功能

而目前其他主题的设计风格也一言难尽

> 2020-04-15 17:41:30

所以肯定是要做一个主题的

虽然这条路很长很长

暂时先用这个文档主题凑活着吧

之后的想法是沿用antdocs的移动端sidebar和navbar的设计

然后添加动效标签页和timeline（start end）的功能（所以我每篇文章尽量记录一下时间）

navbar应该只存在四项 home  tags timeline about

添加标题的展示

![2020-04-15-17-58-59](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-04-15-17-58-59.png)

很多很多必要功能应该集合一下，创造最完美，最无可挑剔，用户最多的一个vuepress主题



<template>
  <a-timeline>
    <a-timeline-item>
      <a-tag color="#87d068">没事干的时候可以做着玩一玩</a-tag>
      <p>
        已开发<br/>
      </p>
    </a-timeline-item>
    <a-timeline-item>
      <p>
        待开发：<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 自定义一个vscode插入当前时间的插件，可选配置应该弄很多<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> Code-Copy-Pro创建一个自定义的代码块复制按钮<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> Reading-Process-Pro<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 自定义vuepress主题（优化首页, 添加Timeline）<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 自定义评论框架<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 添加评论区打字特效<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 图片和文字边缘优化为圆形（行高加高）<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> About页面优化<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 博文跳转日历<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 全屏模式切换开关（有时需要认真阅读）<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 动态的个性签名显示（仿打字动效）<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 首页英文字母动效？<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 全球动态访客地图<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 单个页面统计量（字数和阅读次数）<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 头像翻页效果<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> sidebar深度为3时额外展示为锚点<br/>
        &emsp;- <a-tag color="purple">待添加</a-tag> 国内访问速度优化<br/>
      </p>
    </a-timeline-item>
  </a-timeline>
</template>

> 2020-04-15 完结目标



