"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Cpu, Zap, Activity } from "lucide-react"
import { LiveIndicator } from "@/components/ui/live-indicator"
import { cn } from "@/utils/cn"

interface IntelligenceCoreProps {
  data?: {
    title?: string
    score?: number
    sync_rate?: string
    processing_capacity?: string
  }
}

const liveEvents = [
  "⚡ Algoritma Sıçraması: +4.2% Etkileşim Skoru",
  "📡 Canlı Trend Akışı: 'AI Content Systems' %88 Yükselişte",
  "🛡️ Çekirdek Güvenlik: Supabase RLS Aktif Veri Doğrulandı",
  "📊 Metrik Füzyon: 12.4K Yeni Veri Noktası İşlendi",
  "🚀 Niş Stratejisi: Video Format Süresi 42sn Olarak Önerildi",
]

export function IntelligenceCore({ data }: IntelligenceCoreProps) {
  const score = data?.score ?? 96.7
  const chartData = [{ value: score }, { value: Math.max(0, 100 - score) }]
  const title = data?.title ?? "COS® ZEKÂ ÇEKİRDEĞİ"
  const syncRate = data?.sync_rate ?? `${score}%`
  const capacity = data?.processing_capacity ?? "2.4 PFLOPS"

  const [activeEventIndex, setActiveEventIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveEventIndex((prev) => (prev + 1) % liveEvents.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-[2rem] h-full flex flex-col justify-between space-y-6 relative overflow-hidden border border-white/10">
      {/* Background Ambient Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Cpu size={16} className="text-blue-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              {title}
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Canlı Analiz Motoru
            </p>
          </div>
        </div>
        <LiveIndicator label="AKTİF" pulseColor="blue" showText={true} />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={112}>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={42}
                outerRadius={54}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                <Cell fill="#3B82F6" />
                <Cell fill="rgba(255,255,255,0.06)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-black text-xl sm:text-2xl text-white italic tracking-tighter">
              %{score}
            </span>
            <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest italic">
              Zekâ İndeksi
            </span>
          </div>
        </div>

        <div className="space-y-3 flex-1 text-[11px] text-gray-400 font-medium italic">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Zap size={12} className="text-blue-400" />
              Senkronizasyon:
            </span>
            <span className="text-white font-black">{syncRate}</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Activity size={12} className="text-indigo-400" />
              İşleme Gücü:
            </span>
            <span className="text-white font-black">{capacity}</span>
          </div>
        </div>
      </div>

      {/* Live Event Ticker */}
      <div className="p-3 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <p className="text-[10px] text-emerald-300 font-bold tracking-wide italic truncate transition-all duration-500">
            {liveEvents[activeEventIndex]}
          </p>
        </div>
      </div>
    </div>
  )
}