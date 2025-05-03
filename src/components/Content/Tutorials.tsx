'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import useWechatArticles, { WechatArticle } from '@/hooks/useWechatArticles';
import StarBorder from '../StarBorder';

interface LocalTutorialCardProps {
  article: WechatArticle;
}

const LocalTutorialCard = ({ article }: LocalTutorialCardProps) => {
  const { isDarkTheme } = useTheme();
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (centerY - y) / 20;
    const tiltY = (x - centerX) / 16;
    
    setTiltAngle({ x: tiltX, y: tiltY });
  };
  
  const handleMouseLeave = () => {
    setTiltAngle({ x: 0, y: 0 });
  };
  
  // 为第一篇文章（ID为0-0）在浅色模式下设置特殊背景色
  const isFirstArticle = article.id === "0-0";
  const bgColor = isDarkTheme 
    ? '#121212' 
    : '#F3F4F6';
  
  return (
    <StarBorder 
      as="div" 
      className="w-full h-full"
      color={isDarkTheme ? "rgba(41, 255, 153, 0.5)" : "rgba(38, 191, 115, 0.5)"}
      speed="6s"
    >
      <div 
        className={`flex flex-col h-full ${isDarkTheme ? 'bg-dark' : 'bg-gray-100'} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all`}
        style={{ 
          background: bgColor, 
          border: 'none',
          transform: `perspective(1000px) rotateX(${tiltAngle.x}deg) rotateY(${tiltAngle.y}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-48 overflow-hidden">
          <Image 
            src={article.coverImg} 
            alt={article.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col h-[calc(100%-192px)]">
          <div className="mb-3 flex justify-between items-center">
            <span className={`text-xs px-2 py-1 ${isDarkTheme ? 'bg-gray-800 text-white/80' : (isFirstArticle ? 'bg-white text-gray-800' : 'bg-white text-gray-800')} rounded-full`}>
              {article.category}
            </span>
            <span className={`text-xs ${isDarkTheme ? 'text-gray-500' : 'text-gray-500'}`}>
              {article.publishDate}
            </span>
          </div>
          <h3 className={`font-semibold text-xl mb-2 line-clamp-2 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
            {article.title}
          </h3>
          <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-base line-clamp-2 mb-8`}>
            {article.excerpt}
          </p>
          <div className="mt-auto">
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`inline-block px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isDarkTheme 
                  ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              查看详情
            </a>
          </div>
        </div>
      </div>
    </StarBorder>
  );
};

// 内联定义TutorialsSkeleton组件，避免依赖缺失的外部组件
const TutorialsSkeleton = () => {
  const { isDarkTheme } = useTheme();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <StarBorder 
          key={i}
          as="div" 
          className="w-full h-full"
          color={isDarkTheme ? "rgba(41, 255, 153, 0.5)" : "rgba(38, 191, 115, 0.5)"}
          speed="4s"
        >
          <div className={`${isDarkTheme ? 'bg-dark' : 'bg-gray-100'} rounded-xl overflow-hidden shadow-md h-full`} style={{ background: isDarkTheme ? '#121212' : '#F3F4F6', border: 'none' }}>
            <div className={`w-full h-48 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'} animate-pulse`}></div>
            <div className="p-6 flex flex-col h-[calc(100%-192px)]">
              <div className="mb-3 flex justify-between">
                <div className={`w-20 h-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-full animate-pulse`}></div>
                <div className={`w-16 h-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-300'} rounded animate-pulse`}></div>
              </div>
              <div className={`w-full h-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-300'} rounded mb-2 animate-pulse`}></div>
              <div className={`w-full h-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-300'} rounded mb-4 animate-pulse`}></div>
              <div className="mt-auto">
                <div className={`w-28 h-10 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-300'} rounded-full animate-pulse`}></div>
              </div>
            </div>
          </div>
        </StarBorder>
      ))}
    </div>
  );
};

const Tutorials = () => {
  const { isDarkTheme } = useTheme();
  const { articles, loading, error } = useWechatArticles();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementsRef = {
    title: useRef<HTMLHeadingElement>(null),
    subtitle: useRef<HTMLParagraphElement>(null),
    content: useRef<HTMLDivElement>(null),
    button: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 为各元素添加动画
            Object.entries(elementsRef).forEach(([key, ref], index) => {
              if (ref.current) {
                ref.current.classList.add('animate-fadeIn');
                ref.current.style.animationDelay = `${index * 0.2}s`;
              }
            });
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
    Object.entries(elementsRef).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.classList.remove('animate-fadeIn');
        ref.current.style.opacity = '1';
      }
    });
  }, [isDarkTheme]);

  return (
    <section 
      ref={sectionRef}
      className="py-16"
    >
      <div className="w-[90%] mx-auto px-4 max-w-[1200px]">
        <div>
          <h2 
            ref={elementsRef.title}
            className={`text-[40px] font-bold font-['PingFang_SC'] mb-[10px] text-center ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white' : 'text-dark'}`}
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            文章教程
          </h2>
          <p 
            ref={elementsRef.subtitle}
            className={`text-[18px] font-['PingFang_SC'] mb-16 text-center ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white/50' : 'text-dark/50'}`}
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            AIGC落地实践应用技能与案例，助你高效入门与进阶
          </p>
          
          {error && (
            <div className={`text-center mb-8 p-4 rounded-lg ${isDarkTheme ? 'bg-red-900/20 text-red-200' : 'bg-red-100 text-red-600'}`}>
              {error}
            </div>
          )}
          
          <div
            ref={elementsRef.content}
            className={`${isVisible ? '' : 'opacity-0'}`}
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            {loading ? (
              <TutorialsSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                {articles.slice(0, 8).map((article) => (
                  <LocalTutorialCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
          
          <div 
            ref={elementsRef.button}
            className={`text-center mt-12 ${isVisible ? '' : 'opacity-0'}`}
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            <a 
              href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzAxMzcxNzQxNw==&action=getalbum&album_id=2891855147943968770#wechat_redirect"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block px-8 py-3 rounded-full font-medium transition-all ${
                isDarkTheme 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              查看更多教程
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorials;