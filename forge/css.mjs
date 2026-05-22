/**
 * Forge theme CSS — clean developer-docs visual style.
 *
 * Sidebar-dominant layout, navbar reduced to search + theme switch,
 * five-column desktop grid, Inter typography, hairline borders.
 */

import manifest from "./manifest.mjs";

// ── Hex-to-HSL conversion (inlined from ColorUtils.ts) ─────────────────────

function parseHex(hex) {
	let h = hex.startsWith("#") ? hex.slice(1) : hex;
	if (h.length === 3) {
		h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
	}
	if (h.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(h)) return undefined;
	return {
		r: Number.parseInt(h.slice(0, 2), 16),
		g: Number.parseInt(h.slice(2, 4), 16),
		b: Number.parseInt(h.slice(4, 6), 16),
	};
}

function hexToHsl(hex) {
	const rgb = parseHex(hex);
	if (!rgb) return undefined;
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	const d = max - min;
	if (d === 0) return { h: 0, s: 0, l: Math.round(l * 100) };
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let hue;
	if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
	else if (max === g) hue = ((b - r) / d + 2) / 6;
	else hue = ((r - g) / d + 4) / 6;
	return {
		h: Math.round(hue * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
}

function resolveAccent(theme, defaultHue, defaultSat, defaultLit) {
	const colors = theme?.colors;
	if (colors?.primary) {
		const primary = hexToHsl(colors.primary);
		if (primary) {
			return {
				hue: primary.h,
				saturation: primary.s,
				lightness: primary.l,
				light: colors.light ? hexToHsl(colors.light) : undefined,
				dark: colors.dark ? hexToHsl(colors.dark) : undefined,
			};
		}
	}
	const hue = theme?.primaryHue ?? defaultHue;
	return { hue, saturation: defaultSat, lightness: defaultLit };
}

// ── Font config ─────────────────────────────────────────────────────────────

const FONT_CONFIG = {
	inter: {
		cssFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	},
	"space-grotesk": {
		cssFamily: "'Space Grotesk', -apple-system, sans-serif",
	},
	"ibm-plex": {
		cssFamily: "'IBM Plex Sans', -apple-system, sans-serif",
	},
	"source-sans": {
		cssFamily: "'Source Sans 3', -apple-system, sans-serif",
	},
	"source-serif": {
		cssFamily: "'Source Serif 4', 'Iowan Old Style', Georgia, serif",
	},
};

// ── Base CSS ────────────────────────────────────────────────────────────────

const FORGE_BASE_CSS = `/*
 * Forge Theme
 * To retheme: override the --header-* and --nav-* variables only.
 * Everything else derives from those + the general palette.
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
  --nextra-navbar-height: 54px;

  /* ── Accent ─────────────────────────────────────────── */
  --forge-accent:        hsl(228 84% 61%);
  --forge-accent-soft:   hsl(228 84% 96%);
  --forge-accent-border: hsl(228 84% 75%);

  /* ── General palette ────────────────────────────────── */
  --forge-bg:            #ffffff;
  --forge-sidebar-bg:    #f9fafb;
  --forge-border:        #e5e7eb;
  --forge-border-soft:   #f3f4f6;
  --forge-text-strong:   #111827;
  --forge-text:          #374151;
  --forge-text-soft:     #6b7280;
  --forge-text-faint:    #9ca3af;
  --forge-hover-bg:      #f9fafb;

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
  --nav-bg:                var(--forge-sidebar-bg);
  --nav-border:            #e5e7eb;
  --nav-section-color:     #9ca3af;
  --nav-item-color:        #4b5563;
  --nav-item-hover-bg:     #e9ebee;
  --nav-item-hover-color:  #111827;
  --nav-active-bg:         #ffffff;
  --nav-active-color:      hsl(228 84% 61%);
  --nav-active-bar:        hsl(228 84% 61%);
  --nav-footer-bg:         #eceef1;
  --nav-footer-border:     #e5e7eb;
  --nav-footer-color:      #6b7280;
}

.dark {
  --nextra-bg: 10 10 15;
  --nextra-primary-lightness: 68%;

  --forge-accent-soft:   hsl(228 84% 11%);
  --forge-accent-border: hsl(228 84% 40%);
  --forge-bg:            rgb(10 10 15);
  --forge-sidebar-bg:    rgb(14 14 20);
  --forge-border:        #1f2937;
  --forge-border-soft:   #111827;
  --forge-text-strong:   #f9fafb;
  --forge-text:          #d1d5db;
  --forge-text-soft:     #9ca3af;
  --forge-text-faint:    #6b7280;
  --forge-hover-bg:      #111827;

  --header-bg:             rgb(10 10 15);
  --header-border:         #1f2937;
  --header-logo-color:     #f9fafb;
  --header-search-bg:      #111827;
  --header-search-border:  #1f2937;
  --header-search-color:   #9ca3af;
  --header-kbd-bg:         #1f2937;
  --header-kbd-color:      #4b5563;

  --nav-bg:                var(--forge-sidebar-bg);
  --nav-border:            #1f2937;
  --nav-section-color:     #6b7280;
  --nav-item-color:        #9ca3af;
  --nav-item-hover-bg:     #111827;
  --nav-item-hover-color:  #f9fafb;
  --nav-active-bg:         hsl(228 84% 11%);
  --nav-active-color:      hsl(228 84% 68%);
  --nav-active-bar:        hsl(228 84% 68%);
  --nav-footer-bg:         rgb(10 10 15);
  --nav-footer-border:     #1f2937;
  --nav-footer-color:      #6b7280;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BASE
   ═══════════════════════════════════════════════════════════════════════════ */

html {
  font-family: var(--forge-font-family, 'Inter', ui-sans-serif, system-ui, sans-serif) !important;
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.011em;
}

body { background-color: var(--forge-bg); }

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION TABS — SidebarTabs component rendered in the sidebar DOM.
   Uses Nextra's useConfig().topLevelNavbarItems for data + usePathname()
   for active state. The navbar's built-in page-tabs are hidden via CSS.
   ═══════════════════════════════════════════════════════════════════════════ */

/* SidebarTabs container — fixed below the search box */
.forge-sidebar-tabs {
  position: fixed;
  top: calc(var(--nextra-navbar-height) + 3.75rem);
  left: 0;
  width: 295px;
  display: flex;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  background: var(--forge-sidebar-bg);
  border-bottom: 1px solid var(--forge-border);
  z-index: 36;
  overflow-x: auto;
}

/* Individual tab button */
.forge-sidebar-tab {
  flex: none;
  padding: 0.375rem 0.625rem;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 1.2;
  border-radius: 0.375rem;
  border: 1px solid var(--forge-border);
  color: var(--forge-text-soft);
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  transition: background 0.15s, color 0.15s;
}
.forge-sidebar-tab:hover {
  background: var(--forge-border-soft);
  color: var(--forge-text-strong);
}

/* Active tab */
.forge-sidebar-tab.active,
.forge-sidebar-tab[data-active] {
  background: var(--forge-accent-soft);
  color: var(--forge-accent);
  font-weight: 600;
  border-color: var(--forge-accent-border);
}

/* Push sidebar nav down when tabs are present */
body:has(.forge-sidebar-tabs) .nextra-sidebar > div:first-child {
  padding-top: calc(var(--nextra-navbar-height) + 6.25rem) !important;
}

/* Hide Nextra's navbar page-tabs (the SidebarTabs component handles it) */
.nextra-scrollbar:has(> a[href]):not(.nextra-search-results) {
  display: none !important;
}

@media (max-width: 767px) {
  .forge-sidebar-tabs { display: none; }
  /* On mobile, restore Nextra navbar page-tabs (hamburger menu) */
  .nextra-scrollbar:has(> a[href]):not(.nextra-search-results) {
    display: flex !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR LOGO — pinned to very top of sidebar column
   ═══════════════════════════════════════════════════════════════════════════ */

.forge-sidebar-logo {
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

.forge-sidebar-logo a {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--nav-item-hover-color);
  text-decoration: none;
}
.forge-sidebar-logo a img {
  flex-shrink: 0;
  height: 24px;
  width: auto;
}
.forge-sidebar-logo a:hover { opacity: 0.75; }

/* Light/dark logo swap — only fires when both variants are emitted. */
img.forge-logo-dark { display: none !important; }
.dark img.forge-logo-light { display: none !important; }
.dark img.forge-logo-dark { display: inline-block !important; }

@media (max-width: 767px) {
  .forge-sidebar-logo { display: none; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR SEARCH — pinned below the logo
   ═══════════════════════════════════════════════════════════════════════════ */

.forge-sidebar-search {
  position: fixed;
  top: var(--nextra-navbar-height);
  left: 0;
  width: 295px;
  padding: 0.625rem 1rem;
  background: var(--nav-bg);
  z-index: 36;
}

.forge-sidebar-search .nextra-search input {
  width: 100% !important;
  background: var(--forge-bg) !important;
  border: 1px solid var(--forge-border) !important;
  border-radius: 0.5rem !important;
  padding: 0.4375rem 0.75rem !important;
  font-size: 0.8125rem !important;
  font-family: inherit !important;
  color: var(--forge-text-soft) !important;
  transition: border-color 0.15s, box-shadow 0.15s !important;
}
.forge-sidebar-search .nextra-search input::placeholder {
  color: var(--forge-text-faint) !important;
}
.forge-sidebar-search .nextra-search input:focus {
  border-color: var(--forge-accent) !important;
  box-shadow: 0 0 0 3px var(--forge-accent-soft) !important;
  outline: none !important;
  color: var(--forge-text-strong) !important;
}
.forge-sidebar-search .nextra-search kbd {
  background: var(--forge-border-soft) !important;
  border: 1px solid var(--forge-border) !important;
  border-radius: 0.25rem !important;
  color: var(--forge-text-faint) !important;
  font-family: inherit !important;
  font-size: 0.625rem !important;
  box-shadow: none !important;
  padding: 0 0.3rem !important;
}
.dark .forge-sidebar-search .nextra-search input {
  background: var(--forge-border-soft) !important;
}

/* ── Sidebar anchors (persistent bottom links) ───────────────────────────── */
.forge-sidebar-anchors {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 295px;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.5rem 1rem 0.75rem;
  background: var(--nav-bg);
  border-top: 1px solid var(--forge-border);
  z-index: 36;
}
.forge-anchor-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0;
  font-size: 0.8125rem;
  color: var(--forge-text-soft);
  text-decoration: none;
  transition: color 0.15s;
}
.forge-anchor-link:hover {
  color: var(--forge-accent);
}
.forge-anchor-icon {
  flex-shrink: 0;
}

.nextra-sidebar > div:first-child {
  padding-top: calc(var(--nextra-navbar-height) + 3.75rem) !important;
}

/* Extra padding when page-tabs are present in the sidebar */
body:has(.nextra-scrollbar:has(> a[href]):not(.nextra-search-results) > a) .nextra-sidebar > div:first-child {
  padding-top: calc(var(--nextra-navbar-height) + 6.25rem) !important;
}

.nextra-search ul,
.nextra-search [role="listbox"],
.nextra-search [role="dialog"],
.nextra-search > div:not(:first-child),
.nextra-search > p {
  z-index: 1000 !important;
  position: relative;
}

body > [class*="rounded-xl"][class*="shadow-xl"],
body > [class*="rounded-lg"][class*="shadow-lg"],
body > [class*="z-30"][class*="rounded"],
body > [class*="z-50"][class*="rounded"],
body > div[id^="headlessui-combobox"],
body > div[id^="headlessui"],
body > [data-headlessui-state],
body > div:has([role="listbox"]),
body > div:has([role="dialog"]),
body > [role="listbox"],
body > [role="dialog"][aria-modal="true"]:has([role="listbox"]) {
  position: relative !important;
  z-index: 9999 !important;
  min-width: 480px !important;
  max-width: calc(100vw - 2rem) !important;
}

/* Same intent as the rules above, but matches the popover element directly.
   Nextra v4 portals the search popover into
   body > #headlessui-portal-root > div > .nextra-search-results, so the
   "body > ..." direct-child selectors above never match in current Nextra. */
.nextra-search-results {
  z-index: 1000 !important;
}

body > [class*="rounded-xl"][class*="shadow-xl"] li > a,
body > [class*="rounded-lg"][class*="shadow-lg"] li > a,
body > [class*="rounded-xl"] [role="option"],
body > [class*="rounded-lg"] [role="option"],
body > [role="listbox"] [role="option"],
body > div:has(> [role="listbox"]) [role="option"] {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

@media (max-width: 767px) {
  .forge-sidebar-search { display: none; }
  .forge-sidebar-anchors { display: none; }
  body > [class*="rounded-xl"][class*="shadow-xl"],
  body > [class*="rounded-lg"][class*="shadow-lg"],
  body > [class*="z-30"][class*="rounded"],
  body > [class*="z-50"][class*="rounded"],
  body > div[id^="headlessui-combobox"],
  body > div:has(> [role="listbox"]),
  body > [role="listbox"] {
    min-width: 0 !important;
    width: calc(100vw - 1rem) !important;
    max-width: calc(100vw - 1rem) !important;
    max-height: 70vh !important;
  }
  body > [class*="rounded-xl"][class*="shadow-xl"] li > a,
  body > [class*="rounded-lg"][class*="shadow-lg"] li > a,
  body > [class*="rounded-xl"] [role="option"],
  body > [class*="rounded-lg"] [role="option"],
  body > [role="listbox"] [role="option"],
  body > div:has(> [role="listbox"]) [role="option"] {
    white-space: normal !important;
    overflow: visible !important;
    text-overflow: clip !important;
    padding: 0.75rem 0.875rem !important;
    min-height: 2.75rem !important;
  }
  .nextra-search-results {
    position: fixed !important;
    top: calc(var(--nextra-navbar-height) + 6rem) !important;
    left: 0.5rem !important;
    right: 0.5rem !important;
    bottom: 1rem !important;
    width: auto !important;
    max-width: none !important;
    height: auto !important;
    max-height: none !important;
  }
  .nextra-search-results [role="option"] {
    padding: 0.75rem 0.875rem !important;
    min-height: 2.75rem !important;
  }
}

.nextra-skip-nav,
a[href="#nextra-skip-nav"] {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
  clip-path: inset(50%) !important;
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
  gap: 0 !important;
}

@media (max-width: 767px) {
  .nextra-navbar nav {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  .nextra-navbar nav > div:not(:has(.nextra-search)) {
    display: none !important;
  }
}



.nextra-navbar nav > a[href="/"] {
  display: none !important;
}

@media (max-width: 767px) {
  .nextra-navbar nav > a[href="/"] {
    display: flex !important;
    align-items: center !important;
    margin-right: auto !important;
  }
}

.forge-navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--forge-text-strong);
}
.forge-navbar-logo img {
  flex-shrink: 0;
  height: 24px;
  width: auto;
}

.nextra-navbar nav > div:not(:has(.nextra-search)) {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  overflow: visible;
  justify-content: flex-end;
}

.nextra-navbar nav > div > a,
.nextra-navbar nav > div > details {
  padding: 0.375rem 0.625rem !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  color: var(--forge-text-soft) !important;
  text-decoration: none !important;
  border-radius: 0.375rem !important;
  transition: background 0.12s, color 0.12s !important;
  white-space: nowrap !important;
}
.nextra-navbar nav > div > a:hover,
.nextra-navbar nav > div > details:hover {
  background: var(--forge-hover-bg) !important;
  color: var(--forge-text-strong) !important;
}
.nextra-navbar nav > div > details > summary {
  cursor: pointer !important;
  list-style: none !important;
}

.nextra-navbar .nextra-search { margin-left: auto; }
.forge-sidebar-search .nextra-search { margin-left: 0; width: 100%; }

@media (min-width: 768px) {
  .nextra-navbar .nextra-search { display: none !important; }
}


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
  background: var(--forge-bg) !important;
  border-color: var(--forge-accent) !important;
  box-shadow: 0 0 0 3px var(--forge-accent-soft) !important;
  outline: none !important;
  color: var(--forge-text-strong) !important;
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
  color: var(--forge-text-soft) !important;
  padding: 0.375rem !important;
  border-radius: 0.375rem !important;
}
.nextra-hamburger:hover {
  background: var(--forge-hover-bg) !important;
  color: var(--forge-text-strong) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN LAYOUT — 5-col grid
   col: [sidebar 295px] [1fr] [article 680px] [toc 220px] [1fr]
   ═══════════════════════════════════════════════════════════════════════════ */

div:has(> aside.nextra-sidebar) {
  display: grid !important;
  grid-template-columns: 295px 1fr 680px 220px 1fr !important;
  max-width: 100% !important;
  width: 100% !important;
  margin: 0 !important;
  align-items: start !important;
}

aside.nextra-sidebar { grid-column: 1 !important; grid-row: 1 !important; background: var(--forge-sidebar-bg) !important; border-right: 1px solid var(--forge-border); }
article              { grid-column: 3 !important; grid-row: 1 !important; min-width: 0 !important; width: 100% !important; max-width: 100% !important; margin: 0 !important; }
nav.nextra-toc       { grid-column: 4 !important; grid-row: 1 !important; width: 220px !important; order: unset !important; }

@media (max-width: 1279px) {
  div:has(> aside.nextra-sidebar) { grid-template-columns: 295px 1fr 680px 1fr !important; }
  article { grid-column: 3 !important; }
  nav.nextra-toc { display: none !important; }
}

@media (max-width: 900px) {
  div:has(> aside.nextra-sidebar) { grid-template-columns: 295px 1fr !important; }
  article { grid-column: 2 !important; }
}

@media (max-width: 767px) {
  div:has(> aside.nextra-sidebar) { grid-template-columns: 1fr !important; }
  aside.nextra-sidebar { display: none !important; }
  article { grid-column: 1 !important; padding: 0 1.25rem 4rem !important; }
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
}

:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul {
  gap: 0 !important;
  display: flex !important;
  flex-direction: column !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul > li > button {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: var(--nav-section-color) !important;
  background: none !important;
  padding: 0.375rem 0.5rem 0.25rem 0.875rem !important;
  margin-top: 1.5rem !important;
  gap: 0 !important;
  cursor: default !important;
  pointer-events: none !important;
  border-radius: 0 !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul > li:first-of-type > button {
  margin-top: 0.5rem !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul > li > button > svg {
  display: none !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul > li.active > a,
:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul > li:not(.open) > a {
  font-size: 0.8125rem !important;
  padding: 0.3125rem 0.5rem 0.3125rem 0.875rem !important;
  border-radius: 0.375rem !important;
}

:is(.nextra-sidebar, .nextra-mobile-nav) li > div > ul {
  padding-left: 0.75rem !important;
  margin-left: 0 !important;
  padding-top: 0 !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) > div > div > ul > li > div > ul {
  padding-left: 0 !important;
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
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  color: var(--nav-item-color) !important;
  padding: 0.3125rem 0.5rem 0.3125rem 0.875rem !important;
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

:is(.nextra-sidebar, .nextra-mobile-nav) li.active > a {
  color: var(--nav-active-color) !important;
  background: var(--nav-active-bg) !important;
}
:is(.nextra-sidebar, .nextra-mobile-nav) li.active > a::before {
  content: '';
  position: absolute;
  left: -0.625rem;
  top: 18%;
  bottom: 18%;
  width: 2px;
  border-radius: 0 1px 1px 0;
  background: var(--nav-active-bar);
}

.nextra-sidebar-footer { display: none !important; }

.nextra-navbar .nextra-theme-switch { display: flex; align-items: center; }
.nextra-navbar .nextra-theme-switch span { display: none !important; }
.nextra-navbar .nextra-theme-switch button {
  padding: 0.375rem !important;
  border-radius: 0.375rem !important;
  color: var(--forge-text-soft) !important;
  background: none !important;
  border: none !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.1s, color 0.1s;
}
.nextra-navbar .nextra-theme-switch button:hover {
  background: var(--forge-hover-bg) !important;
  color: var(--forge-text-strong) !important;
}

.nextra-mobile-nav {
  background: var(--nav-bg) !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  scroll-padding-top: calc(var(--nextra-navbar-height, 54px) + 0.5rem);
}
.nextra-mobile-nav > div:first-child {
  padding: calc(var(--nextra-navbar-height) + 0.75rem) 1rem 1rem !important;
}
.nextra-mobile-nav > div > div > ul > li:has(> a[href="/"]),
.nextra-mobile-nav > div > div > ul > li:has(> a[href^="/api-"]):not(:has(> div > ul)),
.nextra-mobile-nav > div > div > ul > li:has(> a[href^="http"]):not(:has(> div > ul)),
.nextra-mobile-nav > div > div > ul > li:has(> a[href^="mailto:"]):not(:has(> div > ul)) {
  font-weight: 500;
}
.nextra-mobile-nav > div > div > ul > li:has(> a[href="/"]) > a,
.nextra-mobile-nav > div > div > ul > li:has(> a[href^="/api-"]):not(:has(> div > ul)) > a,
.nextra-mobile-nav > div > div > ul > li:has(> a[href^="http"]):not(:has(> div > ul)) > a,
.nextra-mobile-nav > div > div > ul > li:has(> a[href^="mailto:"]):not(:has(> div > ul)) > a {
  font-size: 0.875rem !important;
  color: var(--nav-item-hover-color) !important;
  padding: 0.5rem 0.875rem !important;
}
.nextra-mobile-nav .nextra-sidebar-footer {
  display: none !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOC — right column
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-toc {
  width: 220px !important;
  min-width: 0 !important;
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
  color: var(--forge-text-faint) !important;
  padding: 1.5rem 1rem 0.5rem !important;
}

.nextra-toc ul { padding: 0.5rem 1rem 1rem !important; }
.nextra-toc ul li { margin: 0 !important; }
.nextra-toc ul li a {
  font-size: 0.8125rem !important;
  font-weight: 400 !important;
  color: var(--forge-text-soft) !important;
  padding: 0.3rem 0 !important;
  display: block !important;
  transition: color 0.12s !important;
  line-height: 1.4 !important;
}
.nextra-toc ul li a:hover { color: var(--forge-accent) !important; }
.nextra-toc ul li a[class*="font-semibold"] {
  color: var(--forge-accent) !important;
  font-weight: 500 !important;
}

.nextra-toc > div > div:last-child { display: none !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   ARTICLE CONTENT
   ═══════════════════════════════════════════════════════════════════════════ */

article {
  padding: 0 2.5rem 5rem !important;
  color: var(--forge-text) !important;
}

.nextra-breadcrumb {
  margin-top: 1.5rem !important;
  margin-bottom: 0.375rem !important;
  font-size: 0.75rem !important;
  color: var(--forge-text-faint) !important;
  gap: 0.375rem !important;
}
.nextra-breadcrumb span:last-child {
  color: var(--forge-accent) !important;
  font-weight: 500 !important;
}

article h1 {
  font-size: 1.75rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.035em !important;
  line-height: 1.2 !important;
  color: var(--forge-text-strong) !important;
  margin-top: 0.25rem !important;
  margin-bottom: 0.75rem !important;
}
article h1 + p {
  font-size: 1rem !important;
  color: var(--forge-text-soft) !important;
  line-height: 1.65 !important;
  margin-top: 0 !important;
  margin-bottom: 1.5rem !important;
}
article h2 {
  font-size: 1.1875rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.025em !important;
  line-height: 1.3 !important;
  color: var(--forge-text-strong) !important;
  margin-top: 2.25rem !important;
  margin-bottom: 0.625rem !important;
  padding-bottom: 0 !important;
  border-bottom: none !important;
}
article h3 {
  font-size: 1rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.015em !important;
  color: var(--forge-text-strong) !important;
  margin-top: 1.75rem !important;
  margin-bottom: 0.5rem !important;
}
article h4 {
  font-size: 0.9375rem !important;
  font-weight: 600 !important;
  color: var(--forge-text-strong) !important;
  margin-top: 1.25rem !important;
}
article p {
  font-size: 0.9375rem !important;
  line-height: 1.75 !important;
  color: var(--forge-text) !important;
}
article a:not(.nextra-card) {
  color: var(--forge-accent) !important;
  font-weight: 500 !important;
  text-decoration: none !important;
}
article a:not(.nextra-card):hover {
  text-decoration: underline !important;
  text-underline-offset: 2px !important;
}
article ul, article ol {
  font-size: 0.9375rem !important;
  line-height: 1.75 !important;
  color: var(--forge-text) !important;
}
article hr { border-color: var(--forge-border) !important; margin: 2rem 0 !important; }
article strong { color: var(--forge-text-strong) !important; font-weight: 600 !important; }

article *:has(> table) {
  max-width: 100% !important;
}
article table {
  display: table !important;
  width: auto !important;
  max-width: 100% !important;
  font-size: 0.875rem !important;
  border-collapse: separate !important;
  border-spacing: 0 !important;
  border: 1px solid var(--forge-border) !important;
  border-radius: 0.5rem !important;
  margin: 1.5rem 0 !important;
  table-layout: auto !important;
  word-break: break-word;
}
article thead tr th {
  background: var(--forge-border-soft) !important;
  color: var(--forge-text-soft) !important;
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  padding: 0.625rem 0.875rem !important;
  border-bottom: 1px solid var(--forge-border) !important;
  text-align: left !important;
}
.dark article thead tr th { background: #111827 !important; }
article tbody tr td {
  padding: 0.625rem 0.875rem !important;
  color: var(--forge-text) !important;
  border-bottom: 1px solid var(--forge-border) !important;
  vertical-align: top !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
}
article tbody tr:last-child td { border-bottom: none !important; }
article tbody tr:hover td { background: var(--forge-hover-bg) !important; }

article code:not(pre code) {
  font-size: 0.8125em !important;
  font-weight: 500 !important;
  color: hsl(228 84% 52%) !important;
  background: var(--forge-accent-soft) !important;
  border: 1px solid hsl(228 84% 88%) !important;
  border-radius: 0.3rem !important;
  padding: 0.1em 0.4em !important;
}
.dark article code:not(pre code) {
  color: hsl(228 84% 72%) !important;
  background: hsl(228 84% 10%) !important;
  border-color: hsl(228 84% 20%) !important;
}

.nextra-code pre, article pre {
  font-size: 0.8125rem !important;
  line-height: 1.7 !important;
  border-radius: 0.625rem !important;
  border: 1.5px solid var(--forge-border) !important;
  padding: 1rem 1.25rem !important;
  background: #f8fafc !important;
  overflow-x: auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04) !important;
}
.dark .nextra-code pre, .dark article pre {
  background: #0d1117 !important;
  border-color: var(--forge-border) !important;
  box-shadow: none !important;
}

.nextra-code {
  position: relative !important;
}
.nextra-code button[title="Copy code"] {
  top: 0.5rem !important;
  right: 0.5rem !important;
  padding: 0.3125rem 0.4375rem !important;
  background: #ffffff !important;
  border: 1px solid var(--forge-border) !important;
  border-radius: 0.375rem !important;
  color: var(--forge-text-soft) !important;
  opacity: 0.85 !important;
  transition: opacity 0.12s, color 0.12s, border-color 0.12s, background 0.12s !important;
}
.nextra-code:hover button[title="Copy code"] {
  opacity: 1 !important;
}
.nextra-code button[title="Copy code"]:hover {
  color: var(--forge-accent) !important;
  border-color: var(--forge-accent) !important;
}
.dark .nextra-code button[title="Copy code"] {
  background: #161b22 !important;
}

article kbd {
  display: inline-block;
  font-family: var(--font-mono, ui-monospace, 'SF Mono', Menlo, Consolas, monospace) !important;
  font-size: 0.75rem !important;
  font-weight: 500 !important;
  line-height: 1 !important;
  color: var(--forge-text-strong) !important;
  background: #ffffff !important;
  border: 1px solid var(--forge-border) !important;
  border-radius: 0.3125rem !important;
  padding: 0.1875rem 0.4375rem !important;
  box-shadow: inset 0 -1.5px 0 var(--forge-border-soft), 0 1px 0 var(--forge-border-soft) !important;
  vertical-align: 1px;
}
.dark article kbd {
  color: var(--forge-text-strong) !important;
  background: var(--forge-border-soft) !important;
  border-color: var(--forge-border) !important;
  box-shadow: inset 0 -1.5px 0 #000, 0 1px 0 #000 !important;
}

article dl {
  display: grid !important;
  grid-template-columns: 9rem 1fr !important;
  column-gap: 1.5rem !important;
  row-gap: 0.75rem !important;
  margin: 1.5rem 0 !important;
  padding: 1rem 1.25rem !important;
  border: 1px solid var(--forge-border) !important;
  border-radius: 0.5rem !important;
  background: var(--forge-bg) !important;
}
article dt {
  font-family: var(--font-mono, ui-monospace, 'SF Mono', Menlo, Consolas, monospace) !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  color: var(--forge-accent) !important;
  align-self: start !important;
  padding-top: 0.1875rem !important;
}
article dd {
  margin: 0 !important;
  font-size: 0.875rem !important;
  line-height: 1.6 !important;
  color: var(--forge-text) !important;
}
@media (max-width: 767px) {
  article dl {
    grid-template-columns: 1fr !important;
    row-gap: 0.25rem !important;
  }
  article dd {
    margin-bottom: 0.5rem !important;
  }
}

.nextra-callout {
  border-radius: 0.5rem !important;
  padding: 0.875rem 1.125rem !important;
  font-size: 0.875rem !important;
  line-height: 1.6 !important;
  margin: 1.25rem 0 !important;
  border-width: 1px !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARDS
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-cards { gap: 0.75rem !important; margin-top: 1.25rem !important; }

a.nextra-card {
  border: 1px solid var(--forge-border) !important;
  border-radius: 0.625rem !important;
  background: white !important;
  box-shadow: none !important;
  padding: 0 !important;
  overflow: hidden !important;
  transition: border-color 0.15s, box-shadow 0.15s !important;
  display: flex !important;
  flex-direction: column !important;
  text-decoration: none !important;
  position: relative;
}
.dark a.nextra-card { background: #0d1117 !important; border-color: var(--forge-border) !important; }

a.nextra-card:hover {
  border-color: var(--forge-accent-border) !important;
  box-shadow: 0 0 0 3px var(--forge-accent-soft) !important;
  background: white !important;
}
.dark a.nextra-card:hover { background: #0d1117 !important; }

a.nextra-card > span {
  padding: 1rem 1.125rem 0.875rem !important;
  gap: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  padding-right: 2.25rem !important;
}
a.nextra-card > span > span {
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  color: var(--forge-text-strong) !important;
  letter-spacing: -0.01em !important;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
}
a.nextra-card::after {
  content: '\\2197';
  position: absolute;
  top: 0.9rem;
  right: 1rem;
  font-size: 0.875rem;
  line-height: 1;
  color: var(--forge-text-faint);
  transition: color 0.15s;
  font-weight: 400;
}
a.nextra-card:hover::after { color: var(--forge-accent) !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   PREV/NEXT + FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */

article + div { border-top-color: var(--forge-border) !important; }
article + div a { font-size: 0.875rem !important; color: var(--forge-text-soft) !important; font-weight: 500 !important; }
article + div a:hover { color: var(--forge-accent) !important; }
article > div[class*="text-end"] { font-size: 0.75rem !important; color: var(--forge-text-faint) !important; }

body > div:last-of-type { background: var(--forge-bg) !important; }

footer {
  font-size: 0.8125rem !important;
  color: var(--forge-text-faint) !important;
  padding: 2.5rem 0 3rem !important;
  width: 900px !important;
  max-width: calc(100vw - 295px - 2rem) !important;
  margin-left: calc(295px + max((100vw - 295px - 900px) / 2, 0px)) !important;
  margin-right: auto !important;
  border-top: 1px solid var(--forge-border-soft) !important;
}

@media (max-width: 767px) {
  footer {
    width: auto !important;
    margin-left: 0 !important;
    max-width: 100vw !important;
    padding: 2rem 1.25rem !important;
  }
}

.nextra-border { border-color: var(--forge-border) !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   MISC
   ═══════════════════════════════════════════════════════════════════════════ */

.subheading-anchor { opacity: 0; margin-left: 0.375rem; font-size: 0.75em; transition: opacity 0.15s; }
*:hover > .subheading-anchor, .subheading-anchor:focus { opacity: 0.4; }

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 999px; }
.dark ::-webkit-scrollbar-thumb { background: #374151; }

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER (structured) — rendered when SiteBranding.footer is configured
   ═══════════════════════════════════════════════════════════════════════════ */

.forge-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  padding: 0 0.5rem;
}

.forge-footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
}

.forge-footer-col h4 {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  color: var(--forge-text-soft) !important;
  margin: 0 0 0.5rem 0 !important;
}

.forge-footer-col ul {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.25rem !important;
}

.forge-footer-col a {
  font-size: 0.8125rem !important;
  color: var(--forge-text-soft) !important;
  text-decoration: none !important;
}
.forge-footer-col a:hover {
  color: var(--forge-accent) !important;
}

.forge-footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--forge-border-soft);
  font-size: 0.75rem;
  color: var(--forge-text-faint);
}

.forge-footer-copyright,
.forge-footer-powered {
  font-size: 0.75rem;
  color: var(--forge-text-faint);
}

.forge-footer-social {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
}
.forge-footer-social a {
  font-size: 0.75rem;
  color: var(--forge-text-soft) !important;
  text-decoration: none !important;
}
.forge-footer-social a:hover {
  color: var(--forge-accent) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA BUTTON — primary call-to-action rendered in the navbar
   ═══════════════════════════════════════════════════════════════════════════ */

.forge-cta-button {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  background: var(--forge-accent);
  color: white;
  text-decoration: none;
  transition: opacity 0.15s;
}
.forge-cta-button:hover { opacity: 0.85; }

`;

// ── Override generator ──────────────────────────────────────────────────────

function buildForgeOverrides(input) {
	const hue = input.accentHue;
	const sat = input.accentSaturation ?? 84;
	const lit = input.accentLightness ?? 61;
	const accent = `hsl(${hue} ${sat}% ${lit}%)`;
	const accentSoft = `hsl(${hue} ${sat}% 96%)`;
	const accentBorder = `hsl(${hue} ${sat}% 75%)`;

	const dv = input.darkVariant;
	const darkH = dv?.h ?? hue;
	const darkS = dv?.s ?? sat;
	const darkL = dv?.l ?? Math.min(lit + 7, 100);
	const accentDark = `hsl(${darkH} ${darkS}% ${darkL}%)`;
	const accentDarkSoft = `hsl(${darkH} ${darkS}% 11%)`;
	const accentDarkBorder = `hsl(${darkH} ${darkS}% 40%)`;

	const fontDecl = input.fontFamily ? `  --forge-font-family: ${input.fontFamily};\n` : "";
	const bgLightDecl = input.backgroundLight ? `  --forge-bg: ${input.backgroundLight};\n` : "";
	const bgDarkDecl = input.backgroundDark ? `  --forge-bg: ${input.backgroundDark};\n` : "";

	return `
/* ── Forge theme overrides (generated) ──────────────────────────────────── */
:root {
${fontDecl}${bgLightDecl}  --nextra-primary-hue:        ${hue};
  --nextra-primary-saturation: ${sat}%;
  --nextra-primary-lightness:  ${lit}%;

  --forge-accent:        ${accent};
  --forge-accent-soft:   ${accentSoft};
  --forge-accent-border: ${accentBorder};

  --nav-active-color: ${accent};
  --nav-active-bar:   ${accent};
}

.dark {
${bgDarkDecl}  --nextra-primary-lightness: ${darkL}%;

  --forge-accent-soft:       ${accentDarkSoft};
  --forge-accent-border:     ${accentDarkBorder};
  --nav-active-color:        ${accentDark};
  --nav-active-bar:          ${accentDark};
}
`;
}

// ── Public API ──────────────────────────────────────────────────────────────

export function buildCss(config) {
	const accent = resolveAccent(config?.theme, 228, 84, 61);
	const fontFamily = config?.theme?.fontFamily ?? manifest.defaults.fontFamily;
	const fontCss = FONT_CONFIG[fontFamily]?.cssFamily;

	return FORGE_BASE_CSS + buildForgeOverrides({
		accentHue: accent.hue,
		accentSaturation: accent.saturation,
		accentLightness: accent.lightness,
		lightVariant: accent.light,
		darkVariant: accent.dark,
		fontFamily: fontCss,
		backgroundLight: config?.theme?.background?.light,
		backgroundDark: config?.theme?.background?.dark,
	});
}
