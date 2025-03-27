import type {Metadata} from 'next';
import {Inter as FontSans} from 'next/font/google';
import './globals.css';
import {cn} from '@/lib/utils';
import {ThemeProvider} from '@/providers/theme-provider';
import {QueryProvider} from '@/providers/query-provider';
import {Header} from '@/components/header';
import {Toaster} from '@/components/ui/toaster';
import React from 'react';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Library Management System",
  description: "Modern library management system for books and movies",
};

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <div className="flex-1">{children}</div>
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}