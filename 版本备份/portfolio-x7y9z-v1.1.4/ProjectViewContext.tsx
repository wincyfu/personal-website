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
        const storedCounts = localStorage.getItem('projectViewCounts');
        if (storedCounts) {
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

  // 增加指定项目的浏览次数
  const incrementViewCount = (projectId: string) => {
    setViewCounts(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 2000) + 1
    }));
  };

  // 获取指定项目的浏览次数
  const getViewCount = (projectId: string) => {
    return viewCounts[projectId] || 2000;
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