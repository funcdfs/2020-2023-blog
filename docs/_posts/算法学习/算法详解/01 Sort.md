---
title: 排序算法
category: Algorithm
tags:
  - VI Al
---


# 排序算法



## bool类型的冒泡排序,很巧妙

``` cpp
void BubbleSort(int score[], int n) {
	//12345  12 23 34 45 i=0---23 34 45 i=1
	int i, j, temp;
	for (i = 0; i < n - 1; i++) {
	//大循环n-1次,表示冒了几个泡；执行到n-2的那个元素
		for (j = 1; j < n - i; j++) {
		//每一个小循环执行n-i-1次,从1开始,所以j<n-i
			if (score[j] < score[j - 1]) {
				temp = score[j];
				score[j] = score[j - 1];
				score[j - 1] = temp;
			}//冒泡排序即比较后交换相邻元素
		}
	}
}
```

## 选择排序
## 桶排序
## 计数排序
## 归并排序
## 快速排序
