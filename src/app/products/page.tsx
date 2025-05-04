'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import TranslatedText from '@/components/TranslatedText';

interface ProductProps {
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  link: string;
  imageOnRight?: boolean;
}

const ProductSection = ({ title, description, features, imageSrc, link, imageOnRight = true }: ProductProps) => {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  
  return (
    <div className={`py-16 border-b ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'} last:border-b-0`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className={`order-2 ${imageOnRight ? 'md:order-1' : 'md:order-2'}`}>
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} mb-6`}>{description}</p>
          
          <h3 className="text-xl font-semibold mb-3">{isEnglish ? 'Main Features' : '主要功能'}</h3>
          <ul className="mb-8 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <Link 
            href={link}
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium"
          >
            {isEnglish ? 'Learn More' : '了解更多'}
          </Link>
        </div>
        
        <div className={`order-1 ${imageOnRight ? 'md:order-2' : 'md:order-1'} relative h-[250px] md:h-[300px] w-full max-w-[90%] mx-auto rounded-xl overflow-hidden`}>
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default function Products() {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  
  const products = [
    {
      title: isEnglish ? 'AI ID Photo' : 'AI证件照',
      description: isEnglish 
        ? 'An intelligent ID photo generation tool that allows users to upload a regular photo and generate standard ID photos that meet various document requirements with one click'
        : '一款智能证件照生成工具，让用户仅需上传一张普通照片，便可一键生成符合多种证件要求的标准证件照',
      features: isEnglish ? [
        'Automatically recognize portraits and precisely cut out',
        'Multiple size specifications to meet different document requirements',
        'Intelligent adjustment of lighting and expressions',
        'Customizable background colors and effects',
        'One-click export in multiple sizes',
      ] : [
        '自动识别人像并精准抠图',
        '多种尺寸规格满足不同证件需求',
        '智能调整光线和表情',
        '自定义背景颜色和效果',
        '一键导出多种尺寸',
      ],
      imageSrc: '/images/ai-photo-detail.jpg',
      link: '/products/ai-photo',
      imageOnRight: true
    },
    {
      title: isEnglish ? 'AI Fashion Assistant' : '织间集AI搭配助手',
      description: isEnglish 
        ? 'An AI-based outfit recommendation app that allows users to upload photos of their clothes and receive daily intelligent outfit suggestions to create a personalized outfit inspiration list'
        : '一款基于人工智能的穿搭推荐App，用户只需上传自己的衣物照片，即可获得每日智能穿搭建议，打造专属穿搭灵感清单',
      features: isEnglish ? [
        'Digital management of personal wardrobe',
        'Intelligent matching based on occasions and weather',
        'Style analysis and personalized recommendations',
        'Real-time updates on fashion trends',
        'Outfit history recording and collection features',
      ] : [
        '个人衣橱数字化管理',
        '基于场合和天气的智能搭配',
        '风格分析和个性化建议',
        '流行趋势实时更新',
        '搭配历史记录和收藏功能',
      ],
      imageSrc: '/images/ai-fashion-detail.jpg',
      link: '/products/ai-fashion',
      imageOnRight: false
    },
    {
      title: isEnglish ? 'AI Mini Games' : 'AI小游戏',
      description: isEnglish 
        ? 'A collection of AI-based interactive mini-games that provide fun entertainment experiences while showcasing innovative applications of AI technology'
        : '基于人工智能的互动小游戏集合，提供有趣的娱乐体验，同时展示AI技术的创新应用',
      features: isEnglish ? [
        'AI battle mode, challenge AI opponents of different difficulties',
        'Intelligently generated game scenes and characters',
        'Real-time voice interaction functionality',
        'Personalized gaming experience',
        'Multiplayer online interaction mode',
      ] : [
        'AI对战模式，挑战不同难度的AI对手',
        '智能生成的游戏场景和角色',
        '实时语音交互功能',
        '个性化游戏体验',
        '多人在线互动模式',
      ],
      imageSrc: '/images/ai-game-detail.jpg',
      link: '/products/ai-game',
      imageOnRight: true
    }
  ];

  return (
    <main className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'} w-full min-h-screen transition-colors duration-300`}>
      <Nav />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 mt-16">
        <div className="text-center mb-12 pt-16">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
            <TranslatedText textKey="products.title" />
          </h1>
          <p className={`text-lg ${isDarkTheme ? 'text-white/60' : 'text-gray-600'}`}>
            <TranslatedText textKey="products.subtitle" />
          </p>
        </div>
      
        {products.map((product, index) => (
          <ProductSection key={index} {...product} />
        ))}
      </div>
      
      <Footer />
    </main>
  );
} 