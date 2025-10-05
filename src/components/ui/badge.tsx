import * as React from "react"

import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "subtle" | "outline"
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide",
        variant === "default" && "border-transparent bg-secondary text-secondary-foreground",
        variant === "subtle" && "border-transparent bg-primary/10 text-primary",
        variant === "outline" && "border-border text-foreground",
        className,
      )}
      {...props}
    />
  ),
)

Badge.displayName = "Badge"
