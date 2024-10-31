import { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: [
    "packages/frontend/index.tsx",
    "packages/frontend/vite-env.d.ts",
    "packages/worker/migrations/*.ts",
    "packages/worker/__tests__/**/*.{ts,tsx}",
    "packages/worker/index.ts",
    "packages/docker-helper/index.ts",
    "packages/autotranslate/index.ts",
  ],
  project: ["packages/**/*.{ts,tsx}", "vite.config.ts"],
  ignore: [],
  ignoreDependencies: [
    "@types/leaflet.markercluster",
    "@testing-library/*",
    "ajv",
    "pino",
  ],
  ignoreBinaries: ["build"],
  rules: {
    files: "error",
    enumMembers: "error",
    nsTypes: "error",
    nsExports: "error",
    types: "error",
    exports: "error",
    unlisted: "error",
    binaries: "error",
    dependencies: "error",
    devDependencies: "error",
  },
  webpack: true,
  prettier: true,
};

export default config;
