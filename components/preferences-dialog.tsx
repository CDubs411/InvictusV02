"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ColorPicker } from "@/components/ui/color-picker"
import { useTheme } from "next-themes"
import { useThemeConfig } from "@/hooks/use-theme-config"

export function PreferencesDialog() {
  const { theme, setTheme } = useTheme()
  const { config, setConfig } = useThemeConfig()

  const handleColorChange = (color: string, key: "background" | "primary" | "accent1" | "accent2") => {
    setConfig({ ...config, [key]: color })
  }

  React.useEffect(() => {
    if (theme === "custom") {
      document.body.classList.add("custom")
    } else {
      document.body.classList.remove("custom")
    }
  }, [theme])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          Preferences
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preferences</DialogTitle>
          <DialogDescription>
            Customize the look and feel of your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Color Scheme</Label>
            <RadioGroup
              value={theme}
              onValueChange={setTheme}
              className="flex gap-4"
            >
              <Label
                htmlFor="light"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <div className="w-16 h-16 rounded-lg border-2 border-muted bg-white flex items-center justify-center">
                  <span className="text-sm text-black">Light</span>
                </div>
              </Label>
              <Label
                htmlFor="dark"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <div className="w-16 h-16 rounded-lg border-2 border-muted bg-black flex items-center justify-center">
                  <span className="text-sm text-white">Dark</span>
                </div>
              </Label>
              <Label
                htmlFor="custom"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem
                  value="custom"
                  id="custom"
                  className="sr-only"
                />
                <div className="w-16 h-16 rounded-lg border-2 border-muted bg-gray-500 flex items-center justify-center">
                  <span className="text-sm text-white">Custom</span>
                </div>
              </Label>
            </RadioGroup>
          </div>
          {theme === "custom" && (
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label>Background</Label>
                <ColorPicker
                  value={config.background}
                  onChange={(e) => handleColorChange(e.target.value, "background")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Primary</Label>
                <ColorPicker
                  value={config.primary}
                  onChange={(e) => handleColorChange(e.target.value, "primary")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Accent 1</Label>
                <ColorPicker
                  value={config.accent1}
                  onChange={(e) => handleColorChange(e.target.value, "accent1")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Accent 2</Label>
                <ColorPicker
                  value={config.accent2}
                  onChange={(e) => handleColorChange(e.target.value, "accent2")}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
