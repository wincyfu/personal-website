'use client';

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useInView } from 'react-intersection-observer';
import Nav from '@/components/Nav/Nav';
import Header from '@/components/Header/Header';

// 使用懒加载动态导入内容组件
const About = lazy(() => import('@/components/Content/About'));
const AIProducts = lazy(() => import('@/components/Content/AIProducts'));
const Tutorials = lazy(() => import('@/components/Content/Tutorials'));
const Achievements = lazy(() => import('@/components/Content/Achievements'));
const AIRecommendations = lazy(() => import('@/components/Content/AIRecommendations'));
const Contact = lazy(() => import('@/components/Content/Contact'));
const Footer = lazy(() => import('@/components/Footer/Footer'));

// 改进的加载占位符组件
const LoadingSection = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="animate-pulse w-full max-w-4xl h-52 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
  </div>
);

export default function Home() {
  const { isDarkTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  
  // 为每个组件创建单独的IntersectionObserver
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [productsRef, productsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [tutorialsRef, tutorialsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [achievementsRef, achievementsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [recommendationsRef, recommendationsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [footerRef, footerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // 客户端水合完成后设置isMounted
  useEffect(() => {
    setIsMounted(true);
    
    // 处理URL中的锚点，确保直接定位到产品区域
    if (typeof window !== 'undefined' && window.location.hash === '#ai-products') {
      setTimeout(() => {
        const productsSection = document.getElementById('ai-products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-black' : 'bg-white'}`}>
      <Nav />
      <main className="flex flex-col items-center justify-between overflow-hidden">
        <Header />
        
        {/* 关于我 */}
        <section ref={aboutRef} className="w-full">
          <Suspense fallback={<LoadingSection />}>
            {(isMounted && aboutInView) && <About />}
          </Suspense>
        </section>
        
        {/* AI辅助编码产品 */}
        <section ref={productsRef} id="ai-products" className="w-full">
          <Suspense fallback={<LoadingSection />}>
            {(isMounted && productsInView) && <AIProducts />}
          </Suspense>
        </section>
        
        {/* 文章教程 */}
        <section ref={tutorialsRef} className="w-full">
          <Suspense fallback={<LoadingSection />}>
            {(isMounted && tutorialsInView) && <Tutorials />}
          </Suspense>
        </section>
        
        {/* 个人成就 */}
        <section ref={achievementsRef} className="w-full">
          <Suspense fallback={<LoadingSection />}>
            {(isMounted && achievementsInView) && <Achievements />}
          </Suspense>
        </section>
        
        {/* 与我联系 - 调整到AI产品推荐上方 */}
        <section ref={contactRef} className="w-full">
          <Suspense fallback={<LoadingSection />}>
            {(isMounted && contactInView) && <Contact />}
          </Suspense>
        </section>
        
        {/* AI产品推荐 */}
        <section ref={recommendationsRef} className="w-full">
          <Suspense fallback={<LoadingSection />}>
            {(isMounted && recommendationsInView) && <AIRecommendations />}
          </Suspense>
        </section>
      </main>
      
      {/* 页脚 */}
      <section ref={footerRef} className="w-full">
        <Suspense fallback={<LoadingSection />}>
          {(isMounted && footerInView) && <Footer />}
        </Suspense>
      </section>
    </div>
  );
} 