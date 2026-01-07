import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for better performance
  output: 'standalone',
  
  // Optimize images
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize bundle
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  
  // Headers for better security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
