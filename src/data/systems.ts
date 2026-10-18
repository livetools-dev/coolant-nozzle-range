// The five coolant systems in the range guide, as the quick selector compares
// them, and the guide's "if you have..., start with..." list. Each system's
// `id` is its tab on the Systems page.

export type SystemId = "stainless" | "evermore" | "dorian" | "piranha" | "locline";

export type CoolantSystem = {
  id: SystemId;
  name: string;
  /** The short name the guide puts under each system's picture. */
  short: string;
  bestFor: string;
  pressure: string;
  material: string;
  turning: boolean;
  milling: boolean;
};

export const SYSTEMS: readonly CoolantSystem[] = [
  {
    id: "stainless",
    name: "Stainless CNC Coolant Tube",
    short: "Stainless tube",
    bestFor: "Rigid, bendable reach; air blast or coolant right down into the job",
    pressure: "Standard flood",
    material: "Stainless steel",
    turning: true,
    milling: true,
  },
  {
    id: "evermore",
    name: "Evermore Ball Nozzle",
    short: "Ball gland",
    bestFor: "Direct replacement for ball-gland coolant nozzles on lathes and mills",
    pressure: "Standard flood",
    material: "Ball and copper tube",
    turning: true,
    milling: true,
  },
  {
    id: "dorian",
    name: "Dorian Jet-Stream",
    short: "Dorian",
    bestFor: "Coolant delivered through the holder onto the insert edge",
    pressure: "Low and high",
    material: "PVD-coated steel holder",
    turning: true,
    milling: false,
  },
  {
    id: "piranha",
    name: "Piranha Cooling Line",
    short: "Piranha",
    bestFor: "Holds aim under high pressure; grinders and HP machining",
    pressure: "Up to 80 bar",
    material: "Anodised aluminium",
    turning: true,
    milling: true,
  },
  {
    id: "locline",
    name: "Loc-Line",
    short: "Loc-Line",
    bestFor: "Fast, flexible, low-cost aiming; huge nozzle choice; HPT nozzles to 1,000 psi",
    pressure: "Low (HPT: high)",
    material: "Acetal copolymer",
    turning: true,
    milling: true,
  },
];

export function systemById(id: SystemId): CoolantSystem {
  const system = SYSTEMS.find((s) => s.id === id);
  if (system === undefined) throw new Error(`No coolant system "${id}"`);
  return system;
}

export type Situation = {
  id: string;
  /** What the customer has, in the guide's words. */
  have: string;
  /** Where to start, in the guide's words. */
  start: string;
  systems: readonly SystemId[];
};

export const SITUATIONS: readonly Situation[] = [
  {
    id: "ball-gland",
    have: "A bent or missing ball-gland nozzle on a lathe or mill",
    start: "Evermore ball and copper tube, or a Dorian brass ball.",
    systems: ["evermore", "dorian"],
  },
  {
    id: "bsp-reach",
    have: 'A 1/4" BSP port and need rigid reach into the job',
    start: "Stainless CNC Coolant Tube A02 or B02.",
    systems: ["stainless"],
  },
  {
    id: "re-aim",
    have: "Flood coolant and want to re-aim quickly",
    start: 'A Loc-Line 1/4" or 1/2" hose kit.',
    systems: ["locline"],
  },
  {
    id: "through-holder",
    have: "High-pressure coolant through the turret or holder",
    start: "A Dorian Jet-Stream high-pressure kit, or Loc-Line HPT nozzles.",
    systems: ["dorian", "locline"],
  },
  {
    id: "grinder",
    have: "A grinder or HP machine where plastic hose won't hold its line",
    start: "Piranha Cooling Line.",
    systems: ["piranha"],
  },
];

/** What to send Livetools so they can match a nozzle, in the guide's order. */
export const SEND_US: readonly string[] = [
  "A photo of the current nozzle or setup",
  "The thread at the machine",
  "The reach you need",
  "Your coolant pressure",
];

export const CONTACT = {
  company: "Livetools Pty Ltd",
  phone: "02 4017 0198",
  phoneHref: "tel:+61240170198",
  email: "sales@livetools.com.au",
  website: "https://livetools.com.au",
  address: "115 Young Street, Carrington NSW 2294, Australia",
} as const;
