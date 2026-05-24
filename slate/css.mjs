/**
 * Slate theme CSS.
 *
 * Emits the shared component styles from ./components.mjs followed by
 * Slate-specific design tokens and theme-prefixed layout selectors.
 */

import COMPONENTS_CSS from "./components.mjs";

const CSS = `/*
 * Slate Theme — design tokens and layout selectors.
 * Shared component styles live in ./components.mjs (prepended above).
 */

/* ═══════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════ */

:root {
  /* Nextra internals */
  --nextra-primary-hue: 110;
  --nextra-primary-saturation: 100%;
  --nextra-primary-lightness: 28%;
  --nextra-bg: 255 255 255;
  --nextra-navbar-height: 100px;

  /* ── Accent ─────────────────────────────────────────── */
  --w-accent:        #329100;
  --w-accent-soft:   #f0fdf4;
  --w-accent-border: #86efac;

  /* ── General palette ────────────────────────────────── */
  --w-bg:            #ffffff;
  --w-border:        #e5e7eb;
  --w-border-soft:   #f3f4f6;
  --w-text-strong:   #1f2937;
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
  --w-card-bg:             #f9fafb;
  --w-scrollbar-thumb:     #d1d5db;
  --w-font-family:         'Inter', system-ui, -apple-system, sans-serif;
}

.dark {
  --nextra-bg: 17 24 39;
  --nextra-primary-lightness: 50%;

  --w-accent:        #43C200;
  --w-accent-soft:   #052e16;
  --w-accent-border: #14532d;

  --w-bg:            #111827;
  --w-border:        #374151;
  --w-border-soft:   #1f2937;
  --w-text-strong:   #f9fafb;
  --w-text:          #d1d5db;
  --w-text-soft:     #9ca3af;
  --w-text-faint:    #6b7280;
  --w-hover-bg:      #1e2433;

  --w-code-bg:       #1a2332;
  --w-code-shadow:   none;
  --w-filename-header-bg:  #1f2937;
  --w-inline-code-color:   color-mix(in srgb, var(--w-accent) 60%, white);
  --w-inline-code-bg:      color-mix(in srgb, var(--w-accent) 12%, #111827);
  --w-inline-code-border:  color-mix(in srgb, var(--w-accent) 22%, #111827);
  --w-card-bg:       #1f2937;
  --w-scrollbar-thumb: #4b5563;
}

/* ═══════════════════════════════════════════════════════════
   BASE
   ═══════════════════════════════════════════════════════════ */

body {
  font-family: var(--w-font-family) !important;
}

/* ── Navbar ───────────────────────────────────────────────── */
.nextra-navbar nav {
  flex-wrap: wrap !important;
  padding-top: 0.375rem !important;
  padding-bottom: 0.25rem !important;
}

/* Center search */
.nextra-navbar nav > div:has(.nextra-search) {
  flex: 1 !important;
  display: flex !important;
  justify-content: center !important;
}
.nextra-navbar nav .nextra-search {
  width: 100% !important;
  max-width: 420px !important;
}
.nextra-navbar nav .nextra-search input {
  width: 100% !important;
  border-radius: 0.5rem !important;
}

.nextra-navbar {
  height: auto !important;
  min-height: 100px;
}

/* ── Tabs — second row ───────────────────────────────────── */
.nextra-scrollbar:has(> a[href]) {
  order: 100 !important;
  flex-basis: 100% !important;
  padding: 0 !important;
  gap: 0 !important;
  border: none !important;
  background: transparent !important;
}

/* Tab links */
.nextra-scrollbar:has(> a[href]) > a {
  all: unset !important;
  display: inline-flex !important;
  align-items: center !important;
  padding: 0.5rem 0.875rem !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: var(--w-text-soft) !important;
  border-bottom: 2px solid transparent !important;
  cursor: pointer !important;
  transition: color 0.2s, border-color 0.2s !important;
}
.nextra-scrollbar:has(> a[href]) > a:first-child {
  padding-left: 0 !important;
}
.nextra-scrollbar:has(> a[href]) > a:hover {
  color: var(--w-text-strong) !important;
}
.nextra-scrollbar:has(> a[href]) > a[aria-current] {
  color: var(--w-accent) !important;
  border-bottom-color: var(--w-accent) !important;
  font-weight: 600 !important;
}

/* ── Sidebar ─────────────────────────────────────────────── */
aside.nextra-sidebar {
  border-right: 1px solid var(--w-border) !important;
}
aside.nextra-sidebar a:hover {
  color: var(--w-accent) !important;
}
aside.nextra-sidebar li.active > a {
  color: var(--w-accent) !important;
  font-weight: 600 !important;
}

/* Collapsible sidebar groups */
:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul > li > button {
  font-weight: 600 !important;
  font-size: 0.8125rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  color: var(--w-text-strong) !important;
}

/* ── Links ────────────────────────────────────────────────── */
a:hover { color: var(--w-accent); }

/* ── Footer — rich multi-column layout ───────────────────── */
.slate-footer {
  border-top: 1px solid var(--w-border);
  padding: 3rem 0 2rem;
}
.slate-footer-grid {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.slate-footer-col {
  min-width: 150px;
}
.slate-footer-col-title {
  font-weight: 600;
  font-size: 0.8125rem;
  color: var(--w-text-strong);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.slate-footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.slate-footer-col li {
  margin-bottom: 0.375rem;
}
.slate-footer-col a {
  font-size: 0.8125rem;
  color: var(--w-text-soft);
  text-decoration: none;
  transition: color 0.15s;
}
.slate-footer-col a:hover {
  color: var(--w-accent);
}
.slate-footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 1.5rem 1.5rem 0;
  border-top: 1px solid var(--w-border);
}
.slate-footer-copyright {
  font-size: 0.75rem;
  color: var(--w-text-faint);
}
.slate-footer-social {
  display: flex;
  gap: 0.75rem;
}
.slate-footer-social a {
  color: var(--w-text-faint);
  text-decoration: none;
  font-size: 0.75rem;
  transition: color 0.15s;
}
.slate-footer-social a:hover {
  color: var(--w-accent);
}
.slate-footer-powered {
  font-size: 0.6875rem;
  color: var(--w-text-faint);
}

/* Hidden SidebarTabs — for root URL redirect */
.slate-hidden-tabs {
  display: none !important;
}

/* ── Mobile ──────────────────────────────────────────────── */
@media (max-width: 767px) {
  .nextra-scrollbar:has(> a[href]) {
    order: unset !important;
    flex-basis: unset !important;
  }
  .nextra-scrollbar:has(> a[href]) > a {
    all: revert !important;
  }
  .nextra-navbar nav > div:has(.nextra-search) {
    flex: unset !important;
    justify-content: unset !important;
  }
  .slate-footer-grid {
    flex-direction: column;
    gap: 2rem;
  }
  .slate-footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
`;

export function buildCss(config) {
	return COMPONENTS_CSS + "\n" + CSS;
}
