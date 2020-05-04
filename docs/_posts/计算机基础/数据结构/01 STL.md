---
title: STL 总结
date: 2020-05-04
category: basics
tags:
  - Data Structure
--- 

写 leetcode 的同时总结的一些详细的 C++ STL 用法，不断更新

<!-- more -->

## Tips

* 除了 queue 和 stack 之外，每个容器都提供可返回迭代器的函数，运用返回的迭代器就可以访问元素。
* 通常使用 STL 不会抛出异常，需要使用者传入正确参数。
* 每个容器都提供了一个默认的构造函数和默认的拷贝构造函数。

| 容器使用时机       | vector   | deque    | list     | set    | multiset | map         | mutimap |
| ------------------ | -------- | -------- | -------- | ------ | -------- | ----------- | ------- |
| 对应的典型数据结构 | 单端数组 | 双端数组 | 双向链表 | 二叉树 | 二叉树   | 二叉树      | 二叉树  |
| 可否随机存取       | 可以     | 可以     | 不能     | 不能   | 不能     | 对 key 可以 | 不能    |
| 元素搜寻速度       | 慢       | 慢       | 非常慢   | 快     | 快       | 快          | 快      |
| 插入删除一个元素   | 尾端     | 头尾两端 | 任意位置 | ——     | ——       | ——          | ——      |

1

vector 与 deque 的比较：
1. vector.at() 比 deque.at() 效率高，比如 vector.at(0) 是固定的，deque 的开始位置却是不固定的。

2. 如果有大量释放操作的话，vector 花的时间更少，这跟二者的内部实现有关。deque 支持头部的快速插入与快速移除，这是 deque 的优点。

- vector 的使用场景：比如软件历史操作记录的存储，我们经常要查看历史记录，比如上一次的记录，上上次的记录，但却不会去删除记录，因为记录是事实的描述。
- deque 的使用场景：比如排队购票系统，对排队者的存储可以采用 deque, 支持头端
的快速移除，尾端的快速添加。如果采用 vector, 则头端移除时，会移动大量的数据，速度慢。
- list 的使用场景：比如公交车乘客的存储，随时可能有乘客下车，支持频繁的不确实位置元素的移除插入。
- set 的使用场景：比如对手机游戏的个人得分记录的存储，存储要求从高分到低分的顺序排列。
- map 的使用场景：比如按 ID 号存储十万个用户，想要快速要通过 ID 查找对应的用户。

# 顺序容器

容器并非已经排序的，插入位置与元素的值无关

## vector

使用的时候需要头文件：`#include<vector>`,一般用来更加方便的解决数组的相关问题

::: tip 作为函数参数的优化
当一个数组传入函数时不能同时得到数组对的个数，而用 vector 定义的数组可以用。size() 的方法得到元素个数，不用给函数多传入一个参数
:::

内部实现是一个动态数组，元素在内存内连续存放，随机存取任何元素都能在常数时间内完成，在尾部增删元素具有较佳性能（大部分是常数时间）,vector 是单口容器，所以在尾端插入和删除元素效率较高，在指定位置插入，势必会引起数据元素移动，效率较低。

动态增长基本原理：空间不足默认重新申请二倍空间，拷贝原空间值，释放原空间，将元素插入到新空间，会根据不同类型选择不同增长策略。（二倍比遇到一次泄露加一次内存快很多，并且内存利用率也还行）

###  vector 构造函数

``` cpp
vector<T> v; //采用模板实现类实现，默认构造函数 

vector(v.begin(), v.end()); //将另一个 vector v[begin(), end()) 区间中的元素拷贝给本身。

vector(n, elem);//构造函数将 n 个 elem 拷贝给本身。自身的缩减

vector(const vector &vec);//拷贝构造函数。
```

使用部分值的构造函数，可以将一个数组转为 vector，从而直接的利用 vector 的函数

```cpp
int arr[] = {2,3,4,1,9}; //main函数中常用
vector<int> arr_to_vector(arr, arr + sizeof(arr) / sizeof(int));
```

### vector 赋值

``` cpp
assign(beg, end);//将 [beg, end) 区间中的数据拷贝赋值给本身。 
assign(n, elem);//将 n 个 elem 拷贝赋值给本身。 
vector& operator=(const vector &vec);//重载等号操作符 swap(vec);// 将 vec 与本身的元素互换。
```

第一个赋值函数，可以这么写： 
```cpp
vector<int> vector_test;
int arr[] = { 0, 1, 2, 3, 4 }; 
vector_test.assign(arr, arr + 5);//使用数组初始化 vector和上面那种构造函数作用一样
```

### vector 容量大小

``` cpp
.size();//返回容器中元素的个数 
.capacity();//容器的容量 , 这两个在一些情况下不一样
.empty();//判断容器是否为空 
.resize(int num);//重新指定容器的长度为 num, 若容器变长，则以默认值填充新位置。如果容器变 短，则末尾超出容器长度的元素被删除。 
.resize(int num, elem);//重新指定容器的长度为 num, 若容器变长，则以 elem 值填充新位置。如 果容器变短，则末尾超出容器长度的元素被删除。
.reserve(int len);//容器预留 len 个元素长度的空间，预留位置不初始化，元素不可访问。capacity扩大
```

::: tip 巧用 reserve 增加程序运行效率
当我们知道我们存储的元素大概有多少的时候，我们就可以使用 reserve 方法，来减少 vector 重新申请内存-拷贝数据-释放旧空间的次数，从而减少程序的运行时间
:::

### vector 存取插入删除

vector用at函数来读取对应元素，更加规范

``` cpp
at(int idx); //返回索引 idx 所指的数据，如果 idx 越界，抛出 out_of_range 异常。
operator[];//返回索引 idx 所指的数据，越界时，运行直接报错 
front();//返回容器中第一个数据元素 
back();//返回容器中最后一个数据元素
```

``` cpp
push_back(ele); //尾部插入元素 ele 🍕 
pop_back();//删除最后一个元素 🍕
erase(const_iterator pos);//删除迭代器指向的元素 🍕
insert(const_iterator pos, int count,ele);//迭代器指向位置 pos 插入 count 个元素 ele. 
erase(const_iterator start, const_iterator end);//删除迭代器从 start 到 end 之间的元素 
clear();//删除容器中所有元素
```

## **deque**

头文件<deque>  "double-ended-queue"

> n. 双端队列；双队列

双向队列，元素在内存内连续存放，随机存取任何元素都能在常数时间内完成（但次于 vector), 在两端增删元素具有较佳性能（大部分是常数时间）, vector 是单向开口的连续性空间，deque 则是一种双向开口的连续性空间，所谓双向开口，
意思是可以在头尾两端分别做元素的插入和删除操作，vector 当然也可以在头尾两端进行插入和删除操作，但是头部插入和删除操作效率奇差，无法被接受。

> **deque 和 vector 的最大差异**

* 在于 deque 允许常数时间内对头端进行元素插入和删除操作。
* 在于 deque 没有容量的概念，因为它是动态的以分段的连续空间组合而成，随时可以增加一段新的空间并链接起来，换句话说，像 vector 那样“因旧空间不足而重新分配一块更大的空间，然后再复制元素，释放空间”这样的操作不会发生在 deque 身上，也因此 deque 没有必要提供所谓的空间保留功能。
* 双端插入和删除元素效率较高。
* 指定位置插入也会导致数据元素移动，降低效率。
* 可随机存取，效率高。
> **deque 构造函数**

``` cpp
deque<T> deqT;//默认构造形式 
deque(beg, end);//构造函数将 [beg, end) 区间中的元素拷贝给本身。 
deque(n, elem);//构造函数将 n 个 elem 拷贝给本身。 
deque(const deque &deq);//拷贝构造函数。
```

> **deque 赋值操作**

``` cpp
assign(beg, end);//将 [beg, end) 区间中的数据拷贝赋值给本身。 
assign(n, elem);//将 n 个 elem 拷贝赋值给本身。 
deque& operator=(const deque &deq); //重载等号操作符 
swap(deq);// 将 deq 与本身的元素互换
```

> **deque 大小操作**

``` cpp
deque.size();//返回容器中元素的个数 
deque.empty();//判断容器是否为空 
deque.resize(num);//重新指定容器的长度为 num, 若容器变长，则以默认值填充新位置。如果容器 变短，则末尾超出容器长度的元素被删除。 
deque.resize(num, elem); //重新指定容器的长度为 num, 若容器变长，则以 elem 值填充新位置，如 果容器变短，则末尾超出容器长度的元素被删除。
```

> **deque 双端插入和删除操作**

``` cpp
push_back(elem);//在容器尾部添加一个数据 
push_front(elem);//在容器头部插入一个数据 
pop_back();//删除容器最后一个数据 
pop_front();//删除容器第一个数据
```

> **deque 数据存取**

``` cpp
at(idx);//返回索引 idx 所指的数据，如果 idx 越界，抛出 out_of_range。 operator[];//返回索引 idx 所指的数据，如果 idx 越界，不抛出异常，直接出错。 
front();//返回第一个数据。 
back();//返回最后一个数据
```

> **deque 插入操作**

``` cpp
insert(pos,elem);//在 pos 位置插入一个 elem 元素的拷贝，返回新数据的位置。 
insert(pos,n,elem);//在 pos 位置插入 n 个 elem 数据，无返回值。 insert(pos,beg,end);//在 pos 位置插入 [beg,end) 区间的数据，无返回值。
```

deque 是分段连续的内存空间，通过中控器维持一种连续内存空间的状态，
其实现复杂性要大于 vector queue stack 等容器，其迭代器的实现也更加复杂，在需要对 deque 容器元素进行排序的时候，建议先将 deque 容器中数据数据元素拷贝到 vector 容器中，对 vector 进行排序，然后再将排序完成的数据拷贝回 deque 容器。

> **deque 删除操作**

``` cpp
clear();//移除容器的所有数据 
erase(beg,end);//删除 [beg,end) 区间的数据，返回下一个数据的位置。 
erase(pos);//删除 pos 位置的数据，返回下一个数据的位置。
```

> 使用 sort 函数排序 deque 对象容器

``` cpp
vector<int> v;
bool compare(person& a,person& b){
    return a.score<b.score;
}
sort(v.began(),v.end(),compare);
```

***

## **list 双向链表**

头文件<list>

* 双向链表，元素在空间内不是连续存放的，在任何位置增删元素都能在常数时间内完成，调用元素时要事先知道位置，不支持随机存取
* 采用动态存储分配，不会造成内存浪费和溢出 
* 链表执行插入和删除操作十分方便，修改指针即可，不需要移动大量元素
* 链表灵活，但是空间和时间额外耗费较大

> list 构造函数

``` cpp
list<T> lstT;//list 采用采用模板类实现，对象的默认构造形式： 
list(beg,end);//构造函数将 [beg, end) 区间中的元素拷贝给本身。 
list(n,elem);//构造函数将 n 个 elem 拷贝给本身。 
list(const list &lst);//拷贝构造函数。
```

> **list 数据元素插入和删除操作**

``` cpp
push_back(elem);//在容器尾部加入一个元素 
pop_back();//删除容器中最后一个元素 
push_front(elem);//在容器开头插入一个元素 
pop_front();//从容器开头移除第一个元素 
insert(pos,elem);//在 pos 位置插 elem 元素的拷贝，返回新数据的位置。 
insert(pos,n,elem);//在 pos 位置插入 n 个 elem 数据，无返回值。 
insert(pos,beg,end);//在 pos 位置插入 [beg,end) 区间的数据，无返回值。 
clear();//移除容器的所有数据 
erase(beg,end);//删除 [beg,end) 区间的数据，返回下一个数据的位置。 
erase(pos);//删除 pos 位置的数据，返回下一个数据的位置。 
remove(elem);//删除容器中所有与 elem 值匹配的元素。
```

> **list 空间大小操作**

``` cpp
size();//返回容器中元素的个数 
empty();//判断容器是否为空 
resize(num);//重新指定容器的长度为 num, 若容器变长，则以默认值填充新位置。如果容器变短，则末尾超出容器长度的元素被删除。 
resize(num, elem);//重新指定容器的长度为 num, 若容器变长，则以 elem 值填充新位置。 如果容器变短，则末尾超出容器长度的元素被删除。
```

> **list 赋值操作**

``` cpp
assign(beg, end);//将 [beg, end) 区间中的数据拷贝赋值给本身。 
assign(n, elem);//将 n 个 elem 拷贝赋值给本身。 
list& operator=(const list &lst);//重载等号操作符 
swap(lst);//将 lst 与本身的元素互换。
front();//返回第一个元素。 
back();//返回最后一个元素。
```

> **list** **反转排列，排序**

``` cpp
reverse();//反转链表，比如 lst 包含 1,3,5 元素，运行此方法后，lst 就包含 5,3,1 元素。 
sort(); //list 排序，这个是 list 的成员函数，而不是外部算法，默认从小到大
//如何对对象排序？
list<int> my_list;
bool compare(int v1,int v2){
    return v1>v2;
}
my_list.sort(compare);
//从大到小排对象
```

算法 sort 只支持可以随机访问的容器，list 不支持随机访问。+5+3 是错的，只能++

链表和数组有什么区别？

1. 数组必须事先定义固定的长度（元素个数）, 不能适应数据动态地增减的情况。当数据

增加时，可能超出原先定义的元素个数；当数据减少时，造成内存浪费。

2. 链表动态地进行存储分配，可以适应数据动态地增减的情况，且可以方便地插入、删除

数据元素。（数组中插入、删除数据项时，需要移动其它数据项）

## **顺序容器常用成员函数**

* front: 第一个元素的引用
* back: 最后一个元素的引用
* push_back: 在容器末尾增加新的元素
* pop_back: 删除容器末尾的元素
* earse: 删除迭代器所指向的元素（迭代器可能失效）, 或删除一个区间，返回被删除元素后面的那个元素的迭代器

***

# **关联容器**

* 元素是排序的
* 插入任何元素都按照相应的排序规则来确定其位置
* 在查找时具有较好的性能
* 通常以平衡二叉树方式实现，插入和检索时间都很快

***

## **set/multiset**

头文件<set>

set 即集合，set 中不允许有相同的元素，multiset 中允许存在相同的元素
set 是以 RB-tree（红黑树，平衡二叉树的一种）为底层机制，其查找效率非常好

``` cpp
set<T> st;//set 默认构造函数： 
mulitset<T> mst; //multiset 默认构造
set& operator=(const set &st);//重载等号操作符 
swap(st);//交换两个集合容器
size();//返回容器中元素的数目 
empty();//判断容器是否为空
```

> **set 插入和删除操作**

``` cpp
insert(elem);//在容器中插入元素。 
clear();//清除所有元素 
erase(pos);//删除 pos 迭代器所指的元素，返回下一个元素的迭代器。 
erase(beg, end);//删除区间 [beg,end) 的所有元素 , 返回下一个元素的迭代器。 erase(elem);//删除容器中值为 elem 的元素。
```

> **set 查找操作**

``` cpp
find(key);//查找键 key 是否存在，若存在，返回该键的元素的迭代器；若不存在，返回 map.end(); 
lower_bound(keyElem);//返回第一个 key>=keyElem 元素的迭代器。 
upper_bound(keyElem);//返回第一个 key>keyElem 元素的迭代器。 
equal_range(keyElem);//返回容器中 key 与 keyElem 相等的上下限的两个迭代器。
```

set 从大到小排序

``` cpp
//仿函数
class my_compare{
    public:
    bool operator()(person& v1,person& v2){
        return v1.age >v2.age;
    }
}
set<int,my_compare> s1;//自动进行排序，默认从小到大，
//多传入一个伪函数参数修改为从大到小排序
s1.insert(p1);
s1.insert(p2);
s1.insert(p3);
//这样 find 时候也是按照 age 进行 find 的，不理对象中的另一个成员 id 了
```

## 对组

``` cpp
void test01(){
    构造方法
    pair<string,int> pair1;
    cout<<pair1.first<<" "<<pair.second<<endl;

    pair<string,int> pair2 = make_pair("aa",10);

    pair<string,int> pair3 = pair2;
}
```

## **map/multimap**

头文件<map>

map 中存放的元素有且仅有两个成员变量 (key, vaalue) map 根据 key 的值对元素进行从小到大的排序，并可以快速的根据 key 来检索元素，multimap 里面允许有相同 first 值的元素
map 也是以红黑树为底层实现机制。

> map 构造函数

``` cpp
map<T1, T2> mapTT;//map 默认构造函数：
//要传入两种模板参数 key value
map(const map &mp);//拷贝构造函数
```

> map 赋值，大小操作

``` cpp
map& operator=(const map &mp);//重载等号操作符 
swap(mp);//交换两个集合容器
empty();//判断容器是否为空
size();//返回容器中元素的数目
```

> map 插入数据元素操作

``` cpp
map<int,int> mymap;
mymap.insert(pair<int,int>(10,10));
mymap.insert(make_pair(20,20));
mymap.insert(map<int,int>::value_type(30,30));

mymap[40] = 40;
//如果 key 不存在，创建一个 pair 插入到 map 容器中 如果 key 存在，则修改 value 的值 
//如果去访问一个不存在的 key 则将 key 插入，value 为默认值
//打印
for(map<int,int>::iterator it mymap.began();it!=mymap.end();it++){
    //*it 取出来的是一个 pair
    cout<< it->first << (*it).second << endl;
}
map.insert(...); 
//往容器插入元素，返回 pair<iterator,bool> 
map<int, string> mapStu; // 第一种 通过 pair 的方式插入对象 
mapStu.insert(pair<int, string>(3, "小张")); // 第二种 通过 pair 的方式插入对象 
mapStu.inset(make_pair(-1, "校长")); // 第三种 通过 value_type 的方式插入对象 
mapStu.insert(map<int, string>::value_type(1, "小李")); // 第四种 通过数组的方式插入值 
mapStu[3] = "小刘"; 
mapStu[5] = "小王";
```

> **key 为对象时：**

``` cpp
struct my_compare{
    bool operator()(my_key key1,my_key key2){
        return key1.index>key2.index;
    }
}
map<my_key,int,my_compare> mymap;//三个排序，指定排序规则
mymap.insert(make_pair(my_key(1,2),10);
for (map<my_key,int,my_compare>::iterator it,it != end; it++){
    cout<<it->first.index<<it->second;
}
```

> **map 删除操作**

``` cpp
clear();//删除所有元素 
erase(pos);//删除 pos 迭代器所指的元素，返回下一个元素的迭代器。 
erase(beg,end);//删除区间 [beg,end) 的所有元素 , 返回下一个元素的迭代器。 
erase(keyElem);//删除容器中 key 为 keyElem 的对组。
```

> **map 查找操作**

``` cpp
find(key);//查找键 key 是否存在，若存在，返回该键的元素的迭代器；/若不存在，返回 map.end(); 
count(keyElem);//返回容器中 key 为 keyElem 的对组个数。对 map 来说，要么是 0, 要么是 1。对 multimap 来说，值可能大于 1。 

lower_bound(keyElem);//返回第一个 key<=keyElem 元素的迭代器。 
upper_bound(keyElem);//返回第一个 key>keyElem 元素的迭代器。 
equal_range(keyElem);//返回容器中 key 与 keyElem 相等的上下限的两个迭代器，返回 pair 类型

pair<map<int,int>::iterator,map<int,int>::iterator> ret = mymap.equal_range(2);
cout<<ret.first->second;
```

***

# **容器适配器**

## **stack**

头文件<stack>  

栈，检索和修改的项只能是最近插入栈顶的项，它只有一个出口，stack 只
允许在栈顶新增元素，移除元素，获得顶端元素，但是除了顶端之外，其他地方不允许存取
元素，只有栈顶元素可以被外界使用，也就是说 stack 不具有遍历行为，没有迭代器。

栈不能遍历，不支持随机存取，只能通过 top 从栈顶获取和删除元素。
> **stack 常用 API**Application Program Interface

``` cpp
stack<T> stkT;//stack 采用模板类实现，stack 对象的默认构造形式：
stack(const stack &stk);//拷贝构造函数
stack& operator=(const stack &stk);//重载等号操作符

push(elem);//向栈顶添加元素 
pop();//从栈顶移除第一个元素 
top();//返回栈顶元素

empty();//判断堆栈是否为空 
size();//返回堆栈的大小
```

## **queue**

头文件<queue>

队列，插入只可以从尾部进行，检索和修改只允许从头部进行，先进先出

``` cpp
queue<T> queT;//queue 采用模板类实现，queue 对象的默认构造形式： 
queue(const queue &que);//拷贝构造函数

push(elem);//往队尾添加元素 
pop();//从队头移除第一个元素 
back();//返回最后一个元素 
front();//返回第一个元素

queue& operator=(const queue &que);//重载等号操作符

empty();//判断队列是否为空
size();//返回队列的大小
```

## **priority_queue**

头文件<queue>

优先级队列，最高优先级元素总是第一个出列

## **顺序容器和关联容器共有的成员函数**

* begin 返回第一个元素的迭代器
* rbegin 返回最后一个元素的迭代器
* end 最后一个元素后面的位置
* rend 第一个元素前面的位置
* erase 从容器中删除一个或几个元素
* clear 从容器中删除所有元素

# **迭代器**

* 用于指向顺序容器和关联容器中的元素
* 用法和指针类似
* 有 const 和非 const 两种
* 通过迭代器可以读取他所指向的元素
* 通过非 const 迭代器还能修改其指向的元素

迭代器实际上是一个类，这个类封装一个指针  

定义一个容器类迭代器的方法可以是
(for 循环遍历时常用）

``` cpp
(set<person,my_compare>::iterator it=sp.began();it!=sp.end();it++)
(*it)
```

`容器类名：:iterator 变量名` 

> n. 迭代器；迭代程序

或
`容器类名：:const_iterator 变量名` 

访问一个迭代器所指向的元素，`*迭代器变量名` 
