"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Calendar, Activity, PhoneMissed, Clock, DollarSign, FileText, ArrowUp, ArrowDown } from "lucide-react"

export default function Dashboard() {
  const missedCalls = [
    { name: "Sarah Johnson", phone: "(555) 123-4567", time: "2 min ago", type: "Seller" },
    { name: "Mike Chen", phone: "(555) 987-6543", time: "15 min ago", type: "Investor" },
    { name: "Lisa Rodriguez", phone: "(555) 456-7890", time: "1 hour ago", type: "Buyer" },
  ]

  const upcomingEvents = [
    { title: "Property Walkthrough", time: "2:00 PM", contact: "John Smith", type: "Meeting" },
    { title: "Contract Review", time: "4:30 PM", contact: "ABC Investments", type: "Call" },
    { title: "Follow-up Call", time: "Tomorrow 9:00 AM", contact: "Maria Garcia", type: "Call" },
  ]

  const recentActivity = [
    { action: "Quote sent", contact: "David Wilson", time: "30 min ago", status: "success" },
    { action: "Deal closed", contact: "Premier Properties", time: "2 hours ago", status: "success" },
    { action: "Contract signed", contact: "Jennifer Lee", time: "4 hours ago", status: "success" },
    { action: "Call missed", contact: "Robert Taylor", time: "6 hours ago", status: "alert" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-custom">Dashboard</h1>
        <div className="text-sm text-gray-400">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Calls Made (Today)</CardTitle>
            <Phone className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">24</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUp className="w-3 h-3 mr-1" />
              +12% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Deals Closed (Week)</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">8</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUp className="w-3 h-3 mr-1" />
              +25% from last week
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Quotes Sent (Week)</CardTitle>
            <FileText className="h-4 w-4 text-cta-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">15</div>
            <div className="flex items-center text-xs text-alert">
              <ArrowDown className="w-3 h-3 mr-1" />
              -8% from last week
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-custom">Avg. Time to Close</CardTitle>
            <Clock className="h-4 w-4 text-primary-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-custom">18d</div>
            <div className="flex items-center text-xs text-success">
              <ArrowUp className="w-3 h-3 mr-1" />
              -2 days improved
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Missed Calls */}
        <Card className="border-l-4 border-l-alert border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-custom">
              <PhoneMissed className="h-5 w-5 text-alert" />
              Missed Calls
              <Badge variant="destructive" className="bg-alert text-white">
                {missedCalls.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {missedCalls.map((call, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-custom">{call.name}</div>
                  <div className="text-sm text-gray-400">{call.phone}</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {call.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">{call.time}</div>
                  <Button size="sm" className="mt-1 bg-cta-blue hover:bg-primary-blue text-white">
                    Call Back
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-custom">
              <Calendar className="h-5 w-5 text-primary-blue" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-accent-blue rounded-lg">
                <div>
                  <div className="font-medium text-gray-custom">{event.title}</div>
                  <div className="text-sm text-gray-400">{event.contact}</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {event.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-primary-blue">{event.time}</div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-1 border-primary-blue text-primary-blue bg-transparent"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-custom">
            <Activity className="h-5 w-5 text-primary-blue" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${activity.status === "success" ? "bg-success" : "bg-alert"}`}
                  />
                  <div>
                    <span className="font-medium text-gray-custom">{activity.action}</span>
                    <span className="text-gray-400"> for </span>
                    <span className="font-medium text-gray-custom">{activity.contact}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
