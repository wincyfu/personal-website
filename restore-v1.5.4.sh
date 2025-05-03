#!/bin/bash

echo "正在恢复备份v1.5.4..."

if [ -f backups/v1.5.4-backup.tar.gz ]; then
  # 解压备份文件
  tar -xzvf backups/v1.5.4-backup.tar.gz
  echo "备份v1.5.4已成功恢复"
else
  echo "错误：找不到备份文件 backups/v1.5.4-backup.tar.gz"
  exit 1
fi
