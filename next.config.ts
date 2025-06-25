import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 640, 768, 1024, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enhanced Bundle Splitting Configuration
  webpack: (config, { dev, isServer }) => {
    // Enhanced Bundle Analyzer
    if (process.env.ANALYZE === 'true') {
      // Dynamic import for webpack-bundle-analyzer to avoid bundling in production
      const BundleAnalyzerPlugin = eval('require')('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
          reportFilename: isServer ? 'server-bundle-report.html' : 'client-bundle-report.html',
        })
      );
    }

    // Advanced Bundle Splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Vendor chunk for core dependencies
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            enforce: true,
            priority: 20,
          },
          // React Icons - separate chunk
          reactIcons: {
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            name: 'react-icons',
            chunks: 'all',
            enforce: true,
            priority: 30,
          },
          // Framer Motion - separate chunk
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            enforce: true,
            priority: 30,
          },
          // UI Libraries
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|class-variance-authority|clsx|tailwind-merge)[\\/]/,
            name: 'ui-libs',
            chunks: 'all',
            enforce: true,
            priority: 25,
          },
          // Lightbox and Image Components
          lightbox: {
            test: /[\\/]node_modules[\\/](yet-another-react-lightbox|react-lightbox-component)[\\/]/,
            name: 'lightbox',
            chunks: 'all',
            enforce: true,
            priority: 25,
          },
          // Form Libraries
          forms: {
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
            name: 'forms',
            chunks: 'all',
            enforce: true,
            priority: 25,
          },
          // Common components chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
            priority: 15,
          },
        },
      };
    }

    return config;
  },

  // Enhanced Experimental Features
  experimental: {
    optimizePackageImports: [
      'react-icons', 
      'framer-motion', 
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip'
    ],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Server external packages (moved from experimental)
  serverExternalPackages: ['sharp'],

  // Enhanced Compiler Options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Performance optimizations
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
