---
title: 在 Windows 下使用 vscode 中运行 cpp
date: 2021-04-06
tags:
  - vscode
---


知乎文章：[https://zhuanlan.zhihu.com/p/77645306]

## 原因

由于 tabnine 开始收费的原因，只有 vscode 中还有可以免费使用的 tabnine，并且 vscode 好看一些，并且多种语言可以统一
所以决定执行 cpp 的平台迁移到 vscode

## 路径问题

之前入门的时候（去年）就遇到了这个问题，但是不会解决 hh

但是如果使用 bash 作为 vscode 默认终端的话就会出现找不到目录的问题

详情见：https://github.com/formulahendry/vscode-code-runner/issues/296

`CTRL + shift + p` 打开工作区 json 文件

添加： ![20210406170532-2021-04-06](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210406170532-2021-04-06.png)

`"code-runner.terminalRoot": "/"`

这样的话路径符号问题就解决了，所以路径正确就可以正常使用了

![20210406172209-2021-04-06](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210406172209-2021-04-06.png)

## 格式化问题

添加与 cpp 同级的 `.clang.format` 文件

参见：https://zhuanlan.zhihu.com/p/356143396

但是这种方式每次使用还得多加一个文件

这样设置格式化就实现差不多的效果，懒得一条一条改了

![20210406173413-2021-04-06](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210406173413-2021-04-06.png)

## 添加自定义代码片段

教程在这里：[[VS Code]跟我一起在Visual Studio Code 添加自定义snippet（代码段），附详细配置
](https://blog.csdn.net/maokelong95/article/details/54379046)

``` json
{
	// Place your snippets for cpp here. Each snippet is defined under a snippet name and has a prefix, body and 
	// description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the 
	// same ids are connected.
	// Example:
	// "Print to console": {
	// 	"prefix": "log",
	// 	"body": [
	// 		"console.log('$1');",
	// 		"$2"
	// 	],
	// 	"description": "Log output to console"
	// }
	"快速输入输出": {
		"prefix": "fio",
		"body": [
			"/*$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE-$CURRENT_HOUR-$CURRENT_MINUTE*/",
			"#include <algorithm>",
			"#include <iostream>",
			"#include <vector>",
			"using namespace std;",
			"",
			"const int N = 1e5 + 10;",
			"const int null = 0x3f3f3f3f;",
			"",
			"#define LL long long",
			"#define ULL unsigned long long",
			"#define PB push_back",
			"#define FastIO ios::sync_with_stdio(0); cin.tie(0); cout.tie(0);",
			"",
			"void solve() {",
			"\t$1",
			"}",
			"",
			"int main() {",
			"\tFastIO",
			"\tint T;",
			"\tcin >> T;",
			"\twhile (T--) {",
			"\t\tsolve();",
			"\t}",
			"\treturn 0;",
			"}",
		],
		"description": "fast IO by codeforces"
	},
		"力扣头文件辅助": {
		"prefix": "lc",
		"body": [
			"#include <algorithm>",
			"#include <iostream>",
			"#include <vector>",
			"",
			"using namespace std;",
			"/*$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE-$CURRENT_HOUR-$CURRENT_MINUTE*/",
			"// ? 思路解析：",
			"/* ",
			" * ",
			" * ",
			" * ",
			" * ",
			" ! --难点：",
			" ! --",
			" ! --",
			" */",
		],
		"description": "力扣头文件辅助"
	},
	"输出一个空行": {
		"prefix": "pl",
		"body": [
			"puts(\"\");",
		],
		"description": "cpp代码中输出一个空行"
	},
	"打印调试法 int": {
		"prefix": "pint",
		"body": [
			"printf(\"$1 == %d\\n\", $2);"
		],
		"description": "cpp代码中输出一个空行"
	},
	"cppListNode": {
		"prefix": "cpplist",
		"body": [
			"struct ListNode {",
			"\tint val;",
			"\tListNode *next;",
			"\tListNode() : val(0), next(nullptr) {}",
			"\tListNode(int x) : val(x), next(nullptr) {}",
			"\tListNode(int x, ListNode *next) : val(x), next(next) {}",
			"};"
		],
		"description": "cpp链表，刷 LeetCode 用"
	},
}
```

![20210406181207-2021-04-06](https://raw.githubusercontent.com/fengwei2002/Pictures_01/master/img/20210406181207-2021-04-06.png)