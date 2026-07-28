"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, Award } from "lucide-react"
import { cn } from "@/utils/cn"

interface OverallScoreProps {
  data?: {
    title?: string
    score?: number
    label?: string
    change_rate?: string
    change_trend?: "up" | "down"
  }
}

export function OverallScore({ data }: OverallScoreProps) {
  const title = data?.title ?? "GENEL DEĞERLENDİRME"
  const score = data?.score ?? 93.1
  const label = data?.label ?? "Genel Başarı Skoru"
  const changeRate = data?.change_rate ?? "%18.7"
  const isUp = (data?.change_trend ?? "up") === "up"

  const chartData = [{ value: score }, { value: Math.max(0, 100 - score) }]

  return (
    <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-[2rem] h-full flex flex-col justify-between group relative overflow-hidden border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Award size={16} className="text-purple-400" />
          </div>
          <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
            {title}
          </h3>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase italic tracking-wider">
          MÜKEMMEL
        </span>
      </div>

      {/* Ring Chart */}
      <div className="flex flex-col items-center justify-center flex-1 py-4">
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={160}>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={62}
                outerRadius={78}
                startAngle={90}
                endAngle={450}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="#3B82F6" className="drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]" />
                <Cell fill="rgba(255,255,255,0.06)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter italic">
              {score}
              <span className="text-lg ml-0.5 text-blue-400">%</span>
            </span>
            <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mt-1 italic text-center px-2">
              {label}
            </span>
          </div>
        </div>
      </div>

      {/* Period Comparison */}
      <div className="flex items-center justify-center gap-2 pt-3 border-t border-white/10 bg-white/[0.02] -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-4">
        {isUp ? (
          <TrendingUp size={14} className="text-emerald-400 shrink-0" />
        ) : (
          <TrendingDown size={14} className="text-rose-400 shrink-0" />
        )}
        <span
          className={cn(
            "text-xs font-black italic tracking-wide",
            isUp ? "text-emerald-400" : "text-rose-400"
          )}
        >
          {changeRate}
        </span>
        <span className="text-gray-500 text-[10px] italic font-medium">
          vs. önceki döneme kıyasla artış
        </span>
      </div>
    </div>
  )
}