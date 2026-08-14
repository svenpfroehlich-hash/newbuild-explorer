import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { project } from "@/data/project";

const nav = [
  { to: "/wohnungen", label: "Wohnungen" },
  { to: "/rechner", label: "Rechner" },
  { to: "/visualisierungen", label: "Visualisierungen" },
  { to: "/baubeschreibung", label: "Baubeschreibung" },
  { to: "/lage", label: "Lage" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-tight">{project.name}</span>
          <span className="eyebrow mt-1 text-[10px]">Schwäbisch Gmünd</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={project.contact.phoneHref}
            className="flex items-center gap-2 border border-brass px-4 py-2 text-sm text-brass transition-colors hover:bg-brass hover:text-primary-foreground"
          >
            <Phone className="size-3.5" />
            Beratung
          </a>
        </nav>

        <button
          type="button"
          aria-label="Menü"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 pb-5 pt-3 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground"
              activeProps={{ className: "block py-2 text-sm text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}