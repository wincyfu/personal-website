'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Nav from '@/components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';

interface SocialMediaProps {
  name: string;
  icon: string;
  qrCode: string;
  link: string;
}

const SocialMediaCard = ({ name, icon, qrCode, link }: SocialMediaProps) => {
  const { isDarkTheme } = useTheme();
  return (
    <div className={`${isDarkTheme ? 'bg-darker text-white' : 'bg-white'} rounded-xl shadow-md p-6 flex flex-col items-center`}>
      <div className="relative w-16 h-16 mb-4">
        <Image 
          src={icon} 
          alt={name} 
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-lg font-medium mb-2">{name}</h3>
      <div className="relative w-32 h-32 mb-3">
        <Image 
          src={qrCode} 
          alt={`${name} QR Code`} 
          fill
          className="object-contain"
        />
      </div>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-primary hover:underline text-sm"
      >
        打开链接
      </a>
    </div>
  );
};

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
  rows?: number;
}

const FormField = ({ 
  label, 
  id, 
  type = 'text', 
  placeholder = '', 
  required = false,
  value,
  onChange,
  isTextarea = false,
  rows = 4
}: FormFieldProps) => {
  const { isDarkTheme } = useTheme();
  return (
    <div className="mb-6">
      <label htmlFor={id} className={`block mb-2 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows}
          className={`w-full px-4 py-3 border ${isDarkTheme ? 'bg-dark border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          type={type}
          id={id}
          className={`w-full px-4 py-3 border ${isDarkTheme ? 'bg-dark border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'} rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors`}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default function Contact() {
  const { isDarkTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend here
    console.log('Form data:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };
  
  const socialMedia = [
    {
      name: '微信',
      icon: '/images/wechat-icon.png',
      qrCode: '/images/wechat-qr.png',
      link: '#',
    },
    {
      name: '小红书',
      icon: '/images/xiaohongshu-icon.png',
      qrCode: '/images/xiaohongshu-qr.png',
      link: 'https://www.xiaohongshu.com/user/profile/54e5db132e1d937e9a6902f7',
    },
    {
      name: '公众号',
      icon: '/images/wechat-mp-icon.png',
      qrCode: '/images/wechat-mp-qr.png',
      link: '#',
    },
    {
      name: '知乎',
      icon: '/images/zhihu-icon.png',
      qrCode: '/images/zhihu-qr.png',
      link: '#',
    },
  ];

  return (
    <main className={`${isDarkTheme ? 'bg-dark text-white' : 'bg-white text-dark'} 
                    w-full min-h-screen transition-colors duration-300`}>
      <Nav />
      
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12 mt-16">
        <div className="text-center mb-12 pt-16">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>
            联系我
          </h1>
          <p className={`text-lg ${isDarkTheme ? 'text-white/60' : 'text-gray-600'}`}>
            通过以下方式联系我，进行合作洽谈或提出您的建议和问题
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>关注我的社交媒体</h2>
            <div className="grid grid-cols-2 gap-6">
              {socialMedia.map((platform, index) => (
                <SocialMediaCard key={index} {...platform} />
              ))}
            </div>
            
            <div className="mt-12">
              <h2 className={`text-2xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>联系方式</h2>
              <div className={`${isDarkTheme ? 'bg-darker' : 'bg-white'} rounded-xl shadow-md p-6`}>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>电子邮件</p>
                    <p className="font-medium">contact@wincyfu.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>位置</p>
                    <p className="font-medium">中国，上海</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkTheme ? 'text-white' : 'text-dark'}`}>发送消息</h2>
            <div className={`${isDarkTheme ? 'bg-darker' : 'bg-white'} rounded-xl shadow-md p-8`}>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">消息已发送</h3>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>谢谢您的留言，我会尽快回复您！</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormField 
                    label="姓名"
                    id="name"
                    placeholder="请输入您的姓名"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <FormField 
                    label="电子邮件"
                    id="email"
                    type="email"
                    placeholder="请输入您的电子邮件地址"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <FormField 
                    label="主题"
                    id="subject"
                    placeholder="请输入消息主题"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  <FormField 
                    label="消息内容"
                    id="message"
                    placeholder="请输入您的消息内容"
                    required
                    isTextarea
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                  />
                  <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    发送消息
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 