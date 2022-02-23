---
title: python new features Summary
date: 2022-01-26
tags:
  - python
---

看到别人的 python 代码中很多新特性，遇到一个查一个，很不舒服，所以读了一遍 [官方文档](https://docs.python.org/zh-cn/3/tutorial/)，看到了一些很好用的特性，记录一下

## match

after python 3.10 version

``` py
def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 401 | 403 | 404:
            return "Not allowed"
        case _:
            return "Something's wrong with the internet"
```

注意 match 中的 `|` 操作符和 `_` 通配符的使用

match 在枚举中的使用：

``` py 
from enum import Enum

class Color(Enum):
    RED = 'red'
    GREEN = 'green'
    BLUE = 'blue'

color = Color(input("Enter your choice of 'red', 'blue' or 'green': "))

match color:
    case Color.RED:
        print("I see red!")
    case Color.GREEN:
        print("Grass is green")
    case Color.BLUE:
        print("I'm feeling the blues :(")
```

## string  

``` py  
print(r"origin string")

print("""\
Usage: thingy [OPTIONS]
     -h                        Display this usage message
     -H hostname               Hostname to connect to
    """)
```

还有这个连接的规则：

``` python 
print('py'
      'thon' * 3)
```

## fuction 

``` python
def fib(n):
    """ fib function 
    
    function document rule
    """
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a + b
```

### arguments

默认参数：

``` python
def f(a, L=[]):
    L.append(a)
    return L

print(f(1))
print(f(2))
print(f(3))
# 函数中的默认值只计算一次

def f(a, L=None):
    if L is None:
        L = []
    L.append(a)
    return L
# 后续的函数不使用默认值
```

after python 3.8 version

``` python
def f(a=2, /):
    pass

f()  # Allowed, argument is optional
f(1)  # Allowed, it's a positional argument
f(a=1)  # Error, positional only  argument

def f(*, a=1):
    pass

f()  # Allowed
f(1)  # Error, keyword only arguments
f(a=1)  # Allowed, it's a keyword argument
```

[stackoverflow: positional-argument-v-s-keyword-argument](https://stackoverflow.com/questions/9450656/positional-argument-v-s-keyword-argument)

- positional and keyword arguments are a feature of calls to a function
- Default values are a feature of function definition

``` python
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
      -----------    ----------     ----------
        |             |                  |
        |        Positional or keyword   |
        |                                - Keyword only
         -- Positional only

def f(a=1)
    pass

f()  # Allowed, argument is optional
f(1)  # Allowed, it's a positional argument
f(a=1)  # Allowed, it's a keyword argument

# In fact this function is the same as
def f(/, a=1, *):
    pass
```

如果要给函数使用任意数量的参数列表 `*args`

``` python
>>> def concat(*args, sep="/"):
...     return sep.join(args)
...
>>> concat("earth", "mars", "venus")
'earth/mars/venus'
>>> concat("earth", "mars", "venus", sep=".")
'earth.mars.venus'
```

使用解包语法快捷的传递参数：用于将 `dict` 使用`**`， `list/tuple` 使用 `*` 作为函数参数

``` python
list(range(3, 6))
args = [3, 6]
list(range(*args))

def parrot(pos1, state='a stiff', action='voom'):
    print(pos1, state, action)

d = {"pos1": 1, "state": "22", "action": "33"}

parrot(**d)
```

### lambda function

basic usage

``` python
def make_lambda(n):
    return lambda x: x + n

f = make_lambda(10)

f(1)
f(2)
```

在 sort 中使用 lambda 函数

``` python
pairs = [(1, 'one'), (4, 'four'), (2, 'two'), (3, 'three') ]
pairs.sort(key=lambda pair: pair[0])

print(pairs)
```

## list 




[文档](https://docs.python.org/zh-cn/3/tutorial/datastructures.html#more-on-lists)

列表数据类型支持很多方法

``` python
list.append(x)
list.extend(iterable)
list.insert(i, x)
list.remove(x)
list.pop([i])
list.clear()
list.index(x, [start [, end]])
list.count(x)
```

### init list 

开辟指定大小的 list

`path = [0 for i in range(n)]`

开辟指定大小的 bool 数组

`used = [False for i in range(n)]`

开辟 n * m 的全零数组

`ans = [[0 for j in range(m)] for i in range(n)]`

[array 文档](https://docs.python.org/zh-cn/3/library/array.html)

### sort

基本的排序方法使用，效果同 sorted() 

``` python 
>>> a = [5, 2, 3, 1, 4]
>>> a.sort()
>>> a
[1, 2, 3, 4, 5]
```

### stack

使用 list 的方法即可

``` python
stack = [3, 4, 5]
stack.append(6)
stack.append(7)

stack.pop()
```

### list init

默认使用一个 for 循环对数组进行填充的话：

``` python
squares = []
for x in range(10):
    squares.append(x**2)
```

这段代码创建（或覆盖）了变量 x，该变量**在循环结束后仍然存在**（等于循环结束的值）

所以更应该使用匿名函数无副作用的计算平方列表

``` python
squares = list(map(lambda x: x**2, range(10)))

squares = [x**2 for x in range(10)]

[(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
```

列表推导式可以使用复杂的表达式和嵌套函数：

``` python
from math import pi

[str(round(pi, i)) for i in range(1, 6)]
['3.1', '3.14', '3.142', '3.1416', '3.14159']
```

### del 

del 后是下标

del a ： 删除 a 这个变量

### set 

集合是由**不重复元素**组成的**无序**容器。基本用法包括成员检测、消除重复元素。集合对象支持合集、交集、差集、对称差分等数学运算

创建集合用花括号或 `set()` 函数。注意，创建空集合只能用 `set()`，不能用 `{}`，`{}` 创建的是空字典

使用推导式进行创建：

``` python 
a = {x for x in 'abracadabra' if x not in 'abc'}
a
{'r', 'd'}
```

### dict 

``` python 
dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])

 {x: x**2 for x in (2, 4, 6)}
 {2: 4, 4: 16, 6: 36}

 dict(sape=4139, guido=4127, jack=4098)
```

遍历 map ：

``` python 
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)
```

直接使用 `list(dict)` 得到的是一个包含所有 key 的列表

## queue 

规矩：使用 `collections` 中的 `deque`

返回一个新的双向队列对象

``` python
from collections import deque

queue = deque(["Eric", "John", "Michael"])
queue.append("Terry")
queue.popleft()  # popleft 全部小写，将删除的值返回

queue.clear() # 移除所有元素
queue.copy()  # 创建一份浅拷贝
queue.count(x) # 计算队列中等于 x 的个数
queue.extend() # 添加到队列的右侧
queue.extendleft() # 添加到队列的左侧
queue.index(x, [start, end]) 
# 在 start 之后，stop 之前返回第一个 x 在deque 中的位置
insert(i, x) 
# 在位置 i 插入 x 
pop() # 移除最右侧的那一个
reverse() # 将队列逆序 
rotate(n=1)
# 向右循环移动 n 步。 如果 n 是负数，就向左循环。
```

## heap 

创建一个堆


``` python 
heap = []
heap = heapify([])  

heappush(heap, item) 
# 将 item 的值加入到 heap 中

heappop(heap)   
# 弹出并返回 heap 的最小的元素，保持堆的不变性。
# 使用 heap[0] ，可以只访问最小的元素而不弹出它。

heappushpop(heap, item) 
# 将 item 放入堆中，然后弹出并返回 heap 的最小元素。
# 该组合操作比先调用 heappush() 再调用 heappop() 运行起来更有效率。

heapreplace(heap, item)
# 弹出并返回 heap 中最小的一项，同时推入新的 item。 堆的大小不变。
# 返回的值可能会比添加的 item 更大

nlargest(n, iterable, key=None)
# 从 iterable 所定义的数据集中返回前 n 个最大元素组成的列表。 

nsmallest(n, iterable, key=None)
# 从 iterable 所定义的数据集中返回前 n 个最小元素组成的列表。
# 这两个函数在 n 值较小时性能最好。 
# 对于更大的值，使用 sorted() 函数会更有效率。 
# 此外，当 n==1 时，使用内置的 min() 和 max() 函数会更有效率。 
# 如果需要重复使用这些函数，请考虑将可迭代对象转为真正的堆。


```

heap 自定义排序，重写 `__lt__` 方法


``` python 
import heapq
class P():
    def __init__(self,a,b):
        self.a = a
        self.b = b
    def __lt__(self, other):
        if self.b<other.b:
            return True
        else:
            return False
    def p(self):
        print(self.a,self.b)
 
a = P(3,1)
b = P(2,3)
c = P(10,0)
d = P(3,1)
 
h = []
heapq.heappush(h,a)
heapq.heappush(h,b)
heapq.heappush(h,c)
heapq.heappop(h).p()

10 0
```

使用匿名函数


``` python 
laptops = [
    {'name': 'ThinkPad', 'amount': 100, 'price': 91.1},
    {'name': 'Mac', 'amount': 50, 'price': 543.22},
    {'name': 'Surface', 'amount': 200, 'price': 21.09},
    {'name': 'Alienware', 'amount': 35, 'price': 31.75},
    {'name': 'Lenovo', 'amount': 45, 'price': 16.35},
    {'name': 'Huawei', 'amount': 75, 'price': 115.65}
]

cheap = heapq.nsmallest(3, laptops, key=lambda s: s['price'])
expensive = heapq.nlargest(3, laptops, key=lambda s: s['price'])
```

## string 

`find()`

返回最左端的索引，找不到返回 -1， 可以指定范围 start, end

`join()`

`'sep'.join(seq)`

- sep：分隔符。可以为空
- seq：要连接的元素序列、字符串、元组、字典

返回值：返回一个以分隔符 sep 连接各个元素后生成的字符串

`replace(old, new[, max])`

将 old 替换为 new ，不超过 max 次

`split() rsplit()`

``` py
str.split(str="", num=string.count(str)). 
```
- str – 分隔符，默认为所有的空字符，包括空格、换行 (\n)、制表符 (\t) 等。
- num – 分割次数。

返回分割之后的字符串列表

`splitlines()` 以换行为分割符进行分割，默认参数是 False，True 参数代表结果中保留换行符（靠左保留）。

``` py
isspace()
isdigit()
isalpha()
isalnum()
istitle() & title()
isupper() & islower()
swapcase()
ljust() & rjust() ljust(width,fillchar=None)
lstrip() & rstrip() & strip()
```

## built in function 

一些常用的内置函数

###  enumerate()

在序列中循环时，用 `enumerate()` 函数可以同时取出位置索引和对应的值：

``` py
>>> for i, v in enumerate(['tic', 'tac', 'toe']):
...     print(i, v)
...
0 tic
1 tac
2 toe
```

### zip()

同时循环两个或多个序列时，用 `zip()` 函数可以将其内的元素一一匹配：

``` python
>>> questions = ['name', 'quest', 'favorite color']
>>> answers = ['lancelot', 'the holy grail', 'blue']
>>> for q, a in zip(questions, answers):
...     print('What is your {0}?  It is {1}.'.format(q, a))
...
What is your name?  It is lancelot.
What is your quest?  It is the holy grail.
What is your favorite color?  It is blue.
```

### reverse()

逆向循环序列时，先正向定位序列，然后调用 `reversed()` 函数：

``` py
>>> for i in reversed(range(1, 10, 2)):
...     print(i)
...
9
7
5
3
1
```

### sorted()

[文档： 排序指南](https://docs.python.org/zh-cn/3/howto/sorting.html#sortinghowto)

排序一个 list 的最简单的方式是使用 `sorted()` 函数

``` py
>>> numbers = [6, 9, 3, 1]
>>> sorted(numbers)
[1, 3, 6, 9]
>>> numbers
[6, 9, 3, 1]
```

sorted 是内置函数，sorted 不改变原数组，sorted 将排序之后的值返回供调用， sorted 的参数可以是 list 或者 tuple 或者 set， 返回值都是一个排序完成的 list 

`help(sorted)` 可以查看帮助信息

sorted 对于字符串：

将字符串中的每一个字符，包括空格，看作 each element， 然后返回排序之后的 list of char 

按指定顺序循环序列，可以用 `sorted()` 函数，在不改动原序列的基础上，返回一个重新的序列：

``` python
>>> basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
>>> for i in sorted(basket):
...     print(i)
...
apple
banana
orange
pear
```

使用 set() 去除序列中的重复元素。使用 sorted() 加 set() 则按排序后的顺序，循环遍历序列中的唯一元素：

``` py
>>> basket = ['apple', 'orange', 'apple', 'pear', 'orange', 'banana']
>>> for f in sorted(set(basket)):
...     print(f)
...
apple
banana
orange
pear
```

使用 sorted 不区分大小写安装小写字母从小到大的进行排序

``` python
sorted("This is a test string from Andrew".split(), key=str.lower)
['a', 'Andrew', 'from', 'is', 'string', 'test', 'This']
```

排序结构体：
``` python
>>> student_tuples = [
...     ('john', 'A', 15),
...     ('jane', 'B', 12),
...     ('dave', 'B', 10),
... ]
>>> sorted(student_tuples, key=lambda student: student[2])   # sort by age
[('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]
```

使用 operator 模块中的函数

``` python 
>>> from operator import itemgetter, attrgetter

>>> sorted(student_tuples, key=itemgetter(2))
[('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]

>>> sorted(student_objects, key=attrgetter('age'))
[('dave', 'B', 10), ('jane', 'B', 12), ('john', 'A', 15)]
```

同 key 的使用方式相同，添加 `reverse=True` 可以逆序排序

排序保证是稳定的 



## IO 

### input 

按照 int 格式输入：

`a = int(input())`

int 数据中间空格分割

`a, b = map(int, input().split(' '))`

读入数组：

`d = list(map(float, input().split(' ')))`

### print

C 格式的 print：

`print("string: %.2lf" % (a))`

输出不换行：

`print(i, end=' ')`

Python 格式的输出：

`print('What is your {0}?  It is {1}.'.format(q, a))`


## class

``` python
class Test:
    staticVar = 1
    def __init__(self, *args, **kwargs):
        self.name = "test"
        pass
```

### yield

为自定义类添加 迭代器访问：

义一个 `__iter__()` 方法来返回一个带有 `__next__()` 方法的对象。 如果类已定义了 `__next__()`，则 `__iter__()` 可以简单地返回 self:

``` python 
class Reverse:
    """Iterator for looping over a sequence backwards."""
    def __init__(self, data):
        self.data = data
        self.index = len(data)

    def __iter__(self):
        return self

    def __next__(self):
        if self.index == 0:
            raise StopIteration
        self.index = self.index - 1
        return self.data[self.index]
```

使用生成器：

``` python
def reverse(date):
    for index in range(len(data) - 1, -1, -1):
        yeild date[index]

for char in reverse('golf'):
    print(char)
```

可以用生成器来完成的操作同样可以基于类的迭代器来完成。 但生成器的写法更为紧凑，因为它会自动创建 `__iter__()` 和 `__next__()` 方法。

生成器表达式：

``` python 
>>> xvec = [10, 20, 30]
>>> yvec = [7, 5, 3]
>>> sum(x*y for x,y in zip(xvec, yvec))         # dot product
260
```


## module

`__name__` 可以获取模块名字

`if __name == "__main__":`

Python 只把含 `__init__.py` 文件的目录当成包。这样可以防止以 `string` 等通用名称命名的目录，无意中屏蔽出现在后方模块搜索路径中的有效模块。 最简情况下，`__init__.py` 只是一个空文件，但该文件也可以执行包的初始化代码，或设置 `__all__` 变量

`__all__` 用来设置使用 `from .. import *` 时具体导入的函数

``` python
__all__ = ["echo", "surround", "reverse"]
```