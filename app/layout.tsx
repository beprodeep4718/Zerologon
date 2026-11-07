import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Funnel_Display, Geist_Mono } from "next/font/google";
import { preconnect } from "react-dom";
import Header from "@/components/Header";
import Motion from "@/components/Motion";
import { getSite } from "@/lib/content";
import { CLUB, SEO_DESCRIPTION, SEO_KEYWORDS, SEO_TITLE, structuredData } from "@/lib/seo";
import { cn, SITE_URL } from "@/lib/utils";

const funnel = Funnel_Display({ subsets: ["latin"], variable: "--font-funnel" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// Runs before first paint, so a saved theme never flashes the wrong one.
// It also hides what GSAP will animate in, so nothing flashes before the intro plays;
// if scripts fail, the content is shown anyway after 3 seconds.
const MOTION_SCRIPT = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var r=document.documentElement;r.classList.add('motion-pending');setTimeout(function(){r.classList.remove('motion-pending')},3000)}}catch(e){}`;
const THEME_SCRIPT = MOTION_SCRIPT + `try{var t=localStorage.getItem('zl-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f1f1ee" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SEO_TITLE, template: `%s | ${CLUB.name} ${CLUB.collegeShort}` },
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  applicationName: CLUB.name,
  authors: [{ name: CLUB.name, url: SITE_URL }],
  creator: CLUB.name,
  publisher: CLUB.college,
  category: "education",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_IN",
    siteName: `${CLUB.name}, ${CLUB.shortTitle}`,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SEO_TITLE, description: SEO_DESCRIPTION },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Open the image CDN connection while the HTML is still parsing.
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) preconnect("https://cdn.sanity.io");

  const site = await getSite();
  // "<" is escaped so content can never close the script tag early.
  const jsonLd = JSON.stringify(structuredData(site)).replace(/</g, "\\u003c");

  return (
    <html lang="en-IN" data-theme="dark" suppressHydrationWarning className={cn(funnel.variable, geistMono.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <div className="grain" aria-hidden="true" />
        <Motion />
      </body>
    </html>
  );
}
