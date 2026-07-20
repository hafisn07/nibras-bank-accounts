import Link from "next/link";
import { NavBar } from "@nibras/ui";
import { nav } from "@/lib/nav";
import { accounts, availableCurrent, monthDelta, totalBalance } from "@/lib/accounts";
const nf = new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const aed = (n: number) =>
  "AED " + nf.format(n);

const gradients = ["linear-gradient(135deg,#0B7A57,#064E37)", "linear-gradient(135deg,#0EA271,#0B7A57)"];

export default function AccountsPage() {
  return (
    <>
      <NavBar links={nav} current="/accounts" />
      <main className="nb-canvas">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-8 md:py-[34px] md:pb-[46px]">
          <h1 className="text-[28px] font-semibold tracking-[-.025em]">Accounts</h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-[16px] border border-hair bg-white p-[20px_22px] shadow-[0_2px_8px_-2px_rgba(5,46,27,.08)]">
              <div className="text-[12px] font-medium text-muted">Total balance</div>
              <div className="mt-2 font-mono text-[24px] font-semibold tracking-[-.02em] tabular-nums">{aed(totalBalance)}</div>
              <div className="mt-2.5 inline-flex items-center gap-[5px] rounded-full bg-[rgba(5,150,105,.09)] px-[9px] py-[3px] font-mono text-[11px] font-medium text-brand-strong">
                ↑ +{aed(monthDelta)}
              </div>
            </div>
            <div className="rounded-[16px] border border-hair bg-white p-[20px_22px] shadow-[0_2px_8px_-2px_rgba(5,46,27,.08)]">
              <div className="text-[12px] font-medium text-muted">Available (Current)</div>
              <div className="mt-2 font-mono text-[24px] font-semibold tracking-[-.02em] tabular-nums">{aed(availableCurrent)}</div>
              <div className="mt-2.5 text-[11.5px] text-faint">Ready to spend</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {accounts.map((a, i) => (
              <Link
                key={a.id}
                href={`/accounts/${a.id}`}
                className="flex items-center gap-4 rounded-[16px] border border-hair bg-white px-[22px] py-[18px] shadow-[0_2px_8px_-2px_rgba(5,46,27,.08)] transition-[border-color,box-shadow] hover:border-[#059669] hover:shadow-[0_6px_16px_-6px_rgba(5,102,73,.28)]"
              >
                <div
                  className="flex size-11 flex-none items-center justify-center rounded-[12px] text-[17px] font-semibold text-white"
                  style={{ background: gradients[i % gradients.length] }}
                >
                  {a.type[0]}
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-semibold">{a.name}</div>
                  <div className="mt-0.5 font-mono text-[12px] text-faint">
                    {a.type} · {a.number}
                  </div>
                </div>
                <div className="text-right font-mono text-[17px] font-semibold tabular-nums">{aed(a.balance)}</div>
                <span className="ml-1 text-[18px] text-brand">→</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
