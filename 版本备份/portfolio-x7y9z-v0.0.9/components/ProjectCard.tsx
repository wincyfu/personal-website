'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { Project } from '@/data/portfolio';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { isDarkTheme } = useTheme();
  
  return (
    <Link 
      href={`/portfolio-x7y9z/${project.id}`} 
      className={`group block rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${
        isDarkTheme ? 'bg-card hover:shadow-primary/20 border border-card-border' : 'bg-white hover:shadow-primary/30'
      }`}
    >
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-300 z-10"></div>
        <div className="relative h-full w-full">
          {/* 使用占位图，实际使用时替换为真实图片 */}
          <div className="w-full h-full bg-gradient-to-r from-primary to-secondary animate-pulse">
            {project.imageUrl && (
              <Image 
                src={project.imageUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
                onError={(e) => {
                  // 图片加载失败时的处理
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold group-hover:text-secondary transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-secondary">
            {project.category}
          </span>
        </div>
        
        <p className="mb-4 text-sm text-text-gray">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs px-2 py-0.5 rounded-full bg-card text-text-gray"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-text-gray">
            {project.date}
          </span>
          <span className="text-secondary text-sm font-medium group-hover:translate-x-1 transition-transform duration-300 flex items-center">
            查看详情
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard; 