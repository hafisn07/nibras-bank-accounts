import { accounts } from "@/lib/accounts";
const nf = new Intl.NumberFormat("en-AE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Self-contained HTML fragment embedded cross-repo by the shell.
export const revalidate = 3600;

const S = "var(--font-schibsted),system-ui,sans-serif";
const M = "var(--font-plex-mono),ui-monospace,monospace";
const fmt = (n: number) => "AED " + nf.format(n);

function bars(spec: Array<[number, string]>) {
  return spec
    .map(([h, c]) => `<span style="width:3.5px;height:${h}%;background:${c};border-radius:2px"></span>`)
    .join("");
}

function row(opts: {
  letter: string;
  grad: string;
  name: string;
  sub: string;
  spark: string;
  amount: string;
  delta: string;
  deltaColor: string;
  bg?: string;
}) {
  return `
  <div style="display:flex;align-items:center;gap:16px;padding:15px 22px;border-top:1px solid #F1F4F2;${opts.bg ? `background:${opts.bg}` : ""}">
    <div style="width:40px;height:40px;border-radius:11px;background:${opts.grad};display:flex;align-items:center;justify-content:center;font:600 15px ${S};color:#fff;flex:none">${opts.letter}</div>
    <div style="flex:1;min-width:0"><div style="font:600 14px ${S}">${opts.name}</div><div style="margin-top:2px;font:400 11.5px ${M};color:#9CA3AF">${opts.sub}</div></div>
    <span style="display:flex;align-items:flex-end;gap:2.5px;height:22px">${opts.spark}</span>
    <div style="text-align:right;width:130px"><div style="font:600 15px ${M};font-variant-numeric:tabular-nums">${opts.amount}</div><div style="margin-top:2px;font:500 10.5px ${M};color:${opts.deltaColor}">${opts.delta}</div></div>
  </div>`;
}

function fragmentHtml() {
  const cur = accounts.find((a) => a.type === "Current");
  const sav = accounts.find((a) => a.type === "Savings");
  return [
    row({
      letter: "C",
      grad: "linear-gradient(135deg,#0B7A57,#064E37)",
      name: cur?.name ?? "Everyday Current",
      sub: `Current · ${cur?.number ?? "•••• 4021"}`,
      spark: bars([[40, "#CBE7DA"], [62, "#A7D9C4"], [48, "#CBE7DA"], [80, "#6BC2A0"], [58, "#A7D9C4"], [100, "#059669"]]),
      amount: fmt(cur?.balance ?? 18452.3),
      delta: "+AED 340.10",
      deltaColor: "#047857",
    }),
    row({
      letter: "S",
      grad: "linear-gradient(135deg,#0EA271,#0B7A57)",
      name: sav?.name ?? "Rainy Day Savings",
      sub: `Savings · ${sav?.number ?? "•••• 7788"}`,
      spark: bars([[52, "#CBE7DA"], [58, "#A7D9C4"], [70, "#A7D9C4"], [66, "#6BC2A0"], [84, "#6BC2A0"], [96, "#059669"]]),
      amount: fmt(sav?.balance ?? 42500),
      delta: "+AED 2,870.30",
      deltaColor: "#047857",
    }),
    `<div style="display:flex;align-items:center;gap:16px;padding:15px 22px;border-top:1px solid #F1F4F2;background:#FAFCFB">
      <div style="width:40px;height:40px;border-radius:11px;background:linear-gradient(135deg,#334155,#1E293B);display:flex;align-items:center;justify-content:center;font:600 13px ${S};color:#fff;flex:none">P</div>
      <div style="flex:1;min-width:0"><div style="font:600 14px ${S}">Nibras Platinum</div><div style="margin-top:2px;font:400 11.5px ${M};color:#9CA3AF">Credit · •••• 4021</div></div>
      <span style="font:500 10.5px ${S};color:#6B7280;background:#EEF2EF;border-radius:999px;padding:3px 9px">−AED 6,420.50 used</span>
      <div style="text-align:right;width:130px"><div style="font:600 15px ${M};font-variant-numeric:tabular-nums;color:#047857">AED 18,579.50</div><div style="margin-top:2px;font:500 10.5px ${M};color:#9CA3AF">available</div></div>
    </div>`,
  ].join("");
}

export function GET() {
  return new Response(fragmentHtml(), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=60, stale-while-revalidate=300",
      "access-control-allow-origin": "*",
    },
  });
}
