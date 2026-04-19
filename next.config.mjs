import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["redis"],
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
  webpack: (config, { isServer, nextRuntime }) => {
    // Webpack's runtime injects `n.ab = __dirname + "/"` into server chunks.
    // On Vercel, server bundles run as ESM where __dirname is not defined.
    // Setting node.__dirname = true makes webpack replace __dirname with
    // the real directory path string at build time instead of a runtime reference.
    if (isServer && nextRuntime !== "edge") {
      config.node = {
        ...config.node,
        __dirname: true,
        __filename: true,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
