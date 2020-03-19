---
layout: post
title: 第三章：数组和字符串
tags: [算法竞赛入门经典]
date: 2020-03-07
---

***
数组之间不能相互赋值；要copy一份数据时；例如要从数组 a 复制 k 个元素到数组 b ；可以： `memcpy(b,a,sizeof(int)*k)` ； `memcpy(b,a,sizeof(double)*k)` 

> 使用memcpy函数时需要 string.h 头文件 要将 a 全部复制到数组 b 时可以`memcpy(b, a, sizeof(a) ).

## 开灯问题：  

* n 盏灯；第一个人把所有灯打开；第二人按下编号为 2 的倍数的灯 第三人按下编号为3的倍数的开关 一共 k 个人；输出最终亮着的灯 
* `memset(a,0,sizeof(a))` 的作用是把数组a清零，它也在string.h中定义，虽然也能用for循环完成相同的任务
* 另一个技巧在于输出；为了避免输出多余空格；设置了一个标记变量first；可以表示当前要输出的变量是否为第一个；第一个变量前不应该存在空格；其他变量前都应该存在
* 习题解析：P 39

``` cpp
#include<iostream>
#include<string.h>
using namespace std;
int main () {
    int n ,k;
    cin>>n>>k;
    bool *p = new bool[n];
    memset(p,0,sizeof(p));
    for (int j = 1; j <= k; j++){
        for (int i = 0; i<n; i++) {
            if ( (i+1) % j == 0){
                p[i] = !p[i];  //每次置为相反值
            }
        }
    }
    for (int i = 0; i < n; i++){ //输出
        if ( p[i] ){
            bool first = false; 
            if (i == 0) first = true;
            if (first == false ) cout<<' '; //控制空格输出
            cout<< i+1 ; //将灯序号输出
        }
    }
    delete [] p; 
    return 0;
}
```

> 待测试

### 蛇形填数

* 在 nxn方阵里面填入 1, 2, ... nxn ; 要求填充为蛇形（从右上角开始一直到方阵内部）
* n<=8

``` cpp
#include<iostream>
using namespace std;
int main () {
    //初始化
    int n = 0;
    cin >> n;
    int *double_int new[n][n];
    //逻辑 began from double_int[0][n-1]
    int m=1;
    for (int i = n-1; i>=0;i--){
        for (int j = 0; j<n; j++){
            double_int[j][i] = [m++]; // 初始化最右面的一列数字
        }
    }
    //double_int[n-1][n-2]->double_int[n-1][0]
    //输出
    for (int i=0;i<n;i++){
        for (int j=0;j<n;j++){
            cout<<double_int[i][j]<<' '
        }
        cout<<endl;
    }
    delete [] double_int;
    return 0;
}
```

