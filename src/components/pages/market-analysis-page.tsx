"use client"

import React, { useState } from "react"
import { ShieldCheck, ChevronRight, BarChart3, Search, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { LiveIndicator } from "@/components/ui/live-indicator"
import { RateCardGenerator } from "@/components/widgets/rate-card-generator"
import { SponsorRevenueCalculator } from "@/components/widgets/sponsor-revenue-calculator"

interface MarketAnalysisPageProps {
  categoryMap?: Record<string, any>
}

const defaultMarkaVerileri = [
  {
    marka: "Sephora / L'Oréal",
    odak: "Güzellik & Cilt Bakımı",
    anlasmalar: [
      {
        model: "YouTube Makyaj Rutini",
        kriter: "75B+ İzlenme",
        kazanc: "₺55.000+",
        metrik: "Dönüşüm: %19.5",
      },
      {
        model: "Reels / TikTok Geçiş",
        kriter: "150B+ İzlenme",
        kazanc: "₺25.000+",
        metrik: "Kaydetme: Yüksek",
      },
    ],
    beklenti: "Ürün dokusu ve uygulama kalitesi odaklı",
    renk: "from-pink-500/15 to-transparent",
  },
  {
    marka: "Dyson Hair",
    odak: "Premium Lifestyle",
    anlasmalar: [
      {
        model: "Unboxing + GRWM",
        kriter: "100B+ İzlenme",
        kazanc: "₺70.000+",
        metrik: "Premium Algı",
      },
      {
        model: "Story Set (Linkli)",
        kriter: "30B+ Tıklama",
        kazanc: "%12 Pay",
        metrik: "Sepet Ort: ₺8.500",
      },
    ],
    beklenti: "Estetik görünüm ve teknolojik vurgu",
    renk: "from-purple-500/15 to-transparent",
  },
  {
    marka: "Trendyol / Zara",
    odak: "Moda & Giyim",
    anlasmalar: [
      {
        model: "Aylık 'Haul' Videosu",
        kriter: "50B+ İzlenme",
        kazanc: "₺35.000+",
        metrik: "Hızlı Tüketim",
      },
      {
        model: "Kombin / Lookbook",
        kriter: "200B+ İzlenme",
        kazanc: "₺20.000+",
        metrik: "Marka Bilinirliği",
      },
    ],
    beklenti: "Günlük stil ve erişilebilir şıklık",
    renk: "from-orange-500/15 to-transparent",
  },
]

export function MarketAnalysisPage({ categoryMap }: MarketAnalysisPageProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const pazarData = categoryMap?.["page_pazar_analizi"] || {}
  const ideasObj = categoryMap?.["content_ideas"] || {}
  const analytics = categoryMap?.["analytics"] || {}

  const pageTitle =
    pazarData.title || ideasObj.title
      ? `${ideasObj.title || "Pazar Analizi"} - Marka Karneleri`
      : "Marka Karneleri"
  const pageSubtitle =
    pazarData.subtitle ||
    "Sektör devlerinin güncel iş birliği modelleri ve bütçe analizleri."
  const liveFocus =
    pazarData.live_focus_note || ideasObj.weekly_focus || "CPM oranları %18 yükseldi."

  const globalScore = analytics.score_value ?? 95.8
  const audienceLoyalty = analytics.kpi_metrics?.[1]?.value || "%92.4"

  const customBrandCards =
    Array.isArray(ideasObj.brand_cards) && ideasObj.brand_cards.length > 0
      ? ideasObj.brand_cards
      : Array.isArray(pazarData.brand_cards) && pazarData.brand_cards.length > 0
      ? pazarData.brand_cards
      : defaultMarkaVerileri

  const filteredMarkalar = customBrandCards.filter(
    (m: any) =>
      (m.marka || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.odak || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.beklenti || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 animate-in fade-in duration-500 text-left">
      {/* Header */}
      <header className="relative p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#0A0A0E]/80 border border-white/10 overflow-hidden text-left backdrop-blur-2xl shadow-2xl">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-4 text-left max-w-xl">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                <Zap size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 italic">
                  PAZAR RADARI
                </span>
              </div>
              <LiveIndicator label="BÜTÇE AKIŞI" pulseColor="amber" />
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
              Marka <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Karneleri
              </span>
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-bold italic leading-relaxed uppercase tracking-widest">
              {pageSubtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-80 text-left">
            <Input
              icon={<Search size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="MARKA ARA (SEPHORA, DYSON...)"
            />
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-1">
              <p className="text-[9px] font-black text-amber-400 uppercase tracking-[0.2em] italic">
                Canlı Odak Akışı
              </p>
              <p className="text-xs font-bold text-white italic leading-tight">{liveFocus}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 sm:gap-10 text-left">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-6 sm:space-y-8 text-left">
          <div className="flex items-center gap-4 px-2">
            <h3 className="text-xs font-black text-white uppercase italic tracking-[0.3em]">
              Marka Bazlı Teklif Analizleri {searchQuery && `(${filteredMarkalar.length} Sonuç)`}
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="space-y-6">
            {filteredMarkalar.length > 0 ? (
              filteredMarkalar.map((marka: any, i: number) => (
                <div
                  key={i}
                  className={`glass-card p-6 sm:p-10 rounded-[2.5rem] bg-gradient-to-br ${
                    marka.renk || "from-amber-500/10 to-transparent"
                  } border border-white/10 hover:border-amber-500/30 transition-all duration-300`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div className="text-left">
                      <h4 className="text-2xl sm:text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                        {marka.marka}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.25em] mt-2 italic">
                        {marka.odak}
                      </p>
                    </div>
                    {marka.beklenti && (
                      <div className="px-4 py-2 bg-white/[0.04] rounded-2xl border border-white/10">
                        <p className="text-[9px] text-gray-400 font-black uppercase italic tracking-widest mb-0.5">
                          Marka Beklentisi
                        </p>
                        <p className="text-xs text-white font-black italic tracking-tight">
                          {marka.beklenti}
                        </p>
                      </div>
                    )}
                  </div>

                  {Array.isArray(marka.anlasmalar) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {marka.anlasmalar.map((anlasma: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-[#0A0A0E]/70 border border-white/10 p-6 rounded-2xl space-y-4 hover:bg-black/50 transition-all duration-300"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-amber-400 uppercase italic tracking-widest">
                              {anlasma.model}
                            </span>
                            <ChevronRight
                              size={16}
                              className="text-gray-500 group-hover:translate-x-1 transition-transform"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4">
                            <div className="text-left space-y-0.5">
                              <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">
                                Kriter
                              </p>
                              <p className="text-xs font-black text-white italic">
                                {anlasma.kriter}
                              </p>
                            </div>
                            <div className="text-left space-y-0.5">
                              <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">
                                Ort. Kazanç
                              </p>
                              <p className="text-xs font-black text-emerald-400 italic">
                                {anlasma.kazanc}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold italic uppercase tracking-tight">
                              {anlasma.metrik}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-10 text-center glass-card rounded-[2.5rem] space-y-3">
                <p className="text-base font-black text-gray-300 italic uppercase">
                  Aranan kriterlere uygun marka bulunamadı.
                </p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest italic">
                  Lütfen farklı bir marka adı veya kelime arayın.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-6 text-left">
          <div className="glass-card p-8 rounded-[2.5rem] border border-amber-500/20 relative overflow-hidden group shadow-2xl backdrop-blur-xl">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <BarChart3 size={22} />
              </div>
              <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none">
                Pazar <br /> <span className="text-amber-400">Rayiçleri</span>
              </h4>
              <p className="text-xs font-bold text-gray-400 italic border-l-2 border-amber-500/30 pl-4 py-1 leading-relaxed uppercase tracking-wider">
                Segment üreticileri için pazarın taban fiyatlandırma politikası.
              </p>

              <div className="space-y-6 pt-2">
                {[
                  {
                    etiket: "YouTube VLog Entegre",
                    rakam: pazarData.rayic_vlog || "₺45B - ₺120B",
                    oran: "w-full",
                  },
                  {
                    etiket: "Hızlı Geçiş (Reels)",
                    rakam: pazarData.rayic_reels || "₺20B - ₺55B",
                    oran: "w-[65%]",
                  },
                  {
                    etiket: "Story Seti (Link)",
                    rakam: pazarData.rayic_story || "₺8B - ₺18B",
                    oran: "w-[35%]",
                  },
                ].map((oge, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase italic tracking-widest">
                      <span className="text-gray-400">{oge.etiket}</span>
                      <span className="text-white font-bold">{oge.rakam}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`${oge.oran} h-full bg-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-[2.5rem] space-y-6">
            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic text-center">
              Genel Pazar Verileri
            </h5>
            <div className="space-y-3">
              {[
                { etiket: "Min. Marka Uyumu", deger: audienceLoyalty, renk: "text-white" },
                {
                  etiket: "Min. Etkileşim Skoru",
                  deger: `${globalScore}/100`,
                  renk: "text-emerald-400",
                },
                {
                  etiket: "Ort. Geri Dönüş Süresi",
                  deger: pazarData.avg_return || "12 Gün",
                  renk: "text-amber-400",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                >
                  <span className="text-xs font-bold text-gray-400 uppercase italic tracking-tight">
                    {s.etiket}
                  </span>
                  <span className={`text-sm font-black italic tracking-tighter ${s.renk}`}>
                    {s.deger}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 flex items-start gap-3 opacity-60">
            <ShieldCheck size={18} className="text-gray-400 shrink-0 mt-0.5" />
            <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed italic tracking-widest">
              Veriler, segmentteki gerçek kampanya datalarıyla simüle edilmiştir.
            </p>
          </div>
        </div>
      </div>

      {/* NEW MODULES: RATE CARD GENERATOR & REVENUE CALCULATOR */}
      <section className="space-y-6">
        <RateCardGenerator />
        <SponsorRevenueCalculator />
      </section>
    </div>
  )
}
