import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "animate.css";
import { Providers } from "../components/Providers";
import { Inter, Lexend } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LoadingProvider } from "@/contexts/LoadingProvider";
import { ThemeProvider } from '../contexts/ThemeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "Zabbot",
  description: "Zabbot Language Learning App",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${lexend.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider>
          <LanguageProvider>
            <LoadingProvider>
              {/* <Suspense fallback={<Loader />}> */}
              {children}
              {/* </Suspense> */}
              </LoadingProvider>
          </LanguageProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
