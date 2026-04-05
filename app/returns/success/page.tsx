"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Card } from "@/components/Card";

function SuccessBody() {
  const sp = useSearchParams();
  const ref = sp.get("ref") ?? "—";

  return (
    <div className="mx-auto max-w-lg space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-[var(--ink)]">Return submitted</h1>
      <Card>
        <p className="text-sm text-[var(--ink-soft)]">Reference number</p>
        <p className="mt-1 font-mono text-xl font-semibold text-[var(--brand)]">{ref}</p>
        <p className="mt-4 text-sm text-[var(--ink-soft)]">
          In production, an acknowledgement would be sent via SMS/email (notification service). Audit log
          records who submitted what and when.
        </p>
      </Card>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-dark)]"
        >
          Back to dashboard
        </Link>
        <Link href="/returns" className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-semibold">
          File another return
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center text-sm text-[var(--muted)]">Loading…</p>}>
      <SuccessBody />
    </Suspense>
  );
}
