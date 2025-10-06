import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(localStorage.getItem("theme") as "light" | "dark")

//   useEffect(() => {
//     const cached = localStorage.getItem("theme")
//     if (cached === "light" || cached === "dark") {
//       setTheme(cached)
//     }
//   }, [])

  useEffect(() => {
    console.log("Theme changed to", theme);
    console.log(localStorage.getItem("theme"), "<- before local storage theme");

    if (typeof document === "undefined") return
    const root = document.documentElement
    if (theme === "dark") root.classList.add("dark")
    else root.classList.remove("dark")
    localStorage.setItem("theme", theme)

    console.log(localStorage.getItem("theme"), "<- after local storage theme");
  }, [theme])

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="icon"
        aria-label="Set light theme"
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="icon"
        aria-label="Set dark theme"
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>
    </div>
  )
}
