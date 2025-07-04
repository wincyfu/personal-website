import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '全部设计作品 | 作品集',
  description: '汇集移动端、网站、大屏及其他领域的设计作品，展示多元化的设计能力与创意',
};

export default function AllDesignsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
