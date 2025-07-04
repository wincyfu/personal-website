'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { projects } from '@/data/portfolio';
import Link from 'next/link';
import Image from 'next/image';
import Nav from '@/components/Nav/Nav';

export default function AllDesignsPage() {
  // 解构 isDarkTheme，添加默认值处理
  const themeContext = useTheme();
  const isDarkTheme = themeContext?.isDarkTheme || false;
  
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  // 筛选类别列表
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'mobile', name: '移动端设计', filter: ['UI设计', '移动应用'] },
    { id: 'web', name: '网站设计', filter: ['产品设计', 'AIGC'] },
    { id: 'dashboard', name: '大屏设计', filter: ['教育科技', '大屏设计'] },
    { id: 'other', name: '其他设计', exclude: ['UI设计', '移动应用', '产品设计', 'AIGC', '教育科技', '大屏设计'] }
  ];

  // 处理筛选
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    
    const category = categories.find(cat => cat.id === filterId);
    
    if (filterId === 'all') {
      setFilteredProjects(projects);
    } else if (category?.filter) {
      setFilteredProjects(projects.filter(project => 
        category.filter!.includes(project.category)
      ));
    } else if (category?.exclude) {
      setFilteredProjects(projects.filter(project => 
        !category.exclude!.includes(project.category)
      ));
    }
  };

  // 初始加载时应用全部筛选
  useEffect(() => {
    handleFilterChange('all');
  }, []);

  return (
    <div className={`relative min-h-screen ${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-black'}`}>
      {/* 导航 */}
      <Nav />
      
      <main className="container mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-20">
        {/* 页面标题 */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 font-['PingFang SC', sans-serif]">全部设计作品</h1>
          <p className={`text-lg max-w-3xl mx-auto ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`}>
            汇集移动端、网站、大屏及其他领域的设计作品，展示多元化的设计能力与创意
          </p>
        </div>
        
        {/* 筛选器 */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleFilterChange(category.id)}
              className={`px-5 py-2 rounded-full transition-colors ${
                activeFilter === category.id
                  ? 'bg-primary text-white'
                  : isDarkTheme
                    ? 'bg-card text-text-gray hover:bg-card-hover'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* 作品展示网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`rounded-xl overflow-hidden ${isDarkTheme ? 'bg-card' : 'bg-white border border-gray-200'}`}
            >
              <Link href={`/projects/${project.id}`} className="block h-full">
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
                    <h3 className={`font-bold text-xl ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>{project.title}</h3>
                  </div>
                  <div className="text-[#888888] text-xs mb-3">{new Date().toLocaleDateString()}</div>
                  <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'} line-clamp-2 mb-4`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* 如果没有匹配的项目 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className={`text-xl ${isDarkTheme ? 'text-text-gray' : 'text-gray-700'}`}>
              没有找到符合条件的设计作品
            </p>
          </div>
        )}
        
        {/* 返回按钮 */}
        <div className="mt-16 text-center">
          <Link 
            href="/portfolio-x7y9z" 
            className={`inline-block px-8 py-3 rounded-md transition-colors duration-300 ${
              isDarkTheme 
                ? 'bg-card hover:bg-card-hover text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            返回作品集
          </Link>
        </div>
      </main>
    </div>
  );
} 