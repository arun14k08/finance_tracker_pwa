import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import type { Account } from "@/lib/mock-data"
import { AccountTypeIcon } from "@/lib/account-icons"
import { cn } from "@/lib/utils"

export function AccountCard({
  account,
  onEdit,
}: {
  account: Account
  onEdit: (account: Account) => void
}) {
  const positive = account.balance >= 0

  return (
    <Card role="listitem" className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <AccountTypeIcon type={account.account_type} className="h-5 w-5 text-brand" />
          <CardTitle className="text-base font-medium text-foreground text-pretty">{account.name}</CardTitle>
          {account.is_active ? (
            <Badge className="ml-1" variant="secondary">
              Active
            </Badge>
          ) : (
            <Badge variant="outline">Inactive</Badge>
          )}
        </div>
        <Button variant="ghost" size="icon" aria-label="Edit account" onClick={() => onEdit(account)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-baseline justify-between">
          <div className={cn("text-xl font-semibold", positive ? "text-positive" : "text-negative")}>
            {account.currency} {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <Badge variant="outline" className="capitalize">
            {account.account_type}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {account.bank_name ? account.bank_name : "—"}
          {account.last_four ? ` · •••• ${account.last_four}` : ""}
        </div>
      </CardContent>
    </Card>
  )
}
