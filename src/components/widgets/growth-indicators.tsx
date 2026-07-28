"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const data = [
  { name: "Erişim", value: 75, label: "+278%" },
  { name: "Etkileşim", value: 55, label: "+156%" },
  { name: "Dönüşüm", value: 65, label: "+189%" },
  { name: "Sadakat", value: 45, label: "+134%" },
  { name: "Gelir", value: 85, label: "+219%" },
]

export function GrowthIndicators() {
  return (
    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-full flex flex-col">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">BÜYÜME GÖSTERGELERİ</h3>
      <div className="flex-1 w-full min-h-[250px] min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#9CA3AF" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.02)'}} 
              contentStyle={{ 
                backgroundColor: '#111827', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#E5E7EB' }}
              labelStyle={{ color: '#6366F1', fontWeight: 'bold', marginBottom: '4px' }}
              formatter={(value) => [value, "Değer"]}
            />
            <Bar 
              dataKey="value" 
              name="Değer"
              radius={[4, 4, 0, 0]} 
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="url(#barGradient)" />
              ))}
            </Bar>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}