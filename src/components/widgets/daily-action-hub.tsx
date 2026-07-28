"use client"

import { useState } from "react"
import { CheckSquare, Square, Zap, ChevronRight } from "lucide-react"
import { cn } from "@/utils/cn"

interface ActionItem {
  id: string
  title: string
  tag: string
  priority: "YÜKSEK" | "ORTA" | "NORMAL"
  completed: boolean
}

const defaultTasks: ActionItem[] = [
  {
    id: "1",
    title: "18:00'de Reels Yayınla (Trend Kanca: Soft Transition)",
    tag: "İÇERİK",
    priority: "YÜKSEK",
    completed: false,
  },
  {
    id: "2",
    title: "Sephora İş Birliği Teklifini İncele ve Onayla",
    tag: "MARKA",
    priority: "YÜKSEK",
    completed: false,
  },
  {
    id: "3",
    title: "YouTube Shorts Açıklamalarına Ürün Linki Ekle",
    tag: "OPTİMİZASYON",
    priority: "ORTA",
    completed: true,
  },
]

export function DailyActionHub() {
  const [tasks, setTasks] = useState<ActionItem[]>(defaultTasks)

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  return (
    <div className="glass-card glass-card-hover p-6 sm:p-8 rounded-[2rem] border border-white/10 space-y-4 text-left relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Zap size={16} />
          </div>
          <div>
            <h3 className="text-xs font-black tracking-widest text-gray-300 uppercase italic">
              GÜNÜN 3 KRİTİK GÖREVİ
            </h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider italic">
              Daily Action Hub
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase italic">
          {tasks.filter((t) => t.completed).length} / {tasks.length} TAMAMLANDI
        </span>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={cn(
              "w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer text-left min-h-[48px]",
              task.completed
                ? "bg-white/[0.02] border-white/5 opacity-60 line-through text-gray-500"
                : "bg-white/[0.04] border-white/10 hover:border-amber-500/40 text-white"
            )}
          >
            <div className="flex items-center gap-3">
              {task.completed ? (
                <CheckSquare size={18} className="text-emerald-400 shrink-0" />
              ) : (
                <Square size={18} className="text-amber-400 shrink-0" />
              )}
              <span className="text-xs font-bold italic uppercase tracking-tight">
                {task.title}
              </span>
            </div>

            <span className="px-2 py-0.5 rounded-md bg-white/10 text-[9px] font-mono text-gray-300 shrink-0">
              {task.tag}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
