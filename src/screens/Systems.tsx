// Screen 2, at "/systems": the five systems in the range, one tab each, with
// what each is for and its part numbers, with the guide's product photos in
// the tables as the guide prints them. The open tab is in the address
// (?system=dorian) so other pages can link straight to one, and a section
// name after it (#hpt-nozzles) opens the page at that section.

import { useEffect, type ReactNode } from "react";
import { useLocation, useSearchParams } from "react-router";
import { Badge, Button, Caption, Code, Columns, Link, Prose, Row, Stack, Table, Tabs } from "@livetools/ui";
import type { TabItem, TableColumn, TableRow } from "@livetools/ui";
import {
  DORIAN_BALLS,
  DORIAN_BALLS_INTRO,
  DORIAN_HIGH_PRESSURE,
  DORIAN_INTRO,
  DORIAN_BALL_MATERIALS,
  DORIAN_LOW_PRESSURE,
  DORIAN_TOOL_POSTS,
  EVERMORE_INTRO,
  EVERMORE_MATCHING,
  EVERMORE_ONE_PIECE,
  EVERMORE_ONE_PIECE_INTRO,
  EVERMORE_SPECIALS,
  EVERMORE_TWO_PIECE,
  EVERMORE_TUBE_DRAWINGS,
  EVERMORE_TUBE_SPEC,
  EVERMORE_TWO_PIECE_INTRO,
  LOC_LINE_COLOURS,
  LOC_LINE_INTRO,
  LOC_LINE_POPULAR,
  LOC_LINE_SYSTEMS,
  PIRANHA_INTRO,
  PIRANHA_PIECES,
  PIRANHA_SYSTEMS,
  STAINLESS_INTRO,
  STAINLESS_KITS,
  STAINLESS_SPARES,
  type CataloguePart,
  type DorianKit,
  piranhaFinder,
  piranhaSystemFinder,
  type Pictured,
} from "../data/ranges";
import { LOC_LINE_CATALOGUE, PIRANHA_CATALOGUE } from "../data/catalogues";
import { SYSTEMS, type SystemId } from "../data/systems";
import { NavLink } from "../lib/navLink";
import { picture, thumb } from "../lib/thumb";
import { HPT_SECTION_ID, HptNozzles } from "./HptNozzles";

const PICTURE: TableColumn = { id: "picture", label: "Picture", headingHidden: true };

const PART_COLUMNS: readonly TableColumn[] = [
  { id: "part", label: "Part no.", kind: "code", rowHeader: true, nowrap: true },
  PICTURE,
  { id: "description", label: "Description" },
  { id: "contents", label: "Contents" },
];

function partRows(parts: readonly CataloguePart[]): readonly TableRow[] {
  return parts.map((p) => ({
    id: p.part,
    cells: {
      part: <Code>{p.part}</Code>,
      picture: p.photo === undefined ? "" : thumb(p.photo, `${p.part}, ${p.description}`),
      description: p.description,
      contents: p.contents ?? "",
    },
    label: p.part,
  }));
}

function PartTable({ label, parts, contents = "Contents" }: { label: string; parts: readonly CataloguePart[]; contents?: string }) {
  const pictured = parts.some((p) => p.photo !== undefined);
  const columns = PART_COLUMNS.filter((c) => pictured || c.id !== "picture").map((c) =>
    c.id === "contents" ? { ...c, label: contents } : c,
  );
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

const PICTURED_COLUMNS: readonly TableColumn[] = [
  PICTURE,
  { id: "name", label: "Product", rowHeader: true },
  { id: "what", label: "What it is" },
];

/** Products the guide shows with a photo: the photo, the name (a link to its part numbers where it has one) and a line on what it is. */
function PictureTable({ label, items }: { label: string; items: readonly Pictured[] }) {
  const rows: readonly TableRow[] = items.map((item) => ({
    id: item.name,
    cells: {
      picture: thumb(item.photo, item.name),
      name:
        item.href === undefined ? (
          item.name
        ) : (
          <Link href={item.href} linkComponent={NavLink}>
            {item.name}
          </Link>
        ),
      what: item.what,
    },
    label: item.name,
  }));
  return <Table label={label} columns={PICTURED_COLUMNS} rows={rows} empty={{ title: "No products listed" }} />;
}

/** A system's opening words with the guide's photo of it at work beside them, as the guide prints it. */
function IntroWithPhoto({ heading, text, photo, caption }: { heading: string; text: string; photo: string; caption: string }) {
  return (
    <Columns count={2}>
      <Intro heading={heading} text={text} />
      <Stack gap="sm">
        {picture(photo, caption, "photo")}
        <Caption>{caption}</Caption>
      </Stack>
    </Columns>
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
      <Section title="Complete kits">
        <PartTable label="Stainless coolant tube kits" parts={STAINLESS_KITS} />
      </Section>
      <Section title="Spare components">
        <Table
          label="Stainless coolant tube spare components"
          columns={PART_COLUMNS.slice(0, 3)}
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
      <Columns count={2}>
        {picture("evermore-ball", "An Evermore coolant ball, with its diameter D, length L and thread M marked", "photo")}
        <Stack gap="sm">
          <Prose>
            <h3>Two-piece: ball and copper tube</h3>
            <p>{EVERMORE_TWO_PIECE_INTRO}</p>
            <p>
              <strong>{EVERMORE_TUBE_SPEC}</strong>
            </p>
          </Prose>
          {EVERMORE_TUBE_DRAWINGS.map((d) => (
            <Stack gap="sm" key={d.photo}>
              {picture(d.photo, `Drawing of ${d.caption}`, "drawing")}
              <Caption>{d.caption}</Caption>
            </Stack>
          ))}
        </Stack>
      </Columns>
      <Section title="Two-piece range (stocked)">
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

const MATERIAL_COLUMNS: readonly TableColumn[] = [
  PICTURE,
  { id: "material", label: "Material", rowHeader: true },
  { id: "parts", label: "Part numbers", kind: "code" },
  { id: "availability", label: "Availability" },
];

const MATERIAL_ROWS: readonly TableRow[] = DORIAN_BALL_MATERIALS.map((m) => ({
  id: m.material,
  cells: {
    picture: thumb(m.photo, `${m.material} ball-type coolant nozzle`),
    material: m.material,
    parts: <Code>{`${m.prefix}-12 to ${m.prefix}-62`}</Code>,
    availability: m.availability,
  },
}));

const BALL_ROWS: readonly TableRow[] = DORIAN_BALLS.map((b) => ({
  id: b.od,
  cells: { od: b.od, brass: <Code>{b.brass}</Code>, acetal: <Code>{b.acetal}</Code> },
}));

function Dorian() {
  return (
    <Stack>
      <Intro heading="Dorian Tool Jet-Stream through-coolant" text={DORIAN_INTRO} />
      <Section title="Low pressure quick-release kits">
        <Caption>3 pieces, up to 30 bar (400 psi).</Caption>
        {picture("dorian-kit-low-pressure", "The low pressure quick-release kit: braided tubing with a quick-release connector at each end", "strip")}
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
        {picture("dorian-kit-high-pressure", "The high pressure quick-release kit: straight connector, quick-release couplings, braided HP tubing and a 90 degree elbow", "strip")}
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
        <Table
          label="Dorian ball materials"
          columns={MATERIAL_COLUMNS}
          rows={MATERIAL_ROWS}
          empty={{ title: "No materials listed" }}
        />
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
  cells: {
    system: (
      <Link href={piranhaSystemFinder(s.system)} linkComponent={NavLink}>
        {`${s.system} system`}
      </Link>
    ),
    passage: s.passage,
    torque: s.torque,
    connectors: s.connectors,
  },
}));

function Piranha() {
  return (
    <Stack>
      <IntroWithPhoto
        heading="Piranha Cooling Line, high pressure"
        text={PIRANHA_INTRO}
        photo="photo-piranha-turret"
        caption="Piranha Cooling Line on a lathe turret"
      />
      <Section title="The building blocks">
        <PictureTable label="Piranha Cooling Line pieces" items={PIRANHA_PIECES} />
      </Section>
      <Section title="Three systems">
        <Table
          label="Piranha Cooling Line systems"
          columns={PIRANHA_COLUMNS}
          rows={PIRANHA_ROWS}
          fold={{ summary: "passage" }}
          empty={{ title: "No systems listed" }}
        />
      </Section>
      <Row align="start">
        <Button href={piranhaFinder()} linkComponent={NavLink}>
          Every Piranha part number
        </Button>
        <Button variant="secondary" icon="download" href={PIRANHA_CATALOGUE.href} linkComponent={NavLink}>
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
      <IntroWithPhoto
        heading="Loc-Line modular coolant hose"
        text={LOC_LINE_INTRO}
        photo="photo-locline-drilling"
        caption='1/4" Loc-Line on a drilling job'
      />
      <Table
        label="Loc-Line systems"
        columns={LOC_LINE_COLUMNS}
        rows={LOC_LINE_ROWS}
        fold={{ summary: "pressure" }}
        empty={{ title: "No systems listed" }}
      />
      <Prose>
        <h3>Popular parts</h3>
      </Prose>
      <PictureTable label="Popular Loc-Line parts" items={LOC_LINE_POPULAR} />
      <Prose>
        <p>{LOC_LINE_COLOURS}</p>
      </Prose>
      <Row align="start">
        <Button href="/parts?range=Loc-Line" linkComponent={NavLink}>
          Every Loc-Line part number
        </Button>
        <Button variant="secondary" href={`/systems?system=locline#${HPT_SECTION_ID}`} linkComponent={NavLink}>
          Find an HPT nozzle
        </Button>
        <Button variant="secondary" icon="download" href={LOC_LINE_CATALOGUE.href} linkComponent={NavLink}>
          {LOC_LINE_CATALOGUE.label}
        </Button>
      </Row>
      <HptNozzles />
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
  const { hash } = useLocation();

  // An address ending in a section's name (#hpt-nozzles) opens at that section once its tab is showing.
  useEffect(() => {
    if (hash !== "") document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
  }, [hash, value]);

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
