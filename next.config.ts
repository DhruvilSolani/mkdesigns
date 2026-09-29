import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images from local assets are handled by Next.js automatically
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    // Handle video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mov)$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });
    return config;
  },
};

export default nextConfig;
