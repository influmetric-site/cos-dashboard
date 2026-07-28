"use client"

import { useState } from "react"
import { Zap, Sparkles, Calculator } from "lucide-react"

export function ViralitySimulator() {
  const [videoLength, setVideoLength] = useState(30)
  const [hasHook, setHasHook] = useState(true)
  const [nicheMatch, setNicheMatch] = useState(90)

  // Virality Score calculation formula
  const baseScore = Math.min(
    99,
    Math.round(
      (videoLength <= 45 ? 40 : 25) +
        (hasHook ? 35 : 10) +
        (nicheMatch * 0.25)
    )
  )

  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Zap size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              VİRALLEŞME OLASILIK SİMÜLATÖRÜ (PREDICTIVE VIRALITY SCORE)
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Video Fikrinizin Tahmini Erişim Potansiyeli
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Controls */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-wider block">
              Video Süresi: <strong className="text-white">{videoLength} saniye</strong>
            </label>
            <input
              type="range"
              min={10}
              max={120}
              value={videoLength}
              onChange={(e) => setVideoLength(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="text-xs font-bold italic text-gray-300">
              İlk 3 Saniyede Güçlü Kanca (Hook) Var mı?
            </span>
            <button
              onClick={() => setHasHook(!hasHook)}
              className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase italic transition-all cursor-pointer ${
                hasHook
                  ? "bg-amber-500 text-black font-extrabold"
                  : "bg-white/10 text-gray-400"
              }`}
            >
              {hasHook ? "EVET (+35P)" : "HAYIR"}
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase italic tracking-wider block">
              Niş Konusu Uyum Derecesi: <strong className="text-amber-400">%{nicheMatch}</strong>
            </label>
            <input
              type="range"
              min={50}
              max={100}
              value={nicheMatch}
              onChange={(e) => setNicheMatch(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Output Score Box */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center justify-center text-center space-y-2">
          <Sparkles size={24} className="text-amber-400 animate-bounce" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
            Tahmini Viralleşme Skoru
          </span>
          <span className="text-5xl font-black text-white italic tracking-tighter">
            %{baseScore}
          </span>
          <span className="text-[11px] font-bold text-emerald-400 italic">
            {baseScore >= 80 ? "🔥 YÜKSEK VİRAL ŞANSI (300K - 800K İzlenme)" : "⚠️ ORTA SEVİYE ERİŞİM"}
          </span>
        </div>
      </div>
    </div>
  )
}
