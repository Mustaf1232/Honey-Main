import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["ioredis"],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    // Provide a mock __dirname for edge and server ESM contexts where
    // the native CJS __dirname global is not available
    config.node = {
      ...config.node,
      __dirname: true,
    };

    if (isServer && nextRuntime !== "edge") {
      const existing = Array.isArray(config.externals) ? config.externals : [];
      config.externals = [...existing, { ioredis: "commonjs2 ioredis" }];
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "cms.medzamrsavljenje.org",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
