import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // trailingSlash: true,
  basePath: "/biswajitpanday.github.io",
  // assetPrefix: "/biswajitpanday.github.io/",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
