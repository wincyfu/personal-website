#!/bin/bash

# 检查备份目录是否存在
if [ ! -d "backups/v1.5.1" ]; then
  echo "错误：备份目录 backups/v1.5.1 不存在"
  exit 1
fi

# 清理当前目录
rm -rf src
rm -rf public

# 恢复src目录
cp -r backups/v1.5.1/src .

# 恢复公共资源
cp -r backups/v1.5.1/public .

# 恢复配置文件
cp backups/v1.5.1/package.json .
cp backups/v1.5.1/next.config.js .
cp backups/v1.5.1/tailwind.config.js .
cp backups/v1.5.1/postcss.config.js .
cp backups/v1.5.1/tsconfig.json .
cp backups/v1.5.1/VERSION .
cp backups/v1.5.1/VERSION.md .
cp backups/v1.5.1/CHANGELOG.md .
cp backups/v1.5.1/README.md .

# 清理缓存
rm -rf .next

echo "已成功恢复到v1.5.1版本"
echo "请运行 npm install 和 npm run dev 启动项目" 