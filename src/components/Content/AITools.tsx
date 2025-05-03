import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

interface AIToolCardProps {
  name: string;
  description: string;
  logo: string;
  category: string;
  link: string;
}

const AIToolCard = ({ name, description, logo, category, link }: AIToolCardProps) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`${isDarkTheme ? 'bg-dark' : 'bg-white'} rounded-xl p-6 ${isDarkTheme ? 'shadow-dark' : 'shadow-md'} hover:shadow-lg transition-shadow flex flex-col h-full`}
    >
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
          <h3 className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-dark'}`}>{name}</h3>
          <span className={`text-xs px-2 py-1 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'} rounded-full`}>{category}</span>
        </div>
      </div>
      <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-sm flex-grow`}>{description}</p>
      <div className="mt-4 text-primary text-sm font-medium">访问官网 →</div>
    </a>
  );
};

const AITools = () => {
  const { isDarkTheme } = useTheme();
  
  const aiTools = [
    {
      name: 'Midjourney',
      description: '基于AI的图像生成工具，可创建高质量的艺术图像和插画',
      logo: '/images/midjourney-logo.png',
      category: '图像生成',
      link: 'https://www.midjourney.com/',
    },
    {
      name: 'ChatGPT',
      description: '强大的AI语言模型，可进行对话、写作、编程辅助等',
      logo: '/images/chatgpt-logo.png',
      category: '文本生成',
      link: 'https://chat.openai.com/',
    },
    {
      name: 'Runway',
      description: '视频生成和编辑的AI工具，适合创意视频制作',
      logo: '/images/runway-logo.png',
      category: '视频生成',
      link: 'https://runwayml.com/',
    },
    {
      name: 'Stable Diffusion',
      description: '开源的AI图像生成工具，可本地部署使用',
      logo: '/images/stable-diffusion-logo.png',
      category: '图像生成',
      link: 'https://stability.ai/',
    },
    {
      name: 'Notion AI',
      description: '集成在Notion中的AI写作助手，提高工作效率',
      logo: '/images/notion-ai-logo.png',
      category: '生产力工具',
      link: 'https://www.notion.so/',
    },
    {
      name: 'Adobe Firefly',
      description: 'Adobe推出的AI创意工具，可生成和编辑图像',
      logo: '/images/adobe-firefly-logo.png',
      category: '创意工具',
      link: 'https://www.adobe.com/products/firefly.html',
    },
  ];

  return (
    <section className="py-16">
      <div className="container-safe">
        <h2 className={`text-[40px] font-bold font-['PingFang_SC'] mb-[10px] text-center ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
          AI工具推荐
        </h2>
        <p className={`text-[18px] font-['PingFang_SC'] mb-16 text-center ${isDarkTheme ? 'text-white/50' : 'text-dark/50'}`}>
          精选高效实用的AI工具，助您提升工作效率
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool, index) => (
            <AIToolCard key={index} {...tool} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a 
            href="/ai-tools"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium"
          >
            查看更多AI工具
          </a>
        </div>
      </div>
    </section>
  );
};

export default AITools; 