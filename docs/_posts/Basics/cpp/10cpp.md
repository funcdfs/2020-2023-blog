---
layout: post
title: cpp10(文件读写)
tags: [cpp+STL]
date: 2020-02-12 01:35:57
---

***

* C++输入输出包含以下三个方面的内容：

对系统指定的标准设备的输入和输出。即从键盘输入数据,输出到显示器屏幕。这种输 入输出称为标准的输入输出,简称标准 I/O。 

* 以外存磁盘文件为对象进行输入和输出,即从磁盘文件输入数据,数据输出到磁盘文件。 以外存文件为对象的输入输出称为文件的输入输出,简称文件 I/O。 
* 对内存中指定的空间进行输入和输出。通常指定一个字符数组作为存储空间(实际上可 以利用该空间存储任何信息)。这种输入和输出称为字符串输入输出,简称串 I/O。

标准输入输出流
因为c++功能要更加丰富,所以输入输出就更加繁杂

``` cpp
char_one=cin.get(),ctrl Z就是EOF
cin.get(chaar_one);
char buf[256]={0}
cin.get(buf,256);
`cin.getline(buf,256);` 不读取 `\n` 
cin.ignore();//忽略缓冲区内当前字符,扔掉
cin.ignore(10,'\n');//忽略10个字符的动作直到遇到\n停止
cin.peek()//偷窥一下缓存区
cin.putback();//将文本推到当前缓存区,get后使用完成过后可以putback回去
cin.flush();
```

``` cpp
cout.put('a').put('b').put('c')<<endl;
cout.write("qwert");
int number = 10;
cout.unsetf(ios::dec);//卸载当前,默认10进制输出方式
cout.setf(ios::oct);//八进制输出
cout.setf(ios::showbase);
cout<<number<<endl;
cout.unsetf(ios::oct);
cout.setf(ios::hex);//十六进制输出
cout.width();
cout.fill();
cout.setf(ios::left);
```

//通过控制符

文本文件读写

从文件到程序
单个

``` cpp
char* filename="文件路径反斜杠写两个"
ifstream ism(filename,ios::in);//只读方式打开文件
ifstream ism;
ism.open(filename,ios::in);//只读方式打开文件2

if(!ism){
    cout<<"打开文件失败"<<endl;
    return;
}
//读文件
char ch;
while (ism,get(ch)){
    cout<<ch;
}
//关闭文件
ism.close();
```

两个txt文件的拷贝

``` cpp
char* filename="文件路径反斜杠写两个"
ifstream ism;
ism.open(filename,ios::in);//只读方式打开文件
char* targetname=""
ofstream osm(Targetname,ios::out|ios::app);

if(!ism){
    cout<<"打开文件失败"<<endl;
    return;
} 
//读文件
char ch;
while (ism,get(ch)){
    cout<<ch;
    osm.put(ch);
}
//关闭文件
ism.close();
osm.close();
```

二进制文件操作,对象序列化

``` cpp
class Person{
    public:
    int age;
    int id;
    public:
    Person(int age,int id):age(age),id(id){}
    void show(){
        cout<<age<<id<<endl;
    }
}
void test(){
    Person p1(10,20),p2(30,40);
    //将对象p1,p2写到文件中
    char* targetname="";
    oftream osm(TargetName,ios::out|ios::binary);
    osm.write(char*,文件大小)//二进制方式写文件
    osm.write((char*)&p2,sizeof(Person));
    osm.close();

    ifstream ism(Targetname,ios::in|ios::binary);
    Person p(1,2);
    ism.read((char*)&p,sizeof(Person));//从二进制文件读取数据
    p.show();
}
```

