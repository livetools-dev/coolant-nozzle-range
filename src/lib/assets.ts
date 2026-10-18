// The address of a file the site serves from its public folder: product
// photos and the suppliers' catalogues. The site's own address comes from
// where it is published, so it is read here, never written in.

export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}

/** A product photo, cut out from its background, by its name in the images folder. */
export function photo(name: string): string {
  return asset(`images/${name}.webp`);
}
