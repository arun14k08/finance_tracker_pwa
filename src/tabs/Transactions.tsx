import * as React from "react"
import { mockTransactions } from "@/lib/mock-data"
import type { Transaction, TransactionType, AccountType } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Filter } from "lucide-react"
import { cn } from "@/lib/utils"
import { TransactionModal } from "@/components/custom/TransactionModel"
import { Link } from "react-router-dom"

export default function Transactions() {
  const [txns, setTxns] = React.useState<Transaction[]>(mockTransactions)
  const [q, setQ] = React.useState("")
  const [type, setType] = React.useState<TransactionType | "all">("all")
  const [acct, setAcct] = React.useState<AccountType | "all">("all")
  const [open, setOpen] = React.useState(false)

  const filtered = React.useMemo(() => {
    return txns.filter((t) => {
      const matchesQ =
        q.trim().length === 0 ||
        t.description.toLowerCase().includes(q.toLowerCase()) ||
        t.category.toLowerCase().includes(q.toLowerCase())
      const matchesType = type === "all" || t.type === type
      const matchesAcct = acct === "all" || t.account_type === acct
      return matchesQ && matchesType && matchesAcct
    })
  }, [txns, q, type, acct])

  function handleSave(newData: Omit<Transaction, "id">) {
    const id = `txn_${Math.random().toString(36).slice(2, 8)}`
    setTxns((list) => [{ id, ...newData }, ...list])
  }

  return (
    <main className="mx-auto max-w-screen px-4 py-4">
      {/* Search + Filter */}
      <div className="mb-3 flex items-center gap-2">
        <Input
          placeholder="Search description or category..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1"
          aria-label="Search transactions"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="Filter transactions">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Type</div>
            <DropdownMenuItem onClick={() => setType("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setType("credit")}>Credit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setType("debit")}>Debit</DropdownMenuItem>
            <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Account</div>
            <DropdownMenuItem onClick={() => setAcct("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAcct("bank")}>Bank</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAcct("card")}>Card</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAcct("investment")}>Investment</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAcct("savings")}>Savings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAcct("cash")}>Cash</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-3 pb-24">
        {filtered.map((t) => {
          const isCredit = t.type === "credit"
          return (
            <Link key={t.id} to={`/home/transactions/${t.id}`} className="no-underline">
              <Card role="listitem" className="transition-colors hover:bg-muted">
                <CardContent className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="grid gap-1">
                      <div className="text-sm text-foreground">{t.description}</div>
                      <div className="text-xs text-muted-foreground">
                        Post balance:{" "}
                        <span className={cn(isCredit ? "text-positive" : "text-negative")}>
                          {t.post_balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn("text-sm font-medium", isCredit ? "text-positive" : "text-negative")}>
                        {isCredit ? "+" : "-"}
                        {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="mt-1 flex items-center justify-end gap-2">
                        <Badge variant="outline" className="capitalize">
                          {t.type}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {t.account_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Floating Add button */}
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          onClick={() => setOpen(true)}
          size="icon"
          className="h-12 w-12 rounded-full bg-brand text-white shadow-lg"
          aria-label="Add transaction"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <TransactionModal open={open} onOpenChange={setOpen} onSave={handleSave} />
    </main>
  )
}
