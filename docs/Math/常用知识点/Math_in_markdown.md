---
layout: post
title: Markdown书写数学公式
tags: [模板]
date: 2020-03-10
---

***

> 博客目前就是用来记笔记的一个方式：而笔记中 数学笔记肯定要占居相当比例；而脱离手写后繁杂公式想显示在博文中便有些不易；所以做了这一篇整理；以便查阅

## markdown数学公式基本构造

行间插入公式 a + b : \(a + b\)

特点就是通过 `(` 和 `)` 包含要写的公式，然后为了模板引擎能够区分该 `( ` 不是普通文本的 `(` 而是公式的 `(` ，所以就通过 `\` 符号 转义括号；例如 ： `a + b : \(a + b\)` 。这样应该就很好理解这个语法构成了

### **行间与另起一行**

``` markdown
$a + b$
$a+B$
```

行间效果一：

$a + b$

另起一行效果二：

$$a + b$$

### **次幂**

先下标后上标的写法；如果次幂是一个式子那么就用大括号包含起来

``` markdown
$x_1$

$x_1^2$

$x^2_1$

$x_{22}^{(n)}$

${}^*x^*$

$x_{ba}^{baba}$

```

显示效果：

$$x_1$$

$$x_1^2$$

$$x^2_1$$

$$x_{22}^{(n)}$$

$${}^*x^*$$

$$x_{ba}^{baba}$$

### **分式**

两种格式

这里就出现了一个 `\`  `frac{}{} ` 函数的东西，同样，为了区分这是函数不是几个字母，通过 ` \frac ` 转义，于是 frac 被解析成数学函数，第一个 {} 里面的被解析成分子，第二个 {} 被解析成分母。这里可以试试分数的行间解析

> 先分子后分母

``` cpp
$\frac{x+y}{2}$

{分子} \over {分母}，如：${x+y} \over {y+z}$

$\frac{1}{1+\frac{1}{2}}$
```

$$\frac{x+y}{2}$$

{分子} \voer {分母}，如：${x+y} \over {y+z}$

$$\frac{1}{1+\frac{1}{2}}$$

### **根式**

``` cpp
$\sqrt{2}<\sqrt[3]{3}$

$\sqrt{1+\sqrt[p]{1+a^2}}$

$\sqrt{1+\sqrt[^p\!]{1+a^2}}$
```

$$\sqrt{2}<\sqrt[3]{3}$$

$$\sqrt{1+\sqrt[p]{1+a^2}}$$

$$\sqrt{1+\sqrt[^p\!]{1+a^2}}$$

与 `\frac` 语法类似；就是 `sqrt[ ]{ }` 。** `[] ` 中代表是几次根式， `{ }` 代表根号下的表达式。**

> 第二和第三个的区别在于为了美观微调位置 

## 常用符号

以下就是markdown数学公式高级语法了

### 求和和积分

$\sum_{k=1}^{n}\frac{k}{1}$ 和 $\int_{a}^{b}$

``` markdown
$\sum_{k=1}^{n}\frac{1}{k}$
$\sum_{k=1}^n\frac{1}{k}$
```

``` markdown
$\int_a^b f(x)dx$

$\int_{\frac{k}{1}}^{\Zeta} f(x)dx$
```

$$\sum_{k=1}^{n}\frac{1}{k}$$

$\sum_{k=1}^n\frac{1}{k}$

$$\int_a^b f(x)dx$$

$\int_{\frac{1}{k}}^{\Zeta} f(x)dx$

因为是上标；所以终点大括号前需要添加 `^` 符号  
这里很容易看出求和函数表达式 `\sum_{起点}^{终点}后续表达式 ` 积分函数表达式 `\int_下限^上限 被积函数d被积量(后续表达式) ` 。有趣的是行间的公式都被压缩了（ `mini` ）。

### **基本运算符**

加减运算，符号：\pm，如： 

$x \pm y=z$

减加运算，符号：\mp，如：  

$x \mp y=z$

**点乘运算，符号：** \cdot，如：

 $ x \cdot y=z $

**除法运算，符号：**\div，如：$\div$

乘法运算，符号：\times，如： 

$x \times y=z$

星乘运算，符号：\ast，如： `$x \ast y=z$ ` 

$x \ast y=z$

斜法运算，符号：/，如：$x/y=z$

绝对值表示，符号：\vert，(符号后面加一个空格)

如：$\vert x+y\vert$

### **高级运算符**

平均数运算，符号：\overline{算式}，如：$\overline{xyz}$

对数运算，符号：\log，如：$\log(x)$

极限运算，符号：\lim，如：$\lim^{x \to \infty}_{y \to 0}{\frac{x}{y}}$

极限运算，符号：\displaystyle \lim，如：\displaystyle \lim^{x \to \infty}_{y \to 0}{\frac{x}{y}}

积分运算，符号：\int，如：$\int^{\infty}_{0}{xdx}$

微分运算，符号：\partial，如：$\frac{\partial x}{\partial y}$

上位符号，符号：\stacrel{上位符号}{基位符号}，如：

``` markdown
$\vec{x}\stackrel{\mathrm{def}}{=}{x_1,\dots,x_n}$
```

$$\vec{x} \stackrel{\mathrm{def}}{=}{x_1, \dots, x_n}$$

### **括号符**

下划线符号，符号：\underline，如：$\underline{x+y}$

上大括号，符号：\overbrace{算式}，如：

``` markdown
$\overbrace{a+b+c+d}^{2.0}$
```

$$\overbrace{a+b+c+d}^{2.0}$$
下大括号，符号：\underbrace{算式}，如：

``` markdown
$a+\underbrace{b+c}_{1.0}+d$
```

$$a+\underbrace{b+c}_{1.0}+dx$$

* 括号作为公式界定符

主要符号有 ( ) [ ] \{ \} | \|  通过 `\left` 和 `\right` 后面跟界定符来对同时进行界定

``` markdown
$\left(\sum_{k=\frac{1}{2}}^{N^2}\frac{1}{k}\right)$
```

$$\left(\sum_{k=\frac{1}{2}}^{N^2}\frac{1}{k}\right)$$

### **逻辑运算符**

存在： 符号 \exists

任取： 符号 \forall

大于等于运算，符号：\geq，如：$x+y \geq z$

小于等于运算，符号：\leq，如：$x+y \leq z$

不等于运算，符号：\neq，如：$x+y \neq z$

不大于等于运算，符号：\ngeq，如：$x+y \ngeq z$

不大于等于运算，符号：\not\geq，如：$x+y \not\geq z$

不小于等于运算，符号：\nleq，如：$x+y \nleq z$

不小于等于运算，符号：\not\leq，如：$x+y \not\leq z$

约等于运算，符号：\approx，如：$x+y \approx z$

恒定等于运算，符号：\equiv，如：$x+y \equiv z$

### **集合运算符**

属于运算，符号：\in，如：$x \in y$

不属于运算，符号：\notin，如：$x \notin y$

不属于运算，符号：\not\in，如：$x \not\in y$

子集运算，符号：\subset，如：$x \subset y$

子集运算，符号：\supset，如：$x \supset y$

真子集运算，符号：\subseteq，如：$x \subseteq y$

非真子集运算，符号：\subsetneq，如：$x \subsetneq y$

真子集运算，符号：\supseteq，如：$x \supseteq y$

非真子集运算，符号：\supsetneq，如：$x \supsetneq y$

非子集运算，符号：\not\subset，如：$x \not\subset y$

非子集运算，符号：\not\supset，如：$x \not\supset y$

并集运算，符号：\cup，如：$x \cup y$

交集运算，符号：\cap，如：$x \cap y$

差集运算，符号：\setminus，如：$x \setminus y$

同或运算，符号：\bigodot，如：$x \bigodot y$

同与运算，符号：\bigotimes，如：$x \bigotimes y$

实数集合，符号：\mathbb{R}，如：$\mathbb{R}$

自然数集合，符号：\mathbb{Z}，如：$\mathbb{Z}$

空集，符号：\emptyset，如： $\emptyset$

### **三角运算符**

垂直符号, 符号 `\bot` $\bot$

角	符号 `\angle` $\angle$

30度角  符号 $30^\circ$

### **数学符号**

矢量符号，符号\vec{a}，如：$\vec{a}$

无穷，符号：\infty，如：$\infty$

右箭头，符号：\Rightarrow，如：$\Rightarrow$

垂直关系, 符号: \

虚数，符号：\imath，如：$\imath$

虚数，符号：\jmath，如：$\jmath$

数学符号，符号\hat{a}，如：$\hat{a}$

数学符号，符号\check{a}，如：$\check{a}$

数学符号，符号\breve{a}，如：$\breve{a}$

数学符号，符号\tilde{a}，如：$\tilde{a}$

数学符号，符号\bar{a}，如：$\bar{a}$

数学符号，符号\acute{a}，如：$\acute{a}$

数学符号，符号\grave{a}，如：$\grave{a}$

数学符号，符号\mathring{a}，如：$\mathring{a}$

一阶导数符号，符号\dot{a}，如：$\dot{a}$

二阶导数符号，符号\ddot{a}，如：$\ddot{a}$

上箭头，符号：\uparrow，如：$\uparrow$

上箭头，符号：\Uparrow，如：$\Uparrow$

下箭头，符号：\downarrow，如：$\downarrow$

下箭头，符号：\Downarrow，如：$\Downarrow$

左箭头，符号：\leftarrow，如：$\leftarrow$

左箭头，符号：\Leftarrow，如：$\Leftarrow$

右箭头，符号：\rightarrow，如：$\rightarrow$

底端对齐的省略号，符号：\ldots，如：$1, 2, \ldots, n$

中线对齐的省略号，符号：\cdots，如：$x_1^2 + x_2^2 + \cdots + x_n^2$

竖直对齐的省略号，符号：\vdots，如：$\vdots$

斜对齐的省略号，符号：\ddots，如：$\ddots$

### **矩阵**

``` markdown
$A=
\left\{
 \begin{matrix}
   a & b & c & d & e\\
   f & g & h & i & j \\
   k & l & m & n & o \\
   p & q & r & s & t
  \end{matrix} 
\right\}
$
```

$$A=
\left\{
 \begin{matrix}
   a & b & c & d & e\\
   f & g & h & i & j \\
   k & l & m & n & o \\
   p & q & r & s & t
  \end{matrix} 
\right\}
$$

`\left\ \right\` 用来表示矩阵括号， `\begin \end` 用来表示矩阵开始处和结束处； `&` 区分行间元素， `\\` 用来矩阵换行； 需要记忆 matrix：矩阵 这个单词

`\begin{matrix}1 & 2\\\\3 & 4\end{matrix}` $\begin{matrix}1 & 2\\\\3 & 4\end{matrix}$

### **空格美化效果**

``` cpp
紧贴 $a\!b$
没有空格 $ab$
小空格 a\,b
中等空格 a\;b
大空格 a\ b
quad空格 $a\quad b$
两个quad空格 $a\qquad b$
```

紧贴 $a\!b$   
没有空格 $ab$    
小空格 $a\, b$   
中等空格 $a\; b$    
大空格 $a\ b$    
quad空格 $a\quad b$     
两个quad空格 $a\qquad b$     

### **希腊字母表**

$$
\begin{array}{|c|c|c|c|c|c|c|c|}
\hline
{\alpha} & {\backslash alpha} & {\theta} & {\backslash theta} & {o} & {o} & {\upsilon} & {\backslash upsilon} \\\\
\hline
{\beta} & {\backslash beta} & {\vartheta} & {\backslash vartheta} & {\pi} & {\backslash pi} & {\phi} & {\backslash phi} \\\\
\hline
{\gamma} & {\backslash gamma} & {\iota} & {\backslash iota} & {\varpi} & {\backslash varpi} & {\varphi} & {\backslash varphi} \\\\
\hline
{\delta} & {\backslash delta} & {\kappa} & {\backslash kappa} & {\rho} & {\backslash rho} & {\chi} & {\backslash chi} \\\\
\hline
{\epsilon} & {\backslash epsilon} & {\lambda} & {\backslash lambda} & {\varrho} & {\backslash varrho} & {\psi} & {\backslash psi} \\\\
\hline
{\varepsilon} & {\backslash varepsilon} & {\mu} & {\backslash mu} & {\sigma} & {\backslash sigma} & {\omega} & {\backslash omega} \\\\
\hline
{\zeta} & {\backslash zeta} & {\nu} & {\backslash nu} & {\varsigma} & {\backslash varsigma} & {} & {} \\\\
\hline
{\eta} & {\backslash eta} & {\xi} & {\backslash xi} & {\tau} & {\backslash tau} & {} & {} \\\\
\hline
{\Gamma} & {\backslash Gamma} & {\Lambda} & {\backslash Lambda} & {\Sigma} & {\backslash Sigma} & {\Psi} & {\backslash Psi} \\\\
\hline
{\Delta} & {\backslash Delta} & {\Xi} & {\backslash Xi} & {\Upsilon} & {\backslash Upsilon} & {\Omega} & {\backslash Omega} \\\\
\hline
{\Omega} & {\backslash Omega} & {\Pi} & {\backslash Pi} & {\Phi} & {\backslash Phi} & {} & {} \\\\
\hline
\end{array}
$$

> 参考资料

[Markdown数学公式语法](https://www.jianshu.com/p/e74eb43960a1)

[LATEX数学公式基本语法](https://www.cnblogs.com/houkai/p/3399646.html)

[markdown使用数学公式](https://juejin.im/post/5a6721bd518825733201c4a2)

[Markdown中插入数学公式的方法](https://blog.csdn.net/xiahouzuoxin/article/details/26478179)

