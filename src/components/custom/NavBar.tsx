import { Home, ReceiptText, User, Wallet2 } from "lucide-react"
import { useLocation } from "react-router-dom";


const menuMap : { name: string, href: string, icon: any }[] = [
  { name: "Dashboard", href: "/home/dashboard", icon: Home },
  { name: "Transactions", href: "/home/transactions", icon: ReceiptText },
  { name: "Accounts", href: "/home/accounts", icon: Wallet2 },
  { name: "Profile", href: "/home/profile", icon: User },
]

const NavBar = () => {
  const location = useLocation();

  const Icon = menuMap.find((menu) => location.pathname.startsWith(menu.href))?.icon

  return (
    <section className="fixed top-0 left-0 z-50 mr-auto max-w-md space-y-4 p-4 border-b w-full bg-card text-foreground">
        <h1 className="flex items-center gap-2 text-lg font-medium">
          <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
          {menuMap.find((menu) => location.pathname.startsWith(menu.href))?.name || "Dashboard"}
        </h1>
      </section>
  )
}

export default NavBar