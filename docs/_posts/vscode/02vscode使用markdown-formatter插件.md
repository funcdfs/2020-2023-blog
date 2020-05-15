---
title: VScode 使用 markdown-formatter 插件
category: Tips
tags:
  - vscode
---

# VScode 使用 markdown-formatter 插件


![162P01455-7.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/fengwei2002/picture162P01455-7.jpg)

***

今天发现了这个超级方便的插件, 有好多好多使 markdown 变美观的功能

> 这是个提高 markdown 写作效率的工具, 不仅为 markdown 使用者提供了相对统一的格式, 并且提供了一些快捷功能。
然后这个插件因为功能都是自定义的, 所以不能安装完成后直接使用, 需要在 setting.json 里面进行个性化的配置 然鹅我看了 [文档](https://github.com/sumnow/markdown-formatter/blob/master/README_CN.md) 还是没弄好；一直报错

然后不小心 CTRL C 把 setting.json 全删了 , 还不能恢复, 
我就直接全部卸载了 vscode [重装](https://blog.csdn.net/jpch89/article/details/89789247) 了一遍 , 正好插件 40+特别乱, 删了后重新弄一遍就简洁了许多

但每天不明不白的用 VSCODE；属实不爽；所以想着解析一下 vscode 的构造和 setting.json 的具体中文使用方法

### markdown_formatter 的使用

``` json
// settings.json
// markdown-formatter conf
// 按照 js 格式化
// "markdownFormatter.codeAreaToBlock": "js",
// 不格式化
"markdownFormatter.codeAreaToBlock": "",
// 自动格式化标点
"markdownFormatter.fullWidthTurnHalfWidth": "auto",
// 中文标点格式化为英文
// "markdownFormatter.fullWidthTurnHalfWidth": ",：；!“”‘’（）？。",
"markdownFormatter.formatOpt": {
  "indent_size": 2
},
"[markdown]": {
  // 自动保存
  "editor.formatOnSave": true,
  // 显示空格
  "editor.renderWhitespace": "all",
  // 快速补全
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  // snippet 提示优先
  "editor.snippetSuggestions": "top",
  "editor.tabCompletion": "on",
  // 使用 enter 接受提示
  "editor.acceptSuggestionOnEnter": "on",
  // 默认格式化工具为本工具
  "editor.defaultFormatter": "mervin.markdown-formatter"
}
```

将以上文本复制在安装该插件并且重启 vsc 后的 setting.json 中会报错： `End of file expected.jsonc(0)` 导致配置失败

然后我鼠标右键后发现有个格式化文档选项（formatter 的一个小功能）  
vscode 让我把错误 setting 删除后它自己进行写入操作 然后出现弹窗格式化成功 （在 markdown in one 和 formatter 之间进行选择）

``` json
{
    "todo-tree.tree.showScanModeButton": false,
    "todo-tree.highlights.enabled": false,
    "workbench.colorTheme": "Atom One Dark",
}
```

发现代码块的变化：

``` json
{
    "todo-tree.tree.showScanModeButton": false,
    "todo-tree.highlights.enabled": false,
    "workbench.colorTheme": "Atom One Dark",
    "[markdown]": {
        "editor.defaultFormatter": "mervin.markdown-formatter"
    }
}
```

我猜测配置项要按照先后顺序排列且都在同一个大括号内完成相关配置；所以我试了一下：

* 仿照系统自动生成的做法；将官方示例配置复制到自动添加的对应位置；然后将重复部分

``` json
    "[markdown]": {
        "editor.defaultFormatter": "mervin.markdown-formatter"
    }
```

删除即可

没有报错, NOW 重启一次 vscode

现在使用 `shift + alt + F` 就可以快速格式化 markdown 文本了 而使用 markdown 编写时也发现出现了智能提示；优化了书写体验

发现应用成功 (　获得神器 QAQ　)

> 但我重装 vscode 导致 picgo 插件失效, 所以又安装了一遍 picgo... 

现在就可以愉快的使用了~

* 插入图片：键入 img
* 插入表格：键入 tab
* 插入代码：键入 js , html , css , python , go , java , or code
* 插入列表：键入 ul （unordered list）

``` markdown

* 大标题
    - 中标题
        - 小标题

```

使用这种排版来区分大中小标题

具体功能块参见上文给出的官方文档

***

具体功能按照自己的需求添加
