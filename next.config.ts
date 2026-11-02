import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// The page is prerendered, so there's no per-request nonce and inline scripts stay allowed.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Only for the hero's WebGL texture. Limited to our project so nobody else's Sanity images
    // can use up the site's image quota.
    remotePatterns: sanityProjectId
      ? [{ protocol: "https", hostname: "cdn.sanity.io", pathname: `/images/${sanityProjectId}/**` }]
      : [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
