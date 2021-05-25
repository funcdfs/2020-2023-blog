---
title: 【书】JavaScript 对象，类，面向对象
date: 2021-05-10
tags:
    - JavaScript 高级程序设计（第四版）
    - JavaScript
---

记录一些在阅读过程中遇到的难点和第一次不容易理解的知识点，和一些重要的东西
（20天才前八章草草过了一遍？我要抓紧了）

date: 2021-04-23
date: 2021-05-10 初稿

### 可计算属性

``` js
const nameKey = 'name';
const ageKey = 'age';
const jobKey = 'job';
let uniqueToken = 0;

function getUniqueKey(key) {
    return `${key}_${uniqueToken++}`;
}
let person = {
    [getUniqueKey(nameKey)]: 'Matt',
    [getUniqueKey(ageKey)]: 27,
    [getUniqueKey(jobKey)]: 'Software engineer'
};
console.log(person); // { name_0: 'Matt', age_1: 27, job_2: 'Software engineer' }
```

中途出现错误不能回滚
### 工厂模式

``` js 
function createPerson(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function () {
        console.log(this.name);
    };
    return o;
}
let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");
```
### 构造函数模式

``` js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
// 在实例化时，如果不想传参数，那么构造函数后面的括号可加可不加。
// 只要有 new 操作符，就可以调用相应的构造函数
person1.sayName(); // Nicholas
person2.sayName(); // Greg 
```
另一种写法：

``` js
let Person = function (name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        console.log(this.name);
    };
}
```

::: note 构造函数的问题：
函数实例会被多次创建，解决：函数定义转移到构造函数外部，但是会破坏全局作用域上的同名函数因此出现了原型模式
:::

```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

function sayName() {
    console.log(this.name);
}
let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");
person1.sayName(); // Nicholas
person2.sayName(); // Greg
```

### 原型模式：

哔哩哔哩 yyds

![20210505153346-2021-05-05](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210505153346-2021-05-05.png)

原型**没有具体的名字**，他只是一个抽象出来的结构（当看到一个对象实例的时候，就要脑部构造出他的前两代，他的爷爷没有名字）

/**
 * 实例通过__proto__链接到原型对象，
 * 它实际上指向隐藏特性 [[Prototype]]
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

Object.getPrototypeOf()
Object.setPrototypeOf()
Object.create()
hasOwnProperty()
Object.getOwnPropertyDescriptor()

原型和 in

只要通过对象可以访问，in 操作符就返回 true，而 hasOwnProperty() 只有属性存在于实例上时才返回 true。因此，只要 in 操作符返回 true 且 hasOwnProperty() 返回 false，就说明该属性是一个原型属性。

Object.keys()
Object.getOwnPropertyNames()：
Object.getOwnPropertySymbols()

### 对象迭代

Object.values() 返回对象值的数组，Object.entries() 返回键/值对的数组。

重写构造函数上的原型之后再创建的实例才会引用新的原型。而在此之前创建的实例仍然会引用最初的原型。

## 继承

看不懂就去哔哩哔哩搜教程，太棒了

### 原型链

原型链：（__proto__也是一个对象，所以可以链接式的调用）

``` js
function SuperType() {
    this.property = true;
}
// supertype 是一个对象

SuperType.prototype.getSuperValue = function () {
    return this.property;
};
// SuperType.prototype 指向 supertype 创建的实例的原型
// 在对象原型里创建的函数会被每一个实例拥有，并且空间还不重复

function SubType() {
    this.subproperty = false;
}
// 定义了一个 subtype 类

SubType.prototype = new SuperType();
// 将第二个类的对象原型定义为一个新的第一个类的对象，
// 也就构成了一个链条，因为一个对象的原型也是一个对象

SubType.prototype.getSubValue = function () {
    return this.subproperty;
};
// 在第二个类的原型中 创建一个公共的函数

let instance = new SubType();
console.log(instance.getSuperValue()); // true
console.log(instance.getSubValue()); //false
```

原型链扩展了前面描述的原型搜索机制。（变得更多了），在读取实例上的属性时，首先会在实例上搜索这个属性。如果没找到，则会继承搜索实例的原型。在通过原型链实现继承之后，搜索就可以继承向上，搜索原型的原型。

调用 `instance.getSuperValue()` 经过了 3 步搜索：instance、SubType.prototype 和 SuperType.prototype，最后一步才找到这个方法。对属性和方法的搜索会 一直持续到原型链的末端。

SubType 继承 SuperType，而 SuperType 继承 Object。在调用 `instance.toString()`时，实际上调用的是保存在 Object.prototype 上的方法。
（因为 object 对象是万物之源，所有的对象的原型都是 object， object 中存在一些可以调用的函数）

另一个要理解的重点是，以对象字面量方式创建原型方法会破坏之前的原型链，因为这相当于重写
了原型链。

``` js 
function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue = function () {
    return this.property;
};

function SubType() {
    this.subproperty = false;
} // 继承 SuperType
SubType.prototype = new SuperType();
// 通过对象字面量添加新方法，这会导致上一行无效
SubType.prototype = {
    getSubValue() {
        return this.subproperty;
    },
    someOtherMethod() {
        return false;
    }
};
let instance = new SubType();
console.log(instance.getSuperValue()); // 出错！
```

在这段代码中，子类的原型在被赋值为 SuperType 的实例后，又被一个对象字面量覆盖了。覆盖后的原型是一个 Object 的实例，而不再是 SuperType 的实例。因此之前的原型链就断了。SubType 和 SuperType 之间也没有关系了

字面量添加新的原型方法虽然在写法上会有一点便利，但是他会把原型链接到基础的 object 上，断掉了之前的原型链

原型的问题：比如原型中放一个数组，那么他就是公用的，基础的继承一些函数还是可以的，但是不同新的实例中的继承数组值也应该是崭新的，而不应该是公用的

原型链的第二个问题是，子类型在实例化时不能给父类型的构造函数传参。

### 盗用构造函数

TODO 函数 this 以及 bind call apply

### 组合继承

TODO JavaScript 继承相关

## 类

与函数构造函数一样，多数编程风格都建议类名的首字母要大写，以区别于通过它创建的实例（比如，通过 class Foo {}创建实例 foo）

注意这种独特的类名变量写法：

``` js
let Person = class PersonName {
    identify() {
        console.log(Person.name, PersonName.name);
    }
}
let p = new Person();
p.identify(); // PersonName PersonName
console.log(Person.name); // PersonName
console.log(PersonName); // ReferenceError: PersonName is not defined
```

### 类成员

 // 在类块中定义的所有内容都会定义在类的原型上

``` js
class Person {
    constructor() {
        // 添加到 this 的所有内容都会存在于不同的实例上
        // （虽然输出的内容时相同的，但是他们仍然不是相同的方法）
        this.locate = () => console.log('instance');
    }
    locate() {
        console.log('prototypeMethod');
    }
}
let p = new Person();
p.locate(); // instance
Person.prototype.locate(); // prototype
```

类定义也支持获取和设置访问器。语法与行为跟普通对象一样：
（也就是可以类中也可以自定义变量或者方法的 set 和 get 函数）
``` js
class Person {
    set name(newName) {
        this.name_ = "哈哈哈哈";
    }
    get name() {
        return "我就不告诉你";
    }
}
let p = new Person();
p.name = 'Jake';
console.log(p.name); // Jake
```

当然 JavaScript 寂然要仿照出 class 的功能，那么必然少不了 static 类型

一般使用就是创建一个静态的属于类的方法

书里这样用：**静态类方法非常适合作为实例工厂**：工程中会方便很多，不用手动构建对象

``` js
class Person {
    constructor(age) {
        this.age_ = age;
    }
    sayAge() {
        console.log(this.age_);
    }
    static create() {
        // 使用随机年龄创建并返回一个 Person 实例
        return new Person(Math.floor(Math.random() * 100));
    }
}
console.log(Person.create()); // Person { age_: ... } 
```

::: note 关于类中的数据成员
类中不提供显式调用的数据成语那创建方式：（刚看到比较懵逼，不是可以创建的吗？）

这个代码

```js
class Person {
    constructor(age) {
        this.age_ = age;
    }
    sayName() {
        console.log(this.name);
    }
    name = "pname"
}

let p1 = new Person(5);
console.log(p1.age_);
console.log(p1.name);

p1.name = "konngChanged";
console.log(p1.name);

let p2 = new Person(10);
console.log(p2.name);

p2.sayName();
p1.sayName();
```

等同于这个代码

``` js
class Person {
    constructor(age) {
        this.age_ = age;
    }
    sayName() {
        console.log(this.name);
    }
}

Person.prototype.name = "pname"

let p1 = new Person(5);
console.log(p1.age_);
console.log(p1.name);

p1.name = "konngChanged";
console.log(p1.name);

let p2 = new Person(10);
console.log(p2.name);

p2.sayName();
p1.sayName();
```

也就是 **在原型上定义数据成员** 和**在类中定义数据成员****不是一回事**，**默认（写在）类中的数据成员是原型上的数据成员**

创建真正的类中数据成员的方式是：
（创建类中的方法的方式是 使用 static 关键字，类比理解）

``` js
class Person {
    constructor(age) {
        this.age_ = age;
    }
    sayName() {
        console.log(`${Person.greeting} ${this.name}`);
    }
    name = "pname"
}
Person.greeting = 'My name is';

let p1 = new Person(5);
console.log(p1.age_);
console.log(p1.name);

p1.name = "konngChanged";
console.log(p1.name);

let p2 = new Person(10);
console.log(p2.name);

p2.sayName();
p1.sayName();
```

插值表达式那里的引号用的是，键盘左上角那个符号，不是右面的区分字符串的符号

:::

### 迭代器与生成器方法

这里遇到了 [yield 关键字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)，
>这本书的有时间就得翻着读呀，好多一次性还是不清楚的

TODO JavaScript 对象迭代器

``` js
class Person {
    // 在原型上定义生成器方法
    * createNicknameIterator() {
        yield 'Jack';
        yield 'Jake';
        yield 'J-Dog';
    }
    // 在类上定义生成器方法
    static * createJobIterator() {
        yield 'Butcher';
        yield 'Baker';
        yield 'Candlestick maker';
    }
}

let jobIter = Person.createJobIterator();
console.log(jobIter.next().value); // Butcher
console.log(jobIter.next().value); // Baker
console.log(jobIter.next().value); // Candlestick maker

let p = new Person();
let nicknameIter = p.createNicknameIterator();
console.log(nicknameIter.next().value); // Jack
console.log(nicknameIter.next().value); // Jake
console.log(nicknameIter.next().value); // J-Dog
```

## ES6 继承

extends 关键字

ECMAScript 6 新增的类很大程度上是基于既有原型机制的语法糖。类的语法让开发者可以优雅地定义向后兼容的类，既可以继承内置类型，也可以继承自定义类型。类有效地跨越了对象实例、对象原型和对象类之间的鸿沟。

### super() 

在静态方法中可以通过 super 调用继承的**类上定义的**静态方法：

``` js
class Vehicle {
    static identify() {
        console.log('vehicle');
    }
}
class Bus extends Vehicle {
    static identify() {
        super.identify();
    }
}
Bus.identify(); // vehicle 
```

相关的有 `[[HomeObject]]` https://zh.javascript.info/class-inheritance

- super 只能在派生类构造函数和静态方法中使用。
- 不能单独引用 super 关键字，要么用它调用构造函数，要么用它引用静态方法。
- 调用 `super()` 会调用父类构造函数，并将返回的实例赋值给 this。
``` js
class Vehicle {}
class Bus extends Vehicle {
    constructor() {
        super();
        console.log(this instanceof Vehicle);
    }
}
new Bus(); // true 
```
- `super()` 的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。`super(Parameters); `
- 如果没有定义类构造函数，在实例化派生类时会调用 `super()`，而且会传入所有传给派生类的参数。
```js
class Vehicle {
    constructor(licensePlate) {
        this.licensePlate = licensePlate;
        console.log(this.licensePlate);
    }
}
class Bus extends Vehicle {}

let test = new Bus('1337H4X', '123')
//多余的参数就会自动被忽略
console.log(test.licensePlate);
console.log(test); // Bus { licensePlate: '1337H4X' }
```
1337H4X
Bus { licensePlate: '1337H4X' }
- 不要在调用 `super()`之前引用 this，否则会抛出 ReferenceError 也就是在继承类中的构造函数先得调用 `super()`
- 如果在派生类中显式定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回一个对象。`return {};`

### 抽象基类

ECMAScript **没有**专门支持这种类的语法 ，但通过 `new.target` 也很容易实现。

也就是把原本的类给禁用了就好了，抛一个错误

``` js
// 抽象基类
class Vehicle {
    constructor() {
        console.log(new.target);
        if (new.target === Vehicle) {
            throw new Error('Vehicle cannot be directly instantiated');
        }
    }
}
// 派生类
class Bus extends Vehicle {}
new Bus(); // class Bus {}
new Vehicle(); // class Vehicle {}
// Error: Vehicle cannot be directly instantiated(实例化)
```

另外，通过在抽象基类构造函数中进行检查，可以要求派生类**必须定义**某个方法。因为原型方法在调用类构造函数之前就已经存在了，所以可以通过 this 关键字来检查相应的方法：
（C++中好像也有这种功能，但是具体咋弄的忘了）

``` js
// 抽象基类
class Vehicle {
    constructor() {
        if (new.target === Vehicle) {
            throw new Error('Vehicle cannot be directly instantiated');
        }
        if (!this.foo) {
            throw new Error('Inheriting class must define foo()');
        }
        console.log('success!');
    }
}
// 派生类
class Bus extends Vehicle {
    foo() {}
}
// 派生类
class Van extends Vehicle {}
new Bus(); // success!
new Van(); // Error: Inheriting class must define foo()
```

继承内部类型的时候，可以覆盖 `Symbol.species` 访问器，这个访问器决定在创建返回的实例时使用的类：
d
``` js
class SuperArray extends Array {
    static get[Symbol.species]() {
        return Array;
    }
}
let a1 = new SuperArray(1, 2, 3, 4, 5);
let a2 = a1.filter(x => !!(x % 2))
console.log(a1); // [1, 2, 3, 4, 5]
console.log(a2); // [1, 3, 5]
console.log(a1 instanceof SuperArray); // true
console.log(a2 instanceof SuperArray); // false
```

### 类混入

TODO 箭头函数


``` js
class Vehicle {}
let FooMixin = (Superclass) => class extends Superclass {
    foo() {
        console.log('foo');
    }
};
let BarMixin = (Superclass) => class extends Superclass {
    bar() {
        console.log('bar');
    }
};
let BazMixin = (Superclass) => class extends Superclass {
    baz() {
        console.log('baz');
    }
};
class Bus extends FooMixin(BarMixin(BazMixin(Vehicle))) {}
let b = new Bus();
b.foo(); // foo
b.bar(); // bar
b.baz(); // baz 
```