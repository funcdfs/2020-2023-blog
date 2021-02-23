---
title: B-Tree & Red-Black-Tree
draft: true
tags:
  - 数据结构
--- 
>未整理 
<!-- more -->

## 第八章 高级搜索树（上）
## (a1)伸展树:逐层伸展
## (a2)伸展树:双层伸展
## (a3)伸展树:算法实现
## (b1)B-树:动机
## (b2)B-树:结构
## (b3)B-树:查找
## (b4)B-树: 插入
## (b5)B-树: 删除
## (xa1)红黑树:动机

为了用极少内存实现可查找历史记录的一种BBST

## (xa2)红黑树:结构

- 树根为黑
- 外部节点均为黑
- 其余节点如果为红, 只能有黑孩子 //红节点的孩子和父亲都是黑的
- 外部节点到根, 途中黑节点数目相等




## (xa3)红黑树:插入
## (xa4)红黑树:删除
## 本章测验

## **伸展树**

AVL树需要每时每刻都特别小心；所以就有了一种范围更宽的平衡规则

### **局部性**

**Locality**: 刚被访问过的数据；极有可能很快的再次被访问；这一现象在信息处理过程中屡见不鲜

**BST**: 所以下一个即将访问的节点,极有可能就在刚刚被访问过的节点的附近

### **自适应调整**

> 以列表为例:

若访问规则具有极高的局部性；每次访问完成后就将访问过的元素放在 list 的开始部分（保证下一次访问相同元素变得最快）,最后效果就是最常用的访问节点都在列表的前一部分

![a5bb8c9927709f8e82620535895527c.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/a5bb8c9927709f8e82620535895527c.jpg)

所以推广至 **BST** 中；就是将最常访问的节点尽量放在根节点附近（想办法降低节点对应深度）

### **逐层伸展**

节点 v 一旦被访问,随即转移至树根

> 使用之前的 zig zag 操作；可以使目标节点与其父节点交换而不打乱BST的规则

![d818f51a590b6fac264a71918e30349.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/d818f51a590b6fac264a71918e30349.jpg)

所以**反复使用**以上两个技巧组合便可以使 要访问的节点逐层上升,直至根节点；达到常数时间访问到目标节点的目的

概括而言:  
自下而上；逐层单旋； `zig( v->parent )`  `zag (v-。parent)` 直到节点 v 被推送到树根

> 一步一步往上爬

### **最坏情况**

![7b81fcf7b3bb9bea8c47205179cbdc1.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/7b81fcf7b3bb9bea8c47205179cbdc1.jpg)

从 001 开始全部访问一遍后；该结构并没有发生变化；但是依照上面的执行步骤却走了很多步且没有任何效果 

![396be0e02d7344432ccadb00b511871.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/396be0e02d7344432ccadb00b511871.jpg)

这样的话；复杂度就退化的和基本数据结构List vector 一样了；但并不是技巧不对,而是使用技巧的方法出现了问题；

那么如何改进呢？

### **双层伸展**

Tarjan 

构思的精髓: 向上追溯两层,而并非一层

* 反复考察祖孙三代: `g = parent(p)` , ` p = parent(v)` , ` v` 
* 根据它们的相对位置；经过至多**两次旋转**使得v上升两层,成为子树根

之字形的情况:

![deba6d84a5d42233c25d766bc2a86ef.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/deba6d84a5d42233c25d766bc2a86ef.jpg)

> 与 AVL 双旋等效,与逐层伸展别无二致

### **zig-zig** **zag-zag** 操作的优化

![3de54cf2e6fffe6b12259c681076d67.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/3de54cf2e6fffe6b12259c681076d67.jpg)

$\qquad$第一种为普通操作；第二种为优化后的操作；先从祖父节点开始执行而不是从父节点开始操作 

> 这种方法有着颠覆性的效果（最终被访问元素父节点不动,被访问节点与祖父节点交换）

例:

![c448663c5a90a967d2354d32453fa8b.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/c448663c5a90a967d2354d32453fa8b.jpg)

![55a7b88812ba39837c7c58556c5f97e.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/55a7b88812ba39837c7c58556c5f97e.jpg)

![016562e67113d1970225173f965f1d7.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/016562e67113d1970225173f965f1d7.jpg)

> 整颗树的树高作为该过程的**副产品**也有了本质性的改变,树高大概缩减为原来的一半
>  

**折叠效果:** 当节点变多时,效果更加明显,缩短树高这个功能就显得及其重要（每访问一次最后的节点树高就缩短一半左右）最坏情况不会持续发生

当节点v只有父亲没有祖父时,此时节点v的父亲是树根；因为只会出现一次,所以视具体形态,做相应的单次旋转

### **实现:**

* 模板类的实现:

``` cpp
template<typename T>
class Splay : public BST<T> { //由BST派生
  protected: 
    Binary_Node_Position(T) splay(Binary_Node_Position(T) v ); //将节点v伸展到树根
  public: //伸展树的查找也会引起整个树的结构调整,故 search( )接口也要重写
    Binary_Node_Position(T) & search (const T & e ); //重写查找
    Binary_Node_Position(T) insert (const T & e); //重写插入
    bool remove( const T & e); //重写删除
}
```

* splay实现:

``` cpp
template<typename T> 
Binary_Node_Position(T) Splay<T>::splay( Binary_Node_Position(T) v ){
  if( ! v ) return NULL; Binary_Node_Position(T)p;Binary_Node_Position(T) g //创建传入函数的 父亲 祖父 节点
  while( (p=v->parent)&&(g=p->parent) ) { //自上而下,同时存在就反复逐层伸展
      Binary_Node_Position(T) gg = g->parent; //每轮之后v以原先曾祖父为父
      if (IsLChild( *v ))   //四种情况
        if(IsLChild( *p )) {/*zig-zig*/}else {/*zig-zag*/}
      else if(IsRChild( *p )){/*zag-zag*/} else{/*zag-zig*/}

      if (!gg) v->parent = NULL; 
      else(g=gg->lc)? attachAsLChild(gg,v):attachAsRChild(gg,v);
      updateHeight(g);updateHeight(p);updateHeight(v);
  }
  if(p=v->parent){/*若p果真为假,只需再额外单旋(至多一次)*/} 
  v->parent = NULL; return v;
}
```

* 四种情况中 zig-zig 的实现

  

![26d9a17b77a266dd2bc573a23e0ebb6.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/26d9a17b77a266dd2bc573a23e0ebb6.jpg)

### **查找算法**

``` cpp
template <typename T>Binary_Node_Position(T) & Splay<T>::search( const T & e ){
    //调用标准BST的内部接口定位目标节点
    Binary_Node_Position(T) p = searchIn( _root,e,_hot = NULL );
    //无论成功与否,最后被访问的节点都将伸展到树根
    _root = Splay( p ? p : _hot );
    //总是返回根节点
    return _root;
}
```

### **插入算法**

先调用之前已经实现的 serch 接口（查找失败）splay split join 

![Screenshot_20200313_162315_tv.danmaku.bili.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/fengwei2002/pictureScreenshot_20200313_162315_tv.danmaku.bili.jpg)

### **删除算法**

![Screenshot_20200313_163849_tv.danmaku.bili.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/fengwei2002/pictureScreenshot_20200313_163849_tv.danmaku.bili.jpg)

### **评价**

* 编程实现简单易行  
* 分摊复杂度也与AVL树相当  
* 局部性强,缓存命中率极高
* 效率更高（自适应$O\log_k$）
* 不适用于对效率极其敏感的场合（手术）

> 操作系统的设计也通常利用自适应调整的特点

## **B-树**

### **越来越小的内存**

系统存储容量的增长速度$<<$应用问题的增长规模

所以相对而言内存容量就是在不断减少

### **高速缓存**

不同容量的存储器,访问速度差异悬殊 $10^5$ 

> 一秒与一天

多数存储系统,都是分级组织的$\qquad$他的最常用的数据尽可能放在更高层,更小的存储器中,实在找不到,才像更低层,更大的存储器索取空间

* 但从磁盘中读写 `1B` ,与读写 `1KB` 几乎一样快
* 批量式访问:以页和块为单位使用缓存区

### B-树的结构

![47b3e6f7d8f9268feb8b45b5d35db26.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/47b3e6f7d8f9268feb8b45b5d35db26.jpg)

B-树显得更宽更矮（平衡的多路搜索树）,具有超级节点（含有多个关键码）,逻辑上与BBST等价

多级存储系统中使用B—树,可针对外部查找,将其查找的特点（每次多个数据）转化为相应的优点,大大减少I/O 操作（每次读入一组关键码）

### B-树的定义

* 所谓m阶B-树,即m路平衡搜索树
* 所有叶节点的深度统一相等
* 外部节点的深度统一相等（数值为空且不存在的节点）

内部节点各有

* 不超过m-1个关键码
* 不超过m个分支

内部节点的分支数 n+1 也不能太少,具体的

* 树根: $n+1 \geq 2$
* 其余:$n+1 \geq [m/2]$

故B-树也叫做$([m/2], m)$ 树 （超级节点的下限上限）

（4,7)树,(2, 4)树 

### **紧凑表示**

* 将左右引用简化为一个点
* 将外部节点省略掉

![ad47571454b496dd83a6e140e6178c1.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/ad47571454b496dd83a6e140e6178c1.jpg)

### **BTNode**

一个B树节点的结构为:

![e54eb6c866a18ad109428e59262e36e.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/e54eb6c866a18ad109428e59262e36e.jpg)

所以可以使用两个向量表示:

![16007b91ace5a298fb6feeae778cc68.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/16007b91ace5a298fb6feeae778cc68.jpg)

``` cpp
template <typename T > struct BTNode {
  BTNodePosition(T) parent; //父
  Vector<T> key;  //数值向量
  Vector<BTNodePosition(T)> child; //孩子向量
  BTNode() { parent = NULL; child.insert( 0,NULL); } //构造一个空节点
  BTNode( T e,BTNodePosition(T) lc = NULL,BTNodePosition(T) rc = NULL) {
    parent = NULL;  //做为根节点,并且初始时 
    key.insert( 0,e ); //仅有一个关键码 e
    child.insert( 0,lc ); child.insert( 1,rc ); //以及两个孩子
    if ( lc ) lc->parent = this;if (rc) rc->parent = this;
  }
}
```

### BTree

``` cpp
#define BTNodePosition(T) BTNode<T>* 
template <typename T> class BTree {
  protected:
    int _size; int _order;BTNodePosition(T) _root; //关键码总数,阶次,根
    BTNodePosition(T) _hot;  //search最后访问的非空节点的位置
    void solveOverFlow (BTNodePosition(T) ) ; //因插入而上溢出的分裂处理
    void solveUnderFlow (BTNodePosition(T) ) ;//删除而下溢出后的合并处理
  public:
    BTNodePosition(T) search( const T & e);
    bool insert(const T & e);
    bool remove(const T & e);
}
```

### B-tree 查找算法

`search` 借助B树的外部节点,我们可以将不同的B树通过外部节点连接起来,构成一个更大的B树 

每次查找确定一个下一步要开始地方的引用,失败处都在叶节点中子外部节点处
B
实现:

``` cpp
template <typename T> BTNodePosition(T) BTree<T>::search(const T & e){
  BTNodePosition(T) v = _root; _hot = NULL;
  while (v) {
    Rank r = v->key.search(e);
    if ( 0<=r && e == v->key[r] ) return v;
    _hot =v; v= v->child[r+1];
  }
  return NULL;
}
```

