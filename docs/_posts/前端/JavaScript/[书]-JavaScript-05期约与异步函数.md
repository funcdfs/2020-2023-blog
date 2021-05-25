---
title: 【书】JavaScript Promise 与异步函数
date: 2021-05-17
tags:
    - JavaScript 高级程序设计（第四版）
    - JavaScript
---

date: 2021-05-17 初稿

之前也有一点点异步的理解，就是单线程执行任务和多线程执行任务的区分？

之前的编程模式需要对于异步函数进行回调使用，代码会变得非常复杂

## Promise 基础

绝了，这么帅气的词汇，之前懵懵懂懂的我看这个词汇就觉得非常高级。哈哈

### 基础定义

Promise，Promise 是对尚不存在结果的一个替身

Promise 的状态代表 Promise 是否完成。“待定”表示尚未开始或者正在执行中。“兑现”表示已经成功完成，而“拒绝”则表示没有成功完成。

每个 Promise 只要状态切换为兑现，就会有一个私有的内部值（value）。类似地，每个 Promise 只要状态切换为拒绝，就会有一个私有的内部理由（reason）。无论是值还是理由，都是包含原始值或对象的不可修改的引用。二者都是可选的，而且默认值为 undefined。**在 Promise 到达某个落定状态时执行的异步代码始终会收到这个值或理由。**

### 执行器函数

由于 Promise 的状态是私有的，所以只能在内部进行操作。内部操作在 Promise 的执行器函数中完成。执行器函数主要有两项职责：
初始化 Promise 的异步行为和控制状态的最终转换。其中，控制 Promise 状态的转换是通过调用**它的两个函数参数**实现的。这两个函数参数通常都命名为 `resolve()`和 `reject()`。

调用 `resolve()` 会把状态切换为兑现，调用 `reject()` 会把状态切换为拒绝。

``` js
let p1 = new Promise((resolve, reject) => resolve());
// Promise 中使用一个匿名函数

setTimeout(console.log, 0, p1); // Promise <resolved>
let p2 = new Promise((resolve, reject) => reject());
setTimeout(console.log, 0, p2); // Promise <rejected>
// Uncaught error (in promise) 
```

在初始化 promise 的时候执行器函数就进行了初始化，所以不存在异步
添加 setTimeout 可以推迟切换状态：

``` js
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000));
```

确定之后的状态不可以再次进行修改：

``` js
let p = new Promise((resolve, reject) => {
    resolve();
    reject(); // 没有效果
});
```

为了防止 Promise 卡顿，可以和一个定时退出的函数配合使用

``` js
let p = new Promise((resolve, reject) => {
    setTimeout(reject, 10000); // 10 秒后调用 reject()
    // 执行函数的逻辑
}); 
```

### promise 初始化

Promise 并非一开始就必须处于待定状态，然后通过执行器函数才能转换为落定状态。通过调用 `Promise.resolve()` 静态方法，可以实例化一个解决的 Promise。

``` js
let p1 = new Promise((resolve, reject) => resolve());
let p2 = Promise.resolve();
```
Promise.resolve(); 括号内可以传入任意值，并将其转换为一个 Promise。并且值转换第一个参数，多余的参数会被省略

创建 Promise 的 Promise，使用这方法会保留 Promise 的状态

``` js
let p = new Promise(() => {});
setTimeout(console.log, 0, p); // Promise <pending>
setTimeout(console.log, 0, Promise.resolve(p)); // Promise <pending>
setTimeout(console.log, 0, p === Promise.resolve(p)); // true
```

`Promise.reject()` 并没有照搬 `Promise.resolve()` 的幂等逻辑。如果给它传一个 Promise 对象，则这个 Promise 会成为它返回的拒绝 Promise 的理由：（不顺延）

``` js
setTimeout(console.log, 0, Promise.reject(Promise.resolve()));
// Promise <rejected>: Promise <resolved>
```

### promise 与同步

``` js
try {
    throw new Error('foo');
} catch (e) {
    console.log(e); // Error: foo
}
try {
    Promise.reject(new Error('bar'));
} catch (e) {
    console.log(e);
}
// Uncaught (in promise) Error: bar
```
第一个 try/catch 抛出并捕获了错误，第二个 try/catch 抛出错误却没有捕到。

因为它没有通过**异步模式**捕获错误。从这里就可以看出 Promise 真正的异步特性：它们是同步对象（在同步执行模式中使用），但也是异步执行模式的媒介。

拒绝 Promise 的错误并没有抛到执行同步代码的线程里，而是通过浏览器异步消息队列来处理的。因此，try/catch 块并不能捕获该错误。代码一旦开始以异步模式执行，则唯一与之交互的方式就是使用异步结构——更具体地说，就是 Promise 的方法。

## promise 实例方法

### `.then()`

为期约实例添加处理程序的主要方法。这个 then() 方法接收最多两个参数：onResolved 处理程序和 onRejected 处理程序。这两个参数都是可选的，如果提供的话，则会在期约分别进入“兑现”和“拒绝”状态时执行。

``` js
function onResolved(id) {
    setTimeout(console.log, 0, id, 'resolved');
}

function onRejected(id) {
    setTimeout(console.log, 0, id, 'rejected');
}
// 定义两个参数的具体内容

let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));
// 在 promise 中会经常使用匿名函数 快捷键：anfn

// then 通过每个实例的方法写法使用
p1.then(() => onResolved('p1'),
    () => onRejected('p1'));
p2.then(() => onResolved('p2'),
    () => onRejected('p2'));
//（3 秒后）
// p1 resolved
// p2 rejected
```

传给 then() 的任何非函数类型的参数都会被静默忽略。如果想只提供 onRejected 参数，那就要在 onResolved 参数的位置上传入 undefined

使用 then 方法的时候也可以当作右值（返回一个新的期约实例）

``` js
let p1 = new Promise(() => {});
let p2 = p1.then();
setTimeout(console.log, 0, p1); // Promise <pending>
setTimeout(console.log, 0, p2); // Promise <pending>
setTimeout(console.log, 0, p1 === p2); // false 
```

如果没有显式的指定返回值，那么就是原样顺延
如果有显式的返回值，则 Promise.resolve() 会包装这个值
参数部分是一个箭头函数
】
onRejected 处理程序也与之类似：onRejected 处理程序返回的值也会被 Promise.resolve() 包装。乍一看这可能有点违反直觉，但是想一想，onRejected 处理程序的任务不就是捕获异步错误吗？因此，拒绝处理程序在捕获错误后不抛出异常是符合期约的行为，应该返回一个解决期约。

### `.catch()`

`Promise.prototype.catch()` 方法用于给期约添加拒绝处理程序。这个方法只接收一个参数： `onRejected` 处理程序。事实上，这个方法就是一个语法糖，调用它就相当于调用 `Promise.prototype.then(null, onRejected)`。

相当于美化后的写法，让代码块的语义更加明确

``` js
let p = Promise.reject();
let onRejected = function (e) {
    setTimeout(console.log, 0, 'rejected');
};
// 这两种添加拒绝处理程序的方式是一样的：
p.then(null, onRejected); // rejected
p.catch(onRejected); // rejected
```
在返回新期约实例方面，Promise.prototype.catch() 的行为与 `Promise.prototype.then()` 的 onRejected 处理程序是一样的。

### `.finally()`

这个处理程序在期约转换为解决或拒绝状态时**都**会执行。这个方法可以避免 onResolved 和 onRejected 处理程序中出现冗余代码。

但 onFinally 处理程序没有办法知道期约的状态是解决还是拒绝

因为 onFinally 被设计为一个状态无关的方法，所以在大多数情况下它将表现为父期约的传递。对于已解决状态和被拒绝状态都是如此。

异步代码的执行顺序总是在同步代码之后，异步代码按照上下文顺序执行

### promise 错误

异步代码中的 throw 关键字抛出的错误不会像正常代码中抛出的错误，中断程序的执行
在期约中抛出错误时，因为错误实际上是从消息队列中异步抛出的，所以并不会阻止运行时继续执行同步指令：

``` js
Promise.reject(Error('foo'));
console.log('bar');
// bar
// Uncaught (in promise) Error: foo 
// 控制台的显示信息对于 promise 中出现的错误和普通代码中抛出的错误会加以区分
```

then() 和 catch() 的 onRejected 处理程序在语义上相当于 try/catch。出发点都是捕获错误之后将其隔离，同时不影响正常逻辑执行。为此，onRejected 处理程序的任务应该是在捕获异步错误之后返回一个解决的期约。

``` js
console.log('begin synchronous execution');
try {
    throw Error('foo');
} catch (e) {
    console.log('caught error', e);
}
console.log('continue synchronous execution');
// begin synchronous execution
// caught error Error: foo
// continue synchronous execution

new Promise((resolve, reject) => {
    console.log('begin asynchronous execution');
    reject(Error('bar'));
}).catch((e) => {
    console.log('caught error', e);
}).then(() => {
    console.log('continue asynchronous execution');
});
// begin asynchronous execution
// caught error Error: bar
// continue asynchronous execution
```

### promise 连锁

``` js
let p1 = new Promise((resolve, reject) => {
    console.log('p1 executor');
    setTimeout(resolve, 1000);
});
p1.then(() => new Promise((resolve, reject) => {
        console.log('p2 executor');
        setTimeout(resolve, 1000);
    }))
    .then(() => new Promise((resolve, reject) => {
        console.log('p3 executor');
        setTimeout(resolve, 1000);
    }))
    .then(() => new Promise((resolve, reject) => {
        console.log('p4 executor');
        setTimeout(resolve, 1000);
    }));
// p1 executor（1 秒后）
// p2 executor（2 秒后）
// p3 executor（3 秒后）
// p4 executor（4 秒后）

// 使用函数封装功能：
function delayedResolve(str) {
    return new Promise((resolve, reject) => {
        console.log(str);
        setTimeout(resolve, 1000);
    });
}
delayedResolve('p1 executor')
    .then(() => delayedResolve('p2 executor'))
    .then(() => delayedResolve('p3 executor'))
    .then(() => delayedResolve('p4 executor'))
// p1 executor（1 秒后）
// p2 executor（2 秒后）
// p3 executor（3 秒后）
// p4 executor（4 秒后）
```
如果不使用 promise，那么就需要之前的回调写法：

``` js
function delayedExecute(str, callback = null) {
    setTimeout(() => {
        console.log(str);
        callback && callback();
    }, 1000)
}
delayedExecute('p1 callback', () => {
    delayedExecute('p2 callback', () => {
        delayedExecute('p3 callback', () => {
            delayedExecute('p4 callback');
        });
    });
});
// p1 callback（1 秒后）
// p2 callback（2 秒后）
// p3 callback（3 秒后）
// p4 callback（4 秒后）
```

这也就是 promise 要解决的回调地狱的问题

### promise 合成

因为一个期约可以有任意多个处理程序，所以期约连锁可以构建**有向非循环图**的结构。这样，每个期约都是图中的一个节点，而使用实例方法添加的处理程序则是有向顶点。因为图中的每个节点都会等待前一个节点落定，所以图的方向就是期约的解决或拒绝顺序。

树只是期约图的一种形式。考虑到根节点不一定唯一，且多个期约也可以组合成一个期约，所以有向非循环图是体现期约连锁可能性的最准确表达。

`Promise.all()`
Promise.all() 静态方法创建的期约会在一组期约全部解决之后再解决。这个静态方法接收一个可迭代对象，返回一个新期约 如果至少有一个包含的期约待定，则合成的期约也会待定。如果有一个包含的期约拒绝，则合成的期约也会拒绝

`Promise.race()`
Promise.race() 静态方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。这个方法接收一个可迭代对象，返回一个新期约

race 嘛，比谁最快

Promise.race()静态方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。这个方法接收一个可迭代对象，返回一个新期约

### promise 扩展

期约取消
期约进度通知

ES6 不支持取消期约和进度通知，可以通过扩展实现

TODO 原因：ES6 不支持取消期约和进度通知

## 异步函数

为了简化异步代码的使用方式

### async

async 关键字用于声明异步函数。这个关键字可以用在函数声明、函数表达式、箭头函数和方法上：

``` js
async function foo() {}
let bar = async function () {};
let baz = async () => {};
class Qux {
    async qux() {}
}
```
使用 async 关键字可以让函数具有异步特征，但总体上其代码仍然是同步求值的。而在参数或闭包方面，异步函数仍然具有普通 JavaScript 函数的正常行为

异步函数如果使用 return 关键字返回了值（如果没有 return 则会返回 undefined），这个值会被 Promise.resolve()包装成一个期约对象。异步函数始终返回期约对象


``` js
async function foo() {
    console.log(1);
    return 3;
    // 或者直接返回一个期约对象：return Promise.resolve(3); 
}
foo().then(console.log);
console.log(2);
// 123
```

关于返回值：


``` js
// 返回一个原始值
async function foo() {
    return 'foo';
}
foo().then(console.log);
// foo
// 返回一个没有实现 thenable 接口的对象
async function bar() {
    return ['bar'];
}
bar().then(console.log);
// ['bar']
// 返回一个实现了 thenable 接口的非期约对象
async function baz() {
    const thenable = {
        then(callback) {
            callback('baz');
        }
    };
    return thenable;
}
baz().then(console.log);
// baz
// 返回一个期约
async function qux() {
    return Promise.resolve('qux');
}
qux().then(console.log);
// qux
```

### await

因为异步函数主要针对不会马上完成的任务，所以自然需要一种暂停和恢复执行的能力。使用 await关键字可以暂停异步函数代码的执行，等待期约解决。


### 停止和恢复执行

async/await 中真正起作用的是 await。async 关键字，无论从哪方面来看，都不过是一个标识符。毕竟，异步函数如果不包含 await 关键字，其执行基本上跟普通函数没有什么区别

要完全理解 await 关键字，必须知道它并非只是等待一个值可用那么简单。JavaScript 运行时在碰到 await 关键字时，会记录在哪里暂停执行。等到 await 右边的值可用了，JavaScript 运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。

因此，即使 await 后面跟着一个立即可用的值，函数的其余部分也会被异步求值。

``` js
async function foo() {
    console.log(2);
    await null;
    console.log(4);
}
console.log(1);
foo();
console.log(3);
// 1
// 2
// 3
// 4 
```
- 1 打印 1；
- 2 调用异步函数 foo()；
- 3（在 foo()中）打印 2；
- 4（在 foo()中）await 关键字暂停执行，为立即可用的值 null 向消息队列中添加一个任务；
- 5 foo()退出；
- 6 打印 3；
- 7 同步线程的代码执行完毕；
- 8 JavaScript 运行时从消息队列中取出任务，恢复异步函数执行；
- 9（在 foo()中）恢复执行，await 取得 null 值（这里并没有使用）；
- 10（在 foo()中）打印 4；
- 11 foo()返回

## 异步函数策略

### 实现 sleep 


``` js
async function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
async function foo() {
    const t0 = Date.now();
    await sleep(1500); // 暂停约 1500 毫秒
    console.log(Date.now() - t0);
}
foo();
// 15xx 取决于机器速度
```

### 利用平行执行


``` js
async function randomDelay(id) {
    // 延迟 0~1000 毫秒
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(() => {
        console.log(`${id} finished`);
        resolve();
    }, delay));
}
async function foo() {
    const t0 = Date.now();
    await randomDelay(0);
    await randomDelay(1);
    await randomDelay(2);
    await randomDelay(3);
    await randomDelay(4);
    console.log(`${Date.now() - t0}ms elapsed`);
}
foo();
// 0 finished
// 1 finished
// 2 finished
// 3 finished
// 4 finished
// 877ms elapsed
```

就算这些期约之间没有依赖，异步函数也会依次暂停，等待每个超时完成。这样可以保证执行顺序，但总执行时间会变长。如果顺序不是必需保证的，那么可以先一次性初始化所有期约，然后再分别等待它们的结果

``` js
async function randomDelay(id) {
    // 延迟 0~1000 毫秒
    const delay = Math.random() * 1000;
    return new Promise((resolve) => setTimeout(() => {
        setTimeout(console.log, 0, `${id} finished`);
        resolve();
    }, delay));
}
async function foo() {
    const t0 = Date.now();
    const p0 = randomDelay(0);
    const p1 = randomDelay(1);
    const p2 = randomDelay(2);
    const p3 = randomDelay(3);
    const p4 = randomDelay(4);
    await p0;
    await p1;
    await p2;
    await p3;
    await p4;
    setTimeout(console.log, 0, `${Date.now() - t0}ms elapsed`);
}
foo();
```
### 串行执行期约
### 栈追踪与内存管理
