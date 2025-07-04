/** @type {import('next').NextConfig} */
const nextConfig = {
  // 完全禁用图片优化，使用原始静态图片
  images: {
    unoptimized: true
  },
  // 关闭严格模式，避免开发环境中的双重渲染
  reactStrictMode: false,
  // 禁用 webpack 缓存，解决路径问题
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig; 