#!/bin/bash

# 检查备份目录是否存在
if [ ! -d "backup/v1.1" ]; then
  echo "错误：备份目录 backup/v1.1 不存在!"
  exit 1
fi

echo "开始恢复v1.1版本..."

# 恢复关键文件和目录
rm -rf src
cp -r backup/v1.1/src ./

rm -f VERSION
cp backup/v1.1/VERSION ./

rm -f README.md
cp backup/v1.1/README.md ./

rm -f CHANGELOG.md
cp backup/v1.1/CHANGELOG.md ./

rm -f DEVELOPMENT.md
cp backup/v1.1/DEVELOPMENT.md ./

rm -f next.config.js
cp backup/v1.1/next.config.js ./

rm -f tailwind.config.js
cp backup/v1.1/tailwind.config.js ./

rm -rf public
cp -r backup/v1.1/public ./

echo "v1.1版本恢复完成!" 