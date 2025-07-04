'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import './SpotlightCard.css';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(41, 255, 153, 0.2)',
  enableTilt = false
}) => {
  const { isDarkTheme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 强制应用padding样式，确保在初始加载时正确显示
    card.style.padding = '0';
    card.style.boxSizing = 'border-box';

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
      card.style.setProperty('--spotlight-color', spotlightColor);

      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -10;
        const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 10;
        
        card.style.setProperty('--rotate-x', `${rotateX}deg`);
        card.style.setProperty('--rotate-y', `${rotateY}deg`);
      }
    };

    const handleMouseLeave = () => {
      if (enableTilt) {
        card.style.setProperty('--rotate-x', '0deg');
        card.style.setProperty('--rotate-y', '0deg');
      }
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [spotlightColor, enableTilt]);

  const cardStyle = isDarkTheme 
    ? { 
        backgroundColor: '#171717', 
        borderColor: '#222222',
        color: '#fff',
        padding: '0',
        willChange: 'transform, background-color' 
      } 
    : { 
        backgroundColor: '#ffffff', 
        color: '#222', 
        borderColor: '#e5e7eb',
        padding: '0',
        willChange: 'transform, background-color'
      };

  return (
    <div
      ref={cardRef}
      className={`card-spotlight ${enableTilt ? 'tilt-enabled' : ''} ${className}`}
      style={cardStyle}
    >
      {children}
    </div>
  );
};

export default SpotlightCard; 