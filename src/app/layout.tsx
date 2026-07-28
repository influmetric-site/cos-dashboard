import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { MainContent } from "@/components/layout/main-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INFLUMETRIC COS® - Creator Optimization System",
  description: "INFLUMETRIC COS® çekirdek algoritmaları ve analitik veri yönetim arayüzü.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060607] text-white font-sans selection:bg-blue-500/30">
        <div className="flex min-h-screen">
          <Sidebar />
          <MainContent>{children}</MainContent>
        </div>
      </body>
    </html>
  );
}
