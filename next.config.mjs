/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" }
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async rewrites() {
    return [
      {
        source: "/images/:path*",
        destination: "https://ccidcop.in/images/:path*",
      },
    ];
  },
};

export default nextConfig;
