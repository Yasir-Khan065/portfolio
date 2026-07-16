import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the on-screen dev indicator (the floating "N" badge). In Next 16 the
  // granular options were removed; `false` disables it while still surfacing
  // compile/runtime errors.
  devIndicators: false,
};

export default nextConfig;
