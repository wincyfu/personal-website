#!/bin/bash

# 检查备份目录是否存在
if [ ! -d "backups/v1.4.9" ]; then
  echo "错误：备份目录 backups/v1.4.9 不存在"
  exit 1
fi

# 清理当前src和public目录
rm -rf src
rm -rf public

# 从备份恢复src和public目录
cp -r backups/v1.4.9/src ./
cp -r backups/v1.4.9/public ./

# 恢复配置文件
cp backups/v1.4.9/package.json ./
cp backups/v1.4.9/next.config.js ./
cp backups/v1.4.9/tailwind.config.js ./
cp backups/v1.4.9/postcss.config.js ./
cp backups/v1.4.9/tsconfig.json ./
cp backups/v1.4.9/VERSION ./
cp backups/v1.4.9/VERSION.md ./
cp backups/v1.4.9/CHANGELOG.md ./

# 清理缓存目录
rm -rf .next

echo "已成功恢复到v1.4.9版本"
echo "请运行 npm install 然后 npm run dev 启动项目" 