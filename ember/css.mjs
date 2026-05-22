/**
 * Ember theme CSS — Forge-style fixed left sidebar with warm brown/orange colors.
 */

const CSS = `
/* ═══════════════════════════════════════════════════════════
   Ember Theme — Warm, fixed-sidebar documentation
   ═══════════════════════════════════════════════════════════ */

/* ── Design tokens ────────────────────────────────────────── */
:root {
  --ember-primary: #9A3412;
  --ember-primary-light: #EA580C;
  --ember-primary-soft: #fff7ed;
  --ember-primary-border: #fdba74;
  --ember-bg: #ffffff;
  --ember-bg-surface: #fafaf9;
  --ember-text: #1c1917;
  --ember-text-strong: #0c0a09;
  --ember-text-soft: #78716c;
  --ember-text-faint: #a8a29e;
  --ember-border: #e7e5e4;
  --ember-border-soft: #f5f5f4;
  --ember-navbar-height: 48px;
  --ember-sidebar-width: 280px;

  --nextra-primary-hue: 20;
  --nextra-primary-saturation: 80%;
  --nextra-primary-lightness: 34%;
  --nextra-navbar-height: var(--ember-navbar-height);
}
.dark {
  --ember-primary: #fb923c;
  --ember-primary-light: #fdba74;
  --ember-primary-soft: #431407;
  --ember-primary-border: #9a3412;
  --ember-bg: #1c1917;
  --ember-bg-surface: #292524;
  --ember-text: #fafaf9;
  --ember-text-strong: #fafaf9;
  --ember-text-soft: #a8a29e;
  --ember-text-faint: #78716c;
  --ember-border: #44403c;
  --ember-border-soft: #292524;

  --nextra-primary-lightness: 60%;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  background: var(--ember-bg);
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
  background: var(--ember-bg);
  z-index: 37;
  border-bottom: 1px solid var(--ember-border);
}
.ember-sidebar-logo a {
  text-decoration: none;
  color: var(--ember-text-strong);
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
  background: var(--ember-bg);
  z-index: 36;
}
.ember-sidebar-search .nextra-search input {
  width: 100% !important;
  background: var(--ember-bg-surface) !important;
  border: 1px solid var(--ember-border) !important;
  border-radius: 0.5rem !important;
  padding: 0.4375rem 0.75rem !important;
  font-size: 0.8125rem !important;
  color: var(--ember-text-soft) !important;
}
.ember-sidebar-search .nextra-search input:focus {
  border-color: var(--ember-primary-light) !important;
  box-shadow: 0 0 0 3px var(--ember-primary-soft) !important;
  outline: none !important;
  color: var(--ember-text-strong) !important;
}
.ember-sidebar-search .nextra-search input::placeholder {
  color: var(--ember-text-faint) !important;
}
.ember-sidebar-search .nextra-search kbd {
  background: var(--ember-border-soft) !important;
  border: 1px solid var(--ember-border) !important;
  border-radius: 0.25rem !important;
  color: var(--ember-text-faint) !important;
  font-size: 0.625rem !important;
  box-shadow: none !important;
  padding: 0 0.3rem !important;
}

/* Lift the search results popover above .nextra-sidebar (z-index: 35).
   Nextra portals the popover into body > #headlessui-portal-root, so its
   default z-index (30) is below the fixed sidebar and the popover gets
   hidden under the nav menu. */
.nextra-search-results {
  z-index: 50 !important;
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
  background: var(--ember-bg) !important;
  border-right: none !important;
  z-index: 35 !important;
}

/* Sidebar links */
aside.nextra-sidebar a:hover {
  color: var(--ember-primary-light) !important;
}
aside.nextra-sidebar li.active > a {
  color: var(--ember-primary) !important;
  font-weight: 600 !important;
}

/* Group headings */
:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul > li > button {
  color: var(--ember-text-strong) !important;
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
  background: var(--ember-primary);
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

@media (max-width: 1279px) {
  div:has(> aside.nextra-sidebar) { grid-template-columns: var(--ember-sidebar-width) 1fr 680px 1fr !important; }
  article { grid-column: 3 !important; }
  nav.nextra-toc { display: none !important; }
}
@media (max-width: 900px) {
  div:has(> aside.nextra-sidebar) { grid-template-columns: var(--ember-sidebar-width) 1fr !important; }
  article { grid-column: 2 !important; }
}
@media (max-width: 767px) {
  div:has(> aside.nextra-sidebar) { grid-template-columns: 1fr !important; }
  aside.nextra-sidebar { display: none !important; }
  article { grid-column: 1 !important; padding: 0 1.25rem 4rem !important; }
}

/* ═══════════════════════════════════════════════════════════
   TOC — hide the right border to keep clean 2-column layout
   ═══════════════════════════════════════════════════════════ */
nav.nextra-toc {
  border-left: none !important;
}

/* ═══════════════════════════════════════════════════════════
   CONTENT & HEADINGS
   ═══════════════════════════════════════════════════════════ */
h1 {
  font-weight: 700 !important;
  letter-spacing: -0.02em !important;
}
a:hover { color: var(--ember-primary-light); }
pre {
  border: 1px solid var(--ember-border) !important;
  border-radius: 0.5rem !important;
}
th { background: var(--ember-bg-surface) !important; }

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */
.ember-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8125rem;
  color: var(--ember-text-faint);
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

export function buildCss() {
	return CSS;
}
