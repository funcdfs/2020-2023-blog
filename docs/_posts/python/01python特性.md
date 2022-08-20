---
title: python summary
date: 2022-08-20
tags:
  - python
---

## 数据类型转换 

- `int(x, [, base])`: 将 x 转换为整数， base 表示进制
- `float(x)`: 将 x 转换为一个浮点数 
- `complex(x, [, imag])` 创建一个复数，imag 是虚部的数值 
- `str(x)`: 将对象 x 转换为字符串 
- `repr(x)`: 将对象 x 转换为表达式字符串 
- `eval(str)`: 计算在字符串中有效的表达式，并返回一个对象 
- `tuple(s)`: 将序列 s 转换为一个元组 
- `list(s)`: 将序列 s 转换为一个列表 
- `set(s)`: 转换为一个可变的集合 
- `dict(d)`: 创建一个字典，d 是一个 key,value 元组 
- `frozenset(s)`: 转换为不可变集合 
- `chr(x)`: 将一个整数转换为一个字符 
- `ord(x)`: 将一个字符转换为他的整数值 
- `hex(x)`: 将一个整数转换为一个十六进制字符串 
- `oct(x)`: 将一个整数转换为一个八进制字符串

## list 列表

[文档](https://docs.python.org/zh-cn/3/tutorial/datastructures.html#more-on-lists)

列表常见方法

``` python
a.append(x)         等价于 a[len(a):] = [x] 
a.extend(iterable)  使用可迭代对象的元素扩展指定列表 
a.insert(i, x)      在指定位置插入对象 insert(0, 1) 
a.remove(x)         从列表中删除第一个值为 x 的元素，找不到触发 ValueError
a.pop([i])  删除列表中的指定位置的元素，没有指定的时候删除最后一个元素，并返回
a.clear()   删除列表中的所有元素 等价于 del a[:]
a.index(x, [start [, end]]) 返回指定序列中第一个值是 x 的索引
a.count(x)  返回列表中元素 x 出现的次数 
a.reverse() 翻转列表中的所有元素 
```

> init list 

开辟指定大小的 list

`path = [0 for i in range(n)]`

开辟指定大小的 bool list

`used = [False for i in range(n)]`

开辟 n * m 的全零 list

`ans = [[0 for j in range(m)] for i in range(n)]`

应该使用匿名函数无副作用的计算平方列表

``` python
squares = list(map(lambda x: x**2, range(10)))
squares = [x**2 for x in range(10)]
```

## tuple 元组

元组写在小括号中，不能修改元素

创建只有一个元素的元组需要在结尾添加一个逗号 

```py
t1 = tuple()
t2 = ()
t3 = (1, 2, '2', [1, 2], 5)
t4 = (7, )
```

对于函数中的多返回值，返回的就是一个元组 

- `count(x)` 计算某一个元素出现的次数
- `index(x)` 寻找某一个元素第一次出现的索引位置

## set 集合

集合是由**不重复元素**组成的**无序**容器。基本用法包括成员检测、消除重复元素。集合对象支持合集、交集、差集、对称差分等数学运算

创建集合用花括号或 `set()` 函数。注意，创建空集合只能用 `set()`，不能用 `{}`，`{}` 创建的是空字典

使用推导式进行创建：

``` python 
a = {x for x in 'abracadabra' if x not in 'abc'}
a
{'r', 'd'} 
```

常用操作：
```py
s1.add('dd') 
s1.update('b') s1.update(s2) 
s3.pop() # 随机删除一个元素 
s3.clear() 
s3.remove('fengwei')

b.issubset(a) # 判断 b 是否是 a 的子集
a.union(c)    # a 和 c 的并集
a & c         # 交集 
a.difference(c) # 只在 a 中的元素 
a ^ c         # 求只在一个集合中的所有元素 
```

## queue 队列

规矩：使用 `collections` 中的 `deque`

返回一个新的双向队列对象，在队列两端插入或删除元素时间复杂度都是 `O(1)` ，区别于列表，在列表的开头插入或删除元素的时间复杂度为 `O(N)` 。

``` python
from collections import deque

queue = deque(["a", "b", "c"])
queue.append("d")
queue.appendleft("leftElement")
queue.popleft()  # popleft , 同时将删除的值返回

queue.clear()  # 移除所有元素
queue.copy()   # 创建一份浅拷贝
queue.count(x) # 计算队列中等于 x 的个数
queue.extend() # 添加到队列的右侧
queue.extendleft() # 添加到队列的左侧
queue.index(x, [start, end]) 
# 在 start 之后，stop 之前返回第一个 x 在 deque 中的位置
insert(i, x) 
# 在位置 i 插入 x 
pop() # 移除最右侧的那一个
reverse() # 将队列逆序 
rotate(n=1)
# 向右循环移动 n 步。 如果 n 是负数，就向左循环。
```

使用队列实现保留最后 N 个元素 

使用 `deque(maxlen=N)`  构造函数会新建一个固定大小的队列。当新的元素加入并且这个队列已满的时候， 最老的元素会自动被移除掉。

```py
>>> q = deque(maxlen=3)
>>> q.append(1)
>>> q.append(2)
>>> q.append(3)
>>> q
deque([1, 2, 3], maxlen=3)
>>> q.append(4)
>>> q
deque([2, 3, 4], maxlen=3)
>>> q.append(5)
>>> q
deque([3, 4, 5], maxlen=3)
```

## heap 堆

创建一个堆

```py 
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
# 或者使用 sorted(items)[:N], sorted(items)[-N:]
```

使用：查找最大的或者最小的 N 个元素 

```py
import heapq 
nums = [1. 4. 2, 8, 5, 7] 
print(heapq.nlargest(3, nums)) 
print(heapq.nsmallest(3, nums)) 
```

再添加匿名函数参数对于复杂的结构使用 heap

``` python 
laptops = [
    {'name': 'ThinkPad', 'amount': 100, 'price': 91.1},
    {'name': 'Mac',      'amount': 50,  'price': 543.22},
    {'name': 'Surface',  'amount': 200, 'price': 21.09},
    {'name': 'Alienwar', 'amount': 35,  'price': 31.75},
    {'name': 'Lenovo',   'amount': 45,  'price': 16.35},
    {'name': 'Huawei',   'amount': 75,  'price': 115.65}
]

cheap = heapq.nsmallest(3, laptops, key=lambda s: s['price'])
expensive = heapq.nlargest(3, laptops, key=lambda s: s['price'])
```

实现优先级队列：
:::showmore
```py
import heapq

class PriorityQueue:
    def __init__(self):
        self._queue = []
        self._index = 0

    def push(self, item, priority):
        heapq.heappush(self._queue, (-priority, self._index, item))
        # 负数的目的是使得元素按照优先级从高到低进行排序，添加 self._index 实现不可能有两个元素具有相同的 index 值
        # python 在做元组比较的时候，如果前面的比较已经可以确定结果了，后面的比较操作就不会发生了
        self._index += 1
        # 保证第一个元素拥有最高的优先级

    def pop(self):
        return heapq.heappop(self._queue)
        # 每次弹出 最小的元素 return heapq.heappop(self._queue)[-1]

class Item:
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return 'Item({!r})'.format(self.name)

q = PriorityQueue()
q.push(Item('1'), 1)
q.push(Item('2'), 5)
q.push(Item('3'), 4)
q.push(Item('4'), 1)

print(q.pop())
# Item('2')
# Item('3')
# Item('1')
# Item('4')
```
:::

heap 自定义排序，重写 `__lt__` 方法

:::showmore
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
:::

## hash 哈希表

`dict` 和 `defaultdict` 还有 `collections.Counter` 三个的用法

### dict 字典

- 字典是默认的 python 数据类型使用 `{}` 进行标识，是一个无序的 `key-value` 集合 
- key 必须是不可变类型，使用 `hash(x)` 来判断 x 是否是一个可变的数据类型
- 同一个字典中 `key` 必须是唯一的

创建方法：
```py
大括号形式
dict1 = {'name': 'python', 'age': 20} 

使用内置方法 dict() 
dict2 = dict(name='p', age=3) 

使用字典推导式
dict3 = {x: x**2 for x in {1, 4, 2, 8}} 
```

常用的三个方法 `keys()`, `values()`, `items()` 分别代表键，值，对  
直接使用 `list(dict)` 得到的是一个包含所有 key 的列表

```py
修改和访问：
dict1 = dict()

dict1['age'] = 20
dict1.setdefault('name', "fengwei")

遍历：
for k, v in dict1.items():
    print(k, v)

访问某一个键：
print(dict1['name'])
print(dict1.get('name'))

删除某一个键：
dict1.pop('age') 
del dict1['age'] 

清空
dict1.clear() 
 
合并两个字典 
dict1.update(dict2)
```

### Counter

本身用于统计给定的变量对象的次数 

```py
word_counter = Counter(text.split(" "))

print(word_count_dist.most_common(10)) # 输出出现次数最多的 10 个单词 

c = Counter(a=4, b=2)
a = sorted(c.elements()) # 忽略小于 1 的
['a', 'a', 'a', 'a', 'b', 'b']
```

如果存在两个 counter 可以使用 substract 来进行减法操作


```py
c = Counter(a=4, b=2, c=0, d=-2)
d = Counter(a=1, b=2, c=3, d=4)
c.subtract(d)
print(c)
# Counter({'a': 3, 'b': 0, 'c': -3, 'd': -6})
```

还有以下方法


```py
# 求和
sum(c.values()) 

# 清空 Counter
c.clear()                      

# 转换为 列表
list(c)                         

# 转换为 集合
set(c)                          

# 转换为 字典
dict(c)                        

# 键值对
c.items()                       

# 返回非零正数
+c      

# 返回负数
-c

from collections import Counter

c = Counter(cats=4, flower=2, dogs=8)

print(sum(c.values()))

print(c.most_common()[:-3:-1])
# 输出出现频次最小的 2 个 key-value 对
```


### defaultdict

因为 Counter 的问题是数值必须是整数，本身就是用来拥挤数量，因此如果需要的 value 是字符串，列表，或者元组，就不能使用 Counter 了

defaultdict 相比于 dict 的最大的区别就是可以设置默认的数值，即便 key 不存在 


```py
s = [('color', 'blue'), ('color', 'orange'), ('fruit', 'banana')] 
d = defaultdict(list) 
# d = defaultdict(set) 
for k, v in s: 
    d[k].append(v) 
    # d[k].add(v) 
print(d) 
```


## string 字符串

``` py  
print(r"origin string")

print("""\
Usage: thing [OPTIONS]
     -h                        Display this usage message
     -H hostname               Hostname to connect to
    """)
```

还有这个连接的规则：

``` python 
print('py'
      'thon' * 3)
```

### string 常见操作

- `strip(x)` 当包含参数 x 表示删除句首或句末 x 的部分，否则就是删除举手和句末的空白字符。可以根据需要调用 `lstrip()` 和 `rstrip()` 分别删除句首或句末的空白字符
- `split() rsplit()`
    `str.split(str="", num=string.count(str))`
    - str – 分隔符，默认为所有的空字符，包括空格、换行 (\n)、制表符 (\t) 等。
    - num – 分割次数。  
    返回分割之后的字符串列表  
    `splitlines()` 以换行为分割符进行分割，默认参数是 False，True 参数代表结果中保留换行符（靠左保留）。
- `join()`
    `'sep'.join(seq)`  
    - sep：分隔符。可以为空  
    - seq：要连接的元素序列、字符串、元组、字典  
    返回值：返回一个以分隔符 sep 连接各个元素后生成的字符串
- `replace(old, new[, max])`
    将 old 替换为 new ，不超过 max 次
- `index()`
    查找指定字符串的起始位置
- `startwith() / endwith()` 
    分别判断字符串是否以某个字符串为开始，或者结束
- `find()`  
    返回最左端的索引，找不到返回 -1， 可以指定范围 start, end
- `upper() * lower()`
    `swapcase(), isspace(), isdigit(), isalpha(), isalnum(), isupper(), islower()`

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

### arguments 函数参数

参数传递规则: (python 中的一切都是对象)
- 如果传递的参数是不可变类型，类似于 cpp 中的值传递，传递的只是 a 的值，没有影响 a 对象本身的状态 
- 如果传递的参数是可变的类型，例如一个 list, dict 那么就是类似于 cpp 中的引用传递，修改之后外部的 list, dict 也会受到影响

- 位置参数 

位置参数必须按照正确的顺序传入函数中，调用的时候的数量必须和声明的时候相同  
不加任何修饰符

- 默认参数

添加 `=v` 的修饰，表示默认参数，在定义函数的时候事先赋予一个默认的数值，调用函数的时候可以不需要传递值给默认参数 

```py
def function_name(arg1, arg2=v):
    """docstring"""
    statement
```

- 可变参数 

使用 `*` 进行修饰，就是输入参数的数量可以 是从 0 个到 任意多个，他们会自动组装为元组装入被修饰的变量 

- 关键字参数 

使用 `**` 进行修饰，和可变参数类似，不同的是，不会自动组装为一个元组，而是组装为一个字典

传入方式:

```py
def print_info(name, age=18, height=178, *args, **kwargs):

print_info('fengwei', 20, 188, 'c++', 'python', birth='2002/01/20', weight=145)

keyword:  {'birth': '2002/01/20', 'weight': 145}
```

- 命名关键字参数 

使用 `*,nkw` 修饰这个参数的作用是限制调用者可以传递的参数名字

### 装饰器

> 内裤可以用来遮羞，但是到了冬天它没法为我们防风御寒，聪明的人们发明了长裤，有了长裤后宝宝再也不冷了，装饰器就像我们这里说的长裤，在不影响内裤作用的前提下，给我们的身子提供了保暖的功效。

装饰器本质上是一个Python函数，它可以让其他函数在不需要做任何代码变动的前提下增加额外功能，装饰器的返回值也是一个函数对象。它经常用于有切面需求的场景，比如：插入日志、性能测试、事务处理、缓存、权限校验等场景。装饰器是解决这类问题的绝佳设计，有了装饰器，我们就可以抽离出大量与函数功能本身无关的雷同代码并继续重用。概括的讲，装饰器的作用就是为已经存在的对象添加额外的功能。

[如何理解Python装饰器？ - 刘志军的回答 - 知乎](
https://www.zhihu.com/question/26930016/answer/99243411)

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

在 enumerate 中添加第二个参数，可以指定具体的下标起始位置 

### zip() 解构

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

同时，可以使用 `*` 作为解构语句的中间变量修饰 

```py
>>> *trailing, current = [10, 8, 1, 4, 2, 8, 5, 7]
>>> trailing
[10, 8, 1, 4, 2, 8, 5]
>>>
>>> current
7
```

又比如只想要一个列表中的首部和尾部的几个元素，可以使用星号解压语法操作

```py
record = ('fw', 50, 123.45, (12, 18, 2002))
name, *_, (*_, year) = record 
# fw 2002
```

例如使用星号解压来实现递归算法

```py 
>>> def sum(items):
...     head, *tail = items
...     return head + sum(tail) if tail else head
...
>>> sum(items)
36
>>>
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

### random() 

采用 random 模块可以对一个列表随机采样 n 个元素

```python
import random

my_list = ['a', 'b', 'c', 'd', 'e']
num_samples = 2

samples = random.sample(my_list, num_samples)
print(samples)
# [ 'a', 'e'] this will have any 2 random values
```


### sorted()

sorted() 都不会改变列表本身的顺序，只是对列表临时排序，并返回一个新的列表对象；

相反，列表本身的 sort() 会永久性改变列表本身的顺序。


```py
list5 = [3, 1, 4, 2, 5]
print('list5:', list5)

# use sorted
list6 = sorted(list5)
print('list6=sorted(list5), list5={}, list6={}'.format(list5, list6))

# use list.sort()
list5.sort()
print('list5.sort(), list5: ', list5)
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

### output

C 格式的 print：

`print("string: %.2lf" % (a))`

输出不换行：

`print(i, end=' ')`

Python 格式的输出：

`print('What is your {0}?  It is {1}.'.format(q, a))`

## match 关键字

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

## class

``` python
class Test:
    staticVar = 1
    def __init__(self, *args, **kwargs):
        self.name = "test"
        pass
```

### `__repr__` 和 `__str__` 

内置函数 `repr()` 能够把对象用字符串的形式表达出来 
`repr()` 就是通过 `__repr__` 方法来得到一个对象的字符串表示形式 

repr 返回的就是正式的字符串的表示，而 stre 返回的是非正式的

```py
str(4) == str("4")   # True
repr(4) == repr("4") # False
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

## 技巧

### sizeof

可以使用 sys.getsizeof() 检查一个对象的内存使用量

```py
import sys

num = 21

print(sys.getsizeof(num))

# In Python 2, 24
# In Python 3, 28
```

### 计算代码执行时间

采用 time 模块来计算一段代码的执行时间，例子如下：

```py
import time

start_time = time.time()
# Code to check follows
a = [0 for i in range(100000000)]
# a = [0] * 100000000
print(a[10])
# Code to check ends
end_time = time.time()
time_taken_in_micro = (end_time - start_time) * (10 ** 6)
print(time_taken_in_micro, "ms")
```

### 展平元素为列表的列表

有时候并确定一个列表中的深度有多深，所以你只想简单的将所有元素都放在一个列表中，实现技巧代码如下所示：


```py
from iteration_utilities import deepflatten

# 列表只有一层深度的情况，采用这个函数
def flatten(l):
  return [item for sublist in l for item in sublist]

l = [[1,2,3],[3]]
print(flatten(l))
# [1, 2, 3, 3]

# 不知道列表的深度的情况
l = [[1,2,3],[4,[5],[6,7]],[8,[9,[10]]]]

print(list(deepflatten(l, depth=3)))
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```



## 其他

- [文件和异常](https://zhuanlan.zhihu.com/p/72101874)
- [python 中的测试](https://zhuanlan.zhihu.com/p/73469149)
- [进程和线程](https://zhuanlan.zhihu.com/p/80377568)

---

参考资料：
 - [python-doc](https://docs.python.org/zh-cn/3/tutorial/)
 - [python-cookbook](https://python3-cookbook.readthedocs.io/zh_CN/latest/index.html)
 - [fluent-python]()