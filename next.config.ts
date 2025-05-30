import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: "export",
  distDir: 'build',
  trailingSlash: true,
  // basePath: "/biswajitpanday.github.io",
  // assetPrefix: "/biswajitpanday.github.io/",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion'],
  },
  // Disable server-side features for static export
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Bundle optimization - compatible with Next.js 15
  webpack: (config, { isServer }) => {
    // Optimize bundle size for client-side only
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
