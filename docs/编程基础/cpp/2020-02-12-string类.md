---
title: string类
--- 

## string类:

之所以抛弃char*的字符串而选用C++标准程序库中的string类，是因为他和前者比较起来，不必担心内存是否足够、字符串长度等等，而且作为一个泛型类出现，他集成的操作函数足以完成我们大多数情况下(甚至是100%)的需要。我们可以用 = 进行赋值操作，== 进行比较，+ 做串联（是不是很简单?）。我们尽可以把它看成是C++的基本数据类型。

使用 vs 编辑 string 类时，会有参数类型自动提醒功能，输入函数名后就🆗

### string对象的初始化:

声明一个字符串变量很简单：

    string Str;

这样我们就声明了一个字符串变量，但既然是一个类，就有构造函数和析构函数。上面的声明没有传入参数，所以就直接使用了string的默认的构造函数，这个函数所作的就是把Str初始化为一个空字符串。String类的构造函数和析构函数如下：
a) `string s;` //生成一个空字符串s
b) `string s(str)` //拷贝构造函数 生成str的复制品
c) `string s(str,stridx)` //将字符串str内“始于位置stridx”的部分当作字符串的初值
d) `string s(str,stridx,strlen)` //将字符串str内“始于stridx且长度顶多strlen”的部分作为字符串的初值
e) `string s(cstr)` //将C字符串作为s的初值
f) `string s(chars,chars_len)` //将C字符串前chars_len个字符作为字符串s的初值。
g) `string s(num,c)` //生成一个字符串，包含num个c字符
h) `string s(beg,end)` //以区间beg; end(不包含end)内的字符作为字符串s的初值
i) `s.~string()` //销毁所有字符，释放内存

### 成员函数 `s.length();`  `getline()` 

string 类支持流读取运算符  
string 还支持 `getline()函数` 

在 `<string>` 中的 `getline` 函数有四种重载形式：  

istream& getline (istream&  is, string& str, char delim); 
istream& getline (istream&& is, string& str, char delim); 
istream& getline (istream&  is, string& str); 
istream& getline (istream&& is, string& str); 

函数的变量：  
is    ：表示一个输入流，例如cin。  
str   ：string类型的引用，用来存储输入流中的流信息。  
delim ：char类型的变量，所设置的截断字符；在不自定义设置的情况下，遇到’\n’，则终止输入。  

``` cpp
#include<iostream>
using namespace std;
#include<string.h>
int main() {
	string s1 = "qwert";
	cout << s1.length() << endl;;
	cin >> s1;
	cout << s1.length();
	return 0;
}
```

### string的赋值与连接

`string s1("cat"),s2;` 
可以使用=赋值两个不同字符串 `s2=s1` 
也用 `assign` 成员函数对字符串赋值, 可以实现部分赋值

``` cpp
string s1("catpig"),s3;
s3.assign(s1,1,3);
//从s1中下标为1的字符开始复制3个字符给s3;
```

`string` 里面的at成员函数 和 []

``` cpp
成员函数at会有越界范围检查,会抛出越界异常提醒，下标运算符 [ ] 没有越界范围检查
for (int i=0;i<s.length();i++){
    cout<<s.at(i)<<endl;
}
```

字符串可以实现+=操作  

### 连接字符串

成员函数 `append();` 

``` cpp
string s1("Good"),S2("morning");
s1.append(s2);
cout<<s1;
s2.append(s1,3,s1.size());//s1.size();s1的字符数
//下标为三开始，s1.size()个字符，如果字符串中没有足够字符，则复制  
//到字符串的最后一个字符
```

### == > >= < <= !=

返回值都为bool类型，成立为true ，否则为false
成员函数 `compare()` 
可以挑其中的一部分进行比较

``` cpp
int f4=s1.compare(1,2,s3,0,3);//s1 1-2,s3 0-end;
int f5=s1.compare(0,s1,size(),s3);
```

### 成员函数substr(), (常用)

输出子串

``` cpp
string s1("Hello World"),s2;
s2=s1.substr(4,5);//下标开始五个字符
cout<<s2<<endl;
```

o wor

### 交换string

成员函数 `swap()` ; 

### 寻找string中的字符

`find();` 可以规定从哪里开始寻找
返回下标或者string::npos; 

``` cpp
string s1("fengwei");
s1.find("wei");
```

`rfind();` 逆序查找，但都是返回查找字符串第一次出现的首字母的地址

``` cpp
string s1("fengwei");
s1.find("wei");
```

`find_first_of()` 
`find_last_of()` 

> 寻找子字符串中的任何一个字符出现的第一个地址

`find_first_not_of()` 

> 寻找不是字符串中的任何一个字符出现的第一个地址

### 删除string中的字符 erase()

``` cpp
string s1("fengwei bulihai");
s1.erase(7,3);
```

erase方法原型
`basic_string & erase(size_type pos=0, size_type n=npos);` 
从给定起始位置pos处开始删除, 要删除字符的长度为n, 返回值修改后的string对象引用

`iterator erase(const_iterator position)` 
删除迭代器位置处的单个字符, 并返回下个元素的迭代器

`iterator erase(const_iterator first, const_iterator last)` 
删除迭代器[first, last)区间的所有字符, 返回一个指向被删除的最后一个元素的下一个字符的迭代器.

补充  
除了erase方法用于删除 `string` 中的元素, `void pop_back();` 方法也可以用来删除元素, 但是只能删除 `string` 的最后一个元素

### 替换string中的字符

成员函数 `replace()` 

``` cpp
string s1("hello world");;
s1.replace(2,3,"haha");
cout<<s1;
//将s1中下标为2开始的共三个字符换为haha共四个字符
s1.replace(2,3,"haha",1,2);
//将s1中下标为2开始的三个字符换为haha中下标为1开始的两个字符
```

### 在string中插入字符

成员函数 `insert()` 

``` cpp
string &insert(int p0, const char *s);——在p0位置插入字符串s

string &insert(int p0, const char *s, int n);——在p0位置插入字符串s的前n个字符

string &insert(int p0,const string &s);——在p0位置插入字符串s

string &insert(int p0,const string &s, int pos, int n);——在p0位置插入字符串s从pos开始的连续n个字符

string &insert(int p0, int n, char c);//在p0处插入n个字符c

iterator insert(iterator it, char c);//在it处插入字符c，返回插入后迭代器的位置

void insert(iterator it, const_iterator first, const_iteratorlast);//在it处插入从first开始至last-1的所有字符

void insert(iterator it, int n, char c);//在it处插入n个字符c 插入单个字符时使用这个
```

### 转 `char*` 

使用 `c_str` 适应传统需求

![Screenshot_20200214_164800.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureScreenshot_20200214_164800.jpg)

成员函数 `data()` 

![Screenshot_20200214_164746.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureScreenshot_20200214_164746.jpg)

### 字符串拷贝函数

成员函数 `copy()` 

![Screenshot_20200214_164707.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureScreenshot_20200214_164707.jpg)

### 字符串流处理

![Screenshot_20200214_164623.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureScreenshot_20200214_164623.jpg)

![Screenshot_20200214_164648.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureScreenshot_20200214_164648.jpg)

![Screenshot_20200214_164718.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/pictureScreenshot_20200214_164718.jpg)

:: :: dangers STOP 
test 
:: ::