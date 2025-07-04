import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useProjectView } from '@/contexts/ProjectViewContext';
import { marked } from 'marked';
import WatermarkOverlay from '../UI/WatermarkOverlay';
import { projects } from '@/data/portfolio';

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
    id?: string;
  };
  currentProjectId?: string; // 添加当前项目ID prop
  onProjectChange?: (project: any) => void; // 添加项目切换回调
};

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  project, 
  currentProjectId,
  onProjectChange 
}) => {
  const { isDarkTheme } = useTheme();
  const { isEnglish } = useLanguage();
  const { incrementViewCount, getViewCount } = useProjectView();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [parsedContent, setParsedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 点赞相关状态
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(615); // 默认点赞数
  const [commentCount] = useState(64); // 评论数
  
  // 获取当前项目的浏览次数
  const viewCount = currentProjectId ? getViewCount(currentProjectId) : 0;
  
  // 预览卡片相关状态
  const [previewStartIndex, setPreviewStartIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4); // 动态卡片数量
  const [containerWidth, setContainerWidth] = useState(0);
  
  // 获取当前项目在projects数组中的索引
  useEffect(() => {
    if (currentProjectId) {
      const index = projects.findIndex(p => p.id === currentProjectId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [currentProjectId]);
  
  // 根据类别进行分组 - 与作品集页面保持一致
  const appDesignProjects = projects.filter(project => project.category === 'UI设计' || project.category === '移动应用');
  const webDesignProjects = projects.filter(project => project.category === '产品设计' || project.category === 'AIGC');
  const dashboardProjects = projects.filter(project => project.category === '教育科技' || project.category === '大屏设计');
  const otherProjects = projects.filter(project => 
    !['UI设计', '移动应用', '产品设计', 'AIGC', '教育科技', '大屏设计'].includes(project.category)
  );
  
  // 合并所有分类的项目，排除当前项目
  const allOtherProjects = [
    ...appDesignProjects,
    ...webDesignProjects, 
    ...dashboardProjects,
    ...otherProjects
  ].filter(p => p.id !== currentProjectId);
  
  // 获取项目的设计分类标签
  const getDesignCategoryLabel = (project: any) => {
    if (project.category === 'UI设计' || project.category === '移动应用') {
      return isEnglish ? 'Mobile' : '移动端';
    } else if (project.category === '产品设计' || project.category === 'AIGC') {
      return isEnglish ? 'Website' : '网站';
    } else if (project.category === '教育科技' || project.category === '大屏设计') {
      return isEnglish ? 'Dashboard' : '大屏';
    } else {
      return isEnglish ? 'Other' : '其他';
    }
  };
  
  // 监听容器宽度变化，动态计算卡片数量和尺寸
  useEffect(() => {
    const updateCardsLayout = () => {
      if (modalRef.current) {
        const modalWidth = modalRef.current.offsetWidth;
        const contentPadding = 32; // px-5 sm:px-6 md:px-8 的大致值
        const availableWidth = modalWidth - contentPadding * 2;
        
        // 计算卡片数量：最少4个，最多6个
        let calculatedCardsPerPage = 4;
        const minCardWidth = 180; // 最小卡片宽度
        const maxCardWidth = 220; // 最大卡片宽度
        const gap = 12; // 卡片间距
        
        // 尝试不同的卡片数量，找到最合适的
        for (let cards = 6; cards >= 4; cards--) {
          const totalGaps = (cards - 1) * gap;
          const cardWidth = (availableWidth - totalGaps) / cards;
          
          if (cardWidth >= minCardWidth && cardWidth <= maxCardWidth) {
            calculatedCardsPerPage = cards;
            break;
          } else if (cardWidth > maxCardWidth) {
            calculatedCardsPerPage = cards;
            break;
          }
        }
        
        setCardsPerPage(calculatedCardsPerPage);
        setContainerWidth(availableWidth);
      }
    };

    updateCardsLayout();
    
    const resizeObserver = new ResizeObserver(updateCardsLayout);
    if (modalRef.current) {
      resizeObserver.observe(modalRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [isOpen]);
  
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
  
  // 处理弹窗打开时增加浏览次数 - 只在从关闭变为打开时计数
  const prevIsOpenRef = useRef(false);
  
  useEffect(() => {
    // 只有当弹窗从关闭状态变为打开状态时才增加浏览次数
    if (isOpen && !prevIsOpenRef.current && currentProjectId) {
      incrementViewCount(currentProjectId);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, currentProjectId, incrementViewCount]);
  
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
  
  // 跳转到指定项目
  const handleGoToProject = (targetProject: any) => {
    const index = projects.findIndex(p => p.id === targetProject.id);
    if (index !== -1 && index !== currentIndex) {
      setCurrentIndex(index);
      
      // 重置内容滚动位置
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
      
      if (onProjectChange) {
        onProjectChange(targetProject);
      }
    }
  };
  
  // 处理点赞
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };
  
  // 处理预览卡片点击
  const handlePreviewCardClick = (project: any) => {
    handleGoToProject(project);
  };
  
  // 处理预览卡片切换
  const handlePreviewNext = () => {
    const maxStartIndex = Math.max(0, allOtherProjects.length - cardsPerPage);
    setPreviewStartIndex(prev => {
      const newIndex = prev + cardsPerPage;
      return newIndex > maxStartIndex ? 0 : newIndex; // 循环切换
    });
  };
  
  // 获取当前显示的预览卡片
  const currentPreviewCards = allOtherProjects.slice(previewStartIndex, previewStartIndex + cardsPerPage);
  
  // 计算卡片宽度和间距
  const calculateCardDimensions = () => {
    if (containerWidth === 0) return { cardWidth: 242, gap: 14 };
    
    const gap = Math.max(8, Math.min(16, containerWidth * 0.015)); // 自适应间距：8px-16px
    const totalGaps = (cardsPerPage - 1) * gap;
    const cardWidth = (containerWidth - totalGaps) / cardsPerPage;
    
    return { 
      cardWidth: Math.floor(cardWidth), 
      gap: Math.floor(gap) 
    };
  };
  
  const { cardWidth, gap } = calculateCardDimensions();
  const cardHeight = Math.floor(cardWidth * 0.61); // 保持宽高比约为 1.64:1
  
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
        className={`w-[80%] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col ${
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
            className={`mb-6 md:mb-8 prose max-w-none ${isDarkTheme ? 'prose-invert' : ''}`}
            style={{ 
              width: '100%',
              maxWidth: 'none !important',
              margin: '0 0 1.5rem 0'
            }}
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
          
          {/* 自定义样式 */}
          <style dangerouslySetInnerHTML={{
            __html: `
              .prose {
                max-width: none !important;
                width: 100% !important;
                line-height: 1.6 !important;
              }
              .prose * {
                max-width: none !important;
                width: 100% !important;
              }
              .prose h1 {
                margin-bottom: 0.15rem !important;
                margin-top: 0 !important;
                line-height: 1.0 !important;
              }
              .prose h2 {
                margin-bottom: 0.15rem !important;
                margin-top: 1.5rem !important;
                line-height: 1.0 !important;
              }
              .prose h3 {
                margin-bottom: 0.2rem !important;
                margin-top: 1.2rem !important;
                line-height: 1.3 !important;
              }
              .prose p {
                margin-bottom: 1rem !important;
                margin-top: 0 !important;
                line-height: 1.6 !important;
              }
              .prose ul, .prose ol {
                margin-bottom: 1rem !important;
                margin-top: 0 !important;
                line-height: 1.6 !important;
              }
              .prose li {
                margin-bottom: 0.25rem !important;
                line-height: 1.6 !important;
              }
              .prose strong {
                line-height: inherit !important;
              }
            `
          }} />
          
          {/* 下方媒体区域 - 支持图片和视频 */}
          <div className="grid grid-cols-1 gap-8 md:gap-10 mb-8 md:mb-10" style={{ width: '100%' }}>
            {project.images.map((media, index) => {
              const isVideo = media.endsWith('.mp4') || media.endsWith('.mov') || media.endsWith('.webm');
              
              return (
                <div key={index} className="relative">
                  <div className="relative overflow-hidden rounded-lg bg-gray-900/5">
                    <div className="relative aspect-[16/9] w-full">
                      {isVideo ? (
                        <video
                          src={media}
                          className="w-full h-full object-contain rounded-lg"
                          controls
                          onContextMenu={preventDefault}
                          onDragStart={preventDefault}
                          draggable="false"
                        >
                          您的浏览器不支持视频播放。
                        </video>
                      ) : (
                        <img
                          src={media}
                          alt={`${project.title} - 图片 ${index + 1}`}
                          className="w-full h-full object-contain rounded-lg"
                          onContextMenu={preventDefault}
                          onDragStart={preventDefault}
                          draggable="false"
                          loading="lazy"
                          onError={(e) => {
                            if (e.currentTarget) {
                              e.currentTarget.src = '/images/placeholder.png';
                            }
                          }}
                        />
                      )}
                      <WatermarkOverlay text="WincyFu Design" opacity={0.15} rotation={45} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* 点赞和统计信息区域 */}
          <div className="flex flex-col items-center mb-8 py-6">
            {/* 点赞按钮 */}
            <button
              onClick={handleLike}
              className={`flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-all duration-200 ${
                isLiked 
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
                  : isDarkTheme 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <svg className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </button>
            
            {/* 统计信息 */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>{likeCount}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
                </svg>
                <span className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>{viewCount}</span>
              </div>
            </div>
          </div>
          
          {/* 其他作品预览区域 */}
          {allOtherProjects.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/20 bg-black -mx-5 sm:-mx-6 md:-mx-8">
              <div className="px-5 sm:px-6 md:px-8" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isEnglish ? 'Other Works' : '其他作品'}
                </h3>
              </div>
              
              {/* 预览卡片网格 */}
              <div className="relative px-5 sm:px-6 md:px-8 pb-10">
                <div className="flex" style={{ gap: `${gap}px` }}>
                  {currentPreviewCards.map((previewProject) => (
                    <div
                      key={previewProject.id}
                      onClick={() => handlePreviewCardClick(previewProject)}
                      className="relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200 hover:transform hover:scale-105 bg-gray-800 flex-shrink-0"
                      style={{ width: `${cardWidth}px` }}
                    >
                      <div style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}>
                        <img
                          src={previewProject.imageUrl}
                          alt={previewProject.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (e.currentTarget) {
                              e.currentTarget.src = '/images/placeholder.png';
                            }
                          }}
                        />
                      </div>
                      <div className="p-3" style={{ backgroundColor: '#171717' }}>
                        {/* 标题与分类标签在一行 */}
                        <div className="flex items-center justify-between mb-2">
                          <h4 
                            className="font-medium text-white flex-1 truncate" 
                            style={{ fontSize: `${Math.max(12, cardWidth * 0.058)}px` }}
                          >
                            {isEnglish ? (previewProject.titleEn || previewProject.title) : previewProject.title}
                          </h4>
                          <span 
                            className="px-2 py-1 text-xs rounded-md ml-2 flex-shrink-0"
                            style={{ 
                              fontSize: `${Math.max(9, cardWidth * 0.04)}px`,
                              backgroundColor: 'rgba(34, 196, 94, 0.2)',
                              color: '#22c45e'
                            }}
                          >
                            {getDesignCategoryLabel(previewProject)}
                          </span>
                        </div>
                        <p 
                          className="text-gray-400"
                          style={{ 
                            fontSize: `${Math.max(10, cardWidth * 0.05)}px`,
                            lineHeight: '1.4',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginTop: '6px'
                          }}
                        >
                          {isEnglish ? (previewProject.descriptionEn || previewProject.description) : previewProject.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 向右切换按钮 */}
                {allOtherProjects.length > cardsPerPage && (
                  <button
                    onClick={handlePreviewNext}
                    className="absolute p-2 rounded-full z-10 text-gray-300 hover:opacity-80 transition-opacity"
                    style={{ 
                      right: '8px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      backgroundColor: '#171717',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal; 