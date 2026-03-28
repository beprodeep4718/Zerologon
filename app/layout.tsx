import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "ZEROLOGON — Cybersecurity Cell",
  description: "ZEROLOGON is the official cybersecurity cell - a collective of hackers, defenders, and researchers pushing the boundaries of cybersecurity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased scroll-smooth", "font-sans", inter.variable)}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Bebas+Neue&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-zerologon-white text-zerologon-black cursor-crosshair overflow-x-hidden">{children}</body>
    </html>
  );
}
