/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // 针对Vercel部署优化配置
  // 移除output: 'export'以便Vercel能自动处理服务端渲染和静态生成
  // output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/stations' : '',
  // 移除distDir配置，让Vercel使用默认的.next目录
  // distDir: 'out',
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    // 明确排除可能导致堆栈溢出的文件和目录
    outputFileTracingExcludes: {
      '*': [
        './api/**/*',
        './backups/**/*',
        './logs/**/*',
        './backup/**/*', 
        './node_modules/**/*',
        './.git/**/*'
      ]
    },
    // 优化选项
    optimizeCss: false, // 禁用CSS优化，避免critters依赖问题
    optimizePackageImports: ['@react-spring/web', 'framer-motion', 'react-icons', 'ogl'],
    turbo: {
      rules: {
        '*.css': ['autoprefixer', 'tailwindcss'],
      },
    },
    scrollRestoration: true,
  },
  trailingSlash: true,
  // 忽略备份目录和类型错误
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // 排除不需要监视的文件夹
    config.watchOptions = {
      ignored: ['**/backup/**', '**/backups/**', '**/node_modules/**', '**/.git/**', '**/logs/**'],
      aggregateTimeout: 300,
      poll: 1000,
    };
    
    // 简化缓存配置
    config.cache = {
      type: 'filesystem',
      compression: false, // 禁用缓存压缩
      maxAge: 86400000, // 降低到1天
      cacheDirectory: path.resolve(__dirname, '.next/cache/webpack-cache'),
      buildDependencies: {
        config: [__filename]
      }
    };
    
    // 优化图像资源
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/i,
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    });
    
    // 简化代码分割配置
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 10, // 降低以减少复杂性
        minSize: 20000,
      },
    };
    
    return config;
  },
  // 降低构建时CPU使用
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
};

module.exports = nextConfig; 