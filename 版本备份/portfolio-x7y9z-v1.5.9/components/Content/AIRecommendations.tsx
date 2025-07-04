'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import SpotlightCard from '../UI/SpotlightCard';
import FallingText from '../FallingText';
import TranslatedText from '@/components/TranslatedText';

interface AITool {
  title: string;
  description: string;
  link: string;
  region: string; 
  type: string;
}

export default function AIRecommendations() {
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

  const aiTools: AITool[] = [
    {
      title: 'Claude',
      description: isEnglish 
        ? 'AI assistant developed by Anthropic, emphasizing safety and usefulness, capable of natural conversation'
        : 'Anthropic公司开发的AI助手，强调安全性和有用性，可进行自然对话',
      link: 'https://claude.ai',
      region: isEnglish ? 'International' : '国外',
      type: isEnglish ? 'Conversation' : '对话'
    },
    {
      title: 'ChatGPT',
      description: isEnglish 
        ? 'Powerful language model developed by OpenAI, capable of conversation, writing, programming, and various tasks'
        : '由OpenAI开发的强大语言模型，可进行对话、写作、编程等多种任务',
      link: 'https://chat.openai.com',
      region: isEnglish ? 'International' : '国外',
      type: isEnglish ? 'Conversation' : '对话'
    },
    {
      title: 'Gemini',
      description: isEnglish 
        ? 'Multimodal AI model developed by Google, capable of understanding and generating text, images, and various content'
        : 'Google开发的多模态AI模型，可理解和生成文本、图像等多种内容',
      link: 'https://gemini.google.com',
      region: isEnglish ? 'International' : '国外',
      type: isEnglish ? 'Conversation' : '对话'
    },
    {
      title: 'Midjourney',
      description: isEnglish 
        ? 'High-quality AI image generation tool, creating artwork and visual content through text descriptions'
        : '高质量AI图像生成工具，可通过文字描述创建艺术品和视觉内容',
      link: 'https://www.midjourney.com',
      region: isEnglish ? 'International' : '国外',
      type: isEnglish ? 'Image' : '绘画'
    },
    {
      title: 'WHEE',
      description: isEnglish 
        ? 'Unlimited creativity AI tool, helping users easily generate high-quality content and design works'
        : '无限创意的AI工具，帮助用户轻松生成高质量内容和设计作品',
      link: 'https://whee.com',
      region: isEnglish ? 'China' : '国内',
      type: isEnglish ? 'Image' : '绘画'
    },
    {
      title: isEnglish ? 'Dui' : '堆友',
      description: isEnglish 
        ? 'AI tool platform focused on developer community, providing code assistance and technical solutions'
        : '专注于开发者社区的AI工具平台，提供代码辅助和技术解决方案',
      link: 'https://dui.com',
      region: isEnglish ? 'China' : '国内',
      type: isEnglish ? 'Image' : '绘画'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-16"
      style={{ marginTop: '50px' }}
    >
      <div className="text-center w-[90%] mx-auto max-w-[1200px]">
        <h2 
          ref={elementsRef.title}
          className={`text-[40px] font-bold font-['PingFang_SC'] mb-[10px] ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white' : 'text-dark'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {isEnglish ? 'AI Product Recommendations' : 'AI产品推荐'}
        </h2>
        
        <p
          ref={elementsRef.subtitle}
          className={`text-[18px] font-['PingFang_SC'] mb-16 ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white/50' : 'text-dark/50'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {isEnglish 
            ? 'Selected efficient AI tools to help you effortlessly improve work efficiency and creativity'
            : '精选高效AI工具，助你轻松提升工作效率与创造力'
          }
        </p>

        <div 
          ref={elementsRef.content}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isVisible ? '' : 'opacity-0'}`} 
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {aiTools.map((tool, index) => (
            <Link key={index} href={tool.link} target="_blank" rel="noopener noreferrer" className="block">
              <div 
                className={`rounded-xl p-6 transition-all duration-300 h-full flex flex-col
                  ${isDarkTheme ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-[#f5f5f5] hover:bg-[#eaeaea]'}`}
                style={{
                  boxShadow: isDarkTheme ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div className="flex justify-between items-start">
                  <h3 className={`text-xl font-bold mb-3 text-left ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
                    {tool.title}
                  </h3>
                  <div className="flex gap-1">
                    <span className="text-xs px-2 py-1 rounded text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>
                      {tool.region}
                    </span>
                    <span className="text-xs px-2 py-1 rounded text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>
                      {tool.type}
                    </span>
                  </div>
                </div>
                <p className={`text-base mb-4 text-left ${isDarkTheme ? 'text-white/80' : 'text-gray-600'}`}>
                  {tool.description}
                </p>
                <span className="mt-auto text-left text-sm font-medium text-[#1E9E44]">
                  {isEnglish ? 'Try Now →' : '立即体验 →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Falling Text Section - 与导航栏宽度一致 */}
      <div className="mt-20 mb-10 h-[200px] max-w-[1920px] mx-auto px-4 md:px-[270px]">
        <FallingText
          text={`WincyFu, a creator exploring AIGC applications,
empowering creativity with AI and shaping the one-person-one-team future.`}
          highlightWords={["WincyFu", "AIGC", "AI", "one-person-one-team"]}
          highlightClass="highlighted"
          trigger="hover"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="2rem"
          mouseConstraintStiffness={0.9}
        />
      </div>
    </section>
  );
} 