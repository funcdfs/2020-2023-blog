---
title: Binary Search Tree
category: 计算机基础
tags:
  - 数据结构
--- 



第七章 二叉搜索树
（a）概述
（b1）BST：查找
（b2）BST：插入
（b3）BST：删除
（c）平衡与等价
（d1）AVL树：重平衡
（d2）AVL树：插入
（d3）AVL树：删除
（d4）AVL树：(3+4)-重构

![images.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/fengwei2002/pictureimages.jpg)

> 标志着我们数据结构进入新的里程碑

## **BST**

借助向量和列表内容的优点完成的一个数据结构
巧妙之处在于它的一个子集, **平衡二叉搜索树（BBST）**

循关键码访问：  
数据项之间,依照各自的关键码彼此区分 `call-by-key` 关键码应该支持 **大小比较**和**相等比对**的操作  
为了方便我们将整个 数据集合中的数据项 统一的表示和实现为词条 `entry` 形式

### **词条：**

``` cpp
template<typename K,typename V> struct Entry {
    K key; V value;  //关键码,数值
    Entry(K k = K(),V v = V () ): key(k), value(v) {}; //默认构造函数
    Entry( Entry<k, V> const & e ): key(e.key), value(e.value) {};//克隆构造函数
//比较器,判等器 (从此,不必严格区分词条及其对应的关键码)
    bool operator< (Entry<K, V> const & e ) { return key < e.key; }
    bool operator> (Entry<K, V> const & e ) { return key > e.key; }
    bool operator== (Entry<K, V> const & e ) {return key == e.key;}
    bool operator!= (Entry<K, V> const & e ) {return key != e.key;}
}; //词条的比对转换为关键码的比对操作
```

### **BST**

`binary search tree` 
节点：为了简便,将节点,词条,关键码 三个名词等同起来相互指代,而不加严格的区分

与二叉树的不同：**处处满足顺序性**：任一节点均不小于/不大于其左/右后代

> 为简化起见。禁止重复词条,但实际应用时极不自然；算法设计过程也没必要避免此情况

顺序性虽然只是对局部特性的刻画；但由此却可以导出某种全局特征；

**单调性：** BST的中序遍历序列；必然单调非降（树根节点左侧都比树根小,右侧都比树根大；这一性质,也是BST的**充要条件**；所有单调节点垂直投影构成的序列就是中序遍历序列,因此只要序列单调变化,则一定是BST

### **BST模板类实现：**

``` cpp
template<typename T> class BST : public Binary_Tree<T> {
    public: //以virtual修饰函数,以便派生类重写,二叉树接口仍然可以直接引用
      virtual Binary_Node_Position(T) & search(const T &);//查找
      virtual Binary_Node_Position(T) & insert(const T &);//插入
      virtual bool remove (const T & );//删除
    protected:
      Binary_Node_Position(T) _hot; //命中节点的父亲节点
      Binary_Node_Position(T) connect34( ) { //3+4重构算法
          Binary_Node_Position(T), Binary_Node_Position(T), Binary_Node_Position(T),
          Binary_Node_Position(T), Binary_Node_Position(T), Binary_Node_Position(T), Binary_Node_Position(T),
      Binary_Node_Position(T) rotateAt (Binary_Node_Position(T) ); //旋转操作
      }
}
```

## **算法**

`call by key` 

### **查找算法**

第一次从根开始的比较便可以省去一半的数据项；一直与子树的根节点比较；以此规则循环；  

![查找算法实例图.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/49ba5ecf853e92c133ad0d502a228f7.jpg)

失败时机在一直收缩到最后一个元素时（空树）；

> 有序向量中的二分查找

### **查找: 实现**

**search接口**：

``` cpp
template<typename T> Binary_Node_Position(T) & BST<T>::search(const T & e)
{return searchIn( _root, e, _hot = NULL ); } //从根节点启动查找 对外的 search接口调用searchIn接口
```

**searchIn接口**：

``` cpp
static Binary_Node_Position(T) & searchIn( //典型的尾递归,可改为迭代版
    Binary_Node_Position(T) & v, //当前（子）树根
    const T & e, //当前关键码
    Binary_Node_Position(T) & hot) {//记忆热点
    if ( !v || ( e == v->data) ) return v; //足以确定失败,成功
    hot = v; //继续递归查找 用 hot 先记下当前（非空）节点,然后再...
    return searchIn(( (e < v->data) ? v->lChild : v->rChild ) e, hot );
}//运行时间正比于返回节点v的深度,不超过树高 O(h) 每运行一次递归下降一层
```

**返回的引用值 _hot：**

* 查找成功时指向一个关键码为 e 且真实存在的节点
* 查找失败时；指向最后一次试图转向的空节点 NULL （增加哨兵）
* 所以无论成功与否：返回值总是等效的指向命中节点；而 _hot 总是指向命中节点的父亲

### **插入算法：**

借助search接口确定插入位置及方向  返回值_hot 的孩子就是我们该插入的地方 （返回的引用为NULL；刚好被使用）

* 插入算法的实现

``` cpp
template<typename T>Binary_Node_Position(T) BST<T>::insert( const T & e) {
    Binary_Node_Position(T) & x = search(e) ; //查找目标
    if (!x) { //因为禁止雷同元素的存在；所以只在查找失败时进行插入操作
        x = new Binary_Node<T>( e, _hot ); //在x 处创建以 e 为关键码的新节点；此节点以_hot 为父亲
        _size++; updateHeightAbove( x );  //更新全树规模；更新x及其历代祖先的高度
    }
    return x; //无论 e 是否存在于原树中；至此总有 x->data == e
}//验证：对于首个节点插入之类的边界情况；均可正确处置
```

### **删除算法**

相比插入算法更加复杂

* 删除算法的实现

``` cpp
template<typename T> bool BST<T>::remove( const T & e) {
    Binary_Node_Position(T) & x = search( e ); //定位目标节点
    if ( !x ) return false ;
    removeAt( x, _hot ); //
    _size--; //更新规模
    updateHeightAbove( _hot ); //更新 _hot 以及其历代祖先的高度
    return true;
} //删除成功与否,由返回值指示
```

* 删除单分支  

该节点的某棵子树为空 （ replace 即可)

``` cpp
template<typename T> static Binary_Node_Position(T) 
removeAt (Binary_Node_Position(T) & x, Binary_Node_Position(T) & hot ) { //删除 x
    Binary_Node_Position(T) w =  x; //实际被摘除的节点,初值同x
    Binary_Node_Position(T) succ = NULL;//实际被删除节点的接替者
    if (! hasLChild( *x ) ) succ = x = x->rChild; //左子树为空
    else if (! hasrChild(*x) ) succ = x = x->lChild; //右子树为空 同时空也正确
    else ( /*...左右子树并存的情况,略微复杂些 */ ) 
    hot = w->parent; //记录实际被删除节点的父亲  完成连接
    if ( succ ) succ->parent = hot; //将被删除者的接替者与hot相连
    release( w->data ); release( w );//释放被摘除的节点
    return succ; //返回接替者
} //此类情况只需要O(1)的时间
```

* 删除双分支

> 转换为情况一实现

之前二叉树实现过 `Binary_Node::succ()` 接口,直接返回中序遍历意义下的后继节点；  
交换过程依靠此完成  

交换要删除节点和他在BST投影中的下一个节点（该节点必然是某个分支的末端,所以只有右孩子；所以交换后就可以转换为删除单分支的情况）然后删除待删除节点；（恢复了BST的基本构造） _hot指向被删除节点的父亲 最后更新全图信息

`swap`  `->`  `replace`  `->`  `delete` 

![test.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/fengwei2002/picturetest.jpg)

``` cpp
/*...*/
else {
    w = w->succ(); swap( x->data, w->data );
    Binary_Node_Position(T) u = w->parent;
    ( u == x ? u->rChild : u->1chlid ) = succ = w->rChild;
}
/*...*/
```

最坏情况时间复杂度都正比于BST的高度

## 平衡与等价

但如果所有节点构成的树为单链；此时整个树的高度很大；此时静态操作和动态操作的时间都高达O(n) 的复杂度

* 随机生成

（生成BST的一种方法） 可以证明平均高度为$O(log_n)$   

* 随机组成

（生成BST的一种方法）上一种 213 和231 为同一颗树（且为低树高参与运算）所以平均高度实际用卡特兰数可以推出为$O(\sqrt{n})$所以后者结果更为可信

为此我们需要解决这个不理想高度带来的问题

* 理想平衡

节点数目固定时；兄弟子树高度越接近平衡；全树也倾向于越低（理想二叉树满树）但理想模型基本不会出现；得不偿失

* 适度平衡

高度渐进的不超过$O(log_n)$；即可称作适度平衡

我们将树高满足适度平衡的树叫做 BBST **平衡二叉搜索树**

### **等价BST**

结构不完全相同的BST中；中序遍历出来的顺序可能完全一样

所以我们利用这种歧义性 可以实现两个不同树之间的转换：

![实例图](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200307120214.jpg)

上面两个树就叫做相互等价的BST；上下结构存在调整余地；但左右次序却不能颠倒（上下可变,左右不乱）

### **旋转调整**

![e9ed9738967ea32e4fb6ab15fd1a25f.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/e9ed9738967ea32e4fb6ab15fd1a25f.jpg)

经过以上顺时针旋转下降(旋转中心 v 就是 **zig** 的参数); 该树的中序遍历序列仍然不变

![455ba61e263f0e886f5277c55a881fa.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/455ba61e263f0e886f5277c55a881fa.jpg)

zag 同理；它们都只对两个节点进行操作；所以单个操作需要的计算时间可以严格控制在常数时间内（但不能多次重复执行）$O(log_n)$为及格线

## **AVL**树

> 插入操作可以在$O(1)$时间内完成；删除操作刚刚在及格线

> 红黑树可以将以上两者的性能都优化到常数时间内

最为经典的一种平衡二叉树; AVL是发明者的名字简写

优化BST高度的问题（CBT 除外：完全平衡二叉树）

### **平衡因子：**

AVL中适度平衡所用到的指标 ：对于任意一个节点 v **左** 子树 **减 右** 子树的高度差

``` cpp
balFac(v) = height( lc(v) ) - height( rc(v) )
```

当BST所有节点的平衡因子不超过一也不小于负一时；就叫做AVL树；未必是完全二叉树

> AVL = 适度平衡

### AVL接口

``` cpp
#define Balanced(x) \ //理想平衡
    ( stature( (x).lChild ) == stature ( (x).rchild ))
#define BalFac(x) \   //平衡因子
    ( stature( (x).lChild ) - stature( (x).rChild ))
#define AvlBalanced(x) \ //AVL平衡条件
    ( ( -2 < BalFac(x) ) && ( BalFac(x) < 2 )) //平衡因子-1到1
```

也可以由BST模板类派生AVL的模板类

``` cpp
template <typename T> class AVL : public BST<T> { //由BST派生
    public:  //BST::search()等接口,可直接沿用
    Binary_Node_Position(T) insert (const T & ); //插入重写
    bool remove(const T & );//删除重写 
}
```

当用普通搜索实现插入一个节点的动作时；AVL树的许多节点（若干个祖先节点）的平衡状态就会被打乱；而删除操作则至多会引起一个AVL节点的失衡；  

而删除操作并没有因此变得比插入操作简单

实际中插入操作造成的错误其实可以用弥补一个错误的办法全部弥补；删除操作造成的影响则修复起来较为复杂

### 插入：单旋 $\qquad$ 2.7.1

同时可有多个失衡点；最低者不低于x祖父; 

zig为顺时针旋转；zag为逆时针旋转

对节点g的 zag 操作：

* 引入临时引用 rc
* 将 p 的左子树变为 g 的右子树
* 将 g 变为 p 的左孩子

![30456adc02e2c6e5bbc080227211e8b.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/30456adc02e2c6e5bbc080227211e8b.jpg)

* 将局部子树的根由g替换为p

![d3b9bde505c4939401566d3cb6760b0.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/d3b9bde505c4939401566d3cb6760b0.jpg)

g经过单旋调整后复衡；子树**高度复原**；更高的祖先也必然平衡,所以全树平衡

因为gpv节点都在右面,所以此操作叫做zagzag操作 一致向左的叫做zigzig

### 插入: 双旋

子孙三代呈现 `>` 形状时；分别叫做 `zigzag` 和 `zagzig` 

![f0cb501090fae058f3ac906bbc944d4.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/f0cb501090fae058f3ac906bbc944d4.jpg)

这时需要对 p 节点进行zig操作 对节点 p 进行 zag 操作

![5d2ae3cc22d306dfe4c6c46c5d4cd17.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/5d2ae3cc22d306dfe4c6c46c5d4cd17.jpg)

> g 为所有失衡祖先中最低的那个节点

### 插入算法的实现

``` cpp
template<typename T> Binary_Node_Position(T) AVL<T>::insert( const T & e ){
    Binary_Node_Position(T) & x = search( e ); if ( x ) return x; //若目标尚不存在
    x = new Binary_Node<T>( e, _hot );_size++;Binary_Node_Position(T) xx =x; //则创建x
    //以下,从 x 的父亲出发逐层向上,依次检查各代祖先g
    for ( Binary_Node_Position(T) g = x->parent; g; g = g->parent ) {
        if ( !AvlBalanced( *g ) ) {  //一旦发现失衡最低者,则通过旋转调整回复平衡
            FormParentTo( *g ) = rotateAt ( tallerChild( tallerChild( g ) ) ); //调整 g p v 
            break; //g复衡后,局部子树高度必然复原；其祖先亦然如此；故调整结束
        }
        else //否则（在依然平衡的祖先处）；只需简单的 
            updateHeight( g ); //更新其高度（平衡性虽然不变,但是高度却可能改变）
    return xx;  //返回新节点；至多只需要一次调整
    }
```

## AVL删除

要删除的刚刚好是比较短的那一个子树 

> 失衡会向上传播 可能需要$\log_n$次调整

### **删除：单旋**

删除后：  

![删除后的样子](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/230f4e0034aa0ef78a64bcc3e819f2d.jpg)

### **删除：双旋**

![70020373ab23056f7fecedd1bcc9ff7.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/70020373ab23056f7fecedd1bcc9ff7.jpg)

### **删除实现**

``` cpp
>2.8.1 - 2.8.3 
```

## 3+4重构

 将魔方的组件重新拼好一个魔方；而不是用规则 (单旋和双旋) 去还原

* 设g(x)为最低的失衡节点,考察祖孙三代：g~p~v  

按照中序遍历次序；将其重命名为：a<b<c

* 它们总共拥有互不相交的四颗（可能为空的子树）  

按中序遍历次序；将其重命名为： $T_0 < T_1 < T_2 < T_3$
三个节点 a,b,c 必然镶嵌于四颗子树之间（按照中序遍历就是上面的顺序）；BST的单调性

恢复平衡后单调性依旧要保持

所以就按照以下的[拓扑结构](https://baike.baidu.com/item/%E6%8B%93%E6%89%91%E7%BB%93%E6%9E%84)排列即可转换为AVL

![a6bdf6d0ef8438ab3f4268e49260843.jpg](https://raw.githubusercontent.com/fengwei2002/picgotest/master/img/a6bdf6d0ef8438ab3f4268e49260843.jpg)

所以该算法叫做 3+4 重构

对于魔方而言就是将各种不同的结构转换为全部同色的结构

### 3+4重构算法的实现

``` cpp
template <typename T> Binary_Node_Position(T) BST<T>::connect34(
    Binary_Node_Position(T) a,Binary_Node_Position(T) b,Binary_Node_Position(T) c,
    Binary_Node_Position(T) T0,Binary_Node_Position(T) T1,Binary_Node_Position(T) T2,Binary_Node_Position(T) T3)
{
    a->lChild = T0;if (T0) T0->parent = a;
    a->lChild = T1;if (T1) T0->parent = a; updateHeight(a);
    c->lChild = T2;if (T2) T2->parent = c;
    c->lChild = T3;if (T3) T3->parent = c; updateHeight(c);
    b->lChild = a; a->parent = b;
    b->lChild = c; c->parent = b; updateHeight(b);
    return b;//返回该子树的根节点
}
```

算法的输入为三个节点和四颗子树；然后规整的完成重构功能；鲁棒性变得很高

那么怎么确定参数顺序从而正确的传给函数呢？

## 统一调整：实现

``` cpp
template<typename T> Binary_Node_Position(T) BST<T>::rotateAt( Binary_Node_Position(T) v ) {  //传入孙辈节点 v 
    Binary_Node_Position(T) p = v->parent, g = p->parent; //父亲,祖父
    if (IsLChild( *p ) )  //区分各种情况
      if ( IsLChild( *v ) ) { //zigzig状态,v p 都是左孩子
         p->parent = g->parent;
         return connect34(v,p,g,v->lChild,v->rChild,p->rChild,g->rChild );
      }
      else { //v 是有孩子,p 是左孩子 zig-zag 
         v->parent = g->parent;
         return connect34( p,v,g,p->lChild,v->lChild,v->rChild,g->rChild );
      }
    else { /*..zag-zig & zag-zag ..*/}
}
```

## AVL综合评价

优点

* 无论查找；插入和删除,最坏情况下复杂度均为$O(log_n)$ $O(n)$的存储空间
* 兼顾所有的静态和动态操作且空间较小

缺点

* 借助了高度或平衡因子；为此需要改造数据结构,或者额外分装
* 实际复杂度与理论复杂度尚有差距；旋转操作成本不菲
* 单次动态调整后；全树结构的变化量可能高达$Ω(log_n)$ 插入操作变化量还在常数范围内；而删除操作变化量更多

  

