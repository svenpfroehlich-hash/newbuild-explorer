export type Mode = "anleger" | "eigennutzer";

export type FinanceInput = {
  price: number;
  area: number;
  parking: number;
  equity: number;
  interest: number;
  repayment: number;
  mode: Mode;
  taxRate: number;
  rentPerSqm: number;
  buildingShare: number;
  sonderAfa: boolean;
  adminCostsMonthly: number;
  hausgeldPerSqm: number;
};

export type YearRow = {
  year: number;
  interestPaid: number;
  principalPaid: number;
  remaining: number;
  afa: number;
  taxSaving: number;
  rent: number;
  cashflow: number;
};

export const TRANSFER_TAX = 0.05; // Grunderwerbsteuer BW
export const NOTARY = 0.02; // Notar & Grundbuch

export const eur = (v: number, digits = 0) =>
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Number.isFinite(v) ? v : 0);

export const num = (v: number, digits = 2) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Number.isFinite(v) ? v : 0);

export function calculate(input: FinanceInput) {
  const purchase = input.price + input.parking;
  const transferTax = purchase * TRANSFER_TAX;
  const notary = purchase * NOTARY;
  const sideCosts = transferTax + notary;
  const total = purchase + sideCosts;
  const loan = Math.max(total - input.equity, 0);

  const monthlyRate = input.interest / 100 / 12;
  const annuity = (loan * (input.interest + input.repayment)) / 100 / 12;

  const buildingValue = (input.price * input.buildingShare) / 100;
  const rentYear = input.mode === "anleger" ? input.rentPerSqm * input.area * 12 : 0;
  const admin = input.mode === "anleger" ? input.adminCostsMonthly * 12 : 0;
  const hausgeld = input.hausgeldPerSqm * input.area;

  const rows: YearRow[] = [];
  let remaining = loan;
  for (let year = 1; year <= 10; year++) {
    let interestPaid = 0;
    let principalPaid = 0;
    for (let m = 0; m < 12; m++) {
      const i = remaining * monthlyRate;
      const p = Math.min(Math.max(annuity - i, 0), remaining);
      interestPaid += i;
      principalPaid += p;
      remaining = Math.max(remaining - p, 0);
    }
    let afa = 0;
    if (input.mode === "anleger") {
      const rate = input.sonderAfa && year <= 4 ? 0.1 : 0.05;
      afa = buildingValue * rate;
    }
    const taxableResult = rentYear - interestPaid - afa - admin;
    const taxSaving = input.mode === "anleger" ? -taxableResult * (input.taxRate / 100) : 0;
    const cashflow =
      rentYear - interestPaid - principalPaid - admin - hausgeld + taxSaving;
    rows.push({ year, interestPaid, principalPaid, remaining, afa, taxSaving, rent: rentYear, cashflow });
  }

  const taxSaving10 = rows.reduce((s, r) => s + r.taxSaving, 0);
  const y1 = rows[0]!;
  const monthlyBurden =
    input.mode === "anleger"
      ? annuity + admin / 12 + hausgeld / 12 - rentYear / 12 - y1.taxSaving / 12
      : annuity + hausgeld / 12;

  return {
    purchase,
    transferTax,
    notary,
    sideCosts,
    total,
    loan,
    annuity,
    buildingValue,
    rentYear,
    hausgeld,
    rows,
    taxSaving10,
    monthlyBurden,
    grossYield: rentYear > 0 ? (rentYear / purchase) * 100 : 0,
    multiplier: rentYear > 0 ? purchase / rentYear : 0,
    equityShare: (input.equity / total) * 100,
    repaid10: loan - (rows[9]?.remaining ?? 0),
  };
}