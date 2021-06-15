---
title: 【数据库系统概论习题】关系数据库标准语言 SQL
date: 2021-06-14
tags:
    - 数据库
---

结构化查询语言

目前没有一个数据库系统能够支持 SQL 标准的所有概念和特性

## 1. 试述 SQL 语言的特点。

1. 综合统一。 SQL 语言集数据定义语言 DDL 、数据操纵语言 DML 、数据控制语言 DCL 的功能**于一体**。

2. **高度非过程化**。用 SQL 语言进行数据操作，只要提出“做什么”，而无需指明“怎么做”，因此**无需了解存取路径**，存取路径的选择以及 SQL 语句的操作过程由系统自动完成。

3. 面向集合的操作方式。 SQL 语言采用集合操作方式，不仅操作对象、查找结果可以是元组的集合，而且一次插入、删除、更新操作的对象也可以是元组的集合。

4. 以同一种语法结构提供两种使用方式。 SQL 语言既是自含式语言，又是嵌入式语言。作为自含式语言，它能够独立地用于联机交互的使用方式；作为嵌入式语言，它能够嵌入到高级语言程序中，供程序员设计程序时使用。

5. 语言简捷，易学易用。

## 2. 说明在 DROP TABLE 时，RESTRICT 和 CASCADE 的区别

当一个基本表不在需要时，可以使用 DROP TABLE 语句删除它。

`DROP TABLE <表名> [RESTRICT|CASCADE]`
若选择 RESTRICT，该表的删除是有限制条件的。该表不能被其他表的约束所引用（如 CHECK，FOREIGN KEY 等约束），不能有触发器，不能有视图，不能有函数和存储过程等。如果该表存在这些依赖的对象，此表不能删除。

若选择 CASCADE，该表的删除没有限制条件。在删除基本表的同时，相关的依赖对象将会被一起删除。

**默认是 RESTRICT**

## 3. 有两个关系 S(A,B,C,D) 和 T(C,D,E,F) ，写出下列查询等价的 SQL 表达式

$$\sigma_{A=10}(S)$$
SELECT * FROM S WHERE A='10';
$$\Pi_{A,B}(S)$$
SELECT A,B FROM S ;
$$S\bowtie T$$
SELECT * FROM S,T;
$$S\overset{\bowtie}{_{S.C=T.C}} T$$
SELECT * FROM S,T WHERE S.C=T.C;
$$
S\overset{\bowtie}{_{A<E}} T
$$
SELECT * FROM S,T WHERE S.A<T.E;
$$
\Pi_{C,D}(S)\times T
$$
SELECT C,D FROM S CROSS JOIN T;
SELECT S.C,S.D,T.* FROM S ,T ;

::: note
如果把笛卡尔积看作“乘法”运算，则除法运算可以看作这个“乘法”的逆运算。
:::

## 4. 用 SQL 语句建立第二章习题 6 中的 4 个表。

![S-P-J-SPJ-2021-06-14](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/S-P-J-SPJ-2021-06-14.png)

``` sql
CREATE TABLE s (
    -- 供应商表
    SNO CHAR(2) NOT NULL PRIMARY KEY,
    -- 供应商代码
    SNAME VARCHAR(50) NOT NULL,
    -- 供应商姓名
    STATUS INT NOT NULL,
    -- 供应商状态
    CITY VARCHAR(50) NOT NULL -- 供应商所在城市
);

CREATE TABLE P (
    -- 零件表
    PNO CHAR(2) NOT NULL PRIMARY KEY,
    -- 零件代码
    PNAME VARCHAR(50) NOT NULL,
    -- 零件名字
    COLOR VARCHAR(50) NOT NULL,
    -- 颜色
    WEIGHT INT NOT NULL -- 重量
);

CREATE TABLE J (
    -- 工程项目表
    JNO CHAR(2) NOT NULL PRIMARY KEY,
    -- 工程项目代码
    JNAME VARCHAR(50) NOT NULL,
    -- 工程项目名
    CITY VARCHAR(50) NOT NULL -- 工作项目所在城市
);

CREATE TABLE SPJ (
    -- 供应情况表
    SNO CHAR(2) NOT NULL,
    -- 供应商代码
    PNO CHAR(2) NOT NULL,
    -- 零件代码
    JNO CHAR(2) NOT NULL,
    -- 工程项目代码
    QTY INT NOT NULL -- 供应数量
);
```

插入相应数据的 sql 语句：（四个表）

``` sql
INSERT INTO
    J(JNO, JNAME, CITY)
VALUES
    (J1, 三建，北京）,
    (J2, 一汽，长春）,
    (J3, 弹簧厂，天津）,
    (J4, 造船厂，天津）,
    (J5, 机车厂，唐山）,
    (J6, 无线电厂，常州）,
    (J7, 半导体厂，南京）
INSERT INTO
    P (
        PNO,
        [PNAME],
        [COLOR],
        [WEIGHT]
    )
VALUES
    -- 除了数字全部用小引号括起来
    ('P1', '螺母', '红', 12),
    ('P2', '螺栓', '绿', 17),
    ('P3', '螺丝刀', '蓝', 14),
    ('P4', '螺丝刀', '红', 14),
    ('P5', '凸轮', '蓝', 40),
    ('P6', '齿轮', '红', 30)
INSERT INTO
    S (SNO, SNAME, STATUS, CITY)
VALUES
    ('S1', '精益', 20, '天津'),
    ('S2', '盛锡', 10, '北京'),
    ('S3', '东方红', 30, '北京'),
    ('S4', '本泰盛', 20, '天津'),
    ('S5', '为民', 30, '上海')
INSERT INTO
    SPJ (SNO, PNO, JNO, QTY)
VALUES
    ('S1', 'P1', 'J1', 200),
    ('S1', 'P1', 'J3', 100),
    ('S1', 'P1', 'J4', 700),
    ('S1', 'P2', 'J2', 100),
    ('S2', 'P3', 'J1', 400),
    ('S2', 'P3', 'J2', 200),
    ('S2', 'P3', 'J4', 500),
    ('S2', 'P3', 'J5', 400),
    ('S2', 'P5', 'J1', 400),
    ('S2', 'P5', 'J2', 100),
    ('S3', 'P1', 'J1', 200),
    ('S3', 'P3', 'J1', 200),
    ('S4', 'P5', 'J1', 100),
    ('S4', 'P6', 'J3', 300),
    ('S4', 'P6', 'J4', 200),
    ('S5', 'P2', 'J4', 100),
    ('S5', 'P3', 'J1', 200),
    ('S5', 'P6', 'J2', 200),
    ('S5', 'P6', 'J4', 500)
```

## 针对 4 创建的表完成一下各项操作

1. 找出所有供应商的姓名和所在城市
`SELECT SNAME, CITY FROM S;` （注意不同的项之间要用都好隔开，select 的拼写）
2. 找出所有零件的名字颜色重量
`SELECT PNAME, COLOR, WEIGHT FROM P;`
3. 找出使用供应商 s1 所供应零件的工程代码
`SELECT JNO FROM SPJ WHERE SNO = 'S1';`
4. 找出工程项目 j2 使用的各种零件的名称及其数量

``` sql
SELECT
    JNAME,
    QTY
FROM
    SPJ,
    J
WHERE
    SPJ.JNO = 'J2' 
    -- 注意这里的每一个变量都应该用对象写法引出
    --防止名字定义不明确的发生
    AND J.JNO = SPJ.JNO;
```
5. 找出上海厂供应的所有零件号码
`SELECT PNO FROM S,SPJ WHERE CITY='上海' AND S.SNO=SPJ.SNO;`
6. 找出使用上海产出的零件的工程名称
``` sql
SELECT
    JNAME
FROM
    J
    -- 注意重复变量名的发生，要声明他的 namespace
WHERE
    JNO IN (
        SELECT
            JNO
        FROM
            SPJ,
            S
        WHERE
            S.SNO = SPJ.SNO
            AND S.CITY = '上海'
    )
```
7. 找出没有使用天津生产的零件的工程号码

``` sql
SELECT
    JNAME
FROM
    J
WHERE
    J.JNO NOT IN(
        SELECT
            DISTINCT JNO
        FROM
            S,
            SPJ
        WHERE
            S.SNO = SPJ.SNO
            AND S.CITY = '天津'
    )
```

8. 把全部红色零件的颜色改成蓝色

```sql
UPDATE
    P
SET
    COLOR = '蓝'
WHERE
    COLOR = '红'
```
9. 由 S5 供给 J4 的零件 P6 改为由 S3 供应。请做必要的修改
``` sql
UPDATE
    SPJ
SET
    SNO = 'S3'
WHERE
    SPJ.JNO = J4
    AND SPJ.SNO = 'S5'
    AND SPJ.PNO = 'P6'
```
10. 从供应商关系中删除供应商号是 S2 的记录，并从供应情况关系中删除相应的记录。

``` sql
DELETE FROM
    S
WHERE
    S.SNO = 'S2'
DELETE FROM
    SPJ
WHERE
    SPJ.SNO = 'S2'
```
11.  请将 (S2，J6，P4，200) 插入供应情况关系。
``` sql
INSERT INTO
    SPJ (
        SNO,
        PNO,
        JNO,
        QTY
    )
VALUES
    (S2, J6, P4, 200)
```

## 什么是基本表？什么是视图？两者的区别和联系是什么？

答：
基本表是本身独立存在的表，在 SQL 中一个关系就对应一个表。视图是从一个或几个基本表导出的表。视图本身不独立存储在数据库中，是一个虚表。即数据库中只存放视图的定义而不存放视图对应的数据，这些数据仍存放在导出视图的基本表中。视图在概念上与基本表等同，用户可以如同基本表那样使用视图，可以在视图上再定义视图。

## 试述视图的优点。

1. 视图能够简化用户的操作
2. 视图使用户能以多种角度看待同一数据； 
3. 视图对重构数据库提供了一定程度的逻辑独立性；
4. 视图能够对机密数据提供安全保护。

## 哪类视图是可以更新的？哪类视图是不可更新的？各举一例说明。

答：
基本表的**行列子集视图**一般是可更新的。若视图的属性来自集合函数、表达式，则该视图肯定是不可以更新的。

所有的视图是否都可以更新？为什么？

答：
不是。视图是不实际存储数据的虚表，因此对视图的更新，最终要转换为对基本表的更新。因为有些视图的更新不能惟一有意义地转换成对相应基本表的更新，所以，并不是所有的视图都是可更新的。
## 请为三建工程项目建立一个供应情况的视图，包括供应商代码 (SNO)、零件代码 (PNO)、供应数量 (QTY)。（提取供应情况表中的所有 j1 的选项）

和创建表是相同的写法：

``` sql
CREATE VIEW VSP AS
SELECT
    SPJ.SNO,
    SPJ.PNO,
    SPJ.QTY
FROM
    SPJ,
    J
WHERE
    SPJ.JNO = J.JNO
    AND J.JNAME = '三建'
```

![20210615160505-2021-06-15](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210615160505-2021-06-15.png)

针对该视图 VSP 完成下列查询：

1. 找出三建工程项目使用的各种零件代码及其数量。
``` sql
SELECT
    PNO,
    QTY
FROM
    VSP
```

2. 找出供应商 S1 的供应情况。

``` sql
SELECT
    *
FROM
    VSP
WHERE
    SNO = 'S1'
```
相当于多了一个新的可以使用的表！
