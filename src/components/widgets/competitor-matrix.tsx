"use client"

import { Target, TrendingUp, Award } from "lucide-react"

const competitors = [
  {
    name: "Sizin Profiliniz (INFLUMETRIC)",
    reach: "2.4M",
    engagement: "%19.5",
    viralScore: 94,
    isSelf: true,
  },
  {
    name: "Sektör Lideri A",
    reach: "1.8M",
    engagement: "%14.2",
    viralScore: 82,
    isSelf: false,
  },
  {
    name: "Niş Üreticisi B",
    reach: "950K",
    engagement: "%11.8",
    viralScore: 76,
    isSelf: false,
  },
]

export function CompetitorMatrix() {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Target size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              RAKİP BENCHMARK MATRİSİ (COMPETITOR MATRIX)
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Sektördeki İlk 3 Creator ile Kıyaslama
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase italic flex items-center gap-1">
          <Award size={12} />
          ZİRVEDESİNİZ
        </span>
      </div>

      <div className="space-y-3">
        {competitors.map((c, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              c.isSelf
                ? "bg-gradient-to-r from-blue-600/20 via-[#0A0A0E] to-transparent border-blue-500/40 shadow-lg"
                : "bg-white/[0.03] border-white/5"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-black italic">
                #{i + 1}
              </span>
              <div>
                <h4 className="text-sm font-black text-white italic uppercase tracking-tight">
                  {c.name}
                </h4>
                <p className="text-[10px] text-gray-400 font-bold italic">
                  Erişim: <strong className="text-white">{c.reach}</strong> • Etkileşim:{" "}
                  <strong className="text-blue-400">{c.engagement}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="text-right">
                <span className="text-[9px] text-gray-400 font-black uppercase italic block">
                  Viral Skoru
                </span>
                <span className="text-sm font-black text-emerald-400 italic">
                  %{c.viralScore}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
