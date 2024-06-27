/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
      },
    ],
    unoptimized: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
