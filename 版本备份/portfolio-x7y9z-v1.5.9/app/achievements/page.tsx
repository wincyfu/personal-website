'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';

interface StatProps {
  value: string;
  label: string;
  description: string;
}

const Stat = ({ value, label, description }: StatProps) => {
  const { isDarkTheme } = useTheme();
  return (
    <div className={`${isDarkTheme ? 'bg-darker text-white' : 'bg-white'} rounded-xl shadow-md p-6 text-center`}>
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="text-xl font-medium mb-3">{label}</div>
      <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{description}</p>
    </div>
  );
};

interface SocialPostProps {
  title: string;
  excerpt: string;
  imageSrc: string;
  likes: number;
  views: number;
  link: string;
  platform: string;
  date: string;
}

const SocialPost = ({ title, excerpt, imageSrc, likes, views, link, platform, date }: SocialPostProps) => {
  const { isDarkTheme } = useTheme();
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <div className={`${isDarkTheme ? 'bg-darker text-white' : 'bg-white'} rounded-xl shadow-md overflow-hidden flex h-full hover:shadow-lg transition-shadow`}>
        <div className="relative w-1/3 min-h-[180px]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-5 w-2/3">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${isDarkTheme ? 'bg-dark' : 'bg-gray-100'} px-2 py-1 rounded-full`}>{platform}</span>
            <span className={`${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{date}</span>
          </div>
          <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>
          <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-3`}>{excerpt}</p>
          <div className={`flex text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} space-x-4`}>
            <span>👍 {likes}</span>
            <span>👁️ {views}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function Achievements() {
  const [filter, setFilter] = useState('全部');
  const { isDarkTheme } = useTheme();
  
  const stats = [
    { 
      value: '80+', 
      label: 'AI文章/图文教程', 
      description: '在各大平台发布的AI工具使用教程和实践案例' 
    },
    { 
      value: '100+', 
      label: 'AIGC周刊', 
      description: '持续更新的AI生成内容领域每周精选资讯' 
    },
    { 
      value: '10k+', 
      label: '全网关注粉丝', 
      description: '跨平台关注者总数，包括小红书、知乎、公众号等' 
    },
    { 
      value: '10+', 
      label: '品牌合作', 
      description: '与AI相关产品和服务提供商的商业合作' 
    },
  ];

  const socialPosts = [
    {
      title: '7个让你效率翻倍的AI工具推荐',
      excerpt: '这些AI工具可以大幅提升你的工作效率，特别是第5个几乎改变了我的整个工作流程。每天节省2小时的工作时间，让创意工作更加高效。',
      imageSrc: '/images/post-1.jpg',
      likes: 1250,
      views: 15000,
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
      platform: '小红书',
      date: '2024-02-15',
    },
    {
      title: 'Midjourney提示词模板分享：5分钟生成专业级插画',
      excerpt: '分享我总结的一套Midjourney提示词模板，按照这个公式可以快速生成高质量插画。无需设计背景，也能创作出令人惊艳的作品。',
      imageSrc: '/images/post-2.jpg',
      likes: 980,
      views: 12300,
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
      platform: '小红书',
      date: '2024-01-28',
    },
    {
      title: '设计师如何用AI辅助日常工作？这是我的完整工作流',
      excerpt: '作为设计师，这是我如何将AI融入日常工作流程，大大提高了创意和执行效率。从构思到实现，AI在每个环节都能提供强大支持。',
      imageSrc: '/images/post-3.jpg',
      likes: 850,
      views: 10500,
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
      platform: '小红书',
      date: '2024-01-10',
    },
    {
      title: 'ChatGPT高级使用技巧：如何写出更精准的提示词',
      excerpt: '提高ChatGPT输出质量的关键在于提示词工程，这篇文章详细介绍了我总结的提示词框架和实用技巧，帮助你获得更精准的AI回复。',
      imageSrc: '/images/post-4.jpg',
      likes: 760,
      views: 9200,
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
      platform: '知乎',
      date: '2023-12-20',
    },
    {
      title: 'AI生成艺术作品的版权问题探讨',
      excerpt: '随着AI创作工具的普及，版权问题日益凸显。本文从法律和伦理角度探讨AI生成内容的归属权，以及创作者应当注意的关键问题。',
      imageSrc: '/images/post-5.jpg',
      likes: 680,
      views: 8500,
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
      platform: '知乎',
      date: '2023-11-15',
    },
    {
      title: '我用AI辅助完成的室内设计项目全过程分享',
      excerpt: '从需求分析到最终渲染图，记录我如何利用AI工具辅助完成一个完整的室内设计项目，大幅缩短了设计周期并提升了创意表达。',
      imageSrc: '/images/post-6.jpg',
      likes: 920,
      views: 11200,
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
      platform: '公众号',
      date: '2023-10-28',
    },
  ];

  const platforms = ['全部', '小红书', '知乎', '公众号', 'CSDN', '微博'];
  
  const filteredPosts = filter === '全部' 
    ? socialPosts 
    : socialPosts.filter(post => post.platform === filter);

  return (
    <main className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'} 
                    w-full min-h-screen transition-colors duration-300`}>
      <Nav />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 mt-16">
        <div className="text-center mb-12 pt-16">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
            个人成就
          </h1>
          <p className={`text-lg ${isDarkTheme ? 'text-white/60' : 'text-gray-600'}`}>
            我在AI内容创作和分享领域的主要成就和精选内容
          </p>
        </div>

        <h2 className={`text-2xl font-bold mb-8 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>主要数据</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Stat key={index} {...stat} />
          ))}
        </div>
        
        <h2 className={`text-2xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>精选内容</h2>
        
        <div className="flex flex-wrap justify-start gap-4 mb-8">
          {platforms.map((platform) => (
            <button
              key={platform}
              className={`px-4 py-2 rounded-full ${
                filter === platform 
                  ? 'bg-primary text-white' 
                  : isDarkTheme ? 'bg-darker text-gray-300 hover:bg-gray-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter(platform)}
            >
              {platform}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col space-y-6">
          {filteredPosts.map((post, index) => (
            <SocialPost key={index} {...post} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看我的小红书主页
          </a>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 