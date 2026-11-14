import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  allowedDevOrigins: [
    "*.run.app",
    "*.asia-southeast1.run.app",
    "*.googleusercontent.com",
    "10.83.57.29",
    "localhost",
    "localhost:3000",
    "localhost:3001",
    "127.0.0.1",
  ],
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
