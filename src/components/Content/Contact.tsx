'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';

interface SocialPlatform {
  name: string;
  icon: string;
  url: string;
  qrcode?: string;
  amount?: string;
}

const Contact = () => {
  const { isDarkTheme } = useTheme();
  const [activeQRCode, setActiveQRCode] = useState<string | null>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
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
  
  // 添加一个新的自定义样式，采用更强力的手段
  useEffect(() => {
    const addCustomStyle = () => {
      const style = document.createElement('style');
      style.id = 'contact-card-style';
      style.innerHTML = `
        .contact-card-container {
          display: flex !important;
          align-items: center !important;
          padding: 16px !important;
        }
        
        .contact-image-container {
          width: 60px !important;
          height: 60px !important;
          margin-right: 0 !important;
          padding-right: 0 !important;
          background: transparent !important;
          border-radius: 0 !important;
          overflow: visible !important;
          flex-shrink: 0 !important;
        }
        
        .contact-text-container {
          margin-left: 0 !important;
          padding-left: 20px !important;
          text-align: left !important;
          overflow: hidden !important;
        }
        
        .contact-text-container h3 {
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          font-size: 1.25rem !important;
          color: ${isDarkTheme ? 'white' : '#1a1a1a'} !important;
        }
        
        .contact-text-container p {
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          color: ${isDarkTheme ? '#22c45e' : '#26BF73'} !important;
        }
        
        .qrcode-popup {
          position: absolute !important;
          top: -220px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          z-index: 9999 !important;
          display: block !important;
        }
        
        @media (max-width: 768px) {
          .contact-card-container {
            padding: 12px !important;
          }
          
          .contact-image-container {
            width: 50px !important;
            height: 50px !important;
          }
          
          .contact-text-container {
            padding-left: 10px !important;
          }
        }
        
        @media (max-width: 640px) {
          .contact-text-container h3 {
            font-size: 14px !important;
          }
          
          .contact-text-container p {
            font-size: 12px !important;
          }
        }
      `;
      document.head.appendChild(style);
    };
    
    // 如果样式已存在则先移除
    const existingStyle = document.getElementById('contact-card-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    addCustomStyle();
    
    return () => {
      const style = document.getElementById('contact-card-style');
      if (style) {
        style.remove();
      }
    };
  }, [isDarkTheme]);
  
  const platforms: SocialPlatform[] = [
    { 
      name: '微信', 
      icon: '/images/wechat-icon.png', 
      url: 'https://github.com/xianerme',
      qrcode: '/images/wechat-qrcode.png',
      amount: '@WincyFu'
    },
    { 
      name: '微信公众号', 
      icon: '/images/wechatgongzhonghao-icon.png', 
      url: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
      qrcode: '/images/wechatgongzhonghao-qrcode.png',
      amount: '@FuTalk设计日记'
    },
    { 
      name: '小红书', 
      icon: '/images/xiaohongshu-icon.png', 
      url: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
      qrcode: '/images/zhihu-qr.png',
      amount: '@WincyFu'
    },
    { 
      name: '知乎', 
      icon: '/images/zhihu-icon.png',
      url: 'https://www.zhihu.com/people/fu-da-xian',
      amount: '@WincyFu'
    },
    { 
      name: '微博', 
      icon: '/images/weibo.png', 
      url: 'https://m.weibo.cn/profile/1783924480',
      qrcode: '/images/wechat-mp-qr.png',
      amount: '@WincyFu'
    },
    { 
      name: 'CSDN', 
      icon: '/images/csdn.png', 
      url: 'https://blog.csdn.net/aquarius5211?spm=1000.2115.3001.5343',
      qrcode: '/images/wechat-qr.png',
      amount: '@WincyFu'
    },
    { 
      name: 'YouTube', 
      icon: '/images/youtube.png', 
      url: 'https://www.youtube.com/@wincyfu7083',
      qrcode: '/images/csdn-qr.png',
      amount: '@WincyFu'
    }
  ];

  const handleMouseEnter = (platform: SocialPlatform, index: number) => {
    // 只为前两个卡片显示二维码
    if (index < 2 && platform.qrcode) {
      setActiveQRCode(platform.qrcode);
    }
  };

  const handleMouseLeave = () => {
    setActiveQRCode(null);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-8"
    >
      <div className="text-center w-[90%] mx-auto max-w-[1200px]">
        <h2 
          ref={elementsRef.title}
          className={`text-[40px] font-bold font-['PingFang_SC'] mb-[10px] ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white' : 'text-dark'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          与我联系
        </h2>
        <p 
          ref={elementsRef.subtitle}
          className={`text-[18px] font-['PingFang_SC'] mb-[70px] ${isVisible ? '' : 'opacity-0'} ${isDarkTheme ? 'text-white/50' : 'text-dark/50'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          对AI或AIGC相关技术有任何疑问，欢迎随时联系交流与探讨
        </p>
        
        <div 
          ref={elementsRef.content}
          className={`grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 mx-auto ${isVisible ? '' : 'opacity-0'}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          {platforms.slice(0, 4).map((platform, index) => (
            <div 
              key={platform.name}
              className={`relative rounded-xl overflow-visible transition-all duration-300
                ${isDarkTheme ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-[#f5f5f5] hover:bg-[#eaeaea]'}`}
              style={{
                boxShadow: isDarkTheme ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={() => handleMouseEnter(platform, index)}
              onMouseLeave={handleMouseLeave}
            >
              {index < 2 ? (
                // 第一个和第二个卡片不使用Link，只显示内容
                <div className="block cursor-pointer">
                  <div className="contact-card-container">
                    <div className="contact-image-container flex items-center justify-center overflow-hidden">
                      <div className="relative w-full h-full">
                        {platform.icon && (
                          <Image 
                            src={platform.icon}
                            alt={platform.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="contact-text-container">
                      <h3 className="font-medium text-[1.25rem]">
                        {platform.name}
                      </h3>
                      <p className="font-medium">
                        {platform.amount}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                // 第三个和第四个卡片使用Link
                <Link href={platform.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="contact-card-container">
                    <div className="contact-image-container flex items-center justify-center overflow-hidden">
                      <div className="relative w-full h-full">
                        {platform.icon && (
                          <Image 
                            src={platform.icon}
                            alt={platform.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="contact-text-container">
                      <h3 className="font-medium text-[1.25rem]">
                        {platform.name}
                      </h3>
                      <p className="font-medium">
                        {platform.amount}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
              
              {/* QR Code Popup - 只为前两个卡片显示 */}
              {index < 2 && platform.qrcode && activeQRCode === platform.qrcode && (
                <div 
                  ref={qrCodeRef}
                  className="qrcode-popup"
                >
                  <div className={`relative flex flex-col items-center p-4 rounded-xl 
                    ${isDarkTheme ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-800'}`}
                    style={{
                      boxShadow: isDarkTheme ? '0 4px 20px rgba(0, 0, 0, 0.7)' : '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }}
                  >
                    <div className="relative w-36 h-36 mb-2">
                      <Image 
                        src={platform.qrcode}
                        alt={`${platform.name} QR Code`}
                        width={160}
                        height={160}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium">扫描二维码关注</span>
                    
                    {/* Triangle pointer */}
                    <div 
                      className={`absolute bottom-0 left-1/2 w-4 h-4 transform rotate-45 translate-y-1/2 -translate-x-1/2
                        ${isDarkTheme ? 'bg-[#1a1a1a]' : 'bg-white'}`}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* 第二行，3个卡片居中 */}
        <div 
          className={`grid grid-cols-3 gap-x-8 gap-y-16 mx-auto max-w-[75%] ${isVisible ? '' : 'opacity-0'}`}
          style={{ opacity: isVisible ? 1 : 0, marginTop: "32px" }}
        >
          {platforms.slice(4).map((platform, platformIndex) => {
            // 在第二行中，索引值需要加上第一行的长度
            const index = platformIndex + 4;
            return (
              <div 
                key={platform.name}
                className={`relative rounded-xl overflow-visible transition-all duration-300
                  ${isDarkTheme ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-[#f5f5f5] hover:bg-[#eaeaea]'}`}
                style={{
                  boxShadow: isDarkTheme ? '0 4px 6px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={() => handleMouseEnter(platform, index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={platform.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="contact-card-container">
                    <div className="contact-image-container flex items-center justify-center overflow-hidden">
                      <div className="relative w-full h-full">
                        {platform.icon && (
                          <Image 
                            src={platform.icon}
                            alt={platform.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <div className="contact-text-container">
                      <h3 className="font-medium text-[1.25rem]">
                        {platform.name}
                      </h3>
                      <p className="font-medium">
                        {platform.amount}
                      </p>
                    </div>
                  </div>
                </Link>
                
                {/* 第二行的卡片不显示QR Code Popup */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact; 