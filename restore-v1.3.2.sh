#!/bin/bash

# 恢复v1.3.2版本的脚本
echo "正在恢复v1.3.2版本..."

# 检查备份目录是否存在
if [ ! -d "backup/v1.3.2" ]; then
  echo "错误: v1.3.2版本的备份不存在!"
  exit 1
fi

# 恢复src目录
echo "恢复源代码文件..."
rsync -av --delete backup/v1.3.2/src/ src/

# 恢复配置文件
echo "恢复配置文件..."
cp backup/v1.3.2/package.json ./
cp backup/v1.3.2/tailwind.config.js ./
cp backup/v1.3.2/tsconfig.json ./
cp backup/v1.3.2/next.config.js ./
cp backup/v1.3.2/README.md ./

echo "v1.3.2版本恢复完成!"
echo "请运行 'npm install' 安装依赖，然后运行 'npm run dev' 启动开发服务器." 