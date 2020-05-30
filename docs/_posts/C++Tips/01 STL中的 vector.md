---
title: STL 中的 Vector
date: 2020-05-05
category: C++
tags:
  - STL
--- 

> vector 在C++中常用来代替数组，因为有很多性能很高的操作接口可以调用
<!-- more -->

>[vector reference](http://www.cplusplus.com/reference/vector/vector/)

向量是一个能够存放任意类型的动态数组

使用的时候需要头文件：`#include<vector>`, 一般用来更加方便的解决数组的相关问题

::: tip 作为函数参数的优化
当一个数组传入函数时不能同时得到数组对的个数，而用 vector 定义的数组可以用。size() 的方法得到元素个数，不用给函数多传入一个参数
:::

内部实现是一个动态数组，元素在内存内连续存放，随机存取任何元素都能在常数时间内完成，在尾部增删元素具有较佳性能（大部分是常数时间）,vector 是单口容器，所以在尾端插入和删除元素效率较高，在指定位置插入，势必会引起数据元素移动，效率较低。

动态增长基本原理：空间不足默认重新申请二倍空间，拷贝原空间值，释放原空间，将元素插入到新空间，会根据不同类型选择不同增长策略。（二倍比遇到一次泄露加一次内存快很多，并且内存利用率也还行）

##  vector 赋值函数

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

## vector 二维构造

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

## vector 插入删除

``` cpp
push_back(ele); //尾部插入元素 ele 🍕 
pop_back();//删除最后一个元素 🍕
erase(const_iterator pos);//删除迭代器指向的元素 🍕
insert(iterator it,const T& x) //插入一个元素
insert(const_iterator pos, int count,ele);//迭代器指向位置 pos 插入 count 个元素 ele. 
erase(const_iterator start, const_iterator end);//删除迭代器从 start 到 end 之间的元素 
clear();//删除容器中所有元素
```

一个具体元素的迭代器通过`(myvector.begin()+5)`类似的语法来获取

## vector 数据存取

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

## vector 容量大小

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

## vector 高级用法

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