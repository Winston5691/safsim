export const MOCK_DEALER = {
  id: "JS-001",
  name: "John Smith",
  email: "john.smith@dealer.com",
  region: "Nairobi",
  cluster: "Westlands",
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
export const ALLOCATED_SERIAL_MIN = 894_000_000_000_000n;
export const ALLOCATED_SERIAL_MAX = 894_000_000_000_099n;

export const MOCK_EMAILS = [
  { id: "EML-001", recipient: "dealer@safaricom.co.ke", subject: "Monthly Performance Report", date: "2024-04-01 08:00", status: "Opened" },
  { id: "EML-002", recipient: "manager@dealer.com", subject: "Security Alert: New Login Detected", date: "2024-04-02 11:20", status: "Delivered" },
  { id: "EML-003", recipient: "support@dealer.com", subject: "Inquiry Response: RT-10922", date: "2024-04-04 16:45", status: "Delivered" },
];

export const MOCK_SMS = [
  { id: "SMS-001", recipient: "+254712345678", message: "Your SIM return RET-2024-001 has been approved.", date: "2024-04-01 10:30", status: "Delivered" },
  { id: "SMS-002", recipient: "+254788776655", message: "Reminder: Please submit your monthly SIM return by 5th.", date: "2024-04-03 14:15", status: "Sent" },
  { id: "SMS-003", recipient: "+254700112233", message: "Validation successful for Serial 894000...", date: "2024-04-05 09:00", status: "Delivered" },
];

export function parseSerialInput(raw: string): bigint[] {
  const s = raw.replace(/\s+/g, "").trim();
  if (!s) return [];
  if (s.includes("-") || s.includes(":")) {
    const [a, b] = s.split(/[-:]/).map((x) => x.trim());
    const start = BigInt(a);
    const end = BigInt(b);
    if (end < start || end - start > BigInt(500)) return [];
    const out: bigint[] = [];
    for (let x = start; x <= end; x++) out.push(x);
    return out;
  }
  return [BigInt(s)];
}

export function serialInAllocationRange(serial: bigint): boolean {
  return serial >= ALLOCATED_SERIAL_MIN && serial <= ALLOCATED_SERIAL_MAX;
}
