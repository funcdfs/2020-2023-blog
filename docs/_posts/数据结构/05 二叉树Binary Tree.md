---
title: 二叉树相关
date: 2021-04-10
tags:
  - 数据结构
--- 

> 数据结构 二叉树 Binary-Tree 遍历

<!-- more -->

最近不是哟啊开始刷leetcode了嘛，看到之前的笔记可真是惨不忍睹，整理一下，顺便复习

## 树的表示

1. 初步设计：
    这样设计后，从下往上的遍历就会变快
    这种方式可以获得的信息较少，不便于进行自顶向下的遍历。常用于自底向上的递推问题中。
    ![2020-11-30-10-41-33](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-30-10-41-33.png)

2. 这样设计结构，查找孩子的速度会更快
   ![2020-11-30-10-42-32](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-30-10-42-32.png)

3. 同时兼顾两种方法，但是存储结构的长度不统一（每一个节点的出度不尽相同）
   ![2020-11-30-10-43-19](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-30-10-43-19.png)

4. 相比于其他的数据组织方法，这种方法的规整性非常突出，每个节点都只设置两个引用，每个节点所占用的空间都是常数且彼此接近，所以是很好的一种表示方法
   ![2020-11-30-10-48-07](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-30-10-48-07.png)
   也叫做：**左孩子右兄弟表示法**

### 左孩子右兄弟表示法

::: note 遍历一个结点的所有子结点可由如下方式实现。
首先，给每个结点的所有子结点任意确定一个顺序。

此后为每个结点记录两个值：其 第一个子结点 `child[u]` 和其 下一个兄弟结点 `sib[u]`。若没有子结点，则 `child[u]` 为空；若该结点是其父结点的最后一个子结点，则 `sib[u]` 为空。

遍历一个结点的所有子结点可由如下方式实现。
``` cpp
int v = child[u];  // 从第一个子结点开始
while (v != EMPTY_NODE) {
  // ...
  // 处理子结点 v
  // ...
  v = sib[v];  // 转至下一个子结点，即 v 的一个兄弟
}
```
也可简写为以下形式。

``` cpp
for (int v = child[u]; v != EMPTY_NODE; v = sib[v]) {
  // ...
  // 处理子结点 v
  // ...
}
```
:::
    
## 二叉树

节点数不超过 2 的树，最多两个分支，两叉，称作二叉树

同一节点的孩子和子树，均以左右区分，（左节点为`first_chlid`),

深度为 k 的树，最多$2^k$个节点，最多时叫做满树 (full binary_tree),
高度是宽度的指数，高度增长缓慢，长宽的速度更快

需要记录每个结点的左右子结点。

``` cpp
int parent[N];
int lch[N], rch[N];
// -- or --
int child[N][2];
```
### 真二叉树

每个节点的度数都是偶数，0 or 2 

![添加一些空节点](https://raw.githubusercontent.com/fengwei2002/picture/master/picture75E71F923C483C9403256E58E91CFED6.jpg)

引入很多空节点得到一个新的二叉树：变成一个真二叉树，这样的话相关算法可以更简洁的被实现，被理解
（虚拟引入）
### 用二叉树描述多叉树

**有根**且**有序**的树都能通过二叉树描述，表示和实现（通过长子兄弟法）

![3A2536F3E5918997190B0AF48297710E.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture3A2536F3E5918997190B0AF48297710E.jpg)

同一层级的节点写在同一行，都是长子的一列节点写在同一列，然后进行 45 度的旋转，就手动转换完成了
这也是标题为二叉树而不是树的原因，因为二叉树可以表示全部

## 二叉树实现

### Binary_Node 实现

![2020-11-30-13-19-42](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-30-13-19-42.png)

二叉树的基本单位是二叉树的节点叫做 Binary_Node 
通过 c++ 的模板类实现
每个 vertex 的属性：
* 每个节点的核心：`data` 
* 每个节点共有三个引用构成树的枝叶：`paren`t ,`L_Child` ,`R_Child` ,
* 每个节点可能具有的属性：`height`,`color` 

![2020-11-30-13-20-04](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-30-13-20-04.png)
``` cpp
#define Binary_Node_Position(T) Binary_Node<T>*  
//节点位置
template <typename T>
struct Binary_Node {
    Binary_Node_Position(T) Parent, L_Child, R_Child;  
    //用长子兄弟法定义一个节点的三个引用
    T data;
    int height;
    int size();  //任意类型的节点数据区，以及高度，和子树规模
    Binary_Node_Position(T) insert_as_left_child(T const&);  //插入新节点
    Binary_Node_Position(T) insert_as_right_child(T const&);
    Binary_Node_Position(T) success();  //（中序遍历意义下）当前节点的直接后继
    //每一个二叉树节点都要提供四种基本遍历的接口
    template <typename VISIT>
    void travLevel(VISIT&);  //子树层次遍历
    template <typename VISIT>
    void travPre(VISIT&);  //子树先序遍历
    template <typename VISIT>
    void travIn(VIIT&);  //子树中序遍历
    template <typename VISIT>
    void travPost(VISIT&);  //子树后序遍历
}
```

`insert_as_left_child`作为左右节点插入算法的实现：
``` cpp
template <typename T>
Binary_Node_Position(T) Binary_Node<T>::insert_as_left_child(T const& e) {
    return lChild = new Binary_Node(e, this);
    //通过构造函数构建新节点 data 域为 e 父节点为 this 返回值为 一个 position
    //所以直接将结果赋值给 L_Child
}
```
Right_child 完全对称

子树规模 `size` 接口：线性时间实现

``` cpp
template <typename T>
int Binary_Node<T>::size() {  //递归实现
    int s = 1;                //本身
    if (lChild)
        s += lChild->size();
    if (rChild)
        s += rChild->size();
    return s;  //两项合计加上当前节点本身，递归则得出当前的 size() \规模、
}
```

### Binary_Tree 模板类

``` cpp
template <typename T>
class Binary_Tree {
   protected:
    int _size;                      //树的规模
    Binary_Node_Position(T) _root;  //树的根节点
    virtual int updateHeight(Binary_Node_Position(T) x);
    //更新节点 x 的高度，虚函数定义方便重写
    void updateHeightAbove(Binary_Node_Position(T) x);
    //更新 x 及其祖先的高度
   public:
    int size() const { return _size; }  //规模
    bool empty() const {return !-root}  //判空
    Binary_Node_Position(T) root() const {
        return _root
    }  //返回树根
       //……子树接口 , 删除和分离接口 , 遍历接口
}
```

### 高度更新

高度定义：对于节点 x , 在以它为根的子树的叶节点最长路径长度，无子节点 h=0 ,root 的高度为 -1  
左右 child 的高度最大再加一

``` cpp
#define stature(p) ((p) ? (P)->height : -1)
//将特殊情况统一起来更加方便 且不影响到算法的正确性 stature: 身材
template <typename T>
int Binary_Tree<T>::updateHeight(Binary_Node_Position(T) x) {
    return x->height = 1 + max(stature(x->lChild), stature(x->rChild));
}  //更新当前节点高度：采用常规二叉树规则，O(1)

template <typename T>
void Binary_Tree<T>::updateHeightAbove(Binary_Node_Position(T) x) {
    //更新 x 及其历代祖先的高度，直到根节点
    while (x) {
        updateHeight(x);
        x = x->parent;  //从当前节点开始一直向上逐个更新
    }
    //可优化，一旦高度未变即可终止，//O(n =depth)
}
```

### 节点插入

注意调用更新高度的接口

``` cpp
template <typename T>
Binary_Node_Position(T)  // insert_as_left_child 对称
    Binary_Tree<T>::Insert_As_Right_Child(Binary_Node_Position(T) x,
                                          T const& e) {
    _size++;
    x->insert_as_right_child(e);
    //调用同名接口完成新节点的创建和连接
    updateHeightAbove(X);  //更新 x 及其祖先的高度
    return x->rChild;      //返回右节点（执行插入的位置）
}
```

## 遍历

关于二叉树遍历算法的 [迭代动画](https://mp.weixin.qq.com/s/c0LTBQwIpG7ldUQGN6ZEMA)

讨论二叉树的相关算法，这些遍历算法后来会遇到很多地方使用，所以需熟练掌握

traverse: 遍历

遍历的意义：按照某种次序，每一个节点都恰好被访问一次，在树中只要根节点和左右子节点可以**确定一种顺序，那么便可以执行下去**

先序中序后序遍历就是根据 **根节点在遍历序列中的先后顺序来区分**的    

除去根节点 其余节点从左到右遍历

![二叉树的三种遍历](https://raw.githubusercontent.com/fengwei2002/picture/master/picture89B2747A227ED7347DECFEDC58C24E05.jpg)

## 先序遍历

先访问根，再访问子节点。

### 递归实现

很简单的实现，但因为遍历接口要经常调用，所以要熟练掌握

分三步，递归基，查看，递归

``` cpp
template <typename T, typename VISIT>
//因为 visit 函数要返回的值不一样，所以就需要模板 VISIT
void traverse(Binary_Node_Position(T) x, VISIT& visit) {
    if (!x)
        return;      //每个递归都应该有的递归基
    visit(x->data);  //查看节点 x 的数据域
    traverse(x->lChild, visit);  //先左后右
    traverse(x->rChild, visit);  //递归实现
}  //复杂度为 O(n)
```

### 两种迭代的实现

第一种通过迭代实现d额方式比较容易理解，引入一个栈

``` cpp
template<typename T,typename VISIT > 

void travPre_I(Binary_Node_Position(T) x, VISIT&visit) {
    Stack<Binary_Node_Position(T)> S;  //创建存储节点的一个辅助引用栈
    if (x)     //存在节点的话就进行放入
        S.push(x);        //根节点入栈
    while (!S.empty()) {  //在非空前反复访问
        x = S.pop();      //弹出尾节点，并同时访问当前弹出的节点
        visit(x->data);
        if (Has_Right_Child(*x))
            S.push(x->rChild);
        //存在右孩子就推入栈中，右孩子先入后出
        if (Has_Left_Child(*x))
            S.push(x->lChild);
        //存在左孩子也推入栈中，左孩子后入先出
    }
}  // 妙啊，栈：深度未知的问题
```

![先序遍历迭代实现示意图](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureAC70CB6322098BC7C6204D083FB726E4.jpg)

但这种独特的迭代写法不易于推广至中序遍历，所以

有了下面的第二种迭代算法的思路

![第二种迭代写法](https://raw.githubusercontent.com/fengwei2002/picture/master/picture15604BB676F81A604F0C13C81599E1ED.jpg)

TODO 我的疑问就是为什么还可以保持之前的顺序（）

![20210410194830-2021-04-10](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210410194830-2021-04-10.png)
先遍历最左侧的一列树，然后遍历每一个左节点对应的右节点

子函数 `Visit_Along_Left_Branch` 实现：

``` cpp
template <typename T, typename VISIT>
static void Visit_Along_Left_Branch(  
    Binary_Node_Position(T) x,
    VISIT& visit,
    Stack<Binary_Node_Position(T)>& S) {  //依然依靠一个辅助栈，后进先出的次序
    while (x) {
        visit(x->data);
        S.push(x->rChild);  //右孩子入栈，将来逆序出栈，第一个出来的是最底部的右孩子
        x = x->lChild;      //沿着左链下滑
    }                       //只有右孩子和 NULL 可能入栈
}
```
这个函数功能就是将所有的左节点的右节点放入栈中，同时访问所有左节点

第二种迭代遍历的主算法实现：

**对于每一个右叉树都遍历到底部再转入下一个左链树**

``` cpp
template <typename T, typename VISIT>
void travPre_II(Binary_Node_Position(T) x, VISIT& visit) {  
    //传入一个节点作为根节点
    Stack<Binary_Node_Position(T)> S;

    while (true) {
        Visit_Along_Left_Branch(x, visit, S);
        //传入大家公用的栈，从 x 开始左下滑，左链遍历完毕退出
        //访问左链的同时将右孩子推入栈中
        if (S.empty())
            break;  //只有栈空才退出
        x = S.pop();  
        //弹出栈中最后那一个右节点
        //一串左链遍历完成后，最尾部的右子块出栈，再次进行遍历
    }
}
```

先序遍历的迭代写法都要依靠栈结构来完成~

## 中序遍历

先访问左子树，再访问根，再访问右子树。

递归角度：同样 $o(n)$ 的复杂度，但是实际中还是要把递归改写为迭代写法

``` cpp
template <typename T, typename VISIT>
void traverse(Binary_Node_Position(T) x, VISIT& visit) {
    if (!x)
        return;  //处理递归基
    traverse(x->lChild, child);
    visit(x->data);
    traverse(x->rChild, visit);
    //递归写法的三种遍历就是这里 的语句顺序变一下
}
```

### 迭代角度

是一个控制权**不断转让**的过程：

![迭代中序遍历](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureB1F82B041FE46B22A84B46E144D6B5E9.jpg)

每一次都是从左孩子的最左者（没有左孩子的那一个）开始执行  从根出发沿左分支下行，直至最深的节点  他就是全局最先被访问者 

[思路解析-1](http://www.bilibili.com/video/av82410486?p=198&share_medium=android&share_source=copy_link&bbid=PQk6Cz4KOAtoDjYHewd7infoc&ts=1582976891652
) 整个左侧链有多长就有多少个阶段

[思路解析-2](vhttp://www.bilibili.com/video/av82410486?p=199&share_medium=android&share_source=copy_link&bbid=PQk6Cz4KOAtoDjYHewd7infoc&ts=1582977180723
)



``` cpp
template <typename T>
static void goAlongLeftBranch(Binary_Node_Position(T) x,
                              Stack<Binary_Node_Position(T)>& S) {
    while (x) {
        S.push(x);  //相比先序遍历的不同是这里放入的是左树上的所有节点而不是右节点
        x = x->lChild;
    }  //反复入栈，沿分支深入，不断转移操控权力
}


```

主函数

``` cpp
template <typename T, typename V>

void traverse_in_I(Binary_Node_Position(T) x, V& visit) {
    Stack<Binary_Node_Position(T)> S;  //创建辅助栈
    while (true) {                     //反复的
        goAlongLeftBranch(x,S);        
        //从当前节点出发（左分支）, 逐批入栈  谦让控制权
        if (S.empty())
            break;       //直至所有节点处理完毕 退出 while 循环
        x = S.pop();     // x 的左子树或为空，或已经遍历（等效于空）, 故可以
        visit(x->data);  //立即访问 x
        x = x->rChild;   //再转向其右子树
        //虽然右子树可能为空，进入下一轮while循环的时候
        //goAlongLeftBranch 就不执行了，x = pop 就可以继续
        //直到可以继续入栈操作，继续进行深入
    }
}
```

（迭代写法的三种遍历也是最后语句顺序的变化）
执行顺序图如下：
![](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-30-20-32-59.png)

[实例解析，加深理解](http://www.bilibili.com/video/av82410486?p=201&share_medium=android&share_source=copy_link&bbid=PQk6Cz4KOAtoDjYHewd7infoc&ts=1582977977907)

总体复杂度为 $O(n)$ （不是$O(n^2)$)

## 后序遍历

虽然这种遍历方式最不常用，但还是会用到

顺序是：先访问子节点，再访问根。

已知中序遍历和另外一个可以求第三个。

``` cpp
template <typename T, typename VISIT>
void traverse(Binary_Node_Position(T) x, VISIT& visit) {
    if (!x)
        return;  //处理递归基
    traverse(x->lChild, child);
    traverse(x->rChild, visit);
    visit(x->data); //变换语句顺序即可
}
```


Leetcode官方题解：[ 迭代 & Morris 遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/er-cha-shu-de-hou-xu-bian-li-by-leetcode-solution/)

Leetcode：[后序遍历：递归，迭代，取巧](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/di-gui-die-dai-qu-qiao-san-chong-fang-fa-quan-jie-/)

### 迭代写法后序遍历

[迭代写法 后序遍历PPT 演示](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/er-cha-shu-de-hou-xu-bian-li-by-leetcode-solution/)


``` cpp
class Solution {
public:
    vector<int> postorderTraversal(TreeNode *root) {
        vector<int> res;
        if (root == nullptr) {
            return res;
        }
        //特殊情况，根节点为空的时候直接返回

        stack<TreeNode *> stk;
        //维护一个可视化的栈，左 右 中 的执行顺序
        TreeNode *prev = nullptr;

        while (root != nullptr || !stk.empty()) {
            while (root != nullptr) {
                stk.emplace(root); 
                root = root->left; //将所有左节点放入，直到不可以进行放入
            }
            root = stk.top();
            stk.pop();
            //弹出一个
            if (root->right == nullptr || root->right == prev) {
                //右子树为空的时候 或者 
                res.emplace_back(root->val);
                prev = root;//指定 前节点和根节点
                root = nullptr;
            } else {
                stk.emplace(root);
                root = root->right;
            }
        }
        return res;
    }
};
```


## 层次遍历

最后一种典型的二叉树遍历方式

严格按照次序，从高到低进行访问（根开始，一层一层进行） , **从上到下，从左到右**，所以使用**队列**刚好可以实现

递归写法

``` cpp
template <typename T>
template <typename VISIT>
void Binary_Node<T>::travLevel(VISIT& visit) {    //二叉树层次遍历
    Queue<Binary_Node_Position(T)> Q;             //创建辅助队列
    Q.enqueue(this);                              //根节点入队
    while (!Q.empty()) {                          //在队列再次变空前，
        Binary_Node_Position(T) x = Q.dequeue();  //取出队首节点并访问
        visit(x->data);
        if (Has_Left_Child(*x))
            Q.enqueue(x->lChild);  //有左 左入队
        if (Has_Right_Child(*x))
            Q.enqueue(x->rChild);  //有右 右入队 队列先进先出，左先右后
    }                              //队列变空循环退出
}
```

## 二叉树的重构

即根据已知的序列还原二叉树，这个东西没什么用，但是可能会考到

::: note 问：
由任何一个二叉树，都可以导出三个序列，如何还原他的拓扑结构？
:::

中序 + 先序 || 后序 之一：即可完整还原二叉树的拓扑结构

![2020-12-02-12-59-49](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-02-12-59-49.png)

二叉树的先序遍历遍历的第一个点一定是根节点，所以根节点一定是 A。

![2020-12-02-13-13-21](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-02-13-13-21.png)

在中序遍历中，根节点一定是在最中间的，所以中序遍历中 A 左边的节点都在 A 的左子树上，右边的节点都在 A 的右子树上。

![2020-12-02-13-15-08](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-02-13-15-08.png)

那么我们就衍生出了一个子问题：
若有一棵二叉树，先序遍历为：`B D E H I`，中序遍历为：`D B H E I`，构建出的是什么样的二叉树。而这棵构建出来的二叉树就是 A 节点的左子树。

显然，A 节点左子树的根节点是 B 节点，而 B 节点的左节点是 D，右子树包括节点 H、E 、I，且我们知道右子树的先序遍历与中序遍历。

![2020-12-02-13-18-08](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-02-13-18-08.png)

接着我们构建 B 节点的右子树，明显可见根节点为 E，E 的左节点为 H，右节点为 I。

![2020-12-02-13-19-09](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-02-13-19-09.png)

同样的，我们可以构建出 A 节点的右子树为：
![2020-12-02-13-19-29](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-02-13-19-29.png)

所以最后构建出来的二叉树就是：
![2020-12-02-13-19-53](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-12-02-13-19-53.png)

[哔哩哔哩视频链接](https://www.bilibili.com/video/av7420546/?spm_id_from=trigger_reload)

> 遇到不会的编程问题，可以试一试上哔哩哔哩上搜索，会有视频讲解~