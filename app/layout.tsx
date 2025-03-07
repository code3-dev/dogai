import './globals.css';
import type { Metadata } from 'next';
import { Vazirmatn, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/components/language-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'Dog AI - Modern AI Image Generation Platform',
  description: 'Generate beautiful images with AI',
  keywords: ['dog', 'ai', 'image generation', 'artificial intelligence'],
  authors: [{ name: 'Hossein Pira' }],
  openGraph: {
    title: 'Dog AI - Modern AI Image Generation Platform',
    description: 'Generate beautiful images with AI',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${vazirmatn.variable} font-sans`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}