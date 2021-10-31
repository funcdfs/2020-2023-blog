---
title: golang container
date: 2021-10-26
tags:
    - Go
---

`container` 包，实现了三个复杂的数据结构：堆，链表，环。

## heap 

这里的堆使用的数据结构是最小二叉树，即根节点比左边子树和右边子树的所有值都小。   
go 的堆包只是实现了一个接口，我们看下它的定义：

``` go
type Interface interface {
    sort.Interface
    Push(x interface{}) // add x as element Len()
    Pop() interface{}   // remove and return element Len() - 1.
}
```

可以看出，这个堆结构继承自 `sort.Interface`, 回顾下 `sort.Interface`，它需要实现三个方法

- `Len() int`
- `Less(i, j int) bool`
- `Swap(i, j int)`

加上堆接口定义的两个方法

- `Push(x interface{})`
- `Pop() interface{}`


``` go
type IntHeap []int

func (h IntHeap) Len() int           { return len(h) } // 返回 h 的长度
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] } // 小根堆
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] } // 交换两个值

func (h *IntHeap) Push(x interface{}) {
    *h = append(*h, x.(int))
} // 实现自定义的 Push 接口 调用 append

func (h *IntHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n - 1]
    *h = old[0 : n - 1]
    return x
} // 实现自定义的 Pop 接口，使用切片操作删除最后一个元素
```

那么 `IntHeap` 就实现了这个堆结构，我们就可以使用堆的方法来对它进行操作：


``` go
h := &IntHeap{2, 1, 5}
heap.Init(h)
heap.Push(h, 3)
heap.Pop(h)
```

## List

链表就是一个有 `prev` 和 `next` 指针的数组了。它维护两个 `type` ( 注意，这里不是 `interface`)


``` go
type Element struct {
    next, prev *Element  // 上一个元素和下一个元素
    list *List           // 元素所在链表
    Value interface{}    // 元素
}

type List struct {
    root Element  // 链表的根元素
    len  int      // 链表的长度
}
```

List 的方法：


``` go
type Element
    func (e *Element) Next() *Element
    func (e *Element) Prev() *Element
type List
    func New() *List
    func (l *List) Back() *Element       // 最后一个元素
    func (l *List) Front() *Element      // 第一个元素
    func (l *List) Init() *List          // 链表初始化，无参数

    func (l *List) PushBack(v interface{}) *Element  // 在队列最后插入元素 v
    func (l *List) PushBackList(other *List)         // 在队列最后插入接上新队列
    func (l *List) PushFront(v interface{}) *Element // 在队列头部插入元素
    func (l *List) PushFrontList(other *List)        // 在队列头部插入接上新队列
    func (l *List) Remove(e *Element) interface{}    // 删除某个元素
    func (l *List) InsertAfter(v interface{}, mark *Element) *Element   // 在某个元素后插入
    func (l *List) InsertBefore(v interface{}, mark *Element) *Element  // 在某个元素前插入

    func (l *List) Len() int             // 链表长度
    func (l *List) MoveAfter(e, mark *Element)   // 把 e 元素移动到 mark 之后
    func (l *List) MoveBefore(e, mark *Element)  // 把 e 元素移动到 mark 之前
    func (l *List) MoveToBack(e *Element)        // 把 e 元素移动到队列最后
    func (l *List) MoveToFront(e *Element)       // 把 e 元素移动到队列最头部
```

## ring 

环的结构有点特殊，环的尾部就是头部，所以每个元素实际上就可以代表自身的这个环。 它不需要像 list 一样保持 list 和 element 两个结构，只需要保持一个结构就行。


``` go
type Ring struct {
    next, prev *Ring
    Value      interface{}
}
```

我们初始化环的时候，需要定义好环的大小，然后对环的每个元素进行赋值。环还提供一个 Do 方法，能遍历一遍环，对每个元素执行一个 `function` 。 看下面的例子：

``` go
package main

import (
    "container/ring"
    "fmt"
)

func main() {
    ring := ring.New(3)

    for i := 1; i <= 3; i++ {
        ring.Value = i
        ring = ring.Next()
    }

    // 计算 1 + 2 + 3
    s := 0
    ring.Do(func(p interface{}){
        s += p.(int)
    })
    fmt.Println("sum is", s)
}

// output:
// sum is 6
```

ring 的方法 

``` go
type Ring
    func New(n int) *Ring                   // 初始化环
    func (r *Ring) Do(f func(interface{}))  // 循环环进行操作
    func (r *Ring) Len() int                // 环长度
    func (r *Ring) Link(s *Ring) *Ring      // 连接两个环
    func (r *Ring) Move(n int) *Ring    // 指针从当前元素开始向后移动或者向前（n 可以为负数）
    func (r *Ring) Next() *Ring         // 当前元素的下个元素
    func (r *Ring) Prev() *Ring         // 当前元素的上个元素
    func (r *Ring) Unlink(n int) *Ring  // 从当前元素开始，删除 n 个元素
```