"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { clientQueries } from "@/lib/database/queries"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useDeals } from "@/hooks/use-deals"

const formSchema = z.object({
  deal_id: z.string().min(1, "Deal is required"),
  file: z.any().refine((file) => file?.name, "File is required."),
  signed: z.boolean().default(false),
})

export default function NewContractPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { deals, loading: dealsLoading } = useDeals()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deal_id: "",
      signed: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const supabase = getSupabaseClient()
      const currentUser = await clientQueries.getCurrentUser()
      if (!currentUser) throw new Error("User not found")

      const file = values.file as File
      const filePath = `public/${currentUser.company_id}/${values.deal_id}/${file.name}`

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("contracts").upload(filePath, file)
      if (uploadError) throw uploadError

      // Get public URL
      const { data: urlData } = supabase.storage.from("contracts").getPublicUrl(filePath)
      if (!urlData) throw new Error("Could not get public URL")

      await clientQueries.createContract({
        deal_id: values.deal_id,
        file_url: urlData.publicUrl,
        signed: values.signed,
        company_id: currentUser.company_id,
        created_by: currentUser.id,
      })

      toast({
        title: "Success",
        description: "Contract created successfully.",
      })
      router.push("/contracts")
    } catch (error: any) {
      console.error("Error creating contract:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create contract. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Upload New Contract</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Contract Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="deal_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={dealsLoading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a deal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {deals.map((deal) => (
                          <SelectItem key={deal.id} value={deal.id}>
                            {deal.title || `Deal ${deal.id}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field: { onChange, ...props } }) => (
                  <FormItem>
                    <FormLabel>Contract File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...props}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          onChange(file)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="signed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Signed</FormLabel>
                      <FormDescription>
                        Is this contract already signed?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Uploading..." : "Upload Contract"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
