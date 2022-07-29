---
title: KMP & 快速幂
date: 2021-09-12
tags:
  - 算法详解
---

## KMP 

`p[1, j] = p[i - j + 1, i]`

假设 next[i] 的值等于 j, 那么就表示从 i 开始往前的 j 个字符构成的字符串，和从 1 开始往后的 j 个字符的字符串是相等的

## 模板

next 数组名字叫做 ne 是为了防止与某些头文件的名字冲突

``` cpp
#include <iostream>
using namespace std;

const int N = 100010, M = 1000010;

int n, m;
int ne[N];
char s[M], p[N];

int main() {
    cin >> n >> p + 1 >> m >> s + 1;

    // KMP：求 next 数组的过程
    for (int i = 2, j = 0; i <= n; i++) {
        // 如果第一个字母失败了那么只可以从 0 开始， next[1] 不用算，所以 i 从 2 开始
        // j 从 0 开始
        // 只要没有移动到起点，并且当前位置不匹配，退而求其次
        while (j && p[i] != p[j + 1]) j = ne[j];
        // 成功之后 j 往后走一步
        if (p[i] == p[j + 1]) j++;
        // 求得的最后一个 j 的位置，就是可以移动到的最大位置，用 next[i] 记录 j 的值
        ne[i] = j;
    }

    // KMP 匹配过程： 根据 next 数组的值进行查找优化
    for (int i = 1, j = 0; i <= m; i++) {
        // s[i] 和 p[j + 1] 进行匹配，所以 j 往前错一位
        // 只要 j 没有退回到起点，并且当前的 s[i] 不能和下一个 j 的位置进行匹配的话
        // 就移动到 next[j] 的位置， 递归执行，每次可以移动一步，退无可退的时候就退出循环
        while (j && s[i] != p[j + 1]) j = ne[j]; 

        // 找到 s[i] 和 p[j + 1] 相等的位置了，j 向后移动一位
        if (s[i] == p[j + 1]) j++;

        // 如果匹配成功
        if (j == n) {
            // 输出匹配的起始位置
            printf("%d ", i - n + 1 - 1);
            // 匹配成功之后再往后退一步， 因为可能不止一个位置
            j = ne[j];
        }
    }

    return 0;
}
```

## 快速幂


快速幂：

快速的求出来 $a^k \mod \ p$ 的结果 

算法原理： 

预处理出来 $a^{2^0} \mod \ p$, $a^{2^1} \mod \ p$, $a^{2^2} \mod \ p$

一直到 $a^{2^{log_k}} \mod \ p$ 的结果

--- 

然后使用这个预处理得到的一系列值，得到 $a^{k} \mod \ p$ 的值

$$
a^k = a^{2^i} * a^{2^j} * a^{2^k} = a^{2^i + {2^j} + {2^k}}
$$

这一步只要将 $k$ 转换为 二进制即可

---

如何预处理？ 

---

反复平方法： 

后一个预处理的值是前一个预处理的值 乘 $a$ 

预处理之后，直接拆一下 $k$ 就可以了


```cpp
int qmi(int a, int k, int p) {
    int ans = 1;
    while (k) {
        if (k & 1) ans = (LL)ans * a % p;
        k >>= 1;
        a = (LL)a * a % p;
    }
    return ans;
}
```

在本题中

```cpp
class Solution {
public:
    double myPow(double x, int n) {
        typedef long long LL; 
        bool is_minus = n < 0; 
        double ans = 1; 
        for (LL k = abs(LL(n)); k; k >>= 1) {
            if (k & 1) ans = ans * x; 
            x = x * x; 
        } 
        
        if (is_minus) ans = 1 / ans; 
        return ans; 
    }
};
```