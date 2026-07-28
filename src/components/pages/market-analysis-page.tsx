"use client"

import React, { useState } from "react"
import { 
  ShieldCheck,
  ChevronRight,
  BarChart3,
  Search,
  Zap
} from "lucide-react"
import { Input } from "@/components/ui/input"

/**
 * Lifestyle & Beauty Marka Veri Seti
 */
const markaVerileri = [
  {
    marka: "Sephora / L'Oréal",
    odak: "Güzellik & Cilt Bakımı",
    anlasmalar: [
      { model: "YouTube Makyaj Rutini", kriter: "75B+ İzlenme", kazanc: "₺55.000+", metrik: "Dönüşüm: %8.4" },
      { model: "Reels / TikTok Geçiş", kriter: "150B+ İzlenme", kazanc: "₺25.000+", metrik: "Kaydetme: Yüksek" }
    ],
    beklenti: "Ürün dokusu ve uygulama kalitesi odaklı",
    renk: "from-pink-500/10 to-transparent"
  },
  {
    marka: "Dyson Hair",
    odak: "Premium Lifestyle",
    anlasmalar: [
      { model: "Unboxing + GRWM", kriter: "100B+ İzlenme", kazanc: "₺70.000+", metrik: "Premium Algı" },
      { model: "Story Set (Linkli)", kriter: "30B+ Tıklama", kazanc: "%12 Pay", metrik: "Sepet Ort: ₺8.500" }
    ],
    beklenti: "Estetik görünüm ve teknolojik vurgu",
    renk: "from-purple-500/10 to-transparent"
  },
  {
    marka: "Trendyol / Zara",
    odak: "Moda & Giyim",
    anlasmalar: [
      { model: "Aylık 'Haul' Videosu", kriter: "50B+ İzlenme", kazanc: "₺35.000+", metrik: "Hızlı Tüketim" },
      { model: "Kombin / Lookbook", kriter: "200B+ İzlenme", kazanc: "₺20.000+", metrik: "Marka Bilinirliği" }
    ],
    beklenti: "Günlük stil ve erişilebilir şıklık",
    renk: "from-orange-500/10 to-transparent"
  }
]

export function MarketAnalysisPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMarkalar = markaVerileri.filter(m => 
    m.marka.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.odak.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.beklenti.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-32 text-left">
      
      {/* HEADER: BETA KATEGORİ VURGUSU */}
      <header className="relative p-12 rounded-[4rem] bg-[#0B0F17]/80 border border-white/5 overflow-hidden text-left backdrop-blur-2xl shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-600/5 blur-[120px] rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Zap size={12} className="text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 italic">BETA SÜRÜM</span>
            </div>
            <h1 className="text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.8] mb-2">
              Marka <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Karneleri</span>
            </h1>
            <p className="text-gray-500 text-sm font-bold max-w-sm italic leading-relaxed uppercase tracking-widest">
              Moda ve güzellik devlerinin güncel iş birliği modelleri ve veri odaklı bütçe analizleri.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-96 text-left">
            <Input 
              icon={<Search size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="MARKA ARA (L'ORÉAL, DYSON...)"
            />
            <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-[2rem] space-y-2">
              <p className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em] italic">Canlı Veri Akışı</p>
              <p className="text-[12px] font-bold text-white italic leading-tight">Lifestyle kategorisinde CPM oranları %18 yükseldi.</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-10 text-left">
        
        {/* SOL KOLON: MARKA ANALİZLERİ */}
        <div className="col-span-12 lg:col-span-8 space-y-10 text-left">
          <div className="flex items-center gap-4 px-6">
            <h3 className="text-[11px] font-black text-white uppercase italic tracking-[0.4em]">
              Marka Bazlı Teklif Analizleri {searchQuery && `(${filteredMarkalar.length} Sonuç)`}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="space-y-8">
            {filteredMarkalar.length > 0 ? (
              filteredMarkalar.map((marka, i) => (
                <div key={i} className={`group relative p-12 rounded-[3.5rem] bg-gradient-to-br ${marka.renk} border border-white/[0.05] hover:border-white/10 transition-all duration-700`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                    <div className="text-left">
                      <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{marka.marka}</h4>
                      <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mt-3 italic">{marka.odak}</p>
                    </div>
                    <div className="px-6 py-3 bg-white/[0.03] rounded-[1.5rem] border border-white/5">
                      <p className="text-[9px] text-gray-500 font-black uppercase italic tracking-widest mb-1">Marka Beklentisi</p>
                      <p className="text-[13px] text-white font-black italic tracking-tight">{marka.beklenti}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {marka.anlasmalar.map((anlasma, idx) => (
                      <div key={idx} className="bg-[#0B0F17]/60 border border-white/[0.05] p-8 rounded-[2.5rem] space-y-6 hover:bg-[#0B0F17]/90 transition-all duration-500">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black text-amber-500 uppercase italic tracking-widest">{anlasma.model}</span>
                          <ChevronRight size={16} className="text-gray-700 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <div className="grid grid-cols-2 gap-6 border-y border-white/5 py-6">
                          <div className="text-left space-y-1">
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-tighter">Kriter</p>
                            <p className="text-[13px] font-black text-white italic">{anlasma.kriter}</p>
                          </div>
                          <div className="text-left space-y-1">
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-tighter">Ort. Kazanç</p>
                            <p className="text-[13px] font-black text-emerald-500 italic">{anlasma.kazanc}</p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <p className="text-[10px] text-gray-400 font-bold italic uppercase tracking-tight opacity-70">{anlasma.metrik}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center bg-white/[0.02] border border-white/5 rounded-[3rem] space-y-4">
                <p className="text-lg font-black text-gray-400 italic uppercase">Aranan kriterlere uygun marka bulunamadı.</p>
                <p className="text-xs text-gray-600 font-bold uppercase tracking-widest italic">Lütfen farklı bir marka adı veya kelime arayın.</p>
              </div>
            )}
          </div>
        </div>

        {/* SAĞ KOLON: PAZAR RAYİÇLERİ */}
        <div className="col-span-12 lg:col-span-4 space-y-10 text-left">
          <div className="p-12 rounded-[4rem] bg-[#0B0F17]/80 border border-amber-500/20 relative overflow-hidden group shadow-2xl backdrop-blur-xl">
            <div className="relative z-10 space-y-10">
              <div className="inline-flex p-4 rounded-[1.5rem] bg-amber-500/10 border border-amber-500/20">
                <BarChart3 size={24} className="text-amber-500" />
              </div>
              <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                Pazar <br /> <span className="text-amber-500">Rayiçleri</span>
              </h4>
              <p className="text-[11px] font-bold text-gray-500 italic border-l-2 border-amber-500/30 pl-6 py-2 leading-relaxed uppercase tracking-wider">
                Lifestyle & Beauty segmenti üreticileri için pazarın taban fiyatlandırma politikası.
              </p>
              
              <div className="space-y-8 pt-4">
                {[
                  { etiket: "YouTube VLog Entegre", rakam: "₺45B - ₺120B", oran: "w-full" },
                  { etiket: "Hızlı Geçiş (Reels)", rakam: "₺20B - ₺55B", oran: "w-[65%]" },
                  { etiket: "Story Seti (Link)", rakam: "₺8B - ₺18B", oran: "w-[35%]" }
                ].map((oge, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase italic tracking-widest">
                      <span className="text-gray-600">{oge.etiket}</span>
                      <span className="text-white">{oge.rakam}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                      <div className={`${oge.oran} h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-10 rounded-[3.5rem] bg-white/[0.02] border border-white/5 space-y-8 backdrop-blur-md shadow-xl">
            <h5 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] italic text-center">Genel Veriler</h5>
            <div className="space-y-4">
              {[
                { etiket: "Min. Marka Uyumu", deger: "%72", renk: "text-white" },
                { etiket: "Min. Etkileşim Skoru", deger: "8.2", renk: "text-emerald-500" },
                { etiket: "Ort. Geri Dönüş Süresi", deger: "12 Gün", renk: "text-amber-500" }
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] group hover:bg-white/[0.04] transition-all">
                  <span className="text-[10px] font-bold text-gray-500 uppercase italic tracking-tight">{s.etiket}</span>
                  <span className={`text-[13px] font-black italic tracking-tighter ${s.renk}`}>{s.deger}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-10 flex items-start gap-4 opacity-30 group hover:opacity-60 transition-opacity">
            <ShieldCheck size={20} className="text-gray-500 shrink-0 mt-1" />
            <p className="text-[9px] font-black text-gray-500 uppercase leading-relaxed italic tracking-widest">
              Veriler, Moda/Lifestyle segmentindeki son 12 ayın gerçek kampanya datalarıyla simüle edilmiştir.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
