// Screen 4, at "/hpt": the Loc-Line HPT nozzle chooser. Pick the style,
// thread, nozzle length and bore, and the screen gives the 2-pack and
// 10-pack part numbers; under it, all 64 nozzles in one table.

import { useState } from "react";
import { Code, Form, FormGrid, Prose, RadioGroup, Readout, Row, Select, Specs, Stack, Table } from "@livetools/ui";
import type { RadioItem, SelectItem, TableColumn, TableRow } from "@livetools/ui";
import {
  HPT_BORES,
  HPT_LENGTHS,
  HPT_LEVER,
  HPT_NOZZLES,
  HPT_STYLES,
  HPT_THREADS,
  boreLabel,
  hptNozzle,
  lengthLabel,
  type HptStyle,
  type HptThread,
} from "../data/hpt";

const STYLE_ITEMS: readonly RadioItem[] = HPT_STYLES;
const THREAD_ITEMS: readonly RadioItem[] = HPT_THREADS;
const LENGTH_ITEMS: readonly SelectItem[] = HPT_LENGTHS.map((l) => ({ value: l.value, label: `${l.inch} (${l.mm})` }));
const BORE_ITEMS: readonly SelectItem[] = HPT_BORES.map((b) => ({ value: b.value, label: `${b.inch} (${b.mm})` }));

const COLUMNS: readonly TableColumn[] = [
  { id: "style", label: "Style", rowHeader: true },
  { id: "thread", label: "Thread", nowrap: true },
  { id: "length", label: "Nozzle length", kind: "number" },
  { id: "bore", label: "Bore diameter", kind: "number" },
  { id: "twoPack", label: "2-pack", kind: "code" },
  { id: "tenPack", label: "10-pack", kind: "code" },
];

const ROWS: readonly TableRow[] = HPT_NOZZLES.map((n) => ({
  id: n.twoPack,
  cells: {
    style: n.style,
    thread: `${n.thread}" NPT/BSPT`,
    length: lengthLabel(n.length),
    bore: boreLabel(n.bore),
    twoPack: <Code>{n.twoPack}</Code>,
    tenPack: <Code>{n.tenPack}</Code>,
  },
  sortValues: { length: Number(n.length), bore: Number(n.bore) },
  label: `${n.style} ${n.thread}" ${n.length}" long ${n.bore}" bore`,
}));

export function Hpt() {
  const [style, setStyle] = useState<HptStyle>("CT");
  const [thread, setThread] = useState<HptThread>("1/8");
  const [length, setLength] = useState<string | null>(null);
  const [bore, setBore] = useState<string | null>(null);

  const nozzle = length === null || bore === null ? null : hptNozzle(style, thread, length, bore);

  return (
    <Stack>
      <Prose>
        <h1>HPT nozzles</h1>
        <p>
          Loc-Line High Pressure Turret nozzles, rated 0 to 1,000 psi and 115 °F at most. CT (Compact Turret) suits tight
          spaces; XR (Extended Reach) gives 110 degree nozzle swing and reaches below the horizontal. Each comes in four
          bore diameters and four nozzle lengths in each thread.
        </p>
      </Prose>
      <Form onSubmit={() => {}}>
        <FormGrid>
          <RadioGroup
            label="Style"
            name="style"
            items={STYLE_ITEMS}
            value={style}
            onValueChange={(v) => setStyle(v as HptStyle)}
          />
          <RadioGroup
            label="Thread"
            name="thread"
            layout="buttons"
            items={THREAD_ITEMS}
            value={thread}
            onValueChange={(v) => setThread(v as HptThread)}
          />
          <Select
            label="Nozzle length"
            name="length"
            items={LENGTH_ITEMS}
            placeholder="Choose a length"
            value={length}
            onValueChange={setLength}
          />
          <Select
            label="Bore diameter"
            name="bore"
            items={BORE_ITEMS}
            placeholder="Choose a bore"
            value={bore}
            onValueChange={setBore}
          />
        </FormGrid>
      </Form>
      <Row>
        <Readout
          label="2-pack part number"
          value={nozzle === null ? null : <Code>{nozzle.twoPack}</Code>}
          note={nozzle === null ? "Fills in once a length and a bore are chosen." : "Two nozzles, standard orange and blue."}
        />
        <Readout
          label="10-pack part number"
          value={nozzle === null ? null : <Code>{nozzle.tenPack}</Code>}
          note={
            nozzle === null
              ? "Fills in once a length and a bore are chosen."
              : `Ten nozzles. Also in black (${nozzle.tenPack}-BLK) or grey (${nozzle.tenPack}-G).`
          }
        />
      </Row>
      <Specs
        bordered
        items={[
          { label: "Adjustment lever, 2-pack", value: <Code>{HPT_LEVER.twoPack}</Code> },
          { label: "Adjustment lever, 10-pack", value: <Code>{HPT_LEVER.tenPack}</Code> },
        ]}
      />
      <Prose>
        <h2>Every HPT nozzle</h2>
      </Prose>
      <Table
        label="Every HPT nozzle"
        columns={COLUMNS}
        rows={ROWS}
        sortable
        empty={{ title: "No HPT nozzles listed" }}
      />
    </Stack>
  );
}
