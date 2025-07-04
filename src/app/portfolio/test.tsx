'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function TestComponent() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const appDesignRef = useRef<HTMLDivElement>(null);
  const isDarkTheme = true;
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        if (appDesignRef.current) {
          appDesignRef.current.scrollLeft = 0;
          setCurrentCardIndex(0);
          
          const container = appDesignRef.current;
          if (container.style) {
            container.style.paddingLeft = '0';
            container.style.marginLeft = '0';
          }
          
          const firstCard = container.querySelector('.mobile-card-first');
          if (firstCard && (firstCard as HTMLElement).style) {
            (firstCard as HTMLElement).style.marginLeft = '0';
          }
        }
      }, 100);
      
      const handleResize = () => {
        if (appDesignRef.current) {
          const cardWidth = 500;
          const cardGap = 20;
          const scrollDistance = cardWidth + cardGap;
          appDesignRef.current.scrollLeft = currentCardIndex * scrollDistance;
          
          appDesignRef.current.style.paddingLeft = '0';
          appDesignRef.current.style.marginLeft = '0';
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [currentCardIndex]);

  return (
    <div 
      className={`min-h-screen py-0 px-0 transition-colors duration-300 relative ${
        isDarkTheme ? 'bg-[#111111] text-white' : 'bg-white text-dark'
      }`}
    >
      <div ref={appDesignRef} className="hide-scrollbar mobile-design-scroll">
        测试组件
      </div>
    </div>
  );
} 