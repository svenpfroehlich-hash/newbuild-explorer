import renderHero from "@/assets/render-hero.jpg.asset.json";
import render2 from "@/assets/render-2.jpg.asset.json";
import render3 from "@/assets/render-3.jpg.asset.json";
import render4 from "@/assets/render-4.jpg.asset.json";
import render5 from "@/assets/render-5.jpg.asset.json";
import ansichtWest from "@/assets/ansicht-west.jpg.asset.json";
import hall from "@/assets/hall.jpg.asset.json";
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

export const media = {
  hero: renderHero.url,
  exterior: [
    { src: renderHero.url, title: "Gesamtansicht", text: "Drei Häuser mit klarer Architektur und begrünten Freiflächen." },
    { src: render2.url, title: "Straßenansicht", text: "Ruhige Lage in der Böhmerwaldstraße 8." },
    { src: render3.url, title: "Innenhof", text: "Gemeinschaftsflächen mit Kinderspielplatz." },
    { src: render4.url, title: "Balkone & Loggien", text: "Jede Wohnung mit privatem Außenbereich." },
    { src: render5.url, title: "Abendstimmung", text: "Warmes Licht, hochwertige Materialien." },
    { src: ansichtWest.url, title: "Ansicht West", text: "Architektenzeichnung der Westfassade." },
    { src: hall.url, title: "Eingangsbereich", text: "Barrierefreier Zugang, Aufzug in jedem Haus." },
  ],
  interior: [
    { src: visWohnen, title: "Wohnen & Essen", text: "Offener Wohn-Ess-Bereich, Eichenparkett, 2,63 m Deckenhöhe, Fußbodenheizung." },
    { src: visKueche, title: "Einbauküche inklusive", text: "Moderne Küche mit Markengeräten — bereits im Kaufpreis enthalten." },
    { src: visBad, title: "Badezimmer", text: "Großformatige Feinsteinzeugfliesen, bodengleiche Dusche, hochwertige Armaturen." },
    { src: visBalkon, title: "Balkon", text: "Privater Balkon in den Obergeschossen — Süd- und Westausrichtung." },
    { src: visTerrasse, title: "Terrasse & Dachterrasse", text: "Erdgeschoss mit Gartenanteil, Dachgeschoss mit großzügiger Dachterrasse." },
  ],
  location: {
    map: lageKarte.url,
    stuttgart: stuttgart.url,
    city: [gmuend1.url, gmuend2.url, gmuend3.url, gmuend4.url],
  },
  basement: planUg.url,
};