'use client';

import { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
}

// 定义CSS样式组件
const StyleSheet = ({ fontFamily, fontUrl, textColor, strokeColor }: 
  { fontFamily: string, fontUrl: string, textColor: string, strokeColor: string }) => (
  <style dangerouslySetInnerHTML={{ __html: `
    @font-face {
      font-family: '${fontFamily}';
      src: url('${fontUrl}');
      font-style: normal;
    }
    
    .flex {
      display: flex;
      justify-content: space-between;
    }
    
    .stroke span {
      position: relative;
      color: ${textColor};
    }
    
    .stroke span::after {
      content: attr(data-char);
      position: absolute;
      left: 0;
      top: 0;
      color: transparent;
      z-index: -1;
      -webkit-text-stroke-width: 3px;
      -webkit-text-stroke-color: ${strokeColor};
    }
    
    .text-pressure-title {
      color: ${textColor};
    }
    
    .text-pressure-title span {
      transform: none !important;
      transition: none;
    }
  ` }} />
);

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Compressa',
  fontFamily = 'Compressa VF',
  // This font is just an example, you should not use it in commercial projects.
  fontUrl = 'https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2',

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',

  minFontSize = 24,

}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const cursorRef = useRef<Point>({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  const chars = text.split('');

  const dist = (a: Point, b: Point): number => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Initialize mouse near center of container if it exists
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMounted]);

  const setSize = () => {
    if (!containerRef.current || !titleRef.current || !isMounted) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  };

  useEffect(() => {
    if (!isMounted) return;
    
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
    // eslint-disable-next-line
  }, [scale, text, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
          };

          const d = dist(mouseRef.current, charCenter);

          const getAttr = (distance: number, minVal: number, maxVal: number) => {
            const val = maxVal - Math.abs((maxVal * distance) / maxDist);
            return Math.max(minVal, val + minVal);
          };

          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, 300, 900)) : 400;
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;

          span.style.opacity = String(alphaVal);
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha, chars.length, isMounted]);

  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : '']
    .filter(Boolean)
    .join(' ');

  if (!isMounted) {
    return (
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <h1
          className={`text-pressure-title ${dynamicClassName}`}
          style={{
            fontFamily,
            textTransform: 'uppercase',
            fontSize: fontSize,
            lineHeight,
            transform: `scale(1, ${scaleY})`,
            transformOrigin: 'center top',
            margin: 0,
            textAlign: 'center',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            fontWeight: 100,
            width: '100%',
          }}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              data-char={char}
              style={{
                display: 'inline-block',
                color: stroke ? undefined : textColor,
                transform: 'none'
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      <StyleSheet 
        fontFamily={fontFamily} 
        fontUrl={fontUrl} 
        textColor={textColor} 
        strokeColor={strokeColor} 
      />

      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
              return undefined;
            }}
            data-char={char}
            style={{
              display: 'inline-block',
              color: stroke ? undefined : textColor,
              transform: 'none'
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure; 