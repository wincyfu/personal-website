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
  const isDarkTheme = themeContext?.isDarkTheme || true; // 默认为深色主题
  
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 筛选类别列表
  const categories = [
    { id: 'all', name: '全部' },
    { id: 'mobile', name: '移动端设计', filter: ['UI设计', '移动应用'] },
    { id: 'web', name: '网站设计', filter: ['产品设计', 'AIGC'] },
    { id: 'dashboard', name: '大屏设计', filter: ['教育科技', '大屏设计'] },
    { id: 'other', name: '其他设计', exclude: ['UI设计', '移动应用', '产品设计', 'AIGC', '教育科技', '大屏设计'] }
  ];

  // 为每个项目添加月份和日期
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  
  // 模拟作者数据
  const authors = [
    { name: "Tracy Rivera", image: "/images/avatar1.jpg" },
    { name: "Yannick Lorenz", image: "/images/avatar2.jpg" },
    { name: "Anna Kowalker", image: "/images/avatar3.jpg" },
    { name: "Jean Loh", image: "/images/avatar4.jpg" },
    { name: "Uros Mikic", image: "/images/avatar5.jpg" },
    { name: "Chiara Akisita", image: "/images/avatar6.jpg" },
  ];
  
  // 筛选项目
  useEffect(() => {
    let result = projects;
    
    // 先按类别筛选
    if (activeFilter !== 'all') {
      const category = categories.find(c => c.id === activeFilter);
      if (category) {
        if (category.filter) {
          result = projects.filter(project => 
            category.filter!.includes(project.category)
          );
        } else if (category.exclude) {
          result = projects.filter(project => 
            !category.exclude!.includes(project.category)
          );
        }
      }
    }
    
    // 再按搜索词筛选
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
      );
    }
    
    setFilteredProjects(result);
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 导航栏 */}
      <Nav />
      
      <div className="container mx-auto px-8 pt-24 pb-20">
        {/* 页面标题和搜索框 */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
          <h1 className="text-5xl font-bold mb-8 md:mb-0">Browse all livestreams</h1>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[300px] bg-[#121212] border border-gray-700 rounded-lg py-3 px-12 text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* 项目网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            // 为每个项目生成随机日期
            const now = new Date();
            const months = index % 12;
            const day = Math.max(1, Math.min(28, (index * 7) % 28));
            const monthName = monthNames[(now.getMonth() - months + 12) % 12];
            
            // 随机获取一个或两个作者
            const authorCount = (index % 3 === 0) ? 2 : 1;
            const projectAuthors = [];
            for (let i = 0; i < authorCount; i++) {
              projectAuthors.push(authors[(index + i) % authors.length]);
            }
            
            return (
              <div key={project.id} className="group cursor-pointer">
                <Link href={`/projects/${project.id}`} className="block h-full">
                  <article className="bg-transparent">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                      <Image 
                        src={project.imageUrl} 
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 px-2 py-1 bg-pink-600 text-white text-xs font-medium rounded">
                        LIVESTREAM
                      </div>
                    </div>
                    
                    <div className="pt-4 pb-2">
                      {/* 日期和项目标题 */}
                      <div className="mb-2">
                        <div className="mb-1 uppercase text-xs tracking-wider text-gray-400">
                          {monthName} {day}
                        </div>
                        <h2 className="text-2xl font-bold leading-tight group-hover:text-blue-400 transition-colors duration-200">
                          {index < 3 ? (
                            // 前三个项目使用图片中的标题
                            ["New Partner Program", "Component slots & shareable Libraries", "Enterprise mindset with Uros Mikic"][index]
                          ) : (
                            project.title
                          )}
                        </h2>
                      </div>
                      
                      {/* 作者信息 */}
                      <div className="flex items-center mt-4">
                        {projectAuthors.map((author, idx) => (
                          <div key={idx} className={`flex items-center ${idx > 0 ? 'ml-4' : ''}`}>
                            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                            </div>
                            <div className="ml-2">
                              <div className="text-xs text-gray-400">{author.name}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
        
        {/* 无结果提示 */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg font-medium mb-2">没有找到相关项目</p>
            <p className="text-sm text-gray-400 mb-6">请尝试其他筛选条件</p>
            <button
              onClick={() => {setActiveFilter('all'); setSearchQuery('');}}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-[#1DA651] transition-colors duration-300"
            >
              查看全部项目
            </button>
          </div>
        )}
        
        {/* 返回作品集按钮 */}
        <div className="mt-16">
          <Link 
            href="/portfolio-x7y9z" 
            className="inline-flex items-center px-6 py-3 rounded-md transition-colors duration-300 bg-[#121212] hover:bg-[#1a1a1a]"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            返回作品集
          </Link>
        </div>
      </div>
    </div>
  );
}