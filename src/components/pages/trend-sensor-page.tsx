"use client"

import React, { useState } from "react"
import {
  Zap,
  Video,
  Camera,
  Users,
  ChevronDown,
  ChevronUp,
  BarChart3,
  DollarSign,
  Search,
  Sparkles,
} from "lucide-react"
import { LiveIndicator } from "@/components/ui/live-indicator"
import { Skeleton } from "@/components/ui/skeleton"

interface TrendSensorPageProps {
  categoryMap?: Record<string, any>
}

interface TrendInsight {
  category: string
  icon: any
  marketTrend: string
  userAction: string
  impact: string
  type: string
  score: number
}

export function TrendSensorPage({ categoryMap }: TrendSensorPageProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const analytics = categoryMap?.["analytics"] || {}
  const ideasObj = categoryMap?.["content_ideas"] || {}

  const pageTitle = ideasObj.title || "Trend Sensörü & Viral Fikirler"
  const weeklyFocus = ideasObj.weekly_focus || "Canlı Radar Aktif"
  const ideasList = Array.isArray(ideasObj.ideas) ? ideasObj.ideas : []

  const globalScore = Math.round(analytics.score_value ?? 95.8)
  const impactRate = analytics.kpi_metrics?.[2]?.value || "%19.5"

  const lifestyleInsights: TrendInsight[] =
    ideasList.length > 0
      ? ideasList.map((item: any, idx: number) => ({
          category: item.format || "Viral Konsept",
          icon: <Video size={18} />,
          marketTrend: `Tahmini İzlenme: ${item.estimated_views || "300K - 500K"}`,
          userAction: item.title || "Konsept Adı",
          impact: `+${25 + idx * 5}%`,
          type: "positive",
          score: Math.min(100, 88 + idx * 3),
        }))
      : [
          {
            category: "Görsel Estetik",
            icon: <Camera size={18} />,
            marketTrend:
              "Vlogger segmentinde 'Soft-Minimalist' editler %55 daha fazla izleniyor.",
            userAction:
              "Canlı ve yüksek kontrastlı renk imzan nişinde hala ayrıştırıcı bir güç.",
            impact: "+28%",
            type: "positive",
            score: 95,
          },
          {
            category: "İçerik Stratejisi",
            icon: <Video size={18} />,
            marketTrend:
              "Makyaj ve lifestyle nişinde 15 saniyelik 'Hızlı Geçiş' videoları revaçta.",
            userAction:
              "Hala 10 dakika üzeri uzun anlatımlı tutorial içeriklerine ağırlık veriyorsun.",
            impact: "-18%",
            type: "loss",
            score: 72,
          },
          {
            category: "Topluluk Dinamiği",
            icon: <Users size={18} />,
            marketTrend:
              "Takipçiler 'Mükemmel Hayat' yerine 'Doğal Anlar' görmek istiyor.",
            userAction:
              "Kamera arkası ve hazırlık süreçlerini paylaşman samimiyet skorunu koruyor.",
            impact: "+32%",
            type: "positive",
            score: 96,
          },
        ]

  const filteredInsights = lifestyleInsights.filter((insight) =>
    searchQuery
      ? insight.userAction.toLowerCase().includes(searchQuery.toLowerCase()) ||
        insight.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  )

  const visibleInsights: TrendInsight[] = isExpanded
    ? filteredInsights
    : filteredInsights.slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 animate-in fade-in duration-500 text-left">
      {/* Header Section */}
      <header className="relative p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#0A0A0E]/80 border border-white/10 overflow-hidden text-left backdrop-blur-2xl shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-4 text-left max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Zap size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 italic">
                  {weeklyFocus}
                </span>
              </div>
              <LiveIndicator label="CANLI SENSOR" pulseColor="amber" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
              {pageTitle}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-bold italic leading-relaxed uppercase tracking-widest">
              Model ve Creator segmentindeki <span className="text-white font-black">1,450+ taranan profil</span> verileriyle canlı kıyaslama radar mimarisi.
            </p>
          </div>

          <div className="flex flex-row gap-3 p-3 bg-white/[0.03] rounded-[2rem] border border-white/10 backdrop-blur-md w-full sm:w-auto justify-between sm:justify-start">
            <div className="px-6 py-4 text-left">
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1 italic">
                Sponsor Dönüşüm
              </p>
              <p className="text-3xl sm:text-4xl font-black text-white italic tracking-tighter flex items-center gap-1">
                {impactRate}
                <span className="text-sm text-emerald-400 italic">↑</span>
              </p>
            </div>
            <div className="w-px h-12 bg-white/10 self-center" />
            <div className="px-6 py-4 text-left">
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1 italic">
                Strateji Skoru
              </p>
              <p className="text-3xl sm:text-4xl font-black text-amber-400 italic tracking-tighter">
                {globalScore}
                <span className="text-sm text-amber-600/60 italic">/100</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6 sm:gap-10 text-left">
        {/* Left Column: Trend Radar Cards */}
        <div className="col-span-12 lg:col-span-8 space-y-6 sm:space-y-8 text-left">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
              <h3 className="text-xs font-black text-white uppercase italic tracking-[0.3em]">
                Sektörel Kıyaslama Radar Matrisi
              </h3>
            </div>

            {/* Interactive Search */}
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Fikir veya Konsept Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl py-2 pl-9 pr-4 text-xs font-medium text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 transition-all"
              />
            </div>
          </div>

          {/* Cards */}
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-40 rounded-[2.5rem]" />
              <Skeleton className="w-full h-40 rounded-[2.5rem]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {visibleInsights.map((insight: TrendInsight, i: number) => (
                <div
                  key={i}
                  className="glass-card glass-card-hover p-6 sm:p-8 rounded-[2.5rem] relative overflow-hidden transition-all duration-300 border border-white/10 hover:border-amber-500/40"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Icon & Impact */}
                    <div className="md:col-span-3 space-y-2 text-left">
                      <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-md">
                        {insight.icon}
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">
                          {insight.category}
                        </h4>
                        <p
                          className={`text-2xl font-black italic tracking-tighter mt-0.5 ${
                            insight.type === "positive"
                              ? "text-emerald-400"
                              : "text-amber-400"
                          }`}
                        >
                          {insight.impact}
                        </p>
                      </div>
                    </div>

                    {/* Data Detail */}
                    <div className="md:col-span-6 space-y-3 md:border-l border-white/10 md:pl-6 text-left">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em] italic flex items-center gap-1">
                          <Sparkles size={10} />
                          İçerik Fikri / Konsept
                        </p>
                        <p className="text-sm font-black text-white italic uppercase tracking-tight">
                          {insight.userAction}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">
                          Tahmin / Öngörü
                        </p>
                        <p className="text-xs font-bold text-gray-300 italic uppercase tracking-tight leading-relaxed">
                          {insight.marketTrend}
                        </p>
                      </div>
                    </div>

                    {/* Score Progress */}
                    <div className="md:col-span-3 flex flex-col items-end gap-2">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] italic text-right w-full">
                        Uyumluluk
                      </p>
                      <div className="flex items-end gap-1.5 h-12 w-full justify-end">
                        {[...Array(5)].map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 rounded-full transition-all duration-500 ${
                              idx < insight.score / 20
                                ? "bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                                : "bg-white/10"
                            }`}
                            style={{ height: `${20 + idx * 20}%` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-black text-white italic tracking-tighter">
                        %{insight.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Expand / Collapse Button */}
          {filteredInsights.length > 4 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full py-4 min-h-[48px] flex items-center justify-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl transition-all group cursor-pointer active:scale-98"
            >
              <span className="text-[11px] font-black text-gray-300 uppercase tracking-[0.3em] group-hover:text-white italic">
                {isExpanded ? "Analizi Daralt" : `Tüm Fikirleri Gör (${filteredInsights.length})`}
              </span>
              {isExpanded ? (
                <ChevronUp size={16} className="text-amber-400" />
              ) : (
                <ChevronDown size={16} className="text-amber-400" />
              )}
            </button>
          )}
        </div>

        {/* Right Column: Monetization & Sponsor Value Card */}
        <div className="col-span-12 lg:col-span-4 space-y-6 text-left">
          <div className="glass-card p-8 rounded-[2.5rem] border border-amber-500/20 relative overflow-hidden group shadow-2xl text-left bg-gradient-to-br from-[#0B0F17] via-amber-950/20 to-[#0B0F17]">
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity rotate-12 scale-125 pointer-events-none">
              <DollarSign size={180} className="text-amber-400" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400">
                  <BarChart3 size={24} />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black text-emerald-400 uppercase tracking-widest italic">
                  YÜKSEK KARLILIK
                </span>
              </div>
              <div className="space-y-3">
                <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                  Marka İş <br />
                  <span className="text-amber-400">Birliği Değeri</span>
                </h4>
                <div className="space-y-2 border-l-2 border-amber-500/30 pl-4 py-1 mt-4">
                  <p className="text-xs font-bold text-gray-400 italic leading-relaxed uppercase tracking-wider">
                    Sponsor dönüşüm katsayınız pazar ortalamasının{" "}
                    <span className="text-white font-black">{impactRate} üzerinde.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
