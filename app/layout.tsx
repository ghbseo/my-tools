import type { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Providers from './providers';
import { Toaster } from '@/components/ui/sonner';

const font = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inconsolata',
});

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
      <body className={font.className}>
        <Providers>
          <Header />
          <div className="absolute top-0 h-full w-full pt-10">{children}</div>
          <Toaster richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
