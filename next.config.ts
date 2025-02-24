import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: 'out',
  trailingSlash: true,
  // basePath: "/biswajitpanday.github.io",
  // assetPrefix: "/biswajitpanday.github.io/",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
