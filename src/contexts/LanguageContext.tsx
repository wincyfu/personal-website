'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

type LanguageContextType = {
  isEnglish: boolean;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // 初始状态为中文
  const [isEnglish, setIsEnglish] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 标记组件已挂载
    setMounted(true);
    
    // 从localStorage读取语言设置
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setIsEnglish(savedLanguage === 'en');
    } else {
      // 默认为中文
      localStorage.setItem('language', 'zh');
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = !isEnglish;
    setIsEnglish(newLanguage);
    // 保存到localStorage
    localStorage.setItem('language', newLanguage ? 'en' : 'zh');
    // 更新html lang属性
    document.documentElement.lang = newLanguage ? 'en' : 'zh-CN';
  };

  // 当组件还未挂载时，使用默认语言以避免水合不匹配
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ isEnglish: false, toggleLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ isEnglish, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 