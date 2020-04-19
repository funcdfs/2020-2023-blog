---
date: 2020-01-22
title: 类的框架
category: basics
tags:
  - C++
---

#### Created: 2020-04-17 15:03:56

> 主要是熟悉作用域和语法，一个类应该具有构造函数，析构函数，对应深拷贝还应该使用 new 和 delete

C++ ：`int a(10)== int a=10;` 

## 构造函数

### 作用：

让成员变量在定义对象的同时拥有对应的初始值  

### 使用格式：
```cpp 
class classname {   
public:
  classname (int a,int b,int c){  
	this.parameter1=1;  this.parameter2=2;  this.parameter3=3;
  }//构造函数也是类中的一个函数
private:
  int parameter1;
  int parameter2;
  int parameter3;
}  
int main (){
	classname test(1,2,3);
}
```

### Tips

当调用构造时引用不同数量的参数，就会引用不同的构造函数（可重载）；
也可以手动重构无参数的构造函数；

``` cpp
test (){
    m_x=0;
}
test t3();//错
test t3;//对
```

编译器在定义类时会有一个默认的无参无内容的构造函数；
当存在具体指明构造参数时；默认构造就不复存在

> test(int a) 正确时
> test a；就不正确了

在构造函数中调用构造函数是危险的行为，无意义，是创建一个新对象，不是构造自己

不使用这种结构

``` cpp
class test{
    test (int a,int b,int c){
        ...
	}
    test (int a,int b){
        ...
        test (a,b,100);//产生匿名对象，结束后会被释放掉
}
```

在构造函数的参数列表中也可以使用默认参数和占位参数

``` cpp
public:
	test(int a,int b=10) {
		_a = a;
		_b = b;
		_c = a;
	}
```

## 析构函数

### 作用：

在一个对象消失前执行一次析构函数；用来处理一个对象作用域消失后，在生成对象过程中产生的内存垃圾；（提供处理接口，可以手动调用，一般不手动调用）

### 使用格式：

``` cpp
~test(){
    ....;
}
```

>手动调用时；析构函数会被执行两次；所以一般不会手动调用一个析构函数

### Tips

- 析构函数写在 public 权限下面  
- 析构函数不能拥有参数
- 每个类中也有一个默认的无参无内容析构
- 析构函数函数头只有一种写法

> 一系列对象析构函数的调用顺序跟构造函数调用顺序相反，谁先构造，谁后析构

## 拷贝构造函数

这是构造函数的另一种常见类型

### 功能

用和自己属于同一个类的其他对象来初始化当前对象的值（赋值）

### 使用格式

``` cpp
class test{
	test (const test &another){
    	this.m_x = another.m_x;
	}
}
int main (){
	test t1；
	test t2(t1);
	test t3;
	t3 = t1;//这个样子虽然也可以实现对应功能，但是调用的是赋值操作符函数（重载操作符），不是拷贝构造函数
}
```

### Tips

- 默认的拷贝构造函数就是这样的提供单纯的变量拷贝值操作；要是你自己规定了（例如添加了 cout 语句）；调用拷贝构造函数时默认的就不复存在

- 当一个对象作为一个函数的形参时，也会调用一次拷贝构造函数（可以不使用）

``` cpp
void test(test t){
    cout<<"......"<<endl;
}
test a; //初始化
test (a);//调用拷贝构造函数 将对象 a 的信息复制给匿名对象但是没使用
```

- 当一个对象作为函数返回值时，调用拷贝构造函数
``` cpp
test fun (){
    test t2;
    return t2;
}//匿名的对象 = t2；
```
所以 main 函数中使用这个语句块`fun()`；执行完成后会调用两次析构函数
```cpp
void test4(){
    fun();
    //返回一个匿名对象，当一个函数返回匿名对象的时候，
    // 函数 外部没有任何变量去接受它，这个匿名对象将不会再被使用
    //直接回收而不是等待函数块结束后再回收
}
```

- 匿名对象转正
``` cpp
void test 5(){
    test t=fun();
    printf ("EF");
}
```
该过程是，匿名对象等于 t2；然后将匿名对象转正为 t；
而不是调用两次拷贝构造函数；（再调用一次 t 的拷贝构造函数）

就是，printf 前一次析构（ t2 的析构）,printf 后用一次析构（ t 和 匿名对象的析构函数）

- 使用赋值操作符：

``` cpp
void test 6(){
    test t;//t 已经被初始化了
    t=fun(); //调用重载的赋值操作符；不调用析构函数实现匿名对象的转正过程
    printf ("EF");
}
```
- 在一种构造中调用另一种构造，一般不用：
``` cpp
test func (){
    cout<<“sdf”<<endl;
    test t1(10,20);
    t1.print();
    return t1;
}
```

## 深拷贝

当一个类中的成员变量中有指针类型时，用
`test t(t2);`（默认拷贝构造函数）
完成值拷贝的过程叫 浅拷贝

但释放指针指向的空间时，两个指针就会指向同一内存空间

释放一遍后第二次就会发生非法内存访问，浅拷贝就会使程序崩溃  

此时就需要手动开辟一个新的拷贝构造函数，来弄出来一个新的空间  

两个对象就每个去析构自己的空间，就不会有非法内存访问（这种方法就叫做深拷贝）

## 成员变量中存在对象

（常用）
需使用如下初始化方法

``` cpp
class A {
public:
	void printa() {
		cout << "a " << m_a<<" "<<m_b << endl;
	}
	A(int a, int b) {
		m_a = a;
		m_b = b;
	}
private:
	int m_a;
	int m_b;
};
class B {
public:
	B(A& a1, A& a2, int b) :test1(a1), test2(a2) {
		m_a = b; //将成员变量中的对象采用后加 : 的形式初始化
	} //而真正的构造函数函数体内只拥有非对象变量的初始化
	void printb() {
		cout << m_a << endl;
		test1.printa();
		test2.printa();
	}
private:
	int m_a;
	A test1;
	A test2;
};
```

`B(A& a1, A& a2, int b) :test1(a1), test2(a2) ` 

>初始化顺序是按照 B（）里面的参数顺序从前往后进行的初始化（一般先传入对象再传入变量）; 与后面 `：` 的构造函数调用顺序无关，`：` 后面叫做初始化列表

## new 和 delete

对象的动态建立的释放
> 功能：开空间

### **new 用法**

* 开辟单变量地址空间：  
   - `int *a ＝ new int `将一个 int 类型的地址赋值给整型指针 a．分配出一片大小为 sizeof(int) 字节的空间，起始地址赋值给 a
   - `int *a ＝ new int（5）`作用同上，但是同时将整数赋值为 5
* 开辟数组空间
  - P = new T[N]; T 为类型名，p 类型为 T* 的指针，N 数组元素个数，返回值为 T*
  -  int **a ＝ new int[5][6] 三维及其以上：依此类推．

### **delete 用法**

- int *a ＝ new int；  
  delete a； //释放单个 int 的空间
- int *a ＝ new int[5]；    
  delete [] a； //释放 int 数组空间

### **实例**

``` cpp
void cpptest(){
    int *p=new int;
    *p=10;
    if (P!=NULL){
        delete p;
        p=NULL;
    }
    char *c=new char;
    int *array_p=new int[10];
    for (int i=0;i<10;i++){
        array_p[i]=i+1;
        }
    if (array_p!=NULL){
        delete[] array_p;
        array_p=NULL ;
}
```
### 注意
- 要访问 new 所开辟的结构体空间，无法直接通过变量名进行，只能通过赋值的指针进行访问．
* new 出来的空间可以用 free
* malloc 出来的空间也可以用 delete
* 

### 与 malloc 的区别

- new 返回指定类型的指针，并且可以自动计算所需要大小； 而 malloc 则必须要由我们计算字节数，并且在返回后强行转换为实际类型的指针。 　　
- malloc 只管分配内存，并不能对所得的内存进行初始化，所以得到的一片新内存中，其值将是随机的。new 可以直接初始化内存空间
- malloc 与 free 是 C++/C 语言的标准库函数，new/delete 是 C++的运算符。它们都可用于申请动态内存和释放内存。

new 的功能更全面  
使用 `new` 初始化一个类的空间时可以用类的构造函数，无参构造不用写括号

``` cpp
test *tp=new test (10,20);//有参构造 
test *tp=new test ;//无参构造
```

free 不能触发一个对象毁灭时的析构

delete 可以  
delete 语法：

> delete[  ] array_p; 后面跟的就是 new 出来的地址

## static
静态成员变量和静态成员函数
`static int a=10；` 只定义一次 a  
`static void test (){},` 这个函数只能在本文件中使用  

静态成员变量的初始化写法，一定得在类的外面  
因为这个变量不属于任何一个对象，额外的储存空间

``` cpp
#include <iostream>
using namespace std;
class test {
public:
	//static 修饰的静态成员变量
	static int b;
	int getc() {
		b++;
		return b;
	}
private:
	int a;
};
int test::b = 100;
int main() {
	test a;
	test m;
	//类的对象共享的一个变量
	cout << a.getc() << " " << m.getc();
	return 0;
}//102;101      cout 从后开始计算，所以是 102 101     
```

因为在对象存在前，静态成员变量就已经存在  
所以访问时也可以直接通过类名访问

``` cpp
test::b=200；
```

若 static 成员变量属性为 private, 则使用的 get 函数也要加 static 前缀

``` cpp
class test {
public:
	static int &get() {
		return b;
	}
private:
	static int b;
	int a;
};
test a；
a.get()=212; 
test::get()=3251;//也可以
```

用途：n 个  BOX  共同高  
当一个学生为一个类时，可统计学生个数  
可统计学生总分数

``` cpp
#include <iostream>
using namespace std;
class BOX {
public:
	BOX(int a, int b) {
		len = a; width = b;
	}
private: 
	int len;
	int width;
	static int high;
};
int BOX::high = 10;
```

理解为属于类的一个全局变量
 
*函数和静态成员变量都不在任何对象的空间中*, 而普通成员变量例如 int 类型的就在对象的空间中

## 作业

1.  构造函数的种类，
    并举例说明。

  有参构造函数和无参构造函数

2.

``` cpp
class Test{ 
    public:
      Test(int a, int b)  {
          m_a = a;
          m_b = b;
      }        
      Test(Test &t) {
        cout<<“拷贝构造函数被执行”<<endl;
      }
      ~Test() {  
           cout<<“析构函数被执行” <<endl;
       }
      int m_a;
      int m_b; 
    }
  void main(void) {
     Test t1, t2;
     }
    说明 t1 和 t2 析构函数的执行顺序
```

先构造后析构，后构造先析构，所以先执行 t2 析构

3.   

``` cpp
void test1() {
	Test t1(1, 2); 
	Test t2(t1); 
      }
     分析 test1（）函数中 t1 和 t2 构造函数和析构函数调用情景。
```

1. 调用 t1 中的有参构造函数

2 调用 t2 有参构造函数

t2 析构，t1 析构

4.

``` cpp
 void test2() {
	Test t1(1, 2);
	Test t2 = t1;
    }
    分析 test2（）函数中 t1 和 t2 构造函数和析构函数调用情景。
```

调用 t1 对象中的有参构造函数
调用 t2 中的赋值操作符函数
析构 t2 析构 t1

5.  

``` cpp
void func(Test t) {
	cout << "func begin..." << endl;
	cout << "func end..." << endl;
   }
   void test3() {
	cout << "test3 begin..." << endl;
	Test t1(10, 20); 
	//调用 func 函数
	func(t1);
	cout << "test3 end..." << endl;
   }
   分析 test3（）函数和 func（）函数中的 构造函数和析构函数调用情景。
```

test 3：

调用 t1 构造函数

fun(t1); 

调用拷贝构造函数，cout 两次

析构匿名对象，析构 t1

cout  "test3 end... " 

6.

``` cpp
Test gg() {  
		cout << "gg() begin..." << endl;
		Test temp(100, 200); //局部变量
		cout << "gg() before return temp" << endl;
		return temp;
	}
	void test4(){
		cout << "test4 begin..." << endl;
		gg();
		cout << "test4 end..." << endl;
	}
   分析 test4（）函数和 gg（）函数中的 构造函数和析构函数调用情景。
```

test4：

调用 gg；

gg：

调用 temp 的构造函数

return temp；

析构匿名对象。析构 temp

cout << "test4 end... " << endl; 

7.

``` cpp
	Test gg() {  
		cout << "gg() begin..." << endl;
		Test temp(100, 200); //局部变量
		cout << "gg() before return temp" << endl;
		return temp;
	}
	void test5() {
		cout << "test5 begin ..." << endl;
		Test t1 = gg();	
		cout << "test5 end..." << endl;
 	}
    分析 test5（）函数和 gg（）函数中的 构造函数和析构函数调用情景。
```

gg：

调用 temp 构造函数；

return temp；

析构 temp

匿名对象转正为 t1；

cout << "test5 end... " << endl; 

析构 t1；

8. 	

``` cpp
Test gg() {  
		cout << "gg() begin..." << endl;
		Test temp(100, 200); //局部变量
		cout << "gg() before return temp" << endl;
		return temp;
	}
       void test6() {
		cout << "test6 begin..." << endl;
		Test t1;
		t1 = gg(); 
		cout << "test6 end..." << endl;
	}
       析 test6（）函数和 gg（）函数中的 构造函数和析构函数调用情景。
```

* 调用 t1 无参构造函数；
* 调用 gg 中 temp 有参构造函数
* return temp
* 析构 temp；
* 调用 t1 的赋值操作符函数将匿名对象赋值给 t1；
* 析构匿名对象
* cout << "test6 end... " << endl; 
* 析构 t1；

9.

简述类的默认拷贝构造函数深拷贝和浅拷贝的问题。
就是拷贝时如果成员中有指针

析构时会释放同一空间两次（浅拷贝）

再开辟一块空间，每个对象析构每个对象的空间（深拷贝）

10.

new 、 delete 和 malloc 和 free 的区别

new delete 会调用析构，其他无异

11.

static 修饰的类成员变量和成员函数的特点。  
如何初始化一个 static 修饰的成员变量。  
如何使用一个 static 修饰的成员函数？  
初始化在类的外面  

``` cpp
int 类：名字=21421；
类名：成员函数；
```
