import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Invictus CRM",
  description: "Real Estate Wholesale CRM",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full bg-white">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6 bg-white">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
