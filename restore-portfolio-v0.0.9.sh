#!/bin/bash

echo "开始恢复作品集页面到 v0.0.9 版本..."

# 备份目录
BACKUP_DIR="版本备份/portfolio-x7y9z-v0.0.9"

# 检查备份目录是否存在
if [ ! -d "$BACKUP_DIR" ]; then
  echo "错误：备份目录 $BACKUP_DIR 不存在！"
  echo "请先运行 backup-portfolio-v0.0.9.sh 创建备份。"
  exit 1
fi

# 清除缓存
echo "清除Next.js缓存..."
rm -rf .next

# 恢复作品集页面文件
echo "恢复作品集页面文件..."
mkdir -p src/app/portfolio-x7y9z
cp -r "$BACKUP_DIR"/*.{tsx,md,css,js} src/app/portfolio-x7y9z/ 2>/dev/null

# 恢复相关组件和样式
echo "恢复相关组件和样式..."
if [ -d "$BACKUP_DIR/components" ]; then
  cp -r "$BACKUP_DIR/components/DecryptedText.jsx" src/components/UI/ 2>/dev/null
  cp -r "$BACKUP_DIR/components/ProjectCard.tsx" src/components/UI/ 2>/dev/null
fi

# 恢复数据文件
echo "恢复数据文件..."
if [ -d "$BACKUP_DIR/data" ]; then
  cp -r "$BACKUP_DIR/data/portfolio.ts" src/data/ 2>/dev/null
fi

# 恢复上下文提供者
echo "恢复上下文提供者..."
if [ -d "$BACKUP_DIR/contexts" ]; then
  cp -r "$BACKUP_DIR/contexts/PortfolioVisitContext.tsx" src/contexts/ 2>/dev/null
  cp -r "$BACKUP_DIR/contexts/ThemeContext.tsx" src/contexts/ 2>/dev/null
fi

# 恢复全部设计页面
echo "恢复全部设计页面..."
if [ -d "$BACKUP_DIR/all-designs" ]; then
  rm -rf src/app/all-designs
  mkdir -p src/app/all-designs
  cp -r "$BACKUP_DIR/all-designs"/* src/app/all-designs/ 2>/dev/null
fi

# 运行修复脚本
echo "运行缓存修复脚本..."
if [ -f "fix-next-cache.sh" ]; then
  chmod +x fix-next-cache.sh
  ./fix-next-cache.sh
fi

echo "恢复完成！作品集页面已恢复到 v0.0.9 版本"
echo "请运行 'npm run dev' 查看恢复后的页面" 