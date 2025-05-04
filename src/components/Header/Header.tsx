'use client';

import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedText } from '@/utils/translations';
import TranslatedText from '@/components/TranslatedText';

// 懒加载组件
const AnimatedHello = lazy(() => import('./AnimatedHello'));
const TextPressure = lazy(() => import('./TextPressure'));
const Aurora = lazy(() => import('./Aurora'));

// 加载占位符
const LoadingPlaceholder = () => (
  <div className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg" 
       style={{ width: '100%', height: '100%' }} />
);

const Header = () => {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [showQrCode, setShowQrCode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // 使用IntersectionObserver优化加载
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // 一旦可见，停止观察
            if (sectionRef.current) {
              observer.unobserve(sectionRef.current);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      // 清除可能存在的timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 显示二维码
  const handleMouseEnter = () => {
    // 清除之前的timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowQrCode(true);
  };

  // 隐藏二维码（使用延迟）
  const handleMouseLeave = () => {
    // 设置延迟关闭，避免频繁触发
    timeoutRef.current = setTimeout(() => {
      setShowQrCode(false);
    }, 300);
  };

  // 点击按钮显示/隐藏二维码
  const toggleQrCode = () => {
    setShowQrCode(!showQrCode);
  };

  return (
    <header 
      ref={sectionRef} 
      className="relative w-full overflow-hidden mt-16" 
      style={{ height: '750px' }}
    >
      {/* Aurora 效果 - 仅在组件可见时渲染 */}
      {isVisible && (
        <div 
          className="absolute inset-0" 
          style={{ 
            zIndex: 1, 
            opacity: isDarkTheme ? 1 : 0.3,
            willChange: 'opacity' 
          }}
        >
          <Suspense fallback={<LoadingPlaceholder />}>
            <Aurora 
              colorStops={isDarkTheme ? ["#00d8ff", "#7cff67", "#00d8ff"] : ["#30C3D0", "#63E375", "#7AE4F3"]}
              amplitude={1.5}
              blend={isDarkTheme ? 0.3 : 0.3}
              speed={0.7}
            />
          </Suspense>
        </div>
      )}
      
      {/* AnimatedHello组件 - 使用Suspense懒加载 */}
      <Suspense fallback={<LoadingPlaceholder />}>
        {isVisible && <AnimatedHello />}
      </Suspense>
      
      {/* 添加 HELLO! 文字和 I'm WincyFu 👋 文字 - 绝对居中定位 */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="absolute flex flex-col items-center" style={{ 
          left: '50%', 
          top: '66%', 
          transform: 'translate(-50%, -50%)', 
          width: '900px', 
          pointerEvents: 'auto'
        }}>
          <Suspense fallback={<LoadingPlaceholder />}>
            {isVisible && (
              <TextPressure
                text="HELLO!"
                fontFamily="Compressa VF"
                fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor={isDarkTheme ? "#ffffff" : "#000000"}
                strokeColor="#ff0000"
                minFontSize={280}
              />
            )}
          </Suspense>
          
          {/* 添加 I'm WincyFu 👋 文字，根据主题切换颜色 */}
          <div 
            className="font-medium" 
            style={{ 
              marginTop: '30px', 
              fontSize: '40px', 
              color: isDarkTheme ? '#fff' : '#000',
              fontFamily: 'OppoSans, sans-serif',
              lineHeight: 1
            }}
          >
            <TranslatedText textKey="header.greeting" />
            <span className="waving-hand">👋</span>
          </div>
          
          {/* 添加联系我按钮，鼠标悬停显示微信二维码 - 使用onClick事件作为备选方案 */}
          <div
            className="flex flex-col items-center mt-10"
            style={{ perspective: '2000px' }}
          >
            <div 
              className="perspective-hover bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-opacity-90 rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500"
              onMouseEnter={handleMouseEnter}
              onClick={toggleQrCode}
              style={{ 
                background: 'linear-gradient(to right, #22c45e, #22c45e)',
                boxShadow: 'none',
                borderRadius: '50px',
                padding: '15px 30px',
                fontWeight: 'bold',
                fontSize: '18px',
                letterSpacing: '0.5px',
                transform: 'translateZ(0)',
                transition: 'all 0.3s ease',
              }}
              onMouseMove={(e) => {
                const btn = e.currentTarget;
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const rotateY = ((x - rect.width / 2) / rect.width) * 10;
                const rotateX = -((y - rect.height / 2) / rect.height) * 10;
                
                btn.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
              }}
              onMouseLeave={(e) => {
                const btn = e.currentTarget;
                btn.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                // 同时处理二维码的隐藏逻辑
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
                timeoutRef.current = setTimeout(() => {
                  setShowQrCode(false);
                }, 300);
              }}
            >
              <TranslatedText textKey="header.contactBtn" />
            </div>
          </div>
        </div>
      </div>
    
      {showQrCode && (
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ 
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <button 
            onClick={() => setShowQrCode(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              lineHeight: 1
            }}
          >
            ×
          </button>
          <Image 
            src="/images/wechat-qrcode.jpg" 
            alt="微信二维码" 
            width={240} 
            height={240}
            className="rounded"
            loading="lazy"
          />
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#333' }}>
            <TranslatedText textKey="header.qrCodeText" />
          </p>
        </div>
      )}
      
      {/* 添加WincyFu.png图片 - 放在最上层，放大图片 */}
      <div className="absolute" style={{ top: '450px', left: '1010px', right: '560px', zIndex: 30 }}>
        {isVisible && (
          <Image
            src="/images/WincyFu.png"
            alt="WincyFu"
            width={500}
            height={500}
            className="object-contain"
            priority={false}
            loading="lazy"
          />
        )}
      </div>
    </header>
  );
};

export default React.memo(Header); 