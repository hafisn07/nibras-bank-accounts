export type Account = {
  id: string;
  name: string;
  type: "Current" | "Savings";
  number: string;
  balance: number;
};

export const accounts: Account[] = [
  { id: "current", name: "Everyday Current", type: "Current", number: "•••• 4021", balance: 18452.3 },
  { id: "savings", name: "Rainy Day Savings", type: "Savings", number: "•••• 7788", balance: 42500 },
];

export type Txn = { id: string; date: string; description: string; amount: number };

export const transactions: Record<string, Txn[]> = {
  current: [
    { id: "t1", date: "2026-07-01", description: "Salary — Meridian FZ LLC", amount: 16000 },
    { id: "t2", date: "2026-07-03", description: "Carrefour, Mall of the Emirates", amount: -243.5 },
    { id: "t3", date: "2026-07-05", description: "DEWA utilities", amount: -410 },
    { id: "t4", date: "2026-07-06", description: "Salik toll top-up", amount: -100 },
    { id: "t5", date: "2026-07-08", description: "Careem ride", amount: -32.5 },
    { id: "t6", date: "2026-07-10", description: "Talabat order", amount: -68.9 },
  ],
  savings: [
    { id: "s1", date: "2026-07-01", description: "Transfer from Current", amount: 2500 },
    { id: "s2", date: "2026-06-30", description: "Profit distribution", amount: 88.24 },
  ],
};

export function getAccount(id: string) {
  return accounts.find((a) => a.id === id);
}

export const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
export const availableCurrent = accounts.find((a) => a.type === "Current")?.balance ?? 0;
export const monthDelta = 3210.4;
