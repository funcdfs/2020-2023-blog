---
title: emmet 语法
tags:
    - CSS
date: 2021-02-09
---

Emmet是一个web开发者的工具包，可以极大地改善您的HTML和CSS工作流程
vscode中已经默认集成

## 官方文档

https://docs.emmet.io/

总的来说有实际作用的就下面的几个写法，毕竟将整个页面一行写完也是比较慢的，怎么舒服怎么来

## !

在 html 中，打一个感叹号，然后tab键补全，就会出现Html5的骨架

## 嵌套 `child >`

利用`>`来对应盒子的嵌套结构 `div>ul>li`

...will produce

``` html
<div>
    <ul>
        <li></li>
    </ul>
</div>
```

## 相邻 `+`

Sibling: +

Use` + `operator to place elements near each other, on the same level:

`div+p+bq`

...will output

``` html
<div></div>
<p></p>
<blockquote></blockquote>
```

## 返回上一级后缀:`^`

使用>操作符，默认是在生成的树中向下移动，所有兄弟元素的位置将根据最深的元素来解析:

``` html
div+div>p>span+em 
```

...will be expanded to

``` html
<div></div>
<div>
    <p>
        <span></span>
        <em></em>
    </p>
</div>
```

With ^ operator, you can climb one level up the tree and change context where following elements should appear:

注意一下这个符号是后缀，作用于他前面的元素

div+div>p>span+em^bq
...outputs to

``` html
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
```
You can use as many ^ operators as you like, each operator will move one level up:

div+div>p>span+em^^^bq
...will output to


``` html
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
```

##  `*` 乘法

With * operator you can define how many times element should be outputted:

ul>li*5
...outputs to

``` html
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

## Grouping: () 分组

Parenthesises are used by Emmets’ power users for grouping subtrees in complex abbreviations:

div>(header>ul>li*2>a)+footer>p
...expands to

``` html
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
```

If you’re working with browser’s DOM, you may think of groups as Document Fragments: each group contains abbreviation subtree and all the following elements are inserted at the same level as the first element of group.

可以将分组当作 Document Fragments，后续元素将与分组第一个元素同级。

You can nest groups inside each other and combine them with multiplication * operator:

分组嵌套，并且使用 * 操作法：

(div>dl>(dt+dd)*3)+footer>p

...produces

``` html
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
```

With groups, you can literally write full page mark-up with a single abbreviation, but please don’t do that.

使用分组后，可以用一个缩写来生成整个页面，不过不要这么做。

## 添加ID和class 

Emmet 使用类似于 CSS 选择器的语法给元素添加属性：

`div#header+div.page+div#footer.class1.class2.class3`

...will output


``` html
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```

## 自定义属性

You can use` [attr] `notation (as in CSS) to add custom attributes to your element:

`td[title="Hello world!" colspan=3]`
...outputs

`<td title="Hello world!" colspan="3"></td>`

You can place as many attributes as you like inside square brackets.
方括号内属性数量不限。
You don’t have to specify attribute values: `td[colspan title]` will produce `<td colspan="" title="">` with tabstops inside each empty attribute (if your editor supports them).
没有指定值的属性将生成插入占位（需要编辑器支持）。
You can use single or double quotes for quoting attribute values.
属性值使用单引号或双引号。
You don’t need to quote values if they don’t contain spaces: `td[title=hello colspan=3]` will work.
属性值如果不包含空格可以省略引号。

## $ 编号

`*` 操作符可以生成重复元素，而 `$` 可以对元素编号。将 `$ `放在元素名、属性名或属性值中：

`ul>li.item$*5`
...outputs to

``` html
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
```
You can use multiple `$` in a row to pad number with zeroes:

多个连写的 `$` 可以生成带有前导零的编号：

`ul>li.item$$$*5`

...outputs to

``` html
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
```

Changing numbering base and direction
With `@` modifier, you can change numbering direction (ascending or descending) and base (e.g. start value).

使用 `@ `修饰符，可以改变编号的方向（升序或降序）及起点。

For example, to change direction, add @- after $:

例如改变方向，将 @- 放在 $ 后：

`ul>li.item$@-*5`
…outputs to

``` html
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
```

To change counter base value, add @N modifier to $:

改变起点，将 @N 放在 $ 后：

`ul>li.item$@3*5`
…transforms to

``` html
<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
```

## `{ }` 文本

You can use curly braces to add text to element:

使用大括号为元素添加文本（注：类似于模板的插入符）

`a{Click me}`
...will produce

`<a href="">Click me</a>`

Note that {text} is used and parsed as a separate element (like, div, p etc.) but has a special meaning when written right after element. For example, a{click} and a>{click} will produce the same output, but a{click}+b{here} and a>{click}+b{here} won’t:

注意 {text} 类似于独立元素（比如div, p），不过当它紧跟在元素后面时有特别的意义。比如 a{click} 与 a>{click} 结果一样，而 a{click}+b{here} 与 a>{click}+b{here} 结果不一样：

`<!-- a{click}+b{here} -->`
`<a href="">click</a><b>here</b>`

`<!-- a>{click}+b{here} -->`
`<a href="">click<b>here</b></a>`

In second example the` <b>` element is placed inside `<a>` element. And that’s the difference: when {text} is written right after element, it doesn’t change parent context. Here’s more complex example showing why it is important:

第二个例子里 `<b> `位于 `<a> `内。这便是不同点： 当 {text} 紧跟在元素后面时，它没有改变父元素的上下文。下面用一个复杂例子来说明：

`p>{Click }+a{here}+{ to continue}`
...produces

`<p>Click <a href="">here</a> to continue</p>`

In this example, to write Click here to continue inside` <p>` element we have explicitly move down the tree with > operator after p, but in case of a element we don’t have to, since we need` <a> `element with here word only, without changing parent context.

在这个例子中，为了让 `<p> `包含 Click here to continue，p 后面使用了 > 以进入子级结构，而 a 只需要包含文本 here，不用改变父元素上下文，所以不需要这样做。

For comparison, here’s the same abbreviation written without child > operator:

下面不用 > 做下对比：

`p{Click }+a{here}+{ to continue}`
...produces

``` html
<p>Click </p>
<a href="">here</a> to continue
```

## 注意

当熟悉 Emmet 的缩写语法后，你可能为了可读性而去格式化缩写。比如在元素与操作符之间插入空格：

(header > ul.nav > li*5) + footer
But it won’t work, because space is a stop symbol where Emmet stops abbreviation parsing.

但是这时 Emmet 失效，因为 Emmet 遇到空格后停止解析缩写。

Many users mistakenly think that each abbreviation should be written in a new line, but they are wrong: you can type and expand abbreviation anywhere in the text:

许多用户错误地认为缩写应该新起一行，但是这是错的：可以在文本的任意位置书写并展开缩写。

You don’t really need to write complex abbreviations. Stop thinking that “typing” is the slowest process in web-development. You’ll quickly find out that constructing a single complex abbreviation is much slower and error-prone than constructing and typing a few short ones.

你真的没必要书写复杂的缩写。停止这样的认识：书写是网页开发中最慢的过程。你将很快发现书写一个复杂的缩写比起使用多个简短缩写，要慢得多并且容易出错。

::: tip
的确
:::