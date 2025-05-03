#!/bin/bash
# 恢复v1.4.0版本的脚本

BACKUP_FILE=$(ls -t backups/personal-website_v1.4.0_*.tar.gz 2>/dev/null | head -1)

if [ -z "$BACKUP_FILE" ]; then
  echo "未找到v1.4.0版本的备份文件"
  exit 1
fi

# 创建临时目录
TEMP_DIR=$(mktemp -d)

# 解压备份到临时目录
tar -xzf "$BACKUP_FILE" -C "$TEMP_DIR"

# 复制回主目录，但不覆盖node_modules和.next
rsync -av --exclude="node_modules" --exclude=".next" --exclude="backups" "$TEMP_DIR/" ./

# 清理
rm -rf "$TEMP_DIR"

echo "已恢复到v1.4.0版本"
echo "请运行 'rm -rf .next && npm run dev' 重新启动开发服务器" 