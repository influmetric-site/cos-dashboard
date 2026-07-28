"use client"

import React, { useState } from "react"
import { 
  TrendingUp, 
  Lightbulb, 
  ChevronDown, 
  ChevronUp,
  Camera,
  Users,
  Video,
  DollarSign,
  Zap,
  BarChart3
} from "lucide-react"

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

  const analytics = categoryMap?.['analytics'] || {}
  const ideasObj = categoryMap?.['content_ideas'] || {}
  
  const pageTitle = ideasObj.title || "Trend Sensörü & Viral Fikirler"
  const weeklyFocus = ideasObj.weekly_focus || "Canlı İstihbarat Aktif"
  const ideasList = Array.isArray(ideasObj.ideas) ? ideasObj.ideas : []

  const globalScore = Math.round(analytics.score_value ?? 95.8)
  const impactRate = analytics.kpi_metrics?.[2]?.value || "%19.5"

  const lifestyleInsights: TrendInsight[] = ideasList.length > 0
    ? ideasList.map((item: any, idx: number) => ({
        category: item.format || "Viral Konsept",
        icon: <Video size={16} />,
        marketTrend: `Tahmini İzlenme: ${item.estimated_views || "300K - 500K"}`,
        userAction: item.title || "Konsept Adı",
        impact: `+${25 + idx * 5}%`,
        type: "positive",
        score: Math.min(100, 88 + idx * 3)
      }))
    : [
        {
          category: "Görsel Estetik",
          icon: <Camera size={16} />,
          marketTrend: "Vlogger segmentinde 'Soft-Minimalist' editler %55 daha fazla izleniyor.",
          userAction: "Canlı ve yüksek kontrastlı renk imzan nişinde hala ayrıştırıcı bir güç.",
          impact: "+28%",
          type: "positive",
          score: 95
        },
        {
          category: "İçerik Stratejisi",
          icon: <Video size={16} />,
          marketTrend: "Makyaj nişinde 15 saniyelik 'Hızlı Geçiş' videoları revaçta.",
          userAction: "Hala 10 dakika üzeri uzun anlatımlı tutorial içeriklerine ağırlık veriyorsun.",
          impact: "-18%",
          type: "loss",
          score: 72
        },
        {
          category: "Topluluk Dinamiği",
          icon: <Users size={16} />,
          marketTrend: "Takipçiler 'Mükemmel Hayat' yerine 'Doğal Anlar' görmek istiyor.",
          userAction: "Kamera arkası ve hazırlık süreçlerini paylaşman samimiyet skorunu koruyor.",
          impact: "+32%",
          type: "positive",
          score: 96
        }
      ]

  const visibleInsights: TrendInsight[] = isExpanded ? lifestyleInsights : lifestyleInsights.slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-32 text-left">
      
      {/* PREMIUM HEADER SECTION */}
      <header className="relative p-12 rounded-[4rem] bg-[#0B0F17]/80 border border-white/5 overflow-hidden text-left backdrop-blur-2xl shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Zap size={12} className="text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 italic">
                {weeklyFocus}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.8] mb-2">
              {pageTitle}
            </h1>
            <p className="text-gray-500 text-sm font-bold max-w-xl italic leading-relaxed uppercase tracking-widest">
              Model ve Creator segmentindeki <span className="text-white">1,450+ taranan profil</span> verileriyle kıyaslama mimarisi.
            </p>
          </div>

          <div className="flex gap-2 p-2 bg-white/[0.02] rounded-[3rem] border border-white/5 backdrop-blur-md">
            <div className="px-10 py-8 text-left">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-3 italic">Sponsor Dönüşüm</p>
              <p className="text-5xl font-black text-white italic tracking-tighter">{impactRate} <span className="text-lg text-emerald-500 ml-1 italic">↑</span></p>
            </div>
            <div className="w-px h-20 bg-white/5 self-center" />
            <div className="px-10 py-8 text-left">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-3 italic">Strateji Skoru</p>
              <p className="text-5xl font-black text-amber-500 italic tracking-tighter">{globalScore}<span className="text-lg text-amber-700/50 italic">/100</span></p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-10 text-left">
        
        {/* SOL KOLON */}
        <div className="col-span-12 lg:col-span-8 space-y-10 text-left">
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
              <h3 className="text-[11px] font-black text-white uppercase italic tracking-[0.4em]">Sektörel Kıyaslama Matrisi</h3>
            </div>
            <span className="text-[9px] text-gray-500 font-black italic uppercase tracking-[0.3em] bg-white/[0.03] px-5 py-2 rounded-full border border-white/5">
              İçerik Fikirleri ({lifestyleInsights.length})
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {visibleInsights.map((insight: TrendInsight, i: number) => (
              <div key={i} className="group relative bg-[#0B0F17]/60 border border-white/[0.05] p-12 rounded-[3.5rem] transition-all duration-700 hover:border-amber-500/40 hover:bg-[#0B0F17]/80">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                  
                  {/* İkon ve Kategori */}
                  <div className="md:col-span-3 space-y-4 text-left">
                    <div className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] bg-white/[0.03] border border-white/5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500 text-amber-500 shadow-xl">
                      {insight.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] italic">{insight.category}</h4>
                      <p className={`text-3xl font-black italic tracking-tighter mt-1 ${insight.type === 'positive' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {insight.impact}
                      </p>
                    </div>
                  </div>

                  {/* Veri Detayı */}
                  <div className="md:col-span-6 space-y-6 border-l border-white/5 pl-10 text-left">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] italic">İçerik Fikri / Konsept</p>
                      <p className="text-[14px] text-white font-black italic leading-relaxed uppercase tracking-tight">{insight.userAction}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] italic">Tahmin / Öngörü</p>
                      <p className="text-[14px] text-gray-400 font-bold italic leading-relaxed uppercase tracking-tight">{insight.marketTrend}</p>
                    </div>
                  </div>

                  {/* Score Chart */}
                  <div className="md:col-span-3 flex flex-col items-end gap-3">
                    <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em] italic text-right w-full">Uyumluluk</p>
                    <div className="flex items-end gap-2 h-16 w-full justify-end">
                      {[...Array(5)].map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2.5 rounded-full transition-all duration-1000 ${
                            idx < (insight.score / 20) 
                            ? 'bg-amber-500' 
                            : 'bg-white/[0.03]'
                          }`}
                          style={{ height: `${20 + (idx * 20)}%` }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-black text-white italic tracking-tighter">{insight.score}%</span>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full py-8 flex items-center justify-center gap-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 rounded-[2.5rem] transition-all group cursor-pointer"
          >
            <span className="text-[11px] font-black text-gray-600 uppercase tracking-[0.5em] group-hover:text-white transition-colors italic">
              {isExpanded ? "Analizi Daralt" : "Tüm Fikirleri Aç"}
            </span>
            {isExpanded ? <ChevronUp size={16} className="text-amber-500" /> : <ChevronDown size={16} className="text-amber-500" />}
          </button>
        </div>

        {/* SAĞ KOLON */}
        <div className="col-span-12 lg:col-span-4 space-y-10 text-left">
          <div className="bg-gradient-to-br from-[#0B0F17] via-amber-950/10 to-[#0B0F17] p-12 rounded-[4rem] border border-amber-500/20 relative overflow-hidden group shadow-2xl text-left">
            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 scale-150">
              <DollarSign size={200} className="text-amber-500" />
            </div>
            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-amber-500/10 rounded-[1.5rem] border border-amber-500/20">
                  <BarChart3 size={24} className="text-amber-500" />
                </div>
                <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest italic">Yüksek Karlılık</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                  Marka İş <br /> <span className="text-amber-500">Birliği Değeri</span>
                </h4>
                <div className="space-y-4 border-l-2 border-amber-500/30 pl-6 py-2 mt-6">
                  <p className="text-[11px] font-bold text-gray-500 italic leading-relaxed uppercase tracking-wider">
                    Sponsor dönüşüm katsayınız pazar ortalamasının <span className="text-white font-black">{impactRate} üzerinde.</span>
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
