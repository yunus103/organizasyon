import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/istanbul-dueguen-organizasyon-hizmetleri",
        destination: "/istanbul-dugun-organizasyon-hizmetleri",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
