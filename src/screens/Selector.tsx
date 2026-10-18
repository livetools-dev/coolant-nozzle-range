// Screen 1, at "/": the guide's quick selector. Pick what the customer has
// and the screen says where to start, with a way into each suggested
// system's page; under it, the five systems side by side, and what to send
// Livetools when nothing fits.

import { useState } from "react";
import { Button, Card, Form, Link, Prose, RadioGroup, Row, Stack, Table } from "@livetools/ui";
import type { RadioItem, TableColumn, TableRow } from "@livetools/ui";
import { CONTACT, SEND_US, SITUATIONS, SYSTEMS, systemById } from "../data/systems";
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

export function Selector() {
  const [situation, setSituation] = useState<string | null>(null);
  const picked = SITUATIONS.find((s) => s.id === situation);

  return (
    <Stack>
      <Prose>
        <h1>Which system suits the job?</h1>
        <p>
          Coolant only works if it reaches the cutting edge. Nozzles that sag, vibrate or get knocked off-line cost
          tool life, finish and chip evacuation. The range covers everything from a simple screw-in replacement nozzle
          to a fully modular high-pressure line. Every option fits turning and milling machines; the right pick comes
          down to pressure, reach and how often you re-aim.
        </p>
      </Prose>
      <Form onSubmit={() => {}}>
        <RadioGroup
          label="What does the customer have?"
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
      <Card title="Not sure what you need?" titleAs="h2">
        <Prose>
          <p>Send Livetools these four things and they will recommend the best-fit system and quote:</p>
          <ol>
            {SEND_US.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p>
            Phone <Link href={CONTACT.phoneHref}>{CONTACT.phone}</Link> or email{" "}
            <Link href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link>. {CONTACT.company}, {CONTACT.address}.
          </p>
        </Prose>
      </Card>
    </Stack>
  );
}
