import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Courses = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div className="py-16">
      <div className="text-center">
        <h2 className={`text-[40px] font-bold font-['PingFang_SC'] mb-[10px] ${isDarkTheme ? 'text-white' : 'text-black'}`}>
          精品课程
        </h2>
        <p className={`text-[18px] font-['PingFang_SC'] mb-16 ${isDarkTheme ? 'text-white/50' : 'text-dark/50'}`}>
          关注我，一起学习AI设计与AIGC创作
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
          {/* ... existing code ... */}
        </div>
      </div>
    </div>
  );
};

export default Courses; 