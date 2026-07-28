"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

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
    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-full flex flex-col justify-between group">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">{title}</h3>
      
      <div className="flex flex-col items-center justify-center flex-1 py-4">
        <div className="relative w-44 h-44 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={176}>
            <PieChart>
              <Pie data={chartData} innerRadius={65} outerRadius={80} startAngle={90} endAngle={450} dataKey="value" stroke="none">
                <Cell fill="#3B82F6" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                <Cell fill="rgba(255,255,255,0.05)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white tracking-tighter italic">
              {score}<span className="text-lg ml-0.5">%</span>
            </span>
            <span className="text-[9px] text-gray-500 uppercase font-medium tracking-widest mt-1 italic">{label}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/5">
        <span className={isUp ? "text-emerald-500 text-sm font-black" : "text-rose-500 text-sm font-black"}>
          {isUp ? "↗" : "↘"}
        </span>
        <span className={isUp ? "text-emerald-500 text-xs font-bold italic" : "text-rose-500 text-xs font-bold italic"}>
          {changeRate}
        </span>
        <span className="text-gray-500 text-[10px] italic">vs. önceki dönem</span>
      </div>
    </div>
  )
}