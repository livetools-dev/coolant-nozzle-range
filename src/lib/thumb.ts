// A product photo for a table cell, as the range guide prints them: the
// guide's own picture on its own background, at one size for every row.
// The design system has no picture part for a table cell yet (reported to
// it), so this is a plain image sized by the app's own token.

import { createElement } from "react";
import { photo } from "./assets";

export function thumb(name: string, alt: string) {
  return createElement("img", { className: "app-thumb", src: photo(name), alt, loading: "lazy" });
}
