#!/bin/bash

# 还原作品集页面 v0.0.3
echo "正在还原作品集页面 v0.0.3..."

# 检查备份目录是否存在
if [ ! -d "./backup/portfolio-v0.0.3" ]; then
  echo "错误: 备份目录不存在!"
  exit 1
fi

# 还原文件
cp -r ./backup/portfolio-v0.0.3/portfolio-x7y9z ./src/app/
cp -r ./backup/portfolio-v0.0.3/components-UI/* ./src/components/UI/
cp -r ./backup/portfolio-v0.0.3/portfolio.ts ./src/data/
cp -r ./backup/portfolio-v0.0.3/wechat-qrcode.png ./public/images/
cp -r ./backup/portfolio-v0.0.3/PortfolioVisitContext.tsx ./src/contexts/

echo "=============================================="
echo "作品集页面 v0.0.3 已成功还原!"
echo "=============================================="
