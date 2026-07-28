"use client"

import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Calendar } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/utils/cn"

interface GrowthAnalysisProps {
  data?: {
    title?: string
    chart_data?: Array<{ name: string; value: number }>
  }
}

const defaultData = [
  { name: "01 May", value: 25 },
  { name: "04 May", value: 45 },
  { name: "08 May", value: 38 },
  { name: "12 May", value: 60 },
  { name: "15 May", value: 72 },
  { name: "18 May", value: 55 },
  { name: "22 May", value: 85 },
  { name: "25 May", value: 78 },
  { name: "29 May", value: 95 },
  { name: "31 May", value: 100 },
]

export function GrowthAnalysis({ data }: GrowthAnalysisProps) {
  const title = data?.title ?? "STRATEJİK BÜYÜME ANALİZİ"
  const chartData = data?.chart_data ?? defaultData

  const [filter, setFilter] = useState<"7D" | "30D" | "90D">("30D")
  const [loading, setLoading] = useState(false)

  const handleFilterChange = (range: "7D" | "30D" | "90D") => {
    setLoading(true)
    setFilter(range)
    setTimeout(() => setLoading(false), 400)
  }

  return (
    <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-[2rem] h-full flex flex-col justify-between space-y-6 relative overflow-hidden border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <TrendingUp size={16} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              {title}
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              İçerik İvme Eğrisi
            </p>
          </div>
        </div>

        {/* Date Filter Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10">
          {(["7D", "30D", "90D"] as const).map((range) => (
            <button
              key={range}
              onClick={() => handleFilterChange(range)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase italic transition-all cursor-pointer min-h-[32px]",
                filter === range
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Body */}
      {loading ? (
        <Skeleton className="w-full h-[220px] rounded-2xl" />
      ) : (
        <div className="flex-1 w-full min-h-[200px] min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0A0A0E",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
                labelStyle={{ color: "#9CA3AF", fontSize: "11px", fontWeight: "bold" }}
                itemStyle={{ color: "#3B82F6", fontSize: "12px", fontWeight: "bold" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#growthGradient)"
                dot={{ fill: "#3B82F6", r: 4, strokeWidth: 2, stroke: "#0B0F19" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}