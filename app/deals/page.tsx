"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  FileText,
  Target,
  Handshake,
  DollarSign,
  MapPin,
  User,
  Calendar,
} from "lucide-react"

export default function DealsPage() {
  const [viewMode, setViewMode] = useState<"kanban" | "table">("kanban")
  const [searchTerm, setSearchTerm] = useState("")

  const deals = [
    {
      id: 1,
      property: "123 Oak Street",
      contact: "Sarah Johnson",
      contactType: "Buyer",
      value: "$285,000",
      status: "New",
      created: "2024-01-15",
      lastUpdate: "2 hours ago",
      notes: "Interested in quick closing",
    },
    {
      id: 2,
      property: "456 Pine Avenue",
      contact: "Mike Chen",
      contactType: "Investor",
      value: "$450,000",
      status: "Quoted",
      created: "2024-01-12",
      lastUpdate: "1 day ago",
      notes: "Cash buyer, flexible timeline",
    },
    {
      id: 3,
      property: "789 Maple Drive",
      contact: "Lisa Rodriguez",
      contactType: "Buyer",
      value: "$320,000",
      status: "Contract Sent",
      created: "2024-01-10",
      lastUpdate: "3 hours ago",
      notes: "First-time buyer, needs guidance",
    },
    {
      id: 4,
      property: "321 Elm Street",
      contact: "David Wilson",
      contactType: "Investor",
      value: "$275,000",
      status: "Closed",
      created: "2024-01-08",
      lastUpdate: "1 week ago",
      notes: "Repeat client, smooth transaction",
    },
    {
      id: 5,
      property: "654 Cedar Lane",
      contact: "Jennifer Lee",
      contactType: "Buyer",
      value: "$395,000",
      status: "New",
      created: "2024-01-14",
      lastUpdate: "4 hours ago",
      notes: "Looking for family home",
    },
    {
      id: 6,
      property: "987 Birch Road",
      contact: "Robert Taylor",
      contactType: "Investor",
      value: "$520,000",
      status: "Quoted",
      created: "2024-01-11",
      lastUpdate: "2 days ago",
      notes: "Commercial property interest",
    },
  ]

  const statusColumns = [
    { title: "New", status: "New", color: "bg-gray-100", count: deals.filter((d) => d.status === "New").length },
    {
      title: "Quoted",
      status: "Quoted",
      color: "bg-accent-blue",
      count: deals.filter((d) => d.status === "Quoted").length,
    },
    {
      title: "Contract Sent",
      status: "Contract Sent",
      color: "bg-yellow-100",
      count: deals.filter((d) => d.status === "Contract Sent").length,
    },
    {
      title: "Closed",
      status: "Closed",
      color: "bg-green-100",
      count: deals.filter((d) => d.status === "Closed").length,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-gray-200 text-gray-700"
      case "Quoted":
        return "bg-accent-blue text-primary-blue"
      case "Contract Sent":
        return "bg-yellow-200 text-yellow-800"
      case "Closed":
        return "bg-success text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case "Buyer":
        return "bg-blue-100 text-blue-800"
      case "Investor":
        return "bg-purple-100 text-purple-800"
      case "Seller":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Handshake className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Deals</h1>
          <Badge variant="outline" className="text-primary-blue border-primary-blue">
            {deals.length} Total
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "kanban" ? "default" : "outline"}
            onClick={() => setViewMode("kanban")}
            className={viewMode === "kanban" ? "bg-primary-blue text-white" : "border-primary-blue text-primary-blue"}
          >
            Kanban
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-primary-blue text-white" : "border-primary-blue text-primary-blue"}
          >
            Table
          </Button>
          <Button className="bg-cta-blue hover:bg-primary-blue text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search deals by property, contact, or value..."
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="contract">Contract Sent</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-primary-blue text-primary-blue bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statusColumns.map((column) => (
            <div key={column.status} className="space-y-4">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-custom">
                    <span>{column.title}</span>
                    <Badge variant="outline" className="text-xs">
                      {column.count}
                    </Badge>
                  </CardTitle>
                </CardHeader>
              </Card>

              <div className="space-y-3">
                {deals
                  .filter((deal) => deal.status === column.status)
                  .map((deal) => (
                    <Card
                      key={deal.id}
                      className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-gray-custom flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                {deal.property}
                              </div>
                              <div className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                                <User className="w-3 h-3" />
                                {deal.contact}
                              </div>
                            </div>
                            <Badge className={getContactTypeColor(deal.contactType)}>{deal.contactType}</Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-lg font-bold text-success flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              {deal.value}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {deal.lastUpdate}
                            </div>
                          </div>

                          {deal.notes && (
                            <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">{deal.notes}</div>
                          )}

                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-primary-blue text-primary-blue bg-transparent"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-gray-300 text-gray-600 bg-transparent"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>

                          {deal.status === "New" && (
                            <Button size="sm" className="w-full bg-cta-blue hover:bg-primary-blue text-white">
                              <FileText className="w-3 h-3 mr-1" />
                              Generate Quote
                            </Button>
                          )}

                          {deal.status === "Quoted" && (
                            <Button size="sm" className="w-full bg-success hover:bg-green-600 text-white">
                              <Target className="w-3 h-3 mr-1" />
                              Send Contract
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-custom">All Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-3 font-medium text-gray-custom">Property</th>
                    <th className="text-left p-3 font-medium text-gray-custom">Contact</th>
                    <th className="text-left p-3 font-medium text-gray-custom">Value</th>
                    <th className="text-left p-3 font-medium text-gray-custom">Status</th>
                    <th className="text-left p-3 font-medium text-gray-custom">Created</th>
                    <th className="text-left p-3 font-medium text-gray-custom">Last Update</th>
                    <th className="text-left p-3 font-medium text-gray-custom">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deals.map((deal) => (
                    <tr key={deal.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-gray-custom">{deal.property}</div>
                        {deal.notes && <div className="text-xs text-gray-400 mt-1">{deal.notes}</div>}
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-gray-custom">{deal.contact}</div>
                        <Badge className={`${getContactTypeColor(deal.contactType)} text-xs mt-1`}>
                          {deal.contactType}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-success">{deal.value}</span>
                      </td>
                      <td className="p-3">
                        <Badge className={getStatusColor(deal.status)}>{deal.status}</Badge>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-gray-400">{deal.created}</span>
                      </td>
                      <td className="p-3">
                        <span className="text-sm text-gray-400">{deal.lastUpdate}</span>
                      </td>
                      <td className="p-3">
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
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
