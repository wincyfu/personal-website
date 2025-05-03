#!/bin/bash

# 检查备份目录是否存在
if [ ! -d "backup/v1.2.2" ]; then
  echo "错误: 备份目录 backup/v1.2.2 不存在"
  exit 1
fi

# 提示用户确认
echo "警告: 此操作将恢复v1.2.2版本，当前工作可能会丢失"
read -p "确定要继续吗? (y/n): " confirm

if [ "$confirm" != "y" ]; then
  echo "操作已取消"
  exit 0
fi

# 恢复源代码
rm -rf src
cp -r backup/v1.2.2/src ./

# 恢复公共资源
rm -rf public
cp -r backup/v1.2.2/public ./

# 恢复配置文件
cp backup/v1.2.2/next.config.js ./
cp backup/v1.2.2/tailwind.config.js ./

# 恢复文档
cp backup/v1.2.2/README.md ./
cp backup/v1.2.2/CHANGELOG.md ./
cp backup/v1.2.2/DEVELOPMENT.md ./
cp backup/v1.2.2/VERSION ./
cp backup/v1.2.2/VERSION_MANAGEMENT.md ./

# 恢复package.json
cp backup/v1.2.2/package.json ./

echo "已成功恢复到v1.2.2版本"
echo "恢复内容包括: 源代码、公共资源、配置文件和文档"
echo "当前版本: $(cat VERSION)" 