"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { LogOut, Building2, Shield } from "lucide-react"

interface UserNavProps {
  profile?: {
    full_name?: string
    company_name?: string
    email?: string
    role?: string
  } | null
}

function getDisplayName(profile?: UserNavProps["profile"]) {
  if (profile?.full_name && profile.full_name.trim().length > 0) {
    return profile.full_name
  }
  if (profile?.email) {
    const parts = profile.email.split("@")[0].split(/[._-]/)
    const capitalized = parts
      .filter(Boolean)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ")
    return capitalized || "Kullanıcı Hesabı"
  }
  return "Kullanıcı Hesabı"
}

function getCompanyName(profile?: UserNavProps["profile"]) {
  if (profile?.company_name && profile.company_name.trim().length > 0) {
    return profile.company_name
  }
  if (profile?.role === "admin" || profile?.email === "batur.guzey@gmail.com") {
    return "INFLUMETRIC Executive"
  }
  return "INFLUMETRIC Kullanıcı Paneli"
}

export function UserNav({ profile }: UserNavProps) {
  const [loggingOut, setLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const isAdmin = profile?.role === "admin" || profile?.email === "batur.guzey@gmail.com"
  const displayName = getDisplayName(profile)
  const companyName = getCompanyName(profile)

  return (
    <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 sm:pl-4 bg-[#0A0A0E]/80 rounded-full border border-white/10 backdrop-blur-xl shadow-lg">
      {/* User Profile Details */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-md border border-white/20">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="text-left hidden sm:block">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-black text-white italic uppercase tracking-wider leading-none">
              {displayName}
            </p>
            {isAdmin && (
              <span className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[8px] font-black uppercase italic border border-purple-500/30">
                Admin
              </span>
            )}
          </div>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest italic flex items-center gap-1 mt-0.5">
            <Building2 size={10} className="text-blue-400" />
            {companyName}
          </p>
        </div>
      </div>

      {/* Admin Panel Quick Access */}
      {isAdmin && (
        <button
          onClick={() => router.push("/admin")}
          title="Admin Yönetim Paneli"
          className="flex items-center justify-center gap-1 min-h-[36px] px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[10px] font-black uppercase tracking-wider italic transition-all cursor-pointer active:scale-95"
        >
          <Shield size={12} />
          <span className="hidden md:inline">Admin</span>
        </button>
      )}

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        title="Oturumu Kapat"
        className="flex items-center justify-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-wider italic transition-all cursor-pointer disabled:opacity-50 active:scale-95"
      >
        <LogOut size={12} />
        <span className="hidden md:inline">{loggingOut ? "Çıkılıyor..." : "Çıkış"}</span>
      </button>
    </div>
  )
}
