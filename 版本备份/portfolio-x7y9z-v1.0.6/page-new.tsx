'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { projects } from '@/data/portfolio';
import ProjectCard from '@/components/UI/ProjectCard';
import Link from 'next/link';
import Image from 'next/image';
import { usePortfolioVisit } from '@/contexts/PortfolioVisitContext';
import Nav from '@/components/Nav/Nav';
import DecryptedText from '@/components/UI/DecryptedText';

export default function PortfolioPage() {
  const { isDarkTheme } = useTheme();
  const { setHasVisitedPortfolio } = usePortfolioVisit();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isVisible, setIsVisible] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // 创建引用来获取滚动容器
  const appDesignRef = useRef<HTMLDivElement>(null);
  const webDesignRef = useRef<HTMLDivElement>(null);
  const dashboardDesignRef = useRef<HTMLDivElement>(null);
  const otherDesignRef = useRef<HTMLDivElement>(null);

  // 根据类别进行分组
  const appDesignProjects = projects.filter(project => project.category === 'UI设计' || project.category === '移动应用');
  const webDesignProjects = projects.filter(project => project.category === '产品设计' || project.category === 'AIGC');
  const dashboardProjects = projects.filter(project => project.category === '教育科技' || project.category === '大屏设计');
  const otherProjects = projects.filter(project => 
    !['UI设计', '移动应用', '产品设计', 'AIGC', '教育科技', '大屏设计'].includes(project.category)
  );
  
  // 添加滚动处理函数
  const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    
    const container = ref.current;
    const scrollAmount = 300; // 每次滚动的像素值
    const scrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };
  
  // 常量定义
  const cardCount = 10; // 总卡片数量
  const visibleCards = 3; // 完整可见卡片数量，只显示3个
  
  // 移动端设计卡片滚动函数
  const scrollMobileCards = (direction: 'left' | 'right') => {
    if (!appDesignRef.current || typeof window === 'undefined') return;
    
    // 固定卡片宽度和间距
    const cardWidth = 500; // 卡片宽度
    const cardGap = 20; // 卡片间距
    const cardTotal = cardWidth + cardGap; // 每个卡片的总宽度（含间距）
    
    // 计算新的索引
    let newIndex = direction === 'left' 
      ? Math.max(0, currentCardIndex - 1) 
      : Math.min(cardCount - visibleCards, currentCardIndex + 1);
    
    // 更新当前索引
    setCurrentCardIndex(newIndex);
    
    // 滚动到对应位置，保证第一个可见卡片与标题左对齐
    const scrollPosition = newIndex * cardTotal;
    
    // 使用DOM方法确保准确滚动
    if (appDesignRef.current) {
      appDesignRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };
  
  // 处理卡片容器滚动事件
  const handleCardScroll = () => {
    if (!appDesignRef.current || typeof window === 'undefined') return;
    
    // 固定卡片宽度和间距
    const cardWidth = 500;
    const cardGap = 20;
    const scrollAmount = cardWidth + cardGap;
    
    // 获取当前滚动位置
    const scrollPosition = appDesignRef.current.scrollLeft;
    
    // 计算当前索引
    const newIndex = Math.round(scrollPosition / scrollAmount);
    
    // 限制索引范围并更新状态
    const maxScrollIndex = cardCount - visibleCards;
    if (newIndex >= 0 && newIndex <= maxScrollIndex && newIndex !== currentCardIndex) {
      setCurrentCardIndex(newIndex);
    }
  };
  
  // 复制邮箱地址
  const copyEmail = () => {
    const email = "wincyfu@foxmail.com";
    navigator.clipboard.writeText(email)
      .then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      })
      .catch(err => {
        console.error('无法复制邮箱地址: ', err);
      });
  };
  
  // 初始化
  useEffect(() => {
    setIsVisible(true);
    setHasVisitedPortfolio(true);
    
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter, setHasVisitedPortfolio]);

  return (
    <div className={`min-h-screen py-0 px-0 transition-colors duration-300 relative ${
      isDarkTheme ? 'bg-[#111111] text-white' : 'bg-white text-dark'
    }`}>
      <Nav />
      
      <div className="w-4/5 mx-auto py-12 mt-16">
        {/* 移动端设计部分 */}
        <div className="w-full mb-16 mt-40 relative">
          <div className="mb-10">
            <h2 className="text-4xl sm:text-4xl font-bold mb-3 font-['PingFang SC', sans-serif] mobile-design-title">移动端设计</h2>
            <p className={`text-lg ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} max-w-3xl`}>展示各类移动应用界面设计，包含用户交互体验及视觉设计解决方案</p>
          </div>
          
          <div className="flex justify-end items-center mb-8">
            <div className="flex space-x-3">
              <button 
                className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                onClick={() => scrollMobileCards('left')}
                disabled={currentCardIndex === 0}
                style={{ opacity: currentCardIndex === 0 ? 0.5 : 1 }}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                onClick={() => scrollMobileCards('right')}
                disabled={currentCardIndex >= cardCount - visibleCards}
                style={{ opacity: currentCardIndex >= cardCount - visibleCards ? 0.5 : 1 }}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mobile-design-wrapper">
            <div 
              ref={appDesignRef}
              className="hide-scrollbar mobile-design-scroll"
              onScroll={handleCardScroll}
              style={{ paddingLeft: 0, marginLeft: 0 }}
            >
              {Array.from({ length: cardCount }).map((_, index) => {
                const project = appDesignProjects[index % appDesignProjects.length];
                
                // 计算卡片位置
                const position = index - currentCardIndex;
                
                // 确定卡片的样式类
                let cardClasses = "mobile-card";
                
                // 第一个卡片
                if (position === 0) {
                  cardClasses += " mobile-card-first";
                  // 当不是初始位置时，第一个卡片变暗
                  if (currentCardIndex > 0) {
                    cardClasses += " mobile-card-dim";
                  } else {
                    cardClasses += " mobile-card-visible";
                  }
                }
                // 完全可见的卡片（第2-3个）
                else if (position > 0 && position < visibleCards) {
                  cardClasses += " mobile-card-visible";
                }
                // 第4个卡片（边缘且变暗）
                else if (position === visibleCards) {
                  cardClasses += " mobile-card-edge mobile-card-dim";
                }
                // 其他不可见卡片
                else {
                  cardClasses += " mobile-card-dim";
                }
                
                return (
                  <div 
                    key={`project-${index}`} 
                    className={cardClasses}
                    style={{
                      marginLeft: index === 0 ? '0' : undefined
                    }}
                  >
                    <Link href={`/projects/${project.id}`} className="block h-full">
                      <div className="mobile-card-content">
                        <div className="relative h-[220px] overflow-hidden">
                          <Image 
                            src={project.imageUrl} 
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 px-2 py-1 bg-[#FF3A3A] text-white text-xs font-medium rounded">
                            V 2.0
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-xl text-white">{project.title}</h3>
                          </div>
                          <div className="text-[#888888] text-xs mb-3">2023.06.15</div>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* 网站设计部分 */}
        <div className="w-full mb-16 relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl sm:text-4xl font-bold font-['PingFang SC', sans-serif]">网站设计</h2>
            <div className="flex space-x-3">
              <button 
                className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                onClick={() => scrollContainer(webDesignRef, 'left')}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                onClick={() => scrollContainer(webDesignRef, 'right')}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div ref={webDesignRef} className="flex space-x-6 min-w-max">
              {webDesignProjects.map((project, index) => (
                <div key={project.id} className="w-72 flex-shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 大屏设计部分 */}
        <div className="w-full mb-16 relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl sm:text-4xl font-bold font-['PingFang SC', sans-serif]">大屏设计</h2>
            <div className="flex space-x-3">
              <button 
                className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                onClick={() => scrollContainer(dashboardDesignRef, 'left')}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                onClick={() => scrollContainer(dashboardDesignRef, 'right')}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div ref={dashboardDesignRef} className="flex space-x-6 min-w-max">
              {dashboardProjects.map((project, index) => (
                <div key={project.id} className="w-72 flex-shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 其他设计部分 */}
        <div className="w-full mb-16 relative">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl sm:text-4xl font-bold font-['PingFang SC', sans-serif]">其他设计</h2>
            <div className="flex space-x-3">
              <button 
                className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                onClick={() => scrollContainer(otherDesignRef, 'left')}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                onClick={() => scrollContainer(otherDesignRef, 'right')}
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div ref={otherDesignRef} className="flex space-x-6 min-w-max">
              {otherProjects.map((project, index) => (
                <div key={project.id} className="w-72 flex-shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 联系部分 */}
        <div className={`w-full py-16 px-8 rounded-2xl mb-16 text-center ${isDarkTheme ? 'bg-card' : 'bg-gray-50'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-['PingFang SC', sans-serif]">对我的作品感兴趣？</h2>
          <p className={`mb-8 text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`}>
            如果您对我的作品有任何疑问或合作意向，请随时联系我。我期待能与您一起合作，为您的项目带来独特的设计价值。
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setShowContactInfo(!showContactInfo)}
              className="inline-block px-6 py-3 rounded-md transition-colors duration-300 bg-primary text-white hover:bg-[#1DA651]"
            >
              查看联系方式
            </button>
          </div>
        </div>
      </div>
      
      {/* 底部版权条 */}
      <div className="w-full py-5 bg-black text-text-gray text-center text-sm mt-12 border-t border-card-border">
        <div className="w-4/5 mx-auto">
          <p>© {new Date().getFullYear()} 我的设计作品集. 保留所有权利.</p>
        </div>
      </div>
    </div>
  );
} 