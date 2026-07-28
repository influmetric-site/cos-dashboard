import React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "emerald" | "amber" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-3 rounded-[2rem] font-black uppercase tracking-widest italic transition-all duration-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.3)]",
    emerald: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]",
    amber: "bg-amber-600 text-white hover:bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
    outline: "bg-white/[0.02] border border-white/10 text-gray-300 hover:text-white hover:bg-white/5",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
  }

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-8 py-4 text-[11px]",
    lg: "px-10 py-5 text-xs"
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
