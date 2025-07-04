import { useEffect, useRef, memo } from "react";
import './Aurora.css';

// 不再使用dynamic方式导入，改为在useEffect中直接导入

interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
  time?: number;
}

// 顶点着色器
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// 片段着色器
const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  // 使波动效果更自然
  float noiseScale = 1.8; // 降低噪声尺度，增加波纹细腻度
  float timeScale = 0.15; // 减缓时间速度，使波动更缓慢
  float noise = snoise(vec2(uv.x * noiseScale + uTime * timeScale, uTime * timeScale * 0.5)) * 0.35 * uAmplitude;
  noise = exp(noise * 0.7); // 减小幅度，使波动更加自然
  float height = (uv.y * 2.0 - noise + 0.3);
  float intensity = 0.5 * height;
  
  // midPoint is fixed; uBlend controls the transition width.
  float midPoint = 0.22;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  // Premultiplied alpha output.
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

function Aurora(props: AuroraProps) {
  const {
    colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
    amplitude = 0.8, // 降低默认振幅
    blend = 0.5,
    speed = 0.75 // 稍微降低速度
  } = props;
  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const programRef = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);
  const colorInstanceRef = useRef<any>(null);
  const lastTimeRef = useRef<number>(0);
  const frameIntervalRef = useRef<number>(1000 / 60); // 限制为60fps
  const isInitializedRef = useRef<boolean>(false);

  // 客户端组件使用useEffect创建WebGL渲染流程
  useEffect(() => {
    // 跳过服务端渲染
    if (typeof window === 'undefined') return;
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const ctn = ctnDom.current;
    if (!ctn) return;

    // 异步加载OGL库
    const setupWebGL = async () => {
      try {
        // 直接导入OGL，不使用dynamic
        const OGL = await import('ogl');
        const { Renderer, Program, Mesh, Color, Triangle } = OGL;
        
        // 保存Color类的引用
        colorInstanceRef.current = Color;
  
        // 创建渲染器
        const renderer = new Renderer({
          alpha: true,
          premultipliedAlpha: true,
          antialias: true,
          powerPreference: 'high-performance' // 请求高性能GPU模式
        });
        rendererRef.current = renderer;
        
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.backgroundColor = 'transparent';
  
        // 创建几何体和着色器程序
        const geometry = new Triangle(gl);
        if (geometry.attributes.uv) {
          delete geometry.attributes.uv;
        }
  
        const colorStopsArray = colorStops.map((hex: string) => {
          const c = new Color(hex);
          return [c.r, c.g, c.b];
        });
  
        const program = new Program(gl, {
          vertex: VERT,
          fragment: FRAG,
          uniforms: {
            uTime: { value: 0 },
            uAmplitude: { value: amplitude },
            uColorStops: { value: colorStopsArray },
            uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
            uBlend: { value: blend }
          }
        });
        programRef.current = program;
  
        // 创建网格
        const mesh = new Mesh(gl, { geometry, program });
        meshRef.current = mesh;
        
        // 添加到DOM
        ctn.appendChild(gl.canvas);
  
        // 设置尺寸
        resize();
  
        // 开始渲染循环
        update(0);
      } catch (error) {
        console.error("Error loading OGL:", error);
      }
    };

    // 处理窗口大小变化
    function resize() {
      if (!ctn || !rendererRef.current || !programRef.current) return;
      
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      
      rendererRef.current.setSize(width, height);
      
      if (programRef.current) {
        programRef.current.uniforms.uResolution.value = [width, height];
      }
    }

    // 使用防抖函数处理resize事件
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    };

    // 更新函数
    const update = (timestamp: number) => {
      if (!rendererRef.current || !programRef.current || !meshRef.current || !colorInstanceRef.current) return;
      
      animationFrameRef.current = requestAnimationFrame(update);
      
      // 限制帧率
      const elapsed = timestamp - lastTimeRef.current;
      if (elapsed < frameIntervalRef.current) return;
      
      // 记录上次更新时间
      lastTimeRef.current = timestamp - (elapsed % frameIntervalRef.current);
      
      const { time = timestamp * 0.01, speed = 0.75 } = propsRef.current;
      
      // 更新着色器参数
      programRef.current.uniforms.uTime.value = time * speed * 0.1;
      programRef.current.uniforms.uAmplitude.value = propsRef.current.amplitude ?? amplitude;
      programRef.current.uniforms.uBlend.value = propsRef.current.blend ?? blend;
      
      // 优化颜色更新 - 只在颜色变化时更新
      const stops = propsRef.current.colorStops ?? colorStops;
      const Color = colorInstanceRef.current;
      
      const newColors = stops.map((hex: string) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });
      
      programRef.current.uniforms.uColorStops.value = newColors;
      
      // 渲染
      rendererRef.current.render({ scene: meshRef.current });
    };

    // 使用Intersection Observer优化不可见时的性能
    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
      if (isVisible && !animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(update);
      } else if (!isVisible && animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }, { threshold: 0.1 });
    
    if (ctn) {
      observer.observe(ctn);
    }

    // 开始设置
    window.addEventListener("resize", debouncedResize);
    setupWebGL();

    // 清理函数
    return () => {
      observer.disconnect();
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
      
      if (ctn && rendererRef.current) {
        const canvas = rendererRef.current.gl.canvas;
        if (canvas.parentNode === ctn) {
          ctn.removeChild(canvas);
        }
        rendererRef.current.gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
      
      // 清理引用
      rendererRef.current = null;
      programRef.current = null;
      meshRef.current = null;
      colorInstanceRef.current = null;
    };
  }, [amplitude, colorStops, blend, speed]);

  return <div ref={ctnDom} className="aurora-container" />;
}

// 使用React.memo减少不必要的重新渲染
export default memo(Aurora); 