import { Link } from "@tanstack/react-router";
import { project } from "@/data/project";

export function SiteFooter() {
  return (
    <footer className="surface-ink mt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{project.name}</p>
          <p className="mt-2 text-sm opacity-70">
            {project.street}
            <br />
            {project.city}
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow">Ansprechpartner</p>
          <p className="mt-3">{project.contact.name}</p>
          <a href={project.contact.phoneHref} className="block opacity-80 hover:opacity-100">
            {project.contact.phone}
          </a>
          <a href={`mailto:${project.contact.email}`} className="block opacity-80 hover:opacity-100">
            {project.contact.email}
          </a>
        </div>
        <div className="text-sm">
          <p className="eyebrow">Projekt</p>
          <div className="mt-3 flex flex-col gap-1">
            <Link to="/wohnungen" className="opacity-80 hover:opacity-100">Wohnungs- & Preisliste</Link>
            <Link to="/rechner" className="opacity-80 hover:opacity-100">Renditerechner</Link>
            <Link to="/baubeschreibung" className="opacity-80 hover:opacity-100">Baubeschreibung</Link>
            <Link to="/lage" className="opacity-80 hover:opacity-100">Mikro- & Makrolage</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-white/10 px-5 py-8 text-xs opacity-55">
        <p>Ein Projekt von {project.developer}. {project.disclaimer}</p>
      </div>
    </footer>
  );
}