"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "01 May", value: 25 }, { name: "04 May", value: 45 },
  { name: "08 May", value: 38 }, { name: "12 May", value: 60 },
  { name: "15 May", value: 72 }, { name: "18 May", value: 55 },
  { name: "22 May", value: 85 }, { name: "25 May", value: 78 },
  { name: "29 May", value: 95 }, { name: "31 May", value: 100 },
]

export function GrowthAnalysis() {
  return (
    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-full flex flex-col">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">
        STRATEJİK BÜYÜME ANALİZİ
      </h3>
      <div className="flex-1 w-full min-h-[200px] min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={3}
              fill="url(#growthGradient)"
              dot={{ fill: '#3B82F6', r: 4, strokeWidth: 2, stroke: '#0B0F19' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}