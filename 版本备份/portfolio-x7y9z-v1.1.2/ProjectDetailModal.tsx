import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
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
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [parsedContent, setParsedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 点赞相关状态
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(615); // 默认点赞数
  const [viewCount] = useState(4405); // 浏览数
  const [commentCount] = useState(64); // 评论数
  
  // 预览卡片相关状态
  const [previewStartIndex, setPreviewStartIndex] = useState(0);
  const previewCardsPerPage = 4; // 每页显示4个预览卡片
  
  // 获取当前项目在projects数组中的索引
  useEffect(() => {
    if (currentProjectId) {
      const index = projects.findIndex(p => p.id === currentProjectId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [currentProjectId]);
  
  // 获取其他项目（排除当前项目）
  const otherProjects = projects.filter(p => p.id !== currentProjectId);
  
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
    const maxStartIndex = Math.max(0, otherProjects.length - previewCardsPerPage);
    setPreviewStartIndex(prev => {
      const newIndex = prev + previewCardsPerPage;
      return newIndex > maxStartIndex ? 0 : newIndex; // 循环切换
    });
  };
  
  // 获取当前显示的预览卡片
  const currentPreviewCards = otherProjects.slice(previewStartIndex, previewStartIndex + previewCardsPerPage);
  
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
                      src={image}
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
                        
                        // 判断是否是儿宝管家项目的图片
                        const isChildDoctorImage = image.includes('detail-2-') || 
                                                 project.title === '儿宝管家项目';
                        
                        if (isChildDoctorImage) {
                          // 儿宝管家项目图片特殊处理
                          console.log(`儿宝管家项目图片加载失败，尝试修复: ${image}`);
                          
                          // 解析图片路径以获取文件名部分
                          const pathParts = image.split('/');
                          const fileName = pathParts[pathParts.length - 1];
                          console.log(`图片文件名: ${fileName}`);
                          
                          // 准备多个备选路径
                          const tryPaths = [
                            // 原始路径
                            image,
                            // 添加前导斜杠
                            image.startsWith('/') ? image : `/${image}`,
                            // 尝试直接从根目录加载
                            `/images/${fileName}`,
                            // 尝试从portfolio目录加载
                            `/images/portfolio/${fileName}`,
                            // 尝试从备份目录加载
                            `/images/portfolio/backup/${fileName}`
                          ];
                          
                          // 如果是detail-2-*.jpg格式的图片
                          if (fileName.match(/detail-2-\d+\.jpg/)) {
                            const detailNum = fileName.match(/detail-2-(\d+)\.jpg/)[1];
                            // 添加更多可能的路径
                            tryPaths.push(
                              `/images/detail-2-${detailNum}.jpg`,
                              `/images/portfolio/detail-2-${detailNum}.jpg`,
                              `/images/portfolio/backup/detail-2-${detailNum}.jpg`
                            );
                          }
                          
                          // 最后添加占位图
                          tryPaths.push('/images/placeholder.png');
                          
                          console.log(`尝试加载多个备选路径:`, tryPaths);
                          
                          // 按顺序尝试不同路径
                          let pathIndex = 0;
                          const tryNextPath = () => {
                            if (pathIndex < tryPaths.length) {
                              const path = tryPaths[pathIndex];
                              console.log(`尝试路径 ${pathIndex + 1}/${tryPaths.length}: ${path}`);
                              e.currentTarget.src = path;
                              pathIndex++;
                              // 设置超时后检查图片是否加载成功，如果失败则尝试下一个路径
                              setTimeout(() => {
                                if (e.currentTarget.naturalWidth === 0) {
                                  tryNextPath();
                                }
                              }, 300);
                            } else {
                              // 所有路径都失败，使用占位图
                              console.log('所有路径都失败，使用占位图');
                              e.currentTarget.src = '/images/placeholder.png';
                            }
                          };
                          
                          tryNextPath();
                          return;
                        }
                        
                        // 图片加载失败时使用占位图
                        e.currentTarget.src = '/images/placeholder.png';
                        
                        // 尝试自动修复路径
                        // 1. 尝试修复路径中可能缺少的前导斜杠
                        if (!image.startsWith('/')) {
                          const fixedPath = `/${image}`;
                          console.log(`尝试添加前导斜杠: ${fixedPath}`);
                          setTimeout(() => {
                            e.currentTarget.src = fixedPath;
                          }, 300);
                          return;
                        }
                        
                        // 2. 尝试使用备用路径
                        const backupPath = image.replace('detail-', 'project-');
                        if (backupPath !== image) {
                          console.log(`尝试使用备用路径: ${backupPath}`);
                          setTimeout(() => {
                            e.currentTarget.src = backupPath;
                          }, 500);
                          return;
                        }
                        
                        // 3. 尝试从备份目录加载
                        const backupDirPath = image.replace('/images/portfolio/', '/images/portfolio/backup/');
                        if (backupDirPath !== image) {
                          console.log(`尝试从备份目录加载: ${backupDirPath}`);
                          setTimeout(() => {
                            e.currentTarget.src = backupDirPath;
                          }, 700);
                        }
                      }}
                    />
                    <WatermarkOverlay text="WincyFu Design" opacity={0.15} rotation={45} />
                  </div>
                </div>
              </div>
            ))}
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
          {otherProjects.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/20 bg-black -mx-5 sm:-mx-6 md:-mx-8">
              <div className="px-5 sm:px-6 md:px-8" style={{ paddingTop: '12px', paddingBottom: '12px' }}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  其他作品
                </h3>
              </div>
              
              {/* 预览卡片网格 */}
              <div className="relative px-5 sm:px-6 md:px-8 pb-10">
                <div className="flex" style={{ gap: '14px' }}>
                  {currentPreviewCards.map((previewProject) => (
                    <div
                      key={previewProject.id}
                      onClick={() => handlePreviewCardClick(previewProject)}
                      className="relative overflow-hidden rounded-lg cursor-pointer transition-all duration-200 hover:transform hover:scale-105 bg-gray-800"
                      style={{ width: '242px' }}
                    >
                      <div style={{ width: '242px', height: '148px' }}>
                        <img
                          src={previewProject.imageUrl}
                          alt={previewProject.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/placeholder.png';
                          }}
                        />
                      </div>
                      <div className="p-3" style={{ backgroundColor: '#171717' }}>
                        <h4 className="font-medium truncate text-white" style={{ fontSize: '14px' }}>
                          {previewProject.title}
                        </h4>
                        <p 
                          className="text-gray-400"
                          style={{ 
                            fontSize: '12px',
                            lineHeight: '1.4',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginTop: '8px'
                          }}
                        >
                          {previewProject.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 向右切换按钮 */}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal; 