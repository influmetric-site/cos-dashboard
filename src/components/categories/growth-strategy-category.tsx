"use client"

import { Compass, CheckCircle2, Clock, AlertTriangle } from "lucide-react"

export interface GrowthStrategyContent {
  title?: string
  subtitle?: string
  strategies?: Array<{
    id?: number | string
    title: string
    impact_score: number
    result: string
    status: string // 'Uygulandı' | 'Devam Ediyor' | 'Planlandı'
  }>
}

const defaultContent: GrowthStrategyContent = {
  title: "Büyüme Stratejisi & AI Tavsiyeleri",
  subtitle: "Sistem tarafından üretilen stratejik aksiyon adımları",
  strategies: [
    { id: 1, title: "YouTube Shorts hook sürelerini 2.4 saniyeye indirme", impact_score: 96.4, result: "Kitle Tutundurma %34 Artış", status: "Uygulandı" },
    { id: 2, title: "Instagram hikayelerinde interaktif anket kurgusu", impact_score: 91.2, result: "Mesajlaşma Oranı %28 Artış", status: "Devam Ediyor" },
    { id: 3, title: "Sponsor içeriklerde ürün yerleştirme A/B testi", impact_score: 88.5, result: "Tıklama Oranı %22 Artış", status: "Planlandı" }
  ]
}

export function GrowthStrategyCategory({ content_json }: { content_json?: GrowthStrategyContent }) {
  const data = { ...defaultContent, ...content_json }

  const getStatusIcon = (status: string) => {
    if (status === "Uygulandı") return <CheckCircle2 size={12} className="text-emerald-400" />
    if (status === "Devam Ediyor") return <Clock size={12} className="text-blue-400" />
    return <AlertTriangle size={12} className="text-amber-400" />
  }

  const getStatusColor = (status: string) => {
    if (status === "Uygulandı") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    if (status === "Devam Ediyor") return "bg-blue-500/10 text-blue-400 border-blue-500/20"
    return "bg-amber-500/10 text-amber-400 border-amber-500/20"
  }

  return (
    <div className="bg-[#0A0A0F] border border-white/10 p-7 rounded-[2.5rem] space-y-6 shadow-xl backdrop-blur-xl h-full flex flex-col justify-between">
      {/* Category Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Compass size={18} />
          </div>
          <div>
            <h2 className="text-sm font-black text-white italic uppercase tracking-wider">
              {data.title}
            </h2>
            <p className="text-[10px] text-gray-500 italic uppercase">Kategori 2 • AI Danışmanlık</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 italic">
          {data.strategies?.length || 0} Aksiyon
        </span>
      </div>

      {/* Strategies List */}
      <div className="space-y-3 flex-1">
        {data.strategies?.map((item, index) => (
          <div key={index} className="p-3.5 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 rounded-2xl transition-all space-y-2">
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold text-gray-200 italic leading-snug">
                {item.title}
              </span>
              <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border shrink-0 italic ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
                {item.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] text-gray-400 italic">
              <span>Etki Skoru: <strong className="text-indigo-400 font-black">{item.impact_score}</strong></span>
              <span className="text-gray-300 font-bold">{item.result}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
