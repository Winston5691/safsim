import Link from "next/link";
import { Card } from "@/components/Card";

export default function ReturnsHub() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--ink)]">File SIM distribution return</h1>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          Mirrors the dealer portal flow: serial fetch/validation → reseller → IPRS check → destinations →
          return period → submit.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Batch (range)">
          <p className="mb-4 text-sm text-[var(--ink-soft)]">
            Enter start and end serial. The portal fetches and validates allocated serials (mocked GET to
            ms-dealer-serial-return).
          </p>
          <Link
            href="/returns/batch"
            className="inline-flex w-full justify-center rounded-lg bg-[var(--brand)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--brand-dark)]"
          >
            Continue with batch
          </Link>
        </Card>
        <Card title="Single serial">
          <p className="mb-4 text-sm text-[var(--ink-soft)]">
            Enter one serial or compact range in a single field; instant validation against your allocation.
          </p>
          <Link
            href="/returns/single"
            className="inline-flex w-full justify-center rounded-lg border border-[var(--border)] py-2.5 text-sm font-semibold hover:bg-[var(--surface)]"
          >
            Continue with single
          </Link>
        </Card>
      </div>
      <p className="text-center text-sm">
        <Link href="/" className="text-[var(--brand)] hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
