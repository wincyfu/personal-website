'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

// 办公效率工具数据
const productivityTools = [
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'AI驱动的搜索引擎，能够快速回答复杂问题，并提供引用和来源',
    url: 'https://www.perplexity.ai',
    features: ['智能搜索', '快速研究', '提供引用'],
    logoSrc: '/images/perplexity-logo.png',
  },
  {
    id: 'taskade',
    name: 'Taskade',
    description: 'AI驱动的项目管理和协作工具，可以帮助团队提高工作效率',
    url: 'https://www.taskade.com',
    features: ['项目管理', '任务自动化', '团队协作'],
    logoSrc: '/images/ai-logo-placeholder.svg',
  },
  {
    id: 'otter',
    name: 'Otter.ai',
    description: '实时语音转文字和会议记录工具，可以自动总结会议内容',
    url: 'https://otter.ai',
    features: ['语音转文字', '会议记录', '自动总结'],
    logoSrc: '/images/otter-logo.png',
  },
  {
    id: 'descript',
    name: 'Descript',
    description: '视频和音频编辑工具，可以像编辑文档一样编辑视频和音频',
    url: 'https://www.descript.com',
    features: ['视频编辑', '音频处理', '转录服务'],
    logoSrc: '/images/descript-logo.png',
  },
];

export default function ProductivityTools() {
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
                AI办公效率工具推荐
              </h1>
              
              <p 
                ref={descRef}
                className={`opacity-0 text-base md:text-lg max-w-2xl mx-auto
                          ${isDarkTheme ? 'text-text-gray' : 'text-gray-600'}`}
              >
                这些AI办公工具可以帮助您自动化日常任务、提高工作效率、简化工作流程，让您更专注于重要事务。
              </p>
            </div>
            
            <div 
              ref={toolsRef}
              className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              {productivityTools.map((tool) => (
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