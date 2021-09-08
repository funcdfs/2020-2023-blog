---
title: shell 基础语法 (bash)
date: 2021-09-01
tags:
  - shell 脚本
---

## 执行

新建一个 `test.sh` 脚本文件

``` sh 
#! /bin/bash
echo "helloWorld!";
```

`#! /bin/bash` 前缀标识使用的 shell 语言

`ls -l test.sh` 查看文件权限，发现默认创建的 sh 文件

```  sh
chmod +x test.sh # 使脚本具有可执行权限
./test.sh   #在当前目录下执行写好的这个脚本
# 当然也可以在任意目录使用绝对路径进行脚本的执行
```

### 用解释器执行：

``` sh 
bash test.sh
```

## 注释

每行的 # 之后的内容都是注释内容

多行注释：
格式：

``` sh 
:<<EOF
第一行注释
第二行注释
第三行注释
EOF
```

其中 EOF 可以换成其它任意字符串。例如：

``` sh 
:<<abc
第一行注释
第二行注释
第三行注释
abc

:<<!
第一行注释
第二行注释
第三行注释
!
```

## 变量 

### 定义变量

定义变量，不需要加`$`符号，例如：

```
name1='fw'  # 单引号定义字符串
name2="fw"  # 双引号定义字符串
name3=fw    # 也可以不加引号，同样表示字符串
```

### 使用变量

使用变量，需要加上`$`符号，或者`${}`符号。花括号是可选的，主要为了帮助解释器识别变量边界。一般使用变量的同时都加上那一个花括号

``` 
name=fw
echo $name  # 输出 fw
echo ${name}  # 输出 fw
echo ${name}hhh  # 输出 fwhhh
```

### 只读变量

使用 `readonly + 变量名` 或者 `declare -r + 变量名` 可以将变量变为只读。

``` 
name=fw
readonly name
declare -r name  # 两种写法均可
```

声明时候使用 `name=abc`  # 会报错，因为此时 name 只读

### 删除变量

unset 可以删除变量（删除变量的内容）

``` 
name=fw
unset name
echo $name  # 输出空行
```

### 变量类型

自定义变量（局部变量）
子进程不能访问的变量
环境变量（全局变量）
子进程可以访问的变量

自定义变量改成环境变量：

``` sh 
$ name=fw  # 定义变量
$ export name  # 第一种方法
$ declare -x name  # 第二种方法
```

环境变量改为自定义变量：

``` sh 
$ export name=fw  # 定义环境变量
$ declare +x name  # 改为自定义变量
```

### 字符串

字符串可以用单引号，也可以用双引号，也可以不用引号。

单引号与双引号的区别：

单引号中的内容会原样输出，不会执行、不会取变量；（习惯使用单引号，防止意外结果的表达）
双引号中的内容可以执行、可以取变量；

`name=fw  # 不用引号`

``` sh 
echo 'hello, $name \"hh\"'  # 单引号字符串，输出 hello, $name \"hh\"
echo "hello, $name \"hh\""  # 双引号字符串，输出 hello, fw "hh"
```

### 获取字符串长度

`${#string}` 代表 string 的长度
 
``` sh 
name="fw"
echo ${#name}  # 输出 2
提取子串

name="hello, fw"
echo ${name:0:5}  # 提取从 0 开始的 5 个字符
```

## 默认变量

文件参数变量
在执行 shell 脚本时，可以向脚本传递参数。`$1`是第一个参数，`$2`是第二个参数，以此类推。特殊的，`$0`是文件名（包含路径）（是一种很常见的参数写法）。例如：

创建文件 `test.sh`

``` sh 
#! /bin/bash

echo "文件名："$0
echo "第一个参数："$1
echo "第二个参数："$2
echo "第三个参数："$3
echo "第四个参数："$4
```

然后执行该脚本：

``` sh 
chmod +x test.sh 
./test.sh 1 2 3 4
```

``` sh 
文件名：./test.sh
第一个参数：1
第二个参数：2
第三个参数：3
第四个参数：4
```

### 其他参数相关的变量

![20210903170646-2021-09-03-17-06-49](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20210903170646-2021-09-03-17-06-49.png)

::: showmore
![其他参数相关的变量。png](https://cdn.acwing.com/media/article/image/2021/09/03/101476_236a312e0c-其他参数相关的变量。png)
:::

## 数组

数组中可以存放多个不同类型的值，只支持一维数组，初始化时不需要指明数组大小。
数组下标从 0 开始。

### 定义

数组用小括号表示，元素之间用空格隔开。例如：

`array=(1 abc "def" fw)`

也可以直接定义数组中某个元素的值：（C++ 写法）

``` sh 
array[0]=1
array[1]=abc
array[2]="def"
array[3]=fw
```

### 读取数组中某个元素的值

格式：

`${array[index]}`
例如：

``` sh 
array=(1 abc "def" fw)
echo ${array[0]}
echo ${array[1]}
echo ${array[2]}
echo ${array[3]}
```

### 读取整个数组

格式：（一般使用 `array[*]`）因为正则表达式中的通配符就是 `*`

``` sh 
${array[@]}  # 第一种写法
${array[*]}  # 第二种写法
```

例如：

``` sh 
array=(1 abc "def" fw)
echo ${array[@]}  # 第一种写法
echo ${array[*]}  # 第二种写法
```

### 读取数组长度

类似于字符串

``` sh 
${#array[@]}  # 第一种写法
${#array[*]}  # 第二种写法
```

例如：

``` sh 
array=(1 abc "def" fw)

echo ${#array[@]}  # 第一种写法
echo ${#array[*]}  # 第二种写法
```

## if…then 语句

类似于 C/C++中的 if-else 语句。

单层 if
命令格式：

``` sh
if condition
then
    语句 1
    语句 2
    ...
fi
```

示例：

a=3
b=4

```  sh
if [ "$a" -lt "$b" ] && [ "$a" -gt 2 ]
then
    echo ${a}在范围内
fi
```

输出结果：

`3 在范围内`

### 单层 if-else

命令格式

```  sh
if condition
then
    语句 1
    语句 2
    ...
else
    语句 1
    语句 2
    ...
fi
```

示例：

``` sh
a=3
b=4

if ! [ "$a" -lt "$b" ]
then
    echo ${a}不小于${b}
else
    echo ${a}小于${b}
fi
```

输出结果：

``` sh
3 小于 4
```

### 多层 if-elif-elif-else

命令格式

``` sh
if condition
then
    语句 1
    语句 2
    ...
elif condition
then
    语句 1
    语句 2
    ...
elif condition
then
    语句 1
    语句 2
else
    语句 1
    语句 2
    ...
fi
```

示例：

``` sh
a=4

if [ $a -eq 1 ]
then
    echo ${a}等于 1
elif [ $a -eq 2 ]
then
    echo ${a}等于 2
elif [ $a -eq 3 ]
then
    echo ${a}等于 3
else
    echo 其他
fi
```

输出结果：

``` sh
其他
```
### case…esac 形式

类似于 C/C++中的 switch 语句。

命令格式

``` sh
case $变量名称 in
    值 1)
        语句 1
        语句 2
        ...
        ;;  # 类似于 C/C++中的 break
    值 2)
        语句 1
        语句 2
        ...
        ;;
    *)  # 类似于 C/C++中的 default
        语句 1
        语句 2
        ...
        ;;
esac
```

示例：

``` sh
a=4

case $a in
    1)
        echo ${a}等于 1
        ;;  
    2)
        echo ${a}等于 2
        ;;  
    3)                                                
        echo ${a}等于 3
        ;;  
    *)
        echo 其他
        ;;  
esac
```

输出结果：

``` sh
其他
```

## for…in…do…done

命令格式：

``` sh
for var in val1 val2 val3
do
    语句 1
    语句 2
    ...
done
```

示例 1，输出 a 2 cc，每个元素一行：

``` sh
for i in a 2 cc
do
    echo $i
done
```

示例 2，输出当前路径下的所有文件名，每个文件名一行：

``` sh
for file in `ls`
do
    echo $file
done
```

示例 3，输出 1-10

``` sh
for i in $(seq 1 10)
do
    echo $i
done # seq 只支持数字，不支持字母
```

示例 4，使用{1..10} 或者 {a..z}

``` sh
for i in `{a..z}`
do
    echo $i
done
for ((…;…;…)) do…done
```

命令格式：（和 c++ 中的括号写法一样，并且）

``` sh
for ((expression; condition; expression))
do
    语句 1
    语句 2
done
```

示例，输出 1-10，每个数占一行：

``` sh 
for ((i=1; i<=10; i++))
do
    echo $i
done
```

### while…do…done 循环

命令格式：

``` sh
while condition
do
    语句 1
    语句 2
    ...
done
```

示例，文件结束符为 Ctrl+d，输入文件结束符后 read 指令返回 false。

``` sh
while read name
do
    echo $name
done
```

### until…do…done 循环（和 while 的逻辑相反）

当条件为真时结束。

命令格式：

``` sh
until condition
do
    语句 1
    语句 2
    ...
done
```

示例，当用户输入 yes 或者 YES 时结束，否则一直等待读入。

``` sh
until [ "${word}" == "yes" ] || [ "${word}" == "YES" ]
do
    read -p "Please input yes/YES to stop this program: " word
done
```

### break 命令

跳出当前一层循环，注意与 C/C++ 不同的是：break 不能跳出 case 语句。

示例：

``` sh
while read name
do
    for ((i = 1; i <= 10; i++))
    do 
        case $i in
            8)
                break
                ;;
            *)
                echo $i
                ;;
        esac
    done
done
```

该示例每读入非 EOF 的字符串，会输出一遍 1-7。
该程序可以输入 Ctrl+d 文件结束符来结束，也可以直接用 Ctrl+c 杀掉该进程。

### continue 命令

跳出当前循环。

示例：

``` sh
for ((i = 1; i <= 10; i++))
do
    if [ `expr $i % 2` -eq 0 ]
    then
        continue
    fi
    echo $i
done
```

该程序输出 1-10 中的所有奇数。

死循环的处理方式：输入 Ctrl+c 即可。

否则可以直接关闭进程：<kbd>ps aux</kbd> 返回所有的进程

使用 `top` 命令找到进程的 PID
输入 `kill -9 PID` 即可关掉此进程

## 函数

bash 中的函数类似于 C/C++中的函数，**但 return 的返回值与 C/C++ 不同，返回的是 exit code，取值为 0-255，0 表示正常结束**。

如果想获取函数的输出结果，可以通过 echo 输出到 stdout 中，然后通过 `$(function_name)` 来获取 stdout 中的结果。

函数的 return 值可以通过`$?`来获取。

命令格式：

``` sh
[function] func_name() {  # function 关键字可以省略
    语句 1
    语句 2
    ...
}
```

### 不获取 return 值和 stdout 值

示例

``` sh
func() {
    name=fw
    echo "Hello $name"
}
func # 运行函数的方式就是直接写上函数名 
```

输出结果：

Hello fw

### 获取 return 值和 stdout 值

不写 return 时，默认 return 0。

示例

``` sh
func() {
    name=fw
    echo "Hello $name"

    return 123
}

output=$(func)
ret=$?

echo "output = $output"
echo "return = $ret"
```
输出结果：

```  sh
output = Hello fw
return = 123
```

### 函数的输入参数

在函数内，`$1` 表示第一个输入参数，`$2` 表示第二个输入参数，依此类推。

**注意：函数内的 `$0` 仍然是 shell 文件名，而不是函数名， 函数内不存在独自的 `$0`。**

示例：

``` sh
func() {  # 递归计算 $1 + ($1 - 1) + ($1 - 2) + ... + 0
    if [ $1 -le 0 ] 
    then
        echo 0
        return 0
    fi  

    sum=$(func $(expr $1 - 1)) # 可以不使用 $() 也可以使用 ``
    echo $(expr $sum + $1)
}

echo $(func 10)
```

输出结果：
```
55
```

### 函数内的局部变量
可以在函数内定义局部变量，作用范围仅在当前函数内。

可以在递归函数中定义局部变量。

命令格式：

``` sh
local 变量名=变量值
```

例如：

``` sh
#! /bin/bash

func() {
    local name=fw
    echo $name
}
func

echo $name
```

输出结果：

fw

第一行为函数内的 name 变量，第二行为函数外调用 name 变量，会发现此时该变量不存在。
