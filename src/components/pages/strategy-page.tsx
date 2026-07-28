"use client"

import React, { useState } from "react"
import { 
  BrainCircuit, 
  CheckCircle2,
  Lock,
  Play,
  Lightbulb,
  Zap,
  ShieldCheck,
  Clock
} from "lucide-react"

interface StrategyPageProps {
  categoryMap?: Record<string, any>
}

interface StrategicAction {
  id: string
  type: string
  title: string
  impact: string
  urgency: string
  desc: string
  insight: string
  steps: string[]
  icon: any
}

const defaultStrategicActions: StrategicAction[] = [
  {
    id: "content-pivot",
    type: "ALGORİTMA PİVOTU",
    title: "Yüksek Tempolu 'GRWM' Optimizasyonu",
    impact: "Yüksek",
    urgency: "Hemen",
    desc: "Veriler, hazırlık (GRWM) videolarındaki hızlı geçiş anlarında izleyicinin %40 daha fazla kaldığını gösteriyor.",
    insight: "Sabah rutinindeki o 3 saniyelik serum uygulama anını macro çekimle loop'a al.",
    steps: ["3 saniyelik macro ürün çekimleri ekle", "Ses kanalına ASMR dokunuşu yap", "Yorumlarda etkileşim tetikle"],
    icon: Play
  },
  {
    id: "daily-routine",
    type: "RUTİN ETKİLEŞİM",
    title: "Günlük 'This or That' Serisi",
    impact: "Orta",
    urgency: "Her Gün",
    desc: "Günlük olarak paylaşılan kısa hikayeler, algoritmanın seni aktif tutmasını sağlar.",
    insight: "İki farklı opsiyonu paylaşıp takipçilerine kendi favorilerini sor.",
    steps: ["Günün iki farklı opsiyonunu hazırla", "Story'de anket aç", "Gelen cevapları değerlendir"],
    icon: Clock
  },
  {
    id: "growth-hack",
    type: "GELECEK TAHMİNİ",
    title: "Niş Dışı Keşfet Yayılımı",
    impact: "Kritik",
    urgency: "Haftalık",
    desc: "Aesthetic Room odaklı görsel arkaplanlar geniş kitle etkileşimini tetikliyor.",
    insight: "Kamera açısını genişlet (0.5x mod) ve doğal gün ışığını arka plana al.",
    steps: ["Arka plan estetiğini vurgula", "Minimalist yaşam hashtag'leri kullan", "Kamera açısını genişlet"],
    icon: Play
  }
]

export function StrategyPage({ categoryMap }: StrategyPageProps) {
  const stratData = categoryMap?.['page_strateji'] || categoryMap?.['growth_strategy'] || {}
  const pageTitle = stratData.title || "Stratejik Yol Haritası"
  const pageSubtitle = stratData.subtitle || "Algoritmik Öngörü ve İçerik Uygulama Protokolleri"
  
  const customActions = Array.isArray(stratData.actions) && stratData.actions.length > 0
    ? stratData.actions
    : (Array.isArray(stratData.strategies) && stratData.strategies.length > 0 ? stratData.strategies : null)

  const strategicActions: StrategicAction[] = customActions
    ? customActions.map((s: any, idx: number) => ({
        id: s.id ? String(s.id) : `action-${idx}`,
        type: s.type || s.status || "ALGORİTMA PİVOTU",
        title: s.title || `Strateji Adımı #${idx + 1}`,
        impact: s.impact || (s.impact_score > 90 ? "Kritik" : "Yüksek"),
        urgency: s.urgency || (s.status === "Planlandı" ? "24 Saat" : "Hemen"),
        desc: s.desc || `Beklenen sonuç: ${s.result || "Yüksek büyüme"}. Influmetric algoritma modelleri tarafınca doğrulanmıştır.`,
        insight: s.insight || `${s.title} adımı ile kanal performansınızı yükseltebilirsiniz.`,
        steps: Array.isArray(s.steps) ? s.steps : [`${s.title} kurgusunu başlat`, "İçerik takvimine ekle", "Sonuçları haftalık raporda incele"],
        icon: idx % 2 === 0 ? Play : Clock
      }))
    : defaultStrategicActions

  const [selectedTab, setSelectedTab] = useState<string | null>(null)
  const [isApproved, setIsApproved] = useState(false)

  const activeTab = (selectedTab && strategicActions.some(a => a.id === selectedTab))
    ? selectedTab
    : (strategicActions[0]?.id || "content-pivot")

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'Hemen':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Her Gün':
      case '24 Saat':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'Haftalık':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      default:
        return 'bg-blue-500/20 text-blue-400'
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20 text-left">
      
      {/* ÜST PANEL */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-[#0B0F17]/80 p-10 rounded-[3.5rem] border border-white/5 backdrop-blur-2xl shadow-2xl mb-10 text-left">
        <div className="text-left w-full md:w-auto space-y-2">
          <div className="flex items-center gap-2 mb-1 text-left">
            <BrainCircuit size={14} className="text-blue-500" />
            <span className="text-[10px] text-blue-500 font-black tracking-[0.3em] uppercase italic text-left">Aşama 04 / Haftalık Masterplan</span>
          </div>
          <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none text-left">
            {pageTitle}
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] italic text-left">
            {pageSubtitle}
          </p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto justify-end text-left">
          <button 
            onClick={() => setIsApproved(!isApproved)}
            className={`px-12 py-5 rounded-[2rem] flex items-center gap-4 transition-all duration-700 transform hover:scale-105 active:scale-95 group cursor-pointer ${
              isApproved 
              ? 'bg-emerald-600 shadow-[0_0_40px_rgba(16,185,129,0.3)]' 
              : 'bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.3)]'
            }`}
          >
            <span className="text-[11px] font-black text-white uppercase tracking-widest text-left">
              {isApproved ? 'PLAN AKTİFLEŞTİRİLDİ' : 'STRATEJİYİ ONAYLA'}
            </span>
            <CheckCircle2 size={20} className={`text-white transition-all duration-700 ${isApproved ? 'scale-125' : 'group-hover:rotate-12'}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 text-left">
        
        {/* SOL: STRATEJİ LİSTESİ */}
        <div className="col-span-12 lg:col-span-4 space-y-4 text-left">
          {strategicActions.map((action: StrategicAction) => (
            <button
              key={action.id}
              onClick={() => setSelectedTab(action.id)}
              className={`w-full p-7 rounded-[2.5rem] border transition-all duration-700 text-left relative overflow-hidden group cursor-pointer ${
                activeTab === action.id 
                ? 'bg-white/[0.08] border-blue-500/30 shadow-2xl translate-x-2' 
                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
              }`}
            >
              {activeTab === action.id && (
                <div className={`absolute left-0 top-0 w-2 h-full transition-all duration-700 ${
                  action.urgency === 'Hemen' ? 'bg-red-500 shadow-red-500/50' : 
                  (action.urgency === 'Haftalık' ? 'bg-emerald-500 shadow-emerald-500/50' : 'bg-amber-500 shadow-amber-500/50')
                }`} />
              )}
              <div className="flex justify-between items-start mb-5 text-left">
                <div className={`p-3 rounded-2xl transition-all duration-700 ${activeTab === action.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500 group-hover:text-blue-400'}`}>
                   <action.icon size={20} />
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[8px] font-black italic uppercase tracking-widest border ${getUrgencyStyles(action.urgency)}`}>
                  {action.urgency}
                </div>
              </div>
              <h4 className={`text-base font-black italic uppercase transition-colors leading-tight text-left ${activeTab === action.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                {action.title}
              </h4>
            </button>
          ))}

          {/* ÖZEL STRATEJİ NOTU */}
          <div className="mt-10 p-8 bg-gradient-to-br from-[#0B0F17] to-transparent border border-white/5 rounded-[3rem] relative overflow-hidden text-left shadow-xl">
            <div className="absolute -right-10 -bottom-10 text-white/5 text-left">
              <ShieldCheck size={160} />
            </div>
            <div className="flex items-center gap-3 mb-4 relative z-10 text-left">
              <Lock size={16} className="text-blue-500" />
              <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] italic text-left">Kişiye Özel Protokol</span>
            </div>
            <p className="text-[12px] text-gray-500 font-bold leading-relaxed italic relative z-10 text-left">
              Bu strateji planı tamamen <span className="text-white font-black">Influmetric COS®</span> çekirdeği tarafından size özel optimize edilmiştir.
            </p>
          </div>
        </div>

        {/* SAĞ: DETAYLI İÇERİK PANELİ */}
        <div className="col-span-12 lg:col-span-8 text-left h-full">
          {strategicActions.map((action: StrategicAction) => action.id === activeTab && (
            <div key={action.id} className="h-full bg-[#0B0F17]/80 border border-white/5 rounded-[3.5rem] p-12 backdrop-blur-xl animate-in slide-in-from-right-8 fade-in duration-1000 shadow-2xl text-left flex flex-col justify-between">
              
              <div className="text-left">
                <div className="flex items-start justify-between mb-12 text-left">
                  <div className="space-y-4 text-left">
                    <div className="flex items-center gap-2 text-left">
                      <div className={`w-2 h-2 rounded-full ${
                         action.urgency === 'Hemen' ? 'bg-red-500 animate-pulse' : 
                         (action.urgency === 'Haftalık' ? 'bg-emerald-500' : 'bg-amber-500')
                      }`} />
                      <span className="text-xs text-gray-500 font-black uppercase tracking-[0.2em] italic text-left">{action.urgency} Aksiyonu</span>
                    </div>
                    <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-tight max-w-xl text-left">
                      {action.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-end text-left">
                    <span className="text-[10px] text-gray-600 font-black uppercase mb-3 tracking-widest italic text-right">Etki Potansiyeli</span>
                    <div className="flex gap-2 text-left">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-12 h-2.5 rounded-full transition-all duration-1000 ${
                          s <= (action.impact === 'Kritik' ? 3 : 2) 
                          ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                          : 'bg-white/5'
                        }`} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 text-left">
                  <div className="space-y-12 text-left">
                    <div className="text-left">
                      <h5 className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] mb-5 flex items-center gap-2 text-left">
                         Veri Temelli Analiz
                      </h5>
                      <p className="text-gray-400 text-sm leading-relaxed font-bold italic border-l-2 border-blue-600/50 pl-6 py-2 text-left">
                        {action.desc}
                      </p>
                    </div>
                    
                    <div className="p-10 bg-blue-600/10 border border-blue-500/20 rounded-[3rem] relative overflow-hidden group text-left">
                      <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-all duration-1000 group-hover:scale-110 text-left">
                         <Lightbulb size={180} />
                      </div>
                      <div className="flex items-center gap-2 mb-5 relative z-10 text-left">
                        <Zap size={18} className="text-blue-500 fill-blue-500" />
                        <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] italic text-left">COS® Özel Öngörü</span>
                      </div>
                      <p className="text-white text-xl font-black italic leading-relaxed relative z-10 text-left">
                        "{action.insight}"
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] rounded-[3rem] p-10 border border-white/5 shadow-inner text-left">
                    <h5 className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] mb-10 text-left border-l-2 border-blue-500 pl-4">Uygulama Protokolü</h5>
                    <div className="space-y-8 text-left">
                      {action.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-6 group text-left">
                          <div className="w-10 h-10 shrink-0 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-[13px] font-black text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 text-left">
                            {idx + 1}
                          </div>
                          <p className="text-[14px] text-gray-300 font-black italic group-hover:text-white transition-colors pt-2 text-left uppercase tracking-tight">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}