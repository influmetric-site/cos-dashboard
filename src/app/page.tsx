"use client"

import { 
  ShieldCheck, 
  Cpu
} from "lucide-react"

// Widget Importları
import { IntelligenceCore } from "@/components/widgets/intelligence-core"
import { MetricFusion } from "@/components/widgets/metric-fusion"
import { GrowthAnalysis } from "@/components/widgets/growth-analysis"
import { PerformanceTrend } from "@/components/widgets/performance-trend"
import { GrowthIndicators } from "@/components/widgets/growth-indicators"
import { StrategicRecommendations } from "@/components/widgets/strategic-recommendations"
import { OverallScore } from "@/components/widgets/overall-score"

export default function DashboardPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 space-y-12 pb-32 text-left">
      
      {/* ÜST DASHBOARD HEADER - MAVİ/İNDİGO KONSEPT */}
      <header className="relative p-12 rounded-[4rem] bg-[#0A0A0B] border border-white/5 overflow-hidden text-left backdrop-blur-2xl shadow-2xl">
        {/* Arka Plan Glow Efektleri - Mavi/İndigo Hattı */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-600/5 blur-[100px] rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Cpu size={12} className="text-blue-400 fill-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 italic">Core Intelligence Active</span>
            </div>
            <h1 className="text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.8] mb-2">
              Sistem <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Özeti</span>
            </h1>
            <p className="text-gray-500 text-sm font-bold max-w-sm italic leading-relaxed uppercase tracking-widest">
              INFLUMETRIC COS® çekirdek algoritmaları tarafından simüle edilen <span className="text-white">anlık performans verileri.</span>
            </p>
          </div>

          <div className="flex gap-4 p-4 bg-white/[0.02] rounded-[2rem] border border-white/5 backdrop-blur-md">
             <div className="text-right px-4 py-2">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic">Sistem Durumu</p>
                <p className="text-xs font-black text-emerald-500 italic uppercase">Stabil %100</p>
             </div>
             <div className="w-px h-10 bg-white/10 self-center" />
             <div className="text-right px-4 py-2">
                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest italic">Aktif Analiz</p>
                <p className="text-xs font-black text-white italic uppercase">1,240 Creator</p>
             </div>
          </div>
        </div>
      </header>

      {/* ANA WIDGET GRİDİ */}
      <section className="space-y-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 transition-all duration-500 hover:brightness-110">
            <IntelligenceCore />
          </div>
          <div className="col-span-12 lg:col-span-3 transition-all duration-500 hover:brightness-110">
            <MetricFusion />
          </div>
          <div className="col-span-12 lg:col-span-5 transition-all duration-500 hover:brightness-110">
            <GrowthAnalysis />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 transition-all duration-500 hover:brightness-110">
            <PerformanceTrend />
          </div>
          <div className="col-span-12 lg:col-span-4 transition-all duration-500 hover:brightness-110">
            <GrowthIndicators />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 transition-all duration-500 hover:brightness-110">
            <StrategicRecommendations />
          </div>
          <div className="col-span-12 lg:col-span-4 transition-all duration-500 hover:brightness-110">
            <OverallScore />
          </div>
        </div>
      </section>

      {/* ALT BİLGİ */}
      <footer className="flex justify-between items-center px-12 py-8 bg-white/[0.02] border border-white/5 rounded-[3rem] opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4">
            <ShieldCheck size={16} className="text-blue-500" />
            <p className="text-[10px] font-black text-gray-500 uppercase italic tracking-[0.2em]">Tüm veriler uçtan uca şifrelenmiştir</p>
          </div>
          <p className="text-[10px] font-black text-gray-600 uppercase tracking-tighter italic text-right">
            Powered by COS Deep Intelligence v2.4.0
          </p>
      </footer>
    </div>
  )
}