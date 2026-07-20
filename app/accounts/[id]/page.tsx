import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavBar } from "@nibras/ui";
import { nav } from "@/lib/nav";
import { accounts, getAccount, transactions } from "@/lib/accounts";
const nf = new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Params = { params: Promise<{ id: string }> };

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" });
const aed2 = (n: number) => nf.format(n);

export function generateStaticParams() {
  return accounts.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const account = getAccount((await params).id);
  return { title: account ? `${account.name} · Nibras Bank` : "Account · Nibras Bank" };
}

export default async function AccountDetail({ params }: Params) {
  const { id } = await params;
  const account = getAccount(id);
  if (!account) notFound();
  const txns = transactions[id] ?? [];

  return (
    <>
      <NavBar links={nav} current="/accounts" />
      <main className="nb-canvas">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-6 py-8 md:py-7 md:pb-[46px]">
          <Link href="/accounts" className="text-[13px] font-medium text-brand-mid">
            ← Accounts
          </Link>

          <div className="nb-account-hero relative flex items-center justify-between overflow-hidden rounded-[20px] p-[26px_28px] text-white">
            <div
              className="pointer-events-none absolute -right-10 -top-[70px] size-[240px] rounded-full"
              style={{ background: "repeating-radial-gradient(circle,rgba(255,255,255,.05) 0 1px,transparent 1px 18px)" }}
            />
            <div className="relative">
              <div className="text-[20px] font-semibold">{account.name}</div>
              <div className="mt-1 font-mono text-[12.5px] text-[rgba(214,240,228,.75)]">
                {account.type} · {account.number}
              </div>
            </div>
            <div className="relative text-right">
              <div className="text-[11px] text-[rgba(214,240,228,.7)]">Balance</div>
              <div className="mt-1 font-mono text-[34px] font-medium tracking-[-.02em] tabular-nums">
                AED {aed2(account.balance)}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[16px] border border-hair bg-white shadow-[0_2px_8px_-2px_rgba(5,46,27,.08)]">
            <div className="flex items-center justify-between px-[22px] pb-3 pt-4">
              <span className="text-[15px] font-semibold">Recent transactions</span>
              <span className="text-[11.5px] text-faint">July 2026</span>
            </div>
            {txns.map((t) => (
              <div key={t.id} className="flex items-center justify-between border-t border-line-soft px-[22px] py-[13px]">
                <div className="flex items-center gap-3.5">
                  <span className="w-11 flex-none font-mono text-[11.5px] font-medium text-faint">
                    {dateFmt.format(new Date(t.date))}
                  </span>
                  <span className="text-[13.5px] font-medium">{t.description}</span>
                </div>
                <span
                  className="font-mono text-[14px] font-semibold tabular-nums"
                  style={{ color: t.amount >= 0 ? "var(--color-gain)" : "var(--color-loss)" }}
                >
                  {t.amount >= 0 ? "+" : "−"}
                  {aed2(Math.abs(t.amount))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
