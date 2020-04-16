---
title: namespace & 引用
---

## 背景知识

1983--1998年,一个歪果人发明了一种新的程序语言 c++
c语言用的是gcc编译器    c++用的是g++编译器

## c++的Helloworld

### 头文件

C++中的头文件函数的有两种使用方式：

``` cpp {2,3}
#include <iostream> //提供库
using namespace std,
using std::cout,using std::endl,
```
要区分的是`using namespace`和`using`是两个不同的关键字, `using` 后面跟的是具体的函数；`using namespace` 后面跟的是一个`namespace`变量

如果只想调用一个函数的时候就用`std::cout`这种方式, 一般用不到

### 输入输出

`cout<<" hello world" <<endl(这个回车兼容所有系统)`

`cout==printf_pro`, 省去了输出类型的说明, 用`<<`分隔两个不同类型的元素即可

对应`cout`也有`cin>>a` 同样省去了类型说明, 用`>>`分隔两个不同类型的元素即可

一个完整的Hello World:
``` cpp
#include <iostream>
using namespace std;
int main() {
	cout << "hello world" << endl;
	return 0;
}
```
### namespace 

也可以自定义一个`namespace`, 同时使用自定义`namespace`中的变量或者函数

``` cpp
#include <iostream>
using namespace std;
namespace space1 {
	int a = 10;
}
int main() {
	///方式1
	cout << space1::a << endl;
	///方式2
	using space1::a;
	cout << a << endl; //     方式1和2类似,2是1的总结
	///方式3
	using namespace space1;
	cout << a << endl;
	return 0;
}
```

嵌套namespace后使用结构体变量
 

``` cpp
#include <iostream>
using namespace std;
namespace spaceA{
	namespace spaceB {
		struct PUT {
			int a;
			char name[20];
		};
	}
}
int main() {// 用这种使用命名空间的写法比较方便
	using namespace spaceA::spaceB;
	struct PUT t2;
	t2.a = 3;
	return 0;
}
```

## c++的实用增强部分

添加了面向对象的规则, 可以使程序更加完美

变量随用随定义`for(int i = 0; i < 10; i++)`  ~~（我C语言一直用的就是这个规则导致C语言考试...~~

添加了`bool`类型关键字,内存只有一字节大小, `true&false`

### 三目运算符可作为左值

C语言中：`*(a<b? &a : &b)=50;`

在c++中整个式子可以直接当做左值,不用操作地址也可以实现相同目的

`(a<b?:a:b)=50`

## const加强

`const int a` 和 `int const a` 一样  

我一般写`const int a`

`const int *c` 指向常整形数的指针

（所指向的内存数据不能被修改,但c数据本身可以修改）  

> 就是引用实质,常指针,const int *a；

int *const d  

指向的地址可以修改,数据本身不能修改

`const int * const e` 两个内容就都不能修改
***
c语言中用const后还可以用指针来改变const变量值的大小
const int a 仍然是一个可以改变的变量（通过指针操作

但`c++`中 `const int a=10;` (编译器处理)是通过常量区的符号表进行的文本替换,只读且不可修改  

> 真正意义上的const  

所以 `c++`中可以用`const`可以用来定义数组

### 真正的枚举（使用频率极低

enum season ... 

c++中枚举变量赋值必须为枚举成员, 不能用1234赋值

## 引用（yin yong）

实质：`int *const p = &a;`

类型名&引用名=某变量名

``` cpp
int n = 4;
int& r = n;
```

int &就是r的类型, r相当于n的别名  
**引用必须初始化**
定义引用时只能将其初始化为一个变量；**从一而终**； 

可对引用再次引用。  

引用应用实例1：
（交换两个int的一个swap函数）

``` cpp
void swap(int* a; int* b) {    //指针写法
	int median;
	median = *a;
	*a = *b;
	*b = median;
}
swap (&n1,&n2);
void swap(int& a, int& b) { //引用写法
	int median;
	median = a;
	a = b;
	b = median;
}
int main() {
	int n1 = 10, n2 = 20;
	swap(n1, n2);//n1,n2的值被交换
	return 0;
}
```
引用应用实例2：
引用作为函数的返回值

``` cpp
#include <iostream>
using namespace std;
int n = 4;
int& test() {
	return n;
}
int main() {
	test() = 40;//可用作左值
	cout << n;
	return 0;
}
```
