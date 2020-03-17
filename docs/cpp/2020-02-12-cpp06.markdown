---
layout: post
title: cpp06(继承)
tags: [cpp+STL]
date: 2020-02-12 01:31:56
---

***高内聚，低耦合

## 类和类之间的关系

***

``` cpp
#include<iostream>
using namespace std;
class A{
     public:
     void (){
         cout<<"1"<<;
     }
     int a;
};
class B {
    public:
    A a;
    void FuncB(){

    }
}
class C{
    void C(A *a){

    }
}
//B has A  C use A,依赖于A
class D:public A{
    public :
        void FUnD(){
            cout<<a<<endl;
        }
}
//D is A    D继承了A
```

当想创建一个新的类，但要添加一种功能  
就免去重写大部分代码的步骤  

``` 
class stuudent3 :public student1{
    ...student::printS();
};
```

## 继承

***
子类（派生类）共享父类（基类）的成员，但是*不共享空间*  
依然是两个相互独立的类空间  
但是使用时是同一种使用方法  
提高了可重用性  

构造函数可以用冒号在子类中添加构造内容，从而达到不用重复写构造函数内容的目的  

``` cpp
student3 (int id,string name ,int score):student(id,name){  
    this->score =score;  
}
```

这样就是先使用父类的构造，再使用子类的构造  

* 类的继承方式

***
public:  内外都能访问  
protected:  在类的内部可以访问，外部不能访问  
private:  在类的内部可以访问，外部不能访问  

```cpp 
//公有继承
class child :public parent{

    public:
    void func(){
        cout<<pub<<endl; 
    }

}; 

``` 

>* 公有继承：public
public->public
protected：继承过程中可以被继承的privated  
private:不可见  
在一个类中一样，继承中两个有区别

>* 保护继承：protected
public->protected  
protected->protected  
private依然不可见  

>* 私有继承:private
都变为private成员
父类的private变量依然不能访问

* 类的赋值兼容原则

***

>* 子类对象可以当作父类对象使用  
子类对象可以直接赋值给父类对象  
子类可以直接初始化父类对象 
父类指针可以指向子类对象,子类指针不能指向父类对象，因为使用指针时不能访问子类变量  
这样就可以用一个接口接入两个相关的类  

当子类中出现和父类重名的public变量，使用类的域名点出来  cout<<this->a<<parent::a<<endl;
中的static

static 变量初始化要在全局中
` ` ` int A::a=100; ` ` `  
改变一个变量时对于一个类族都起作用

* 多继承

***
```cpp
class sofabed:public bed,public sofa{
    public:
    ...
};
```

多继承会出现重复的成员变量  
使用该变量时会出现访问不明确  
所以就将*父类继承爷爷类*时，改成虚继承  
` ` ` virtual ` ` `但是父类中特有的变量仍然不受影响  

## 多态

***
给几个不完全相同的对象发出相同的指令，执行不同的操作  
指，由继承而产生的相关的不同的类，其对象会对同一操作做出不同响应  

virtual函数  
子类重写此方法  
那么传子类和父类不同对象给函数，那么执行时就通过指针调用对应的操作  
编译器默认为使用父类的（因为绝对正确），添加virtual关键字后可以达到多态  

*发生多态的条件：*  

1. 继承         
2. 要有虚函数重写(一摸一样但函数体不同)    
3. 父类指针或引用   指向  子类对象    

一个函数参数用父类指针的话， 就可以无限扩展新的子类仍然给这个函数传

## 动态联编和静态联编

***

if switch 就是动态联编，` ` ` int a = 10 ` ` `就是静态联编，多态是动态联编  

## 虚析构函数

***
类成员含有指针时    子类析构函数加virtual；

## 重载 重写 重定义

***

1. 重载是在同一作用域下发生的，函数参数不同的；
2. 重定义：（普通函数重定义）发生在两个不同的类中，一个是父类，一个是子类
3. 重写：（父类的虚函数被子类重写就是虚函数重写，会发生多态）virtual 

