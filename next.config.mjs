/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" }
    ],
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
