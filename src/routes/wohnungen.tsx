import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { houses, units } from "@/data/units";
import { eur, num } from "@/lib/finance";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/wohnungen")({
  head: () => ({
    meta: [
      { title: "Wohnungsliste & Preisliste — Rems Living Schwäbisch Gmünd" },
      {
        name: "description",
        content:
          "Alle 45 Einheiten mit Wohnfläche, Zimmerzahl, Außenbereich und Kaufpreis. Filtern nach Haus, Zimmern und Preis.",
      },
      { property: "og:title", content: "Wohnungs- & Preisliste — Rems Living" },
      { property: "og:description", content: "45 Neubauwohnungen von 40 bis 87 m², Preise ab 222.640 €." },
    ],
  }),
  component: UnitsPage,
});

function UnitsPage() {
  const [house, setHouse] = useState<string>("alle");
  const [rooms, setRooms] = useState<string>("alle");
  const [maxPrice, setMaxPrice] = useState(540000);
  const [sort, setSort] = useState<"nr" | "price" | "area">("nr");

  const filtered = useMemo(() => {
    const list = units.filter(
      (u) =>
        (house === "alle" || u.house === house) &&
        (rooms === "alle" || String(u.rooms) === rooms) &&
        u.price <= maxPrice,
    );
    return [...list].sort((a, b) =>
      sort === "price" ? a.price - b.price : sort === "area" ? a.area - b.area : a.nr - b.nr,
    );
  }, [house, rooms, maxPrice, sort]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Wohnungsliste & Preise</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">45 Einheiten, drei Häuser</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Von der kompakten 2-Zimmer-Wohnung bis zum Penthouse mit Dachterrasse. Alle Preise inklusive
        Einbauküche und Kellerabteil, Stellplätze optional.
      </p>

      <div className="mt-10 grid gap-4 border border-border bg-card p-5 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-sm">
          <span className="text-muted-foreground">Haus</span>
          <select value={house} onChange={(e) => setHouse(e.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-2">
            <option value="alle">Alle Häuser</option>
            {houses.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Zimmer</span>
          <select value={rooms} onChange={(e) => setRooms(e.target.value)} className="mt-2 w-full border border-input bg-background px-3 py-2">
            <option value="alle">Alle</option>
            <option value="2">2 Zimmer</option>
            <option value="3">3 Zimmer</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="flex justify-between text-muted-foreground">
            <span>Preis bis</span>
            <span className="text-foreground tabular-nums">{eur(maxPrice)}</span>
          </span>
          <input
            type="range"
            min={220000}
            max={540000}
            step={5000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="mt-3 h-1 w-full appearance-none rounded-full bg-secondary accent-brass"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Sortierung</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="mt-2 w-full border border-input bg-background px-3 py-2">
            <option value="nr">Wohnungsnummer</option>
            <option value="price">Preis aufsteigend</option>
            <option value="area">Fläche aufsteigend</option>
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{filtered.length} von {units.length} Einheiten</p>

      <div className="mt-4 overflow-x-auto border border-border bg-card shadow-soft">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Nr.</th>
              <th className="px-4 py-3">Haus / Lage</th>
              <th className="px-4 py-3">Typ</th>
              <th className="px-4 py-3 text-right">Zimmer</th>
              <th className="px-4 py-3 text-right">Fläche</th>
              <th className="px-4 py-3">Außenbereich</th>
              <th className="px-4 py-3 text-right">Preis</th>
              <th className="px-4 py-3 text-right">€/m²</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.nr} className="border-t border-border tabular-nums transition-colors hover:bg-secondary/40">
                <td className="px-4 py-3 font-medium">{u.nr}</td>
                <td className="px-4 py-3">{u.house} · {u.floor}</td>
                <td className="px-4 py-3">{u.type.label}</td>
                <td className="px-4 py-3 text-right">{u.rooms}</td>
                <td className="px-4 py-3 text-right">{num(u.area)} m²</td>
                <td className="px-4 py-3">{u.outdoor}</td>
                <td className={`px-4 py-3 text-right font-medium ${u.status === "verkauft" ? "text-muted-foreground line-through" : ""}`}>
                  {eur(u.price)}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">{eur(u.pricePerSqm)}</td>
                <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                <td className="px-4 py-3 text-right">
                  <Link to="/wohnungen/$nr" params={{ nr: u.slug }} className="text-brass hover:underline">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}