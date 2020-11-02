---
title: STL 中的 map
date: 2020-10-29
category: basics
tags:
  - C++
---

## STL 中 map 声明方法
 
```cpp
//头文件
#include<map>
map<int, string> ID_Name;
// 使用{}赋值是从 c++11 开始的，因此编译器版本过低时会报错，如 visual studio 2012
map<int, string> ID_Name = {
                { 2019, "Jim" },
                { 2020, "Tom" },
                { 2021, "Bob" } };
```
### 遍历map中所有数据的方法

- 使用迭代器遍历
```cpp
for(iter = mapStudent.begin(); iter != mapStudent.end(); iter++)  
  cout<<iter->first<<' '<<iter->second<<endl;  
}  
```
- 使用反向迭代器遍历
```cpp
for(iter = mapStudent.rbegin(); iter != mapStudent.rend(); iter++)  
  cout<<iter->first<<"  "<<iter->second<<endl;  
}  
```
- 使用数组的方法遍历
```cpp
#include <iostream>
#include <map>
#include <string>

using namespace std;

int main() {
    map<int, string> mapStudent;
    mapStudent.insert(pair<int, string>(1, "student_one"));
    mapStudent.insert(pair<int, string>(2, "student_two"));
    mapStudent.insert(pair<int, string>(3, "student_three"));
    int nSize = mapStudent.size();
    //此处应注意，应该是 for(int nindex = 1; nindex <= nSize; nindex++)
    //而不是 for(int nindex = 0; nindex < nSize; nindex++)
    for (int nindex = 1; nindex <= nSize; nindex++)
        cout << mapStudent[nindex] << endl;
}
```
输出结果：

![2020-10-30-11-14-57](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-10-30-11-14-57.png)
### 使用`[]`进行单个插入

```cpp
map<int, string> ID_Name;

// 如果已经存在键值 2015，则会作赋值修改操作，如果没有则插入
ID_Name[2015] = "Tom";
```

### 使用 insert 进行单个和多个插入

insert 共有 4 个重载函数：

```cpp
// 插入单个键值对，并返回插入位置和成功标志，插入位置已经存在值时，插入失败
pair<iterator,bool> insert (const value_type& val);

//在指定位置插入，在不同位置插入效率是不一样的，因为涉及到重排
iterator insert (const_iterator position, const value_type& val);

// 插入多个
void insert (InputIterator first, InputIterator last);

//c++11 开始支持，使用列表插入多个   
void insert (initializer_list<value_type> il);

```
下面是具体使用示例

```cpp
#include <iostream>
#include <map>

int main(){
    std::map<char, int> mymap;

    // 插入单个值
    mymap.insert(std::pair<char, int>('a', 100));//map 插入时以 pair 为单位
    mymap.insert(std::pair<char, int>('z', 200));
    //value_type 插入
    map<int, string> mapStudent;  
    mapStudent.insert(map<int, string>::value_type (1, "student_one"));  

    //返回插入位置以及是否插入成功
    std::pair<std::map<char, int>::iterator, bool> ret;//定义一个 pair，里面包含一个 map 迭代器和布尔型变量
    ret = mymap.insert(std::pair<char, int>('z', 500));//insert 的返回值就是迭代器加布尔类型的 pair 值
    if (ret.second == false) {
        std::cout << "element 'z' already existed";
    }

    //指定位置插入
    std::map<char, int>::iterator it = mymap.begin(); //初始化一个迭代器变量的方法
    mymap.insert(it, std::pair<char, int>('b', 300));  //效率更高
    mymap.insert(it, std::pair<char, int>('c', 400));  //效率非最高

    //范围多值插入
    std::map<char, int> anothermap;
    anothermap.insert(mymap.begin(), mymap.find('c'));
    //find 函数返回值也是一个迭代器，所以和 begin 作为同类型函数参数
    //功能：插入 mymap 从 begin 开始直到第一个字符 c 被发现的所有 pair 值

    // 列表形式插入
    anothermap.insert({ { 'd', 100 }, {'e', 200} });


    return 0;
}
```

用pair来获取是否插入成功

```cpp
mapStudent.insert(map<int, string>::value_type (1, "student_one"));
mapStudent.insert(map<int, string>::value_type (1, "student_two"));//插入失败

pair<map<int, string>::iterator, bool> Insert_Pair;
Insert_Pair = mapStudent.insert(map<int, string>::value_type (1, "student_one"));
```


###  取值
Map 中元素取值主要有 at 和 [ ] 两种操作，at 会作下标检查，而 [] 不会。

```cpp
map<int, string> ID_Name;
//ID_Name 中没有关键字 2016，使用 [] 取值会导致插入
//因此，下面语句不会报错，但打印结果为空
cout<<ID_Name[2020].c_str()<<endl; //调用 map 中字符串的方式
//使用 at 会进行关键字检查，因此下面语句会报错
ID_Name.at(2020) = "Bob";
```
### 容量查询

类似于 stl 中实现的其他数据结构，map 也有常用的成员函数
```cpp
// 查询关键字为 key 的元素的个数，在 map 里结果非 0 即 1
size_t count( const Key& key ) const; //返回值为 const
// 查询 map 是否为空
bool empty();
// 查询 map 中键值对的数量
size_t size();
// 查询 map 所能包含的最大键值对数量，和系统和应用库有关。
// 此外，这并不意味着用户一定可以存这么多，很可能还没达到就已经开辟内存失败了
size_t max_size();
```
###  迭代器

共有八个获取迭代器的函数：`begin`, `end`, `rbegin`,`rend` 以及对应的 `cbegin, cend, crbegin,crend`。

二者的区别在于，后者一定返回 const_iterator，而前者则根据 map 的类型返回 iterator 或者 const_iterator。const 情况下，不允许对值进行修改。如下面代码所示：

```cpp
map<int,int>::iterator it;//（一般只用 begin 和 end，其他位置的迭代器通过加减法得到）
map<int,int> mmap;
const map<int,int> const_mmap;

it = mmap.begin(); //iterator
mmap.cbegin(); //const_iterator

const_mmap.begin(); //const_iterator
const_mmap.cbegin(); //const_iterator
```
`mymap.find('c')` 得到的返回值也是迭代器

###  删除交换

根据迭代器删除和根据 key 值删除两种方式

```cpp
// 删除迭代器指向位置的键值对，并返回一个指向下一元素的迭代器
iterator erase( iterator pos )

// 删除一定范围内的元素，并返回一个指向下一元素的迭代器
iterator erase( const_iterator first, const_iterator last );

// 根据 Key 来进行删除， 返回删除的元素数量，在 map 里结果非 0 即 1
size_t erase( const key_type& key );

// 清空 map，清空后的 size 为 0
void clear();

// 就是两个 map 的内容互换,不是两个元素互换，是两个容器内容全部互换
void swap( map& other );
```

###  顺序比较

比较两个关键字在 map 中位置的先后

```cpp
key_compare key_comp() const;
```

示例：

```cpp
map<char,int> mymap;
map<char,int>::key_compare mycomp = mymap.key_comp();
//key_compare 出来一个变量，类似于迭代器得声明方式，使用时当作函数使用
mymap['a']=100;
mymap['b']=200;
mycomp('a', 'b');  // a 排在 b 前面，因此返回结果为 true
```

###  查找

```cpp
// 关键字查询，找到则返回指向该关键字的迭代器，否则返回指向 end 的迭代器
// 根据 map 的类型，返回的迭代器为 iterator 或者 const_iterator
iterator find (const key_type& k);
const_iterator find (const key_type& k) const;
```
find 方法
```cpp
std::map<char,int> mymap;
std::map<char,int>::iterator it;

mymap['a']=50;
mymap['b']=100;
mymap['c']=150;
mymap['d']=200;

it = mymap.find('b');
if (it != mymap.end())
    mymap.erase (it); // b 被成功删除
```

###  操作符

operator: == != < <= > >=
注意 对于== 运算符，只有键值对以及顺序完全相等才算成立。


### 结构体作为基本类型

map中的元素是自动按Key升序排序，所以不能对map用sort函数；当map中数据类型存在结构体时，需要重载小于号操作符

```cpp
typedef struct tagStudentinfo {
    int niD;
    string strName;
    bool operator<(tagStudentinfo const& _A)
        const {  //这个函数指定排序策略，按niD排序，如果niD相等的话，按strName排序
        if (niD < _A.niD)
            return true;
        if (niD == _A.niD)
            return strName.compare(_A.strName) < 0;
        return false;
    }
} Studentinfo, *PStudentinfo;  //学生信息
```


### 其他函数

```cpp
      begin()          返回指向map头部的迭代器
      clear(）         删除所有元素
      count()          返回指定元素出现的次数
      empty()          如果map为空则返回true
      end()            返回指向map末尾的迭代器
      equal_range()    返回特殊条目的迭代器对
      erase()          删除一个元素
      find()           查找一个元素
      get_allocator()  返回map的配置器
      insert()         插入元素
      key_comp()       返回比较元素key的函数
      lower_bound()    返回键值 >= 给定元素的第一个位置
      max_size()       返回可以容纳的最大元素个数
      rbegin()         返回一个指向map尾部的逆向迭代器
      rend()           返回一个指向map头部的逆向迭代器
      size()           返回map中元素的个数
      swap()            交换两个map
      upper_bound()     返回键值>给定元素的第一个位置
      value_comp()      返回比较元素value的函数
```