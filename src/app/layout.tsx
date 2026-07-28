import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "INFLUMETRIC COS® - Zekâ Çekirdeği Dashboard",
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
          
          <main className="flex-1 ml-64 p-12 overflow-x-hidden">
            {/* ÜST GLOBAL STATUS BAR */}
            <div className="flex justify-end gap-3 mb-8 px-6">
              <div className="px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-full text-[9px] text-gray-500 font-black tracking-[0.2em] uppercase italic">
                v2.4.0-STABLE
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] text-blue-400 font-black tracking-[0.2em] uppercase italic">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                Canlı Veri Akışı
              </div>
            </div>

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
