/**
 * Ember theme CSS.
 *
 * Emits the shared component styles from ./components.mjs followed by
 * Ember-specific design tokens and theme-prefixed layout selectors.
 */

import manifest from "./manifest.mjs";
import COMPONENTS_CSS from "./components.mjs";

const EMBER_THEME_CSS = `/*
 * Ember Theme — design tokens and layout selectors.
 * Shared component styles live in ./components.mjs (prepended above).
 */

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════ */

:root {
  --nextra-primary-hue: 20;
  --nextra-primary-saturation: 80%;
  --nextra-primary-lightness: 34%;
  --nextra-bg: 255 255 255;
  --nextra-navbar-height: 48px;

  --w-brand-color: hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) var(--nextra-primary-lightness));

  /* ── Accent ─────────────────────────────────────────── */
  --w-accent:        var(--w-brand-color);
  --w-accent-soft:   #fff7ed;
  --w-accent-border: #fdba74;

  /* ── General palette ────────────────────────────────── */
  --w-bg:            #ffffff;
  --w-border:        #e7e5e4;
  --w-border-soft:   #f5f5f4;
  --w-text-strong:   #0c0a09;
  --w-text:          #1c1917;
  --w-text-soft:     #78716c;
  --w-text-faint:    #a8a29e;
  --w-hover-bg:      #fafaf9;

  /* ── Component colour tokens ────────────────────────── */
  --w-code-bg:             #fafaf9;
  --w-code-shadow:         0 1px 3px rgba(0,0,0,0.04);
  --w-filename-header-bg:  var(--w-border-soft);
  --w-inline-code-color:   color-mix(in srgb, var(--w-accent) 85%, black);
  --w-inline-code-bg:      var(--w-accent-soft);
  --w-inline-code-border:  color-mix(in srgb, var(--w-accent) 18%, white);
  --w-card-bg:             #ffffff;
  --w-scrollbar-thumb:     #d6d3d1;

  /* ── Ember-specific layout tokens ──────────────────── */
  --ember-navbar-height: 48px;
  --ember-sidebar-width: 280px;

  /* ── Header (navbar) ────────────────────────────────── */
  --header-bg:             #ffffff;
  --header-border:         #e7e5e4;
  --header-search-bg:      #f5f5f4;
  --header-search-border:  #e7e5e4;
  --header-search-color:   #78716c;
  --header-kbd-bg:         #ffffff;
  --header-kbd-color:      #a8a29e;
}

.dark {
  --nextra-bg: 28 25 23;
  --nextra-primary-lightness: 60%;

  --w-accent-soft:   #431407;
  --w-accent-border: #9a3412;
  --w-bg:            #1c1917;
  --w-border:        #44403c;
  --w-border-soft:   #292524;
  --w-text-strong:   #fafaf9;
  --w-text:          #fafaf9;
  --w-text-soft:     #a8a29e;
  --w-text-faint:    #78716c;
  --w-hover-bg:      #292524;

  --w-code-bg:             #292524;
  --w-code-shadow:         none;
  --w-filename-header-bg:  #292524;
  --w-inline-code-color:   color-mix(in srgb, var(--w-accent) 60%, white);
  --w-inline-code-bg:      color-mix(in srgb, var(--w-accent) 12%, #1c1917);
  --w-inline-code-border:  color-mix(in srgb, var(--w-accent) 22%, #1c1917);
  --w-card-bg:             #292524;
  --w-scrollbar-thumb:     #57534e;

  --header-bg:             #1c1917;
  --header-border:         #44403c;
  --header-search-bg:      #292524;
  --header-search-border:  #44403c;
  --header-search-color:   #a8a29e;
  --header-kbd-bg:         #44403c;
  --header-kbd-color:      #78716c;
}

/* ═══════════════════════════════════════════════════════════
   BASE
   ═══════════════════════════════════════════════════════════ */

html {
  font-family: var(--w-font-family) !important;
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--w-bg);
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR LOGO
   ═══════════════════════════════════════════════════════════ */
.ember-sidebar-logo {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--ember-sidebar-width);
  height: var(--ember-navbar-height);
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  background: var(--w-bg);
  z-index: 37;
  border-bottom: 1px solid var(--w-border);
}
.ember-sidebar-logo a {
  text-decoration: none;
  color: var(--w-text-strong);
  font-size: 1rem;
  letter-spacing: -0.01em;
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR SEARCH
   ═══════════════════════════════════════════════════════════ */
.ember-sidebar-search {
  position: fixed;
  top: var(--ember-navbar-height);
  left: 0;
  width: var(--ember-sidebar-width);
  padding: 0.625rem 1rem;
  background: var(--w-bg);
  z-index: 36;
}
.ember-sidebar-search .nextra-search input {
  width: 100% !important;
  background: var(--w-hover-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.5rem !important;
  padding: 0.4375rem 0.75rem !important;
  font-size: 0.8125rem !important;
  color: var(--w-text-soft) !important;
}
.ember-sidebar-search .nextra-search input:focus {
  border-color: var(--w-accent) !important;
  box-shadow: 0 0 0 3px var(--w-accent-soft) !important;
  outline: none !important;
  color: var(--w-text-strong) !important;
}
.ember-sidebar-search .nextra-search input::placeholder {
  color: var(--w-text-faint) !important;
}
.ember-sidebar-search .nextra-search kbd {
  background: var(--w-border-soft) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.25rem !important;
  color: var(--w-text-faint) !important;
  font-size: 0.625rem !important;
  box-shadow: none !important;
  padding: 0 0.3rem !important;
}

/* Lift the search results popover above .nextra-sidebar (z-index: 35). */
.nextra-search-results,
[data-headlessui-portal],
[data-floating-ui-portal] {
  position: relative;
  z-index: 200 !important;
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR NAV
   ═══════════════════════════════════════════════════════════ */
.nextra-sidebar > div:first-child {
  padding-top: calc(var(--ember-navbar-height) + 3.5rem) !important;
}

.nextra-sidebar {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: var(--ember-sidebar-width) !important;
  min-width: var(--ember-sidebar-width) !important;
  height: 100dvh !important;
  background: var(--w-bg) !important;
  border-right: none !important;
  z-index: 35 !important;
}

/* Sidebar links */
aside.nextra-sidebar a:hover {
  color: var(--w-accent) !important;
}
aside.nextra-sidebar li.active > a {
  color: var(--w-accent) !important;
  font-weight: 600 !important;
}

/* Group headings */
:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul > li > button {
  color: var(--w-text-strong) !important;
  font-weight: 600 !important;
  font-size: 0.8125rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR — hidden (sidebar handles logo + search)
   ═══════════════════════════════════════════════════════════ */
.nextra-navbar {
  height: 0 !important;
  min-height: 0 !important;
  overflow: hidden !important;
}
.nextra-navbar-blur {
  display: none !important;
}
:root {
  --nextra-navbar-height: 0px;
}

/* ═══════════════════════════════════════════════════════════
   CTA BUTTON
   ═══════════════════════════════════════════════════════════ */
.ember-cta-button {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: 0.5rem;
  background: var(--w-accent);
  color: white !important;
  text-decoration: none;
  transition: opacity 0.15s;
}
.ember-cta-button:hover { opacity: 0.85; }

/* ═══════════════════════════════════════════════════════════
   GRID LAYOUT — sidebar | gap | content | toc | gap
   ═══════════════════════════════════════════════════════════ */
div:has(> aside.nextra-sidebar) {
  display: grid !important;
  grid-template-columns: var(--ember-sidebar-width) 1fr 680px 220px 1fr !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  align-items: start !important;
}
aside.nextra-sidebar { grid-column: 1 !important; grid-row: 1 !important; }
article { grid-column: 3 !important; grid-row: 1 !important; min-width: 0 !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; }

/* Footer outer wrapper */
body > div:has(> footer) {
  display: grid !important;
  grid-template-columns: var(--ember-sidebar-width) 1fr 680px 220px 1fr !important;
  background: var(--w-bg) !important;
}
body > div:has(> footer) > * {
  grid-column: 3 !important;
  min-width: 0 !important;
  max-width: 100% !important;
}

@media (max-width: 1279px) {
  div:has(> aside.nextra-sidebar) { grid-template-columns: var(--ember-sidebar-width) 1fr 680px 1fr !important; }
  body > div:has(> footer) { grid-template-columns: var(--ember-sidebar-width) 1fr 680px 1fr !important; }
  article { grid-column: 3 !important; }
  body > div:has(> footer) > * { grid-column: 3 !important; }
  nav.nextra-toc { display: none !important; }
}
@media (max-width: 900px) {
  div:has(> aside.nextra-sidebar) { grid-template-columns: var(--ember-sidebar-width) 1fr !important; }
  body > div:has(> footer) { grid-template-columns: var(--ember-sidebar-width) 1fr !important; }
  article { grid-column: 2 !important; }
  body > div:has(> footer) > * { grid-column: 2 !important; }
}
@media (max-width: 767px) {
  div:has(> aside.nextra-sidebar) { grid-template-columns: 1fr !important; }
  body > div:has(> footer) { grid-template-columns: 1fr !important; }
  aside.nextra-sidebar { display: none !important; }
  article { grid-column: 1 !important; }
  body > div:has(> footer) > * { grid-column: 1 !important; }
}

/* ═══════════════════════════════════════════════════════════
   TOC — hide the right border to keep clean 2-column layout
   ═══════════════════════════════════════════════════════════ */
nav.nextra-toc {
  border-left: none !important;
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
.ember-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8125rem;
  color: var(--w-text-faint);
}
.ember-footer-powered {
  font-size: 0.75rem;
}

/* ═══════════════════════════════════════════════════════════
   MOBILE
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 767px) {
  .ember-sidebar-logo { display: none; }
  .ember-sidebar-search { display: none; }
  .nextra-navbar nav {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  .nextra-navbar nav > a[href="/"] {
    display: flex !important;
    align-items: center !important;
    margin-right: auto !important;
  }
}
`;

// ── Public API ──────────────────────────────────────────────────────────────

export function buildCss(config) {
	return COMPONENTS_CSS + "\n" + EMBER_THEME_CSS;
}
