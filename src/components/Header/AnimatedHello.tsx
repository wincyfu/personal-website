'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

const AnimatedHello = () => {
  const { isDarkTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imageRef.current) {
              imageRef.current.classList.add('animate-hello');
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '750px' }}>
      {/* 图片区域 - 确保与Aurora组件保持一致的位置和大小 */}
      <div 
        ref={imageRef}
        className="opacity-0 absolute top-0 left-0 right-0 w-full h-full transform transition-all duration-500"
        style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          width: '100vw',
          height: '750px',
          zIndex: isDarkTheme ? 5 : 1,
          pointerEvents: 'none',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        }}
      >
        <Image 
          src="/images/header-tags.png" 
          alt="Header Image" 
          width={1920}
          height={750}
          className="w-full h-full object-cover"
          priority
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedHello; 