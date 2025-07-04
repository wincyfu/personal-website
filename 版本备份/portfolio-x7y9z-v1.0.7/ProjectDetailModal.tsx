import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { marked } from 'marked';
import WatermarkOverlay from '../UI/WatermarkOverlay';

// 配置marked选项
marked.setOptions({
  breaks: true,
  gfm: true,
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [parsedContent, setParsedContent] = useState('');
  
  // 解析Markdown内容
  useEffect(() => {
    if (project.description) {
      try {
        const htmlContent = marked.parse(project.description);
        setParsedContent(htmlContent as string);
      } catch (error) {
        console.error('Error parsing markdown:', error);
        setParsedContent(`<p>${project.description}</p>`);
      }
    }
    
    // 图片加载计数
    console.log(`总共 ${project.images.length} 张图片需要加载`);
    
    // 输出所有图片地址到控制台以便调试
    project.images.forEach((image, index) => {
      console.log(`图片 ${index + 1}: ${image}`);
    });
  }, [project.description, project.images]);
  
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
    };
  }, [isOpen, onClose]);
  
  // 点击弹窗外部区域关闭弹窗
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  // 禁止图片右键菜单和拖拽
  const preventDefault = (e: React.MouseEvent | React.DragEvent) => {
    e.preventDefault();
    return false;
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
      onClick={handleOutsideClick}
    >
      <div 
        ref={modalRef}
        className={`w-[99%] md:w-[98%] lg:w-[97%] max-w-[120rem] max-h-[96vh] rounded-xl overflow-hidden shadow-2xl flex flex-col ${
          isDarkTheme ? 'bg-[#151515]' : 'bg-white'
        }`}
      >
        {/* 弹窗头部 */}
        <div className={`px-5 sm:px-6 md:px-8 py-5 md:py-6 border-b ${isDarkTheme ? 'border-[#222222]' : 'border-gray-200'}`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-xl md:text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>
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
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto px-5 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8"
        >
          {/* 上方内容描述 */}
          <div 
            className={`w-full mb-6 md:mb-8 prose max-w-none ${isDarkTheme ? 'prose-invert' : ''}`}
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
          
          {/* 下方图片区域 - 使用简单的栅格布局 */}
          <div className="grid grid-cols-1 gap-8 md:gap-10 mb-8 md:mb-10">
            {project.images.map((image, index) => (
              <div key={index} className="relative">
                <div className="relative overflow-hidden rounded-lg bg-gray-900/5">
                  <div className="relative aspect-[16/9] w-full">
                    <img
                      src={image.startsWith('/') ? image : `/${image}`}
                      alt={`${project.title} - 图片 ${index + 1}`}
                      className="w-full h-full object-contain rounded-lg"
                      onContextMenu={preventDefault}
                      onDragStart={preventDefault}
                      draggable="false"
                      loading="lazy"
                      onLoad={() => {
                        console.log(`图片 ${index + 1} 加载成功: ${image}`);
                      }}
                      onError={(e) => {
                        console.error(`图片 ${index + 1} 加载失败: ${image}`);
                        // 图片加载失败时使用占位图
                        e.currentTarget.src = '/images/placeholder.png';
                      }}
                    />
                    <WatermarkOverlay text="WincyFu Design" opacity={0.15} rotation={45} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 弹窗底部 */}
        <div className={`px-5 sm:px-6 md:px-8 py-4 border-t ${isDarkTheme ? 'border-[#222222] bg-[#111]' : 'border-gray-200 bg-gray-50'}`}>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              共 {project.images.length} 张图片
            </div>
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