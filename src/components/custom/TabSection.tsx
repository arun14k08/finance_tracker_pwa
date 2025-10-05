import { cn } from "@/lib/utils";
import { Home, ReceiptText, User, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type Tab = {
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  value: string
}

const TABS: Tab[] = [
  { href: "/home/dashboard", icon: Home , value: "Home" },
  { href: "/home/transactions", icon: ReceiptText, value: "Transactions" },
  { href: "/home/accounts", icon: Wallet, value: "Accounts" },
  { href: "/home/profile", icon: User, value: "Profile" },
]


const isNestedPage = (tabPath: string, windowLocation: string) => {
  const isProfileEditPage = tabPath === "/home/profile" && windowLocation === "/home/profile-edit"
  const isTransactionDetailPage = tabPath === "/home/transactions" && windowLocation.startsWith("/home/transactions/")
  if (isProfileEditPage || isTransactionDetailPage) {
    return true
  }
  return false
}

const TabSection = () => {
  const location = useLocation();
  return (
    <nav
      role="navigation"
      aria-label="Bottom Navigation"
      className={cn("fixed inset-x-0 bottom-0 z-50", "border-t bg-card text-foreground")}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const active = location.pathname === tab.href || (isNestedPage(tab.href, location.pathname))
          return (
            <Link to={tab.href} key={tab.href} className="flex items-center justify-center">
              <div
                className={cn(
                  "flex h-16 w-full flex-col items-center justify-center gap-1",
                  "text-xs",
                  active ? "text-blue-500" : "text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
                aria-current={active ? "page" : undefined}
                aria-label={tab.href}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="leading-none">{tab.value}</span>
              </div>
            </Link>
          )
        })}
      </ul>
    </nav>
  )
}

export default TabSection