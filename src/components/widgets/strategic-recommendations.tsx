"use client"

const recommendations = [
  { id: 1, strategy: "İçerik Zamanlama Optimizasyonu", impact: 92.4, result: "Erişimde %32 artış", status: "Uygulandı", statusColor: "text-emerald-400" },
  { id: 2, strategy: "Hedef Kitle Segmentasyonu", impact: 89.7, result: "Etkileşimde %28 artış", status: "Devam Ediyor", statusColor: "text-blue-400" },
  { id: 3, strategy: "Platform Dağılım Optimizasyonu", impact: 87.1, result: "Dönüşümde %24 artış", status: "Planlandı", statusColor: "text-amber-400" },
  { id: 4, strategy: "İçerik Format Çeşitlendirme", impact: 84.3, result: "Sadakatta %18 artış", status: "Planlandı", statusColor: "text-amber-400" },
  { id: 5, strategy: "Performans Tabanlı Bütçe Optimizasyonu", impact: 91.2, result: "ROAS'da %31 artış", status: "Devam Ediyor", statusColor: "text-blue-400" },
]

export function StrategicRecommendations() {
  return (
    <div className="bg-surface border border-white/5 p-8 rounded-[2.5rem] h-full flex flex-col transition-all duration-500 hover:border-white/10">
      <h3 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase mb-8 italic">STRATEJİK BÜYÜME ANALİZİ</h3>
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-[9px] text-gray-500 uppercase tracking-[0.2em] italic">
              <th className="pb-4 pl-4 font-black">Öncelik</th>
              <th className="pb-4 font-black">Strateji</th>
              <th className="pb-4 font-black">Etki Skoru</th>
              <th className="pb-4 font-black text-center">Tahmini Sonuç</th>
              <th className="pb-4 pr-4 font-black text-right">Durum</th>
            </tr>
          </thead>
          <tbody className="text-[11px]">
            {recommendations.map((item) => (
              <tr key={item.id} className="group hover:bg-white/[0.03] transition-all duration-300">
                <td className="py-5 pl-4 rounded-l-2xl text-gray-500 font-bold border-y border-l border-white/5 group-hover:border-white/10">
                  #{item.id}
                </td>
                <td className="py-5 font-bold text-gray-100 italic border-y border-white/5 group-hover:border-white/10">
                  {item.strategy}
                </td>
                <td className="py-5 border-y border-white/5 group-hover:border-white/10">
                  <div className="flex items-center gap-4">
                    <span className="w-10 text-blue-400 font-black italic">{item.impact}</span>
                    <div className="h-1.5 w-28 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                        style={{ width: `${item.impact}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="py-5 text-gray-300 font-medium italic text-center border-y border-white/5 group-hover:border-white/10">
                  {item.result}
                </td>
                <td className={`py-5 pr-4 rounded-r-2xl text-right font-black italic uppercase tracking-tighter border-y border-right border-white/5 group-hover:border-white/10 ${item.statusColor}`}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}