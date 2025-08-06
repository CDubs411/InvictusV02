"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ColorPickerProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="color"
      className={cn(
        "w-10 h-10 p-1 border rounded-md cursor-pointer",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

ColorPicker.displayName = "ColorPicker"

export { ColorPicker }
