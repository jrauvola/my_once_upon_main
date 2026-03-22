import type { NextConfig } from "next";

const repoName = "my_once_upon_main";
const isGithubPagesBuild = process.env.NODE_ENV === "production";
const basePath = isGithubPagesBuild ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
