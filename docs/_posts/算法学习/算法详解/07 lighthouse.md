---
title: lighthouse
date: 2020-11-20
tags:
  - 算法详解
---

> 描述 :海上有许多灯塔，为过路船只照明。
<!-- more -->

![2020-11-20-09-29-15](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-20-09-29-15.png)
（图一）
如图一所示，每个灯塔都配有一盏探照灯，照亮其东北、西南两个对顶的直角区域。探照灯的功率之大，足以覆盖任何距离。灯塔本身是如此之小，可以假定它们不会彼此遮挡。
![2020-11-20-09-29-46](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-20-09-29-46.png)
（图二）
若灯塔A、B均在对方的照亮范围内，则称它们能够照亮彼此。比如在图二的实例中，蓝、红灯塔可照亮彼此，蓝、绿灯塔则不是，红、绿灯塔也不是。
现在，对于任何一组给定的灯塔，请计算出其中有多少对灯塔能够照亮彼此。

灯塔(LightHouse)

输入
共n+1行。
第1行为1个整数n，表示灯塔的总数。
第2到n+1行每行包含2个整数x, y，分别表示各灯塔的横、纵坐标。

输出
1个整数，表示可照亮彼此的灯塔对的数量。

Example
Input
3
2 2
4 3
5 1
Output
1
## 思路

观察后发现只要横纵坐标都存在小于关系就可以构成一对数据

使用vector

```cpp
#include <iostream>
#include <vector>
using namespace std;
int find(vector<vector<int>>& light) {
  int ans = 0;
  for (size_t i = 0; i < light.size(); i++)
    for (size_t j = 0; j < light.size(); j++)
      if (light.at(i).at(0) < light.at(j).at(0) &&
          light.at(i).at(1) < light.at(j).at(1))
        ans++;
  return ans;
}

int main() {
  size_t sum_for_light = 0;
  cin >> sum_for_light;
  vector<vector<int>> light(sum_for_light, vector<int>(2, 0));
  int x = 0, y = 0;
  for (size_t i = 0; i < sum_for_light; i++) {
    cin >> x >> y;
    light.at(i).at(0) = x;
    light.at(i).at(1) = y;
  }
  cout << find(light);
  return 0;
}
```
## 二维数组

清华oj中不允许使用STL，所以使用二维数组改写


```cpp
#include <iostream>
using namespace std;
int find(int** light, size_t length) {
    int ans = 0;
    for (size_t i = 0; i < length; i++)
        for (size_t j = 0; j < length; j++)
            if (light[i][0] < light[j][0] && light[i][1] < light[j][1])
                ans++;
    return ans;
}

int main() {
    size_t sum_for_light = 0;
    cin >> sum_for_light;
    int** light = new int*[sum_for_light];
    for (size_t i = 0; i < sum_for_light; i++) {
        light[i] = new int[2];
    }
    int x = 0;
    int y = 0;
    for (size_t i = 0; i < sum_for_light; i++) {
        cin >> x >> y;
        light[i][0] = x;
        light[i][1] = y;
    }
    cout << find(light, sum_for_light);
    delete[] light;
    return 0;
}
```

int类型不足以覆盖全部数据，所以改用longlongint

```cpp
#include <iostream>
using namespace std;
int find(long long int** light, long long int length) {
    int ans = 0;
    for (long long int i = 0; i < length; i++)
        for (long long int j = 0; j < length; j++)
            if (light[i][0] < light[j][0] && light[i][1] < light[j][1])
                ans++;
    return ans;
}

int main() {
    long long int sum_for_light = 0;
    cin >> sum_for_light;
    long long int** light = new long long int*[sum_for_light];
    for (long long int i = 0; i < sum_for_light; i++) {
        light[i] = new long long int[2];
    }
    long long int x = 0;
    long long int y = 0;
    for (long long int i = 0; i < sum_for_light; i++) {
        cin >> x >> y;
        light[i][0] = x;
        light[i][1] = y;
    }
    cout << find(light, sum_for_light);
    delete[] light;
    return 0;
}
```

![2020-11-23-10-39-20](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-23-10-39-20.png)

![2020-11-23-10-41-15](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-23-10-41-15.png)

## 方法改进

所以数据不过的原因是因为$o(n^2)$时间复杂度的运算超时，而不是算法的问题

