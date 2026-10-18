// Every part number in the range guide as one list, for the part finder:
// the stainless tube kits and spares, the Evermore and Dorian parts, the
// Loc-Line listing and the HPT nozzles. Piranha has no part numbers in the
// guide, so it has no rows here.

import { HPT_NOZZLES, boreLabel, lengthLabel } from "../data/hpt";
import { LOC_LINE_PARTS, type LocLineColour } from "../data/locline";
import {
  DORIAN_BALLS,
  DORIAN_HIGH_PRESSURE,
  DORIAN_LOW_PRESSURE,
  EVERMORE_ONE_PIECE,
  EVERMORE_TWO_PIECE,
  STAINLESS_KITS,
  STAINLESS_SPARES,
} from "../data/ranges";

export type Range = "Stainless tube" | "Evermore" | "Dorian" | "Loc-Line";

export const RANGES: readonly Range[] = ["Stainless tube", "Evermore", "Dorian", "Loc-Line"];

export type Part = {
  /** Unique across the list; the part number, or the number and the pack where one number is shared. */
  id: string;
  part: string;
  name: string;
  contents?: string;
  note?: string;
  range: Range;
  /** The system or group within the range, such as '1/4" system'. */
  group: string;
  category: string;
  colours?: readonly LocLineColour[];
};

const stainless: readonly Part[] = [
  ...STAINLESS_KITS.map((p) => ({
    id: p.part,
    part: p.part,
    name: p.description,
    contents: p.contents,
    range: "Stainless tube" as const,
    group: "Complete kits",
    category: "Kits",
  })),
  ...STAINLESS_SPARES.map((p) => ({
    id: p.part,
    part: p.part,
    name: p.description,
    range: "Stainless tube" as const,
    group: "Spare components",
    category: "Spares",
  })),
];

const evermore: readonly Part[] = [
  ...EVERMORE_TWO_PIECE.map((p) => ({
    id: p.part,
    part: p.part,
    name: p.description,
    note: p.contents,
    range: "Evermore" as const,
    group: "Two-piece ball and copper tube",
    category: p.part.startsWith("BALL") ? "Balls" : "Tubes",
  })),
  ...EVERMORE_ONE_PIECE.map((p) => ({
    id: p.part,
    part: p.part,
    name: p.description,
    note: p.availability,
    range: "Evermore" as const,
    group: 'One-piece "lollipop" nozzles',
    category: "Nozzles",
  })),
];

const dorian: readonly Part[] = [
  ...DORIAN_LOW_PRESSURE.map((p) => ({
    id: p.part,
    part: p.part,
    name: `${p.description}, ${p.thread} machine thread`,
    contents: p.contents,
    note: "3 pieces, up to 30 bar (400 psi).",
    range: "Dorian" as const,
    group: "Low pressure quick-release kits",
    category: "Kits",
  })),
  ...DORIAN_HIGH_PRESSURE.map((p) => ({
    id: p.part,
    part: p.part,
    name: p.thread === "" ? p.description : `${p.description}, ${p.thread} machine thread`,
    contents: p.contents,
    note: p.thread === "" ? undefined : "5 pieces, 200 bar (2,800 psi).",
    range: "Dorian" as const,
    group: "High pressure quick-release kits",
    category: p.thread === "" ? "Accessories" : "Kits",
  })),
  ...DORIAN_BALLS.flatMap((b) => [
    {
      id: b.brass,
      part: b.brass,
      name: `Ball-type coolant nozzle, ${b.od} OD, brass`,
      note: 'Brass is the standard. 1/8" NPT internal thread.',
      range: "Dorian" as const,
      group: "Ball-type coolant nozzles",
      category: "Nozzles",
    },
    {
      id: b.acetal,
      part: b.acetal,
      name: `Ball-type coolant nozzle, ${b.od} OD, acetal`,
      note: 'Acetal is available on request. 1/8" NPT internal thread.',
      range: "Dorian" as const,
      group: "Ball-type coolant nozzles",
      category: "Nozzles",
    },
  ]),
];

const locLine: readonly Part[] = LOC_LINE_PARTS.map((p) => ({
  id: p.part,
  part: p.part,
  name: p.name,
  contents: p.pack,
  note: p.note,
  range: "Loc-Line",
  group: p.system,
  category: p.category,
  colours: p.colours,
}));

const hpt: readonly Part[] = HPT_NOZZLES.flatMap((n) => {
  const name = `HPT ${n.style} nozzle, ${n.thread}" NPT/BSPT, ${lengthLabel(n.length)} long, ${boreLabel(n.bore)} bore`;
  const base = { name, range: "Loc-Line" as const, group: "HPT nozzles", category: "Nozzles", note: "Rated 0 to 1,000 psi, 115 °F at most." };
  return [
    { ...base, id: n.twoPack, part: n.twoPack, contents: "(2) HPT nozzles" },
    { ...base, id: n.tenPack, part: n.tenPack, contents: "(10) HPT nozzles", colours: ["-BLK", "-G"] as const },
  ];
});

export const PARTS: readonly Part[] = [...stainless, ...evermore, ...dorian, ...locLine, ...hpt];

/** Every group in the list, in the order they first appear. */
export const GROUPS: readonly string[] = [...new Set(PARTS.map((p) => p.group))];

/** Every category in the list, in the order they first appear. */
export const CATEGORIES: readonly string[] = [...new Set(PARTS.map((p) => p.category))];
