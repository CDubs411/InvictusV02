"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useThemeConfig } from "@/hooks/use-theme-config"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { config } = useThemeConfig()

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.setProperty("--custom-background", config.background)
      document.body.style.setProperty("--custom-primary", config.primary)
      document.body.style.setProperty("--custom-accent1", config.accent1)
      document.body.style.setProperty("--custom-accent2", config.accent2)
    }
  }, [config])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
