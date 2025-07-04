import './globals.css';
import './styles/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { PortfolioVisitProvider } from '@/contexts/PortfolioVisitContext';
import { ProjectViewProvider } from '@/contexts/ProjectViewContext';

export const metadata: Metadata = {
  title: 'WincyFu | AI 设计师 & 开发者',
  description: '关注AI技术与设计结合的个人网站，分享AI设计工具、产品案例和技术教程。',
  keywords: 'AI, 设计, UI/UX, AIGC, 产品设计, 自媒体',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Favicon配置 - 主要使用SVG */}
        <link rel="icon" href="/images/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#22c45e" />
        
        <link rel="stylesheet" href="/css/theme-override.css" />
      </head>
      <body className="w-full min-h-screen mx-auto font-sans flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <PortfolioVisitProvider>
              <ProjectViewProvider>
                <div className="flex-grow flex flex-col min-h-screen">
                  {children}
                </div>
              </ProjectViewProvider>
            </PortfolioVisitProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 