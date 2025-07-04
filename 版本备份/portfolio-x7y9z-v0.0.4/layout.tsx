import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '作品集 | WincyFu',
  description: 'WincyFu的作品集展示，包含UI/UX设计、产品设计、AI辅助设计等项目案例',
  robots: 'noindex, nofollow', // 确保这个页面不被搜索引擎索引
};

export default function PortfolioLayout({
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