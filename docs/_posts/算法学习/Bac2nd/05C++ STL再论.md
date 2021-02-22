---
darft: true
title: 第五章-C++ STL再论
date: 2020-10-30
tags:
  - 算法竞赛入门经典（二）
---


>未整理 
<!-- more -->
> 算法竞赛入门经典二书摘
<!-- more -->
# C++STL在算法中的应用


## 5.1 从C到C++ 100
###  5.1.1 C++版框架 101
### 5.1.2 引用 102
### 5.1.3 字符串 103
### 5.1.4 再谈结构体 105
### 5.1.5 模板 106
## 5.2 STL初步 108
### 5.2.1 排序与检索 108

### 5.2.2 不定长数组:vector 109
### 5.2.3 集合:set 112

例题: 输入一串文本，按字典序从小到大输出，单词不区分大小写

- stringstream 的使用

### 5.2.4 映射:map 113

数组高级版

例题: 输入一些单词，找出满足以下条件的单词:该单词不能通过字母重排，得到输入文本中的另外一个单词
判断是否满足条件是，不区分大小写，输出相应单词时应保留输入中的大小写，按照字典序进行排列


```cpp
#include <algorithm>
#include <cctype>
#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

map<string, int> cnt;
vector<string> words;

// 将单词s进行“标准化”
string repr(string s) {
  string ans = s;
  for (int i = 0; i < ans.length(); i++)
    ans[i] = tolower(ans[i]);
  sort(ans.begin(), ans.end());
  return ans;
}  //转换为小写字母并且排序

int main() {
  int n = 0;
  string s;
  while (cin >> s) {
    if (s[0] == '#')
      break;
    words.push_back(s);
    string r = repr(s);
    //调用count函数后map中的数据也不会发生改变
    if (!cnt.count(r))
      cnt[r] = 0;//调用cnt[r]=0时，就将新的字符串放入到了cnt map中，进行了cnt相关初始化
    // map和set两种容器底层结构都是红黑树，所以容器中不会出现相同的元素，因此count的结果只能为0或者1
    //存在时 count 值为 1 ，不存在时为0，  同理，也可以使用 find 方法进行查找
    //当排序后的标准化字符串依然不出现在cnt中时，置为0，加加
    //当排序后的标准化字符串出现在cnt中时，除第一次置为0，其他相同字符串进行累加，还可以统计数量
    cnt[r]++;
  }
  vector<string> ans;
  //cnt 中字符串作为索引
  for (int i = 0; i < words.size(); i++)
    //使用map的数字区时就相当于使用vector的方法
    if (cnt[repr(words[i])] == 1)
      ans.push_back(words[i]);
  sort(ans.begin(), ans.end());
  for (int i = 0; i < ans.size(); i++)
    cout << ans[i] << "\n";
  return 0;
}
```
新字符串放入map中的方式就是
```cpp
if (!cnt.count(r))//cnt size==0
  cnt[r] = 0;     //执行完成后，cnt size==1
```

### 5.2.5 栈、队列与优先队列 115

用 push 和 pop 操作进行插入和删除

用top 去栈顶元素

例题:
集合栈计算机


### 5.2.6 测试STL 120
## 5.3 应用:大整数类 123
### 5.3.1 大整数类BigInteger 124
### 5.3.2 四则运算 125
### 5.3.3 比较运算符 126
### 5.4 竞赛题目举例 127
### 5.5 习题 134