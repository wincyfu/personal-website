#!/bin/bash
# 恢复v1.3.3版本的脚本
echo "正在恢复v1.3.3版本..."
# 删除当前src目录内容
rm -rf ./src
# 复制v1.3.3版本的内容
cp -r ./backup/v1.3.3/src ./
# 复制配置文件
cp ./backup/v1.3.3/package.json ./
cp ./backup/v1.3.3/package-lock.json ./
cp ./backup/v1.3.3/tsconfig.json ./
cp ./backup/v1.3.3/next.config.js ./
cp ./backup/v1.3.3/postcss.config.js ./
cp ./backup/v1.3.3/tailwind.config.js ./
cp ./backup/v1.3.3/README.md ./
echo "v1.3.3版本恢复完成！"
