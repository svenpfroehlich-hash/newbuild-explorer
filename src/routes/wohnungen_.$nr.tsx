import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { units as staticUnits } from "@/data/units";
import { eur, num } from "@/lib/finance";
import { media } from "@/data/media";
import { project } from "@/data/project";
import { Calculator } from "@/components/Calculator";
import { StatusBadge } from "@/components/StatusBadge";
import { LiveViewers } from "@/components/LiveViewers";
import { MessageCircle } from "lucide-react";
import { getEffectiveUnits } from "@/lib/unit-status.server";

export const Route = createFileRoute("/wohnungen_/$nr")({
  loader: async ({ params }) => {
    const units = await getEffectiveUnits().catch(() => staticUnits);
    const unit = units.find((u) => u.slug === params.nr);
    if (!unit) throw notFound();
    return { unit, units };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Wohnung nicht gefunden — Rems Living" }, { name: "robots", content: "noindex" }] };
    }
    const u = loaderData.unit;
    const title = `Wohnung ${u.nr} · ${num(u.area)} m² · ${u.house} — Rems Living`;
    const description = `${u.type.label} mit ${u.outdoor} im ${u.floor} von ${u.house}. ${num(u.area)} m² für ${eur(u.price)} inkl. Einbauküche.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: media.hero },
        { name: "twitter:image", content: media.hero },
      ],
    };
  },
  component: UnitDetail,
  notFoundComponent: UnitNotFound,
});

function UnitNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-display text-4xl">Diese Wohnung gibt es nicht</h1>
      <Link to="/wohnungen" className="mt-6 inline-block border border-brass px-6 py-3 text-sm text-brass">
        Zur Wohnungsliste
      </Link>
    </div>
  );
}

function UnitDetail() {
  const { unit, units } = Route.useLoaderData();
  const idx = units.findIndex((u) => u.nr === unit.nr);
  const prev = units[idx - 1];
  const next = units[idx + 1];

  const similar = units
    .filter((u) => u.nr !== unit.nr && u.rooms === unit.rooms)
    .sort((a, b) => {
      // Freie Einheiten zuerst, dann nach Preisnähe zur aktuellen Wohnung sortieren.
      if (a.status !== b.status) return a.status === "frei" ? -1 : b.status === "frei" ? 1 : 0;
      return Math.abs(a.price - unit.price) - Math.abs(b.price - unit.price);
    })
    .slice(0, 3);

  const outdoorImage =
    unit.outdoor === "Terrasse" || unit.outdoor === "Dachterrasse"
      ? media.interior[4]!
      : media.interior[3]!;

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <Link to="/wohnungen" className="text-sm text-muted-foreground hover:text-foreground">
        ← Alle Wohnungen
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{unit.house} · {unit.floor} · {unit.type.label}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">Wohnung {unit.nr}</h1>
        </div>
        <div className="text-right">
          <StatusBadge status={unit.status} className="justify-end" />
          <p className="mt-2 font-display text-4xl">{eur(unit.price)}</p>
          <p className="text-sm text-muted-foreground">{eur(unit.pricePerSqm)} pro m²</p>
        </div>
      </div>

      <LiveViewers unitNr={unit.nr} />

      {unit.status !== "frei" && (
        <div className="mt-6 border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {unit.status === "reserviert"
            ? "Diese Wohnung ist aktuell reserviert. Bei Interesse tragen wir Sie gerne unverbindlich auf die Warteliste ein."
            : "Diese Wohnung ist bereits verkauft. Schauen Sie sich gerne die ähnlichen Einheiten weiter unten an."}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={`https://wa.me/${project.contact.phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
            `Hallo, ich interessiere mich für Wohnung ${unit.nr} bei Rems Living.`,
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-brass px-5 py-2.5 text-sm text-brass hover:bg-brass hover:text-primary-foreground"
        >
          <MessageCircle className="size-4" strokeWidth={1.75} />
          Per WhatsApp anfragen
        </a>
        <a
          href={project.contact.phoneHref}
          className="inline-flex items-center gap-2 border border-border px-5 py-2.5 text-sm hover:bg-secondary"
        >
          {project.contact.phone} anrufen
        </a>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-4">
        {[
          { l: "Wohnfläche", v: `${num(unit.area)} m²` },
          { l: "Zimmer", v: String(unit.rooms) },
          { l: "Außenbereich", v: unit.outdoor },
          { l: "Etage", v: unit.floor },
        ].map((s) => (
          <div key={s.l} className="border border-border bg-card p-5 shadow-soft">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className="mt-2 font-display text-2xl">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Grundriss</p>
          <img
            src={unit.type.plan}
            alt={`Grundriss Wohnung ${unit.nr}, ${unit.type.label}`}
            className="mt-4 w-full border border-border bg-white"
            loading="lazy"
          />
        </div>
        <div>
          <p className="eyebrow">Raumaufteilung</p>
          {unit.type.roomList.length > 0 ? (
            <table className="mt-4 w-full text-sm">
              <tbody>
                {unit.type.roomList.map((r) => (
                  <tr key={r.name} className="border-b border-border">
                    <td className="py-2.5">{r.name}</td>
                    <td className="py-2.5 text-right tabular-nums">
                      {num(r.area)} m²
                      {r.note && <span className="ml-2 text-xs text-muted-foreground">({r.note})</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Detaillierte Raumaufteilung entnehmen Sie dem Grundriss — gerne senden wir Ihnen die
              maßstabsgetreue Planzeichnung zu.
            </p>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[media.interior[0]!, media.interior[2]!, outdoorImage, media.interior[1]!].map((v) => (
              <figure key={v.title}>
                <img src={v.src} alt={v.title} className="aspect-4/3 w-full object-cover" loading="lazy" />
                <figcaption className="mt-2 text-xs text-muted-foreground">{v.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <p className="eyebrow">Finanzierung für diese Einheit</p>
        <h2 className="mt-3 font-display text-3xl">Rechnen Sie mit Wohnung {unit.nr}</h2>
        <div className="mt-8">
          <Calculator initialUnit={unit} compact />
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-16">
          <p className="eyebrow">{unit.status === "frei" ? "Das könnte auch passen" : "Ähnliche Wohnungen"}</p>
          <h2 className="mt-3 font-display text-3xl">Vergleichbare Einheiten</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {similar.map((s) => (
              <Link
                key={s.nr}
                to="/wohnungen/$nr"
                params={{ nr: s.slug }}
                className="block border border-border bg-card p-5 shadow-soft transition-colors hover:border-brass"
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-2xl">Wohnung {s.nr}</p>
                  <StatusBadge status={s.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.house} · {s.floor} · {s.type.label}
                </p>
                <p className="mt-3 font-medium">{eur(s.price)}</p>
                <p className="text-xs text-muted-foreground">{num(s.area)} m² · {s.outdoor}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 flex justify-between border-t border-border pt-6 text-sm">
        {prev ? (
          <Link to="/wohnungen/$nr" params={{ nr: prev.slug }} className="text-brass hover:underline">
            ← Wohnung {prev.nr}
          </Link>
        ) : <span />}
        {next ? (
          <Link to="/wohnungen/$nr" params={{ nr: next.slug }} className="text-brass hover:underline">
            Wohnung {next.nr} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
