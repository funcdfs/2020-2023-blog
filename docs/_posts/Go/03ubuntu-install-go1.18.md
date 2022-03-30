---
title:  install golang 1.18 in Ubuntu 20.04
date: 2022-03-30
tags:
    - Go
---


1. Run system updates

``` sh  
sudo apt-get update
sudo apt-get upgrade
```

2. Installing Go

``` sh 
curl -LO https://studygolang.com/dl/golang/go1.18.linux-amd64.tar.gz
```

tar -C 

首先移除之前的 go 文件夹 

``` sh 
sudo rm -rf /usr/local/go 
# 更新这次版本之后会出现不能 run 的错误，完全重新安装解决

sudo tar -C /usr/local -xzf go1.18.linux-amd64.tar.gz
```

3. Setting Go Environment


``` sh 
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
source ~/.bashrc

go version
go version go1.18 linux/amd64
```

4. touch main.go 


``` sh 
touch main.go
vim main.go 

package main

import "fmt"

func main(){
	fmt.Println("Hi there")
}

:wq

go run main.go

Hi there
```