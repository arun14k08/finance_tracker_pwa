export type AccountType = "bank" | "card" | "investment" | "savings" | "cash";

export type Account = {
    id: string;
    name: string;
    balance: number;
    account_type: AccountType;
    bank_name?: string;
    last_four?: string;
    is_active: boolean;
    currency: string;
    isEditing?: boolean;
    is_default_account?: boolean;
};

export const mockAccounts: Account[] = [
    {
        id: "acc_1",
        name: "Savings Account",
        balance: 15320.25,
        account_type: "savings",
        bank_name: "SBI_BANK",
        last_four: "3002",
        is_active: true,
        currency: "INR",
    },
    {
        id: "acc_2",
        name: "Everyday Card",
        balance: -422.8,
        account_type: "card",
        bank_name: "HDFC",
        last_four: "1123",
        is_active: true,
        currency: "INR",
    },
    {
        id: "acc_3",
        name: "Brokerage",
        balance: 79500,
        account_type: "investment",
        bank_name: "ZERODHA",
        last_four: "9044",
        is_active: true,
        currency: "INR",
    },
];

// Transactions are already implemented in app/transactions using these types
export type TransactionType = "credit" | "debit";

export type Transaction = {
    id: string;
    amount: number;
    type: TransactionType;
    description: string;
    category: string;
    status: "pending" | "completed" | "failed";
    from_account?: string;
    to_account?: string;
    post_balance: number;
    account_type: AccountType;
};

export const mockTransactions: Transaction[] = [
    {
        id: "txn_1",
        amount: 2500,
        type: "credit",
        description: "Salary",
        category: "Income",
        status: "completed",
        from_account: "Company Payroll",
        to_account: "Savings Account",
        post_balance: 17820.25,
        account_type: "savings",
    },
    {
        id: "txn_2",
        amount: 799,
        type: "debit",
        description: "Groceries",
        category: "Food",
        status: "completed",
        from_account: "Everyday Card",
        to_account: "Store",
        post_balance: -1221.8,
        account_type: "card",
    },
    {
        id: "txn_3",
        amount: 5000,
        type: "debit",
        description: "Stock Purchase",
        category: "Investing",
        status: "pending",
        from_account: "Brokerage",
        to_account: "Market",
        post_balance: 74500,
        account_type: "investment",
    },
];
