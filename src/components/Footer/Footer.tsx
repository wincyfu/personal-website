'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <footer className={`${isDarkTheme ? 'bg-darker' : 'bg-gray-100'} py-2 sm:py-3 md:py-4 text-center transition-colors duration-300`}>
      <div className="max-w-[1440px] mx-auto">
        <p className={`text-[8px] sm:text-xs md:text-sm ${isDarkTheme ? 'text-text-gray' : 'text-gray-500'}`}>
          © 2025 WincyFu. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 