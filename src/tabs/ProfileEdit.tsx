import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

type ProfileValues = {
  name: string
  email: string
  phone?: string
  bio?: string
}

const STORAGE_KEY = "profile"

const ProfileEditForm = () => {
  const [values, setValues] = useState<ProfileValues>({ name: "", email: "", phone: "", bio: "" })
  const [pending, setPending] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as ProfileValues
        setValues({
          name: parsed.name || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          bio: parsed.bio || "",
        })
      }
    } catch {
      // ignore
    }
  }, [])

  function update<K extends keyof ProfileValues>(key: K, val: ProfileValues[K]) {
    setValues((v) => ({ ...v, [key]: val }))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
      }
    //   toast({ title: "Profile saved", description: "Your profile was saved locally." })
    //   router.push("/profile")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="w-full flex flex-col flex-1 px-4">
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Basic information</CardTitle>
      </CardHeader>
      <CardContent>
        <form 
        onSubmit={onSubmit} 
        className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={values.phone || ""}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+1 555 555 5555"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={values.bio || ""}
              onChange={(e) => update("bio", e.target.value)}
              placeholder="A short bio about you"
            />
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => { navigate(-1) }}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}

export default ProfileEditForm