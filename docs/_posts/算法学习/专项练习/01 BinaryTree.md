---
title: 树专项练习：简单
category: BinaryTree
---

::: tip
二叉树专项练习：简单难度
::: 

<!-- more -->

语言用cpp还是比较方便，目前还没有精力去认真学完一门语言
还有就是写题记录日期挺没用的，就不记录日期了，在leetcode插件生成的代码注释中添加日期即可

久违的cpp的味道,极其僵硬

## 226 翻转二叉树

究极僵硬，不知道结构体引出具体内容的写法，下面是美丽的题解

``` cpp
class Solution {
public: 
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) {
            return nullptr;
        }
        TreeNode* left = invertTree(root->left);
        TreeNode* right = invertTree(root->right);
        root->left = right;
        root->right = left;
        return root;
    }
};
链接：https://leetcode-cn.com/problems/invert-binary-tree/solution/fan-zhuan-er-cha-shu-by-leetcode-solution/
```

### 我的 DFS 

@[code lang=cpp](@/code/leetcode/226.翻转二叉树.cpp/)

<!-- 
``` cpp
class Solution {
   public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) {
            return nullptr;
        }
        swap(root->left, root->right);
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};
``` -->

DFS是比较简单的，迭代的BFS就不太会了

### deque

[https://www.cplusplus.com/reference/deque/deque/](https://www.cplusplus.com/reference/deque/deque/)

### BFS 


``` cpp

```


