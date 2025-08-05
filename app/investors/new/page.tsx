"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserCheck } from "lucide-react"

export default function AddInvestorPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data, error } = await supabase
        .from("investors")
        .insert([{ name, phone, email, address, notes, company_id: user.user_metadata.company_id, created_by: user.id }])

      if (!error) {
        router.push("/investors")
      } else {
        console.error("Error inserting investor:", error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserCheck className="h-8 w-8 text-primary-blue" />
        <h1 className="text-3xl font-bold text-gray-custom">Add New Investor</h1>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-custom">Investor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Investor Name" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="investor@email.com" />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, City, State" />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." />
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-cta-blue hover:bg-primary-blue text-white">
                Add Investor
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
