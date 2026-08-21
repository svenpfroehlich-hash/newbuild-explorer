import { useState } from "react";
import { Download, CheckCircle2 } from "lucide-react";

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k]!)}`)
    .join("&");
}

export function ExposeGate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "expose-anfrage", name, email }),
      });
    } catch {
      // Auch bei Netzwerkfehler geben wir den Download frei — die Anfrage ist nicht kritisch für den Nutzer.
    }
    setStatus("done");
    const a = document.createElement("a");
    a.href = "/downloads/Rems-Living-Expose.pdf";
    a.download = "Rems-Living-Expose.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  if (status === "done") {
    return (
      <div className="flex items-start gap-3 border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
        <div>
          <p className="font-medium">Ihr Exposé wird heruntergeladen.</p>
          <p className="mt-1 text-emerald-800/80">
            Falls der Download nicht startet,{" "}
            <a href="/downloads/Rems-Living-Expose.pdf" download className="underline">
              hier klicken
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card p-6 shadow-soft">
      <p className="eyebrow">Kostenloser Download</p>
      <h3 className="mt-2 font-display text-2xl">Exposé anfordern</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Alle Eckdaten, Grundrisstypen und Preise auf einen Blick — als PDF direkt in Ihr Postfach bzw.
        zum Sofort-Download.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <input
          required
          type="text"
          placeholder="Ihr Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-input bg-background px-3 py-2.5 text-sm"
        />
        <input
          required
          type="email"
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-input bg-background px-3 py-2.5 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        <Download className="size-4" strokeWidth={1.75} />
        {status === "loading" ? "Einen Moment …" : "Exposé herunterladen"}
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        Mit dem Absenden erklären Sie sich einverstanden, dass wir Sie zu Rems Living kontaktieren
        dürfen. Ihre Daten werden vertraulich behandelt.
      </p>
    </form>
  );
}
