"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  Plus,
  FileText,
  Download,
  Eye,
  Edit,
  DollarSign,
  Calculator,
  Send,
  User,
  Calendar,
} from "lucide-react"

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)

  // Sample quote data based on database schema
  const quotes = [
    {
      id: "550e8400-e29b-41d4-a716-446655440040",
      deal_id: "550e8400-e29b-41d4-a716-446655440060",
      value: 285000.0,
      variables_json: {
        labor_rate: 75,
        material_markup: 0.15,
        profit_margin: 0.2,
        base_cost: 200000,
        labor_hours: 400,
      },
      created_by: "550e8400-e29b-41d4-a716-446655440001",
      created_at: "2024-01-15T10:30:00Z",
      // Joined data
      contact_name: "Sarah Johnson",
      contact_type: "buyer",
      property_address: "123 Oak Street, Austin, TX",
      created_by_name: "Brendan Martinez",
      status: "sent",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440041",
      deal_id: "550e8400-e29b-41d4-a716-446655440061",
      value: 450000.0,
      variables_json: {
        labor_rate: 75,
        material_markup: 0.15,
        profit_margin: 0.25,
        base_cost: 320000,
        labor_hours: 600,
      },
      created_by: "550e8400-e29b-41d4-a716-446655440002",
      created_at: "2024-01-14T14:20:00Z",
      contact_name: "Premier Properties LLC",
      contact_type: "investor",
      property_address: "789 Pine Avenue, Dallas, TX",
      created_by_name: "Sarah Johnson",
      status: "accepted",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440042",
      deal_id: "550e8400-e29b-41d4-a716-446655440062",
      value: 320000.0,
      variables_json: {
        labor_rate: 75,
        material_markup: 0.15,
        profit_margin: 0.18,
        base_cost: 240000,
        labor_hours: 480,
      },
      created_by: "550e8400-e29b-41d4-a716-446655440001",
      created_at: "2024-01-13T09:15:00Z",
      contact_name: "Lisa Rodriguez",
      contact_type: "buyer",
      property_address: "123 Maple Drive, Houston, TX",
      created_by_name: "Brendan Martinez",
      status: "draft",
    },
  ]

  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.property_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.value.toString().includes(searchTerm),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-200 text-gray-700"
      case "sent":
        return "bg-cta-blue text-white"
      case "accepted":
        return "bg-success text-white"
      case "rejected":
        return "bg-alert text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case "buyer":
        return "bg-blue-100 text-blue-800"
      case "investor":
        return "bg-purple-100 text-purple-800"
      case "seller":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const totalQuoteValue = quotes.reduce((sum, quote) => sum + quote.value, 0)
  const acceptedQuotes = quotes.filter((q) => q.status === "accepted").length
  const acceptanceRate = Math.round((acceptedQuotes / quotes.length) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Quotes</h1>
          <Badge variant="outline" className="text-primary-blue border-primary-blue">
            {quotes.length} Total
          </Badge>
        </div>

        <Dialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen}>
          <DialogTrigger asChild>
            <Button className="bg-cta-blue hover:bg-primary-blue text-white">
              <Plus className="w-4 h-4 mr-2" />
              Build Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary-blue" />
                Quote Builder
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Contact Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactType">Contact Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact">Contact</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Chen</SelectItem>
                      <SelectItem value="lisa">Lisa Rodriguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Property Details */}
              <div>
                <Label htmlFor="property">Property Address</Label>
                <Input id="property" placeholder="123 Main Street, City, State" />
              </div>

              {/* Cost Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="baseCost">Base Cost</Label>
                  <Input id="baseCost" type="number" placeholder="200000" />
                </div>
                <div>
                  <Label htmlFor="laborHours">Labor Hours</Label>
                  <Input id="laborHours" type="number" placeholder="400" />
                </div>
              </div>

              {/* Variables */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="laborRate">Labor Rate ($/hr)</Label>
                  <Input id="laborRate" type="number" placeholder="75" defaultValue="75" />
                </div>
                <div>
                  <Label htmlFor="materialMarkup">Material Markup (%)</Label>
                  <Input id="materialMarkup" type="number" placeholder="15" defaultValue="15" />
                </div>
                <div>
                  <Label htmlFor="profitMargin">Profit Margin (%)</Label>
                  <Input id="profitMargin" type="number" placeholder="20" defaultValue="20" />
                </div>
              </div>

              {/* Quote Summary */}
              <Card className="bg-accent-blue border-primary-blue">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base Cost:</span>
                      <span className="font-medium">$200,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor (400 hrs × $75):</span>
                      <span className="font-medium">$30,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Material Markup (15%):</span>
                      <span className="font-medium">$30,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit Margin (20%):</span>
                      <span className="font-medium">$52,000</span>
                    </div>
                    <hr className="border-primary-blue" />
                    <div className="flex justify-between text-lg font-bold text-primary-blue">
                      <span>Total Quote:</span>
                      <span>$312,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Special terms, conditions, or notes..." />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300">Save Draft</Button>
                <Button className="flex-1 bg-cta-blue hover:bg-primary-blue text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Generate & Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quote Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Total Quotes</CardTitle>
            <FileText className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{quotes.length}</div>
            <div className="text-xs text-gray-400">All time</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{formatCurrency(totalQuoteValue)}</div>
            <div className="text-xs text-gray-400">Combined quote value</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Accepted</CardTitle>
            <Badge className="bg-success text-white text-xs">{acceptedQuotes}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{acceptanceRate}%</div>
            <div className="text-xs text-gray-400">Acceptance rate</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Avg. Value</CardTitle>
            <Calculator className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{formatCurrency(totalQuoteValue / quotes.length)}</div>
            <div className="text-xs text-gray-400">Per quote</div>
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
                placeholder="Search quotes by contact, property, or value..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-primary-blue"
              />
            </div>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-primary-blue text-primary-blue bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quotes Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-custom">All Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Quote Value</TableHead>
                <TableHead>Variables</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-custom flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        {quote.contact_name}
                      </div>
                      <Badge className={`${getContactTypeColor(quote.contact_type)} text-xs mt-1`}>
                        {quote.contact_type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-custom">{quote.property_address}</span>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-success text-lg">{formatCurrency(quote.value)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs space-y-1">
                      <div>Labor: ${quote.variables_json.labor_rate}/hr</div>
                      <div>Markup: {quote.variables_json.material_markup * 100}%</div>
                      <div>Margin: {quote.variables_json.profit_margin * 100}%</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-custom">{quote.created_by_name}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(quote.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary-blue text-primary-blue bg-transparent"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 bg-transparent">
                        <Download className="w-3 h-3 mr-1" />
                        PDF
                      </Button>
                      {quote.status === "draft" && (
                        <Button size="sm" variant="outline" className="border-success text-success bg-transparent">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                      )}
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
