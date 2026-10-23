import type { NextConfig } from "next";
import { validateEnv } from "./src/lib/env";

// Validate environment and siteConfig on startup / build
validateEnv();

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  allowedDevOrigins: ["10.83.57.29", "localhost:3001"],
  async redirects() {
    return [
      {
        source: "/grow-your-business",
        destination: "/",
        permanent: true,
      },
      {
        source: "/launch-your-business",
        destination: "/",
        permanent: true,
      },
      {
        source: "/free-growth-audit",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/business-guidance-call",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/insights/category/:slug*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/services#:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
