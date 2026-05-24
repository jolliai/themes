/**
 * Flux theme CSS — production-grade fixed-sidebar layout.
 *
 * Emits the shared component styles from ./components.mjs followed by
 * Flux-specific design tokens and theme-prefixed layout selectors.
 */

import manifest from "./manifest.mjs";
import COMPONENTS_CSS from "./components.mjs";

const FLUX_THEME_CSS = `
/*
 * Flux Theme
 * Defines design tokens and layout. Component styles live in ./components.mjs.
 */


/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */

:root {
  /* Nextra internals */
  --nextra-primary-hue: 228;
  --nextra-primary-saturation: 84%;
  --nextra-primary-lightness: 61%;
  --nextra-bg: 255 255 255;
  --nextra-navbar-height: 64px;

  /* ── User overrides (injected inline by layout.jsx from defaults.jsx) ── */
  /* --w-brand-color and --w-font-family are set on <html> */

  /* ── Accent ─────────────────────────────────────────── */
  --w-accent:        var(--w-brand-color);
  --w-accent-soft:   color-mix(in srgb, var(--w-accent) 10%, white);
  --w-accent-border: color-mix(in srgb, var(--w-accent) 32%, white);

  /* ── General palette ────────────────────────────────── */
  --w-bg:            #ffffff;
  --w-border:        #e5e7eb;
  --w-border-soft:   #f3f4f6;
  --w-text-strong:   #111827;
  --w-text:          #374151;
  --w-text-soft:     #6b7280;
  --w-text-faint:    #9ca3af;
  --w-hover-bg:      #f9fafb;

  /* ── Component colour tokens ────────────────────────── */
  --w-code-bg:             #f8fafc;
  --w-code-shadow:         0 1px 3px rgba(0,0,0,0.04);
  --w-filename-header-bg:  var(--w-border-soft);
  --w-inline-code-color:   color-mix(in srgb, var(--w-accent) 85%, black);
  --w-inline-code-bg:      var(--w-accent-soft);
  --w-inline-code-border:  color-mix(in srgb, var(--w-accent) 18%, white);
  --w-card-bg:             #ffffff;
  --w-scrollbar-thumb:     #d1d5db;

  /* ── HTTP method colours (API reference) ───────────── */
  --w-method-get:          #2563eb;
  --w-method-post:         #16a34a;
  --w-method-put:          #d97706;
  --w-method-patch:        #9333ea;
  --w-method-delete:       #dc2626;

  /* ── HTTP status colours (API reference) ───────────── */
  --w-status-2xx:          #16a34a;
  --w-status-3xx:          #2563eb;
  --w-status-4xx:          #d97706;
  --w-status-5xx:          #dc2626;

  /* ── API reference page outer grid ──────────────────
     Wider variant of the default outer grid template used on pages that
     contain an .api-endpoint-grid. Col 4 (= the samples aside slot)
     expands; cols 3 (article) and 1/2 (sidebar) stay the same so the
     article and footer don't shift. Consumed by components.css.        */
  --w-grid-cols-api:       295px 1fr 920px 567px 1fr;

  /* ── Header (navbar) ────────────────────────────────── */
  --header-bg:             #ffffff;
  --header-border:         #e5e7eb;
  --header-logo-color:     #111827;
  --header-search-bg:      #f3f4f6;
  --header-search-border:  #e5e7eb;
  --header-search-color:   #6b7280;
  --header-kbd-bg:         #ffffff;
  --header-kbd-color:      #9ca3af;

  /* ── Left-hand nav (sidebar) ────────────────────────── */
  --nav-bg:                #f3f4f6;
  --nav-border:            #e5e7eb;
  --nav-section-color:     #9ca3af;
  --nav-item-color:        #4b5563;
  --nav-item-hover-bg:     #e9ebee;
  --nav-item-hover-color:  #111827;
  --nav-active-bg:         #ffffff;
  --nav-active-color:      var(--w-accent);
  --nav-active-bar:        var(--w-accent);
  --nav-footer-bg:         #eceef1;
  --nav-footer-border:     #e5e7eb;
  --nav-footer-color:      #6b7280;
}

.dark {
  --nextra-bg: 17 17 17;
  --nextra-primary-lightness: 61%;

  --w-accent-soft:   color-mix(in srgb, var(--w-accent) 15%, #111111);
  --w-accent-border: color-mix(in srgb, var(--w-accent) 45%, #111111);
  --w-bg:            #111111;
  --w-border:        #2d2d2d;
  --w-border-soft:   #1a1a1a;
  --w-text-strong:   #f9fafb;
  --w-text:          #d1d5db;
  --w-text-soft:     #9ca3af;
  --w-text-faint:    #6b7280;
  --w-hover-bg:      #1e1e1e;

  --w-code-bg:             #161616;
  --w-code-shadow:         none;
  --w-filename-header-bg:  #1a1a1a;
  --w-inline-code-color:   color-mix(in srgb, var(--w-accent) 60%, white);
  --w-inline-code-bg:      color-mix(in srgb, var(--w-accent) 12%, #111111);
  --w-inline-code-border:  color-mix(in srgb, var(--w-accent) 22%, #111111);
  --w-card-bg:             #161616;
  --w-scrollbar-thumb:     #3d3d3d;

  --w-method-get:          #60a5fa;
  --w-method-post:         #4ade80;
  --w-method-put:          #fbbf24;
  --w-method-patch:        #c084fc;
  --w-method-delete:       #f87171;

  --w-status-2xx:          #4ade80;
  --w-status-3xx:          #60a5fa;
  --w-status-4xx:          #fbbf24;
  --w-status-5xx:          #f87171;

  --header-bg:             #111111;
  --header-border:         #2d2d2d;
  --header-logo-color:     #f9fafb;
  --header-search-bg:      #1e1e1e;
  --header-search-border:  #2d2d2d;
  --header-search-color:   #9ca3af;
  --header-kbd-bg:         #2d2d2d;
  --header-kbd-color:      #4b5563;

  --nav-bg:                #1a1a1a;
  --nav-border:            #2d2d2d;
  --nav-section-color:     #6b7280;
  --nav-item-color:        #9ca3af;
  --nav-item-hover-bg:     #222222;
  --nav-item-hover-color:  #f9fafb;
  --nav-active-bg:         #242424;
  --nav-active-color:      color-mix(in srgb, var(--w-accent) 60%, white);
  --nav-active-bar:        color-mix(in srgb, var(--w-accent) 60%, white);
  --nav-footer-bg:         #111111;
  --nav-footer-border:     #2d2d2d;
  --nav-footer-color:      #6b7280;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BASE
   ═══════════════════════════════════════════════════════════════════════════ */

html {
  font-family: var(--w-font-family) !important;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.011em;
}

body { background-color: var(--w-bg); }

/* ═══════════════════════════════════════════════════════════════════════════
   FLUX FOOTER — overrides for the flux-footer class
   ═══════════════════════════════════════════════════════════════════════════ */

/* Override Nextra's x:flex row layout so columns section sits above the bar.
   Needs element+class specificity (0,1,1) to beat .x:flex (0,1,0). */
footer.flux-footer {
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  padding: 0 2.5rem 2.5rem !important;
  max-width: 100% !important;
  margin: 0 !important;
}

/* Nextra renders an <hr> above the <footer> — hide it since our border-top replaces it */
div:has(> footer.flux-footer) > hr { display: none !important; }

/* No-columns case: bar is first child and needs the top separator */
footer.flux-footer > .w-footer-bar:first-child {
  border-top: 1px solid var(--w-border);
  padding-top: 2rem;
}

/* When rendered as a direct child of the footer (columns layout), pin to bottom-right */
footer.flux-footer > .w-footer-powered {
  display: block;
  align-self: flex-end;
  margin-top: 1rem;
  padding-right: 1rem;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR LOGO — pinned to very top of sidebar column
   ═══════════════════════════════════════════════════════════════════════════ */

.flux-sidebar-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: 295px;
  height: var(--nextra-navbar-height);
  background: var(--nav-bg);
  z-index: 36;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  flex-shrink: 0;
}

.flux-sidebar-logo a {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--nav-item-hover-color);
  text-decoration: none;
}
.flux-sidebar-logo a svg {
  flex-shrink: 0;
  color: var(--w-accent);
}
.flux-sidebar-logo a img {
  height: 32px;
  width: auto;
  flex-shrink: 0;
  margin-left: 0.5rem;
}
.flux-sidebar-logo a:hover { opacity: 0.75; }

@media (max-width: 767px) {
  .flux-sidebar-logo { display: none; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR SEARCH — pinned below the logo
   ═══════════════════════════════════════════════════════════════════════════ */

.flux-sidebar-search {
  position: fixed;
  top: var(--nextra-navbar-height);
  left: 0;
  width: 295px;
  padding: 0.625rem 1rem;
  background: var(--nav-bg);
  z-index: 36;
}

.flux-sidebar-search .nextra-search input {
  width: 100% !important;
  background: var(--w-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.5rem !important;
  padding: 0.4375rem 0.75rem !important;
  font-size: 0.8125rem !important;
  font-family: inherit !important;
  color: var(--w-text-soft) !important;
  transition: border-color 0.15s, box-shadow 0.15s !important;
}
.flux-sidebar-search .nextra-search input::placeholder {
  color: var(--w-text-faint) !important;
}
.flux-sidebar-search .nextra-search input:focus {
  border-color: var(--w-accent) !important;
  box-shadow: 0 0 0 3px var(--w-accent-soft) !important;
  outline: none !important;
  color: var(--w-text-strong) !important;
}
.flux-sidebar-search .nextra-search kbd {
  background: var(--w-border-soft) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.25rem !important;
  color: var(--w-text-faint) !important;
  font-family: inherit !important;
  font-size: 0.625rem !important;
  box-shadow: none !important;
  padding: 0 0.3rem !important;
}
.dark .flux-sidebar-search .nextra-search input {
  background: var(--w-border-soft) !important;
}

/* Push sidebar scroll area below the pinned logo + search */
.nextra-sidebar > div:first-child {
  padding-top: calc(var(--nextra-navbar-height) + 3.75rem) !important;
}

/* Search results panel above sidebar z-index */
.nextra-search ul,
.nextra-search [role="listbox"],
.nextra-search [role="dialog"],
.nextra-search > div:not(:first-child),
.nextra-search > p {
  z-index: 200 !important;
  position: relative;
}

body > [class*="rounded-xl"][class*="shadow-xl"],
body > [class*="z-30"][class*="rounded"] {
  z-index: 200 !important;
}

/* Same intent as the rules above, but matches the popover element directly.
   Nextra v4 portals the search popover into
   body > #headlessui-portal-root > div > .nextra-search-results, so the
   "body > ..." direct-child selectors above never match in current Nextra. */
.nextra-search-results {
  z-index: 200 !important;
}

@media (max-width: 767px) {
  .flux-sidebar-search { display: none; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   HEADER / NAVBAR
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-navbar-blur {
  background-color: var(--header-bg) !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-bottom: 1px solid var(--nav-bg) !important;
}

.nextra-navbar nav {
  max-width: 100% !important;
  padding-left: calc(295px + 1.5rem) !important;
  padding-right: 1.5rem !important;
  gap: 1.25rem !important;
}

.nextra-navbar nav > a:not([href="/"]) {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  font-family: inherit !important;
  color: var(--w-text-soft) !important;
  text-decoration: none !important;
  transition: color 0.12s !important;
}
.nextra-navbar nav > a:not([href="/"]):hover {
  color: var(--w-text-strong) !important;
}

@media (max-width: 767px) {
  .nextra-navbar nav {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
}

/* Desktop: hide the navbar logo (sidebar logo takes over) */
.nextra-navbar nav > a[href="/"] {
  display: none !important;
}

/* Mobile: show navbar logo */
@media (max-width: 767px) {
  .nextra-navbar nav > a[href="/"] {
    display: flex !important;
    align-items: center !important;
    margin-right: auto !important;
  }
}

/* Blog/Changelog are rendered twice on purpose:
   - As Navbar JSX children (.flux-nav-link), which place them on the right
     side of the desktop header next to ThemeSwitch.
   - As _meta.js page-map entries, which place them in the mobile drawer.
   Hide each copy where it's not wanted to avoid duplicates. */

/* Desktop: hide the page-map duplicates from the navbar pages strip. */
.nextra-navbar nav > div > a[href="https://blog.feldera.com"],
.nextra-navbar nav > div > a[href="#"] {
  display: none !important;
}

/* Mobile: hide the inline Navbar JSX links; they live in the drawer instead. */
@media (max-width: 767px) {
  .nextra-navbar nav > .flux-nav-link { display: none !important; }
}

/* Pin the inline header items to the theme font explicitly. The earlier
   \`nav > a:not([href="/"])\` rule uses \`font-family: inherit\`, which is
   normally enough — making it explicit guards against any intermediate
   element overriding the inherited family. */
.nextra-navbar nav > a.flux-nav-link {
  font-family: var(--w-font-family) !important;
}

/* External-link arrow on inline header items — matches the ↗ used on cards. */
.flux-nav-link[href^="http"]::after {
  content: '↗';
  display: inline-block;
  margin-left: 0.2em;
  font-size: 0.85em;
  font-family: var(--w-font-family);
  color: var(--w-text-faint);
  transition: color 0.12s;
}
.flux-nav-link[href^="http"]:hover::after { color: var(--w-text-strong); }

.flux-navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--w-text-strong);
}
.flux-navbar-logo svg {
  flex-shrink: 0;
  color: var(--w-accent);
}
.flux-navbar-logo img {
  height: 32px;
  width: auto;
  flex-shrink: 0;
}

.nextra-navbar nav > div:not(:has(.nextra-search)) {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  overflow: visible;
}

.nextra-navbar .nextra-search { margin-left: auto; }
.flux-sidebar-search .nextra-search { margin-left: 0; width: 100%; }

.nextra-search input {
  width: 13rem !important;
  background: var(--header-search-bg) !important;
  border: 1px solid var(--header-search-border) !important;
  border-radius: 0.5rem !important;
  padding: 0.375rem 0.75rem !important;
  font-size: 0.8125rem !important;
  font-family: inherit !important;
  color: var(--header-search-color) !important;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s !important;
}
.nextra-search input::placeholder { color: var(--header-search-color) !important; }
.nextra-search input:focus {
  background: var(--w-bg) !important;
  border-color: var(--w-accent) !important;
  box-shadow: 0 0 0 3px var(--w-accent-soft) !important;
  outline: none !important;
  color: var(--w-text-strong) !important;
}

.nextra-search kbd {
  background: var(--header-kbd-bg) !important;
  border: 1px solid var(--header-search-border) !important;
  border-radius: 0.25rem !important;
  color: var(--header-kbd-color) !important;
  font-family: inherit !important;
  font-size: 0.625rem !important;
  letter-spacing: 0.02em !important;
  box-shadow: none !important;
  padding: 0 0.3rem !important;
}

.nextra-hamburger {
  color: var(--w-text-soft) !important;
  padding: 0.375rem !important;
  border-radius: 0.375rem !important;
}
.nextra-hamburger:hover {
  background: var(--w-hover-bg) !important;
  color: var(--w-text-strong) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN LAYOUT — 5-col grid
   col: [sidebar 295px] [1fr] [article 920px] [toc 252px] [1fr]
   ═══════════════════════════════════════════════════════════════════════════ */

div:has(> aside.nextra-sidebar) {
  display: grid !important;
  grid-template-columns: 295px 1fr 920px 252px 1fr !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  align-items: start !important;
}

aside.nextra-sidebar { grid-column: 1 !important; grid-row: 1 !important; }
article              { grid-column: 3 !important; grid-row: 1 !important; min-width: 0 !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; }
nav.nextra-toc       { grid-column: 4 !important; grid-row: 1 !important; width: 252px !important; order: unset !important; }

/* Footer outer wrapper — Nextra renders this as a full-width div outside the
   main grid. Give it the same column template so its children land under the
   article column, not the sidebar. */
body > div:has(> footer) {
  display: grid !important;
  grid-template-columns: 295px 1fr 920px 252px 1fr !important;
  background: var(--w-bg) !important;
}

body > div:has(> footer) > * {
  grid-column: 3 !important;
  min-width: 0 !important;
  max-width: 100% !important;
}

/* Tablet: TOC hidden, article becomes fluid (max 920px) instead of fixed so
   it can shrink to fit when the viewport drops below 1215px. */
@media (max-width: 1279px) {
  div:has(> aside.nextra-sidebar) {
    grid-template-columns: 295px minmax(0, 1fr) !important;
  }
  body > div:has(> footer) {
    grid-template-columns: 295px minmax(0, 1fr) !important;
  }
  article {
    grid-column: 2 !important;
    max-width: 920px !important;
  }
  body > div:has(> footer) > * { grid-column: 2 !important; }
  nav.nextra-toc { display: none !important; }
}

/* Small tablet: shrink article horizontal padding so content has room. */
@media (max-width: 900px) {
  article { padding: 0 1.75rem 4.5rem !important; }
}

/* Mobile: sidebar collapses behind hamburger, article fills the viewport. */
@media (max-width: 767px) {
  div:has(> aside.nextra-sidebar)  { grid-template-columns: 1fr !important; }
  body > div:has(> footer)          { grid-template-columns: 1fr !important; }
  aside.nextra-sidebar             { display: none !important; }
  article                          { grid-column: 1 !important; padding: 0 1.25rem 4rem !important; }
  body > div:has(> footer) > *      { grid-column: 1 !important; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR / LEFT-HAND NAV
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-sidebar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 295px !important;
  min-width: 295px !important;
  height: 100dvh !important;
  background: var(--nav-bg) !important;
  border-right: none !important;
  z-index: 35 !important;
}

div:has(> aside.nextra-sidebar)::before {
  content: '';
  display: block;
  grid-column: 1;
  grid-row: 1;
  width: 295px;
  pointer-events: none;
}

.nextra-sidebar > div:first-child {
  padding: calc(var(--nextra-navbar-height) + 3.75rem) 1rem 1rem !important;
  scrollbar-gutter: auto !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul {
  gap: 0 !important;
  display: flex !important;
  flex-direction: column !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) ul > li:not(:has(> a, > button)) {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: var(--nav-section-color) !important;
  padding: 0.375rem 0.5rem 0.25rem 0.875rem !important;
  margin-top: 1.05rem !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) ul > li:first-of-type:not(:has(> a, > button)) {
  margin-top: 0.5rem !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) ul > li > a,
:is(.nextra-sidebar, .nextra-mobile-nav) ul > li > button {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: var(--nav-item-color) !important;
  padding: 0.3125rem 0.5rem 0.3125rem 0.875rem !important;
  border-radius: 0.375rem !important;
  background: none !important;
  transition: background 0.1s, color 0.1s !important;
  width: 100% !important;
  text-align: start !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) ul > li > a:hover,
:is(.nextra-sidebar, .nextra-mobile-nav) ul > li > button:hover {
  background: var(--nav-item-hover-bg) !important;
  color: var(--nav-item-hover-color) !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul {
  padding-inline-start: 0 !important;
  margin-inline-start: 0 !important;
  padding-top: 0 !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li > div {
  padding-top: 0 !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li.open > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li.open > button {
  padding-bottom: 0.5rem !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul::before {
  display: none !important;
  width: 0 !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul li > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul li > button {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: var(--nav-item-color) !important;
  padding: 0.3125rem 0.5rem 0.3125rem calc(0.875rem + 0.625rem) !important;
  border-radius: 0.375rem !important;
  background: none !important;
  transition: background 0.1s, color 0.1s !important;
  margin: 0 !important;
  position: relative !important;
  overflow: visible !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul li > a:hover,
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul li > button:hover {
  background: var(--nav-item-hover-bg) !important;
  color: var(--nav-item-hover-color) !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul li > div > ul li > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul li > div > ul li > button {
  padding-left: calc(0.875rem + 0.625rem * 2) !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul li > div > ul li > div > ul li > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul li > div > ul li > div > ul li > button {
  padding-left: calc(0.875rem + 0.625rem * 3) !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) li.active > a,
:is(.nextra-sidebar, .nextra-mobile-nav) li.active > a:hover {
  color: var(--nav-active-color) !important;
  background: var(--nav-active-bg) !important;
}

.nextra-sidebar-footer { display: none !important; }

.nextra-navbar .nextra-theme-switch { display: flex; align-items: center; }
.nextra-navbar .nextra-theme-switch span { display: none !important; }
.nextra-navbar .nextra-theme-switch button {
  padding: 0.375rem !important;
  border-radius: 0.375rem !important;
  color: var(--w-text-soft) !important;
  background: none !important;
  border: none !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.1s, color 0.1s;
}
.nextra-navbar .nextra-theme-switch button:hover {
  background: var(--w-hover-bg) !important;
  color: var(--w-text-strong) !important;
}

.nextra-mobile-nav {
  background: var(--nav-bg) !important;
}
.nextra-mobile-nav > div:first-child {
  padding: 0.75rem 1rem 1rem !important;
}
.nextra-mobile-nav .nextra-sidebar-footer {
  display: flex !important;
  background: var(--nav-footer-bg) !important;
  border-top-color: var(--nav-footer-border) !important;
}
.nextra-mobile-nav .nextra-sidebar-footer button {
  font-size: 0.75rem !important;
  font-family: inherit !important;
  font-weight: 500 !important;
  color: var(--nav-footer-color) !important;
  border-radius: 0.375rem !important;
  padding: 0.3125rem 0.5rem !important;
  transition: background 0.1s, color 0.1s !important;
}
.nextra-mobile-nav .nextra-sidebar-footer button:hover {
  background: var(--nav-item-hover-bg) !important;
  color: var(--nav-item-hover-color) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOC — right column
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-toc {
  width: 252px !important;
  min-width: 0 !important;
  padding-left: 2rem !important;
  position: sticky !important;
  top: var(--nextra-navbar-height) !important;
  max-height: calc(100vh - var(--nextra-navbar-height)) !important;
  overflow-y: auto !important;
}

.nextra-toc > div > p:first-child {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: var(--w-text-faint) !important;
  padding: 1.5rem 1rem 0.5rem !important;
}

.nextra-toc ul { padding: 0.5rem 1rem 1rem !important; }
.nextra-toc ul li { margin: 0 !important; }
.nextra-toc ul li a {
  font-size: 0.8125rem !important;
  font-weight: 400 !important;
  color: var(--w-text-soft) !important;
  padding: 0.3rem 0 !important;
  display: block !important;
  transition: color 0.12s !important;
  line-height: 1.4 !important;
}
.nextra-toc ul li a:hover { color: var(--w-accent) !important; }
.nextra-toc ul li a[class*="font-semibold"] {
  color: var(--w-accent) !important;
  font-weight: 500 !important;
}

.nextra-toc > div > div:last-child { display: none !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   FLUX CTA BUTTON — inline header call-to-action
   ═══════════════════════════════════════════════════════════════════════════ */

.flux-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #ffffff !important;
  background: var(--w-accent);
  padding: 0.375rem 0.875rem;
  border-radius: 0.375rem;
  text-decoration: none !important;
  transition: opacity 0.12s;
  white-space: nowrap;
}
.flux-cta-button:hover { opacity: 0.9; }

/* ═══════════════════════════════════════════════════════════════════════════
   FLUX HIDDEN NAVBAR — utility to hide the navbar entirely
   ═══════════════════════════════════════════════════════════════════════════ */

.flux-hidden-navbar .nextra-navbar { display: none !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   FLUX SIDEBAR TABS — documentation section switcher above the sidebar tree
   ═══════════════════════════════════════════════════════════════════════════ */

.flux-sidebar-tabs {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background: var(--w-border-soft);
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.flux-sidebar-tabs button {
  flex: 1;
  padding: 0.375rem 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--w-text-soft);
  background: none;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: color 0.12s, background 0.12s;
  font-family: inherit;
}
.flux-sidebar-tabs button:hover {
  color: var(--w-text-strong);
}
.flux-sidebar-tabs button[data-active="true"] {
  background: var(--w-bg);
  color: var(--w-text-strong);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}

/* ═══════════════════════════════════════════════════════════════════════════
   API REFERENCE — Flux-specific overrides
   Styles for the OpenAPI-generated endpoint pages. Components live in
   src/components/api/*; class names are stable contract surface.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Layout ───────────────────────────────────────────────────────────── */

.api-endpoint-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 28rem);
  gap: 2.5rem;
  align-items: start;
}

.api-endpoint-main { min-width: 0; }

.api-endpoint-aside {
  position: sticky;
  top: calc(var(--nextra-navbar-height) + 1.5rem);
  max-height: calc(100vh - var(--nextra-navbar-height) - 3rem);
  overflow-y: auto;
  min-width: 0;
}

.api-endpoint-main > h1 {
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--w-text-strong);
  margin: 0 0 1rem;
}

.api-endpoint-main > h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--w-text-strong);
  margin: 2.25rem 0 0.875rem;
  letter-spacing: -0.01em;
}

/* ── Endpoint meta bar (method + path) ─────────────────────────────────── */

.api-endpoint-meta {
  display: flex !important;
  align-items: center !important;
  gap: 0.625rem !important;
  padding: 0.625rem 0.875rem;
  background: var(--w-code-bg);
  border: 1px solid var(--w-border);
  border-radius: 8px;
  margin: 0 0 1.75rem !important;
  flex-wrap: wrap !important;
}

.api-method {
  display: inline-flex !important;
  align-items: center !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.6875rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.06em;
  text-transform: uppercase !important;
  padding: 0.25rem 0.5rem;
  border-radius: 5px !important;
  color: #ffffff;
  line-height: 1 !important;
  flex-shrink: 0;
  border: none !important;
}

.api-method-get    { background: var(--w-method-get) !important; }
.api-method-post   { background: var(--w-method-post) !important; }
.api-method-put    { background: var(--w-method-put) !important; }
.api-method-patch  { background: var(--w-method-patch) !important; }
.api-method-delete { background: var(--w-method-delete) !important; }

.api-endpoint-path {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: var(--w-text-strong) !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  word-break: break-all;
}

.api-endpoint-tag {
  font-size: 0.6875rem !important;
  font-weight: 500 !important;
  background: var(--w-border-soft) !important;
  color: var(--w-text-soft) !important;
  padding: 0.1875rem 0.5rem !important;
  border-radius: 999px !important;
  text-transform: capitalize;
  border: none !important;
}

.api-endpoint-tag + .api-endpoint-tag,
.api-endpoint-meta > .api-endpoint-tag:first-of-type { margin-left: auto; }
.api-endpoint-meta > .api-endpoint-tag + .api-endpoint-tag { margin-left: 0; }

.api-endpoint-deprecated {
  font-size: 0.6875rem;
  font-weight: 600;
  background: color-mix(in srgb, var(--w-method-delete) 12%, transparent);
  color: var(--w-method-delete);
  border: 1px solid color-mix(in srgb, var(--w-method-delete) 30%, transparent);
  padding: 0.1875rem 0.5rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Combined endpoint bar: meta row + Try-it accordion. The header keeps the
   same chrome as the standalone .api-endpoint-meta; when expanded, the
   accordion panel inherits the bar's frame, no separate card needed. */
.api-endpoint-bar {
  background: var(--w-code-bg);
  border: 1px solid var(--w-border);
  border-radius: 8px;
  margin: 0 0 1.75rem;
  overflow: hidden;
}

.api-endpoint-bar-header {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.875rem;
  flex-wrap: wrap;
}

.api-endpoint-tryit-toggle {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--w-text-strong);
  background: var(--w-bg);
  border: 1px solid var(--w-border);
  border-radius: 0.375rem;
  padding: 0.3125rem 0.625rem;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
}

.api-endpoint-tryit-toggle:hover {
  background: var(--w-border-soft);
  border-color: var(--w-accent-border);
}

.api-endpoint-tryit-chevron {
  transition: transform 0.15s;
  color: var(--w-text-soft);
}

.api-endpoint-bar[data-open="true"] .api-endpoint-tryit-chevron {
  transform: rotate(180deg);
}

.api-endpoint-bar[data-open="true"] .api-endpoint-tryit-toggle {
  background: var(--w-accent-soft);
  border-color: var(--w-accent-border);
  color: var(--w-accent);
}

.api-endpoint-tryit-panel {
  border-top: 1px solid var(--w-border);
  background: var(--w-bg);
}

/* Strip the .api-tryit card's outer chrome when it's rendered inside the
   accordion — the bar's frame already provides one. */
.api-endpoint-tryit-panel .api-tryit {
  border: none;
  border-radius: 0;
  margin: 0;
  background: transparent;
}

/* The TryIt component shows its own method/path header; hide it here since
   the bar's header already shows that info. */
.api-endpoint-tryit-panel .api-tryit-header {
  display: none;
}

/* ── Parameters table ─────────────────────────────────────────────────── */

.api-param-section { margin: 0 0 1.5rem !important; }

.api-param-section-title {
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em;
  color: var(--w-text-soft) !important;
  margin: 0 0 0.5rem !important;
}

.api-param-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  border: 1px solid var(--w-border);
  border-radius: 8px;
  overflow: hidden;
}

.api-param-table thead { background: var(--w-border-soft); }

.api-param-table th {
  text-align: left;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--w-text-soft);
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--w-border);
}

.api-param-table td {
  padding: 0.625rem 0.75rem;
  border-bottom: 1px solid var(--w-border-soft);
  vertical-align: top;
  color: var(--w-text);
  line-height: 1.5;
}

.api-param-table tr:last-child td { border-bottom: none; }

.api-param-table td code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--w-text-strong);
  background: transparent;
  border: none;
  padding: 0;
}

/* ── Schema tree ──────────────────────────────────────────────────────── */

.api-schema-block {
  border: 1px solid var(--w-border) !important;
  border-radius: 8px !important;
  padding: 0.25rem 0.875rem !important;
  background: var(--w-bg) !important;
  margin-bottom: 1rem !important;
}

.api-schema-root,
.api-schema-children {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.api-schema-row {
  padding: 0.5rem 0 !important;
  border-bottom: 1px solid var(--w-border-soft) !important;
}

.api-schema-row:last-child { border-bottom: none !important; }

.api-schema-row-head {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 0.5rem !important;
  font-size: 0.875rem;
}

.api-schema-toggle {
  width: 18px !important;
  height: 18px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid var(--w-border) !important;
  background: var(--w-bg) !important;
  border-radius: 4px !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem !important;
  font-weight: 600;
  color: var(--w-text-soft) !important;
  cursor: pointer !important;
  padding: 0 !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
}

.api-schema-toggle:hover {
  background: var(--w-hover-bg) !important;
  color: var(--w-text-strong) !important;
  border-color: var(--w-text-faint) !important;
}

.api-schema-name {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  color: var(--w-text-strong) !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}

.api-schema-type {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.75rem !important;
  color: var(--w-accent) !important;
  font-weight: 500;
}

.api-schema-required {
  font-size: 0.625rem !important;
  font-weight: 700 !important;
  color: var(--w-method-delete) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em;
}

.api-schema-description {
  margin-top: 0.25rem !important;
  padding-left: 26px;
  font-size: 0.8125rem !important;
  color: var(--w-text-soft) !important;
  line-height: 1.55 !important;
}

/* ── Response block ───────────────────────────────────────────────────── */

.api-response-block { margin: 0 0 1.25rem !important; }

.api-response-header {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 0.625rem !important;
  margin: 0 0 0.625rem !important;
}

.api-response-status {
  display: inline-flex !important;
  align-items: center !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem !important;
  font-weight: 700 !important;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  color: #ffffff !important;
  line-height: 1;
  flex-shrink: 0;
}

.api-status-2xx     { background: var(--w-status-2xx) !important; }
.api-status-3xx     { background: var(--w-status-3xx) !important; }
.api-status-4xx     { background: var(--w-status-4xx) !important; }
.api-status-5xx     { background: var(--w-status-5xx) !important; }
.api-status-default { background: var(--w-text-faint) !important; }

/* Response tabs (main column): uses the global [role="tablist"] /
   [role="tab"] styling — same card pattern as Nextra tabs — with a
   color-coded status dot inside each tab button. */
.api-response-tabs [role="tab"] {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0.4375rem !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
}

.api-response-tab-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  flex-shrink: 0;
}

.api-response-panel-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.625rem;
  margin: 0 0 0.875rem;
  font-size: 0.875rem;
  color: var(--w-text);
}

.api-response-panel-meta .api-response-contenttype {
  margin-left: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  color: var(--w-text-faint);
  background: transparent;
  border: none;
  padding: 0;
}

.api-response-description {
  color: var(--w-text);
  font-size: 0.875rem;
}

.api-response-contenttype {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
  color: var(--w-text-faint) !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  margin-left: auto;
}

/* ── Auth requirements ────────────────────────────────────────────────── */

.api-auth-none {
  color: var(--w-text-soft) !important;
  font-style: italic;
  font-size: 0.875rem !important;
  margin: 0 0 1rem !important;
}

.api-auth-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.api-auth-item {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.625rem;
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--w-border);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.api-auth-item:last-child { margin-bottom: 0; }

.api-auth-name {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--w-text-strong);
  background: transparent;
  border: none;
  padding: 0;
}

.api-auth-description { color: var(--w-text-soft); }

.api-auth-scopes {
  font-size: 0.75rem;
  color: var(--w-text-faint);
  margin-left: auto;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* ── Code switcher (request / response samples) ─────────────────────────
   Modelled on the existing .nextra-code "filename header + pre" card so
   API code samples look like every other code block in the docs:
     • toolbar = top half (filename-header-bg, rounded TOP only)
     • body    = bottom half (code-bg, rounded BOTTOM only)
     • border-radius matches the .nextra-code convention (0.625rem)
   Inner Nextra code chrome (its own border/radius/buttons) is neutralised
   so the switcher's outer frame is the only one visible. */

.api-code-switcher {
  margin: 0 0 1rem !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
}

.api-code-switcher-toolbar {
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  padding: 0.5rem 1rem !important;
  background: var(--w-filename-header-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-bottom: none !important;
  border-radius: 0.625rem 0.625rem 0 0 !important;
  color: var(--w-text-soft) !important;
  height: auto !important;
}

.api-code-switcher-label {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  color: var(--w-text-soft) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  flex-shrink: 0;
}

/* Pill-shaped dropdown trigger: terminal icon prefix + label + up/down chevron.
   Wrapper provides the visual chrome; the underlying <select> is transparent
   and fills the wrapper so a click anywhere opens the native menu. */
.api-code-switcher-select-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  background: var(--w-bg);
  border: 1px solid var(--w-border);
  border-radius: 0.375rem;
  padding: 0 0.625rem 0 0.5rem;
  margin-left: auto;
  transition: background 0.12s, border-color 0.12s;
}

.api-code-switcher-select-wrap:hover {
  border-color: var(--w-text-faint);
}

.api-code-switcher-select-wrap:focus-within {
  border-color: var(--w-accent);
  box-shadow: 0 0 0 2px var(--w-accent-soft);
}

.api-code-switcher-select-icon {
  color: var(--w-text);
  pointer-events: none;
  flex-shrink: 0;
  margin-right: 0.375rem;
}

.api-code-switcher-select-chevron {
  color: var(--w-text-soft);
  pointer-events: none;
  flex-shrink: 0;
  margin-left: 0.25rem;
}

.api-code-switcher-select {
  appearance: none !important;
  -webkit-appearance: none !important;
  background: transparent !important;
  border: none !important;
  outline: none !important;
  margin: 0;
  padding: 0.3125rem 0 !important;
  font-family: inherit !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  color: var(--w-text-strong) !important;
  cursor: pointer;
}

/* Response variant: inline tabs in the toolbar replace the dropdown, and the
   selected status code's description is rendered as a sub-header strip between
   the toolbar and the code body. */
.api-code-switcher-tablist {
  display: inline-flex;
  align-items: center;
  gap: 0.125rem;
  margin-left: auto;
}

/* Mirrors the [role="tab"] styling in this file so the response tabs read
   the same as Nextra tabs (soft text, accent on selected, subtle lift). */
.api-code-switcher-tab {
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--w-text-soft);
  background: none;
  border: none;
  border-radius: 0.375rem;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  transition: color 0.12s, background 0.12s;
  line-height: 1.5;
  white-space: nowrap;
}

.api-code-switcher-tab:hover {
  color: var(--w-text-strong);
  background: var(--w-hover-bg);
}

.api-code-switcher-tab[aria-pressed="true"] {
  background: var(--w-bg);
  color: var(--w-accent);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.dark .api-code-switcher-tab[aria-pressed="true"] {
  background: var(--w-bg);
  box-shadow: none;
}

.api-code-switcher-subheader {
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  color: var(--w-text-soft);
  background: var(--w-filename-header-bg);
  border-left: 1px solid var(--w-border);
  border-right: 1px solid var(--w-border);
  border-bottom: 1px solid var(--w-border);
}

/* Copy button — same dimensions and styling as .nextra-code button[title="Copy code"]
   so the request/response switcher's copy affordance is visually identical to
   the per-block copy button used in standalone code blocks. Icon-only. */
.api-code-switcher-copy {
  background: var(--w-bg) !important;
  color: var(--w-text-soft) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.375rem !important;
  padding: 0.3125rem !important;
  cursor: pointer;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 1.75rem !important;
  height: 1.75rem !important;
  flex-shrink: 0 !important;
  transition: background 0.12s, color 0.12s, border-color 0.12s !important;
  /* Reset inherited ::before from components.mjs */
  position: static !important;
  font-size: inherit !important;
  line-height: inherit !important;
}

.api-code-switcher-copy::before {
  content: none !important;
}

.api-code-switcher-copy:hover {
  background: var(--w-border-soft) !important;
  color: var(--w-text-strong) !important;
  border-color: var(--w-accent-border) !important;
}

.dark .api-code-switcher-copy {
  background: var(--w-border-soft) !important;
  border-color: var(--w-border) !important;
}

.dark .api-code-switcher-copy:hover {
  background: var(--w-hover-bg) !important;
  color: var(--w-text-strong) !important;
}

.api-code-switcher-copy[data-copied="true"],
.dark .api-code-switcher-copy[data-copied="true"] {
  color: var(--w-method-post) !important;
  border-color: var(--w-method-post) !important;
  background: color-mix(in srgb, var(--w-method-post) 10%, transparent) !important;
}

.api-code-switcher-body {
  background: var(--w-code-bg);
  border: 1px solid var(--w-border);
  border-top: none;
  border-radius: 0 0 0.625rem 0.625rem;
  box-shadow: var(--w-code-shadow);
}

/* Neutralise the inner Nextra code-block chrome; the body provides the frame.
   The \`.nextra-code\` rules elsewhere in this file would otherwise add their
   own border, radius, shadow, and background on top of ours. */
.api-code-switcher-pane,
.api-code-switcher-pane > div {
  margin: 0;
  padding: 0;
}

.api-code-switcher-pane .nextra-code {
  margin: 0 !important;
  border-radius: 0 !important;
}

.api-code-switcher-pane .nextra-code > div:first-child {
  display: none !important;
}

.api-code-switcher-pane pre,
.api-code-switcher-pane .nextra-code pre {
  margin: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
  /* Match the tab-panel code padding so request/response samples have the
     same breathing room as the in-content code blocks shown in tabs. */
  padding: 1rem !important;
}

/* The toolbar already exposes a single Copy button driven by the switcher,
   so per-block copy/word-wrap buttons inside each pane are redundant. */
.api-code-switcher-pane .nextra-code button[title="Copy code"],
.api-code-switcher-pane .nextra-code button[title="Toggle word wrap"] {
  display: none !important;
}

/* ── Try-it interactive form ──────────────────────────────────────────── */

.api-tryit {
  border: 1px solid var(--w-border) !important;
  border-radius: 8px !important;
  padding: 1rem 1.125rem 1.125rem !important;
  background: var(--w-bg) !important;
  margin: 0 0 1.5rem !important;
  display: block !important;
  gap: 0 !important;
  box-shadow: none !important;
}

.api-tryit-header {
  display: flex !important;
  align-items: center !important;
  gap: 0.625rem !important;
  margin: 0 0 1rem !important;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid var(--w-border-soft);
  flex-wrap: wrap !important;
}

.api-tryit-path {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: var(--w-text-strong) !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  word-break: break-all;
  border-radius: 0 !important;
}

.api-tryit-section {
  border: none !important;
  padding: 0 !important;
  margin: 0 0 0.875rem !important;
  display: block !important;
  gap: 0 !important;
}

.api-tryit-field {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.3125rem !important;
  margin: 0 0 0.75rem !important;
}

.api-tryit-field:last-child { margin-bottom: 0 !important; }

.api-tryit-label {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  color: var(--w-text-soft) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
}

.api-tryit-hint {
  font-weight: 400 !important;
  color: var(--w-text-faint) !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 0.6875rem !important;
  margin-left: 0 !important;
}

.api-tryit-input,
.api-tryit-textarea {
  width: 100% !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.8125rem !important;
  padding: 0.4375rem 0.625rem !important;
  background: var(--w-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 6px !important;
  color: var(--w-text-strong) !important;
  line-height: 1.45;
  font: unset !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
  font-size: 0.8125rem !important;
}

.api-tryit-textarea {
  min-height: 6rem;
  resize: vertical;
}

.api-tryit-input:focus,
.api-tryit-textarea:focus {
  outline: none !important;
  border-color: var(--w-accent) !important;
  box-shadow: 0 0 0 3px var(--w-accent-soft) !important;
}

.api-tryit-send {
  background: var(--w-accent) !important;
  color: #ffffff !important;
  border: none !important;
  border-radius: 6px !important;
  padding: 0.5rem 1.125rem !important;
  font-weight: 600 !important;
  font-size: 0.875rem !important;
  cursor: pointer;
  font-family: inherit !important;
  transition: opacity 0.12s, transform 0.06s !important;
  filter: none !important;
  align-self: auto !important;
}

.api-tryit-send:hover  { opacity: 0.9 !important; }
.api-tryit-send:active { transform: translateY(1px); }

.api-tryit-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.api-tryit-error {
  background: color-mix(in srgb, var(--w-method-delete) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--w-method-delete) 30%, transparent);
  color: var(--w-text-strong);
  padding: 0.625rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  margin: 1rem 0 0;
}

.api-tryit-response {
  margin: 1rem 0 0;
  padding-top: 1rem;
  border-top: 1px solid var(--w-border-soft);
}

.api-tryit-response-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  color: var(--w-text);
}

.api-tryit-response-headers {
  font-size: 0.8125rem;
  margin: 0 0 0.75rem;
  color: var(--w-text-soft);
}

.api-tryit-response-headers summary {
  cursor: pointer;
  color: var(--w-text-soft);
  font-weight: 500;
}

.api-tryit-response-headers summary:hover { color: var(--w-text-strong); }

.api-tryit-response-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 0.5rem;
}

.api-tryit-response-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--w-text-soft);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.api-tryit-response-body {
  background: var(--w-code-bg);
  border: 1px solid var(--w-border);
  border-radius: 6px;
  padding: 0.75rem 0.875rem;
  font-size: 0.8125rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  max-height: 24rem;
  overflow: auto;
  margin: 0;
  color: var(--w-text);
  line-height: 1.55;
}

/* ── Sidebar method pills ──────────────────────────────────────────────
   API endpoint sidebar items get a small color-coded HTTP method pill
   prefixed via ::before. Method is inferred from the operation_id prefix
   in the href (e.g. \`get_pipeline\`, \`list_pipelines\`, \`post_pipeline\`).
   Operations whose names don't start with a method (\`checkpoint_\`,
   \`commit_\`, \`http_input\`, \`start_transaction\`, etc.) are listed
   explicitly in the matched-ops selector and the per-method content rules. */

/* The set of API hrefs that get a pill. Extend both this group and the
   matching per-method content block below when adding new endpoints. */
:is(.nextra-sidebar, .nextra-mobile-nav) a[href*="/api-openapi/"]:is(
  [href*="/get_"], [href*="/list_"], [href*="/post_"], [href*="/put_"],
  [href*="/patch_"], [href*="/delete_"],
  [href$="/checkpoint_pipeline"], [href$="/commit_transaction"],
  [href$="/completion_status"], [href$="/completion_token"],
  [href$="/http_input"], [href$="/http_output"],
  [href$="/pipeline_adhoc_sql"], [href$="/reset_status"],
  [href$="/start_samply_profile"], [href$="/start_transaction"],
  [href$="/sync_checkpoint"]
) {
  display: flex !important;
  align-items: center !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) a[href*="/api-openapi/"]:is(
  [href*="/get_"], [href*="/list_"], [href*="/post_"], [href*="/put_"],
  [href*="/patch_"], [href*="/delete_"],
  [href$="/checkpoint_pipeline"], [href$="/commit_transaction"],
  [href$="/completion_status"], [href$="/completion_token"],
  [href$="/http_input"], [href$="/http_output"],
  [href$="/pipeline_adhoc_sql"], [href$="/reset_status"],
  [href$="/start_samply_profile"], [href$="/start_transaction"],
  [href$="/sync_checkpoint"]
)::before {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #ffffff;
  border-radius: 4px;
  padding: 0.1875rem 0.4375rem;
  margin-right: 0.5rem;
  line-height: 1;
  flex-shrink: 0;
}

/* Per-method content + colour. Both the prefix-based and explicit op
   selectors are listed here so the right pill renders for each href. */
:is(.nextra-sidebar, .nextra-mobile-nav) a[href*="/api-openapi/"]:is(
  [href*="/get_"], [href*="/list_"],
  [href$="/completion_status"], [href$="/completion_token"],
  [href$="/pipeline_adhoc_sql"], [href$="/reset_status"]
)::before {
  content: "GET";
  background: var(--w-method-get);
}

:is(.nextra-sidebar, .nextra-mobile-nav) a[href*="/api-openapi/"]:is(
  [href*="/post_"],
  [href$="/checkpoint_pipeline"], [href$="/commit_transaction"],
  [href$="/http_input"], [href$="/http_output"],
  [href$="/start_samply_profile"], [href$="/start_transaction"],
  [href$="/sync_checkpoint"]
)::before {
  content: "POST";
  background: var(--w-method-post);
}

:is(.nextra-sidebar, .nextra-mobile-nav) a[href*="/api-openapi/"][href*="/put_"]::before {
  content: "PUT";
  background: var(--w-method-put);
}

:is(.nextra-sidebar, .nextra-mobile-nav) a[href*="/api-openapi/"][href*="/patch_"]::before {
  content: "PATCH";
  background: var(--w-method-patch);
}

:is(.nextra-sidebar, .nextra-mobile-nav) a[href*="/api-openapi/"][href*="/delete_"]::before {
  content: "DELETE";
  background: var(--w-method-delete);
}

/* ── API reference page layout (theme-portable) ────────────────────────
   Repositions the samples aside into the outer grid's TOC slot (col 4) so
   article width and footer alignment stay unchanged on API pages. Relies on:
     • Each theme's outer grid having article in col 3, TOC in col 4
     • Each theme defining \`--w-grid-cols-api\` (its outer grid template with
       col 4 widened for API pages)
     • API pages setting \`toc: false\` in MDX frontmatter, so col 4 is unused
   Below 1280px the outer grid collapses (theme-side), and the inner endpoint
   grid stacks via the rule further down. */

@media (min-width: 1280px) {
  /* Swap the outer grid template to the API variant when the page contains
     an .api-endpoint-grid. The footer's separate grid wrapper gets the same
     swap so its col-3 children stay aligned with the article column. */
  div:has(> aside.nextra-sidebar):has(.api-endpoint-grid) {
    grid-template-columns: var(--w-grid-cols-api) !important;
  }
  body:has(.api-endpoint-grid) > div:has(> footer) {
    grid-template-columns: var(--w-grid-cols-api) !important;
  }

  /* Article subgrid: claim cols 3-4 and pass them through so descendants
     can place themselves into the article or the samples aside slot. */
  article:has(.api-endpoint-grid) {
    grid-column: 3 / span 2 !important;
    max-width: none !important;
    display: grid !important;
    grid-template-columns: subgrid !important;
    grid-auto-rows: auto;
    column-gap: 0 !important;
  }

  /* By default every direct article child stays in col 1 (article width). */
  article:has(.api-endpoint-grid) > * {
    grid-column: 1 !important;
    min-width: 0;
  }

  /* Nextra wraps MDX content in <main>; thread the subgrid through it so
     .api-endpoint-grid inside can still reach the TOC slot. */
  article:has(.api-endpoint-grid) > main {
    grid-column: 1 / -1 !important;
    display: grid !important;
    grid-template-columns: subgrid !important;
    gap: 0 !important;
  }
  article:has(.api-endpoint-grid) > main > * {
    grid-column: 1 !important;
    min-width: 0;
  }

  /* The endpoint grid itself: place .api-endpoint-main in col 1 (article),
     .api-endpoint-aside in col 2 (TOC slot). */
  article:has(.api-endpoint-grid) > main > .api-endpoint-grid {
    grid-column: 1 / -1 !important;
    display: grid !important;
    grid-template-columns: subgrid !important;
    gap: 0 !important;
  }
  article:has(.api-endpoint-grid) > main > .api-endpoint-grid > .api-endpoint-main {
    grid-column: 1 !important;
    min-width: 0;
  }
  article:has(.api-endpoint-grid) > main > .api-endpoint-grid > .api-endpoint-aside {
    grid-column: 2 !important;
    min-width: 0;
    padding-left: 2rem;
  }
}

/* ── Responsive: stack the inner endpoint grid on narrow screens ──────── */

/* Matches the breakpoint where each theme's outer TOC column disappears. */
@media (max-width: 1279px) {
  .api-endpoint-grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
  .api-endpoint-aside {
    position: static;
    max-height: none;
    overflow: visible;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLUX MOBILE — responsive overrides for flux-specific selectors
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 767px) {
  /* Prev/next pagination stacks so each card is full-width and tappable. */
  article > div.nextra-border:has(> a) {
    flex-direction: column !important;
  }
  article > div.nextra-border:has(> a) > a:last-child {
    justify-content: flex-start !important;
    text-align: start !important;
  }

  /* Footer with columns: stack brand block above the link grid; reduce padding. */
  footer.flux-footer      { padding: 0 1.25rem 2rem !important; }
  footer.flux-footer > .w-footer-powered { padding-right: 0 !important; align-self: flex-start !important; }
}
`;

export function buildCss() {
	return COMPONENTS_CSS + "\n" + FLUX_THEME_CSS;
}
