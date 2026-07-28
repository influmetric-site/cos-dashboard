"use client"

import React, { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { BarChart3, Zap, Eye, MessageSquare, Share2, ChevronDown, Info, Activity, Users, Camera, Play, MessageCircle } from "lucide-react"

const performanceData = [
  { action: 'Reels', score: 92, color: '#3B82F6' },
  { action: 'Post', score: 74, color: '#60A5FA' },
  { action: 'Hikaye', score: 85, color: '#93C5FD' },
  { action: 'Yorum', score: 68, color: '#BFDBFE' },
  { action: 'Topluluk', score: 90, color: '#2563EB' },
]

const actionCards = [
  {
    id: "reels",
    title: "Reels Dinamiği",
    score: "92/100",
    label: "VİDEO PERFORMANSI",
    longDesc: "Vlog ve lifestyle temalı Reels içeriklerin, Keşfet algoritmasında %65 daha fazla tutulma sağlıyor. Özellikle 'Günlük Rutin' serilerinin izlenme süresi platform ortalamasının üzerinde.",
    icon: Play,
    params: { "İzlenme": "45K+", "Süreklilik": "%72", "Paylaşım": "1.1K" }
  },
  {
    id: "post",
    title: "Post Etkileşimi",
    score: "74/100",
    label: "SABİT AKIŞ",
    longDesc: "Estetik ağırlıklı lifestyle postlarının kaydedilme oranlarında artış var. Bilgi verici carousel (kaydırmalı) içeriklerin, düz görsellere göre %15 daha fazla etkileşim aldığı saptandı.",
    icon: Camera,
    params: { "Kaydetme": "420", "Erişim": "12K", "Dönüş": "%5" }
  },
  {
    id: "story",
    title: "Hikaye Rezonansı",
    score: "85/100",
    label: "HİKAYE TUTULMASI",
    longDesc: "Hikaye geçiş oranların (drop-off) oldukça düşük. Bu, kitlenin paylaşımlarını sonuna kadar izlediğini gösteriyor. Ürün önerisi içeren link tıklamaların bu hafta zirve yaptı.",
    icon: Activity,
    params: { "Tıklama": "890", "Cevap": "120", "Bırakma": "%4" }
  },
  {
    id: "comment",
    title: "Yorum Yönetimi",
    score: "68/100",
    label: "ETKİLEŞİM HIZI",
    longDesc: "Takipçilerle kurulan samimiyet skoru yüksek ancak dönüş hızın bu hafta düştü. İlk 30 dakikada verilen cevaplar, algoritma skorunu %20 yukarı taşıma potansiyeline sahip.",
    icon: MessageCircle,
    params: { "Hız": "45dk", "Duygu": "Pozitif", "Cevap": "%60" }
  },
  {
    id: "community",
    title: "Topluluk Sadakati",
    score: "90/100",
    label: "KİTLE BAĞLILIĞI",
    longDesc: "Soru-cevap etkinlikleri ve samimi anketlerle topluluk bağını çok güçlü tutuyorsun. Bu sadakat, uzun vadeli lifestyle marka iş birlikleri için en kritik değerin.",
    icon: Users,
    params: { "Sadakat": "%88", "Anket Kat.": "2.4K", "Yeni": "+450" }
  }
]

export function PerformancePage() {
  const [expandedId, setExpandedId] = useState<string | null>("reels")

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20 text-left">
      <div className="grid grid-cols-12 gap-8">
        
        {/* SOL PANEL: BAR CHART */}
        <div className="col-span-12 lg:col-span-7 bg-[#0B0F17]/80 border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-xl shadow-2xl relative overflow-hidden group h-fit">
          <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-10 transition-opacity">
              <BarChart3 size={120} className="text-blue-500" />
          </div>

          <div className="mb-10 flex justify-between items-start relative z-10 text-left">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2 text-left">
                <BarChart3 size={14} className="text-blue-500" />
                <span className="text-[10px] text-blue-500 font-black tracking-[0.3em] uppercase italic text-left">Aşama 03 / Aksiyon Matrisi</span>
              </div>
              <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter text-left">Aksiyon <span className="text-blue-500">Performansı</span></h3>
              <p className="text-xs text-gray-500 mt-2 font-bold italic uppercase tracking-wider text-left">Haftalık İçerik Dağılım Skorları</p>
            </div>
            <div className="px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-2xl shadow-lg shadow-blue-900/10">
               <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest italic">Global Skor: 81.8</span>
            </div>
          </div>
          
          <div className="h-[400px] w-full text-left min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={350}>
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                  dataKey="action" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9CA3AF', fontSize: 11, fontWeight: 900, fontStyle: 'italic'}} 
                  dy={15}
                />
                <YAxis hide domain={[0, 100]} />
                
                <Tooltip 
                  cursor={{fill: 'rgba(255, 255, 255, 0.03)'}}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#111827] border border-blue-500/30 p-5 rounded-2xl shadow-2xl backdrop-blur-md text-left">
                          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 italic text-left">{payload[0].payload.action} Analizi</p>
                          <p className="text-lg font-black text-white italic text-left">Skor: {payload[0].value}/100</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                
                <Bar dataKey="score" radius={[15, 15, 5, 5]} barSize={60}>
                  {performanceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      fillOpacity={0.8} 
                      className="hover:fillOpacity-100 transition-all duration-500 cursor-pointer" 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12 relative z-10">
            <div className="flex items-center gap-4 p-5 bg-white/[0.02] rounded-[2rem] border border-white/5 transition-all hover:border-blue-500/20 group/stat">
              <Eye size={20} className="text-blue-500 group-hover/stat:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest text-left">Görüntülenme</div>
                <div className="text-lg font-black text-white italic text-left">42.8K</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white/[0.02] rounded-[2rem] border border-white/5 transition-all hover:border-blue-400/20 group/stat">
              <MessageSquare size={20} className="text-blue-400 group-hover/stat:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest text-left">Etkileşim</div>
                <div className="text-lg font-black text-white italic text-left">2.4K</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white/[0.02] rounded-[2rem] border border-white/5 transition-all hover:border-blue-300/20 group/stat">
              <Share2 size={20} className="text-blue-300 group-hover/stat:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-[9px] text-gray-600 font-black uppercase tracking-widest text-left">Paylaşım</div>
                <div className="text-lg font-black text-white italic text-left">1.1K</div>
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ PANEL: AKSİYON KARTLARI */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          {actionCards.map((card) => (
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
                  <span className="text-xl font-black text-white italic tracking-tighter drop-shadow-sm">
                    {card.score}
                  </span>
                  
                  <div className={`p-2 rounded-full border transition-all duration-500 ${
                    expandedId === card.id 
                    ? 'bg-blue-500 border-blue-400 text-white rotate-180' 
                    : 'bg-white/5 border-white/10 text-blue-500 group-hover:bg-blue-500/20'
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
                        <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest italic">Haftalık Strateji Notu</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed italic font-bold border-l-2 border-blue-600/50 pl-4 py-1 text-left">
                        "{card.longDesc}"
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(card.params).map(([key, val]) => (
                        <div key={key} className="bg-white/5 border border-white/5 rounded-2xl p-3 text-center transition-all hover:border-blue-500/20">
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