import { createServerFn } from "@tanstack/react-start";
import { units as baseUnits, type Unit } from "@/data/units";

// Einfacher gemeinsamer Zugangscode fürs Verwaltungsportal. Das ist bewusst
// simpel gehalten (kein Nutzerkonto pro Person) — für den internen Gebrauch
// durch den Eigentümer/Vertrieb ausreichend, aber KEIN Ersatz für echte
// Benutzerkonten, falls mehrere Personen mit unterschiedlichen Rechten
// zugreifen sollen sollen. Der Code lässt sich hier jederzeit ändern.
const ADMIN_PASSCODE = "RemsLiving2027";

async function getStatusStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "unit-status", consistency: "strong" });
}

type StatusOverrides = Record<number, Unit["status"]>;

async function readOverrides(): Promise<StatusOverrides> {
  try {
    const store = await getStatusStore();
    const raw = await store.get("overrides", { type: "json" }).catch(() => null);
    return raw && typeof raw === "object" ? (raw as StatusOverrides) : {};
  } catch {
    return {};
  }
}

export const checkAdminPasscode = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { passcode: string })
  .handler(async ({ data }) => {
    return { ok: data.passcode === ADMIN_PASSCODE };
  });

export const getEffectiveUnits = createServerFn({ method: "GET" }).handler(async () => {
  const overrides = await readOverrides();
  if (Object.keys(overrides).length === 0) return baseUnits;
  return baseUnits.map((u) => (overrides[u.nr] ? { ...u, status: overrides[u.nr]! } : u));
});

export const setUnitStatus = createServerFn({ method: "POST" })
  .validator(
    (data: unknown) =>
      data as { passcode: string; nr: number; status: "frei" | "reserviert" | "verkauft" },
  )
  .handler(async ({ data }) => {
    if (data.passcode !== ADMIN_PASSCODE) {
      throw new Error("Falscher Zugangscode");
    }
    const store = await getStatusStore();
    const overrides = await readOverrides();
    overrides[data.nr] = data.status;
    await store.setJSON("overrides", overrides);
    return { ok: true };
  });
