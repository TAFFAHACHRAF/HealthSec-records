/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
  basePath: "/healthcare-system",
  async redirects() {
    return [
      {
          source: '/',
          destination: '/healthcare-system',
          basePath: false,
          permanent: false
      }
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '',
      },
    ],
  },
}

export default nextConfig