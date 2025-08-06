"use client"

import * as React from "react"

export type ThemeConfig = {
  background: string
  primary: string
  accent1: string
  accent2: string
}

export const useThemeConfig = () => {
  const [config, setConfig] = React.useState<ThemeConfig>({
    background: "#ffffff",
    primary: "#000000",
    accent1: "#3b82f6",
    accent2: "#60a5fa",
  })

  React.useEffect(() => {
    const storedConfig = localStorage.getItem("theme-config")
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig))
    }
  }, [])

  const updateConfig = (newConfig: Partial<ThemeConfig>) => {
    const updatedConfig = { ...config, ...newConfig }
    setConfig(updatedConfig)
    localStorage.setItem("theme-config", JSON.stringify(updatedConfig))
  }

  return { config, setConfig: updateConfig }
}
