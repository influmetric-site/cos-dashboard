"use client"

import { Clock, Sparkles } from "lucide-react"

const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]
const hours = ["12:00", "15:00", "18:00", "21:00", "00:00"]

// Heatmap data matrix: 0=low, 1=med, 2=high, 3=peak
const heatmapMatrix = [
  [1, 2, 3, 2, 1], // Pzt
  [1, 1, 2, 3, 1], // Sal
  [2, 2, 3, 3, 2], // Çar
  [1, 2, 3, 2, 1], // Per
  [2, 3, 3, 3, 2], // Cum
  [3, 3, 3, 3, 3], // Cmt (Zirve)
  [2, 3, 3, 2, 1], // Paz
]

export function BestTimeHeatmap() {
  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Clock size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              EN İYİ YAYIN ZAMANI ISI HARİTASI (BEST TIME TO POST)
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Takipçilerinizin Canlı Aktiflik Saatleri
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase italic flex items-center gap-1">
          <Sparkles size={12} />
          ZİRVE: CUMARTESİ 18:00 - 21:00
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[400px] space-y-2">
          {/* Hour Labels Header */}
          <div className="grid grid-cols-6 gap-2 text-[10px] font-black text-gray-400 italic text-center">
            <span className="text-left">Gün / Saat</span>
            {hours.map((h, i) => (
              <span key={i}>{h}</span>
            ))}
          </div>

          {/* Days Grid */}
          {days.map((day, dIdx) => (
            <div key={dIdx} className="grid grid-cols-6 gap-2 items-center">
              <span className="text-xs font-black text-white italic text-left">
                {day}
              </span>
              {heatmapMatrix[dIdx].map((level, hIdx) => {
                const colors = [
                  "bg-white/5 border-white/5 text-gray-600",
                  "bg-blue-500/20 border-blue-500/30 text-blue-300",
                  "bg-blue-600/40 border-blue-500/50 text-blue-200",
                  "bg-blue-600 border-blue-400 text-white font-black shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse",
                ]
                return (
                  <div
                    key={hIdx}
                    className={`h-10 rounded-xl border flex items-center justify-center text-[10px] transition-all cursor-pointer ${colors[level]}`}
                    title={`${day} ${hours[hIdx]} - Aktiflik Seviyesi: ${level + 1}/4`}
                  >
                    {level === 3 ? "🔥 Zirve" : level === 2 ? "Yüksek" : level === 1 ? "Orta" : "Düşük"}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
