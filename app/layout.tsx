import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { getSite } from "@/lib/content";
import { cn, SITE_URL } from "@/lib/utils";

const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "500", variable: "--font-plex-mono" });

export const viewport: Viewport = { themeColor: "#0e0f11" };

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const title = `${site.name} | Student cybersecurity cell`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: site.description,
    openGraph: { title, description: site.description, url: "/", siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title, description: site.description },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(archivo.variable, plexMono.variable)}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-md focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
