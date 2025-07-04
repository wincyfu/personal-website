import React from 'react';

interface WatermarkOverlayProps {
  text: string;
  opacity?: number;
  rotation?: number;
}

const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  text = 'WincyFu Design',
  opacity = 0.15,
  rotation = 45
}) => {
  // 水印在上中下的左中右位置显示，共9个位置
  const positions = [
    // 上排
    { top: '8%', left: '8%' },
    { top: '8%', left: '50%', transform: `translate(-50%, 0) rotate(${rotation}deg)` },
    { top: '8%', right: '8%' },
    
    // 中排
    { top: '50%', left: '8%', transform: `translate(0, -50%) rotate(${rotation}deg)` },
    { top: '50%', left: '50%', transform: `translate(-50%, -50%) rotate(${rotation}deg)` },
    { top: '50%', right: '8%', transform: `translate(0, -50%) rotate(${rotation}deg)` },
    
    // 下排
    { bottom: '8%', left: '8%' },
    { bottom: '8%', left: '50%', transform: `translate(-50%, 0) rotate(${rotation}deg)` },
    { bottom: '8%', right: '8%' }
  ];

  const watermarkStyle: React.CSSProperties = {
    position: 'absolute',
    pointerEvents: 'none',
    userSelect: 'none',
    color: '#ffffff',
    fontSize: 'clamp(12px, 1.2vw, 18px)',
    fontWeight: '500',
    opacity: opacity,
    zIndex: 10,
    whiteSpace: 'nowrap',
    fontFamily: '"Arial", "PingFang SC", "Microsoft YaHei", sans-serif',
    letterSpacing: '1px',
    textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
    padding: '2px',
    mixBlendMode: 'exclusion',
  };

  return (
    <div className="watermark-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {positions.map((position, index) => (
        <div
          key={index}
          style={{
            ...watermarkStyle,
            ...position,
            transform: position.transform || `rotate(${rotation}deg)`,
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default WatermarkOverlay; 