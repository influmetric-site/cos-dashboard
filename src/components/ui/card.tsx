import React from "react"
import { cn } from "@/utils/cn"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient" | "neon"
  hoverable?: boolean
}

export function Card({
  className = "",
  variant = "glass",
  hoverable = true,
  children,
  ...props
}: CardProps) {
  const baseStyles =
    "rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 transition-all duration-300 overflow-hidden relative"

  const hoverStyles = hoverable
    ? "hover:border-blue-500/30 hover:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.15)] hover:-translate-y-0.5"
    : ""

  const variants = {
    default: "bg-[#0B0F17]",
    glass: "bg-[#0A0A0E]/80 backdrop-blur-2xl shadow-2xl",
    gradient:
      "bg-gradient-to-br from-[#0B0F17] via-blue-950/20 to-[#0B0F17] shadow-2xl",
    neon: "bg-[#0B0F17] border-blue-500/20 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]",
  }

  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-6 sm:p-8 border-b border-white/5 space-y-1.5", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg sm:text-xl font-black text-white italic uppercase tracking-tight leading-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardContent({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 sm:p-8", className)} {...props}>
      {children}
    </div>
  )
}
