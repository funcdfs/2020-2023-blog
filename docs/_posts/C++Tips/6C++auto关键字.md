---
title: C++ auto 关键字
date: 2020-09-07
category: basics
tags:
  - C++
---

> C++ auto 关键字以及和 for 的用法

<!-- more -->

## auto 的基本使用

c++11 引入了 auto 类型说明符，auto 让编译器通过初始值来推算变量的类型，所以 auto 定义的变量必须有初始值。 
使用 auto 也能在一条语句中声明多个变量，因为一条声明语句只能有一个基本数据类型，所以该语句中所有变量的初始基本数据类型都必须一样： 
eg: auto i=0,*p=& i; //正确 auto sz=0,pi=3.14;//错误，sz 和 pi 的类型不一样。

## auto 和 for 循环，

遍历给定序列中的每个元素并对序列中的每个值执行某种操作。
```cpp
for(declaration :expression)
```

- expression 部分是一个对象，用于表示一个序列，
- declaration 部分负责定义一个变量，该变量被用于访问序列中的基础元素，每次迭代 
- declaration 部分的变量会被初始化为 expression 部分的下一个元素值。

```cpp
string s("hello,world");  
for(auto c:s)//对于 s 中的每个字符  
    if(FW(c))
        ++num;       
```
这个用法相比用循环变量加`string.at(i)`看上去高级多了，并且还很方便

- 拷贝 range 的元素时，使用 for(auto x : range).
- 修改 range 的元素时，使用 for(auto && x : range).
- 只读 range 的元素时，使用 for(const auto & x : range).

## auto 的其他常见用法

根据初始化表达式自动推断被声明的变量的类型，如：

`auto f = 3.14;  //double`
`auto s("hello");  //const char*`
`auto z = new auto(9);  //int *`
`auto x1 = 5, x2 = 5.0, x3 = 'r';   //错误，必须是初始化为同一类型`

但是，这么简单的变量声明类型，不建议用 auto 关键字，而是应更清晰地直接写出其类型。（不要装逼）

auto 关键字更适用于类型冗长复杂、变量使用范围专一时，使程序更清晰易读。如：

```cpp
std::vector<int> vect; 
for(auto it = vect.begin(); it != vect.end(); ++it){  
//it 的类型是 std::vector<int>::iterator （有一些难记难打并且丑的单一变量类型都可以替换）
   std::cin >> *it;
}
```
## auto 的优缺点

使用`std::vector<std::string>::iterator`来定义 i 是 C++常用的良好的习惯，但是这样长的声明带来了代码可读性的困难，因此引入 auto，使代码可读性增加。并且使用 STL 将会变得更加容易

可以避免类型声明时的麻烦而且避免类型声明时的错误
但是auto不能解决所有的精度问题。比如：

```cpp
#include <iostream>  
using namespace std;  
int main()  {  
   unsigned int a = 4294967295;//最大的unsigned int值  
   unsigned int b = 1；  
   auto c = a + b;  
   cout<<"a="<<a<<endl;  
   cout<<"b="<<b<<endl;  
   cout<<"c="<<c<<endl;  
} 
```
就算是auto变为的类型也不能阻止数据溢出

## 修饰及注意点

- 可以使用指针引用来装饰auto类型，他也是一种类型
```cpp
auto k = 5;  
auto* pK = new auto(k);  
auto** ppK = new auto(&k);  
const auto n = 6;  
```
- 用auto声明的变量必须初始化
- auto不能与其他类型组合连用
- 函数和模板参数不能被声明为auto
- 定义在一个auto序列的变量必须始终推导成同一类型（逗号分隔定义）
- 不能用于类型转换或其他一些操作，如sizeof和typeid
>运行时获知变量类型名称，可以使用 typeid(变量).name()

::: tip
遇到再补
:::