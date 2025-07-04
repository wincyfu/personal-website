#!/bin/bash

# 设置版本号
VERSION="v0.0.8"
BACKUP_DIR="版本备份/portfolio-x7y9z-$VERSION"

# 检查备份目录是否存在
if [ ! -d "$BACKUP_DIR" ]; then
    echo "错误：备份目录 $BACKUP_DIR 不存在！"
    exit 1
fi

echo "开始恢复作品集页面 $VERSION 版本..."

# 恢复作品集页面文件
echo "正在恢复作品集页面文件..."
cp "$BACKUP_DIR/src/app/portfolio-x7y9z/page.tsx" src/app/portfolio-x7y9z/
cp "$BACKUP_DIR/src/app/portfolio-x7y9z/layout.tsx" src/app/portfolio-x7y9z/
cp "$BACKUP_DIR/src/app/portfolio-x7y9z/README.md" src/app/portfolio-x7y9z/

# 确保全部设计页面目录存在
mkdir -p src/app/all-designs

# 恢复全部设计页面文件
echo "正在恢复全部设计页面文件..."
cp "$BACKUP_DIR/src/app/all-designs/page.tsx" src/app/all-designs/
cp "$BACKUP_DIR/src/app/all-designs/layout.tsx" src/app/all-designs/

# 恢复相关组件文件（如果存在）
echo "正在恢复相关组件文件..."
[ -f "$BACKUP_DIR/src/components/UI/ProjectCard.tsx" ] && cp "$BACKUP_DIR/src/components/UI/ProjectCard.tsx" src/components/UI/
[ -f "$BACKUP_DIR/src/components/UI/DecryptedText.tsx" ] && cp "$BACKUP_DIR/src/components/UI/DecryptedText.tsx" src/components/UI/

# 恢复上下文文件（如果存在）
echo "正在恢复上下文文件..."
[ -f "$BACKUP_DIR/src/contexts/ThemeContext.tsx" ] && cp "$BACKUP_DIR/src/contexts/ThemeContext.tsx" src/contexts/
[ -f "$BACKUP_DIR/src/contexts/PortfolioVisitContext.tsx" ] && cp "$BACKUP_DIR/src/contexts/PortfolioVisitContext.tsx" src/contexts/

# 恢复数据文件（如果存在）
echo "正在恢复数据文件..."
[ -f "$BACKUP_DIR/src/data/portfolio.ts" ] && cp "$BACKUP_DIR/src/data/portfolio.ts" src/data/

# 清理缓存文件（可选）
echo "正在清理缓存文件..."
rm -rf .next/cache
rm -rf node_modules/.cache

echo "恢复完成！作品集页面已恢复到 $VERSION 版本"
echo "请运行 npm run dev 重新启动项目" 