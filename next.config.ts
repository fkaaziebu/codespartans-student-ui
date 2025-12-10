import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  output: "standalone",
  env: {
    GRAPHQL_BASE_URL: process.env.GRAPHQL_BASE_URL,
    GRAPGQL_WS_BASE_URL: process.env.GRAPGQL_WS_BASE_URL,
    SSE_URL: process.env.SSE_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: ["graphql-tag/loader"],
    });
    return config;
  },
};

export default nextConfig;
