---
title: 基本 HTML 结构
---

###### Wed Apr 8 10:56:17 CST 2020
###### Wed Apr 8 22:02:34 CST 2020

## 构建框架 

创建清晰、一致的结构不仅可以为页面建立良好的语义化基础, 也可以大大降低在文档中应用层叠样式表（CSS）的难度

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Your page title</title>
</head>

<body>
</body>

</html>
```
这是每个 HTML 页面的基础。缩进并不重要, 但结构很重要。在这个例子中, 默认语言（由 lang 属性指定）被设为代表英语的 en。字符编码被设为 UTF-8 

1. 输入 `<!DOCTYPE html>`, 声明页面为 HTML5 文档。
2. 输入 `<html lang=" language-code ">`,  开始文档的实际 HTML 部分。其中,  `language- code` 是页面内容默认语言的代码。例如, ` <html lang="es">` 表示西班牙, `<html lang="fr"> `表示法语。还可以写得更详细些, 如` <html lang="en-US"> `表示美国英语, 而 `<html lang= "en-GB"> `则表示英国英语。
3. 输入`<head>`, 开始网页文档的头部。 
4. 输入`<meta charset="utf-8"/>`（或`<meta charset="UTF-8"/>`）, 将文档的字符编码 声明为 UTF-8。空格和斜杠是可选的, 因此 `<meta charset="utf-8">` 跟其他表达式形式都是有效的。（UTF-8 以外的其他字符编码也是有效的, 不过 UTF-8 的适用面最广, 很少有需要用其他编码的情况。） 
5. 输入 `<title></title>`。这里将包含页面的标题。
6. 输入`</head>`, 结束页面文档的头部。 
7. 输入 `<body>`, 开始页面的主体。这里是放置页面内容的地方。
8. 为页面内容预留一些空行
9. 输入 `</body>`, 结束主体。 
10. 输入 `</html>`, 结束 html 页面。 

HTML 页面分为两个部分：head 和 body. DOCTYPE 出现在每个页面的开头, 就像一本书的序言。在文档 head 部分, 通常要指明页面标题, 提供为搜索引擎准备的关于页面本身的信息, 加载样式表, 以及加载 JavaScript 文件（不过, 出于性能考虑, 多数时候在页面底部 `</body>` 标签结束前加载 JavaScript 是更好的选择）。

除了 title, 其他 head 里的内容对页面访问者来说都是不可见的。 

## 页面标题 title

title 元素是必需的

title 元素必须位于 head 部分, 将它放置在指定字符编码的 meta 元素后面

要让每个页面的 title 是唯一的,  从而提升搜索引擎结果排名, 并让访问者获得更好的体验。

title 中不能包含任何格式、HTML、 图像或指向其他页面的链接

搜索引擎会将 title 作为判断页面主要内容的指标, 并将页面内容按照与之相关的文字进行索引。 有效的 title 应包含几个与页面内容密切相关的关键字。 

建议将 title 的核心内容放在前 60 个字符（含空格）中, 因为搜索引擎通常将超过此数目（作为基准）的字符截断。不同浏览器显示在标题栏中的字符数上限不尽相同。浏览器标签页会将标题截得更短,  因为它占的空间较少。

对任何页面来说, 分级标题都可以说是最重要的 HTML 元素。由于标题通常传达的是页面的主题, 因此, 对搜索引擎而言, 如果标题与搜索词匹配, 这些标题就会被赋予很高的权重, 尤其是等级最高的 h1（这并不是说页面中的 h1 越多越好, 搜索引擎还是足够聪明的）。

示例：
```html
...

<body>
    <h1>Product User Guide</h1>
        <h2>Setting it up</h2>
        <h2>Basic Features</h2>
            <h3>Video Playback</h3>
                <h4>Basic Controls</h4>
                <h4>Jumping to Markers</h4>
            <h3>Recording Video</h3>
                <h4>Manual Recording</h4>
                <h4>Scheduling a Recording</h4>
        <h2>Advanced Features</h2>
            <h3>Sharing Video</h3>
            <h3>Compressing Video</h3>
</body>
</html>
```
>在默认情况下, 浏览器会从 h1 到 h6 逐级减小标题的字号, （在 有的浏览器里, 嵌套在特定元素中的 h1 和 h2 在默认情况下看起来是一样的。）不过别忘了要依据内容所处的层次关系选择标题级数,  而不是根据你希望文字应该显示的大小。使用 CSS 可以按照你希望的样子为标题添加样式, 包括 字体、字号、颜色等。

创建分级标题时, 要避免跳过某些级别, 如从 h3 直接跳到 h5

## 普通页面构成

![20200408113743](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408113743.png)
![20200408113501](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408113501.png)

>一个普通的布局, 顶部是主导航, 左侧是主要内容, 右侧是附注栏, 底部是页脚。要让页面成为这个样子, 需要添加 CSS

现在, 在没有引入 CSS 的情况下, 还无法像这样为页面添加样式。不过, 应用到这些常规页面结构的语义都是非常相似的, 与布局无关。以下大部分内容都会讲解这些结构。按照从页面顶端向下的顺序, 将依次讲解用 header、nav、main、article、section、aside 和 footer 定义页面的结构, 以及用来添加额外样式信息或实现其他目的的通用容器 div。除 了 div 以外, 这些元素都是 HTML5 推出后才有的。 在学习这些元素的过程中, 不要关心它们在示例布局中的位置, 而应该关注它们的语义。

## 创建页眉 header

一个页面可以有任意数量的 header 元素, 它们的含义可以根据其上下文而有所不同。例如, 处于页面顶端或接近这个位置的 header 可能代表整个页面的页眉（有时称为 页头）, 通常, 页眉包括网站标志、主导航和其他全站链接,  甚至搜索框这无疑是 header 元 素最常见的使用形式, 不过不要误认为是唯一的形式。

例如我的 vuepress：
![20200408114438](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408114438.png)

eg:

```html
...

<body>
    <header role="banner">
        <nav>
            <ul>
                <li><a href="#gaudi">Barcelona's ➝ Architect</a></li>
                <li lang="es"><a href="#sagrada- ➝ familia">La Sagrada Família</a> ➝ </li>
                <li><a href="#park-guell">Park ➝ Guell</a></li>
            </ul>
        </nav>
    </header>
</body>

</html>
```

1. 将光标放置在需要创建页眉的元素里。
2.  输入 `<header>`。 
3.  输入页眉的内容, 包括各种类型的内容, 它们分别由各自的 HTML 元素（余下部分将会有其中的大多数）进行标记。例如, header 可以包含 h1 ～ h6 标题、标识、 导航、搜索框, 等等
4.  不能在 header 里嵌套 footer 元素或 另一个 header, 也不能在 footer 或 address 元素里嵌套 header。

## 标记导航 nav

HTML 的早期版本没有元素明确表示主导航链接的区域, 而 HTML5 则有这样一个元素, 即 nav。nav 中的链接可以指向页面中的内容, 也可以指向其他页面或资源, 或者两者兼而有之。无论是哪种情况,  应该仅对文档中重要的链接群使用 nav

```html
<body>
    <header role="banner">
        <nav role="navigation">
            <ul>
                <li><a href="#gaudi">Barcelona's Architect</a></li>
                <li lang="es"><a href="#sagrada-familia">La Sagrada Família</a> </li>
                <li><a href="#park-guell">Park-Guell</a></li>
            </ul>
        </nav>
    </header>
</body>

</html>
```
>　这些链接（a 元素）代表一组重要的导航,  因此将它们放入一个 nav 元素。role 属性并不是必需的, 不过它可以提高可访问性

![20200408115535](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408115535.png)

在默认情况下, 我们的导航看起来相当普通。那些圆点并不是由 nav 元素产生的。除了开启一个新行以外, 该元素没有任何默认样式。显示这些圆点是因为每个链接都包在一个 li 元素（列表项）里面。使用 CSS 可以隐藏这些圆点或显示其他的东西, 还可以将这些链接水平显示, 改变它们的颜色, 让它们看起来像按钮, 等等

将一组链接指定为重要导航
1. 输入 `<nav>`。
2. 输入一组链接并将其标记为 ul（无序列表）结构, 除非链接的顺序比较重要（例如面包屑导航）。如果链接顺序重要, 就将 其标记为 ol（有序列表）结构
3. 输入 `</nav>`

> nav 能帮助人们识别页面的主导航, 并允许用户通过键盘直接跳至这些链接。这可以提高页面的可访问性, 提升访问者的体验。

HTML5 不允许将 nav 嵌套在 address 元素中。

## 标记页面的主要区域 main

大多数网页都有一些不同的区块, 如页眉、页脚、包含额外信息的附注栏、指向其他网站的链接, 等等。不过, 一个页面只有一个部分代表其主要内容。可以将这样的内容包在 main 元素中, 该元素在一个页面仅使用一次

```html
...
<body>
    <header role="banner">
        <nav role="navigation">
            ... [包含多个链接的 ul] ...
        </nav>
    </header>
    <main role="main">
        <article>
            <h1 id="gaudi">Barcelona's Architect</h1>
            <p>Antoni Gaudí's incredible buildings bring millions ...</p>
            ... [页面主要区域的其他内容] ...
        </article>
    </main>
    <aside role="complementary">
        <h1>Architectural Wonders of Barcelona </h1>
        ... [附注栏的其他内容] ...
    </aside>
    <footer role="contentinfo">
        ... [版权] ...
    </footer>
</body>
</html>
```
> main 元素是 HTML5 新添加的元素。记住, 在一个页面里仅使用一次。

![20200408150750](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408150750.png)
>p、header、footer 等元素一样, main 元素的内容显示在新的一行, 除此之外不会影响页面的任何样式。（这里显示的布局并不是由 main 产生的, 而是由 CSS 控制的。）这里为了方便你在应用了样式的完整页面中识别出 main, 特意为其添加了蓝色的边框

不能将 main 放置在 article、aside、footer、header 或 nav 元素中。

role="main" 可以帮助屏幕阅读器定位页面的主要区域。以后会进一步了解这样的 ARIA 地标。

## 创建文章 article

HTML5 的另一个新元素便是 article, 

```html
...

<body>
    <header role="banner">
        <nav role="navigation">
            ... [包含多个链接的 ul] ...
        </nav>
    </header>
    <main role="main">
        <article>
            <h1 id="gaudi">Barcelona's Architect
                ➝ </h1>
            <p>Antoni Gaudí's incredible buildings
                ➝ bring millions of tourists to
                ➝ Barcelona each year.</p>
            <p>Gaudí's non-conformity, already
                ➝ visible in his teenage years,
                ➝ coupled with his quiet but firm
                ➝ devotion to the church, made a
                ➝ unique foundation for his thoughts
                ➝ and ideas. His search for simplicity
                ➝...is quite apparent in his work,
                ➝ from the <a href="#park-guell">Park
                    ➝ Guell</a> and its incredible
                ➝ sculptures and mosaics, to...</p>
            <h2 id="sagrada-familia" lang="es">
                ➝ La Sagrada Família</h2>
            <p><img src="img/towers.jpg" ➝ width="75" height="100" alt="Sagrada
    ➝ Família Towers" /> The
                ➝ complicatedly named and curiously
                ➝ unfinished masterpiece...</p>
            <h2 id="park-guell">Park Guell</h2>
            ... [图像和段落] ...
        </article>
    </main>
</body>

</html>
```
>尽管在这个例子里只有段落和图像, 但 article 可以包含各种类型的内容

HTML5 对该元素的定义如下：
$\qquad$article 元素表示文档、页面、应用或网站中一个独立的容器, 原则上是可独立分配或可再用的, 就像聚合内容中的各部分。它可以是一篇论坛帖子、一篇杂志或报纸文章、一篇博客条目、一则用户提交的评论、一个交互式的小部件或小工具, 或者任何其他独立的内容项。

其他 article 的例子包括电影或音乐评论、案例研究、产品描述, 等等。你或许惊讶于它还可以是交互式的小部件或小工具, 不过这些确实是独立的、可再分配的内容项。

创建文章的步骤
1. 输入 `<article>`。
2. 输入文章的内容。内容可以包含任意数量的元素。元素类型包括段落、列表、音频、视频、图像、图形等。
3. 输入 `</article>`。

一个页面可以有多个 article 元素（也可以没有）。例如, 博客的主页通常包括几篇最新的文章, 其中每一篇都是其自身的 article。

## 定义区块 section

另一个 HTML5 的新元素是 section,  section 元素代表文档或应用的一个一般的区块。在这里, section **是具有相似主题的一组内容**, 通常包含一个标题。section 的例子包含章节、标签式对话框中的各种标签页、论文中带编号的区块。比如网站的主页可以分成介绍、新闻条目、联系信息等区块。

尽管我们将 section 定义成“通用的”区块, 但不要将它与 div 元素混淆。从语义上讲, section 标记的是页面中的特定区域, 而 div 则不传达任何语义

```html
...

<body>
    ...
    <main role="main">
        <h1>Latest World News</h1>
        <section>
            <h2>Breaking News</h2>
            <ul>... [标题列表] ...</ul>
        </section>
        <section>
            <h2>Business</h2>
            <ul>... [标题列表] ...</ul>
        </section>
        <section>
            <h2>Arts</h2>
            <ul>... [标题列表] ...</ul>
        </section>
    </main>
    ...
</body>

</html>
```

> 几乎任何新闻网站都会对新闻进行分类。每个类别都可以标记为一个 section

```html
...
<h1>Graduation Program</h1>
<section>
    <h2>Ceremony</h2>
    <ol>
        <li>Opening Procession</li>
        <li>Speech by Valedictorian</li>
        <li>Speech by Class President</li>
        ...
    </ol>
</section>
<section>
    <h2>Graduates (alphabetical)</h2>
    <ol>
        <li>Molly Carpenter</li>
        ...
    </ol>
</section>
...
```
>section 元素用于标记一次毕业活动安排中的不同部分

![20200408154155](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408154155.png)

>跟本章很多其他的元素一样, section 并不影响页面的显示。这里用数字编号展示各个条目是因为图中使用了有序列表（ol）。

定义区块的步骤
1. 输入 `<section>`。
2. 输入区块的内容。内容可以包含任意数量的元素。元素类型包括段落、列表、音频、视频、图像、图形等。
3. 输入 `</section>`。

如果只是出于添加样式的原因要对内容添加一个容器, 应使用 div 而不是 section。可以将 section 嵌套在 article 里, 从而显式地标出报告、故事、手册等文章的不同部分或不同章节。

## 指定附注栏 aside 

有时候, 页面中有一部分内容与主体内容相关性没有那么强, 但可以独立存在, 如何在语义上表示出来呢？在 HTML5 之前一直无法显式地做到这一点。在 HTML5 中, 我们有了 aside 元素。

使用 aside 的例子还包括重要引述、侧栏、指向相关文章的一组链接（通常针对新闻网站）、广告、nav 元素组（如博客的友情链接）, Twitter 源、相关产品列表（通常针对电子商务网站）, 等等。

尽管我们很容易将 aside 元素看做侧栏, 但该元素其实可以用在页面的很多地方, 具体依上下文而定。如果 aside 嵌套在页面主要内容内（而不是作为侧栏位于主要内容之外）, 则其中的内容应与其所在的内容密切相关, 而不是仅与页面整体内容相关。

```html

```
> 这个 aside 是有关巴塞罗那建筑奇迹的信息, 与页面主要关注的 Antoni Gaudí 内容相关性稍差, 且可以在没有这个上下文的情况下独立存在。可以将它嵌套在 article 里面, 因为它们是相关的, 但最终我将它放在了 article 后面, 使用 CSS 让它看起来像侧栏。aside 里面的 role="complementary" 是可选的, 但它可以提高可访问性

![20200408155141](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408155141.png)

>aside 出现在文章的下面, 因为在 HTML 中 aside 就跟在 article 的后面, 可以看到, 浏览器在默认情况下并未对 aside 应用任何特殊样式（除了从新行开始）。不过, 可以通过 CSS 控制其外观显示

指定附注栏的步骤
1. 输入 `<aside>`。
2. 输入附注栏的内容。内容可以包含任意数量的元素。元素类型包括段落、列表、音频、视频、图像、图形等。
3. 输入 `</aside>`。

![20200408155410](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408155410.png)

>对已完成的页面应用 CSS 时, 可以让 aside（以 Architectural Wonders of Barcelona 开头）显示在主要内容的旁边, 而不是下边。这个例子已将 aside 做成了侧栏

在 HTML 中, 应该将附注栏内容放在 main 的内容之后。出于 SEO 和可访问性的目的, 最好将重要的内容放在前面。可以通过 CSS 改变它们在浏览器中的显示顺序。对于与内容有关的图像（如图表、图形或带有说明文字的插图）, 使用 figure 而非 aside。HTML5 不允许将 aside 嵌套在 address 元素内。

## 创建页脚 footer

当你想到页脚的时候, 你大概想的是页面底部的页脚（通常包括版权声明, 可能还包括指向隐私政策页面的链接以及其他类似的内容）。HTML5 的 footer 元素可以用在这样的地方, 但它同 header 一样, 还可以用在其他的地方。

footer 元素代表嵌套它的最近的 article、aside、blockquote、body、details、fieldset、figure、nav、section 或 td 元素的页脚。只有当它最近的祖先是 body 时, 它才是整个页面的页脚

如果一个 footer 包着它所在区块（如一个 article）的所有内容, 它代表的是像附录、索引、版权页、许可协议这样的内容。

创建页脚的步骤
1. 将光标放在希望创建页脚的元素里。
2. 输入 `<footer>`。
3. 输入页脚的内容。
4. 输入 `</footer>`。
   
页脚通常包含关于它所在区块的信息, 如指向相关文档的链接、版权信息、作者及其他类似条目。页脚并不一定要位于所在元素的末尾, 不过通常是这样的。

```html
<footer>
    <p><small>&copy; Copyright All About Gaudí</small></p>
</footer>
</body>

</html>
```
![20200408160340](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408160340.png)
>footer 元素本身不会为文本添加任何默认样式。这里, 版权信息的字号比普通文本的小, 这是因为它嵌套在“用来对法律文本进行语义化”的 small 元素里。像其他内容一样, 可以通过 CSS 修改 footer 元素所含内容的字号

只能对页面级的 footer 使用`role="contentinfo"`, 且一个页面只能使用一次

## 创建通用容器 div

有时需要在一段内容外围包一个容器, 从而可以为其应用 CSS 样式或 JavaScript 效果。如果没有这个容器, 页面就会不一样。在评估内容的时候, 考虑使用 article、section、aside、nav 等元素, 却发现它们从语义上讲都不合适。
这时, 你真正需要的是一个通用容器, 一个完全没有任何语义含义的容器。这个容器就是 div（来自 division 一词）元素。有了 div, 就可以为其添加 CSS 或 JavaScript 效果了。

```html
...

<body>
    <div>
        <header role="banner">
            <nav role="navigation">
                ... [包含多个链接的无序列表] ...
            </nav>
        </header>
        <main role="main">
            <article>
                <h1 id="gaudi">Barcelona's
                    ➝ Architect</h1>
                ... [文章的其余内容] ...
                <h2 id="sagrada-familia" lang="es">
                    ➝ La Sagrada Família</h2>
                ... [图像和段落] ...
                <h2 id="park-guell">Park Guell</h2>
                ... [另一个图像和段落] ...
            </article>
        </main>
        <aside role="complementary">
            <h1>Architectural Wonders of
                ➝ Barcelona</h1>
            ... [aside 的其余内容] ...
        </aside>
        <footer role="contentinfo">
            <p><small>&copy; Copyright All About
                    ➝ Gaudí</small></p>
        </footer>
    </div>
</body>

</html>
```
> 现在有一个 div 包着所有的内容。页面的语义没有发生改变, 但现在我们有了一个可以用 CSS 添加样式的通用容器, div 元素自身没有任何默认样式, 只是其包含的内容从新的一行开始。不过, 我们可以对 div 添加样式以实现自己的设计。对 div 可以添加浅的背景色和阴影, 这样我就可以将 body 元素的背景改为渐变的红色, 使内容凸显出来。

创建通用容器的步骤：
1. 输入 `<div>`。
2. 创建容器的内容, 内容可以包含任意数量的元素。
3. 在容器的结尾处输入 `</div>`。

div 对使用 JavaScript 实现一些特定的交互行为或效果也是有帮助的。例如, 在页面中展示一张照片或一个对话框, 同时让背景页面覆盖一个半透明的层（这个层通常是一个 div）。

div 应该作为最后一个备用容器, 因为它没有任何语义价值。大多数时候, 使用 header、footer、main（仅使用一次）、article、section、aside 甚至 nav 代替 div 会更合适。

## 使用 ARIA 改善可访问性

`WAI-ARIA（Web Accessibility Initiative’s Accessible Rich Internet Applications)`, 无障碍网页倡议 – 无障碍的富互联网应用, 也简称 ARIA）是一种技术规范, 自称“有桥梁作用的技术”。之所以这样说, 是因为在 HTML 提供相应的语义功能之前, 它会使用属性来填补一些语义上的空白。

无障碍访问的意义是让所有的访问者都能获取网站的内容。你的网站的一部分访问者可能需要借助辅助设备（如屏幕阅读器）访问你的页面内容

让网站具备无障碍访问功能是成为严肃负责的 Web 公民的重要方面。

幸运的是, 在大多数情况下, 让页面具有无障碍访问功能并不难。只要对内容使用最恰当的 HTML 进行标记, 就能改进网站的可访问性。

role="banner"（横幅）
面向全站的内容, 通常包含网站标志、网站赞助者标志、全站搜索工具等。横幅通常显示在页面的顶端, 而且通常横跨整个页面的宽度, 将其添加到页面级的 header 元素, 每个页面只用一次

role="navigation"（导航）
文档内不同部分或相关文档的导航性元素（通常为链接）的集合与 nav 元素是对应关系。应将其添加到每个 nav 元素, 或其他包含导航性链接的容器。这个角色可在每个页面上使用多次, 但是同 nav 一样, 不要过度使用该属性

role="main"（主体）
文档的主要内容与 main 元素是对应关系。最好将其添加到 main 元素, 也可以添加到其他表示主体内容的元素（可能是 div）。在每个页面仅使用一次

role="complementary"（补充性内容）
文档中作为主体内容补充的支撑部分。它对区分主体内容是有意义的与 aside 元素是对应关系。应将其添加到 aside 或 div 元素（前提 是该 div 仅包含补充性内容）可以在一个页面里包含多个 complementary 角色, 但不要过度使用

role="contentinfo"（内容信息）
包含关于文档的信息的大块可感知区域这类信息的例子包括版权声明和指向隐私权声明的链接等将其添加至整个页面的页脚（通常为 footer 元素）。每个页面仅使用一次

> 即便不使用 ARIA 地标角色, 页面看起来也没有任何差别, 但是使用它们可以提升使用辅助设备的用户的体验

## 为元素指定class、id、title 

尽管并非必需, 但是可以给 HTML 元素分配唯一的标识符（ID）, 或指定其属于某个（或某几个）类别, 也可以同时指定标识符和类别。接着, 就可以对具有给定 id 或 class 名称的元素添加样式了（但一般不推荐出于添加样式的目的使用 id）；或者创建指向具有特定 id 的元素的链接（图 3.14.1）；还可以使用 JavaScript 获取 id 和 class 属性, 从而对元素添加特定的行为。

```html
...

<body>
    <div class="container">
        <header role="banner">
            <nav role="navigation">
                <ul>
                    <li><a href="#gaudi">Barcelona's
                            ➝ Architect</a></li>
                    <li><a href="#sagrada-familia" ➝ lang="es">La Sagrada Família
                            ➝ </a></li>
                    <li><a href="#park-guell">Park
                            ➝ Guell</a></li>
                </ul>
            </nav>
        </header>
        <main role="main">
            <article class="architect gaudi">
                <h1 id="gaudi">Barcelona's
                    ➝ Architect</h1>
                <p>Antoni Gaudí's incredible
                    ➝ buildings...</p>
                ...
                <h2 id="sagrada-familia" lang=➝ "es">La Sagrada Família</h2>
                ...
                <h2 id="park-guell">Park Guell
                    ➝ </h2>
                ...
            </article>
        </main>
        ...
    </div>
</body>

</html>
```

> nav 中的链接指向 h1 和 h2 中的 id。为一个或多个元素添加 class 属性, 就可以对所有这类元素统一进行格式化。例如, 可以将 architect 类应用到关于其他建筑师的内容, 从而为它们应用一致的格式；gaudi 类可以为与他相关的内容提供另一种样式

在元素的开始标签中输入 id="name", 其中 name 是唯一标识该元素的名称。name 几乎可以是任何字符, 只要不以数字开头且不包含空格。

`<h2 id="park-guell">`

>HTML 文档中的每个 id 都必须是唯一的。换句话说, 一个页面里不能出现两个具有相同 id 的元素, 并且每个元素都只能有一个 id。相同的 id 可以出现在不同的页面里, 同一 id 也不一定每次都赋给同一元素, 尽管这是惯常的做法。

在元素的开始标签中输入`class="name"`, 其中 name 是类别的名称。如果要指定多个类别, 用空格将不同的类别名称分开即可, 如 `class="name anothername"`。（可以指定两个以上的类别名称。

> 推荐使用类为元素添加样式。相反, 一个 class 名称可以分配给页面中任意数量的元素, 并且一个元素可以有一个以上的 class。

class 和 id 属性可以应用于任何 HTML 元素。元素可以同时拥有 id 和任意数量的 class。

在 class 和 id 名称中, 通常使用短横线分隔多个单词, 例如 `class="footer-page"`。

***
不管你打算如何使用 id 和 class, 都应该为它们选择有意义的名称。例如, 如果你使用 class 是出于格式化目的, 应避免使用描述表现样式的名称, 如 class="red", 因为你可能在下周决定将配色方案改为蓝色。尽管在 CSS 中对分配给某一类元素的颜色进行修改是相当容易的, 但这样做会导致你的 HTML 拥有一个名为红色却实际呈现为另一种颜色的 class。同时, 改变 HTML 中所有的 class 通常是一项繁琐的工作。这点在开始学习 CSS 之后尤为明显。
>应该具有好的代码风格
***

可以使用 title 属性（不要与 title 元素混淆）为网站上任何部分加上提示标签。不过, 它们并不只是提示标签, 加上它们之后屏幕阅读器可以为用户朗读 title 文本, 因此使用 title 可以提升无障碍访问功能。

可以为任何元素添加 title, 不过用的最多的是链接
当访问者将鼠标指向加了说明标签的元素时, 就会显示 title（文字悬浮显示）
![20200408215609](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/img/20200408215609.png)

在要添加 title 的 HTML 元素中, 输入`title="label"`, 其中 label 是访问者将鼠标移到这个元素上时希望出现在提示框里的文本, 或者希望由屏幕阅读器朗读的文本。

如果 img 元素同时包括 title 和 alt 属性, 则提示框会采用 title 属性的内容, 而不是 alt 属性的内容。

`<!--`注释`-->`

在主要区块的开头和结尾处添加注释是一种常见的做法, 这样可以让你或一起合作的开发人员将来修改代码变得更加容易。在发布网站之前, 应该用浏览器查看一下加了注释的页面。这样能帮你避免由于弄错注释格式导致私人化的注释内容直接暴露给公众访问者的情况。对特别私人化的注释要格外小心。尽管通常通过浏览器访问页面不会看见注释内容, 但通过浏览器的“查看源代码”功能就能看见它们, 如果用户将网页保存为 HTML源代码, 他们也能看见这些注释

