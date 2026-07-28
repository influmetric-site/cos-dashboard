import { createClient, isSupabaseConfigured } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { ShieldCheck, Cpu, Users, Database, Sparkles } from "lucide-react"

import { AnalyticsCategory } from "@/components/categories/analytics-category"
import { GrowthStrategyCategory } from "@/components/categories/growth-strategy-category"
import { ContentIdeasCategory } from "@/components/categories/content-ideas-category"
import { CustomNotesCategory } from "@/components/categories/custom-notes-category"
import { UserNav } from "@/components/layout/user-nav"
import { getUserCategoriesData } from "@/utils/supabase/get-user-categories"

import { DemographicsWidget } from "@/components/widgets/demographics-widget"
import { BurnoutIndex } from "@/components/widgets/burnout-index"
import { DailyActionHub } from "@/components/widgets/daily-action-hub"

export const dynamic = "force-dynamic"

export default async function CosDashboardPage() {
  const configured = isSupabaseConfigured()
  if (!configured) {
    redirect("/login")
  }

  const { user, categoryMap, presetProfile } = await getUserCategoriesData()

  const scannedProfiles =
    categoryMap["analytics"]?.scanned_profiles ||
    presetProfile.categories.analytics.scanned_profiles
  const processedDataPoints =
    categoryMap["analytics"]?.processed_data_points ||
    presetProfile.categories.analytics.processed_data_points

  const userProfile = {
    email: user.email,
    role: presetProfile.role,
    full_name: `${presetProfile.username} (${presetProfile.niche_name})`,
    company_name: presetProfile.niche_name,
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-8 sm:space-y-10 pb-32 text-left max-w-7xl mx-auto">
      {/* TOP DASHBOARD HEADER & NAV */}
      <header className="relative p-6 sm:p-10 md:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#0A0A0E]/80 border border-white/10 overflow-hidden text-left backdrop-blur-2xl shadow-2xl space-y-8">
        {/* Ambient Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Top Navbar Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black italic tracking-tighter text-white uppercase">
              INFLUMETRIC <span className="text-blue-500">COS®</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase italic flex items-center gap-1">
              <Sparkles size={10} /> {presetProfile.niche_name}
            </span>
          </div>

          <UserNav profile={userProfile} />
        </div>

        {/* Dynamic Title and Status Header */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-4 text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Cpu size={12} className="text-blue-400 fill-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 italic">
                {presetProfile.username} • {presetProfile.niche_name} Paneli
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
              {presetProfile.username}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Dashboard
              </span>
            </h1>
            <p className="text-gray-400 text-xs font-bold italic leading-relaxed uppercase tracking-wider">
              {presetProfile.niche_name} alanında gelişmiş analitik modelleri, algoritmik büyüme tavsiyeleri ve kişiselleştirilmiş veri akışı.
            </p>
          </div>

          {/* Professional Algorithmic Metric Pills */}
          <div className="flex flex-wrap gap-4 p-4 bg-white/[0.03] rounded-[2rem] border border-white/10 backdrop-blur-md shrink-0">
            <div className="text-right px-4 py-2 flex flex-col justify-center">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic flex items-center gap-1 justify-end">
                <Users size={10} className="text-blue-400" />
                Taranan Influencer Sayısı
              </p>
              <p className="text-xs font-black text-emerald-400 italic uppercase mt-0.5">
                {scannedProfiles}
              </p>
            </div>
            <div className="w-px h-10 bg-white/10 self-center hidden sm:block" />
            <div className="text-right px-4 py-2 flex flex-col justify-center">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic flex items-center gap-1 justify-end">
                <Database size={10} className="text-indigo-400" />
                İşlenen Veri Noktası Sayısı
              </p>
              <p className="text-xs font-black text-white italic uppercase mt-0.5">
                {processedDataPoints}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 4 FIXED CATEGORIES GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="transition-all duration-300">
          <AnalyticsCategory content_json={categoryMap["analytics"]} />
        </div>
        <div className="transition-all duration-300">
          <GrowthStrategyCategory content_json={categoryMap["growth_strategy"]} />
        </div>
        <div className="transition-all duration-300">
          <ContentIdeasCategory content_json={categoryMap["content_ideas"]} />
        </div>
        <div className="transition-all duration-300">
          <CustomNotesCategory content_json={categoryMap["custom_notes"]} />
        </div>
      </section>

      {/* NEW SYSTEM MODULES: DEMOGRAPHICS, BURNOUT & ACTION HUB */}
      <section className="space-y-6">
        <DemographicsWidget />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BurnoutIndex />
          <DailyActionHub />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex flex-wrap justify-between items-center px-8 py-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] opacity-70 hover:opacity-100 transition-opacity gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck size={16} className="text-blue-500" />
          <p className="text-[10px] font-black text-gray-400 uppercase italic tracking-[0.15em]">
            Verileriniz gelişmiş uçtan uca RLS güvenlik katmanı ve dinamik veri protokolleri ile gerçek zamanlı korunmaktadır.
          </p>
        </div>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-tighter italic text-right">
          Powered by INFLUMETRIC COS® • Creator Optimization System
        </p>
      </footer>
    </div>
  )
}
