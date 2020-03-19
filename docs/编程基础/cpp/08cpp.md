---
layout: post
title: cpp08(模板函数. 模板类)
tags: [cpp+STL]
date: 2020-02-12 01:33:56
---

***

## 函数模板

### 函数模板的基本语法

例如我们使用不同参数类型的swap 函数时,逻辑相同,但需要相同逻辑写多次,这样就会出现代码不能复用,增加维护成本,等问题

这时人们就引入了模板技术 ,也就是编写函数代码时可以忽略参数类型,一个函数接口实现多种不同的操作, 用模板是为了实现泛型,可以减轻编程的工作量,增强函数的重用性。

``` cpp
template<class T>//template<typename T>
void MySwap(T& a,T& b){
    T temp=a;
    a=b;
    b=temp;
}
```

为了让编译器区分普通函数还是模板函数, 在函数前面加上 `template(模板)`  `<typename T>` 告诉编译器,我下面要开始写模板函数, 这个魔法效果只对下面紧挨着的第一个函数生效

下面是两种调用方式：

``` cpp
void test01(){
    //1.自动类型推导
    inr a=10,b=20;
    cout<<a<<' '<<b<<endl;
    MySwap(a,b);
    cout<<a<<' '<<b<<endl;
    //2.手动指定类型
    MySwap<int>(a,b);
}
```

模板函数不允许发生自动类型转换,是强制类型函数  
普通函数就能够使用自动类型转换  
例如普通函数列表中的 `int char` 可以接受 `char int` ,也可以 `int char` 

函数模板可以像普通函数一样被重载(不同参数个数)  
当普通函数和模板函数实现了重载时,编译器优先考虑普通函数,若类型完全匹配或转化后可以完全匹配  
就调用普通函数,若类型与普通函数写的重载函数不能够匹配就调用模板函数  
如果函数模板可以产生一个更好的匹配,那么选择模板  

但当有调用模板函数的需求时,就在函数名后加上 `<>` 
(通过空模板实参列表的语法规定编译器只能通过模板匹配) `mm<>();` 

### 模板函数实现过程

函数模板机制结论:  
编译器并不是把函数模板处理成能够处理任何类型的函数  
函数模板通过具体类型产生不同的函数  
编译器会对函数模板进行两次编译,在声明的地方对模板代码本身进行编译,在调用的
地方对参数替换后的代码进行编译。  

函数模板通过具体类型调用产生不同函数  

cpp->预编译器->index.i->  
(进行两次编译)
index.i->编译器->index.s（生成的汇编文件就变为具体函数了）  
index .s->汇编器->目标文件.obj(win).o(linux)  

链接器,将.o文件合并为可执行文件exe

> linux操作去复习一下

调用 `my_add(int ,int)` 的时候编译器就会生成一个具体的函数供调用  
变成汇编文件时,根据实际调用函数$n$的次数就变为$n$个函数  

### 函数模板实例

对char,double类型和int类型数组进行排序

``` cpp
#include<iostream>
using namespace std;
template<typename T>
void print_array(T* array, int len) {
    for (int i = 0; i < len; i++) {
        cout << array[i] << ' ';
    }
}
template <class T>
void swap_two(T& a, T& b) {
    T median = b;
    b = a;
    a = median;
}
template<class T>
// 每次进循环时flag为true,当最后一步执行true = false时,返回值为false,跳出循环
void bubble_sort(T* array, int len) {
    for (bool flag = false; flag = !flag; len--) {
        for (int i = 1; i <= len; i++) {
            if (array[i] > array[i - 1]) {
                swap_two(array[i], array[i - 1]);
                flag = false;
            }
        }
    }
}

template<class T>
int getlen(T *array) {
    return sizeof(array) / sizeof(T);
}
int main() {
    //int array[] = { 2,1,4,3 };
    //cout << sizeof(array) << sizeof(int);
    char array[] = { 'a','b','c' };
    int len = getlen(array);
    print_array(array, len);
    bubble_sort(array, len);
    print_array(array, len);
}
```

切记使用模板时不会发生强制类型转换；所以函数参数列表在使用时不一定需要全部为模板类型

## 单个模板类的基本语法

(类中的成员为模板类型,导致构造函数,析构函数也为模板类型)

``` cpp
template<class T1,class T2>
class Person{
public:
    person(T id,T2 age){
        this->ID=id;
        this->AGE=age;
    }
    void show(){
        cout<<ID<<' '<<AGE；
    }
public:
    T ID;
    T2 AGE;
}
```

### 类模板做函数参数

``` cpp
void PrintMyClass(MyClass<int>& mclass){
    mclass.Show();
}
void test02(){
    MyClass<int> mclass1(10), mclass2(20), mclass3(30);
    PrintMyClass(mclass1);
    PrintMyClass(mclass2);
    PrintMyClass(mclass3);
}
int main(){
    test01();
    test02();
    return 0;
}
```

函数模板在调用时,可以实现自动类型推导(不声明类型调用函数模板)  
而类模板调用时必须手动指定类型,从而可以使类在定义对象时,这个对象可以得到编译器分配的内存  
(其实都手动指定类型才符合c++的行为习惯,自动类型推导是帮助偷懒的方法)
`Person<int> p(10,20);` 

### 类模板实例

* 普通类继承模板类

``` cpp
//子模板类派生时,需要具体化模板类,c++编译器要知道父类的数据类型具体是什么样的
//因为 c++编译器要分配内存,必须知道父类所占内存大小

template<class T>
class parent{
    T data;
……
};
class child:public parent<int>{
……
};
```

* 模板类继承了普通类（非常常见）

``` cpp
class parent{
……
};
template<class T>
class child:public parent{
T data;
……
};
```

* 类模板继承类模板

``` cpp
template<class T>
class parent{
    T data1;
……
};
template<class T1,class T2>
class child:public parent<T1>{
    T2 data2;
……
};
```

> 复习c++的继承部分,将那部分笔记添加实例应用

``` cpp
```

vs 中 `CTRL`  `shift` + `u` 变大写

待修改
***
>类模板在类内实现
    template <class T1,class T2>
    person<string,int> p("AAA",20);

    类模板的外部实现
    (类中声明函数头,类外,主函数体用::实现具体函数)
    template<class T>
    person<T>::person(T age,T id){

    }
***

### 模板类中使用友元

待修改
***

**<不要滥用友元!>**

>会破坏类的封装特性,不常用

普通函数友元

```cpp
```

友元重载左移操作符

``` cpp

//te plate<class T>
friend ostream& operator<<<T>(ostream& os,person<T> &P)

将
template <class T> class person
template<class T> void print_person(person<T>& p);

public:
    friend void print_person<T>(person<T>& p);

```

***

### 多文件编写一个模板类

pragma：东西
`#pragma once` 一次性的东西
//防止头文件被重复包含

cpp编译机制：

一个项目里面有多个cpp文件时,c++采用的是独立编译  
a.o  b.o  c.o  ==可执行程序

main.cpp里面调用
`person<int> p(10);` 时  
构造函数在当前文件没有找到定义,编译器交给链接器去找

person.cpp
里面实现函数模板的具体内容时,
并没有生成可调用的具体函数,所以当编译器调用 `person<int>` 时  
就会出现无法链接的外部符号的error

解决方案：

当多文件编写头文件存在函数模板时,

将 `#include"person.h"` 修改为
`#include"person.cpp或者` hpp`

工程习惯就将类模板文件cpp后缀改为 `person.hpp` 

### 类模板中的static关键字

一种方法出现的目的是为了方便程序员操作
所以定义时也符合正常逻辑
所以这个static关键字就是每个相互独立的具体类中的一个成员
而不是共享关系或者归模板类一人所有 

### 类模板中在项目开发中的应用

设计一个数组模板类(MyVector), 完成对int、char、Teacher类型元素的管理。
请仔细思考：

* 如果数组模板类中的元素是Teacher类型时,需要Teacher类做什么工作？
* 如果数组模板类中的元素是Teacher类型时,Teacher类做含有指针属性？

MyVector.cpp

``` cpp

```

## 练习

(感觉这个讲的好乱啊,学MOOC上面北大讲的去了)

1 使用类模板技术实现一个数组,可以保存Int,char, float等基础数据类型
2 存放自定义数据类型 (存放类对象)

构造函数接收参数,指定数据元素的个数 5 new int[5]
重载[]

person per[10]; 
per[0] = Teacher

