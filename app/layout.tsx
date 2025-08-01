import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "animate.css";
import { Providers } from "../components/Providers";
import { Inter, Lexend } from "next/font/google";
import { Alerts } from "next-alert";

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
          {children}
          <div className="custom-alerts">
          <Alerts
            position="top-left"
            direction="left"
            timer={6000}
          />
          </div>
        </Providers>
      </body>
    </html>
  );
}
