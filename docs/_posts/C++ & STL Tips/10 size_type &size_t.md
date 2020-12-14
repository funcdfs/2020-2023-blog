---
title: size_type &size_t
date: 2020-11-20
tags:
  - C++
---

> C++ size_type &size_t 的概念

<!-- more -->

## size_type:

由 string 类类型和 vector 类类型定义的类型，用以保存任意 string 对象或 vector 对象的长度，标准库类型 将 size_type 定义为 unsigned 类型。

string 抽象意义是字符串， size（）的抽象意义是字符串的尺寸， string::size_type 抽象意义是尺寸单位类型 string::size_type 它在不同的机器上，长度是可以不同的，并非固定的长度。但只要你使用了这个类型，就使得你的程序适合这个机器。与实际机器匹配。

eg:string::size_type 从本质上来说，是一个整型数。关键是由于机器的环境，它的长度有可能不同。 例如:我们在使用 string::find 的函数的时候，它返回的类型就是 string::size_type 类型。而当 find 找不到所要找的字符的时候，它返回的是 npos 的值，这个值是与 size_type 相关的。

假如，你是用 strings; int rc = s.find(…); 然后判断，if ( rc ==string::npos ) 这样在不同的机器平台上表现就不一样了。如果，你的平台的 string::size_type 的长度正好和 int 相匹配，那么这个判断会侥幸正确。但换成另外的平台，有可能 string::size_type 的类型是 64 位长度的，那么判断就完全不正确了。 所以，正确的应该是: 

string::size_type rc = s.find(…); 这个时候使用 if ( rc == string::npos ) 就回正确了

### size_type 在 string 中的 find 应用

在使用 erase 删除函数的时候，经常会和查找函数一起使用

*find* 系列方法参数可以是 char 或者 string 类型，为待查找的目标，返回值为 size_type; 当 查找不到目标时，返回值为 npos, 可以这样判断

```cpp
string longer("That's a funny hat.");
//size_type loc1 = longer.find("hat"); // 存在
size_type loc1 = longer.find("hello"); //不存在
if (loc1 == string::npos)
    cout<< "not found" <<endl;
```
### size_type 与 int

字符串有一个 size 函数，返回一个数字
返回类型是 size_type 而不是 int，并且 size_type 也是规定为 unsigned 类型，范围更大，更符合字符串操作时的数据类型，并且在不同平台上的数据大小不同，代码变的可以移植，在某种机器上深度使用 int 后就会出错

用来储存足够大的任意 string 对象的长度

## size_t 代替常用 int 

1）size_tsize_t 是用于数组的下标值类型，也可以用来“接收”sizeof 操作符的返回值。
既然是无符号的，一般只能用在没有负数的地方了。比如我们的年龄啊，身高啊。在 c 标准函数中，最一般的就是 strlen, 返回字符数。字符数当然不可能是负的啊，所以函数原型是 size_t strlen(const char*) ；
size_t 是表示长度（尺寸）的类型，这个类型是由
typedef unsigned int size_t;
定义的，一般用于保存一些长度信息，比如数组的长度、字符串的长度等；

2）size_type 是容器配套类型，使用前需要加作用域比如 string::size_type（string 可看作字符容器，但不是类模板）
数组的定义声明等应当使用 size_t 类型，如果不得不使用 int 作下标，应当使用 unsigned 避免越界。

所以以后一般使用 size_t 代替程序中不是变量的 int