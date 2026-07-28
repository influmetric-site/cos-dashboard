import React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/utils/cn"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "emerald" | "amber" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 rounded-[2rem] font-black uppercase tracking-widest italic transition-all duration-300 min-h-[44px] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060607] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none"

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.35)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] border border-blue-400/30",
    emerald:
      "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] border border-emerald-400/30",
    amber:
      "bg-amber-600 text-white hover:bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] border border-amber-400/30",
    secondary:
      "bg-white/10 text-white hover:bg-white/20 border border-white/15 backdrop-blur-md",
    outline:
      "bg-white/[0.02] border border-white/15 text-gray-300 hover:text-white hover:bg-white/10 hover:border-blue-500/40",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/10",
  }

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3.5 text-[11px]",
    lg: "px-8 py-4 text-xs",
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={14} className="animate-spin text-current shrink-0" />
          <span>YÜKLENİYOR...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
