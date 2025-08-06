"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"
import { AuthProvider } from "@/components/auth-provider"
import { hasSupabaseConfig, reinitializeSupabaseClient } from "@/lib/supabase/client"
import { SupabaseAuthModal } from "@/components/supabase-auth-modal"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false)

  useEffect(() => {
    const isConfigured = hasSupabaseConfig()
    setIsSupabaseConfigured(isConfigured)
    if (!isConfigured) {
      setIsModalOpen(true)
    }
  }, [])

  const handleSaveCredentials = (url: string, key: string) => {
    reinitializeSupabaseClient(url, key)
    setIsSupabaseConfigured(true)
    setIsModalOpen(false)
    // Force a re-render to ensure the app uses the new client
    window.location.reload()
  }

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
        <SupabaseAuthModal
          isOpen={isModalOpen && !isSupabaseConfigured}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCredentials}
        />
      </body>
    </html>
  )
}
