"use client"

import { Music, TrendingUp, ArrowUpRight } from "lucide-react"

const trendingTracks = [
  {
    title: "Aesthetic Chillout Beats (Slowed + Reverb)",
    artist: "Synthwave / Creator Sound",
    usage: "142K Video",
    growth: "+88%",
    recommendation: "GRWM ve VLog içeriklerinde %40 daha fazla izleme süresi.",
  },
  {
    title: "Cyberpunk Transition Sub-Bass",
    artist: "SFX Audio Lab",
    usage: "89K Video",
    growth: "+64%",
    recommendation: "15 saniyelik Hızlı Geçiş Reels videolarına uygun.",
  },
  {
    title: "Minimalist Soft Piano Routine",
    artist: "Acoustic Vibe",
    usage: "54K Video",
    growth: "+35%",
    recommendation: "Kamera arkası ve günün özeti Story paylaşımı.",
  },
]

export function AudioTrendRadar() {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Music size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              SES & MÜZİK TREND RADARI (AUDIO TREND RADAR)
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Reels & TikTok'ta Yükselen Arka Plan Sesleri
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase italic flex items-center gap-1">
          <TrendingUp size={12} />
          CANLI TREND SESLER
        </span>
      </div>

      <div className="space-y-3">
        {trendingTracks.map((track, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs">
                  🎵
                </div>
                <div>
                  <h4 className="text-sm font-black text-white italic uppercase tracking-tight">
                    {track.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold italic">
                    {track.artist} • Kullanım:{" "}
                    <strong className="text-white">{track.usage}</strong>
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-400 italic flex items-center gap-0.5">
                {track.growth}
                <ArrowUpRight size={12} />
              </span>
            </div>
            <p className="text-[11px] text-gray-300 font-bold italic border-l-2 border-amber-500/40 pl-3 py-0.5">
              💡 {track.recommendation}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
