---
title: C++ new 的用法
date: 2020-09-07
tags:
  - C++
---

> C++ 关键字 new 的用法总结

<!-- more -->

通常来说，当在局部函数中 new 出一段新的空间，该段空间在局部函数调用结束后**仍然能**够使用，可以用来向主函数传递参数。另外需要注意的是，new 的使用格式，new 出来的是一段空间的首地址。所以一般需要用指针来存放这段地址。需要手动 delete

## new 的基础使用

```cpp
//开辟一个空间后直接赋值，一般不用，因为数据类型一般都有默认的声明方式
int *p = new int(3);

//如果一个变量不想使用 *p 的方式来使用
//那么可以定义一个变量，在 new 之前用 “*” 表示 new 出来的内容
int q = *new int;
q = 1; //——————就可以正常使用了

//当 new 一个数组时，同样用一个指针接住数组的首地址，开辟空间后使用 for 循环赋值
int *q = new int[3]; //开辟 3 个 int 的空间
``` 

## new 对结构体数组的使用

``` cpp
//student 中含有两个私有变量 name 和 sorce
student *stlist = new student[3]{{"abc", 90}, {"bac", 78}, {"ccd", 93}};
```

## new 对二维数组的使用

``` cpp
//使用 new 开辟二维数组，一种是需要先开辟行，再开辟列
int **p = new int*[m]; //开辟行
	for(int i = 0; i < m; i++)
		p[i] = new int[n]; //开辟列  可以直接 [][] 访问。但是内存不连续，不是很推荐使用，除非 M\N 都不确定

//删除 new 出来的二维数组：
for (int j = 0; j < M; j++){
    delete[]pNum[j];//删除尾指针
}
delete[]pNum;//删除头指针

//开辟二维数组的第二种方法

//内存连续，但是不能使用 [][]，可以通过 [i * n + j] 来计算
//这种是 1 维数组转化为 2 维数组
int *a = new int[M * N];
// a[i*n+j] 是 a[i][j]，使用不是很方便，但是实际空间中内存连续
delete[] a;

//开辟二维数组的第三种方法

//内存不连续，可以直接 delete
//如果你确实知道 N 是多少，那么可以用这种，
int (*pNum)[N] = new  int[M][N];
delete[] pNum;
```
## 使用 new 在 vector 中应用数组算法模板

无脑怼就完事

``` cpp
class Solution {
   public:
    void quick_sort(int q[], int l, int r) {
        if (l >= r) return;
        int i = l - 1;
        int j = r + 1;
        int x = q[(l + r) >> 1];

        while (i < j) {
            do i++;
            while (q[i] < x);
            do j--;
            while (q[j] > x);
            if (i < j) swap(q[i], q[j]);
        }
        quick_sort(q, l, j);
        quick_sort(q, j + 1, r);  //熟记一种边界情况， qlj|qj+1r
    }
    void sortColors(vector<int> &nums) {
        int a = nums.size();
        int *array = new int[a];
        for (int i = 0; i < nums.size(); i++) {
            array[i] = nums.at(i);
        }
        quick_sort(array, 0, nums.size() - 1);
        for (int i = 0; i < nums.size(); i++) {
            nums.at(i) = array[i];
        }
        delete[] array;
    }
};
```