#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 绑定自定义域名，根据个人实际域名修改。
# 如果不需要绑定自定义域名，可将下面这行代码注释掉，例如博主的是www.honkerzhou.com
echo 'feng-w.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

# 发布到 https://<USERNAME>.github.io
git push -f git@github.com:fengwei2002/fengwei2002.github.io.git master

cd -