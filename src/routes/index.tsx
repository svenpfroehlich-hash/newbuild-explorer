import { createFileRoute, Link } from "@tanstack/react-router";
import { highlights, project } from "@/data/project";
import { media } from "@/data/media";
import { units } from "@/data/units";
import { eur, num } from "@/lib/finance";
import { ExposeGate } from "@/components/ExposeGate";
import { TrustFaq } from "@/components/TrustFaq";

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
                <video className="h-[70vh] w-full object-cover" src="/video/rems-living-hero.mp4" autoPlay muted loop playsInline aria-label="Zeitraffer-Animation: Bauentstehung Rems Living, Böhmerwaldstraße 8" />
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
