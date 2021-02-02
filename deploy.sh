set -e
npm run build
cd docs/.vuepress/dist
# echo 'feng-w.cn' > CNAME
git init
git add -A
git commit -m 'yarn run deploy'
git push -f git@github.com:fengwei2002/fengwei2002.github.io.git master
cd -
