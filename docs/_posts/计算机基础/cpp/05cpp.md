---
date: 2020-02-12
title: cpp05(操作符重载)
category: basics
tags:
  - C++
---

***

## 等号操作符重载

``` cpp
类& operator=(const 类名 &another){
    if (this ==&another){
        return *this;
    }
    //先将自己空间删除
    else if (this->name !=NULL){
        delete[] this->name;
        this->name=NULL;
        this->id=0;
    }
    //执行深拷贝
    this->id=another.id;
    int len =strlen (another.name);
    this->name= new char[len+1];
    strcpy(this->name,another.name);
    return *this;
}
```

若成员变量中存在指针,构造等号操作符时就需要额外开辟一个空间,供新变量使用

## 自定义的数组类重载 `[ ]` 

``` cpp
int & my_Array::operator[](int index){
     return this->space[index];
     //return 一个int值
 }
```

## 数组类重载 `<<` :

``` cpp
ostream &operator<<(ostream &os,MyArray &array){
    for (int i = 0; i < array.getlen(); i++){
        os<<array[i]<<" ";
    }
}
```

`getlen()` 中的函数参数是非 const 的指针如果传入函数的为 const, 就会不安全,报错 

实际操作中不建议重载并且或者操作符,因为存在短路现象

## 自定义智能指针

``` cpp
#include<memory>
int main (){
    int *p = new int;
    auto_ptr<int> ptr(new int);
	//ptr就是地址
    *ptr =20;
}
```

正常\*p 需要delete,这样构造的 \*ptr 指针不需要手动释放  
实现过程是通过 具有一个释放空间的析构函数 的类 实现的

# 练习

## 自定义数组类

## 自定义string类

> 自定义string类

my_string.h

``` cpp
#pragma once
//默认就有字符串类,include <string>
class my_string
{
public:
	my_string();
	my_string(int len);
	my_string(const char* str);
	my_string(const my_string& another);
	~my_string();
	void ppp(int a);
	//重载[ ]
	char& operator[](int a);
	//重载 ==
	bool operator==(const my_string& another);
	//重载 !=
	bool operator!=( const my_string& another);
	//重载 =
	my_string& operator=(const my_string& another);
	//重载 +
	my_string& operator+(const my_string& b);
	//重载 <<
	ostream& operator<<(ostream os,my_string& median);
	//重载 >>
private:
	int len;
	char* str;
};
int main() {
	my_string s1("asa");
	s1[2] = 'a';

	return 0;
}
```

my_string.cpp

``` cpp

#include<cstring>//使用memcpy函数
#include "string.h"
#include <iostream>
using namespace std;

my_string::my_string() {
	cout << "调用了无参构造" << endl;
	this->len = 0;
	this->str = NULL;
}

my_string::my_string(int len) {
	cout << "创建了len长度的字符串" << endl;
	this->len = len;
	this->str = new char[len + 1];
}

my_string::my_string(const char* str) {
	cout << "使用const字符串来初始化" << endl;
	this->len = strlen(str);
	char *median = new char [strlen(str)+1];
	memcpy(median, str, strlen(str));
	median[len] = '\0';
	this->str = median;
}

my_string::my_string(const my_string& another) {
	cout << "调用了构造函数" << endl;
	this->len = another.len;
	this->str = another.str;
}

my_string::~my_string() {
	cout << "调用了析构函数" << endl;
	if (str != NULL) {
		delete str;
		this->str = NULL;
	}
}

my_string& my_string:: operator=(const my_string& another) {
	cout << "使用了重载=操作符" << endl;
	this->len = another.len;
	this->str = another.str;
}

bool my_string:: operator!=(const my_string& another) {
	cout << "使用了重载!=操作符" << endl;
	if (this->len != another.len || this->str != another.str) {
		cout<<"!="<<endl;
		return false;
	}
	else {
		return true;
	}
}

bool my_string::operator==(const my_string& another) {
	if (my_string::operator!=(another)&& this->str == another.str) {
		return true;
	}
	else {
		return false;
	}
}

char& my_string::operator[](int a){
	cout << "使用了[]重载" << endl;
	return this->str[a];
}

my_string& my_string::operator+(const my_string& b) {
	cout << "使用了+重载" << endl;
	char* median2 = new char[strlen(this->str) + strlen(b.str)+1];
	memcpy(median2, this->str, strlen(this->str));
	memcpy(median2 + strlen(this->str),b.str,strlen(b.str));
	this->str = median2;
	return *this;
}
string s1 = "1234";
```

main.cpp

``` cpp
#include <iostream>
using namespace std;
#include "my_string.h"
int main (){
	//待处理细节
    return 0;
}

```

