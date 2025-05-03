'use client';

import React from 'react';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import { useTheme } from '@/contexts/ThemeContext';

export default function KnowledgePage() {
  const { isDarkTheme } = useTheme();
  
  return (
    <main className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'} w-full min-h-screen transition-colors duration-300`}>
      <Nav />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 mt-16">
        <div className="text-center mb-12 pt-16">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
            AI知识库
          </h1>
          <p className={`text-lg ${isDarkTheme ? 'text-white/60' : 'text-gray-600'}`}>
            收集和整理AI领域的各种实用知识和最佳实践
          </p>
        </div>
        
        {/* 知识分类 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* 生成式AI */}
          <div className={`p-6 rounded-xl ${isDarkTheme ? 'bg-darker' : 'bg-gray-50'} shadow-sm`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>生成式AI基础</h2>
            <ul className={`space-y-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• 大型语言模型（LLM）原理</li>
              <li>• Prompt Engineering技巧</li>
              <li>• 文本、图像、视频生成技术</li>
              <li>• AI内容创作最佳实践</li>
            </ul>
          </div>
          
          {/* AI开发 */}
          <div className={`p-6 rounded-xl ${isDarkTheme ? 'bg-darker' : 'bg-gray-50'} shadow-sm`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>AI开发与应用</h2>
            <ul className={`space-y-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• AI辅助编程技巧</li>
              <li>• API集成与开发</li>
              <li>• AI应用架构设计</li>
              <li>• 模型微调与部署</li>
            </ul>
          </div>
          
          {/* AI工具 */}
          <div className={`p-6 rounded-xl ${isDarkTheme ? 'bg-darker' : 'bg-gray-50'} shadow-sm`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>AI工具与资源</h2>
            <ul className={`space-y-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
              <li>• AI创作工具指南</li>
              <li>• 模型评估与选择</li>
              <li>• 开源AI资源库</li>
              <li>• 学习路径与课程推荐</li>
            </ul>
          </div>
        </div>
        
        {/* 近期更新 */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkTheme ? 'text-white' : 'text-dark'}`}>近期知识更新</h2>
          <div className="space-y-8">
            {/* 文章1 */}
            <div className={`p-6 rounded-xl ${isDarkTheme ? 'bg-darker' : 'bg-gray-50'} shadow-sm`}>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
                    如何使用Claude 3 Opus提升创意工作流程
                  </h3>
                  <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    探索Claude 3 Opus的高级功能，从文案创作到代码优化，全面提升创意工作效率。
                  </p>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${isDarkTheme ? 'bg-gray-800 text-white/80' : 'bg-gray-200 text-gray-800'}`}>
                      生成式AI
                    </span>
                    <span className="text-xs text-gray-500 ml-4">2023年6月15日</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-4 py-2 rounded-lg ${isDarkTheme ? 'bg-[#22c45e]/20 text-[#22c45e]' : 'bg-[#22c45e]/20 text-[#22c45e]'}`}>
                    即将推出
                  </span>
                </div>
              </div>
            </div>
            
            {/* 文章2 */}
            <div className={`p-6 rounded-xl ${isDarkTheme ? 'bg-darker' : 'bg-gray-50'} shadow-sm`}>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
                    AI辅助编程：从初学者到专家的实用技巧
                  </h3>
                  <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    全面介绍如何利用AI工具加速编程开发，包括代码生成、调试和优化最佳实践。
                  </p>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${isDarkTheme ? 'bg-gray-800 text-white/80' : 'bg-gray-200 text-gray-800'}`}>
                      AI开发
                    </span>
                    <span className="text-xs text-gray-500 ml-4">2023年6月10日</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-4 py-2 rounded-lg ${isDarkTheme ? 'bg-[#22c45e]/20 text-[#22c45e]' : 'bg-[#22c45e]/20 text-[#22c45e]'}`}>
                    即将推出
                  </span>
                </div>
              </div>
            </div>
            
            {/* 文章3 */}
            <div className={`p-6 rounded-xl ${isDarkTheme ? 'bg-darker' : 'bg-gray-50'} shadow-sm`}>
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
                    Prompt工程师指南：如何设计高效的提示词
                  </h3>
                  <p className={`mb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    深入解析提示词工程的原理和技巧，掌握与AI高效沟通的方法和结构化提示模板。
                  </p>
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${isDarkTheme ? 'bg-gray-800 text-white/80' : 'bg-gray-200 text-gray-800'}`}>
                      Prompt Engineering
                    </span>
                    <span className="text-xs text-gray-500 ml-4">2023年6月5日</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-4 py-2 rounded-lg ${isDarkTheme ? 'bg-[#22c45e]/20 text-[#22c45e]' : 'bg-[#22c45e]/20 text-[#22c45e]'}`}>
                    即将推出
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 订阅更新 */}
        <div className={`p-8 rounded-xl mb-16 text-center ${isDarkTheme ? 'bg-darker' : 'bg-gray-50'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
            订阅AI知识更新
          </h2>
          <p className={`mb-6 max-w-2xl mx-auto ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            输入您的邮箱，获取最新AI知识和实践案例的更新通知
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="您的邮箱地址"
              className={`flex-1 px-4 py-3 rounded-lg ${
                isDarkTheme 
                  ? 'bg-darker border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
              } border outline-none focus:ring-2 focus:ring-primary`}
            />
            <button
              className={`px-6 py-3 rounded-lg font-medium transition-all bg-[#22c45e] text-white hover:bg-[#1eb554]`}
            >
              订阅
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 