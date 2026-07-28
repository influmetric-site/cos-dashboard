"use client"

import { Users, Globe, PieChart as PieIcon } from "lucide-react"

interface DemographicsWidgetProps {
  data?: {
    ageGroup?: Array<{ label: string; percentage: number }>
    gender?: { female: number; male: number; other: number }
    cities?: Array<{ city: string; percentage: number }>
  }
}

const defaultAge = [
  { label: "18-24 Yaş", percentage: 48 },
  { label: "25-34 Yaş", percentage: 36 },
  { label: "35-44 Yaş", percentage: 12 },
  { label: "45+ Yaş", percentage: 4 },
]

const defaultCities = [
  { city: "İstanbul", percentage: 42 },
  { city: "Ankara", percentage: 18 },
  { city: "İzmir", percentage: 14 },
  { city: "Bursa / Diğer", percentage: 26 },
]

export function DemographicsWidget({ data }: DemographicsWidgetProps) {
  const ageData = data?.ageGroup ?? defaultAge
  const citiesData = data?.cities ?? defaultCities
  const genderData = data?.gender ?? { female: 68, male: 29, other: 3 }

  return (
    <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-6 text-left relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Users size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              KİTLE DEMOGRAFİSİ HARİTASI
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Yaş, Cinsiyet ve Şehir Dağılımı
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[9px] font-black uppercase italic">
          %98 DOĞRULANMIŞ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gender Breakdown */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic flex items-center gap-1.5">
            <PieIcon size={12} className="text-purple-400" />
            Cinsiyet Dağılımı
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold italic">
              <span className="text-pink-400">Kadın: %{genderData.female}</span>
              <span className="text-blue-400">Erkek: %{genderData.male}</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-pink-500"
                style={{ width: `${genderData.female}%` }}
              />
              <div
                className="h-full bg-blue-500"
                style={{ width: `${genderData.male}%` }}
              />
              <div
                className="h-full bg-purple-400"
                style={{ width: `${genderData.other}%` }}
              />
            </div>
          </div>
        </div>

        {/* Age Groups */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">
            Baskın Yaş Grubu
          </p>
          <div className="space-y-1.5">
            {ageData.map((item, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex justify-between text-[10px] font-bold italic">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="text-purple-400">%{item.percentage}</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Cities */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic flex items-center gap-1.5">
            <Globe size={12} className="text-blue-400" />
            Top Şehirler
          </p>
          <div className="space-y-2">
            {citiesData.map((city, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-[10px] font-bold italic border-b border-white/5 pb-1"
              >
                <span className="text-gray-200">{city.city}</span>
                <span className="text-emerald-400">%{city.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
