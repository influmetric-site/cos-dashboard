"use client"

import React, { useState } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { Shield, Target, Zap, ChevronDown, Info, Activity, MessageSquare, Crown } from "lucide-react"
import { LiveIndicator } from "@/components/ui/live-indicator"
import { cn } from "@/utils/cn"

interface MetricFusionPageProps {
  categoryMap?: Record<string, any>
}

const defaultRadarData = [
  { subject: "Erişim", A: 145, fullMark: 150 },
  { subject: "Etkileşim", A: 138, fullMark: 150 },
  { subject: "Sadakat", A: 142, fullMark: 150 },
  { subject: "Hız", A: 125, fullMark: 150 },
  { subject: "Orijinallik", A: 130, fullMark: 150 },
  { subject: "Büyüme", A: 120, fullMark: 150 },
]

export function MetricFusionPage({ categoryMap }: MetricFusionPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>("rezonans")

  const analytics = categoryMap?.["analytics"] || categoryMap?.["page_metrik"] || {}
  const pageTitle = analytics.title || "Çok Boyutlu Performans Ağı"
  const pageSubtitle =
    analytics.subtitle || "COS® Zekâ Çekirdeği Tarafından Sentezlenen Veri Füzyonu"
  const globalScore = analytics.score_value ?? 95.8

  const totalViews = analytics.kpi_metrics?.[0]?.value || "2.4M"
  const audienceLoyalty = analytics.kpi_metrics?.[1]?.value || "92.4%"

  const radarData =
    Array.isArray(analytics.radar_data) && analytics.radar_data.length > 0
      ? analytics.radar_data.map((r: any) => ({
          subject: r.subject || r.name,
          A: r.A || r.value,
          fullMark: 150,
        }))
      : Array.isArray(analytics.chart_data) && analytics.chart_data.length > 0
      ? analytics.chart_data.map((r: any) => ({
          subject: r.name,
          A: r.value,
          fullMark: 150,
        }))
      : defaultRadarData

  const detailCards = [
    {
      id: "rezonans",
      title: analytics.score_title || "Kitle Rezonansı",
      score: audienceLoyalty,
      label: "ORGANİK MOMENTUM",
      desc: "İçerikler hedef kitle ile tam uyumlu.",
      longDesc: `Lifestyle ve niş içeriklerin takipçi kitlesiyle kurduğu duygusal ve semantik bağın katsayısıdır. Toplam ${totalViews} izlenme ve kaydedilme oranları bu skoru belirleyen ana metriklerdir.`,
      icon: Target,
      params: {
        Uyum: audienceLoyalty,
        Taranan: analytics.scanned_profiles || "1,450+ Profil",
        İşlenen: analytics.processed_data_points || "920K Veri",
      },
    },
    {
      id: "otorite",
      title: "İçerik Otoritesi",
      score: `${globalScore}/100`,
      label: "NICHE DOMINANCE",
      desc: "Dikeydeki uzmanlık ve referans puanı.",
      longDesc: `Belirlenen niş içerisindeki 'Authority Score', takipçilerin paylaşılan bilgiyi ne kadar referans aldığını gösterir. Global skor ${globalScore} olarak ölçülmüştür.`,
      icon: Crown,
      params: { Dikey: "Performans", Rekabet: "Düşük", Otorite: "Yüksek" },
    },
    {
      id: "duygu",
      title: "Duygu Analizi",
      score: audienceLoyalty,
      label: "SENTIMENT ANALYSIS",
      desc: "Geri bildirimlerin semantik özeti.",
      longDesc: `COS® NLP motoru, yorumlardaki duygu tonunu analiz eder. ${audienceLoyalty} Pozitif skor kitlenin yüksek güvenini kanıtlar.`,
      icon: MessageSquare,
      params: { Ton: "Samimi", Pozitif: audienceLoyalty, Negatif: "%1" },
    },
    {
      id: "butunluk",
      title: "Veri Doğrulaması",
      score: "99.9%",
      label: "VERİ SADAKATİ",
      desc: "48 boyutta çapraz doğrulama aktif.",
      longDesc:
        "Sosyal medya API'lerinden gelen veriler manipülasyona karşı 48 katmanda taranır.",
      icon: Shield,
      params: { Sinyal: "48 Katman", Hata: "%0.01", Kontrol: "AI-Sync" },
    },
    {
      id: "ai",
      title: "YZ Trend Tahmini",
      score: `${globalScore}%`,
      label: "ÖNGÖRÜ MOTORU",
      desc: "Gelecek 90 günün büyüme simülasyonu.",
      longDesc:
        "Global trendleri analiz ederek kitle yorgunluğunu ve viral format olasılıklarını matematiksel olarak öngörür.",
      icon: Zap,
      params: { Model: "COS-v4", Gecikme: "14ms", Tahmin: "90 Gün" },
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 animate-in fade-in duration-500 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-white/10 pb-6 gap-4">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-blue-400">
              <Activity size={14} />
              <span className="text-[10px] font-black tracking-[0.25em] uppercase italic">
                Aşama 01 / İleri Sinirsel Harita
              </span>
            </div>
            <LiveIndicator label="FÜZYON MOTORU" pulseColor="emerald" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
            {pageTitle}
          </h2>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] italic">
            {pageSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 sm:gap-10">
        {/* Left Column: Radar Chart */}
        <div className="col-span-12 lg:col-span-7 glass-card glass-card-hover p-6 sm:p-10 rounded-[2.5rem] relative overflow-hidden transition-all duration-500 border border-white/10 h-fit">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none">
            <Activity size={140} className="text-blue-500" />
          </div>

          <div className="mb-8 relative z-10 text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white italic uppercase tracking-tighter">
              {pageTitle}
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-bold italic uppercase tracking-wider">
              {pageSubtitle}
            </p>
          </div>

          <div className="h-[380px] sm:h-[480px] w-full flex items-center justify-center min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={360}>
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                    fill: "#9CA3AF",
                    fontSize: 11,
                    fontWeight: 900,
                    fontStyle: "italic",
                  }}
                />
                <Radar
                  name="Performans"
                  dataKey="A"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fill="#3B82F6"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Expandable Metric Cards */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          {detailCards.map((card: any) => (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === card.id}
              className={cn(
                "group transition-all duration-300 overflow-hidden cursor-pointer border focus-visible:ring-2 focus-visible:ring-blue-500 outline-none min-h-[48px]",
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
              <div className="p-5 sm:p-6 flex items-center justify-between">
                <div className="flex items-center gap-4 text-left">
                  <div
                    className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      expandedId === card.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white/5 text-gray-400 group-hover:text-blue-400"
                    )}
                  >
                    <card.icon size={20} />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] text-blue-400 font-black tracking-[0.2em] uppercase mb-0.5 block italic">
                      {card.label}
                    </span>
                    <h4 className="font-black text-gray-100 text-base uppercase tracking-tight italic group-hover:text-white transition-colors">
                      {card.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-lg font-black text-white italic tracking-tighter">
                    {card.score}
                  </span>
                  <div
                    className={cn(
                      "p-1.5 rounded-full border transition-all duration-300",
                      expandedId === card.id
                        ? "bg-blue-500 border-blue-400 text-white rotate-180"
                        : "bg-white/5 border-white/10 text-blue-400"
                    )}
                  >
                    <ChevronDown size={16} strokeWidth={3} />
                  </div>
                </div>
              </div>

              {expandedId === card.id && (
                <div className="px-6 pb-6 pt-1 animate-in fade-in duration-300 text-left">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mb-4" />

                  <div className="space-y-4 text-left">
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 mb-2 text-left">
                        <Info size={12} className="text-blue-400" />
                        <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest italic">
                          Analitik İçgörü
                        </span>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed italic font-bold border-l-2 border-blue-500/50 pl-3 py-1 text-left">
                        {card.longDesc}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(card.params || {}).map(([key, val]) => (
                        <div
                          key={key}
                          className="bg-white/5 border border-white/5 rounded-xl p-2.5 text-center"
                        >
                          <div className="text-[8px] text-gray-400 font-black uppercase mb-0.5 tracking-widest">
                            {key}
                          </div>
                          <div className="text-[10px] font-black text-gray-100 italic uppercase">
                            {String(val)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}