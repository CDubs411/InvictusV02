"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Phone, Mail, MapPin, Handshake, History, UserCheck } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"

export default function BuyersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [buyers, setBuyers] = useState<any[]>([])
  const [filteredBuyers, setFilteredBuyers] = useState<any[]>([])

  // Form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [location, setLocation] = useState("")
  const [budget, setBudget] = useState("")
  const [status, setStatus] = useState("")
  const [notes, setNotes] = useState("")

  const supabase = getSupabaseClient()
  const { appUser } = useAuth()
  const { toast } = useToast()

  const fetchBuyers = async () => {
    if (!appUser) return;
    const { data, error } = await supabase
      .from("buyers")
      .select("*")
      .eq("company_id", appUser.company_id);

    if (error) {
      console.error("Error fetching buyers:", error)
      toast({
        title: "Error",
        description: "Failed to fetch buyers.",
        variant: "destructive",
      })
    } else {
      setBuyers(data || [])
    }
  }

  useEffect(() => {
    fetchBuyers()
  }, [appUser])

  useEffect(() => {
    const filtered = buyers.filter(
      (buyer) =>
        buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (buyer.email && buyer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (buyer.address && buyer.address.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredBuyers(filtered)
  }, [searchTerm, buyers])

  const handleAddBuyer = async () => {
    if (!appUser) {
        toast({
            title: "Authentication Error",
            description: "You must be logged in to add a buyer.",
            variant: "destructive",
        });
        return;
    }

    const name = `${firstName} ${lastName}`.trim()
    if (!name) {
        toast({
            title: "Validation Error",
            description: "Please enter a name.",
            variant: "destructive",
        });
        return;
    }

    const combinedNotes = `Budget: ${budget}\nStatus: ${status}\n\n${notes}`;

    const { error } = await supabase.from("buyers").insert([
      {
        name,
        phone,
        email,
        address: location,
        notes: combinedNotes,
        company_id: appUser.company_id,
        created_by: appUser.id,
      },
    ]);

    if (error) {
      console.error("Error adding buyer:", error)
      toast({
        title: "Error",
        description: "Failed to add buyer.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Buyer added successfully.",
      })
      setIsAddDialogOpen(false)
      fetchBuyers() // Refetch buyers to update the list
      // Reset form fields
      setFirstName("")
      setLastName("")
      setPhone("")
      setEmail("")
      setLocation("")
      setBudget("")
      setStatus("")
      setNotes("")
    }
  }

  const getStatusColor = (status: string) => {
    // This is based on hardcoded data, which is no longer used.
    // I will keep the function but it will not be used until the status is fetched from the database.
    switch (status) {
      case "Hot Lead":
        return "bg-alert text-white"
      case "Active":
        return "bg-success text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserCheck className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Buyers</h1>
          <Badge variant="outline" className="text-primary-blue border-primary-blue">
            {buyers.length} Total
          </Badge>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cta-blue hover:bg-primary-blue text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Buyer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Buyer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Input id="budget" placeholder="$200K - $300K" value={budget} onChange={(e) => setBudget(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={setStatus} value={status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="hot">Hot Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes..." value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 bg-cta-blue hover:bg-primary-blue text-white"
                  onClick={handleAddBuyer}
                >
                  Add Buyer
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search buyers by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-primary-blue"
              />
            </div>
            <Button variant="outline" className="border-primary-blue text-primary-blue bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Buyers Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-custom">All Buyers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuyers.map((buyer) => (
                <TableRow key={buyer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-custom">{buyer.name}</div>
                      {/* The deals count is not available in the buyers table, so I'm removing it for now */}
                      {/* <div className="text-sm text-gray-400">{buyer.deals} deals</div> */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {buyer.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {buyer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {buyer.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* Budget, tags, status, last contact are not in the db. I'll remove them from the table for now. */}
                    <span className="font-medium text-gray-custom"></span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                    </div>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-400"></span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary-blue text-primary-blue bg-transparent"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="border-success text-success bg-transparent">
                        <Handshake className="w-3 h-3 mr-1" />
                        Deal
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 bg-transparent">
                        <History className="w-3 h-3 mr-1" />
                        History
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
