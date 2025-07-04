#!/bin/bash

# 创建备份文件夹
mkdir -p public/images/portfolio/backup

# 备份所有原始图片
echo "正在备份原始图片..."
cp public/images/portfolio/*.jpg public/images/portfolio/backup/

# 复制项目预览图为卡片预览图
echo "正在重命名预览图..."
cp public/images/portfolio/good-journey-project.jpg public/images/portfolio/card-preview-1.jpg
cp public/images/portfolio/project-4.jpg public/images/portfolio/card-preview-2.jpg

# 为第一个项目创建详情图
echo "正在创建第一个项目详情图..."
cp public/images/portfolio/project-1.jpg public/images/portfolio/detail-1-1.jpg
cp public/images/portfolio/project-2.jpg public/images/portfolio/detail-1-2.jpg
cp public/images/portfolio/project-3.jpg public/images/portfolio/detail-1-3.jpg
cp public/images/portfolio/project-4.jpg public/images/portfolio/detail-1-4.jpg
cp public/images/portfolio/project-5.jpg public/images/portfolio/detail-1-5.jpg
cp public/images/portfolio/project-6.jpg public/images/portfolio/detail-1-6.jpg
cp public/images/portfolio/project-7.jpg public/images/portfolio/detail-1-7.jpg
cp public/images/portfolio/project-8.jpg public/images/portfolio/detail-1-8.jpg
cp public/images/portfolio/project-9.jpg public/images/portfolio/detail-1-9.jpg
cp public/images/portfolio/project-10.jpg public/images/portfolio/detail-1-10.jpg
cp public/images/portfolio/project-11.jpg public/images/portfolio/detail-1-11.jpg
cp public/images/portfolio/project-12.jpg public/images/portfolio/detail-1-12.jpg
cp public/images/portfolio/project-13.jpg public/images/portfolio/detail-1-13.jpg
cp public/images/portfolio/project-14.jpg public/images/portfolio/detail-1-14.jpg
cp public/images/portfolio/project-15.jpg public/images/portfolio/detail-1-15.jpg

# 为第二个项目(健康监测应用)创建详情图
echo "正在创建健康监测应用详情图..."
cp public/images/portfolio/project-14.jpg public/images/portfolio/detail-2-1.jpg
cp public/images/portfolio/project-15.jpg public/images/portfolio/detail-2-2.jpg
cp public/images/portfolio/project-1.jpg public/images/portfolio/detail-2-3.jpg
cp public/images/portfolio/project-5.jpg public/images/portfolio/detail-2-4.jpg
cp public/images/portfolio/project-6.jpg public/images/portfolio/detail-2-5.jpg
cp public/images/portfolio/project-7.jpg public/images/portfolio/detail-2-6.jpg

echo "重命名完成！"
echo "原始图片已备份到 public/images/portfolio/backup/ 目录"
echo "新图片已按命名规范创建" 