import { createServerFn } from "@tanstack/react-start";

// Echter Live-Betrachter-Zähler: jede offene Wohnungsseite meldet sich per
// Heartbeat (alle ~20s). Einträge älter als 45s gelten als "nicht mehr da"
// und werden beim nächsten Aufruf automatisch entfernt. Keine erfundenen
// Zahlen — nur tatsächliche, gleichzeitig aktive Sitzungen.

const HEARTBEAT_TTL_MS = 45_000;

type ViewerEntry = { visitorId: string; lastSeen: number };

async function getStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: "unit-viewers", consistency: "strong" });
}

export const heartbeatViewer = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { unitNr: number; visitorId: string }) 
  .handler(async ({ data }) => {
    const { unitNr, visitorId } = data;
    if (!unitNr || !visitorId) return { count: 0 };

    try {
      const store = await getStore();
      const key = `unit-${unitNr}`;
      const now = Date.now();

      const raw = await store.get(key, { type: "json" }).catch(() => null);
      const entries: ViewerEntry[] = Array.isArray(raw) ? raw : [];

      const fresh = entries.filter(
        (e) => e.visitorId !== visitorId && now - e.lastSeen < HEARTBEAT_TTL_MS,
      );
      fresh.push({ visitorId, lastSeen: now });

      await store.setJSON(key, fresh);
      return { count: fresh.length };
    } catch {
      // Speicher nicht verfügbar (z. B. lokale Vorschau ohne Netlify-Kontext) —
      // dann lieber keinen Zähler zeigen statt eine falsche Zahl zu erfinden.
      return { count: 0 };
    }
  });

export const leaveViewer = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as { unitNr: number; visitorId: string })
  .handler(async ({ data }) => {
    const { unitNr, visitorId } = data;
    if (!unitNr || !visitorId) return { ok: true };
    try {
      const store = await getStore();
      const key = `unit-${unitNr}`;
      const now = Date.now();
      const raw = await store.get(key, { type: "json" }).catch(() => null);
      const entries: ViewerEntry[] = Array.isArray(raw) ? raw : [];
      const fresh = entries.filter(
        (e) => e.visitorId !== visitorId && now - e.lastSeen < HEARTBEAT_TTL_MS,
      );
      await store.setJSON(key, fresh);
    } catch {
      // ignorieren — beim nächsten Heartbeat-Zyklus läuft der Eintrag ohnehin ab
    }
    return { ok: true };
  });
