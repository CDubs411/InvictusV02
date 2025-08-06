"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsIcon, Users, Building2, Plus, Edit, Trash2, User, Mail, Shield, Save, Bug } from "lucide-react"
import { DebugMenu } from "@/components/ui/debug-menu"

export default function SettingsPage() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  // Sample users data based on database schema
  const users = [
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "Brendan Martinez",
      email: "brendan@invictusre.com",
      role: "closer",
      company_id: "550e8400-e29b-41d4-a716-446655440000",
      created_at: "2024-01-01T00:00:00Z",
      status: "active",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      name: "Sarah Johnson",
      email: "sarah@invictusre.com",
      role: "closer",
      company_id: "550e8400-e29b-41d4-a716-446655440000",
      created_at: "2024-01-01T00:00:00Z",
      status: "active",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      name: "Mike Chen",
      email: "mike@invictusre.com",
      role: "assistant",
      company_id: "550e8400-e29b-41d4-a716-446655440000",
      created_at: "2024-01-01T00:00:00Z",
      status: "active",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      name: "Lisa Rodriguez",
      email: "lisa@invictusre.com",
      role: "admin",
      company_id: "550e8400-e29b-41d4-a716-446655440000",
      created_at: "2024-01-01T00:00:00Z",
      status: "active",
    },
  ]

  // Sample company data
  const company = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Invictus Real Estate",
    created_at: "2024-01-01T00:00:00Z",
    address: "123 Business Plaza, Austin, TX 78701",
    phone: "(555) 123-4567",
    email: "info@invictusre.com",
    website: "www.invictusre.com",
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-alert text-white"
      case "closer":
        return "bg-primary-blue text-white"
      case "assistant":
        return "bg-success text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-3 h-3" />
      case "closer":
        return <User className="w-3 h-3" />
      case "assistant":
        return <User className="w-3 h-3" />
      default:
        return <User className="w-3 h-3" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Settings</h1>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-accent-blue">
          <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:text-primary-blue">
            <Users className="w-4 h-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="company" className="data-[state=active]:bg-white data-[state=active]:text-primary-blue">
            <Building2 className="w-4 h-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger value="debug" className="data-[state=active]:bg-white data-[state=active]:text-primary-blue">
            <Bug className="w-4 h-4 mr-2" />
            Debug
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-custom">Team Members</h2>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button className="bg-cta-blue hover:bg-primary-blue text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userName">Full Name</Label>
                    <Input id="userName" placeholder="John Smith" />
                  </div>
                  <div>
                    <Label htmlFor="userEmail">Email</Label>
                    <Input id="userEmail" type="email" placeholder="john@invictusre.com" />
                  </div>
                  <div>
                    <Label htmlFor="userRole">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="closer">Closer</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1 bg-cta-blue hover:bg-primary-blue text-white"
                      onClick={() => setIsAddUserOpen(false)}
                    >
                      Add User
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddUserOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center text-white font-medium text-sm">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="font-medium text-gray-custom">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-gray-400" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getRoleColor(user.role)} flex items-center gap-1 w-fit`}>
                          {getRoleIcon(user.role)}
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-success text-white">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-primary-blue text-primary-blue bg-transparent"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="border-alert text-alert bg-transparent">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Tab */}
        <TabsContent value="company" className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-custom">Company Information</h2>

          <Card className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-custom">Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue={company.name} />
                </div>
                <div>
                  <Label htmlFor="companyPhone">Phone</Label>
                  <Input id="companyPhone" defaultValue={company.phone} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyEmail">Email</Label>
                  <Input id="companyEmail" type="email" defaultValue={company.email} />
                </div>
                <div>
                  <Label htmlFor="companyWebsite">Website</Label>
                  <Input id="companyWebsite" defaultValue={company.website} />
                </div>
              </div>
              <div>
                <Label htmlFor="companyAddress">Address</Label>
                <Input id="companyAddress" defaultValue={company.address} />
              </div>
              <div className="flex justify-end pt-4">
                <Button className="bg-cta-blue hover:bg-primary-blue text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Debug Tab */}
        <TabsContent value="debug">
          <DebugMenu />
        </TabsContent>
      </Tabs>
    </div>
  )
}
