import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide Next.js's on-screen "N" dev badge; errors still surface as usual.
  devIndicators: false,
  // The Production page used to live at /project; keep old links working.
  async redirects() {
    return [{ source: "/project", destination: "/production", permanent: true }];
  },
};

export default nextConfig;
