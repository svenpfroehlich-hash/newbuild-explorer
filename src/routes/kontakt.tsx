import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { project } from "@/data/project";
import { units } from "@/data/units";
import { eur } from "@/lib/finance";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt & Beratung — Rems Living Schwäbisch Gmünd" },
      {
        name: "description",
        content:
          "Persönliche Beratung zu den Neubauwohnungen in Schwäbisch Gmünd: Exposé, Preisliste und Reservierung direkt vom Bauträger.",
      },
      { property: "og:title", content: "Kontakt & Beratung — Rems Living" },
      { property: "og:description", content: "Direkt vom Bauträger, ohne Maklerprovision." },
    ],
  }),
  component: KontaktPage,
});

function KontaktPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Kontakt</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Sprechen wir über Ihre Wohnung</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="border border-border bg-card p-6 shadow-soft">
            <p className="eyebrow">Ihr Ansprechpartner</p>
            <p className="mt-3 font-display text-3xl">{project.contact.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{project.developer}</p>
            <div className="mt-5 space-y-1.5 text-sm">
              <a href={project.contact.phoneHref} className="block text-brass hover:underline">
                {project.contact.phone}
              </a>
              <a href={`mailto:${project.contact.email}`} className="block text-brass hover:underline">
                {project.contact.email}
              </a>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              {project.street}
              <br />
              {project.city}
            </p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Kauf direkt vom Bauträger — ohne Maklerprovision. Auf Wunsch erhalten Sie das vollständige
            Exposé, die aktuelle Preisliste und eine individuelle Finanzierungsrechnung.
          </p>
        </div>

        <form
          className="border border-border bg-card p-6 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="py-10 text-center">
              <p className="font-display text-3xl">Vielen Dank!</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Ihre Anfrage ist notiert. {project.contact.name} meldet sich in Kürze bei Ihnen.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm">
                <span className="text-muted-foreground">Name</span>
                <input required className="mt-2 w-full border border-input bg-background px-3 py-2.5" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">E-Mail</span>
                <input required type="email" className="mt-2 w-full border border-input bg-background px-3 py-2.5" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Telefon</span>
                <input className="mt-2 w-full border border-input bg-background px-3 py-2.5" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Ich interessiere mich als</span>
                <select className="mt-2 w-full border border-input bg-background px-3 py-2.5">
                  <option>Kapitalanleger</option>
                  <option>Eigennutzer</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Wunschwohnung</span>
                <select className="mt-2 w-full border border-input bg-background px-3 py-2.5">
                  <option>Noch offen / Beratung gewünscht</option>
                  {units.map((u) => (
                    <option key={u.nr}>
                      Wohnung {u.nr} · {u.house} · {eur(u.price)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Nachricht</span>
                <textarea rows={4} className="mt-2 w-full border border-input bg-background px-3 py-2.5" />
              </label>
              <button
                type="submit"
                className="w-full border border-brass bg-brass px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                Anfrage senden
              </button>
              <p className="text-xs text-muted-foreground">
                Ihre Angaben werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}