---
title: vuepress 自动生成侧边栏
date: 2020-04-14
tags:
  - vuepress
---

>只针对使用 vuepress 默认框架构建的项目
<!-- more -->
## vuepress-plugin-auto-sidebar

vuepress 构建完成后我发现得手动配置 sidebar？？？, 虽然自由度高了些，但我~~觉得没什么必要~~懒

然后我发现大多数人类使用的方式都有点非人类

所以找啊找，就找到了一个自动生成分组的插件，有好多人问我怎么用，那我就记录一下我的使用步骤

>[插件的文档](https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar) 写的很清晰了，其他可选项还是看插件提供的文档，我举个例子

## 安装插件

```sh
yarn add -D vuepress-plugin-auto-sidebar
```

## 配置插件

- 打开如下目录:

![20200326165624.png](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200326165624.png)

- 打开 config.js **插件添加处**添加这三行配置:

![20200326165856.png](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200326165856.png)

```js
"vuepress-plugin-auto-sidebar", {
        titleMode: "uppercase"
      },                         //自动生成侧边栏
```

[[ctrl]]+[[s]] 保存一下

## 应有的文件层级

`docs/`下放你的文章**大框架目录**（与。vuepress 同级）

例如:Designer，后端，基础，联系方式，算法

![20200326170131.png](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200326170131.png)

然后在大框架内填充**内容文件夹**

例如:
![20200326170241.png](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200326170241.png)

eg: 现在打开上图编程基础中的数据结构文件夹，就可以放你的第一章，第二章第三章了

在子文件夹里放你的博文时，如果按照我的配置只需要在文章前标号
00-01-02-03 等等，就可以按照编号顺序生成侧边栏

==每个**子文件夹**都应该有一个和博文同级的 RAEADME.md==

例如:
![20200326170352.png](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200326170352.png)

侧面目录栏将 title 内容填充，而一级标题和二级标题会列在 title 下，也就是`##` `#`开头的标题

三级以及其以下的标题不会被显示在侧边栏

所以每个 markdown 文件都应该长这样:

```markdown
---
title: 啥啥啥
---

# 1 侧边栏展示的一级标题是 title 的内容 !, 等同于二级标题

## 1.1 

### 1.1.1 三级标题不会被在侧边栏列出

## 一级标题下的 1.2

## 一级标题下的 1.3

```

## 与 navbar 配合使用 

按照如上结构就可以自动生成并且访问了，使用如下 navbar 配置体验更佳

文件结构:
![20200326172312.png](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200326172312.png)

navbar 配置举例:
![20200326170946.png](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200326170946.png)

展示效果:
![20200326171704.png](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200326171704.png)
![20200326171816.png](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200326171816.png)

## 一些问题

- navbar 的 url 别写错
- 每个子文件夹别忘了 README.md 
- 不识别 markdown 后缀，只识别 md 后缀
- 折叠可选:config.js 配置:`displayAllHeaders: false,` 即可
