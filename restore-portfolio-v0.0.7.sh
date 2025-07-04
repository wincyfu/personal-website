#!/bin/bash

# 恢复脚本 - 将作品集页面恢复到v0.0.7版本
echo "开始恢复作品集页面到v0.0.7版本..."

# 定义备份路径和目标路径
BACKUP_PATH="版本备份/portfolio-x7y9z-v0.0.7"
TARGET_PATH="src/app/portfolio-x7y9z"

# 检查备份文件是否存在
if [ ! -d "$BACKUP_PATH" ]; then
  echo "错误: 备份目录不存在: $BACKUP_PATH"
  exit 1
fi

# 恢复page.tsx文件
echo "恢复page.tsx文件..."
cp "$BACKUP_PATH/page.tsx" "$TARGET_PATH/page.tsx"
if [ $? -ne 0 ]; then
  echo "错误: 无法恢复page.tsx文件"
  exit 1
fi

# 备份当前的globals.css文件
echo "备份当前的globals.css文件..."
TIMESTAMP=$(date +%Y%m%d%H%M%S)
cp "src/app/globals.css" "src/app/globals.css.backup-$TIMESTAMP"

# 恢复globals.css文件中作品集相关的CSS样式
echo "恢复globals.css文件中的作品集CSS样式..."
# 从备份文件提取移动端设计相关的CSS样式
MOBILE_DESIGN_CSS=$(grep -n "移动端设计卡片容器样式" -A 150 "$BACKUP_PATH/globals.css")

# 将提取的CSS样式添加到当前的globals.css文件中
# 首先检查当前文件是否已包含相关样式
if grep -q "移动端设计卡片容器样式" "src/app/globals.css"; then
  # 如果已包含，则替换相关部分
  # 使用sed提取起始行号和结束行号
  START_LINE=$(grep -n "移动端设计卡片容器样式" "src/app/globals.css" | cut -d ':' -f 1)
  END_LINE=$(grep -n "适配平板设备的样式" -A 10 "src/app/globals.css" | tail -1 | cut -d ':' -f 1)
  
  # 删除当前文件中的相关CSS部分
  sed -i.tmp "${START_LINE},${END_LINE}d" "src/app/globals.css"
  
  # 在特定位置添加备份的CSS样式
  sed -i.tmp "${START_LINE}i\\
/* 移动端设计卡片容器样式 */\\
.mobile-design-container {\\
  width: 100%;\\
  position: relative;\\
}\\
\\
/* 确保卡片容器与标题对齐 */\\
.mobile-design-title {\\
  position: relative;\\
  z-index: 1;\\
  margin-left: 0; /* 确保标题没有左边距 */\\
}\\
\\
/* 移动端设计全宽容器 */\\
.mobile-design-wrapper {\\
  /* 改用相对定位，确保与父容器对齐 */\\
  position: relative;\\
  width: 100%;\\
  margin: 0;\\
  padding: 0;\\
  overflow: hidden; /* 更改为hidden，控制溢出内容 */\\
}\\
\\
/* 移动端设计滚动容器 - Webflow风格 */\\
.mobile-design-scroll {\\
  display: flex;\\
  overflow-x: auto;\\
  position: relative;\\
  padding: 0 0 20px 0;\\
  margin: 0;\\
  width: 100%;\\
  -webkit-overflow-scrolling: touch;\\
  scrollbar-width: none;\\
  gap: 20px;\\
  /* 添加右侧空间，确保最后一个卡片完整显示 */\\
  padding-right: 400px;\\
  /* 添加平滑滚动 */\\
  scroll-behavior: smooth;\\
  overscroll-behavior-x: contain;\\
}\\
\\
/* Webflow风格卡片样式 */\\
.mobile-card {\\
  flex: 0 0 auto;\\
  width: 520px !important;\\
  transition: all 0.3s ease;\\
  border-radius: 8px;\\
  overflow: hidden;\\
  transform-origin: center center;\\
  opacity: 0.4;\\
  transform: scale(0.94);\\
}\\
\\
/* 卡片内容 */\\
.mobile-card-content {\\
  height: 100%;\\
  overflow: hidden;\\
  background-color: #171717;\\
  border: 1px solid #222;\\
  border-radius: 8px;\\
  transition: all 0.3s ease;\\
}\\
\\
/* 可见卡片 */\\
.mobile-card-visible {\\
  opacity: 1 !important;\\
  transform: scale(1) !important;\\
  z-index: 2;\\
  position: relative;\\
}\\
\\
/* 暗淡卡片 */\\
.mobile-card-dim {\\
  opacity: 0.4;\\
  transform: scale(0.94);\\
  z-index: 1;\\
}\\
\\
/* 第一个卡片 */\\
.mobile-card-first {\\
  margin-left: 0 !important;\\
  z-index: 3;\\
}\\
\\
/* 控制按钮样式 */\\
.slider-control-button {\\
  width: 44px;\\
  height: 44px;\\
  border-radius: 50%;\\
  display: flex;\\
  align-items: center;\\
  justify-content: center;\\
  background-color: #333;\\
  color: white;\\
  border: none;\\
  cursor: pointer;\\
  transition: background-color 0.3s ease, opacity 0.3s ease;\\
  /* 增加点击区域，提高按钮可用性 */\\
  touch-action: manipulation;\\
  z-index: 10;\\
}\\
\\
.slider-control-button:hover {\\
  background-color: #444;\\
}\\
\\
.slider-control-button:disabled {\\
  opacity: 0.5;\\
  cursor: not-allowed;\\
}\\
\\
/* 卡片悬停效果 */\\
.mobile-card:hover .mobile-card-content {\\
  transform: translateY(-8px);\\
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);\\
}\\
\\
.mobile-card:hover .mobile-card-image {\\
  transform: scale(1.05);\\
}\\
\\
/* 卡片图片 */\\
.mobile-card-image {\\
  transition: transform 0.6s ease;\\
}\\
\\
/* 媒体查询适配 */\\
@media (max-width: 768px) {\\
  .mobile-card {\\
    width: 90% !important;\\
  }\\
}\\
\\
/* 适配平板设备的样式 */\\
@media (min-width: 769px) and (max-width: 1023px) {\\
  .mobile-card {\\
    width: 520px !important;\\
  }\\
}" "src/app/globals.css"
else
  # 如果不包含，则添加到文件末尾
  cat "$BACKUP_PATH/globals.css" | grep -n "移动端设计卡片容器样式" -A 150 >> "src/app/globals.css"
fi

# 清理临时文件
rm -f "src/app/globals.css.tmp"

# 删除页面组件文件
echo "删除不需要的组件文件..."
rm -f src/components/Portfolio/CardScroller.tsx
rm -f src/components/Portfolio/HorizontalScroller.tsx
rm -f src/components/Portfolio/ContactSection.tsx
rm -f src/components/Portfolio/ExperienceSection.tsx

# 删除对齐脚本文件
echo "删除对齐脚本文件..."
rm -f public/js/portfolio-alignment.js

echo "恢复完成！请重启开发服务器以应用更改。" 