import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";

const dealers = [
  { name: "Nairobi Central Distributors", pct: 92, status: "Submitted", late: false },
  { name: "Rift Valley Wholesale", pct: 61, status: "In progress", late: false },
  { name: "Coastline Telecom Ltd", pct: 0, status: "Not started", late: true },
  { name: "Lake Region Partners", pct: 88, status: "Submitted", late: false },
];

export default function MonitoringPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--ink)]">Compliance &amp; monitoring (prototype)</h1>
        <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
          Illustrates the ethics / fraud / partner view described in the RFP: live submission status by dealer
          and region, exceptions, and paths to Qlik Sense / PDF exports in production.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="!p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Dealers on track</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">64%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Late / at risk</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">21%</p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Submitted (period)</p>
          <p className="mt-1 text-2xl font-bold text-[var(--brand)]">1,284</p>
        </Card>
        <Card className="!p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">Validation auto-rate</p>
          <p className="mt-1 text-2xl font-bold text-[var(--ink)]">~78%</p>
        </Card>
      </div>

      <Card title="Dealer submission status (mock)">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                <th className="py-2 pr-4 font-medium">Dealer</th>
                <th className="py-2 pr-4 font-medium">Completion</th>
                <th className="py-2 pr-4 font-medium">Status</th>
                <th className="py-2 font-medium">Flags</th>
              </tr>
            </thead>
            <tbody>
              {dealers.map((d) => (
                <tr key={d.name} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-3 pr-4 font-medium">{d.name}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-zinc-100">
                        <div
                          className="h-full rounded-full bg-[var(--brand)]"
                          style={{ width: `${d.pct}%` }}
                        />
                      </div>
                      <span className="text-[var(--muted)]">{d.pct}%</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">{d.status}</td>
                  <td className="py-3">
                    {d.late ? <Badge tone="danger">Late</Badge> : <Badge tone="success">OK</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-[var(--muted)]">
          Production: fed by reporting service + Qlik Sense; audit logs immutable for regulatory traceability.
        </p>
      </Card>
    </div>
  );
}
