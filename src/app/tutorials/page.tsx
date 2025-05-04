'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import useWechatArticles from '@/hooks/useWechatArticles';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import TranslatedText from '@/components/TranslatedText';

export default function TutorialsPage() {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const { articles, loading, error } = useWechatArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // 提取所有可用的类别
  const categories = articles.length > 0 
    ? Array.from(new Set(articles.map(article => article.category)))
    : [];
    
  // 过滤文章
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'} w-full min-h-screen transition-colors duration-300`}>
      <Nav />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 mt-16">
        <div className="text-center mb-12 pt-16">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
            <TranslatedText textKey="tutorials.title" />
          </h1>
          <p className={`text-lg ${isDarkTheme ? 'text-white/60' : 'text-gray-600'}`}>
            <TranslatedText textKey="tutorials.subtitle" />
          </p>
        </div>
        
        {/* 搜索和筛选 */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={isEnglish ? "Search articles..." : "搜索文章..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg ${
                  isDarkTheme 
                    ? 'bg-darker border-gray-700 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
                } border outline-none focus:ring-2 focus:ring-primary`}
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full md:w-auto px-4 py-3 rounded-lg ${
                  isDarkTheme 
                    ? 'bg-darker border-gray-700 text-white' 
                    : 'bg-white border-gray-200 text-gray-800'
                } border outline-none focus:ring-2 focus:ring-primary`}
              >
                <option value="">{isEnglish ? "All Categories" : "所有分类"}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* 错误消息 */}
        {error && (
          <div className={`text-center mb-8 p-4 rounded-lg ${isDarkTheme ? 'bg-red-900/20 text-red-200' : 'bg-red-100 text-red-600'}`}>
            {error}
          </div>
        )}
        
        {/* 文章列表 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`${isDarkTheme ? 'bg-darker' : 'bg-white'} rounded-xl overflow-hidden shadow-md`}>
                <div className={`w-full h-48 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'} animate-pulse`}></div>
                <div className="p-6">
                  <div className="mb-3">
                    <div className={`w-20 h-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'} rounded-full animate-pulse`}></div>
                  </div>
                  <div className={`w-full h-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'} rounded mb-2 animate-pulse`}></div>
                  <div className={`w-full h-6 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'} rounded mb-2 animate-pulse`}></div>
                  <div className={`w-2/3 h-4 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'} rounded mt-4 animate-pulse`}></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <a 
                key={article.id}
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`block ${isDarkTheme ? 'bg-darker' : 'bg-white'} rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1`}
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image 
                    src={article.coverImg} 
                    alt={article.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 ${isDarkTheme ? 'bg-gray-800 text-white/80' : 'bg-gray-100 text-gray-800'} rounded-full`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.publishDate}</span>
                  </div>
                  <h3 className={`font-semibold text-lg mb-2 line-clamp-2 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
                    {article.title}
                  </h3>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-sm line-clamp-2`}>
                    {article.excerpt}
                  </p>
                  <div className="mt-4 text-primary text-sm font-medium">
                    {isEnglish ? "Read More →" : "阅读全文 →"}
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className={`text-center p-12 ${isDarkTheme ? 'text-white/60' : 'text-gray-600'}`}>
            {isEnglish ? "No articles found matching your criteria" : "没有找到符合条件的文章"}
          </div>
        )}
        
        {/* 查看更多教程 */}
        <div className="text-center mt-16 mb-16">
          <a 
            href="https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzAxMzcxNzQxNw==&action=getalbum&album_id=2891855147943968770#wechat_redirect"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-8 py-3 rounded-lg font-medium transition-all ${
              isDarkTheme 
                ? 'bg-[#22c45e] text-white hover:bg-[#1eb554]' 
                : 'bg-[#22c45e] text-white hover:bg-[#1eb554]'
            }`}
          >
            {isEnglish ? "View More Tutorials" : "查看更多教程"}
          </a>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 