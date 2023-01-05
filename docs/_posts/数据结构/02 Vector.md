---
title: Vector 向量
date: 2020-11-11
tags:
  - 数据结构
--- 

> 数据结构02 vector 

<!-- more -->

## 接口与实现

相比数组来说不限于基本类型，数组的抽象与泛化
可以参与复杂的算法，统一且安全
有很多接口对于向量内的元素的操作（向量的 ADT 接口）

### C++ 模板

```cpp
template <typename T> 
class vector{

} 
```
这种以模板定义的方式就可以使数据结构更加方便的被利用

使用的时候就是

`vector<binarytree> myvector`

### vector 接口

![向量接口实例](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-11-21-29-41.jpg)

逻辑上和物理上都符合常理要求

### vector 构造+析构

``` cpp
typedef int Rank; //定义秩
#define DEFAULT_CAP 3 //默认初始容量

template<typename T> class vector {//开始定义模板类
    private: Rank size;
    int  _capaccity; //容量
    T* _elem;  //开辟的数据区的指针
    protected: //内部函数
    public: 
    // 构造函数
    // 析构函数
    // 只读接口
    // 可写接口
    // 遍历接口
}
vector->interface->applications
```

多种构造函数:

![2020-07-31-18-54-03](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-07-31-18-54-03.png)

析构函数:

![2020-07-31-18-54-41](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-07-31-18-54-41.png)

### 构造函数子函数 copyfrom

申请二倍的空间 $\rightarrow$ 逐一复制

![2020-07-31-18-56-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-07-31-18-56-24.png)

## 可扩充向量

默认就是开辟一段连续的内存空间  
采用一段连续空间可能出现上溢和下溢（元素寥寥无几，利用率极低）
并且一般应用环境不能准确预测空间需求量  

### 动态空间管理

在即将发生上溢时，适当扩大内部空间容量，动态申请一个更大的外壳  
再将东西复制过来，释放原来的小空间，将新空间供用户调用  

``` cpp
template <typename T>
void Vector<T>::expand {  //向量空间不足时扩容
    if (_size < _capcity)
        return;                                 //尚未满员时，不必扩容
    _capcity = max(_capcity, DEFAULT_CAPCITY);  //不低于最小容量
    T* oldElem = _elem;
    _elem = new T[_capcity << = 1]         //左移一位等于容量加倍，字节操作速度更快
        for (int i = 0; i < _size; i++) {  //复制原向量内容
        _elem[i] = oldElem[i];
    }
    delete[] oldElem;  //释放原空间
}
```

得益于向量的分装，尽管扩容之后数据地址已经改变，却不出现野指针（原先指向具体元素的指针）

### 为何加倍空间

[递增式扩容](https://next.xuetangx.com/learn/THU08091000384/THU08091000384/1516243/video/1387154)$\rightarrow$[加倍式扩容](https://next.xuetangx.com/learn/THU08091000384/THU08091000384/1516243/video/1387155)

使用空间的牺牲，换取了时间上的巨大收益  

### 平均分析 & 分摊分析

![34D26A3AC10EA77D875667FD5EE4CB26.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture34D26A3AC10EA77D875667FD5EE4CB26.jpg)

## 无序向量

### 循秩访问 `[]` 

使用 `V.get(r),V.put(r,e)` 进行读写向量元素并不是很方便   
所以要重载 `[ ]` 这样就可以便捷的使用访问数组的方式来访问向量中的元素  

``` cpp
template<typename T>
T & vector<T>::operator[](Rank r)const{
    return _elme[r];
}
```

此后对外的 `V[r]` 即对应于内部的 `V._elme[r]` 
返回值是引用所以可以做左值或者右值   

### 插入算法 `right shift`

![2020-11-11-22-19-31](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-11-22-19-31.jpg)

``` cpp
template <typename T>
Rank Vector<T>::insert(Rank r, T const& e) {  // 0(n-r)
    expand();  // maybefull, 若有需要则扩容，向量可能已经满载
    for (int i = _size; i > r; i--) {  
        //自后向前,元素的移动次序后面元素优先，避免被覆盖
        _elme[i] = _elme[i - 1];  //后继元素顺次后移一个单元
        _elme[r] = e;             //置入新元素
        _size++;                  //右移完成后，同时更新容量
        return r;                 //返回秩
    }
}
```

### 删除算法 `left shift`

区间删除
![2020-11-11-22-22-57](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-11-22-22-57.jpg)
shruck v.收缩（shrink的过去分词）

``` cpp
template <typename T>                      //删除区间 [lo,hi]0<=lo<=hi<=size
int vector<T>::remove(Rank lo, Rank hi) {  // 0(n-hi)
    if (lo == hi)
        return 0;  //出于效率考虑，单独处理退化情况
    while (hi < _size)
        _elem[lo++] = _elem[hi++];  //[hi,_size] 顺次前移 hi-lo 位，平移一段空间
    _size = lo;
    shrink();        //更新规模，若有必要则缩容
    return hi - lo;  //返回被删除元素的数目
}
```

### 单元素删除

可以视作区间操作的特例 `[r]=[r, r+1]`, 所有后缀向前移动  
数据结构更加关注效率，所以不将区间视为单元素的特例而将单元素视为区间的特例

``` cpp
template<typename T>//删除向量中秩为 r 的元素，0<=r<size；
T <vector>::remove(Rank r){//0(n-r)
    T e=_elem[r];//备份被删除的元素
    remove(r,r+1);//调用删除区间的算法
    return e;//返回被删除的元素
}
```
为什么不根据单元素操作反复执行实现多元素删除？

因为这样的话一个元素移动的距离从n降为了1，时间复杂度变为$O(n^2)$

### 查找操作

无序向量需要判等，重载==和！=  
有序向量比较  
逆向扫描  
![2020-11-12-10-23-50](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-12-10-23-50.jpg)
``` cpp
template <typename T>
Rank Vector<T>::find(T const& e, Rank lo, Rank hi) const {
    //在命中多个元素时可返回秩最大者
    while ((lo < hi--) && e != _elem[hi])
        ;       //逆向查找
    return hi;  // hi<lo 意味着失败；否则 hi 即命中元素的秩
}
```

### 唯一化算法

网络搜索环境中会用到这种去重工作  

``` cpp
template <typename T>  //删除重复元素，返回被删除元素数目
int vector<T>::deduplicate() {  //繁琐版+错误版
    int oldsize = _size;        //记录原规模
    Rank i = 1;                 //从_elem[1] 开始
    while (i < size) {          //自前向后逐一考察各个元素_elem[i]
        (find(_elem[i], 0, i) < 0) ? i++  //若无雷同则继续向后考查
                                   : remove(i);  //否则删除雷同者
    }
    return oldSize - _size;  //向量规模变化量，即删除元素总数
}
```

find() 和 remove() 累计耗费线性时间，故总体复杂度为$O(n^2)$  
可进一步优化:  

* 依照 uniquify() 高效版的思路，元素移动次数可降为 O(n), 但比较次数依然是$O(n^2)$, 而且稳定性将被破坏
* v.sort().uniquify(): 实现最优$O(log_n)$

## 有序向量

有序性及其甄别

要实现比较操作  
任何一堆相邻元素都顺序  
因此，相邻逆序对数，可用以度量向量的逆序程度

无序向量转换为有序向量后许多算法就可以进行大幅度的提升

![2020-11-12-10-44-40](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-12-10-44-40.jpg)


### 唯一化（低效版）

低效算法唯一性，每一区间都保留单个元素即可

``` cpp
template <typename T>
int vector<T>::uniquify() {
    int oldsize = _size;
    int i = 0;
    while (i < _size - 1)
        (_elem[i] == _elem[i + 1]) ? remove(i + 1) : i++;
    //若相同则删除后者，否则转移至后一个元素
    return oldsize - _size;
}
```

其复杂度:  
因为要调用 remove 操作，最坏情况每次都要调用 remove 操作$O(n^2)$  
和无序向量复杂度一样，所以不推荐

### 唯一化（高效版）

同一元素可作为被删除元素的后继多次前移一位，
尝试将区间一次成批删除
一直遍历找到与 i 不同的元素 j, 然后将 j 移动到紧邻 i 的右侧那个位置，无形中将重复元素忽略，直接数据覆盖等效于删除无用元素

![2020-11-12-11-04-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-12-11-04-24.png)

``` cpp
template <typename T>
int vector<T>::uniquify() {
    Rank i = 0, j = 0;  //各对互异相邻元素的秩
    while (++j<_size>)  //逐一扫描，直至末元素
        //跳过雷同者；发现不同元素时，向前移至紧邻前者右侧
        if (_elem[i] != _elem[j])
            _elem[++i] = _elem[j];
    _size = ++i;
    shrink();      //截取尾部多余元素
    return j - i;  //向量规模变化量，被删除元素总数
}  //注意:通过 remove(lo,hi) 批量删除，依然不能达到高效率
```
![2020-11-12-11-03-33](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-12-11-03-33.png)

复杂度为$O(n)$只有一次比对操作

## 查找算法

统一接口

``` cpp
template <typename T>  //查找算法统一接口，0<=lo<hi<=_size
Rank vector<T>::search(T const& e, Rank lo, Rank hi) const {
    return (rand() % 2) ?  //按照各 50%的概率随机选用 0 1
    //以达到，随机采用两种算法的目的
               binsearch(_elem, e, lo, hi)
                        :                    //二分查找算法
               fibsearch(_elem, e, lo, hi);  // finbonacci 查找算法
}
```

如何处理特殊情况也需要细致约定 
* search 算法返回值是不大于目标的最后一个元素，秩
* 若 `负无穷<e<V[lo]` 则返回 lo-1
* 若 `V[hi-1]<e<正无穷` 则返回，hi-1

### 二分查找

二分查找原理:用轴点将区间分为三个部分  
小于转向左侧区间，大于转向右侧区间，等于 median 则直接返回；  
不断的缩减问题的规模  

版本 A 实现

``` cpp
template <typename T>  //在有序向量区间 [lo,hi) 内查找元素
static Rank binsearch(T* A, T const& e, Rank lo, Rank hi) {
    while (lo < hi) {  //每步迭代可能要做两次比较判断，有三个分支
        Rank mi = (lo + hi) >> 1;  //以中点为轴点
        if (e < A[mi])
            hi = mi;  //深入前半段继续查找，右移一位等于除以 2
        else if (A[mi] < e)
            lo = mi + 1;  //深入后半段
        else
            return mi;  //在 mi 处命中
    })
    return -1; //查找失败
}
```
> 通常算法中推荐用小于号，而不是大于号，因为物理意义上的空间地址从左到右，与运算次序吻合 

`S.search(8,0,7);` 复杂度为 $o(1.5\ log_n)$    
大大优于顺序查找  


### 斐波那契查找 fibsearch

binsearch 比较次数不等，递归深度相等，左侧成本更低  

![2020-11-12-11-45-30](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-12-11-45-30.png)

算法实现

``` cpp
template <typename T>
static Rank fibsearch(T* A, T const& e, Rank lo, Rank hi) {
    Fib fib(hi - li);
    while (lo < hi) {  //合法区间
        while (hi - lo < fib.get())
            fib.prev();
        //通过向前顺序查找，确定形如 Fib(k)-1 的轴点
        Rank mi = lo + fib.get() - 1;
        //按黄金比例分割，相比二分查找优化一点点
        if (e < A[mi])
            hi = mi;
        else if (e > A[mi])
            lo = mi + 1;
        else
            return mi;
    }
    return -1;
}
```

### 二分查找（稳定版）

无论向左还是向右，每次迭代只有一次关键码比较   
所有分支只有两个分支 `<` 或者 `>=` 
只有当元素数目 `hi-lo=1` 时，才会判断是否命中  
![2020-11-13-11-25-45](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-11-25-45.png)
版本改进

``` cpp
template <typename T>
static Rank binsearch(T* A, T const& e, Rank lo, Rank hi) {
    while (hi - lo > 1) {
        Rank mi = (lo + hi) >> 1;  //经过比较后确定深入
        (A[mi] > e) ? hi = mi : lo = mi;
    }
    return (e == A[lo]) ? lo : -1;
}
```

这种算法整体性能更加稳定，最好情况的效率会下降

### 遵守语义约定的完整版本

都未严格遵守 search() 接口语义约定，返回不大于 e 的最后一个元素 

![2020-11-13-11-34-48](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-11-34-48.png)

版本 c

``` cpp 
template <typename T>
static Rank binsearch(T* A, T const& e, Rank lo, Rank hi) {
    while (hi > lo) {
        Rank mi = (l0 + hi) >> 1;
        (A[mi] > e) ? hi = mi : lo = mi + 1;
    }  //前提是有序向量
    return --lo;
}
```

### 插值查找

原理与算法

![2020-11-13-12-32-20](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-12-32-20.png)

因此，通过猜测轴点 mi, 可以极大的提高收敛速度  
按照总量估计位置，和翻英语字典一样，a 在前面找，z 在后面找  

![2020-11-13-12-36-10](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-12-36-10.png)

最坏情况为$O(n)$, 有时候很快，最好情况$O(1)$
通常优势不明显，易受小扰动的干扰，且须引入乘法，除法（计算成本更高）

### 综合

![2020-11-13-12-43-08](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-12-43-08.png)

实际可行的方法:
首先通过插值查找，将查找范围缩小到一定范围然后再进行二分查找

## 排序

### 稳定性

输入含重复元素时，算法的**稳定性**是更为细致的追求，重复元素在输入，输出时的相对次序，是否保持不变  
输入:`8, 7(a), 7(b), 6,7(c),9`  
输出:`6,7(a), 7(b), 7(c),8,9` // `stable`  
输出:`6,7(b), 7(c), 7(a),8,9` // `unstable`  

在一些算法中有可能对这些有强制追求  

例如:
对于下面的冒泡排序都是稳定的:
因为乱序排列在冒泡排序中必须满足
* 相同的二者相互接近直至相邻
* 在接下来的一轮扫描交换中，二者因为逆序而交换位置
* 如果将 `>` 改为 `>=` 就会乱序

## 冒泡排序

将无序向量转换为有序向量

bubble_sort

每次遍历就会就位一个元素，有序部分逐渐扩展，无序部分逐渐减小

``` cpp
template <typename T>
void vector<T>::bubble_sort(Rank lo, Rakn hi) {
    while (!bubble(lo, hi__);)  //逐趟扫描交换，直至全序
}
```

### 改进:提前终止

任何一对元素都是顺序的，那么就是有序段，所以每一趟扫描交换都记录下来是否存在逆序元素，如果第一次遍历时没有做过交换，那么今后的从头到尾的所有遍历就都不用考察这一部分元素，实际运行时间就可能会大大减少

``` cpp
template <typename T>
bool vector<T>::bubble(Rank lo, Rank hi) {
    bool sorted = true;
    while (++lo < hi) {
        if (_elem[lo - 1] > _elem; lo) {
            sorted = false;  //记录 if 语句曾经成立过
            swap(_elem[lo - 1], _elem[lo]);
        }
    }
    return sorted;  //返回当前区间是否已经有序的标志，作为 while 条件的循环条件
}
```

![2020-11-13-12-50-57](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-12-50-57.png)

### 再改进:提前跳跃

若有序段向量在整个无序段向量的后面，那么效率就和普通排序差不多，所以需要提前找出有序段向量的界限，算法就会更快

![677F7EC91F0CE611E7CD6E0BCC2FA017.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture677F7EC91F0CE611E7CD6E0BCC2FA017.jpg)

那我们如果记录下来遍历后第一次冒泡交换的最后一位元素的位置，我们就可以确定下来后续中有多少元素是已经排序好的，缩小那个 hi 从右边界到
第一次遍历交换最后的元素位置，就不用一步一步收缩范围

``` cpp
template <typename T>
Rank vector<T>::bubble(Rank lo, Rank hi) {
    Rank last = lo;  //最右侧的逆序对初始化为 [lo - 1, lo]
    while (++lo < hi) {
        if (_elem[lo - 1] > _elem[lo]) {
            swap(_elem[lo - 1], _elem[lo]);
            last = lo;  //交换后就更新最右侧逆序对位置
        }
    }
    return last;  //返回右侧的逆序对位置
}  //前一版本的逻辑性标志 sorted, 改为 last 下标
```

并且这种加快算法可能会有多次缩短，使区间多次变小

![2020-11-13-12-56-35](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-12-56-35.png)




## 归并排序

一种更快的向量排序算法，分治策略

冯诺伊曼第一次使用

* 多次的序列一分为二
* 子序列递归排序
* 抵达递归基后 **合并有序子序列**

![2020-11-13-13-23-15](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-13-23-15.png)

``` cpp
template <typename T>
void vector<T>::merge_sort(Rank lo, Rank hi) {
    if (hi - lo < 2)
        return;               //首先处理递归基
    int mi = (lo + hi) >> 1;  //以中点为界
    merge_sort(lo, mi);   //对前半段排序
    merge_sort(mi, hi);  //对后半段排序
    merge(lo, mi, hi);  //实质工作
}
```

### 二路归并实现

![2020-11-13-13-27-52](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-13-27-52.png)

注意力只关注在两个序列的首元素上，每次将两个首元素中更小的那个元素取出排在输出队列中

我们假设 A 为原始向量，B 为第一个子向量，C 为第二个子向量

![2020-11-13-13-38-37](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-13-13-38-37.png)

``` cpp
template <typename T>
void Vector<T>::merge(Rank lo, Rank mi, Rank hi) {  //三个秩传入
    T* A = _elem + lo;       // A 指向空间起始位置
    int length_b = mi - lo;  //前子向量 B 总长度
    T* B = new T[length_b];  //为 B 开辟空间
    for (Rank i = 0; i < length_b; B[i] = A[i++]);
    //前子向量复制原始向量的前半部分
    int length_c = hi - mi;  //后子向量 C 总长度
    T* C = _elem + mi;  // C 指向后半段元素的起始位置，不需要为其增加新空间
    Rank k = 0； 
    while ((j < lb) && (k < lc))  //反复的比较 B C 的首元素
        A[i++] = (B[j] <= C[k]) ? B[j++] : C[k++];  //将更小者归入 A 中
    while (j < lb)                                  //若C先耗尽
        A[i++] = B[j++];  //直接将 B 中残余元素归入 A 中。B提前耗尽呢？
    delete[] B;           // new和delete耗时非常大，如何减少？
}
```

耗尽B或C时，在最右侧添加一个正无穷的哨兵，通过比较后依次放入向量A中，如果B提前耗尽，完全没有必要进行转移元素，因为本来就在那里


最后 `j = lb`  `k = lc`  `j + k = n ` 

> 注意: 待归并子序列不必等长也可以处理，消耗累计长度时间n

时间复杂度 :$o(nlog_n)$

[lighthouse](https://fengwei2002.github.io/posts/2020/11/20/_07-lighthouse.html) 中采用归并排序优化时间复杂度

