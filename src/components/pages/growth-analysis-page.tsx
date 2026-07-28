"use client"

import React, { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, Zap, Clock, Info } from "lucide-react"
import { LiveIndicator } from "@/components/ui/live-indicator"
import { BestTimeHeatmap } from "@/components/widgets/best-time-heatmap"
import { ViralitySimulator } from "@/components/widgets/virality-simulator"
import { cn } from "@/utils/cn"

interface GrowthAnalysisPageProps {
  categoryMap?: Record<string, any>
}

interface AnalysisCard {
  id: string
  title: string
  score: string
  label: string
  longDesc: string
  icon: any
  params: Record<string, string>
}

const defaultWeeklyGrowthData = [
  { week: "H01", followers: 210000, reach: 140000 },
  { week: "H02", followers: 340000, reach: 280000 },
  { week: "H03", followers: 310000, reach: 210000 },
  { week: "H04", followers: 480000, reach: 420000 },
  { week: "H05", followers: 520000, reach: 490000 },
  { week: "H06", followers: 640000, reach: 580000 },
]

export function GrowthAnalysisPage({ categoryMap }: GrowthAnalysisPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>("hiz")

  const analytics = categoryMap?.["analytics"] || {}
  const growth = categoryMap?.["growth_strategy"] || {}

  const pageTitle = growth.title || "Büyüme Metrikleri & Stratejileri"
  const pageSubtitle =
    growth.subtitle || "Influmetric Veri Madenciliği ve Tahminleme Arayüzü"

  const netReach = analytics.kpi_metrics?.[0]?.value || growth.net_reach || "2.4M"
  const loyaltyVal = analytics.kpi_metrics?.[1]?.value || "92.4%"
  const boostNote =
    growth.boost_note ||
    "Influmetric COS® sistemi, hedef kitleniz için yüksek etkileşim boşluğu saptadı. Kitle analizi verilerine göre %94 uyum ile ivme yakalayabilirsiniz."

  const analysisCards: AnalysisCard[] = [
    {
      id: "hiz",
      title: "Büyüme İvmesi",
      score: analytics.kpi_metrics?.[0]?.change || "+18.4%",
      label: "HAFTALIK MOMENTUM",
      longDesc: `Haftalık Büyüme Hızı, yedi günlük periyottaki takipçi değişim katsayısını temsil eder. Toplam net erişim ${netReach} seviyesindedir.`,
      icon: TrendingUp,
      params: {
        "H/H Değişim": analytics.kpi_metrics?.[0]?.change || "+18%",
        Zirve: "Pazar",
        Trend: "Boğa",
      },
    },
    {
      id: "projeksiyon",
      title: "Yapay Zeka Tahmini",
      score: "7.2K+",
      label: "YZ PROJEKSİYONU",
      longDesc:
        "COS® motoru, mevcut içerik takviminle uyumlu olarak yeni organik takipçi girişi beklemektedir.",
      icon: Zap,
      params: { Güven: "%94", Tahmin: "+7.2K", Risk: "Düşük" },
    },
    {
      id: "kalite",
      title: "Kitle Sadakati",
      score: loyaltyVal,
      label: "KİTLE SADAKATİ",
      longDesc: `Gelen takipçilerin yaşam tarzı ve dikey nişinizle doğrudan ilgili olduğu saptandı. Sadakat skoru ${loyaltyVal} olarak doğrulandı.`,
      icon: Users,
      params: { Aktiflik: "Yüksek", Segment: "Premium", Sadakat: loyaltyVal },
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 animate-in fade-in duration-500 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 pb-6 gap-4">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-blue-400">
              <Clock size={14} />
              <span className="text-[10px] font-black tracking-[0.25em] uppercase italic">
                Aşama 02 / Büyüme Trajektörü
              </span>
            </div>
            <LiveIndicator label="CANLI MODEL" pulseColor="blue" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
            {pageTitle}
          </h2>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] italic">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6 sm:gap-10">
        {/* Left: Chart */}
        <div className="col-span-12 lg:col-span-8 group">
          <div className="glass-card glass-card-hover p-6 sm:p-10 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 border border-white/10">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
              <TrendingUp size={140} className="text-blue-500" />
            </div>

            <div className="relative z-10 flex justify-between items-center mb-8">
              <div className="space-y-1 text-left">
                <h3 className="text-lg sm:text-xl font-black text-white italic uppercase tracking-tight">
                  Kanal Performans İndeksi
                </h3>
                <p className="text-xs text-gray-400 font-bold italic">
                  Büyüme Algoritması v4.2
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">
                  Haftalık Net Erişim
                </p>
                <p className="text-2xl sm:text-3xl font-black text-blue-400 italic tracking-tighter">
                  {netReach}
                </p>
              </div>
            </div>

            <div className="h-[350px] sm:h-[420px] w-full text-left min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={320}>
                <AreaChart
                  data={defaultWeeklyGrowthData}
                  margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorF" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="8 8"
                    stroke="rgba(255,255,255,0.06)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#9CA3AF",
                      fontSize: 11,
                      fontWeight: 900,
                      fontStyle: "italic",
                    }}
                    dy={10}
                  />
                  <Tooltip
                    cursor={{ stroke: "#3B82F6", strokeWidth: 1, strokeDasharray: "5 5" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#0A0A0E] border border-blue-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-md text-left">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 italic">
                              {payload[0].payload.week} Analizi
                            </p>
                            <p className="text-base font-black text-white italic">
                              {payload[0].value?.toLocaleString()} Takipçi
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold mt-1">
                              İvme Katsayısı: +2.4x
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="followers"
                    stroke="#3B82F6"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorF)"
                    dot={{ fill: "#3B82F6", r: 4, strokeWidth: 2, stroke: "#0B0F17" }}
                    activeDot={{ r: 7, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right: Strategy Cards */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {analysisCards.map((card: AnalysisCard) => (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === card.id}
              className={cn(
                "group transition-all duration-300 relative overflow-hidden border focus-visible:ring-2 focus-visible:ring-blue-500 outline-none cursor-pointer min-h-[48px]",
                expandedId === card.id
                  ? "bg-gradient-to-br from-blue-600/15 via-[#0A0A0E] to-transparent border-blue-500/40 rounded-[2rem] shadow-2xl"
                  : "glass-card rounded-[1.5rem] hover:border-white/20"
              )}
              onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setExpandedId(expandedId === card.id ? null : card.id)
                }
              }}
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between text-left">
                  <div
                    className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      expandedId === card.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white/5 text-gray-400"
                    )}
                  >
                    <card.icon size={18} />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-white italic tracking-tighter block">
                      {card.score}
                    </span>
                    <span
                      className={cn(
                        "text-[8px] font-black uppercase tracking-widest block",
                        expandedId === card.id ? "text-blue-400" : "text-gray-500"
                      )}
                    >
                      {card.label}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <h4 className="text-base font-black text-gray-100 italic uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h4>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500",
                      expandedId === card.id
                        ? "max-h-64 opacity-100 mt-3"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-xs text-gray-300 font-medium italic leading-relaxed border-l-2 border-blue-500/50 pl-3 py-1 text-left">
                      {card.longDesc}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {Object.entries(card.params).map(([key, val]) => (
                        <div
                          key={key}
                          className="bg-white/5 p-2 rounded-xl border border-white/5 text-center"
                        >
                          <p className="text-[8px] text-gray-400 font-black uppercase mb-0.5">
                            {key}
                          </p>
                          <p className="text-[10px] font-black text-gray-100 italic">
                            {val}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Strategic Boost Box */}
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform pointer-events-none">
              <Zap size={70} fill="white" />
            </div>
            <div className="relative z-10 space-y-3 text-left">
              <div className="flex items-center gap-2 text-left">
                <Info size={14} className="text-blue-200" />
                <h5 className="text-lg font-black italic uppercase tracking-tighter">
                  Stratejik Boost
                </h5>
              </div>
              <p className="text-xs font-bold italic opacity-95 leading-relaxed">
                {boostNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW MODULES: BEST TIME HEATMAP & VIRALITY SIMULATOR */}
      <section className="space-y-6">
        <BestTimeHeatmap />
        <ViralitySimulator />
      </section>
    </div>
  )
}