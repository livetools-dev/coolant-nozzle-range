// The suppliers' own catalogues (Piranha's of 2022, Loc-Line's of 2019), served
// from this site so customers stay on it. They open in a new tab.

import { asset } from "../lib/assets";

export type Catalogue = { label: string; href: string };

export const PIRANHA_CATALOGUE: Catalogue = {
  label: "Piranha Cooling Line catalogue",
  href: asset("catalogues/piranha-cooling-line-catalogue-2022.pdf"),
};

export const LOC_LINE_CATALOGUE: Catalogue = {
  label: "Loc-Line catalogue",
  href: asset("catalogues/loc-line-catalogue-2019.pdf"),
};

export const CATALOGUES: readonly Catalogue[] = [PIRANHA_CATALOGUE, LOC_LINE_CATALOGUE];
