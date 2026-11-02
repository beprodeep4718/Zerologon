import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Funnel_Display, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import { getSite } from "@/lib/content";
import { cn, SITE_URL } from "@/lib/utils";

const funnel = Funnel_Display({ subsets: ["latin"], variable: "--font-funnel" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// Runs before first paint, so a saved theme never flashes the wrong one.
const THEME_SCRIPT = `try{var t=localStorage.getItem('zl-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f1f1ee" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const title = `${site.name} | Student cybersecurity cell`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${site.name}` },
    description: site.description,
    openGraph: { title, description: site.description, siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title, description: site.description },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={cn(funnel.variable, geistMono.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
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
      </body>
    </html>
  );
}
