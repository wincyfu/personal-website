import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">页面不存在</h2>
      <p className="text-gray-600 mb-8">您要访问的页面可能已被移除或暂不可用</p>
      <Link 
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg font-medium"
      >
        返回首页
      </Link>
    </div>
  );
} 