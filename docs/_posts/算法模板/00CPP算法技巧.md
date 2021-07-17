---
title: C++ 算法技巧
date: 2021-07-17
tags:
    - 算法模板
---

> 写算法题的时候有很多神奇操作，如果不常用的话，用的时候就会忘记那种最方便最快的写法，没理由舍弃更加优美的代码
> 所以想把很多日月积累的cpp在算法中的应用方法记下来，以便熟练运用

## 读 char 使用 %s

为了防止题目给出的数据结尾多一个空格或者回车
那么正确的逻辑代码页不能 AC，用 %s 读字符就不会存在这个问题，%s 会自动跳过

``` cpp
char op[2];
int a, b;
scanf("%s%d%d", op, &a, &b);
if (*op == 'M')
p[find(a)] = find(b);
```

## 常量值的选取

``` cpp
const int N = 1e6 + 10;
const int N = 100010;
```

## 常用宏定义

``` cpp
typedef long long LL;
typedef unsigned long long ULL;

#define LL long long
#define FastIO               \
    ios::sync_with_stdio(0); \
    cin.tie(0);              \
    cout.tie(0);
#define PB push_back
```

## 声明变量

int 尽量使用逗号开空间

不赋值比赋值快10ms

## 位运算相关

``` cpp 
int s = x >> i & 1;
```

## 数据精度相关

浮点数二分： r - l > 1e-8 数据要求 -6， 多开两位精度防止出错

## 美化代码

使用逗号操作符使代码更加美观
合理使用 ++和 ++使代码更加美观

## puts("");

## 十六进制

``` cpp 
int null = 0x3f3f3f3f;
```

## 字符串加速操作

if (!strcmp(op, "I")) 更快， 相比于 string == “  efwefwe”

## memset

``` cpp 
 memset(h, 0x3f, sizeof h);
```

