// Screen 3, at "/parts": every part number in the guide in one list, with a
// search and filters by range, system and kind of part. Each row opens a
// strip with its contents, notes and the colours it can be ordered in. The
// address can preset the range or the search (?range=Loc-Line, ?q=40413).

import { useState } from "react";
import { useSearchParams } from "react-router";
import { Code, Filter, Num, Pagination, Prose, Specs, Stack, Table, Toolbar, emptyFilterState } from "@livetools/ui";
import type { FilterSchema, FilterState, SpecsItem, TableColumn, TableRow } from "@livetools/ui";
import { CATEGORIES, GROUPS, PARTS, RANGES, type Part } from "../lib/parts";

const PAGE_SIZE = 50;

const SCHEMA: FilterSchema = {
  facets: [
    { key: "range", label: "Range", type: "checkbox", values: RANGES },
    { key: "group", label: "System or group", type: "checkbox", values: GROUPS },
    { key: "category", label: "Kind of part", type: "checkbox", values: CATEGORIES },
  ],
};

const FACETS = ["range", "group", "category"] as const;
type FacetKey = (typeof FACETS)[number];

const COLUMNS: readonly TableColumn[] = [
  { id: "part", label: "Part no.", kind: "code", rowHeader: true, nowrap: true },
  { id: "name", label: "Description" },
  { id: "pack", label: "Pack", kind: "number" },
  { id: "group", label: "System or group" },
];

/** How many come in the pack, where the contents are one item led by its count, as "(20) Y's" is. A kit's list of several items has no single count. */
function packOf(part: Part): number | null {
  const contents = part.contents ?? "";
  if (contents.includes(";")) return null;
  const m = /^\((\d+)\) /.exec(contents);
  return m === null ? null : Number(m[1]);
}

const COLOUR_WORDS = { "-BLK": "black", "-G": "grey", "-W": "white" } as const;

/** Whether a part passes the filter. `skip` leaves one facet out, for that facet's own counts. */
function matches(part: Part, state: FilterState, skip?: string): boolean {
  const q = state.q.toLowerCase();
  if (q !== "" && !`${part.part} ${part.name} ${part.contents ?? ""} ${part.group}`.toLowerCase().includes(q)) return false;
  return FACETS.every((key) => {
    const picked = state.facets[key] ?? [];
    return key === skip || picked.length === 0 || picked.includes(part[key]);
  });
}

function initialState(params: URLSearchParams): FilterState {
  const empty = emptyFilterState(SCHEMA);
  const range = params.get("range");
  return {
    ...empty,
    q: params.get("q") ?? "",
    facets: { ...empty.facets, range: range !== null && (RANGES as readonly string[]).includes(range) ? [range] : [] },
  };
}

function details(part: Part): readonly SpecsItem[] {
  const items: SpecsItem[] = [
    { label: "Range", value: part.range },
    { label: "System or group", value: part.group },
    { label: "Kind of part", value: part.category },
  ];
  if (part.contents !== undefined) items.push({ label: "Pack or contents", value: part.contents });
  if (part.note !== undefined) items.push({ label: "Note", value: part.note });
  if (part.colours !== undefined && part.colours.length > 0) {
    items.push({
      label: "Colours",
      value: (
        <>
          Standard orange and blue, or {part.colours.map((c) => COLOUR_WORDS[c]).join(", ")}: order as{" "}
          {part.colours.map((c, i) => (
            <span key={c}>
              {i > 0 && ", "}
              <Code>{`${part.part}${c}`}</Code>
            </span>
          ))}
        </>
      ),
    });
  }
  return items;
}

export function Parts() {
  const [params] = useSearchParams();
  const [filter, setFilter] = useState<FilterState>(() => initialState(params));
  const [page, setPage] = useState(1);

  const shown = PARTS.filter((p) => matches(p, filter));
  const pages = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const onPage = shown.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const count = (key: string, value: string, state: FilterState) =>
    PARTS.filter((p) => matches(p, state, key) && p[key as FacetKey] === value).length;

  const rows: readonly TableRow[] = onPage.map((p) => ({
    id: p.id,
    cells: { part: <Code>{p.part}</Code>, name: p.name, pack: packOf(p) === null ? "" : <Num>{packOf(p)}</Num>, group: p.group },
    label: `${p.part}, ${p.name}`,
  }));

  const detail = (row: TableRow) => {
    const part = PARTS.find((p) => p.id === row.id);
    return part === undefined ? null : <Specs items={details(part)} />;
  };

  function changeFilter(next: FilterState) {
    setFilter(next);
    setPage(1);
  }

  return (
    <Stack>
      <Prose>
        <h1>Part finder</h1>
        <p>
          Every part number in the range guide: stainless coolant tube, Evermore, Dorian and the full Loc-Line listing,
          HPT nozzles included. Search by part number or description, or narrow the list by range, system and kind of
          part. Open a row for its contents and the colours it comes in.
        </p>
      </Prose>
      <Filter
        schema={SCHEMA}
        value={filter}
        onChange={changeFilter}
        count={count}
        results={{ shown: shown.length, total: PARTS.length }}
        searchLabel="Search parts"
        searchPlaceholder="Search by part number or description"
      />
      <Table
        label="Part numbers"
        columns={COLUMNS}
        rows={rows}
        detail={detail}
        empty={{ title: "No parts match", body: "Clear a filter or search for something shorter." }}
      />
      {pages > 1 && (
        <Toolbar>
          <Pagination label="Part pages" page={current} pages={pages} onPageChange={setPage} />
        </Toolbar>
      )}
    </Stack>
  );
}
