import { Radio } from "lucide-react"
import { cn } from "@/utils/cn"

interface LiveIndicatorProps {
  label?: string
  pulseColor?: "emerald" | "blue" | "amber"
  className?: string
  showText?: boolean
}

export function LiveIndicator({
  label = "CANLI VERİ AKIŞI",
  pulseColor = "emerald",
  className,
  showText = true,
}: LiveIndicatorProps) {
  const colorMap = {
    emerald: {
      bg: "bg-emerald-500",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      glow: "bg-emerald-500/20",
    },
    blue: {
      bg: "bg-blue-500",
      border: "border-blue-500/30",
      text: "text-blue-400",
      glow: "bg-blue-500/20",
    },
    amber: {
      bg: "bg-amber-500",
      border: "border-amber-500/30",
      text: "text-amber-400",
      glow: "bg-amber-500/20",
    },
  }

  const activeColor = colorMap[pulseColor]

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border backdrop-blur-md transition-all duration-300",
        activeColor.border,
        className
      )}
      aria-label={label}
    >
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping",
            activeColor.bg
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            activeColor.bg
          )}
        />
      </span>
      {showText && (
        <span
          className={cn(
            "text-[10px] font-black tracking-widest uppercase italic flex items-center gap-1",
            activeColor.text
          )}
        >
          <Radio size={12} className="animate-pulse shrink-0" />
          <span>{label}</span>
        </span>
      )}
    </div>
  )
}
