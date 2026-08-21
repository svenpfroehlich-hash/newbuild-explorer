import { createFileRoute } from "@tanstack/react-router";
import {
  Car,
  TrainFront,
  Plane,
  Building2,
  ShoppingBasket,
  Pill,
  Mail,
  BusFront,
  School,
  Baby,
  Croissant,
  Dumbbell,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
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

const microIcons: Record<string, typeof ShoppingBasket> = {
  Einkaufszentrum: ShoppingBasket,
  Apotheke: Pill,
  Post: Mail,
  Bushaltestelle: BusFront,
  "Grund- & Gemeinschaftsschule": School,
  Kindergarten: Baby,
  Bäcker: Croissant,
  Fitnessstudio: Dumbbell,
};

type RouteStop = { label: string; value: string; minutes: number; mode: "car" | "train" | "plane" };

const routeStops: RouteStop[] = [
  { label: "B29 Auffahrt", value: "5 Min.", minutes: 5, mode: "car" },
  { label: "Innenstadt Schwäbisch Gmünd", value: "8 Min.", minutes: 8, mode: "car" },
  { label: "Bahnhof Schwäbisch Gmünd", value: "10 Min.", minutes: 10, mode: "train" },
  { label: "Aalen", value: "25 Min.", minutes: 25, mode: "car" },
  { label: "Stuttgart", value: "50 Min.", minutes: 50, mode: "car" },
  { label: "Flughafen Stuttgart", value: "60 Min.", minutes: 60, mode: "plane" },
];

const modeIcon: Record<RouteStop["mode"], typeof Car> = { car: Car, train: TrainFront, plane: Plane };
const maxMinutes = Math.max(...routeStops.map((s) => s.minutes));

const mapQuery = encodeURIComponent(`${project.street}, ${project.city}`);

function LagePage() {
  const topEmployerCount = Math.max(...employers.map((e) => Number(e.staff.replace(/[^\d]/g, ""))));

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="eyebrow">Mikro- & Makrolage</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] md:text-5xl">
            Ruhig wohnen, in 50&nbsp;Minuten mitten im stärksten Arbeitsmarkt Baden-Württembergs
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            {project.street}, {project.city} — eine gewachsene, ruhige Nachbarschaft mit vollständiger
            Nahversorgung vor der Tür und der B29 direkt am Ortsrand. Von hier aus sind Sie näher an
            Stuttgart, als die meisten Stuttgarter selbst.
          </p>
        </div>
        <div className="flex gap-6 border-t border-border pt-6 lg:justify-end lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <div>
            <p className="font-display text-4xl text-brass">50<span className="text-xl">′</span></p>
            <p className="mt-1 text-xs text-muted-foreground">nach Stuttgart</p>
          </div>
          <div>
            <p className="font-display text-4xl text-brass">85k<span className="text-xl">+</span></p>
            <p className="mt-1 text-xs text-muted-foreground">Jobs bei Bosch, Mercedes & Porsche</p>
          </div>
          <div>
            <p className="font-display text-4xl text-brass">5<span className="text-xl">′</span></p>
            <p className="mt-1 text-xs text-muted-foreground">bis zur B29</p>
          </div>
        </div>
      </div>

      <div className="relative mt-12 border border-border bg-card shadow-lift">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="size-4 text-brass" strokeWidth={1.75} />
            {project.street}, {project.city}
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            In Google Maps öffnen
          </a>
        </div>
        <div className="relative h-[440px] w-full grayscale-[15%] contrast-[1.05] saturate-[0.9]">
          <iframe
            title="Lage Rems Living"
            src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl">Mikrolage — alles zu Fuß</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {microLocation.map((m) => {
            const Icon = microIcons[m] ?? ShoppingBasket;
            return (
              <div
                key={m}
                className="group flex items-center gap-3 border border-border bg-card px-5 py-4 text-sm shadow-soft transition-colors hover:border-brass"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-brass transition-colors group-hover:bg-brass group-hover:text-primary-foreground">
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                {m}
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl">Makrolage — von hier aus in der Region unterwegs</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Eine Linie, sechs Ziele: von der Auffahrt vor der Tür bis zum Flughafen Stuttgart.
        </p>

        <div className="relative mt-10 hidden md:block">
          <div className="absolute inset-x-0 top-5 h-px bg-border" />
          <div
            className="absolute top-5 h-px bg-gradient-to-r from-brass to-brass-soft"
            style={{ width: `${(routeStops.at(-1)!.minutes / maxMinutes) * 100}%` }}
          />
          <div className="relative grid grid-cols-6 gap-2">
            {routeStops.map((s) => {
              const Icon = modeIcon[s.mode];
              return (
                <div key={s.label}>
                  <div className="relative mx-auto flex size-10 items-center justify-center rounded-full border-2 border-brass bg-background text-brass">
                    <Icon className="size-4" strokeWidth={1.75} />
                  </div>
                  <p className="mt-3 text-center font-display text-2xl">{s.value}</p>
                  <p className="mt-1 text-center text-xs leading-snug text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:hidden">
          {routeStops.map((s) => {
            const Icon = modeIcon[s.mode];
            return (
              <div key={s.label} className="flex items-center gap-4 border border-border bg-card p-4 shadow-soft">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-brass text-brass">
                  <Icon className="size-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-2xl">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="font-display text-3xl">Arbeitgeber in der Region</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Ein starker Arbeitsmarkt ist die Basis für stabile Mieten und Wertentwicklung.
          </p>
          <div className="mt-6 divide-y divide-border border border-border bg-card shadow-soft">
            {employers.map((e) => {
              const count = Number(e.staff.replace(/[^\d]/g, ""));
              const pct = Math.max(6, Math.round((count / topEmployerCount) * 100));
              return (
                <div key={e.name} className="px-5 py-3.5 text-sm">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="size-3.5 shrink-0 text-brass" strokeWidth={1.75} />
                      <div>
                        <p className="font-medium">{e.name}</p>
                        <p className="text-xs text-muted-foreground">{e.place}</p>
                      </div>
                    </div>
                    <p className="shrink-0 text-muted-foreground">{e.staff}</p>
                  </div>
                  <div className="mt-2 h-1 w-full bg-accent">
                    <div className="h-1 bg-brass" style={{ width: `${pct}%` }} />
                  </div>
                  {e.jobsUrl && (
                    <a
                      href={e.jobsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-brass hover:underline"
                    >
                      Offene Stellen ansehen
                      <ArrowUpRight className="size-3" strokeWidth={1.75} />
                    </a>
                  )}
                </div>
              );
            })}
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
