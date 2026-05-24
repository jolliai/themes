/**
 * Jollia theme CSS.
 *
 * Emits the shared component styles from ./components.mjs followed by
 * Jollia-specific design tokens and theme-prefixed layout selectors.
 */

import COMPONENTS_CSS from "./components.mjs";

const JOLLIA_THEME_CSS = `/*
 * Jollia Theme — design tokens and layout selectors.
 * Shared component styles live in ./components.mjs (prepended above).
 */

/* ═══════════════════════════════════════════════════════════
   Jollia Theme — The official Jolli documentation theme
   ═══════════════════════════════════════════════════════════ */

/* ── Design tokens ────────────────────────────────────────── */
:root {
  /* Nextra internals */
  --nextra-primary-hue: 158;
  --nextra-primary-saturation: 82%;
  --nextra-primary-lightness: 32%;
  --nextra-navbar-height: 104px;

  /* ── Accent ─────────────────────────────────────────── */
  --w-accent:        #0D9373;
  --w-accent-soft:   #ecfdf5;
  --w-accent-border: #6ee7b7;

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
  --w-filename-header-bg:  #f3f4f6;
  --w-inline-code-color:   #0a7d62;
  --w-inline-code-bg:      #ecfdf5;
  --w-inline-code-border:  #d1fae5;
  --w-card-bg:             #f9fafb;
  --w-scrollbar-thumb:     #d1d5db;
  --w-font-family:         'Inter', system-ui, -apple-system, sans-serif;
}

.dark {
  --nextra-primary-lightness: 60%;

  /* ── Accent ─────────────────────────────────────────── */
  --w-accent:        #34d399;
  --w-accent-soft:   #064e3b;
  --w-accent-border: #065f46;

  /* ── General palette ────────────────────────────────── */
  --w-bg:            #111827;
  --w-border:        #374151;
  --w-border-soft:   #1f2937;
  --w-text-strong:   #f9fafb;
  --w-text:          #d1d5db;
  --w-text-soft:     #9ca3af;
  --w-text-faint:    #6b7280;
  --w-hover-bg:      #1e2535;

  /* ── Component colour tokens ────────────────────────── */
  --w-code-bg:             #1a2332;
  --w-code-shadow:         none;
  --w-filename-header-bg:  #1f2937;
  --w-inline-code-color:   #6ee7b7;
  --w-inline-code-bg:      #064e3b;
  --w-inline-code-border:  #065f46;
  --w-card-bg:             #1f2937;
  --w-scrollbar-thumb:     #4b5563;
}

/* ── Base ─────────────────────────────────────────────────── */
body {
  font-family: var(--w-font-family) !important;
}

/* ── Navbar ───────────────────────────────────────────────── */
.nextra-navbar nav {
  flex-wrap: wrap !important;
  padding-top: 0.5rem !important;
  padding-bottom: 0.25rem !important;
}

/* Center the search box in the navbar */
.nextra-navbar nav > div:has(.nextra-search) {
  flex: 1 !important;
  display: flex !important;
  justify-content: center !important;
}
.nextra-navbar nav .nextra-search {
  width: 100% !important;
  max-width: 480px !important;
}
.nextra-navbar nav .nextra-search input {
  width: 100% !important;
}

/* ── Tabs — second row below navbar ──────────────────────── */
.nextra-scrollbar:has(> a[href]) {
  order: 100 !important;
  flex-basis: 100% !important;
  padding: 0 !important;
  gap: 0 !important;
  border: none !important;
  background: transparent !important;
}

/* Navbar height for the second row */
.nextra-navbar {
  height: auto !important;
  min-height: 104px;
}

/* Style tab links */
.nextra-scrollbar:has(> a[href]) > a {
  all: unset !important;
  display: inline-flex !important;
  align-items: center !important;
  padding: 0.625rem 1rem !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: var(--w-text-soft) !important;
  border-bottom: 2px solid transparent !important;
  cursor: pointer !important;
  transition: color 0.15s, border-color 0.15s !important;
}
.nextra-scrollbar:has(> a[href]) > a:first-child {
  padding-left: 0 !important;
}
.nextra-scrollbar:has(> a[href]) > a:hover {
  color: var(--w-text-strong) !important;
}

/* Active tab */
.nextra-scrollbar:has(> a[href]) > a[aria-current] {
  color: var(--w-accent) !important;
  border-bottom-color: var(--w-accent) !important;
  font-weight: 600 !important;
}

/* ── Sidebar ─────────────────────────────────────────────── */
aside.nextra-sidebar a:hover {
  color: var(--w-accent) !important;
}
aside.nextra-sidebar li.active > a {
  color: var(--w-accent) !important;
  font-weight: 600 !important;
}

/* ── Links ────────────────────────────────────────────────── */
a:hover {
  color: var(--w-accent);
}

/* Hidden SidebarTabs — only for root URL redirect */
.jolli-hidden-tabs {
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
}
`;

export function buildCss(config) {
	return COMPONENTS_CSS + "\n" + JOLLIA_THEME_CSS;
}
