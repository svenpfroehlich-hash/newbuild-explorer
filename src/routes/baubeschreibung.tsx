import { createFileRoute } from "@tanstack/react-router";
import { project } from "@/data/project";
import { media } from "@/data/media";

export const Route = createFileRoute("/baubeschreibung")({
  head: () => ({
    meta: [
      { title: "Baubeschreibung & Ausstattung — Rems Living" },
      {
        name: "description",
        content:
          "Massivbauweise, KfW-40-QNG, Fußbodenheizung, dreifach verglaste Fenster, Einbauküche inklusive: die Baubeschreibung von Rems Living im Detail.",
      },
      { property: "og:title", content: "Baubeschreibung & Ausstattung — Rems Living" },
      { property: "og:description", content: "Konstruktion, Technik und Ausstattung im Überblick." },
    ],
  }),
  component: BaubeschreibungPage,
});

const sections = [
  {
    title: "Konstruktion & Rohbau",
    items: [
      "Massivbauweise mit hochwertigem Mauerwerk und Stahlbetondecken",
      "Wärmebrückenoptimierte Gebäudehülle nach KfW-40-QNG-Standard",
      "Deckenhöhe 2,63 m in allen Wohnräumen",
      "Trittschall- und Schallschutz nach erhöhten Anforderungen",
      "Tiefgarage bzw. Kellergeschoss mit Abstellraum je Wohnung (im Preis enthalten)",
    ],
  },
  {
    title: "Fenster, Türen & Sonnenschutz",
    items: [
      "Dreifach verglaste Kunststofffenster mit Wärmeschutzverglasung",
      "Elektrische Rollläden in allen Wohn- und Schlafräumen",
      "Einbruchhemmende Haustüre mit Sicherheitsbeschlag",
      "Wohnungseingangstüren mit Sicherheitsausstattung",
    ],
  },
  {
    title: "Heizung, Technik & Nachhaltigkeit",
    items: [
      "Fußbodenheizung in allen Räumen, raumweise regelbar",
      "Effiziente Wärmeerzeugung passend zum KfW-40-QNG-Standard",
      "Kontrollierte Wohnraumbelüftung mit Wärmerückgewinnung",
      "Vorrüstung für Elektromobilität an den Stellplätzen",
      "QNG-Nachhaltigkeitszertifizierung als Basis für KfW-Förderkredite (150.000 € je Einheit)",
    ],
  },
  {
    title: "Böden & Oberflächen",
    items: [
      "Hochwertige Bodenbeläge in Wohn- und Schlafräumen",
      "Großformatige Feinsteinzeugfliesen in Bad und Flur",
      "Wände und Decken in Q3-Qualität, weiß gestrichen",
    ],
  },
  {
    title: "Bad & Sanitär",
    items: [
      "Bodengleiche Dusche mit Glasabtrennung",
      "Markenkeramik in Weiß, wandhängendes WC mit Unterputz-Spülkasten",
      "Verchromte Einhebelmischer, Handtuchheizkörper",
      "Ausgewählte Einheiten mit zweitem Bad bzw. Gäste-WC",
    ],
  },
  {
    title: "Küche & Elektro",
    items: [
      "Moderne Einbauküche mit Markengeräten bereits im Kaufpreis enthalten",
      "Ausreichende Steckdosen- und Medienanschlüsse je Raum",
      "Anschluss für Glasfaser/schnelles Internet",
      "Video- bzw. Gegensprechanlage an der Hauseingangstüre",
    ],
  },
  {
    title: "Außenanlagen & Gemeinschaft",
    items: [
      "Aufzug in jedem Haus, barrierefreie Erschließung",
      "Balkon, Terrasse, Loggia oder Dachterrasse je Wohnung",
      "Kinderspielplatz und begrünte Gemeinschaftsflächen",
      "Überdachte Fahrradstellplätze innen und außen",
      "Optional Tiefgaragen- oder Außenstellplatz",
    ],
  },
];

export function BaubeschreibungPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Baubeschreibung</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl">Qualität, die man nicht sieht</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Zusammenfassung der wesentlichen Ausstattungsmerkmale. Maßgeblich für Umfang und Ausführung sind der
        notarielle Bauträgervertrag sowie die dazugehörige Baubeschreibung.
      </p>

      <img
        src={media.exterior[5]!.src}
        alt="Ansicht West des Neubauprojekts"
        className="mt-10 w-full border border-border bg-white"
        loading="lazy"
      />

      <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-2xl">{s.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {s.items.map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brass" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-16 border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-2xl">Kellergeschoss & Stellplätze</h2>
        <img src={media.basement} alt="Grundriss Kellergeschoss und Tiefgarage" className="mt-5 w-full bg-white" loading="lazy" />
      </div>

      <p className="mt-10 text-xs text-muted-foreground">{project.disclaimer}</p>
    </div>
  );
}