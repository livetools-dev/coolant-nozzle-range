// Screen 1, at "/": the front page. Its banner runs the full width of the
// page above the panel, so the frame draws it (FrontHero). Then the quick
// selector: pick what you have and the screen says where to start, with a
// way into each suggested system's page. Under it, the five systems side by
// side with the guide's photos, and a band saying how to get the right
// nozzle fast.

import { useState } from "react";
import { Button, CallToAction, Card, Form, Hero, Link, Prose, RadioGroup, Row, Stack, Table } from "@livetools/ui";
import type { RadioItem, TableColumn, TableRow } from "@livetools/ui";
import { CONTACT, SEND_US, SITUATIONS, SYSTEMS, systemById, type SystemId } from "../data/systems";
import { asset, photo } from "../lib/assets";
import { NavLink } from "../lib/navLink";
import { thumb } from "../lib/thumb";

const SYSTEM_PHOTOS: Readonly<Record<SystemId, string>> = {
  stainless: "system-stainless",
  evermore: "system-evermore",
  dorian: "system-dorian",
  piranha: "system-piranha",
  locline: "system-locline",
};

const SITUATION_ITEMS: readonly RadioItem[] = SITUATIONS.map((s) => ({ value: s.id, label: s.have }));

const COLUMNS: readonly TableColumn[] = [
  { id: "picture", label: "Picture", headingHidden: true },
  { id: "system", label: "System", rowHeader: true },
  { id: "bestFor", label: "Best for" },
  { id: "pressure", label: "Pressure" },
  { id: "material", label: "Material" },
  { id: "turning", label: "Turning" },
  { id: "milling", label: "Milling" },
];

const ROWS: readonly TableRow[] = SYSTEMS.map((s) => ({
  id: s.id,
  cells: {
    picture: thumb(SYSTEM_PHOTOS[s.id], s.name),
    system: (
      <Link href={`/systems?system=${s.id}`} linkComponent={NavLink}>
        {s.name}
      </Link>
    ),
    bestFor: s.bestFor,
    pressure: s.pressure,
    material: s.material,
    turning: s.turning ? "Yes" : "No",
    milling: s.milling ? "Yes" : "No",
  },
  label: s.name,
}));

/** "a, b, c and d", lower-cased after the first, for the sentence asking what to send. */
function sendUsSentence(items: readonly string[]): string {
  const lower = items.map((item) => item.charAt(0).toLowerCase() + item.slice(1));
  return `${lower.slice(0, -1).join(", ")} and ${lower[lower.length - 1]}`;
}

/** The front page's banner: the whole photo in the middle of a band as wide as the page. The picture is the guide's cover photo set in the middle of a wide strip of the band's own colour, so the band shows all of it on a computer screen. */
export function FrontHero() {
  return (
    <Hero
      heading="Coolant nozzles"
      lead="Turning and milling. Coolant only works if it reaches the cutting edge: find the right system for your machine, then every part number you need."
      image={asset("images/hero-cover.webp")}
      action={
        <Button hero href="/parts" linkComponent={NavLink}>
          Find a part number
        </Button>
      }
    />
  );
}

export function Selector() {
  const [situation, setSituation] = useState<string | null>(null);
  const picked = SITUATIONS.find((s) => s.id === situation);

  return (
    <Stack>
      <Prose>
        <h1>Which system suits the job?</h1>
        <p>
          Nozzles that sag, vibrate or get knocked off-line cost you tool life, finish and chip evacuation. Our range
          covers everything from a simple screw-in replacement nozzle to a fully modular high-pressure line. Every option
          fits turning and milling machines; the right pick comes down to pressure, reach and how often you re-aim.
        </p>
      </Prose>
      <Form onSubmit={() => {}}>
        <RadioGroup
          label="What do you have?"
          name="situation"
          layout="cards"
          items={SITUATION_ITEMS}
          value={situation}
          onValueChange={setSituation}
        />
      </Form>
      {picked !== undefined && (
        <Card title="Start with" titleAs="h2">
          <Stack gap="sm">
            <Prose>
              <p>{picked.start}</p>
            </Prose>
            <Row align="start">
              {picked.systems.map((id) => (
                <Button key={id} variant="secondary" href={`/systems?system=${id}`} linkComponent={NavLink}>
                  {`See ${systemById(id).name}`}
                </Button>
              ))}
            </Row>
          </Stack>
        </Card>
      )}
      <Prose>
        <h2>The five systems side by side</h2>
      </Prose>
      <Table
        label="The five coolant systems compared"
        columns={COLUMNS}
        rows={ROWS}
        fold={{ summary: "pressure" }}
        empty={{ title: "No systems to compare" }}
      />
      <CallToAction
        heading="How to get the right nozzle, fast"
        lead={`Send us ${sendUsSentence(SEND_US)}. We'll recommend the best-fit system.`}
        image={photo("system-piranha")}
        actions={
          <Button cta large href={`mailto:${CONTACT.email}`}>
            Email us
          </Button>
        }
      />
    </Stack>
  );
}
