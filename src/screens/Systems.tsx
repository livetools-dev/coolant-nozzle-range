// Screen 2, at "/systems": the five systems in the range, one tab each, with
// what each is for, photos of its parts and its part numbers. Each photo card
// leads to that product's part numbers (or, for Piranha, its catalogue). The
// open tab is in the address (?system=dorian) so other pages can link
// straight to one.

import type { ReactNode } from "react";
import { useSearchParams } from "react-router";
import { Badge, Button, Caption, Code, ProductCard, ProductCards, Prose, Row, Stack, Table, Tabs } from "@livetools/ui";
import type { TabItem, TableColumn, TableRow } from "@livetools/ui";
import {
  DORIAN_BALLS,
  DORIAN_BALLS_INTRO,
  DORIAN_HIGH_PRESSURE,
  DORIAN_INTRO,
  DORIAN_LOW_PRESSURE,
  DORIAN_PICTURED,
  DORIAN_TOOL_POSTS,
  EVERMORE_INTRO,
  EVERMORE_MATCHING,
  EVERMORE_ONE_PIECE,
  EVERMORE_ONE_PIECE_INTRO,
  EVERMORE_SPECIALS,
  EVERMORE_TWO_PIECE,
  EVERMORE_TWO_PIECE_INTRO,
  LOC_LINE_COLOURS,
  LOC_LINE_INTRO,
  LOC_LINE_PICTURED,
  LOC_LINE_SYSTEMS,
  PIRANHA_INTRO,
  PIRANHA_PIECES,
  PIRANHA_SYSTEMS,
  STAINLESS_INTRO,
  STAINLESS_KITS,
  STAINLESS_PICTURED,
  STAINLESS_SPARES,
  type CataloguePart,
  type DorianKit,
  type Pictured,
} from "../data/ranges";
import { LOC_LINE_CATALOGUE, PIRANHA_CATALOGUE } from "../data/catalogues";
import { photo } from "../lib/assets";
import { SYSTEMS, type SystemId } from "../data/systems";
import { NavLink } from "../lib/navLink";

const PART_COLUMNS: readonly TableColumn[] = [
  { id: "part", label: "Part no.", kind: "code", rowHeader: true, nowrap: true },
  { id: "description", label: "Description" },
  { id: "contents", label: "Contents" },
];

function partRows(parts: readonly CataloguePart[]): readonly TableRow[] {
  return parts.map((p) => ({
    id: p.part,
    cells: { part: <Code>{p.part}</Code>, description: p.description, contents: p.contents ?? "" },
    label: p.part,
  }));
}

function PartTable({ label, parts, contents = "Contents" }: { label: string; parts: readonly CataloguePart[]; contents?: string }) {
  const columns = PART_COLUMNS.map((c) => (c.id === "contents" ? { ...c, label: contents } : c));
  return (
    <Table label={label} columns={columns} rows={partRows(parts)} fold={{}} empty={{ title: "No parts listed" }} />
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Stack gap="sm">
      <Prose>
        <h3>{title}</h3>
      </Prose>
      {children}
    </Stack>
  );
}

/** A row of product photos, each card leading to that product. */
function Gallery({ items }: { items: readonly Pictured[] }) {
  return (
    <ProductCards shape="square" backdrop="circle" count={3}>
      {items.map((item) => (
        <ProductCard
          key={item.name}
          href={item.href}
          linkComponent={NavLink}
          meta={item.what}
          title={item.name}
          image={photo(item.photo)}
          imageAlign="centre"
          imageScale={1}
        />
      ))}
    </ProductCards>
  );
}

function Intro({ heading, text }: { heading: string; text: string }) {
  return (
    <Prose>
      <h2>{heading}</h2>
      <p>{text}</p>
    </Prose>
  );
}

function Stainless() {
  return (
    <Stack>
      <Intro heading="Stainless CNC Coolant Tube System" text={STAINLESS_INTRO} />
      <Gallery items={STAINLESS_PICTURED} />
      <Section title="Complete kits">
        <PartTable label="Stainless coolant tube kits" parts={STAINLESS_KITS} />
      </Section>
      <Section title="Spare components">
        <Table
          label="Stainless coolant tube spare components"
          columns={PART_COLUMNS.slice(0, 2)}
          rows={partRows(STAINLESS_SPARES)}
          empty={{ title: "No spares listed" }}
        />
      </Section>
    </Stack>
  );
}

const ONE_PIECE_COLUMNS: readonly TableColumn[] = [
  { id: "part", label: "Part no.", kind: "code", rowHeader: true, nowrap: true },
  { id: "description", label: "Description" },
  { id: "availability", label: "Availability" },
];

function Evermore() {
  const onePiece: readonly TableRow[] = EVERMORE_ONE_PIECE.map((p) => ({
    id: p.part,
    cells: {
      part: <Code>{p.part}</Code>,
      description: p.description,
      availability:
        p.availability === "Ex stock" ? (
          <Badge variant="success" icon="success">
            Ex stock
          </Badge>
        ) : (
          <Badge variant="info" icon="info">
            On request
          </Badge>
        ),
    },
    label: p.part,
  }));
  return (
    <Stack>
      <Intro heading="Evermore ball-joint coolant nozzles" text={EVERMORE_INTRO} />
      <Section title="Two-piece: ball and copper tube">
        <Prose>
          <p>{EVERMORE_TWO_PIECE_INTRO}</p>
        </Prose>
        <PartTable label="Evermore two-piece range, stocked" parts={EVERMORE_TWO_PIECE} contents="Notes" />
      </Section>
      <Section title='One-piece "lollipop" nozzles'>
        <Prose>
          <p>{EVERMORE_ONE_PIECE_INTRO}</p>
        </Prose>
        <Table
          label="Evermore one-piece nozzles"
          columns={ONE_PIECE_COLUMNS}
          rows={onePiece}
          fold={{ summary: "availability" }}
          empty={{ title: "No nozzles listed" }}
        />
      </Section>
      <Prose>
        <h3>Matching the ball to your machine</h3>
        <p>{EVERMORE_MATCHING}</p>
        <h3>Specials on request</h3>
        <p>{EVERMORE_SPECIALS}</p>
      </Prose>
    </Stack>
  );
}

const KIT_COLUMNS: readonly TableColumn[] = [
  { id: "part", label: "Kit", kind: "code", rowHeader: true, nowrap: true },
  { id: "thread", label: "Machine thread", nowrap: true },
  { id: "contents", label: "Contents" },
];

function kitRows(kits: readonly DorianKit[]): readonly TableRow[] {
  return kits.map((k) => ({
    id: k.part,
    cells: { part: <Code>{k.part}</Code>, thread: k.thread === "" ? "Not applicable" : k.thread, contents: k.contents ?? "" },
    label: k.part,
  }));
}

const BALL_COLUMNS: readonly TableColumn[] = [
  { id: "od", label: "Ball OD", rowHeader: true },
  { id: "brass", label: "Brass", kind: "code" },
  { id: "acetal", label: "Acetal (on request)", kind: "code" },
];

const BALL_ROWS: readonly TableRow[] = DORIAN_BALLS.map((b) => ({
  id: b.od,
  cells: { od: b.od, brass: <Code>{b.brass}</Code>, acetal: <Code>{b.acetal}</Code> },
}));

function Dorian() {
  return (
    <Stack>
      <Intro heading="Dorian Tool Jet-Stream through-coolant" text={DORIAN_INTRO} />
      <Gallery items={DORIAN_PICTURED} />
      <Section title="Low pressure quick-release kits">
        <Caption>3 pieces, up to 30 bar (400 psi).</Caption>
        <Table
          label="Dorian low pressure quick-release kits"
          columns={KIT_COLUMNS}
          rows={kitRows(DORIAN_LOW_PRESSURE)}
          fold={{ summary: "thread" }}
          empty={{ title: "No kits listed" }}
        />
      </Section>
      <Section title="High pressure quick-release kits">
        <Caption>5 pieces, 200 bar (2,800 psi).</Caption>
        <Table
          label="Dorian high pressure quick-release kits"
          columns={KIT_COLUMNS}
          rows={kitRows(DORIAN_HIGH_PRESSURE)}
          fold={{ summary: "thread" }}
          empty={{ title: "No kits listed" }}
        />
      </Section>
      <Section title="Ball-type coolant nozzles, sold separately">
        <Prose>
          <p>{DORIAN_BALLS_INTRO}</p>
        </Prose>
        <Table label="Dorian ball-type coolant nozzles" columns={BALL_COLUMNS} rows={BALL_ROWS} empty={{ title: "No balls listed" }} />
      </Section>
      <Prose>
        <p>{DORIAN_TOOL_POSTS}</p>
      </Prose>
    </Stack>
  );
}

const PIRANHA_COLUMNS: readonly TableColumn[] = [
  { id: "system", label: "System", rowHeader: true },
  { id: "passage", label: "Passage", kind: "number" },
  { id: "torque", label: "Clamping torque", nowrap: true },
  { id: "connectors", label: "Machine connectors" },
];

const PIRANHA_ROWS: readonly TableRow[] = PIRANHA_SYSTEMS.map((s) => ({
  id: s.system,
  cells: { system: s.system, passage: s.passage, torque: s.torque, connectors: s.connectors },
}));

function Piranha() {
  return (
    <Stack>
      <Intro heading="Piranha Cooling Line, high pressure" text={PIRANHA_INTRO} />
      <Gallery items={PIRANHA_PIECES.map((p) => ({ ...p, href: PIRANHA_CATALOGUE.href }))} />
      <Section title="Three systems">
        <Table
          label="Piranha Cooling Line systems"
          columns={PIRANHA_COLUMNS}
          rows={PIRANHA_ROWS}
          fold={{ summary: "passage" }}
          empty={{ title: "No systems listed" }}
        />
      </Section>
      <Prose>
        <p>Part numbers and dimensions for every Piranha piece are in the Piranha Cooling Line catalogue.</p>
      </Prose>
      <Row align="start">
        <Button icon="download" href={PIRANHA_CATALOGUE.href} linkComponent={NavLink}>
          {PIRANHA_CATALOGUE.label}
        </Button>
      </Row>
    </Stack>
  );
}

const LOC_LINE_COLUMNS: readonly TableColumn[] = [
  { id: "system", label: "System", rowHeader: true },
  { id: "pressure", label: "Line pressure" },
  { id: "flow", label: "Flow rate", kind: "number" },
  { id: "use", label: "Typical use" },
];

const LOC_LINE_ROWS: readonly TableRow[] = LOC_LINE_SYSTEMS.map((s) => ({
  id: s.system,
  cells: { system: s.system, pressure: s.pressure, flow: s.flow === "" ? "Not given" : s.flow, use: s.use },
}));

function LocLine() {
  return (
    <Stack>
      <Intro heading="Loc-Line modular coolant hose" text={LOC_LINE_INTRO} />
      <Gallery items={LOC_LINE_PICTURED} />
      <Table
        label="Loc-Line systems"
        columns={LOC_LINE_COLUMNS}
        rows={LOC_LINE_ROWS}
        fold={{ summary: "pressure" }}
        empty={{ title: "No systems listed" }}
      />
      <Prose>
        <p>{LOC_LINE_COLOURS}</p>
      </Prose>
      <Row align="start">
        <Button href="/parts?range=Loc-Line" linkComponent={NavLink}>
          Every Loc-Line part number
        </Button>
        <Button variant="secondary" href="/hpt" linkComponent={NavLink}>
          Find an HPT nozzle
        </Button>
        <Button variant="secondary" icon="download" href={LOC_LINE_CATALOGUE.href} linkComponent={NavLink}>
          {LOC_LINE_CATALOGUE.label}
        </Button>
      </Row>
    </Stack>
  );
}

const CONTENT: Readonly<Record<SystemId, () => ReactNode>> = {
  stainless: () => <Stainless />,
  evermore: () => <Evermore />,
  dorian: () => <Dorian />,
  piranha: () => <Piranha />,
  locline: () => <LocLine />,
};

const ITEMS: readonly TabItem[] = SYSTEMS.map((s, i) => ({
  value: s.id,
  label: s.name,
  code: String(i + 1).padStart(2, "0"),
  content: CONTENT[s.id](),
}));

function isSystemId(value: string | null): value is SystemId {
  return SYSTEMS.some((s) => s.id === value);
}

export function Systems() {
  const [params, setParams] = useSearchParams();
  const asked = params.get("system");
  const value = isSystemId(asked) ? asked : "stainless";

  return (
    <Stack>
      <Prose>
        <h1>The systems</h1>
        <p>Each system in the range: what it is for, how it goes together and its part numbers.</p>
      </Prose>
      <Tabs
        label="Coolant systems"
        items={ITEMS}
        value={value}
        onValueChange={(next) => setParams({ system: next }, { replace: true })}
      />
    </Stack>
  );
}
