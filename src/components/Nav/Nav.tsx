'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePathname } from 'next/navigation';
import { getTranslatedText } from '@/utils/translations';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isDarkTheme, toggleTheme } = useTheme();
  const { isEnglish, toggleLanguage } = useLanguage();
  const pathname = usePathname();
  
  const navItems = [
    { name: getTranslatedText('nav.home', isEnglish), href: '/' },
    { name: getTranslatedText('nav.about', isEnglish), href: '/about' },
    { name: getTranslatedText('nav.products', isEnglish), href: '/products' },
    { name: getTranslatedText('nav.tutorials', isEnglish), href: '/tutorials' },
    { name: getTranslatedText('nav.knowledge', isEnglish), href: '/knowledge' }
  ];

  // 检测滚动状态，添加背景模糊效果
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-black h-16 fixed top-0 z-50 transition-all duration-300 w-full
                   ${scrolled ? 'backdrop-blur-md bg-opacity-90 shadow-md' : ''}`}>
      <div className="flex justify-between items-center h-full w-full max-w-[1920px] mx-auto px-4 md:px-[270px]">
        {/* Logo - Left Side */}
        <Link href="/" className="flex-shrink-0">
          <div className="relative h-10 w-auto">
            <Image 
              src="/images/logo.svg"
              alt="WincyFu Logo" 
              width={40}
              height={40}
              priority
              className="object-contain"
            />
          </div>
        </Link>
        
        {/* Navigation Menu - Right Side */}
        <div className="flex items-center">
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = 
                item.href === '/' 
                  ? pathname === '/' 
                  : (pathname === item.href || 
                    (item.href !== '/' && pathname?.startsWith(item.href)));
              
              return (
                <li key={item.name} className="relative group">
                  <Link 
                    href={item.href}
                    className={`text-base relative py-1 px-0.5 transition-all duration-300 font-['PingFang_SC']
                              ${isActive 
                                ? 'text-secondary font-normal' 
                                : 'text-white hover:text-secondary font-normal'
                              }
                            `}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-secondary transition-all duration-300"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage} 
            aria-label={getTranslatedText('nav.languageSwitch', isEnglish)}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110 bg-white text-dark ml-4"
          >
            {isEnglish ? '中' : 'EN'}
          </button>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            aria-label={getTranslatedText('nav.themeSwitch', isEnglish)}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110 bg-white text-dark ml-4"
          >
            {isDarkTheme ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 