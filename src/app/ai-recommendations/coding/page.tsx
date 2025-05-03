'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

// 编程工具数据
const codingTools = [
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI编程助手，可以提供代码建议和自动补全，大幅提高开发效率',
    url: 'https://github.com/features/copilot',
    features: ['代码补全', '智能建议', '多语言支持'],
    logoSrc: '/images/github-copilot-logo.png',
  },
  {
    id: 'tabnine',
    name: 'Tabnine',
    description: '智能代码补全工具，支持多种编程语言和IDE',
    url: 'https://www.tabnine.com',
    features: ['代码补全', 'IDE集成', '团队协作'],
    logoSrc: '/images/ai-logo-placeholder.svg',
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    description: 'OpenAI开发的代码生成模型，可以将自然语言转换为代码',
    url: 'https://openai.com/blog/openai-codex',
    features: ['自然语言转代码', 'API接口', '多语言支持'],
    logoSrc: '/images/ai-logo-placeholder.svg',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: '基于AI的编程IDE，集成了代码补全、生成和重构功能',
    url: 'https://cursor.sh',
    features: ['代码补全与生成', '重构建议', '内置AI助手'],
    logoSrc: '/images/ai-logo-placeholder.svg',
  },
];

export default function CodingTools() {
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
      
      <div className="px-4 md:px-8 lg:px-12 mx-auto mt-16">
        <section ref={sectionRef} className="py-10 md:py-20">
          <div className="w-full max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <h1 
                ref={titleRef}
                className={`opacity-0 text-3xl md:text-5xl font-bold mb-4 
                          ${isDarkTheme ? 'text-white' : 'text-dark'}`}
              >
                AI编程工具推荐
              </h1>
              
              <p 
                ref={descRef}
                className={`opacity-0 text-base md:text-lg max-w-2xl mx-auto
                          ${isDarkTheme ? 'text-text-gray' : 'text-gray-600'}`}
              >
                这些AI编程工具可以帮助开发者提高编码效率，减少重复工作，更专注于解决创造性的问题。
              </p>
            </div>
            
            <div 
              ref={toolsRef}
              className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              {codingTools.map((tool) => (
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