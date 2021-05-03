---
title: Morris 遍历
date: 2021-04-11
tags:
  - 数据结构
--- 

最近重新看二叉树遍历看到了这个算法
  
Morri 遍历的原则：
1. 假设当前节点为 cur，
2. 如果 cur 没有左孩子，cur 向右移动，`cur = cur.right`
3. 如果 cur 有左孩子，找到左子树上最右的节点 mostRight
   - 如果 `mostRight.right == null`，令 `mostRight.right = cur`，cur 向左移动，`cur = cur.left`
   - 如果 `mostRight.right == cur`，令 `mostRight.right = null`，cur 向右移动，`cur = cur.right`
   - 不存在更多的情况
4. 如果 `cur == null` 停止遍历

Morris序列实例：

![Morris序列实例：](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210410222840-2021-04-10.png)

![20210410223319-2021-04-10](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210410223319-2021-04-10.png)

什么样子的树都可以被完全遍历

所有存在左子树的节点都会在Morris遍历中出现两次，所以控制出现两次节点的输出位置即可完成相应遍历

### 转换为先序遍历



### 转换为中序遍历

### 转换为后序遍历（较为复杂）

## 实例：
BST
二叉树最小高度


