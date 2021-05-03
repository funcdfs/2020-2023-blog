---
title: JavaScript难点梳理
date: 2021-04-23
tags:
    - JavaScript
---

记录一些在阅读过程中遇到的难点和第一次不容易理解的知识点，和一些重要的东西



### 原型模式：

/**
 * 实例通过__proto__链接到原型对象，
 * 它实际上指向隐藏特性[[Prototype]]
 *
 * 构造函数通过 prototype 属性链接到原型对象
 *
 * 实例与构造函数没有直接联系，与原型对象有直接联系
 */ 


``` js
console.log(person1.__proto__ === Person.prototype); // true
conosle.log(person1.__proto__.constructor === Person); // true 
```

/**
 * 同一个构造函数创建的两个实例
 * 共享同一个原型对象：
 */
 

``` js
console.log(person1.__proto__ === person2.__proto__); // true
```
/**
 * instanceof 检查实例的原型链中
 * 是否包含指定构造函数的原型：
 */

实例是构造函数的实例
console.log(person1 instanceof Person); // true
实例时对象的实例
console.log(person1 instanceof Object); // true
实例的原型是对象的实例
console.log(Person.prototype instanceof Object); // true

### 对象迭代

Object.values()返回对象值的数组，Object.entries()返回键/值对的数组。




