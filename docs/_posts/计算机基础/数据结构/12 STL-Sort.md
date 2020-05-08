---
title: STL 中 sort 的使用
date: 2020-05-08
category: basics
tags:
  - Data Structure
--- 

STL 中各种 sort 函数的详细使用方法以及示例

<!-- more -->

## STL 中的 sort

[官网 sort 文档](http://www.cplusplus.com/reference/algorithm/sort/)

使用 c++经常会有对容器各种小功能的需求，不重复造轮子。
所以总结一下 stl 中的 sort 函数的各种用法

| 函数名            | 功能描述                                                        |
| ----------------- | --------------------------------------------------------------- |
| sort              | 对给定区间所有元素进行排序 但是不保证等效元素保持其原始相对顺序 |
| stable_sort       | 对给定区间所有元素进行稳定排序 ，保证原始相对顺序               |
| partial_sort      | 对给定区间所有元素的选定部分进行排序                            |
| partial_sort_copy | 对给定区间排序并复制                                            |
| nth_element       | 找出给定区间的某个位置对应的元素                                |
| is_sorted         | 判断一个区间是否已经排好序                                      |
| partition         | 使得符合某个条件的元素放在前面                                  |
| stable_partition  | 相对稳定的使得符合某个条件的元素放在前面                        |

其中 nth_element ，这个函数是用来找出第几个。例如：找出包含 7 个元素的数组中排在中间那个数的值，此时，我可能不关心前面，也不关心后面，我只关心排在第四位的元素值是多少。

### 自定义比较函数

一般用默认的 sort 或者传入一个自定义函数作为第三个参数

```cpp
// sort algorithm example
#include <iostream>     // std::cout
#include <algorithm>    // std::sort
#include <vector>       // std::vector

bool myfunction (int i,int j) { return (i<j); }

struct myclass {
  bool operator() (int i,int j) { return (i<j);}
} myobject;

int main () {
  int myints[] = {32,71,12,45,26,80,53,33};
  std::vector<int> myvector (myints, myints+8);               // 32 71 12 45 26 80 53 33

  // using default comparison (operator <):
  std::sort (myvector.begin(), myvector.begin()+4);           //(12 32 45 71)26 80 53 33

  // using function as comp
  std::sort (myvector.begin()+4, myvector.end(), myfunction); // 12 32 45 71(26 33 53 80)

  // using object as comp
  std::sort (myvector.begin(), myvector.end(), myobject);     //(12 26 32 33 45 53 71 80)

  // print out content:
  std::cout << "myvector contains:";
  for (std::vector<int>::iterator it=myvector.begin(); it!=myvector.end(); ++it)
    std::cout << ' ' << *it;
  std::cout << '\n';

  return 0;
}
```
### stable_sort

你发现有 sort 和 stable_sort，还有 partition 和 stable_partition， 感到奇怪吧。其中的区别是，带有 stable 的函数可保证相等元素的原本相对次序在排序后保持不变。或许你会问，既然相等，你还管他相对位置呢，也分不清楚谁是谁了？这里需要弄清楚一个问题，这里的相等，是指你提供的函数表示两个元素相等，并不一定是一摸一样的元素。

例如，如果你写一个比较函数：
```cpp
bool less_len(const string &str1, const string &str2){
        return str1.length() < str2.length();
}
```

此时，"apple" 和 "winter" 就是相等的，如果在"apple" 出现在"winter"前面，用带 stable 的函数排序后，他们的次序一定不变，如果你使用的是不带"stable"的函数排序，那么排序完后，"Winter"有可能在"apple"的前面。

### is_sorted

用来判断是否已经排序

```cpp
#include <iostream>     // std::cout
#include <algorithm>    // std::is_sorted, std::prev_permutation
#include <array>        // std::array

int main () {
  std::array<int,4> foo {2,4,1,3};

  do {
    // try a new permutation:
    std::prev_permutation(foo.begin(),foo.end());

    // print range:
    std::cout << "foo:";
    for (int& x:foo) std::cout << ' ' << x;
    std::cout << '\n';

  } while (!std::is_sorted(foo.begin(),foo.end()));

  std::cout << "the range is sorted!\n";

  return 0;
}
```

```sh
foo: 2 3 4 1
foo: 2 3 1 4
foo: 2 1 4 3
foo: 2 1 3 4
foo: 1 4 3 2
foo: 1 4 2 3
foo: 1 3 4 2
foo: 1 3 2 4
foo: 1 2 4 3
foo: 1 2 3 4
the range is sorted!
```

### is_sorted_until

返回值是

第一个不按照升序排列的元素的迭代器，如果所有元素都已排序或该范围包含少于两个元素，则迭代到最后一个元素并返回。

```cpp
// is_sorted_until example
#include <iostream>     // std::cout
#include <algorithm>    // std::is_sorted_until, std::prev_permutation
#include <array>        // std::array

int main () {
  std::array<int,4> foo {2,4,1,3};
  std::array<int,4>::iterator it;

  do {
    // try a new permutation:
    std::prev_permutation(foo.begin(),foo.end());

    // print range:
    std::cout << "foo:";
    for (int& x:foo) 
        std::cout << ' ' << x;
    it = std::is_sorted_until(foo.begin(),foo.end());
    std::cout << " (" << (it-foo.begin()) << " elements sorted)\n";

  } while (it!=foo.end());

  std::cout << "the range is sorted!\n";

  return 0;
}
```

```sh
foo: 2 3 4 1 (3 elements sorted)
foo: 2 3 1 4 (2 elements sorted)
foo: 2 1 4 3 (1 elements sorted)
foo: 2 1 3 4 (1 elements sorted)
foo: 1 4 3 2 (2 elements sorted)
foo: 1 4 2 3 (2 elements sorted)
foo: 1 3 4 2 (3 elements sorted)
foo: 1 3 2 4 (2 elements sorted)
foo: 1 2 4 3 (3 elements sorted)
foo: 1 2 3 4 (4 elements sorted)
the range is sorted!
```

### partial_sort

局部排序其实是为了减少不必要的操作而提供的排序方式。

其用途：班上有 10 万个学生，我想知道分数最低的 5 名是哪些人。如果没有 partial_sort，你就需要用 sort 把所有人排好序，然后再取前 5 个。现在你只需要对分数最低 5 名排序

```cpp
// partial_sort example
#include <iostream>     // std::cout
#include <algorithm>    // std::partial_sort
#include <vector>       // std::vector

bool myfunction (int i,int j) { return (i<j); }

int main () {
  int myints[] = {9,8,7,6,5,4,3,2,1};
  std::vector<int> myvector (myints, myints+9);

  // using default comparison (operator <):
  std::partial_sort (myvector.begin(), myvector.begin()+5, myvector.end());

  // using function as comp
  std::partial_sort (myvector.begin(), myvector.begin()+5, myvector.end(),myfunction);

  // print out content:
  std::cout << "myvector contains:";
  for (std::vector<int>::iterator it=myvector.begin(); it!=myvector.end(); ++it)
    std::cout << ' ' << *it;
  std::cout << '\n';

  return 0;
}
```

```sh
myvector contains: 1 2 3 4 5 9 8 7 6
```

### partial_sort_copy

将排序后的结果输出到新的空间中，因为当排序 10w 个学生后没必要将全部输出，因为只使用前几个数据

```cpp
// partial_sort_copy example
#include <iostream>     // std::cout
#include <algorithm>    // std::partial_sort_copy
#include <vector>       // std::vector

bool myfunction (int i,int j) { return (i<j); }

int main () {
  int myints[] = {9,8,7,6,5,4,3,2,1};
  std::vector<int> myvector (5);

  // using default comparison (operator <):
  std::partial_sort_copy (myints, myints+9, myvector.begin(), myvector.end());

  // using function as comp
  std::partial_sort_copy (myints, myints+9, myvector.begin(), myvector.end(), myfunction);

  // print out content:
  std::cout << "myvector contains:";
  for (std::vector<int>::iterator it=myvector.begin(); it!=myvector.end(); ++it)
    std::cout << ' ' << *it;
  std::cout << '\n';

  return 0;
}
```

```sh
myvector contains: 1 2 3 4 5
```

### partition

函数原型：

```cpp
template <class ForwardIterator, class UnaryPredicate>
  ForwardIterator partition (ForwardIterator first,
                             ForwardIterator last, UnaryPredicate pred);
```

对 first 到 last 之间的元素进行排序，使得 pred 规则函数返回值为 true 的元素优先于其他元素

返回的迭代器指向已经排序第二部分 (true) 的第一个元素。

```cpp
// partition algorithm example
#include <iostream>     // std::cout
#include <algorithm>    // std::partition
#include <vector>       // std::vector

bool IsOdd (int i) { return (i%2)==1; }

int main () {
  std::vector<int> myvector;

  // set some values:
  for (int i=1; i<10; ++i) myvector.push_back(i); // 1 2 3 4 5 6 7 8 9

  std::vector<int>::iterator bound;//初始化一个迭代器
  bound = std::partition (myvector.begin(), myvector.end(), IsOdd);

  // print out content:
  std::cout << "odd elements:";
  for (std::vector<int>::iterator it=myvector.begin(); it!=bound; ++it)
    std::cout << ' ' << *it;
  std::cout << '\n';
//从开始到 bound 的元素都是奇数
  std::cout << "even elements:";
  for (std::vector<int>::iterator it=bound; it!=myvector.end(); ++it)
    std::cout << ' ' << *it;
  std::cout << '\n';
//bound 到结尾的元素都是偶数并且已经排序
  return 0;
}
```

```sh
odd elements: 1 9 3 7 5
even elements: 6 4 8 2
```

### sort_heap 

![2020-05-08-18-34-14](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-05-08-18-34-14.png)

堆的常用方法：

- 构建优先队列
- 支持堆排序
- 快速找出一个集合中的最小值（或者最大值）
- 在朋友面前装逼

```cpp
// range heap example
#include <iostream>     // std::cout
#include <algorithm>    // std::make_heap, std::pop_heap, std::push_heap, std::sort_heap
#include <vector>       // std::vector

int main () {
  int myints[] = {10,20,30,5,15};
  std::vector<int> v(myints,myints+5);

  std::make_heap (v.begin(),v.end());
  std::cout << "堆中初始最大值  : " << v.front() << '\n';

  std::pop_heap (v.begin(),v.end()); v.pop_back();
  std::cout << "弹出一个元素后的堆中最大值 : " << v.front() << '\n';

  v.push_back(99); std::push_heap (v.begin(),v.end());
  std::cout << "推入一个元素后的堆中最大值 " << v.front() << '\n';

  std::sort_heap (v.begin(),v.end());

  std::cout << "最终排序结果：";
  for (unsigned i=0; i<v.size(); i++)
    std::cout << ' ' << v[i];

  std::cout << '\n';

  return 0;
}
```

```sh
堆中初始最大值 30
弹出一个元素后的堆中最大值 20
推入一个元素后的堆中最大值 99
最终排序结果： 5 10 15 20 99
```

