---
title: Ubuntu 常用命令
date: 2021-09-22
tags:
  - vim
---


## root 用户相关

普通用户切换到 root 用户

``` sh
sudo su # su = (switch user)
```

从 root 用户切换到普通用户


``` sh 
su username # username 是用户名
# 或者直接执行 exit || logout 命令退回到普通用户
```

## 更多的 ls

ls可以按照文件大小进行输出排序

-S sort by file size

由大到小排序

`ls -Sl`
从小到大排序

`ls -Slr`

-h，表示”–human-readable”，单位是k或者M ，比较容易看清楚结果。

显示子目录结构

`ls -R`

ls按时间排序

`ls -lt` 从新到旧
`ls -lrt` 从旧到新


``` sh
ls -slrh # 满级人类的 ls
```


