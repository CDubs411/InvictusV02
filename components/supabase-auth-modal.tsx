"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SupabaseAuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (url: string, key: string) => void
}

export function SupabaseAuthModal({ isOpen, onClose, onSave }: SupabaseAuthModalProps) {
  const [url, setUrl] = useState("")
  const [key, setKey] = useState("")

  const handleSave = () => {
    onSave(url, key)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supabase Configuration Required</DialogTitle>
          <DialogDescription>
            Please provide your Supabase URL and anonymous key to connect to the database.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="supabase-url">Supabase URL</Label>
            <Input
              id="supabase-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://<your-project-ref>.supabase.co"
            />
          </div>
          <div>
            <Label htmlFor="supabase-key">Supabase Anon Key</Label>
            <Input
              id="supabase-key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save and Connect</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
