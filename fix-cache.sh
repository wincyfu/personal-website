#!/bin/bash

echo "开始清理Next.js缓存..."
rm -rf .next
rm -rf node_modules/.cache

echo "缓存已清理完成"
echo "重新安装node_modules依赖..."
npm install

echo "重建项目..."
npm run build

echo "缓存清理和项目重建完成！"
echo "现在可以通过 'npm run dev' 重新启动开发服务器"

echo "==== 开始修复项目 ===="

# 停止运行中的开发服务器
echo "停止运行中的开发服务器..."
pkill -f "next dev" || true

# 重新安装framer-motion
echo "重新安装framer-motion..."
npm install framer-motion@latest

# 确保 all-designs 的布局文件不依赖providers
echo "修复 all-designs 布局文件..."
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

echo "==== 修复完成 ===="
echo "现在请运行: npm run dev" 