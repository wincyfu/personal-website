'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';

export default function About() {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const elementsRef = {
    bio: useRef<HTMLDivElement>(null),
    skillsTitle: useRef<HTMLHeadingElement>(null),
    skills: useRef<HTMLUListElement>(null),
    contactText: useRef<HTMLParagraphElement>(null),
  };

  useEffect(() => {
    // 页面加载后直接设置元素可见
    setContentVisible(true);
    
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

  const skills = [
    { 
      skill: isEnglish ? "UI/UX Design" : "UI/UX设计", 
      icon: "🎨" 
    },
    { 
      skill: isEnglish ? "Product Design & Development" : "产品设计开发运营", 
      icon: "🤖" 
    },
    { 
      skill: isEnglish ? "Content Creator" : "自媒体博主", 
      icon: "📝" 
    },
    { 
      skill: isEnglish ? "AIGC Explorer" : "AIGC 各领域探索者", 
      icon: "🖼️" 
    },
    { 
      skill: isEnglish ? "LoRA Model Training" : " LoRA 模型训练", 
      icon: "💻" 
    },
    { 
      skill: isEnglish ? "Independent Designer/Creator" : "独立设计师/创作者", 
      icon: "🔍" 
    },
    { 
      skill: isEnglish ? "Digital Nomad in Progress" : "数字游民进化中", 
      icon: "🌍" 
    },
    { 
      skill: isEnglish ? "Curious Explorer" : "各种感兴趣的探索", 
      icon: "🧠" 
    }
  ];

  return (
    <div className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'} w-full min-h-screen flex flex-col transition-colors duration-300`}>
      <Nav />
      
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 mt-16">
        <section ref={sectionRef} className="py-10 md:py-20 overflow-hidden">
          <div 
            className={`${contentVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} 
            ref={elementsRef.bio}
          >
            <div className="lg:flex gap-8 items-start mb-12">
              <div className="lg:w-1/3 mb-6 lg:mb-0">
                <div className={`relative w-full aspect-square mb-4 rounded-xl overflow-hidden ${isDarkTheme ? 'border-dark' : 'border-gray-200'} border-4 shadow-lg transform hover:rotate-2 transition-transform duration-300`}>
                  <Image 
                    src={isDarkTheme ? "/images/ai-logo-placeholder.svg" : "/images/ai-logo-placeholder.svg"} 
                    alt="WincyFu" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-2/3">
                <div className="text-lg mb-6">
                  <span className="font-bold text-primary text-xl mb-4 block">
                    💻  {isEnglish ? "Design Domain Expert" : "设计领域深耕者"}
                  </span>
                  <ul className="list-disc pl-5 space-y-3 mt-3">
                    <li>
                      {isEnglish 
                        ? "Host of 'FuTalk Design Diary', focusing on AI interaction, user experience, and tool efficiency. Published over 100 episodes of in-depth content."
                        : "《FuTalk设计日记》主理人，专注于AI交互、用户体验、工具效率等领域，持续发布深度内容，累计发布超100期。"
                      }
                    </li>
                    <li>
                      {isEnglish 
                        ? "Led design for 10+ APP projects covering B2B, B2C, and G2C platforms, implementing complete 0-to-1 multi-platform design workflows."
                        : "主导设计10余款APP项目，涵盖B端、C端与G端，实现多端设计从0到1全流程。"
                      }
                    </li>
                  </ul>
                </div>
                
                <div className="text-lg mb-6">
                  <span className="font-bold text-primary text-xl mb-4 block">
                    📚  {isEnglish ? "AIGC Content Evangelist" : "AIGC内容布道者"}
                  </span>
                  <ul className="list-disc pl-5 space-y-3 mt-3">
                    <li>
                      {isEnglish 
                        ? "Annual Creator at Uisdc, Rising Star at Zcool, Top 1 Popular Winner in Banyu Picture Book AIGC Competition."
                        : "优设年度创作者，站酷得火之星，伴鱼绘本AIGC大赛人气Top1。"
                      }
                    </li>
                    <li>
                      {isEnglish 
                        ? "Authored 10+ AIGC practical tutorials, contributed to AI drawing software course creativity and development, covering beginner to advanced levels."
                        : "撰写10余篇AIGC实践教程，助力AI绘图软件课程创意及研发，覆盖入门到进阶课程。"
                      }
                    </li>
                    <li>
                      {isEnglish 
                        ? "Published 30+ viral posts and AIGC tutorials on Xiaohongshu, exploring AIGC knowledge popularization and practical applications."
                        : "累计小红书发布30余篇爆款笔记及AIGC教程，探索更多AIGC知识普及与应用落地。"
                      }
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h2 
              ref={elementsRef.skillsTitle}
              className={`${contentVisible ? 'opacity-100' : 'opacity-0'} text-2xl font-bold mt-12 mb-6 ${isDarkTheme ? 'text-white' : 'text-dark'} transition-opacity duration-500`}
            >
              {isEnglish ? "Areas of Expertise" : "擅长领域"}
            </h2>
            
            <ul 
              ref={elementsRef.skills}
              className={`${contentVisible ? 'opacity-100' : 'opacity-0'} grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 transition-opacity duration-500`}
            >
              {skills.map((item, index) => (
                <li 
                  key={index} 
                  className={`flex items-center p-4 rounded-lg ${isDarkTheme ? 'bg-darker' : 'bg-gray-100'} hover:shadow-md transition-shadow duration-200`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <span className="text-2xl mr-3">{item.icon}</span>
                  <span className={`${isDarkTheme ? 'text-white' : 'text-dark'} font-medium`}>{item.skill}</span>
                </li>
              ))}
            </ul>
            
            <p 
              ref={elementsRef.contactText}
              className={`${contentVisible ? 'opacity-100' : 'opacity-0'} text-sm mt-16 mb-26 p-4 border-l-4 border-primary bg-primary/15 rounded transition-opacity duration-500`}
            >
              {isEnglish 
                ? "Whether you're curious about AI, passionate about design, or looking for a collaboration partner, feel free to reach out anytime. Maybe we can create something amazing together!"
                : "不管你是好奇AI，还是热爱设计，或者正在寻找合作伙伴，欢迎随时联系我，也许我们可以一起创造点不一样的东西！"
              }
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}