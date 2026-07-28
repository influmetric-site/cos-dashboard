"use client"

import React, { useState } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { Shield, Target, Zap, ChevronDown, Info, Activity, MessageSquare, Crown } from "lucide-react"

const radarData = [
  { subject: 'Erişim', A: 120, fullMark: 150 },
  { subject: 'Etkileşim', A: 98, fullMark: 150 },
  { subject: 'Sadakat', A: 135, fullMark: 150 },
  { subject: 'Hız', A: 99, fullMark: 150 },
  { subject: 'Orijinallik', A: 110, fullMark: 150 },
  { subject: 'Büyüme', A: 85, fullMark: 150 },
]

const detailCards = [
  { 
    id: "rezonans",
    title: "Kitle Rezonansı", 
    score: "88/100", 
    label: "ORGANİK MOMENTUM",
    desc: "İçerikler hedef kitle ile tam uyumlu.", 
    longDesc: "Lifestyle içeriklerinin takipçi kitlesiyle kurduğu duygusal ve semantik bağın katsayısıdır. Kaydedilme oranları ve DM üzerinden gelen etkileşim hızı bu skoru belirleyen ana metriklerdir.",
    icon: Target, 
    params: { "Uyum": "%94", "Örneklem": "Lifestyle", "Güven": "Yüksek" }
  },
  { 
    id: "otorite",
    title: "İçerik Otoritesi", 
    score: "91/100", 
    label: "NICHE DOMINANCE",
    desc: "Dikeydeki uzmanlık ve referans puanı.", 
    longDesc: "Belirlenen niş içerisindeki 'Authority Score', takipçilerin paylaşılan bilgiyi veya hayat tarzını ne kadar 'referans' olarak gördüğünü ölçer. Marka iş birliklerindeki ikna gücünü temsil eder.",
    icon: Crown, 
    params: { "Dikey": "Vlog", "Rekabet": "Düşük", "Otorite": "Yüksek" }
  },
  { 
    id: "duygu",
    title: "Duygu Analizi", 
    score: "%96", 
    label: "SENTIMENT ANALYSIS",
    desc: "Geri bildirimlerin semantik özeti.", 
    longDesc: "COS® NLP (Doğal Dil İşleme) motoru, yorumlardaki duygu tonunu analiz eder. %96 Pozitif skor, kitlenin sadece izlemediğini, aynı zamanda içerik üreticisine yüksek güven duyduğunu gösterir.",
    icon: MessageSquare, 
    params: { "Ton": "Samimi", "Pozitif": "%96", "Negatif": "%1" }
  },
  { 
    id: "butunluk",
    title: "Veri Doğrulaması", 
    score: "99.9%", 
    label: "VERİ SADAKATİ",
    desc: "48 boyutta çapraz doğrulama aktif.", 
    longDesc: "Sosyal medya API'lerinden gelen ham veriler manipülasyona karşı taranır. %99.9'luk skor, Influmetric'in sunduğu verilerin ticari kararlar için mutlak güvenilirliğini tescil eder.",
    icon: Shield, 
    params: { "Sinyal": "48 Katman", "Hata": "%0.01", "Kontrol": "AI-Sync" }
  },
  { 
    id: "ai",
    title: "YZ Trend Tahmini", 
    score: "93.4%", 
    label: "ÖNGÖRÜ MOTORU",
    desc: "Gelecek 90 günün büyüme simülasyonu.", 
    longDesc: "Lifestyle dikeyindeki global trendleri analiz ederek, mevcut kitle yorgunluğunu ölçer. Hangi içerik formatlarının (Reels/Vlog) önümüzdeki dönemde 'hype' yakalayacağını matematiksel olarak öngörür.",
    icon: Zap, 
    params: { "Model": "COS-v4", "Gecikme": "14ms", "Tahmin": "90 Gün" }
  },
]

export function MetricFusionPage() {
  const [expandedId, setExpandedId] = useState<string | null>("rezonans")

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 text-left">
      <div className="grid grid-cols-12 gap-8">
        
        {/* SOL PANEL: RADAR CHART */}
        <div className="col-span-12 lg:col-span-7 bg-[#0B0F17]/80 border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden group h-fit">
          <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-10 transition-opacity">
              <Activity size={120} className="text-blue-500" />
          </div>

          <div className="mb-12 relative z-10 text-left">
            <div className="flex items-center gap-2 mb-2 text-left">
              <Activity size={14} className="text-blue-500" />
              <span className="text-[10px] text-blue-500 font-black tracking-[0.3em] uppercase italic text-left">Aşama 01 / İleri Sinirsel Harita</span>
            </div>
            <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter text-left">Çok Boyutlu <span className="text-blue-500">Performans</span> Ağı</h3>
            <p className="text-xs text-gray-500 mt-2 font-bold italic uppercase tracking-wider text-left">COS® Zekâ Çekirdeği Tarafından Sentezlenen Veri Füzyonu</p>
          </div>
          
          <div className="h-[500px] w-full flex items-center justify-center min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={450}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 900, fontStyle: 'italic' }} 
                />
                <Radar
                  name="Performans"
                  dataKey="A"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fill="#3B82F6"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SAĞ PANEL: TIKLANABİLİR DETAY KARTLARI */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          {detailCards.map((card) => (
            <div 
              key={card.id} 
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === card.id}
              className={`group transition-all duration-700 overflow-hidden cursor-pointer border focus-visible:ring-2 focus-visible:ring-blue-500 outline-none ${
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
              <div className="p-7 flex items-center justify-between">
                <div className="flex items-center gap-5 text-left">
                  <div className={`p-4 rounded-2xl transition-all duration-500 ${
                    expandedId === card.id 
                    ? 'bg-blue-600 text-white rotate-[360deg] shadow-lg shadow-blue-600/20' 
                    : 'bg-white/5 text-gray-500 group-hover:text-blue-400'
                  }`}>
                    <card.icon size={22} />
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] text-blue-500 font-black tracking-[0.2em] uppercase mb-1 block italic">{card.label}</span>
                    <h4 className="font-black text-gray-100 text-lg uppercase tracking-tight italic group-hover:text-white transition-colors">{card.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-xl font-black text-white italic tracking-tighter">{card.score}</span>
                  <div className={`p-2 rounded-full border transition-all duration-500 ${
                    expandedId === card.id 
                    ? 'bg-blue-500 border-blue-400 text-white rotate-180' 
                    : 'bg-white/5 border-white/10 text-blue-500'
                  }`}>
                    <ChevronDown size={18} strokeWidth={3} />
                  </div>
                </div>
              </div>

              {expandedId === card.id && (
                <div className="px-8 pb-8 pt-2 animate-in fade-in slide-in-from-top-3 duration-700 text-left">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent mb-6"></div>
                  
                  <div className="space-y-6 text-left">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-3 text-left">
                        <Info size={12} className="text-blue-500" />
                        <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest italic">Analitik İçgörü</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed italic font-bold border-l-2 border-blue-600/50 pl-4 py-1 text-left">
                        {card.longDesc}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(card.params).map(([key, val]) => (
                        <div key={key} className="bg-white/5 border border-white/5 rounded-2xl p-3 text-center">
                          <div className="text-[8px] text-gray-600 font-black uppercase mb-1 tracking-widest">{key}</div>
                          <div className="text-[10px] font-black text-gray-200 italic uppercase">{val}</div>
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