"use client"

import { Activity, ShieldCheck, CheckCircle2 } from "lucide-react"

export function ChannelHealthScore() {
  const metrics = [
    { label: "Etkileşim Kalitesi (Authenticity)", score: "%96.2", status: "Mükemmel" },
    { label: "Bot / Sahte Takipçi Oranı", score: "%0.8", status: "Güvenli" },
    { label: "Erişim İstikrar Katsayısı", score: "4.8 / 5", status: "Yüksek" },
    { label: "Algoritma Ceza / Shadowban Riski", score: "%0.0", status: "Temiz" },
  ]

  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Activity size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              KANAL SAĞLIK KARNESİ (CHANNEL HEALTH SCORE)
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Organik Güvenilirlik & Risk Kontrolü
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase italic flex items-center gap-1">
          <ShieldCheck size={12} />
          SAĞLIKLI
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
          >
            <div className="space-y-0.5">
              <p className="text-[10px] text-gray-400 font-bold uppercase italic tracking-wider">
                {m.label}
              </p>
              <p className="text-base font-black text-white italic">{m.score}</p>
            </div>
            <span className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase italic flex items-center gap-1">
              <CheckCircle2 size={10} />
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
