/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};

module.exports = nextConfig;
