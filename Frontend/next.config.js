/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    subgraph_url: '',
  },
}

module.exports = nextConfig
