import React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient"
}

export function Card({
  className = "",
  variant = "glass",
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-[2.5rem] border border-white/5 transition-all duration-500 overflow-hidden"
  
  const variants = {
    default: "bg-[#0B0F17] hover:border-white/10",
    glass: "bg-[#0B0F17]/80 backdrop-blur-xl hover:border-white/10 shadow-2xl",
    gradient: "bg-gradient-to-br from-[#0B0F17] via-blue-950/10 to-[#0B0F17] hover:border-blue-500/30 shadow-2xl"
  }

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-8 border-b border-white/5 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className = "", children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-xl font-black text-white italic uppercase tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-8 ${className}`} {...props}>
      {children}
    </div>
  )
}
