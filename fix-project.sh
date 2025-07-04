#!/bin/bash

echo "==== 开始修复项目 ===="

# 清理缓存和构建文件
echo "清理缓存和构建文件..."
rm -rf .next
rm -rf node_modules/.cache

# 重新安装依赖
echo "重新安装依赖..."
npm install

# 确保 all-designs 布局文件使用正确的结构
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