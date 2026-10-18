// The router's link in the shape the parts hand their `linkComponent`: they
// give it `href`, React Router's Link takes `to`. Every in-app link goes
// through it, so moving between pages never reloads the site. A file the
// site serves (a catalogue) or another site's address is not a page of this
// app, so it stays an ordinary link.

import { createElement, forwardRef, type ComponentPropsWithoutRef } from "react";
import { Link as RouterLink } from "react-router";

const NOT_A_PAGE = /^[a-z][a-z0-9+.-]*:|\.(pdf|webp)$/i;

export const NavLink = forwardRef<HTMLAnchorElement, Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string }>(
  function NavLink({ href, ...rest }, ref) {
    if (NOT_A_PAGE.test(href)) return createElement("a", { ref, href, ...rest });
    return createElement(RouterLink, { ref, to: href, ...rest });
  },
);
