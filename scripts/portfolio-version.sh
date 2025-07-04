#!/bin/bash

# 作品集页面版本管理脚本

# 使用方法：
# 备份: ./scripts/portfolio-version.sh backup v0.0.x "备份说明"
# 恢复: ./scripts/portfolio-version.sh restore v0.0.x

COMMAND=$1
VERSION=$2
DESCRIPTION=$3

# 备份路径
BACKUP_DIR="backups/portfolio/$VERSION"
SRC_DIR="src/app/portfolio-x7y9z"
DATA_FILE="src/data/portfolio.ts"
QR_FILE="public/images/qrcode.svg"

# 日志文件
LOG_FILE="backups/backup_log.txt"

# 备份函数
backup() {
    echo "正在创建作品集版本 $VERSION 的备份..."
    
    # 创建备份目录
    mkdir -p $BACKUP_DIR
    
    # 复制文件
    cp -r $SRC_DIR $BACKUP_DIR/
    cp $DATA_FILE $BACKUP_DIR/
    cp $QR_FILE $BACKUP_DIR/
    
    # 创建备份信息文件
    cat > $BACKUP_DIR/BACKUP_INFO.md << EOF
# 作品集页面备份 $VERSION

## 备份信息

- **备份版本**：$VERSION
- **备份日期**：$(date +"%Y-%m-%d")
- **备份内容**：$DESCRIPTION

## 备份文件清单

1. \`portfolio-x7y9z/\` - 作品集页面组件目录
   - \`page.tsx\` - 主页面组件
   - \`README.md\` - 页面说明文档
   - 其他相关组件

2. \`portfolio.ts\` - 作品集数据文件

3. \`qrcode.svg\` - 微信二维码SVG图像

## 恢复说明

要恢复此备份，请执行以下步骤：

1. 确保开发服务器已停止
2. 执行以下命令恢复文件：

\`\`\`bash
./scripts/portfolio-version.sh restore $VERSION
\`\`\`

或手动恢复:

\`\`\`bash
cp -r backups/portfolio/$VERSION/portfolio-x7y9z src/app/
cp backups/portfolio/$VERSION/portfolio.ts src/data/
cp backups/portfolio/$VERSION/qrcode.svg public/images/
\`\`\`

3. 重新启动开发服务器：\`npm run dev\`
4. 访问 http://localhost:3000/portfolio-x7y9z 确认恢复成功

## 版本特性概述

$DESCRIPTION

## 备注

此备份由系统于 $(date) 创建，作为 $VERSION 版本的存档。
EOF
    
    # 记录备份日志
    echo "作品集页面 $VERSION 备份已创建于 $(date) - $DESCRIPTION" >> $LOG_FILE
    
    echo "备份完成！版本 $VERSION 已保存到 $BACKUP_DIR"
}

# 恢复函数
restore() {
    if [ ! -d "$BACKUP_DIR" ]; then
        echo "错误：找不到版本 $VERSION 的备份。"
        exit 1
    fi
    
    echo "正在恢复作品集到版本 $VERSION..."
    
    # 恢复文件
    cp -r $BACKUP_DIR/portfolio-x7y9z src/app/
    cp $BACKUP_DIR/portfolio.ts src/data/
    cp $BACKUP_DIR/qrcode.svg public/images/
    
    # 记录恢复日志
    echo "作品集页面已恢复到版本 $VERSION 于 $(date)" >> $LOG_FILE
    
    echo "恢复完成！作品集页面已恢复到版本 $VERSION"
}

# 主逻辑
case $COMMAND in
    backup)
        if [ -z "$VERSION" ]; then
            echo "错误：未指定版本号。使用方法: ./scripts/portfolio-version.sh backup v0.0.x \"备份说明\""
            exit 1
        fi
        if [ -z "$DESCRIPTION" ]; then
            echo "错误：未提供备份说明。使用方法: ./scripts/portfolio-version.sh backup v0.0.x \"备份说明\""
            exit 1
        fi
        backup
        ;;
    restore)
        if [ -z "$VERSION" ]; then
            echo "错误：未指定版本号。使用方法: ./scripts/portfolio-version.sh restore v0.0.x"
            exit 1
        fi
        restore
        ;;
    *)
        echo "使用方法："
        echo "  备份: ./scripts/portfolio-version.sh backup v0.0.x \"备份说明\""
        echo "  恢复: ./scripts/portfolio-version.sh restore v0.0.x"
        exit 1
        ;;
esac

exit 0 