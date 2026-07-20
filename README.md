# nibras-bank-accounts

The **Accounts** micro-frontend — **the Accounts squad's own repo**. A standalone Next.js 16 app that
owns `/accounts/*` and is composed into the Nibras Bank shell via **Multi-Zones**.

> **Nibras Bank is a fictional bank** for a developer demo — not a real institution, not affiliated
> with anyone.

**▶ Live:** [nibras-bank-shell.vercel.app/accounts](https://nibras-bank-shell.vercel.app/accounts) (composed in the shell) · standalone: [nibras-bank-accounts.vercel.app](https://nibras-bank-accounts.vercel.app)

Part of the mesh: **[nibras-bank-shell](https://github.com/hafisn07/nibras-bank-shell)** ·
**nibras-bank-accounts** (this) · **[nibras-bank-payments](https://github.com/hafisn07/nibras-bank-payments)** ·
**[nibras-bank-cards](https://github.com/hafisn07/nibras-bank-cards)** ·
**[nibras-bank-ui](https://github.com/hafisn07/nibras-bank-ui)** (shared `@nibras/ui`).

## Run standalone

```bash
npm install      # also pulls @nibras/ui from GitHub
npm run dev      # http://localhost:3001
```

Under the shell it appears at `http://localhost:3000/accounts`. It also exposes `/fragment`, a
balance-summary the shell embeds on its dashboard (a remote component across repos).

## How it fits

Owns `/accounts/*`; sets `assetPrefix: "/accounts-static"`. Depends on `@nibras/ui`
(`github:hafisn07/nibras-bank-ui`, kept current by Renovate). Deploys independently of every other
zone — the Accounts squad ships on its own schedule.
