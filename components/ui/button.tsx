import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[17px] font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[rgba(0,122,255,0.15)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#007AFF] text-white rounded-lg shadow-sm hover:bg-[#0051D5] hover:-translate-y-[1px] active:translate-y-0",
        destructive:
          "bg-[#FF3B30] text-white rounded-lg shadow-sm hover:bg-[#D32F2F] hover:-translate-y-[1px] active:translate-y-0",
        outline:
          "border border-[#007AFF] bg-white text-[#007AFF] rounded-lg shadow-sm hover:bg-[#E3F2FD] hover:border-[#0051D5] hover:-translate-y-[1px] active:translate-y-0",
        secondary:
          "bg-[#F5F5F7] text-[#1D1D1F] rounded-lg shadow-sm hover:bg-[#E8E8ED] hover:-translate-y-[1px] active:translate-y-0",
        ghost: "bg-transparent text-[#1D1D1F] rounded-lg hover:bg-[rgba(0,0,0,0.04)]",
        link: "text-[#007AFF] underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-[44px] px-6 py-2",
        sm: "min-h-[36px] px-4 py-1.5 text-[15px]",
        lg: "min-h-[52px] px-8 py-3 text-[19px]",
        icon: "min-h-[44px] w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
