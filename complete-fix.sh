#!/bin/bash

echo "==== 开始全面修复项目 ===="

# 停止运行中的开发服务器
echo "停止运行中的开发服务器..."
pkill -f "next dev" || true

# 清理缓存
echo "清理Next.js缓存..."
rm -rf .next
rm -rf node_modules/.cache

# 修复page.tsx文件中的语法错误
echo "检查并修复page.tsx文件中的语法错误..."
# 检查文件末尾是否有多余的花括号
sed -i '' -e '$s/} $//' src/app/all-designs/page.tsx

# 修复layout.tsx文件中的导入问题
echo "修复all-designs布局文件中的导入问题..."
cat > src/app/all-designs/layout.tsx << 'EOF'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '全部设计作品 | 作品集',
  description: '汇集移动端、网站、大屏及其他领域的设计作品，展示多元化的设计能力与创意',
};

export default function AllDesignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
EOF

# 重新安装依赖
echo "重新安装关键依赖..."
npm install framer-motion@latest

# 重建项目
echo "重建项目..."
npm run build

echo "==== 修复完成 ===="
echo "现在请运行: npm run dev" 