"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Phone,
  MessageSquare,
  FileText,
  Target,
  PenTool,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
  Trophy,
} from "lucide-react"

export default function KPIsPage() {
  const weeklyKPIs = [
    {
      title: "Calls Made",
      value: "142",
      change: "+12%",
      trend: "up",
      icon: Phone,
      color: "text-primary-blue",
      bgColor: "bg-accent-blue",
      subtitle: "Most active: Brendan (42 calls)",
    },
    {
      title: "Conversations Held",
      value: "89",
      change: "+8%",
      trend: "up",
      icon: MessageSquare,
      color: "text-success",
      bgColor: "bg-green-50",
      subtitle: "Avg. duration: 4.2 min",
    },
    {
      title: "Quotes Sent",
      value: "34",
      change: "-5%",
      trend: "down",
      icon: FileText,
      color: "text-cta-blue",
      bgColor: "bg-blue-50",
      subtitle: "Avg. value: $45,200",
    },
    {
      title: "Contracts Generated",
      value: "18",
      change: "+15%",
      trend: "up",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      subtitle: "Quote-to-contract: 53%",
    },
    {
      title: "Contracts Signed",
      value: "12",
      change: "+20%",
      trend: "up",
      icon: PenTool,
      color: "text-success",
      bgColor: "bg-green-50",
      subtitle: "Sign rate: 67%",
    },
    {
      title: "Deals Closed",
      value: "8",
      change: "+25%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
      bgColor: "bg-green-50",
      subtitle: "Total value: $1.2M",
    },
  ]

  const strategicKPIs = [
    {
      title: "Lead Conversion Rate",
      value: "24%",
      subtitle: "Contacts → Quotes",
      change: "+3%",
      trend: "up",
    },
    {
      title: "Quote-to-Contract Rate",
      value: "53%",
      subtitle: "Quotes → Signed Contracts",
      change: "+8%",
      trend: "up",
    },
    {
      title: "Close Rate",
      value: "67%",
      subtitle: "Signed → Closed Deals",
      change: "-2%",
      trend: "down",
    },
    {
      title: "Avg. Time to Close",
      value: "18 days",
      subtitle: "First contact → Closed",
      change: "-2 days",
      trend: "up",
    },
    {
      title: "Repeat Investors",
      value: "32%",
      subtitle: "Multiple deals closed",
      change: "+5%",
      trend: "up",
    },
    {
      title: "Follow-Ups Missed",
      value: "7%",
      subtitle: "Calendar events incomplete",
      change: "-3%",
      trend: "up",
    },
  ]

  const teamLeaderboard = [
    { name: "Brendan Martinez", calls: 42, deals: 3, quotes: 12, avatar: "BM" },
    { name: "Sarah Johnson", calls: 38, deals: 2, quotes: 10, avatar: "SJ" },
    { name: "Mike Chen", calls: 35, deals: 2, quotes: 8, avatar: "MC" },
    { name: "Lisa Rodriguez", calls: 27, deals: 1, quotes: 4, avatar: "LR" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-custom">KPI Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-primary-blue text-primary-blue bg-transparent">
            Export Report
          </Button>
          <Button className="bg-cta-blue hover:bg-primary-blue text-white">Set Goals</Button>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-accent-blue">
          <TabsTrigger value="weekly" className="data-[state=active]:bg-white data-[state=active]:text-primary-blue">
            Weekly View
          </TabsTrigger>
          <TabsTrigger value="monthly" className="data-[state=active]:bg-white data-[state=active]:text-primary-blue">
            Monthly View
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-white data-[state=active]:text-primary-blue">
            Team Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6">
          {/* Core KPIs */}
          <div>
            <h2 className="text-xl font-semibold text-gray-custom mb-4 flex items-center gap-2">
              🧭 Core CRM KPIs (This Week)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weeklyKPIs.map((kpi, index) => (
                <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-custom">{kpi.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                      <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-custom mb-1">{kpi.value}</div>
                    <div
                      className={`flex items-center text-xs mb-2 ${kpi.trend === "up" ? "text-success" : "text-alert"}`}
                    >
                      {kpi.trend === "up" ? (
                        <ArrowUp className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDown className="w-3 h-3 mr-1" />
                      )}
                      {kpi.change} from last week
                    </div>
                    <div className="text-xs text-gray-400">{kpi.subtitle}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Strategic KPIs */}
          <div>
            <h2 className="text-xl font-semibold text-gray-custom mb-4 flex items-center gap-2">
              📊 Strategic KPIs (Growth & Refinement)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategicKPIs.map((kpi, index) => (
                <Card key={index} className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-2xl font-bold text-gray-custom">{kpi.value}</div>
                      <div
                        className={`flex items-center text-xs ${kpi.trend === "up" ? "text-success" : "text-alert"}`}
                      >
                        {kpi.trend === "up" ? (
                          <ArrowUp className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDown className="w-3 h-3 mr-1" />
                        )}
                        {kpi.change}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-custom mb-1">{kpi.title}</div>
                    <div className="text-xs text-gray-400">{kpi.subtitle}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-custom mb-2">Monthly View</h3>
            <p className="text-gray-400">Monthly KPI tracking coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          {/* Team Leaderboard */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-custom">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Team Leaderboard (This Week)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamLeaderboard.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                        <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-medium">
                          {member.avatar}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-custom">{member.name}</div>
                        <div className="text-sm text-gray-400">Team Member</div>
                      </div>
                    </div>
                    <div className="flex gap-6 text-center">
                      <div>
                        <div className="text-lg font-bold text-primary-blue">{member.calls}</div>
                        <div className="text-xs text-gray-400">Calls</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-success">{member.deals}</div>
                        <div className="text-xs text-gray-400">Deals</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-cta-blue">{member.quotes}</div>
                        <div className="text-xs text-gray-400">Quotes</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-custom">Weekly Team Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-custom mb-2">200 Calls</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-primary-blue h-2 rounded-full" style={{ width: "71%" }}></div>
                </div>
                <div className="text-sm text-gray-400">142 / 200 completed (71%)</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-custom">Deals Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-custom mb-2">12 Deals</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "67%" }}></div>
                </div>
                <div className="text-sm text-gray-400">8 / 12 completed (67%)</div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-custom">Revenue Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-custom mb-2">$1.5M</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
                <div className="text-sm text-gray-400">$1.2M / $1.5M completed (80%)</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
