---
title: class & 函数 & 案例
date: 2020-01-21
category: basics
tags:
  - C++
---

## C++中对函数的扩充

有时一个函数如果可以存在不同的参数接口，那么都写在一个函数里面就会显得繁杂

所以就出现了 C++中函数重载不同参数接口代表不同函数的功能

为此也扩充了一些参数列表的功能

### 默认参数

添加这个扩展的目的是为了提高程序的可扩充性

函数参数列表存在一个默认参数时，当不给函数传参数时对应值就是那个值，给函数传入参数后和正常函数一样正常使用

```cpp
int func(int a = 10) {
	cout << a << endl;
	return 0;
}
int main() {
	func();
	func(20);//这两种调用方式都正确，省去了再写一个函数重载的步骤
	return 0;
}
```

默认实参必须在形参列表的结尾

![](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/%0D%0A.png)

``` cpp
int func1(int b,int c = 0,int a = 10) {
	cout << "方式 1" << endl;
	return 0;
}
int func2(int b = 100, int c = 0, int a = 100) {
	cout << "方式 2" << endl;
}
int main() {
	func1(2);//正确 可选 123
	func2(2);//正确，可选 0123
	return 0;
}
```

### 占位参数

实际操作中一般不用

用途就是区分不同函数

`int x ,int` 这种情况下调用时只能存在两个 int 值，虽然第二个 int 值没有实际意义
`int x ,int=0,`当函数列表使用这种占位参数，函数调用可以传两个参数也可以传一个参数

```cpp
int func(int b,int) {
	cout << b << endl;
	return 0;
}
int main() {
	func(1, 2);
	return 0;
}
```

### 函数重载

函数名相同，参数列表不同，c++将其视为使用了函数重载，不报错

不同的**参数个数，参数类型，参数顺序**构成函数的重载规则，
函数返回值*不是*构成函数重载的条件，
也无法重载仅按照函数返回值区分的函数

这样就可以，同一个函数名，通过传入不同数量的参数，调用不同的函数块

重载时不要使用默认参数，避免编译器调用时出现函数冲突可以使用占位参数

调用时先严格匹配，后 char 转 int 这种进行匹配
都不能就调用失败

实际底层中重载的函数还是不同的名字，编译器翻译后函数加些参数类型后缀来区别这些重载函数

### 函数重载和函数指针

``` cpp
typedef int (MY_FUNC)(int ,int );
int main (){
    MY_FUNC *fp=NULL;
    fp=func;
    fp(10,20);
}

int (*fp4)(int ,int,int );
fp4=func;
```

## 类和对象

### 内联函数

C++ 内联函数是通常与类一起使用。如果一个函数是内联的，那么在编译时，编译器会把该函数的代码副本放置在每个调用该函数的地方。

对内联函数进行任何修改，都需要重新编译函数的所有客户端，因为编译器需要重新更换一次所有的代码，否则将会继续使用旧的函数。

如果想把一个函数定义为内联函数，则需要在函数名前面放置关键字 inline，在调用函数之前需要对函数进行定义。如果已定义的函数多于一行，编译器会忽略 inline 限定符。

在类定义中的定义的函数都是内联函数，即使没有使用 inline 说明符。

::: details 宏函数
> [宏函数](https://blog.csdn.net/bytxl/article/details/46007849)

``` cpp
#define MAX( a, b) ( (a) > (b) (a) : (b) )
　　把它用函数来实现：
　　int max( int a, int b){
　　return (a > b a : b)
　　}
```

为了避免负数传入时因为优先级造成的混乱，所以每一小块都要加括号；
参数类型没法作为参数传递给函数，但是可以把参数类型传递给带参的宏。

```cpp　
#define MALLOC（n, type） \
（ (type *) malloc（（n）* sizeof（type）））

``` 
　首先，函数调用会带来额外的开销，它需要开辟一片栈空间，记录返回地址，将形参压栈，从函数返回还要释放堆栈。这种开销不仅会降低代码效率，而且代码量也会大大增加，而使用宏定义则在代码规模和速度方面都比函数更胜一筹；其次，函数的参数必须被声明为一种特定的类型，所以它只能在类型合适的表达式上使用，我们如果要比较两个浮点型的大小，就不得不再写一个专门针对浮点型的比较函数。反之，上面的那个宏定义可以用于整形、长整形、单浮点型、双浮点型以及其他任何可以用“>”操作符比较值大小的类型，也就是说，宏是与类型无关的。

　　和使用函数相比，使用宏的不利之处在于每次使用宏时，一份宏定义代码的拷贝都会插入到程序中。除非宏非常短，否则使用宏会大幅度增加程序的长度。
:::

> inline 函数，不用压栈出栈
> 当函数比较 简单 且需要多次使用时

内联函数由编译器处理，直接将编译后的函数体插入到函数体调用的地方。宏代码片段由预处理器处理，文本替换

内联函数的限制：
* 里面不能有循环，
* 不能有过多判断语句
* 不能过于庞大

以牺牲代码空间为代价 , 提高程序的运行时间效率

### 结构化程序设计：
* 程序由全局变量以及众多相互调用的函数组成
* 算法以函数的形式实现，用于对数据结构进行操作
* 不足：不清楚某个数据结构到底有哪些函数可对其操作，函数的操作对象是什么，函数的相互调用，变量关系会越来越复杂，抽取重复代码会变得十分困难

### 面向对象程序设计

* 更清晰的调用重复函数，
* 方便扩充
* 清晰体现变量和函数的关系
* 面向对象程序设计 = 类+ 类 + 类。.. .

### 类的引入

类：捆绑数据结构和相应的函数，（封装的特性）
使用面向对象的规则编程时先考虑属性（成员变量）和可进行的操作（成员函数）
类定义的变量就叫做对象

一个对象存储空间等于所有成员变量空间和
*成员函数和类的定义可以分开写；*, 类里面只声明一下有这个函数，可以看上去更加简洁

基本用法：

```cpp  
#include <iostream>
using namespace std; 
class man {
  public:
	//public 下面定义的变量和函数，能够在类的内部外部访问
	char name[10] = { "HaHa" };
	int age=18;
	void pprint() {
		cout << name << endl;
		cout << age << endl;
	}
  private:
	  //在 private 下面定义的成员变量和方法只能在类的内部访问
	  //可封装的特性
}; 
//可以将一个函数弄到特有的 class（类）里面，程序中的其他成员不能访问
int main() {
	man FW;//弄一个变量
	strcpy(FW.name,"fengwei");
	FW.pprint;//函数也为其中成员，用。访问
	return 0;
}
``` 

### 类的封装

一个类的内部，默认的访问控制权限是 private
一个结构体内部默认的访问控制权限是 public
还有一个访问控制权限是 protected

一般在类中的 public 中使用下面的方法读取和写入一个对象的 private 变量

```cpp
int get_year(){
    return year;
}//getter 方法： 在 public 里面添加类似语块就可以在函数外访问 private 里面 year（内容）了
void set_year (int new_year){
    year=new_year;
}//setter 方法： 在 public 里面添加类似语块就可以在函数外写入 private 里面 year（内容）了
```

## 面向对象编程案例

### 简述面向过程和面向对象

`eat(dog, shi); //过程驱动的一个行为`
`eat.dog(shi); //目的对象驱动的一个行为`

### 案例 1：求圆的周长和面积

### 面向过程：
``` cpp
#include <iostream>
using namespace std;
double get_area(int r) {
	return 3.14 * r * r;
}
double get_length(int r) {
	return 2 * 3.14 * r;
}
int main() {
	double r = 10;
	double area = 0;
	double length = 0;
	cout <<"面积是"<< (area = get_area(r) )<< endl;
	cout<<"周长是" << (length = get_length(r)) << endl;
	return 0;
}
```

### 面向对象：

> 基本单位是类；
> class 定义完成后要加分号；和结构体一样

``` cpp
#include <iostream>
using namespace std;
class circle {
public:
	void set(double r) {
		m_r = r;
	}
	double get_area() {
		return 3.14 * m_r * m_r;
	}
	double get_length() {
		return 2 * 3.14 * m_r;
	}
	double  getm_r() {
		return m_r;
	}
private:
	double m_r;
};
int main() {
	//前面相当于弄了一个复杂的结构体类型
	//还得定义一个这种类型的变量才能使用
	circle c;
	c.set(10);
	cout <<"半径是"<< c.getm_r() << endl;
	cout <<"面积是"<< (c.get_area() )<< endl;
	cout<<"周长是" << (c.get_length()) << endl;
	return 0;
}
```

so 有了面向对象后 main 函数就变得更加简洁了
private 里面不能定义一个变量为另一个可更改的变量的计算结果
因为 private 里面一个变量更新时
只是一个变量的更新，其他 private 成员并不变动

## 多文件编写C++

### 操作方法：

在解决方案中新建一个空项目  
在项目里右键添加类；  
一个类就应该对应一个 `.h` 和一个 `.cpp` 文件  
在源文件中再添加一个 `main.cpp`  
完成框架的添加后即可开始编写程序；  

完成后的大体框架共有三个文件

* `circle.h`文件示例：

要声明一个类中所有的成员；
例如函数名，变量名；
头文件里面不能写函数实现，可以写函数声明

``` cpp {1}
///circle .h
#pragma once//规定头文件在程序中只引入一次
void setR(double r);//在 circle.cpp 里面实现函数的具体功能
```

* `circle.cpp`文件示例：

在这里实现函数的具体功能

```cpp
#include "Circle.h"
void Circle::setR(double r){// Circle:: 写在函数名字前面
    m_r=r;//该怎么定义就怎么定义
}
...............
```

* main.cpp

前两个文件就是一个类，构成了一个完整且可使用的头文件

把 `circle.h`  `#include` 到 `main` 里面就可以像一个 cpp 文件中一样正常使用这个类

> 注意：在 circle 里面定义函数具体内容时要在函数名前加 circle::
circle.cpp：
``` cpp
#include "circle.h"
#include <iostream>
using namespace std;
void circle::setR(double r) {
	m_r = r;
}
void circle::PRINT() {
	cout << "right" << endl;
}
double circle::Get_area() {
	return m_r * m_r * 3.14;
}
```
circle.h：
``` cpp
#pragma once
class circle{
public:
	void setR(double r);
	double Get_area();
	void PRINT();
private:
	double m_r=0;
};
```
main.cpp:
``` cpp
// 使用时注意使用类中成员函数后面的（）不要忘记了
#include "circle.h"
#include <iostream>
using namespace std;
int main() {
	circle c;
	c.setR(10);
	c.PRINT();
	cout<<c.Get_area()<<endl;
	return 0;
}
```

### 案例 2：立方体是否相等

> 下面写的三个 get_m_h 也可以用一个三个参数的函数来一次性 get

``` cpp
#include <iostream>
using namespace std;
class cube {
public:
	void get_m_l(int l) {
		m_l = l;
	}
	void get_m_w(int w) {
		m_w = w;
	}
	void get_m_h(int h) {
		m_h = h;
	}
	double cal1() {
		return m_l * m_w * m_h;
	}
	double cal2() {
		return m_l + m_w + m_h;
	}
	bool judgecube(cube& a, cube& another) {
		if (a.cal1() == another.cal1() && a.cal2() == another.cal2()) {
			return true;
		}
		else {
			return false;
		}
	}
private:
	double m_l;
	double m_w;
	double m_h;
};
int main() {
	cube a;
	a.get_m_h(2);
	a.get_m_l(3);
	a.get_m_w(4);
	cube a2;
	a2.get_m_h(2);
	a2.get_m_l(3);
	a2.get_m_w(4);
	if (a.judgecube(a, a2)) {
		cout << "相同" << endl;
	}
	cout << "体积是" << a.cal1() << endl;
	return 0;
}
```

### 案例 3：计算点类是否在圆类内（圆内，圆上和圆外）

``` cpp
 #include <iostream>
#include "math.h"
using namespace std;
class point {
public:
	void Getpoint(double a, double b) {
		x = a;
		y = b;
	}
	int usex() {
		return x;
	}
	int usey() {
		return y;
	}
private:
	double x;
	double y;
};
class cirle {
public:
	void Getcircle(double a, double b, double c) {
		x = a;
		y = b;
		r = c;
	}
	bool judge(point a) {
		if ((sqrt(pow((a.usex() - x), 2) - pow((a.usey() - y), 2))) < r) {
			return true;
		}
		else return false;
	}
private:
	double x;
	double y;
	double r;
};
int main() {
	cirle a;
	point b;
	a.Getcircle(2.0, 2.0, 3.0);
	b.Getpoint(7.0, 8.0);
	if (a.judge(b)) {
		cout << "在圆内" << endl;
	}
	else {
		cout << "不在圆内" << endl;
	}

	return 0;
}
```

### 案例4：判断两个圆是否相交

定义一个 Point 类，属性包括点的坐标，提供计算两点之间距离的方法
定义一个圆类，包括其属性和半径
创建两个圆形对象，提示用户输入圆心坐标和半径，判断两个圆是否相交，并输出结果

``` cpp
#include <iostream>
#include "math.h"
using namespace std;
class point {
public:
	void Getpoint(double a, double b) {
		x = a;
		y = b;
	}
	double usex() {
		return x;
	}
	double usey() {
		return y;
	}
	double cal(point &a) {
		return (sqrt(pow((a.usex() - x), 2) - pow((a.usey() - y), 2)));
	}
private:
	double x;
	double y;
};
class circle {
public:
	void Getcircle(double a, double b, double c) {
		x = a;
		y = b;
		r = c;
	}
	double usex() {
		return x;
	}
	double usey() {
		return y;
	}
	double user() {
		return r;
	}
private:
	double x;
	double y;
	double r;
};
int main() {
	circle a;
	circle b;
	a.Getcircle(2.0, 2.0, 1.0);
	b.Getcircle(8.0, 10.0,1.0);
	point m, n;
	m.Getpoint(a.usex(), a.usey());
	n.Getpoint(b.usex(), b.usey());
	if (m.cal(n) <= (a.user() + b.user())) {
		cout << "相交" << endl;
	}
	else {
		cout << "不相交" << endl;
	}
	return 0;
}
```

### 案例5：根据坐标能计算矩形的面积

设计并测试一个名为 Rect 的矩形类，其属性为矩形的左下角与右下角两个坐标，根据坐标能计算出矩形的面积

引用绝对值函数更佳

``` cpp
#include <iostream>
using namespace std;
class Rect {
public:
	void setXY(double a, double b, double c, double d) {
		l_x = a;
		l_y = b;
		r_x = c;
		r_y = d;
	}
	double cal() {
		return (l_x - r_x) * (l_y - r_y);
	}
private:
	double l_x;
	double l_y;
	double r_x;
	double r_y;
};
int main() {
	Rect a;
	a.setXY(1, 2, 3, 4);
	cout<<a.cal()<<endl;
	return 0;
}
```

### 案例6：Tree

定义一个 Tree 类，有成员 age（树龄）, 成员函数 grow（int years）对 ages 加上 years,age（）显示 trees 对象的 ages 值。

``` cpp
#include <iostream>
using namespace std;
class Tree {
public:
	void setage(double a) {
		age = a;
	}
	double grow(double a) {
		return (age += a);
	}
private:
	double age;
};
int main() {
	Tree a;
	a.setage(2);
	cout << a.grow(3) << endl;
	return 0;
}
```
