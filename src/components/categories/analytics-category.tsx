"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Activity, TrendingUp } from "lucide-react"

export interface AnalyticsContent {
  title?: string
  score_title?: string
  score_value?: number
  kpi_metrics?: Array<{ label: string; value: string | number; change?: string }>
  chart_data?: Array<{ name: string; value: number }>
}

const defaultContent: AnalyticsContent = {
  title: "Performans & Analitik Paneli",
  score_title: "Genel Etkileşim Skoru",
  score_value: 95.8,
  kpi_metrics: [
    { label: "Toplam İzlenme", value: "2.4M", change: "+34%" },
    { label: "Kitle Bağlılığı", value: "92.4%", change: "+14%" },
    { label: "Sponsor Dönüşüm", value: "%19.5", change: "+28%" }
  ],
  chart_data: [
    { name: "Pzt", value: 55 }, { name: "Sal", value: 80 },
    { name: "Çar", value: 110 }, { name: "Per", value: 145 },
    { name: "Cum", value: 190 }, { name: "Cmt", value: 240 },
    { name: "Paz", value: 295 }
  ]
}

export function AnalyticsCategory({ content_json }: { content_json?: AnalyticsContent }) {
  const data = { ...defaultContent, ...content_json }

  return (
    <div className="bg-[#0A0A0F] border border-white/10 p-7 rounded-[2.5rem] space-y-6 shadow-xl backdrop-blur-xl h-full flex flex-col justify-between text-left">
      {/* Category Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4 text-left">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Activity size={18} />
          </div>
          <div>
            <h2 className="text-sm font-black text-white italic uppercase tracking-wider">
              {data.title}
            </h2>
            <p className="text-[10px] text-gray-500 italic uppercase">Kategori 1 • Performans Metrikleri</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[9px] text-gray-500 font-bold uppercase block italic">{data.score_title}</span>
          <span className="text-2xl font-black text-emerald-400 italic tracking-tight">{data.score_value}%</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-3 gap-3">
        {data.kpi_metrics?.map((kpi, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/5 p-3 rounded-2xl text-left">
            <p className="text-[9px] text-gray-400 font-medium italic truncate">{kpi.label}</p>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-base font-black text-white italic">{kpi.value}</span>
              {kpi.change && <span className="text-[9px] font-bold text-emerald-400 italic">{kpi.change}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Chart */}
      <div className="pt-2 text-left">
        <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase italic mb-3">
          <span className="flex items-center gap-1"><TrendingUp size={12} className="text-blue-400" /> Günlük İzlenme Trendi</span>
          <span className="text-blue-400">Canlı Veri</span>
        </div>
        <div className="w-full h-40 min-h-[160px] min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={160}>
            <BarChart data={data.chart_data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" stroke="#6B7280" fontSize={9} tickLine={false} axisLine={false} />
              <YAxis hide domain={[0, 'auto']} />
              <Tooltip
                contentStyle={{ backgroundColor: '#090D16', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24}>
                {data.chart_data?.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === (data.chart_data?.length || 0) - 1 ? "#3B82F6" : "rgba(59,130,246,0.4)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
