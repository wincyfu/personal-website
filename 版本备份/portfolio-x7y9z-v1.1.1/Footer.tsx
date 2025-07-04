'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import TranslatedText from '@/components/TranslatedText';

const Footer = () => {
  const { isDarkTheme } = useTheme();
  
  return (
    <footer className={`${isDarkTheme ? 'bg-darker' : 'bg-gray-100'} py-2 sm:py-3 md:py-4 text-center transition-colors duration-300`}>
      <div className="max-w-[1440px] mx-auto">
        <p className={`text-[8px] sm:text-xs md:text-sm ${isDarkTheme ? 'text-text-gray' : 'text-gray-500'}`}>
          <TranslatedText textKey="footer.copyright" />
        </p>
      </div>
    </footer>
  );
};

export default Footer; 