import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';

// ============================================================
// Google Fonts — Inter via next/font (zero layout shift)
// ============================================================

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// ============================================================
// Root metadata (overridden per-page via generateMetadata)
// ============================================================

export const metadata: Metadata = {
  title: {
    default: 'Gilang Wirapati — Software Engineer & Creative',
    template: '%s | Gilang Wirapati',
  },
  description:
    'Portfolio pribadi Gilang Wirapati — Software Engineer, Fotografer, Videografer, dan Video Editor berbasis di Indonesia.',
  metadataBase: new URL('https://gilangwirapati.com'),
};

// ============================================================
// Root Layout
//
// Semantic structure (Requirement 8.5):
//   <html>
//     <body>
//       <header> + <nav>  ← rendered inside NavigationBar
//       <main>            ← wraps page {children}
//       <footer>          ← rendered inside Footer
//     </body>
//   </html>
// ============================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        {/* header + nav landmark — provided by NavigationBar */}
        <NavigationBar />

        {/* main landmark — wraps all page content */}
        <main className="flex-1" id="main-content">
          {children}
        </main>

        {/* footer landmark — provided by Footer */}
        <Footer />
      </body>
    </html>
  );
}
