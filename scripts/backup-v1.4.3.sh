#!/bin/bash

# 备份v1.4.3版本的脚本

# 设置版本号
VERSION="v1.4.3"
BACKUP_DIR="backup/$VERSION"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 复制文件到备份目录
echo "正在备份 $VERSION 版本的文件..."
cp -r src/ $BACKUP_DIR/
cp package.json package-lock.json next.config.js README.md VERSION tsconfig.json tailwind.config.js postcss.config.js next-env.d.ts $BACKUP_DIR/

# 创建版本说明文件
echo "# Changelog\n\n## $VERSION\n- 修复 FallingText 组件在浅色模式下不能正常工作的问题\n- 添加主题切换支持，确保组件在深色和浅色模式下都能正常显示\n- 优化文字颜色，在不同主题下自动调整以保持可见性\n- 保持原有下落效果和交互体验\n- 改进主题切换时的组件重新渲染逻辑" > $BACKUP_DIR/CHANGELOG.md

# 创建详细版本说明
echo "# 版本说明\n\n## $VERSION\n发布日期: $(date +%Y-%m-%d)\n\n### 更新内容\n- 修复 FallingText 组件在浅色模式下不能正常工作的问题\n- 添加主题切换支持，确保组件在深色和浅色模式下都能正常显示\n- 优化文字颜色，在不同主题下自动调整以保持可见性\n- 保持原有下落效果和交互体验\n- 改进主题切换时的组件重新渲染逻辑\n\n### 发布说明\n此版本主要修复了浅色模式下FallingText组件的显示问题，确保无论在什么主题下，组件都能正常工作。" > $BACKUP_DIR/VERSION.md

# 显示备份完成消息
echo "已成功备份 $VERSION 版本!"
echo "备份目录: $BACKUP_DIR" 