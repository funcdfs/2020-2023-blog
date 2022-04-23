---
title: Ubuntu 修改用户开机动画
date: 2021-11-16
tags:
  - linux
---

今天在用别人的 docker images 的时候，发现了在 开机窗口嵌入的文字，效果不错，所以想着查一下怎么弄

## etc/update-motd.d

这是存放开机文件的文件夹，由于只做外观文本的改变，不输出相关信息，所以只需要修改这个 `10-help-text` 文件，具体还可以输出很多相关开机状态的其他信息

![20211116221452-2021-11-16-22-14-55](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20211116221452-2021-11-16-22-14-55.png)

当然需要 sudo root，如果在 wsl 中没有创建过 root 的话，需要先 `sudo passwd root`

10-help-text 这个文件使用的是 c 标准的 printf 的格式，注意换行：字符生成来自： [kammerl.de/ascii](https://www.kammerl.de/ascii/AsciiSignature.php)

``` cpp 
 printf "\n"
 printf "  _____                                    ___\n"
 printf "_/ ____\\____   ____    ______  _  __ ____ |__|\n"
 printf "\\   __\\/ __ \\ /    \\  / ___\\ \\/ \\/ // __ \\|  |\n"
 printf " |  | \\  ___/|   |  \\/ /_/  >     /\\  ___/|  |\n"
 printf " |__|  \\___  >___|  /\\___  / \\/\\_/  \\___  >__|\n"
 printf "           \\/     \\//_____/             \\/\n"
 printf "\n"
```

改完 source 一下：

![20211116221546-2021-11-16-22-15-47](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20211116221546-2021-11-16-22-15-47.png)

连接我们的 docker！

![20211116221724-2021-11-16-22-17-24](https://raw.githubusercontent.com/fengwei2002/Pictures_02/master/images/20211116221724-2021-11-16-22-17-24.png)

在 docker 中修改之后，再打包给别人，广告植入成功 hh