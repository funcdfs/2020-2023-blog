---
title: golang string VS []byte 
date: 2022-03-19
tags:
    - Go
---

TODO 

在[leetcode 第 281 场周赛](https://leetcode-cn.com/contest/weekly-contest-281/)中的[第三题](https://leetcode-cn.com/problems/construct-string-with-repeat-limit/)，使用 golang 的玩家不约而同的使用了 byte 数组[实现解题过程](https://leetcode-cn.com/problems/construct-string-with-repeat-limit/solution/lc2182-fengwei2002-by-konng0120-cm2r/)

但是我一般都是 string 直接写的，CPP 中的写法

所以分析一下 golang 中 `string` 和 `[]byte` 的区别和联系



---

string 和 `[]byte` 是不同的数据类型，但是他们可以相互转换


将 byte 数组转换为一个字符串会得到一个字符串，这个字符串中的连续字节是 slice 中的元素

将 string 转换为一个 byte 数组会得到一个 byte 切片，这个切片中的每一个元素是字符串中的字节

字符串实际上只是**只读的字节切片**，并带有语言的一些额外语法的支持 


## 分情况使用

首先，string 是不可变的，因此他们可以被程序共享，并且亦可以保证他们不会被修改 

字节切片可以修改，支持修改数组中的内容 

所以如果想要频繁的使用一个可以修改的字符串，应该使用 byte 数组而不是 string 类型 




`[]byte` 事实上是这样存储的


``` go 
type slice struct {
    data uintptr
    len  int 
    cap  int 
}
```

string 是这样的 


``` go 
type string struct {
    data uintptr
    len  int 
}
```



参考：
- [[]byte vs string in Go](https://syslog.ravelin.com/byte-vs-string-in-go-d645b67ca7ff)





















输出结果举例：
``` go 
bb := []byte{'h','e','l','l','o',127}
ss := string(bb)
fmt.Println(ss)
// hello lack of 127 
```

reason: The character value 127 (ASCII DEL) is part of the string. However it does not render as a character (here). Look at the length of the string (it will be 6) to verify this character is included, even if not shown. (A number of other characters codes, eg those below 32, will also not be rendered as characters in a standard console.)

