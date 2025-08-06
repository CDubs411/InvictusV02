"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Upload,
  FileText,
  Download,
  Trash2,
  File,
  Calendar,
  User,
} from "lucide-react"

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample document data
  const documents = [
    {
      id: "doc_1",
      name: "Purchase Agreement Template.pdf",
      file_type: "pdf",
      created_at: "2024-02-15T10:30:00Z",
      created_by_name: "Brendan Martinez",
    },
    {
      id: "doc_2",
      name: "Lease Agreement.docx",
      file_type: "docx",
      created_at: "2024-02-14T14:20:00Z",
      created_by_name: "Sarah Johnson",
    },
    {
      id: "doc_3",
      name: "Investor Welcome Packet.pdf",
      file_type: "pdf",
      created_at: "2024-02-12T09:15:00Z",
      created_by_name: "Brendan Martinez",
    },
  ]

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getFileIcon = (fileType: string) => {
    // In a real app, you might have more icons for different file types
    return <FileText className="w-4 h-4 text-gray-500" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <File className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-custom">Documents</h1>
          <Badge variant="outline" className="text-primary-blue border-primary-blue">
            {documents.length} Total
          </Badge>
        </div>

        <Button className="bg-cta-blue hover:bg-primary-blue text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Upload Area */}
      <Card className="border-2 border-dashed border-gray-300 shadow-none">
        <CardContent className="p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Drag and drop files here
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              or click to browse
            </p>
            <Button variant="outline" className="mt-4">
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Bar */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-primary-blue"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-custom">All Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.file_type)}
                      <span className="font-medium text-gray-custom">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-custom">
                      <User className="w-3 h-3 text-gray-400" />
                      {doc.created_by_name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(doc.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-300 text-gray-600 bg-transparent"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-alert text-alert bg-transparent"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>.
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
