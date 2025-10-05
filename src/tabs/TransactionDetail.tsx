import { mockTransactions } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import NotFound from "@/pages/NotFound"
import { useParams } from "react-router-dom"

export default function TransactionDetail() {
  const { id } = useParams();
  const txn = mockTransactions.find((t) => t.id === id)
  if (!txn) return <NotFound />

  const isCredit = txn.type === "credit"

  return (
    <main className="max-w-screen-sm px-4 py-4">
      <Card>
        <CardContent className="grid gap-4 py-4">
          <div>
            <div className={cn("text-2xl font-semibold", isCredit ? "text-positive" : "text-negative")}>
              {isCredit ? "+" : "-"}
              {txn.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {txn.type}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {txn.category}
              </Badge>
              <Badge className="capitalize">{txn.status}</Badge>
            </div>
          </div>

          <div className="grid gap-1">
            <span className="text-sm text-muted-foreground">Description</span>
            <span className="text-foreground">{txn.description}</span>
          </div>

          <div className="grid gap-1">
            <span className="text-sm text-muted-foreground">From account</span>
            <span className="text-foreground">{txn.from_account || "—"}</span>
          </div>

          <div className="grid gap-1">
            <span className="text-sm text-muted-foreground">To account</span>
            <span className="text-foreground">{txn.to_account || "—"}</span>
          </div>

          <div className="grid gap-1">
            <span className="text-sm text-muted-foreground">Post balance</span>
            <span className={cn(isCredit ? "text-positive" : "text-negative")}>
              {txn.post_balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="grid gap-1">
            <span className="text-sm text-muted-foreground">Account type</span>
            <span className="capitalize">{txn.account_type}</span>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
