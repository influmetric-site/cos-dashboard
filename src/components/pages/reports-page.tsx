"use client"

import React, { useState } from "react"
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Lock,
  ArrowUpRight,
  Filter,
  FileSpreadsheet,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Arşivlenen Raporlar Verisi
const archivedReports = [
  { id: 1, name: "Haftalık İçerik Analizi - Mayıs (H2)", date: "10.05.2026", size: "2.4 MB", type: "PDF", status: "Tamamlandı" },
  { id: 2, name: "Kitle Segmentasyon Raporu", date: "03.05.2026", size: "1.8 MB", type: "CSV", status: "Tamamlandı" },
  { id: 3, name: "Trend Tahminleme Projeksiyonu", date: "26.04.2026", size: "4.1 MB", type: "PDF", status: "Arşivlendi" },
]

// Hızlı İstatistikler
const reportStats = [
  { label: "Toplam Erişim", value: "128.4K", change: "+12%", trend: "up" },
  { label: "Etkileşim Oranı", value: "%8.2", change: "+2.4%", trend: "up" },
  { label: "Dwell Time", value: "42s", change: "+15%", trend: "up" }
]

export function ReportsPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [activeFilter, setActiveFilter] = useState("hepsi")

  const handleBatchDownload = () => {
    setIsDownloading(true)
    setDownloadSuccess(false)
    setTimeout(() => {
      setIsDownloading(false)
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 3000)
    }, 1500)
  }

  const filteredReports = archivedReports.filter(report => {
    if (activeFilter === "pdf") return report.type === "PDF"
    if (activeFilter === "csv") return report.type === "CSV"
    return true
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20 text-left">
      
      {/* ÜST PANEL: BAŞLIK VE AKSİYONLAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-[#0B0F17]/80 p-10 rounded-[3.5rem] border border-white/5 backdrop-blur-2xl shadow-2xl mb-10 text-left">
        <div className="text-left w-full md:w-auto space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 size={14} className="text-emerald-500" />
            <span className="text-[10px] text-emerald-500 font-black tracking-[0.3em] uppercase italic">Veri Yönetimi</span>
          </div>
          <h2 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">
            Veri <span className="text-emerald-500">Arşivi</span>
          </h2>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] italic">
            Geçmiş Performans Raporları ve Analitik Çıktılar
          </p>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <div className="flex items-center bg-white/[0.02] border border-white/5 rounded-[2rem] p-1">
            {["hepsi", "pdf", "csv"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase italic transition-all ${
                  activeFilter === f ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-gray-500 hover:text-white"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <Button 
            variant="emerald" 
            onClick={handleBatchDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Hazırlanıyor...
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 size={18} /> İndirme Başladı
              </>
            ) : (
              <>
                <Download size={18} /> Toplu İndir
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 text-left">
        
        {/* SOL: ARŞİV LİSTESİ */}
        <div className="col-span-12 lg:col-span-8 space-y-6 text-left">
          <div className="bg-[#0B0F17]/60 border border-white/5 rounded-[3.5rem] overflow-hidden backdrop-blur-xl shadow-2xl">
            <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <div className="text-left">
                <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Otomatik Oluşturulan Raporlar</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 italic">Sistem tarafından haftalık periyotlarla üretilen dokümanlar.</p>
              </div>
              <FileSpreadsheet size={24} className="text-gray-800" />
            </div>
            
            <div className="divide-y divide-white/5">
              {filteredReports.map((report, i) => (
                <div 
                  key={report.id} 
                  className="p-8 flex items-center justify-between hover:bg-white/[0.02] transition-all duration-500 group"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="flex items-center gap-7">
                    <div className={`p-5 rounded-2xl transition-all duration-700 ${
                      hoveredIdx === i ? 'bg-emerald-600 text-white scale-110 shadow-2xl' : 'bg-white/[0.03] text-gray-600'
                    }`}>
                      <FileText size={24} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-lg font-black text-gray-200 group-hover:text-white transition-colors italic uppercase tracking-tight">{report.name}</h4>
                      <div className="flex items-center gap-5 text-[10px] text-gray-500 mt-2 font-black uppercase tracking-widest italic">
                        <span className="flex items-center gap-2 font-bold"><Calendar size={12} className="text-emerald-500"/> {report.date}</span>
                        <span className="text-white/5">/</span>
                        <span className="font-bold">{report.size}</span>
                        <span className="text-white/5">/</span>
                        <span className="text-emerald-500 font-black">{report.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-gray-500 hover:bg-white/10 hover:text-white transition-all shadow-inner">
                      <Eye size={20} />
                    </button>
                    <button 
                      onClick={() => handleBatchDownload()}
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all shadow-xl"
                    >
                      <Download size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SAĞ PANEL: ÖZET VE GÜVENLİK */}
        <div className="col-span-12 lg:col-span-4 space-y-8 text-left">
          
          {/* HIZLI METRİK KARTLARI */}
          <div className="grid grid-cols-1 gap-5">
            {reportStats.map((stat, idx) => (
              <div key={idx} className="bg-[#0B0F17]/80 p-8 rounded-[3rem] border border-white/5 hover:border-emerald-500/30 transition-all duration-700 group shadow-xl">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest italic">{stat.label}</p>
                  <ArrowUpRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-baseline gap-4">
                  <h3 className="text-4xl font-black text-white italic tracking-tighter">{stat.value}</h3>
                  <span className="text-[11px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full italic">{stat.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* COS® ÖZEL ÖNGÖRÜ */}
          <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-[3rem] p-10 relative overflow-hidden group text-left shadow-2xl">
            <div className="absolute -right-12 -bottom-12 opacity-5 group-hover:scale-110 transition-all duration-1000 text-white">
               <TrendingUp size={220} />
            </div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <Zap size={20} className="text-emerald-500 fill-emerald-500" />
              <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em] italic">Haftalık Analitik Notu</span>
            </div>
            <p className="text-white text-[16px] font-black italic leading-relaxed relative z-10 tracking-tight">
              "İzleyici sadakati son 3 rapor boyunca %15 artış gösterdi. Bu, içeriklerindeki teknik derinliğin kitleyi bağladığının kanıtı."
            </p>
          </div>

          {/* GÜVENLİK NOTU */}
          <div className="p-8 bg-[#0B0F17]/40 border border-white/5 rounded-[2.5rem] relative overflow-hidden text-left shadow-lg">
            <div className="absolute -right-6 -bottom-6 text-white/5">
              <ShieldCheck size={120} />
            </div>
            <div className="flex items-center gap-3 mb-4 relative z-10 text-left">
              <Lock size={16} className="text-gray-700" />
              <span className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em] italic">Veri Koruma Protokolü</span>
            </div>
            <p className="text-[11px] text-gray-600 font-bold leading-relaxed italic relative z-10 text-left">
              Raporlanan tüm veriler <span className="text-emerald-500 font-black">COS®</span> çekirdeği tarafından şifrelenmiştir. Bu veriler üçüncü taraf veya rakiplerle paylaşılmaz.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}