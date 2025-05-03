'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 初始状态为深色主题
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 标记组件已挂载
    setMounted(true);
    
    // 从localStorage读取主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
    } else {
      // 默认为深色主题
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // 在主题变化时更新body类名
  useEffect(() => {
    if (mounted) {
      if (isDarkTheme) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
    }
  }, [isDarkTheme, mounted]);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    // 保存到localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // 当组件还未挂载时，使用默认主题以避免水合不匹配
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ isDarkTheme: true, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 