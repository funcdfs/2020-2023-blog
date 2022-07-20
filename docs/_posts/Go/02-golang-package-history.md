---
title: GO 包管理的前世今生
date: 2022-04-27
tags:
    - Go
---

- **获取第三方包的工具：`goinstall`**

goinstall 是将源码下载到 `$GOROOT/src/pkg/` 而不是 `$GOPATH/src/`，此时还没有 `$GOPATH`。

- **`go get` 和 go 1 一起发布的包管理的工具**

定义了新的 `$GOPATH`, goroot 现在只存放内置的包，用这个规则来区分第三方包 

go 在编译的时候，先寻找 goroot 下是否存在包，找不到就去 gopath 下面找 

但是不存在包的版本管理机制，因为这个问题，所以出现了 为每一个项目都安排一个新的文件夹作为 gopath 的写法
在开发某一个项目之前，将系统的 gopath 指向该文件的专属文件夹，当想开发另一个项目的时候，将系统的 gopath 再次修改为其他文件夹

所以会有一个 `env.sh`，每次开发之前执行一遍这个专属项目的专属脚本

gopath 和 go get 一起开创了 golang 的包管理

- **`gopkg.in`**


``` go
import (
	"gopkg.in/yaml.v2​"
	"gopkg.in/ini.v1​"
	"gopkg.in/redis.v5​"
	"gopkg.in/jcmturner/aescts.v1​"
)
```

它的先进之处在于，从包的名字就可以得知我用的是这个包的哪个版本 (根据末尾的.vxxxx)，且如果我愿意，我可以在同一份代码引用同一个包的多个版本，而此前这是不可能的：


``` go
import (
	yamlv1 "gopkg.in/yaml.v1​"
	yamlv2 "gopkg.in/yaml.v2​"
	"gopkg.in/yaml.v3​"
)

func main() {
	_, _ = yamlv1.Marshal(nil)
	_, _ = yamlv2.Marshal(nil)
	_, _ = yaml.Marshal(nil)
}
```

![konng0120-02-golang-package-history-2022-04-27-21-01-35](https://raw.githubusercontent.com/psychonaut1f/a/main/img/konng0120-02-golang-package-history-2022-04-27-21-01-35.png)

也就是对每一个 gopkg.in 转换为一个 git 仓库的具体分支中的代码，进行了一个 url 的转换  

缺点：
1. 违背了取中心化：所有的包又变成了 gopkg.in 下面的内容
2. 不是零入侵代码的，不想用 gopkg 的时候，需要修改代码 

但是 gopkg.in 提供了一个想法， 使用不同的 import 路径来引入一个包的多个版本 

- **`vendor`**

因为想要使用开发项目的话， gopath 就需要有很多目录，而不是一个统一的目录， 所以打包发送项目的时候，经常会将 gopath 文件夹一起放在项目代码中，这样就导致了整个项目文件变的非常大

但是这是一种简单有效的方法 

go 1.5 version 发布了 vendor 目录写法：

1. 把项目中的 vendor 文件夹作为这一个项目专属的虚拟 gopath 文件夹 
2. go build 的寻包路径依次是 goroot vendor gopath 

也就是做了一次抽离，尽量的不去修改 gopath 

但是 go 官方没有提供一种将依赖包拷贝到 vendor 的工具，只是提供了对 vendor 机制的支持 

![konng0120-02-golang-package-history-2022-04-27-21-19-02](https://raw.githubusercontent.com/psychonaut1f/a/main/img/konng0120-02-golang-package-history-2022-04-27-21-19-02.png)

这些包可以帮忙将依赖包拷贝到 vendor 中，同时也支持了按照 git 中的数据作为版本控制的写法(commit id，branch， tags) 

所以自从这个事情之后 git 基本就变成了 golang 的默认版本控制工具  

- **`dep`**

全称是 golang/dep 

使用方式：

![konng0120-02-golang-package-history-2022-04-27-21-23-40](https://raw.githubusercontent.com/psychonaut1f/a/main/img/konng0120-02-golang-package-history-2022-04-27-21-23-40.png)

这是一个来自官方的 golang 包管理解决方案

终结了多种不同文件包管理的方案，但是没有解决 vendor 不可以实现在同一个代码中引入同一个包的多个版本这个问题 

- **`go module`**

1. 如果旧包和新包的导入路径相同，则新包必须兼容旧包。
2. 使用满足需求的最旧版本，而不是最新版本。
3. 不是提供一个包管理工具，而是提供一种全新的 go 


`v[major].[minor].[patch]`

major: 破坏性更新，不支持旧版本
minor: 新特性更新，兼容旧版本
patch: 修复 bug 

module模式下的 go build 和 go get 
go build: `GOROOT` $\to$ `gopath/pkg/mod/`, 不支持 vendor，发现缺包，自动获取缺失的包
go get: 将包按照版本不同分别存到 `gopath/pkg/mod` 下面的不同路径


> 那么如何判断当运行命令时，是处于传统模式还是 module 模式呢？这由三个因素共同决定：

1. 当前路径（或父路径）是否有 go.mod 文件（如果有，则倾向于 module 模式）；
2. 当前路径是否在 `$GOPATH` 下（如果是，则倾向于传统模式）；
3. 环境变量 `$GO111MODULE` 的配置（当发生分歧时起，最终决策）。

手动具体检测：go env 观察 `$GOMOD` 的值，如果有值并且指向了一个 go.mod 文件，那么他就是 mod 模式，否则就是传统模式  
`go env | grep GOMOD`

新的使用方式：

1. `go mod init [module-name]` 初始化一个 `module`
2. `go tidy` 检查当前 `module` 的依赖并写入 `go.mod` 和 `go.sum`；
3. `go.mod` 描述了本 module 的名称、go 版本依赖、依赖包的最小版本；
4. `​go.sum` 记录依赖包语义化版本对应的哈希。

同时 module 模式下， go get 不是简单的 git clone 了， 存在了具体使用的协议：`https://pkg.go.dev/cmd/go#hdr-Module_proxy_protocol`

可以通过配置 `$GOPROXY`、`$GONOPROXY` 等环境变量来设置代理，

且从 go 1.13 开始，module 引入了文件检查，go get 会将获取到的包与官方的包哈希数据库，进行对比，你可以通过修改 `$GOSUMDB`、`$GONOSUMDB`、`$GOPRIVATE` 等环境变量来控制这一行为。如果你引入私有包时，因为无法通过文件检查而失败（私有包无法被官方的包哈希数据库收录）google 一下

go.mod 文件中描述了这个 module 的名字，而不需要借助 `$GOPATH` 路径，所以 `module` 项目是不需要放到 `$GOPATH` 下的，可以放在任何位置，编译时也不依赖 `$GOPATH/src` 下存放的包。至此，module 基本摆脱了了对 `$GOPATH` 的依赖，只是需要借 `$GOPATH/pkg/mod` 这个位置存一下文件而已，算不得什么。

## after go 1.18 

出现了一个叫做 go work 的东西

对本地项目使用子文件夹中的 package 的情况提供了方便，不用手动在 go mod 文件中添加一些 replace 字段或者是上传到云端进行调试

可以直接在本地 go work use 来使用这个子目录的 package 

---

参考：
- https://github.com/wolfogre
- https://blog.wolfogre.com/posts/golang-package-history/
- https://go.dev/doc/tutorial/workspaces