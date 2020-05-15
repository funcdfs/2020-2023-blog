---
title: Binary Tree
category: basics
tags:
  - Data Structure
--- 
# 二叉树

## （a）树

Tree = $List^2$

​树适用于表示有层次结构的数据, 例如文件管理系统,

将现在研究的半线性结构转换为之前研究完整的线性结构

### 树基本结构

每一个节点都叫做 顶点：`vertex` 
指定任一节点 r 称作有根树(rooted tree) 
每一个vertex都具有：parent child sibling(兄弟) degree等
若将同一节点的孩子们编号,则称作有序树(ordered tree)
​树中结点的最大度数称为树的度


### 路径(path)加环路

依次相连的k+1的节点,构成一条路径,通路  
路径长度就是参与构成其的边数     （早期文献以节点数为长度  

环路,loop 节点构成环

节点之间均有路径,称作连通图(connected),不含环路,称作无环图(acyclic)

故：任一节点v与根之间存在唯一路径
$$path(v, r)=path(v)$$
节点拥有的指标便是这条通路的长度 通过指标可以将节点化为几类  

### 树的属性

``` cpp
path from root to  v = path v  
subtree rotted at v = subtree v
```

节点具有的那个指标也叫做树的深度(depth)  
path(V)上的节点,均为v的祖先(ancestor) v 是他们的后代(descendent) 
前驱的唯一性仍然保持,后继的唯一性未必,所以树也叫做半线性结构  
那么图就叫做非线性结构  

* 根节点深度为0 , 为公共祖先 
* 没有后代的节点称作叶子
* 所有叶子最大值的深度就叫做树的高度
* 子树也具有高度,全树的高度
* 特别的,空树的高度取做 -1
* $depth(v) + height(v) <= heigth(T)$ depth为节点到根,height为节点到叶

### 节点的接口设计

![A1A669469932A264ECD45FB0121803C7.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureA1A669469932A264ECD45FB0121803C7.jpg)

如果将顶点的children组成一个新的序列,每个节点的度数就是其孩子的数目,可以加快查找孩子的速度

对于同一个节点：保留parent数据集和child数据集,这样的实现方法两全其美

但实际中child数据集的长度相差较大

所以每个节点均设置两个引用,纵引用为 `first_child`,横引用为 `next_sibling`

对于任意一个节点,只保留第一个孩子的一个引用,第一个孩子再通过横向引用确认其他节点

这个方法叫做长子兄弟法

## （c）二叉树

节点数不超过2的树,称作二叉树

同一节点的孩子和子树,均以左右区分,(左节点为`first_chlid`),

深度为k的树,最多$2^k$个节点, 最多时叫做满树(full binary_tree),


### 真二叉树

每个节点的度数都是偶数,0 or 2 

![75E71F923C483C9403256E58E91CFED6.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture75E71F923C483C9403256E58E91CFED6.jpg)


### 用二叉树描述多叉树

有根且有序的树都能通过二叉树表示和实现（通过长子兄弟法）

![3A2536F3E5918997190B0AF48297710E.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture3A2536F3E5918997190B0AF48297710E.jpg)


## （d）二叉树实现

### Binary_Node 实现

二叉树的基本单位是二叉树的节点叫做 Binary_Node 
通过c++的模板类实现
每个vertex的属性：
* 每个节点的核心：data ,
* 每个节点共有三个引用构成树的枝叶：parent ,L_Child ,R_Child ,
* 每个节点可能具有的属性：height,color 

``` cpp
#define Binary_Node_Position(T)  Binary_Node<T>* //节点指针
template<typename T> struct Binary_Node {
    Binary_Node_Position(T) Parent,L_Child,R_Child; //用长子兄弟法定义一个节点的三个引用
    T data; int height ;int size();//任意类型的节点数据区,以及高度,和子树规模
    Binary_Node_Position(T) insert_as_left_child(T const & );//插入新节点
    Binary_Node_Position(T) insert_as_right_child(T const & );
    Binary_Node_Position(T) success( ); //（中序遍历意义下）当前节点的直接后继
    //每一个二叉树节点都要提供四种基本遍历的接口
    template<typename VISIT> void travLevel (VISIT &);//子树层次遍历
    template<typename VISIT> void travPre(VISIT &);   //子树先序遍历
    template<typename VISIT> void travIn(VIIT &);    //子树中序遍历
    template<typename VISIT> void travPost(VISIT &);  //子树后序遍历 
}
```

### Binary_Node 一般接口的实现

`insert_as_left_child`作为左右节点插入算法的实现：

``` cpp
template <typename T> Binary_Node_Position(T) Binary_Node<T>::insert_as_left_child(T const & e){
    return lChild = new Binary_Node ( e ,this );
    //通过构造函数构建新节点 data 域为 e 父节点为 this 返回值为 一个 position 所以直接将结果赋值给 L_Child
}
```
Right_child 完全对称


子树规模 `size` 接口: 线性时间实现

``` cpp
template <typename T>
int Binary_Node<T>::size(){//递归实现
    int s = 1; //本身
    if (lChild) s += lChild->size();
    if (rChild) s += rChild->size();
    return s; //两项合计加上当前节点本身,递归则得出当前的 size()
}
```


### Binary_Tree 模板类

``` cpp
template <typename T> class Binary_Tree{
    protected:
      int _size; //树的规模
      Binary_Node_Position(T) _root; //树的根节点
      virtual int updateHeight(Binary_Node_Position(T) x);  
      //更新节点x的高度, 虚函数定义方便重写
      void updateHeightAbove(Binary_Node_Position(T) x);    
      //更新x及其祖先的高度
    public:
      int size() const {return _size;}//规模
      bool empty() const {return !-root}//判空
      Binary_Node_Position(T) root() const {return _root} //返回树根
      //……子树接口 ,删除和分离接口 ,遍历接口 
}
```


### 高度更新

定义：对于节点 x ,在以它为根的叶节点最长距离,无子节点 h=0 ,root 的高度为 -1  
左右 child 的高度最大再加一

``` cpp
#define stature(p) ( (p) ? (P)->height : -1 )
//将特殊情况统一起来更加方便 且不影响到算法的正确性 stature: 身材
template<typename T>
int Binary_Tree<T>::updateHeight( Binary_Node_Position(T) x){
    return x->height = 1 + max (stature( x->lChild ),stature (x->rChild) );
}//更新当前节点高度：采用常规二叉树规则,O(1) 

template<typename T> 
void Binary_Tree<T>::updateHeightAbove( Binary_Node_Position(T) x){
    //更新x及其历代祖先的高度
    while(x) {
        updateHeight(x); x = x->parent;//从当前节点开始一直向上逐个更新
     } 
    //可优化,一旦高度未变即可终止, //O(n =depth)
}
```


### 节点插入

这是树中插入算法的实现, 与节点插入不同的是, 前者需要照顾整棵树的属性

``` cpp
template<typename T> Binary_Node_Position(T) //insert_as_left_child 对称
Binary_Tree<T>::Insert_As_Right_Child (Binary_Node_Position(T) x ,T const & e){
    _size++; x->insert_as_right_child(e); 
    //调用同名接口完成新节点的创建和连接
    updateHeightAbove(X); //更新 x 及其祖先的高度
    return x->rChild; //返回右节点（执行插入的位置）
}
```

## （e1）先序遍历

traverse: 遍历

遍历的意义：按照某种次序,每一个节点都恰好被访问一次,在树中只要根节点和左右子节点可以确定一种顺序,那么便可以执行下去
先序中序后序遍历就是根据 根节点在遍历序列中的先后顺序来区分的    

![89B2747A227ED7347DECFEDC58C24E05.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture89B2747A227ED7347DECFEDC58C24E05.jpg)


### 递归实现的先序遍历

``` cpp
template<typename T ,typename VISIT> 
//因为visit函数要返回的值不一样, 所以就需要模板VISIT
void traverse(Binary_Node_Position(T) x,VISIT & visit){
    if (!x) return ; //每个递归都应该有的递归基
    visit (x->data); //查看节点 x 的数据域
    traverse(x->lChild,visit); traverse(x->rChild,visit);//递归实现
}  //复杂度为O(n)
```


### 迭代实现的两种先序遍历

第一种迭代实现, 引入一个栈

``` cpp
template<typename T,typename VISIT>
void travPre_I(Binary_Node_Position(T) x,VISIT & visit){
    Stack <Binary_Node_Position(T)> S; //创建存储节点的一个辅助栈
    if (x) S.push(x); //根节点入栈
    while (!S.empty() ){ //在非空前反复访问
        x = S.pop(); visit (x->data); 
        //弹出栈顶 并同时访问当前弹出的节点,当 x 节点左右都有节点时没有push操作, 弹两次  
        if ( Has_Right_Child(*x) ) S.push (  x->rChild); 
        //存在有孩子就推入栈中,右孩子先入后出
        if ( Has_Left_Child(*x) ) S.push (  x->lChild); 
        //存在左孩子也推入栈中,左孩子后入先出
    }76
}              // 妙啊
```

![AC70CB6322098BC7C6204D083FB726E4.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureAC70CB6322098BC7C6204D083FB726E4.jpg)

但这种不易于推广至中序遍历, 所以


第二种迭代算法的思路

![15604BB676F81A604F0C13C81599E1ED.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture15604BB676F81A604F0C13C81599E1ED.jpg)


先遍历最左侧的一列树,然后遍历每一个左节点对应的右节点

Visit_Along_Left_Branch 实现：

``` cpp
template<typename T,typename VISIT>
static void Visit_Along_Left_Branch(//参数列表：
    Binary_Node_Position(T) x,
    VISIT & visit,
    Stack <Binary_Node_Position(T)> &S) {//依然创建一个辅助栈, 后进先出的次序
    while (x) {
        visit (x->data);
        S.push(x->rChild); //右孩子入栈,将来逆序出栈,第一个出来的是最底部的右孩子
        x = x->lChild;     //沿着左链下滑
    } //只有右孩子和 NULL 可能入栈
}
```

主算法实现：

``` cpp
template<typename T,typename VISIT>
void travPre_II(Binary_Node_Position(T) x ,VISIT & visit){//传入一个节点作为根节点
    Stack <Binary_Node_Position(T)> S;
    while (true) {
        Visit_Along_Left_Branch (x , visit , S );
        //传入大家公用的栈, 从x开始左下滑, 左链遍历完毕退出, 
        if (S.empty() ) break; //只有栈空才退出
        x = S.pop(); //弹出最后那一个右节点直到弹出右子树的根节点
    }
}
```

## （e2）中序遍历


递归角度：

``` cpp
template <typename T,typename VISIT>
void traverse (Binary_Node_Position(T) x ,VISIT & visit){
    if (!x ) return ;  //处理递归基
    traverse (x->lChild , child); 
    visit ( x->data );
    traverse (x->rChild,visit);
} O(n)
```

![B1F82B041FE46B22A84B46E144D6B5E9.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureB1F82B041FE46B22A84B46E144D6B5E9.jpg)

每一次都是从左孩子的最左者(没有左孩子的那一个)开始执行  从根出发沿左分支下行,直至最深的节点  他就是全局最先被访问者  
[思路解析-1](http://www.bilibili.com/video/av82410486?p=198&share_medium=android&share_source=copy_link&bbid=PQk6Cz4KOAtoDjYHewd7infoc&ts=1582976891652
)整个左侧链有多长就有多少个阶段

[思路解析-2](vhttp://www.bilibili.com/video/av82410486?p=199&share_medium=android&share_source=copy_link&bbid=PQk6Cz4KOAtoDjYHewd7infoc&ts=1582977180723
)


迭代角度：

``` cpp
template<typename T>
static void goAlongLeftBranch(Binary_Node_Position(T) x, Stack<Binary_Node_Position(T)> & S) {
    while (x) {S.push(x); x = x->lChild;}  //反复入栈,沿分支深入
}
template<typename T, typename V> void traverse_in_I (Binary_Node_Position(T) x ,V& visit ){
    Stack <Binary_Node_Position(T) > S;  //创建辅助栈
    while (true) {//反复的
        goAlongLeftBranch (x ,S );//从当前节点出发(左分支) ,逐批入栈  谦让控制权
        if (S.empty() ) break;    //直至所有节点处理完毕
        x = S.pop();              //x的左子树或为空,或已经遍历（等效于空）,故可以
        visit(x->data);  //立即访问x
        x = x->rChild;   //再转向其右子树,(可能为空) ,下一轮以右子树为根 ,继续入栈操作
    }
}
```

[实例解析, 加深理解](http://www.bilibili.com/video/av82410486?p=201&share_medium=android&share_source=copy_link&bbid=PQk6Cz4KOAtoDjYHewd7infoc&ts=1582977977907
)

总体复杂度为 $O(n)$ (不是$O(n^2)$)


## （e4）层次遍历


最后一种典型的二叉树遍历方式

严格按照次序,从高到低进行访问(根开始,一层一层进行) , 从上到下,从左到右,所以使用队列刚好可以实现

``` cpp
template<typename T> template <typename VISIT>
void Binary_Node<T>::travLevel(VISIT & visit){ //二叉树层次遍历
    Queue<Binary_Node_Position(T) > Q;//创建辅助队列
    Q.enqueue( this ); //根节点入队
    while ( !Q.empty() ) { //在队列再次变空前,
        Binary_Node_Position(T) x = Q.dequeue(); //取出队首节点并访问
        visit( x->data );
        if ( Has_Left_Child(*x) ) Q.enqueue( x->lChild );//有左左入队
        if ( Has_Right_Child(*x) ) Q.enqueue( x->rChild );//有右右入队 队列先进先出
    }//队列变空循环退出
}
```

## （e5）二叉树的重构

即根据已知的序列还原二叉树

中序 + 先序 || 后序 即可完整还原二叉树的拓扑结构

(二刷时再过一遍理由)

