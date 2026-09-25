import renderHero from "@/assets/render-hero.jpg.asset.json";
import lageKarte from "@/assets/lage-karte.jpg.asset.json";
import planUg from "@/assets/plan-ug.jpg.asset.json";
import gmuend1 from "@/assets/gmuend-1.jpg.asset.json";
import gmuend2 from "@/assets/gmuend-2.jpg.asset.json";
import gmuend3 from "@/assets/gmuend-3.jpg.asset.json";
import gmuend4 from "@/assets/gmuend-4.jpg.asset.json";
import stuttgart from "@/assets/stuttgart.jpg.asset.json";
import visWohnen from "@/assets/vis-wohnen.jpg";
import visBad from "@/assets/vis-bad.jpg";
import visKueche from "@/assets/vis-kueche.jpg";
import visBalkon from "@/assets/vis-balkon.jpg";
import visTerrasse from "@/assets/vis-terrasse.jpg";
import dachterrassePenthouse from "@/assets/dachterrasse-penthouse.jpg";
import haus1Front from "@/assets/haus1-frontansicht.jpg";
import haus2Front from "@/assets/haus2-frontansicht.jpg";
import haus1Rueck from "@/assets/haus1-rueckseite.jpg";
import haus2Rueck from "@/assets/haus2-rueckseite.jpg";
import haus3Rueck from "@/assets/haus3-rueckseite.jpg";
import haus2Seite from "@/assets/haus2-seitenansicht.jpg";
import haus3Seite from "@/assets/haus3-seitenansicht.jpg";
import haus1AnsichtA from "@/assets/haus1-ansicht-a.jpg";
import haus1AnsichtB from "@/assets/haus1-ansicht-b.jpg";

export const media = {
  hero: renderHero.url,
  exterior: [
    { src: haus1Front, title: "Frontansicht Haus I", text: "Klare Linien, weiße Putzfassade, private Balkone mit Glasbrüstung." },
    { src: haus2Front, title: "Frontansicht Haus II", text: "Großzügige Fensterfronten und begrünte Freiflächen." },
    { src: haus1Rueck, title: "Rückseite Haus I", text: "Balkone in allen Obergeschossen, Dachterrasse im Penthouse." },
    { src: haus2Rueck, title: "Rückseite Haus II", text: "Ruhige Gartenseite mit privaten Außenbereichen." },
    { src: haus3Rueck, title: "Rückseite Haus III", text: "Loggien und Balkone zur Grünfläche ausgerichtet." },
    { src: haus2Seite, title: "Seitenansicht Haus II", text: "Architektonisches Detail der Fassadengliederung." },
    { src: haus3Seite, title: "Seitenansicht Haus III", text: "Zurückgesetzte Balkone, ruhige Kubatur." },
    { src: haus1AnsichtA, title: "Haus I, Gesamtansicht", text: "Drei Etagen mit Balkonen und begrüntem Dach." },
    { src: haus1AnsichtB, title: "Haus I, Detailansicht", text: "Blick auf Balkone und Grünflächen." },
  ],
  interior: [
    { src: visWohnen, title: "Wohnen & Essen", text: "Offener Wohn-Ess-Bereich, Eichenparkett, 2,63 m Deckenhöhe, Fußbodenheizung." },
    { src: visKueche, title: "Einbauküche inklusive", text: "Moderne Küche mit Markengeräten — bereits im Kaufpreis enthalten." },
    { src: visBad, title: "Badezimmer", text: "Großformatige Feinsteinzeugfliesen, bodengleiche Dusche, hochwertige Armaturen." },
    { src: visBalkon, title: "Balkon", text: "Privater Balkon in den Obergeschossen — Süd- und Westausrichtung." },
    { src: visTerrasse, title: "Terrasse & Dachterrasse", text: "Erdgeschoss mit Gartenanteil, Dachgeschoss mit großzügiger Dachterrasse." },
  ],
  outdoorByType: {
    Balkon: { src: visBalkon, title: "Balkon", text: "Privater Balkon in den Obergeschossen — Süd- und Westausrichtung." },
    Terrasse: { src: visTerrasse, title: "Terrasse", text: "Erdgeschoss mit privater Terrasse und Gartenanteil." },
    Dachterrasse: { src: dachterrassePenthouse, title: "Dachterrasse", text: "Penthouse mit großzügiger Dachterrasse und Rundumblick." },
  },
  location: {
    map: lageKarte.url,
    stuttgart: stuttgart.url,
    city: [gmuend1.url, gmuend2.url, gmuend3.url, gmuend4.url],
  },
  basement: planUg.url,
};
