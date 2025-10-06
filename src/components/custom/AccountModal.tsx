import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Account, AccountType } from "@/lib/mock-data";

type FormState = Omit<Account, "id">;

export function AccountModal({
    open,
    onOpenChange,
    initialValues,
    onSave,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    initialValues?: Account;
    onSave: (data: FormState) => void;
}) {
    const [form, setForm] = React.useState<FormState>({
        name: initialValues?.name || "",
        balance: !isNaN(Number(initialValues?.balance))
            ? Number(initialValues?.balance)
            : 0,
        account_type: initialValues?.account_type || "bank",
        bank_name: initialValues?.bank_name || "",
        last_four: initialValues?.last_four || "",
        is_active: initialValues?.is_active ?? true,
        currency: initialValues?.currency || "INR",
    });

    React.useEffect(() => {
        if (!open) return;
        setForm({
            name: initialValues?.name || "",
            balance: !isNaN(Number(initialValues?.balance))
                ? Number(initialValues?.balance)
                : 0,
            account_type: initialValues?.account_type || "bank",
            bank_name: initialValues?.bank_name || "",
            last_four: initialValues?.last_four || "",
            is_active: initialValues?.is_active ?? true,
            currency: initialValues?.currency || "INR",
        });
    }, [open, initialValues]);

    function handleSave() {
        onSave(form);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle className="text-balance">
                        {initialValues ? "Edit account" : "Add account"}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Account name</Label>
                        <Input
                            id="name"
                            value={form.name}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, name: e.target.value }))
                            }
                            placeholder="Savings Account"
                            required={true}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="balance">Balance</Label>
                        <Input
                            id="balance"
                            // type="number"
                            inputMode="decimal"
                            value={form.balance ?? ""}
                            disabled={initialValues?.isEditing}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    balance: e.target.value
                                        ? parseFloat(e.target.value)
                                        : 0,
                                }))
                            }
                            placeholder="0.00"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Account type</Label>
                        <Select
                            required
                            value={form.account_type}
                            onValueChange={(v: AccountType) =>
                                setForm((f) => ({ ...f, account_type: v }))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bank">Bank</SelectItem>
                                <SelectItem value="card">Card</SelectItem>
                                <SelectItem value="investment">
                                    Investment
                                </SelectItem>
                                <SelectItem value="savings">Savings</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="bank_name">Bank/Provider</Label>
                            <Input
                                required
                                id="bank_name"
                                value={form.bank_name}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        bank_name: e.target.value,
                                    }))
                                }
                                placeholder="SBI_BANK"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="last4">Last four</Label>
                            <Input
                                id="last4"
                                value={form.last_four}
                                type="number"
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        last_four: e.target.value.slice(0, 4),
                                    }))
                                }
                                placeholder="3002"
                                maxLength={4}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-md border border-border p-3">
                            <div className="space-y-0.5">
                                <Label htmlFor="active">Active</Label>
                                <p className="text-sm text-muted-foreground">
                                    Mark account as active/inactive
                                </p>
                            </div>
                            <Switch
                                id="active"
                                checked={form.is_active}
                                onCheckedChange={(v) =>
                                    setForm((f) => ({ ...f, is_active: v }))
                                }
                            />
                        </div>
                    </>

                    <div className="grid gap-2">
                        <Label>Currency</Label>
                        <Select
                            value={form.currency}
                            onValueChange={(v: string) =>
                                setForm((f) => ({ ...f, currency: v }))
                            }
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="INR">INR</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
