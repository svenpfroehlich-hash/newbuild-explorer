import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Check } from "lucide-react";
import type { Unit } from "@/data/units";
import { units as baseUnits } from "@/data/units";
import { eur } from "@/lib/finance";
import { checkAdminPasscode, getEffectiveUnits, setUnitStatus } from "@/lib/unit-status.server";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/verwaltung")({
  head: () => ({
    meta: [{ title: "Verwaltung — Rems Living" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminPage,
});

const SESSION_KEY = "rl-admin-passcode";

function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [units, setUnits] = useState<Unit[]>(baseUnits);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [savingNr, setSavingNr] = useState<number | null>(null);
  const [savedNr, setSavedNr] = useState<number | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored) {
      setPasscode(stored);
      void tryAuth(stored, true);
    }
  }, []);

  async function tryAuth(code: string, silent = false) {
    setChecking(true);
    setError("");
    try {
      const res = await checkAdminPasscode({ data: { passcode: code } });
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, code);
        setAuthed(true);
        await loadUnits();
      } else if (!silent) {
        setError("Falscher Zugangscode.");
      } else {
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch {
      if (!silent) setError("Verbindung fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setChecking(false);
    }
  }

  async function loadUnits() {
    setLoadingUnits(true);
    try {
      const fresh = await getEffectiveUnits();
      setUnits(fresh);
    } catch {
      // Fallback bleibt die statische Liste
    } finally {
      setLoadingUnits(false);
    }
  }

  async function changeStatus(nr: number, status: Unit["status"]) {
    setSavingNr(nr);
    setUnits((prev) => prev.map((u) => (u.nr === nr ? { ...u, status } : u)));
    try {
      await setUnitStatus({ data: { passcode, nr, status } });
      setSavedNr(nr);
      setTimeout(() => setSavedNr((n) => (n === nr ? null : n)), 1500);
    } catch {
      setError(`Speichern für Wohnung ${nr} fehlgeschlagen — bitte neu laden und erneut versuchen.`);
      await loadUnits();
    } finally {
      setSavingNr(null);
    }
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5">
        <div className="border border-border bg-card p-8 shadow-soft">
          <Lock className="size-6 text-brass" strokeWidth={1.5} />
          <h1 className="mt-4 font-display text-2xl">Verwaltung</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Zugangscode eingeben, um Wohnungsstatus zu bearbeiten.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void tryAuth(passcode);
            }}
            className="mt-5"
          >
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Zugangscode"
              className="w-full border border-input bg-background px-3 py-2.5 text-sm"
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
            <button
              type="submit"
              disabled={checking}
              className="mt-4 w-full bg-primary px-4 py-2.5 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {checking ? "Prüfe …" : "Anmelden"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Verwaltung</p>
          <h1 className="mt-3 font-display text-4xl">Wohnungsstatus verwalten</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Änderungen sind sofort auf der Live-Seite sichtbar — kein Deploy nötig.
          </p>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem(SESSION_KEY);
            setAuthed(false);
            setPasscode("");
          }}
          className="border border-border px-4 py-2 text-sm hover:bg-secondary"
        >
          Abmelden
        </button>
      </div>

      {error && (
        <div className="mt-6 border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </div>
      )}

      <div className="mt-8 overflow-x-auto border border-border bg-card shadow-soft">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Nr.</th>
              <th className="px-4 py-3">Haus / Lage</th>
              <th className="px-4 py-3">Typ</th>
              <th className="px-4 py-3 text-right">Preis</th>
              <th className="px-4 py-3">Aktueller Status</th>
              <th className="px-4 py-3">Ändern zu</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {units.map((u) => (
              <tr key={u.nr} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{u.nr}</td>
                <td className="px-4 py-3">{u.house} · {u.floor}</td>
                <td className="px-4 py-3">{u.type.label}</td>
                <td className="px-4 py-3 text-right tabular-nums">{eur(u.price)}</td>
                <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    {(["frei", "reserviert", "verkauft"] as const).map((s) => (
                      <button
                        key={s}
                        disabled={savingNr === u.nr || u.status === s}
                        onClick={() => changeStatus(u.nr, s)}
                        className={`border px-2.5 py-1 text-xs transition-colors ${
                          u.status === s
                            ? "cursor-default border-brass bg-brass text-primary-foreground"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        {s === "frei" ? "Frei" : s === "reserviert" ? "Reserviert" : "Verkauft"}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {savedNr === u.nr && <Check className="size-4 text-emerald-600" strokeWidth={2} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loadingUnits && <p className="mt-4 text-sm text-muted-foreground">Lade aktuellen Stand …</p>}
    </div>
  );
}
