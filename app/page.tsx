import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { MOCK_DEALER } from "@/lib/mockData";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)] md:text-3xl">
            Welcome back, {MOCK_DEALER.name}
          </h1>
          <p className="mt-1 max-w-2xl text-[var(--ink-soft)]">
            File SIM distribution returns with real-time serial validation, authorized reseller selection,
            and destination capture — as described in the RTC high-level design.
          </p>
        </div>
        <Badge tone="warning">Monthly deadline: 5th of each month</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Dealer profile">
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--muted)]">Dealer ID</dt>
              <dd className="font-mono font-medium">{MOCK_DEALER.id}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--muted)]">Cluster</dt>
              <dd>{MOCK_DEALER.cluster}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-[var(--muted)]">Region</dt>
              <dd>{MOCK_DEALER.region}</dd>
            </div>
          </dl>
        </Card>
        <Card title="This period (mock)">
          <p className="text-3xl font-bold text-[var(--brand)]">72%</p>
          <p className="text-sm text-[var(--muted)]">Returns filed vs. expected volume (illustrative).</p>
        </Card>
        <Card title="Reminders">
          <ul className="list-inside list-disc space-y-1 text-sm text-[var(--ink-soft)]">
            <li>3 days before deadline — email &amp; SMS (configurable)</li>
            <li>On deadline — final reminder</li>
          </ul>
        </Card>
      </div>

      <Card title="Start a return">
        <p className="mb-4 text-sm text-[var(--ink-soft)]">
          Choose how you want to enter SIM serials: as a batch range (GET serials by start/end) or as a
          single serial. Validation runs before submission.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/returns/batch"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[var(--brand-dark)]"
          >
            Submit as a batch
          </Link>
          <Link
            href="/returns/single"
            className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--surface)]"
          >
            Submit a single serial
          </Link>
          <Link
            href="/monitoring"
            className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-[var(--brand)] hover:underline"
          >
            Open compliance view →
          </Link>
        </div>
      </Card>

      <Card title="Design references">
        <p className="text-sm text-[var(--ink-soft)]">
          Figma flows (batch vs. single) and the Confluence HLD informed this prototype. Figma:{" "}
          <a
            className="font-medium text-[var(--brand)] hover:underline"
            href="https://www.figma.com/design/BtzDq1EJay97CRvsW0vKEL/Dealer-returns-automation?node-id=114-38998"
            target="_blank"
            rel="noreferrer"
          >
            Dealer returns automation
          </a>
          .
        </p>
      </Card>
    </div>
  );
}
