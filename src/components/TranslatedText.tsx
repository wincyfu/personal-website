'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedText } from '@/utils/translations';

interface TranslatedTextProps {
  textKey: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * 自动翻译的文本组件
 * @param textKey 翻译键值，例如 'nav.home'
 * @param className CSS类名
 * @param as 使用的HTML元素，默认为span
 */
const TranslatedText: React.FC<TranslatedTextProps> = ({ 
  textKey, 
  className = '',
  as: Component = 'span'
}) => {
  const { isEnglish } = useLanguage();
  const translatedText = getTranslatedText(textKey, isEnglish);
  
  return (
    <Component className={className}>
      {translatedText}
    </Component>
  );
};

export default TranslatedText; 