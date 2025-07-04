'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectById } from '@/data/portfolio';
import MarkdownRenderer from '@/components/UI/MarkdownRenderer';

export default function ProjectDetail() {
  const { isDarkTheme } = useTheme();
  const params = useParams();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const project = getProjectById(id);
  
  useEffect(() => {
    // 页面加载动画
    setIsVisible(true);
    
    // 如果找不到项目，跳转到作品集首页
    if (!project) {
      router.push('/portfolio-x7y9z');
    }
  }, [project, router]);
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">项目不存在</h1>
          <p className="mb-6">您访问的项目不存在或已被删除</p>
          <Link
            href="/portfolio-x7y9z"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            返回作品集
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`min-h-screen py-10 px-4 sm:px-6 transition-colors duration-300 ${
        isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* 导航链接 */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link 
            href="/portfolio-x7y9z" 
            className={`hover:underline ${
              isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
            } transition-colors duration-200`}
          >
            作品集
          </Link>
          <span className="text-gray-400">/</span>
          <span className="truncate max-w-[200px]">{project.title}</span>
        </div>
      </div>
      
      {/* 项目标题和元信息 */}
      <div 
        className={`max-w-4xl mx-auto mb-8 opacity-0 transform -translate-y-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : ''
        }`}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{project.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className={`px-3 py-1 rounded-full ${
            isDarkTheme ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
          }`}>
            {project.category}
          </div>
          
          <div className={isDarkTheme ? 'text-gray-400' : 'text-gray-500'}>
            {project.date}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className={`px-2 py-0.5 text-sm rounded-full ${
                isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* 项目封面图 */}
      <div 
        className={`max-w-4xl mx-auto mb-12 opacity-0 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100' : ''
        }`}
      >
        <div className="w-full aspect-video relative rounded-xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 mix-blend-multiply"></div>
          {/* 使用占位图，实际使用时替换为真实图片 */}
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-600">
            {project.imageUrl && (
              <Image 
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
                onError={(e) => {
                  // 图片加载失败时的处理
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* 项目内容 */}
      <div 
        className={`max-w-4xl mx-auto mb-16 opacity-0 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100' : ''
        }`}
      >
        <div className={`prose prose-lg max-w-none ${
          isDarkTheme ? 'prose-invert' : ''
        }`}>
          <MarkdownRenderer content={project.content} />
        </div>
      </div>
      
      {/* 返回链接和导航 */}
      <div 
        className={`max-w-4xl mx-auto mt-12 pt-8 border-t ${
          isDarkTheme ? 'border-gray-800' : 'border-gray-200'
        } opacity-0 transition-all duration-700 delay-600 ${
          isVisible ? 'opacity-100' : ''
        }`}
      >
        <div className="flex justify-between items-center">
          <Link
            href="/portfolio-x7y9z"
            className={`inline-flex items-center ${
              isDarkTheme ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'
            } transition-colors duration-200`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path>
            </svg>
            返回作品集
          </Link>
          
          <Link
            href="/contact"
            className={`inline-flex items-center ${
              isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            } transition-colors duration-200`}
          >
            <span>联系我</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
