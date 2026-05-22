/**
 * Forge theme layout — generates app/layout.tsx content.
 */

import manifest from "./manifest.mjs";

// ── sanitizeUrl ─────────────────────────────────────────────────────────────

const SAFE_URL_PATTERN = /^(?:https?:|mailto:|tel:|[#?]|\/(?!\/)|\.\.?\/)/i;

function sanitizeUrl(url) {
	const trimmed = String(url ?? "").trim();
	if (trimmed === "" || SAFE_URL_PATTERN.test(trimmed)) {
		return trimmed;
	}
	return "#";
}

// ── escapeHtml ──────────────────────────────────────────────────────────────

function escapeHtml(str) {
	return String(str ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;")
		.replace(/\{/g, "&#123;")
		.replace(/\}/g, "&#125;");
}

// ── Font config ─────────────────────────────────────────────────────────────

const FONT_CONFIG = {
	geist: {
		url: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
		cssFamily: "'Geist', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	},
	inter: {
		url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
		cssFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	},
	"space-grotesk": {
		url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
		cssFamily: "'Space Grotesk', -apple-system, sans-serif",
	},
	"ibm-plex": {
		url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
		cssFamily: "'IBM Plex Sans', -apple-system, sans-serif",
	},
	"source-sans": {
		url: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap",
		cssFamily: "'Source Sans 3', -apple-system, sans-serif",
	},
	"source-serif": {
		url: "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&display=swap",
		cssFamily: "'Source Serif 4', 'Iowan Old Style', Georgia, serif",
	},
};

// ── Social icons (inline SVG strings) ───────────────────────────────────────

const SOCIAL_ORDER = ["github", "twitter", "x", "discord", "linkedin", "bluesky"];

const SOCIAL_LABELS = {
	github: "GitHub",
	twitter: "Twitter",
	x: "X",
	discord: "Discord",
	linkedin: "LinkedIn",
	bluesky: "Bluesky",
};

const SOCIAL_ICONS = {
	github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
	twitter: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.737l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
	x: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.737l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
	discord: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.19.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>`,
	linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
	bluesky: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.882.139 2.585-.001 3.507 0 4.395c.001.888.002 1.49.902 2.243C3.66 8.58 6.62 12.519 7.707 14.633c1.087-2.114 4.046-6.053 6.798-7.995 2.752 1.942 5.711 5.881 6.798 7.995 1.087-2.114 4.046-6.053 6.798-7.995.9-.753.901-1.355.902-2.243.001-.888-.139-1.81-.902-2.513-.659-.616-1.664-.938-4.3 1.438C16.046 4.747 13.087 8.686 12 10.8z"/></svg>`,
};

// ── Logo helpers ────────────────────────────────────────────────────────────

/**
 * Default forge mark — a clean anvil silhouette used whenever a site
 * doesn't configure its own logoUrl. fill="currentColor" so it inherits
 * the colour set on .forge-logo-default in css.mjs (a neutral-with-tint
 * blend of --w-text-strong and --w-accent, light- and dark-mode aware).
 */
const DEFAULT_LOGO_SVG =
	'<svg viewBox="0 0 24 24" fill="currentColor" height="24" xmlns="http://www.w3.org/2000/svg" className="forge-logo-default" aria-hidden="true">' +
	'<path d="M2 5 L22 5 L20 9 L14 9 L14 15 L18 15 L21 19 L3 19 L6 15 L10 15 L10 9 L4 9 Z" />' +
	"</svg>";

/**
 * Default favicon SVG — the same anvil mark, baked as a standalone
 * document with an embedded prefers-color-scheme rule so it tracks the
 * browser chrome (dark in dark UI, dark on light UI) without any CSS
 * from the page. Encoded into a data: URI at module load so the
 * generated <link rel="icon"> can ship it inline — no extra asset
 * shipping required.
 */
const DEFAULT_FAVICON_SVG_MARKUP =
	'<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
	"<style>path{fill:#1f2937}@media(prefers-color-scheme:dark){path{fill:#f3f4f6}}</style>" +
	'<path d="M2 5 L22 5 L20 9 L14 9 L14 15 L18 15 L21 19 L3 19 L6 15 L10 15 L10 9 L4 9 Z"/>' +
	"</svg>";
const DEFAULT_FAVICON_DATA_URI =
	"data:image/svg+xml," + encodeURIComponent(DEFAULT_FAVICON_SVG_MARKUP);

/**
 * Renders the navbar / sidebar logo markup. The `useDefaults` flag is
 * computed by the caller (generateLayout) and is shared with the favicon
 * decision so logo + favicon always default or don't-default together.
 */
function buildLogoMarkup(title, logoUrl, logoUrlDark, logoText, useDefaults) {
	const safeUrl = logoUrl ? sanitizeUrl(logoUrl) : "";
	const safeUrlDark = logoUrlDark ? sanitizeUrl(logoUrlDark) : "";

	// Pick the wordmark text: explicit logoText wins; otherwise the
	// theme's displayName fills in IF we're in the all-defaults case
	// (e.g. "Forge"); otherwise the wordmark is suppressed entirely
	// (because the site asked for image only by setting logoUrl without
	// logoText).
	const text = logoText || (useDefaults ? manifest.displayName : "");
	// alt always falls back to the site title (or theme displayName) so
	// screen readers get a meaningful label even when the wordmark is
	// hidden.
	const jsAlt = JSON.stringify(text || title || manifest.displayName);

	let imageMarkup = "";
	if (safeUrl) {
		const lightClass = safeUrlDark ? ' className="logo-light"' : "";
		imageMarkup = `<img src={${JSON.stringify(safeUrl)}} alt={${jsAlt}} height="24"${lightClass} />`;
		if (safeUrlDark) {
			imageMarkup += `<img src={${JSON.stringify(safeUrlDark)}} alt={${jsAlt}} height="24" className="logo-dark" />`;
		}
	} else if (useDefaults) {
		imageMarkup = DEFAULT_LOGO_SVG;
	}

	// Tag the wordmark with .forge-logo-default in the defaults branch so
	// the CSS can give the default text the same accent treatment as the
	// default anvil mark, while site-supplied logoText keeps the regular
	// (text-strong) wordmark colour.
	const textMarkup = text
		? useDefaults
			? `<b className="forge-logo-default">${escapeHtml(text)}</b>`
			: `<b>${escapeHtml(text)}</b>`
		: "";
	return `${imageMarkup}${textMarkup}`;
}

// ── Header items ────────────────────────────────────────────────────────────

function buildHeaderItems(headerConfig) {
	const items = Array.isArray(headerConfig?.items) ? headerConfig.items : [];
	return items
		.map((item) => {
			const href = sanitizeUrl(item.url);
			const isExternal = /^https?:/i.test(href);
			const external = isExternal ? ' target="_blank" rel="noreferrer"' : "";
			return `<a className="forge-nav-link" href={${JSON.stringify(href)}}${external}>{${JSON.stringify(item.label)}}</a>`;
		})
		.join("");
}


// ── Footer ──────────────────────────────────────────────────────────────────

function buildSocialLinks(socialLinks) {
	if (!socialLinks) return "";
	const effective = { ...socialLinks };
	if (effective.x && !effective.twitter) {
		effective.twitter = effective.x;
		delete effective.x;
	}
	const links = SOCIAL_ORDER.filter((k) => effective[k] && k !== "x")
		.map((k) => {
			const url = sanitizeUrl(effective[k]);
			const label = SOCIAL_LABELS[k];
			const icon = SOCIAL_ICONS[k] ?? "";
			return `<a href={${JSON.stringify(url)}} target="_blank" rel="noopener noreferrer" aria-label={${JSON.stringify(label)}} className="w-footer-social-link" dangerouslySetInnerHTML={{__html: ${JSON.stringify(icon)}}} />`;
		})
		.join("");
	if (!links) return "";
	return `<div className="w-footer-social">${links}</div>`;
}

function buildFooterColumns(columns) {
	if (!Array.isArray(columns) || columns.length === 0) return "";
	const cols = columns
		.map((col) => {
			const links = (col.links ?? [])
				.map((link) => {
					const href = sanitizeUrl(link.url);
					return `<li><a href={${JSON.stringify(href)}}>{${JSON.stringify(link.label)}}</a></li>`;
				})
				.join("");
			return `<div className="w-footer-col"><p className="w-footer-col-title">{${JSON.stringify(col.title)}}</p><ul>${links}</ul></div>`;
		})
		.join("");
	return `<div className="w-footer-columns">${cols}</div>`;
}

function buildFooterJsx(title, footerConfig) {
	const fc = footerConfig ?? {};
	const copyrightText = fc.copyright || `© ${new Date().getFullYear()} ${title}`;
	const copyrightJsx = `<span className="w-footer-copy">{${JSON.stringify(copyrightText)}}</span>`;
	const social = buildSocialLinks(fc.socialLinks);
	const columns = buildFooterColumns(fc.columns);
	const poweredBy = `<a href="https://www.jolli.ai" target="_blank" rel="noopener noreferrer" className="w-footer-powered">Built with Jolli</a>`;

	if (columns) {
		const brand = `<div className="w-footer-brand">${copyrightJsx}${social}</div>`;
		return `<Footer className="forge-footer"><div className="w-footer-with-cols">${brand}${columns}</div>${poweredBy}</Footer>`;
	}

	const right = `<div className="w-footer-bar-right">${social}${poweredBy}</div>`;
	return `<Footer className="forge-footer"><div className="w-footer-bar">${copyrightJsx}${right}</div></Footer>`;
}

// ── Main export ─────────────────────────────────────────────────────────────

export function generateLayout(config) {
	const title = config.title || "Docs";
	const description = config.description || "";
	const t = config.theme ?? {};

	const defaultTheme = t.defaultTheme ?? manifest.defaults.defaultTheme;
	const requestedFont = typeof t.fontFamily === "string" ? t.fontFamily.trim() : "";
	const fontFamily = requestedFont || manifest.defaults.fontFamily;
	const accentColor = t.primaryColor ?? t.colors?.primary ?? "";
	const logoUrl = t.logoUrl;
	const logoUrlDark = t.logoUrlDark;
	const logoText = t.logoText;
	const favicon = config.favicon ?? t.favicon;

	// Theme defaults (logo mark + favicon) fire only when the site has
	// configured none of: logoUrl, logoUrlDark, logoText, favicon. As
	// soon as any is set, we render exactly what was provided and leave
	// the rest blank — no surprise mixing of user assets and theme
	// defaults.
	const useDefaults = !logoUrl && !logoUrlDark && !logoText && !favicon;

	const jsTitle = JSON.stringify(title);
	const jsDescription = JSON.stringify(description);
	const jsDefaultTheme = JSON.stringify(defaultTheme);

	const font = FONT_CONFIG[fontFamily] ?? FONT_CONFIG[manifest.defaults.fontFamily];
	const fontLink = `<link rel="stylesheet" href={${JSON.stringify(font.url)}} />`;
	// Favicon decision matrix:
	//   - favicon set      → emit the user's favicon link
	//   - useDefaults      → emit the inline anvil SVG favicon
	//   - otherwise        → emit an explicit empty-icon link so the
	//                        browser's default `/favicon.ico` request is
	//                        suppressed. Without this, browsers fall back
	//                        to the public/favicon.ico that the site
	//                        engine ships, which the theme can't reach.
	const faviconLink = favicon
		? `<link rel="icon" href={${JSON.stringify(sanitizeUrl(favicon))}} />`
		: useDefaults
			? `<link rel="icon" type="image/svg+xml" href={${JSON.stringify(DEFAULT_FAVICON_DATA_URI)}} />`
			: `<link rel="icon" href="data:," />`;

	const htmlStyle = {
		"--w-font-family": font.cssFamily,
	};
	if (accentColor) {
		htmlStyle["--w-brand-color"] = accentColor;
	}
	const htmlStyleStr = JSON.stringify(htmlStyle);

	const logoMarkup = buildLogoMarkup(title, logoUrl, logoUrlDark, logoText, useDefaults);
	const headerItems = buildHeaderItems(config.header);
	const footerJsx = buildFooterJsx(title, config.footer);

	return `import { Footer, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../styles/api.css'
import './themes/${manifest.name}.css'
import ScopedNextraLayout from '../components/ScopedNextraLayout'

export const metadata = {
  title: ${jsTitle},
  description: ${jsDescription},
}

const NavLogo = () => (
  <span className="forge-navbar-logo">
    ${logoMarkup}
  </span>
)

const navbar = (
  <Navbar logo={<NavLogo />}>
    ${headerItems}<ThemeSwitch />
  </Navbar>
)

const footer = ${footerJsx}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning style={${htmlStyleStr} as React.CSSProperties}>
      <Head>
        ${fontLink}
        ${faviconLink}
      </Head>
      <body>
        <div className="forge-sidebar-logo">
          <a href="/">
            ${logoMarkup}
          </a>
        </div>

        <div className="forge-sidebar-search">
          <Search placeholder="Search…" />
        </div>

        <ScopedNextraLayout
          navbar={navbar}
          search={false}
          pageMap={await getPageMap()}
          footer={footer}
          editLink={null}
          feedback={{ content: null }}
          darkMode={true}
          nextThemes={{ defaultTheme: ${jsDefaultTheme} }}
        >
          {children}
        </ScopedNextraLayout>
      </body>
    </html>
  )
}
`;
}
