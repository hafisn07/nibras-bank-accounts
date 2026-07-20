import type { NextConfig } from "next";

const HOST_URL = process.env.HOST_URL ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Multi-Zones: asset prefix; shell proxies /accounts-static/*
  assetPrefix: "/accounts-static",
  experimental: {
    serverActions: { allowedOrigins: [new URL(HOST_URL).host] },
  },
};

export default nextConfig;
