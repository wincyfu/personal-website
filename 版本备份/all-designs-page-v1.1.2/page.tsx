'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProjectView } from '@/contexts/ProjectViewContext';
import { projects } from '@/data/portfolio';
import { getTranslatedText } from '@/utils/translations';
import Link from 'next/link';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import SpotlightCard from '@/components/UI/SpotlightCard';
import ProjectDetailModal from '@/components/UI/ProjectDetailModal';

export default function AllDesignsPage() {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const { getViewCount, incrementViewCount } = useProjectView();
  
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // 分类定义
  const categories = [
    { id: 'all', name: isEnglish ? 'All Projects' : '全部项目' },
    { 
      id: 'mobile', 
      name: isEnglish ? 'Mobile Design' : '移动端设计', 
      projectIds: ['project-1', 'project-2', 'project-3', 'project-4', 'project-5', 'project-6', 'project-7', 'project-8']
    },
    { 
      id: 'web', 
      name: isEnglish ? 'Website Design' : '网站/后台设计', 
      projectIds: ['project-9', 'project-10']
    },
    { 
      id: 'dashboard', 
      name: isEnglish ? 'Dashboard Design' : '大屏设计', 
      projectIds: ['project-11', 'project-12', 'project-12-1']
    },
    { 
      id: 'other', 
      name: isEnglish ? 'Other Design' : '其他设计', 
      projectIds: ['project-13', 'project-14', 'project-15']
    }
  ];

  // 筛选项目
  useEffect(() => {
    let result = projects;
    
    if (activeFilter !== 'all') {
      const category = categories.find(c => c.id === activeFilter);
      if (category && category.projectIds) {
        result = projects.filter(project => 
          category.projectIds!.includes(project.id)
        );
      }
    }
    
    setFilteredProjects(result);
  }, [activeFilter, isEnglish]);

  // 处理项目卡片点击
  const handleCardClick = (e: React.MouseEvent, project: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    setSelectedProject(project);
    setShowModal(true);
  };

  // 关闭弹窗
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // 根据项目ID获取专属标签
  const getProjectTags = (projectId: string) => {
    switch (projectId) {
      case 'project-1':
        return [
          { key: 'portfolio.tagFrom0to1', text: getTranslatedText('portfolio.tagFrom0to1', isEnglish) },
          { key: 'portfolio.tagCEnd', text: getTranslatedText('portfolio.tagCEnd', isEnglish) }
        ];
      case 'project-2':
        return [
          { key: 'portfolio.tagAIMedical', text: getTranslatedText('portfolio.tagAIMedical', isEnglish) },
          { key: 'portfolio.tagSmartMedical', text: getTranslatedText('portfolio.tagSmartMedical', isEnglish) }
        ];
      case 'project-3':
        return [
          { key: 'portfolio.tagLowCarbon', text: getTranslatedText('portfolio.tagLowCarbon', isEnglish) },
          { key: 'portfolio.tagEnterpriseB', text: getTranslatedText('portfolio.tagEnterpriseB', isEnglish) },
          { key: 'portfolio.tagMVPExplore', text: getTranslatedText('portfolio.tagMVPExplore', isEnglish) }
        ];
      case 'project-4':
        return [
          { key: 'portfolio.tagMultiRole', text: getTranslatedText('portfolio.tagMultiRole', isEnglish) },
          { key: 'portfolio.tagChildHealth', text: getTranslatedText('portfolio.tagChildHealth', isEnglish) }
        ];
      case 'project-5':
        return [
          { key: 'portfolio.tagVisionControl', text: getTranslatedText('portfolio.tagVisionControl', isEnglish) },
          { key: 'portfolio.tagBCEnd', text: getTranslatedText('portfolio.tagBCEnd', isEnglish) }
        ];
      case 'project-6':
        return [
          { key: 'portfolio.tagChineseStyle', text: getTranslatedText('portfolio.tagChineseStyle', isEnglish) },
          { key: 'portfolio.tagCEnd', text: getTranslatedText('portfolio.tagCEnd', isEnglish) }
        ];
      case 'project-7':
        return [
          { key: 'portfolio.tagInterestSocial', text: getTranslatedText('portfolio.tagInterestSocial', isEnglish) },
          { key: 'portfolio.tagOnlineOffline', text: getTranslatedText('portfolio.tagOnlineOffline', isEnglish) }
        ];
      case 'project-8':
        return [
          { key: 'portfolio.tagRepairPlatform', text: getTranslatedText('portfolio.tagRepairPlatform', isEnglish) },
          { key: 'portfolio.tagWorkOrderLoop', text: getTranslatedText('portfolio.tagWorkOrderLoop', isEnglish) }
        ];
      case 'project-9':
        return [
          { key: 'portfolio.tagMultiRole', text: getTranslatedText('portfolio.tagMultiRole', isEnglish) },
          { key: 'portfolio.tagIntegratedPlatform', text: getTranslatedText('portfolio.tagIntegratedPlatform', isEnglish) }
        ];
      case 'project-10':
        return [
          { key: 'portfolio.tagMultiIndustryWeb', text: getTranslatedText('portfolio.tagMultiIndustryWeb', isEnglish) },
          { key: 'portfolio.tagWebDisplay', text: getTranslatedText('portfolio.tagWebDisplay', isEnglish) }
        ];
      case 'project-11':
        return [
          { key: 'portfolio.tagUrbanConstruction', text: getTranslatedText('portfolio.tagUrbanConstruction', isEnglish) },
          { key: 'portfolio.tagSmartConstruction', text: getTranslatedText('portfolio.tagSmartConstruction', isEnglish) }
        ];
      case 'project-12':
        return [
          { key: 'portfolio.tagOperationLoop', text: getTranslatedText('portfolio.tagOperationLoop', isEnglish) },
          { key: 'portfolio.tagDeviceLifecycle', text: getTranslatedText('portfolio.tagDeviceLifecycle', isEnglish) }
        ];
      case 'project-12-1':
        return [
          { key: 'portfolio.tagMultiIndustryData', text: getTranslatedText('portfolio.tagMultiIndustryData', isEnglish) },
          { key: 'portfolio.tagDataDriven', text: getTranslatedText('portfolio.tagDataDriven', isEnglish) }
        ];
      case 'project-13':
        return [
          { key: 'portfolio.tagBrandDesign', text: getTranslatedText('portfolio.tagBrandDesign', isEnglish) },
          { key: 'portfolio.tagChildEducation', text: getTranslatedText('portfolio.tagChildEducation', isEnglish) }
        ];
      case 'project-14':
        return [
          { key: 'portfolio.tagIPImage', text: getTranslatedText('portfolio.tagIPImage', isEnglish) },
          { key: 'portfolio.tagVisualExtension', text: getTranslatedText('portfolio.tagVisualExtension', isEnglish) }
        ];
      case 'project-15':
        return [
          { key: 'portfolio.tagDesignSystem', text: getTranslatedText('portfolio.tagDesignSystem', isEnglish) },
          { key: 'portfolio.tagTeamCollaboration', text: getTranslatedText('portfolio.tagTeamCollaboration', isEnglish) }
        ];
      default:
        return [];
    }
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* 导航栏 */}
      <Nav />
      
      <div className="container mx-auto max-w-[1200px] px-6 pt-24 pb-20">
        {/* 页面标题和返回按钮 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-['PingFang SC', sans-serif]">
              {getTranslatedText('portfolio.allDesigns', isEnglish)}
            </h1>
            <p className={`text-lg ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} max-w-2xl`}>
              {isEnglish 
                ? 'Browse all design projects across different categories and discover the complete portfolio of work.'
                : '浏览所有设计项目，涵盖不同类别，探索完整的作品集。'
              }
            </p>
          </div>
          
          <Link 
            href="/portfolio-x7y9z" 
            className={`mt-6 md:mt-0 inline-flex items-center px-6 py-3 rounded-md transition-colors duration-300 ${
              isDarkTheme 
                ? 'bg-[#171717] hover:bg-[#222222] text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {isEnglish ? 'Back to Portfolio' : '返回作品集'}
          </Link>
        </div>

        {/* 筛选标签 */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-primary text-white'
                  : isDarkTheme
                    ? 'bg-[#171717] text-gray-300 hover:bg-[#222222]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer" onClick={(e) => handleCardClick(e, project)}>
              <SpotlightCard 
                className={`rounded-lg h-full flex flex-col ${
                  isDarkTheme 
                    ? 'bg-[#171717] text-white' 
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
                spotlightColor={isDarkTheme ? "rgba(41, 255, 153, 0.1)" : "rgba(38, 191, 115, 0.1)"}
              >
                <div className="pt-[16px] px-[14px] pb-0">
                  <div className="relative h-[180px] overflow-hidden rounded-lg">
                    <img 
                      src={project.imageUrl.startsWith('/') ? `.${project.imageUrl}` : `./${project.imageUrl}`} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        console.error(`卡片图片加载失败: ${project.imageUrl}`);
                        e.currentTarget.src = './images/placeholder.png';
                      }}
                    />
                  </div>
                </div>
                <div className="p-4 flex flex-col h-full">
                  <h3 className={`font-bold text-[24px] mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
                    {isEnglish ? (project.titleEn || project.title) : project.title}
                  </h3>
                  
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {getProjectTags(project.id).map((tag, index) => (
                      <span 
                        key={index}
                        className="text-[12px] px-2 py-1 rounded-md text-[#22c45e]" 
                        style={{ backgroundColor: 'rgba(34, 196, 94, 0.2)' }}
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>
                  
                  <p className={`text-[14px] flex-grow line-clamp-3 ${
                    isDarkTheme ? 'text-gray-300/70' : 'text-gray-600/70'
                  }`}>
                    {isEnglish ? (project.descriptionEn || project.description) : project.description}
                  </p>
                  
                  <div className={`text-[11px] mt-5 ${
                    isDarkTheme ? 'text-white/50' : 'text-gray-500'
                  }`}>
                    {/* 项目时间硬编码部分 - 与作品集页面保持一致 */}
                    {project.id === 'project-1' ? (isEnglish ? 'Project Time: 2019.12-2020.10' : '项目时间：2019.12-2020.10') : 
                     project.id === 'project-2' ? (isEnglish ? 'Project Time: 2025.03' : '项目时间：2025.03') :
                     project.id === 'project-3' ? (isEnglish ? 'Project Time: 2024.03' : '项目时间：2024.03') :
                     project.id === 'project-4' ? (isEnglish ? 'Project Time: 2018.10-2019.06' : '项目时间：2018.10-2019.06') :
                     project.id === 'project-5' ? (isEnglish ? 'Project Time: 2024.06-2024.08' : '项目时间：2024.06-2024.08') :
                     project.id === 'project-6' ? (isEnglish ? 'Project Time: 2020.04-2020.05' : '项目时间：2020.04-2020.05') :
                     project.id === 'project-7' ? (isEnglish ? 'Project Time: 2020.12-2021.02' : '项目时间：2020.12-2021.02') :
                     project.id === 'project-8' ? (isEnglish ? 'Project Time: 2022.02-2022.03' : '项目时间：2022.02-2022.03') :
                     `${isEnglish ? 'Project Time' : '项目时间'}: ${project.date}`}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
        
        {/* 无结果提示 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-medium mb-2">
              {isEnglish ? 'No projects found' : '没有找到相关项目'}
            </p>
            <p className={`text-sm mb-6 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              {isEnglish ? 'Try selecting a different category' : '请尝试选择其他类别'}
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-[#1DA651] transition-colors duration-300"
            >
              {isEnglish ? 'View All Projects' : '查看全部项目'}
            </button>
          </div>
        )}
      </div>

      {/* 项目详情弹窗 */}
      {showModal && selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={showModal}
          onClose={handleCloseModal}
          currentProjectId={selectedProject.id}
        />
      )}

      {/* 底部 */}
      <Footer />
    </div>
  );
}