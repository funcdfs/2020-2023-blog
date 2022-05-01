---
title: 记录一次 go slice 引发的离奇 bug
date: 2021-10-30
tags:
    - Go
---

刚写完 路径之和，然后理所当然的想着去秒 [path-sum-ii](https://leetcode.cn/problems/path-sum-ii/)，


>给你二叉树的根节点 root 和一个整数目标和 targetSum ，**找出所有** 从根节点到叶子节点 路径总和等于给定目标和的**路径**。
>叶子节点 是指没有子节点的节点。

很简单的 dfs 对吧，写一下：


``` go 
var ans = [][]int{}

func pathSum(root *TreeNode, targetSum int) [][]int {
    ans := [][]int{}
	path := []int{}
	dfs(root, targetSum, path)
	return ans
}

func dfs(root *TreeNode, targetSum int, path []int) {
	if root == nil {
		return
	}

	targetSum -= root.Val
	path = append(path, root.Val)

	if root.Left == nil && root.Right == nil && targetSum == 0 {
		ans = append(ans, path)
		fmt.Println(ans)
	}

	dfs(root.Left, targetSum, path)
	dfs(root.Right, targetSum, path)

	targetSum += root.Val
	path = path[:len(path)-1]
}
```

? 发生什么事情了，为什么不对

![3J(WN)%DWXUE59DP0BF~S5Q-2021-10-30-22-27-41](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/3J(WN)%25DWXUE59DP0BF%7ES5Q-2021-10-30-22-27-41.png)

仔细观察之后，并没有发现算法的问题，**并且调试输出的 path 和 ans 也都是正确答案？？？**，但是返回的时候就不对了 **？？？？？**

为了验证算法是否存在问题，用 cpp 写了一遍，

``` cpp 
class Solution {
public:
    vector<vector<int>> ans;
    
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        ans = vector<vector<int>>(0);
        vector<int> path(0);
        dfs(root, targetSum, path);
        return ans;
    }
    
    void dfs(TreeNode* root, int targetSum, vector<int> &path) {
        if (root == nullptr) {
            return;
        }
        targetSum -= root->val;
        path.push_back(root->val);
        
        if (root->left == nullptr && root->right == nullptr && targetSum == 0) {
            ans.push_back(path);
            for (auto i : path) {
                cout << i << ' ';
            }
            return;
        }
        
        dfs(root->left, targetSum, path);
        dfs(root->right, targetSum, path);
        
        targetSum += root->val;
        path.pop_back();
    }
};
```

![cpp-2021-10-30-22-31-39](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/cpp-2021-10-30-22-31-39.png)

直接 ac 了。。。。。

---

在一番努力之后，解决了！问题出在这里


``` go
if root.Left == nil && root.Right == nil && targetSum == 0 {
	ans = append(ans, path)
}
```

看似很简单的一句话，没什么问题，但是要记着切片是**底层数组的视图**

ans 是什么，ans 是一个 **指针区间** 的集合，当我们得到一个 path 之后，就直接将 path 放入了 ans 中，但实际放入的是一个**地址段**，在之后的遍历中， 如果不发生扩容操作的话，path 指向的地址段依然是之前的地址段，对 path 代表的值进行修改，那么**这个地址段代表的具体数字也会发生改变**，所以输出的 ans 也会发生改变

为了显而易见的观察，初始化 path 为 

``` go 
path := make([]int, 0, 10)
```

那么再观察输出的 ans 就是**全部相同的 item**，因为没有发生扩容操作， path 指向的都是同一段地址，path 最后存储的值，就是最后一次修改 path 之后的值

![20211030223351-2021-10-30-22-33-53](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20211030223351-2021-10-30-22-33-53.png)

如图，最后一次过程中得到的 path 是 5841，虽然不满足 ansItem 的要求，但是也对 path 做出了修改，所以 输出 ans 就应该**全是 5841**

![20211030224502-2021-10-30-22-45-03](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20211030224502-2021-10-30-22-45-03.png)

所以上面这个原因也是为什么传入的 path 如果是切片地址的时候，ans 全是 5841 的原因，**因为保证了扩容之后的地址还是之前的地址段**，和直接开一个很大的地址段的效果一样

![20211030224830-2021-10-30-22-48-31](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20211030224830-2021-10-30-22-48-31.png)

所以就有了一个解决方法就是

当要使用 path 中的值的时候，不应该直接将 path 放入 ans 中，因为 path 指向的值还会改变，放入的应该是什么呢，**放入的应该是一个当前状态的 path 的 "影像"**，这个影像包含了 path 某个状态的值，且 **这个 "影像" 对应的地址段不应该像 path 一样还会被修改**

![20211030225610-2021-10-30-22-56-12](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20211030225610-2021-10-30-22-56-12.png)

这样修改之后，ans 中存放的就是**一组不会被修改的地址段的映射**

---

对比这两种代码：

![20211030225923-2021-10-30-22-59-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20211030225923-2021-10-30-22-59-24.png)

> 修改传入参数实现目的效果的做法终究不可取，这种做法依赖了具体的底层数据，很容易出错，合理的函数就是应该只把传入参数当做 read only，就像是 for 循环中，内层逻辑不要改变循环索引 i 的值一样

所以正确的代码是：


``` go 
var ans = [][]int{}

func pathSum(root *TreeNode, targetSum int) [][]int {
	ans = [][]int{}
	path := []int{}
	dfs(root, targetSum, path)
	return ans
}

func dfs(root *TreeNode, targetSum int, path []int) {
	if root == nil {
		return
	}

	targetSum -= root.Val
	path = append(path, root.Val)

	if root.Left == nil && root.Right == nil && targetSum == 0 {
		cp := make([]int, len(path))
		copy(cp, path)
		ans = append(ans, cp)
	}

	dfs(root.Left, targetSum, path)
	dfs(root.Right, targetSum, path)

	targetSum += root.Val
	path = path[:len(path)-1]
}
```

**solved**!


