import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse duration-[2000ms] rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
