import { cn } from "@/utils/cn"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white/[0.05] skeleton-shimmer border border-white/5",
        className
      )}
      {...props}
    />
  )
}
