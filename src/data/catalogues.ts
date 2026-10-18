// The suppliers' own catalogues, served from this site so customers stay on it.

import { asset } from "../lib/assets";

export type Catalogue = { label: string; href: string };

export const PIRANHA_CATALOGUE: Catalogue = {
  label: "Piranha Cooling Line catalogue (PDF, 2022)",
  href: asset("catalogues/piranha-cooling-line-catalogue-2022.pdf"),
};

export const LOC_LINE_CATALOGUE: Catalogue = {
  label: "Loc-Line catalogue (PDF, 2019)",
  href: asset("catalogues/loc-line-catalogue-2019.pdf"),
};

export const CATALOGUES: readonly Catalogue[] = [PIRANHA_CATALOGUE, LOC_LINE_CATALOGUE];
