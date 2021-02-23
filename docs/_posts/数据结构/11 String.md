---
title: String
draft: true
tags:
  - 数据结构
--- 

>未整理 
<!-- more -->
## string类:

之所以抛弃char*的字符串而选用C++标准程序库中的string类,是因为他和前者比较起来,不必担心内存是否足够、字符串长度等等,而且作为一个泛型类出现,他集成的操作函数足以完成我们大多数情况下(甚至是100%)的需要。我们可以用 = 进行赋值操作,== 进行比较,+ 做串联（是不是很简单?）。我们尽可以把它看成是C++的基本数据类型。

使用 vs 编辑 string 类时,会有参数类型自动提醒功能,输入函数名后就🆗

### string对象的初始化:

声明一个字符串变量很简单:

    string Str;

这样我们就声明了一个字符串变量,但既然是一个类,就有构造函数和析构函数。上面的声明没有传入参数,所以就直接使用了string的默认的构造函数,这个函数所作的就是把Str初始化为一个空字符串。String类的构造函数和析构函数如下:
a) `string s;` //生成一个空字符串s
b) `string s(str)` //拷贝构造函数 生成str的复制品
c) `string s(str,stridx)` //将字符串str内“始于位置stridx”的部分当作字符串的初值
d) `string s(str,stridx,strlen)` //将字符串str内“始于stridx且长度顶多strlen”的部分作为字符串的初值
e) `string s(cstr)` //将C字符串作为s的初值
f) `string s(chars,chars_len)` //将C字符串前chars_len个字符作为字符串s的初值。
g) `string s(num,c)` //生成一个字符串,包含num个c字符
h) `string s(beg,end)` //以区间beg; end(不包含end)内的字符作为字符串s的初值
i) `s.~string()` //销毁所有字符,释放内存

### 成员函数 `s.length();`  `getline()` 

string 类支持流读取运算符  
string 还支持 `getline()函数` 

在 `<string>` 中的 `getline` 函数有四种重载形式:  

istream& getline (istream&  is, string& str, char delim); 
istream& getline (istream&& is, string& str, char delim); 
istream& getline (istream&  is, string& str); 
istream& getline (istream&& is, string& str); 

函数的变量:  
is    :表示一个输入流,例如cin。  
str   :string类型的引用,用来存储输入流中的流信息。  
delim :char类型的变量,所设置的截断字符；在不自定义设置的情况下,遇到’\n’,则终止输入。  

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
成员函数at会有越界范围检查,会抛出越界异常提醒,下标运算符 [ ] 没有越界范围检查
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
//下标为三开始,s1.size()个字符,如果字符串中没有足够字符,则复制  
//到字符串的最后一个字符
```

### == > >= < <= !=

返回值都为bool类型,成立为true ,否则为false
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

`rfind();` 逆序查找,但都是返回查找字符串第一次出现的首字母的地址

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

iterator insert(iterator it, char c);//在it处插入字符c,返回插入后迭代器的位置

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

# 第十一章 字符串

主要研究数据结构在算法中的应用

定义:
$\qquad$由字符组成的长度有限的序列, 
相对于一般数据类型, 串的特征明显:字符种类不多, 但串长远远大于组成其本身的种类（例如英文文章, DNA,RNA, 二进制）, 所以对这种特征的数据发明了一些算法

约定空串为任何串的子串、前缀、后缀

## (a)ADT

以下是一个串应有的 ADT:

- `Length()` 返回长度
- `charAt(i)` 返回字符
- `substr(i,k)` 子串
- `prefix(k)` 前缀
- `suffix(k)` 后缀
- `concat(T)` 连接
- `equal(T)` 判等
- `indexof(P)` 判断是否存在子串在大字符串中存在

## (b1) 串匹配

最主要的就是串匹配问题:

- 是否出现 `detection`
- ==出现在哪== `location`  
- 出现了几次 `counting`
- 他们分别在哪 `enumeration`

## (b2) 蛮力匹配

> 掌握这种低效率算法可以为后续算法的改进提供起点和参照

思路:
$\qquad$自左向右, 以字符为单位, 依次向右匹配；匹配失配时, 模式串右移到下一个匹配位置, 在从首字符开始匹配, 等效于文本串不动, 模式串向右移动到下一个字符对齐位置, 开始匹配。

### 版本一:

```cpp {6}
int match(char * P, char * T) { 
    size_t n = strlen(T), i = 0;//文本串与模式串接受比对的那一组字符, i j
    size_t m = strlen(P), j = 0;//j 为模式串受比对字符
    while(j < m && i < n)       //自左向右比对
        if( T[i] == P[j] ) { i++; j++}  //匹配转到下一个字符
        else { i = i - (j - 1) ; j = 0} //否则模式串字符复位到 0, 主串 i 复位
    return i - j;               //j=m 时返回 i -j 就在这个位置发生了匹配 
}                               //如果 i 越界, i=n,j<m,i-j>n-m, 返回给调用者就可以判断是否匹配
```

>复位过程举例:
```cpp
1011 j = 2
1001001001011 i = 2- (2-1) = 1 即主串右移一个单位
```

### 更利于理解的版本二:

```cpp
int match(char * P, char * T) { 
    size_t n = strlen(T), i = 0; 
    size_t m = strlen(P), j = 0;
    for(i = 0; i < n - m + 1; i++){ //防止越界
        for(j = 0; j < m; j++)
            if ( T[i+j] != P[j]) break; //不匹配退出
        if ( m <= j) break;//==即完全匹配, <即为不匹配
    }
    return i;
}
```

> 通过这个程序我发现并不是所有的程序都需要 flag 变量, 多种情况可以由不同条件的 break 和 return 返回不同的循环变量供调用者参考

## KMP 算法:

一共由三十多种算法可以用来查找子字符串的问题, $KMP$ 算法保证了最坏情况也能在线性时间完成

因为在此前参与过比对的字符, 在之后的比对中还会大量出现

主字符串会有一部分已经比对的字符和待比对字符串相等, 我们**已经掌握前一部分的全部信息--每个字符是什么, 但是我们没有利用这个关系**

所以就想着不匹配时省略一部分字符, 开始新的匹配

## KMP 使用`next[]`

> 7.5.3

**next[] 表的含义以及原理:**

$\qquad$首先, 要了解两个概念:"前缀"和"后缀"。 "前缀"指除了最后一个字符以外, 一个字符串的全部头部组合；"后缀"指除了第一个字符以外, 一个字符串的全部尾部组合。next 表选取最大值（保证位移量最小）

PMT:[部分匹配表 `(Partial Match Table)`]: 中的值是字符串的前缀集合与后缀集合的交集中最长元素的长度。

![20200406155519](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200406155519.png)

$\qquad$解释清楚这个表是什么之后, 我们再来看如何使用这个表来加速字符串的查找, 以及这样用的道理是什么。
$\qquad$如图 1.12 所示, 要在主字符串"ababababca"中查找模式字符串"abababca"。如果在 j 处字符不匹配, 那么由于前边所说的模式字符串 PMT 的性质, 主字符串中 i 指针之前的 PMT[j −1] 位就一定与模式字符串的第 0 位至第 PMT[j−1] 位是相同的。这是因为主字符串在 i 位失配, 也就意味着主字符串从 i−j 到 i 这一段是与模式字符串的 0 到 j 这一段是完全相同的。而我们上面也解释了, 模式字符串从 0 到 j−1 , 在这个例子中就是”ababab”, 其前缀集合与后缀集合的交集的最长元素为”abab”,  长度为 4。所以就可以断言, 主字符串中 i 指针之前的 4 位一定与模式字符串的第 0 位至第 4 位是相同的, 即长度为 4 的后缀与前缀相同。

这样一来, 我们就可以将前缀的这些字符段的比较省略掉。具体的做法是, 保持 i 指针不动, 然后将 j 指针指向模式字符串的 PMT[j −1] 位即可。

简言之, 以图中的例子来说, 在 i 处失配, 那么主字符串和模式字符串的前边 6 位就是相同的。又因为模式字符串的前 6 位, 它的前 4 位前缀和后 4 位后缀是相同的, 所以我们推知主字符串 i 之前的 4 位和模式字符串开头的 4 位是相同的。就是图中的灰色部分。那这部分就不用再比较了。

![20200406103358](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200406103358.png)

$\qquad$有了上面的思路, 我们就可以使用 PMT 加速字符串的查找了。**我们看到如果是在 j 位 失配, 那么影响 j 指针回溯的位置的其实是第 j −1 位的 PMT 值**, 所以为了编程的方便,  我们不直接使用 PMT 数组, 而是将 PMT 数组向右偏移一位。我们把新得到的这个数组称为 next 数组。下面给出根据 next 数组进行字符串匹配加速的字符串匹配程序。其中要注意的一个技巧是, 在把 PMT 进行向右偏移时, 第 0 位的值, 我们将其设成了-1, 这只是为了编程的方便, 在如何构造中讨论。在例子中, next 数组如下表所示。

![20200406102609](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200406102609.png)

```cpp
int KMP(char * t, char * p) {
	int i = 0; //文本串指针
	int j = 0;//模式串指针
	while (i < strlen(t) && j < strlen(p)){
		if (j == -1 || t[i] == p[j]) {
			i++;
           	j++;
		}
	 	else 
           	j = next[j]; //不修改变量 i, 模式串右移；
    }
    if (j == strlen(p))
       return i - j;
    else 
       return -1;
}
```

> 设置哨兵在算法中是常用方法, 可以使算法易于理解并且方便使用
## KMP 构造 `next[]`
![4796975714855FA7132D3C32750E1BE1](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/4796975714855FA7132D3C32750E1BE1.jpg)

将可能出现 `P[0,t)==P[j-t,j)`中所有的 t 值收集为一个集合, 那么只有集合中的 t 才可以代替不匹配位置, 继续进行比对操作

理解 -1:想象一个 -1 放在左侧哨兵位置:等效于一个与所有字符都通配的字符, 当模式串第一项也不能与主串匹配时, 就跳转到通配符, 通配符会进入 if 判断句, 然后 ++i, ++j, 就等同于跳过了一个与首字符不匹配的字符

$\qquad$知道如何使用 `next[]` 后, 快速构建 `next` 数组, 是 KMP 算法的精髓所在, 核心思想是“**P 自己与自己做匹配**”。

`next[]`的定义为最大自匹配的真前缀和真后缀的长度

故`next[j + 1] <= next[j] + 1`, 数值上任何一项相比于前一项至多增长一个单位

特别的, 当且仅当 `P[j]==P[next[j]]` 时取等号

当继任者与`P[j]`不相等时:

![7DFEEFBBCD7C58E87184BD118ECB6F0D](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/7DFEEFBBCD7C58E87184BD118ECB6F0D.jpg)

采用递推的方式来求解不匹配对应值:

**直到遇到当前不匹配字符与一部分前缀的末字符相等的替代者**, 就在前缀长度对应的`next[j]`上加一作为自己的`next[j]`的值

当不匹配字符和模式串第一个单字符还不匹配时, 就用哨兵作为通配符和不匹配字符进行匹配, 将这个值对应的next置为0:`next[j + 1] = -1 + 1 == 0`, 等同于跳过这个值。

>递推实例:

***

1. `next[1]` 对应的首字符无前缀, 所以与通配符-1进行比较,进入if判断得到 `next[1]==0`,（这里发现第一个字符用的是next[1]的值, next[0]为假想的哨兵）

2. 第二项字符(j==1)前缀只有a字符, 与当前字符b不匹配, 往前寻找执行j=next[1]==0,第0项与第一项还不匹配, 寻求到next[0]通配符-1, -1+1=0,将next[2]对应的值变为0

![20200406160911](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200406160911.png)

3. 第三项(j==2)开始的原因是通配符匹配了b, 所以用首字符a来匹配第三项, 发现匹配, 在next[2]上累加1得到next[3]=1

![20200406161140](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200406161140.png)

4. (j==3)发现相同, 继续累加1

![20200406161258](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200406161258.png)

5. (j==4)发现相同, 继续累加1
6. (j==5)发现相同, 继续累加1

![20200406161226](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200406161226.png)

7. 直到第7项时(j==6)发生对应字符不匹配, 执行 6=next[6],由第一步的规律得到next[6]为前六个字符的最大自匹配的串长, 为4, 现在就是 j = 4, 再将c与模式串的[4]进行比对, 发现仍然不匹配, 执行j=next[4]==2, 将模式串的[2]与c字符相比仍然不匹配, 执行j=next[2]==0,首字母比对仍然不同, 寻求到通配符-1, `-1+1==0`, 进入if, next[7]置为0, 继续考察下一项

![20200406161422](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200406161422.png)

8. ……

代码实现:
```cpp
int * buildNext(char * p){
    int * next = new int [m]
	next[0] = -1;//-1 为 next 表头
	int i = 0, j = -1;//i 仍然是主字符串, j 为模式串

	while (i < strlen(p)){ //执行模式串长度次
		if (j == -1 || p[i] == p[j]){
			++i; //发现可以匹配的字符, 可以立即得到next表得下一项, 累进一个单位
			++j;
			next[i] = j;
        }
		else
			j = next[j];//不相等时, 更新next表向, 最坏情况直到-1+1==0结束
	}
}
```

KMP 在最坏的情况也不会超过$O(n)$

发生不匹配时, 读取模式串中不匹配字符对应的 `next[j]` 对应值, 将模式串对应下标的字符与主串中不匹配字符对齐

等效于:模式串聪明的跳过了一部分不可能发生匹配的字符

## KMP-算法:再改进

例如:

 | 0   | 0   | 0   | 0   | 0   | 0   | 0   | 0   | 1   |
 | --- | --- | --- | --- | --- | --- | --- | --- | --- |
 | 0   | 0   | 0   | 0   | 1   |
 | -1  | 0   | 1   | 2   | 3   |

> 7.9.1

遇到上面这种情况下的性能表现不佳, （执行过程比蛮力算法还慢一点）

所以将next表的设计优化如下:（碰到石头就不让相同的鸡蛋继续碰石头）

 | 0   | 0   | 0   | 0   | 0   | 0   | 0   | 0   | 1   |
 | --- | --- | --- | --- | --- | --- | --- | --- | --- |
 | 0   | 0   | 0   | 0   | 1   |
 | -1  | 0   | 0   | 0   | 3   |

代码实现:
```cpp {8}
int * buildNext( char * P) {
    size_t m = strlen(P),j=0;
    int * N = new int[m];
    int t = N[0] = -1; //完成通配符的设置
    while ( m - 1 > j ){ //KMP 循环
        if ( 0 > t || P[j] == P[t] ){
            j++;t++;
            N[j] = P[j] != P[t] ? t : N[t];//若替换字符和之前的字符不相等, 正常实现, 若替换字符仍然和之前的一个字符相等
        }                                  //, 那么就用之前的next表值直接赋值与相等的next值
        else //失配
            t = N[t];
    }
    return N;
}
```

KMP相比于蛮力算法的优化图:

![5E5E9C38BE7FBB602EC23FABE3619FCA](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/5E5E9C38BE7FBB602EC23FABE3619FCA.jpg)

只有字符集种类非常小时, KMP算法的优化才会优势明显

## BM-bad-character

判断相等和不等的时间成本不同, 

局部:若干次成功, 终止与一次失败
整体:多次失败, 至多一次的成功

减少整体上的多次失败便可以优化蛮力算法

KMP也是利用这种思路

### 前轻后重:

每次比对成功的概率远远小于失败的概率, 所以我们更有可能获得教训, 而不是经验

![1BBFA35ED13F2A85158D5CBE56832AB3](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/1BBFA35ED13F2A85158D5CBE56832AB3.jpg)

就前后相同概率出现的教训的价值来看, 前面的教训可以帮我们排除三个不必要的比对, 而后面的教训便可以省去很多没必要的比对

所以相比而言后面的教训价值更大

模式串中越靠后的字符对算法优化的效率越大

所以我们以终为始, 自后向前, 自右向左进行比对 

![A191C2F2C33E77CE67DBE979635CFD75](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/A191C2F2C33E77CE67DBE979635CFD75.jpg)

比对了8次

bad-character:从后面开始的比对模式串中第一个不匹配的字符就叫做坏字符

存在多个候选时, 我们应该选取模式串中的靠后者, 从而减少位移量, 不出现时, 完整移过模式串长度



## BM_BC 算法:构造 bc[]


```cpp
int * buildBC (char * P) {
    int *bc = new int [256];
    for (size_t j=0;j<256;j++)
        bc[j]=-1;//初始化
    for(size_t m=strlen(p),j=0;j<m;j++)//自左向右
        bc[P[j]]=j;
    return bc;
}
```

## BM_GS 算法:构造 gs 表
## Karp-Rabin 算法:串即是数
## Karp-Rabin 算法:散列

2020-04-03-21:33 基础
2020-04-06-21:01 KMP