import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-bold transition-all duration-200 ease-in-out border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#8B5CF6] text-white border-white shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#ffffff] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        destructive:
          "bg-red-500 text-white border-white shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#ffffff] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        outline:
          "bg-transparent text-[#a855f7] border-[#a855f7] shadow-[4px_4px_0px_#a855f7] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#a855f7] hover:bg-primary-500/10 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        secondary:
          "bg-dark-800 text-white border-white/40 shadow-[4px_4px_0px_#ffffff] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#ffffff] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        ghost:
          "border-0 shadow-none hover:bg-dark-800 text-gray-300 hover:text-white hover:translate-x-0 hover:translate-y-0",
        link:
          "border-0 shadow-none text-primary-500 underline-offset-4 hover:underline hover:translate-x-0 hover:translate-y-0",
      },
      size: {
        default: "h-10 px-6 py-3",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
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
