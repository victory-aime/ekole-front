import { Toaster } from '_components/ui/toaster';
import { Geist, Geist_Mono } from 'next/font/google';
import { LoaderProvider } from '_context/loaderContext';
import React from 'react';
import GlobalApplicationProvider from './provider/GlobalApplicationProvider';
import { ThemeProvider } from '_components/ui/provider';
import { I18nProvider } from './provider/i18n-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalApplicationProvider>
          <ThemeProvider>
            <LoaderProvider minDuration={2000}>
              <Toaster />
              <I18nProvider>{children}</I18nProvider>
            </LoaderProvider>
          </ThemeProvider>
        </GlobalApplicationProvider>
      </body>
    </html>
  );
}
