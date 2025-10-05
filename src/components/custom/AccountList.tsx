import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccountCard } from "./AccountCard"
import { AccountModal } from "./AccountModal"
import type { Account } from "@/lib/mock-data"
import { mockAccounts } from "@/lib/mock-data"

export function AccountList() {
  const [accounts, setAccounts] = React.useState<Account[]>(mockAccounts)
  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Account | undefined>(undefined)

  function handleAdd() {
    setEditing(undefined)
    setOpen(true)
  }

  function handleEdit(acc: Account) {
    setEditing(acc)
    setOpen(true)
  }

  function handleSave(data: Omit<Account, "id">) {
    if (editing) {
      setAccounts((list) => list.map((a) => (a.id === editing.id ? ({ ...editing, ...data } as Account) : a)))
    } else {
      const id = `acc_${Math.random().toString(36).slice(2, 8)}`
      setAccounts((list) => [{ id, ...data }, ...list])
    }
  }

  return (
    <div className="relative">
      <div role="list" className="grid gap-3 pb-20">
        {accounts.map((acc) => (
          <AccountCard key={acc.id} account={acc} onEdit={handleEdit} />
        ))}
      </div>

      <AccountModal open={open} onOpenChange={setOpen} initialValues={editing} onSave={handleSave} />

      {/* Floating Add button */}
      <div className="fixed bottom-20 right-4 z-40">
        <Button
          onClick={handleAdd}
          size="icon"
          className="h-12 w-12 rounded-full bg-brand text-white shadow-lg"
          aria-label="Add account"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
