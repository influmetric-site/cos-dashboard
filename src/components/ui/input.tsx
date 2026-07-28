import React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export function Input({
  className = "",
  icon,
  ...props
}: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-white/[0.03] border border-white/5 rounded-[2rem] py-5 text-[11px] font-black text-white outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/20 transition-all italic uppercase tracking-widest placeholder:text-gray-600 ${
          icon ? "pl-14 pr-6" : "px-6"
        } ${className}`}
        {...props}
      />
    </div>
  )
}
