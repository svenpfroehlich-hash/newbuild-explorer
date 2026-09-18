import { useState } from "react";
import { MapPin } from "lucide-react";

export function ConsentMap({ query }: { query: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <div className="flex h-[440px] w-full flex-col items-center justify-center gap-4 bg-secondary/50 px-6 text-center">
        <MapPin className="size-8 text-brass" strokeWidth={1.5} />
        <p className="max-w-sm text-sm text-muted-foreground">
          Beim Laden der Karte wird eine Verbindung zu Google-Servern hergestellt und Ihre
          IP-Adresse an Google übermittelt.
        </p>
        <button
          onClick={() => setLoaded(true)}
          className="border border-brass bg-brass px-5 py-2.5 text-sm text-primary-foreground hover:bg-brass/90"
        >
          Karte laden
        </button>
      </div>
    );
  }

  return (
    <iframe
      title="Lage Rems Living"
      src={`https://www.google.com/maps?q=${query}&z=15&output=embed`}
      className="h-[440px] w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
