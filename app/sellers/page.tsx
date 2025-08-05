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
import { Search, Filter, Plus, Phone, Mail, MapPin, Handshake, History, Building2, DollarSign } from "lucide-react"

export default function SellersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const sellers = [
    {
      id: 1,
      name: "Robert Martinez",
      phone: "(555) 234-5678",
      email: "robert.m@email.com",
      location: "Austin, TX",
      property: "456 Oak Street",
      tags: ["Motivated", "Quick Sale"],
      askingPrice: "$320,000",
      lastContact: "1 day ago",
      deals: 1,
      status: "Active",
    },
    {
      id: 2,
      name: "Patricia Wong",
      phone: "(555) 876-5432",
      email: "pwong@email.com",
      location: "Dallas, TX",
      property: "789 Pine Avenue",
      tags: ["Inherited Property", "As-Is"],
      askingPrice: "$275,000",
      lastContact: "3 days ago",
      deals: 0,
      status: "New Lead",
    },
    {
      id: 3,
      name: "James Thompson",
      phone: "(555) 345-6789",
      email: "j.thompson@email.com",
      location: "Houston, TX",
      property: "123 Maple Drive",
      tags: ["Distressed", "Needs Repairs"],
      askingPrice: "$180,000",
      lastContact: "2 hours ago",
      deals: 2,
      status: "Hot Lead",
    },
    {
      id: 4,
      name: "Maria Gonzalez",
      phone: "(555) 567-8901",
      email: "maria.g@email.com",
      location: "San Antonio, TX",
      property: "321 Cedar Lane",
      tags: ["Relocation", "Flexible Terms"],
      askingPrice: "$295,000",
      lastContact: "5 days ago",
      deals: 0,
      status: "Active",
    },
  ]

  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.property.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Hot Lead":
        return "bg-alert text-white"
      case "Active":
        return "bg-success text-white"
      case "New Lead":
        return "bg-cta-blue text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Sellers</h1>
          <Badge variant="outline" className="text-primary-blue border-primary-blue">
            {sellers.length} Total
          </Badge>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cta-blue hover:bg-primary-blue text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Seller
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Seller</DialogTitle>
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
                <Label htmlFor="property">Property Address</Label>
                <Input id="property" placeholder="123 Main Street" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" />
              </div>
              <div>
                <Label htmlFor="askingPrice">Asking Price</Label>
                <Input id="askingPrice" placeholder="$250,000" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">New Lead</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="hot">Hot Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Property details, seller motivation..." />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 bg-cta-blue hover:bg-primary-blue text-white"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Add Seller
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
                placeholder="Search sellers by name, email, property, or location..."
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

      {/* Sellers Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-custom">All Sellers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Asking Price</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSellers.map((seller) => (
                <TableRow key={seller.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-custom">{seller.name}</div>
                      <div className="text-sm text-gray-400">{seller.deals} deals</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {seller.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {seller.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-gray-custom">{seller.property}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {seller.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 font-medium text-success">
                      <DollarSign className="w-4 h-4" />
                      {seller.askingPrice}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {seller.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(seller.status)}>{seller.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-400">{seller.lastContact}</span>
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
