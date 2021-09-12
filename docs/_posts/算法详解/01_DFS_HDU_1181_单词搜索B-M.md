---
title: DFS HDU 1181 B－M
date: 2020-02-22
tags:
  - DFS
---

# [HDU1181](http://acm.hdu.edu.cn/showproblem.php?pid=1181)

::: tip 题意:就像单词接龙一样　
输入一串无序的字符串数组 （以 "0" 结尾） , 每个字符串都有首元素和尾元素, 搜索输入的字符串数组中是否存在可以 首尾相连构成 'b'开头 'm'结尾的一串
:::

> 注意是输入一串**无序**的字符串数组

>还有题目的这句话:**测试数据有多组**。**每组有多行**, 每行一个单词, 仅包括小写字母, 


![20200330093859](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200330093859.png)

样本输入 1:
```sh
bww
bff
bgggg
wwyy
ffrr
ggdd
ddm
0
```
那么正确的一串就应该是 `bgggg-ggdd-ddm`

样本输入 2:

```sh
bccc
bad
com
ddd
cac
caccc
0
```
那么正确的一串就应该是 `bccc-com`
这也是为什么遍历过的元素要标记一次以后就不进行遍历的原因；要么就`cac-cac-cac`$\cdots$

因为每个字符串就遍历一次后扔掉, 所以复杂度就是$O(n)$


### 对于一组数据

``` cpp
#include<iostream>
using namespace std;
const int maxn = 10001;
string input[maxn];
int mark[maxn] = {0};
int flag = -1;

void dfs(int a);
int main() {
	int count = 0;
	for (int i = 0;; i++) { //执行读入操作
		cin >> input[i];
		count++;
		if (input[i] == "0") {
			break;
		}
	}

	for (int i = 0; i < count; i++) { //将所有 b 开头的都进行一次搜索
		if (input[i][0] == 'b') {
			mark[i] = 1;
			dfs(i); //将 b 开头的字符串信息传入
		}
	}

	if (flag == 1)cout << "Yes." << endl;
	else cout << "No." << endl;
	return 0;
}

void dfs(int a) { //找到所有首字母==b 开头字符串的尾字母 的字符串, 将他们标记后并为他们执行 DFS
	if (input[a].back() == 'm') { flag = 1; return; }
	if (input[a] == "0") return;  //递归函数的两种结束方式

	for (int i = 0; ; i++) {
		if (input[i] == "0") break; //分循环退出的条件
		if (input[i][0] == input[a].back()) { //搜到一个首字母和 input[a].back() 相同的, 
			if (!mark[i]) {                  //并且之前没有被遍历过的字符串
				mark[i] = 1; //新字符串更新标记
				dfs(i);  //将新的字符串再进行 DFS
			}
		}
	}
}
```


### 对于多组数据

![20200330110945](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200330110945.png)

```cpp
#include<iostream>
#include<memory.h>
using namespace std;
const int maxn = 100;
string input[maxn];
int mark[maxn] = { 0 };
int flag = -1;

void dfs(int a);
int main() {
	int count = 0;
	while (cin >> input[count]) {
		if (input[count++] == "0") {
			for (int i = 0; i < count; i++) { //将所有 b 开头的都进行一次搜索
				if (input[i][0] == 'b') {
					mark[i] = 1;
					dfs(i); //将 b 开头的字符串信息传入
				}
			}
			if (flag == 1)cout << "Yes." << endl; //判断
			else cout << "No." << endl;

			for (int i = 0; i < maxn; i++) //重置所有信息
				input[i] = { "" };
			memset(mark, 0, sizeof(mark));
			flag = -1;
			count = 0;
		}
	}
	return 0;
}

void dfs(int a) { //找到所有首字母==b 开头字符串的尾字母 的字符串, 将他们标记后并为他们执行 DFS
	if (input[a].back() == 'm') { flag = 1; return; }
	if (input[a] == "0") return;  //递归函数的两种结束方式

	for (int i = 0; ; i++) {
		if (input[i] == "0") break; //分循环退出的条件
		if (input[i][0] == input[a].back()) { //搜到一个首字母和 input[a].back() 相同的, 
			if (!mark[i]) {                  //并且之前没有被遍历过的字符串
				mark[i] = 1; //新字符串更新标记
				dfs(i);  //将新的字符串再进行 DFS
			}
		}
	}
}
```