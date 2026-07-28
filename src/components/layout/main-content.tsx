"use client"

import { usePathname } from "next/navigation"
import { MobileNav } from "@/components/layout/mobile-nav"
import { LiveIndicator } from "@/components/ui/live-indicator"

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === "/login"

  return (
    <main
      className={`flex-1 ${
        isLogin
          ? "ml-0 p-0"
          : "ml-0 md:ml-64 p-4 sm:p-6 md:p-8 lg:p-12 pb-24 md:pb-12"
      } overflow-x-hidden transition-all duration-300 min-h-screen`}
    >
      {!isLogin && (
        <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 px-2 sm:px-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/[0.04] border border-white/10 rounded-full text-[9px] text-gray-400 font-black tracking-[0.2em] uppercase italic">
              v2.5.0-PRO
            </span>
          </div>

          <div className="flex items-center gap-3">
            <LiveIndicator label="SİSTEM AKIŞI AKTİF" pulseColor="emerald" />
          </div>
        </div>
      )}
      {children}
      {!isLogin && <MobileNav />}
    </main>
  )
}
