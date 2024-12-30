/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  eslint: {
    // Disable the warning for <img> tag usage in next/image
    ignoreDuringBuilds: true, // This will ignore ESLint warnings during the build process
  },
  reactStrictMode: true, // Ensure React strict mode is enabled (optional but recommended)
  // You can add other custom Next.js configurations here as well
};

module.exports = nextConfig;
