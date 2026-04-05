import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/returns", label: "SIM returns" },
  { href: "/monitoring", label: "Compliance view" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-[var(--surface)] text-[var(--ink)]">
      <header className="border-b border-[var(--border)] bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--brand)] text-sm font-bold text-white">
              S
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight">Dealer Portal</p>
              <p className="text-xs text-[var(--muted)]">SIM distribution returns (prototype)</p>
            </div>
          </Link>
          <nav className="flex flex-wrap gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-[var(--ink-soft)] transition hover:bg-[var(--surface)] hover:text-[var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
      <footer className="border-t border-[var(--border)] bg-white py-4 text-center text-xs text-[var(--muted)]">
        Static UI prototype — aligned with RTC Dealer SIM Distribution Returns HLD. No live APIs.
      </footer>
    </div>
  );
}
