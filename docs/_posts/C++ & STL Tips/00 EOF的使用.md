---
title: EOF 的使用
date: 2020-11-04
tags:
  - C++ 
--- 
> 处理多组数据

<!-- more -->
在 oj 中通常会遇到循环输入数据的题目

例如：
输入两个数字，输出他们的和

要求：
输入数据有多组，每组占一行，由两个整数 x，y 组成

```cpp
#include <stdio.h>
#include <stdlib.h>
int main(void){
	int a,b;
	while(scanf("%d %d",&a,&b) != EOF){
		printf("%d\n",a+b);
	}
	return 0;
}
```

在上面这段代码中，定义了两个整型的变量，通过在 while 循环中判断输入的返回值是否为 EOF（即-1）然后打印 a+b 的值。

跑一下上面这个代码：
```cpp
1 2 回车
3
3 4 回车
7
7 8 回车
15
```

这样的话，就是每次输入两个数字，输出两个数字的和，一直运行不会结束
linux 中使用 ctrl+c 结束一个命令行终端，在 windows 下使用 ctrl+z 或者 ctrl+c 即可结束程序的运行
在招新题目中的 H 题即使用 scnaf+EOF 进行循环输入，
在算法题目中经常会遇到类似 n 组数据的输入，c 语言使用这种方法实现

最后看一下 EOF 的官方解释：
计算机术语，缩写通常为 EOF（End Of File），在操作系统中表示资料源无更多的资料可读取。资料源通常称为档案或串流。在 C 语言中，或更精确地说成 C 标准函式库中表示文件结束符（end of file）。在 while 循环中以 EOF 作为文件结束标志，这种以 EOF 作为文件结束标志的文件，必须是文本文件。在文本文件中，数据都是以字符的 ASCII 代码值的形式存放。我们知道，ASCII 代码值的范围是 0~255，不可能出现 -1，因此可以用 EOF 作为文件结束标志。

## `~`

~运算的定义把内存中的 0 和 1 全部取反，
所以~运算时要格外小心，你需要注意整数类型有没符号，
如果~的对象是无符号整数（不能表示负数），那么他的值就是它与它的上界限的之差，因为无符号类型的数是用 0000 到 FFFF 依次表示的。
