---
title: Vector
date: 2020-05-05
category: basics
tags:
  - Data Structure
--- 

std::vector 的使用和内部实现
<!-- more -->
## STL 中的 vector

>[vector reference](http://www.cplusplus.com/reference/vector/vector/)

向量是一个能够存放任意类型的动态数组

使用的时候需要头文件：`#include<vector>`, 一般用来更加方便的解决数组的相关问题

::: tip 作为函数参数的优化
当一个数组传入函数时不能同时得到数组对的个数，而用 vector 定义的数组可以用。size() 的方法得到元素个数，不用给函数多传入一个参数
:::

内部实现是一个动态数组，元素在内存内连续存放，随机存取任何元素都能在常数时间内完成，在尾部增删元素具有较佳性能（大部分是常数时间）,vector 是单口容器，所以在尾端插入和删除元素效率较高，在指定位置插入，势必会引起数据元素移动，效率较低。

动态增长基本原理：空间不足默认重新申请二倍空间，拷贝原空间值，释放原空间，将元素插入到新空间，会根据不同类型选择不同增长策略。（二倍比遇到一次泄露加一次内存快很多，并且内存利用率也还行）

###  vector 赋值函数

``` cpp
vector<int> a;                       //声明一个int型向量a
vector<int> a(10);                   //声明一个初始大小为10的向量
vector<int> a(10, 1);                //声明一个初始大小为10且初始值都为1的向量
vector<int> b(a);                    //声明并用向量a初始化向量b
vector<int> b(a.begin(), a.begin()+3);//将a向量中从第0个到第2个(共3个)作为向量b的初始值

vector(v.begin(), v.end()); //将另一个 vector v[begin(), end()) 区间中的元素拷贝给本身。
vector(n, elem);            //构造函数将 n 个 elem 拷贝给本身。自身的缩减
vector(const vector &vec);  //拷贝构造函数。

.swap(vector&)                  //: 交换两个同类型向量的数据
assign(beg, end);               //将 [beg, end) 区间中的数据拷贝赋值给本身。 
assign(n, elem);                //将 n 个 elem 拷贝赋值给本身。 
vector& operator=(const vector &vec);//重载等号操作符 swap(vec);// 将 vec 与本身的元素互换。
```

使用部分值的构造函数，可以将一个数组转为 vector，从而直接的利用 vector 中的成员函数

```cpp
int n[] = {2,3,4,1,9}; //main 函数中常用
vector<int> a(n, n+5);       //将数组n的前5个元素作为向量a的初值
vector<int> a(&n[1], &n[4]); //将n[1] - n[4]范围内的元素作为向量a的初值
vector<int> arr_to_vector(n, n + sizeof(n) / sizeof(int));//数组的全部转为vector
```

也可以这么写来达到数组转 vector 的目的

```cpp
vector<int> vector_test;
int arr[] = { 0, 1, 2, 3, 4 }; 
vector_test.assign(arr, arr + 5);//使用数组初始化 vector 和上面那种构造函数作用一样
```

### vector 二维构造

有时需要一个二维的向量，而不是使用二维数组，因为向量使用更加方便

直接开辟空间：

```cpp
vector<vector<char> >vec(n,vector<char>(m,'#'));//n*m二维向量
vector<vector<int>> v(3, vector<int>(4,1));//3*4全为1的二维向量
```

使用 `resize` 方法：

```cpp
int main()
{
    vector<vector<int>> arr;  //这里也可以直接定义向量的尺寸
    //初始化
    int n;
    int m;
    cout << "请输入数组的行数和列数：";
    cin >> n >> m;
    //下面是给向量分配存储空间
    arr.resize(n);
    for (int i = 0; i < n; i++)
    {
        arr[i].resize(m);
    }
    //存入元素
    cout << "请输入数组元素：" << endl;
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            cin >> arr.at(n).at(m); 
        }
    }
    return 0;
}
```

### vector 插入删除

``` cpp
push_back(ele); //尾部插入元素 ele 🍕 
pop_back();//删除最后一个元素 🍕
erase(const_iterator pos);//删除迭代器指向的元素 🍕
insert(iterator it,const T& x) //插入一个元素
insert(const_iterator pos, int count,ele);//迭代器指向位置 pos 插入 count 个元素 ele. 
erase(const_iterator start, const_iterator end);//删除迭代器从 start 到 end 之间的元素 
clear();//删除容器中所有元素
```

### vector 数据存取

vector 用 at 函数来读取对应元素，更加规范

可以用迭代器来指向末元素的后一个空位置并进行插入操作

```cpp
vector<int>::iterator it = result.end();
result.insert(it, nums.at(i), nums.at(i));
```

``` cpp
.at(int idx); //返回索引 idx 所指的数据，如果 idx 越界，抛出 out_of_range 异常。
operator[];//返回索引 idx 所指的数据，越界时，运行直接报错 
.front();//返回容器中首元素的引用，可以放在左边
.back();//返回容器中最后元素的引用，而不是迭代器
```
迭代器和指针：

```cpp
.data()//返回一个指向向量头的指针，++后该值指向第二个元素
.began()//返回指向向量中第一个元素的迭代器。
.end(); //返回一个指向最后一个元素后一个元素的迭代器

.rbegin()//将 vector 反转后的开始指针返回（其实就是原来的 end-1)
.rend()//将 vector 反转构的结束指针返回（其实就是原来的 begin-1)
.cend();//返回一个指向最后一个元素后一个元素的的 const_iterator。
.crend();//const_iterator
.cbegin();
.crbegin();
```

获得一个 vector 元素的迭代器来使用 insert 成员函数

begin 获得的是引用

### vector 容量大小

``` cpp
.size();//返回容器中元素的个数 
.capacity();//返回向量可以容纳的最大元素数。
.empty();//判断容器是否为空 
.resize(int num);//重新指定容器的长度为 num, 若容器变长，则以默认值填充新位置。如果容器变 短，则末尾超出容器长度的元素被删除。配合 shrink 使用！
.resize(int num, elem);//重新指定容器的长度为 num, 若容器变长，则以 elem 值填充新位置。如 果容器变短，则末尾超出容器长度的元素被删除。
.reserve(int len);//容器预留 len 个元素长度的空间，预留位置不初始化，元素不可访问。capacity 扩大
```

```cpp
// comparing size, capacity and max_size
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> myvector;

  // set some content in the vector:
  for (int i=0; i<100; i++) myvector.push_back(i);

  std::cout << "size: " << myvector.size() << "\n";
  std::cout << "capacity: " << myvector.capacity() << "\n";
  std::cout << "max_size: " << myvector.max_size() << "\n";
  return 0;
}
```
::: tip 巧用 reserve 增加程序运行效率
当我们知道我们存储的元素大概有多少的时候，我们就可以使用 reserve 方法，来减少 vector 重新申请内存-拷贝数据-释放旧空间的次数，从而减少程序的运行时间
:::

### vector 高级用法

::: details `std::vector::shrink_to_fit`

适用于重新规定向量大小后回收剩余空间，最大程度优化空间利用率

```cpp
// vector::shrink_to_fit
#include <iostream>
#include <vector>
int main ()
{
  std::vector<int> myvector (100);
  std::cout << "1. capacity of myvector: " << myvector.capacity() << '\n';
  myvector.resize(10);
  std::cout << "2. capacity of myvector: " << myvector.capacity() << '\n';
  myvector.shrink_to_fit();
  std::cout << "3. capacity of myvector: " << myvector.capacity() << '\n';
  return 0;
}
```
:::

::: details `get_allocator()`

适用于为向量的开辟空间的一种简便方法

```cpp
// vector::get_allocator
#include <iostream>
#include <vector>
int main ()
{
  std::vector<int> myvector;
  int * p;
  unsigned int i;
  // 开辟具有五个元素空间的 vector
  p = myvector.get_allocator().allocate(5);
  // 在数组中添加对应的值，类似 scanf 的用法
  for (i=0; i<5; i++) myvector.get_allocator().construct(&p[i],i);
  std::cout << "The allocated array contains:";
  for (i=0; i<5; i++) std::cout << ' ' << p[i];
  std::cout << '\n';
  // 删除对应的空间
  for (i=0; i<5; i++) myvector.get_allocator().destroy(&p[i]);
  myvector.get_allocator().deallocate(p,5);
  return 0;
}
```
:::

::: details `std::vector::emplace` & `std::vector::emplace_back`

插入单个元素的高级使用，返回插入后位置对的迭代器

```cpp
// vector::emplace
#include <iostream>
#include <vector>

int main ()
{
  std::vector<int> myvector = {10,20,30};
  auto it = myvector.emplace ( myvector.begin()+1, 100 );
  //auto 类型的指针
  myvector.emplace ( it, 200 );
  myvector.emplace ( myvector.end(), 300 );
  std::cout << "myvector contains:";
  for (auto& x: myvector)
    std::cout << ' ' << x;
  std::cout << '\n';
  return 0;
}
```

`myvector contains: 10 200 100 20 30 300`
:::

***

## （a）接口与实现

> RAM 模型

用户--->汽车，使用说明书，就是数据结构的设计者和使用者的沟通合作方式<---制造者

### 从数组到向量

c/c++中元素与编号一一对应，所以得到编号就能直接访问 (lineer array)

向量是数组的抽象和泛化

迭代器访问
不限于基本类型，
参与复杂的算法
有很多接口对于向量内的元素的操作（向量的 ADT 接口）

### ADT 操作实例

``` cpp
空向量初始化（从左向右）
insert(0,9)
insert(0,4)
insert(1,5)   //4 5 9
put(1,2)      //修改 4,2,9
get(2)        // 9
remove(2)     //删除下标为 2 且返回那个值
size()
disordered()  //不是 0 就是无序向量
find(5)       //返回-1 表示查找失败
sort()        //排序
search()      //返回下标或者-1, 或者前一个，
```

逻辑上和物理上都符合常理要求

### vector 模板类的详细实现

``` cpp
定义秩
默认初始容量
开始定义模板类
template<typename T>class vector {
    private: Rank size;int  _capaccity; T* _elem
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

## （b）可扩充向量

分配空间（实际空间是那个的两倍）
有效规模初始化

空间自适应  
所以应该采取一些聪明的策略  
开辟一段连续的内存空间  
采用一段连续空间可能出现上溢和下溢 (underflow), 元素寥寥无几，利用率极低  
一般应用环境不能准确预测空间需求量  

### 动态空间管理

蝉的哲学，在即将发生上溢时，适当扩大内部空间容量，动态申请一个更大的外壳  
再将东西 copy 过来，释放原来的空间，将新空间供用户调用  

``` cpp
template<typename T>
void Vector<T>::expand{//向量空间不足时扩容
    if(_size<_capcity)return;//尚未满员时，不必扩容
    _capcity=max(_capcity,DEFAULT_CAPCITY);//不低于最小容量
    T* oldElem = _elem;_elem = new T[_capcity<<=1]//容量加倍
    for(int i=0;i<_size;i++){//复制原向量内容
        _elem[i]=oldElem[i];
    }
    delete [] oldElem;//释放原空间
}
```

得益于向量的分装，尽管扩容之后数据地址已经改变，却不出现野指针  

### 那为何要加倍空间呢？

递增式扩容  
追加固定大小的容量  
最坏情况，就是每经过固定次数次后就需要开始扩容一次  
//算数级数  
总体耗时为$O(n^2)$, 每次扩容需要$O(n)$的时间  

容量加倍策略

最坏情况，在初始量为一的满向量中连续插入  
//几何级数  
总体耗时为$O(n)$, 每次扩容的分摊成本为$O(1)$  
, 使用空间的牺牲，换取了时间上的巨大收益  

### 平均分析和分摊分析

![34D26A3AC10EA77D875667FD5EE4CB26.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture34D26A3AC10EA77D875667FD5EE4CB26.jpg)

## （c）无序向量

`template<typename T>class vector{}`   
这种以模板定义的方式就可以使数据结构更加方便的被利用   

### 循秩访问  

使用 `V.get(r),V.put(r,e)` 并不是很方便   
所以要重载 `[ ]` 这样就可以便捷的使用访问数组的方式来访问向量中的元素  

``` cpp
template<typename T>
T & vector<T>::operator[](Rank r)const{
    return _elme[r];
}
```

此后对外的 `V[r]` 即对应于内部的 `V._elme[r]` 
返回值是引用可以做左值或者右值   

### 插入算法 right shift 操作

``` cpp
template <typename T>
Rank Vector<T>::insert(Rank r,T const &e){//0(n-r)
    expand();//maybefull, 若有需要则扩容，向量可能已经满载
    for(int i=_size;i>r;i--){//自后向前
        _elme[i] = _elme[i-1];//后继元素顺次后移一个单元
        _elme[r] = e;//置入新元素
        _size++;//右移完成后，同时更新容量
        return r;//返回秩
    }
}
```

### 删除算法

区间删除

``` cpp
template<typename T>//删除区间 [lo,hi]0<=lo<=hi<=size
int vector<T>::remove(Rank lo,Rank hi){//0(n-hi)
    if(lo==hi) return 0;//出于效率考虑，单独处理退化情况
    while (hi< _size) _elem[lo++]=_elem[hi++];//[hi,_size] 顺次前移 hi-lo 位，平移一段空间
    _size=lo; shrink();//更新规模，若有必要则缩容
    return hi-lo;//返回被删除元素的数目
}
```

单元素删除

可以视作区间操作的特例 [r]=[r, r+1], 所有后缀向前移动  
数据结构更加关注效率，所以不将区间视为单元素的特例而将单元素视为区间的特例

``` cpp
template<typename T>//删除向量中秩为 r 的元素，0<=r<size；
T <vector>::remove(Rank r){//0(n-r)
    T e=_elem[r];//备份被删除的元素
    remove(r,r+1);//调用删除区间的算法
    return e;//返回被删除的元素
}
```

### 查找操作

无序向量需要判等，重载==和！=  
有序向量比较  
逆向扫描  

``` cpp
template<typename T>
Rank Vector<T>::find(T const &e,Rank lo,Rank hi)const{
    //在命中多个元素时可返回秩最大者
    while((lo<hi--)&&e!=_elem[hi]);//逆向查找
    return hi;//hi<lo 意味着失败；否则 hi 即命中元素的秩
}
```

### 唯一化算法

网络搜索环境中会用到这种去重工作  

``` cpp
template <typename T>//删除重复元素，返回被删除元素数目
int vector<T>::deduplicate(){//繁琐版+错误版
    int oldsize = _size;//记录原规模
    Rank i=1;//从_elem[1] 开始
    while (i<size){//自前向后逐一考察各个元素_elem[i]
        (find (_elem[i],0,i)<0)?
         i++//若无雷同则继续向后考查
        : remove(i);//否则删除雷同者
    }
    return oldSize - _size;//向量规模变化量，即删除元素总数
}
```

正确性严格证明

不变性：当前元素 v[i] 的前缀 v[0, i), 各元素彼此互异  
单调性：

find() 和 remove() 累计耗费线性时间，故总体复杂度为$O(n^2)$  
可进一步优化：  

* 依照 uniquify() 高效版的思路，元素移动次数可降为 O(n), 但比较次数依然是$O(n^2)$, 而且稳定性将被破坏
* v.sort().uniquify(): 实现最优$O(log_n)$

### 遍历算法 

统一分别实施 visit 操作  
利用函数指针机制，只读或局部性修改

``` cpp
template<typename T>
void Vectorr<T>::traverse(void (*visit)(T&)){
    for(int i=0;i<_size;i++){
        visit(_elem[i]);
    }
}
```

利用函数对象机制，可全局性修改  

``` cpp
template<typename T>
template<typename VISIT>
void Vector<T>::traverse(VISIT& vist){
    for(int i =0;i<_size;i++){
        visit(_elem[i]);
    }
}

后一种方法的通用性更强

遍历实例

比如，为统一将向量中所有元素分别加一，
* 实现一个可使单个 T 类型元素加一的类

```cpp
template<typename T>
struct Increase{
    virtual void operator()(T& e){
        e++;
    }
}
template<typename T>
void Increase(Vector<T>& v){
    V.traverse(Increase<T>());
}
```

练习：减一，加倍，求和等遍历功能

## （d1）有序向量：唯一化

要实现比较操作  
任何一堆相邻元素都顺序  
因此，相邻逆序对数，可用以度量向量的逆序程度

``` cpp
for(int i=1;i<size;i++){
    n+=(_elem[i-1] >_elem[i]);
}
 return n;//当且仅当 n=0；
```

无序向量转换为有序向量后许多算法就可以进行大幅度的提升

### 唯一化（低效版）

低效算法唯一性，每一区间都保留单个元素即可

``` cpp
template<typename T> int vector<T>::uniquify(){
    int oldsize = _size;int i = 0;
    while(i<_size-1)
    (_elem[i]==_elem[i+1])?remove(i+1):i++;
    //若相同则删除后者，否则转移至后一个元素
    return oldsize -_size;
}
```

其复杂度：  
因为要调用 remove 操作，最坏情况每次都要调用 remove 操作$O(n^2)$  
和无序向量复杂度一样，所以不推荐

### 唯一化（高效版）

同一元素可作为被删除元素的后继多次前移，尝试将区间一次删除  
一直遍历找到与 i 不同的元素 j, 然后将 j 移动到紧邻 i 的右侧那个位置，无形中将重复元素忽略

``` cpp
template <typename T> int vector<T>::uniquify(){
    Rank i=0,j=0;//各对互异相邻元素的秩
    while(++j<_size>)//逐一扫描，直至末元素
    //跳过雷同者；发现不同元素时，向前移至紧邻前者右侧
    if(_elem[i]!=_elem[j]) _elem[++i]=_elem[j];
    _size = ++i;shrink();//截取尾部多余元素
    return j-i;//向量规模变化量，被删除元素总数
}//注意：通过 remove(lo,hi) 批量删除，依然不能达到高效率
```

复杂度为$O(n)$只有一次比对操作

## （d2）有序向量：多种查找算法

统一接口

``` cpp
template <typename T>//查找算法统一接口，0<=lo<hi<=_size
Rank vector<T>::search(T const &e,Rank lo,Rank hi) const{
    return (rand()%2)?//按照各 50%的概率随机选用 0 1
    binsearch(_elem,e,lo,hi)://二分查找算法
    fibsearch(_elem,e,lo,hi);//finbonacci 查找算法
}
```

如何处理特殊情况也需要细致约定 

* V.insert(1+V.search(e), e), 保持了有序性和数值区间的稳定性
* search 算法返回值是不大于目标的最后一个元素，秩
* 若 `负无穷<e<V[lo]` 则返回 lo-1
* 若 `V[hi-1]<e<正无穷` 则返回，hi-1

原理：用轴点将区间分为三个部分  
小于转向左侧区间，大于转向右侧区间，等于 median 则直接返回；  
不断的缩减问题的规模  

版本 A 实现

``` cpp
template<typename T>//在有序向量区间 [lo,hi) 内查找元素
static Rank binsearch(T* A,T const& e,Rank lo,Rank hi){
    while(lo<hi){//每步迭代可能要做两次比较判断，有三个分支
        Rank mi =(lo+hi)>>1;//以中点为轴点
        if (e<A[mi]) hi=mi; //深入前半段继续查找，右移一位等于除以 2
        else if (A[mi]<e) lo = mi +1;//深入后半段
        else return mi;//在 mi 处命中
    })
    return -1; //查找失败
}
```

`S.search(8,0,7);` 复杂度为$O(log_n)$    
大大优于顺序查找  

### fibsearch（待修改补充）

binsearch 比较次数不等，递归深度相等，左侧成本更低  
算法实现

``` cpp
template<typename T>
static Rank fibsearch(T* A,T const &e,Rank lo,Rank hi){
    Fib fib(hi-li);
    while(lo<hi){//合法区间
        while(hi-lo<fib.get()) fib.prev();
//通过向前顺序查找，确定形如 Fib(k)-1 的轴点
        Rank mi = lo +fib.get()-1;
        //按黄金比例分割，相比二分查找优化一点点
        if (e<A[mi]) hi=mi;
        else if(e>A[mi]) lo = mi +1;
        else  return mi;
    }
    return -1;
}
```

### 二分查找（稳定版）

无论向左还是向右，每次迭代只有一次关键码比较   
所有分支只有两个分支 `<` 或者 `>=` 
只有当元素数目 `hi-lo=1` 时，才会判断是否命中  
版本 B

``` cpp
template<typename T> static Rank binsearch(T* A,T const& e,Rank lo,Rank hi){
    while (hi-lo>1){
        Rank mi = (lo+hi)>>1;//经过比较后确定深入
        (A[mi]>e)?hi=mi:lo=mi;
    }
    return (e==A[lo])?lo:-1;
}
```

这种算法整体性能更加稳定 

### 遵守语义约定的完整版本

都未严格遵守 search() 接口语义约定，返回不大于 e 的最后一个元素  
版本 c

``` cpp
template<typename T>static Rank binsearch(T* A,T const& e,Rank lo,Rank hi){
    while(hi>lo){ 
        Rank mi=(l0+hi)>>1;
        (A[mi]>e)? hi=mi: lo=mi+1; 
    }//前提是有序向量
    return --lo;
}
```

正确与否？:  严格遵守 [0, lo)<=e<[hi, n]

### 有序向量的插值查找

原理与算法

（插值估算）
假设：已知有序向量中各个元素随机分布的规律  
比如：均匀且独立的分布 , 发现元素大体按照线性增长  
所以有

因此，通过猜测轴点 mi, 可以极大的提高收敛速度  
按照总量估计位置，和翻英语字典一样，a 在前面找，z 在后面找  

最坏情况为$O(n)$, 有时候很快，最好情况$O(1)$
平均而言：每经过一次比较，n 缩减至  $\sqrt[2]{n}$
通常优势不明显，易受小扰动的干扰，且须引入乘法，除法

### 综合

实际可行的方法：
首先通过插值查找，将查找范围缩小到一定范围然后再进行二分查找

## （d3）冒泡排序

将无序向量转换为有序向量

bubble_sort

每次遍历就会就位一个元素，有序部分逐渐扩展

``` cpp
template <typename T> void vector<T>::bubble_sort(Rank lo,Rakn hi){
    while (!bubble(lo,hi__);)//逐趟扫描交换，直至全序
}
```

任何一对元素都是顺序的，那么就是有序段，所以每一趟扫描交换都记录下来是否存在逆序元素，如果第一次遍历时没有做过交换，那么今后的从头到尾的所有遍历就都不用 考察这一部分元素，实际运行时间就可能会大大减少

### 改进

``` cpp
template <typename T> bool vector<T>::bubble(Rank lo,Rank hi){
    bool sorted = true;
    while (++lo < hi){
        if (_elem[lo-1]>_elem;lo){
            sorted = false;//记录 if 语句曾经成立过
            swap(_elem[lo-1],_elem[lo]);
        }
    }
    return sorted;//返回当前区间是否已经有序的标志，作为 while 条件的循环条件
}
```

![73D855517EB452D30E580DC71C1D97A3.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture73D855517EB452D30E580DC71C1D97A3.jpg)

### 再改进

若有序段向量在整个向量的后面，那么效率就和普通差不多，所以需要提前找出有序段向量，就会更加快

那我们如果记录下来遍历后第一次冒泡交换的最后一位元素的位置，我们就可以确定下来后续中有多少元素是已经排序好的，缩小那个 hi 从右边界到
第一次遍历交换最后的元素位置，就不用一步一步收缩范围

``` cpp
template <typename T> Rank vector<T>::bubble(Rank lo,Rank hi){
    Rank last = lo;//最右侧的逆序对初始化为 [lo - 1, lo]
    while (++lo < hi ){
        if(_elem[lo-1]>_elem[lo]){
            swap(_elem[lo-1],_elem[lo]);
            last=lo;//交换后就更新最右侧逆序对位置
        }
    }
    return last;//返回右侧的逆序对位置
}//前一版本的逻辑性标志 sorted, 改为秩 last
```

![677F7EC91F0CE611E7CD6E0BCC2FA017.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture677F7EC91F0CE611E7CD6E0BCC2FA017.jpg)

并且这种加快算法可能会有多次缩短，使区间多次变小

### 综合评价

上面几种冒泡排序最好情况和最坏情况都和基础版本相同，全是对一般情况的优化  
输入含重复元素时，算法的**稳定性**是更为细致的追求，重复元素在输入，输出时的相对次序，是否保持不变  
输入：8, 7(a), 7(b), 6,7(c),9  
输出：6,7(a), 7(b), 7(c),8,9 // stable  
输出：6,7(b), 7(c), 7(a),8,9 // unstable  

在一些算法中有可能对这些有强制追求  
以上的冒泡排序都是稳定的：
因为乱序排列在冒泡排序中必须满足

* 相同的二者相互接近直至相邻
* 在接下来的一轮扫描交换中，二者因为逆序而交换位置

如果将 `>` 改为 `>=` 就会乱序

## （d4）归并排序

一种更快的向量排序算法，分治策略

冯诺伊曼第一次使用

* 多次的序列一分为二
* 子序列递归排序
* 抵达递归基后 **合并有序子序列**

``` cpp
template <typename T>
void vector<T>::merge_sort(Rank lo,Rank hi){
    if(hi - lo < 2) return ; //首先处理递归基
    int mi = (lo + hi)>>1;//以中点为界
    merge_sort(lo,mi);
    merge_sort(mi,hi);
    merge(lo,mi,hi);//实质工作
}
```

### 二路归并原理：
![A694737ABA974F081B1E00390E7180A7.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureA694737ABA974F081B1E00390E7180A7.jpg)

注意力只关注在两个序列的首元素上，每次将两个首元素中更小的那个元素取出排在输出队列中

我们假设 A 为原始向量，B 为第一个子向量，C 为第二个子向量

``` cpp
template <typename T>
void Vector<T>::merge(Rank lo, Rank mi, Rank hi){//三个秩传入
    T *A = _elem + lo;//A 指向空间起始位置
    int length_b = mi - lo;//前子向量 B 总长度
    T *B = new T[length_b]; //为 B 开辟空间
    for (Rank i = 0; i < length_b; B[i] = A[i++]);//前子向量复制原始向量的前半部分
    int length_c = hi - mi; //后子向量 C 总长度
    T *C = _elem + mi; //C 指向后半段元素的起始位置，不需要为其增加新空间
    for (Rank i = 0, j = 0, k = 0; (j < lb) || (k < lc);){//B[j] 和 C[k] 中小者转至 A[i++]
    //i,j,k, 初始化为 0,j 和 k 同时越界时退出循环
        if ((j < length_b) && (length_c <= k || (B[j] <= C[k]))) A[i++] = B[j++];
    //j < length_b 首元素的秩没有越过边界，确定 B[j] 仍然是一个有效值 ,
    //c[k] 已无或者 c[k] 大时，将 B[j] 放入 A 中 并且当||不满足时短路机制可以防止错误
        if ((k < length_c) && (length_b <= j || (C[k] < B[j])))  A[i++] = C[k++];
    // k < length_c 确定 c 还是有效值，b[j] 已无或者比 c[k] 大时，往 A[i] 里面放 c 元素
    }
    delete[] B;
}
```

### 精简实现

//交换循环体内两句的次序，删除无用逻辑

``` cpp
for (Rank i = 0, j = 0, k = 0; (j < lb) || (k < lc);){
    if ((k < length_c) && (C[k] < B[j]))  A[i++] = C[k++];
//if ((j < length_b) && (length_c <= k || (B[j] <= C[k]))) A[i++] = B[j++];
    if (length_c <= k || (B[j] <= C[k])) A[i++] = B[j++];
//if ((j < length_b) && (length_c <= k || (B[j] <= C[k]))) A[i++] = B[j++];
}
```

最后 `j = lb`  `k = lc`  `j + k = n ` 

>> 注意： 待归并子序列不必等长
