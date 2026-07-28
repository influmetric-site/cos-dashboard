"use client"

import { useState } from "react"
import { FileText, Download, Check, Sparkles } from "lucide-react"

export function RateCardGenerator() {
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    setDownloaded(true)
    setTimeout(() => setDownloaded(false), 2500)
  }

  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <FileText size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              OTOMATİK TEKLİF DOSYASI (RATE CARD & PITCH DECK)
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Markalara Tek Tıkla Gönderilebilir Canlı Medya Kiti
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] uppercase italic transition-all cursor-pointer min-h-[36px] shadow-lg shadow-amber-500/20 active:scale-95"
        >
          {downloaded ? (
            <>
              <Check size={14} />
              <span>DOSYA HAZIRLANDI (PDF)</span>
            </>
          ) : (
            <>
              <Download size={14} />
              <span>TEKLİF DOSYASI İNDİR (PDF)</span>
            </>
          )}
        </button>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold italic text-gray-300">
          <span>Canlı Erişim Metriği: <strong className="text-white">2.4M</strong></span>
          <span>Ort. CPM: <strong className="text-amber-400">₺45.00</strong></span>
          <span>Dönüşüm Oranı: <strong className="text-emerald-400">%19.5</strong></span>
        </div>
        <p className="text-[11px] text-gray-400 font-medium italic border-l-2 border-amber-500/40 pl-3">
          ✨ Bu dosya Supabase canlı verilerinizle otomatik oluşturulmuştur. Markalara teklif verirken resmi fiyat kartınız olarak kullanabilirsiniz.
        </p>
      </div>
    </div>
  )
}
