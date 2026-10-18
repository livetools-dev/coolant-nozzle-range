// Loc-Line High Pressure Turret (HPT) nozzles, CT and XR styles. Rated 0 to
// 1,000 psi, 115 °F at most. Each style comes in two threads, four nozzle
// lengths and four bores, 64 nozzles in all, each in a 2-pack (720xx) and a
// 10-pack (790xx, also in black -BLK or grey -G). The guide's table numbers
// them in blocks of 16 per style and thread, bore by bore and length by length
// within the block, so the part numbers are built from that pattern here.

export type HptStyle = "CT" | "XR";
export type HptThread = "1/8" | "1/4";

export const HPT_STYLES: readonly { value: HptStyle; label: string; hint: string }[] = [
  { value: "CT", label: "CT, Compact Turret", hint: "Suits tight spaces." },
  {
    value: "XR",
    label: "XR, Extended Reach",
    hint: "110 degree nozzle swing, and reaches below the horizontal.",
  },
];

export const HPT_THREADS: readonly { value: HptThread; label: string }[] = [
  { value: "1/8", label: '1/8" NPT/BSPT' },
  { value: "1/4", label: '1/4" NPT/BSPT' },
];

export const HPT_LENGTHS: readonly { value: string; inch: string; mm: string }[] = [
  { value: "0", inch: '0.0"', mm: "0 mm" },
  { value: "0.25", inch: '0.25"', mm: "6.4 mm" },
  { value: "0.5", inch: '0.5"', mm: "12.7 mm" },
  { value: "1.25", inch: '1.25"', mm: "31.8 mm" },
];

export const HPT_BORES: readonly { value: string; inch: string; mm: string }[] = [
  { value: "0.062", inch: '0.062"', mm: "1.6 mm" },
  { value: "0.086", inch: '0.086"', mm: "2.2 mm" },
  { value: "0.117", inch: '0.117"', mm: "3.0 mm" },
  { value: "0.160", inch: '0.160"', mm: "4.1 mm" },
];

/** The 2-pack part number of each block's first nozzle. */
const BLOCK_START: Readonly<Record<HptStyle, Readonly<Record<HptThread, number>>>> = {
  CT: { "1/8": 72010, "1/4": 72060 },
  XR: { "1/8": 72040, "1/4": 72080 },
};

export const HPT_LEVER = { twoPack: "72000", tenPack: "79000" } as const;

export type HptNozzle = {
  style: HptStyle;
  thread: HptThread;
  length: string;
  bore: string;
  twoPack: string;
  tenPack: string;
};

/** The nozzle for one choice of each, with both pack sizes' part numbers. */
export function hptNozzle(style: HptStyle, thread: HptThread, length: string, bore: string): HptNozzle {
  const l = HPT_LENGTHS.findIndex((x) => x.value === length);
  const b = HPT_BORES.findIndex((x) => x.value === bore);
  if (l < 0 || b < 0) throw new Error(`No HPT nozzle ${length}" long with a ${bore}" bore`);
  const twoPack = BLOCK_START[style][thread] + b * HPT_LENGTHS.length + l;
  return { style, thread, length, bore, twoPack: String(twoPack), tenPack: String(twoPack + 7000) };
}

/** Every HPT nozzle, in the guide's order. */
export const HPT_NOZZLES: readonly HptNozzle[] = HPT_STYLES.flatMap((s) =>
  HPT_THREADS.flatMap((t) =>
    HPT_BORES.flatMap((b) => HPT_LENGTHS.map((l) => hptNozzle(s.value, t.value, l.value, b.value))),
  ),
);

export function lengthLabel(value: string): string {
  const l = HPT_LENGTHS.find((x) => x.value === value);
  return l === undefined ? value : `${l.inch} (${l.mm})`;
}

export function boreLabel(value: string): string {
  const b = HPT_BORES.find((x) => x.value === value);
  return b === undefined ? value : `${b.inch} (${b.mm})`;
}
