// The router's link in the shape the parts hand their `linkComponent`: they
// give it `href`, React Router's Link takes `to`. Every in-app link goes
// through it, so moving between pages never reloads the site. A catalogue the
// site serves opens in a new tab; another site's address, a phone number or
// an email address stays an ordinary link.

import { createElement, forwardRef, type ComponentPropsWithoutRef } from "react";
import { Link as RouterLink } from "react-router";

const NOT_A_PAGE = /^[a-z][a-z0-9+.-]*:/i;
const A_FILE = /\.pdf$/i;

export const NavLink = forwardRef<HTMLAnchorElement, Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string }>(
  function NavLink({ href, ...rest }, ref) {
    if (A_FILE.test(href)) return createElement("a", { ref, href, target: "_blank", rel: "noopener", ...rest });
    if (NOT_A_PAGE.test(href)) return createElement("a", { ref, href, ...rest });
    return createElement(RouterLink, { ref, to: href, ...rest });
  },
);
