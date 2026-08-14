import { createFileRoute } from "@tanstack/react-router";
import { employers, microLocation, project } from "@/data/project";
import { media } from "@/data/media";

export const Route = createFileRoute("/lage")({
  head: () => ({
    meta: [
      { title: "Mikro- & Makrolage Schwäbisch Gmünd — Rems Living" },
      {
        name: "description",
        content:
          "Böhmerwaldstraße 8: Nahversorgung, Schulen und Bus im direkten Umfeld, B29 und die Arbeitgeber der Region Stuttgart/Aalen in kurzer Distanz.",
      },
      { property: "og:title", content: "Mikro- & Makrolage — Rems Living Schwäbisch Gmünd" },
      { property: "og:description", content: "Ruhig wohnen, schnell überall sein." },
      { property: "og:image", content: media.location.map },
      { name: "twitter:image", content: media.location.map },
    ],
  }),
  component: LagePage,
});

const distances = [
  { label: "B29 Auffahrt", value: "5 Min." },
  { label: "Innenstadt Schwäbisch Gmünd", value: "8 Min." },
  { label: "Bahnhof Schwäbisch Gmünd", value: "10 Min." },
  { label: "Aalen", value: "25 Min." },
  { label: "Stuttgart", value: "50 Min." },
  { label: "Flughafen Stuttgart", value: "60 Min." },
];

function LagePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Mikro- & Makrolage</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Ruhig wohnen, schnell überall</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        {project.street}, {project.city} — eingebettet in eine gewachsene, ruhige Nachbarschaft mit
        vollständiger Nahversorgung und direkter Anbindung an die B29.
      </p>

      <img
        src={media.location.map}
        alt="Lagekarte Böhmerwaldstraße 8 in Schwäbisch Gmünd"
        className="mt-10 w-full border border-border bg-white"
        loading="lazy"
      />

      <section className="mt-16">
        <h2 className="font-display text-3xl">Mikrolage — alles zu Fuß</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {microLocation.map((m) => (
            <div key={m} className="border border-border bg-card px-5 py-4 text-sm shadow-soft">
              {m}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl">Makrolage — Distanzen</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {distances.map((d) => (
            <div key={d.label} className="border border-border bg-card p-5 shadow-soft">
              <p className="font-display text-3xl">{d.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl">Arbeitgeber in der Region</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Ein starker Arbeitsmarkt ist die Basis für stabile Mieten und Wertentwicklung.
          </p>
          <div className="mt-6 divide-y divide-border border border-border bg-card shadow-soft">
            {employers.map((e) => (
              <div key={e.name} className="flex items-baseline justify-between gap-4 px-5 py-3.5 text-sm">
                <div>
                  <p className="font-medium">{e.name}</p>
                  <p className="text-xs text-muted-foreground">{e.place}</p>
                </div>
                <p className="shrink-0 text-muted-foreground">{e.staff}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[...media.location.city, media.location.stuttgart].map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 4 ? "Region Stuttgart" : "Schwäbisch Gmünd"}
              className="aspect-4/3 w-full object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </section>
    </div>
  );
}