"use client"

import {
  BarChart3,
  Calendar,
  FileText,
  Home,
  Phone,
  Settings,
  TrendingUp,
  Handshake,
  Building2,
  UserCheck,
  Target,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Buyers",
    url: "/buyers",
    icon: UserCheck,
  },
  {
    title: "Sellers",
    url: "/sellers",
    icon: Building2,
  },
  {
    title: "Investors",
    url: "/investors",
    icon: TrendingUp,
  },
  {
    title: "Deals",
    url: "/deals",
    icon: Handshake,
  },
  {
    title: "Calls",
    url: "/calls",
    icon: Phone,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "KPIs",
    url: "/kpis",
    icon: BarChart3,
  },
  {
    title: "Quotes",
    url: "/quotes",
    icon: FileText,
  },
  {
    title: "Contracts",
    url: "/contracts",
    icon: Target,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">I</span>
          </div>
          <span className="text-xl font-bold text-gray-custom">Invictus</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-custom font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="text-gray-custom hover:bg-accent-blue hover:text-primary-blue"
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
