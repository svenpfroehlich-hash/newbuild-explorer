import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "@/components/Calculator";

export const Route = createFileRoute("/rechner")({
  head: () => ({
    meta: [
      { title: "Renditerechner mit Sonder-AfA — Rems Living" },
      {
        name: "description",
        content:
          "Berechnen Sie Rate, Rendite und Steuerersparnis für jede Wohnung in Rems Living — inklusive 10 % Sonder-AfA für Kapitalanleger.",
      },
      { property: "og:title", content: "Renditerechner mit Sonder-AfA — Rems Living" },
      {
        property: "og:description",
        content: "Einheit wählen, Zins, Tilgung und Eigenkapital anpassen — Kaufpreis wird automatisch übernommen.",
      },
    ],
  }),
  component: RechnerPage,
});

function RechnerPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Berechnungstool</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Ihre Wohnung, Ihre Zahlen</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Wählen Sie eine Einheit — der Kaufpreis wird fest übernommen. Danach Zins, Tilgung und Eigenkapital
        einstellen. Für Kapitalanleger rechnen wir Miete, AfA und Sonder-AfA (10 % in den Jahren 1–4) mit,
        für Eigennutzer die reine monatliche Belastung.
      </p>
      <div className="mt-10">
        <Calculator />
      </div>
    </div>
  );
}