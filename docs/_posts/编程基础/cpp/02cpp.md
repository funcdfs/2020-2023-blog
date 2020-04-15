---
title: class & 函数扩充
---

## C++中对函数的扩充

有时一个函数如果可以存在不同的参数接口, 那么都写在一个函数里面就会显得繁杂

所以就出现了C++中重名函数不同参数接口代表不同函数的功能

即函数重载的功能

### 默认参数

添加这个扩展的目的是为了提高程序的可扩充性

函数参数列表存在一个默认参数时, 当不给函数传参数时对应值就是那个值,给函数传入参数后和正常函数一样正常使用

```cpp
int func(int a = 10) {
	cout << a << endl;
	return 0;
}
int main() {
	func();
	func(20);//这两种调用方式都正确, 省去了再写一个函数重载的步骤
	return 0;
}
```

默认实参必须在形参列表的结尾

![](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/%0D%0A.png)

``` cpp
int func1(int b,int c = 0,int a = 10) {
	cout << "方式1" << endl;
	return 0;
}
int func2(int b = 100, int c = 0, int a = 100) {
	cout << "方式2" << endl;
}
int main() {
	func1(2);//正确 可选123
	func2(2);//正确, 可选0123
	return 0;
}
```

### 占位参数

实际操作中一般不用

用途就是区分不同函数

`int x ,int` 这种情况下调用时只能存在两个int值, 虽然第二个int值没有实际意义
`int x ,int=0,`当函数列表使用这种占位参数, 函数调用可以传两个参数也可以传一个参数

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

## 内联函数

> [宏函数](https://blog.csdn.net/bytxl/article/details/46007849)

``` cpp
#define MAX( a, b) ( (a) > (b) (a) : (b) )
　　把它用函数来实现：
　　int max( int a, int b){
　　return (a > b a : b)
　　}
```

为了避免负数传入时因为优先级造成的混乱,所以每一小块都要加括号；
参数类型没法作为参数传递给函数,但是可以把参数类型传递给带参的宏。

```cpp　
#define MALLOC（n, type） \
（ (type *) malloc（（n）* sizeof（type）））

``` 

> inline 函数,不用压栈出栈
> 当函数比较 简单 且需要多次使用时

内联函数由编译器处理,直接将编译后的函数体插入到函数体调用的地方
宏代码片段由预处理器处理,文本替换

### 限制:

* 里面不能有循环,
* 不能有过多判断语句
* 不能过于庞大

以牺牲代码空间为代价 ,提高程序的运行时间效率

## 函数重载

**参数个数,参数类型,参数顺序** ,
函数返回值*不是*构成函数重载的条件,

无法重载仅按照函数返回值区分的函数

函数名相同,参数列表不同,c++将其视为函数重载,不报错

这样就可以,同一个函数名,通过传入不同数量的参数,调用不同的函数块

重载时不要使用默认参数,避免编译器调用时出现函数冲突可以使用占位参数

调用时先严格匹配,后char转int这种进行匹配
都不能就调用失败

实际底层中重载的函数还是不同的名字,编译器翻译后函数加些参数类型后缀来区别这些重载函数

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

> 会这两就够了

## 类和对象

### 结构化程序设计:

程序=数据结构+算法

* 程序由全局变量以及众多相互调用的函数组成
* 算法以函数的形式实现,用于对数据结构进行操作
* 不足：不清楚某个数据结构到底有哪些函数可对其操作,函数的操作对象是什么,函数的相互调用,变量关系会越来越复杂,抽取重复代码会变得十分困难

### 面向对象程序设计

* 更清晰的调用重复函数,
* 方便扩充
* 清晰体现变量和函数的关系
* 面向对象程序设计 = 类+ 类 + 类... .

### 类

类：捆绑数据结构和相应的函数,（封装

编程时先考虑属性(成员变量)和可进行的操作(成员函数)

类定义的变量就叫做对象

一个对象存储空间等于所有成员变量空间和

*成员函数和类的定义可以分开写；*,类里面只声明一下有这个函数

基本用法

```cpp  
#include <iostream>
using namespace std; 
class man {
  public:

	//public下面定义的变量和函数,能够在类的内部外部访问
	char name[10] = { "HaHa" };
	int age=18;
	void pprint() {
		cout << name << endl;
		cout << age << endl;
	}

  private:

	  //在private下面定义的成员变量和方法只能在类的内部访问
	  //可封装的特性

}; 
///可以将一个函数弄到特有的class（类）里面,程序中的其他成员不能访问
int main() {

	man FW;//弄一个变量
	strcpy(FW.name,"fengwei");
	FW.pprint;//函数也为其中成员,用.访问
	return 0;

}

``` 

### 类的封装

第三种：protected,在单个类中与private一样

一个类的内部,默认的访问控制权限是private

一个结构体内部默认的访问控制权限是public

三个权限名字出现的顺序和次数没有限制

```cpp
//getter方法
int get_year(){
    return year;
}//在public里面添加类似语块就可以在函数外
//访问private里面year（内容）了
void set_year (int new_year){
    year=new_year;
}
```

> 可以在public下面添加从而在主函数里改变private的数据

## 面向对象编程案例练习

## 面向过程

eat(dog, shi); //过程驱动的一个行为

## 面向对象

eat.dog(shi); //目的对象驱动的一个行为

## 案例1：求圆的周长和面积

### 面向过程:

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
> class定义完成后要加分号；和结构体一样

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

so 有了面向对象后main函数就变得更加简洁了

private里面不能定义一个变量为另一个可更改的变量的计算结果

因为private里面一个变量更新时

只是一个变量的更新,其他private成员并不变动

## 圆的周长和面积多文件编写

### 操作方法：

在解决方案中新建一个空项目  
在项目里右键添加类；  
然后一个类对应一个.h和一个.cpp文件  
在源文件中再添加一个main.cpp  
完成后进入编写；  

.h里面

``` cpp
#pragma once
要声明一个类中所有的成员；
函数名,变量名；
头文件里面不能写函数实现,可以写函数声明
void setR(double r);
在circle.cpp里面实现函数的具体功能
 #include "Circle.h"
 void Circle::setR(double r){
    // Circle::写在函数名字前面
    m_r=r;
    //该怎么定义就怎么定义
}
...............
```

完成后共有三个文件

* circle.h

* circle.cpp

* main.cpp

前两个就是一个类,一个类对应两个文件写

把 `circle.h`  `#include` 到 `main` 里面就可以像一个cpp文件中一样正常使用这个类
(有模板类函数的实现在circle.cpp时,#include后缀改为hpp)

> 注意：在circle里面定义函数具体内容时要在函数名前加circle::

``` cpp
circle.cpp
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

``` cpp
circle.h
#pragma once
class circle
{
public:
	void setR(double r);
	double Get_area();
	void PRINT();
private:
	double m_r=0;
};
```

``` cpp
main.cpp
使用时注意使用类中成员函数后面的（）不要忘记了
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

## 案例2：立方体是否相等

### 面向对象写法：

> 下面写的三个get_m_h也可以用一个三个参数的函数来一次性get

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

## 案例3：计算点类是否在圆类内（圆内,圆上和圆外）

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

目的只是熟悉面向对象的语法规则；

作业

1.  简述函数的默认参数的声明规则。

从后往前才能使用,int a=100；

2. int func(int a, int b) 和 void func(int a, int b, int c) 是重载函数么？ 为什么？

是,因为参数的数量不同

3. 以下函数重载写法是否正确？ 为什么？

``` cpp
 int func(int a, int b) 和 int func(int a, int b, int c = 0
```

不正确,传入两个参数和传入三个参数时,编译器本应该都认为正确,
但编译器不能区分这两种写法,所以报错后把问题抛给人

4. 简述面向对象和面向过程的区别？

吃（🐕,shi）
🐕.chi（shi）
类的封装

5. 定义一个Point类, 属性包括点的坐标,提供计算两点之间距离的方法

   定义一个圆类,包括其属性和半径
   创建两个圆形对象,提示用户输入圆心坐标和半径,判断两个圆是否相交,并输出结果

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

6. 设计并测试一个名为Rect的矩形类,其属性为矩形的左下角与右下角两个坐标,根据坐标能计算出矩形的面积

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

7. 定义一个Tree类,有成员age（树龄）, 成员函数grow（int years）对ages加上years,age（）显示trees对象的ages值。

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

