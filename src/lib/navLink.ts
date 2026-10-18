// The router's link in the shape the parts hand their `linkComponent`: they
// give it `href`, React Router's Link takes `to`. Every in-app link goes
// through it, so moving between pages never reloads the site.

import { createElement, forwardRef, type ComponentPropsWithoutRef } from "react";
import { Link as RouterLink } from "react-router";

export const NavLink = forwardRef<HTMLAnchorElement, Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string }>(
  function NavLink({ href, ...rest }, ref) {
    return createElement(RouterLink, { ref, to: href, ...rest });
  },
);
