import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';
import { marked } from 'marked'; // 需要安装: npm install marked
import WatermarkOverlay from './WatermarkOverlay'; // 导入水印组件

// 配置marked选项以控制表格和其他大型元素的渲染方式
marked.setOptions({
  breaks: true, // 启用段落内换行
  gfm: true, // 启用GitHub风格Markdown
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
  const [imagesError, setImagesError] = useState<boolean[]>([]);
  const totalImages = project.images.length;
  
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
    
    // 重置图片加载状态
    setImagesLoaded(0);
    setImagesError(Array(project.images.length).fill(false));
  }, [project.description, project.images.length]);
  
  // 图片加载计数
  const handleImageLoad = (index: number) => {
    console.log(`图片 ${index + 1} 加载成功`);
    setImagesLoaded(prev => prev + 1);
  };
  
  // 图片加载错误处理
  const handleImageError = (index: number) => {
    console.error(`图片 ${index + 1} 加载失败`);
    setImagesError(prev => {
      const newErrors = [...prev];
      newErrors[index] = true;
      return newErrors;
    });
    setImagesLoaded(prev => prev + 1); // 仍计数为已加载，保证进度条正常
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
  
  // 禁止图片右键菜单
  const preventDefault = (e: React.MouseEvent | React.DragEvent) => {
    e.preventDefault();
    return false;
  };
  
  // 禁止图片拖拽
  useEffect(() => {
    const disableDragAndContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };
    
    // 获取所有图片元素并添加事件监听
    if (isOpen && imagesContainerRef.current) {
      const images = imagesContainerRef.current.querySelectorAll('img');
      images.forEach(img => {
        img.addEventListener('dragstart', disableDragAndContextMenu, false);
        img.addEventListener('contextmenu', disableDragAndContextMenu, false);
      });
      
      return () => {
        // 清理事件监听
        images.forEach(img => {
          img.removeEventListener('dragstart', disableDragAndContextMenu);
          img.removeEventListener('contextmenu', disableDragAndContextMenu);
        });
      };
    }
  }, [isOpen, imagesLoaded]);
  
  if (!isOpen) return null;
  
  // 计算图片加载进度百分比
  const loadingProgress = totalImages > 0 ? Math.round((imagesLoaded / totalImages) * 100) : 100;
  
  // 获取修正的图片URL
  const getFixedImageUrl = (path: string) => {
    // 如果是错误情况，返回占位图
    if (!path) return '/images/placeholder.png';
    
    // 确保开始有一个斜杠
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
    
    // 如果包含端口，可能是本地开发环境，添加绝对URL前缀
    const isLocal = typeof window !== 'undefined' && window.location.port !== '';
    const baseUrl = isLocal ? `${window.location.protocol}//${window.location.host}` : '';
    
    // 确保使用正确的路径格式
    path = path.replace(/\/+/g, '/'); // 移除重复的斜杠
    
    return `${baseUrl}${path}`;
  };
  
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
      onClick={handleOutsideClick}
    >
      <div 
        ref={modalRef}
        className={`w-[98%] max-w-[1800px] max-h-[95vh] rounded-xl overflow-hidden shadow-2xl flex flex-col modal-animation ${
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
        
        {/* 弹窗内容 - 修改为上下结构 */}
        <div className="flex flex-col h-full overflow-hidden">
          {/* 整体内容滚动区域 */}
          <div 
            className="w-full overflow-y-auto px-[50px] pb-10"
            style={{ maxHeight: 'calc(99vh - 140px)' }}
          >
            {/* 上方内容描述 */}
            <div 
              className={`w-full py-5 overflow-x-hidden border-b mb-8 ${
                isDarkTheme ? 'text-gray-300/70 border-[#222222]' : 'text-gray-600/70 border-gray-200'
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
            
            {/* 下方图片区域 */}
            <div 
              ref={imagesContainerRef}
              className="w-full p-0 mb-20"
            >
              <div className="flex flex-col gap-6">
                {project.images.map((image, index) => {
                  // 检查图片错误状态
                  const hasError = imagesError[index];
                  
                  // 调试日志
                  console.log(`尝试加载图片 ${index + 1}/${project.images.length}: ${image}`);
                  
                  return (
                    <div 
                      key={index} 
                      className="relative h-[900px] w-full overflow-hidden rounded-lg bg-gray-900/5"
                      onContextMenu={preventDefault}
                      onDragStart={preventDefault}
                    >
                      {/* 加载指示器 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 transition-opacity duration-300">
                        <div className="text-center">
                          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-sm text-gray-500">加载中...</p>
                        </div>
                      </div>
                      
                      {/* 图片容器 - 完全重构 */}
                      <div className="w-full h-full relative">
                        <img
                          src={hasError ? '/images/placeholder.png' : getFixedImageUrl(image)}
                          alt={`${project.title} - 图片 ${index + 1}`}
                          className="h-full object-contain transition-transform duration-500 select-none absolute left-0 hover:scale-[1.01]"
                          style={{ 
                            userSelect: 'none', 
                            pointerEvents: 'none',
                            maxHeight: '900px',
                            maxWidth: 'calc(100% - 50px)',
                            transform: 'none'
                          }}
                          onLoad={(e) => {
                            // 隐藏加载指示器
                            const loadingEl = e.currentTarget.parentElement?.previousElementSibling;
                            if (loadingEl) {
                              loadingEl.classList.add('opacity-0');
                              setTimeout(() => {
                                loadingEl.classList.add('hidden');
                              }, 300);
                            }
                            
                            // 计数加载完成
                            handleImageLoad(index);
                            
                            // 添加hover效果
                            e.currentTarget.classList.add('hover:scale-105');
                            
                            // 图片加载完成后添加水印效果的类
                            e.currentTarget.parentElement?.classList.add('watermark-ready');
                          }}
                          onError={(e) => {
                            // 隐藏加载指示器
                            const loadingEl = e.currentTarget.parentElement?.previousElementSibling;
                            if (loadingEl) {
                              loadingEl.classList.add('opacity-0');
                              setTimeout(() => {
                                loadingEl.classList.add('hidden');
                              }, 300);
                            }
                            
                            // 记录错误并显示占位图
                            handleImageError(index);
                            e.currentTarget.src = '/images/placeholder.png';
                          }}
                          draggable="false"
                        />
                        {/* 添加水印覆盖层 - 只在非错误状态下显示，并添加条件类检查 */}
                        {!hasError && <WatermarkOverlay text="WincyFu Design" opacity={0.15} rotation={45} />}
                      </div>
                    </div>
                  );
                })}
              </div>
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