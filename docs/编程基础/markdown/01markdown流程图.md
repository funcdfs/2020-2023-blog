---
title: flowchart
---

# flowchart


## 流程图节点实现：

MarkDown中的流程图语法叫flow，该语法只有两个注意事项：

- 定义元素
- 连接定义好的元素

定义元素
```markdown
tag=type:content:url
``` 
- tag：标签，用于连接元素时使用，相当于是定义了一个常量
- =：标签定义等式。
- type：该标签的类型。共有6种类型如下：
  start开始 end结束 operation流程操作 subroutine预定子流程 condition条件判断 input output输入输出
- content：流程语句中放置的内容
- type:与content之间一定要有一个空格，否则会出问题
- url：指向链接，与流程语句绑定，选填。

## 连接元素

定义好一些变量后开始绘图，而不是边写边定义

使用`-`符号
在代码块标志```后加上flow即可：vuepress中使用：@flowchart

```markdown
s=start:开始
e=end:结束
o=operation:操作项
s-o-e
```

## end

当然，MarkDown画流程图这种对思维逻辑要求比较高，一般简单图绘画即可，复杂的还是用OneNote或者其他绘画工具再截图比较好








