import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'picsum.photos',
      'm.media-amazon.com',
      'i.pinimg.com',
      'encrypted-tbn0.gstatic.com',
      'example.com'
    ],
  },
};

export default nextConfig;
