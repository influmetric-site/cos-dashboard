"use client"

import { usePathname } from "next/navigation"

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === "/login"

  return (
    <main className={`flex-1 ${isLogin ? "ml-0 p-0" : "ml-64 p-12"} overflow-x-hidden transition-all`}>
      {!isLogin && (
        <div className="flex justify-end gap-3 mb-8 px-6">
          <div className="px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-full text-[9px] text-gray-500 font-black tracking-[0.2em] uppercase italic">
            v2.4.0-STABLE
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] text-blue-400 font-black tracking-[0.2em] uppercase italic">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            Canlı Veri Akışı
          </div>
        </div>
      )}
      {children}
    </main>
  )
}
