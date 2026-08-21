import { useEffect, useState } from "react";
import { Phone, MessageCircle, CalendarClock } from "lucide-react";
import { project } from "@/data/project";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappHref = `https://wa.me/${project.contact.phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
    "Hallo, ich interessiere mich für Rems Living und hätte gerne mehr Informationen.",
  )}`;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="hidden sm:block">
          <p className="text-sm font-medium">Interesse an Rems Living?</p>
          <p className="text-xs text-muted-foreground">Wir beraten Sie unverbindlich.</p>
        </div>
        <div className="flex flex-1 gap-2 sm:flex-none">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 border border-border px-4 py-2.5 text-sm hover:bg-secondary sm:flex-none"
          >
            <MessageCircle className="size-4" strokeWidth={1.75} />
            <span className="hidden md:inline">WhatsApp</span>
          </a>
          <a
            href={project.contact.phoneHref}
            className="inline-flex flex-1 items-center justify-center gap-2 border border-border px-4 py-2.5 text-sm hover:bg-secondary sm:flex-none"
          >
            <Phone className="size-4" strokeWidth={1.75} />
            <span className="hidden md:inline">Anrufen</span>
          </a>
          <a
            href="/kontakt"
            className="inline-flex flex-1 items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm text-primary-foreground hover:bg-primary/90 sm:flex-none"
          >
            <CalendarClock className="size-4" strokeWidth={1.75} />
            Beratungstermin
          </a>
        </div>
      </div>
    </div>
  );
}
