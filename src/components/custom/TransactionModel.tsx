import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AccountType, Transaction, TransactionType } from "@/lib/mock-data"

type TxnInput = Omit<Transaction, "id">

export function TransactionModal({
  open,
  onOpenChange,
  initialValues,
  onSave,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  initialValues?: Partial<TxnInput>
  onSave: (data: TxnInput) => void
}) {
  const [form, setForm] = React.useState<TxnInput>({
    amount: initialValues?.amount ?? 0,
    type: (initialValues?.type as TransactionType) ?? "debit",
    description: initialValues?.description ?? "",
    category: initialValues?.category ?? "",
    status: (initialValues?.status as TxnInput["status"]) ?? "completed",
    from_account: initialValues?.from_account ?? "",
    to_account: initialValues?.to_account ?? "",
    post_balance: initialValues?.post_balance ?? 0,
    account_type: (initialValues?.account_type as AccountType) ?? "bank",
  })

  React.useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...initialValues,
      amount: initialValues?.amount ?? prev.amount,
      type: (initialValues?.type as TransactionType) ?? prev.type,
      status: (initialValues?.status as TxnInput["status"]) ?? prev.status,
      post_balance: initialValues?.post_balance ?? prev.post_balance,
      account_type: (initialValues?.account_type as AccountType) ?? prev.account_type,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, open])

  function handleSave() {
    onSave(form)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialValues ? "Edit transaction" : "Add transaction"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <div className="grid gap-1">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              inputMode="decimal"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
            />
          </div>

          <div className="grid gap-1">
            <Label>Type</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as TransactionType })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="grid gap-1">
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as TxnInput["status"] })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1">
            <Label htmlFor="from">From account</Label>
            <Input
              id="from"
              value={form.from_account}
              onChange={(e) => setForm({ ...form, from_account: e.target.value })}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="to">To account</Label>
            <Input id="to" value={form.to_account} onChange={(e) => setForm({ ...form, to_account: e.target.value })} />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="post_balance">Post balance</Label>
            <Input
              id="post_balance"
              type="number"
              inputMode="decimal"
              value={form.post_balance}
              onChange={(e) => setForm({ ...form, post_balance: Number(e.target.value) })}
            />
          </div>

          <div className="grid gap-1">
            <Label>Account type</Label>
            <Select
              value={form.account_type}
              onValueChange={(v) => setForm({ ...form, account_type: v as AccountType })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
