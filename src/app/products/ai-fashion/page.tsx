'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import BlurText from '@/components/BlurText';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AIFashionDetail() {
  const { isDarkTheme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [fromHome, setFromHome] = useState(false);

  useEffect(() => {
    // 检查url参数，判断用户来源
    const from = searchParams.get('from');
    setFromHome(from === 'home');
  }, [searchParams]);

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };
  
  const handleReturn = () => {
    if (fromHome) {
      // 直接跳转到首页特定位置，replace=true替换当前历史记录
      window.location.replace('/#ai-products');
    } else {
      // 返回产品列表页
      router.push('/products');
    }
  };

  return (
    <main className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'} w-full min-h-screen transition-colors duration-300 flex flex-col`}>
      <Nav />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center justify-center flex-grow py-20">
        <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
          织间集AI搭配助手
        </h1>
        
        <BlurText
          text="正在开发中..."
          delay={150}
          animateBy="letters"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className={`text-3xl md:text-4xl font-bold mb-12 ${isDarkTheme ? 'text-primary' : 'text-primary'}`}
          animationFrom={{}}
          animationTo={[]}
        />
        
        <div className="mt-8">
          <button 
            onClick={handleReturn}
            className={`inline-block px-8 py-3 rounded-lg font-medium transition-all ${
              isDarkTheme 
                ? 'bg-[#22c45e] text-white hover:bg-[#1eb554]' 
                : 'bg-[#22c45e] text-white hover:bg-[#1eb554]'
            }`}
          >
            {fromHome ? '返回首页' : '返回我的产品'}
          </button>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 