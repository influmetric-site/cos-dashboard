"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface IntelligenceCoreProps {
  data?: {
    title?: string
    score?: number
    sync_rate?: string
    processing_capacity?: string
  }
}

export function IntelligenceCore({ data }: IntelligenceCoreProps) {
  const score = data?.score ?? 96.7
  const chartData = [{ value: score }, { value: Math.max(0, 100 - score) }]
  const title = data?.title ?? "COS® ZEKÂ ÇEKİRDEĞİ"
  const syncRate = data?.sync_rate ?? `${score}%`
  const capacity = data?.processing_capacity ?? "2.4 PFLOPS"

  return (
    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-full flex flex-col">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
        {title}
      </h3>
      <div className="flex items-center justify-between flex-1">
        <div className="relative w-32 h-32 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={128}>
            <PieChart>
              <Pie data={chartData} innerRadius={45} outerRadius={55} dataKey="value" stroke="none">
                <Cell fill="#3B82F6" />
                <Cell fill="rgba(255,255,255,0.05)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-white italic">
            {score}%
          </div>
        </div>
        <div className="space-y-2 text-[10px] text-gray-400 font-medium italic">
          <p>Veri Senkronizasyonu: <span className="text-white font-bold">{syncRate}</span></p>
          <p>İşleme Kapasitesi: <span className="text-white font-bold">{capacity}</span></p>
        </div>
      </div>
    </div>
  )
}