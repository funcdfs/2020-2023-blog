---
layout: post
title: cpp04(this,友元)
category: basics
tags:
  - C++
date: 2020-02-12 01:29:59
---

***

## this关键字：

有了这个功能就常用这个功能；可读性很高；用起来也很方便

``` cpp
int geti(){
    return this->mi;
    //return mi;
}
```

每个类的成员函数里面都默认额外添加一个参数；为该对象的指针
this 就是指向该成员函数的对象地址

``` cpp
this->mi=100;// this 不是const test *
this++//不可以；test *const；
```

指向关系不可以修改,指向的内容可以修改
this指针是一个常指针

``` 

若不想让修改成员变量的值；加后缀

``` cpp
int geti() const {
    return this->mi;
    //return mi;
}
```

则在上面函数中  this->mi=100; 就不能使用；

static 成员函数只能返回static成员变量；
因为实际上没传入this指针；
static属于这个类,

可以返回一个对象的函数

可以完成连续+=两个对象的操作

``` cpp
test &testadd(test &anotheer){
    this ->a+=another.a;
    this ->b+=another.b;
    return *this;
    //如果想返回一个对象本身,在成员方法中,用*this返回；用于引用接收
}
```

就可以执行

``` cpp
t1.testadd(t2).testadd(t2);
```

成员函数想对一个对象连续操作就返回引用
,return *this; 

## 多文件编写自定义数组类

***
依旧按照三文件打开vs

熟悉深拷贝,综合训练

main.cpp~Myarray.cpp
~Myarray.h; 

### main.cpp

``` cpp
#include <iostream>
using namespace std;
#include "MyArray.h"
int main() {
	MyArray array(10);//开辟10空间数组
	for (int i = 0; i < 10; i++) {
		array.setdata(i, i + 1);
	}
	for (int i = 0; i < 10; i++) {
		cout << array.getdata(i) << " ";
	}
	cout << endl;
	MyArray array2 = array;
	for (int i = 0; i < 10; i++) {
		cout << array2.getdata(i) << " ";
	}
	cout << endl;
	/*MyArray array3;
	array3 = array;*/
	return 0;
} 
```

### MyArray.h

``` cpp
#pragma once
class MyArray{
public:
	MyArray();
	MyArray(int len);
	~MyArray();
	void setdata(int index, int data);
	int getdata(int index);
	int getlen();

	MyArray(const MyArray& kaobei);
	//拷贝构造函数参数列表是const 引用
private:
	int len;
	int* space;
};
```

### MyArray.cpp

``` cpp
#include "MyArray.h"
#include<iostream>
using namespace std;

MyArray::MyArray() {
	cout << "调用默认构造" << endl;
	this->len = 0;
	this->space = NULL;
}
MyArray:: MyArray(int len) {
	if (len <= 0) {
		this->len = 0;
		return;
	}
	else {
		this->len = len;
		this->space = new int[this->len];
		cout << "开辟int空间len长度" << endl;
	}
}
MyArray:: ~MyArray() {
	if (this->space != NULL) {
		delete[]this->space;
		this->space = NULL;
		len = 0;
		cout << "调用了析构函数" << endl;
	}
}
void MyArray::setdata(int index, int data) {
	if (this->space != NULL) {
		this->space[index] = data; //设定具体值
	}
}
int MyArray::getdata(int index) {
	return this->space[index];
	//MyArray::要写在函数真正名字前面
}	
int MyArray::getlen() {
	return this->len; 
}
MyArray::MyArray(const MyArray& kaobei) {
	if (kaobei.len != 0) {
		this->len = kaobei.len;
		//深拷贝
		this->space = new int[this->len];
		for (int i = 0; i < this->len; i++) {
			this->space[i] = kaobei.space[i];
		}
		cout << "调用拷贝构造函数" << endl;
	}
}
```

## 友元

***

``` cpp
friend 函数头+分号

一般不要用在一个类中引用另一个类中成员的友元

```

友元的使用是单向的,之执行你声明的关系

## 操作符重载

***

### 格式

``` cpp
+-

类名 operator+(类名 &对象,类名 &对象){
    类名 temp (对象1.x+对象2.x , 对象1.y+对象2.y);
	//调用有参构造函数
	return temp；
	返回这个temp
}
```

操作符重载可写在类中（参数列表只有一个引用）

也可以写在全局中（上面的写法）

调用时也可以

``` cpp
operator+(c1,c2);//全局的调用方式2
c1.operator+(c2);//类中的调用方式2
c1 运算时在+左面
```

调用时可以连加连减, 使用时要保持参数数量不变

优先级和运算顺序不会被重载

里面不能有默认参数,参数应该是一个类的对象,而不应该是两个int

功能应该类似于正常使用时的功能
不能加号赋值为减号操作

操作符不能重载的

* .
* .*
* ::
* ?:

## 单目运算符重载

***
在类中声明不需要参数

在全局中声明需要一个参数

此时函数返回值为引用

函数参数也为引用

##  前++和 后++

***

``` cpp
//前++
test &operator++(test &a){
	
}

```

重载的是后++运算符, 重载方法就是添加额外的占位参数

``` cpp
//后++
test &operator++(test &a,int=0){
	
}
```

使用

``` cpp
#include<iostream>
using namespace std;
class test {
public:
	test(int a) {
		this->a = a;
	}
	void seta(int a) {
		this->a = a;
	}
	int geta() {
		return this->a;
	}
	friend test& operator++(test& q);

private:
	int a;
};

test& operator++(test& q) {
	q.a++;
	return q;
}
int main() {
	test a(10);
	++a;
	cout << a.geta();
	return 0;
} 输出结果为11
```

## 左移右移操作符重载

***
比较常用

``` cpp
ostream& operator<<(ostream &os,test &c){
	os<<c.getdataa<<c.getdatab<<endl;
	return os;
}//对cout转到定义即可查看
void operator<<(ostream& os ,test &a){
	....os <<....
	return ;
}
```

<<操作符只能写在全局,不能写在成员方法中；

否则调用顺序就会发生改变； 就是c<<cout；不是cout<<c

``` cpp
istream &operator>>(istream &is,test &a){
	is>>a.getx;
	return is;
}
```

 

作业：
***

1. this指针的本质是什么？ 如何在函数中用const修饰this指针？

``` cpp
int geti()const{

}
```

2. 友元函数是否有传递性,和交换性？ 举例说明。

没有,只有你定义的单向特性

3. 实现一个复数类的+=,-=,前++,后++,前--,后--,<<, >>,等操作符重载

``` cpp
test &operator(test &a){
	...
	return operator;
}
test &operator(test &a,int=0){
	...
	return operator;
}
```

4. 简述操作符的重载规则。

应该和它原来的定义和使用方法一样

5. 课程中的自定义数组,实现<<操作符 实现取值操作符[]

   array[i] = 10; 
   cout <<array<<endl; 
   cin>>array; 
   cout <<array[i] <<endl; 

   == 
   !=
   array1 == array2
   array1 != array2

``` cpp
对类使用
```

