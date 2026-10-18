// The range guide's own pictures, on their own backgrounds, as the guide
// prints them: a photo in a table cell at one size for every row (thumb), or
// a photo, a drawing or a kit's strip picture set among text (picture). The design system has no
// picture part yet (reported to it), so these are plain images sized by the
// app's own tokens.

import { createElement } from "react";
import { photo } from "./assets";

export function thumb(name: string, alt: string) {
  return createElement("img", { className: "app-thumb", src: photo(name), alt, loading: "lazy" });
}

/** A photo beside text, a drawing under it, or a kit's strip picture over its table, as wide as its space up to the app's cap for that kind. */
export function picture(name: string, alt: string, kind: "photo" | "drawing" | "strip") {
  return createElement("img", { className: `app-${kind}`, src: photo(name), alt, loading: "lazy" });
}
