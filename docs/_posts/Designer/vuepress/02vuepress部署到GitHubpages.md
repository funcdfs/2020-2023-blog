---
title: vuepress部署到GitHubpages
---

#### Created:  2020-04-14 22:33:37

文档仓库和展示仓库分离：


```json
"scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs",
    "deploy": "bash deploy.sh"
  },
```

```sh
set -e
npm run docs:build
cd docs/.vuepress/dist
echo 'feng-w.cn' > CNAME
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:fengwei2002/fengwei2002.github.io.git master
cd -
```


### 使用NEIT进行国内加速：

有时间更新配置步骤，挖坑
