/**
 * Atlas theme CSS — editorial handbook visual style.
 *
 * Emits the shared component styles from ./components.mjs followed by
 * Atlas-specific design tokens, serif heading overrides, and theme-prefixed
 * layout selectors.
 *
 * Top-nav layout, serif headlines (Source Serif 4), dark-default mode (warm
 * cream when toggled to light), wider content column, airy spacing, masthead-
 * style footer. Accent color used as ambient glow rather than solid fill.
 */

import manifest from "./manifest.mjs";
import COMPONENTS_CSS from "./components.mjs";

// ── Inlined color utilities ─────────────────────────────────────────────────

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
	let h;
	if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
	else if (max === g) h = ((b - r) / d + 2) / 6;
	else h = ((r - g) / d + 4) / 6;

	return {
		h: Math.round(h * 360),
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

const ATLAS_BASE_CSS = `/*
 * Atlas Theme — editorial handbook
 * Pack-internal decisions: serif headlines, dark default, top-nav, masthead footer.
 *
 * Source Serif 4 is loaded via a <link rel="stylesheet"> in app/layout.tsx
 * (see Atlas Apply.ts) so the browser can fetch the font in parallel with the
 * page HTML rather than waiting for this stylesheet to parse.
 *
 * Shared component styles (article headings, tables, code blocks, callouts,
 * cards, tabs, etc.) live in ./components.mjs and are prepended above.
 */

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════════ */

:root {
  --nextra-primary-hue: 200;
  --nextra-primary-saturation: 70%;
  --nextra-primary-lightness: 56%;
  --nextra-bg: 250 250 247;
  --nextra-navbar-height: 60px;

  /* ── Accent ─────────────────────────────────────────── */
  --w-accent:        hsl(200 70% 56%);
  --w-accent-soft:   hsl(200 70% 95%);
  --w-accent-border: color-mix(in srgb, var(--w-accent) 32%, white);

  /* Atlas-specific glow (used by sidebar active, cards, collapse toggle) */
  --atlas-accent-glow: hsla(200, 70%, 50%, 0.15);

  /* ── General palette ────────────────────────────────── */
  --w-bg:            #fafaf7;
  --w-border:        #e7e5e0;
  --w-border-soft:   #f1efea;
  --w-text-strong:   #18181b;
  --w-text:          #3f3f46;
  --w-text-soft:     #71717a;
  --w-text-faint:    #a1a1aa;
  --w-hover-bg:      #f5f4f1;

  /* ── Component colour tokens ────────────────────────── */
  --w-code-bg:             #ffffff;
  --w-code-shadow:         none;
  --w-filename-header-bg:  var(--w-border-soft);
  --w-inline-code-color:   var(--w-text-strong);
  --w-inline-code-bg:      var(--w-border-soft);
  --w-inline-code-border:  var(--w-border);
  --w-card-bg:             #ffffff;
  --w-scrollbar-thumb:     #d4d4d8;

  /* ── Atlas extras ───────────────────────────────────── */
  --atlas-bg-surface:    #ffffff;
  --atlas-headline-font: 'Source Serif 4', 'Iowan Old Style', Georgia, serif;
}

.dark {
  --nextra-bg: 10 10 15;
  --nextra-primary-lightness: 64%;

  --w-accent:        hsl(200 70% 64%);
  --w-accent-soft:   hsl(200 70% 12%);
  --w-accent-border: color-mix(in srgb, var(--w-accent) 45%, #111111);

  --atlas-accent-glow: hsla(200, 70%, 60%, 0.2);

  --w-bg:            #0a0a0f;
  --w-border:        #27272a;
  --w-border-soft:   #1c1c1f;
  --w-text-strong:   #fafafa;
  --w-text:          #d4d4d8;
  --w-text-soft:     #a1a1aa;
  --w-text-faint:    #71717a;
  --w-hover-bg:      #141418;

  --w-code-bg:             #131318;
  --w-filename-header-bg:  #1c1c1f;
  --w-inline-code-color:   var(--w-text-strong);
  --w-inline-code-bg:      var(--w-border-soft);
  --w-inline-code-border:  var(--w-border);
  --w-card-bg:             #131318;
  --w-scrollbar-thumb:     #3f3f46;

  --atlas-bg-surface:    #131318;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BASE
   ═══════════════════════════════════════════════════════════════════════════ */

html {
  font-family: var(--w-font-family, 'Inter', ui-sans-serif, system-ui, sans-serif) !important;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.005em;
}

body { background-color: var(--w-bg); }

/* ═══════════════════════════════════════════════════════════════════════════
   SERIF HEADING OVERRIDES — post-components.mjs overrides.
   components.mjs sets sans-serif headings; Atlas uses serif.
   ═══════════════════════════════════════════════════════════════════════════ */

article h1 {
  font-family: var(--atlas-headline-font) !important;
  font-size: 2.5rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.005em !important;
  line-height: 1.15 !important;
  margin-top: 0 !important;
  margin-bottom: 1.5rem !important;
}

article h1 + p {
  font-size: 1.125rem !important;
  line-height: 1.7 !important;
  margin-bottom: 2.5rem !important;
}

article h2 {
  font-family: var(--atlas-headline-font) !important;
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.005em !important;
  line-height: 1.3 !important;
  margin-top: 3rem !important;
  margin-bottom: 0.875rem !important;
  padding-bottom: 0 !important;
  border-bottom: none !important;
}
article h2::before {
  content: "-";
  color: var(--w-text-faint);
  font-weight: 400;
  margin-right: 0.5rem;
}

article h3 {
  font-family: var(--atlas-headline-font) !important;
  font-size: 1.125rem !important;
  font-weight: 600 !important;
  margin-top: 2rem !important;
  margin-bottom: 0.625rem !important;
}

/* Atlas body text: slightly more airy line-height than components default */
article p {
  line-height: 1.8 !important;
  margin-bottom: 1.125rem !important;
}

/* Atlas links: underlined by default (editorial style) */
article a:not(.nextra-card) {
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
  text-decoration-thickness: 1px !important;
}
article a:not(.nextra-card):hover {
  text-decoration-thickness: 2px !important;
}

/* Atlas hr: centered ornamental rule */
article hr {
  border: none !important;
  height: 1px !important;
  background: var(--w-border-soft) !important;
  margin: 1.5rem auto !important;
  max-width: 6rem !important;
}

/* Atlas inline code: simpler chip (no accent tint) */
article code:not(pre code) {
  color: var(--w-text-strong) !important;
  background: var(--w-border-soft) !important;
  border: none !important;
  border-radius: 4px !important;
  padding: 0.15em 0.3em !important;
  margin: 0 0.15em !important;
  -webkit-box-decoration-break: clone !important;
  box-decoration-break: clone !important;
}

/* Atlas code blocks — printed-listing style (no rounded card). */
.nextra-code:has(pre) {
  position: relative !important;
  margin: 2rem -1rem !important;
}
.nextra-code pre, article pre {
  font-size: 0.875rem !important;
  line-height: 1.75 !important;
  border-radius: 0 !important;
  border: none !important;
  border-top: 1px solid var(--w-border-soft) !important;
  border-bottom: 1px solid var(--w-border-soft) !important;
  padding: 1.25rem 1.5rem !important;
  background: var(--atlas-bg-surface) !important;
  box-shadow: none !important;
  margin: 0 !important;
}

/* Quiet copy button — Atlas override */
.nextra-code button[title="Copy code"] {
  top: 0.625rem !important;
  right: 0.75rem !important;
  padding: 0.25rem 0.4375rem !important;
  background: transparent !important;
  border: 1px solid var(--w-border-soft) !important;
  border-radius: 4px !important;
  color: var(--w-text-faint) !important;
  opacity: 0.7 !important;
  width: auto !important;
  height: auto !important;
  transition: opacity 0.15s, color 0.15s, border-color 0.15s !important;
}
.nextra-code:hover button[title="Copy code"] {
  opacity: 1 !important;
}
.nextra-code button[title="Copy code"]:hover {
  color: var(--w-accent) !important;
  border-color: var(--w-accent) !important;
}

/* Cards with soft shadow (light) / glow (dark) — Atlas override */
a.nextra-card {
  border-radius: 12px !important;
  background: var(--atlas-bg-surface) !important;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04) !important;
  transition: border-color 0.2s, box-shadow 0.2s !important;
}
a.nextra-card:hover {
  box-shadow: 0 0 0 4px var(--atlas-accent-glow) !important;
}
.dark a.nextra-card {
  box-shadow: none !important;
}
.dark a.nextra-card:hover {
  box-shadow: 0 0 0 4px var(--atlas-accent-glow) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOP NAVBAR — Atlas-specific (logo centered, slim height)
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-navbar-blur {
  background-color: var(--w-bg) !important;
  backdrop-filter: blur(8px) !important;
  border-bottom: 1px solid var(--w-border-soft) !important;
}

/* Navbar inner width matches content container below. */
.nextra-navbar nav {
  max-width: var(--nextra-content-width) !important;
  margin: 0 auto !important;
  height: var(--nextra-navbar-height) !important;
}

.atlas-navbar-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--atlas-headline-font);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--w-text-strong);
}
.atlas-navbar-logo img {
  flex-shrink: 0;
  height: 28px;
  width: auto;
}

.atlas-logo-dark { display: none !important; }
.dark .atlas-logo-light { display: none !important; }
.dark .atlas-logo-dark { display: inline-block !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION TABS — CSS-only second row for Nextra page-tabs.
   Uses flex-wrap to move the type:"page" links div to a full-width
   second row below the navbar. Active state via aria-current.
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-navbar nav {
  flex-wrap: wrap !important;
}

/* Page-tabs container → second row, full width. First tab padding-left
   is 0 so its text starts at the <nav>'s 1.5rem inset — matching the logo. */
.nextra-navbar nav > div.nextra-scrollbar {
  order: 100 !important;
  flex-basis: 100% !important;
  padding: 0 !important;
  gap: 0 !important;
  border-top: 1px solid var(--w-border-soft);
}

/* Tab link styling — first tab text aligns with logo above */
.nextra-navbar nav > div.nextra-scrollbar > a {
  padding: 0.625rem 1rem !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  font-family: var(--atlas-headline-font) !important;
  color: var(--w-text-soft) !important;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}
.nextra-navbar nav > div.nextra-scrollbar > a:first-child {
  padding-left: 0 !important;
}
.nextra-navbar nav > div.nextra-scrollbar > a:hover {
  color: var(--w-text-strong) !important;
}

/* Active tab — Nextra sets aria-current on the active page link */
.nextra-navbar nav > div.nextra-scrollbar > a[aria-current] {
  color: var(--w-accent) !important;
  border-bottom-color: var(--w-accent);
  font-weight: 600 !important;
}

/* Navbar height auto-adjusts for the second row.
   Bump --nextra-navbar-height so sidebar top + content padding-top
   clear the expanded navbar without overlap. */
.nextra-navbar:has(nav > div.nextra-scrollbar > a) {
  height: auto !important;
  min-height: var(--nextra-navbar-height);
}
body:has(.nextra-navbar nav > div.nextra-scrollbar > a) {
  --nextra-navbar-height: 96px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR — Atlas treats the sidebar as a "handbook spine" rather than a
   docs tree. Transparent surface, hairline right rule, looser line-height,
   serif italic small-caps section headers, decimal-leading-zero numbering on
   top-level folders, no chevron arrows. The intent is "engineering wiki"
   not "Stripe SDK reference".
   ═══════════════════════════════════════════════════════════════════════════ */

aside.nextra-sidebar-container,
aside.nextra-sidebar {
  background: transparent !important;
  border-right: 1px solid var(--w-border-soft) !important;
  width: 280px !important;
  scrollbar-width: thin !important;
  scrollbar-color: var(--w-border) transparent !important;
}
aside.nextra-sidebar::-webkit-scrollbar,
aside.nextra-sidebar-container::-webkit-scrollbar {
  width: 6px;
}
aside.nextra-sidebar::-webkit-scrollbar-track,
aside.nextra-sidebar-container::-webkit-scrollbar-track {
  background: transparent;
}
aside.nextra-sidebar::-webkit-scrollbar-thumb,
aside.nextra-sidebar-container::-webkit-scrollbar-thumb {
  background: var(--w-border-soft);
  border-radius: 3px;
}
aside.nextra-sidebar:hover::-webkit-scrollbar-thumb,
aside.nextra-sidebar-container:hover::-webkit-scrollbar-thumb {
  background: var(--w-border);
}

aside.nextra-sidebar > div,
aside.nextra-sidebar-container > div {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

/* Top-level folder/section headers — serif italic, sit as quiet "chapter
   titles" with a faded hairline rule beneath them (print-book divider). */
aside.nextra-sidebar > div > div > ul > li > button,
aside.nextra-sidebar-container > div > div > ul > li > button {
  font-family: var(--atlas-headline-font) !important;
  font-style: italic !important;
  font-size: 0.9375rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.01em !important;
  color: var(--w-text-strong) !important;
  text-transform: none !important;
  background: none !important;
  border: none !important;
  margin-top: 1.75rem !important;
  margin-bottom: 0.5rem !important;
  padding: 0.25rem 0.5rem 0.5rem !important;
  width: 60% !important;
  text-align: left !important;
  cursor: pointer;
  border-bottom: 1px solid var(--w-border-soft) !important;
}

/* Hide chevron arrows on the section tree only — collapse state is implied
   by indent. Scoped to ul-button so the sidebar-footer theme toggle (also
   a button + svg) is left intact. */
aside.nextra-sidebar ul li > button > svg,
aside.nextra-sidebar-container ul li > button > svg {
  display: none !important;
}

/* Nested entries — quiet, looser line-height, larger indent */
aside.nextra-sidebar li > div > ul,
aside.nextra-sidebar-container li > div > ul {
  margin-left: 1rem !important;
  border-left: 1px solid var(--w-border-soft) !important;
  padding-left: 0.25rem !important;
}

aside.nextra-sidebar li a,
aside.nextra-sidebar-container li a {
  position: relative !important;
  font-size: 0.9375rem !important;
  line-height: 1.7 !important;
  color: var(--w-text-soft) !important;
  padding: 0.3rem 0.5rem 0.3rem 1.25rem !important;
  border-left: 3px solid transparent !important;
  border-radius: 0 !important;
  background: none !important;
  transition: border-color 0.15s, color 0.15s, background 0.15s !important;
}
/* Quiet hyphen bullet before each entry — marginal-note feel */
aside.nextra-sidebar li a::before,
aside.nextra-sidebar-container li a::before {
  content: "-";
  position: absolute;
  left: 0.5rem;
  color: var(--w-text-faint);
  font-weight: 400;
}
aside.nextra-sidebar li a:hover,
aside.nextra-sidebar-container li a:hover {
  color: var(--w-text-strong) !important;
  border-left-color: var(--w-border) !important;
  background: none !important;
}
aside.nextra-sidebar li.active > a,
aside.nextra-sidebar-container li.active > a {
  color: var(--w-accent) !important;
  font-weight: 500 !important;
  border-left-color: var(--w-accent) !important;
  background: var(--w-accent-soft) !important;
  box-shadow: none !important;
}
.dark aside.nextra-sidebar li.active > a,
.dark aside.nextra-sidebar-container li.active > a {
  background: transparent !important;
  box-shadow: inset 4px 0 0 var(--w-accent), 0 0 12px var(--atlas-accent-glow) !important;
  border-left-color: transparent !important;
}

/* ── Sidebar anchors (persistent bottom links) ───────────────────────────── */
.atlas-sidebar-anchors {
  position: fixed;
  bottom: 3rem;
  left: 0;
  width: var(--nextra-sidebar-width, 280px);
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.5rem 1rem 0.5rem;
  background: var(--w-bg);
  border-top: 1px solid var(--w-border-soft);
  z-index: 36;
}
.atlas-anchor-link {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0;
  font-size: 0.8125rem;
  color: var(--w-text-soft);
  text-decoration: none;
  transition: color 0.15s;
}
.atlas-anchor-link:hover {
  color: var(--w-accent);
}
.atlas-anchor-icon {
  flex-shrink: 0;
}

/* Sidebar footer — holds Nextra's theme switch. Solid background so scrolled
   sidebar content doesn't bleed through. Soft inset top shadow gives a quiet
   scroll cue (content fading behind the footer). */
.nextra-sidebar-footer {
  border-top: 1px solid var(--w-border-soft) !important;
  background: var(--w-bg) !important;
  padding: 0.75rem 0.5rem !important;
  box-shadow: 0 -8px 8px -8px rgba(0, 0, 0, 0.06) !important;
}
.dark .nextra-sidebar-footer {
  box-shadow: 0 -8px 8px -8px rgba(0, 0, 0, 0.4) !important;
}
.nextra-sidebar-footer button {
  font-size: 0.8125rem !important;
  color: var(--w-text-soft) !important;
  background: transparent !important;
  border: 1px solid var(--w-border-soft) !important;
  border-radius: 8px !important;
  transition: border-color 0.15s, color 0.15s !important;
}
.nextra-sidebar-footer button:hover {
  color: var(--w-text-strong) !important;
  border-color: var(--w-border) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE — below the md breakpoint (<768px) Nextra's persistent sidebar is
   replaced by a hamburger-driven drawer (.nextra-mobile-nav). Our overrides:
     - Hide the desktop collapse toggle (drawer is its own affordance)
     - Force the persistent sidebar offscreen (defensive against our 280px
       width override leaking in at narrow viewports)
     - Tighten article padding so the reading column doesn't overflow
     - Shrink the navbar logo so it fits next to the hamburger + theme toggle
   ═══════════════════════════════════════════════════════════════════════════ */
@media (max-width: 767px) {
  /* Hide Nextra's collapse toggle on mobile — the hamburger drawer is the
     sole nav affordance below md. */
  button[title="Collapse sidebar"],
  button[title="Expand sidebar"] {
    display: none !important;
  }
  aside.nextra-sidebar,
  aside.nextra-sidebar-container {
    display: none !important;
  }
  article {
    padding: 1.75rem 1.25rem 4rem !important;
  }
  article h1 {
    font-size: 2rem !important;
  }
  article h2 {
    font-size: 1.375rem !important;
  }
  .atlas-navbar-logo {
    font-size: 1rem !important;
  }
  .nextra-navbar nav {
    padding: 0 1rem !important;
  }
  /* Drawer styling — slides in from left, fills most of screen. */
  .nextra-mobile-nav {
    width: 320px !important;
    max-width: 88vw !important;
    background: var(--w-bg) !important;
    border-right: 1px solid var(--w-border-soft) !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
    scroll-padding-top: calc(var(--nextra-navbar-height, 60px) + 0.5rem);
  }
  .nextra-mobile-nav > div:first-child {
    padding: calc(var(--nextra-navbar-height) + 0.75rem) 0.875rem 1.5rem !important;
  }
  .nextra-mobile-nav .nextra-sidebar-footer {
    display: none !important;
  }
  .nextra-mobile-nav > div > div > ul > li:has(> a[href="/"]),
  .nextra-mobile-nav > div > div > ul > li:has(> a[href^="http"]):not(:has(> div > ul)),
  .nextra-mobile-nav > div > div > ul > li:has(> a[href^="mailto:"]):not(:has(> div > ul)),
  .nextra-mobile-nav > div > div > ul > li:has(> a[href^="/api-"]):not(:has(> div > ul)),
  .nextra-mobile-nav > div > div > ul > li:has(> div > ul > li > a[href^="/api-"]),
  .nextra-mobile-nav > div > div > ul > li:has(> div > ul > li > a[href^="http"]) {
    display: none !important;
  }
  /* Footer columns stack on mobile */
  .atlas-footer-columns {
    flex-direction: column !important;
    gap: 1.5rem !important;
  }
  footer {
    padding: 2rem 1.25rem 3rem !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIDEBAR COLLAPSE — hijacks Nextra's built-in toggle button (rendered in
   the sidebar-footer next to the theme switch).
   ═══════════════════════════════════════════════════════════════════════════ */

div:has(> aside.nextra-sidebar) {
  transition: grid-template-columns 0.25s ease !important;
}
aside.nextra-sidebar,
aside.nextra-sidebar-container {
  transition: width 0.25s ease, opacity 0.2s ease, padding 0.2s ease;
}
article {
  transition: max-width 0.25s ease;
}

/* Collapsed-state layout — driven by the toggle button's "Expand sidebar" title */
div:has(> aside.nextra-sidebar:has(button[title="Expand sidebar"])) {
  grid-template-columns: 0 1fr !important;
}
aside.nextra-sidebar:has(button[title="Expand sidebar"]),
aside.nextra-sidebar-container:has(button[title="Expand sidebar"]) {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  border-right: none !important;
}
aside.nextra-sidebar:has(button[title="Expand sidebar"]) .nextra-sidebar-footer > *:not(button[title="Expand sidebar"]) {
  opacity: 0 !important;
  pointer-events: none !important;
}
body:has(button[title="Expand sidebar"]) article {
  max-width: 980px !important;
}

/* Style Nextra's toggle button */
button[title="Collapse sidebar"],
button[title="Expand sidebar"] {
  width: 28px !important;
  height: 28px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 6px !important;
  background: var(--atlas-bg-surface) !important;
  color: var(--w-text-strong) !important;
  opacity: 1 !important;
  cursor: pointer !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
  transition: background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s !important;
}
button[title="Collapse sidebar"]:hover,
button[title="Expand sidebar"]:hover {
  background: var(--w-bg) !important;
  color: var(--w-accent) !important;
  border-color: var(--w-accent) !important;
  box-shadow: 0 0 0 3px var(--atlas-accent-glow) !important;
}
.dark button[title="Collapse sidebar"],
.dark button[title="Expand sidebar"] {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) !important;
}

/* Collapsed: float the toggle out of the now-zero-width sidebar */
button[title="Expand sidebar"] {
  position: fixed !important;
  left: 12px !important;
  bottom: 1rem !important;
  z-index: 50 !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   ARTICLE — wider reading column with sidebar present.
   ═══════════════════════════════════════════════════════════════════════════ */

article {
  max-width: 820px !important;
  padding: 2.5rem 2rem 5rem !important;
  margin: 0 auto !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOC — tight, quiet "Contents" rail.
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-toc {
  width: 200px !important;
}

.nextra-toc > div > p:first-child {
  font-family: var(--atlas-headline-font) !important;
  font-style: italic !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  letter-spacing: 0.02em !important;
  color: var(--w-text-soft) !important;
  padding: 1rem 1rem 0.5rem !important;
  margin-bottom: 0.25rem !important;
  border-bottom: 1px solid var(--w-border-soft) !important;
}

.nextra-toc ul li a {
  font-size: 0.75rem !important;
  line-height: 1.5 !important;
  color: var(--w-text-faint) !important;
  padding: 0.25rem 0.75rem !important;
  border-left: 2px solid transparent !important;
  transition: color 0.15s, border-color 0.15s !important;
}
.nextra-toc ul li a:hover {
  color: var(--w-text-soft) !important;
  border-left-color: var(--w-border) !important;
}
.nextra-toc ul li a.nextra-toc-active,
.nextra-toc ul li a[data-active="true"] {
  color: var(--w-text-strong) !important;
  border-left-color: var(--w-accent) !important;
}

@media (max-width: 1279px) {
  .nextra-toc { display: none !important; }
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER — masthead style
   ═══════════════════════════════════════════════════════════════════════════ */

footer {
  font-family: var(--atlas-headline-font) !important;
  font-size: 0.875rem !important;
  color: var(--w-text-soft) !important;
  padding: 1.75rem 1.5rem 2rem !important;
  border-top: 1px solid var(--w-border-soft) !important;
  margin-top: 2rem !important;
}
footer > div:first-child {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

footer .atlas-footer-masthead {
  font-family: var(--atlas-headline-font);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--w-text-strong);
  letter-spacing: -0.005em;
  margin-bottom: 0.5rem;
}

footer .atlas-footer-copy {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--w-text-faint);
}

/* ═══════════════════════════════════════════════════════════════════════════
   ENTRY METADATA STRIP
   ═══════════════════════════════════════════════════════════════════════════ */

.atlas-entry-meta {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--w-text-faint);
  margin: 0 0 1rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.atlas-entry-date,
.atlas-entry-type {
  color: var(--w-text-soft);
}

.atlas-entry-sep {
  color: var(--w-text-faint);
}

.atlas-entry-type {
  text-transform: uppercase;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DIGEST CALLOUTS
   ═══════════════════════════════════════════════════════════════════════════ */

.atlas-callout {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  margin: 1.75rem 0;
  border-radius: 12px;
  border: 1px solid var(--w-border-soft);
  background: var(--atlas-bg-surface);
}

.atlas-callout-head {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--atlas-headline-font);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--w-text-strong);
}

.atlas-callout-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999px;
  font-size: 0.75rem;
  line-height: 1;
}

.atlas-callout-label {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 0.6875rem;
}

.atlas-callout-body {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--w-text);
}
.atlas-callout-body > *:first-child { margin-top: 0; }
.atlas-callout-body > *:last-child { margin-bottom: 0; }

/* Variant accents */
.atlas-callout-outcome {
  border-left: 3px solid hsl(150 50% 45%);
}
.atlas-callout-outcome .atlas-callout-glyph {
  background: hsl(150 50% 92%);
  color: hsl(150 60% 30%);
}
.dark .atlas-callout-outcome .atlas-callout-glyph {
  background: hsl(150 50% 14%);
  color: hsl(150 50% 70%);
}

.atlas-callout-decision {
  border-left: 3px solid var(--w-accent);
}
.atlas-callout-decision .atlas-callout-glyph {
  background: var(--w-accent-soft);
  color: var(--w-accent);
}

.atlas-callout-action {
  border-left: 3px solid hsl(35 80% 50%);
}
.atlas-callout-action .atlas-callout-glyph {
  background: hsl(35 80% 92%);
  color: hsl(35 70% 35%);
}
.dark .atlas-callout-action .atlas-callout-glyph {
  background: hsl(35 60% 14%);
  color: hsl(35 80% 70%);
}

/* ═══════════════════════════════════════════════════════════════════════════
   PULL QUOTES
   ═══════════════════════════════════════════════════════════════════════════ */

.atlas-quote {
  margin: 2rem 0;
  padding: 0 0 0 1.5rem;
  border-left: 3px solid var(--w-accent);
}

.atlas-quote blockquote {
  margin: 0 !important;
  padding: 0 !important;
  font-family: var(--atlas-headline-font) !important;
  font-style: italic !important;
  font-size: 1.125rem !important;
  line-height: 1.6 !important;
  color: var(--w-text-strong) !important;
}

.atlas-quote figcaption {
  margin-top: 0.625rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.8125rem;
  color: var(--w-text-soft);
}

/* ═══════════════════════════════════════════════════════════════════════════
   ENTRY FEED
   ═══════════════════════════════════════════════════════════════════════════ */

.atlas-feed {
  list-style: none !important;
  margin: 2rem 0 !important;
  padding: 0 !important;
  border-top: 1px solid var(--w-border-soft);
}

.atlas-feed-item {
  margin: 0 !important;
  border-bottom: 1px solid var(--w-border-soft);
}

.atlas-feed-link {
  display: block !important;
  padding: 1.5rem 0 !important;
  text-decoration: none !important;
  transition: opacity 0.15s;
}
.atlas-feed-link:hover { opacity: 0.85; }

.atlas-feed-meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--w-text-faint);
  margin-bottom: 0.375rem;
}

.atlas-feed-title {
  font-family: var(--atlas-headline-font) !important;
  font-size: 1.375rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.005em !important;
  color: var(--w-text-strong) !important;
  margin: 0 0 0.5rem 0 !important;
}

.atlas-feed-excerpt {
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--w-text-soft);
  margin: 0 !important;
}

.atlas-feed-empty {
  color: var(--w-text-soft);
  font-style: italic;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER (structured)
   ═══════════════════════════════════════════════════════════════════════════ */

.atlas-footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
  padding: 0 0.5rem;
}

.atlas-footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
}

.atlas-footer-col h4 {
  font-family: var(--atlas-headline-font) !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  color: var(--w-text-strong) !important;
  margin: 0 0 0.625rem 0 !important;
}

.atlas-footer-col ul {
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.375rem !important;
}

.atlas-footer-col a {
  font-family: 'Inter', sans-serif !important;
  font-size: 0.875rem !important;
  color: var(--w-text-soft) !important;
  text-decoration: none !important;
}
.atlas-footer-col a:hover {
  color: var(--w-accent) !important;
}

.atlas-footer-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--w-border-soft);
}

.atlas-footer-social {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}
.atlas-footer-social a {
  font-family: 'Inter', sans-serif !important;
  font-size: 0.75rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  color: var(--w-text-soft) !important;
  text-decoration: none !important;
}
.atlas-footer-social a:hover {
  color: var(--w-accent) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   AUTH BANNER
   ═══════════════════════════════════════════════════════════════════════════ */

.jolli-auth-banner {
  width: 100%;
  background-color: #fef3c7;
  border-bottom: 1px solid #fcd34d;
  padding: 8px 16px;
  font-size: 13px;
  color: #78350f;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.dark .jolli-auth-banner {
  background-color: rgba(120, 53, 15, 0.18);
  border-bottom-color: rgba(202, 138, 4, 0.3);
  color: #fde68a;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEARCH RESULTS DROPDOWN
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-search ul,
.nextra-search [role="listbox"],
.nextra-search [role="dialog"],
.nextra-search > div:not(:first-child),
.nextra-search > p {
  z-index: 9999 !important;
  position: relative;
}

body > [class*="rounded-xl"][class*="shadow-xl"],
body > [class*="rounded-lg"][class*="shadow-lg"],
body > [class*="z-30"][class*="rounded"],
body > [class*="z-50"][class*="rounded"],
body > div[id^="headlessui-combobox"],
body > div:has(> [role="listbox"]),
body > [role="listbox"],
body > [role="dialog"][aria-modal="true"]:has([role="listbox"]) {
  position: relative !important;
  z-index: 9999 !important;
  min-width: 480px !important;
  max-width: calc(100vw - 2rem) !important;
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
  body > [class*="rounded-xl"][class*="shadow-xl"],
  body > [class*="rounded-lg"][class*="shadow-lg"],
  body > [class*="z-30"][class*="rounded"],
  body > [class*="z-50"][class*="rounded"],
  body > div[id^="headlessui-combobox"],
  body > div:has(> [role="listbox"]),
  body > [role="listbox"] {
    min-width: 0 !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   CTA BUTTON
   ═══════════════════════════════════════════════════════════════════════════ */

.atlas-cta-button {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  background: var(--w-accent);
  color: white;
  text-decoration: none;
  transition: opacity 0.15s;
}
.atlas-cta-button:hover { opacity: 0.85; }

`;

// ── Override generator ──────────────────────────────────────────────────────

function buildOverrides(input) {
	const hue = input.accentHue;
	const sat = input.accentSaturation ?? 70;
	const lit = input.accentLightness ?? 56;
	const fontDecl = input.fontFamily ? `  --w-font-family: ${input.fontFamily};\n` : "";
	const bgLightDecl = input.backgroundLight ? `  --w-bg: ${input.backgroundLight};\n` : "";
	const bgDarkDecl = input.backgroundDark ? `  --w-bg: ${input.backgroundDark};\n` : "";

	const dv = input.darkVariant;
	const darkH = dv?.h ?? hue;
	const darkS = dv?.s ?? sat;
	const darkL = dv?.l ?? Math.min(lit + 8, 100);

	return `
/* ── Atlas theme overrides (generated) ──────────────────────────────────── */
:root {
${fontDecl}${bgLightDecl}  --nextra-primary-hue:        ${hue};
  --nextra-primary-saturation: ${sat}%;
  --nextra-primary-lightness:  ${lit}%;

  --w-accent:      hsl(${hue} ${sat}% ${lit}%);
  --w-accent-soft: hsl(${hue} ${sat}% 95%);
  --w-accent-border: color-mix(in srgb, var(--w-accent) 32%, white);
  --atlas-accent-glow: hsla(${hue}, ${sat}%, ${Math.max(lit - 6, 0)}%, 0.15);
}

.dark {
${bgDarkDecl}  --nextra-primary-lightness: ${darkL}%;
  --w-accent:      hsl(${darkH} ${darkS}% ${darkL}%);
  --w-accent-soft: hsl(${darkH} ${darkS}% 12%);
  --w-accent-border: color-mix(in srgb, var(--w-accent) 45%, #111111);
  --atlas-accent-glow: hsla(${darkH}, ${darkS}%, ${Math.max(darkL - 4, 0)}%, 0.2);
}
`;
}

// ── Exported buildCss ───────────────────────────────────────────────────────

export function buildCss(config) {
	const theme = config?.theme;
	const accent = resolveAccent(theme, 200, 70, 56);
	const fontFamily = theme?.fontFamily ?? "source-serif";
	const fontCss = FONT_CONFIG[fontFamily]?.cssFamily;

	return COMPONENTS_CSS + "\n" + ATLAS_BASE_CSS + buildOverrides({
		accentHue: accent.hue,
		accentSaturation: accent.saturation,
		accentLightness: accent.lightness,
		darkVariant: accent.dark,
		fontFamily: fontCss,
		backgroundLight: theme?.background?.light,
		backgroundDark: theme?.background?.dark,
	});
}
