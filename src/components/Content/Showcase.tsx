import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@/contexts/ThemeContext';

interface ShowcaseCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const ShowcaseCard = ({ title, description, imageSrc }: ShowcaseCardProps) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <div className={`rounded-xl overflow-hidden ${isDarkTheme ? 'bg-dark' : 'bg-white'} ${isDarkTheme ? 'shadow-dark' : 'shadow-md'} hover:scale-105 transition-transform duration-300`}>
      <div className="h-48 overflow-hidden">
        <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>{title}</h3>
        <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
      </div>
    </div>
  );
};

const Showcase = () => {
  const { isDarkTheme } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const showcaseItems = [
    {
      title: "AI驱动的网站生成器",
      description: "只需描述您的需求，AI将为您创建完整的响应式网站。",
      imageSrc: "/images/showcase1.jpg"
    },
    {
      title: "智能内容管理系统",
      description: "利用AI自动组织和优化您的网站内容，提高用户体验。",
      imageSrc: "/images/showcase2.jpg"
    },
    {
      title: "个性化学习平台",
      description: "AI分析学习行为，提供定制化的学习路径和资源推荐。",
      imageSrc: "/images/showcase3.jpg"
    }
  ];

  return (
    <section className="py-16">
      <div className="container-safe">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            hidden: { opacity: 0, y: 50 }
          }}
        >
          <h2 className={`text-[40px] font-bold font-['PingFang_SC'] mb-[10px] text-center ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
            案例展示
          </h2>
          <p className={`text-[18px] font-['PingFang_SC'] mb-16 text-center ${isDarkTheme ? 'text-white/50' : 'text-dark/50'}`}>
            探索我们的AI驱动项目，了解创新的可能性
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseItems.map((item, index) => (
              <ShowcaseCard 
                key={index}
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/case-studies"
              className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              查看更多案例
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase; 