export const MOCK_DEALER = {
  id: "DL-88421",
  name: "Nairobi Central Distributors Ltd",
  region: "Nairobi",
  cluster: "Central",
};

export const MOCK_RESELLERS = [
  { id: "RS-1001", name: "QuickTel Agents — Westlands", nationalId: "********3210" },
  { id: "RS-2044", name: "M-Pesa Shop — Eastleigh", nationalId: "********5541" },
  { id: "RS-3312", name: "Connect Hub — Karen", nationalId: "********8822" },
];

export const MOCK_DESTINATIONS = [
  { code: "DST-NRB-01", label: "Retail outlet — CBD" },
  { code: "DST-NRB-14", label: "Agent booth — Market" },
  { code: "DST-NRB-22", label: "Corporate onboarding site" },
];

/** Serials “allocated” to this dealer for prototype validation */
export const ALLOCATED_SERIAL_MIN = 894_000_000_000_000;
export const ALLOCATED_SERIAL_MAX = 894_000_000_000_099;

export function parseSerialInput(raw: string): bigint[] {
  const s = raw.replace(/\s+/g, "").trim();
  if (!s) return [];
  if (s.includes("-") || s.includes(":")) {
    const [a, b] = s.split(/[-:]/).map((x) => x.trim());
    const start = BigInt(a);
    const end = BigInt(b);
    if (end < start || end - start > 500n) return [];
    const out: bigint[] = [];
    for (let x = start; x <= end; x++) out.push(x);
    return out;
  }
  return [BigInt(s)];
}

export function serialInAllocationRange(serial: bigint): boolean {
  return serial >= BigInt(ALLOCATED_SERIAL_MIN) && serial <= BigInt(ALLOCATED_SERIAL_MAX);
}
