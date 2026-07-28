"use client"

import { Flame, ShieldAlert, HeartPulse } from "lucide-react"

interface BurnoutIndexProps {
  score?: number
  riskLevel?: "DÜŞÜK" | "ORTA" | "YÜKSEK"
}

export function BurnoutIndex({
  score = 18,
  riskLevel = "DÜŞÜK",
}: BurnoutIndexProps) {
  return (
    <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-4 text-left relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <Flame size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              KİTLE YORGUNLUĞU İNDEKSİ
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Audience Burnout Index
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase italic flex items-center gap-1">
          <HeartPulse size={12} />
          {riskLevel} RİSK
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-2xl font-black text-white italic tracking-tighter">
            %{score} <span className="text-xs text-gray-400 font-bold">Yorgunluk Oranı</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-bold italic">
            İçerik Frekansı Optimal (Günde 1.2 İçerik)
          </span>
        </div>

        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-gray-400 font-bold italic leading-relaxed border-l-2 border-emerald-500/50 pl-3">
        Kitle etkileşim yorgunluğu güvenli bölgede. Paylaşım aralıklarınız takipçi doygunluğu oluşturmuyor.
      </p>
    </div>
  )
}
