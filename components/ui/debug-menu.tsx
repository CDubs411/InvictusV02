"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { hasSupabaseConfig } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff } from "lucide-react"

type ConnectionStatus = "online" | "offline" | "checking"

export function DebugMenu() {
  const [supabaseConfigured, setSupabaseConfigured] = useState(false)
  const [realtimeStatus, setRealtimeStatus] = useState<ConnectionStatus>("checking")

  useEffect(() => {
    setSupabaseConfigured(hasSupabaseConfig())

    const supabase = getSupabaseClient()
    const channel = supabase.channel("realtime-status-check")

    channel
      .on("postgres_changes", { event: "*", schema: "public" }, () => {})
      .subscribe((status, err) => {
        if (status === "SUBSCRIBED") {
          setRealtimeStatus("online")
        } else {
          setRealtimeStatus("offline")
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const StatusBadge = ({ status, text }: { status: boolean | ConnectionStatus; text: string }) => {
    const isOnline = status === true || status === "online"
    return (
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <span className="font-medium">{text}</span>
        <Badge className={isOnline ? "bg-success text-white" : "bg-alert text-white"}>
          {isOnline ? <Wifi className="w-4 h-4 mr-2" /> : <WifiOff className="w-4 h-4 mr-2" />}
          {isOnline ? "Online" : "Offline"}
        </Badge>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debug Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <StatusBadge status={supabaseConfigured} text="Supabase Configuration" />
        <StatusBadge status={realtimeStatus} text="Realtime Connection" />
      </CardContent>
    </Card>
  )
}
