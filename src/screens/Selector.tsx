// Screen 1, at "/": the front page. A banner, then the quick selector: pick
// what you have and the screen says where to start, with a way into each
// suggested system's page. Under it, the five systems side by side, and a
// band asking for a photo when nothing fits.

import { useState } from "react";
import { Button, CallToAction, Card, Form, Hero, Link, Prose, RadioGroup, Row, Stack, Table } from "@livetools/ui";
import type { RadioItem, TableColumn, TableRow } from "@livetools/ui";
import { CONTACT, SEND_US, SITUATIONS, SYSTEMS, systemById } from "../data/systems";
import { photo } from "../lib/assets";
import { NavLink } from "../lib/navLink";

const SITUATION_ITEMS: readonly RadioItem[] = SITUATIONS.map((s) => ({ value: s.id, label: s.have }));

const COLUMNS: readonly TableColumn[] = [
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

export function Selector() {
  const [situation, setSituation] = useState<string | null>(null);
  const picked = SITUATIONS.find((s) => s.id === situation);

  return (
    <Stack>
      <Hero
        heading="Coolant nozzles"
        lead="Turning and milling. Coolant only works if it reaches the cutting edge: find the right system for your machine, then every part number you need."
        image={photo("photo-cover")}
        action={
          <Button hero href="/parts" linkComponent={NavLink}>
            Find a part number
          </Button>
        }
      />
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
        heading="Not sure what you need?"
        lead={`Send us ${sendUsSentence(SEND_US)}. We'll recommend the best-fit system.`}
        image={photo("photo-piranha-turret")}
        actions={
          <Button cta large href={`mailto:${CONTACT.email}`}>
            Email us
          </Button>
        }
      />
    </Stack>
  );
}
