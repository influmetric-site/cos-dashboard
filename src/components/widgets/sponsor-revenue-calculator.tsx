"use client"

import { useState } from "react"
import { DollarSign, TrendingUp, Sparkles } from "lucide-react"

export function SponsorRevenueCalculator() {
  const [monthlyDeals, setMonthlyDeals] = useState(3)
  const [cpmRate, setCpmRate] = useState(45)

  // Estimated revenue calculation
  const estimatedRevenue = monthlyDeals * 35000 + (cpmRate * 500)

  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <DollarSign size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              SPONSOR GELİR SİMÜLATÖRÜ (REVENUE CALCULATOR)
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Aylık Tahmini Sponsorluk & Affiliate Kazanç Projeksiyonu
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-wider block">
              Aylık Hedeflenen Anlaşma Sayısı: <strong className="text-white">{monthlyDeals} Anlaşma</strong>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={monthlyDeals}
              onChange={(e) => setMonthlyDeals(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-wider block">
              Ortalama Taban CPM (₺): <strong className="text-emerald-400">₺{cpmRate}</strong>
            </label>
            <input
              type="range"
              min={20}
              max={120}
              value={cpmRate}
              onChange={(e) => setCpmRate(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-[#0A0A0E] to-transparent border border-emerald-500/30 flex flex-col items-center justify-center text-center space-y-2">
          <TrendingUp size={24} className="text-emerald-400" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
            Aylık Tahmini Brüt Sponsorluk Geliri
          </span>
          <span className="text-4xl sm:text-5xl font-black text-white italic tracking-tighter">
            ₺{estimatedRevenue.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-emerald-400 italic">
            + Vergi & Komisyon Payları Dahil Projeksiyon
          </span>
        </div>
      </div>
    </div>
  )
}
