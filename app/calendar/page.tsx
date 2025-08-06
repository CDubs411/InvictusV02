"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus, Clock, User, MapPin, Phone, FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { clientQueries } from "@/lib/database/queries"
import { CalendarEvent, Contact, User as UserType, Buyer, Seller, Investor, ContactType } from "@/types/database"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

type EnrichedCalendarEvent = CalendarEvent & {
  user_name: string
  contact_name: string
}

const initialFormState = {
  title: "",
  type: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  contactId: "",
  location: "",
  description: "",
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "agenda">("agenda")
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [events, setEvents] = useState<EnrichedCalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<UserType[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [newEvent, setNewEvent] = useState(initialFormState)
  const { toast } = useToast()

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [eventsData, usersData, buyersData, sellersData, investorsData, userData] = await Promise.all([
        clientQueries.getCalendarEvents(),
        clientQueries.getCompanyUsers(),
        clientQueries.getBuyers(),
        clientQueries.getSellers(),
        clientQueries.getInvestors(),
        clientQueries.getCurrentUser(),
      ])

      const allContacts: Contact[] = [...(buyersData as Buyer[]), ...(sellersData as Seller[]), ...(investorsData as Investor[])]
      setContacts(allContacts)
      setUsers(usersData)
      setCurrentUser(userData as UserType)

      const userMap = new Map(usersData.map((u) => [u.id, u.name]))
      const contactMap = new Map(allContacts.map((c) => [c.id, c.name]))

      const enrichedEvents = (eventsData as CalendarEvent[]).map((event) => ({
        ...event,
        user_name: event.user_id ? userMap.get(event.user_id) || "Unknown User" : "Unknown User",
        contact_name: event.contact_id ? contactMap.get(event.contact_id) || "Unknown Contact" : "No Contact",
      }))

      setEvents(enrichedEvents)
    } catch (error) {
      console.error("Failed to fetch calendar data:", error)
      toast({
        title: "Error fetching data",
        description: "Could not load calendar data. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewEvent((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setNewEvent((prev) => ({ ...prev, [id]: value }))
  }

  const handleCreateEvent = async () => {
    if (!currentUser) {
      toast({ title: "Error", description: "You must be logged in to create an event.", variant: "destructive" })
      return
    }

    const { title, type, startDate, startTime, endDate, endTime, contactId, location, description } = newEvent
    if (!title || !type || !startDate || !startTime || !endDate || !endTime) {
      toast({ title: "Missing Fields", description: "Please fill out all required fields.", variant: "destructive" })
      return
    }

    const start_time = new Date(`${startDate}T${startTime}`).toISOString()
    const end_time = new Date(`${endDate}T${endTime}`).toISOString()

    const selectedContact = contacts.find((c) => c.id === contactId)
    let contact_type: ContactType | null = null
    if (selectedContact) {
      if ("budget_min" in selectedContact) contact_type = "buyer"
      else if ("notes" in selectedContact && !("budget_min" in selectedContact)) contact_type = "seller"
      else contact_type = "investor"
    }

    try {
      await clientQueries.createCalendarEvent({
        title,
        type: type as CalendarEvent["type"],
        start_time,
        end_time,
        company_id: currentUser.company_id,
        user_id: currentUser.id,
        contact_id: contactId || null,
        contact_type,
        location,
        description,
      })
      toast({ title: "Success", description: "Event created successfully." })
      setIsAddEventOpen(false)
      setNewEvent(initialFormState)
      fetchData() // Refresh data
    } catch (error) {
      console.error("Failed to create event:", error)
      toast({ title: "Error", description: "Failed to create event. Please try again.", variant: "destructive" })
    }
  }

  const getEventTypeColor = (type: string | null) => {
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

  const getEventTypeIcon = (type: string | null) => {
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

  const todayEvents = useMemo(
    () =>
      events.filter((event) => {
        const eventDate = new Date(event.start_time).toDateString()
        const today = new Date().toDateString()
        return eventDate === today
      }),
    [events]
  )

  const upcomingEvents = useMemo(
    () =>
      events
        .filter((event) => {
          const eventDate = new Date(event.start_time)
          const today = new Date()
          return eventDate > today
        })
        .slice(0, 5),
    [events]
  )

  const startOfWeek = useMemo(() => {
    const date = new Date(currentDate)
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
    return new Date(date.setDate(diff))
  }, [currentDate])

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(date.getDate() + i)
      return date
    })
  }, [startOfWeek])

  const eventsByDay = useMemo(() => {
    const grouped: { [key: string]: EnrichedCalendarEvent[] } = {}
    weekDays.forEach((day) => {
      grouped[day.toDateString()] = events.filter((event) => {
        const eventDate = new Date(event.start_time)
        return eventDate.toDateString() === day.toDateString()
      })
    })
    return grouped
  }, [events, weekDays])

  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))
  }

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    )
  }

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
                  <Input id="title" value={newEvent.title} onChange={handleInputChange} placeholder="Property walkthrough..." />
                </div>
                <div>
                  <Label htmlFor="type">Event Type</Label>
                  <Select value={newEvent.type} onValueChange={(value) => handleSelectChange("type", value)}>
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
                    <Input id="startDate" type="date" value={newEvent.startDate} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input id="startTime" type="time" value={newEvent.startTime} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" value={newEvent.endDate} onChange={handleInputChange} />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input id="endTime" type="time" value={newEvent.endTime} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contactId">Contact</Label>
                  <Select value={newEvent.contactId} onValueChange={(value) => handleSelectChange("contactId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact" />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.map((contact) => (
                        <SelectItem key={contact.id} value={contact.id}>
                          {contact.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={newEvent.location} onChange={handleInputChange} placeholder="Office, property address, or 'Phone Call'" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" value={newEvent.description} onChange={handleInputChange} placeholder="Event details..." />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-cta-blue hover:bg-primary-blue text-white"
                    onClick={handleCreateEvent}
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
              <Button
                variant="outline"
                size="icon"
                className="border-primary-blue text-primary-blue bg-transparent"
                onClick={handlePrevWeek}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold text-gray-custom">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h2>
              <Button
                variant="outline"
                size="icon"
                className="border-primary-blue text-primary-blue bg-transparent"
                onClick={handleNextWeek}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" className="border-primary-blue text-primary-blue bg-transparent" onClick={handleToday}>
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
          <CardContent className="p-0">
            <div className="grid grid-cols-7">
              {weekDays.map((day) => (
                <div key={day.toISOString()} className="border-r border-gray-200 p-2 min-h-[200px]">
                  <div className="text-center font-semibold">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                  <div className="text-center text-gray-500 mb-2">{day.getDate()}</div>
                  <div className="space-y-2">
                    {eventsByDay[day.toDateString()]?.map((event) => (
                      <div key={event.id} className="p-2 rounded-lg" style={{ backgroundColor: getEventTypeColor(event.type) }}>
                        <div className="font-bold text-white text-xs">{event.title}</div>
                        <div className="text-white text-xs opacity-90">{formatTime(event.start_time)}</div>
                        <div className="text-white text-xs opacity-90 flex items-center gap-1">
                          <User className="w-3 h-3" /> {event.contact_name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
