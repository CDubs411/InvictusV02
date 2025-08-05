"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calculator, FileText, Send } from "lucide-react"
import { useMemo } from "react"

const quoteFormSchema = z.object({
  deal_id: z.string().uuid("Please select a valid deal."),
  base_cost: z.coerce.number().min(0, "Base cost must be a positive number."),
  labor_hours: z.coerce.number().min(0, "Labor hours must be a positive number."),
  labor_rate: z.coerce.number().min(0, "Labor rate must be a positive number.").default(75),
  material_markup: z.coerce.number().min(0, "Material markup must be a positive number.").max(1, "Markup should be a decimal (e.g., 0.15 for 15%)").default(0.15),
  profit_margin: z.coerce.number().min(0, "Profit margin must be a positive number.").max(1, "Margin should be a decimal (e.g., 0.20 for 20%)").default(0.20),
})

type QuoteFormValues = z.infer<typeof quoteFormSchema>

// Mock data for deals, assuming this would come from an API
const deals = [
  { id: "550e8400-e29b-41d4-a716-446655440060", name: "Deal with Sarah Johnson (123 Oak Street)" },
  { id: "550e8400-e29b-41d4-a716-446655440061", name: "Deal with Premier Properties LLC (789 Pine Avenue)" },
  { id: "550e8400-e29b-41d4-a716-446655440062", name: "Deal with Lisa Rodriguez (123 Maple Drive)" },
]

export default function QuoteBuilderPage() {
  const router = useRouter()
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      labor_rate: 75,
      material_markup: 0.15,
      profit_margin: 0.20,
      base_cost: 0,
      labor_hours: 0,
    },
  })

  const watch = form.watch()

  const calculatedValue = useMemo(() => {
    const { base_cost = 0, labor_hours = 0, labor_rate = 0, material_markup = 0, profit_margin = 0 } = watch
    const total_labor_cost = labor_hours * labor_rate
    const cost_before_markup = base_cost + total_labor_cost
    const material_cost = cost_before_markup * material_markup
    const subtotal = cost_before_markup + material_cost
    const profit = subtotal * profit_margin
    const total_value = subtotal + profit
    return total_value
  }, [watch])

  function onSubmit(data: QuoteFormValues) {
    const quoteData = {
      deal_id: data.deal_id,
      value: calculatedValue,
      variables_json: {
        base_cost: data.base_cost,
        labor_hours: data.labor_hours,
        labor_rate: data.labor_rate,
        material_markup: data.material_markup,
        profit_margin: data.profit_margin,
      },
      // In a real app, this would be set on the server
      created_by: "550e8400-e29b-41d4-a716-446655440001",
      created_at: new Date().toISOString(),
      status: "draft",
    }
    console.log("Saving Quote:", quoteData)
    // Here you would typically make an API call to save the data
    // For now, we just log it and redirect.
    router.push("/quotes")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-10">
      <div className="flex items-center gap-3">
        <FileText className="h-8 w-8 text-primary-blue" />
        <h1 className="text-3xl font-bold text-gray-custom">Build a New Quote</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Deal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="deal_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Associated Deal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a deal to associate with this quote" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deals.map(deal => (
                          <SelectItem key={deal.id} value={deal.id}>{deal.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The quote will be linked to this deal.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost & Variables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="base_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Cost ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 200000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="labor_hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Labor Hours</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 400" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <FormField
                  control={form.control}
                  name="labor_rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Labor Rate ($/hr)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="material_markup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Markup</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 0.15 for 15%" {...field} />
                      </FormControl>
                       <FormDescription>
                        Enter as a decimal (e.g., 0.15 for 15%).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="profit_margin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profit Margin</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 0.20 for 20%" {...field} />
                      </FormControl>
                       <FormDescription>
                        Enter as a decimal (e.g., 0.20 for 20%).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-accent-blue border-primary-blue">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary-blue" />
                Calculated Quote Value
              </CardTitle>
              <div className="text-2xl font-bold text-primary-blue">
                {formatCurrency(calculatedValue)}
              </div>
            </CardHeader>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push('/quotes')}>
              Cancel
            </Button>
            <Button type="submit" className="bg-cta-blue hover:bg-primary-blue text-white">
              <Send className="w-4 h-4 mr-2" />
              Save Quote
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
