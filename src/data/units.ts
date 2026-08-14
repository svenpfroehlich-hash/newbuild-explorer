import planP17 from "@/assets/plan-p17.jpg.asset.json";
import planP18 from "@/assets/plan-p18.jpg.asset.json";
import planP19 from "@/assets/plan-p19.jpg.asset.json";
import planP20 from "@/assets/plan-p20.jpg.asset.json";
import planP21 from "@/assets/plan-p21.jpg.asset.json";
import planP22 from "@/assets/plan-p22.jpg.asset.json";
import planP23 from "@/assets/plan-p23.jpg.asset.json";
import planP24 from "@/assets/plan-p24.jpg.asset.json";
import planP25 from "@/assets/plan-p25.jpg.asset.json";
import planP26 from "@/assets/plan-p26.jpg.asset.json";
import planP27 from "@/assets/plan-p27.jpg.asset.json";
import planP28 from "@/assets/plan-p28.jpg.asset.json";
import planP29 from "@/assets/plan-p29.jpg.asset.json";
import planP30 from "@/assets/plan-p30.jpg.asset.json";
import planP31 from "@/assets/plan-p31.jpg.asset.json";
import planP32 from "@/assets/plan-p32.jpg.asset.json";
import planP33 from "@/assets/plan-p33.jpg.asset.json";
import planP34 from "@/assets/plan-p34.jpg.asset.json";

export type Room = { name: string; area: number; note?: string };

export type UnitType = {
  id: string;
  label: string;
  rooms: number;
  area: number;
  plan: string;
  roomList: Room[];
  units: number[];
};

export const unitTypes: UnitType[] = [
  {
    id: "typ-a",
    label: "Typ A · 3 Zimmer",
    rooms: 3,
    area: 76.72,
    plan: planP17.url,
    roomList: [
      { name: "Wohnen/Essen/Kochen", area: 26.28 },
      { name: "Schlafen", area: 15.31 },
      { name: "Kind", area: 10.94 },
      { name: "Flur", area: 9.02 },
      { name: "Bad", area: 10.73 },
      { name: "Balkon", area: 4.44, note: "8,89 m² zu 1/2" },
    ],
    units: [1, 4, 7],
  },
  {
    id: "typ-b",
    label: "Typ B · 2 Zimmer",
    rooms: 2,
    area: 53.21,
    plan: planP18.url,
    roomList: [
      { name: "Wohnen/Essen/Kochen", area: 23.41 },
      { name: "Schlafen", area: 14.78 },
      { name: "Flur", area: 4.94 },
      { name: "Bad", area: 5.64 },
      { name: "Balkon", area: 4.44, note: "8,89 m² zu 1/2" },
    ],
    units: [2, 5, 8],
  },
  {
    id: "typ-c",
    label: "Typ C · 3 Zimmer, 2 Bäder",
    rooms: 3,
    area: 86.62,
    plan: planP19.url,
    roomList: [
      { name: "Wohnen/Essen/Kochen", area: 29.8 },
      { name: "Schlafen", area: 13.01 },
      { name: "Kinder", area: 23.14 },
      { name: "Bad", area: 3.7 },
      { name: "Bad 2", area: 3.63 },
      { name: "Flur", area: 4.35 },
      { name: "Balkon", area: 8.99, note: "17,99 m² zu 1/2" },
    ],
    units: [3, 6, 9],
  },
  {
    id: "typ-d",
    label: "Typ D · Penthouse 3 Zimmer",
    rooms: 3,
    area: 76.49,
    plan: planP20.url,
    roomList: [{ name: "Schlafen", area: 14.91 }],
    units: [10],
  },
  {
    id: "typ-e",
    label: "Typ E · Penthouse 3 Zimmer",
    rooms: 3,
    area: 81.86,
    plan: planP21.url,
    roomList: [],
    units: [11],
  },
  {
    id: "typ-f",
    label: "Typ F · 2 Zimmer",
    rooms: 2,
    area: 48.34,
    plan: planP22.url,
    roomList: [],
    units: [12, 17, 22],
  },
  {
    id: "typ-g",
    label: "Typ G · 2 Zimmer",
    rooms: 2,
    area: 48.97,
    plan: planP23.url,
    roomList: [],
    units: [13, 18, 23],
  },
  {
    id: "typ-h",
    label: "Typ H · 3 Zimmer",
    rooms: 3,
    area: 65.15,
    plan: planP24.url,
    roomList: [],
    units: [14, 19, 24],
  },
  {
    id: "typ-i",
    label: "Typ I · 2 Zimmer",
    rooms: 2,
    area: 58.3,
    plan: planP25.url,
    roomList: [
      { name: "Bad", area: 6.13 },
      { name: "Terrasse (EG)/Balkon", area: 7.4, note: "14,81 m² zu 1/2" },
    ],
    units: [15, 20],
  },
  {
    id: "typ-j",
    label: "Typ J · 2 Zimmer kompakt",
    rooms: 2,
    area: 40.48,
    plan: planP26.url,
    roomList: [
      { name: "Wohnen/Essen/Kochen", area: 18.33 },
      { name: "Schlafen", area: 11.74 },
    ],
    units: [16, 21, 26],
  },
  {
    id: "typ-k",
    label: "Typ K · 2 Zimmer",
    rooms: 2,
    area: 56.06,
    plan: planP27.url,
    roomList: [
      { name: "Abstellraum", area: 1.07 },
      { name: "Balkon", area: 4.09, note: "8,19 m² zu 1/2" },
    ],
    units: [25],
  },
  {
    id: "typ-l",
    label: "Typ L · Penthouse 2 Zimmer",
    rooms: 2,
    area: 72.63,
    plan: planP28.url,
    roomList: [
      { name: "Wohnen/Essen/Kochen", area: 31.61 },
      { name: "Schlafen", area: 14.55 },
      { name: "Flur", area: 7.96 },
      { name: "Bad", area: 12.12 },
      { name: "Dachterrasse", area: 6.39, note: "12,78 m² zu 1/2" },
    ],
    units: [27],
  },
  {
    id: "typ-m",
    label: "Typ M · Penthouse 2 Zimmer",
    rooms: 2,
    area: 57.37,
    plan: planP29.url,
    roomList: [
      { name: "Wohnen/Essen/Kochen", area: 28.38 },
      { name: "Schlafen", area: 16.04 },
      { name: "Bad", area: 6.29 },
      { name: "Dachterrasse", area: 6.66, note: "19,99 m² zu 1/3" },
    ],
    units: [28],
  },
  {
    id: "typ-n",
    label: "Typ N · Penthouse 2 Zimmer",
    rooms: 2,
    area: 62.94,
    plan: planP30.url,
    roomList: [
      { name: "Wohnen/Essen/Kochen", area: 24.71 },
      { name: "Schlafen", area: 16.54 },
      { name: "Flur", area: 7.25 },
      { name: "Bad", area: 7.68 },
      { name: "Dachterrasse", area: 6.76, note: "13,52 m² zu 1/2" },
    ],
    units: [29],
  },
  {
    id: "typ-o",
    label: "Typ O · 3 Zimmer",
    rooms: 3,
    area: 84.22,
    plan: planP31.url,
    roomList: [{ name: "Essen/Wohnen", area: 29.13 }],
    units: [30, 33, 34, 37, 38, 41],
  },
  {
    id: "typ-p",
    label: "Typ P · 3 Zimmer",
    rooms: 3,
    area: 84.73,
    plan: planP32.url,
    roomList: [
      { name: "Essen/Wohnen", area: 29.13 },
      { name: "Kochen", area: 6.71 },
    ],
    units: [31, 32, 35, 36, 39, 40],
  },
  {
    id: "typ-q",
    label: "Typ Q · Penthouse 2 Zimmer",
    rooms: 2,
    area: 60.23,
    plan: planP33.url,
    roomList: [{ name: "Wohnen/Essen/Kochen", area: 31.52 }],
    units: [42, 45],
  },
  {
    id: "typ-r",
    label: "Typ R · Penthouse 2 Zimmer",
    rooms: 2,
    area: 59.47,
    plan: planP34.url,
    roomList: [
      { name: "Wohnen/Essen/Kochen", area: 24.99 },
      { name: "Schlafen", area: 15.3 },
      { name: "Bad", area: 6.94 },
    ],
    units: [43, 44],
  },
];

const prices: Record<number, number> = {
  1: 421960, 2: 292655, 3: 476410, 4: 421960, 5: 292655, 6: 476410,
  7: 433468, 8: 300637, 9: 489403, 10: 496420, 11: 531271,
  12: 265870, 13: 269335, 14: 358325, 15: 320650, 16: 222640,
  17: 265870, 18: 269335, 19: 358325, 20: 320650, 21: 222640,
  22: 273121, 23: 276681, 24: 368098, 25: 316739, 26: 228712,
  27: 471369, 28: 372331, 29: 408481,
  30: 463210, 31: 466015, 32: 466015, 33: 463210,
  34: 463210, 35: 466015, 36: 466015, 37: 463210,
  38: 475843, 39: 478725, 40: 478725, 41: 475843,
  42: 390893, 43: 385960, 44: 385960, 45: 390893,
};

type FloorDef = { house: "Haus I" | "Haus II" | "Haus III"; floor: string; from: number; to: number };

const floorPlan: FloorDef[] = [
  { house: "Haus I", floor: "EG", from: 1, to: 3 },
  { house: "Haus I", floor: "1. OG", from: 4, to: 6 },
  { house: "Haus I", floor: "2. OG", from: 7, to: 9 },
  { house: "Haus I", floor: "DG", from: 10, to: 11 },
  { house: "Haus II", floor: "EG", from: 12, to: 16 },
  { house: "Haus II", floor: "1. OG", from: 17, to: 21 },
  { house: "Haus II", floor: "2. OG", from: 22, to: 26 },
  { house: "Haus II", floor: "DG", from: 27, to: 29 },
  { house: "Haus III", floor: "EG", from: 30, to: 33 },
  { house: "Haus III", floor: "1. OG", from: 34, to: 37 },
  { house: "Haus III", floor: "2. OG", from: 38, to: 41 },
  { house: "Haus III", floor: "DG", from: 42, to: 45 },
];

export type Unit = {
  nr: number;
  slug: string;
  house: string;
  floor: string;
  area: number;
  rooms: number;
  price: number;
  pricePerSqm: number;
  outdoor: "Terrasse" | "Balkon" | "Dachterrasse";
  type: UnitType;
};

function outdoorFor(floor: string): Unit["outdoor"] {
  if (floor === "EG") return "Terrasse";
  if (floor === "DG") return "Dachterrasse";
  return "Balkon";
}

export const units: Unit[] = Object.keys(prices)
  .map(Number)
  .sort((a, b) => a - b)
  .map((nr) => {
    const def = floorPlan.find((f) => nr >= f.from && nr <= f.to)!;
    const type = unitTypes.find((t) => t.units.includes(nr))!;
    const price = prices[nr]!;
    return {
      nr,
      slug: String(nr),
      house: def.house,
      floor: def.floor,
      area: type.area,
      rooms: type.rooms,
      price,
      pricePerSqm: price / type.area,
      outdoor: outdoorFor(def.floor),
      type,
    };
  });

export const houses = ["Haus I", "Haus II", "Haus III"] as const;

export function getUnit(nr: string | number) {
  return units.find((u) => u.slug === String(nr));
}