import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { marked } from 'marked'; // 需要安装: npm install marked

// 配置marked选项以控制表格和其他大型元素的渲染方式
marked.setOptions({
  breaks: true, // 启用段落内换行
  gfm: true, // 启用GitHub风格Markdown
  headerIds: false, // 禁用标题ID
  mangle: false, // 禁用段落ID混淆
});

type ProjectDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    images: string[];
  };
};

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ isOpen, onClose, project }) => {
  const { isDarkTheme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const [parsedContent, setParsedContent] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = project.images.length;
  
  // 解析Markdown内容
  useEffect(() => {
    if (project.description) {
      try {
        // 使用配置好的marked解析器
        const htmlContent = marked(project.description);
        setParsedContent(htmlContent);
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setParsedContent(`<p>${project.description}</p>`);
      }
    }
  }, [project.description]);
  
  // 图片加载计数
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };
  
  // 处理ESC键关闭弹窗
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 打开弹窗时禁止滚动
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // 关闭弹窗时恢复滚动
      document.body.style.overflow = '';
      // 重置图片加载状态
      setImagesLoaded(0);
    };
  }, [isOpen, onClose]);
  
  // 点击弹窗外部区域关闭弹窗
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  // 计算图片加载进度百分比
  const loadingProgress = totalImages > 0 ? Math.round((imagesLoaded / totalImages) * 100) : 100;
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
      onClick={handleOutsideClick}
    >
      <div 
        ref={modalRef}
        className={`w-4/5 max-h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col modal-animation ${
          isDarkTheme ? 'bg-[#151515]' : 'bg-white'
        }`}
      >
        {/* 弹窗头部 */}
        <div className={`px-8 py-6 border-b ${isDarkTheme ? 'border-[#222222]' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
              {project.title}
            </h2>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full ${
                isDarkTheme 
                  ? 'bg-[#222] hover:bg-[#333] text-gray-300' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              aria-label="关闭"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* 弹窗内容 */}
        <div className="flex flex-col md:flex-row h-full overflow-hidden">
          {/* 左侧内容描述 - 强化溢出控制 */}
          <div 
            className={`w-full md:w-1/3 p-8 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-700 ${
              isDarkTheme ? 'text-gray-300/70' : 'text-gray-600/70'
            }`}
            style={{ overflowX: 'hidden', maxWidth: '100%' }}
          >
            <div 
              className={`prose max-w-none break-words ${isDarkTheme ? 'prose-invert' : ''}`}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              style={{ 
                overflowWrap: 'break-word', 
                wordWrap: 'break-word', 
                hyphens: 'auto',
                wordBreak: 'break-word',
                maxWidth: '100%'
              }}
            />
          </div>
          
          {/* 右侧图片滚动区域 */}
          <div 
            ref={imagesContainerRef}
            className="w-full md:w-2/3 overflow-y-auto max-h-[70vh] border-l-0 md:border-l p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            style={{ borderColor: isDarkTheme ? '#222222' : '#e5e7eb' }}
          >
            {/* 加载进度指示器 */}
            {loadingProgress < 100 && (
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-center text-gray-500 dark:text-gray-400">
                  图片加载中 {imagesLoaded}/{totalImages}
                </p>
              </div>
            )}
            
            <div className="space-y-6">
              {project.images.map((image, index) => (
                <div key={index} className="relative h-[360px] w-full overflow-hidden rounded-lg bg-gray-900/10">
                  <Image
                    src={image}
                    alt={`${project.title} - 图片 ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    onLoad={handleImageLoad}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    priority={index < 2} // 优先加载前两张图片
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 弹窗底部 */}
        <div className={`px-8 py-4 border-t ${isDarkTheme ? 'border-[#222222] bg-[#111]' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal; 