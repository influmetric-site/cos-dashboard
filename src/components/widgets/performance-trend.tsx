"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

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

  return (
    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">{title}</h3>
        <select className="bg-background border border-white/10 text-[10px] text-gray-400 rounded px-2 py-1 outline-none">
          <option>Günlük</option>
        </select>
      </div>
      <div className="flex-1 w-full min-h-[250px] min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#4B5563" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#4B5563" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)' }} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
            <Line 
              type="monotone" 
              dataKey="real" 
              name="Gerçekleşen Performans" 
              stroke="#3B82F6" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#3B82F6' }} 
              style={{ filter: "drop-shadow(0 0 10px #3B82F6)" }}
            />
            <Line type="monotone" dataKey="predict" name="Tahmin Edilen Performans" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}