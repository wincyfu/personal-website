'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/TranslatedText';
import SpotlightCard from '../UI/SpotlightCard';

const AIProducts = () => {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const elementsRef = {
    title: useRef<HTMLHeadingElement>(null),
    subtitle: useRef<HTMLParagraphElement>(null),
    content: useRef<HTMLDivElement>(null),
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
  
  // Card data
  const productCards = [
    {
      title: isEnglish ? 'AI ID Photo' : 'AI证件照',
      subtitle: isEnglish 
        ? 'Intelligent ID photo generator that lets users upload a regular photo and create standardized ID photos that meet various document requirements'
        : '智能证件照生成工具，让用户仅需上传一张普通照片，可一键生成符合多种证件要求的标准证件照',
      color: 'rgba(34, 196, 94, 0.10)',
      image: '/images/ai-photo.png',
      link: '/products/ai-photo'
    },
    {
      title: isEnglish ? 'AI Fashion Assistant' : '织间集-AI搭配助手',
      subtitle: isEnglish 
        ? 'Users only need to upload photos of their clothes to receive daily intelligent outfit suggestions and create a personalized outfit inspiration list'
        : '用户只需上传自己的衣物照片，即可获得每日智能穿搭建议，打造专属穿搭灵感清单',
      color: 'rgba(28, 255, 147, 0.10)',
      image: '/images/ai-style.png',
      link: '/products/ai-fashion'
    },
    {
      title: isEnglish ? 'AI Design Assistant' : 'AI设计助手',
      subtitle: isEnglish ? 'Design-assisted creation tool' : '设计辅助创作工具',
      color: 'rgba(50, 205, 150, 0.10)',
      image: '/images/ai-design.png',
      link: '/products/ai-game'
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      id="ai-products"
      className="py-5 sm:py-10 md:py-16"
      style={{ marginTop: '40px' }}
    >
      <div className="text-center">
        <h2 
          ref={elementsRef.title}
          className={`text-[40px] font-bold font-['PingFang_SC'] mb-[10px] ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white' : 'text-dark'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {isEnglish ? 'AI-Assisted Coding Products' : 'AI辅助编码产品'}
        </h2>
        <p 
          ref={elementsRef.subtitle}
          className={`text-[18px] font-['PingFang_SC'] mb-16 ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white/50' : 'text-dark/50'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {isEnglish 
            ? 'Successfully launched and actually usable products through AI-assisted coding'
            : '通过AI辅助编码，已成功上架并可实际使用的产品'
          }
        </p>
        
        <div 
          ref={elementsRef.content}
          className={`w-[90%] mx-auto max-w-[1200px] ${isVisible ? '' : 'opacity-0'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {productCards.map((card, index) => (
              <div key={index} className="w-full md:w-1/3 mb-4">
                <SpotlightCard
                  className="w-full h-full min-h-[400px]"
                  spotlightColor={card.color}
                  enableTilt={true}
                >
                  <div className="flex flex-col h-full p-6 md:p-1">
                    <div className={`h-[220px] rounded-lg mb-8 overflow-hidden mx-[-10px] mt-[-10px] ${isDarkTheme ? 'bg-gray-800/30' : 'bg-gray-100/70'}`}>
                      {/* Image placeholder - replace with actual images when available */}
                      <div className="w-full h-full flex items-center justify-center">
                        {card.image ? (
                          <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className={`text-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                            {isEnglish ? `Image ${index + 1}` : `图片 ${index + 1}`}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>{card.title}</h3>
                    <p className={`text-base md:text-lg mb-6 ${isDarkTheme ? 'text-white/80' : 'text-dark/80'}`}>{card.subtitle}</p>
                    <div className="mt-auto">
                      <Link 
                        href={`${card.link}?from=home`}
                        className="inline-block bg-[#29FF99] text-gray-800 px-5 py-2 rounded-full text-sm hover:opacity-90 transition-opacity"
                      >
                        {isEnglish ? 'Learn more' : '了解详情'}
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProducts; 