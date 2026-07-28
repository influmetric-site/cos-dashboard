"use client"

import React, { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, ChevronDown, Zap, ArrowUpRight, Clock, Info } from "lucide-react"

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
  { week: 'H01', followers: 210000, reach: 140000 },
  { week: 'H02', followers: 340000, reach: 280000 },
  { week: 'H03', followers: 310000, reach: 210000 },
  { week: 'H04', followers: 480000, reach: 420000 },
  { week: 'H05', followers: 520000, reach: 490000 },
  { week: 'H06', followers: 640000, reach: 580000 },
]

export function GrowthAnalysisPage({ categoryMap }: GrowthAnalysisPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>("hiz")

  const analytics = categoryMap?.['analytics'] || {}
  const growth = categoryMap?.['growth_strategy'] || {}
  
  const pageTitle = growth.title || "Büyüme Metrikleri & Stratejileri"
  const pageSubtitle = growth.subtitle || "Influmetric Veri Madenciliği ve Tahminleme Arayüzü"
  
  const netReach = analytics.kpi_metrics?.[0]?.value || growth.net_reach || "2.4M"
  const loyaltyVal = analytics.kpi_metrics?.[1]?.value || "92.4%"
  const boostNote = growth.boost_note || "Influmetric COS® sistemi, hedef kitleniz için yüksek etkileşim boşluğu saptadı. Kitle analizi verilerine göre %94 uyum ile ivme yakalayabilirsiniz."

  const analysisCards: AnalysisCard[] = [
    {
      id: "hiz",
      title: "Büyüme İvmesi",
      score: analytics.kpi_metrics?.[0]?.change || "+18.4%",
      label: "HAFTALIK MOMENTUM",
      longDesc: `Haftalık Büyüme Hızı, yedi günlük periyottaki takipçi değişim katsayısını temsil eder. Toplam net erişim ${netReach} seviyesindedir.`,
      icon: TrendingUp,
      params: { "H/H Değişim": analytics.kpi_metrics?.[0]?.change || "+18%", "Zirve": "Pazar", "Trend": "Boğa" }
    },
    {
      id: "projeksiyon",
      title: "Yapay Zeka Tahmini",
      score: "7.2K+",
      label: "YZ PROJEKSİYONU",
      longDesc: "COS® motoru, mevcut içerik takviminle uyumlu olarak yeni organik takipçi girişi beklemektedir.",
      icon: Zap,
      params: { "Güven": "%94", "Tahmin": "+7.2K", "Risk": "Düşük" }
    },
    {
      id: "kalite",
      title: "Kitle Sadakati",
      score: loyaltyVal,
      label: "KİTLE SADAKATİ",
      longDesc: `Gelen takipçilerin yaşam tarzı ve dikey nişinizle doğrudan ilgili olduğu saptandı. Sadakat skoru ${loyaltyVal} olarak doğrulandı.`,
      icon: Users,
      params: { "Aktiflik": "Yüksek", "Segment": "Premium", "Sadakat": loyaltyVal }
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-20 text-left">
      
      {/* ÜST BİLGİ */}
      <div className="flex justify-between items-end border-b border-white/5 pb-8">
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-2 text-left">
            <Clock size={14} className="text-blue-500" />
            <span className="text-[10px] text-blue-500 font-black tracking-[0.3em] uppercase italic text-left">Aşama 02 / Büyüme Trajektörü</span>
          </div>
          <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none text-left">
            {pageTitle}
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] italic text-left">
            {pageSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-10">
        
        {/* SOL: GRAFİK ALANI */}
        <div className="col-span-12 lg:col-span-8 group">
          <div className="relative bg-[#0B0F17]/80 border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-xl overflow-hidden transition-all duration-700 hover:border-blue-500/20">
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-10 transition-opacity">
                <TrendingUp size={120} className="text-blue-500" />
            </div>
            
            <div className="relative z-10 flex justify-between items-center mb-12 text-left">
              <div className="space-y-1 text-left">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tight text-left">Kanal Performans İndeksi</h3>
                <p className="text-xs text-gray-500 font-bold italic text-left">Büyüme Algoritması v4.2</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1 text-right">Haftalık Net Erişim</p>
                <p className="text-2xl font-black text-blue-400 italic tracking-tighter text-right">{netReach}</p>
              </div>
            </div>
            
            <div className="h-[450px] w-full -ml-8 text-left min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={400}>
                <AreaChart data={defaultWeeklyGrowthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorF" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#4B5563', fontSize: 11, fontWeight: 900, fontStyle: 'italic'}} 
                    dy={20}
                  />
                  <Tooltip 
                    cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '5 5' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#111827] border border-blue-500/30 p-5 rounded-2xl shadow-2xl backdrop-blur-md text-left">
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 italic text-left">{payload[0].payload.week} Analizi</p>
                            <p className="text-lg font-black text-white italic text-left">{payload[0].value?.toLocaleString()} Takipçi</p>
                            <p className="text-[10px] text-gray-500 font-bold mt-1 text-left">İvme Katsayısı: +2.4x</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="followers" 
                    stroke="#3B82F6" 
                    strokeWidth={5}
                    fillOpacity={1} 
                    fill="url(#colorF)" 
                    animationDuration={2500}
                    dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#0B0F17' }}
                    activeDot={{ r: 8, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SAĞ PANEL: ANALİZ KARTLARI */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          {analysisCards.map((card: AnalysisCard) => (
            <div 
              key={card.id} 
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === card.id}
              className={`group transition-all duration-700 relative overflow-hidden border focus-visible:ring-2 focus-visible:ring-blue-500 outline-none cursor-pointer ${
                expandedId === card.id 
                ? 'bg-gradient-to-br from-blue-600/10 to-transparent border-blue-500/30 rounded-[2.5rem] shadow-2xl' 
                : 'bg-white/[0.02] border-white/5 rounded-[2rem] hover:border-white/10'
              }`}
              onClick={() => setExpandedId(expandedId === card.id ? null : card.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  setExpandedId(expandedId === card.id ? null : card.id)
                }
              }}
            >
              <div className="p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between text-left">
                  <div className={`p-4 rounded-2xl transition-all duration-500 ${
                    expandedId === card.id ? 'bg-blue-600 text-white rotate-[360deg]' : 'bg-white/5 text-gray-500'
                  }`}>
                    <card.icon size={20} />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-white italic tracking-tighter block text-right">{card.score}</span>
                    <span className={`text-[8px] font-black uppercase tracking-widest text-right block ${expandedId === card.id ? 'text-blue-400' : 'text-gray-600'}`}>
                        {card.label}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <h4 className="text-lg font-black text-gray-100 italic uppercase tracking-tight group-hover:text-blue-400 transition-colors text-left">
                    {card.title}
                  </h4>
                  <div className={`overflow-hidden transition-all duration-700 ${expandedId === card.id ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[12px] text-gray-400 font-medium italic leading-relaxed border-l-2 border-blue-600/50 pl-4 py-1 text-left">
                      {card.longDesc}
                    </p>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                      {Object.entries(card.params).map(([key, val]) => (
                        <div key={key} className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                          <p className="text-[8px] text-gray-600 font-black uppercase mb-1">{key}</p>
                          <p className="text-[10px] font-black text-gray-200 italic text-center">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center text-left">
                    <div className={`h-1 rounded-full transition-all duration-700 ${expandedId === card.id ? 'w-full bg-blue-600' : 'w-8 bg-white/10'}`} />
                </div>
              </div>
            </div>
          ))}
          
          {/* STRATEJİK BOOST */}
          <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-2xl shadow-blue-900/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform text-left">
                  <Zap size={80} fill="white" />
              </div>
              <div className="relative z-10 space-y-4 text-left">
                  <div className="flex items-center gap-2 mb-2 text-left">
                    <Info size={14} className="text-blue-200" />
                    <h5 className="text-xl font-black italic uppercase tracking-tighter text-left">Stratejik Boost</h5>
                  </div>
                  <p className="text-[13px] font-bold italic opacity-90 leading-relaxed text-left">
                      {boostNote}
                  </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}