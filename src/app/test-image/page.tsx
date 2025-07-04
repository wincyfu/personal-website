'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function TestImagePage() {
  const [origin, setOrigin] = useState('');
  
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">图片测试页面</h1>
      
      <div className="mb-8">
        <h2 className="text-xl mb-2">测试1：使用Image组件</h2>
        <div className="relative h-[400px] w-[600px] border border-gray-300">
          <Image 
            src="/images/portfolio/good-journey-project.jpg" 
            alt="好旅程项目"
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl mb-2">测试2：使用HTML img标签</h2>
        <img 
          src="/images/portfolio/good-journey-project.jpg" 
          alt="好旅程项目"
          className="border border-gray-300 max-w-[600px]"
        />
      </div>
      
      {origin && (
        <div className="mb-8">
          <h2 className="text-xl mb-2">测试3：使用绝对路径</h2>
          <img 
            src={`${origin}/images/portfolio/good-journey-project.jpg`}
            alt="好旅程项目"
            className="border border-gray-300 max-w-[600px]"
          />
        </div>
      )}
      
      <div className="mt-8 p-4 bg-yellow-100 rounded">
        <h2 className="font-bold mb-2">调试信息</h2>
        <p>当前时间戳: {Date.now()}</p>
        <p>图片路径: /images/portfolio/good-journey-project.jpg</p>
        {origin && <p>完整URL: {origin}/images/portfolio/good-journey-project.jpg</p>}
      </div>
    </div>
  );
} 