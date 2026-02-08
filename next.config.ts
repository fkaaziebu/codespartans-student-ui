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
    REST_BASE_URL: process.env.REST_BASE_URL,
    GRAPHQL_BASE_URL: process.env.GRAPHQL_BASE_URL,
    GRAPHQL_WS_BASE_URL: process.env.GRAPHQL_WS_BASE_URL,
    MEILI_URL: process.env.MEILI_URL,
    MEILI_MASTER_KEY: process.env.MEILI_MASTER_KEY,
    MEILI_INDEX: process.env.MEILI_INDEX,
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
