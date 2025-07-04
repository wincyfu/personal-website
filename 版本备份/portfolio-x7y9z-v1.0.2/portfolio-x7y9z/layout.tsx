import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '设计作品集 | 个人网站',
  description: '探索我的UI/UX设计作品，包括移动应用、网站、数据可视化和品牌设计项目',
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