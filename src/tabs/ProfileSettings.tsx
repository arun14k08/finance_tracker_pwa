"use client"

import { useContext, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/custom/ThemeToggle"
import AuthContext from "@/context/AuthContext"
import { toast } from "sonner"
import axios from "axios"
import ConfigContext from "@/context/ConfigContext"
import { useNavigate } from "react-router-dom"

export function ProfileSettings() {
  const [notifications, setNotifications] = useState(true)
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const config = useContext(ConfigContext);

  const handleLogout = () => {
    axios.post(`${config?.apiUrl}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${auth?.user?.token}`
        }
    }).then(() => {
        auth?.logout();
        toast.info("You have been logged out.");
        navigate("/login");
    }).catch(() => {
        toast.error("Failed to log out.");
    });
    
  }


  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-sm">Notifications</span>
            <span className="block text-xs text-muted-foreground">Receive important updates</span>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} aria-label="Toggle notifications" />
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-sm">Theme</span>
            <span className="block text-xs text-muted-foreground">Switch between light and dark</span>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="block text-sm">Log out</span>
            <span className="block text-xs text-muted-foreground">End your current session</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            aria-label="Log out"
            onClick={() => handleLogout()}
          >
            Log out
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
