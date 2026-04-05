"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { MOCK_RESELLERS } from "@/lib/mockData";
import {
  mockFetchSerialsByRange,
  mockValidateReseller,
  mockValidateNationalId,
  mockFetchDestinations,
  mockSubmitReturn,
} from "@/lib/mockApi";

const STEPS = [
  "Serial range",
  "Reseller",
  "Identity (IPRS)",
  "Destination",
  "Return period",
  "Review",
] as const;

export function BatchReturnForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [startSerial, setStartSerial] = useState("894000000000000");
  const [endSerial, setEndSerial] = useState("894000000000005");
  const [serials, setSerials] = useState<string[]>([]);

  const [resellerId, setResellerId] = useState("");
  const [resellerOk, setResellerOk] = useState(false);

  const [nationalId, setNationalId] = useState("");
  const [iprsOk, setIprsOk] = useState(false);

  const [destinationCode, setDestinationCode] = useState("");
  const [location, setLocation] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [onboardingPerson, setOnboardingPerson] = useState("");
  const [destinations, setDestinations] = useState<{ code: string; label: string }[]>([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function handleFetchSerials() {
    setError(null);
    setBusy(true);
    const res = await mockFetchSerialsByRange(startSerial, endSerial);
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setSerials(res.serials);
    setStep(1);
  }

  async function handleValidateReseller() {
    setError(null);
    setBusy(true);
    const res = await mockValidateReseller(resellerId);
    setBusy(false);
    if (!res.exists) {
      setError("Reseller ID not found or not linked to your account.");
      setResellerOk(false);
      return;
    }
    setResellerOk(true);
    setStep(2);
  }

  async function handleIprs() {
    setError(null);
    setBusy(true);
    const res = await mockValidateNationalId(nationalId);
    setBusy(false);
    if (!res.valid) {
      setError(res.message);
      setIprsOk(false);
      return;
    }
    setIprsOk(true);
    setBusy(true);
    const d = await mockFetchDestinations();
    setDestinations(d);
    setBusy(false);
    if (d.length) setDestinationCode(d[0].code);
    setStep(3);
  }

  function nextFromDestination() {
    if (!destinationCode || !location.trim() || !contactPerson.trim()) {
      setError("Complete destination, location, and contact person.");
      return;
    }
    setError(null);
    setStep(4);
  }

  function nextFromDates() {
    if (!startDate || !endDate) {
      setError("Select return start and end dates.");
      return;
    }
    setError(null);
    setStep(5);
  }

  async function handleSubmit() {
    setError(null);
    setBusy(true);
    const res = await mockSubmitReturn({
      mode: "batch",
      serials,
      resellerId,
      nationalId,
      destinationCode,
      location,
      contactPerson,
      onboardingPerson,
      returnStartDate: startDate,
      returnEndDate: endDate,
    });
    setBusy(false);
    if (res.ok) {
      router.push(`/returns/success?ref=${encodeURIComponent(res.reference)}`);
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ink)]">Batch SIM return</h1>
          <p className="text-sm text-[var(--ink-soft)]">Prototype wizard — static mock APIs only.</p>
        </div>
        <Link href="/returns" className="text-sm text-[var(--brand)] hover:underline">
          ← Change method
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {STEPS.map((label, i) => (
          <Badge key={label} tone={i === step ? "success" : i < step ? "neutral" : "neutral"}>
            {i + 1}. {label}
          </Badge>
        ))}
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">{error}</p>
      ) : null}

      {step === 0 && (
        <Card title="1. Fetch serials by start & end range">
          <p className="mb-4 text-sm text-[var(--ink-soft)]">
            Valid prototype range: 894000000000000 — 894000000000099 (allocated to you). Max 100 serials per
            request.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="text-[var(--muted)]">Start serial</span>
              <input
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 font-mono text-sm"
                value={startSerial}
                onChange={(e) => setStartSerial(e.target.value)}
              />
            </label>
            <label className="block text-sm">
              <span className="text-[var(--muted)]">End serial</span>
              <input
                className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 font-mono text-sm"
                value={endSerial}
                onChange={(e) => setEndSerial(e.target.value)}
              />
            </label>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={handleFetchSerials}
            className="mt-4 rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {busy ? "Validating…" : "Fetch & validate serials"}
          </button>
        </Card>
      )}

      {step === 1 && (
        <Card title="2. Validate reseller">
          <p className="mb-4 text-sm text-[var(--ink-soft)]">
            Pick a reseller linked to your dealer (mock list). Try{" "}
            <code className="rounded bg-zinc-100 px-1">{MOCK_RESELLERS[0].id}</code>.
          </p>
          <label className="block text-sm">
            <span className="text-[var(--muted)]">Reseller ID</span>
            <input
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 font-mono text-sm"
              value={resellerId}
              onChange={(e) => setResellerId(e.target.value)}
              placeholder="RS-1001"
            />
          </label>
          <p className="mt-2 text-xs text-[var(--muted)]">
            Selected serials: <span className="font-mono font-medium">{serials.length}</span>
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" className="rounded-lg border px-4 py-2 text-sm" onClick={() => setStep(0)}>
              Back
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={handleValidateReseller}
              className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {busy ? "Checking…" : "Validate reseller"}
            </button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card title="3. Reseller identity (IPRS mock)">
          <p className="mb-4 text-sm text-[var(--ink-soft)]">
            Backend invokes IPRS to verify the national ID. Enter any ID with ≥5 digits for a pass in this
            prototype.
          </p>
          <label className="block text-sm">
            <span className="text-[var(--muted)]">National ID</span>
            <input
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 font-mono text-sm"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="12345678"
            />
          </label>
          {resellerOk ? <p className="mt-2 text-xs text-emerald-700">Reseller validated.</p> : null}
          <div className="mt-4 flex gap-2">
            <button type="button" className="rounded-lg border px-4 py-2 text-sm" onClick={() => setStep(1)}>
              Back
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={handleIprs}
              className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {busy ? "Verifying…" : "Verify ID & load destinations"}
            </button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card title="4. Destination & contacts">
          <p className="mb-4 text-sm text-[var(--ink-soft)]">
            ms-destinations-return supplies destinations; you add location, contact, and onboarding person.
          </p>
          <label className="mb-3 block text-sm">
            <span className="text-[var(--muted)]">Destination</span>
            <select
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              value={destinationCode}
              onChange={(e) => setDestinationCode(e.target.value)}
            >
              {destinations.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.label} ({d.code})
                </option>
              ))}
            </select>
          </label>
          <label className="mb-3 block text-sm">
            <span className="text-[var(--muted)]">Physical location</span>
            <input
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Sarit Centre, Shop 12"
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
          <label className="mb-3 block text-sm">
            <span className="text-[var(--muted)]">Onboarding person</span>
            <input
              className="mt-1 w-full rounded-lg border border-[var(--border)] px-3 py-2 text-sm"
              value={onboardingPerson}
              onChange={(e) => setOnboardingPerson(e.target.value)}
            />
          </label>
          {iprsOk ? <p className="text-xs text-emerald-700">ID verified (mock).</p> : null}
          <div className="mt-4 flex gap-2">
            <button type="button" className="rounded-lg border px-4 py-2 text-sm" onClick={() => setStep(2)}>
              Back
            </button>
            <button
              type="button"
              onClick={nextFromDestination}
              className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white"
            >
              Continue
            </button>
          </div>
        </Card>
      )}

      {step === 4 && (
        <Card title="5. Return period">
          <p className="mb-4 text-sm text-[var(--ink-soft)]">
            Capture return start and end dates for cluster/sub-regional mapping in the full solution.
          </p>
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
          <div className="mt-4 flex gap-2">
            <button type="button" className="rounded-lg border px-4 py-2 text-sm" onClick={() => setStep(3)}>
              Back
            </button>
            <button
              type="button"
              onClick={nextFromDates}
              className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white"
            >
              Review
            </button>
          </div>
        </Card>
      )}

      {step === 5 && (
        <Card title="6. Review & submit">
          <ul className="space-y-2 text-sm">
            <li>
              <span className="text-[var(--muted)]">Serials:</span>{" "}
              <span className="font-mono">{serials.length} items</span> ({serials[0]} … {serials[serials.length - 1]})
            </li>
            <li>
              <span className="text-[var(--muted)]">Reseller:</span> {resellerId}
            </li>
            <li>
              <span className="text-[var(--muted)]">Destination:</span> {destinationCode}
            </li>
            <li>
              <span className="text-[var(--muted)]">Location:</span> {location}
            </li>
            <li>
              <span className="text-[var(--muted)]">Period:</span> {startDate} → {endDate}
            </li>
          </ul>
          <div className="mt-4 flex gap-2">
            <button type="button" className="rounded-lg border px-4 py-2 text-sm" onClick={() => setStep(4)}>
              Back
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={handleSubmit}
              className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {busy ? "Submitting…" : "Submit return"}
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
