"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, Save } from "lucide-react"
import { clientQueries } from "@/lib/database/queries"
import { useToast } from "@/hooks/use-toast"
import type { Company, QuoteSettings } from "@/types/database"

const defaultQuoteSettings: QuoteSettings = {
  labor_rate: 75,
  material_markup: 15,
  default_profit_margin: 20,
  overhead_percentage: 10,
  tax_rate: 8.25,
}

export default function QuoteSettingsPage() {
  const [company, setCompany] = useState<Company | null>(null)
  const [quoteVariables, setQuoteVariables] = useState<QuoteSettings>(defaultQuoteSettings)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchCompany() {
      try {
        const user = await clientQueries.getCurrentUser()
        if (user && user.company) {
          setCompany(user.company)
          if (user.company.quote_settings) {
            setQuoteVariables(user.company.quote_settings)
          }
        }
      } catch (error) {
        console.error("Failed to fetch company settings:", error)
        toast({
          title: "Error",
          description: "Failed to load company settings.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchCompany()
  }, [toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setQuoteVariables((prev) => ({ ...prev, [id]: Number(value) }))
  }

  const handleSave = async () => {
    if (!company) return

    try {
      await clientQueries.updateCompanyQuoteSettings(company.id, quoteVariables)
      toast({
        title: "Success",
        description: "Quote variables have been saved.",
      })
    } catch (error) {
      console.error("Failed to save quote variables:", error)
      toast({
        title: "Error",
        description: "Failed to save quote variables.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calculator className="h-8 w-8 text-primary-blue" />
        <h1 className="text-3xl font-bold text-gray-custom">Quote Variables</h1>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-custom">Default Quote Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="labor_rate">Labor Rate ($/hour)</Label>
              <Input
                id="labor_rate"
                type="number"
                value={quoteVariables.labor_rate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="material_markup">Material Markup (%)</Label>
              <Input
                id="material_markup"
                type="number"
                value={quoteVariables.material_markup}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="default_profit_margin">Default Profit Margin (%)</Label>
              <Input
                id="default_profit_margin"
                type="number"
                value={quoteVariables.default_profit_margin}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="overhead_percentage">Overhead Percentage (%)</Label>
              <Input
                id="overhead_percentage"
                type="number"
                value={quoteVariables.overhead_percentage}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tax_rate">Tax Rate (%)</Label>
              <Input
                id="tax_rate"
                type="number"
                step="0.01"
                value={quoteVariables.tax_rate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button className="bg-cta-blue hover:bg-primary-blue text-white" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Variables
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
