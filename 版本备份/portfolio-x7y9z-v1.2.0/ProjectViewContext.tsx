'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProjectViewCounts {
  [projectId: string]: number;
}

interface ProjectViewContextType {
  viewCounts: ProjectViewCounts;
  incrementViewCount: (projectId: string) => void;
  getViewCount: (projectId: string) => number;
}

const ProjectViewContext = createContext<ProjectViewContextType>({
  viewCounts: {},
  incrementViewCount: () => {},
  getViewCount: () => 0,
});

export const useProjectView = () => useContext(ProjectViewContext);

export const ProjectViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewCounts, setViewCounts] = useState<ProjectViewCounts>({});
  const [isClient, setIsClient] = useState(false);

  // 在组件挂载时标记为客户端环境
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 在客户端环境中，从localStorage读取浏览记录
  useEffect(() => {
    if (isClient) {
      try {
        const currentVersion = '1.1.2'; // 当前版本
        const storedVersion = localStorage.getItem('projectViewCountsVersion');
        const storedCounts = localStorage.getItem('projectViewCounts');
        
        // 如果版本不匹配，清除旧数据
        if (storedVersion !== currentVersion) {
          localStorage.removeItem('projectViewCounts');
          localStorage.setItem('projectViewCountsVersion', currentVersion);
          setViewCounts({});
        } else if (storedCounts) {
          const parsedCounts = JSON.parse(storedCounts);
          setViewCounts(parsedCounts);
        }
      } catch (error) {
        console.error('无法从本地存储读取项目浏览记录', error);
      }
    }
  }, [isClient]);

  // 当浏览记录变化时更新本地存储（仅在客户端）
  useEffect(() => {
    if (isClient && Object.keys(viewCounts).length > 0) {
      try {
        localStorage.setItem('projectViewCounts', JSON.stringify(viewCounts));
      } catch (error) {
        console.error('无法将项目浏览记录写入本地存储', error);
      }
    }
  }, [viewCounts, isClient]);

  // 获取项目的初始浏览次数
  const getInitialViewCount = (projectId: string) => {
    const initialCounts: { [key: string]: number } = {
      'project-1': 2347,   // 好旅程项目
      'project-2': 2156,   // AI健康助手
      'project-3': 2089,   // ECOGO环保回收项目
      'project-4': 2234,   // 儿宝管家项目
      'project-5': 2067,   // 近视无忧项目
      'project-6': 2178,   // 锦礼商城项目
      'project-7': 2123,   // VAV交友
      'project-8': 2098,   // 速速修项目
      'project-9': 2145,   // 幼儿园管理系统
      'project-10': 2134,  // 官网设计合集
      'project-11': 2112,  // 项目管理大屏
      'project-12': 2087,  // 运维管理大屏
      'project-12-1': 2076, // 大屏设计合集
      'project-13': 2165,  // LOGO设计-知之教育
      'project-14': 2143,  // IP设计合集
      'project-15': 2128,  // 组件库建立
    };
    return initialCounts[projectId] || 2000;
  };

  // 增加指定项目的浏览次数
  const incrementViewCount = (projectId: string) => {
    setViewCounts(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || getInitialViewCount(projectId)) + 1
    }));
  };

  // 获取指定项目的浏览次数
  const getViewCount = (projectId: string) => {
    return viewCounts[projectId] || getInitialViewCount(projectId);
  };

  return (
    <ProjectViewContext.Provider value={{ 
      viewCounts, 
      incrementViewCount, 
      getViewCount 
    }}>
      {children}
    </ProjectViewContext.Provider>
  );
}; 