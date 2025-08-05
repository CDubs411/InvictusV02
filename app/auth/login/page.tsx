"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseClient, hasSupabaseConfig } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = getSupabaseClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!hasSupabaseConfig()) {
      // Mock login for development
      console.log("Mock login with:", email, password)
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 1000)
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail("demo@invictusre.com")
    setPassword("demo123")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-custom">Sign in to Invictus CRM</h2>
          <p className="mt-2 text-sm text-gray-400">Access your real estate wholesale dashboard</p>
        </div>

        {!hasSupabaseConfig() && (
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>Demo Mode:</strong> Supabase is not configured. You can explore the interface with mock data.
            </AlertDescription>
          </Alert>
        )}

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-center text-gray-custom">
              {hasSupabaseConfig() ? "Welcome Back" : "Demo Access"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert className="border-alert bg-red-50">
                  <AlertDescription className="text-alert">{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={hasSupabaseConfig() ? "Enter your email" : "demo@invictusre.com"}
                    className="pl-10 border-gray-200 focus:border-primary-blue"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={hasSupabaseConfig() ? "Enter your password" : "demo123"}
                    className="pl-10 pr-10 border-gray-200 focus:border-primary-blue"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!hasSupabaseConfig() && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDemoLogin}
                  className="w-full border-primary-blue text-primary-blue bg-transparent"
                >
                  Fill Demo Credentials
                </Button>
              )}

              <Button type="submit" disabled={loading} className="w-full bg-cta-blue hover:bg-primary-blue text-white">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {hasSupabaseConfig() ? "Signing in..." : "Entering Demo..."}
                  </>
                ) : hasSupabaseConfig() ? (
                  "Sign In"
                ) : (
                  "Enter Demo"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                {hasSupabaseConfig() ? (
                  <>
                    Don't have an account?{" "}
                    <a href="/auth/signup" className="text-primary-blue hover:text-cta-blue font-medium">
                      Contact your administrator
                    </a>
                  </>
                ) : (
                  <>
                    This is a demo version.{" "}
                    <a href="#" className="text-primary-blue hover:text-cta-blue font-medium">
                      Configure Supabase to enable full functionality
                    </a>
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
