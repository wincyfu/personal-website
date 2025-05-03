#!/bin/bash

echo "正在恢复备份v1.5.3..."

if [ -f backups/v1.5.3-backup.tar.gz ]; then
  # 解压备份文件
  tar -xzvf backups/v1.5.3-backup.tar.gz
  echo "备份v1.5.3已成功恢复"
else
  echo "错误：找不到备份文件 backups/v1.5.3-backup.tar.gz"
  exit 1
fi
