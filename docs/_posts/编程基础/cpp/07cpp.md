---
layout: post
title: cpp07(多态和抽象类)
tags: [cpp+STL]
date: 2020-02-12 01:32:56
---

***

## 多态的原理

***

先通过子类VPTR指针查找虚函数表中是否有对应的函数  
再查找父类VPTR指针有没有对应虚函数
再静态联编查看类中是否有对应函数　　

当存在虚函数时,由于vptr指针的存在,一个对象的空间会扩大四个字节,用来存放虚函数表的指针。

vptr指针分布初始化,vptr指针跟着系统执行时的块区走  
使用时要注意父类指针和子类指针的步长

## 纯虚函数和抽象类

***

*面向抽象类编程*

virtual double getarea（） = 0；  

父类中添加此写法表示声明一个写法,他是一个纯虚函数,这个类叫做抽象类,不允许使用抽象类定义的对象  

如果一个普通类,继承拥有纯虚函数的类,必须要重写这个纯虚函数,不写的话还是一个抽象类

这样一个main函数通过抽象类就可以操作多个相关类,降低了main函数和实现层的联系  
业务逻辑层,抽象层,实现层

main函数中：

``` cpp
BigBrother *brother = new wuyazi ;//wuyazi可以随便改
bigbrother->fightpeople() ;
delete bigbrother;
return 0;
```

## 纯虚函数和多继承

***

子类同时实现两个父类抽象类函数的具体内容

那么main函数调用时,每个抽象类指针只能调用属于自己的那部分接口  

``` cpp
iii1 *ii1 = new Child;
ii1->func1(1,2);
ii1->func2(1,2);
iii2 *ii2 = new Child;
ii2->func3(1,2);

```

多文件编写虚函数时；  
在cat.h里面声明时,还加virtual关键字    
在cat.cpp里面实现时 就不用加virtual关键字  

继承时析构函数改成虚函数 这样就可以防止内存泄漏  

end

