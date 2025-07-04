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
    <div 
      className={`min-h-screen py-0 px-0 transition-colors duration-300 relative ${
        isDarkTheme ? 'bg-[#111111] text-white' : 'bg-white text-dark'
      }`}
    >
      {/* 添加导航栏 */}
      <Nav />
      
      <div className="w-4/5 mx-auto py-12 mt-16">
        {/* 作品集头部 */}
        <div 
          className="w-full mb-16"
        >
          <div className="mb-16 pt-40">
            <div className="text-4xl sm:text-5xl md:text-5xl font-bold text-left space-y-8">
              <div>
                <DecryptedText 
                  text="这里展示的是真实项目案例" 
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
                  text="多终端界面设计" 
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
                  text="从0到1，推动设计落地..." 
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
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className={`text-xl leading-relaxed ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} font-sans mb-6`}>
                  欢迎浏览我的作品，如您对我的设计感兴趣，欢迎联系我
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm px-5 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">UI/UX设计</span>
                  <span className="text-sm px-5 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">AI辅助开发</span>
                  <span className="text-sm px-5 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">产品设计</span>
                  <span className="text-sm px-5 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300">APP设计/WEB设计/大屏设计</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 我的经历模块 - 100%还原Webflow社区页面的Upcoming events样式但保持80%宽度 */}
        <div className="w-full mb-20 mt-40">
          <div className="mb-10">
            <h2 className="text-4xl sm:text-4xl font-bold mb-3 font-['PingFang SC', sans-serif]">我的经历</h2>
            <p className={`text-lg ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} max-w-3xl`}>以下为真实工作经历，隐私保护，公司名称用**代替，感谢理解</p>
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
                <div className="col-span-5 flex flex-col items-start justify-center pr-0 mr-0 pl-8">
                  <div className="w-full">
                    <h3 className={`font-bold text-2xl mb-3 text-left ${isDarkTheme ? 'text-white' : 'text-gray-800'} font-['PingFang SC', sans-serif]`}>**医疗大数据科技有限公司</h3>
                    <div className="flex justify-start">
                      <span className={`${isDarkTheme ? 'bg-green-500 bg-opacity-60' : 'bg-[#26BF73]'} text-sm px-3 py-1 text-white font-medium rounded`}>设计岗</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-start -ml-28">
                  <div className={`text-text-gray flex flex-col justify-center h-full px-0 ${!isDarkTheme && 'text-gray-700'}`}>
                    {/* <div className="mb-2">
                      <span className="block text-base text-left ">山东 </span>
                    </div> */}
                    <div>
                      <span className={`block text-base text-left ${!isDarkTheme && 'text-gray-600'}`}>山东</span>
                      <span className="block text-text-gray/70 text-sm">2020.12-至今</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 flex">
                  <div className="-mr-10 flex-1 pr-[40px] -ml-20 pb-0">
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2 text-lg`}>
                      主导制定公司UI/UX设计系统及规范，确保设计语言一致性与可扩展性，提升产品开发效率
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2 text-lg`}>
                      全面负责医疗数据可视化大屏设计与交互优化，实现复杂数据直观展示
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2 text-lg`}>
                      设计并优化多端产品界面（Web、移动端、大屏），保持品牌统一性的同时兼顾各平台特性
                    </p>
                  
                  </div>
                </div>
              </div>
              
              {/* 第二个活动 */}
              <div className={`grid grid-cols-12 py-7 pb-5 px-8 gap-0 border-b ${isDarkTheme ? 'border-[#222222] bg-[#121212]' : 'border-gray-200 bg-gray-50'}`}>
                <div className="col-span-5 flex flex-col items-start justify-center pr-0 mr-0 pl-8">
                  <div className="w-full">
                    <h3 className={`font-bold text-2xl mb-3 text-left ${isDarkTheme ? 'text-white' : 'text-gray-800'} font-['PingFang SC', sans-serif]`}>**健康科技有限公司</h3>
                    <div className="flex justify-start">
                      <span className={`${isDarkTheme ? 'bg-green-500 bg-opacity-60' : 'bg-[#26BF73]'} text-sm px-3 py-1 text-white font-medium rounded`}>高级UI设计师</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-start -ml-28">
                  <div className={`text-text-gray flex flex-col justify-center h-full px-0 ${!isDarkTheme && 'text-gray-700'}`}>
                  {/* <div className="mb-2">
                      <span className="block text-base text-left ">山东 </span>
                    </div> */}
                    <div>
                      <span className={`block text-base text-left ${!isDarkTheme && 'text-gray-600'}`}>山东</span>
                      <span className={`block text-text-gray/70 text-sm text-left ${!isDarkTheme && 'text-gray-600'}`}>2018.10 - 2019.09</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 flex">
                  <div className="-mr-10 flex-1 pr-[40px] -ml-20 pb-0">
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2 text-lg`}>
                    主导产品UI设计，制定产品设计视觉风格、界面设计规范等，包括小程序界面设计（B端产品及C端产品）、PC端系统设计、产品官网设计等；
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2 text-lg`}>
                    线上线下推广及运营设计；
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2 text-lg`}>
                    参与用户研究和产品分析，跟踪评估产品体验并推动优化；
                    </p>
                  </div>
                </div>
              </div>
              
              {/* 第三个活动 */}
              <div className={`grid grid-cols-12 py-7 pb-5 px-8 gap-0 border-b ${isDarkTheme ? 'border-[#222222] bg-[#171717]' : 'border-gray-200 bg-white'}`}>
                <div className="col-span-5 flex flex-col items-start justify-center pr-0 mr-0 pl-8">
                  <div className="w-full">
                    <h3 className={`font-bold text-2xl mb-3 text-left ${isDarkTheme ? 'text-white' : 'text-gray-800'} font-['PingFang SC', sans-serif]`}>北京**科技有限公司</h3>
                    <div className="flex justify-start">
                      <span className={`${isDarkTheme ? 'bg-green-500 bg-opacity-60' : 'bg-[#26BF73]'} text-sm px-3 py-1 text-white font-medium rounded`}>UI/UE设计高级项目主管</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-start -ml-28">
                  <div className={`text-text-gray flex flex-col justify-center h-full px-0 ${!isDarkTheme && 'text-gray-700'}`}>
                    <div>
                      <span className={`block text-base text-left ${!isDarkTheme && 'text-gray-600'}`}>山东</span>
                      <span className={`block text-text-gray/70 text-sm text-left ${!isDarkTheme && 'text-gray-600'}`}>2017.05 - 2018.10</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 flex">
                  <div className="-mr-10 flex-1 pr-[40px] -ml-20 pb-0">
                    <div className="flex mb-2">
                      <div className="w-[260px]">
                        <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} text-lg`}>
                          平面设计课程教学
                        </p>
                      </div>
                      <div>
                        <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} text-lg`}>
                          WEB页面课程教学
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      <div className="w-[260px]">
                        <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} text-lg`}>
                          UI/UE设计课程教学
                        </p>
                      </div>
                      <div>
                        <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} text-lg`}>
                          课程案例研发
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 第四个活动 - 新增 */}
              <div className={`grid grid-cols-12 py-7 pb-5 px-8 gap-0 ${isDarkTheme ? 'bg-[#121212]' : 'bg-gray-50'} rounded-b-xl`}>
                <div className="col-span-5 flex flex-col items-start justify-center pr-0 mr-0 pl-8">
                  <div className="w-full">
                    <h3 className={`font-bold text-2xl mb-3 text-left ${isDarkTheme ? 'text-white' : 'text-gray-800'} font-['PingFang SC', sans-serif]`}>**北京文化咨询有限公司</h3>
                    <div className="flex justify-start">
                      <span className={`${isDarkTheme ? 'bg-green-500 bg-opacity-60' : 'bg-[#26BF73]'} text-sm px-3 py-1 text-white font-medium rounded`}>平面兼UI设计师</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 flex justify-start -ml-28">
                  <div className={`text-text-gray flex flex-col justify-center h-full px-0 ${!isDarkTheme && 'text-gray-700'}`}>
                    <div>
                      <span className={`block text-base text-left ${!isDarkTheme && 'text-gray-600'}`}>北京</span>
                      <span className={`block text-text-gray/70 text-sm text-left ${!isDarkTheme && 'text-gray-600'}`}>2012.07 - 2017.04</span>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-5 flex">
                  <div className="-mr-10 flex-1 pr-[40px] -ml-20 pb-0">
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2 text-lg`}>
                    主要负责LOGO设计、展览展册设计、画册设计、海报设计、包装设计、吉祥物设计、景区纪念品开发设计、水立方项目展览策划及设计；。
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2 text-lg`}>
                    全面负责产品界面设计、产品官网设计、线上线下推广设计、VI系统设计、海报设计
                    </p>
                    <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-2 text-lg`}>
                    全面负责景区手绘地图开发及项目对接、创意方案制作等；
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* APP设计部分 */}
        <div className="w-full mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-['PingFang SC', sans-serif]">APP设计</h2>
            <div className="flex space-x-2">
              <button 
                className="p-1 rounded-full bg-card hover:bg-card-border transition-colors"
                onClick={() => scrollContainer(appDesignRef, 'left')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="p-1 rounded-full bg-card hover:bg-card-border transition-colors"
                onClick={() => scrollContainer(appDesignRef, 'right')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div ref={appDesignRef} className="flex space-x-6 min-w-max">
              {appDesignProjects.map((project, index) => (
                <div key={project.id} className="w-72 flex-shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 网站设计部分 */}
        <div className="w-full mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-['PingFang SC', sans-serif]">网站设计</h2>
            <div className="flex space-x-2">
              <button 
                className="p-1 rounded-full bg-card hover:bg-card-border transition-colors"
                onClick={() => scrollContainer(webDesignRef, 'left')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="p-1 rounded-full bg-card hover:bg-card-border transition-colors"
                onClick={() => scrollContainer(webDesignRef, 'right')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div className="w-full mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-['PingFang SC', sans-serif]">大屏设计</h2>
            <div className="flex space-x-2">
              <button 
                className="p-1 rounded-full bg-card hover:bg-card-border transition-colors"
                onClick={() => scrollContainer(dashboardDesignRef, 'left')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="p-1 rounded-full bg-card hover:bg-card-border transition-colors"
                onClick={() => scrollContainer(dashboardDesignRef, 'right')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div className="w-full mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-['PingFang SC', sans-serif]">其他设计</h2>
            <div className="flex space-x-2">
              <button 
                className="p-1 rounded-full bg-card hover:bg-card-border transition-colors"
                onClick={() => scrollContainer(otherDesignRef, 'left')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button 
                className="p-1 rounded-full bg-card hover:bg-card-border transition-colors"
                onClick={() => scrollContainer(otherDesignRef, 'right')}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        
        {/* 联系部分 - 更加明显 */}
        <div className={`w-full py-16 px-8 rounded-2xl mb-16 text-center ${isDarkTheme ? 'bg-card' : 'bg-gray-50'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-['PingFang SC', sans-serif]">对我的作品感兴趣？</h2>
          <p className={`mb-8 text-lg max-w-2xl mx-auto ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`}>如果您对我的作品有任何疑问或合作意向，请随时联系我。我期待能与您一起合作，为您的项目带来独特的设计价值。</p>
          <div className="flex justify-center">
            <button
              onClick={() => setShowContactInfo(!showContactInfo)}
              className="inline-block px-6 py-3 rounded-md transition-colors duration-300 bg-primary text-white hover:bg-[#1DA651]"
            >
              查看联系方式
            </button>
          </div>
          
          {showContactInfo && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className={`${isDarkTheme ? 'bg-dark' : 'bg-white'} text-white rounded-xl shadow-xl max-w-4xl w-full p-8 mx-4`}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold font-['PingFang SC', sans-serif]">联系方式</h3>
                  <button 
                    onClick={() => setShowContactInfo(false)}
                    className={`text-text-gray hover:text-white ${!isDarkTheme && 'text-gray-700 hover:text-gray-900'}`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-12 items-center md:items-start">
                  {/* 左侧：微信二维码 */}
                  <div className="text-center mb-8 md:mb-0">
                    <p className={`font-medium ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-4 text-lg`}>扫码添加微信</p>
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
                    <p className={`font-medium ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-4 text-lg`}>邮箱联系</p>
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
                          邮箱已复制到剪贴板
                        </div>
                      )}
                    </div>
                    <div className="mt-6">
                      <p className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} mb-4 text-lg`}>备用邮箱:</p>
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
                      点击邮箱地址可复制，欢迎随时联系我讨论合作事宜
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
              <h3 className="font-bold mb-4 text-lg font-['PingFang SC', sans-serif]">我的文章</h3>
              <ul className="space-y-2">
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>设计思维</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>UI/UX 趋势</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>设计案例分析</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>团队协作</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg font-['PingFang SC', sans-serif]">我的产品</h3>
              <ul className="space-y-2">
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>设计资源</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>UI 组件库</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>设计工具</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>课程与教程</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg font-['PingFang SC', sans-serif]">关联内容</h3>
              <ul className="space-y-2">
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>我的博客</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>设计分享</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>技术笔记</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>行业见解</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4 text-lg font-['PingFang SC', sans-serif]">社交媒体</h3>
              <ul className="space-y-2">
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>Dribbble</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>Behance</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>LinkedIn</Link></li>
                <li><Link href="#" className={`${isDarkTheme ? 'text-text-gray' : 'text-gray-700'} hover:text-secondary text-base`}>Instagram</Link></li>
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
      
      {/* 底部版权条 - 放在容器外，固定在页面底部 */}
      <div className="w-full py-5 bg-black text-text-gray text-center text-sm mt-12 border-t border-card-border">
        <div className="w-4/5 mx-auto">
          <p>© {new Date().getFullYear()} 我的设计作品集. 保留所有权利.</p>
        </div>
      </div>
    </div>
  );
}
