/**
 * Slate theme layout — collapsible sidebar + tabs + rich footer.
 */

import manifest from "./manifest.mjs";

export function generateLayout(config) {
	const title = JSON.stringify(config.title || "Docs");
	const description = JSON.stringify(config.description || "");
	const defaultTheme = JSON.stringify(config.theme?.defaultTheme || manifest.defaults.defaultTheme);

	// Footer with columns
	let footerJsx = "<Footer />";
	const footer = config.footer;
	if (footer?.columns?.length || footer?.socialLinks || footer?.copyright) {
		const colsJsx = (footer.columns || []).map(col => {
			const linksJsx = col.links.map(l =>
				`<li><a href={${JSON.stringify(l.url)}}>{${JSON.stringify(l.label)}}</a></li>`
			).join("\n              ");
			return `
          <div className="slate-footer-col">
            <p className="slate-footer-col-title">{${JSON.stringify(col.title)}}</p>
            <ul>
              ${linksJsx}
            </ul>
          </div>`;
		}).join("");

		const socialKeys = Object.keys(footer.socialLinks || {});
		const socialJsx = socialKeys.length > 0
			? `<div className="slate-footer-social">${socialKeys.map(k =>
				`<a href={${JSON.stringify(footer.socialLinks[k])}} target="_blank" rel="noopener noreferrer">{${JSON.stringify(k)}}</a>`
			).join("")}</div>`
			: "";

		const copyright = footer.copyright || "";

		footerJsx = `<Footer>
      <div className="slate-footer">
        <div className="slate-footer-grid">
          ${colsJsx}
        </div>
        <div className="slate-footer-bottom">
          <span className="slate-footer-copyright">{${JSON.stringify(copyright)}}</span>
          ${socialJsx}
          <span className="slate-footer-powered">Built with Jolli</span>
        </div>
      </div>
    </Footer>`;
	}

	return `import { Footer, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
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

const navbar = <Navbar logo={<b style={{ color: 'var(--w-accent)', fontSize: '1.125rem' }}>{${title}}</b>} />
const footer = ${footerJsx}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: ${manifest.defaults.primaryHue}, saturation: 100 }}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </Head>
      <body>
        <ScopedNextraLayout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          darkMode={true}
          nextThemes={{ defaultTheme: ${defaultTheme} }}
        >
          <SidebarTabs className="slate-hidden-tabs" />
          {children}
        </ScopedNextraLayout>
      </body>
    </html>
  )
}
`;
}
