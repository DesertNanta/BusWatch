/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 14
  experimental: {
    typedRoutes: false,
  },
  // Suppress Leaflet SSR issues by marking as client-only where needed
  webpack: (config) => {
    // Handle Leaflet's browser-only requirements
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
