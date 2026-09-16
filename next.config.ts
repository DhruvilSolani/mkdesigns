import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images from local assets are handled by Next.js automatically
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
