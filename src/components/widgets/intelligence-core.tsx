"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const data = [{ value: 96.7 }, { value: 3.3 }]

export function IntelligenceCore() {
  return (
    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-full flex flex-col">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
        COS® ZEKÂ ÇEKİRDEĞİ
      </h3>
      <div className="flex items-center justify-between flex-1">
        <div className="relative w-32 h-32 min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={128}>
            <PieChart>
              <Pie data={data} innerRadius={45} outerRadius={55} dataKey="value" stroke="none">
                <Cell fill="#3B82F6" />
                <Cell fill="rgba(255,255,255,0.05)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-white">
            96.7%
          </div>
        </div>
        <div className="space-y-2 text-[10px] text-gray-400">
          <p>Veri Senkronizasyonu: <span className="text-white">96.7%</span></p>
          <p>İşleme Kapasitesi: <span className="text-white">2.4 PFLOPS</span></p>
        </div>
      </div>
    </div>
  )
}