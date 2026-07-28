"use client"

import { Lightbulb, Flame, Tag } from "lucide-react"

export interface ContentIdeasContent {
  title?: string
  weekly_focus?: string
  ideas?: Array<{
    title: string
    format: string
    estimated_views?: string
    tags?: string[]
  }>
}

const defaultContent: ContentIdeasContent = {
  title: "Özel İçerik Fikirleri & Trendler",
  weekly_focus: "Bu Hafta Odak: Soru-Cevap & Arkasındaki Hikaye Formatları",
  ideas: [
    { title: "Kamera Arkası: 1 Günde İçerik Üretim Maratonu", format: "YouTube Shorts / Reel", estimated_views: "350K - 500K", tags: ["#bts", "#creator", "#workflow"] },
    { title: "3 Yanlış Bilinen İçerik Üretici Miti", format: "Carousel Post", estimated_views: "120K - 200K", tags: ["#stüdyo", "#ekipman", "#tavsiye"] },
    { title: "En Çok Sorulan 5 Ekipman Sorusu", format: "Canlı Yayın / Q&A", estimated_views: "80K - 150K", tags: ["#live", "#qa", "#tech"] }
  ]
}

export function ContentIdeasCategory({ content_json }: { content_json?: ContentIdeasContent }) {
  const data = { ...defaultContent, ...content_json }

  return (
    <div className="bg-[#0A0A0F] border border-white/10 p-7 rounded-[2.5rem] space-y-6 shadow-xl backdrop-blur-xl h-full flex flex-col justify-between">
      {/* Category Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Lightbulb size={18} />
          </div>
          <div>
            <h2 className="text-sm font-black text-white italic uppercase tracking-wider">
              {data.title}
            </h2>
            <p className="text-[10px] text-gray-500 italic uppercase">Kategori 3 • Trend Fikirleri</p>
          </div>
        </div>

        <Flame size={18} className="text-amber-400 animate-bounce" />
      </div>

      {/* Focus banner */}
      {data.weekly_focus && (
        <div className="p-3 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-[10px] text-amber-300 font-bold italic">
          {data.weekly_focus}
        </div>
      )}

      {/* Ideas list */}
      <div className="space-y-3 flex-1">
        {data.ideas?.map((idea, index) => (
          <div key={index} className="p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-bold text-white italic leading-tight">
                {idea.title}
              </p>
              <span className="text-[9px] font-black text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 shrink-0 italic">
                {idea.format}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/5 text-[9px]">
              {idea.tags && (
                <div className="flex items-center gap-1 text-gray-500 font-bold italic">
                  <Tag size={10} className="text-amber-400" />
                  <span>{idea.tags.join(" ")}</span>
                </div>
              )}
              {idea.estimated_views && (
                <span className="text-gray-400 font-bold italic">Tahmini: {idea.estimated_views}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
