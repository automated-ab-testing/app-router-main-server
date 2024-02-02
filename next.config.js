/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  // React strict mode is disabled because it will call all asynchronous functions in "useEffect" hooks twice in development mode
  reactStrictMode: false,
};

export default config;
