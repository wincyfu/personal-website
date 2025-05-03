/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'export', // Enable static export
  basePath: process.env.NODE_ENV === 'production' ? '/stations' : '',
  distDir: 'out',
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./api/**/*']
    },
    // 开启优化选项
    optimizeCss: false, // 禁用CSS优化，避免critters依赖问题
    optimizePackageImports: ['@react-spring/web', 'framer-motion', 'react-icons', 'ogl'],
    turbo: {
      rules: {
        // 增加Turbo编译规则
        '*.css': ['autoprefixer', 'tailwindcss'],
      },
    },
    scrollRestoration: true, // 启用原生滚动位置恢复，确保锚点正常工作
  },
  trailingSlash: true,
  // 忽略备份目录和类型错误
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ignored: ['**/backup/**', '**/backups/**', '**/node_modules/**', '**/.git/**', '**/logs/**'],
      aggregateTimeout: 300,
      poll: 1000,
    };
    
    // 添加缓存配置，解决pack.gz错误
    config.cache = {
      type: 'filesystem',
      compression: false, // 禁用缓存压缩
      maxAge: 5184000000, // 60天
      cacheDirectory: path.resolve(__dirname, '.next/cache/webpack-cache'),
      allowCollectingMemory: true,
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
    
    // 启用代码分割
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
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