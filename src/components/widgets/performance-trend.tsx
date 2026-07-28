"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Activity, Sparkles } from "lucide-react"

interface PerformanceTrendProps {
  data?: {
    title?: string
    chart_data?: Array<{ name: string; real: number; predict: number }>
  }
}

const defaultData = [
  { name: "01 May", real: 20, predict: 15 },
  { name: "08 May", real: 45, predict: 38 },
  { name: "15 May", real: 35, predict: 42 },
  { name: "22 May", real: 65, predict: 55 },
  { name: "29 May", real: 85, predict: 60 },
]

export function PerformanceTrend({ data }: PerformanceTrendProps) {
  const title = data?.title ?? "PERFORMANS TRENDİ"
  const chartData = data?.chart_data ?? defaultData
  const [period, setPeriod] = useState("Günlük")

  return (
    <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-[2rem] h-full flex flex-col justify-between space-y-6 relative overflow-hidden border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <Activity size={16} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              {title}
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic flex items-center gap-1">
              <Sparkles size={10} className="text-purple-400" />
              Yapay Zekâ Tahmin Modeli
            </p>
          </div>
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-black/40 border border-white/15 text-[10px] font-bold text-gray-300 rounded-xl px-3 py-1.5 outline-none cursor-pointer hover:border-purple-500/40 transition-all min-h-[32px]"
        >
          <option value="Günlük">Günlük Akış</option>
          <option value="Haftalık">Haftalık Trend</option>
          <option value="Aylık">Aylık Konsolide</option>
        </select>
      </div>

      {/* Line Chart */}
      <div className="flex-1 w-full min-h-[250px] min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0A0A0E",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "#9CA3AF", fontSize: "11px", fontWeight: "bold" }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: "11px", paddingTop: "16px", color: "#E5E7EB" }} />
            <Line
              type="monotone"
              dataKey="real"
              name="Gerçekleşen Performans"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4, fill: "#3B82F6" }}
              style={{ filter: "drop-shadow(0 0 12px rgba(59,130,246,0.6))" }}
            />
            <Line
              type="monotone"
              dataKey="predict"
              name="AI Tahmin Projeksiyonu"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              strokeDasharray="6 6"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}