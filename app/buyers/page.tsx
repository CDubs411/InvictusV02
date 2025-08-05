"use client"

import { useState } from "react"
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

export default function BuyersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const buyers = [
    {
      id: 1,
      name: "Sarah Johnson",
      phone: "(555) 123-4567",
      email: "sarah.j@email.com",
      location: "Austin, TX",
      tags: ["First-Time", "Pre-Approved"],
      budget: "$250K - $350K",
      lastContact: "2 days ago",
      deals: 0,
      status: "Active",
    },
    {
      id: 2,
      name: "Mike Chen",
      phone: "(555) 987-6543",
      email: "mchen@email.com",
      location: "Dallas, TX",
      tags: ["Investor", "Cash Buyer"],
      budget: "$400K - $600K",
      lastContact: "1 week ago",
      deals: 2,
      status: "Active",
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      phone: "(555) 456-7890",
      email: "lisa.r@email.com",
      location: "Houston, TX",
      tags: ["Relocating", "Urgent"],
      budget: "$300K - $450K",
      lastContact: "3 days ago",
      deals: 1,
      status: "Hot Lead",
    },
    {
      id: 4,
      name: "David Wilson",
      phone: "(555) 321-0987",
      email: "d.wilson@email.com",
      location: "San Antonio, TX",
      tags: ["Repeat Client"],
      budget: "$200K - $300K",
      lastContact: "1 day ago",
      deals: 3,
      status: "Active",
    },
  ]

  const filteredBuyers = buyers.filter(
    (buyer) =>
      buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      buyer.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
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
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@email.com" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" />
              </div>
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Input id="budget" placeholder="$200K - $300K" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select>
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
                <Textarea id="notes" placeholder="Additional notes..." />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 bg-cta-blue hover:bg-primary-blue text-white"
                  onClick={() => setIsAddDialogOpen(false)}
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
                      <div className="text-sm text-gray-400">{buyer.deals} deals</div>
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
                      {buyer.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-custom">{buyer.budget}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {buyer.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(buyer.status)}>{buyer.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-400">{buyer.lastContact}</span>
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
