"use client"

import { Hash, Sparkles } from "lucide-react"

const hashtags = [
  { tag: "#AestheticVlog", volume: "4.2M İzlenme", growth: "+125%" },
  { tag: "#GRWMTurkey", volume: "2.8M İzlenme", growth: "+95%" },
  { tag: "#MinimalistStyle", volume: "1.9M İzlenme", growth: "+68%" },
  { tag: "#ContentCreatorLife", volume: "1.4M İzlenme", growth: "+42%" },
]

export function HashtagFrequencyRadar() {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Hash size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              YÜKSELEN HASHTAG & KELİME RADARI
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Algoritmanın Öne Çıkardığı Etiketler
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {hashtags.map((h, i) => (
          <div
            key={i}
            className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between hover:border-amber-500/30 transition-all"
          >
            <div>
              <span className="text-xs font-black text-amber-400 italic block">
                {h.tag}
              </span>
              <span className="text-[10px] text-gray-400 font-bold italic">
                {h.volume}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-black italic">
              {h.growth}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
