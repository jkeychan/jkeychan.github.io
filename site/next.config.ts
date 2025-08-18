import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  redirects: async () => {
    return [
      {
        source: "/project",
        destination: "/publications",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
