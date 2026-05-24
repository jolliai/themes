/**
 * Jollia — shared component styles.
 *
 * Exports a CSS string consumed by css.mjs. All colours and key dimensions
 * are expressed as var(--w-*) references; the per-theme css.mjs supplies
 * values for those tokens in :root and .dark.
 */

const componentsCss = `
/*
 * Shared component styles — used by all themes.
 * All colours are driven by --w-* CSS custom properties defined in each
 * theme's style.css.  Never put hard-coded colour values in this file.
 */

/* ═══════════════════════════════════════════════════════════════════════════
   ARTICLE CONTENT
   ═══════════════════════════════════════════════════════════════════════════ */

article {
  padding: 1rem 2.5rem 5rem !important;
  color: var(--w-text) !important;
}

.nextra-breadcrumb {
  margin-top: 1.5rem !important;
  margin-bottom: 0.375rem !important;
  font-size: 0.75rem !important;
  color: var(--w-text-faint) !important;
  gap: 0.375rem !important;
}
.nextra-breadcrumb span:last-child {
  color: var(--w-accent) !important;
  font-weight: 500 !important;
}

article h1 {
  font-size: 1.75rem !important;
  font-weight: 700 !important;
  letter-spacing: -0.035em !important;
  line-height: 1.2 !important;
  color: var(--w-text-strong) !important;
  margin-top: 0.25rem !important;
  margin-bottom: 0.75rem !important;
}
article h1 + p {
  font-size: 1rem !important;
  color: var(--w-text-soft) !important;
  line-height: 1.65 !important;
  margin-top: 0 !important;
  margin-bottom: 1.5rem !important;
}
article h2 {
  font-size: 1.1875rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.025em !important;
  line-height: 1.3 !important;
  color: var(--w-text-strong) !important;
  margin-top: 2.25rem !important;
  margin-bottom: 0.625rem !important;
  padding-bottom: 0 !important;
  border-bottom: none !important;
}
article h3 {
  font-size: 1rem !important;
  font-weight: 600 !important;
  letter-spacing: -0.015em !important;
  color: var(--w-text-strong) !important;
  margin-top: 1.75rem !important;
  margin-bottom: 0.5rem !important;
}
article h4 {
  font-size: 0.9375rem !important;
  font-weight: 600 !important;
  color: var(--w-text-strong) !important;
  margin-top: 1.25rem !important;
}
article p {
  font-size: 0.9375rem !important;
  line-height: 1.75 !important;
  color: var(--w-text) !important;
}
article a:not(.nextra-card) {
  color: var(--w-accent) !important;
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
  color: var(--w-text) !important;
}
article hr { border-color: var(--w-border) !important; margin: 2rem 0 !important; }
article strong { color: var(--w-text-strong) !important; font-weight: 600 !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   TABLES
   ═══════════════════════════════════════════════════════════════════════════ */

article table {
  width: 100% !important;
  font-size: 0.875rem !important;
  border-collapse: collapse !important;
  border-spacing: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  overflow: visible !important;
  display: table !important;
  margin: 1.5rem 0 !important;
}

article table,
article table thead,
article table tbody,
article table tr {
  border-top: none !important;
  border-bottom: none !important;
}
article table th,
article table td {
  border: none !important;
}

article thead tr {
  background: none !important;
}
article thead tr th {
  color: var(--w-text-soft) !important;
  font-size: 0.8125rem !important;
  font-weight: 600 !important;
  padding: 0.5rem 0.875rem !important;
  text-align: left !important;
  background: none !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  border-bottom: 1px solid var(--w-border) !important;
}
article tbody tr {
  background: none !important;
}
article tbody tr td {
  padding: 0.5rem 0.875rem !important;
  color: var(--w-text) !important;
  border-bottom: 1px solid var(--w-border-soft) !important;
  vertical-align: top !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
}
article tbody tr:last-child td { border-bottom: none !important; }
article tbody tr:hover td { background: var(--w-hover-bg) !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE CODE
   ═══════════════════════════════════════════════════════════════════════════ */

article code:not(pre code) {
  font-size: 0.8125em !important;
  font-weight: 500 !important;
  color: var(--w-inline-code-color) !important;
  background: var(--w-inline-code-bg) !important;
  border: 1px solid var(--w-inline-code-border) !important;
  border-radius: 0.3rem !important;
  padding: 0.1em 0.4em !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CODE BLOCKS
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-code {
  margin: 1.25rem 0 !important;
}

.nextra-code pre, article pre {
  font-size: 0.8125rem !important;
  line-height: 1.7 !important;
  border-radius: 0.625rem !important;
  border: 1px solid var(--w-border) !important;
  padding: 0 1rem !important;
  background: var(--w-code-bg) !important;
  overflow-x: auto;
  box-shadow: var(--w-code-shadow) !important;
}

/* Filename header bar — top half of the code card */
.nextra-code > div:first-child {
  background: var(--w-filename-header-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-bottom: none !important;
  border-radius: 0.625rem 0.625rem 0 0 !important;
  color: var(--w-text-soft) !important;
}

/* Pre immediately after a filename header — bottom half, connected */
.nextra-code > div + pre {
  border-radius: 0 0 0.625rem 0.625rem !important;
  border-top: none !important;
  box-shadow: none !important;
}

/* Copy + word-wrap buttons — consistent size wherever they appear */
.nextra-code button[title="Copy code"],
.nextra-code button[title="Toggle word wrap"] {
  background: var(--w-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.375rem !important;
  padding: 0.3125rem !important;
  color: var(--w-text-soft) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 1.75rem !important;
  height: 1.75rem !important;
  flex-shrink: 0 !important;
  transition: background 0.12s, color 0.12s, border-color 0.12s !important;
}
.nextra-code button[title="Copy code"]:hover,
.nextra-code button[title="Toggle word wrap"]:hover {
  background: var(--w-border-soft) !important;
  border-color: var(--w-accent-border) !important;
  color: var(--w-text-strong) !important;
}
.dark .nextra-code button[title="Copy code"],
.dark .nextra-code button[title="Toggle word wrap"] {
  background: var(--w-border-soft) !important;
  border-color: var(--w-border) !important;
}
.dark .nextra-code button[title="Copy code"]:hover,
.dark .nextra-code button[title="Toggle word wrap"]:hover {
  background: var(--w-hover-bg) !important;
  color: var(--w-text-strong) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CALLOUTS
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-callout > div:first-child {
  padding-left: 0 !important;
  padding-right: 0.5rem !important;
}

.nextra-callout {
  margin: 1.25rem 0 !important;
  padding: 0.75rem 1rem !important;
  align-items: flex-start !important;
  font-size: 0.875rem !important;
  line-height: 1.6 !important;
  /* Left accent bar only — color comes from Nextra's type-specific text class */
  border: none !important;
  border-left: 2px solid color-mix(in srgb, currentColor 60%, transparent) !important;
  border-right: 2px solid color-mix(in srgb, currentColor 60%, transparent) !important;
  border-radius: 0.625rem !important;
  /* Subtle tint derived from the accent color, works for all types + dark mode */
  background-color: color-mix(in srgb, currentColor 8%, transparent) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CARDS
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-cards { gap: 0.75rem !important; margin-top: 1.25rem !important; }
.nextra-cards a.nextra-card { margin: 0 !important; }

/* Fixed-track grid capped at 3 columns. Nextra always sets --rows from the
   num prop (default 3), and we honor it: cards always land in their declared
   column slot. 2 cards with num={3} occupy the first two of three tracks,
   leaving the third empty. min(--rows, 3) caps higher values. */
.nextra-cards {
  grid-template-columns: repeat(min(var(--rows, 3), 3), minmax(0, 1fr)) !important;
}

a.nextra-card {
  margin: 1rem 0 !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.625rem !important;
  background: var(--w-card-bg) !important;
  box-shadow: none !important;
  padding: 0 !important;
  overflow: hidden !important;
  transition: border-color 0.15s, box-shadow 0.15s !important;
  display: flex !important;
  /* Nextra renders <Card> as <a>{children}{titleSpan}</a> — title comes last
     in the DOM. Reverse so the title sits visually at the top of the card.
     justify-content: flex-end packs items at the main-end (= top in reversed
     direction) so the grid's stretched extra height lands at the BOTTOM,
     keeping the title in the same vertical position across uneven cards. */
  flex-direction: column-reverse !important;
  justify-content: flex-end !important;
  text-decoration: none !important;
}

a.nextra-card:hover {
  border-color: var(--w-accent-border) !important;
  box-shadow: 0 0 0 3px var(--w-accent-soft) !important;
  background: var(--w-card-bg) !important;
}

a.nextra-card > span {
  padding: 1rem 1.125rem 0.875rem !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 0.5rem !important;
}
a.nextra-card > span > span {
  font-size: 0.9rem !important;
  font-weight: 600 !important;
  color: var(--w-text-strong) !important;
  letter-spacing: -0.01em !important;
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: unset !important;
  flex: 1 !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.3em !important;
}

/* Card description (children passed to <Card>) — align horizontal padding
   with the title row above. Typography inherits from article p so card
   descriptions read the same as body copy elsewhere in the theme. */
a.nextra-card > p {
  margin: 0 !important;
  padding: 0 1.125rem 1rem !important;
}
a.nextra-card[href^="http"] > span > span::after {
  content: '↗';
  font-size: 0.8em;
  line-height: 1;
  color: var(--w-text-faint);
  transition: color 0.15s;
  font-weight: 400;
  flex-shrink: 0;
}
a.nextra-card[href^="http"]:hover > span > span::after { color: var(--w-accent); }

/* ═══════════════════════════════════════════════════════════════════════════
   TABS
   ═══════════════════════════════════════════════════════════════════════════ */

/* Outer wrapper — spacing only; visual card is split across tablist + panels */
/* Exclude .nextra-steps: Tabs renders as a Fragment so its tablist becomes a
   direct child of .nextra-steps, which would otherwise match this selector and
   strip the ps-6 padding that keeps the connecting line visible. */
div:has(> [role="tablist"]):not(.nextra-steps) {
  margin: 1.25rem 0 !important;
  padding: 0 !important;
}

/* Tab header bar — top half of the card */
[role="tablist"] {
  display: flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
  padding: 0.4375rem 0.5rem !important;
  background: var(--w-accent-soft) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.625rem 0.625rem 0 0 !important;
  overflow-x: auto !important;
  margin: 0 !important;
}
/* TabGroup renders as Fragment so there's no wrapper div — apply top
   spacing directly on the tablist to match .nextra-code margin-top.
   Inside .nextra-steps the tablist also becomes a direct child of the
   steps container; it needs the same margin so it doesn't crash into the
   step's preceding text. */
:not(.nextra-steps) > [role="tablist"],
.nextra-steps > [role="tablist"] {
  margin-top: 1.25rem !important;
}

/* Panels wrapper — bottom half of the card */
[role="tablist"] + div {
  border: 1px solid var(--w-border) !important;
  border-top: none !important;
  border-radius: 0 0 0.625rem 0.625rem !important;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Individual tab button */
[role="tab"] {
  padding: 0.25rem 0.75rem !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  font-family: inherit !important;
  color: var(--w-text-soft) !important;
  border-radius: 0.375rem !important;
  border: none !important;
  background: none !important;
  cursor: pointer !important;
  transition: color 0.12s, background 0.12s !important;
  white-space: nowrap !important;
  line-height: 1.5 !important;
}
[role="tab"]:hover {
  color: var(--w-text-strong) !important;
  background: var(--w-hover-bg) !important;
}
[role="tab"][aria-selected="true"] {
  background: var(--w-bg) !important;
  color: var(--w-accent) !important;
  font-weight: 600 !important;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06) !important;
}
.dark [role="tab"][aria-selected="true"] {
  background: var(--w-bg) !important;
  box-shadow: none !important;
}
[role="tab"][aria-disabled="true"] {
  color: var(--w-text-faint) !important;
  pointer-events: none !important;
}

/* Panel — no padding by default */
[role="tabpanel"] {
  margin: 0 !important;
  padding: 0 !important;
}
/* Nextra injects a hidden h3 anchor as the first child of each panel.
   It has height:0 via inline style but inherits our article h3 margin,
   which is what creates the ~29px gap at the top of the panel. */
[role="tabpanel"] > h3 {
  margin: 0 !important;
}

/* Mixed-content panels (text, callouts, etc.) get container padding so
   content has breathing room; code blocks inside render as normal blocks. */
[role="tabpanel"]:not(:has(> h3 + .nextra-code:last-child)) {
  padding: 1rem 1.25rem !important;
}

/* Code-only panels: single code block is flush — no double border */
[role="tabpanel"]:has(> h3 + .nextra-code:last-child) .nextra-code {
  margin: 0 !important;
}
[role="tabpanel"]:has(> h3 + .nextra-code:last-child) .nextra-code > div:first-child {
  border-radius: 0 !important;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
}
[role="tabpanel"]:has(> h3 + .nextra-code:last-child) .nextra-code pre {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  margin: 0 !important;
  padding: 1rem !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   MERMAID DIAGRAMS
   ═══════════════════════════════════════════════════════════════════════════ */

/* <Mermaid> renders as a plain div > svg with no class. Targeting as a
   direct child of article avoids matching icon SVGs nested inside callouts. */
article > div:has(> svg) {
  margin: 1.25rem 0 !important;
  overflow-x: auto !important;
  text-align: center !important;
}
article > div:has(> svg) svg {
  max-width: 100% !important;
  height: auto !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DETAILS / SUMMARY
   ═══════════════════════════════════════════════════════════════════════════ */

details {
  margin: 1.25rem 0 !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.625rem !important;
  background: var(--w-card-bg) !important;
  box-shadow: none !important;
  padding: 0 !important;
  overflow: hidden !important;
}

details summary {
  display: flex !important;
  align-items: center !important;
  cursor: pointer !important;
  padding: 0.75rem 0.875rem !important;
  list-style: none !important;
  user-select: none !important;
  border-radius: 0 !important;
  transition: background 0.12s !important;
}
details summary::-webkit-details-marker { display: none !important; }
details summary:hover { background: var(--w-hover-bg) !important; }

/* Separator between header and content when open */
details[data-expanded] summary {
  border-bottom: 1px solid var(--w-border-soft) !important;
}

/* Title text — reset the article h3 margins that bleed in here */
details summary h3 {
  font-size: 0.9375rem !important;
  font-weight: 600 !important;
  color: var(--w-text-strong) !important;
  letter-spacing: -0.015em !important;
  line-height: 1.5 !important;
  margin: 0 !important;
  padding: 0 0.25rem !important;
}

/* Arrow icon */
details summary > svg { color: var(--w-text-soft) !important; flex-shrink: 0 !important; }

/* Permalink icon link */
details summary a { color: var(--w-text-faint) !important; }
details summary a:hover { background: var(--w-hover-bg) !important; color: var(--w-text-soft) !important; }

/* Content area — padding lives on the inner div inside the Collapse grid wrapper.
   Cannot pad the grid wrapper itself: it animates to height 0 when closed, but
   padding on the grid container would still render and peek through. */
details > div > div {
  padding: 0.875rem 1rem !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FILE TREE
   ═══════════════════════════════════════════════════════════════════════════ */

.nextra-filetree {
  margin: 1.25rem 0 !important;
  font-size: 0.875rem !important;
  line-height: 1.6 !important;
  color: var(--w-text) !important;
  background: var(--w-card-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.625rem !important;
  padding: 0.875rem 1rem !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.375rem !important;
  width: 100% !important;
}

/* File and folder items */
.nextra-filetree li {
  color: var(--w-text) !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
}

/* Folder item wraps button + nested ul */
.nextra-filetree li:has(> button) {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0.375rem !important;
}

/* Folder toggle button */
.nextra-filetree button {
  display: flex !important;
  align-items: center !important;
  gap: 0.25rem !important;
  font-size: inherit !important;
  color: var(--w-text) !important;
  background: none !important;
  border: none !important;
  padding: 0 !important;
  cursor: pointer !important;
  text-align: start !important;
  transition: opacity 0.12s !important;
}
.nextra-filetree button:hover { opacity: 0.6 !important; }

/* Icons */
.nextra-filetree svg { color: var(--w-text-soft) !important; flex-shrink: 0 !important; }

/* Nested folder children */
.nextra-filetree ul {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.375rem !important;
  padding-inline-start: 1.125rem !important;
}

/* Active file/folder — colour driven by --nextra-primary-* but we pin it
   explicitly so it stays in sync with --w-accent regardless of hue tokens */
.nextra-filetree [class*="text-primary"] { color: var(--w-accent) !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   STEPS
   ═══════════════════════════════════════════════════════════════════════════ */

/* The circle ::before is 33px tall. Our article h3 override sets font-size: 1rem
   which is smaller than Nextra's default text-2xl. Setting line-height to match
   the circle height vertically centers the step title text on the circle. */
.nextra-steps h3 {
  line-height: 33px !important;
}

/* Shrink the step number itself — Nextra's default text-base (1rem) reads
   visually heavy inside the 33px circle next to the smaller h3 title.
   Nextra's defaults rely on font-size 1rem × line-height 1.5 = 24px to
   nearly fill the 25px inner-circle area, which is what makes the digit
   read as centered at the original size. Shrinking the font without
   touching line-height collapses the line-box to ~19.5px, pinning it to
   the top of the 25px area and pushing the glyph off-center. Pin
   line-height to 25px (the inner-circle height with 4px border × 2) so
   the line-box matches the inner area at any font size. Zero the
   text-indent: Nextra's -1px optical nudge is calibrated for 1rem
   glyphs and skews smaller text horizontally. */
.nextra-steps h3::before {
  font-size: 0.8125rem !important;
  line-height: 25px !important;
  text-indent: 0 !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BLEED
   ═══════════════════════════════════════════════════════════════════════════ */

/* Override Nextra's default -mx-4 / md:-mx-8 / 2xl:-mx-24 to match our
   article's 2.5rem horizontal padding so bleed content truly reaches the edge. */
.nextra-bleed {
  margin-left: -2.5rem !important;
  margin-right: -2.5rem !important;
  margin-top: 1.25rem !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   COPY PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

/* Outer wrapper — matches card border/radius language */
article > div.nextra-border {
  border: 1px solid var(--w-border) !important;
  border-radius: 0.625rem !important;
  background: var(--w-bg) !important;
  overflow: hidden !important;
}

/* All buttons (copy + dropdown trigger) */
article > div.nextra-border button {
  font-family: inherit !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  color: var(--w-text-soft) !important;
  background: none !important;
  border-radius: 0 !important;
  padding: 0.375rem 0.75rem !important;
  height: auto !important;
  transition: background 0.12s, color 0.12s !important;
}
article > div.nextra-border button:hover {
  background: var(--w-hover-bg) !important;
  color: var(--w-text-strong) !important;
}

/* Separator before the dropdown section — handles both direct button
   sibling and HeadlessUI div wrapper cases */
article > div.nextra-border > button + * {
  border-left: 1px solid var(--w-border) !important;
}

/* On mobile, collapse the copy-page widget to just its dropdown
   trigger. The main "Copy page" button (icon + label) is the first
   <button> child; the dropdown trigger is the one with
   aria-haspopup="listbox". Hiding the first removes the bulky
   labeled button and the separator that sat between them
   (border-left on the next sibling), leaving a compact icon-only
   dropdown. */
@media (max-width: 767px) {
  article > div.nextra-border > button:not([aria-haspopup]) {
    display: none !important;
  }
  article > div.nextra-border > button + * {
    border-left: none !important;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PREV/NEXT PAGINATION
   ═══════════════════════════════════════════════════════════════════════════ */

/* Wrapper — top separator only; cards handle their own borders */
article > div.nextra-border:has(> a) {
  border: none !important;
  border-top: 1px solid var(--w-border) !important;
  background: none !important;
  padding: 1.5rem 0 0 !important;
  gap: 0.75rem !important;
  align-items: stretch !important;
}

/* Each prev/next link as a card */
article > div.nextra-border:has(> a) > a {
  border: 1px solid var(--w-border) !important;
  border-radius: 0.625rem !important;
  background: var(--w-card-bg) !important;
  padding: 0.875rem 1.125rem !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: var(--w-text-soft) !important;
  text-decoration: none !important;
  flex: 1 !important;
  gap: 0.5rem !important;
  transition: border-color 0.15s, box-shadow 0.15s, color 0.15s !important;
}
/* Right-align the Next link only. Nextra tags it with the "ms-auto" utility
   class (the Previous link has no such class) — using :last-child would
   incorrectly right-align a lone Previous on the final article. */
article > div.nextra-border:has(> a) > a[class*="ms-auto"] {
  justify-content: flex-end !important;
  text-align: end !important;
}

article > div.nextra-border:has(> a) > a:hover {
  border-color: var(--w-accent-border) !important;
  color: var(--w-text-strong) !important;
  background: var(--w-card-bg) !important;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */

article > div[class*="text-end"] { font-size: 0.75rem !important; color: var(--w-text-faint) !important; }

body > div:has(> footer) { background: var(--w-bg) !important; }

footer {
  font-size: 0.8125rem !important;
  color: var(--w-text-faint) !important;
  padding-top: 2.5rem !important;
  padding-bottom: 2.5rem !important;
}

/* Override Nextra's x:flex row layout so columns section sits above the bar.
   Needs element+class specificity (0,1,1) to beat .x:flex (0,1,0). */
footer.forge-footer {
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  padding: 0 2.5rem 2.5rem !important;
  max-width: 100% !important;
  margin: 0 !important;
}

/* Nextra renders an <hr> above the <footer> — hide it since our border-top replaces it */
div:has(> footer.forge-footer) > hr { display: none !important; }


/* With-columns layout: brand on left, nav columns on right */
.w-footer-with-cols {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  align-items: flex-start;
  padding: 3rem 1rem 2.5rem;
  border-top: 1px solid var(--w-border);
}

/* Brand column: copyright stacked above social icons */
.w-footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 180px;
  flex-shrink: 0;
}

/* Nav columns grid — flex: 1 so it fills remaining width */
.w-footer-columns {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 2rem 1.5rem;
  flex: 1;
  min-width: 0;
}

/* No-columns case: bar is first child and needs the top separator */
footer.forge-footer > .w-footer-bar:first-child {
  border-top: 1px solid var(--w-border);
  padding-top: 2rem;
}

.w-footer-col-title {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.06em !important;
  color: var(--w-text-strong) !important;
  margin: 0 0 0.75rem !important;
}

.w-footer-col ul {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.5rem !important;
}

.w-footer-col ul li a {
  color: var(--w-text-soft) !important;
  text-decoration: none !important;
  font-size: 0.8125rem !important;
  transition: color 0.12s !important;
}

.w-footer-col ul li a:hover {
  color: var(--w-text-strong) !important;
}

/* Bottom bar — copyright on the left, social icons on the right */
.w-footer-bar {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: 1rem !important;
  flex-wrap: wrap !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

.w-footer-copy {
  color: var(--w-text-faint);
  font-size: 0.8125rem;
}

.w-footer-social {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.w-footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--w-text-faint);
  text-decoration: none !important;
  transition: color 0.12s;
}

.w-footer-social-link:hover {
  color: var(--w-text-strong);
}

.w-footer-bar-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}

.w-footer-powered {
  font-size: 0.8125rem;
  color: var(--w-text-faint);
  text-decoration: none !important;
  transition: color 0.12s;
  white-space: nowrap;
}

/* When rendered as a direct child of the footer (columns layout), pin to bottom-right */
footer.forge-footer > .w-footer-powered {
  display: block;
  align-self: flex-end;
  margin-top: 1rem;
  padding-right: 1rem;
}
.w-footer-powered:hover { color: var(--w-text-soft); }

.nextra-border { border-color: var(--w-border) !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   API REFERENCE PAGES — overrides for pages rendered by the built site's
   custom API components (see components/api/* in the built site). These
   classes are not part of Nextra; they're emitted by Endpoint / CodeSwitcher
   / ResponseBlock. Themed here with --w-* tokens so the API surface tracks
   the same visual language as the rest of the theme's components.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Hide the "copy page" / dropdown UI on API reference pages. Nextra renders
   it as <article> > <div.nextra-border> with buttons inside; the prev/next
   pagination is a sibling .nextra-border that contains anchors instead, so
   :not(:has(> a)) leaves pagination alone. */
article:has(.api-endpoint-grid) > div.nextra-border:not(:has(> a)) {
  display: none !important;
}

/* Outer wrapper for REQUEST / RESPONSE switchers and response blocks —
   matches .nextra-code's envelope (0.625rem radius, --w-border, code-bg). */
.api-code-switcher,
.api-response-block {
  border: 1px solid var(--w-border) !important;
  border-radius: 0.625rem !important;
  background: var(--w-code-bg) !important;
  box-shadow: var(--w-code-shadow) !important;
  margin: 1.25rem 0 !important;
  overflow: hidden !important;
}

/* Inside the Endpoint aside column, the parent is a flex container, so
   margin-collapse doesn't apply and our 1.25rem block margins would stack
   with the parent's gap. Zero the block margins and bump the parent's gap
   to 1.25rem so REQUEST → RESPONSE spacing matches the rhythm code blocks
   use everywhere else in the theme. */
.api-endpoint-aside {
  gap: 1.25rem !important;
}
.api-endpoint-aside .api-code-switcher,
.api-endpoint-aside .api-response-block {
  margin: 0 !important;
}

/* Layout on API endpoint pages.

   Desktop (>= 1280px): the main grid (css.mjs) places the article in col 3
   (920px) and the TOC in col 4 (252px). We expand the article to span both
   columns and hide the TOC, then size the endpoint-grid so its main column
   measures exactly 840px (920px article column − 2.5rem padding each side).
   That puts .api-endpoint-main at the same horizontal coordinates as the
   article content on a non-API page, and the request/response aside ends up
   in the slot the TOC used to occupy.

   Below 1280px: the article moves back to a single layout column with no
   room for a side-by-side aside that would also align with the standard
   footer width. Stack the endpoint grid into a single column so the main
   content fills the full article content area, and the request/response
   aside flows beneath it. That way prev/next, the "Last updated" line, and
   the page footer all align with the main content automatically. */

@media (min-width: 1280px) {
  body:has(article .api-endpoint-grid) nav.nextra-toc {
    display: none !important;
  }
  article:has(.api-endpoint-grid) {
    grid-column: 3 / span 2 !important;
    max-width: none !important;
  }
  .api-endpoint-grid {
    grid-template-columns: 840px minmax(0, 1fr) !important;
  }
}

@media (max-width: 1279px) {
  .api-endpoint-grid {
    grid-template-columns: minmax(0, 1fr) !important;
  }
  /* Aside loses its sticky positioning when stacked so it doesn't pin
     awkwardly while scrolling past the main content. */
  .api-endpoint-aside {
    position: static !important;
  }
}

/* Cap prev/next pagination and the "Last updated" line to the 840px main
   column width so they align under .api-endpoint-main rather than stretching
   across the full (article + aside) content area. Only kicks in on desktop;
   below 1280px the article doesn't span col 3+4 so the cap isn't needed. */
@media (min-width: 1280px) {
  article:has(.api-endpoint-grid) > div.nextra-border:has(> a),
  article:has(.api-endpoint-grid) > div[class*="text-end"] {
    width: 840px !important;
    max-width: 840px !important;
    box-sizing: border-box !important;
  }
}

/* The built site's styles/api.css does TWO things on API pages that the
   footer wrapper doesn't see by default:
     1. Spans the article across grid-column 2 / -1 of the wrapper grid
        (instead of col 3), and
     2. Caps it with \`max-width: 1400px; margin: 0 auto; padding: 0 2.25rem\`,
        so the article slides toward the centre of the viewport as the
        window widens.
   The footer lives in a *separate* body-level wrapper that also uses the
   5-col grid (from css.mjs) but still anchors the footer in col 3. At
   narrow widths cols 2/5 are tiny so the drift is invisible; once 1fr
   exceeds the article's max-width, the article centre-shifts while the
   footer stays anchored — that's the "slides off to the side at larger
   widths" the user is hitting.

   Fix: mirror api.css's article positioning on the footer (span 2/-1, cap
   to 1400, centre, same 2.25rem horizontal padding) then constrain the
   footer's inner blocks to the 840px main column width so they stack
   directly under .api-endpoint-main. */
@media (min-width: 768px) {
  body:has(article .api-endpoint-grid) > div:has(> footer) > footer.forge-footer {
    grid-column: 2 / -1 !important;
    max-width: 1400px !important;
    width: 100% !important;
    margin: 0 auto !important;
    padding-left: 2.25rem !important;
    padding-right: 2.25rem !important;
  }
  body:has(article .api-endpoint-grid) > div:has(> footer) > footer.forge-footer > * {
    max-width: 840px !important;
    width: 100% !important;
    margin-left: 0 !important;
    margin-right: auto !important;
    align-self: flex-start !important;
  }
}

/* Header strip — matches the filename header above a .nextra-code block:
   same 3rem height, 1rem horizontal padding, and 0.5rem gap that Nextra
   applies via x:h-12 x:px-4 x:gap-2 utility classes. */
.api-code-switcher-toolbar,
.api-response-header {
  background: var(--w-filename-header-bg) !important;
  border-bottom: 1px solid var(--w-border) !important;
  color: var(--w-text-soft) !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
  height: 3rem !important;
  padding: 0 1rem !important;
}

.api-code-switcher-label {
  color: var(--w-text-soft) !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
}

/* Language-select dropdown — chip-style text control. */
.api-code-switcher-select {
  background: var(--w-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.375rem !important;
  color: var(--w-text-soft) !important;
  font-family: inherit !important;
  font-size: 0.75rem !important;
  padding: 0.25rem 0.5rem !important;
  transition: background 0.12s, color 0.12s, border-color 0.12s !important;
}
.api-code-switcher-select:hover,
.api-code-switcher-select:focus {
  background: var(--w-border-soft) !important;
  border-color: var(--w-accent-border) !important;
  color: var(--w-text-strong) !important;
  outline: none !important;
}
.dark .api-code-switcher-select {
  background: var(--w-border-soft) !important;
}

/* Copy button — same 1.75rem icon-square as .nextra-code's copy button.
   The CodeSwitcher component renders the button with "Copy"/"Copied"
   text instead of an icon, so we suppress the text (font-size: 0) and
   inject Nextra's own clipboard SVG via mask-image; background-color
   then colors it through --w-text-soft (and --w-accent when copied).
   Same approach swaps to the check SVG in the data-copied="true" state. */
.api-code-switcher-copy {
  position: relative !important;
  width: 1.75rem !important;
  height: 1.75rem !important;
  padding: 0 !important;
  background: var(--w-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.375rem !important;
  font-size: 0 !important;
  line-height: 0 !important;
  color: var(--w-text-soft) !important;
  flex-shrink: 0 !important;
  cursor: pointer !important;
  transition: background 0.12s, color 0.12s, border-color 0.12s !important;
}
/* Icon is absolutely positioned + margin:auto centered, so the leftover
   "Copy"/"Copied" text node from the React component can't shift it. */
.api-code-switcher-copy::before {
  content: '' !important;
  position: absolute !important;
  inset: 0 !important;
  margin: auto !important;
  width: 1rem !important;
  height: 1rem !important;
  background-color: currentColor !important;
  mask-repeat: no-repeat !important;
  -webkit-mask-repeat: no-repeat !important;
  mask-position: center !important;
  -webkit-mask-position: center !important;
  mask-size: contain !important;
  -webkit-mask-size: contain !important;
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'><rect x='9' y='9' width='13' height='13' rx='2'/><path d='M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5'/></svg>") !important;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'><rect x='9' y='9' width='13' height='13' rx='2'/><path d='M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5'/></svg>") !important;
}
.api-code-switcher-copy:hover {
  background: var(--w-border-soft) !important;
  border-color: var(--w-accent-border) !important;
  color: var(--w-text-strong) !important;
}
.api-code-switcher-copy[data-copied="true"] {
  color: var(--w-accent) !important;
  border-color: var(--w-accent-border) !important;
}
.api-code-switcher-copy[data-copied="true"]::before {
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23000'><path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'/></svg>") !important;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23000'><path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'/></svg>") !important;
}
.dark .api-code-switcher-copy {
  background: var(--w-border-soft) !important;
}

/* Response-block extras. */
.api-response-status {
  color: var(--w-text-strong) !important;
}
.api-response-contenttype {
  background: var(--w-bg) !important;
  border: 1px solid var(--w-border) !important;
  color: var(--w-text-soft) !important;
}

/* Inner code block inside the switcher/response body. The outer wrapper
   already provides the border, radius, shadow, and background, so the
   inner .nextra-code wrapper and inner pre must be fully squared and
   frameless. Our .nextra-code pre rule earlier in this file otherwise
   re-applies the rounded corners and border with !important, creating
   the visible "rounded card inside a rounded card" doubling. */
.api-code-switcher-body .nextra-code,
.api-response-block .nextra-code {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
}

/* Inner pre — squared, frameless, and padded to match a regular code block.
   Horizontal matches the standard .nextra-code pre (1rem); vertical adds
   modest breathing room so single-line snippets (a typical curl request)
   don't look crammed against the toolbar above. */
.api-code-switcher-body .nextra-code pre,
.api-code-switcher-body > pre,
.api-response-block .nextra-code pre,
.api-response-block > pre {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  margin: 0 !important;
  padding: 1rem !important;
  background: transparent !important;
}

/* ─── Content section ─────────────────────────────────────────────────────
   Everything inside .api-endpoint-main: title meta strip, the "Try it"
   card, auth notice, parameter tables, schema trees, and response status
   pills. The neighbouring .nextra-code / .api-response-block envelopes set
   the visual vocabulary (1px --w-border, 0.625rem radius, --w-card-bg
   fill, --w-code-shadow); these rules tune the in-flow content elements
   to match that language.
   ─────────────────────────────────────────────────────────────────────── */

/* Method + path strip immediately under the H1. */
.api-endpoint-meta {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 0.625rem !important;
  margin: -0.5rem 0 1.75rem !important;
}

/* HTTP method pill — uppercase mono badge. Per-method hues stay separate
   from --w-accent so the badge reads as a verb, not a brand element. */
.api-method {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0.1875rem 0.5rem !important;
  border-radius: 0.3125rem !important;
  font-family: var(--w-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace) !important;
  font-size: 0.6875rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.04em !important;
  line-height: 1.4 !important;
  text-transform: uppercase !important;
  border: 1px solid currentColor !important;
}

.api-method-get    { color: #047857 !important; background: color-mix(in srgb, #10b981 12%, var(--w-bg)) !important; border-color: color-mix(in srgb, #10b981 35%, var(--w-bg)) !important; }
.api-method-post   { color: #1d4ed8 !important; background: color-mix(in srgb, #3b82f6 12%, var(--w-bg)) !important; border-color: color-mix(in srgb, #3b82f6 35%, var(--w-bg)) !important; }
.api-method-put    { color: #b45309 !important; background: color-mix(in srgb, #f59e0b 14%, var(--w-bg)) !important; border-color: color-mix(in srgb, #f59e0b 35%, var(--w-bg)) !important; }
.api-method-patch  { color: #6d28d9 !important; background: color-mix(in srgb, #8b5cf6 12%, var(--w-bg)) !important; border-color: color-mix(in srgb, #8b5cf6 35%, var(--w-bg)) !important; }
.api-method-delete { color: #b91c1c !important; background: color-mix(in srgb, #ef4444 12%, var(--w-bg)) !important; border-color: color-mix(in srgb, #ef4444 35%, var(--w-bg)) !important; }

.dark .api-method-get    { color: #34d399 !important; background: color-mix(in srgb, #10b981 18%, var(--w-bg)) !important; border-color: color-mix(in srgb, #10b981 40%, var(--w-bg)) !important; }
.dark .api-method-post   { color: #60a5fa !important; background: color-mix(in srgb, #3b82f6 18%, var(--w-bg)) !important; border-color: color-mix(in srgb, #3b82f6 40%, var(--w-bg)) !important; }
.dark .api-method-put    { color: #fbbf24 !important; background: color-mix(in srgb, #f59e0b 18%, var(--w-bg)) !important; border-color: color-mix(in srgb, #f59e0b 40%, var(--w-bg)) !important; }
.dark .api-method-patch  { color: #c4b5fd !important; background: color-mix(in srgb, #8b5cf6 18%, var(--w-bg)) !important; border-color: color-mix(in srgb, #8b5cf6 40%, var(--w-bg)) !important; }
.dark .api-method-delete { color: #fca5a5 !important; background: color-mix(in srgb, #ef4444 18%, var(--w-bg)) !important; border-color: color-mix(in srgb, #ef4444 40%, var(--w-bg)) !important; }

/* Endpoint URL — bordered chip with the same code envelope (border + radius
   + bg) as a small nextra-code block. Scoped overrides on \`code\` because
   the generic \`article code:not(pre code)\` rule earlier in this file
   would otherwise paint it with the accent-tinted inline-code chip. */
.api-endpoint-path,
.api-tryit-path {
  font-family: var(--w-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace) !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  color: var(--w-text) !important;
  background: var(--w-code-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.375rem !important;
  padding: 0.1875rem 0.5rem !important;
}

/* Resource tag (e.g. "items") — small muted uppercase lozenge. */
.api-endpoint-tag {
  font-size: 0.6875rem !important;
  font-weight: 500 !important;
  color: var(--w-text-soft) !important;
  background: var(--w-border-soft) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.3125rem !important;
  padding: 0.1875rem 0.5rem !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
}

/* "Try it" card — card envelope matching .api-response-block. */
.api-tryit {
  display: flex !important;
  flex-direction: column !important;
  gap: 1rem !important;
  margin: 1.25rem 0 !important;
  padding: 1.25rem !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.625rem !important;
  background: var(--w-card-bg) !important;
  box-shadow: var(--w-code-shadow) !important;
}

.api-tryit-header {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 0.625rem !important;
}

.api-tryit-field {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.375rem !important;
}

.api-tryit-label {
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  color: var(--w-text-soft) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
}

/* Hint span inside the label ("path, required") — lowercase, faint. */
.api-tryit-hint {
  font-weight: 400 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  color: var(--w-text-faint) !important;
  margin-left: 0.25rem !important;
}

.api-tryit-input {
  font: inherit !important;
  font-size: 0.875rem !important;
  color: var(--w-text) !important;
  background: var(--w-bg) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.375rem !important;
  padding: 0.5rem 0.625rem !important;
  width: 100% !important;
  transition: border-color 0.12s, box-shadow 0.12s !important;
}
.api-tryit-input:hover  { border-color: var(--w-accent-border) !important; }
.api-tryit-input:focus  {
  outline: none !important;
  border-color: var(--w-accent) !important;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--w-accent) 18%, transparent) !important;
}

/* Parameters fieldset — strip the native border and reuse it as a labelled
   section that matches the rest of the try-it layout. */
.api-tryit-section {
  display: flex !important;
  flex-direction: column !important;
  gap: 0.75rem !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
}
.api-tryit-section > legend {
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  color: var(--w-text-soft) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  padding: 0 !important;
  margin: 0 0 0.25rem !important;
}

/* Send-request CTA — uses the brand accent so it reads as the primary
   action in the card. */
.api-tryit-send {
  align-self: flex-start !important;
  font: inherit !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  color: #ffffff !important;
  background: var(--w-accent) !important;
  border: 1px solid var(--w-accent) !important;
  border-radius: 0.375rem !important;
  padding: 0.5rem 1rem !important;
  cursor: pointer !important;
  transition: filter 0.12s !important;
}
.api-tryit-send:hover  { filter: brightness(1.08) !important; }
.api-tryit-send:active { filter: brightness(0.95) !important; }

/* "No authentication required" — soft body copy, not a callout. */
.api-auth-none {
  font-size: 0.875rem !important;
  color: var(--w-text-soft) !important;
  margin: 0.5rem 0 1.5rem !important;
}

/* Parameters / Response sub-sections — small uppercase title above a
   table, matching the chip-label convention used elsewhere. */
.api-param-section {
  margin: 1rem 0 1.5rem !important;
}
.api-param-section-title {
  font-size: 0.6875rem !important;
  font-weight: 600 !important;
  color: var(--w-text-soft) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  margin: 0 0 0.25rem !important;
}
.api-param-table { margin: 0.25rem 0 0 !important; }

/* Schema tree — sits flush under the .api-response-header inside the
   shared .api-response-block envelope, the same way a .nextra-code
   block sits flush under its filename-header strip. No own border /
   radius / top margin: the outer .api-response-block already provides
   the bordered + rounded card, and the header's border-bottom is the
   only divider needed. */
.api-schema-block {
  background: var(--w-card-bg) !important;
  padding: 0.5rem 1rem !important;
  margin: 0 !important;
  border: none !important;
  border-radius: 0 !important;
}
.api-schema-root,
.api-schema-children {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
}
.api-schema-row {
  padding: 0.5rem 0 !important;
  border-bottom: 1px solid var(--w-border-soft) !important;
}
.api-schema-row:last-child { border-bottom: none !important; }

.api-schema-row-head {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  gap: 0.5rem !important;
}

.api-schema-toggle {
  width: 1.125rem !important;
  height: 1.125rem !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 0.75rem !important;
  line-height: 1 !important;
  color: var(--w-text-soft) !important;
  background: var(--w-border-soft) !important;
  border: 1px solid var(--w-border) !important;
  border-radius: 0.25rem !important;
  cursor: pointer !important;
}
.api-schema-toggle:hover { color: var(--w-text-strong) !important; }

/* Property name — mono, unstyled (no inline-code chip even though the DOM
   element is a <code>). */
.api-schema-name {
  font-family: var(--w-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace) !important;
  font-size: 0.8125rem !important;
  font-weight: 500 !important;
  color: var(--w-text-strong) !important;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}

.api-schema-type {
  font-family: var(--w-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace) !important;
  font-size: 0.75rem !important;
  color: var(--w-text-soft) !important;
}

.api-schema-required {
  font-size: 0.625rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.04em !important;
  color: #b45309 !important;
}
.dark .api-schema-required { color: #fbbf24 !important; }

.api-schema-description {
  margin-top: 0.25rem !important;
  font-size: 0.8125rem !important;
  line-height: 1.5 !important;
  color: var(--w-text-soft) !important;
}

/* Response-status hue per 2xx/3xx/4xx/5xx family — pairs with the existing
   .api-response-status / .api-response-header card. */
.api-status-2xx { color: #047857 !important; }
.api-status-3xx { color: #1d4ed8 !important; }
.api-status-4xx { color: #b45309 !important; }
.api-status-5xx { color: #b91c1c !important; }
.dark .api-status-2xx { color: #34d399 !important; }
.dark .api-status-3xx { color: #60a5fa !important; }
.dark .api-status-4xx { color: #fbbf24 !important; }
.dark .api-status-5xx { color: #fca5a5 !important; }

/* ═══════════════════════════════════════════════════════════════════════════
   MISC
   ═══════════════════════════════════════════════════════════════════════════ */

.subheading-anchor { opacity: 0; margin-left: 0.375rem; font-size: 0.75em; transition: opacity 0.15s; }
*:hover > .subheading-anchor, .subheading-anchor:focus { opacity: 0.4; }

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--w-scrollbar-thumb); border-radius: 999px; }

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO IMAGE (light / dark mode switching)
   ═══════════════════════════════════════════════════════════════════════════ */

.logo-dark { display: none; }
.dark .logo-light { display: none; }
.dark .logo-dark { display: block; }

/* ═══════════════════════════════════════════════════════════════════════════
   MOBILE
   Shared responsive rules. Layout-level breakpoints (grid columns, sidebar
   visibility) live in each theme's style.css.
   ═══════════════════════════════════════════════════════════════════════════ */

/* Tablet & smaller: tighten article horizontal padding and matching bleed. */
@media (max-width: 900px) {
  article                  { padding: 0 1.75rem 4.5rem !important; }
  .nextra-bleed            { margin-left: -1.75rem !important; margin-right: -1.75rem !important; }
}

/* Phone: keep things compact and prevent horizontal overflow. */
@media (max-width: 767px) {
  /* Article padding matches forge mobile rule; bleed follows. */
  .nextra-bleed            { margin-left: -1.25rem !important; margin-right: -1.25rem !important; }

  /* Typography scales down — keep headings readable without dwarfing body. */
  article h1               { font-size: 1.5rem !important; }
  article h1 + p           { font-size: 0.9375rem !important; margin-bottom: 1.25rem !important; }
  article h2               { font-size: 1.0625rem !important; margin-top: 1.875rem !important; }
  article h3               { font-size: 0.9375rem !important; margin-top: 1.5rem !important; }

  /* Tables overflow horizontally within the article column instead of forcing
     the whole page to scroll. \`display: block\` is needed because table layout
     ignores overflow on the table element itself. */
  article table {
    display: block !important;
    width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
  }

  /* Code blocks: trim the inset so long lines don't get clipped too aggressively. */
  .nextra-code pre, article pre { padding: 0 0.75rem !important; }

  /* Cards collapse to a single column. */
  .nextra-cards            { grid-template-columns: 1fr !important; }

  /* Footer with columns: stack brand block above the link grid; reduce padding. */
  footer.forge-footer      { padding: 0 1.25rem 2rem !important; }
  .w-footer-with-cols {
    flex-direction: column !important;
    gap: 2rem !important;
    padding: 2rem 1rem 1.5rem !important;
  }
  .w-footer-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 1.5rem 1rem !important;
  }
  .w-footer-brand          { min-width: 0 !important; }
  footer.forge-footer > .w-footer-powered { padding-right: 0 !important; align-self: flex-start !important; }
}

/* Very narrow phones: drop footer link columns to a single stack. */
@media (max-width: 420px) {
  article h1               { font-size: 1.375rem !important; }
  .w-footer-columns        { grid-template-columns: 1fr !important; }
}
`;

export default componentsCss;
