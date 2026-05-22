/**
 * Jolli theme layout — generates app/layout.tsx content.
 */

import manifest from "./manifest.mjs";

export function generateLayout(config) {
	const title = JSON.stringify(config.title || "Docs");
	const description = JSON.stringify(config.description || "");
	const defaultTheme = JSON.stringify(config.theme?.defaultTheme || manifest.defaults.defaultTheme);

	// Header primary CTA
	let primaryButton = "";
	if (config.header?.primary) {
		const href = JSON.stringify(config.header.primary.href);
		const label = JSON.stringify(config.header.primary.label);
		primaryButton = `<a href={${href}} style={{ background: 'var(--jolli-green)', color: 'white', padding: '0.375rem 0.875rem', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none' }}>{${label}}</a>`;
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

const navbar = <Navbar logo={<b style={{ color: 'var(--jolli-green)', fontSize: '1.125rem' }}>{${title}}</b>}>${primaryButton}</Navbar>
const footer = <Footer>MIT {new Date().getFullYear()} © Jolli.</Footer>

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: ${manifest.defaults.primaryHue}, saturation: 82 }}>
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
          <SidebarTabs className="jolli-hidden-tabs" />
          {children}
        </ScopedNextraLayout>
      </body>
    </html>
  )
}
`;
}
