/**
 * Flux theme layout — production-grade fixed-sidebar layout.
 * Based on Feldera docs build (advanced Forge variant).
 */

import manifest from "./manifest.mjs";

export function generateLayout(config) {
	const title = JSON.stringify(config.title || "Docs");
	const description = JSON.stringify(config.description || "");
	const defaultTheme = JSON.stringify(config.theme?.defaultTheme || manifest.defaults.defaultTheme);

	// Logo
	const logoUrl = config.theme?.logoUrl;
	const logoUrlDark = config.theme?.logoUrlDark;
	const logoText = JSON.stringify(config.theme?.logoText || config.title || "Docs");
	const logoDisplay = config.theme?.logoDisplay || (logoUrl ? "both" : "text");

	// CTA button
	let ctaButton = "";
	if (config.header?.primary) {
		const href = JSON.stringify(config.header.primary.href);
		const label = JSON.stringify(config.header.primary.label);
		ctaButton = `<a href={${href}} className="flux-cta-button">{${label}}</a>`;
	}

	// Logo images
	let logoImageJsx = "";
	if (logoUrl) {
		const lightClass = logoUrlDark ? ' className="logo-light"' : "";
		logoImageJsx = `<img src={${JSON.stringify(logoUrl)}} alt={${logoText}} height="24"${lightClass} />`;
		if (logoUrlDark) {
			logoImageJsx += `\n      <img src={${JSON.stringify(logoUrlDark)}} alt={${logoText}} height="24" className="logo-dark" />`;
		}
	}

	const showImage = logoDisplay !== "text" && logoUrl;
	const showText = logoDisplay !== "image";

	// Accent color
	const accentColor = config.theme?.colors?.primary || "#6366f1";

	// Footer
	let footerJsx = "<Footer />";
	if (config.footer?.copyright) {
		const cp = JSON.stringify(config.footer.copyright);
		footerJsx = `<Footer className="flux-footer"><div className="w-footer-bar"><span className="w-footer-copy">{${cp}}</span><div className="w-footer-bar-right"><a href="https://www.jolli.ai" target="_blank" rel="noopener noreferrer" className="w-footer-powered">Built with Jolli</a></div></div></Footer>`;
	}

	return `import { Footer, Navbar, ThemeSwitch } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../styles/api.css'
import './themes/${manifest.name}.css'
import ScopedNextraLayout from '../components/ScopedNextraLayout'
import SidebarTabs from '../components/SidebarTabs'

export const metadata = {
  title: ${title},
  description: ${description},
}

const NavLogo = () => (
  <span className="flux-navbar-logo">
    ${showImage ? logoImageJsx : ""}
    ${showText ? `<b>{${logoText}}</b>` : ""}
  </span>
)

const navbar = (
  <Navbar logo={<NavLogo />}>
    ${ctaButton}
    <ThemeSwitch />
  </Navbar>
)

const footer = ${footerJsx}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning style={{'--w-brand-color': '${accentColor}', '--w-font-family': "'Inter', ui-sans-serif, system-ui, sans-serif"} as React.CSSProperties}>
      <Head />
      <body>
        <div className="flux-sidebar-logo">
          <a href="/">
            ${showImage ? logoImageJsx : ""}
            ${showText ? `<b>{${logoText}}</b>` : ""}
          </a>
        </div>

        <div className="flux-sidebar-search">
          <Search placeholder="Search…" />
        </div>

        <ScopedNextraLayout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          editLink={null}
          feedback={{ content: null }}
          darkMode={true}
          nextThemes={{ defaultTheme: ${defaultTheme} }}
        >
          <SidebarTabs className="flux-sidebar-tabs" />
          {children}
        </ScopedNextraLayout>
      </body>
    </html>
  )
}
`;
}
