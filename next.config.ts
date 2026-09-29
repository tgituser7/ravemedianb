import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide Next.js's on-screen "N" dev badge; errors still surface as usual.
  devIndicators: false,
  // Old routes redirect to their renamed pages, so existing links keep working.
  async redirects() {
    return [
      { source: "/project", destination: "/production", permanent: true },
      { source: "/network", destination: "/distribution", permanent: true },
    ];
  },
};

export default nextConfig;
