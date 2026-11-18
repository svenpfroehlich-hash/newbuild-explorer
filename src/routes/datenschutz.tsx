import { createFileRoute } from "@tanstack/react-router";
import { CookieSettingsLink } from "@/components/CookieConsent";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [{ title: "Datenschutzerklärung — Rems Living" }, { name: "robots", content: "noindex" }],
  }),
  component: Datenschutz,
});

function Datenschutz() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">Rechtliches</p>
      <h1 className="mt-3 font-display text-4xl">Datenschutzerklärung</h1>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground">
        <section>
          <h2 className="font-display text-xl">1. Verantwortlicher</h2>
          <p className="mt-2">
            Convision Project B8 GmbH
            <br />
            Böhmerwaldstraße 8, 73527 Schwäbisch Gmünd
            <br />
            E-Mail: info@convision-project.de
            <br />
            Telefon: +49 172 71 29 300
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">2. Hosting</h2>
          <p className="mt-2 text-muted-foreground">
            Diese Website wird bei Netlify, Inc. gehostet. Beim Aufruf der Seite verarbeitet
            Netlify automatisch technische Zugriffsdaten (u. a. IP-Adresse, Datum und Uhrzeit
            des Zugriffs, aufgerufene Seite, verwendeter Browser) in sogenannten Server-Logfiles.
            Diese Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einem
            sicheren und funktionsfähigen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">3. Kontakt- und Exposé-Anfragen</h2>
          <p className="mt-2 text-muted-foreground">
            Wenn Sie unser Kontaktformular oder das Formular zur Anforderung des Exposés nutzen,
            verarbeiten wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, ggf.
            Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage. Die Formulare werden über
            Netlify Forms verarbeitet und übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
            DSGVO (Anbahnung eines Vertrags) bzw. lit. f DSGVO (berechtigtes Interesse an der
            Beantwortung Ihrer Anfrage). Ihre Daten werden gelöscht, sobald sie für die
            Bearbeitung Ihrer Anfrage nicht mehr erforderlich sind.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">4. Google Maps</h2>
          <p className="mt-2 text-muted-foreground">
            Auf der Seite „Lage" binden wir eine Kartenansicht von Google Maps ein. Diese wird
            erst nach Ihrer aktiven Bestätigung geladen. Wird die Karte geladen, überträgt Ihr
            Browser eine Verbindung zu Servern der Google Ireland Limited (bzw. Google LLC, USA)
            und Ihre IP-Adresse wird an Google übermittelt. Rechtsgrundlage ist Ihre Einwilligung
            (Art. 6 Abs. 1 lit. a DSGVO), die Sie durch den Klick auf „Karte laden" erteilen und
            jederzeit widerrufen können, indem Sie die Seite neu laden und die Karte nicht
            erneut aktivieren. Weitere Informationen: Google-Datenschutzerklärung unter{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-brass underline"
            >
              policies.google.com/privacy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">5. Meta-Pixel und Anzeigen auf Facebook und Instagram</h2>
          <p className="mt-2 text-muted-foreground">
            Sofern Sie im Cookie-Banner einwilligen, setzen wir das Meta-Pixel der Meta Platforms
            Ireland Limited ein. Es erfasst, wie Sie mit unserer Website interagieren (z. B.
            aufgerufene Seiten, Absenden eines Formulars) und übermittelt diese Daten zusammen mit
            Ihrer IP-Adresse und Browserkennungen an Meta, damit wir Anzeigen auf Facebook und
            Instagram messen und verbessern können. Dabei können Daten auch in Drittländer
            übermittelt werden. Insoweit sind wir und Meta gemeinsam Verantwortliche (Art. 26
            DSGVO). Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1
            TDDDG). Ohne Ihre Einwilligung wird das Pixel nicht geladen. Sie können Ihre Einwilligung
            jederzeit mit Wirkung für die Zukunft widerrufen: <CookieSettingsLink />. Weitere
            Informationen: Datenschutzerklärung von Meta unter{" "}
            <a
              href="https://www.facebook.com/privacy/policy"
              target="_blank"
              rel="noreferrer"
              className="text-brass underline"
            >
              facebook.com/privacy/policy
            </a>
            .
          </p>
          <p className="mt-2 text-muted-foreground">
            Wenn Sie über eine Anzeige auf Facebook oder Instagram direkt ein Formular von Meta
            ausfüllen (Lead-Formular), werden die dort eingegebenen Daten (z. B. Kontaktdaten,
            Angaben zu Ihrem Interesse) von Meta erhoben und uns zur Bearbeitung Ihrer Anfrage
            übermittelt. Für die Datenerhebung durch Meta gilt dessen Datenschutzerklärung.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">6. Live-Besucheranzeige auf Wohnungsseiten</h2>
          <p className="mt-2 text-muted-foreground">
            Auf den Detailseiten einzelner Wohnungen zeigen wir an, wenn sich weitere Personen
            gleichzeitig dieselbe Seite ansehen. Dafür wird in Ihrem Browser eine zufällig
            erzeugte, anonyme Sitzungskennung (keine Cookie-ID, kein Personenbezug) erzeugt und
            für die Dauer Ihres Seitenbesuchs an unseren Server übermittelt. Es werden keine
            IP-Adressen oder sonstigen personenbezogenen Daten gespeichert; die Kennung wird
            automatisch nach spätestens 45 Sekunden Inaktivität gelöscht. Rechtsgrundlage ist
            unser berechtigtes Interesse an einer transparenten, wahrheitsgemäßen Darstellung
            der Nachfrage (Art. 6 Abs. 1 lit. f DSGVO).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">7. Ihre Rechte</h2>
          <p className="mt-2 text-muted-foreground">
            Sie haben das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten
            sowie auf Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
            und Widerspruch gegen die Verarbeitung. Zudem haben Sie das Recht, sich bei einer
            Datenschutzaufsichtsbehörde zu beschweren. Wenden Sie sich hierzu gerne an die oben
            genannte Kontaktadresse.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl">8. Stand</h2>
          <p className="mt-2 text-muted-foreground">
            Diese Datenschutzerklärung wird bei Bedarf aktualisiert. Stand: November 2026.
          </p>
        </section>
      </div>
    </div>
  );
}
