/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  transpilePackages: ['react-syntax-highlighter'],
  experimental: {
    serverActions: true,
  }
};

module.exports = nextConfig;
