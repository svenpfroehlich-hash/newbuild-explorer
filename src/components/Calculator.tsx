import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "@tanstack/react-router";
import { calculate, eur, num, type Mode } from "@/lib/finance";
import { units, type Unit } from "@/data/units";
import { project } from "@/data/project";

type Props = { initialUnit?: Unit; compact?: boolean };

function Field({
  label,
  value,
  suffix,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">
          {suffix === "€" ? eur(value) : `${num(value, step < 1 ? 2 : 0)} ${suffix}`}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-brass"
      />
    </label>
  );
}

export function Calculator({ initialUnit, compact }: Props) {
  const [unitNr, setUnitNr] = useState<number>(initialUnit?.nr ?? 12);
  const unit = units.find((u) => u.nr === unitNr)!;

  const [mode, setMode] = useState<Mode>("anleger");
  const [parking, setParking] = useState(0);
  const [equity, setEquity] = useState(Math.round(unit.price * 0.15));
  const [interest, setInterest] = useState(3.6);
  const [repayment, setRepayment] = useState(2);
  const [taxRate, setTaxRate] = useState(42);
  const [rentPerSqm, setRentPerSqm] = useState(13.5);
  const [buildingShare, setBuildingShare] = useState(80);
  const [sonderAfa, setSonderAfa] = useState(true);

  const result = useMemo(
    () =>
      calculate({
        price: unit.price,
        area: unit.area,
        parking,
        equity,
        interest,
        repayment,
        mode,
        taxRate,
        rentPerSqm,
        buildingShare,
        sonderAfa,
        adminCostsMonthly: 30,
        hausgeldPerSqm: 1.2 * 12,
      }),
    [unit, parking, equity, interest, repayment, mode, taxRate, rentPerSqm, buildingShare, sonderAfa],
  );

  const isInvestor = mode === "anleger";
  const isSurplus = isInvestor && result.monthlyBurden < 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
      {/* Eingaben */}
      <div className="border border-border bg-card p-6 shadow-soft">
        <div className="flex gap-2">
          {(["anleger", "eigennutzer"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 border px-4 py-2.5 text-sm transition-colors ${
                mode === m
                  ? "border-brass bg-brass text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "anleger" ? "Kapitalanleger" : "Eigennutzer"}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm text-muted-foreground">Einheit</span>
            <select
              value={unitNr}
              onChange={(e) => {
                const nr = Number(e.target.value);
                setUnitNr(nr);
                const u = units.find((x) => x.nr === nr)!;
                setEquity(Math.round(u.price * 0.15));
              }}
              className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm"
            >
              {units.map((u) => (
                <option key={u.nr} value={u.nr}>
                  Wohnung {u.nr} · {u.house} {u.floor} · {num(u.area)} m² · {eur(u.price)}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-baseline justify-between border-y border-border py-3">
            <span className="text-sm text-muted-foreground">Kaufpreis (fix aus Einheit)</span>
            <span className="font-display text-2xl">{eur(unit.price)}</span>
          </div>

          <label className="block">
            <span className="text-sm text-muted-foreground">Stellplatz</span>
            <select
              value={parking}
              onChange={(e) => setParking(Number(e.target.value))}
              className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm"
            >
              <option value={0}>Ohne Stellplatz</option>
              <option value={project.parking.outdoor}>Außenstellplatz · {eur(project.parking.outdoor)}</option>
              <option value={project.parking.garage}>Tiefgaragenplatz · {eur(project.parking.garage)}</option>
            </select>
          </label>

          <Field label="Eigenkapital" value={equity} suffix="€" min={0} max={Math.round(unit.price * 1.1)} step={1000} onChange={setEquity} />
          <Field label="Sollzins" value={interest} suffix="%" min={1} max={7} step={0.1} onChange={setInterest} />
          <Field label="Tilgung" value={repayment} suffix="%" min={1} max={6} step={0.1} onChange={setRepayment} />

          {isInvestor && (
            <>
              <Field label="Kaltmiete" value={rentPerSqm} suffix="€/m²" min={8} max={20} step={0.1} onChange={setRentPerSqm} />
              <Field label="Persönlicher Steuersatz" value={taxRate} suffix="%" min={0} max={45} step={1} onChange={setTaxRate} />
              <Field label="Gebäudeanteil (AfA-Basis)" value={buildingShare} suffix="%" min={60} max={90} step={1} onChange={setBuildingShare} />
              <label className="flex items-center gap-3 border border-border bg-secondary/50 px-4 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={sonderAfa}
                  onChange={(e) => setSonderAfa(e.target.checked)}
                  className="size-4 accent-brass"
                />
                <span>
                  Sonder-AfA nutzen — <strong>10 % in Jahr 1–4</strong>, danach 5 % linear (KfW-40-QNG)
                </span>
              </label>
            </>
          )}
        </div>
      </div>

      {/* Ergebnis */}
      <div className="space-y-5">
        <div className="surface-ink p-6">
          <p className="eyebrow">
            {isInvestor ? (isSurplus ? "Monatliche Überdeckung" : "Monatliche Unterdeckung") : "Monatliche Rate"}
          </p>
          <p className={`mt-2 font-display text-5xl ${isSurplus ? "text-brass" : ""}`}>
            {isSurplus ? "+" : ""}
            {eur(Math.abs(result.monthlyBurden))}
          </p>
          <p className="mt-2 text-sm opacity-70">
            {isInvestor
              ? isSurplus
                ? "Mieteinnahmen + Steuereffekt (Jahr 1) übersteigen Annuität + Hausgeld + Verwaltung"
                : "Annuität + Hausgeld + Verwaltung − Mieteinnahmen − Steuereffekt (Jahr 1)"
              : "Annuität inkl. Hausgeld — ohne Miete, ohne AfA"}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm">
            <div>
              <p className="opacity-60">Darlehen</p>
              <p className="mt-1 text-lg">{eur(result.loan)}</p>
            </div>
            <div>
              <p className="opacity-60">Annuität / Monat</p>
              <p className="mt-1 text-lg">{eur(result.annuity)}</p>
            </div>
            <div>
              <p className="opacity-60">Gesamtinvestition</p>
              <p className="mt-1 text-lg">{eur(result.total)}</p>
            </div>
            <div>
              <p className="opacity-60">Restschuld nach 10 J.</p>
              <p className="mt-1 text-lg">{eur(result.rows[9]?.remaining ?? 0)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Kaufnebenkosten" value={eur(result.sideCosts)} hint="5 % GrESt + 2 % Notar" />
          {isInvestor ? (
            <>
              <Stat label="Bruttorendite" value={`${num(result.grossYield)} %`} hint={`Faktor ${num(result.multiplier, 1)}`} />
              <Stat label="Steuerersparnis 10 J." value={eur(result.taxSaving10)} hint={sonderAfa ? "mit Sonder-AfA" : "linear 5 %"} />
            </>
          ) : (
            <>
              <Stat label="Wohnfläche" value={`${num(unit.area)} m²`} hint={`${unit.rooms} Zimmer, ${unit.outdoor}`} />
              <Stat label="Preis pro m²" value={eur(unit.pricePerSqm)} hint="inkl. Kellerabteil" />
            </>
          )}
        </div>

        {isInvestor && (
          <div className="border border-border bg-card p-6 shadow-soft">
            <p className="eyebrow">Steuerersparnis pro Jahr</p>
            <div className="mt-4 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.rows}>
                  <CartesianGrid vertical={false} stroke="var(--color-border)" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={11} />
                  <YAxis tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} tickLine={false} axisLine={false} fontSize={11} width={34} />
                  <Tooltip formatter={(v) => eur(Number(v))} labelFormatter={(l) => `Jahr ${l}`} />
                  <Bar dataKey="taxSaving" fill="var(--color-brass)" radius={2} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="border border-border bg-card p-6 shadow-soft">
          <p className="eyebrow">Restschuld-Verlauf</p>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={result.rows}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} tickLine={false} axisLine={false} fontSize={11} width={34} />
                <Tooltip formatter={(v) => eur(Number(v))} labelFormatter={(l) => `Jahr ${l}`} />
                <Line type="monotone" dataKey="remaining" stroke="var(--color-ink)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {!compact && isInvestor && (
          <div className="overflow-x-auto border border-border bg-card shadow-soft">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Jahr</th>
                  <th className="px-4 py-3 text-right">Miete</th>
                  <th className="px-4 py-3 text-right">Zinsen</th>
                  <th className="px-4 py-3 text-right">AfA</th>
                  <th className="px-4 py-3 text-right">Steuer</th>
                  <th className="px-4 py-3 text-right">Cashflow</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((r) => (
                  <tr key={r.year} className="border-t border-border tabular-nums">
                    <td className="px-4 py-2.5">{r.year}</td>
                    <td className="px-4 py-2.5 text-right">{eur(r.rent)}</td>
                    <td className="px-4 py-2.5 text-right">{eur(r.interestPaid)}</td>
                    <td className="px-4 py-2.5 text-right">{eur(r.afa)}</td>
                    <td className="px-4 py-2.5 text-right text-brass">{eur(r.taxSaving)}</td>
                    <td className="px-4 py-2.5 text-right">{eur(r.cashflow)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Unverbindliche Beispielrechnung, keine Steuer- oder Anlageberatung. Hausgeld mit 1,20 €/m² und
          Verwaltung mit 30 €/Monat angesetzt. Steuerliche Wirkung abhängig von Ihrer persönlichen Situation.
        </p>

        <Link
          to="/wohnungen/$nr"
          params={{ nr: unit.slug }}
          className="inline-block border border-brass px-6 py-3 text-sm text-brass transition-colors hover:bg-brass hover:text-primary-foreground"
        >
          Wohnung {unit.nr} ansehen
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="border border-border bg-card p-5 shadow-soft">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-2xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}