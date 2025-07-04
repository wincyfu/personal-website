'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import SpotlightCard from '../UI/SpotlightCard';
import TranslatedText from '@/components/TranslatedText';

const About = () => {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const elementsRef = {
    title: useRef<HTMLHeadingElement>(null),
    subtitle: useRef<HTMLParagraphElement>(null),
    content: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 为各元素添加动画
            Object.entries(elementsRef).forEach(([key, ref], index) => {
              if (ref.current) {
                ref.current.classList.add('animate-fadeIn');
                ref.current.style.animationDelay = `${index * 0.2}s`;
              }
            });
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
    Object.entries(elementsRef).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.classList.remove('animate-fadeIn');
        ref.current.style.opacity = '1';
      }
    });
  }, [isDarkTheme]);

  return (
    <section 
      ref={sectionRef} 
      className="py-12 sm:py-16 md:py-20"
      style={{ marginTop: '60px' }}
    >
      <div className="text-center w-[90%] mx-auto max-w-[1200px]">
        <h2 
          ref={elementsRef.title}
          className={`text-[40px] font-bold font-['PingFang_SC'] mb-[10px] ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white' : 'text-dark'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <TranslatedText textKey="about.title" />
        </h2>
        
        <p
          ref={elementsRef.subtitle}
          className={`text-[18px] font-['PingFang_SC'] mb-16 ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white/50' : 'text-dark/50'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {isEnglish 
            ? 'Practitioner of "One Person + AI = One Team", exploring unlimited possibilities of collaboration between individuals and AI'
            : '「一个人 + AI = 一个团队」的践行者，探索个人与AI协作的无限可能'
          }
        </p>
        
        <div 
          ref={elementsRef.content}
          className={`mx-auto max-w-full ${isVisible ? '' : 'opacity-0'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <SpotlightCard 
            className="w-full min-h-[300px]"
            spotlightColor="rgba(41, 255, 153, 0.10)"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-12 px-6 md:px-8 h-full">
              <div className="flex-1 text-left">
                <p className="text-sm sm:text-lg md:text-xl mb-4">
                  {isEnglish 
                    ? (
                      <>Hello👋, I'm <span className={`font-bold ${isDarkTheme ? 'text-secondary' : 'text-[#26BF73]'}`}>WincyFu</span>, an explorer who is passionate about <span className={`font-bold ${isDarkTheme ? 'text-secondary' : 'text-[#26BF73]'}`}>UI/UX design, AIGC practice, content creation, and self-media blogging</span>.</>
                    ) : (
                      <>你好呀👋，我是<span className={`font-bold ${isDarkTheme ? 'text-secondary' : 'text-[#26BF73]'}`}>WincyFu</span>，一名热爱探索的<span className={`font-bold ${isDarkTheme ? 'text-secondary' : 'text-[#26BF73]'}`}>UI/UE设计师、AIGC 实践者 、内容创作者、自媒体小博主</span> 。</>
                    )
                  }
                </p>
                <p className="text-sm sm:text-lg md:text-xl mb-4">
                  {isEnglish 
                    ? '🎨 Specialized in visual communication design, skilled at combining "beautiful" with "useful", polishing every pixel and organizing every logic flow.'
                    : '🎨视觉传达设计专业，擅长将「好看」与「好用」巧妙结合，打磨每一处像素、梳理每一段逻辑。'
                  }
                </p>
                <p className="text-sm sm:text-lg md:text-xl mb-4">
                  {isEnglish 
                    ? '♒️ Aquarius, alternating between INTP and INTJ. Half rational analysis, half wild imagination.'
                    : '♒️水瓶座，在 INTP 与 INTJ 之间来回横跳。一半理性分析，一半天马行空。'
                  }
                </p>
                <p className="text-sm sm:text-lg md:text-xl mb-4">
                  {isEnglish 
                    ? '💡 Passionate about exploring practical applications of AIGC in more scenarios, dedicated to making AI my "entrepreneurial partner" and "work companion".'
                    : '💡 热衷探索 AIGC 在更多场景的落地实践，致力于让AI成为我的"创业搭子"、"工作伙伴"。'
                  }
                </p>
                <p className="text-sm sm:text-lg md:text-xl mb-4">
                  {isEnglish 
                    ? '🧠 Already explored and practiced in LoRA model training, AI/AR tourism, AI video, AI advertising, AI games, AI picture books, AI packaging, AI cultural creativity, and other fields.'
                    : '🧠 已在LoRA模型训练、AI/AR文旅、AI视频、AI广告、AI小游戏、AI绘本、AI包装、AI文创等领域进行多元探索与实践。'
                  }
                </p>
                <p className="text-sm sm:text-lg md:text-xl mb-4">
                  {isEnglish 
                    ? '📱 Currently trying to develop apps with AI assistance, "struggling to give birth", hoping to realize the dream of independent development and free design soon.'
                    : '📱 目前正在尝试 AI 辅助开发App ，"艰难孕育"中，希望早日实现独立开发、自由设计的梦想。'
                  }
                </p>
                <p className="text-sm sm:text-lg md:text-xl">
                  {isEnglish 
                    ? '🤝 If you are interested in design, AIGC, or independent product development, feel free to chat with me. Perhaps we can do something different together!'
                    : '🤝如果你对设计、AIGC或独立产品开发感兴趣，欢迎来找我聊聊，说不定我们可以一起整点不一样的活！'
                  }
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};

export default About; 