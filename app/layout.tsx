import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '도구',
  description: '나만의 도구 모음',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <Providers>
          <Header />
          <div className="absolute top-0 h-full w-full pt-10">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
