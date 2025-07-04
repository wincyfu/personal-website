'use client';

/*
  ⚠️⚠️⚠️ 重要维护说明 - 项目时间硬编码问题 ⚠️⚠️⚠️
  
  本文件存在项目时间的硬编码显示，修改项目时间时需要同时更新两个地方：
  
  1. 📄 数据源文件：src/data/portfolio.ts 
     - 更新对应项目的 date 字段
  
  2. 🖥️ 显示文件：src/app/portfolio-x7y9z/page.tsx (本文件)
     - 搜索"项目时间硬编码部分"注释
     - 更新对应的硬编码时间显示
  
  ❌ 常见错误：只更新其中一个地方，导致数据不一致
  ✅ 正确做法：两个地方同时更新，确保数据一致性
  
  📋 项目ID映射表（当前版本）：
  project-1 = 好旅程项目       (2019.12-2020.10)
  project-2 = AI健康助手      (2025.03)  
  project-3 = 环保回收项目     (2024.03)
  project-4 = 儿宝管家项目     (2018.10-2019.06)
  project-5 = 锦礼商城        (2020.04-2020.05)
  project-6 = VAV交友         (2020.12-2021.02)
  project-7 = 速速修项目      (2022.02-2022.03)
  project-8 = 近视无忧项目     (2024.06-2024.08)
*/

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedText } from '@/utils/translations';
import { projects } from '@/data/portfolio';
import ProjectCard from '@/components/UI/ProjectCard';
import Link from 'next/link';
import Image from 'next/image';
import { usePortfolioVisit } from '@/contexts/PortfolioVisitContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import DecryptedText from '@/components/UI/DecryptedText';
import SpotlightCard from '@/components/UI/SpotlightCard';
import ProjectDetailModal from '@/components/UI/ProjectDetailModal';
import './globals.css';

export default function PortfolioPage() {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const { setHasVisitedPortfolio } = usePortfolioVisit();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isVisible, setIsVisible] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // 添加弹窗状态管理
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 网站设计部分卡片滚动状态
  const [webCardIndex, setWebCardIndex] = useState(0);
  
  // 大屏设计部分卡片滚动状态
  const [dashboardCardIndex, setDashboardCardIndex] = useState(0);
  
  // 其他设计部分卡片滚动状态
  const [otherCardIndex, setOtherCardIndex] = useState(0);
  
  // 创建引用来获取滚动容器
  const experienceRef = useRef<HTMLDivElement>(null);
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

  // 常量定义
  const visibleCards = 3; // 完整可见卡片数量，显示3个，第4个露出1/3
  
  // 移动端卡片滚动函数 - 通用版本
  const scrollMobileCards = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>, projects: any[], currentIndex: number, setIndex: (index: number) => void) => {
    console.log('scrollMobileCards called with direction:', direction);
    
    if (!ref.current || typeof window === 'undefined') {
      console.log('Early return: ref is null or not in browser');
      return;
    }
    
    // 获取卡片元素宽度（包括间距）
    const cardWidth = 380; // 修改为380px，适应3个卡片+1/3卡片的布局
    const cardGap = 20; // 卡片间距
    const cardTotal = cardWidth + cardGap;
    
    // 检查是否存在"智能家居控制中心"卡片组
    const hasSpecialGroup = projects.length >= 3 && 
      projects[projects.length-3].title === "智能家居控制中心" && 
      projects[projects.length-2].title === "语言学习助手" && 
      projects[projects.length-1].title === "健康食谱规划";
    
    // 计算最大滚动索引
    let maxScrollIndex;
    if (hasSpecialGroup) {
      // 如果有特殊组，最大滚动索引为倒数第三个卡片位置
      maxScrollIndex = projects.length - 3;
    } else {
      // 一般情况，最大滚动索引为总数减去可见卡片数
      maxScrollIndex = Math.max(0, projects.length - visibleCards);
    }
    
    // 简单处理：每次只移动一个卡片
    let newIndex;
    
    if (direction === 'left') {
      // 向左滚动，减少索引
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      // 向右滚动，增加索引，但不超过最大索引
      newIndex = Math.min(maxScrollIndex, currentIndex + 1);
    }
    
    console.log(`Calculating new index: current=${currentIndex}, new=${newIndex}, max=${maxScrollIndex}`);
    
    // 更新当前索引
    setIndex(newIndex);
    
    // 滚动到对应位置，保证当前索引的卡片与标题左对齐
    const scrollPosition = newIndex * cardTotal;
    console.log(`Scrolling to position: ${scrollPosition}px`);
    
    // 使用平滑滚动效果
    if (ref.current) {
      // 使用scrollTo方法实现平滑滚动效果
      ref.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      
      console.log(`Smooth scroll initiated to position: ${scrollPosition}px`);
    }
    
    // 使用正确的选择器来查找特定容器内的卡片
    const container = ref.current;
    if (container) {
      const cards = container.querySelectorAll('.mobile-card');
      cards.forEach((card, index) => {
        card.classList.remove('mobile-card-visible', 'mobile-card-dim', 'mobile-card-first');
        
        // 修改可见卡片的逻辑
        if (hasSpecialGroup && newIndex === maxScrollIndex) {
          // 如果是特殊组最后三张卡片，一次性显示三张
          if (index >= newIndex && index < projects.length) {
            card.classList.add('mobile-card-visible');
            if (index === newIndex) {
              card.classList.add('mobile-card-first');
            }
          } else {
            card.classList.add('mobile-card-dim');
          }
        } else {
          // 一般情况下的可见卡片逻辑
          if (index === newIndex) {
            card.classList.add('mobile-card-visible', 'mobile-card-first');
          } else if (index >= newIndex && index < newIndex + visibleCards) {
            card.classList.add('mobile-card-visible');
          } else {
            card.classList.add('mobile-card-dim');
          }
        }
      });
    }
  };
  
  // 特定调用函数 - 移动端设计
  const scrollAppDesignCards = (direction: 'left' | 'right') => {
    scrollMobileCards(direction, appDesignRef, appDesignProjects, currentCardIndex, setCurrentCardIndex);
  };
  
  // 特定调用函数 - 网站设计
  const scrollWebDesignCards = (direction: 'left' | 'right') => {
    scrollMobileCards(direction, webDesignRef, webDesignProjects, webCardIndex, setWebCardIndex);
  };
  
  // 特定调用函数 - 大屏设计
  const scrollDashboardCards = (direction: 'left' | 'right') => {
    scrollMobileCards(direction, dashboardDesignRef, dashboardProjects, dashboardCardIndex, setDashboardCardIndex);
  };
  
  // 特定调用函数 - 其他设计
  const scrollOtherDesignCards = (direction: 'left' | 'right') => {
    scrollMobileCards(direction, otherDesignRef, otherProjects, otherCardIndex, setOtherCardIndex);
  };
  
  // 处理卡片容器滚动事件
  const handleCardScroll = () => {
    if (!appDesignRef.current || typeof window === 'undefined') return;
    
    // 固定卡片宽度和间距
    const cardWidth = 380;
    const cardGap = 14;
    const scrollAmount = cardWidth + cardGap;
    
    // 获取当前滚动位置
    const scrollPosition = appDesignRef.current.scrollLeft;
    
    // 计算当前索引
    const newIndex = Math.round(scrollPosition / scrollAmount);
    
    // 确保索引不超出范围
    const boundedIndex = Math.max(0, Math.min(newIndex, appDesignProjects.length - 1));
    
    // 只有在索引变化时更新状态
    if (boundedIndex !== currentCardIndex) {
      setCurrentCardIndex(boundedIndex);
      
      // 在滚动后更新卡片样式
      if (appDesignRef.current) {
        const cards = appDesignRef.current.querySelectorAll('.mobile-card');
        cards.forEach((card, index) => {
          card.classList.remove('mobile-card-visible', 'mobile-card-dim', 'mobile-card-first');
          
          if (index === boundedIndex) {
            card.classList.add('mobile-card-visible', 'mobile-card-first');
          } else if (index >= boundedIndex && index < boundedIndex + visibleCards) {
            card.classList.add('mobile-card-visible');
          } else {
            card.classList.add('mobile-card-dim');
          }
        });
      }
    }
  };

  // 处理卡片点击
  const handleCardClick = (e: React.MouseEvent, project: any) => {
    e.preventDefault(); // 阻止Link的默认导航行为
    
    // 默认图片集合
    let images: string[] = [];
    
    // 如果project对象中已经定义了detailImages，优先使用它
    if (project.detailImages && project.detailImages.length > 0) {
      images = project.detailImages;
      console.log(`项目 ${project.title} 有 ${images.length} 张详细图片，最后一张是: ${images[images.length-1]}`);
    } else {
      // 如果没有detailImages，使用项目封面图作为唯一图片
      images = [project.imageUrl];
    }
    
    // 设置选中的项目
    setSelectedProject({
      title: project.title,
      description: project.content,
      images: images,
      id: project.id // 添加项目ID
    });
    
    // 打开弹窗
    setIsModalOpen(true);
  };
  
  // 处理项目变更
  const handleProjectChange = (newProject: any) => {
    // 根据新项目生成图片集合
    let images: string[] = [];
    
    if (newProject.detailImages && newProject.detailImages.length > 0) {
      images = newProject.detailImages;
    } else {
      images = [newProject.imageUrl];
    }
    
    // 更新选中的项目
    setSelectedProject({
      title: newProject.title,
      description: newProject.content,
      images: images,
      id: newProject.id
    });
  };
  
  // 关闭弹窗处理函数
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // 提取所有可用类别
  const categories = ['all', ...Array.from(new Set(projects.map(project => project.category)))];

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

  // 添加滚动容器初始化和响应式处理
  useEffect(() => {
    // 客户端代码，确保只在浏览器中执行
    if (typeof window !== 'undefined') {
      // 使用setTimeout确保DOM完全加载
      const timer = setTimeout(() => {
        // 初始化所有滚动容器
        const initScrollContainer = (ref: React.RefObject<HTMLDivElement>, setIndex: (index: number) => void) => {
          if (ref.current) {
            // 重置滚动位置
            ref.current.scrollLeft = 0;
            setIndex(0);
            
            // 初始化卡片样式
            const cards = ref.current.querySelectorAll('.mobile-card');
            cards.forEach((card, index) => {
              card.classList.remove('mobile-card-visible', 'mobile-card-dim', 'mobile-card-first');
              
              if (index === 0) {
                card.classList.add('mobile-card-visible', 'mobile-card-first');
              } else if (index > 0 && index < visibleCards) {
                card.classList.add('mobile-card-visible');
              } else {
                card.classList.add('mobile-card-dim');
              }
            });
          }
        };
        
        // 初始化所有模块
        initScrollContainer(appDesignRef, setCurrentCardIndex);
        initScrollContainer(webDesignRef, setWebCardIndex);
        initScrollContainer(dashboardDesignRef, setDashboardCardIndex);
        initScrollContainer(otherDesignRef, setOtherCardIndex);
      }, 300);
      
      // 清理函数
      return () => {
        clearTimeout(timer);
      };
    }
  }, []); // 只在组件挂载时运行一次

  // 添加窗口大小变化监听，确保响应式布局下卡片位置正确
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        // 重置所有容器的卡片样式
        const resetContainer = (ref: React.RefObject<HTMLDivElement>, cardIndex: number) => {
          if (!ref.current) return;
          
          // 强制重置卡片样式
          const cards = ref.current.querySelectorAll('.mobile-card');
          cards.forEach((card, index) => {
            card.classList.remove('mobile-card-visible', 'mobile-card-dim', 'mobile-card-first');
            
            const position = index - cardIndex;
            if (position === 0) {
              card.classList.add('mobile-card-visible', 'mobile-card-first');
            } else if (position > 0 && position < visibleCards) {
              card.classList.add('mobile-card-visible');
            } else {
              card.classList.add('mobile-card-dim');
            }
          });
        };
        
        // 重置所有模块
        resetContainer(appDesignRef, currentCardIndex);
        resetContainer(webDesignRef, webCardIndex);
        resetContainer(dashboardDesignRef, dashboardCardIndex);
        resetContainer(otherDesignRef, otherCardIndex);
      };
      
      window.addEventListener('resize', handleResize);
      
      // 清理函数
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [currentCardIndex, webCardIndex, dashboardCardIndex, otherCardIndex]);

  useEffect(() => {
    // 页面加载动画
    setIsVisible(true);
    
    // 设置已访问作品集标志
    setHasVisitedPortfolio(true);
    
    // 筛选项目
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeFilter));
    }
  }, [activeFilter, setHasVisitedPortfolio]);

  return (
    <main className={`${isDarkTheme ? 'bg-black text-white' : 'bg-white text-dark'} w-full min-h-screen transition-colors duration-300`}>
      <Nav />
      
      {/* 更新整体容器宽度，从80%改为与产品页面一致 */}
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 mt-16">
        {/* 页面头部区域 */}
        <div className="w-full mb-20">
          <div className="mb-16 pt-40">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-left space-y-8">
                <div>
                  <DecryptedText 
                    text={getTranslatedText('portfolio.title', isEnglish)} 
                    animateOn="view" 
                    sequential={true}
                    speed={40}
                    maxIterations={20}
                    revealDirection="start"
                    className={isDarkTheme ? "text-white" : "text-gray-800"}
                    encryptedClassName={isDarkTheme ? "text-gray-500" : "text-gray-400"}
                    parentClassName="block"
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}[]|:;<>,.?/~`"
                  />
                </div>
                <div>
                  <DecryptedText 
                    text={getTranslatedText('portfolio.subtitle1', isEnglish)} 
                    animateOn="view" 
                    sequential={true}
                    speed={45}
                    maxIterations={22}
                    revealDirection="start"
                    className={isDarkTheme ? "text-white" : "text-gray-800"}
                    encryptedClassName={isDarkTheme ? "text-gray-500" : "text-gray-400"}
                    parentClassName="block"
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}[]|:;<>,.?/~`"
                  />
                </div>
                <div>
                  <DecryptedText 
                    text={getTranslatedText('portfolio.subtitle2', isEnglish)} 
                    animateOn="view" 
                    sequential={true}
                    speed={50}
                    maxIterations={25}
                    revealDirection="start"
                    className={isDarkTheme ? "text-white" : "text-gray-800"}
                    encryptedClassName={isDarkTheme ? "text-gray-500" : "text-gray-400"}
                    parentClassName="block"
                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}[]|:;<>,.?/~`"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className={`text-xl leading-relaxed ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} font-sans mb-6`}>
                  {getTranslatedText('portfolio.intro', isEnglish)}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm px-5 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">{getTranslatedText('portfolio.tag1', isEnglish)}</span>
                  <span className="text-sm px-5 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">{getTranslatedText('portfolio.tag2', isEnglish)}</span>
                  <span className="text-sm px-5 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">{getTranslatedText('portfolio.tag3', isEnglish)}</span>
                  <span className="text-sm px-5 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">{getTranslatedText('portfolio.tag4', isEnglish)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 我的经历模块 - 100%还原Webflow社区页面的Upcoming events样式但保持与产品页面一致的宽度 */}
        <div className="w-full mb-20 mt-40">
          <div className="mb-10">
            <h2 className="text-4xl sm:text-4xl font-bold mb-3 font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.experience', isEnglish)}</h2>
            <p className={`text-lg ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} max-w-3xl`}>{getTranslatedText('portfolio.experienceIntro', isEnglish)}</p>
          </div>
          
          {/* 表头移到卡片外部 */}
          {/* <div className="grid grid-cols-12 pb-6 text-left">
            <div className="col-span-4 font-medium text-text-gray uppercase tracking-wide text-base">活动</div>
            <div className="col-span-3 font-medium text-text-gray uppercase tracking-wide text-base">地点和时间</div>
            <div className="col-span-5 font-medium text-text-gray uppercase tracking-wide text-base">详情</div>
          </div> */}
          
          <div className={`overflow-hidden rounded-xl border ${isDarkTheme ? 'bg-card border-[#222222]' : 'bg-white border-gray-200'}`}>
            <div className="min-w-full">
              {/* 第一个活动 */}
              <div className={`grid grid-cols-12 py-7 pb-5 px-8 gap-0 border-b ${isDarkTheme ? 'border-[#222222] bg-[#171717]' : 'border-gray-200 bg-white'}`}>
                <div className="col-span-5 flex flex-col items-start justify-center pr-0 mr-0 pl-5">
                  <div className="w-full">
                    <h3 className={`font-bold text-xl mb-3 text-left ${isDarkTheme ? 'text-white' : 'text-gray-800'} font-['PingFang SC', sans-serif]`}>
                      {(() => {
                        const title = getTranslatedText('portfolio.exp1Title', isEnglish);
                        const parts = isEnglish 
                          ? title.split('**Medical Big Data Technology Co., Ltd.') 
                          : title.split('**医疗大数据科技有限公司');
                        
                        return (
                          <>
                            {parts[0]}
                            <span className="text-base font-normal opacity-80">
                              {isEnglish ? '**Medical Big Data Technology Co., Ltd.' : '**医疗大数据科技有限公司'}
                            </span>
                            {parts[1] || ''}
                          </>
                        );
                      })()}
                    </h3>
                    <div className="flex justify-start">
                      <span className={`${isDarkTheme ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary'} px-3 py-1 font-medium rounded`} style={{ fontSize: '13px' }}>{getTranslatedText('portfolio.exp1Position', isEnglish)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-start -ml-28">
                  <div className={`text-text-gray flex flex-col justify-center h-full px-0 ${!isDarkTheme && 'text-gray-700'}`}>
                    <div>
                      <span className={`block text-left ${!isDarkTheme && 'text-gray-600'}`} style={{ fontSize: '13px' }}>{getTranslatedText('portfolio.exp1Location', isEnglish)}</span>
                      <span className="block text-text-gray/70" style={{ fontSize: '12px' }}>{getTranslatedText('portfolio.exp1Period', isEnglish)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 flex">
                  <div className="-mr-10 flex-1 pr-[40px] -ml-20 pb-0">
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2`} style={{ fontSize: '15px' }}>
                      {(() => {
                        const desc = getTranslatedText('portfolio.exp1Desc3', isEnglish);
                        const parts = isEnglish 
                          ? desc.split(/(?=;)/) 
                          : desc.split(/(?=；)/);
                        
                        return (
                          <>
                            {parts[0]}
                            {parts.length > 1 && <span className="text-sm opacity-80">{parts[1]}</span>}
                          </>
                        );
                      })()}
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2`} style={{ fontSize: '15px' }}>
                      {getTranslatedText('portfolio.exp1Desc2', isEnglish)}
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2`} style={{ fontSize: '15px' }}>
                      {getTranslatedText('portfolio.exp1Desc1', isEnglish)}
                    </p>
                  
                  </div>
                </div>
              </div>
              
              {/* 第二个活动 */}
              <div className={`grid grid-cols-12 py-7 pb-5 px-8 gap-0 border-b ${isDarkTheme ? 'border-[#222222] bg-[#121212]' : 'border-gray-200 bg-gray-50'}`}>
                <div className="col-span-5 flex flex-col items-start justify-center pr-0 mr-0 pl-5">
                  <div className="w-full">
                    <h3 className={`font-bold text-xl mb-3 text-left ${isDarkTheme ? 'text-white' : 'text-gray-800'} font-['PingFang SC', sans-serif]`}>
                      {(() => {
                        const title = getTranslatedText('portfolio.exp2Title', isEnglish);
                        const parts = isEnglish 
                          ? title.split('**Health Technology Co., Ltd.') 
                          : title.split('**健康科技有限公司');
                        
                        return (
                          <>
                            {parts[0]}
                            <span className="text-base font-normal opacity-80">
                              {isEnglish ? '**Health Technology Co., Ltd.' : '**健康科技有限公司'}
                            </span>
                            {parts[1] || ''}
                          </>
                        );
                      })()}
                    </h3>
                    <div className="flex justify-start">
                      <span className={`${isDarkTheme ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary'} px-3 py-1 font-medium rounded`} style={{ fontSize: '13px' }}>{getTranslatedText('portfolio.exp2Position', isEnglish)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-start -ml-28">
                  <div className={`text-text-gray flex flex-col justify-center h-full px-0 ${!isDarkTheme && 'text-gray-700'}`}>
                    <div>
                      <span className={`block text-left ${!isDarkTheme && 'text-gray-600'}`} style={{ fontSize: '13px' }}>{getTranslatedText('portfolio.exp2Location', isEnglish)}</span>
                      <span className={`block text-text-gray/70 text-left ${!isDarkTheme && 'text-gray-600'}`} style={{ fontSize: '12px' }}>{getTranslatedText('portfolio.exp2Period', isEnglish)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 flex">
                  <div className="-mr-10 flex-1 pr-[40px] -ml-20 pb-0">
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2`} style={{ fontSize: '15px' }}>
                      {(() => {
                        const desc = getTranslatedText('portfolio.exp2Desc1', isEnglish);
                        const parts = isEnglish 
                          ? desc.split(/(?=;)/) 
                          : desc.split(/(?=；)/);
                        
                        return (
                          <>
                            {parts[0]}
                            {parts.length > 1 && <span className="text-sm opacity-80">{parts[1]}</span>}
                          </>
                        );
                      })()}
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2`} style={{ fontSize: '15px' }}>
                      {getTranslatedText('portfolio.exp2Desc2', isEnglish)}
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2`} style={{ fontSize: '15px' }}>
                      {(() => {
                        const desc = getTranslatedText('portfolio.exp2Desc3', isEnglish);
                        const parts = isEnglish 
                          ? desc.split(/(?=;)/) 
                          : desc.split(/(?=；)/);
                        
                        return (
                          <>
                            {parts[0]}
                            {parts.length > 1 && <span className="text-sm opacity-80">{parts[1]}</span>}
                          </>
                        );
                      })()}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 第三个活动 */}
              <div className={`grid grid-cols-12 py-7 pb-5 px-8 gap-0 border-b ${isDarkTheme ? 'border-[#222222] bg-[#171717]' : 'border-gray-200 bg-white'}`}>
                <div className="col-span-5 flex flex-col items-start justify-center pr-0 mr-0 pl-5">
                  <div className="w-full">
                    <h3 className={`font-bold text-xl mb-3 text-left ${isDarkTheme ? 'text-white' : 'text-gray-800'} font-['PingFang SC', sans-serif]`}>
                      {(() => {
                        const title = getTranslatedText('portfolio.exp3Title', isEnglish);
                        const parts = isEnglish 
                          ? title.split('Beijing **Technology Co., Ltd.') 
                          : title.split('北京**科技有限公司');
                        
                        return (
                          <>
                            {parts[0]}
                            <span className="text-base font-normal opacity-80">
                              {isEnglish ? 'Beijing **Technology Co., Ltd.' : '北京**科技有限公司'}
                            </span>
                            {parts[1] || ''}
                          </>
                        );
                      })()}
                    </h3>
                    <div className="flex justify-start">
                      <span className={`${isDarkTheme ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary'} px-3 py-1 font-medium rounded`} style={{ fontSize: '13px' }}>{getTranslatedText('portfolio.exp3Position', isEnglish)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-start -ml-28">
                  <div className={`text-text-gray flex flex-col justify-center h-full px-0 ${!isDarkTheme && 'text-gray-700'}`}>
                    <div>
                      <span className={`block text-left ${!isDarkTheme && 'text-gray-600'}`} style={{ fontSize: '13px' }}>{getTranslatedText('portfolio.exp3Location', isEnglish)}</span>
                      <span className={`block text-text-gray/70 text-left ${!isDarkTheme && 'text-gray-600'}`} style={{ fontSize: '12px' }}>{getTranslatedText('portfolio.exp3Period', isEnglish)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 flex">
                  <div className="-mr-10 flex-1 pr-[40px] -ml-20 pb-0">
                    <div className="flex mb-2">
                      <div className="w-[260px]">
                        <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`} style={{ fontSize: '15px' }}>
                          {getTranslatedText('portfolio.exp3Desc1', isEnglish)}
                        </p>
                      </div>
                      <div>
                        <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`} style={{ fontSize: '15px' }}>
                          {getTranslatedText('portfolio.exp3Desc2', isEnglish)}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      <div className="w-[260px]">
                        <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`} style={{ fontSize: '15px' }}>
                          {getTranslatedText('portfolio.exp3Desc3', isEnglish)}
                        </p>
                      </div>
                      <div>
                        <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`} style={{ fontSize: '15px' }}>
                          {getTranslatedText('portfolio.exp3Desc4', isEnglish)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 第四个活动 - 新增 */}
              <div className={`grid grid-cols-12 py-7 pb-5 px-8 gap-0 ${isDarkTheme ? 'bg-[#121212]' : 'bg-gray-50'} rounded-b-xl`}>
                <div className="col-span-5 flex flex-col items-start justify-center pr-0 mr-0 pl-5">
                  <div className="w-full">
                    <h3 className={`font-bold text-xl mb-3 text-left ${isDarkTheme ? 'text-white' : 'text-gray-800'} font-['PingFang SC', sans-serif]`}>
                      {(() => {
                        const title = getTranslatedText('portfolio.exp4Title', isEnglish);
                        const parts = isEnglish 
                          ? title.split('**Beijing Cultural Consulting Co., Ltd.') 
                          : title.split('**北京文化咨询有限公司');
                        
                        return (
                          <>
                            {parts[0]}
                            <span className="text-base font-normal opacity-80">
                              {isEnglish ? '**Beijing Cultural Consulting Co., Ltd.' : '**北京文化咨询有限公司'}
                            </span>
                            {parts[1] || ''}
                          </>
                        );
                      })()}
                    </h3>
                    <div className="flex justify-start">
                      <span className={`${isDarkTheme ? 'bg-primary/10 text-primary' : 'bg-primary/10 text-primary'} px-3 py-1 font-medium rounded`} style={{ fontSize: '13px' }}>{getTranslatedText('portfolio.exp4Position', isEnglish)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-start -ml-28">
                  <div className={`text-text-gray flex flex-col justify-center h-full px-0 ${!isDarkTheme && 'text-gray-700'}`}>
                    <div>
                      <span className={`block text-left ${!isDarkTheme && 'text-gray-600'}`} style={{ fontSize: '13px' }}>{getTranslatedText('portfolio.exp4Location', isEnglish)}</span>
                      <span className={`block text-text-gray/70 text-left ${!isDarkTheme && 'text-gray-600'}`} style={{ fontSize: '12px' }}>{getTranslatedText('portfolio.exp4Period', isEnglish)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 flex">
                  <div className="-mr-10 flex-1 pr-[40px] -ml-20 pb-0">
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2`} style={{ fontSize: '15px' }}>
                      {(() => {
                        const desc = getTranslatedText('portfolio.exp4Desc1', isEnglish);
                        const parts = isEnglish 
                          ? desc.split(/(?=;)/) 
                          : desc.split(/(?=；)/);
                        
                        return (
                          <>
                            {parts[0]}
                            {parts.length > 1 && <span className="text-sm opacity-80">{parts[1]}</span>}
                          </>
                        );
                      })()}
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2`} style={{ fontSize: '15px' }}>
                      {(() => {
                        const desc = getTranslatedText('portfolio.exp4Desc2', isEnglish);
                        const parts = isEnglish 
                          ? desc.split(/(?=;)/) 
                          : desc.split(/(?=；)/);
                        
                        return (
                          <>
                            {parts[0]}
                            {parts.length > 1 && <span className="text-sm opacity-80">{parts[1]}</span>}
                          </>
                        );
                      })()}
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2`} style={{ fontSize: '15px' }}>
                      {(() => {
                        const desc = getTranslatedText('portfolio.exp4Desc3', isEnglish);
                        const parts = isEnglish 
                          ? desc.split(/(?=;)/) 
                          : desc.split(/(?=；)/);
                        
                        return (
                          <>
                            {parts[0]}
                            {parts.length > 1 && <span className="text-sm opacity-80">{parts[1]}</span>}
                          </>
                        );
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 移动端设计部分 */}
        <div className="w-full mt-25 relative">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-4xl sm:text-4xl font-bold font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.mobileDesign', isEnglish)}</h2>
            <div className="flex space-x-3">
              <button 
                className="slider-control-button"
                onClick={() => scrollAppDesignCards('left')}
                disabled={currentCardIndex === 0}
                aria-label="前一个项目"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="slider-control-button"
                onClick={() => scrollAppDesignCards('right')}
                disabled={
                  // 只有当显示最后一组特殊卡片并且已经滚动到最后一个位置时才禁用
                  (appDesignProjects.length >= 3 && 
                   appDesignProjects[appDesignProjects.length-3].title === "智能家居控制中心" && 
                   currentCardIndex >= appDesignProjects.length - 3) || 
                  // 一般情况，只在达到最后一屏幕时禁用
                  (appDesignProjects.length < 3 || 
                   appDesignProjects[appDesignProjects.length-3].title !== "智能家居控制中心") &&
                   (currentCardIndex >= appDesignProjects.length - visibleCards || 
                   appDesignProjects.length <= visibleCards) 
                }
                aria-label="下一个项目"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <p className={`text-lg ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} max-w-3xl mb-6`}>
            {getTranslatedText('portfolio.mobileDesignDesc', isEnglish)}
          </p>
          
          {/* 移动端设计容器 */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-visible">
            <div 
              ref={appDesignRef}
              className="hide-scrollbar mobile-design-scroll pl-4 md:pl-8 lg:pl-12 pr-4 md:pr-8 lg:pr-12"
              style={{ 
                paddingLeft: 'max(1rem, calc((100vw - 1200px) / 2 + 3rem))',
                paddingRight: 'max(1rem, calc((100vw - 1200px) / 2 + 3rem))'
              }}
            >
              {appDesignProjects.map((project, index) => {
                // 计算卡片位置
                const position = index - currentCardIndex;
                
                // 确定卡片的样式类
                let cardClasses = "mobile-card";
                
                // 可见卡片
                if (position >= 0 && position < visibleCards) {
                  cardClasses += " mobile-card-visible";
                } else {
                  cardClasses += " mobile-card-dim";
                }
                
                // 第一个卡片
                if (position === 0) {
                  cardClasses += " mobile-card-first";
                }
                
                return (
                  <div 
                    key={`project-${index}`} 
                    className={cardClasses}
                  >
                    <div className="block h-full" onClick={(e) => handleCardClick(e, project)}>
                      <SpotlightCard 
                        className={`mobile-card-content rounded-lg h-full flex flex-col ${
                          isDarkTheme 
                            ? 'text-white' 
                            : 'text-gray-800'
                          }`}
                        spotlightColor={isDarkTheme ? "rgba(41, 255, 153, 0.1)" : "rgba(38, 191, 115, 0.1)"}
                      >
                        <div className="pt-[16px] px-[14px] pb-0">
                          <div className="relative h-[180px] overflow-hidden rounded-lg">
                            <img 
                              src={project.imageUrl} 
                              alt={project.title}
                              className="w-full h-full object-cover mobile-card-image"
                              onError={(e) => {
                                console.error(`卡片图片加载失败: ${project.imageUrl}`);
                                e.currentTarget.src = '/images/placeholder.png';
                              }}
                            />
                          </div>
                        </div>
                        <div className="px-[20px] pt-[24px] pb-[20px] flex flex-col h-full">
                          <h3 className={`font-bold text-[24px] mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
                            {isEnglish ? (project.titleEn || project.title) : project.title}
                          </h3>
                          <div className="flex gap-2 mb-3">
                            <span className="text-[12px] px-2 py-1 rounded-md text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>{getTranslatedText('portfolio.tagFrom0to1', isEnglish)}</span>
                            <span className="text-[12px] px-2 py-1 rounded-md text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>{getTranslatedText('portfolio.tagCEnd', isEnglish)}</span>
                          </div>
                          <p className={`text-[14px] flex-grow ${
                            isDarkTheme ? 'text-gray-300/70' : 'text-gray-600/70'
                          }`}>
                            {isEnglish ? (project.descriptionEn || project.description) : project.description}
                          </p>
                          <div className={`text-[11px] mt-5 ${
                            isDarkTheme ? 'text-white/50' : 'text-gray-500'
                          }`}>
                            {/* 
                              ⚠️ 重要提示：项目时间硬编码部分 - 移动端设计 ⚠️
                              如需修改项目时间，请同时更新以下两个地方：
                              1. src/data/portfolio.ts 文件中对应项目的 date 字段
                              2. 此处的硬编码时间显示
                              
                              项目ID与项目名称对应关系：
                              project-1 = 好旅程项目       (2019.12-2020.10)
                              project-2 = AI健康助手      (2025.03)
                              project-3 = 环保回收项目     (2024.03)
                              project-4 = 儿宝管家项目     (2018.10-2019.06)
                              project-5 = 近视无忧项目     (2024.06-2024.08)
                              project-6 = 锦礼商城        (2020.04-2020.05)
                              project-7 = VAV交友         (2020.12-2021.02)
                              project-8 = 速速修项目      (2022.02-2022.03)
                            */}
                            {project.id === 'project-1' ? (isEnglish ? 'Project Time: 2019.12-2020.10' : '项目时间：2019.12-2020.10') : 
                             project.id === 'project-2' ? (isEnglish ? 'Project Time: 2025.03' : '项目时间：2025.03') :
                             project.id === 'project-3' ? (isEnglish ? 'Project Time: 2024.03' : '项目时间：2024.03') :
                             project.id === 'project-4' ? (isEnglish ? 'Project Time: 2018.10-2019.06' : '项目时间：2018.10-2019.06') :
                             project.id === 'project-5' ? (isEnglish ? 'Project Time: 2024.06-2024.08' : '项目时间：2024.06-2024.08') :
                             project.id === 'project-6' ? (isEnglish ? 'Project Time: 2020.04-2020.05' : '项目时间：2020.04-2020.05') :
                             project.id === 'project-7' ? (isEnglish ? 'Project Time: 2020.12-2021.02' : '项目时间：2020.12-2021.02') :
                             project.id === 'project-8' ? (isEnglish ? 'Project Time: 2022.02-2022.03' : '项目时间：2022.02-2022.03') :
                             `${getTranslatedText('portfolio.projectTime', isEnglish)}: ${project.date}`}
                          </div>
                        </div>
                      </SpotlightCard>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 查看全部按钮 */}
          <div className="mt-4 mb-32 flex justify-start">
            <Link 
              href="/all-designs" 
              className="inline-block px-6 py-3 rounded-md transition-colors duration-300 bg-primary text-white hover:bg-[#1DA651]"
            >
              {getTranslatedText('portfolio.viewAll', isEnglish)}
            </Link>
          </div>
        </div>
        
        {/* 网站设计部分 */}
        <div className="w-full relative">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-4xl sm:text-4xl font-bold font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.webDesign', isEnglish)}</h2>
            <div className="flex space-x-3">
              <button 
                className="slider-control-button"
                onClick={() => scrollWebDesignCards('left')}
                disabled={webCardIndex === 0}
                aria-label="前一个项目"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="slider-control-button"
                onClick={() => scrollWebDesignCards('right')}
                disabled={webCardIndex >= Math.max(0, webDesignProjects.length - visibleCards) || 
                         webDesignProjects.length <= visibleCards}
                aria-label="下一个项目"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <p className={`text-lg ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} max-w-3xl mb-6`}>
            {getTranslatedText('portfolio.webDesignDesc', isEnglish)}
          </p>
          
          {/* 网站设计容器 */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-visible">
            <div 
              ref={webDesignRef}
              className="hide-scrollbar mobile-design-scroll pl-4 md:pl-8 lg:pl-12"
              style={{ paddingLeft: 'max(1rem, calc((100vw - 1200px) / 2 + 3rem))' }}
            >
              {webDesignProjects.map((project, index) => {
                // 计算卡片位置
                const position = index - webCardIndex;
                
                // 确定卡片的样式类
                let cardClasses = "mobile-card";
                
                // 可见卡片
                if (position >= 0 && position < visibleCards) {
                  cardClasses += " mobile-card-visible";
                } else {
                  cardClasses += " mobile-card-dim";
                }
                
                // 第一个卡片
                if (position === 0) {
                  cardClasses += " mobile-card-first";
                }
                
                return (
                  <div 
                    key={`web-project-${index}`} 
                    className={cardClasses}
                  >
                    <div className="block h-full" onClick={(e) => handleCardClick(e, project)}>
                      <SpotlightCard 
                        className={`mobile-card-content rounded-lg h-full flex flex-col ${
                          isDarkTheme 
                            ? 'text-white' 
                            : 'text-gray-800'
                          }`}
                        spotlightColor={isDarkTheme ? "rgba(41, 255, 153, 0.1)" : "rgba(38, 191, 115, 0.1)"}
                      >
                        <div className="pt-[16px] px-[14px] pb-0">
                          <div className="relative h-[180px] overflow-hidden rounded-lg">
                            <img 
                              src={project.imageUrl.startsWith('/') ? `.${project.imageUrl}` : `./${project.imageUrl}`} 
                              alt={project.title}
                              className="w-full h-full object-cover mobile-card-image"
                              onError={(e) => {
                                console.error(`卡片图片加载失败: ${project.imageUrl}`);
                                e.currentTarget.src = './images/placeholder.png';
                              }}
                            />
                          </div>
                        </div>
                        <div className="px-[20px] pt-[24px] pb-[20px] flex flex-col h-full">
                          <h3 className={`font-bold text-[24px] mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{isEnglish ? (project.titleEn || project.title) : project.title}</h3>
                          <div className="flex gap-2 mb-3">
                            <span className="text-[12px] px-2 py-1 rounded-md text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>{getTranslatedText('portfolio.tagFrom0to1', isEnglish)}</span>
                            <span className="text-[12px] px-2 py-1 rounded-md text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>{getTranslatedText('portfolio.tagBEnd', isEnglish)}</span>
                          </div>
                          <p className={`text-[14px] flex-grow ${
                            isDarkTheme ? 'text-gray-300/70' : 'text-gray-600/70'
                          }`}>
                            {isEnglish ? (project.descriptionEn || project.description) : project.description}
                          </p>
                          <div className={`text-[11px] mt-5 ${
                            isDarkTheme ? 'text-white/50' : 'text-gray-500'
                          }`}>{project.id === 'project-9' ? (isEnglish ? 'Project Time: 2020.02-2020.12' : '项目时间：2020.02-2020.12') :
                               project.id === 'project-10' ? (isEnglish ? 'Project Time: 2024.01-2024.03' : '项目时间：2024.01-2024.03') :
                               `${getTranslatedText('portfolio.projectTime', isEnglish)}: ${project.date}`}</div>
                        </div>
                      </SpotlightCard>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 查看全部按钮 */}
          <div className="mt-4 mb-32 flex justify-start">
            <Link 
              href="/all-designs" 
              className="inline-block px-6 py-3 rounded-md transition-colors duration-300 bg-primary text-white hover:bg-[#1DA651]"
            >
              {getTranslatedText('portfolio.viewAll', isEnglish)}
            </Link>
          </div>
        </div>
        
        {/* 大屏设计部分 */}
        <div className="w-full relative">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-4xl sm:text-4xl font-bold font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.dashboardDesign', isEnglish)}</h2>
            <div className="flex space-x-3">
              <button 
                className="slider-control-button"
                onClick={() => scrollDashboardCards('left')}
                disabled={dashboardCardIndex === 0}
                aria-label="前一个项目"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="slider-control-button"
                onClick={() => scrollDashboardCards('right')}
                disabled={dashboardCardIndex >= Math.max(0, dashboardProjects.length - visibleCards) || 
                         dashboardProjects.length <= visibleCards}
                aria-label="下一个项目"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <p className={`text-lg ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} max-w-3xl mb-6`}>
            {getTranslatedText('portfolio.dashboardDesignDesc', isEnglish)}
          </p>
          
          {/* 大屏设计容器 */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-visible">
            <div 
              ref={dashboardDesignRef}
              className="hide-scrollbar mobile-design-scroll pl-4 md:pl-8 lg:pl-12"
              style={{ paddingLeft: 'max(1rem, calc((100vw - 1200px) / 2 + 3rem))' }}
            >
              {dashboardProjects.map((project, index) => {
                // 计算卡片位置
                const position = index - dashboardCardIndex;
                
                // 确定卡片的样式类
                let cardClasses = "mobile-card";
                
                // 可见卡片
                if (position >= 0 && position < visibleCards) {
                  cardClasses += " mobile-card-visible";
                } else {
                  cardClasses += " mobile-card-dim";
                }
                
                // 第一个卡片
                if (position === 0) {
                  cardClasses += " mobile-card-first";
                }
                
                return (
                  <div 
                    key={`dashboard-project-${index}`} 
                    className={cardClasses}
                  >
                    <div className="block h-full" onClick={(e) => handleCardClick(e, project)}>
                      <SpotlightCard 
                        className={`mobile-card-content rounded-lg h-full flex flex-col ${
                          isDarkTheme 
                            ? 'text-white' 
                            : 'text-gray-800'
                          }`}
                        spotlightColor={isDarkTheme ? "rgba(41, 255, 153, 0.1)" : "rgba(38, 191, 115, 0.1)"}
                      >
                        <div className="pt-[16px] px-[14px] pb-0">
                          <div className="relative h-[180px] overflow-hidden rounded-lg">
                            <img 
                              src={project.imageUrl.startsWith('/') ? `.${project.imageUrl}` : `./${project.imageUrl}`} 
                              alt={project.title}
                              className="w-full h-full object-cover mobile-card-image"
                              onError={(e) => {
                                console.error(`卡片图片加载失败: ${project.imageUrl}`);
                                e.currentTarget.src = './images/placeholder.png';
                              }}
                            />
                          </div>
                        </div>
                        <div className="px-[20px] pt-[24px] pb-[20px] flex flex-col h-full">
                          <h3 className={`font-bold text-[24px] mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{isEnglish ? (project.titleEn || project.title) : project.title}</h3>
                          <div className="flex gap-2 mb-3">
                            <span className="text-[12px] px-2 py-1 rounded-md text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>{getTranslatedText('portfolio.tagFrom0to1', isEnglish)}</span>
                            <span className="text-[12px] px-2 py-1 rounded-md text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>{getTranslatedText('portfolio.tagData', isEnglish)}</span>
                          </div>
                          <p className={`text-[14px] flex-grow ${
                            isDarkTheme ? 'text-gray-300/70' : 'text-gray-600/70'
                          }`}>
                            {isEnglish ? (project.descriptionEn || project.description) : project.description}
                          </p>
                          <div className={`text-[11px] mt-5 ${
                            isDarkTheme ? 'text-white/50' : 'text-gray-500'
                          }`}>{project.id === 'project-11' ? (isEnglish ? 'Project Time: 2023.09-2023.12' : '项目时间：2023.09-2023.12') :
                               project.id === 'project-12' ? (isEnglish ? 'Project Time: 2024.03-2024.06' : '项目时间：2024.03-2024.06') :
                               `${getTranslatedText('portfolio.projectTime', isEnglish)}: ${project.date}`}</div>
                        </div>
                      </SpotlightCard>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 查看全部按钮 */}
          <div className="mt-4 mb-32 flex justify-start">
            <Link 
              href="/all-designs" 
              className="inline-block px-6 py-3 rounded-md transition-colors duration-300 bg-primary text-white hover:bg-[#1DA651]"
            >
              {getTranslatedText('portfolio.viewAll', isEnglish)}
            </Link>
          </div>
        </div>
        
        {/* 其他设计部分 */}
        <div className="w-full relative">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-4xl sm:text-4xl font-bold font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.otherDesign', isEnglish)}</h2>
            <div className="flex space-x-3">
              <button 
                className="slider-control-button"
                onClick={() => scrollOtherDesignCards('left')}
                disabled={otherCardIndex === 0}
                aria-label="前一个项目"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="slider-control-button"
                onClick={() => scrollOtherDesignCards('right')}
                disabled={otherCardIndex >= Math.max(0, otherProjects.length - visibleCards) || 
                         otherProjects.length <= visibleCards}
                aria-label="下一个项目"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <p className={`text-lg ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} max-w-3xl mb-6`}>
            {getTranslatedText('portfolio.otherDesignDesc', isEnglish)}
          </p>
          
          {/* 其他设计容器 */}
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-visible">
            <div 
              ref={otherDesignRef}
              className="hide-scrollbar mobile-design-scroll pl-4 md:pl-8 lg:pl-12"
              style={{ paddingLeft: 'max(1rem, calc((100vw - 1200px) / 2 + 3rem))' }}
            >
              {otherProjects.map((project, index) => {
                // 计算卡片位置
                const position = index - otherCardIndex;
                
                // 确定卡片的样式类
                let cardClasses = "mobile-card";
                
                // 可见卡片
                if (position >= 0 && position < visibleCards) {
                  cardClasses += " mobile-card-visible";
                } else {
                  cardClasses += " mobile-card-dim";
                }
                
                // 第一个卡片
                if (position === 0) {
                  cardClasses += " mobile-card-first";
                }
                
                return (
                  <div 
                    key={`other-project-${index}`} 
                    className={cardClasses}
                  >
                    <div className="block h-full" onClick={(e) => handleCardClick(e, project)}>
                      <SpotlightCard 
                        className={`mobile-card-content rounded-lg h-full flex flex-col ${
                          isDarkTheme 
                            ? 'text-white' 
                            : 'text-gray-800'
                          }`}
                        spotlightColor={isDarkTheme ? "rgba(41, 255, 153, 0.1)" : "rgba(38, 191, 115, 0.1)"}
                      >
                        <div className="pt-[16px] px-[14px] pb-0">
                          <div className="relative h-[180px] overflow-hidden rounded-lg">
                            <img 
                              src={project.imageUrl.startsWith('/') ? `.${project.imageUrl}` : `./${project.imageUrl}`} 
                              alt={project.title}
                              className="w-full h-full object-cover mobile-card-image"
                              onError={(e) => {
                                console.error(`卡片图片加载失败: ${project.imageUrl}`);
                                e.currentTarget.src = './images/placeholder.png';
                              }}
                            />
                          </div>
                        </div>
                        <div className="px-[20px] pt-[24px] pb-[20px] flex flex-col h-full">
                          <h3 className={`font-bold text-[24px] mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{isEnglish ? (project.titleEn || project.title) : project.title}</h3>
                          <div className="flex gap-2 mb-3">
                            <span className="text-[12px] px-2 py-1 rounded-md text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>{getTranslatedText('portfolio.tagFrom0to1', isEnglish)}</span>
                            <span className="text-[12px] px-2 py-1 rounded-md text-[#22c45e]" style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}>{getTranslatedText('portfolio.tagCreative', isEnglish)}</span>
                          </div>
                          <p className={`text-[14px] flex-grow ${
                            isDarkTheme ? 'text-gray-300/70' : 'text-gray-600/70'
                          }`}>
                            {isEnglish ? (project.descriptionEn || project.description) : project.description}
                          </p>
                          <div className={`text-[11px] mt-5 ${
                            isDarkTheme ? 'text-white/50' : 'text-gray-500'
                          }`}>{project.id === 'project-13' ? (isEnglish ? 'Project Time: 2025.03' : '项目时间：2025.03') :
                               project.id === 'project-14' ? (isEnglish ? 'Project Time: 2022.02-2022.03' : '项目时间：2022.02-2022.03') :
                               project.id === 'project-15' ? (isEnglish ? 'Project Time: 2020.04-2020.05' : '项目时间：2020.04-2020.05') :
                               `${getTranslatedText('portfolio.projectTime', isEnglish)}: ${project.date}`}</div>
                        </div>
                      </SpotlightCard>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* 查看全部按钮 */}
          <div className="mt-4 flex justify-start mb-40">
            <Link 
              href="/all-designs" 
              className="inline-block px-6 py-3 rounded-md transition-colors duration-300 bg-primary text-white hover:bg-[#1DA651]"
            >
              {getTranslatedText('portfolio.viewAll', isEnglish)}
            </Link>
          </div>
        </div>
        
        {/* 联系部分 - 更加明显 */}
        <div className={`w-full py-10 px-8 md:px-16 lg:px-24 rounded-xl mb-16 flex flex-col md:flex-row justify-between items-center bg-primary/80`}>
          <div className="mb-6 md:mb-0 text-left md:pl-4 lg:pl-8 flex items-center">
            <h2 className="text-lg sm:text-xl font-bold text-white font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.contactMe', isEnglish)}</h2>
          </div>
          <div className="md:pr-4 lg:pr-8">
            <button
              onClick={() => setShowContactInfo(!showContactInfo)}
              className="inline-block px-8 py-4 rounded-md transition-colors duration-300 bg-white text-primary font-medium hover:bg-gray-100"
            >
              {getTranslatedText('portfolio.viewContact', isEnglish)}
            </button>
          </div>
          
          {showContactInfo && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className={`${isDarkTheme ? 'bg-dark' : 'bg-white'} text-white rounded-xl shadow-xl max-w-4xl w-full p-8 mx-4 relative`}>
                <button 
                  onClick={() => setShowContactInfo(false)}
                  className={`absolute top-4 right-4 p-2 rounded-full ${isDarkTheme ? 'bg-card hover:bg-card-hover text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  aria-label="关闭"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                
                <div className="flex justify-start items-start mb-6">
                  {/* <h3 className="text-2xl font-bold font-['PingFang SC', sans-serif]">联系方式</h3> */}
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-12 items-center md:items-start">
                  {/* 左侧：微信二维码 */}
                  <div className="text-center mb-8 md:mb-0">
                    <p className={`font-medium ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-4 text-lg`}>{getTranslatedText('portfolio.scanWechat', isEnglish)}</p>
                    <div className="w-56 h-56 bg-card rounded p-3 mx-auto">
                      <Image 
                        src="/images/wechat-qrcode.png"
                        alt="微信二维码"
                        width={224}
                        height={224}
                        className="rounded"
                      />
                    </div>
                  </div>
                  
                  {/* 右侧：邮箱地址 */}
                  <div className="text-center md:text-left flex-1">
                    <p className={`font-medium ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-4 text-lg`}>{getTranslatedText('portfolio.emailContact', isEnglish)}</p>
                    <div className="relative">
                      <div 
                        className={`flex items-center justify-between p-4 rounded-lg border border-card-border bg-card cursor-pointer hover:bg-opacity-80 transition-colors ${!isDarkTheme && 'bg-gray-700 hover:bg-opacity-80'}`}
                        onClick={copyEmail}
                      >
                        <span className={`text-secondary text-lg ${!isDarkTheme && 'text-gray-600'}`}>wincyfu@foxmail.com</span>
                        <svg className={`w-6 h-6 ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      {emailCopied && (
                        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-primary text-white text-sm rounded-md">
                          {getTranslatedText('portfolio.emailCopied', isEnglish)}
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-4 text-lg`}>{getTranslatedText('portfolio.backupEmail', isEnglish)}</p>
                      <div 
                        className={`flex items-center justify-between p-4 rounded-lg border border-card-border bg-card cursor-pointer hover:bg-opacity-80 transition-colors ${!isDarkTheme && 'bg-gray-700 hover:bg-opacity-80'}`}
                        onClick={() => {
                          navigator.clipboard.writeText("fu.aquarius521@gmail.com");
                          setEmailCopied(true);
                          setTimeout(() => setEmailCopied(false), 2000);
                        }}
                      >
                        <span className={`text-secondary text-lg ${!isDarkTheme && 'text-gray-600'}`}>fu.aquarius521@gmail.com</span>
                        <svg className={`w-6 h-6 ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <p className={`mt-6 text-md ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`}>
                      {getTranslatedText('portfolio.emailClickTip', isEnglish)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 底部链接区域 */}
        <footer className="w-full pt-12 pb-16 border-t border-card-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold mb-4 text-lg font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.myArticles', isEnglish)}</h3>
              <ul className="space-y-2">
                <li><Link href="https://mp.weixin.qq.com/s/VQOjXNQQN2C7uQ0X-gN70w" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.article1', isEnglish)}</Link></li>
                <li><Link href="https://mp.weixin.qq.com/s/cPLEQqRfGKqhUcbsKe-juA" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.article2', isEnglish)}</Link></li>
                <li><Link href="https://mp.weixin.qq.com/s/hmRBxAOcTpaz4fa8PuK3xw" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.article3', isEnglish)}</Link></li>
                <li><Link href="https://mp.weixin.qq.com/s/Nz_G_xwQhudbg7IlNq5ETQ" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.article4', isEnglish)}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.myArticles', isEnglish)}</h3>
              <ul className="space-y-2">
                <li><Link href="https://mp.weixin.qq.com/s/n2wUbURa1mngG0zDEH9S_A" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.article5', isEnglish)}</Link></li>
                <li><Link href="https://mp.weixin.qq.com/s?__biz=MzAxMzcxNzQxNw==&mid=2649759617&idx=1&sn=ebd151b585e1f8b03c56b254d546bcff&scene=21&poc_token=HJcMDmijZgBlhyBeOE3oiGkYl8Z8ISJPuZvj2h9L" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.article6', isEnglish)}</Link></li>
                <li><Link href="https://mp.weixin.qq.com/s/-6tFAD0Ax-LHzzHwqIBUJw" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.article7', isEnglish)}</Link></li>
                <li><Link href="https://mp.weixin.qq.com/s?__biz=MzAxMzcxNzQxNw==&mid=2649761295&idx=1&sn=065e8facce2f81d533fe87eccd262248&chksm=839adcc9b4ed55df57af95b6131571d1d872bd274cba4649685ca679808c3664fe3ec195cd0f&scene=178&cur_album_id=2891855147943968770&search_click_id=#rd" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.article8', isEnglish)}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.myProducts', isEnglish)}</h3>
              <ul className="space-y-2">
                <li><Link href="/products/ai-photo" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.product1', isEnglish)}</Link></li>
                <li><Link href="/products/ai-fashion" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.product2', isEnglish)}</Link></li>
                <li><Link href="/products/ai-game" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.product3', isEnglish)}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg font-['PingFang SC', sans-serif]">{getTranslatedText('portfolio.socialMedia', isEnglish)}</h3>
              <ul className="space-y-2">
                <li><Link href="https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.social1', isEnglish)}</Link></li>
                <li><Link href="https://www.zhihu.com/people/fu-da-xian" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.social2', isEnglish)}</Link></li>
                <li><Link href="https://m.weibo.cn/profile/1783924480" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.social3', isEnglish)}</Link></li>
                <li><Link href="https://www.youtube.com/@wincyfu7083" target="_blank" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>{getTranslatedText('portfolio.social4', isEnglish)}</Link></li>
              </ul>
            </div>
          </div>
        </footer>
        
        {/* 留下原始项目网格但设为不可见 */}
        <div className="hidden">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`opacity-0 transform translate-y-8 transition-all duration-700 ${
                isVisible ? `opacity-100 translate-y-0 delay-${(index % 9) * 100 + 400}` : ''
              }`}
              style={{ transitionDelay: isVisible ? `${(index % 9) * 100 + 400}ms` : '0ms' }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {/* 无结果提示 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-medium mb-2">没有找到相关项目</p>
            <p className="text-sm text-text-gray mb-6">请尝试其他筛选条件</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-[#1DA651] transition-colors duration-300"
            >
              查看全部项目
            </button>
          </div>
        )}
        </div>
      </div>
      
      {/* 项目详情弹窗 */}
      {selectedProject && (
        <ProjectDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
          currentProjectId={selectedProject.id}
          onProjectChange={handleProjectChange}
        />
      )}
      
      {/* 使用与首页一致的Footer组件 */}
      <Footer />
    </main>
  );
}

