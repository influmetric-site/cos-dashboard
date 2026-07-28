"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Users, Shield, ArrowLeft, 
  CheckCircle, AlertCircle, Save, Code2, Cpu, Sparkles, Layers
} from "lucide-react"
import { USER_PROFILES_DATA, getProfileDataByEmail } from "@/data/user-profiles-data"

interface UserProfile {
  id: string
  email: string
  username?: string
  full_name?: string
  company_name?: string
  role?: string
}

interface MasterAdminStudioProps {
  users: UserProfile[]
  allCategories: Record<string, any>
}

export function MasterAdminStudio({ users, allCategories: initialCategories }: MasterAdminStudioProps) {
  const router = useRouter()
  
  const [selectedEmail, setSelectedEmail] = useState<string>("batur.guzey@gmail.com")
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveLoading, setSaveLoading] = useState(false)

  const profileData = getProfileDataByEmail(selectedEmail)
  const targetUser = users.find(u => u.email === selectedEmail) || users[0]

  const handleSaveToDb = async () => {
    if (!targetUser) return
    setSaveLoading(true)
    setSaveError(null)
    setSaveSuccess(null)

    try {
      const res = await fetch("/cos/api/admin/update-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: targetUser.id,
          categories_map: profileData.categories
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setSaveError(data.error || "Kaydetme başarısız.")
      } else {
        setSaveSuccess(`🚀 "${profileData.username}" (${profileData.niche_name}) niş verileri canlıya alındı!`)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      setSaveError(`Sunucu hatası: ${msg}`)
    } finally {
      setSaveLoading(false)
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8 pb-32 text-left">
      
      {/* HEADER */}
      <header className="relative p-8 md:p-10 rounded-[3.5rem] bg-[#0A0A0B] border border-white/10 overflow-hidden text-left backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">
              INFLUMETRIC <span className="text-indigo-500">COS®</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 uppercase italic flex items-center gap-1.5">
              <Shield size={12} />
              Kullanıcı & Niş Yöneticisi
            </span>
          </div>

          <button
            onClick={() => router.push("/cos")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-bold text-white italic transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Client Paneline Dön</span>
          </button>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              İki Sabit Kullanıcı <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400">& Niş Profilleri</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold italic uppercase tracking-wider max-w-2xl">
              Influmetric (Teknoloji & AI) ve Demo (Moda & Lifestyle) hesaplarının özel niş verileri.
            </p>
          </div>

          <button
            onClick={handleSaveToDb}
            disabled={saveLoading}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white text-xs font-black uppercase italic tracking-wider shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer shrink-0 disabled:opacity-50"
          >
            {saveLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Kaydediliyor...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>🚀 BU NİŞ VERİLERİNİ CANLIYA AL</span>
              </>
            )}
          </button>
        </div>

        {/* SELECTOR BAR */}
        <div className="relative z-10 bg-black/40 border border-white/10 p-4 rounded-3xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Users size={18} className="text-indigo-400 shrink-0" />
            <span className="text-xs font-black uppercase text-gray-400 italic">Aktif Yönetilen Hesap:</span>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <select
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              className="w-full bg-[#12121A] border border-white/20 rounded-2xl py-2.5 px-4 text-xs font-bold text-indigo-300 italic focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="batur.guzey@gmail.com">
                1. Influmetric (batur.guzey@gmail.com) - TEKNOLOJİ & AI İNCELEMELERİ
              </option>
              <option value="batur.steam@gmail.com">
                2. Demo (batur.steam@gmail.com) - MODA & LÜKS LIFESTYLE
              </option>
            </select>
          </div>
        </div>
      </header>

      {/* FEEDBACK */}
      {saveSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-bold italic flex items-center gap-2 animate-in fade-in">
          <CheckCircle size={18} />
          <span>{saveSuccess}</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold italic flex items-center gap-2 animate-in fade-in">
          <AlertCircle size={18} />
          <span>{saveError}</span>
        </div>
      )}

      {/* PROFILE DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        
        {/* INFLUMETRIC PROFILE CARD */}
        <div className={`p-8 rounded-[3rem] border transition-all space-y-6 ${
          selectedEmail === 'batur.guzey@gmail.com'
            ? 'bg-gradient-to-br from-indigo-900/20 to-blue-900/15 border-indigo-500/40 shadow-2xl'
            : 'bg-[#0A0A0F] border-white/5 opacity-70'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Cpu size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Influmetric Hesabı</h3>
                <p className="text-[10px] text-indigo-400 font-bold uppercase italic">batur.guzey@gmail.com • ADMIN</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-black text-indigo-300 uppercase italic">
              Teknoloji & AI
            </span>
          </div>

          <div className="space-y-3 text-xs italic">
            <p className="text-gray-300 font-bold">Niş Alanı: <span className="text-white font-black">Teknoloji, Donanım & Yapay Zeka</span></p>
            <p className="text-gray-300 font-bold">Global Etkileşim Skoru: <span className="text-emerald-400 font-black">96.8 / 100</span></p>
            <p className="text-gray-300 font-bold">Toplam İzlenme / Erişim: <span className="text-blue-400 font-black">4.8M</span></p>
            <p className="text-gray-300 font-bold">Kitle Sadakati: <span className="text-purple-400 font-black">%94.2</span></p>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400 font-bold italic space-y-1">
            <p className="text-gray-500">Örnek İçerikler:</p>
            <p className="text-white">• 2026'da Asla Almamanız Gereken 3 Teknoloji Ürünü</p>
            <p className="text-white">• Benim 2026 AI & Geliştirici Masa Kurulumum</p>
          </div>
        </div>

        {/* DEMO PROFILE CARD */}
        <div className={`p-8 rounded-[3rem] border transition-all space-y-6 ${
          selectedEmail === 'batur.steam@gmail.com'
            ? 'bg-gradient-to-br from-amber-900/20 to-orange-900/15 border-amber-500/40 shadow-2xl'
            : 'bg-[#0A0A0F] border-white/5 opacity-70'
        }`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white italic uppercase tracking-tight">Demo Hesabı</h3>
                <p className="text-[10px] text-amber-400 font-bold uppercase italic">batur.steam@gmail.com • MÜŞTERİ</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-[10px] font-black text-amber-300 uppercase italic">
              Moda & Lifestyle
            </span>
          </div>

          <div className="space-y-3 text-xs italic">
            <p className="text-gray-300 font-bold">Niş Alanı: <span className="text-white font-black">Moda & Lüks Lifestyle</span></p>
            <p className="text-gray-300 font-bold">Global Etkileşim Skoru: <span className="text-emerald-400 font-black">95.8 / 100</span></p>
            <p className="text-gray-300 font-bold">Toplam İzlenme / Erişim: <span className="text-blue-400 font-black">2.4M</span></p>
            <p className="text-gray-300 font-bold">Kitle Sadakati: <span className="text-purple-400 font-black">%92.4</span></p>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-gray-400 font-bold italic space-y-1">
            <p className="text-gray-500">Örnek İçerikler:</p>
            <p className="text-white">• Sektörde En Çok Yapılan 3 Stil Hatası</p>
            <p className="text-white">• 1 Günde Üretici Rutinim & Favori Ürünlerim</p>
          </div>
        </div>

      </div>

      {/* MANUAL EDITING INSTRUCTIONS */}
      <section className="bg-[#0A0A0F] border border-white/10 p-8 rounded-[3.5rem] space-y-4 text-left shadow-xl">
        <div className="flex items-center gap-3">
          <Code2 size={22} className="text-indigo-400" />
          <h3 className="text-lg font-black text-white italic uppercase tracking-wide">
            Manuel Kolay Veri Değiştirme Rehberi
          </h3>
        </div>
        <p className="text-xs text-gray-400 font-bold italic leading-relaxed">
          Tüm metinler, başlıklar, sayılar, stratejiler ve kartlar projedeki <code className="text-indigo-300 font-mono bg-black/60 px-2 py-1 rounded">src/data/user-profiles-data.ts</code> dosyasında merkezi olarak tanımlanmıştır.
        </p>
        <div className="p-4 bg-black/40 border border-white/5 rounded-2xl font-mono text-xs text-blue-300 space-y-1 italic">
          <p className="text-gray-500">// Kolayca değiştirmek için bu dosyayı açın:</p>
          <p className="text-emerald-400">c:\Users\user\Desktop\cos-dashboard\src\data\user-profiles-data.ts</p>
          <p className="text-gray-400 mt-2">// Influmetric veya Demo objesi içindeki metinleri veya sayıları kaydetmeniz yeterlidir.</p>
        </div>
      </section>

    </div>
  )
}
