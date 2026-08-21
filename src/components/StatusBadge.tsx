import type { Unit } from "@/data/units";

const config: Record<Unit["status"], { label: string; dot: string; text: string }> = {
  frei: { label: "Frei", dot: "bg-emerald-500", text: "text-emerald-700" },
  reserviert: { label: "Reserviert", dot: "bg-amber-500", text: "text-amber-700" },
  verkauft: { label: "Verkauft", dot: "bg-rose-500", text: "text-rose-700" },
};

export function StatusBadge({ status, className = "" }: { status: Unit["status"]; className?: string }) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${c.text} ${className}`}>
      <span className={`size-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
