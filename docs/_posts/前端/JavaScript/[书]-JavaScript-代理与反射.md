---
title: 【书】JavaScript 代理与反射
date: 2021-05-11
tags:
    - JavaScript 高级程序设计（第四版）
    - JavaScript
---

date: 2021-05-11 初稿

## 代理基础

::: note 
哇哇哇，JavaScript 高级部分的内容终于要开始了
哇哇哇，梦开始的地方
:::

### 基础创建

``` js 
const target = {
    id: 'target'
};
const handler = {
    
};
const proxy = new Proxy(target, handler);
// 之后使用 proxy 就可以和使用 target 原对象达到相同效果
// 使用严格相等可以区分代理和目标
console.log(target === proxy); // false 
```

### 定义捕获器

每个处理程序对象可以包含零个或多个捕获器，每个捕获器都对应一种基本操作，可以直接或间接**在代理对象上**调用。

每次在代理对象上调用这些基本操作时，代理可以在这些操作**传播到目标对象之前**先调用捕获器函数，从而拦截并修改相应的行为。

也就是通过代理调用相关对象的方法时，会触发捕获器中的代码

``` js
const target = {
    foo: 'bar'
};
const handler = {
    // 捕获器在处理程序对象中以方法名为键
    // 定义具体的捕获器
    get() {
        return 'handler override';
    }
};
const proxy = new Proxy(target, handler);

console.log(target.foo); // bar
console.log(proxy.foo); // handler override

console.log(target['foo']); // bar
console.log(proxy['foo']); // handler override

console.log(Object.create(target)['foo']); // bar
console.log(Object.create(proxy)['foo']); // handler override
```
注意，**只有在代理对象上执行这些操作才会触发捕获器**。在目标对象上执行这些操作仍然会产生正常的行为

### 捕获器参数

``` js
const target = {
    foo: 'bar'
};
const handler = {
    get(trapTarget, property, receiver) {
        console.log(trapTarget === target);
        // 第一个参数代表捕获的目标对象是什么
        console.log(property);
        // 第二个参数代表调用的属性
        console.log(receiver === proxy);
        // 第三个参数代表接收的代理对象的名字
    }
};
const proxy = new Proxy(target, handler);
const proxyb = new Proxy(target, handler);
proxyb.foo;
// true
// foo
// false
```

所有捕获器都可以基于自己的参数重建原始操作，重建被捕获方法的原始行为

``` js 
const target = {
    foo: 'bar'
};
const handler = {
    get(trapTarget, property, receiver) {
        return trapTarget[property] + " custom definition";
    }
    // 虽然 reveiver 参数没有被使用
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo); // bar
console.log(target.foo); // bar
```
### reflect

TODO JavaScript reflect

``` js 
const target = {
    foo: 'bar',
    baz: 'qux'
};
const handler = {
    get(trapTarget, property, receiver) {
        let decoration = '';
        if (property === 'foo') {
            decoration = '!!!';
        }
        return Reflect.get(...arguments) + decoration;
    }
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo); // bar!!!
console.log(target.foo); // bar
console.log(proxy.baz); // qux
console.log(target.baz); // qux 
```
### trap invariant

会防止捕获器定义出现过于反常的行为（捕获器不变式）

``` js
const target = {};
Object.defineProperty(target, 'foo', {
    configurable: false,
    writable: false,
    value: 'bar'
});
const handler = {
    get() {
        return 'qux';
    }
};
const proxy = new Proxy(target, handler);
console.log(proxy.foo);
```

TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected 'bar' but got 'qux')

### revocable Proxy

撤销函数和代理对象是**在实例化时同时生成的**：
（不是简单的 proxy.revocable() 进行调用）

``` js
const target = {
    foo: 'bar'
};
const handler = {
    get() {
        return 'intercepted'; //已截获
    }
};

const {
    proxy,
    revoke
} = Proxy.revocable(target, handler);
console.log(proxy.foo); // intercepted
console.log(target.foo); // bar
revoke();
console.log(proxy.foo); // TypeError 
```
TODO JavaScript 异常处理

### reflect API

``` js
const o = {};
if (Reflect.defineProperty(o, 'foo', {
        value: 'bar'
    })) {
    console.log('success');
} else {
    console.log('failure');
}
```
### 代理另一个代理

就正常语法，实现对代理调用 reflect API 操作的多层拦截

``` js
const target = {
 foo: 'bar'
};
const firstProxy = new Proxy(target, {
 get() {
 console.log('first proxy');
 return Reflect.get(...arguments);
 }
});
const secondProxy = new Proxy(firstProxy, {
 get() {
 console.log('second proxy');
 return Reflect.get(...arguments);
 }
});
console.log(secondProxy.foo);
// second proxy
// first proxy
// bar 
```

代理不和 date 类型一起使用

## 代理捕获器与反射方法

一共 13 个不同的基本操作，这些操作有各自不同的
反射 API 方法、
参数（捕获器处理程序参数）
关联 ECMAScript 操作（拦截的操作）
不变式（捕获器不变式）

get()
set()
has()
defineProperty()
getOwnPropertyDescriptor()
deleteProperty()
ownKeys()
getProtoTypeof()
setProtoTypeof()
isExtensible()
preventExtensions()
apply()
construct()

## 代理相关编程模式

### 跟踪属性访问

``` js
const user = {
    name: 'Jake'
};
const proxy = new Proxy(user, {
    get(target, property, receiver) {
        console.log(`Getting ${property}`);
        return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
        console.log(`Setting ${property}=${value}`);
        return Reflect.set(...arguments);
    }
});
proxy.name; // Getting name
proxy.age = 27; // Setting age=27 
```

### 隐藏代理对象的属性

``` js
const hiddenProperties = ['foo', 'bar'];
const targetObject = {
    foo: 1,
    bar: 2,
    baz: 3
};
const proxy = new Proxy(targetObject, {
    get(target, property) {
        if (hiddenProperties.includes(property)) {
            return undefined;
        } else {
            return Reflect.get(...arguments);
        }
    },
    has(target, property) {
        if (hiddenProperties.includes(property)) {
            return false;
        } else {
            return Reflect.has(...arguments);
        }
    }
});
// get()
console.log(proxy.foo); // undefined
console.log(proxy.bar); // undefined
console.log(proxy.baz); // 3
// has()
console.log('foo' in proxy); // false
console.log('bar' in proxy); // false
console.lo
g('baz' in proxy); // true 
```
### 属性验证

对象赋值的时候会触发 set 捕获器，所以可以进行类型的验证

``` js
const target = {
    onlyNumbersGoHere: 0
};
const handler = {
    set(target, property, value) {
        if (typeof value !== 'number') {
            return false;
        } else {
            return Reflect.set(...arguments);
        }
    }
}
const proxy = new Proxy(target, handler);
proxy.onlyNumbersGoHere = "efwf";
console.log(proxy.onlyNumbersGoHere); // 1
proxy.onlyNumbersGoHere = 1;
console.log(proxy.onlyNumbersGoHere); // 1 
```

### 函数与构造函数参数验证

```js
class User {
    constructor(id) {
        this.id_ = id;
    }
}

const proxy = new Proxy(User, {
    construct(target, argumentsList, newTarget) {
        if (argumentsList[0] === undefined) {
            throw 'User cannot be instantiated without id';
        } else {
            return Reflect.construct(...arguments);
        }
    }
});

new proxy(1);
new proxy();
// Error: User cannot be instantiated without id
```

### 数据绑定

如果要对于某种对象上的操作进行操作，就使用代理

把被代理的类都绑定到同一个数组中

``` js
const userList = [];
class User {
    constructor(name) {
        this.name_ = name;
    }
}
const proxy = new Proxy(User, {
    construct() {
        const newUser = Reflect.construct(...arguments);
        userList.push(newUser);
        return newUser;
    }
});

new proxy('John');
new proxy('Jacob');
new proxy('Jingleheimerschmidt');
console.log(userList);
// [
//   User { name_: 'John' },
//   User { name_: 'Jacob' },
//   User { name_: 'Jingleheimerschmidt' }
// ]
```
