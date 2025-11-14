// EN: next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com', // El de Webflow (lo dejamos)
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // <-- ¡AÑADE ESTE BLOQUE!
      },
    ],
  },
};

export default nextConfig;