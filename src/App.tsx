// The frame every screen sits in: a Shell header carrying the large logotype,
// the guide's name and the navigation, a Panel main holding the routes, and a
// footer with how to reach Livetools and the suppliers' catalogues. An error
// boundary around it all shows a danger alert with a reload button instead
// of a blank page.

import { Component, type ErrorInfo, type ReactNode } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import {
  Alert,
  Button,
  EmptyState,
  Footer,
  Link,
  Logotype,
  Navigation,
  Panel,
  Prose,
  Row,
  Shell,
  Stack,
} from "@livetools/ui";
import type { FooterColumn, NavigationItem } from "@livetools/ui";
import { CATALOGUES } from "./data/catalogues";
import { CONTACT } from "./data/systems";
import { NavLink } from "./lib/navLink";
import { Selector } from "./screens/Selector";
import { Systems } from "./screens/Systems";
import { Parts } from "./screens/Parts";
import { Hpt } from "./screens/Hpt";

/** Where the app is served from: "/" locally, "/<repository>/" on GitHub Pages
 * without a custom domain. The router takes it without the trailing slash. */
const BASE = import.meta.env.BASE_URL;
const BASENAME = BASE.replace(/\/$/, "");

const SECTIONS = [
  { label: "Choose a system", href: "/" },
  { label: "Systems", href: "/systems" },
  { label: "Part finder", href: "/parts" },
  { label: "HPT nozzles", href: "/hpt" },
] as const;

const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: "Contact us",
    links: [
      { label: `Phone ${CONTACT.phone}`, href: CONTACT.phoneHref },
      { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
      { label: "livetools.com.au", href: CONTACT.website },
    ],
  },
  { heading: "Catalogues", links: CATALOGUES.map((c) => ({ label: c.label, href: c.href })) },
  { heading: "This guide", links: SECTIONS.map((s) => ({ label: s.label, href: s.href })) },
];

type BoundaryState = { failed: boolean };

/** React has no hook for catching a render fault, so this one piece is a class. */
class ErrorBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <Panel as="main" className="app-main">
        <Alert variant="danger" title="Something went wrong">
          <Stack gap="sm">
            <Prose>
              <p>This screen hit a fault and stopped. Reloading the page starts it again.</p>
            </Prose>
            <Row>
              <Button onClick={() => window.location.reload()}>Reload the page</Button>
            </Row>
          </Stack>
        </Alert>
      </Panel>
    );
  }
}

function Frame() {
  const { pathname } = useLocation();
  const items: readonly NavigationItem[] = SECTIONS.map((s) => ({ label: s.label, href: s.href, current: s.href === pathname }));
  return (
    <>
      <Shell className="app-band" logoSize="large">
        <Row>
          <Logotype />
          <span>Coolant Nozzle Range</span>
          <Navigation label="Sections" items={items} linkComponent={NavLink} />
        </Row>
      </Shell>
      <Panel as="main" className="app-main">
        <Routes>
          <Route path="/" element={<Selector />} />
          <Route path="/systems" element={<Systems />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/hpt" element={<Hpt />} />
          <Route
            path="*"
            element={
              <EmptyState title="Nothing at this address">
                <Link href="/" linkComponent={NavLink} standalone>
                  Back to choosing a system
                </Link>
              </EmptyState>
            }
          />
        </Routes>
      </Panel>
      <Footer
        brand={
          <Stack gap="sm">
            <Logotype />
            <Prose>
              <p>
                Coolant nozzles for turning and milling, from a screw-in replacement nozzle to a fully modular
                high-pressure line. Send us a photo of your setup and we'll match it.
              </p>
            </Prose>
          </Stack>
        }
        columns={FOOTER_COLUMNS}
        legal={`© ${CONTACT.company}, ${CONTACT.address}`}
        linkComponent={NavLink}
      />
    </>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={BASENAME}>
        <Frame />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
