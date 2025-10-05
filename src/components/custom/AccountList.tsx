import * as React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccountCard } from "./AccountCard"
import { AccountModal } from "./AccountModal"
import type { Account } from "@/lib/mock-data"
import axios from "axios"
import ConfigContext from "@/context/ConfigContext"
import AuthContext from "@/context/AuthContext"
import { toast } from "sonner"
import AccountsEmpty from "@/placeholders/AccountsEmpty"

export function AccountList() {
  const [accounts, setAccounts] = React.useState<Account[]>([])
  const [open, setOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<Account | undefined>(undefined)
  const config = React.useContext(ConfigContext);
  const auth = React.useContext(AuthContext);


  React.useEffect(() => {
    axios.get(`${config?.apiUrl}/accounts`, {
        headers: {
            Authorization: `Bearer ${auth?.user?.token}`
        }
    }).then((res) => {
        setAccounts(res.data.data);
        toast.success("Accounts fetched successfully");
    }).catch(() => {
        toast.error("Failed to fetch accounts");
    })
  }, [auth?.user?.token, config?.apiUrl]);


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
        axios.put(`${config?.apiUrl}/accounts`, editing, {
            headers: {
                Authorization: `Bearer ${auth?.user?.token}`
            }
        }).then((res) => {
            setAccounts((list) => list.map((a) => (a.id === editing.id ? res.data.data : a)));
            toast.success("Account updated successfully");
        }).catch(() => {
            toast.error("Failed to update account");
        })

      setAccounts((list) => list.map((a) => (a.id === editing.id ? ({ ...editing, ...data } as Account) : a)))
    } else {
      axios.post(`${config?.apiUrl}/accounts`, data, {
        headers: {  
            Authorization: `Bearer ${auth?.user?.token}`
        }
      }).then((res) => {
        setAccounts((list) => [...list, res.data.data]);
        toast.success("Account added successfully");
      }).catch(() => {
        toast.error("Failed to add account");
      }
      )
    }
  }

  return (
    <div className="relative">
      <div role="list" className="grid gap-3 pb-20">
        {accounts?.length > 0 ? accounts.map((acc) => (
          <AccountCard key={acc.id} account={acc} onEdit={handleEdit} />
        )) : (
          <AccountsEmpty />
        )}
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
