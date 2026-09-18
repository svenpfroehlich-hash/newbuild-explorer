import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [{ title: "Impressum — Rems Living" }, { name: "robots", content: "noindex" }],
  }),
  component: Impressum,
});

// ⚠️ PLATZHALTER: Die mit [ ... ] markierten Angaben sind noch nicht final.
// Vor dem echten Go-Live müssen sie durch die tatsächlichen Firmendaten
// ersetzt werden (HRB-Nummer, Geschäftsführer, USt-IdNr.). Ohne korrekte
// Angaben ist diese Seite NICHT rechtssicher nutzbar.
function Impressum() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">Rechtliches</p>
      <h1 className="mt-3 font-display text-4xl">Impressum</h1>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground">
        <section>
          <h2 className="font-display text-xl">Angaben gemäß § 5 TMG</h2>
          <p className="mt-2">
            Convision Project B8 GmbH
            <br />
            Böhmerwaldstraße 8
            <br />
            73527 Schwäbisch Gmünd
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">Vertreten durch</h2>
          <p className="mt-2 border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            [Platzhalter: Name des/der Geschäftsführer(s) einfügen]
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">Handelsregister</h2>
          <p className="mt-2 border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            [Platzhalter: Registergericht und HRB-Nummer einfügen]
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">Umsatzsteuer-ID</h2>
          <p className="mt-2 border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            [Platzhalter: USt-IdNr. gemäß § 27a UStG einfügen, falls vorhanden]
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">Kontakt</h2>
          <p className="mt-2">
            Telefon: +49 172 71 29 300
            <br />
            E-Mail: info@convision-project.de
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p className="mt-2 border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
            [Platzhalter: Name und Anschrift der inhaltlich verantwortlichen Person]
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">Haftung für Inhalte</h2>
          <p className="mt-2 text-muted-foreground">
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">Haftung für Links</h2>
          <p className="mt-2 text-muted-foreground">
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
            keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
            Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
            Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
        </section>
      </div>
    </div>
  );
}
