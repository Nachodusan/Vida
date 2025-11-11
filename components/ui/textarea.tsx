"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        data-slot="textarea"
        className={cn(
          // Estilos base coherentes con Input y Tailwind v4
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "dark:bg-input/30 border border-input w-full min-h-24 rounded-md bg-transparent px-3 py-2 text-base shadow-xs transition-all",
          "outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]/50 focus-visible:border-ring",
          "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "aria-invalid:ring-destructive/30 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "resize-y",
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
export default Textarea
