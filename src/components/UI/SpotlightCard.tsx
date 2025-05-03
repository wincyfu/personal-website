'use client';

import { useRef, ReactNode, memo, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import "./SpotlightCard.css";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

const SpotlightCard = ({ 
  children, 
  className = "", 
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  enableTilt = false
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { isDarkTheme } = useTheme();
  
  // 对鼠标移动处理函数进行性能优化
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (centerY - y) / 20;
      const rotateY = (x - centerX) / 20;
      
      divRef.current.style.setProperty("--rotate-x", `${rotateX}deg`);
      divRef.current.style.setProperty("--rotate-y", `${rotateY}deg`);
    }

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  }, [spotlightColor, enableTilt]);

  const handleMouseLeave = useCallback(() => {
    if (!divRef.current) return;
    
    if (enableTilt) {
      divRef.current.style.setProperty("--rotate-x", "0deg");
      divRef.current.style.setProperty("--rotate-y", "0deg");
    }
  }, [enableTilt]);

  const cardStyle = isDarkTheme 
    ? { willChange: 'transform, background-color' } 
    : { 
        backgroundColor: '#F3F4F6', 
        color: '#222', 
        borderColor: '#F3F4F6',
        willChange: 'transform, background-color'
      };

  const tiltClassName = enableTilt ? 'tilt-enabled' : '';

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-spotlight ${tiltClassName} ${className}`}
      style={cardStyle}
    >
      {children}
    </div>
  );
};

// 使用React.memo优化渲染性能
export default memo(SpotlightCard); 