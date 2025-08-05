"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Phone, Play, Clock, PhoneCall, PhoneMissed, PhoneIncoming, PhoneOutgoing } from "lucide-react"

export default function CallsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const calls = [
    {
      id: 1,
      contact: "Sarah Johnson",
      contactType: "Buyer",
      phone: "(555) 123-4567",
      duration: "4:32",
      type: "outgoing",
      status: "completed",
      date: "2024-01-15",
      time: "2:30 PM",
      hasRecording: true,
      notes: "Discussed property requirements",
    },
    {
      id: 2,
      contact: "Mike Chen",
      contactType: "Investor",
      phone: "(555) 987-6543",
      duration: "0:00",
      type: "incoming",
      status: "missed",
      date: "2024-01-15",
      time: "1:45 PM",
      hasRecording: false,
      notes: "",
    },
    {
      id: 3,
      contact: "Lisa Rodriguez",
      contactType: "Buyer",
      phone: "(555) 456-7890",
      duration: "8:15",
      type: "outgoing",
      status: "completed",
      date: "2024-01-15",
      time: "11:20 AM",
      hasRecording: true,
      notes: "Follow-up on contract terms",
    },
    {
      id: 4,
      contact: "David Wilson",
      contactType: "Investor",
      phone: "(555) 321-0987",
      duration: "2:18",
      type: "incoming",
      status: "completed",
      date: "2024-01-14",
      time: "4:15 PM",
      hasRecording: true,
      notes: "Quick check-in call",
    },
    {
      id: 5,
      contact: "Jennifer Lee",
      contactType: "Seller",
      phone: "(555) 654-3210",
      duration: "6:42",
      type: "outgoing",
      status: "completed",
      date: "2024-01-14",
      time: "10:30 AM",
      hasRecording: true,
      notes: "Property valuation discussion",
    },
    {
      id: 6,
      contact: "Robert Taylor",
      contactType: "Buyer",
      phone: "(555) 789-0123",
      duration: "0:00",
      type: "outgoing",
      status: "missed",
      date: "2024-01-14",
      time: "9:15 AM",
      hasRecording: false,
      notes: "",
    },
  ]

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phone.includes(searchTerm) ||
      call.contactType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || call.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getCallIcon = (type: string, status: string) => {
    if (status === "missed") {
      return <PhoneMissed className="w-4 h-4 text-alert" />
    }
    if (type === "incoming") {
      return <PhoneIncoming className="w-4 h-4 text-success" />
    }
    return <PhoneOutgoing className="w-4 h-4 text-primary-blue" />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-white"
      case "missed":
        return "bg-alert text-white"
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

  const totalCalls = calls.length
  const completedCalls = calls.filter((c) => c.status === "completed").length
  const missedCalls = calls.filter((c) => c.status === "missed").length
  const totalDuration = calls
    .filter((c) => c.status === "completed")
    .reduce((acc, call) => {
      const [minutes, seconds] = call.duration.split(":").map(Number)
      return acc + minutes + seconds / 60
    }, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PhoneCall className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Call Log</h1>
          <Badge variant="outline" className="text-primary-blue border-primary-blue">
            {totalCalls} Total
          </Badge>
        </div>

        <Button className="bg-cta-blue hover:bg-primary-blue text-white">
          <Phone className="w-4 h-4 mr-2" />
          Make Call
        </Button>
      </div>

      {/* Call Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Total Calls</CardTitle>
            <PhoneCall className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{totalCalls}</div>
            <div className="text-xs text-gray-400">All time</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Completed</CardTitle>
            <PhoneIncoming className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{completedCalls}</div>
            <div className="text-xs text-gray-400">{Math.round((completedCalls / totalCalls) * 100)}% success rate</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Missed</CardTitle>
            <PhoneMissed className="h-4 w-4 text-alert" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{missedCalls}</div>
            <div className="text-xs text-gray-400">Need follow-up</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Talk Time</CardTitle>
            <Clock className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{Math.round(totalDuration)}m</div>
            <div className="text-xs text-gray-400">Avg: {Math.round(totalDuration / completedCalls)}m per call</div>
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
                placeholder="Search calls by contact, phone, or type..."
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
                <SelectItem value="all">All Calls</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-primary-blue text-primary-blue bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calls Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-custom">Call History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Recording</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-custom flex items-center gap-2">
                        {getCallIcon(call.type, call.status)}
                        {call.contact}
                      </div>
                      <Badge className={`${getContactTypeColor(call.contactType)} text-xs mt-1`}>
                        {call.contactType}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-custom">{call.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-gray-custom">{call.type}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="font-medium text-gray-custom">
                        {call.duration === "0:00" ? "—" : call.duration}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(call.status)}>{call.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm text-gray-custom">{call.date}</div>
                      <div className="text-xs text-gray-400">{call.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {call.hasRecording ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary-blue text-primary-blue bg-transparent"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Play
                      </Button>
                    ) : (
                      <span className="text-xs text-gray-400">No recording</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary-blue text-primary-blue bg-transparent"
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call Back
                      </Button>
                      {call.notes && (
                        <Button size="sm" variant="outline" className="border-gray-300 text-gray-600 bg-transparent">
                          Notes
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
