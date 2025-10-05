import { cn } from "@/lib/utils"
import { Banknote, CreditCard, LineChart, PiggyBank, Wallet2 } from "lucide-react"
import type { AccountType } from "@/lib/mock-data"

export function AccountTypeIcon({
  type,
  className,
}: {
  type: AccountType
  className?: string
}) {
  const common = cn("shrink-0", className)
  switch (type) {
    case "bank":
      return <Banknote className={common} aria-hidden="true" />
    case "card":
      return <CreditCard className={common} aria-hidden="true" />
    case "investment":
      return <LineChart className={common} aria-hidden="true" />
    case "savings":
      return <PiggyBank className={common} aria-hidden="true" />
    case "cash":
    default:
      return <Wallet2 className={common} aria-hidden="true" />
  }
}
