"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Activity, TrendingUp, Zap, ShieldAlert } from "lucide-react"
import { cn } from "@/utils/cn"

const mobileNavItems = [
  { name: "COS", href: "/cos", icon: LayoutGrid },
  { name: "Metrik", href: "/metrik", icon: Activity },
  { name: "Büyüme", href: "/buyume", icon: TrendingUp },
  { name: "Trendler", href: "/trend-sensoru", icon: Zap },
  { name: "Admin", href: "/admin", icon: ShieldAlert },
]

export function MobileNav() {
  const pathname = usePathname()

  if (pathname === "/login") return null

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0E]/95 backdrop-blur-2xl border-t border-white/10 px-3 py-2 shadow-2xl"
      aria-label="Mobil Gezinme Menüsü"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 px-2 rounded-xl transition-all duration-200 active:scale-95",
                isActive
                  ? "text-blue-400 bg-blue-500/15 font-bold"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <item.icon
                size={18}
                className={cn("mb-1 transition-transform", isActive && "scale-110")}
              />
              <span className="text-[10px] uppercase font-bold tracking-wider italic leading-none">
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
