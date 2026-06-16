import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "export",
const nextConfig: NextConfig = {
  // Commented out for Node.js server deployment. Uncomment if doing a fully static export.
  // output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
