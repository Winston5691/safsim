import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  turbopack: { root: __dirname },
  transpilePackages: ["@safaricom/sui"],
};

export default nextConfig;
