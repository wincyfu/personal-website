#!/bin/bash

echo "===== 开始清理Next.js缓存和修复编译错误 ====="

# 停止所有运行中的Next.js开发服务器
echo "正在停止运行中的Next.js开发服务器..."
pkill -f "next dev" || true

# 清理缓存目录
echo "正在清理Next.js缓存..."
rm -rf .next
rm -rf node_modules/.cache

# 确保all-designs布局中不引用不存在的providers
echo "修复all-designs布局文件..."
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

# 清理npm缓存
echo "清理npm缓存..."
npm cache clean --force

# 重新安装依赖
echo "重新安装依赖..."
npm install

# 重建项目
echo "重建项目..."
npm run build

echo "===== 清理和修复完成 ====="
echo "现在可以使用 'npm run dev' 重新启动开发服务器" 