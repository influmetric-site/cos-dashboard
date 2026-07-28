"use client"

import { Video, Camera, Share2, Globe, ArrowUpRight } from "lucide-react"

const platforms = [
  {
    name: "YouTube Shorts",
    icon: Video,
    color: "text-red-500",
    bgColor: "bg-red-500/10 border-red-500/20",
    metrics: { reach: "1.2M", engagement: "%8.4", growth: "+24%" },
  },
  {
    name: "Instagram Reels",
    icon: Camera,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10 border-pink-500/20",
    metrics: { reach: "850K", engagement: "%12.1", growth: "+18%" },
  },
  {
    name: "TikTok Feed",
    icon: Share2,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
    metrics: { reach: "2.1M", engagement: "%15.8", growth: "+42%" },
  },
  {
    name: "LinkedIn Pulse",
    icon: Globe,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/20",
    metrics: { reach: "120K", engagement: "%5.2", growth: "+9%" },
  },
]

export function PlatformFusionCard() {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
            PLATFORMLAR ARASI ÇAPRAZ PERFORMANS (MULTI-PLATFORM FUSION)
          </h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
            YouTube, Instagram, TikTok & LinkedIn Karşılaştırması
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase italic">
          CANLI SENKRON
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platforms.map((p, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4 hover:border-white/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2.5 rounded-xl border ${p.bgColor} ${p.color}`}>
                <p.icon size={18} />
              </div>
              <span className="text-xs font-black text-emerald-400 italic flex items-center gap-0.5">
                {p.metrics.growth}
                <ArrowUpRight size={12} />
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-black text-white italic uppercase tracking-tight">
                {p.name}
              </h4>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 italic border-t border-white/5 pt-2">
                <span>Erişim: <strong className="text-white">{p.metrics.reach}</strong></span>
                <span>Etkileşim: <strong className="text-blue-400">{p.metrics.engagement}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
