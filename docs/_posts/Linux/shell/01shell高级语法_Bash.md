---
title: shell 高级语法 (bash)
date: 2021-09-03
tags:
  - shell 脚本
---
## expr 命令

`expr`命令用于求表达式的值，格式为：

### `expr` 表达式

表达式说明：

- 用空格隔开每一项
- 用反斜杠放在 shell 特定的字符前面（发现表达式运行错误时，可以试试转义）
- 对包含空格和其他特殊字符的字符串要用引号括起来
- `expr` 会在 `stdout` 中输出结果。如果为逻辑关系表达式，则结果为真，stdout 为 1，否则为 0。
- `expr` 的 `exit code`：如果为逻辑关系表达式，则结果为真，exit code 为 0，否则为 1。

### 字符串表达式

- `length STRING`
  返回 `STRING` 的长度
- `index STRING CHARSET`
  返回 `CHARSET` 中任意单个字符在 `STRING` 中最前面的字符位置，**下标从 1 开始**。如果在 `STRING` 中完全不存在 `CHARSET` 中的字符，则返回 0。
- `substr STRING POSITION LENGTH`
  返回 `STRING` 字符串中从 `POSITION` 开始，长度最大为 `LENGTH` 的子串。如果 `POSITION` 或 `LENGTH` 为负数，0 或非数值，则返回空字符串。

示例：

``` sh 
str="Hello World!"

echo `expr length "$str"`      # ``不是单引号，表示执行该命令，输出 12
echo `expr index "$str" aWd`   # 输出 7，下标从 1 开始
echo `expr substr "$str" 2 3`  # 输出 ell
```

### 整数表达式

`expr` 支持普通的算术操作，**算术表达式优先级低于字符串表达式，高于逻辑关系表达式。**

`+ -`
加减运算。两端参数会转换为整数，如果转换失败则报错。

`* / %`
乘，除，取模运算。两端参数会转换为整数，如果转换失败则报错。

`()` 可以提升优先级，但需要用反斜杠转义

示例：

``` sh 
a=3
b=4

echo `expr $a + $b`   # 输出 7
echo `expr $a - $b`   # 输出-1
echo `expr $a \* $b`  # 输出 12，*需要转义
echo `expr $a / $b`   # 输出 0，整除
echo `expr $a % $b`   # 输出 3
echo `expr \( $a + 1 \) \* \( $b + 1 \)`  # 输出 20，值为 (a + 1) * (b + 1)
```

### 逻辑关系表达式

- `|`
  如果第一个参数非空且非 0，则返回第一个参数的值，否则返回第二个参数的值，但要求第二个参数的值也是非空或非 0，否则返回 0。如果第一个参数是非空或非 0 时，不会计算第二个参数。
- `&`
  如果两个参数都非空且非 0，则返回第一个参数，否则返回 0。如果第一个参为 0 或为空，则不会计算第二个参数。
- `< <= = == != >= >`
  比较两端的参数，如果为 true，则返回 1，否则返回 0。”==”是”=”的同义词。”expr”首先尝试将两端参数转换为整数，并做算术比较，如果转换失败，则按字符集排序规则做字符比较。
- `()` 可以提升优先级，但需要用反斜杠转义

示例：

``` sh 
a=3
b=4

echo `expr $a \> $b`    # 输出 0，>需要转义
echo `expr $a '<' $b`   # 输出 1，也可以将特殊字符用引号引起来
echo `expr $a '>=' $b`  # 输出 0
echo `expr $a \<\= $b`  # 输出 1

c=0
d=5

echo `expr $c \& $d`  # 输出 0
echo `expr $a \& $b`  # 输出 3
echo `expr $c \| $d`  # 输出 5
echo `expr $a \| $b`  # 输出 3
```
## read 命令

`read` 命令用于从标准输入中读取单行数据。当读到文件结束符时，`exit code` 为 1，否则为 0。

参数说明

- -p: 后面可以接提示信息
- -t：后面跟秒数，定义输入字符的等待时间，超过等待时间后会自动忽略此命令

实例：

``` sh 
$ read name   # 读入 name 的值
fengwei2002   # 标准输入
$ echo $name  # 输出 name 的值
fengwei2002   #标准输出

$ read -p "请在 30 s 内输入你的姓名：" -t 30 name  # 读入 name 的值，等待时间 30 秒
请在 30 s 内输入你的姓名：fengwei2002  # 标准输入
$ echo $name  # 输出 name 的值
fengwei2002  # 标准输出
```

## echo 命令

`echo` 用于输出字符串。命令格式：

``` sh 
echo STRING
```

显示普通字符串

``` sh 
echo "Hello World"
echo Hello World  # 引号可以省略
```

显示转义字符

``` sh 
echo "\"Hello World\""  # 注意只能使用双引号，如果使用单引号，则不转义
echo \"Hello World\"  # 也可以省略双引号
```

显示变量

``` sh 
name=fengwei2002
echo "My name is $name"  # 输出 My name is fengwei2002
```

显示换行

``` sh 
echo -e "Hi\n"  # -e 开启转义
echo "12345678"
```

输出结果：

``` sh 
Hi

12345678
```

显示不换行

``` sh 
echo -e "Hi \c" # -e 开启转义 \c 不换行
echo "12345678"
```

输出结果：

`Hi 12345678`

显示结果定向至文件

``` sh 
echo "Hello World" > output.txt  # 将内容以覆盖的方式输出到 output.txt 中
```

原样输出字符串，不进行转义或取变量（用单引号）

``` sh 
name=acwing
echo '$name\"'
```

输出结果（单引号不使用变量）

`$name\"`
显示命令的执行结果

``` sh 
echo `date`
```

输出结果：

``` sh 
Fri Sep 3 17:48:05 CST 2021
```

## printf 命令

总所周知 printf 是用来输出文字的

printf 命令用于格式化输出，类似于 C/C++ 中的 printf 函数。

默认不会在字符串末尾添加换行符。

命令格式：

`printf format-string [arguments...]`
用法示例
脚本内容：

``` sh 
printf "%10d!\n" 123            # 占 10 位，右对齐
printf "%-10.2f!\n" 123.123321  # 占 10 位，保留 2 位小数，左对齐
printf "myNameIs%s\n" "fengwei2002"        # 格式化输出字符串
printf "%d * %d = %d\n"  2 3 `expr 2 \* 3` # 表达式的值作为参数
```

输出结果：

``` sh 
       123!
123.12    !
myNameIsfengwei2002
2 * 3 = 6
```

## test 命令

在命令行中输入 `man test`，可以查看 `test` 命令的用法。

**`test`命令用于判断文件类型，以及对变量做比较。**

`test` 命令用 `exit code` 返回结果，而不是使用 stdout。**0 表示真，非 0 表示假。**

例如：

``` sh 
test 2 -lt 3     # 为真，返回值为 0
echo $?          # 输出上个命令的返回值，输出 0
$ ls     # 列出当前目录下的所有文件
test.sh
$ test -e test.sh && echo "exist" || echo "Not exist"
exist   # test.sh 文件存在
$ test -e test2.sh && echo "exist" || echo "Not exist"
Not exist  # testh2.sh 文件不存在
```

### 逻辑运算符`&&`和`||`

&& 表示与，|| 表示或
二者具有短路原则：
expr1 && expr2：当 expr1 为假时，直接忽略 expr2
expr1 || expr2：当 expr1 为真时，直接忽略 expr2
**表达式的 exit code 为 0，表示真；为非零，表示假。（与 C/C++中的定义相反）**

---

### 文件类型判断

命令格式：

``` sh 
test -e filename  # 判断文件是否存在
```

测试参数	代表意义
-e	文件是否存在
-f	是否为文件
-d	是否为目录

### 文件权限判断

命令格式：

``` sh 
test -r filename  # 判断文件是否可读
```
测试参数	代表意义
-r	文件是否可读
-w	文件是否可写
-x	文件是否可执行
-s	是否为非空文件

### 整数间的比较

命令格式：

``` sh 
test $a -eq $b  # a 是否等于 b
```

测试参数	代表意义
-eq	a 是否等于 b
-ne	a 是否不等于 b
-gt	a 是否大于 b
-lt	a 是否小于 b
-ge	a 是否大于等于 b
-le	a 是否小于等于 b
### 字符串比较
测试参数	代表意义
test -z STRING	判断 STRING 是否为空，如果为空，则返回 true
test -n STRING	判断 STRING 是否非空，如果非空，则返回 true（-n 可以省略）
test str1 == str2	判断 str1 是否等于 str2
test str1 != str2	判断 str1 是否不等于 str2
### 多重条件判定
命令格式：

``` sh 
test -r filename -a -x filename
```

测试参数	代表意义
-a	两条件是否同时成立
-o	两条件是否至少一个成立
!	取反。如 test ! -x file，当 file 不可执行时，返回 true
## 判断符号`[]`
`[]`与 test 用法几乎一模一样，更常用于 if 语句中。另外`[[]]`是`[]`的加强版，支持的特性更多。

例如：

```
[ 2 -lt 3 ]  # 为真，返回值为 0
echo $?  # 输出上个命令的返回值，输出 0
~$ ls  # 列出当前目录下的所有文件
homework  output.txt  test.sh  tmp
~$ [ -e test.sh ] && echo "exist" || echo "Not exist"
exist  # test.sh 文件存在
~$ [ -e test2.sh ] && echo "exist" || echo "Not exist"
Not exist  # testh2.sh 文件不存在
```

注意：

`[]`内的每一项都要用空格隔开
中括号内的变量，最好用双引号括起来
中括号内的常数，最好用单或双引号括起来
例如：

``` sh
name="fengwei2002"
[ $name == "fengwei2002" ]  # 错误，等价于 [ fengwei2002 == "fengwei2002" ]，参数太多
[ "$name" == "fengwei2002" ]  # 正确
```

## exit 命令

exit 命令用来退出当前 shell 进程，并返回一个退出状态；使用 `$?` 可以接收这个退出状态。

exit 命令可以接受一个整数值作为参数，代表退出状态。如果不指定，默认状态值是 0。

exit 退出状态只能是一个介于 0~255 之间的整数，其中只有 0 表示成功，其它值都表示失败。

示例：

创建脚本 `test.sh`，内容如下：

``` sh
#! /bin/bash

if [ $# -ne 1 ]  # 如果传入参数个数等于 1，则正常退出；否则非正常退出。
then
    echo "arguments not valid"
    exit 1
else
    echo "arguments valid"
    exit 0
fi
```

执行该脚本：

``` sh
$ chmod +x test.sh 
$ ./test.sh acwing
arguments valid
acs@9e0ebfcd82d7:~$ echo $?  # 传入一个参数，则正常退出，exit code 为 0
0
acs@9e0ebfcd82d7:~$ ./test.sh 
arguments not valid
acs@9e0ebfcd82d7:~$ echo $?  # 传入参数个数不是 1，则非正常退出，exit code 为 1
1
```

## 文件重定向

每个进程默认打开 3 个文件描述符：

stdin 标准输入，从命令行读取数据，文件描述符为 0
stdout 标准输出，向命令行输出数据，文件描述符为 1
stderr 标准错误输出，向命令行输出数据，文件描述符为 2
可以用文件重定向将这三个文件重定向到其他文件中。

重定向命令列表
| 命令             | 说明                                      |
| ---------------- | ----------------------------------------- |
| command > file   | 将 stdout 重定向到 file 中                |
| command < file   | 将 stdin 重定向到 file 中                 |
| command >> file  | 将 stdout 以追加方式重定向到 file 中      |
| command n> file  | 将文件描述符 n 重定向到 file 中           |
| command n>> file | 将文件描述符 n 以追加方式重定向到 file 中 |
输入和输出重定向

``` sh
echo -e "Hello \c" > output.txt  # 将 stdout 重定向到 output.txt 中
echo "World" >> output.txt  # 将字符串追加到 output.txt 中

read str < output.txt  # 从 output.txt 中读取字符串

echo $str  # 输出结果：Hello World
```
同时重定向 stdin 和 stdout
创建 bash 脚本：

```  sh
#! /bin/bash

read a
read b

echo $(expr "$a" + "$b")
```

创建 input.txt，里面的内容为：

``` sh
3
4
```

执行命令：(把输入输出同时重定向)

``` sh
$ chmod +x test.sh  # 添加可执行权限
$ ./test.sh < input.txt > output.txt  # 从 input.txt 中读取内容，将输出写入 output.txt 中
$ cat output.txt  # 查看 output.txt 中的内容
7
```

## 引入外部脚本

类似于 C/C++中的 include 操作，bash 也可以引入其他文件中的代码。

语法格式：

`. filename`  # 注意点和文件名之间有一个空格

或

`source filename`
示例

创建 `test1.sh`，内容为：
```
#! /bin/bash

name=fw  # 定义变量 name
```

然后创建 `test2.sh`，内容为：
``` sh
#! /bin/bash

source test1.sh # 或 . test1.sh

echo My name is: $name  # 可以使用 test1.sh 中的变量
```

执行命令：
```
$ chmod +x test2.sh 
$ ./test2.sh # 注意 test2.sh 不需要执行权限，可以读就可以了 
My name is: fw 
```

