import './globals.css';
import './styles/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="w-full min-h-screen mx-auto font-sans flex flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex-grow flex flex-col min-h-screen">
              {children}
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 