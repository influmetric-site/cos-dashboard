"use client"

import { useState } from "react"
import { Sparkles, Copy, Check, RefreshCw } from "lucide-react"

const hooksDatabase = [
  {
    title: "Bu Hatanın Bedeli Binlerce Lira! (İlk 3sn Kancası)",
    hook: "'Çoğu insan bu detayı kaçırdığı için içerikleri izlenmiyor...' diyerek videoya başla.",
    niche: "Lifestyle / Sosyal Medya",
    impact: "+45% Tutma Oranı",
  },
  {
    title: "Kimsenin Anlatmadığı Gizli Metot",
    hook: "'Bunu bildiğiniz an tüm stratejiniz değişecek...' ifadesiyle ekranı 2 parçaya böl.",
    niche: "İçerik Stratejisi",
    impact: "+60% Kaydetme",
  },
  {
    title: "30 Saniyede Mükemmel Dönüşüm",
    hook: "'Eğer daha az zamanda daha fazla etkileşim istiyorsan bu 3 adımı uygula...'",
    niche: "Büyüme & Performans",
    impact: "+38% Paylaşım",
  },
]

export function AiHookGenerator() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const currentHook = hooksDatabase[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % hooksDatabase.length)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${currentHook.title}\nKanca: ${currentHook.hook}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-card p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              AI KANCA (HOOK) VE BAŞLIK ÜRETECİ
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              İlk 3 Saniyede İzletme Garantili Kancalar
            </p>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-black uppercase italic transition-all cursor-pointer min-h-[36px]"
        >
          <RefreshCw size={12} className="animate-spin-slow" />
          <span>YENİ YENİ KANCA ÜRET</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[9px] font-black uppercase italic">
            {currentHook.niche}
          </span>
          <span className="text-emerald-400 text-xs font-black italic">
            {currentHook.impact}
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="text-base font-black text-white italic uppercase tracking-tight">
            Önerilen Başlık: "{currentHook.title}"
          </h4>
          <p className="text-xs font-bold text-gray-300 italic leading-relaxed border-l-2 border-purple-500/50 pl-3">
            🎯 <strong>Görsel & Sesli Kanca:</strong> {currentHook.hook}
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase italic transition-all cursor-pointer min-h-[36px]"
          >
            {copied ? (
              <>
                <Check size={12} className="text-emerald-400" />
                <span>KOPYALANDI</span>
              </>
            ) : (
              <>
                <Copy size={12} />
                <span>METNİ KOPYALA</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
