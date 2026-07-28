"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutGrid, Activity, TrendingUp, Target, 
  FileText, BarChart3, Zap
} from "lucide-react"

const navItems = [
  { id: "genel", name: "Genel Bakış", href: "/", icon: LayoutGrid, color: "blue" },
  { id: "metrik", name: "Metrik Füzyonu", href: "/metrik", icon: Activity, color: "blue" },
  { id: "buyume", name: "Büyüme Analizi", href: "/buyume", icon: TrendingUp, color: "blue" },
  { id: "performans", name: "Performans", href: "/performans", icon: Activity, color: "blue" },
  { id: "strateji", name: "Strateji", href: "/strateji", icon: Target, color: "blue" },
  { id: "raporlar", name: "Raporlar", href: "/raporlar", icon: FileText, color: "emerald" },
  { id: "trend-sensoru", name: "Trend Sensörü", href: "/trend-sensoru", icon: Zap, color: "amber" },
  { id: "pazar-analizi", name: "Pazar Analizi", href: "/pazar-analizi", icon: BarChart3, color: "amber" },
]

export function Sidebar() {
  const pathname = usePathname()
  
  // Dinamik Renk Belirleyici
  const getColorClasses = (color: string, isActive: boolean) => {
    if (!isActive) return "text-gray-300 hover:text-white hover:bg-white/[0.05]";
    
    switch (color) {
      case "emerald": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "amber": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      default: return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    }
  };

  const getIndicatorColor = (color: string) => {
    switch (color) {
      case "emerald": return "bg-emerald-500 shadow-[0_0_15px_#10b981]";
      case "amber": return "bg-amber-500 shadow-[0_0_15px_#f59e0b]";
      default: return "bg-blue-500 shadow-[0_0_15px_#3b82f6]";
    }
  };

  return (
    <aside className="w-64 h-screen bg-[#0A0A0B] border-r border-white/5 flex flex-col fixed left-0 top-0 z-50 overflow-hidden font-sans">
      
      {/* LOGO ALANI - COS® ORİJİNAL KİMLİK */}
      <div className="p-8 border-b border-white/5">
        <Link href="/">
          <h1 className="text-xl font-bold text-white tracking-tight leading-none uppercase italic cursor-pointer">
            COS<sup className="text-[10px] font-normal opacity-50 ml-0.5 not-italic">®</sup>
            <div className="text-[10px] tracking-[0.3em] text-gray-500 font-medium mt-1 uppercase not-italic">Zekâ Çekirdeği</div>
          </h1>
        </Link>
      </div>

      {/* NAVİGASYON - OKUNABİLİR VE SCROLLBARSIZ */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const colorStyles = getColorClasses(item.color, isActive);
          const indicatorStyle = getIndicatorColor(item.color);

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group relative border border-transparent ${colorStyles}`}
            >
              <div className="flex items-center gap-3">
                <item.icon 
                  size={18} 
                  className={`transition-colors duration-300 ${isActive ? "" : "text-gray-400 group-hover:text-white"}`} 
                />
                <span className={`text-sm font-semibold transition-all duration-300 ${isActive ? "opacity-100" : "opacity-90 group-hover:opacity-100"}`}>
                  {item.name}
                </span>
              </div>
              
              {isActive && (
                <div className={`absolute left-0 w-1 h-5 rounded-r-full transition-all duration-300 ${indicatorStyle}`} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* KİŞİSELLEŞTİRİLMİŞ OPERASYONEL PANEL */}
      <div className="p-5 m-4 bg-white/[0.02] border border-white/5 rounded-[1.5rem] group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] text-gray-500 uppercase font-black tracking-[0.15em] italic">
            Operasyonel Vizör
          </span>
          {/* Canlı Sinyal Işığı */}
          <div className="relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full z-10" />
            <div className="absolute inset-0 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping opacity-60" />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <p className="text-[11px] text-gray-300 font-medium tracking-tight">
            Aktif İzleme: <span className="text-white font-black italic">@batur</span>
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 bg-emerald-500/50 rounded-full" />
            <p className="text-[9px] text-emerald-500/80 font-bold uppercase tracking-tight italic">
              Veri Akışı Stabil
            </p>
          </div>
        </div>
      </div>

      {/* Global CSS for hidden scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </aside>
  )
}