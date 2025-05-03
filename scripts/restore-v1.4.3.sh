#!/bin/bash

# 恢复v1.4.3版本的脚本

# 设置版本号
VERSION="v1.4.3"
BACKUP_DIR="backup/$VERSION"

# 确认备份目录存在
if [ ! -d "$BACKUP_DIR" ]; then
  echo "错误：备份目录 $BACKUP_DIR 不存在!"
  exit 1
fi

# 恢复文件
echo "正在恢复 $VERSION 版本的文件..."
cp -r $BACKUP_DIR/src/* src/
cp $BACKUP_DIR/package.json .
cp $BACKUP_DIR/package-lock.json .
cp $BACKUP_DIR/next.config.js .
cp $BACKUP_DIR/README.md .
cp $BACKUP_DIR/VERSION .
cp $BACKUP_DIR/tsconfig.json .
cp $BACKUP_DIR/tailwind.config.js .
cp $BACKUP_DIR/postcss.config.js .
cp $BACKUP_DIR/next-env.d.ts .

# 显示恢复完成消息
echo "已成功恢复到 $VERSION 版本!"
echo "如需查看更新内容，请查阅 $BACKUP_DIR/VERSION.md 文件" 