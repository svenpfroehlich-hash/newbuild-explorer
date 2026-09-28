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

function encodeFormData(data: Record<string, string>) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

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
          name="kontakt"
          method="POST"
          data-netlify="true"
          className="border border-border bg-card p-6 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setError(false);
            const form = e.currentTarget;
            const formData = new FormData(form);
            const payload: Record<string, string> = { "form-name": "kontakt" };
            formData.forEach((value, key) => {
              payload[key] = String(value);
            });
            fetch("/", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: encodeFormData(payload),
            })
              .then(() => setSent(true))
              .catch(() => setError(true))
              .finally(() => setSending(false));
          }}
        >
          <input type="hidden" name="form-name" value="kontakt" />
          <p className="hidden">
            <label>
              Nicht ausfüllen: <input name="bot-field" />
            </label>
          </p>
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
                <input name="name" required className="mt-2 w-full border border-input bg-background px-3 py-2.5" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">E-Mail</span>
                <input name="email" required type="email" className="mt-2 w-full border border-input bg-background px-3 py-2.5" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Telefon</span>
                <input name="telefon" className="mt-2 w-full border border-input bg-background px-3 py-2.5" />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Ich interessiere mich als</span>
                <select name="interessent_typ" className="mt-2 w-full border border-input bg-background px-3 py-2.5">
                  <option>Kapitalanleger</option>
                  <option>Eigennutzer</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Wunschwohnung</span>
                <select name="wunschwohnung" className="mt-2 w-full border border-input bg-background px-3 py-2.5">
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
                <textarea name="nachricht" rows={4} className="mt-2 w-full border border-input bg-background px-3 py-2.5" />
              </label>
              <button
                type="submit"
                disabled={sending}
                className="w-full border border-brass bg-brass px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {sending ? "Wird gesendet …" : "Anfrage senden"}
              </button>
              {error && (
                <p className="text-xs text-red-600">
                  Da ist leider etwas schiefgelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.
                </p>
              )}
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
