"use client"

const metrics = [
  { label: "İçerik Etkileşimi", val: 82 },
  { label: "Kitle Uyumu", val: 76 },
  { label: "Trend Sinyalleri", val: 91 },
  { label: "Zamanlama Optimizasyonu", val: 88 },
  { label: "Platform Performansı", val: 79 },
  { label: "Dönüşüm Potansiyeli", val: 85 },
]

export function MetricFusion() {
  return (
    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-full flex flex-col group">
      <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">
        DERİN METRİK FÜZYONU
      </h3>

      <div className="flex items-start gap-6">
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-white tracking-tighter">48</span>
          <span className="text-[10px] text-gray-500 mt-1 leading-tight uppercase font-medium">Boyutlu<br/>Analiz</span>
        </div>

        <div className="flex-1 space-y-3">
          {metrics.map((m, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[9px] uppercase tracking-wider">
                <span className="text-gray-500">{m.label}</span>
                <span className="text-gray-300 font-bold">{m.val}%</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-blue shadow-[0_0_8px_rgba(59,130,246,0.4)] transition-all duration-1000" 
                  style={{ width: `${m.val}%` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}