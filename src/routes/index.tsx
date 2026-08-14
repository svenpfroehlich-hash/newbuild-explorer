import { createFileRoute, Link } from "@tanstack/react-router";
import { highlights, project } from "@/data/project";
import { media } from "@/data/media";
import { units } from "@/data/units";
import { eur, num } from "@/lib/finance";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rems Living — Neubauwohnungen in Schwäbisch Gmünd kaufen" },
      {
        name: "description",
        content:
          "45 Eigentumswohnungen im KfW-40-QNG-Standard, ab 222.640 € inkl. Einbauküche. Preisliste, Grundrisse, Visualisierungen und Rechner mit 10 % Sonder-AfA.",
      },
      { property: "og:title", content: "Rems Living — Neubauwohnungen in Schwäbisch Gmünd" },
      {
        property: "og:description",
        content: "Direkt vom Bauträger: 45 Einheiten, KfW-40-QNG, bis zu 10 % Sonder-AfA.",
      },
      { property: "og:image", content: media.hero },
      { name: "twitter:image", content: media.hero },
    ],
  }),
  component: Home,
});

function Home() {
  const cheapest = units.reduce((a, b) => (a.price < b.price ? a : b));
  const featured = [units[11]!, units[13]!, units[26]!];

  return (
    <div>
      <section className="relative">
        <img src={media.hero} alt="Visualisierung Rems Living, Böhmerwaldstraße 8" className="h-[70vh] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end px-5 pb-14 text-white">
          <p className="eyebrow">{project.city} · {project.facts.standard}</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg opacity-85">
            {project.facts.units} Eigentumswohnungen in drei Häusern — ab {eur(cheapest.price)},
            inklusive Einbauküche und Kellerabteil.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/wohnungen" className="border border-white bg-white px-6 py-3 text-sm text-ink">
              Wohnungs- & Preisliste
            </Link>
            <Link to="/rechner" className="border border-white/70 px-6 py-3 text-sm">
              Rendite berechnen
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Einheiten", v: String(project.facts.units) },
          { l: "Sonder-AfA", v: "bis 10 %" },
          { l: "Standard", v: project.facts.standard },
          { l: "Bezug", v: project.facts.ready },
        ].map((s) => (
          <div key={s.l} className="border border-border bg-card p-6 shadow-soft">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className="mt-2 font-display text-3xl">{s.v}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <p className="eyebrow">Highlights</p>
        <h2 className="mt-3 font-display text-4xl">Warum Rems Living</h2>
        <ul className="mt-8 grid gap-x-10 gap-y-3 text-sm text-muted-foreground md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <li key={h} className="flex gap-3">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brass" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="eyebrow">Innenräume</p>
        <h2 className="mt-3 font-display text-4xl">Gehen Sie in die Wohnung</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {media.interior.slice(0, 3).map((v) => (
            <figure key={v.title}>
              <img src={v.src} alt={v.title} className="aspect-4/3 w-full object-cover" loading="lazy" />
              <figcaption className="mt-3">
                <p className="font-display text-xl">{v.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <Link to="/visualisierungen" className="mt-8 inline-block border border-brass px-6 py-3 text-sm text-brass">
          Alle Visualisierungen
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <p className="eyebrow">Ausgewählte Einheiten</p>
        <h2 className="mt-3 font-display text-4xl">Beliebte Wohnungen</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((u) => (
            <Link
              key={u.nr}
              to="/wohnungen/$nr"
              params={{ nr: u.slug }}
              className="border border-border bg-card p-6 shadow-soft transition-colors hover:border-brass"
            >
              <p className="eyebrow">{u.house} · {u.floor}</p>
              <p className="mt-3 font-display text-3xl">Wohnung {u.nr}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {u.type.label} · {num(u.area)} m² · {u.outdoor}
              </p>
              <p className="mt-4 font-display text-2xl">{eur(u.price)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="surface-ink mt-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-14">
          <div>
            <h2 className="font-display text-4xl">Persönliche Beratung</h2>
            <p className="mt-2 opacity-75">Direkt vom Bauträger — ohne Maklerprovision.</p>
          </div>
          <Link to="/kontakt" className="border border-white bg-white px-6 py-3 text-sm text-ink">
            Kontakt aufnehmen
          </Link>
        </div>
      </section>
    </div>
  );
}