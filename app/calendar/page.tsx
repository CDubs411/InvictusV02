"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus, Clock, User, MapPin, Phone, FileText, ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "agenda">("agenda")
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  // Sample calendar events based on database schema
  const events = [
    {
      id: "550e8400-e29b-41d4-a716-446655440090",
      title: "Property Walkthrough",
      start_time: "2024-01-16T14:00:00Z",
      end_time: "2024-01-16T15:00:00Z",
      company_id: "550e8400-e29b-41d4-a716-446655440000",
      user_id: "550e8400-e29b-41d4-a716-446655440001",
      type: "meeting",
      created_at: "2024-01-15T10:00:00Z",
      // Additional display data
      user_name: "Brendan Martinez",
      contact_name: "Sarah Johnson",
      location: "123 Oak Street, Austin, TX",
      description: "Initial property walkthrough with potential buyer",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440091",
      title: "Contract Review",
      start_time: "2024-01-16T16:30:00Z",
      end_time: "2024-01-16T17:00:00Z",
      company_id: "550e8400-e29b-41d4-a716-446655440000",
      user_id: "550e8400-e29b-41d4-a716-446655440002",
      type: "call",
      created_at: "2024-01-15T11:00:00Z",
      user_name: "Sarah Johnson",
      contact_name: "Premier Properties LLC",
      location: "Phone Call",
      description: "Review contract terms and conditions",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440092",
      title: "Follow-up Call",
      start_time: "2024-01-17T09:00:00Z",
      end_time: "2024-01-17T09:30:00Z",
      company_id: "550e8400-e29b-41d4-a716-446655440000",
      user_id: "550e8400-e29b-41d4-a716-446655440001",
      type: "follow-up",
      created_at: "2024-01-15T12:00:00Z",
      user_name: "Brendan Martinez",
      contact_name: "Lisa Rodriguez",
      location: "Phone Call",
      description: "Follow up on quote discussion",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440093",
      title: "Quote Presentation",
      start_time: "2024-01-17T14:00:00Z",
      end_time: "2024-01-17T15:30:00Z",
      company_id: "550e8400-e29b-41d4-a716-446655440000",
      user_id: "550e8400-e29b-41d4-a716-446655440003",
      type: "quote",
      created_at: "2024-01-15T13:00:00Z",
      user_name: "Mike Chen",
      contact_name: "Capital Growth Partners",
      location: "Office Meeting Room",
      description: "Present detailed quote for multi-property deal",
    },
  ]

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-primary-blue text-white"
      case "call":
        return "bg-success text-white"
      case "follow-up":
        return "bg-yellow-500 text-white"
      case "quote":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <User className="w-3 h-3" />
      case "call":
        return <Phone className="w-3 h-3" />
      case "follow-up":
        return <Clock className="w-3 h-3" />
      case "quote":
        return <FileText className="w-3 h-3" />
      default:
        return <CalendarIcon className="w-3 h-3" />
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const todayEvents = events.filter((event) => {
    const eventDate = new Date(event.start_time).toDateString()
    const today = new Date().toDateString()
    return eventDate === today
  })

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.start_time)
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return eventDate >= tomorrow
    })
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Calendar</h1>
          <Badge variant="outline" className="text-primary-blue border-primary-blue">
            {events.length} Events
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "agenda" ? "default" : "outline"}
            onClick={() => setViewMode("agenda")}
            className={viewMode === "agenda" ? "bg-primary-blue text-white" : "border-primary-blue text-primary-blue"}
          >
            Agenda
          </Button>
          <Button
            variant={viewMode === "week" ? "default" : "outline"}
            onClick={() => setViewMode("week")}
            className={viewMode === "week" ? "bg-primary-blue text-white" : "border-primary-blue text-primary-blue"}
          >
            Week View
          </Button>

          <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cta-blue hover:bg-primary-blue text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="Property walkthrough..." />
                </div>
                <div>
                  <Label htmlFor="type">Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="quote">Quote Presentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" />
                  </div>
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
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Office, property address, or 'Phone Call'" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Event details..." />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-cta-blue hover:bg-primary-blue text-white"
                    onClick={() => setIsAddEventOpen(false)}
                  >
                    Create Event
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddEventOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="border-primary-blue text-primary-blue bg-transparent">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-custom">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <Button variant="outline" size="icon" className="border-primary-blue text-primary-blue bg-transparent">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" className="border-primary-blue text-primary-blue bg-transparent">
              Today
            </Button>
          </div>
        </CardContent>
      </Card>

      {viewMode === "agenda" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Events */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-custom">
                <CalendarIcon className="h-5 w-5 text-primary-blue" />
                Today's Events
                <Badge variant="outline" className="text-primary-blue border-primary-blue">
                  {todayEvents.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No events scheduled for today</p>
                </div>
              ) : (
                todayEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-accent-blue rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className={`${getEventTypeColor(event.type)} flex items-center gap-1`}>
                        {getEventTypeIcon(event.type)}
                        {event.type}
                      </Badge>
                      <div>
                        <div className="font-medium text-gray-custom">{event.title}</div>
                        <div className="text-sm text-gray-400 flex items-center gap-2">
                          <User className="w-3 h-3" />
                          {event.contact_name}
                        </div>
                        <div className="text-sm text-gray-400 flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary-blue">
                        {formatTime(event.start_time)} - {formatTime(event.end_time)}
                      </div>
                      <div className="text-xs text-gray-400">{event.user_name}</div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-custom">
                <Clock className="h-5 w-5 text-primary-blue" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getEventTypeColor(event.type)} flex items-center gap-1`}>
                      {getEventTypeIcon(event.type)}
                      {event.type}
                    </Badge>
                    <div>
                      <div className="font-medium text-gray-custom">{event.title}</div>
                      <div className="text-sm text-gray-400 flex items-center gap-2">
                        <User className="w-3 h-3" />
                        {event.contact_name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-custom">{formatDate(event.start_time)}</div>
                    <div className="text-sm text-primary-blue">{formatTime(event.start_time)}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {viewMode === "week" && (
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-custom">Week View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-custom mb-2">Week View</h3>
              <p className="text-gray-400">Weekly calendar view coming soon...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Event Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Total Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{events.length}</div>
            <div className="text-xs text-gray-400">This month</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Meetings</CardTitle>
            <User className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">
              {events.filter((e) => e.type === "meeting").length}
            </div>
            <div className="text-xs text-gray-400">In-person meetings</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Calls</CardTitle>
            <Phone className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">
              {events.filter((e) => e.type === "call" || e.type === "follow-up").length}
            </div>
            <div className="text-xs text-gray-400">Phone calls scheduled</div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Quote Presentations</CardTitle>
            <FileText className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">{events.filter((e) => e.type === "quote").length}</div>
            <div className="text-xs text-gray-400">Quote meetings</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
