'use client';

import React, { useState } from 'react';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';

interface AIToolProps {
  name: string;
  description: string;
  logo: string;
  category: string;
  link: string;
  pricing: string;
  features: string[];
}

const AIToolCard = ({ name, description, logo, category, link, pricing, features }: AIToolProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center mb-4">
          <div className="relative w-12 h-12 mr-4">
            <Image
              src={logo}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <div className="flex space-x-2 mt-1">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{category}</span>
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{pricing}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      
      <div className="p-6 flex-grow">
        <h4 className="text-sm font-medium mb-3">主要功能</h4>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex text-sm text-gray-600">
              <span className="text-primary mr-2">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-4 border-t">
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full flex justify-center items-center py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors"
        >
          访问官网
        </a>
      </div>
    </div>
  );
};

export default function AITools() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['全部', '图像生成', '文本生成', '视频生成', '生产力工具', '创意工具', '编程辅助', 'AI应用'];
  
  const aiTools = [
    {
      name: 'Midjourney',
      description: '基于AI的图像生成工具，可创建高质量的艺术图像和插画，通过文字提示创造令人惊艳的视觉内容',
      logo: '/images/midjourney-logo.png',
      category: '图像生成',
      link: 'https://www.midjourney.com/',
      pricing: '付费',
      features: [
        '高质量图像生成',
        '丰富的艺术风格',
        'Discord集成',
        '自定义参数调整',
      ],
    },
    {
      name: 'ChatGPT',
      description: '强大的AI语言模型，可进行对话、写作、编程辅助等，广泛应用于各种文本生成和智能对话场景',
      logo: '/images/chatgpt-logo.png',
      category: '文本生成',
      link: 'https://chat.openai.com/',
      pricing: '免费/付费',
      features: [
        '智能对话能力',
        '文本生成和编辑',
        '编程辅助',
        '翻译和总结',
      ],
    },
    {
      name: 'Runway',
      description: '视频生成和编辑的AI工具，适合创意视频制作，提供从文本到视频、图像到视频等多种功能',
      logo: '/images/runway-logo.png',
      category: '视频生成',
      link: 'https://runwayml.com/',
      pricing: '付费',
      features: [
        '文本生成视频',
        '图像到视频转换',
        '视频编辑和特效',
        '绿幕抠像',
      ],
    },
    {
      name: 'Stable Diffusion',
      description: '开源的AI图像生成工具，可本地部署使用，适合需要隐私保护和自定义开发的用户',
      logo: '/images/stable-diffusion-logo.png',
      category: '图像生成',
      link: 'https://stability.ai/',
      pricing: '免费/开源',
      features: [
        '本地部署',
        '高度可定制',
        '社区驱动模型',
        '持续更新改进',
      ],
    },
    {
      name: 'Notion AI',
      description: '集成在Notion中的AI写作助手，提高工作效率，协助创建文档、总结内容和生成各类文案',
      logo: '/images/notion-ai-logo.png',
      category: '生产力工具',
      link: 'https://www.notion.so/',
      pricing: '付费',
      features: [
        '文档撰写辅助',
        '内容总结和扩展',
        '多种语言支持',
        '与Notion无缝集成',
      ],
    },
    {
      name: 'Adobe Firefly',
      description: 'Adobe推出的AI创意工具，可生成和编辑图像，专为创意专业人士设计，与Adobe生态系统集成',
      logo: '/images/adobe-firefly-logo.png',
      category: '创意工具',
      link: 'https://www.adobe.com/products/firefly.html',
      pricing: '付费',
      features: [
        '文本到图像生成',
        '风格转换',
        '与Adobe软件集成',
        '商业使用许可',
      ],
    },
    {
      name: 'GitHub Copilot',
      description: '由OpenAI和GitHub合作开发的AI编程助手，通过上下文理解提供代码建议，提高开发效率',
      logo: '/images/github-copilot-logo.png',
      category: '编程辅助',
      link: 'https://github.com/features/copilot',
      pricing: '付费',
      features: [
        '实时代码建议',
        '多种编程语言支持',
        'IDE集成',
        '持续学习改进',
      ],
    },
    {
      name: 'Perplexity AI',
      description: '基于AI的搜索引擎，可以回答复杂问题并提供准确的信息源，帮助用户获取高质量的信息',
      logo: '/images/perplexity-logo.png',
      category: 'AI应用',
      link: 'https://www.perplexity.ai/',
      pricing: '免费/付费',
      features: [
        '实时搜索',
        '信息源引用',
        '对话式交互',
        '深度研究功能',
      ],
    },
    {
      name: 'DALL-E',
      description: 'OpenAI开发的图像生成模型，能够根据文本描述创建多样且创新的图像，支持多种艺术风格',
      logo: '/images/dalle-logo.png',
      category: '图像生成',
      link: 'https://openai.com/dall-e-3',
      pricing: '付费',
      features: [
        '高精度文本到图像转换',
        '多种风格支持',
        '编辑和修改功能',
        '商业用途许可',
      ],
    },
    {
      name: 'Otter.ai',
      description: '语音转文字和会议记录工具，能够实时记录会议内容，提供智能摘要和关键点识别',
      logo: '/images/otter-logo.png',
      category: '生产力工具',
      link: 'https://otter.ai/',
      pricing: '免费/付费',
      features: [
        '实时语音转文字',
        '会议记录和摘要',
        '多人发言识别',
        '关键点提取',
      ],
    },
    {
      name: 'Descript',
      description: '音频和视频编辑平台，使用AI技术简化编辑过程，包括音频转录、视频编辑和内容创作工具',
      logo: '/images/descript-logo.png',
      category: '视频生成',
      link: 'https://www.descript.com/',
      pricing: '免费/付费',
      features: [
        '文本编辑视频',
        '音频转录和编辑',
        '去除语气词功能',
        '屏幕录制和编辑',
      ],
    },
    {
      name: 'Jasper',
      description: '面向营销人员和内容创作者的AI写作工具，可快速生成各类营销文案和内容，提高内容创作效率',
      logo: '/images/jasper-logo.png',
      category: '文本生成',
      link: 'https://www.jasper.ai/',
      pricing: '付费',
      features: [
        '营销文案生成',
        '多种内容模板',
        '多语言支持',
        '品牌声音定制',
      ],
    },
  ];
  
  // Filter tools based on category and search query
  const filteredTools = aiTools
    .filter(tool => activeCategory === '全部' || tool.category === activeCategory)
    .filter(tool => 
      searchQuery === '' || 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <main className="min-h-screen">
      <Nav />
      
      <section className="mt-16 py-12 bg-blue-50">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI工具导航</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            精选优质AI工具，助你提升工作效率和创意表达
          </p>
        </div>
      </section>
      
      <section className="py-12">
        <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div className="mb-4 md:mb-0 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      activeCategory === category 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <AIToolCard key={index} {...tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">没有找到符合条件的AI工具</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 