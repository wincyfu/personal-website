#!/bin/bash

# 作品集页面 v1.0.0 恢复脚本
# 用于将当前作品集页面恢复到 v1.0.0 版本

# 显示脚本说明
echo "=== 作品集页面 v1.0.0 恢复脚本 ==="
echo "此脚本将恢复作品集页面到 v1.0.0 版本（多语言支持完整版）"
echo ""

# 确认是否继续
read -p "是否继续恢复操作？(y/n): " confirm
if [ "$confirm" != "y" ]; then
    echo "操作已取消"
    exit 0
fi

# 备份当前版本
echo "正在备份当前版本..."
current_date=$(date +"%Y%m%d%H%M%S")
backup_dir="版本备份/portfolio-x7y9z-current-$current_date"
mkdir -p $backup_dir
cp -r src/app/portfolio-x7y9z/* $backup_dir/
echo "当前版本已备份到 $backup_dir"

# 恢复页面文件
echo "正在恢复作品集页面文件..."
cp -r 版本备份/portfolio-x7y9z-v1.0.0/page.tsx src/app/portfolio-x7y9z/

# 恢复组件文件
echo "正在恢复相关组件..."
mkdir -p src/components/UI
cp -r 版本备份/portfolio-x7y9z-v1.0.0/components/UI/DecryptedText.jsx src/components/UI/

# 恢复翻译文件
echo "正在恢复翻译文件..."
mkdir -p src/utils
cp -r 版本备份/portfolio-x7y9z-v1.0.0/utils/translations.ts src/utils/

# 清除缓存
echo "正在清除Next.js缓存..."
rm -rf .next

echo ""
echo "恢复完成！"
echo "请使用 'npm run dev' 启动项目并验证恢复结果"
echo "如果需要回滚，可以使用备份目录 $backup_dir 中的文件" 