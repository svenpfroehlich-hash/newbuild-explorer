import { useEffect, useState } from "react";

// Meta-Pixel-ID (Datensatz-ID aus dem Meta Events Manager) hier eintragen.
// Leer = kein Tracking und kein Banner.
export const META_PIXEL_ID = "";

const KEY = "rl-consent";

function readConsent(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

function writeConsent(v: string) {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* ignore */
  }
}

function loadPixel() {
  const w = window as any;
  if (!META_PIXEL_ID || w.fbq) return;
  const n: any = (w.fbq = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  });
  if (!w._fbq) w._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  n("init", META_PIXEL_ID);
  n("track", "PageView");
}

export function trackLead() {
  try {
    (window as any).fbq?.("track", "Lead");
  } catch {
    /* ignore */
  }
}

export function CookieSettingsLink() {
  if (!META_PIXEL_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
      className="text-brass underline"
    >
      Cookie-Einstellungen öffnen
    </button>
  );
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const v = readConsent();
    if (v === "all") loadPixel();
    else if (v === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  function choose(v: "all" | "necessary") {
    writeConsent(v);
    setOpen(false);
    if (v === "all") loadPixel();
    else if ((window as any).fbq) window.location.reload();
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-card p-4 shadow-soft sm:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Wir nutzen das Meta-Pixel (Facebook/Instagram), um zu messen, welche Anzeigen zu Anfragen
          führen. Dabei werden Daten an Meta übermittelt. Das geschieht nur mit Ihrer Einwilligung.
          Mehr dazu in der{" "}
          <a href="/datenschutz" className="underline">
            Datenschutzerklärung
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("necessary")}
            className="border border-border px-5 py-2.5 text-sm hover:bg-secondary"
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="bg-primary px-5 py-2.5 text-sm text-primary-foreground hover:bg-primary/90"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
