import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { media } from "@/data/media";

export const Route = createFileRoute("/visualisierungen")({
  head: () => ({
    meta: [
      { title: "Visualisierungen — Rems Living Schwäbisch Gmünd" },
      {
        name: "description",
        content:
          "Außenansichten, Wohnen, Bad, Küche, Balkon und Dachterrasse: alle Visualisierungen der Neubauwohnungen in Rems Living.",
      },
      { property: "og:title", content: "Visualisierungen — Rems Living" },
      { property: "og:description", content: "Architektur und Innenräume in Bildern." },
      { property: "og:image", content: media.hero },
      { name: "twitter:image", content: media.hero },
    ],
  }),
  component: VisPage,
});

type Tab = "aussen" | "innen";

function VisPage() {
  const [tab, setTab] = useState<Tab>("innen");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const items = tab === "innen" ? media.interior : media.exterior;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Visualisierungen</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Gehen Sie hinein</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Wohnen, Bad, Küche und die Besonderheiten Balkon, Terrasse und Dachterrasse — dazu Architektur,
        Innenhof und Eingangsbereich. Bild anklicken für die Großansicht.
      </p>

      <div className="mt-8 flex gap-2">
        {([
          ["innen", "Innenräume & Besonderheiten"],
          ["aussen", "Architektur & Außenanlagen"],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`border px-5 py-2.5 text-sm transition-colors ${
              tab === id
                ? "border-brass bg-brass text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {items.map((item) => (
          <figure key={item.title} className="group">
            <button type="button" onClick={() => setLightbox(item.src)} className="block w-full overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </button>
            <figcaption className="mt-4">
              <p className="font-display text-2xl">{item.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {lightbox && (
        <button
          type="button"
          aria-label="Großansicht schließen"
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 p-6"
        >
          <img src={lightbox} alt="Großansicht" className="max-h-full max-w-full object-contain" />
        </button>
      )}
    </div>
  );
}