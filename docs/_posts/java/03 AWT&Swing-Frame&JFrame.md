---
title: 03 AWT&Swing-Frame&JFrame
tags:
    - java
date: 2021-03-17
---

![20210315100318-2021-03-15](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210315100318-2021-03-15.png)

直呼内行，app 开发者的前兆？

[目录介绍](https://blog.csdn.net/xietansheng/article/details/72814492)

## Swing 简介

Swing 是 Java 为图形界面应用开发提供的一组工具包，是 Java 基础类的一部分。

Swing 包含了构建图形界面（GUI）的各种组件，如：窗口、标签、按钮、文本框等。

Swing 提供了许多比 [AWT](https://www.jianshu.com/p/9167d252657a)（[SUN 公司](https://wiki.mbalib.com/wiki/%E7%BE%8E%E5%9B%BDSun%E5%85%AC%E5%8F%B8) 子产品） 更好的屏幕显示元素，使用纯 Java 实现，能够更好的兼容跨平台运行。

为了和 AWT 组件区分，Swing 组件在 javax.swing. *包下，类名均以 J 开头，例如：JFrame、JLabel、JButton 等。

::: showmore JFrame helloworld 示例
```java
package demo;

import javax.swing.*;

public class demo {
    /**
     * {
     * 创建并显示 GUI。出于线程安全的考虑，
     * 这个方法在事件调用线程中调用。
     */
    private static void createAndShowGUI() {
        // 确保一个漂亮的外观风格
        JFrame.setDefaultLookAndFeelDecorated(true);

        // 创建及设置窗口
        JFrame frame = new JFrame("HelloWorldSwing");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // 添加 "Hello World" 标签
        JLabel label = new JLabel("Hello World");
        frame.getContentPane().add(label);

        // 显示窗口
        frame.pack();
        frame.setVisible(true);
    }

    //    main 函数
    public static void main(String[] args) {
        // 显示应用 GUI
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI();
            }
        });
    }
}
```
::: 

## 基本概念

### 容器

任何窗口都可被分解成一个空的容器，容器里盛装了大量的基本组件，通过设置这些基本组件的大小，位置等属性，就可以将该空的容器和基本的组件组成一个整体的窗口
AWT 提供了两种主要的容器类型：
Window：可独立存在的顶级窗口
Panel: 可作为容器容纳其他组件，但不能独立存在，必须被添加到其它的容器中

### 布局管理器
Java 提供了布局管理器来组件在容器中的布局，而不是直接设置组件位置和大小
常见的有：
FlowLayout：组件向某个方向排列，遇到边界就折回，从头开始排列
BroderLayout：将容器分为东，西，南，北，中五个区域普通组件被放置在这五个区域的任意一个中
GirdLayout: 将容器分割成纵横线分隔的网格，每个网格所占的区域大小相同

### AWT 常用组件
Button
Frame
Panel
TextField
### 事件处理
Frame 和组件本身没有事件处理的能力，必须由特定对象（事件监听器）来处理
实现事件处理机制的步骤：
1. 实现事件监听类，必须实现 XxxListener 接口
2. 创建普通组件（事件源），创建事件监听对象
3. 调用 `addXxxListener()` 方法，将事件监听器注册给普通组件，当事件源上发生指定的事件时，AWT 会触发事件监听器，由事件监听器调用相应的方法（事件处理器）来处理事件，事件源上发生的事件会作为参数传入事件处理器

## AWT 基础使用

::: note AWT
Java 使用 AWT 和 Swing 类完成图形用户界面编程，AWT 的全称是抽象窗口工具集，它是 Sun 最早提供的 GUI 库，提供了一些基本的功能，但功能比较有限，所以后来又提供了 Swing 库
Swing 库替代了绝大部分的 AWT 组件，但需要使用 AWT 的事件处理机制
通过使用 AWT 和 Swing 提供的图形界面组件库，Java 的图形界面编程可以变得比较简单，程序只要依次创建所需的图形组件，并以合适的方式将这些组件组织在一起，就可以开发出不错的用户界面
:::

### 创建窗体 windows

``` java
package demo;

import javax.swing.*;//swing 的对应包
import java.awt.*;//AWT 的对应包

public class demo {
    public static void window(){
        //创建顶级窗口，就是基础的创建对象写法
        Frame f = new Frame();
        //设置窗口的位置，大小，
        f.setBounds(30,30,500,400);
        //将窗口显示出来
        f.setVisible(true);
    }
    //    main 函数中调用创建好的函数即可
    public static void main(String[] args) {
        window();
    }
}
```

运行效果：![20210315105259-2021-03-15](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210315105259-2021-03-15.png)

可以发现 AWT 和 swing 是两种不同风格的用户界面，应该可以自定义界面样式

### 添加组件 panel

``` java
package demo;

import javax.swing.*;//swing 的对应包
import java.awt.*;//AWT 的对应包

public class demo {
    /**
     * panel 演示
     */
    public static void panel() {
        // 先创建一个窗体
        Frame f = new Frame();
        //创建一个 Panel 容器
        Panel p = new Panel();
        //向 Panel 容器中添加组件 html 写法，每个组件偶有对应的属性可以进行规定
        p.add(new TextField(45));
        p.add(new Button("button"));
        p.add(new Choice());//未添加属性的组件
        //将 panel 容器添加到 frame 窗口中
        f.add(p);
        f.setBounds(30, 30, 500, 400);
        //将窗口显示出来
        f.setVisible(true);
    }

    //    main 函数中调用创建好的函数即可
    public static void main(String[] args) {
        panel();
    }
}
```

![20210317202016-2021-03-17](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210317202016-2021-03-17.png)

> Alt tab win + tab 用于快速切换窗口

### 使用 FlowLayout 布局管理器

``` java
package demo;

import javax.swing.*;//swing 的对应包
import java.awt.*;//AWT 的对应包

public class demo {
    /**
     * 布局管理器
     * layout 演示，flow
     */
    public static void flowLayout() {
        //开启一个窗口，标题为 test
        Frame f = new Frame("test");
        //设置 Frame 容器使用 FlowLayout 布局管理器
        f.setLayout(new FlowLayout(FlowLayout.LEFT, 20, 5));
        //向窗口中添加 50 个按钮
        for (int i = 0; i < 50; i++) {
            f.add(new Button("第" + i + "个" + "button"));
        }

        //设置窗口最佳大小
        f.pack();
        f.setBounds(30, 30, 500, 400);
        //将窗口显示出来
        f.setVisible(true);
    }

    //    main 函数中调用创建好的函数即可
    public static void main(String[] args) {
        flowLayout();
    }
}
```

![20210317202921-2021-03-17](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210317202921-2021-03-17.png)

运行之后的效果就是，自适应的组件布局，组件的布局随着窗口宽高的变化而变化，类似 css 中的 flex 布局默认效果

### 使用 BorderLayout 布局管理器

``` java
package demo;

import javax.swing.*;//swing 的对应包
import java.awt.*;//AWT 的对应包

public class demo {
    /**布局管理器
     * layout 演示，border
     */
    public static void borderlayout(){
        Frame f = new Frame("test");
        //设置使用 BorderLayout 布局管理器
        f.setLayout(new BorderLayout());
        f.add(new Button("SOUTH"),BorderLayout.SOUTH);
        f.add(new Button("NORTH"),BorderLayout.NORTH);
        f.add(new Button("EAST"),BorderLayout.EAST);
        f.add(new Button("WEST"),BorderLayout.WEST);
        //默认添加到中间区域
        f.add(new Button("CENTER"));

        //设置窗口最佳大小
//        f.pack();
        f.setBounds(30,30,500,400);
        //将窗口显示出来
        f.setVisible(true);
    }
    //    main 函数中调用创建好的函数即可
    public static void main(String[] args) {
        borderlayout();
    }
}
```

用于创建居中布局
![20210317203424-2021-03-17](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210317203424-2021-03-17.png)
![20210317203328-2021-03-17](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210317203328-2021-03-17.png)

### 使用 GridLayout 布局管理器

``` java
package demo;

import javax.swing.*;//swing 的对应包
import java.awt.*;//AWT 的对应包

public class demo {
    /**
     * GridLayout 布局管理器
     */
    public static void gridLayout(){
        Frame f = new Frame("计算器");
        Panel p1 = new Panel();
        p1.add(new TextField(50));
        f.add(p1,BorderLayout.NORTH);

        Panel p2 = new Panel();
        //设置 Panel 使用 GridLayout 布局管理器
        p2.setLayout(new GridLayout(3,5,4,4));

        String[] name = {"0","1","2","3","4","5","6","7","8","9","+","-","*","/","."};

        for (int i = 0; i < name.length; i++) {
            p2.add(new Button(name[i]));
        }

        //默认将 Panel 对象添加到 Frame 窗口的中间
        f.add(p2);
        //设置窗口最佳大小
//        f.pack();
        f.setBounds(30,30,500,400);
        //将窗口显示出来
        f.setVisible(true);

    }
    //    main 函数中调用创建好的函数即可
    public static void main(String[] args) {
        gridLayout();
    }
}
```

塞满窗体，也是自适应布局

![20210317203658-2021-03-17](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210317203658-2021-03-17.png)

### 事件处理

``` java
package demo;

import javax.swing.*;//swing 的对应包
import java.awt.*;//AWT 的对应包
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class demo {
    private Frame f = new Frame("测试事件");
    private Button ok = new Button("OK");
    private TextField tf = new TextField(30);

    //定义事件监听器类
    class OkListener implements ActionListener{
        //定义事件处理器，用于响应特定事件
        @Override
        public void actionPerformed(ActionEvent e) {
            System.out.println("单击了 OK 按钮");
            tf.setText("Hello World");
        }
    }
    public void init(){
        //注册事件监听器
        ok.addActionListener(new OkListener());
        f.add(tf);
        f.add(ok,BorderLayout.SOUTH);
//        f.pack();
        f.setBounds(30,30,500,400);
        f.setVisible(true);
    }

    public static void main(String[] args) {
        new demo().init();
    }
}
```

## 总结

Swing 的组件不再依赖本地平台的 GUI
Swing 组件在各种平台上具有相同的图形界面外观

Graphics User Interface,GUI，图形用户界面，就是桌面应用

swing 是建立在 AWT 的基础上的，swing 仅提供能力更强大的用户界面组件，即使完全采用 swing 编写的 GUI 程序，也依然需要使用 AWT 的事件处理机制

## Swing 图形界面开发

这部分的使用网上有完整的教程，看一遍即可

[Java Swing 图形界面开发（目录）](https://blog.csdn.net/xietansheng/article/details/72814492)
