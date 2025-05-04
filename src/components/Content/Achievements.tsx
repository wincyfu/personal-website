'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/TranslatedText';

interface StatProps {
  value: string;
  label: string;
}

const Stat = ({ value, label }: StatProps) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={`${isDarkTheme ? 'bg-[#2A2A2A] border-[#3A3A3A]' : 'bg-gray-100 border-gray-200'} border rounded-xl py-5 px-4 flex-1 mx-2 shadow-md transition-all duration-300 hover:shadow-lg text-center min-w-[120px]`}>
      <div className="text-lg sm:text-2xl md:text-4xl font-bold text-primary mb-2 sm:mb-3">{value}</div>
      <div className={`text-base ${isDarkTheme ? 'text-white/80' : 'text-dark/80'}`}>{label}</div>
    </div>
  );
};

interface SocialPostProps {
  title: string;
  excerpt: string;
  imageSrc: string;
  likes: number;
  views: number;
  link: string;
}

const SocialPost = ({ title, excerpt, imageSrc, likes, views, link }: SocialPostProps) => (
  <Link href={link} className="block">
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex h-full hover:shadow-lg transition-shadow">
      <div className="relative w-1/3 min-h-[160px]">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 w-2/3">
        <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{excerpt}</p>
        <div className="flex text-sm text-gray-500 space-x-4">
          <span>👍 {likes}</span>
          <span>👁️ {views}</span>
        </div>
      </div>
    </div>
  </Link>
);

const Achievements = () => {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementsRef = {
    title: useRef<HTMLHeadingElement>(null),
    subtitle: useRef<HTMLParagraphElement>(null),
    stats: useRef<HTMLDivElement>(null),
    image: useRef<HTMLDivElement>(null),
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
  
  const stats = [
    { value: '80+', label: isEnglish ? 'AI Articles/Tutorials' : 'AI文章/图文教程' },
    { value: '100+', label: isEnglish ? 'AIGC Weekly' : 'AIGC周刊' },
    { value: '10k+', label: isEnglish ? 'Total Followers' : '全网关注粉丝' },
    { value: '20+', label: isEnglish ? 'Partner Brands' : '合作品牌' },
  ];

  // 这里会替换为小红书内容，按照点赞量和阅读量排序
  const socialPosts = [
    {
      title: isEnglish ? '7 AI Tools to Double Your Efficiency' : '7个让你效率翻倍的AI工具推荐',
      excerpt: isEnglish ? 'These AI tools can greatly improve your work efficiency, especially the 5th one which has almost changed my entire workflow...' : '这些AI工具可以大幅提升你的工作效率，特别是第5个几乎改变了我的整个工作流程...',
      imageSrc: '/images/post-1.jpg',
      likes: 1250,
      views: 15000,
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
    },
    {
      title: isEnglish ? 'Midjourney Prompt Templates: Generate Professional Illustrations in 5 Minutes' : 'Midjourney提示词模板分享：5分钟生成专业级插画',
      excerpt: isEnglish ? 'Sharing my summarized set of Midjourney prompt templates. Following this formula, you can quickly generate high-quality illustrations...' : '分享我总结的一套Midjourney提示词模板，按照这个公式可以快速生成高质量插画...',
      imageSrc: '/images/post-2.jpg',
      likes: 980,
      views: 12300,
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
    },
    {
      title: isEnglish ? 'How Designers Can Use AI in Daily Work: My Complete Workflow' : '设计师如何用AI辅助日常工作？这是我的完整工作流',
      excerpt: isEnglish ? 'As a designer, this is how I integrate AI into my daily workflow, greatly improving creativity and execution efficiency...' : '作为设计师，这是我如何将AI融入日常工作流程，大大提高了创意和执行效率...',
      imageSrc: '/images/post-3.jpg',
      likes: 850,
      views: 10500,
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16"
    >
      <div className="text-center w-[90%] mx-auto max-w-[1200px]">
        <h2 
          ref={elementsRef.title}
          className={`text-[40px] font-bold font-['PingFang_SC'] mb-[10px] ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white' : 'text-dark'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <TranslatedText textKey="achievements.title" />
        </h2>
        <p 
          ref={elementsRef.subtitle}
          className={`text-[18px] font-['PingFang_SC'] mb-16 ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white/50' : 'text-dark/50'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <TranslatedText textKey="achievements.subtitle" />
        </p>
        
        <div 
          ref={elementsRef.stats}
          className={`w-full max-w-full mx-auto mb-[50px] ${isVisible ? '' : 'opacity-0'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <div className="w-full flex flex-wrap justify-between gap-y-4 md:gap-4 px-0 md:px-4">
            {stats.map((stat, index) => (
              <Stat key={index} {...stat} />
            ))}
          </div>
        </div>
        
        <div 
          ref={elementsRef.image}
          className={`mt-12 mb-16 w-full ${isVisible ? '' : 'opacity-0'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <div className="w-full rounded-xl overflow-hidden mx-auto">
            <div className="relative w-full">
              <Image 
                src={isDarkTheme ? `/images/achievements-dark.png?v=${Date.now()}` : `/images/achievements-light.png?v=${Date.now()}`} 
                alt={isEnglish ? "Achievements Image" : "个人成就图片"} 
                width={1200}
                height={600}
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 90vw, 1200px"
                className="w-full h-auto max-w-full object-contain rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 