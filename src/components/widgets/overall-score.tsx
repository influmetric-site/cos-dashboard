"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [{ value: 93.1 }, { value: 6.9 }]

export function OverallScore() {
  return (
    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-full flex flex-col justify-between group">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">GENEL DEĞERLENDİRME</h3>
      
      <div className="flex flex-col items-center justify-center flex-1 py-4">
        <div className="relative w-44 h-44 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={176}>
            <PieChart>
              <Pie data={data} innerRadius={65} outerRadius={80} startAngle={90} endAngle={450} dataKey="value" stroke="none">
                <Cell fill="#3B82F6" className="drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
                <Cell fill="rgba(255,255,255,0.05)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white tracking-tighter">93.1<span className="text-lg ml-0.5">%</span></span>
            <span className="text-[9px] text-gray-500 uppercase font-medium tracking-widest mt-1">Genel Başarı Skoru</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/5">
        <span className="text-emerald-500 text-sm">↗</span>
        <span className="text-emerald-500 text-xs font-bold">%18.7</span>
        <span className="text-gray-500 text-[10px]">vs. önceki dönem</span>
      </div>
    </div>
  )
}