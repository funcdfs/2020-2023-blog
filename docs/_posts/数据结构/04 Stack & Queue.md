---
title: Stack & Queue
date: 2020-11-26
tags:
  - 数据结构
--- 

> 数据结构04 Stack & Queue 栈和队列

<!-- more -->
::: note
就像 [上海交通大学生存手册] 中提到的一样，多年前的他们大学就和现在我的大学一样
随着社会的发展，一流大学的各种完善一定是越来越好的
所以相当于拥有了前车之鉴

总有更值得做的事情是吧，无论你做的事情是否有意义——哪怕任何事情都不做，时间也会从我们的身边溜走。我们必须一日三省问自己，今天的时间是否过得有价值。

数据结构寒假前全部认真过完一遍，然后就开始刷题写游戏和 APP（C＃，kotlin）冲冲冲，找工作也就大前端找了，我可以的
:::
## 栈接口与实现

是一种线性序列的特例，扮演着基本而重要的角色

Stack 一般沿垂直方向画出 
堆在一起的椅子和盘子就是栈模型，都见过的 Hanno 塔问题也是这种类型的数据结构

只能执行放入顶部`(push)`或者取出顶部元素`(pop)`, 查询顶部元素`(top)`
因为有这些特殊接口规定，所以一些算法便可以使用这种结构大显身手

因为是一种序列受限后的特例，所以可以基于向量或者列表派生出来

``` cpp
template<typename T> class Stack public Vector<T>{
    public://size empty 以及其他开放接口均可直接沿用
    void push(T const& e){insert(size(),e);}
    T pop() {return remove(size() - 1);}
    T &top(){return (*this)[size() - 1]; }
};
```

栈的接口可以都在向量末尾操作，所以复杂度都可以是$O(1)$，可以很方便快捷

## 栈结构的典型应用

![2020-11-26-11-42-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-26-11-42-24.jpg)

### 进制转换

逆序输出类型问题的实例:
特点:输入输出的数据顺序相反，输入输出的长度事先不能确定

进制转换使用短除法:

$10\Rightarrow  2$ , 将原数除 2 数的整数部分（商）和余数分开，递归处理，余数部分记录下来既是二进制的表示

$10\Rightarrow5$ , 分别处理商和余数，然后抄录余数，就完成了转换过程  
计算过程自上而下，输出过程自下而上，计算深度也是未知深度

convert:  
n. 皈依者；改变宗教信仰者  
vt. 使转变；转换…；使…改变信仰  
vi. 转变，变换；皈依；改变信仰  

``` cpp
void convert(Stack<char>& S, __int64 n, int base) {
    static char digit[] = {
        '0',
        '1',
        '2',
        '3',
        '4',
        'A',
        'B'
    } while (n > 0) {  //商为 0 时退出
        S.push(dight[n % base]);
        n /= base;
    }
}
while (!S.empty())
    printf("%c", S.pop());//pop 后刚刚好是逆序输出
```
### 括号匹配

递归嵌套类问题:具有自相似性的问题可以用递归描述

 [典例:括号匹配](https://www.luogu.com.cn/problem/P1739)

1. 分支位置和递归深度都无从得知，使用超级多 if 暴力操作肯定可以解决（对各种特殊情况进行处理，卡数据） 
2. 消除一对紧邻的括号，不影响全局的判断，那么，如何找到一对，如何简单的持续进行
3. 使用栈的结构，左括号入栈，遇到右括号就弹出栈顶的左括号，最后列表刚好为空即为匹配，中途用完左括号或者最后多出右括号则都是不匹配的

``` cpp
bool brackets_match(const char exp[], int low, int high) {
    Stack<char> S;
    for (int i = low; i < hi; i++) {
        if ('(' == exp[i])
            S.push(exp[i]);
        else if (!S.empty())
            S.pop();  //遇到右括号，若栈非空，弹出左括号，尝试弹出
        else
            return false;  //遇到右括号时栈已经空掉，必定不匹配
    }
    return S.empty();  //最终 栈空就是匹配
}
```

使用整数计数器也可以实现目的，并且更加快，计数器反映的即是栈的空间（仅限单类括号
但是当多种括号同时存在时，例如:`[(])`，计数器判断就会出错

以上思路及算法，可便捷的推广至多种括号并存的情况 , 而不能使用多个计数器实现这种功能  
反例 `[(])` 而栈就可以  

![从左到右](https://raw.githubusercontent.com/fengwei2002/picture/master/picture352F858B92B1DC394CB70505FB5CCC66.jpg)

甚至，只需约定“括号”的通用格式，而不必事先固定括号的类型和数目，
就像 HTML 语言的语法检查一样

### 栈混洗

与括号匹配非常相关的一个问题，重新排列栈中元素

![20A3EFF03FDEF4618F43AC2C37C7CFD6.jpg](https://raw.githubusercontent.com/fengwei2002/picture/master/picture20A3EFF03FDEF4618F43AC2C37C7CFD6.jpg)

栈混洗计数

对于长度为 n 的输入序列，可能混洗的情况有几种

卡特兰数数值等于$\frac{(2n!)}{(n+1)!n!}$ n 为总数

那么，输入序列的任一排列，如何判断其是否为栈混洗？

任意三个元素能否按照某种次序出现在栈混洗中，与其他元素无关（观察 123 序列得出

输入:123 - 栈混洗没有:312 

对于任何$1<=i<j<k<=n$ , $[... , k , ... i, ... , j]$ 必不是栈混洗

这也是判断序列是否为栈混洗的充分必要条件 
如此，可以有一种枚举所有这种排列$O(n^3)$算法

对于任意$i<j$，不含模式$[...,j+1,...,i,....j,....]$也可以判断
$O(n^2)$的时间复杂度

引入三个栈，模拟栈混洗过程，不能从 A 通过 S 全部转入 B 时就不是栈混洗，
便得到线性时间$O(n)$复杂度的算法  

* 每次 S.pop() 之前，检测 S 是否已经空，或需要弹出的元素在 S 中，却非顶元素则不是栈混洗
* 过程类似于括号匹配

### 中缀表达式求值

栈结构应用:延迟缓冲 的实例

Linux 中: echo
windows 中:set /a 
输入一个语法正确的表达式，回车后就可以得到相应的结果

计算器直接输入表达式，等号出结果

因为从前到后进行遍历的时候，并不能确定哪个运算符是可以提前计算滴得到结果的
存在延迟缓冲的过程，而不是从前到后依次执行运算符就可以得到正确结果的一个过程

所以就可以很好的利用栈结构来实现
求值算法=两个栈+线性扫描

实现:

``` cpp
float evaluate(char* S, char*& RPN) {  //中缀表达式求值
    Stack<float> number;
    Stack<char> Operator;        //运算数栈，运算符栈
    Operator.push('\0');         //尾哨兵'\0'也作为头哨兵首先入栈
    while (!Operator.empty()) {  //逐个字符处理，直至栈空
        if (is_dight(*S))        //若当前字符为操作数，则
            readNumber(S, number);  //完整读入（可能多位的）操作数
        else  //若当前字符为运算符，则视其与栈顶运算符之间优先级的高低
            switch (orderBetween(Operator.top(), *S)) { 分别处理 }
    }                     // while
    return number.pop();  //弹出并返回最后的计算结果
}
```

![2020-11-29-18-06-52](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-29-18-06-52.jpg)

不同优先级的处理方法:

``` cpp
switch(order_Between(operator.top(), *S){
    case '<':  //栈顶优先级更低
        operator.push(*S);
        S++;
        break;  //推入运算符栈中，转到表达式的下一个
    case '=':   //（和）  '\0'
        operator.pop();
        S++;
        break;  //弹出栈顶运算符，然后跳过当前字符转向下一字符
    case '>': {  //*和+
        char op = operator.pop();
        if ('!' == op)
            number.push(calculate(op, number.pop()));  //一元运算符
        else {
            float pOpnd2 = number.pop(), pOpnd1 = number.pop();
            //弹出两个运算数
            number.push(calculate(pOpnd1, op, pOpnd2));
            //实施结果入栈
        }
    }
}
```

![2020-11-29-18-12-12](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/2020-11-29-18-12-12.jpg)

### 逆波兰表达式 RPN

之前的表达式解法:定义混乱，逻辑复杂，验证调试不易

RPN:[数理逻辑学家 Jan Łukasiewicz](https://zh.wikipedia.org/wiki/%E6%89%AC%C2%B7%E5%8D%A2%E5%8D%A1%E8%A5%BF%E7%BB%B4%E8%8C%A8) 操作符谁先出现谁先计算

在运算符和操作数组成的表达式中，不使用括号，即可表示带优先级的运算关系，操作时只需要一个辅助操作栈

手工转换法:（普通中缀表达式到逆波兰表达式 RPN）

1. 用括号显示的表示每个操作符的优先级`(`，每对括号都对应一个操作符
2. 将括号相对应的运算符移动到对应的右括号后面（未必都仍然保持原来的相对次序）
3. 抹去所有括号 （这样就只剩下操作数和操作符组成的逆波兰表达式，操作数仍然保持原来的相对次序）
4. 移动后所有操作数的次序 和中缀表达式的次序不变，操作符的次序未必不变

实现:infix 到 postfix

中缀表达式求值的过程中，捎带着完成了 RPN 的转换和生成

``` cpp
float evaluate(char* S, char*& RPN) {  // RPN 转换
    /*.....................*/
    while (!optr.empty()) {  //逐个处理各个字符，直至全空
        if (is_dight(*S)) {  //若当前字符为操作数 ,
            read_number(S, opnd);
            append(RPN, opnd.top());  //通过 read number
                                      //将操作数读入栈中。然后加入 RPN 尾部
        } else {  //若当前字符为运算符
            switch (order_between(optr.top(), *S)) {
                /*………………………………………………………………*/
                case '>':  //栈顶可以立即执行时
                    char op = optr.pop();
                    append(RPN, op);  //接入 RPN
            }
        }  // case '>'
    }
    /*………………………………………………………………*/
}
```
## 队列

与栈结构对称的一个数据结构，
因为以后队列在图中和其他算法中还会有广泛应用，所以只先介绍接口的实现

机场排好的队伍 First In First Out  
像羽毛球桶，一端只能出，一端只能进

只能在队尾插入（查询）enqueue（队尾插入一个元素） + rear()  
只能在对头删除（查询）dequeue（取出队首的一个元素） + front（查询首元素）  
size 接口得到当前队列规模

### 模板类

因为也是一种特殊的序列，所以基于向量或列表派生

``` cpp
template <typename T>
class Queue : public List<T> {
   public:  // size() 与 empty 直接沿用
    void enqueue(T const& e) { insert_as_last(e); }  //入队
    T dequeue() { return remove(first()); }          //出队
    T& front() { return first()->data; }             //队首
};  
```

所以使用之前开发的模板实现需求，可以又安全又快速 $O(1)$ 完成

代码复用
