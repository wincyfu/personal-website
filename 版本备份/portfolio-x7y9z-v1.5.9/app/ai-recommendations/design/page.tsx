'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

// 设计工具数据
const designTools = [
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI图像生成工具，可根据文字描述创建精美插画和艺术作品',
    url: 'https://www.midjourney.com',
    features: ['图像生成', '风格多样', '高质量渲染'],
    logoSrc: '/images/midjourney-logo.png',
  },
  {
    id: 'dalle',
    name: 'DALL-E',
    description: 'OpenAI出品的AI图像生成工具，擅长创建逼真和创意图像',
    url: 'https://openai.com/dall-e-3',
    features: ['图像生成', '精准描述', '照片级别真实感'],
    logoSrc: '/images/dalle-logo.png',
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    description: 'Adobe的AI创意工具，专为设计师打造的图像和素材生成工具',
    url: 'https://firefly.adobe.com',
    features: ['创意素材生成', 'Adobe生态集成', '商业可用'],
    logoSrc: '/images/adobe-firefly-logo.png',
  },
  {
    id: 'runway',
    name: 'Runway',
    description: 'AI视频生成和编辑工具，可以创建和修改视频内容',
    url: 'https://runwayml.com',
    features: ['视频生成', '视频编辑', '高级视觉效果'],
    logoSrc: '/images/runway-logo.png',
  },
];

export default function DesignTools() {
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
                AI设计工具推荐
              </h1>
              
              <p 
                ref={descRef}
                className={`opacity-0 text-base md:text-lg max-w-2xl mx-auto
                          ${isDarkTheme ? 'text-text-gray' : 'text-gray-600'}`}
              >
                这些AI驱动的设计工具可以帮助设计师和创意从业者提高工作效率，生成高质量的图像、插画和设计素材。
              </p>
            </div>
            
            <div 
              ref={toolsRef}
              className="opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
              {designTools.map((tool) => (
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