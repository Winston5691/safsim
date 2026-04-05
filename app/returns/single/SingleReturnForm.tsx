"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { MOCK_RESELLERS } from "@/lib/mockData";
import {
  mockValidateSerialsInput,
  mockValidateReseller,
  mockValidateNationalId,
  mockFetchDestinations,
  mockSubmitReturn,
} from "@/lib/mockApi";

export function SingleReturnForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [serialInput, setSerialInput] = useState("894000000000042");
  const [serials, setSerials] = useState<string[]>([]);

  const [resellerId, setResellerId] = useState(MOCK_RESELLERS[0].id);
  const [nationalId, setNationalId] = useState("12345678");
  const [destinationCode, setDestinationCode] = useState("");
  const [location, setLocation] = useState("Westlands Mall");
  const [contactPerson, setContactPerson] = useState("Jane W.");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function handleValidateSerials() {
    setError(null);
    setBusy(true);
    const v = await mockValidateSerialsInput(serialInput);
    setBusy(false);
    if (!v.ok) {
      setError(v.error);
      setSerials([]);
      return;
    }
    setSerials(v.serials);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!serials.length) {
      setError("Validate serials first.");
      return;
    }
    setBusy(true);
    const r = await mockValidateReseller(resellerId);
    if (!r.exists) {
      setBusy(false);
      setError("Invalid reseller.");
      return;
    }
    const i = await mockValidateNationalId(nationalId);
    if (!i.valid) {
      setBusy(false);
      setError(i.message);
      return;
    }
    const d = await mockFetchDestinations();
    const dest = destinationCode || d[0]?.code;
    if (!dest || !location.trim() || !contactPerson.trim() || !startDate || !endDate) {
      setBusy(false);
      setError("Fill destination, dates, location, and contact.");
      return;
    }
    const sub = await mockSubmitReturn({
      mode: "single",
      serials,
      resellerId,
      nationalId,
      destinationCode: dest,
      location,
      contactPerson,
      returnStartDate: startDate,
      returnEndDate: endDate,
    });
    setBusy(false);
    if (sub.ok) router.push(`/returns/success?ref=${encodeURIComponent(sub.reference)}`);
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ink)]">Single serial return</h1>
          <p className="text-sm text-[var(--ink-soft)]">
            One field for an individual serial or small range (e.g. <code className="rounded bg-zinc-100 px-1">894…-894…</code>
            ).
          </p>
        </div>
        <Link href="/returns" className="shrink-0 text-sm text-[var(--brand)] hover:underline">
          ← Back
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card title="Serials">
          <label className="block text-sm">
            <span className="text-[var(--muted)]">Serial / range</span>
            <input
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 font-mono text-sm"
              value={serialInput}
              onChange={(e) => setSerialInput(e.target.value)}
            />
          </label>
          <button
            type="button"
            className="mt-3 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium"
            onClick={handleValidateSerials}
            disabled={busy}
          >
            {busy ? "Checking…" : "Validate serials"}
          </button>
          {serials.length ? (
            <p className="mt-2 text-xs text-emerald-700">
              OK — {serials.length} serial(s): {serials.join(", ")}
            </p>
          ) : null}
        </Card>

        <Card title="Reseller & identity">
          <label className="mb-3 block text-sm">
            <span className="text-[var(--muted)]">Reseller ID</span>
            <select
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              value={resellerId}
              onChange={(e) => setResellerId(e.target.value)}
            >
              {MOCK_RESELLERS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.id})
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-[var(--muted)]">National ID (IPRS)</span>
            <input
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 font-mono text-sm"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
            />
          </label>
        </Card>

        <Card title="Destination & period">
          <p className="mb-3 text-xs text-[var(--muted)]">
            Destinations load on submit in this compact flow (same mock service as batch).
          </p>
          <label className="mb-3 block text-sm">
            <span className="text-[var(--muted)]">Destination (optional preset)</span>
            <input
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              value={destinationCode}
              onChange={(e) => setDestinationCode(e.target.value)}
              placeholder="Leave empty to use first from API"
            />
          </label>
          <label className="mb-3 block text-sm">
            <span className="text-[var(--muted)]">Location</span>
            <input
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label className="mb-3 block text-sm">
            <span className="text-[var(--muted)]">Contact person</span>
            <input
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-[var(--muted)]">Return start</span>
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              <span className="text-[var(--muted)]">Return end</span>
              <input
                type="date"
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
        </Card>

        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-[var(--brand)] py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {busy ? "Submitting…" : "Submit distribution return"}
        </button>
      </form>
    </div>
  );
}
