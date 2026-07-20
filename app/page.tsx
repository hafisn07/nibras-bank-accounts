import Link from "next/link";
import { Badge, NavBar } from "@nibras/ui";
import { nav } from "@/lib/nav";

export default function AccountsRoot() {
  return (
    <>
      <NavBar links={nav} />
      <main className="mx-auto max-w-2xl px-6 py-16">
        <Badge>Accounts squad · standalone</Badge>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Accounts zone</h1>
        <p className="mt-2 text-neutral-500">
          This repo (<code>nibras-bank-accounts</code>) runs standalone on <code>:3001</code> and is
          mounted at <code>/accounts</code> under the bank&apos;s domain via Multi-Zones. The nav and
          components come from the shared <code>@nibras/ui</code> package.
        </p>
        <Link
          href="/accounts"
          className="mt-6 inline-flex h-10 items-center rounded-lg bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700"
        >
          View accounts →
        </Link>
      </main>
    </>
  );
}
