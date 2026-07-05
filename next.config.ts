import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "ec2-54-87-48-32.compute-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "codespartans-student-ui.vercel.app",
      },
    ],
  },
  output: "standalone",
  env: {
    REST_BASE_URL: process.env.REST_BASE_URL,
    GRAPHQL_WS_BASE_URL: process.env.GRAPHQL_WS_BASE_URL,
    MEILI_URL: process.env.MEILI_URL,
    MEILI_MASTER_KEY: process.env.MEILI_MASTER_KEY,
    MEILI_INDEX: process.env.MEILI_INDEX,
  },
  turbopack: {
    rules: {
      "*.graphql": {
        loaders: ["graphql-tag/loader"],
        as: "*.js",
      },
    },
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
