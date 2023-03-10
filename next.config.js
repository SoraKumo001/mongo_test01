// @ts-check
/**
 * @type { import("next").NextConfig}
 */
const config = {
  reactStrictMode: true,
  experimental: {
    cpus: 4,
  },
  compiler: { emotion: true },
};
module.exports = config;
