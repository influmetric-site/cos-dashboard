"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient, isSupabaseConfigured } from "@/utils/supabase/client"
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, Cpu, WifiOff } from "lucide-react"

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("") 
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const configured = isSupabaseConfigured()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!configured) {
      setError("Supabase bağlantı bilgileri girilmemiş. Lütfen .env.local dosyasındaki NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY değerlerini güncelleyin.")
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()
      let targetEmail = identifier.trim()

      // If user typed a Username instead of email (doesn't contain '@')
      if (!targetEmail.includes("@")) {
        const cleanUsername = targetEmail.toLowerCase()

        // Known static fallbacks
        if (cleanUsername === "influmetric") {
          targetEmail = "batur.guzey@gmail.com"
        } else if (cleanUsername === "demo" || cleanUsername === "guest") {
          targetEmail = "batur.steam@gmail.com"
        } else {
          // Query profiles table by username or full_name
          const { data: matchedProfile } = await supabase
            .from("profiles")
            .select("email")
            .ilike("username", cleanUsername)
            .maybeSingle()

          if (matchedProfile?.email) {
            targetEmail = matchedProfile.email
          }
        }
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: targetEmail,
        password: password,
      })

      if (authError) {
        const rawMsg = typeof authError.message === "string" ? authError.message : ""

        if (rawMsg.includes("Failed to fetch") || rawMsg.includes("fetch failed")) {
          setError("Veritabanına bağlanılamadı (Failed to fetch). Lütfen Supabase URL ve internet bağlantınızı kontrol edin.")
        } else if (
          rawMsg.includes("Invalid login credentials") || 
          rawMsg.includes("invalid_credentials") ||
          !rawMsg ||
          rawMsg === "{}"
        ) {
          setError("Giriş Başarısız: Kullanıcı adı bulunamadı veya şifre hatalı. Lütfen bilgilerinizi kontrol edin.")
        } else {
          setError(rawMsg)
        }
      } else {
        router.push("/cos")
        router.refresh()
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes("Failed to fetch") || msg.includes("fetch failed")) {
        setError("Veritabanı sunucusuna erişilemedi (Failed to fetch). Lütfen .env.local dosyanızdaki Supabase URL adresini doğrulayın.")
      } else {
        setError(`Giriş hatası: ${msg}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#060608] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
            <Cpu size={14} className="text-blue-400 fill-blue-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 italic">
              Kullanıcı Giriş Portalı
            </span>
          </div>
          
          <h1 className="text-4xl font-black italic tracking-tighter uppercase">
            INFLUMETRIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-indigo-600">COS®</span>
          </h1>
          <p className="text-gray-400 text-xs font-medium italic uppercase tracking-wider">
            Creator Operasyon Sistemi
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#0A0A0E]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
          <div className="border-b border-white/5 pb-3">
            <h2 className="text-3xl font-black text-white italic uppercase tracking-wider text-center">
              GİRİŞ
            </h2>
          </div>

          {!configured && (
            <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-300 text-xs font-medium">
              <WifiOff size={18} className="shrink-0 text-amber-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold uppercase tracking-wider text-[10px] italic">Supabase Bağlantı Yapılandırılmadı</p>
                <p className="text-[11px] leading-relaxed text-amber-200/80">
                  Gerçek veritabanı girişi için lütfen <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">.env.local</code> dosyasına Supabase URL ve Key bilgilerinizi ekleyin.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-semibold animate-in fade-in leading-relaxed">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic block">
                KULLANICI ADI
              </label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Guest"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-medium text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic block">
                ŞİFRE
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-xs font-medium text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-widest italic flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Giriş Yap</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Revised Professional System Notice */}
          <div className="pt-4 border-t border-white/5 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-[10px] uppercase font-black tracking-widest italic">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>Kullanıcı Giriş Portalı</span>
            </div>
            <p className="text-[10px] text-gray-500 italic leading-relaxed">
              Platformumuz kapalı sistem mimarisiyle korunmaktadır. Erişim yalnızca önceden yetkilendirilmiş hesaplarla sağlanmakta olup, dışarıdan kayıt kabul edilmemektedir.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest italic mt-8">
          © INFLUMETRIC COS® Intelligence System • Güvenli Giriş
        </p>
      </div>
    </main>
  )
}
