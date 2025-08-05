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
import {
  Search,
  Filter,
  Plus,
  Phone,
  Mail,
  MapPin,
  Handshake,
  History,
  TrendingUp,
  DollarSign,
  Star,
} from "lucide-react"

export default function InvestorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const investors = [
    {
      id: 1,
      name: "Premier Properties LLC",
      contact: "Michael Chen",
      phone: "(555) 987-6543",
      email: "mchen@premierprops.com",
      location: "Austin, TX",
      tags: ["Cash Buyer", "Quick Close", "Commercial"],
      investmentRange: "$500K - $2M",
      lastContact: "1 day ago",
      deals: 8,
      totalInvested: "$3.2M",
      status: "VIP",
      rating: 5,
    },
    {
      id: 2,
      name: "Lone Star Investments",
      contact: "Sarah Rodriguez",
      phone: "(555) 456-7890",
      email: "sarah@lonestarinv.com",
      location: "Dallas, TX",
      tags: ["Residential", "Fix & Flip", "Rental"],
      investmentRange: "$200K - $800K",
      lastContact: "3 days ago",
      deals: 12,
      totalInvested: "$4.8M",
      status: "Active",
      rating: 5,
    },
    {
      id: 3,
      name: "Capital Growth Partners",
      contact: "David Wilson",
      phone: "(555) 321-0987",
      email: "dwilson@capitalgrowth.com",
      location: "Houston, TX",
      tags: ["Large Portfolio", "Wholesale", "Multi-Family"],
      investmentRange: "$1M - $5M",
      lastContact: "2 hours ago",
      deals: 15,
      totalInvested: "$12.5M",
      status: "VIP",
      rating: 5,
    },
    {
      id: 4,
      name: "Texas Real Estate Fund",
      contact: "Jennifer Martinez",
      phone: "(555) 234-5678",
      email: "jmartinez@txrefund.com",
      location: "San Antonio, TX",
      tags: ["New Investor", "Residential", "First Deal"],
      investmentRange: "$150K - $400K",
      lastContact: "1 week ago",
      deals: 1,
      totalInvested: "$285K",
      status: "New",
      rating: 4,
    },
    {
      id: 5,
      name: "Apex Investment Group",
      contact: "Robert Taylor",
      phone: "(555) 789-0123",
      email: "rtaylor@apexinvest.com",
      location: "Fort Worth, TX",
      tags: ["Commercial", "Industrial", "Land"],
      investmentRange: "$2M - $10M",
      lastContact: "4 days ago",
      deals: 6,
      totalInvested: "$18.7M",
      status: "Active",
      rating: 4,
    },
  ]

  const filteredInvestors = investors.filter(
    (investor) =>
      investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "VIP":
        return "bg-yellow-500 text-white"
      case "Active":
        return "bg-success text-white"
      case "New":
        return "bg-cta-blue text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Investors</h1>
          <Badge variant="outline" className="text-primary-blue border-primary-blue">
            {investors.length} Total
          </Badge>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cta-blue hover:bg-primary-blue text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Investor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Investor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company/Individual Name</Label>
                <Input id="companyName" placeholder="ABC Investments LLC" />
              </div>
              <div>
                <Label htmlFor="contactName">Contact Person</Label>
                <Input id="contactName" placeholder="John Smith" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="(555) 123-4567" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@abcinvestments.com" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, State" />
              </div>
              <div>
                <Label htmlFor="investmentRange">Investment Range</Label>
                <Input id="investmentRange" placeholder="$200K - $500K" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Investment preferences, deal criteria..." />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1 bg-cta-blue hover:bg-primary-blue text-white"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Add Investor
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Investor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Total Investors</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{investors.length}</div>
            <div className="text-xs text-gray-400">Active relationships</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">VIP Investors</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">
              {investors.filter((i) => i.status === "VIP").length}
            </div>
            <div className="text-xs text-gray-400">High-value partners</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Total Deals</CardTitle>
            <Handshake className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">
              {investors.reduce((sum, inv) => sum + inv.deals, 0)}
            </div>
            <div className="text-xs text-gray-400">Closed transactions</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">$39.5M</div>
            <div className="text-xs text-gray-400">Portfolio value</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search investors by name, contact, email, or location..."
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

      {/* Investors Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-custom">All Investors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company/Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Investment Range</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvestors.map((investor) => (
                <TableRow key={investor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-custom">{investor.name}</div>
                      <div className="text-sm text-gray-400">{investor.contact}</div>
                      <div className="flex items-center gap-1 mt-1">{renderStars(investor.rating)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {investor.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {investor.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {investor.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-custom">{investor.investmentRange}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium text-gray-custom">{investor.deals} deals</div>
                      <div className="text-sm text-success font-medium">{investor.totalInvested}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {investor.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {investor.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{investor.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(investor.status)}>{investor.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-400">{investor.lastContact}</span>
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
