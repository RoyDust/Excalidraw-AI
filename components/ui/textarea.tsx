import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[88px] w-full rounded-lg border border-[rgba(0,0,0,0.1)] bg-[#FAFAFA] px-3 py-2.5 text-[17px] leading-[1.47] text-[#1D1D1F] shadow-sm placeholder:text-[rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:border-[#007AFF] focus-visible:ring-3 focus-visible:ring-[rgba(0,122,255,0.15)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
