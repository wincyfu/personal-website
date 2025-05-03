#!/bin/bash

# 设置变量
VERSION="v1.4.2"
BACKUP_DIR="backup/${VERSION}"

# 检查备份目录是否存在
if [ ! -d "${BACKUP_DIR}" ]; then
    echo "错误: 备份目录 ${BACKUP_DIR} 不存在!"
    exit 1
fi

echo "正在恢复版本 ${VERSION}..."

# 恢复源代码文件
rm -rf src
cp -r ${BACKUP_DIR}/src ./

# 恢复公共资源
rm -rf public
cp -r ${BACKUP_DIR}/public ./

# 恢复配置文件
cp ${BACKUP_DIR}/package.json ./
cp ${BACKUP_DIR}/package-lock.json ./
cp ${BACKUP_DIR}/next.config.js ./
cp ${BACKUP_DIR}/tsconfig.json ./
cp ${BACKUP_DIR}/tailwind.config.js ./
cp ${BACKUP_DIR}/postcss.config.js ./
cp ${BACKUP_DIR}/next-env.d.ts ./

# 恢复文档
cp ${BACKUP_DIR}/README.md ./
cp ${BACKUP_DIR}/CHANGELOG.md ./
cp ${BACKUP_DIR}/VERSION.md ./
cp ${BACKUP_DIR}/VERSION ./

echo "恢复完成！版本 ${VERSION} 已成功恢复"
echo "请运行 'npm install' 确保依赖包正确安装后再启动项目" 