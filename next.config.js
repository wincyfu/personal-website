/** @type {import('next').NextConfig} */
const nextConfig = {
  // 为Vercel部署优化图片配置
  images: {
    unoptimized: true,
    domains: ['wincyfu.vercel.app'],
  },
  // 生产环境启用严格模式
  reactStrictMode: true,
  // 完全禁用输出文件跟踪
  outputFileTracing: false,
  // 优化webpack配置
  webpack: (config, { dev, isServer }) => {
    // 禁用缓存
    config.cache = false;
    
    // 排除版本备份文件夹
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /版本备份/,
    });
    
    // 生产环境优化
    if (!dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  // 压缩和优化
  compress: true,
  // 启用静态导出优化
  trailingSlash: false,
};

module.exports = nextConfig; 