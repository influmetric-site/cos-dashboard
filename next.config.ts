import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/cos",
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
