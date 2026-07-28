"use client"

import { Notebook, ExternalLink, CheckSquare, MessageSquare } from "lucide-react"

export interface CustomNotesContent {
  title?: string
  consultant_note?: string
  action_checklist?: Array<{ task: string; done?: boolean }>
  quick_links?: Array<{ label: string; url: string }>
}

const defaultContent: CustomNotesContent = {
  title: "Özel Notlar & Aksiyonlar",
  consultant_note: "Danışman Notu: Bu ay özellikle dönüşüm oranlarına odaklanıyoruz. Sponsor kiti şablonu güncellendi.",
  action_checklist: [
    { task: "Yeni sponsorluk kitini indir ve incele", done: true },
    { task: "Q3 içerik takvimini onayla", done: false },
    { task: "Analitik entegrasyon kontrolünü tamamla", done: true }
  ],
  quick_links: [
    { label: "Sponsorluk Kiti PDF", url: "#" },
    { label: "Canlı Analitik Raporu", url: "#" }
  ]
}

export function CustomNotesCategory({ content_json }: { content_json?: CustomNotesContent }) {
  const rawData = { ...defaultContent, ...content_json }

  // Clean any legacy 'Müşteri' text
  const cleanTitle = rawData.title?.replace(/Müşteriye/gi, "Kullanıcıya")?.replace(/Müşteri/gi, "Kullanıcı") || "Özel Notlar & Aksiyonlar"

  return (
    <div className="bg-[#0A0A0F] border border-white/10 p-7 rounded-[2.5rem] space-y-6 shadow-xl backdrop-blur-xl h-full flex flex-col justify-between">
      {/* Category Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Notebook size={18} />
          </div>
          <div>
            <h2 className="text-sm font-black text-white italic uppercase tracking-wider">
              {cleanTitle}
            </h2>
            <p className="text-[10px] text-gray-500 italic uppercase">Kategori 4 • Özel Notlar & Linkler</p>
          </div>
        </div>

        <span className="text-[9px] font-black text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 italic">
          Admin Mesajı
        </span>
      </div>

      {/* Consultant Note */}
      {rawData.consultant_note && (
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase italic">
            <MessageSquare size={12} />
            <span>Danışman Notu</span>
          </div>
          <p className="text-xs text-gray-300 font-medium italic leading-relaxed">
            {rawData.consultant_note}
          </p>
        </div>
      )}

      {/* Checklist */}
      <div className="space-y-2 flex-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase italic">Aksiyon Listesi</p>
        {rawData.action_checklist?.map((item, index) => (
          <div key={index} className="flex items-center gap-2.5 p-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-gray-300 italic">
            <CheckSquare size={14} className={item.done ? "text-emerald-400 shrink-0" : "text-gray-600 shrink-0"} />
            <span className={item.done ? "line-through text-gray-500 font-normal" : "font-semibold text-white"}>
              {item.task}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      {rawData.quick_links && rawData.quick_links.length > 0 && (
        <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2">
          {rawData.quick_links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[10px] font-bold text-blue-400 uppercase tracking-wider italic transition-all"
            >
              <span>{link.label}</span>
              <ExternalLink size={10} />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
