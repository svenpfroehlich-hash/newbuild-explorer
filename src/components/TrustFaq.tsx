import { useState } from "react";
import { ShieldCheck, HardHat, ChevronDown } from "lucide-react";
import { project } from "@/data/project";

const faqs = [
  {
    q: "Welche Nebenkosten kommen beim Kauf hinzu?",
    a: "Neben dem Kaufpreis fallen die üblichen Erwerbsnebenkosten an: Grunderwerbsteuer (in Baden-Württemberg 5,0 %), Notar- und Grundbuchkosten (ca. 1,5–2 %) sowie ggf. eine Maklerprovision, sofern Sie über einen Makler kaufen. Bei einem Direktkauf vom Bauträger entfällt die Maklerprovision.",
  },
  {
    q: "Wann ist der Fertigstellungstermin?",
    a: `Baubeginn ist ${project.facts.buildYear}, die Wohnungen sind ${project.facts.ready}. Verbindliche Zwischentermine und der genaue Übergabezeitpunkt Ihrer Einheit werden im notariellen Bauträgervertrag festgehalten.`,
  },
  {
    q: "Wie läuft die Finanzierung ab?",
    a: "Nach Reservierung Ihrer Wunscheinheit erhalten Sie eine detaillierte Kostenaufstellung für Ihre Bank. Zinsgünstige KfW-Förderkredite von 150.000 € pro Einheit sind bei diesem Projekt möglich. Nutzen Sie gerne unseren Renditerechner für eine erste Einschätzung, ein persönliches Beratungsgespräch ersetzt das aber nicht.",
  },
  {
    q: "Sind Stellplätze im Preis enthalten?",
    a: "Kellerabteile sind bei allen Einheiten inklusive. Außenstellplätze und Tiefgaragenstellplätze sind optional gegen Aufpreis erhältlich — sprechen Sie uns bei Interesse an.",
  },
  {
    q: "Was bedeutet die Sonder-AfA konkret für mich?",
    a: "Bei Kapitalanlegern lässt sich ein Teil der Anschaffungskosten über die Sonder-Abschreibung nach § 7b EStG jährlich zusätzlich steuerlich geltend machen — bis zu 10 % pro Jahr, abhängig von Ihrer individuellen steuerlichen Situation. Bitte lassen Sie sich hierzu von Ihrem Steuerberater beraten, dies stellt keine Steuerberatung dar.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      </button>
      {open && <p className="pb-4 text-sm text-muted-foreground">{a}</p>}
    </div>
  );
}

export function TrustFaq() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Sicherheit</p>
          <h2 className="mt-3 font-display text-3xl">Ihr Kauf ist abgesichert</h2>

          <div className="mt-6 flex gap-4 border border-border bg-card p-5 shadow-soft">
            <ShieldCheck className="size-6 shrink-0 text-brass" strokeWidth={1.5} />
            <div>
              <p className="font-medium">Notarieller Bauträgervertrag nach MaBV</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Der Kaufvertrag wird notariell nach der Makler- und Bauträgerverordnung geschlossen.
                Zahlungen erfolgen ausschließlich nach Baufortschritt gemäß den gesetzlich festgelegten
                Raten — Ihr Kapital ist während der gesamten Bauzeit abgesichert.
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-4 border border-border bg-card p-5 shadow-soft">
            <HardHat className="size-6 shrink-0 text-brass" strokeWidth={1.5} />
            <div>
              <p className="font-medium">Baufortschritt</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Stand {project.facts.buildYear}: Planung abgeschlossen, Vertriebsstart läuft.
                Bezugsfertig {project.facts.ready}. Aktuelle Baustellenfotos stellen wir Ihnen auf Anfrage
                gerne zur Verfügung.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="mt-3 font-display text-3xl">Gut zu wissen</h2>
          <div className="mt-6 border-t border-border">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
