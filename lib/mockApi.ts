import {
  MOCK_RESELLERS,
  MOCK_DESTINATIONS,
  parseSerialInput,
  serialInAllocationRange,
} from "./mockData";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function mockFetchSerialsByRange(start: string, end: string) {
  await delay(450);
  let a: bigint;
  let b: bigint;
  try {
    a = BigInt(start.trim());
    b = BigInt(end.trim());
  } catch {
    return { ok: false as const, error: "Invalid serial range." };
  }
  if (b < a) return { ok: false as const, error: "End serial must be ≥ start serial." };
  if (b - a > BigInt(99)) return { ok: false as const, error: "Range too large for this step (max 100)." };
  const serials: string[] = [];
  for (let x = a; x <= b; x++) {
    if (!serialInAllocationRange(x)) {
      return {
        ok: false as const,
        error: "One or more serials are not allocated to your dealer account.",
      };
    }
    serials.push(x.toString());
  }
  return { ok: true as const, serials };
}

export async function mockValidateReseller(resellerId: string) {
  await delay(400);
  const found = MOCK_RESELLERS.find((r) => r.id === resellerId.trim());
  return { exists: !!found, reseller: found };
}

export async function mockValidateNationalId(nationalId: string) {
  await delay(500);
  const digits = nationalId.replace(/\D/g, "");
  if (digits.length < 5) return { valid: false as const, message: "Enter a valid ID number." };
  return { valid: true as const, message: "ID verified (IPRS mock)." };
}

export async function mockFetchDestinations() {
  await delay(300);
  return [...MOCK_DESTINATIONS];
}

export async function mockValidateSerialsInput(text: string) {
  await delay(350);
  let serials: bigint[];
  try {
    serials = parseSerialInput(text);
  } catch {
    return { ok: false as const, error: "Invalid serial format." };
  }
  if (serials.length === 0) return { ok: false as const, error: "Enter at least one serial." };
  for (const s of serials) {
    if (!serialInAllocationRange(s)) {
      return { ok: false as const, error: "Serial not allocated to your account." };
    }
  }
  return { ok: true as const, serials: serials.map((x) => x.toString()) };
}

export async function mockSubmitReturn(payload: Record<string, unknown>) {
  await delay(600);
  const ref = `RTC-${Date.now().toString(36).toUpperCase()}`;
  return { ok: true as const, reference: ref, payload };
}
