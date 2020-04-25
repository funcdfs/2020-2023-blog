---
title: BFS
category: Algorithm
tags:
  - Algorithm exercises
---

#### Created: 2020-04-17 16:37:11

## BFS框架

BFS问题的本质就是让你在一幅「图」中找到从起点start到终点target的最近距离，BFS 算法问题其实都是在干这个事儿。

这个广义的描述可以有各种变体，比如走迷宫，有的格子是围墙不能走，从起点到终点的最短距离是多少？如果这个迷宫带「传送门」可以瞬间传送呢？

再比如说两个单词，要求你通过某些替换，把其中一个变成另一个，每次只能替换一个字符，最少要替换几次？

再比如说连连看游戏，两个方块消除的条件不仅仅是图案相同，还得保证两个方块之间的最短连线不能多于两个拐点。你玩连连看，点击两个坐标，游戏是如何判断它俩的最短连线有几个拐点的？

再比如……

本质上就是一幅「图」，让你从一个起点，走到终点，问最短路径。这就是 BFS 的本质，框架搞清楚了直接默写就好。

offer，add 区别：

一些队列有大小限制，因此如果想在一个满的队列中加入一个新项，多出的项就会被拒绝。

这时新的 offer 方法就可以起作用了。它不是对调用 add() 方法抛出一个 unchecked 异常，而只是得到由 offer() 返回的 false。

```cpp
// 计算从起点 start 到终点 target 的最近距离
int BFS(Node start, Node target) {
    Queue<Node> q; // 核心数据结构
    Set<Node> visited; // 避免走回头路

    q.offer(start); // 将起点加入队列
    visited.add(start);
    int step = 0; // 记录扩散的步数

    while (q not empty) {
        int sz = q.size();
        /* 将当前队列中的所有节点向四周扩散 */
        for (int i = 0; i < sz; i++) {
            Node cur = q.poll();
            /* 划重点：这里判断是否到达终点 */
            if (cur is target)
                return step;
            /* 将 cur 的相邻节点加入队列 */
            for (Node x : cur.adj())
                if (x not in visited) {
                    q.offer(x);
                    visited.add(x);
                }
        }
        /* 划重点：更新步数在这里 */
        step++;
    }
}
```

## BFS练习

[LeetCode102]() 二叉树的层次遍历
[LeetCode103]() 二叉树的锯齿形层次遍历
[LeetCode127]() 单词接龙
[LeetCode787]() K 站中转内最便宜的航班
[LeetCode752]() 打开转盘锁
[LeetCode200]() 岛屿的个数
[LeetCode199]() 二叉树的右视图
[LeetCode210]() 课程表 II
[LeetCode279]() 完全平方数
[LeetCode310]() 最小高度树
[LeetCode863]() 二叉树中所有距离为 K 的结点
[LeetCode133]() 克隆图

