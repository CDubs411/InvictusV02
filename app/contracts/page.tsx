"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  DollarSign,
} from "lucide-react"

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample contract data based on database schema
  const contracts = [
    {
      id: "550e8400-e29b-41d4-a716-446655440050",
      deal_id: "550e8400-e29b-41d4-a716-446655440062",
      file_url: "/contracts/contract_001.pdf",
      signed: false,
      created_by: "550e8400-e29b-41d4-a716-446655440001",
      created_at: "2024-01-15T10:30:00Z",
      // Joined data from deals and contacts
      contact_name: "Lisa Rodriguez",
      contact_type: "buyer",
      property_address: "123 Maple Drive, Houston, TX",
      deal_value: 320000,
      created_by_name: "Brendan Martinez",
      status: "pending",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440051",
      deal_id: "550e8400-e29b-41d4-a716-446655440061",
      file_url: "/contracts/contract_002.pdf",
      signed: true,
      created_by: "550e8400-e29b-41d4-a716-446655440002",
      created_at: "2024-01-12T14:20:00Z",
      contact_name: "Premier Properties LLC",
      contact_type: "investor",
      property_address: "789 Pine Avenue, Dallas, TX",
      deal_value: 450000,
      created_by_name: "Sarah Johnson",
      status: "signed",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440052",
      deal_id: "550e8400-e29b-41d4-a716-446655440063",
      file_url: "/contracts/contract_003.pdf",
      signed: false,
      created_by: "550e8400-e29b-41d4-a716-446655440001",
      created_at: "2024-01-10T09:15:00Z",
      contact_name: "Robert Martinez",
      contact_type: "seller",
      property_address: "456 Oak Street, Austin, TX",
      deal_value: 285000,
      created_by_name: "Brendan Martinez",
      status: "rejected",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440053",
      deal_id: "550e8400-e29b-41d4-a716-446655440064",
      file_url: "/contracts/contract_004.pdf",
      signed: true,
      created_by: "550e8400-e29b-41d4-a716-446655440003",
      created_at: "2024-01-08T16:45:00Z",
      contact_name: "Capital Growth Partners",
      contact_type: "investor",
      property_address: "321 Cedar Lane, San Antonio, TX",
      deal_value: 520000,
      created_by_name: "Mike Chen",
      status: "signed",
    },
  ]

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
      contract.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.property_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.deal_value.toString().includes(searchTerm)

    const matchesStatus = statusFilter === "all" || contract.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800"
      case "signed":
        return "bg-success text-white"
      case "rejected":
        return "bg-alert text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "signed":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
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

  const totalContracts = contracts.length
  const signedContracts = contracts.filter((c) => c.signed).length
  const pendingContracts = contracts.filter((c) => c.status === "pending").length
  const signedRate = Math.round((signedContracts / totalContracts) * 100)
  const totalValue = contracts.filter((c) => c.signed).reduce((sum, contract) => sum + contract.deal_value, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Contracts</h1>
          <Badge variant="outline" className="text-primary-blue border-primary-blue">
            {totalContracts} Total
          </Badge>
        </div>

        <Button className="bg-cta-blue hover:bg-primary-blue text-white">
          <FileText className="w-4 h-4 mr-2" />
          Generate Contract
        </Button>
      </div>

      {/* Contract Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{totalContracts}</div>
            <div className="text-xs text-gray-400">All time</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Signed</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{signedContracts}</div>
            <div className="text-xs text-gray-400">{signedRate}% success rate</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{pendingContracts}</div>
            <div className="text-xs text-gray-400">Awaiting signature</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Signed Value</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{formatCurrency(totalValue)}</div>
            <div className="text-xs text-gray-400">Total contract value</div>
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
                placeholder="Search contracts by contact, property, or value..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-primary-blue"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="signed">Signed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-primary-blue text-primary-blue bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contracts Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-custom">All Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Deal Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-custom flex items-center gap-2">
                        <User className="w-3 h-3 text-gray-400" />
                        {contract.contact_name}
                      </div>
                      <Badge className={`${getContactTypeColor(contract.contact_type)} text-xs mt-1`}>
                        {contract.contact_type}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-custom">{contract.property_address}</span>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-success text-lg">{formatCurrency(contract.deal_value)}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(contract.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(contract.status)}
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-custom">{contract.created_by_name}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(contract.created_at).toLocaleDateString()}
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
                        Download
                      </Button>
                      {contract.status === "pending" && (
                        <Button size="sm" className="bg-success hover:bg-green-600 text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Mark Signed
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
