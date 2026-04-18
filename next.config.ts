import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.seeklogo.com" },
      { protocol: "https", hostname: "companieslogo.com" },
      { protocol: "https", hostname: "prudential.co.ke" },
      { protocol: "https", hostname: "api.actuview.com" },
      { protocol: "https", hostname: "actuaries.org" },
      { protocol: "https", hostname: "tangerine.africa" },
      { protocol: "https", hostname: "ncgc.ng" },
    ],
  },
};

export default nextConfig;
