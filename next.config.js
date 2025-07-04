/** @type {import('next').NextConfig} */
const nextConfig = {
  // 完全禁用图片优化，使用原始静态图片
  images: {
    unoptimized: true
  },
  // 关闭严格模式，避免开发环境中的双重渲染
  reactStrictMode: false,
  // 禁用构建跟踪，避免递归问题
  outputFileTracing: false,
  // 禁用 webpack 缓存，解决路径问题
  webpack: (config) => {
    config.cache = false;
    // 排除版本备份文件夹
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /版本备份/,
    });
    return config;
  },
};

module.exports = nextConfig; 