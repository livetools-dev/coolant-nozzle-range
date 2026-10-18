// Sections 1 to 5 of the range guide: what each system is, and its part
// numbers where the guide lists them. Loc-Line's full listing is in
// locline.ts and its HPT nozzles in hpt.ts.

export type CataloguePart = {
  part: string;
  description: string;
  /** What comes in it, or a note beside it. */
  contents?: string;
};

// Section 1: Stainless CNC Coolant Tube System

export const STAINLESS_INTRO =
  "Segmented stainless steel tube with swivel connectors that bend and hold their position. Ideal for getting coolant or air blast right down into the cut (the A02 and B02 kits are popular for reaching deep into the job). Fits a standard 1/4\" BSP (G1/4) machine port.";

export const STAINLESS_BUILDS: readonly { part: string; build: string }[] = [
  { part: "A02", build: "250 mm, 5 swivels, short nozzle" },
  { part: "B02", build: "250 mm, 3 straights, long nozzle" },
  { part: "C02", build: "94 mm, 1 straight, short nozzle" },
];

export const STAINLESS_KITS: readonly CataloguePart[] = [
  {
    part: "A02",
    description: 'CNC Coolant Tube, stainless, 250 mm, BSP 1/4"',
    contents: "2 x straight connectors, 5 x swivel connectors, 1 x short nozzle (2 mm)",
  },
  {
    part: "B02",
    description: 'CNC Coolant Tube, stainless, 250 mm, BSP 1/4"',
    contents: "3 x straight connectors, 1 x long nozzle (5 mm)",
  },
  {
    part: "C02",
    description: 'CNC Coolant Tube, stainless, 94 mm, BSP 1/4"',
    contents: "1 x straight connector, 1 x short nozzle (2 mm)",
  },
  { part: "D02", description: 'CNC Coolant Tube, stainless, 94 mm, BSP 1/4"', contents: "1 x long nozzle" },
];

export const STAINLESS_SPARES: readonly CataloguePart[] = [
  { part: "JT", description: 'Machine fitting, BSP 1/4" (G1/4), 18.5 mm' },
  { part: "LJG", description: 'Extension straight connector, 57 mm, BSP 1/4"' },
  { part: "WXT", description: "Swivel connector, 25 mm" },
  { part: "DPT", description: "Short nozzle, 25 mm, 2 mm bore" },
  { part: "CPT", description: "Long nozzle, 68 mm, 5 mm bore" },
];

// Section 2: Evermore ball-joint coolant nozzles

export const EVERMORE_INTRO =
  'The classic ball-and-gland nozzle found on most CNC lathes and machining centres. Livetools supply two styles direct (they are not listed in the Evermore catalogue): a two-piece M6 ball with a separate screw-in copper tube, so a bent or damaged tube can be replaced without replacing the ball, and a one-piece "lollipop" nozzle with the tube machined as part of the ball.';

export const EVERMORE_TWO_PIECE_INTRO =
  "The ball sits in the machine's gland and swivels to aim. The copper tube screws into the M6 thread in the ball and delivers the stream. Choose the ball diameter to suit the gland (12 mm or 14 mm), then the tube length for the reach you need (50 mm or 80 mm). Copper tube: M6 x 1.0 thread, 6 mm OD, 3.5 mm bore.";

export const EVERMORE_TWO_PIECE: readonly CataloguePart[] = [
  { part: "BALLNOZZLEM6x12", description: "Coolant ball, 12 mm diameter, M6 internal thread", contents: "Pairs with NOZZLEM6 tubes" },
  { part: "BALLNOZZLEM6x14", description: "Coolant ball, 14 mm diameter, M6 internal thread", contents: "Pairs with NOZZLEM6 tubes" },
  { part: "NOZZLEM6x50L", description: "Copper coolant tube, M6 thread, 50 mm long (drawing ref. 0M6050-112)", contents: "Short reach" },
  { part: "NOZZLEM6x80L", description: "Copper coolant tube, M6 thread, 80 mm long (drawing ref. 0M6080-112)", contents: "Long reach" },
];

export const EVERMORE_ONE_PIECE_INTRO =
  "Brass ball with the coolant tube machined in one piece: the drop-in replacement for the original equipment nozzles on most lathe turrets and tool holders. 12 mm ball nozzles are stocked in two lengths; 14 mm ball nozzles are made to Evermore drawings on request.";

export type Availability = "Ex stock" | "On request";

export const EVERMORE_ONE_PIECE: readonly (CataloguePart & { availability: Availability })[] = [
  {
    part: "D12X45X20L",
    description: "12 mm ball, one-piece nozzle, 20 mm long (Evermore drawing 451220-031)",
    availability: "Ex stock",
  },
  { part: "D12X45X55L", description: "12 mm ball, one-piece nozzle, 55 mm long", availability: "Ex stock" },
  {
    part: "14 mm series",
    description:
      "14 mm ball, one-piece nozzle, short, medium or long (Evermore drawings 451420-031 and 14x15x60L, 451460-031-1)",
    availability: "On request",
  },
];

export const EVERMORE_MATCHING =
  'Measure the ball diameter of the nozzle you are replacing: 12 mm, 14 mm and 15 mm are the common gland sizes. Evermore cover 12 mm and 14 mm (M6 thread); Evermore do not make a 15 mm ball. For 15 mm glands, or where the tube threads into the ball with a 1/8" thread, use the Dorian brass balls and nozzles (12 mm and 15 mm balls with 1/8" thread, straight or 90 degree tube). Tube bore and length can be varied to suit the job.';

export const EVERMORE_SPECIALS =
  "Evermore can produce balls and copper tubes in other diameters and lengths, mostly M6, including sleeve diameters from 12 mm up to 80 mm. Send Livetools the ball diameter, thread and tube length (or a sample) and they will quote.";

// Section 3: Dorian Tool Jet-Stream through-coolant

export const DORIAN_INTRO =
  "When the coolant needs to hit the insert edge every time, take the nozzle out of the equation. Dorian's Jet-Stream system uses a patented through-coolant clamp with interchangeable nozzles that aim the stream at close range directly onto the cutting edge. The quick-release coolant kits connect Jet-Stream boring bars and toolholders to the machine, and the ball-type nozzles suit turrets with ball-gland coolant ports.";

export type DorianKit = CataloguePart & { thread: string };

export const DORIAN_LOW_PRESSURE: readonly DorianKit[] = [
  {
    part: "JSPLPCK-062-250",
    description: "Low pressure quick-release kit",
    thread: '1/16" NPT',
    contents: '1/4" OD x 12" tubing (JS-T250-1200), 1/16" NPT and 1/8" NPT straight quick-release connectors',
  },
  {
    part: "JSPLPCK-125-250",
    description: "Low pressure quick-release kit",
    thread: '1/8" NPT',
    contents: '1/4" OD x 12" tubing (JS-T250-1200), 2 x 1/8" NPT straight quick-release connectors',
  },
  {
    part: "JSPLPCK-250-250",
    description: "Low pressure quick-release kit",
    thread: '1/4" NPT',
    contents: '1/4" OD x 12" tubing (JS-T250-1200), 1/8" NPT and 1/4" NPT straight quick-release connectors',
  },
];

export const DORIAN_HIGH_PRESSURE: readonly DorianKit[] = [
  {
    part: "DT-1/8 HP-QRCK",
    description: "High pressure quick-release kit",
    thread: '1/8" NPT',
    contents:
      '8 mm HP tubing, 2 x HP quick-release straight, 1/8" NPT straight HP connector, 1/8" NPT 90 degree HP elbow',
  },
  {
    part: "DT-1/4 HP-QRCK",
    description: "High pressure quick-release kit",
    thread: '1/4" NPT',
    contents:
      '8 mm HP tubing, 2 x HP quick-release straight, 1/4" NPT straight HP connector, 1/8" NPT 90 degree HP elbow',
  },
  {
    part: "TD-HP-WRENCH",
    description: "Disconnect tool",
    thread: "",
    contents: "Disconnect tool for the high-pressure quick-release couplings",
  },
];

export const DORIAN_BALLS_INTRO =
  'For turrets with a ball-gland coolant port, with a 1/8" NPT internal thread. Brass is the standard; acetal is available on request. Machines with 1/8" NPT tapped coolant holes connect directly and do not need a ball.';

export const DORIAN_BALLS: readonly { od: string; brass: string; acetal: string }[] = [
  { od: "12 mm", brass: "JSCNB-12", acetal: "JSCNA-12" },
  { od: "14 mm", brass: "JSCNB-14", acetal: "JSCNA-14" },
  { od: "15 mm", brass: "JSCNB-15", acetal: "JSCNA-15" },
  { od: "22 mm", brass: "JSCNB-22", acetal: "JSCNA-22" },
  { od: '1/2"', brass: "JSCNB-50", acetal: "JSCNA-50" },
  { od: '5/8"', brass: "JSCNB-62", acetal: "JSCNA-62" },
];

export const DORIAN_TOOL_POSTS =
  "Also available: Dorian SDN and Quadra quick-change tool posts and holders. Ask for the Tool Post catalogue.";

// Section 4: Piranha Cooling Line, high pressure

export const PIRANHA_INTRO =
  "Swiss-made modular cooling line in high-strength anodised aluminium. Unlike plastic hose it won't deflect under pressure, holding its aim at up to 80 bar, and it also outlasts plastic at low pressure. Built up from threaded or ball connectors, spacers, angle pieces, valves and nozzles like building blocks, and re-adjusted without tools. A strong fit for tool and cutter grinders, high-pressure turning and milling, blow-off and suction.";

export const PIRANHA_SYSTEMS: readonly { system: string; passage: string; torque: string; connectors: string }[] = [
  {
    system: '1/8"',
    passage: "3.4 mm",
    torque: "2 to 3 Nm",
    connectors: "G1/8, 1/8 NPT, R1/8, G1/4, 1/4 NPT, M6, M8, M8x1, M10x0.5, M10x1; bore adapter",
  },
  {
    system: '1/4"',
    passage: "5.5 mm",
    torque: "2.5 to 3 Nm",
    connectors: "G1/8, 1/8 NPT, G1/4, 1/4 NPT, M10, M10x1, G3/8 reducers; bore adapters",
  },
  {
    system: '1/2"',
    passage: "12 mm",
    torque: "5 to 7.5 Nm",
    connectors: "G3/8, 3/8 NPT, R3/8, R1/2, G1/2, G3/4 reducers",
  },
];

export const PIRANHA_PIECES: readonly { name: string; what: string }[] = [
  { name: '1/8" starter kit', what: "Passage 3.4 mm" },
  { name: '1/4" starter kit', what: "Passage 5.5 mm" },
  { name: '1/2" starter kit', what: "Passage 12 mm" },
  { name: "Round and multi-hole nozzles", what: "Pointed, precise jet" },
  { name: "Flat nozzles", what: "Widths for grinding" },
  { name: "Cooling ring", what: "8 nozzles around the tool" },
  { name: "Ball connectors", what: "Fine angle adjustment" },
  { name: "Bore adapter", what: "Fits coolant bores in holders" },
  { name: "Pipe nozzles", what: "Bent and straight reach" },
  { name: "Y and T pieces", what: "Split one feed to two jets" },
  { name: "Assembled line", what: "Connector, spacer and nozzle" },
];

// Section 5: Loc-Line modular coolant hose

export const LOC_LINE_INTRO =
  "The original snap-together modular hose. Ball-and-socket segments click together to any length and hold their position, so coolant or air can be aimed exactly where it's needed and re-aimed by hand in seconds. The most economical and flexible option for flood coolant, and the High Pressure Turret (HPT) nozzles extend the range to 1,000 psi. Available in 1/4\", 1/2\" and 3/4\" systems (plus 2-1/2\" for vacuum and dust), with NPT and BSPT connectors, valves, manifolds and magnetic bases.";

export const LOC_LINE_SYSTEMS: readonly { system: string; pressure: string; flow: string; use: string }[] = [
  { system: '1/4"', pressure: "55 psi, up to 110 psi with clamps", flow: "250 gal/hr", use: "Lathes, mills, drills, small machines" },
  { system: '1/2"', pressure: "30 psi, up to 75 psi with clamps", flow: "478 gal/hr", use: "General machining, higher volume" },
  { system: '3/4"', pressure: "20 psi, up to 50 psi with clamps", flow: "1,140 gal/hr", use: "Flood coolant, wash-down" },
  { system: "HPT nozzles", pressure: "0 to 1,000 psi", flow: "", use: "High-pressure coolant delivery" },
];

export const LOC_LINE_HIGHLIGHTS: readonly { name: string; what: string }[] = [
  { name: '1/4" Hose Kit 40413', what: "Segments, 3 nozzles, 2 connectors" },
  { name: "Nozzle-Rama Pack 41490", what: 'One of every 1/4" nozzle' },
  { name: "Round nozzles", what: '1/16", 1/8", 1/4" and larger' },
  { name: "90 degree nozzles", what: "For tight spaces" },
  { name: "Flat slot nozzles", what: "Wide, even coverage" },
  { name: "Flat 5-hole nozzle", what: "Multi-stream flat" },
  { name: "Flare nozzle", what: "Wash-down and flood" },
  { name: "90 degree spray bar", what: "Coolant parallel to the work" },
  { name: "ProStream nozzle", what: 'Stainless tube, 0.062" to 0.160" bore' },
  { name: "Brass ball adapters", what: '10, 12, 14 and 15 mm balls to 1/4" Loc-Line' },
  { name: "HPT turret nozzle", what: "CT and XR styles, to 1,000 psi" },
  { name: "NPT and BSPT connectors", what: '1/8" to 3/4" threads' },
];

export const LOC_LINE_COLOURS =
  "Where a colour code is shown, the part can also be ordered in black (-BLK), grey (-G) or white (-W) by adding the suffix to the part number, for example 49421-BLK. The standard colour is the familiar Loc-Line orange and blue. Small packs suit one machine; the larger packs (50 ft coils, 20 and 50 packs) are for the tool crib.";

export const LOC_LINE_CATALOGUE = "https://loc-line.com/files/catalog/Loc-Line.pdf";
