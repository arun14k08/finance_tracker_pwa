import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountCard } from "./AccountCard";
import { AccountModal } from "./AccountModal";
import type { Account } from "@/lib/mock-data";
import axios from "axios";
import ConfigContext from "@/context/ConfigContext";
import AuthContext from "@/context/AuthContext";
import { toast } from "sonner";
import AccountsEmpty from "@/placeholders/AccountsEmpty";
// import CacheContext from "@/context/LocalCacheContext";

export function AccountList() {
  const config = React.useContext(ConfigContext);
  const auth = React.useContext(AuthContext);
  // const cacheContext = React.useContext(CacheContext);

  const [accounts, setAccounts] = React.useState<Account[]>(
    // cacheContext?.cache?.accounts || [] // ✅ Initialize from cache
    []
  );
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Account | undefined>(undefined);

  // Fetch from API if no cache available or on mount
  React.useEffect(() => {
    if (accounts.length > 0) return; // ✅ Already have cached data

    axios
      .get(`${config?.apiUrl}/accounts`, {
        headers: { Authorization: `Bearer ${auth?.user?.token}` },
      })
      .then((res) => {
        setAccounts(res.data.data);
        // cacheContext?.setCache((prev) => ({
        //   ...prev,
        //   accounts: res.data.data,
        // }));
        // toast.success("Accounts fetched successfully");
      })
      .catch(() => {
        toast.error("Failed to fetch accounts");
      });
  }, [auth?.user?.token, config?.apiUrl]);

  function handleAdd() {
    setEditing(undefined);
    setOpen(true);
  }

  function handleEdit(acc: Account) {
    acc.isEditing = true;
    setEditing(acc);
    setOpen(true);
  }

  function handleSave(data: Omit<Account, "id">) {
    if (editing) {
      // Update API
      axios
        .put(`${config?.apiUrl}/accounts`, { ...editing, ...data }, {
          headers: { Authorization: `Bearer ${auth?.user?.token}` },
        })
        .then((res) => {
          setAccounts((list) =>
            list.map((a) => (a.id === editing.id ? res.data.data : a))
          );

          // ✅ Update cache
          // cacheContext?.setCache((prev) => ({
          //   ...prev,
          //   accounts: prev?.accounts.map((a) =>
          //     a.id === editing.id ? res.data.data : a
          //   ) || [],
          // }));

          toast.success("Account updated successfully");
        })
        .catch(() => {
          toast.error("Failed to update account");
        });
    } else {
      // Create API
      axios
        .post(`${config?.apiUrl}/accounts`, data, {
          headers: { Authorization: `Bearer ${auth?.user?.token}` },
        })
        .then((res) => {
          const responseAccount = res.data.data;
          // if list in empty just set res.data.data else set both
          if (accounts === null || accounts === undefined || accounts?.length === 0) {
            setAccounts([responseAccount]);
          } else {
            setAccounts((list) => [...list, responseAccount]);
          }

          // ✅ Update cache
          // cacheContext?.setCache((prev) => ({
          //   ...prev,
          //   accounts: [...(prev?.accounts || []), res.data.data],
          // }));

          toast.success("Account added successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response?.data?.message || "Failed to add account");
        });
    }
  }

  return (
    <div className="relative">
      <div role="list" className="grid gap-3 pb-20">
        {accounts?.length > 0 ? (
          accounts.map((acc) => (
            <AccountCard key={acc.id} account={acc} onEdit={handleEdit} />
          ))
        ) : (
          <AccountsEmpty />
        )}
      </div>

      <AccountModal
        open={open}
        onOpenChange={setOpen}
        initialValues={editing}
        onSave={handleSave}
      />

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
  );
}
