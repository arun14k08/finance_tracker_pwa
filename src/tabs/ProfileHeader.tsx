import { Pencil } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function ProfileHeader({
  name,
  email,
  avatarUrl,
}: {
  name?: string
  email?: string
  avatarUrl?: string
}) {
  const initials = (name || email || "U")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card className="bg-card">
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4 min-w-0">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={avatarUrl || "/placeholder.svg?height=96&width=96&query=profile%20avatar"}
              alt={name ? `${name}'s avatar` : "User avatar"}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Signed in as</p>
            <p className="truncate text-pretty text-base font-medium">{name || "Your Name"}</p>
            <p className="truncate text-pretty text-sm text-muted-foreground">{email || "you@example.com"}</p>
          </div>
        </div>
        <Link to={"/home/profile-edit"} aria-label="Edit profile">
        <Button variant="outline" size="icon" aria-label="Edit profile">
            <Pencil className="h-5 w-5" aria-hidden="true" />
        </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
