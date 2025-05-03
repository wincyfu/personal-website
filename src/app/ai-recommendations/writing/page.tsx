'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

// 写作工具数据
const writingTools = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: '强大的AI对话工具，可以帮助撰写文章、润色内容、生成创意等',
    url: 'https://chat.openai.com',
    features: ['文本生成', '内容润色', '多语言支持'],
    logoSrc: '/images/chatgpt-logo.png',
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: '集成在Notion中的AI助手，可以帮助创建、编辑和总结内容',
    url: 'https://www.notion.so/product/ai',
    features: ['内容生成', '自动总结', '风格转换'],
    logoSrc: '/images/notion-ai-logo.png',
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    description: 'AI写作助手，可以检查语法错误、提供表达建议、改进文本清晰度',
    url: 'https://www.grammarly.com',
    features: ['语法检查', '表达建议', '写作风格改进'],
    logoSrc: '/images/ai-logo-placeholder.svg',
  },
  {
    id: 'jasper',
    name: 'Jasper',
    description: '专为内容创作者设计的AI写作工具，可以生成营销文案、博客等内容',
    url: 'https://www.jasper.ai',
    features: ['内容创作', '营销文案', '博客写作'],
    logoSrc: '/images/ai-logo-placeholder.svg',
  },
];

export default function WritingTools() {
  const { isDarkTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (titleRef.current) {
              titleRef.current.classList.add('animate-fadeIn');
            }
            if (descRef.current) {
              descRef.current.classList.add('animate-fadeIn');
              descRef.current.style.animationDelay = '0.2s';
            }
            if (toolsRef.current) {
              toolsRef.current.classList.add('animate-fadeIn');
              toolsRef.current.style.animationDelay = '0.4s';
            }
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

  return (
    <main className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'} 
                     w-full min-h-screen transition-colors duration-300`}>
      <Nav />
      
      <div className="container-safe px-4 md:px-8 lg:px-12 mx-auto">
        <section ref={sectionRef} className="py-10 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 
                ref={titleRef}
                className={`opacity-0 text-3xl md:text-5xl font-bold mb-4 
                          ${isDarkTheme ? 'text-white' : 'text-dark'}`}
              >
                AI写作工具推荐
              </h1>
              
              <p 
                ref={descRef}
                className={`opacity-0 text-base md:text-lg max-w-2xl mx-auto
                          ${isDarkTheme ? 'text-text-gray' : 'text-gray-600'}`}
              >
                这些AI写作工具可以帮助作者和内容创作者提高写作效率，克服创作瓶颈，优化文本质量。
              </p>
            </div>
            
            <div 
              ref={toolsRef}
              className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              {writingTools.map((tool) => (
                <div 
                  key={tool.id}
                  className={`${isDarkTheme ? 'bg-card border-card-border' : 'bg-gray-50 border-gray-200'} 
                             border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 mr-3 bg-white rounded-lg flex items-center justify-center">
                        <Image 
                          src={tool.logoSrc} 
                          alt={`${tool.name} Logo`} 
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      </div>
                      <h2 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
                        {tool.name}
                      </h2>
                    </div>
                    
                    <p className={`mb-4 text-sm md:text-base ${isDarkTheme ? 'text-text-gray' : 'text-gray-600'}`}>
                      {tool.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.features.map((feature, index) => (
                        <span 
                          key={index}
                          className={`text-xs px-2 py-1 rounded-full 
                                    ${isDarkTheme ? 'bg-darker text-secondary' : 'bg-primary bg-opacity-10 text-primary'}`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={tool.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
                                ${isDarkTheme 
                                  ? 'bg-secondary text-black hover:bg-opacity-90' 
                                  : 'bg-primary text-white hover:bg-opacity-90'}`}
                    >
                      访问官网
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                href="/ai-recommendations"
                className={`inline-block px-4 py-2 rounded-lg border text-sm transition-colors duration-300
                          ${isDarkTheme 
                            ? 'border-text-gray text-text-gray hover:text-white hover:border-white' 
                            : 'border-gray-400 text-gray-600 hover:text-dark hover:border-dark'}`}
              >
                返回全部AI工具
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  );
} 